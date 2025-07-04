import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { verify } from 'argon2';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  REFRESH_TOKEN_EXPIRY_IN_DAYS = 14;
  ACCESS_TOKEN_EXPIRY_IN_MINUTES = '30m';
  REFRESH_TOKEN_NAME = 'refreshToken';

  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  issueTokens(userId: string): AuthTokens {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY_IN_MINUTES,
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: `${this.REFRESH_TOKEN_EXPIRY_IN_DAYS}d`,
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('Пользователь не найден');

    if (!user.password) {
      throw new BadRequestException(
        'Учетная запись не имеет пароля. Попробуйте войти через OAuth',
      );
    }

    const validPassword = await verify(user.password, dto.password);

    if (!validPassword) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    return user;
  }

  async validateOAuthLogin(req: {
    user: {
      email: string;
      name: string;
      picture?: string;
      githubId?: string;
    };
  }) {
    let user = await this.userService.getByEmail(req.user.email);

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: req.user.email,
          name: req.user.name,
          picture: req.user.picture,
        },
        include: {
          favorites: true,
          orders: true,
        },
      });
    }

    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  async register(dto: AuthDto) {
    const userExist = await this.userService.getByEmail(dto.email);

    if (userExist)
      throw new BadRequestException('Пользователь уже зарегистрирован');

    const user = await this.userService.create(dto);
    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  async getNewRefreshToken(refreshToken: string) {
    let payload: { id: string };

    try {
      payload = await this.jwt.verifyAsync(refreshToken, {
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Невалидный или просроченный токен');
    }

    const user = await this.userService.getById(payload.id);

    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();

    expiresIn.setDate(expiresIn.getDate() + this.REFRESH_TOKEN_EXPIRY_IN_DAYS);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  removeRefreshTokenToResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }
}

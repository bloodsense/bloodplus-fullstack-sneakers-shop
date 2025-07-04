import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  issueTokens(userId: string): AuthTokens {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '30m',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '14d',
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('Пользователь не найден');

    return user;
  }

  async register(dto: AuthDto) {
    const userExist = await this.userService.getByEmail(dto.email);

    if (userExist)
      throw new BadRequestException('Пользователь уже зарегистрирован');

    const user = await this.userService.create(dto);
    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }
}

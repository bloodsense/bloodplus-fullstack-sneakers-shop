import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        favorites: true,
        orders: true,
      },
    });

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        favorites: true,
        orders: true,
      },
    });

    return user;
  }

  async addFavorites(userId: string, sneakerSlug: string) {
    const user = await this.getById(userId);

    if (!user) {
      throw new NotFoundException(`Пользователь с таким ID не найден`);
    }

    const sneaker = await this.prisma.sneaker.findUnique({
      where: { slug: sneakerSlug },
    });

    if (!sneaker) {
      throw new NotFoundException(`Кроссовки не найдены`);
    }

    const isExists = user.favorites.some(
      favSneaker => favSneaker.id === sneaker.id,
    );

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: {
            id: sneaker.id,
          },
        },
      },
    });

    return true;
  }

  async create(dto: AuthDto) {
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password),
      },
    });
  }
}

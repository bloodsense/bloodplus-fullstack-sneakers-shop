import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSizeDto, UpdateSizeDto } from './dto/size.dto';

@Injectable()
export class SizeService {
  constructor(private prisma: PrismaService) {}

  async getAllSizes() {
    return this.prisma.size.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getById(id: string) {
    const size = await this.prisma.size.findUnique({
      where: { id },
    });

    if (!size) {
      throw new NotFoundException('Размер не найден');
    }
    return size;
  }

  async getByValueAndType(value: string, type: string) {
    const size = await this.prisma.size.findFirst({
      where: {
        value,
        type: type as any,
      },
    });
    return size;
  }

  async createSize(dto: CreateSizeDto) {
    const existingSize = await this.getByValueAndType(dto.value, dto.type);
    if (existingSize) {
      throw new ConflictException(
        `Размер "${dto.value}" типа "${dto.type}" уже существует`,
      );
    }

    return this.prisma.size.create({
      data: {
        value: dto.value,
        type: dto.type,
      },
    });
  }

  async updateSize(id: string, dto: UpdateSizeDto) {
    await this.getById(id);

    const existingSize = await this.prisma.size.findFirst({
      where: {
        value: dto.value,
        type: dto.type,
        NOT: { id: id },
      },
    });

    if (existingSize) {
      throw new ConflictException(
        `Размер "${dto.value}" типа "${dto.type}" уже существует для другого ID`,
      );
    }

    return this.prisma.size.update({
      where: { id },
      data: {
        value: dto.value,
        type: dto.type,
      },
    });
  }

  async deleteSize(id: string) {
    await this.getById(id);

    try {
      return await this.prisma.size.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new ConflictException(
          'Невозможно удалить размер, так как он используется в наличии кроссовок',
        );
      }
      throw error;
    }
  }
}

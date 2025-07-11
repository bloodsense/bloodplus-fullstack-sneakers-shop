import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ColorDto } from './dto/color.dto';

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}

  async getBySlugColor(slug: string) {
    const color = await this.prisma.color.findUnique({
      where: {
        slug,
      },
    });

    if (!color) {
      throw new NotFoundException('Данный цвет не найден');
    }

    return color;
  }

  async createColor(dto: ColorDto) {
    return this.prisma.color.create({
      data: {
        value: dto.value,
        hex: dto.hex,
        slug: dto.slug,
      },
    });
  }

  async updateColor(slug: string, dto: ColorDto) {
    await this.getBySlugColor(slug);

    return this.prisma.color.update({
      where: {
        slug,
      },
      data: dto,
    });
  }

  async deleteColor(slug: string) {
    await this.getBySlugColor(slug);

    return this.prisma.color.delete({
      where: {
        slug,
      },
    });
  }
}

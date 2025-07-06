import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ColorDto } from './dto/color.dto';

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}

  async getByIdColor(id: string) {
    const color = await this.prisma.color.findUnique({
      where: {
        id,
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
      },
    });
  }

  async updateColor(id: string, dto: ColorDto) {
    await this.getByIdColor(id);

    return this.prisma.color.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async deleteColor(id: string) {
    await this.getByIdColor(id);

    return this.prisma.color.delete({
      where: {
        id,
      },
    });
  }
}

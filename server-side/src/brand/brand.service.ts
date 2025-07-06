import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BrandDto } from './dto/brand.dto';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async getByIdBrand(id: string) {
    const brand = await this.prisma.brand.findUnique({
      where: {
        id,
      },
    });

    if (!brand) {
      throw new NotFoundException('Данный бренд не найден');
    }

    return brand;
  }

  async createBrand(dto: BrandDto) {
    return this.prisma.brand.create({
      data: {
        name: dto.name,
      },
    });
  }

  async updateBrand(id: string, dto: BrandDto) {
    await this.getByIdBrand(id);

    return this.prisma.brand.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async deleteBrand(id: string) {
    await this.getByIdBrand(id);

    return this.prisma.brand.delete({
      where: {
        id,
      },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BrandDto } from './dto/brand.dto';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async getBySlugBrand(slug: string) {
    const brand = await this.prisma.brand.findUnique({
      where: {
        slug,
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
        slug: dto.slug,
      },
    });
  }

  async updateBrand(slug: string, dto: BrandDto) {
    await this.getBySlugBrand(slug);

    return this.prisma.brand.update({
      where: {
        slug,
      },
      data: dto,
    });
  }

  async deleteBrand(slug: string) {
    await this.getBySlugBrand(slug);

    return this.prisma.brand.delete({
      where: {
        slug,
      },
    });
  }
}

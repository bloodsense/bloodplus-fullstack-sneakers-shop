import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SeasonDto } from './dto/season.dto';

@Injectable()
export class SeasonService {
  constructor(private prisma: PrismaService) {}

  async getBySlugSeason(slug: string) {
    const season = await this.prisma.season.findUnique({
      where: {
        slug,
      },
    });

    if (!season) {
      throw new NotFoundException('Данный сезон не найден');
    }

    return season;
  }

  async getAllSeasons() {
    return this.prisma.season.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async createSeason(dto: SeasonDto) {
    return this.prisma.season.create({
      data: {
        name: dto.name,
        slug: dto.slug,
      },
    });
  }

  async updateSeason(slug: string, dto: SeasonDto) {
    await this.getBySlugSeason(slug);

    return this.prisma.season.update({
      where: {
        slug,
      },
      data: dto,
    });
  }

  async deleteSeason(slug: string) {
    await this.getBySlugSeason(slug);

    return this.prisma.season.delete({
      where: {
        slug,
      },
    });
  }
}

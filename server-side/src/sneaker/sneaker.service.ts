import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSneakerDto } from './dto/sneaker.dto';

@Injectable()
export class SneakerService {
  constructor(private prisma: PrismaService) {}

  async getAllSneakers() {
    const sneakers = await this.prisma.sneaker.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        brand: true,
        color: true,
        reviews: true,
        season: true,
        stocks: { include: { size: true } },
        sneakerInfo: true,
      },
    });

    return sneakers;
  }

  async getSneakersByBrand(brandSlug: string) {
    const sneakers = await this.prisma.sneaker.findMany({
      where: {
        brand: {
          slug: brandSlug,
        },
      },
      include: {
        brand: true,
        season: true,
        color: true,
        reviews: true,
        stocks: { include: { size: true } },
        sneakerInfo: true,
      },
    });

    if (sneakers.length === 0)
      throw new NotFoundException('Кроссовки этого бренда отсутствуют');

    return sneakers;
  }

  async getSneakersByGender(gender: string) {
    const sneakers = await this.prisma.sneaker.findMany({
      where: {
        sneakerInfo: {
          gender: gender,
        },
      },
      include: {
        brand: true,
        color: true,
        reviews: true,
        season: true,
        stocks: { include: { size: true } },
        sneakerInfo: true,
      },
    });

    if (sneakers.length === 0) {
      throw new NotFoundException(`Кроссовки такого пола не найдены`);
    }

    return sneakers;
  }

  async getSneakersBySeason(seasonSlug: string) {
    const sneakers = await this.prisma.sneaker.findMany({
      where: {
        season: {
          slug: seasonSlug,
        },
      },
      include: {
        brand: true,
        season: true,
        color: true,
        reviews: true,
        stocks: { include: { size: true } },
        sneakerInfo: true,
      },
    });

    if (sneakers.length === 0)
      throw new NotFoundException('Кроссовки с таким сезоном отсутствуют');

    return sneakers;
  }

  async getSneakersWithBrand(brandSlug: string, sneakerSlug: string) {
    const sneakers = await this.prisma.sneaker.findMany({
      where: {
        slug: sneakerSlug,
        brand: {
          slug: brandSlug,
        },
      },
      include: {
        brand: true,
        color: true,
        reviews: true,
        season: true,
        stocks: { include: { size: true } },
        sneakerInfo: true,
      },
    });

    if (sneakers.length === 0) {
      throw new NotFoundException('Кроссовки не найдены');
    }

    return sneakers[0];
  }

  async getBySlugSneaker(slug: string) {
    const sneaker = await this.prisma.sneaker.findUnique({
      where: {
        slug,
      },
      include: {
        brand: true,
        color: true,
        season: true,
        reviews: true,
        stocks: { include: { size: true } },
        sneakerInfo: true,
      },
    });

    if (!sneaker) throw new NotFoundException(`Кроссовки с ${slug} не найдены`);

    return sneaker;
  }

  async getByBrandSlug(brandSlug: string) {
    const sneakers = await this.prisma.sneaker.findMany({
      where: {
        brand: {
          slug: brandSlug,
        },
      },
      include: {
        brand: true,
        color: true,
        season: true,
        reviews: true,
        stocks: { include: { size: true } },
        sneakerInfo: true,
      },
    });

    if (sneakers.length === 0)
      throw new NotFoundException('Кроссовки данного бренда не найдены');

    return sneakers;
  }

  async getPopularSneakers() {
    const PopularSneakers = await this.prisma.orderItem.groupBy({
      by: ['sneakerId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
    });

    const sneakerIds = PopularSneakers.map(item => item.sneakerId);

    if (sneakerIds.length === 0) {
      return [];
    }

    const sneakers = await this.prisma.sneaker.findMany({
      where: {
        id: {
          in: sneakerIds,
        },
      },
      include: {
        brand: true,
        color: true,
        season: true,
        reviews: true,
        stocks: { include: { size: true } },
        sneakerInfo: true,
      },
    });

    const sortedSneakers = sneakerIds
      .map(id => sneakers.find(s => s.id === id))
      .filter(Boolean);

    return sortedSneakers;
  }

  async getSimilarSneakers(slug: string) {
    const currentSneaker = await this.getBySlugSneaker(slug);

    const sneakers = await this.prisma.sneaker.findMany({
      where: {
        brand: {
          name: currentSneaker.brand.name,
        },
        NOT: {
          id: currentSneaker.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        brand: true,
        color: true,
        season: true,
        reviews: true,
        stocks: { include: { size: true } },
        sneakerInfo: true,
      },
      take: 5,
    });

    if (sneakers.length == 0)
      throw new NotFoundException('Похожие кроссовки отсутствуют');

    return sneakers;
  }

  async createSneaker(dto: CreateSneakerDto) {
    const existingSneakerBySlug = await this.prisma.sneaker.findUnique({
      where: { slug: dto.slug },
    });
    if (existingSneakerBySlug) {
      throw new BadRequestException(
        `Кроссовки с URL "${dto.slug}" уже существуют. Пожалуйста, используйте другой URL`,
      );
    }

    const sizeIds = dto.stocks.map(stock => stock.sizeId);
    const existingSizes = await this.prisma.size.findMany({
      where: { id: { in: sizeIds } },
    });
    if (existingSizes.length !== sizeIds.length) {
      const foundSizeIds = existingSizes.map(s => s.id);
      const missingSizeIds = sizeIds.filter(id => !foundSizeIds.includes(id));
      throw new BadRequestException(
        `Некоторые размеры не найдены: ${missingSizeIds.join(', ')}`,
      );
    }

    const newSneaker = await this.prisma.$transaction(async prisma => {
      const sneaker = await prisma.sneaker.create({
        data: {
          name: dto.name,
          price: dto.price,
          images: dto.images,
          description: dto.description,
          slug: dto.slug,
          color: { connect: { id: dto.colorId } },
          brand: { connect: { id: dto.brandId } },
          season: { connect: { id: dto.seasonId } },
        },
      });

      await prisma.sneakerInfo.create({
        data: {
          ...dto.sneakerInfo,
          sneaker: { connect: { id: sneaker.id } },
        },
      });

      await Promise.all(
        dto.stocks.map(stock =>
          prisma.sneakerSizeStock.create({
            data: {
              sneaker: { connect: { id: sneaker.id } },
              size: { connect: { id: stock.sizeId } },
              quantity: stock.quantity,
            },
          }),
        ),
      );

      return sneaker;
    });

    return this.getBySlugSneaker(newSneaker.slug);
  }

  async updateSneaker(slug: string, dto: CreateSneakerDto) {
    const existingSneaker = await this.getBySlugSneaker(slug);

    if (dto.slug !== existingSneaker.slug) {
      const existingSneakerWithNewSlug = await this.prisma.sneaker.findUnique({
        where: { slug: dto.slug },
      });
      if (existingSneakerWithNewSlug) {
        throw new BadRequestException(
          `Кроссовки с URL "${dto.slug}" уже существуют. Пожалуйста, используйте другой URL`,
        );
      }
    }

    const sizeIds = dto.stocks.map(stock => stock.sizeId);
    const existingSizes = await this.prisma.size.findMany({
      where: { id: { in: sizeIds } },
    });
    if (existingSizes.length !== sizeIds.length) {
      const foundSizeIds = existingSizes.map(s => s.id);
      const missingSizeIds = sizeIds.filter(id => !foundSizeIds.includes(id));
      throw new BadRequestException(
        `Некоторые размеры не найдены: ${missingSizeIds.join(', ')}`,
      );
    }

    const updatedSneaker = await this.prisma.$transaction(async prisma => {
      const sneaker = await prisma.sneaker.update({
        where: { id: existingSneaker.id },
        data: {
          name: dto.name,
          price: dto.price,
          images: dto.images,
          description: dto.description,
          slug: dto.slug,
          colorId: dto.colorId,
          brandId: dto.brandId,
          sneakerInfo: {
            update: dto.sneakerInfo,
          },
        },
      });

      const currentStocksInDb = await prisma.sneakerSizeStock.findMany({
        where: { sneakerId: sneaker.id },
        select: { sizeId: true, quantity: true },
      });

      const newStocksMap = new Map(dto.stocks.map(s => [s.sizeId, s.quantity]));

      const currentStocksInDbMap = new Map(
        currentStocksInDb.map(s => [s.sizeId, s.quantity]),
      );

      for (const newStockDto of dto.stocks) {
        if (currentStocksInDbMap.has(newStockDto.sizeId)) {
          await prisma.sneakerSizeStock.update({
            where: {
              sneakerId_sizeId: {
                sneakerId: sneaker.id,
                sizeId: newStockDto.sizeId,
              },
            },
            data: {
              quantity: newStockDto.quantity,
            },
          });
        } else {
          await prisma.sneakerSizeStock.create({
            data: {
              sneaker: { connect: { id: sneaker.id } },
              size: { connect: { id: newStockDto.sizeId } },
              quantity: newStockDto.quantity,
            },
          });
        }
      }

      for (const existingStockInDb of currentStocksInDb) {
        if (!newStocksMap.has(existingStockInDb.sizeId)) {
          const hasOrderItems = await prisma.orderItem.count({
            where: {
              sneakerId: sneaker.id,
              sizeId: existingStockInDb.sizeId,
            },
          });

          if (hasOrderItems === 0) {
            await prisma.sneakerSizeStock.delete({
              where: {
                sneakerId_sizeId: {
                  sneakerId: sneaker.id,
                  sizeId: existingStockInDb.sizeId,
                },
              },
            });
          } else {
            await prisma.sneakerSizeStock.update({
              where: {
                sneakerId_sizeId: {
                  sneakerId: sneaker.id,
                  sizeId: existingStockInDb.sizeId,
                },
              },
              data: {
                quantity: 0,
              },
            });
          }
        }
      }

      return sneaker;
    });

    return this.getBySlugSneaker(updatedSneaker.slug);
  }

  async deleteSneaker(slug: string) {
    const sneakerToDelete = await this.getBySlugSneaker(slug);

    await this.prisma.$transaction(async prisma => {
      await prisma.orderItem.deleteMany({
        where: { sneakerId: sneakerToDelete.id },
      });

      await prisma.sneakerSizeStock.deleteMany({
        where: { sneakerId: sneakerToDelete.id },
      });

      await prisma.sneakerInfo.delete({
        where: { sneakerId: sneakerToDelete.id },
      });

      await prisma.sneaker.delete({
        where: { slug: slug },
      });
    });

    return { message: 'Кроссовки успешно удалены' };
  }
}

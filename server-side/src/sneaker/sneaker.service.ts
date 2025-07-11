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
        stocks: { include: { size: true } },
        sneakerInfo: true,
      },
    });

    return sneakers;
  }

  async getBySlugSneaker(slug: string) {
    const sneaker = await this.prisma.sneaker.findUnique({
      where: {
        slug,
      },
      include: {
        brand: true,
        color: true,
        reviews: true,
        stocks: { include: { size: true } },
        sneakerInfo: true,
      },
    });

    if (!sneaker)
      throw new NotFoundException('Кроссовки с таким URL не найдены');

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

    const sneakers = await this.prisma.sneaker.findMany({
      where: {
        id: {
          in: sneakerIds,
        },
      },
      include: {
        brand: true,
        color: true,
        reviews: true,
      },
    });

    const sortedSneakers = sneakerIds
      .map(id => sneakers.find(s => s.id === id))
      .filter(Boolean);

    return sortedSneakers;
  }

  async getSimilarSneakers(slug: string) {
    const currentSneaker = await this.getBySlugSneaker(slug);

    if (!currentSneaker.brand) {
      throw new NotFoundException(
        'У текущих кроссовок отсутствует информация о бренде для поиска похожих',
      );
    }

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
        reviews: true,
      },
    });

    return sneakers;
  }

  async createSneaker(dto: CreateSneakerDto) {
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

      await prisma.sneakerSizeStock.deleteMany({
        where: { sneakerId: existingSneaker.id },
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

    return this.getBySlugSneaker(updatedSneaker.slug);
  }

  async deleteSneaker(slug: string) {
    await this.getBySlugSneaker(slug);

    return this.prisma.sneaker.delete({
      where: {
        slug,
      },
    });
  }
}

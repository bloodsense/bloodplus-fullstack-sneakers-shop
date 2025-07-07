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

  async getByIdSneaker(id: string) {
    const sneaker = await this.prisma.sneaker.findUnique({
      where: {
        id,
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
      throw new NotFoundException('Кроссовки с таким ID не найдены');

    return sneaker;
  }

  async getByBrand(brandId: string) {
    const sneakers = await this.prisma.sneaker.findMany({
      where: {
        brand: {
          id: brandId,
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

  async getMostPopularSneakers() {
    const mostPopularSneakers = await this.prisma.orderItem.groupBy({
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

    const sneakerIds = mostPopularSneakers.map(item => item.sneakerId);

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

  async getSimilarSneakers(id: string) {
    const currentSneaker = await this.getByIdSneaker(id);

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

    return this.getByIdSneaker(newSneaker.id);
  }

  async updateSneaker(id: string, dto: CreateSneakerDto) {
    const sneakerExists = await this.prisma.sneaker.count({ where: { id } });
    if (sneakerExists === 0) {
      throw new NotFoundException('Кроссовки с таким ID не найдены');
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
        where: { id },
        data: {
          name: dto.name,
          price: dto.price,
          images: dto.images,
          description: dto.description,
          colorId: dto.colorId,
          brandId: dto.brandId,
        },
      });

      await prisma.sneakerInfo.upsert({
        where: { sneakerId: id },
        update: { ...dto.sneakerInfo },
        create: {
          ...dto.sneakerInfo,
          sneaker: { connect: { id } },
        },
      });

      await prisma.sneakerSizeStock.deleteMany({
        where: { sneakerId: id },
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

    return this.getByIdSneaker(updatedSneaker.id);
  }

  async deleteSneaker(id: string) {
    await this.getByIdSneaker(id);

    return this.prisma.sneaker.delete({
      where: {
        id,
      },
    });
  }
}

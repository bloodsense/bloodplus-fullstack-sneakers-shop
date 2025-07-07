import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getByIdReview(id: string, userId: string) {
    const review = await this.prisma.review.findUnique({
      where: {
        id,
        userId,
      },
      include: {
        user: true,
      },
    });

    if (!review) {
      throw new NotFoundException('Данный отзыв не найден');
    }

    return review;
  }

  async getReviewsBySneaker(sneakerId: string) {
    const sneakerExists = await this.prisma.sneaker.count({
      where: { id: sneakerId },
    });

    if (sneakerExists === 0)
      throw new NotFoundException('Кроссовки не найдены');

    return this.prisma.review.findMany({
      where: {
        sneakerId: sneakerId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createReview(userId: string, sneakerId: string, dto: ReviewDto) {
    return this.prisma.review.create({
      data: {
        ...dto,
        sneaker: {
          connect: {
            id: sneakerId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
      },
    });
  }

  async updateReview(id: string, userId: string, dto: ReviewDto) {
    await this.getByIdReview(id, userId);

    return this.prisma.review.update({
      where: {
        id,
        userId,
      },
      data: dto,
    });
  }

  async deleteReview(id: string, userId: string) {
    await this.getByIdReview(id, userId);

    return this.prisma.review.delete({
      where: {
        id,
        userId,
      },
    });
  }
}

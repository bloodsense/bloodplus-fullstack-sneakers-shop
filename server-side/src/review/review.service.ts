import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './dto/review.dto';
import { UserRole } from 'generated/prisma';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getReviewsBySneakerSlug(sneakerSlug: string) {
    const sneaker = await this.prisma.sneaker.findUnique({
      where: { slug: sneakerSlug },
      select: { id: true },
    });

    if (!sneaker) {
      throw new NotFoundException('Кроссовок не существует');
    }

    const reviews = await this.prisma.review.findMany({
      where: { sneakerId: sneaker.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            picture: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (reviews.length == 0)
      throw new NotFoundException('У этих кроссовок пока нет отзывов');

    return reviews;
  }

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
    const existingReview = await this.prisma.review.findFirst({
      where: {
        userId,
        sneakerId,
      },
    });

    if (existingReview) {
      throw new BadRequestException('Вы уже оставили отзыв на эти кроссовки');
    }

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

  async updateReview(reviewId: string, userId: string, dto: ReviewDto) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
      include: { user: true },
    });

    if (!review) {
      throw new NotFoundException('Отзыв не найден');
    }

    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser) {
      throw new NotFoundException('Пользователь не найден');
    }

    if (review.userId !== userId && currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'У вас нет прав для обновления этого отзыва',
      );
    }

    return this.prisma.review.update({
      where: { id: reviewId },
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

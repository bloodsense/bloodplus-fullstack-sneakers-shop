import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { Auth } from 'src/decorators/auth.decorator';
import { ReviewDto } from './dto/review.dto';
import { CurrentUser } from 'src/user/decorators/user.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Auth()
  @Get('/:id')
  async getByIdReview(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.reviewService.getByIdReview(id, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('/:sneakerId')
  async createReview(
    @CurrentUser('id') userId: string,
    @Param('sneakerId') sneakerId: string,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewService.createReview(userId, sneakerId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('/:id')
  async updateReview(
    @CurrentUser('id') userId: string,
    @Param('id') reviewId: string,
    @Body() dto: ReviewDto,
  ) {
    return this.reviewService.updateReview(reviewId, userId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete('/:id')
  async deleteReview(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.reviewService.deleteReview(id, userId);
  }
}

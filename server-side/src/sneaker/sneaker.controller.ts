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
import { SneakerService } from './sneaker.service';
import { CreateSneakerDto } from './dto/sneaker.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { UserRole } from 'generated/prisma';

@Controller()
export class SneakerController {
  constructor(private readonly sneakerService: SneakerService) {}

  @Get()
  async getAllSneakers() {
    return this.sneakerService.getAllSneakers();
  }

  @Get(':slug')
  async getBySlugSneaker(@Param('slug') slug: string) {
    return this.sneakerService.getBySlugSneaker(slug);
  }

  @Get(':brand/:brandSlug')
  async getByBrand(@Param('brandSlug') brandSlug: string) {
    return this.sneakerService.getByBrandSlug(brandSlug);
  }

  @Get('popular')
  async getPopularSneakers() {
    return this.sneakerService.getPopularSneakers();
  }

  @Get(':slug/similar')
  async getSimilarSneakersBySlug(@Param('slug') slug: string) {
    return this.sneakerService.getSimilarSneakers(slug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/')
  @Auth(UserRole.ADMIN)
  async createSneaker(@Body() dto: CreateSneakerDto) {
    return this.sneakerService.createSneaker(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':slug')
  @Auth(UserRole.ADMIN)
  async updateSneaker(
    @Param('slug') slug: string,
    @Body() dto: CreateSneakerDto,
  ) {
    return this.sneakerService.updateSneaker(slug, dto);
  }

  @HttpCode(200)
  @Delete(':slug')
  @Auth(UserRole.ADMIN)
  async deleteSneaker(@Param('slug') slug: string) {
    return this.sneakerService.deleteSneaker(slug);
  }
}

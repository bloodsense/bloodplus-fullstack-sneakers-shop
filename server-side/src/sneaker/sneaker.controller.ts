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

@Controller('/')
export class SneakerController {
  constructor(private readonly sneakerService: SneakerService) {}

  @Get()
  async getAllSneakers() {
    return this.sneakerService.getAllSneakers();
  }

  @Get('browse/brand/:brandSlug')
  async getSneakersByBrand(@Param('brandSlug') brandSlug: string) {
    return this.sneakerService.getSneakersByBrand(brandSlug);
  }

  @Get('browse/men')
  async getMenSneakers() {
    return this.sneakerService.getSneakersByGender('Мужской');
  }

  @Get('browse/women')
  async getWomenSneakers() {
    return this.sneakerService.getSneakersByGender('Женский');
  }

  @Get('browse/season/:seasonSlug')
  async getSneakersBySeason(@Param('seasonSlug') seasonSlug: string) {
    return this.sneakerService.getSneakersBySeason(seasonSlug);
  }

  @Get('watch/:brandSlug/:sneakerSlug')
  async getSneakersWithBrand(
    @Param('brandSlug') brandSlug: string,
    @Param('sneakerSlug') sneakerSlug: string,
  ) {
    return this.sneakerService.getSneakersWithBrand(brandSlug, sneakerSlug);
  }

  @Get('watch/popular')
  async getPopularSneakers() {
    return this.sneakerService.getPopularSneakers();
  }

  @Get('similar/:slug')
  async getSimilarSneakersBySlug(@Param('slug') slug: string) {
    return this.sneakerService.getSimilarSneakers(slug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('admin/sneakers/create')
  @Auth(UserRole.ADMIN)
  async createSneaker(@Body() dto: CreateSneakerDto) {
    return this.sneakerService.createSneaker(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('admin/sneakers/put/:slug')
  @Auth(UserRole.ADMIN)
  async updateSneaker(
    @Param('slug') slug: string,
    @Body() dto: CreateSneakerDto,
  ) {
    return this.sneakerService.updateSneaker(slug, dto);
  }

  @HttpCode(200)
  @Delete('admin/sneakers/delete/:slug')
  @Auth(UserRole.ADMIN)
  async deleteSneaker(@Param('slug') slug: string) {
    return this.sneakerService.deleteSneaker(slug);
  }
}

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

@Controller('sneakers')
export class SneakerController {
  constructor(private readonly sneakerService: SneakerService) {}

  @Get()
  async getAllSneakers() {
    return this.sneakerService.getAllSneakers();
  }

  @Get(':id')
  async getByIdSneaker(@Param('id') id: string) {
    return this.sneakerService.getByIdSneaker(id);
  }

  @Get('brand/:brandId')
  async getByBrand(@Param('brandId') brandId: string) {
    return this.sneakerService.getByBrand(brandId);
  }

  @Get('most-popular')
  async getMostPopularSneakers() {
    return this.sneakerService.getMostPopularSneakers();
  }

  @Get(':id/similar')
  async getSimilarSneakers(@Param('id') id: string) {
    return this.sneakerService.getSimilarSneakers(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth(UserRole.ADMIN)
  async createSneaker(@Body() dto: CreateSneakerDto) {
    return this.sneakerService.createSneaker(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth(UserRole.ADMIN)
  async updateSneaker(@Param('id') id: string, @Body() dto: CreateSneakerDto) {
    return this.sneakerService.updateSneaker(id, dto);
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth(UserRole.ADMIN)
  async deleteSneaker(@Param('id') id: string) {
    return this.sneakerService.deleteSneaker(id);
  }
}

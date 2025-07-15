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
import { Auth } from 'src/decorators/auth.decorator';
import { BrandService } from './brand.service';
import { BrandDto } from './dto/brand.dto';
import { UserRole } from 'generated/prisma';

@Controller('/')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('admin/brands/getBySlug/:slug')
  @Auth(UserRole.ADMIN)
  async getBySlugBrand(@Param('slug') slug: string) {
    return this.brandService.getBySlugBrand(slug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('admin/brands/create')
  @Auth(UserRole.ADMIN)
  async createBrand(@Body() dto: BrandDto) {
    return this.brandService.createBrand(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('admin/brands/put/:slug')
  @Auth(UserRole.ADMIN)
  async updateBrand(@Param('slug') slug: string, @Body() dto: BrandDto) {
    return this.brandService.updateBrand(slug, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('admin/brands/delete/:slug')
  @Auth(UserRole.ADMIN)
  async deleteBrand(@Param('slug') slug: string) {
    return this.brandService.deleteBrand(slug);
  }
}

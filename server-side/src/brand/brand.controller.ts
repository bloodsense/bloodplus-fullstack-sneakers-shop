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

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get('/:id')
  @Auth(UserRole.ADMIN)
  async getByIdBrand(@Param('id') id: string) {
    return this.brandService.getByIdBrand(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/create')
  @Auth(UserRole.ADMIN)
  async createBrand(@Body() dto: BrandDto) {
    return this.brandService.createBrand(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/update/:id')
  @Auth(UserRole.ADMIN)
  async updateBrand(@Param('id') id: string, @Body() dto: BrandDto) {
    return this.brandService.updateBrand(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth(UserRole.ADMIN)
  async deleteBrand(@Param('id') id: string) {
    return this.brandService.deleteBrand(id);
  }
}

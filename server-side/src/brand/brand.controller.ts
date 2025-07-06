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

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Auth()
  @Get('/:id')
  async getByIdBrand(@Param('id') id: string) {
    return this.brandService.getByIdBrand(id);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Post('/create')
  async createBrand(@Body() dto: BrandDto) {
    return this.brandService.createBrand(dto);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Put('/update/:id')
  async updateBrand(@Param('id') id: string, @Body() dto: BrandDto) {
    return this.brandService.updateBrand(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Delete(':id')
  async deleteBrand(@Param('id') id: string) {
    return this.brandService.deleteBrand(id);
  }
}

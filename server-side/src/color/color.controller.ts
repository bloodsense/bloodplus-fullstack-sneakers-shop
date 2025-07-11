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
import { ColorService } from './color.service';
import { Auth } from 'src/decorators/auth.decorator';
import { ColorDto } from './dto/color.dto';
import { UserRole } from 'generated/prisma';

@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get(':slug')
  @Auth(UserRole.ADMIN)
  async getBySlugColor(@Param('slug') slug: string) {
    return this.colorService.getBySlugColor(slug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/')
  @Auth(UserRole.ADMIN)
  async createColor(@Body() dto: ColorDto) {
    return this.colorService.createColor(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':slug')
  @Auth(UserRole.ADMIN)
  async updateColor(@Param('slug') slug: string, @Body() dto: ColorDto) {
    return this.colorService.updateColor(slug, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':slug')
  @Auth(UserRole.ADMIN)
  async deleteColor(@Param('slug') slug: string) {
    return this.colorService.deleteColor(slug);
  }
}

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

  @Get('/:id')
  @Auth(UserRole.ADMIN)
  async getByIdColor(@Param('id') id: string) {
    return this.colorService.getByIdColor(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/create')
  @Auth(UserRole.ADMIN)
  async createColor(@Body() dto: ColorDto) {
    return this.colorService.createColor(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('/update/:id')
  @Auth(UserRole.ADMIN)
  async updateColor(@Param('id') id: string, @Body() dto: ColorDto) {
    return this.colorService.updateColor(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth(UserRole.ADMIN)
  async deleteColor(@Param('id') id: string) {
    return this.colorService.deleteColor(id);
  }
}

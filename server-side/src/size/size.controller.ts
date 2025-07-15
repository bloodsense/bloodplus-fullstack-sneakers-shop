// src/size/size.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto, UpdateSizeDto } from './dto/size.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { UserRole } from 'generated/prisma';

@Controller('/')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Get('admin/sizes/getAll')
  @HttpCode(200)
  @Auth(UserRole.ADMIN)
  async getAllSizes() {
    return this.sizeService.getAllSizes();
  }

  @Get('admin/sizes/getById/:id')
  @HttpCode(200)
  @Auth(UserRole.ADMIN)
  async getById(@Param('id') id: string) {
    return this.sizeService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('admin/sizes/create')
  @Auth(UserRole.ADMIN)
  async createSize(@Body() dto: CreateSizeDto) {
    return this.sizeService.createSize(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('admin/sizes/put/:id')
  @Auth(UserRole.ADMIN)
  async updateSize(@Param('id') id: string, @Body() dto: UpdateSizeDto) {
    return this.sizeService.updateSize(id, dto);
  }

  @HttpCode(200)
  @Delete('admin/sizes/delete/:id')
  @Auth(UserRole.ADMIN)
  async deleteSize(@Param('id') id: string) {
    return this.sizeService.deleteSize(id);
  }
}

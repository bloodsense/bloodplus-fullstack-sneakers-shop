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
import { UserRole } from 'generated/prisma';
import { SeasonService } from './season.service';
import { SeasonDto } from './dto/season.dto';

@Controller('/')
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Get('/seasons/all')
  async getAllSeasons() {
    return this.seasonService.getAllSeasons();
  }

  @Get('admin/seasons/getBySlug/:slug')
  @Auth(UserRole.ADMIN)
  async getBySlugSeason(@Param('slug') slug: string) {
    return this.seasonService.getBySlugSeason(slug);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('admin/seasons/create')
  @Auth(UserRole.ADMIN)
  async createSeason(@Body() dto: SeasonDto) {
    return this.seasonService.createSeason(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('admin/seasons/put/:slug')
  @Auth(UserRole.ADMIN)
  async updateSeason(@Param('slug') slug: string, @Body() dto: SeasonDto) {
    return this.seasonService.updateSeason(slug, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('admin/seasons/delete/:slug')
  @Auth(UserRole.ADMIN)
  async deleteSeason(@Param('slug') slug: string) {
    return this.seasonService.deleteSeason(slug);
  }
}

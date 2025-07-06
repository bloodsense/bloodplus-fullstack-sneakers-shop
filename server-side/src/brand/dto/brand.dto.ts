import { IsString } from 'class-validator';

export class BrandDto {
  @IsString({
    message: 'Укажите название бренда',
  })
  name: string;
}

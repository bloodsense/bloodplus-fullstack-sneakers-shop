import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class BrandDto {
  @IsString({
    message: 'Укажите название бренда',
  })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Слаг бренда не должен быть пустым' })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Слаг должен содержать только строчные буквы, цифры и дефисы',
  })
  slug: string;
}

import { IsNotEmpty, IsString } from 'class-validator';

export class SeasonDto {
  @IsString({
    message: 'Укажите сезон',
  })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Слаг сезона не должен быть пустым' })
  slug: string;
}

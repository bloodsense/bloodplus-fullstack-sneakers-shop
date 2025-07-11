import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class SneakerInfoCUDto {
  @IsString({ message: 'Пол должен быть указан' })
  @IsNotEmpty({ message: 'Пол не может быть пустым' })
  gender: string;

  @IsString({ message: 'Сезон должен быть указан' })
  @IsNotEmpty({ message: 'Сезон не может быть пустым' })
  season: string;

  @IsOptional()
  @IsString({ message: 'Защита должна быть строкой' })
  protection?: string;

  @IsOptional()
  @IsString({ message: 'Гарантия должна быть строкой' })
  warranty?: string;

  @IsOptional()
  @IsString({ message: 'Срок гарантии должен быть строкой' })
  warrantyTime?: string;

  @IsOptional()
  @IsString({ message: 'Страна должна быть строкой' })
  country?: string;

  @IsOptional()
  @IsString({ message: 'Код должен быть строкой' })
  code?: string;
}

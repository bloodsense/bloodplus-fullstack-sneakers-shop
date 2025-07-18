import {
  ArrayMinSize,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SneakerInfoCUDto } from './sneaker-info.dto';
import { SneakerStockCUDto } from './sneaker-stock.dto';

export class CreateSneakerDto {
  @IsString({ message: 'Укажите название модели' })
  @IsNotEmpty({ message: 'Название модели не может быть пустым' })
  name: string;

  @IsNumber({}, { message: 'Цена должна быть указана числом' })
  @IsNotEmpty({ message: 'Цена не может быть пустой' })
  price: number;

  @IsString({ each: true, message: 'Неправильный путь к изображению' })
  @ArrayMinSize(1, { message: 'Загрузите не менее одного изображения' })
  @IsNotEmpty({
    each: true,
    message: 'Путь к изображению не может быть пустым',
  })
  images: string[];

  @IsString({ message: 'Укажите описание модели' })
  @IsNotEmpty({ message: 'Описание модели не может быть пустым' })
  description: string;

  @IsString({ message: 'Идентификатор цвета должен быть строкой' })
  @IsNotEmpty({ message: 'Выберите цвет' })
  colorId: string;

  @IsString({ message: 'Идентификатор бренда должен быть строкой' })
  @IsNotEmpty({ message: 'Выберите бренд' })
  brandId: string;

  @IsString({ message: 'Идентификатор сезона должен быть строкой' })
  @IsNotEmpty({ message: 'Выберите сезон' })
  seasonId: string;

  @IsString({ message: 'URL (slug) должен быть строкой' })
  @IsNotEmpty({ message: 'URL (slug) не может быть пустым' })
  slug: string;

  @ValidateNested()
  @Type(() => SneakerInfoCUDto)
  sneakerInfo: SneakerInfoCUDto;

  @ArrayNotEmpty({
    message: 'Необходимо указать хотя бы один размер и количество',
  })
  @ValidateNested({ each: true })
  @Type(() => SneakerStockCUDto)
  stocks: SneakerStockCUDto[];
}

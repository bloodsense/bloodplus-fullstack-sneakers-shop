import { IsString } from 'class-validator';

export class ColorDto {
  @IsString({
    message: 'Укажите цвет',
  })
  value: string;

  @IsString({
    message: 'Укажите значение цвета',
  })
  hex: string;
}

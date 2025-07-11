import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ColorDto {
  @IsString({
    message: 'Укажите цвет',
  })
  value: string;

  @IsString({
    message: 'Укажите значение цвета',
  })
  hex: string;

  @IsString()
  @IsNotEmpty({ message: 'Слаг цвета не должен быть пустым' })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Слаг должен содержать только строчные буквы, цифры и дефисы',
  })
  slug: string;
}

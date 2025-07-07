import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class ReviewDto {
  @IsString({ message: 'Текст отзыва должен быть строкой' })
  @IsNotEmpty({ message: 'Текст отзыва не может быть пустым' })
  text: string;

  @IsNumber({}, { message: 'Рейтинг должен быть числом' })
  @IsNotEmpty({ message: 'Рейтинг не может быть пустым' })
  @Min(1, { message: 'Минимальный рейтинг - 1' })
  @Max(5, { message: 'Максимальный рейтинг - 5' })
  rating: number;
}

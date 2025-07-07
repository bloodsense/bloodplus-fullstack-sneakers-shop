import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class SneakerStockCUDto {
  @IsString({ message: 'ID размера должен быть строкой' })
  @IsNotEmpty({ message: 'ID размера не может быть пустым' })
  sizeId: string;

  @IsNumber({}, { message: 'Количество должно быть числом' })
  @Min(0, { message: 'Количество не может быть отрицательным' })
  quantity: number;
}

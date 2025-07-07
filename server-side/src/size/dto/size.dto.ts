import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { SizeType } from 'generated/prisma';

export class CreateSizeDto {
  @IsString({ message: 'Значение размера должно быть строкой' })
  @IsNotEmpty({ message: 'Значение размера не может быть пустым' })
  value: string;

  @IsEnum(SizeType, { message: 'Неверный тип размера (должен быть RU или EU)' })
  @IsNotEmpty({ message: 'Тип размера не может быть пустым' })
  type: SizeType;
}

export class UpdateSizeDto extends CreateSizeDto {}

import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { OrderStatus } from 'generated/prisma';

export class OrderDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message:
      'Статус заказа должен быть указан, например: ' +
      Object.values(OrderStatus).join(', '),
  })
  status: OrderStatus;

  @IsArray({ message: 'В заказе нет товаров' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

export class OrderItemDto {
  @IsNumber({}, { message: 'Количество товара должен быть числом' })
  @Min(1)
  quantity: number;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  price: number;

  @IsString({ message: 'ID кроссовок должен быть строкой' })
  @IsNotEmpty()
  sneakerId: string;

  @IsString()
  @IsNotEmpty()
  sizeId: string;
}

import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/decorators/auth.decorator';
import { OrderDto } from './dto/order.dto';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { PaymentStatusDto } from './dto/payment.status.dto';

@Controller('/')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('orders/create')
  @Auth()
  async checkout(@Body() dto: OrderDto, @CurrentUser('id') userId: string) {
    return this.orderService.createPayment(dto, userId);
  }

  @HttpCode(200)
  @Post('orders/status')
  @Auth()
  async updateStatus(@Body() dto: PaymentStatusDto) {
    return this.orderService.updatePayment(dto);
  }
}

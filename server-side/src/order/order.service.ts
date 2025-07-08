import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ICapturePayment, YooCheckout } from '@a2seven/yoo-checkout';
import { OrderDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/payment.status.dto';
import { OrderStatus } from 'generated/prisma';

const shopId = process.env.YOOKASSA_SHOP_ID;
const secretKey = process.env.YOOKASSA_SECRET_KEY;

if (!shopId || !secretKey) {
  throw new Error(
    'Значения YOOKASSA_SHOP_ID или YOOKASSA_SECRET_KEY в переменном окружении (.env) не найдены',
  );
}

const checkout = new YooCheckout({
  shopId: shopId,
  secretKey: secretKey,
});

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createPayment(dto: OrderDto, userId: string) {
    const orderItems = dto.items.map(item => ({
      quantity: item.quantity,
      price: item.price,
      sneakerSizeStock: {
        connect: {
          sneakerId_sizeId: {
            sneakerId: item.sneakerId,
            sizeId: item.sizeId,
          },
        },
      },
    }));

    const total = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const order = await this.prisma.order.create({
      data: {
        status: dto.status,
        items: {
          create: orderItems,
        },
        totalAmount: total,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const payment = await checkout.createPayment({
      amount: {
        value: total.toFixed(2),
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: `${process.env.CLIENT_URL}/thanks`,
      },
      description: `Оплата заказа в магазине bloodplus. ID Вашего платежа: #${order.id}`,
    });

    return payment;
  }

  async updatePayment(dto: PaymentStatusDto) {
    if (dto.event === 'payment.waiting_for_capture') {
      const capturePayment: ICapturePayment = {
        amount: {
          value: dto.object.amount.value,
          currency: dto.object.amount.currency,
        },
      };

      return checkout.capturePayment(dto.object.id, capturePayment);
    }

    if (dto.event === 'payment.succeeded') {
      const orderId = dto.object.description.split('#')[1];

      await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: OrderStatus.SUCCESS,
        },
      });

      return true;
    }

    if (dto.event === 'payment_cancelled') {
      const orderId = dto.object.description.split('#')[1];

      await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: OrderStatus.CANCELLED,
        },
      });

      return true;
    }

    return true;
  }
}

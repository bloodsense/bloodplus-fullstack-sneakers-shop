import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ColorModule } from './color/color.module';
import { BrandModule } from './brand/brand.module';
import { FileModule } from './file/file.module';
import { SneakerModule } from './sneaker/sneaker.module';
import { SizeModule } from './size/size.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
import { SeasonModule } from './season/season.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ColorModule,
    BrandModule,
    SeasonModule,
    FileModule,
    SneakerModule,
    SizeModule,
    ReviewModule,
    OrderModule,
  ],
})
export class AppModule {}

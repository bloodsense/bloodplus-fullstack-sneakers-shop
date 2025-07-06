import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ColorModule } from './color/color.module';
import { BrandModule } from './brand/brand.module';
import { FileModule } from './file/file.module';
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, ColorModule, BrandModule, FileModule],
})
export class AppModule {}

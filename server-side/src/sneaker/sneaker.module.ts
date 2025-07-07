import { Module } from '@nestjs/common';
import { SneakerService } from './sneaker.service';
import { SneakerController } from './sneaker.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SneakerController],
  providers: [SneakerService, PrismaService],
})
export class SneakerModule {}

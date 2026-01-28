import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { PrismaService } from '../prisma.service'; // <--- Check this path

@Module({
  controllers: [SalesController],
  providers: [SalesService, PrismaService], // <--- This line fixes your error
})
export class SalesModule {}
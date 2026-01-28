import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service'; // <--- Import this
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [AuthModule, ProductsModule, SalesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService], // <--- Add it here
  exports: [PrismaService], // <--- Export it for other modules to use
})
export class AppModule {}
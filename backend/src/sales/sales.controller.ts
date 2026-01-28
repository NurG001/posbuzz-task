import { Controller, Get, Post, Body } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() body: { productId: number; quantity: number }) {
    return this.salesService.create(body);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }
}
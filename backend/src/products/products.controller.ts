import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() body: any) {
    // Ensure numbers are numbers
    const data = {
      ...body,
      price: parseFloat(body.price),
      stock_quantity: parseInt(body.stock_quantity),
    };
    return this.productsService.create(data);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const data = { ...body };
    if (data.price) data.price = parseFloat(data.price);
    if (data.stock_quantity) data.stock_quantity = parseInt(data.stock_quantity);
    return this.productsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
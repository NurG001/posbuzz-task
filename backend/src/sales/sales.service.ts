import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSaleDto: { productId: number; quantity: number }) {
    const { productId, quantity } = createSaleDto;

    // Transaction: Check stock AND deduct it at the same time
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({ where: { id: productId } });

      if (!product) throw new BadRequestException('Product not found');
      if (product.stock_quantity < quantity) {
        throw new BadRequestException(`Insufficient stock. Only ${product.stock_quantity} left.`);
      }

      // Deduct stock
      await tx.product.update({
        where: { id: productId },
        data: { stock_quantity: { decrement: quantity } },
      });

      // Create Sale
      return tx.sale.create({
        data: {
          productId,
          quantity,
          totalPrice: Number(product.price) * quantity,
        },
      });
    });
  }

  findAll() {
    return this.prisma.sale.findMany({ include: { product: true }, orderBy: { createdAt: 'desc' } });
  }
}
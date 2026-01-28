import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      name: 'PosBuzz API',
      version: '1.0.0',
      status: 'active',
      timestamp: new Date().toISOString(),
      author: 'Ismail Mahmud Nur', // Customized for you
      documentation: 'This API serves the PosBuzz POS system.',
      endpoints: {
        products: '/products',
        sales: '/sales',
        auth: '/auth/login',
      },
    };
  }
}
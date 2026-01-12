import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { OrderDetail } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // GET /orders - 全注文取得（ユーザー・商品情報付き）
  @Get()
  findAll(): OrderDetail[] {
    return this.ordersService.findAll();
  }

  // GET /orders/user/:userId - ユーザーの注文を取得
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): OrderDetail[] {
    return this.ordersService.findByUserId(Number(userId));
  }

  // POST /orders - 注文作成（在庫チェック付き）
  @Post()
  create(
    @Body() body: { userId: number; productId: number; quantity: number },
  ): OrderDetail | { error: string } {
    return this.ordersService.create(body.userId, body.productId, body.quantity);
  }
}

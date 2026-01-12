import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { OrderWithUser } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // GET /orders - 全注文取得（ユーザー情報付き）
  @Get()
  findAll(): OrderWithUser[] {
    return this.ordersService.findAll();
  }

  // GET /orders/user/:userId - ユーザーの注文を取得
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): OrderWithUser[] {
    return this.ordersService.findByUserId(Number(userId));
  }

  // POST /orders - 注文作成
  @Post()
  create(
    @Body() body: { userId: number; product: string; quantity: number },
  ): OrderWithUser {
    return this.ordersService.create(body.userId, body.product, body.quantity);
  }
}

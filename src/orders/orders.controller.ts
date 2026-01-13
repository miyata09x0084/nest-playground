import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService, OrderDetail } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // GET /orders - 全注文取得（ユーザー・商品情報付き）
  @Get()
  findAll(): Promise<OrderDetail[]> {
    return this.ordersService.findAll();
  }

  // GET /orders/user/:userId - ユーザーの注文を取得
  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number): Promise<OrderDetail[]> {
    return this.ordersService.findByUserId(userId);
  }

  // POST /orders - 注文作成（在庫チェック付き）
  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<OrderDetail> {
    return this.ordersService.create(createOrderDto);
  }
}

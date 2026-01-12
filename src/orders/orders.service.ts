import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { LoggerService } from '../common/logger.service';
import type { User } from '../users/users.service';
import type { Product } from '../products/products.service';

export interface Order {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
}

export interface OrderDetail extends Order {
  user?: User;
  product?: Product;
  totalPrice?: number;
}

@Injectable()
export class OrdersService {
  private readonly context = 'OrdersService';

  private orders: Order[] = [
    { id: 1, userId: 1, productId: 1, quantity: 1 },
    { id: 2, userId: 2, productId: 2, quantity: 2 },
    { id: 3, userId: 1, productId: 3, quantity: 1 },
  ];

  constructor(
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly logger: LoggerService,
  ) {}

  // 注文に詳細情報を付加
  private enrichOrder(order: Order): OrderDetail {
    const user = this.usersService.findOne(order.userId);
    const product = this.productsService.findOne(order.productId);
    return {
      ...order,
      user,
      product,
      totalPrice: product ? product.price * order.quantity : 0,
    };
  }

  // 全注文を取得（ユーザー・商品情報付き）
  findAll(): OrderDetail[] {
    this.logger.log(this.context, 'Finding all orders');
    return this.orders.map((order) => this.enrichOrder(order));
  }

  // 特定ユーザーの注文を取得
  findByUserId(userId: number): OrderDetail[] {
    return this.orders
      .filter((order) => order.userId === userId)
      .map((order) => this.enrichOrder(order));
  }

  // 注文を作成（在庫チェック付き）
  create(
    userId: number,
    productId: number,
    quantity: number,
  ): OrderDetail | { error: string } {
    const user = this.usersService.findOne(userId);
    if (!user) {
      return { error: 'User not found' };
    }

    const product = this.productsService.findOne(productId);
    if (!product) {
      return { error: 'Product not found' };
    }

    // 在庫チェックと減少
    const stockDecreased = this.productsService.decreaseStock(
      productId,
      quantity,
    );
    if (!stockDecreased) {
      return { error: 'Insufficient stock' };
    }

    const newOrder: Order = {
      id: this.orders.length + 1,
      userId,
      productId,
      quantity,
    };
    this.orders.push(newOrder);

    return this.enrichOrder(newOrder);
  }
}

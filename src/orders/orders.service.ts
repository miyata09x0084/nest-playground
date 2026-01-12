import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import type { User } from '../users/users.service';

export interface Order {
  id: number;
  userId: number;
  product: string;
  quantity: number;
}

export interface OrderWithUser extends Order {
  user?: User;
}

@Injectable()
export class OrdersService {
  private orders: Order[] = [
    { id: 1, userId: 1, product: 'ノートPC', quantity: 1 },
    { id: 2, userId: 2, product: 'マウス', quantity: 2 },
    { id: 3, userId: 1, product: 'キーボード', quantity: 1 },
  ];

  // UsersServiceを注入（モジュール間の依存）
  constructor(private readonly usersService: UsersService) {}

  // 全注文を取得（ユーザー情報付き）
  findAll(): OrderWithUser[] {
    return this.orders.map((order) => ({
      ...order,
      user: this.usersService.findOne(order.userId),
    }));
  }

  // 特定ユーザーの注文を取得
  findByUserId(userId: number): OrderWithUser[] {
    const user = this.usersService.findOne(userId);
    return this.orders
      .filter((order) => order.userId === userId)
      .map((order) => ({ ...order, user }));
  }

  // 注文を作成
  create(userId: number, product: string, quantity: number): OrderWithUser {
    const user = this.usersService.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const newOrder: Order = {
      id: this.orders.length + 1,
      userId,
      product,
      quantity,
    };
    this.orders.push(newOrder);

    return { ...newOrder, user };
  }
}

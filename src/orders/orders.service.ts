import { Injectable, BadRequestException } from '@nestjs/common';
import { Order, User, Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { LoggerService } from '../common/logger.service';
import { CreateOrderDto } from './dto/create-order.dto';

// リレーションを含む注文の型
export type OrderWithRelations = Order & {
  user: User;
  product: Product;
};

// 詳細情報付きの注文
export interface OrderDetail {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  user: User;
  product: Product;
  totalPrice: number;
}

@Injectable()
export class OrdersService {
  private readonly context = 'OrdersService';

  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    private readonly logger: LoggerService,
  ) {}

  // 注文に詳細情報を付加
  private enrichOrder(order: OrderWithRelations): OrderDetail {
    const price = order.product.price instanceof Decimal
      ? order.product.price.toNumber()
      : Number(order.product.price);

    return {
      id: order.id,
      userId: order.userId,
      productId: order.productId,
      quantity: order.quantity,
      createdAt: order.createdAt,
      user: order.user,
      product: order.product,
      totalPrice: price * order.quantity,
    };
  }

  // 全注文を取得（ユーザー・商品情報付き）
  async findAll(): Promise<OrderDetail[]> {
    this.logger.log(this.context, 'Finding all orders');
    const orders = await this.prisma.order.findMany({
      include: {
        user: true,
        product: true,
      },
    });
    return orders.map((order) => this.enrichOrder(order));
  }

  // 特定ユーザーの注文を取得
  async findByUserId(userId: number): Promise<OrderDetail[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: {
        user: true,
        product: true,
      },
    });
    return orders.map((order) => this.enrichOrder(order));
  }

  // 注文を作成（在庫チェック付き）
  async create(createOrderDto: CreateOrderDto): Promise<OrderDetail> {
    const { userId, productId, quantity } = createOrderDto;

    // ユーザー存在確認
    await this.usersService.findOne(userId);

    // 商品存在確認
    await this.productsService.findOne(productId);

    // 在庫チェックと減少
    const stockDecreased = await this.productsService.decreaseStock(
      productId,
      quantity,
    );
    if (!stockDecreased) {
      throw new BadRequestException('在庫が不足しています');
    }

    // 注文作成
    const order = await this.prisma.order.create({
      data: {
        userId,
        productId,
        quantity,
      },
      include: {
        user: true,
        product: true,
      },
    });

    return this.enrichOrder(order);
  }
}

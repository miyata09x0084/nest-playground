import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service';
import { ProductNotFoundException } from '../common/exceptions/not-found.exception';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: { name },
    });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        price: new Decimal(createProductDto.price),
        stock: createProductDto.stock,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.findOne(id);

    const data: {
      name?: string;
      price?: Decimal;
      stock?: number;
    } = {};

    if (updateProductDto.name !== undefined) {
      data.name = updateProductDto.name;
    }
    if (updateProductDto.price !== undefined) {
      data.price = new Decimal(updateProductDto.price);
    }
    if (updateProductDto.stock !== undefined) {
      data.stock = updateProductDto.stock;
    }

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async updateStock(id: number, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: {
        stock: product.stock + quantity,
      },
    });
  }

  // 在庫を減らす（注文時に使用）
  async decreaseStock(id: number, quantity: number): Promise<boolean> {
    const product = await this.findOne(id);
    if (product.stock >= quantity) {
      await this.prisma.product.update({
        where: { id },
        data: {
          stock: product.stock - quantity,
        },
      });
      return true;
    }
    return false;
  }
}

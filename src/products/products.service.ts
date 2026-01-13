import { Injectable } from '@nestjs/common';
import { ProductNotFoundException } from '../common/exceptions/not-found.exception';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'ノートPC', price: 120000, stock: 10 },
    { id: 2, name: 'マウス', price: 3000, stock: 50 },
    { id: 3, name: 'キーボード', price: 8000, stock: 30 },
    { id: 4, name: 'モニター', price: 45000, stock: 15 },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }

  findByName(name: string): Product | undefined {
    return this.products.find((p) => p.name === name);
  }

  create(name: string, price: number, stock: number): Product {
    const newProduct: Product = {
      id: this.products.length + 1,
      name,
      price,
      stock,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateStock(id: number, quantity: number): Product | undefined {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      product.stock += quantity;
    }
    return product;
  }

  // 在庫を減らす（注文時に使用）
  decreaseStock(id: number, quantity: number): boolean {
    const product = this.products.find((p) => p.id === id);
    if (product && product.stock >= quantity) {
      product.stock -= quantity;
      return true;
    }
    return false;
  }
}

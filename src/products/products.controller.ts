import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import type { Product } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // GET /products
  @Get()
  findAll(): Product[] {
    return this.productsService.findAll();
  }

  // GET /products/:id
  @Get(':id')
  findOne(@Param('id') id: string): Product | undefined {
    return this.productsService.findOne(Number(id));
  }

  // POST /products
  @Post()
  create(
    @Body() body: { name: string; price: number; stock: number },
  ): Product {
    return this.productsService.create(body.name, body.price, body.stock);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from 'src/models/product.model';
import { ProductService } from 'src/services/product.service';

@Controller('Product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  async getById(@Param() params): Promise<Product> {
    return this.productService.getProductById(params.id);
  }

  @Post()
  async createAProduct(@Body() Product: Product) {
    this.productService.createProduct(Product);
  }

  @Put()
  async UpdateAProduct(@Body() product: Product): Promise<[number, Product[]]> {
    return this.productService.updateProduct(product);
  }

  @Delete(':id')
  async DeleteAProduct(@Param() params) {
    this.productService.deleteProduct(params.id);
  }
}

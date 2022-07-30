import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/models/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async getProducts(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async getProductById(id: number): Promise<Product> {
    return this.productModel.findByPk(id);
  }

  async createProduct(product: Product) {
    this.productModel.create(product);
  }

  async updateProduct(product: Product): Promise<[number, Product[]]> {
    return this.productModel.update(product, {
      returning: true,
      where: {
        id: product.id,
      },
    });
  }

  async deleteProduct(id: number) {
    const product: Product = await this.getProductById(id);
    product.destroy();
  }
}

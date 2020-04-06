import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  find(conditions: FilterQuery<Product> = {}): Promise<Product[]> {
    return this.productModel.find(conditions).exec();
  }

  findOne(conditions: FilterQuery<Product> = {}): Promise<Product> {
    return this.productModel.findOne(conditions).exec();
  }
}

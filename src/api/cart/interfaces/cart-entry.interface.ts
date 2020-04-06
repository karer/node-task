import * as mongoose from 'mongoose';
import { Product } from '../../product/interfaces/product.interface';

export interface CartEntry extends mongoose.Document {
  product: string | Product;
  quantity: number;
}

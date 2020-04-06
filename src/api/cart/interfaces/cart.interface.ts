import * as mongoose from 'mongoose';
import { Product } from '../../product/interfaces/product.interface';

export interface Cart extends mongoose.Document {
  userId: string;
  products: Product[];
}

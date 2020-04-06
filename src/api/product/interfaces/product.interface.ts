import * as mongoose from 'mongoose';
import { Price } from './price.interface';

export interface Product extends mongoose.Document {
  name: string;
  price: Price;
  quantity: number;
  description?: string;
}

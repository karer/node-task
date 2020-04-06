import * as mongoose from 'mongoose';
import { CartEntry } from './cart-entry.interface';

export interface Cart extends mongoose.Document {
  userId: string;
  content: CartEntry[];
}

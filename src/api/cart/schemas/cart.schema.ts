import * as mongoose from 'mongoose';
import { Cart } from '../interfaces/cart.interface';
import { CartEntrySchema } from './cart-entry.schema';

export const CartSchema = new mongoose.Schema<Cart>({
  userId: { type: String, required: true, index: true },
  products: { type: [CartEntrySchema], default: [] },
});

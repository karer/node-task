import * as mongoose from 'mongoose';
import { Cart } from '../interfaces/cart.interface';

export const CartSchema = new mongoose.Schema<Cart>({
  userId: { type: String, required: true, index: true },
});

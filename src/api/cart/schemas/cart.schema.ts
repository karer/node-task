import * as mongoose from 'mongoose';
import { Cart } from '../interfaces/cart.interface';
import { ProductSchema } from '../../product/schemas/product.schema';

export const CartSchema = new mongoose.Schema<Cart>({
  userId: { type: String, required: true, index: true },
  products: [ProductSchema],
});

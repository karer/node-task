import * as mongoose from 'mongoose';
import { Product } from '../interfaces/product.interface';
import { PriceSchema } from './price.schema';

export const ProductSchema = new mongoose.Schema<Product>({
  name: { type: String, required: true },
  price: { type: PriceSchema, required: true },
  quantity: { type: Number, required: true },
  description: String,
});

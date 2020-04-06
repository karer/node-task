import * as mongoose from 'mongoose';
import { CartEntry } from '../interfaces/cart-entry.interface';

export const CartEntrySchema = new mongoose.Schema<CartEntry>({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, required: true },
});

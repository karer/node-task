import * as mongoose from 'mongoose';
import { Price } from '../interfaces/price.interface';

export const PriceSchema = new mongoose.Schema<Price>({
  amount: { type: Number, required: true },
});

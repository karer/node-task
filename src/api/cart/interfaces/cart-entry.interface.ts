import * as mongoose from 'mongoose';
import { Product } from '../../product/interfaces/product.interface';
import { ObjectID } from 'mongodb';

export interface CartEntry extends mongoose.Document {
  product: ObjectID | Product;
  quantity: number;
}

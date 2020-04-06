import * as mongoose from 'mongoose';

export interface Cart extends mongoose.Document {
  userId: string;
}

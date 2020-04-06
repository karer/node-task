import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Cart } from './interfaces/cart.interface';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class CartService {
  constructor(@InjectModel('Cart') private readonly cartModel: Model<Cart>) {}

  find(conditions: FilterQuery<Cart> = {}): Promise<Cart[]> {
    return this.cartModel.find(conditions).exec();
  }

  findOne(conditions: FilterQuery<Cart> = {}): Promise<Cart> {
    return this.cartModel.findOne(conditions).exec();
  }

  findForUser(user: User, conditions: FilterQuery<Cart> = {}): Promise<Cart[]> {
    return this.find({ ...conditions, userId: user.id });
  }

  findByIdForUser(
    user: User,
    id: string,
    conditions: FilterQuery<Cart> = {},
  ): Promise<Cart> {
    return this.findOne({ ...conditions, _id: id, userId: user.id });
  }

  async create(fields: Partial<Cart> = {}): Promise<Cart> {
    const cart: Cart = new this.cartModel(fields);

    await cart.save();

    return cart;
  }

  createForUser(user: User, fields: Partial<Cart> = {}): Promise<Cart> {
    return this.create({ ...fields, userId: user.id });
  }
}

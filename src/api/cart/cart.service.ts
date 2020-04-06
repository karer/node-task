import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Cart } from './interfaces/cart.interface';
import { User } from '../user/interfaces/user.interface';
import { CartEntry } from './interfaces/cart-entry.interface';
import { Product } from '../product/interfaces/product.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<Cart>,
    @InjectModel('CartEntry') private readonly cartEntryModel: Model<CartEntry>,
  ) {}

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

  async addProducts(cart: Cart, product: Product, quantity = 1): Promise<Cart> {
    const existingEntry = cart.content.find(
      (entry: CartEntry) => entry.product === product._id,
    );

    if (existingEntry) {
      existingEntry.quantity += quantity;

      cart.markModified('content');
    } else {
      const cartEntry: CartEntry = new this.cartEntryModel({
        product: product._id,
        quantity,
      });

      cart.content.push(cartEntry);
    }

    await cart.save();

    return cart;
  }
}

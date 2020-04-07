import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Cart } from './interfaces/cart.interface';
import { User } from '../user/interfaces/user.interface';
import { CartEntry } from './interfaces/cart-entry.interface';
import { Product } from '../product/interfaces/product.interface';
import { CurrencyService } from '../../services/currency/currency.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<Cart>,
    @InjectModel('CartEntry') private readonly cartEntryModel: Model<CartEntry>,
    private readonly currencyService: CurrencyService,
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

  async addProduct(cart: Cart, product: Product, quantity = 1): Promise<Cart> {
    let entry = cart.content.find((entry: CartEntry) =>
      entry.product.equals(product._id),
    );

    if (entry) {
      entry.quantity += quantity;
    } else {
      entry = new this.cartEntryModel({
        product: product._id,
        quantity,
      });

      cart.content.push(entry);
    }

    if (entry.quantity > product.quantity) {
      throw new BadRequestException(
        'That quantity of this product is out of stock.',
      );
    }

    cart.markModified('content');

    await cart.save();

    return cart;
  }

  async removeProductById(cart: Cart, productId: string): Promise<Cart> {
    cart.content = cart.content.filter(
      (entry: CartEntry) => entry.product.toString() !== productId,
    );

    cart.markModified('content');

    await cart.save();

    return cart;
  }

  async getTotalPrice(cart: Cart, currency: string): Promise<number> {
    await cart.populate('content.product').execPopulate();

    return parseFloat(
      cart.content
        .reduce((prev: number, cartEntry: CartEntry) => {
          const product: Product = cartEntry.product as Product;

          const entryPrice: number =
            this.currencyService.recalculateValue(
              product.price.amount,
              product.price.currency,
              currency,
            ) * cartEntry.quantity;

          return prev + entryPrice;
        }, 0)
        .toFixed(2),
    );
  }
}

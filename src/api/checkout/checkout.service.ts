import { Injectable } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/interfaces/cart.interface';
import { Checkout } from './interfaces/checkout.interface';

@Injectable()
export class CheckoutService {
  constructor(private readonly cartService: CartService) {}

  async checkout(cart: Cart, currency: string): Promise<Checkout> {
    const totalPrice: number = await this.cartService.getTotalPrice(
      cart,
      currency,
    );

    return {
      price: {
        amount: totalPrice,
        currency,
      },
    };
  }
}

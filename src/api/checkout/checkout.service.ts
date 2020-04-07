import { Injectable } from '@nestjs/common';
import { CartService } from '../cart/cart.service';
import { Cart } from '../cart/interfaces/cart.interface';
import { Checkout } from './interfaces/checkout.interface';

@Injectable()
export class CheckoutService {
  constructor(private readonly cartService: CartService) {}

  checkout(cart: Cart, currency: string): Checkout {
    const totalPrice: number = this.cartService.getTotalPrice(cart, currency);

    return {
      price: {
        amount: totalPrice,
        currency,
      },
    };
  }
}

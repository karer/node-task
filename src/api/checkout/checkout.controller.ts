import {
  Controller,
  UseGuards,
  Param,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReqUser } from '../user/user.decorator';
import { User } from '../user/interfaces/user.interface';
import { Cart } from '../cart/interfaces/cart.interface';
import { CartService } from '../cart/cart.service';
import { FindOneCartParams } from '../cart/params/cart.find.params';
import { CheckoutService } from './checkout.service';
import { Checkout } from './interfaces/checkout.interface';
import { CreateCheckoutDto } from './dto/checkout.create.dto';

@UseGuards(AuthGuard())
@Controller('checkout')
export class CheckoutController {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly cartService: CartService,
  ) {}

  @Post(':cartId')
  async createCheckout(
    @Param() cartParams: FindOneCartParams,
    @Body() dto: CreateCheckoutDto,
    @ReqUser() user: User,
  ) {
    const cart: Cart = await this.getCartForUser(cartParams.cartId, user);

    const checkout: Checkout = await this.checkoutService.checkout(
      cart,
      dto.currency,
    );

    return { checkout };
  }

  private async getCartForUser(id: string, user: User): Promise<Cart> {
    const cart: Cart = await this.cartService.findByIdForUser(user, id);

    if (!cart) {
      throw new NotFoundException('Cart not found.');
    }

    return cart;
  }
}

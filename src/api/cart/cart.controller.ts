import {
  Controller,
  UseGuards,
  Get,
  Param,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReqUser } from '../user/user.decorator';
import { User } from '../user/interfaces/user.interface';
import { CartService } from './cart.service';
import { Cart } from './interfaces/cart.interface';

@UseGuards(AuthGuard())
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCarts(@ReqUser() user: User) {
    const carts: Cart[] = await this.cartService.findForUser(user, {
      fields: '_id',
    });

    return { carts };
  }

  @Get(':id')
  async getCart(@Param('id') id: string, @ReqUser() user: User) {
    const cart: Cart = await this.cartService.findByIdForUser(user, id);

    if (!cart) {
      throw new NotFoundException();
    }

    return { cart };
  }

  @Post()
  async createCart(@ReqUser() user: User) {
    const cart: Cart = await this.cartService.createForUser(user);

    return { cart };
  }
}

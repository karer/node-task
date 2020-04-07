import {
  Controller,
  UseGuards,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReqUser } from '../user/user.decorator';
import { User } from '../user/interfaces/user.interface';
import { CartService } from './cart.service';
import { Cart } from './interfaces/cart.interface';
import { AddCartProductDto } from './dto/cart-products.add.dto';
import { FindOneParams } from '../../services/database/database.params';
import { ProductService } from '../product/product.service';
import { Product } from '../product/interfaces/product.interface';
import { FindOneProductParams } from '../product/params/product.find.params';

@UseGuards(AuthGuard())
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  async getCarts(@ReqUser() user: User) {
    const carts: Cart[] = await this.getCartsForUser(user);

    return { carts };
  }

  @Get(':id')
  async getCart(@Param() params: FindOneParams, @ReqUser() user: User) {
    const cart: Cart = await this.getCartForUser(params.id, user);

    return { cart };
  }

  @Post()
  async createCart(@ReqUser() user: User) {
    const cart: Cart = await this.cartService.createForUser(user);

    return { cart };
  }

  @Post(':id/products')
  async addProductToCart(
    @Param() params: FindOneParams,
    @Body() dto: AddCartProductDto,
    @ReqUser() user: User,
  ) {
    const [cart, product]: [Cart, Product] = await Promise.all([
      this.getCartForUser(params.id, user),
      this.productService.findById(dto.productId),
    ]);

    if (!product) {
      throw new NotFoundException('Product not found.');
    }

    const newCart: Cart = await this.cartService.addProduct(
      cart,
      product,
      dto.quantity,
    );

    return { cart: newCart };
  }

  @Delete(':id/products/:productId')
  async removeProductFromCart(
    @Param() params: FindOneParams,
    @Param() productParams: FindOneProductParams,
    @ReqUser() user: User,
  ) {
    const cart: Cart = await this.getCartForUser(params.id, user);

    const newCart: Cart = await this.cartService.removeProductById(
      cart,
      productParams.productId,
    );

    return { cart: newCart };
  }

  private async getCartsForUser(user: User): Promise<Cart[]> {
    const carts: Cart[] = await this.cartService.findForUser(user);

    return carts;
  }

  private async getCartForUser(id: string, user: User): Promise<Cart> {
    const cart: Cart = await this.cartService.findByIdForUser(user, id);

    if (!cart) {
      throw new NotFoundException('Cart not found.');
    }

    return cart;
  }
}

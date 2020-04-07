import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from './schemas/cart.schema';
import { CartController } from './cart.controller';
import { CartEntrySchema } from './schemas/cart-entry.schema';
import { ProductModule } from '../product/product.module';
import { CurrencyModule } from '../../services/currency/currency.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Cart', schema: CartSchema },
      { name: 'CartEntry', schema: CartEntrySchema },
    ]),
    ProductModule,
    CurrencyModule,
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}

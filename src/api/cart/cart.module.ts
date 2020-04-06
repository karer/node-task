import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartSchema } from './schemas/cart.schema';
import { CartController } from './cart.controller';
import { CartEntrySchema } from './schemas/cart-entry.schema';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Cart', schema: CartSchema },
      { name: 'CartEntry', schema: CartEntrySchema },
    ]),
    ProductModule,
  ],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}

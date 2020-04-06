import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configFactory } from './config/config.factory';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { CartModule } from './api/cart/cart.module';
import { DatabaseModule } from './services/database/database.module';
import { ProductModule } from './api/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configFactory] }),
    DatabaseModule,
    AuthModule,
    UserModule,
    CartModule,
    ProductModule,
  ],
})
export class AppModule {}

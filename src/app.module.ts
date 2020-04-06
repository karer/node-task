import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { configFactory } from './config/config.factory';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { CartModule } from './api/cart/cart.module';
import { DatabaseModule } from './services/database/database.module';
import { ProductModule } from './api/product/product.module';
import { CurrencyModule } from './services/currency/currency.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configFactory] }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UserModule,
    CartModule,
    ProductModule,
    CurrencyModule,
  ],
})
export class AppModule {}

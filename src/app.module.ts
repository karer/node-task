import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configFactory } from './config/config.factory';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { CartModule } from './api/cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configFactory] }),
    AuthModule,
    UserModule,
    CartModule,
  ],
})
export class AppModule {}

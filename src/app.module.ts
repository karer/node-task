import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configFactory } from './config/config.factory';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configFactory] })],
})
export class AppModule {}

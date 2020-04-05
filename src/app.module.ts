import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configFactory } from './config/config.factory';
import { DatabaseConfigService } from './services/database/database-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configFactory] }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfigService }),
  ],
})
export class AppModule {}

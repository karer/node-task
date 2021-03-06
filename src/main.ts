import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CurrencyService } from './services/currency/currency.service';
import { useContainer } from 'class-validator';
import { winstonConfig } from './services/winston/winston-config.constants';

async function bootstrap() {
  const logger: Logger = new Logger('App');
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const currencyService: CurrencyService = app.get(CurrencyService);
  await currencyService.load();

  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get('app.port');

  const options = new DocumentBuilder()
    .setTitle('Node Task')
    .setDescription('Simple shop API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    logger.log(`* Listening on ::${port}`);
  });
}

bootstrap();

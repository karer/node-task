import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger: Logger = new Logger('App');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get('app.port');

  await app.listen(port, () => {
    logger.log(`* Listening on ::${port}`);
  });
}

bootstrap();

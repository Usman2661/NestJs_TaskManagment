import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const port = process.env.PORT || serverConfig.port;
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors();

    logger.log(`Accepting request from all origins enabled CORS`);
  }

  app.enableCors();

  await app.listen(port);

  logger.log(`Application listening on port ${port}`);
}
bootstrap();

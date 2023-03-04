import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './app/auth/filter/http-exception.filter';
import { Env } from './core/utils/env';

const microserviceOptions = {
  transport: Transport.GRPC,
  options: {
    url: Env.readString('AUTH_SERVICE_URL'),
    package: 'auth',
    protoPath: join(__dirname, '../proto/auth.proto'),
  },
};

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  app.useGlobalFilters(new HttpExceptionFilter()); // TODO: resolve filter and pipe to make proper connection between services
  // app.useGlobalPipes(new ValidationPipe());

  await app.listen();
}

bootstrap();

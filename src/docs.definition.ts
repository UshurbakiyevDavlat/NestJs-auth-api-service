import { DocumentBuilder } from '@nestjs/swagger';

export function swaggerDefinition() {
  return new DocumentBuilder()
    .setTitle('Tredo-Space-AuthAPI-Service')
    .setDescription('Документация RestApi')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
}

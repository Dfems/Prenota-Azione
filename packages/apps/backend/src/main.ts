import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  // --- SWAGGER SETUP ---
  const config = new DocumentBuilder()
    .setTitle('Prenota-Azione API')
    .setDescription('API per la gestione utenti, ordini, registrazioni, ecc.')
    .setVersion('1.0')
    // se prevedi JWT, abilita il bearer auth:
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT-auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  // ora la UI è su http://localhost:3000/api/docs

  await app.listen(3000);
}
bootstrap();

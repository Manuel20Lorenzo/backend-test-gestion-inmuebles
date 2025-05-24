import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: process.env.ORIGIN, // Reemplaza con la URL de tu frontend
    credentials: true, // si estás usando cookies o autenticación
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // lanza error si hay propiedades extras
    transform: false, // transforma payload a DTO
  }));
  await app.listen(process.env.PORT);
}
bootstrap();

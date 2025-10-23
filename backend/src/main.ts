import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- CORS ---
  app.enableCors({
    origin: process.env.FRONTEND_URL || true, // o 'http://localhost:3000'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // --- Prefijo global ---
  app.setGlobalPrefix('api');

  // --- Validaciones globales ---
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no incluidas en el DTO
      forbidNonWhitelisted: true, // lanza error si llegan propiedades extra
      transform: true, // convierte automáticamente tipos (ej: string → number)
    }),
  );

  // --- Swagger ---
  const config = new DocumentBuilder()
    .setTitle('Registro de Postulaciones')
    .setDescription('API para gestión de postulaciones y entrevistas')
    .setVersion('1.0')
    .addTag('Postulaciones')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // --- Arranque del servidor ---
  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
  console.log(`🚀 Server running on http://localhost:${PORT}/api`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api/docs`);
}
bootstrap();

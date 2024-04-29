import {  NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('keyto')
    .setDescription('The keyto API description')
    .setVersion('1.0')
    .addTag('keyto')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/swagger', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(cookieParser())
  app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));

  await app.listen(4000);
}
bootstrap();

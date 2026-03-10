import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const uploadsRoot = join(process.cwd(), 'uploads');
  const avatarsPath = join(uploadsRoot, 'avatars');
  const routesPath = join(uploadsRoot, 'routes');
  const frontendPath = join(process.cwd(), '..', 'frontend');

  [uploadsRoot, avatarsPath, routesPath].forEach((dirPath) => {
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }
  });

  app.useStaticAssets(uploadsRoot, {
    prefix: '/uploads/',
  });
  if (existsSync(frontendPath)) {
    app.useStaticAssets(frontendPath, {
      prefix: '/frontend/',
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('TravelBuddy API')
    .setDescription('API documentation for TravelBuddy backend')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT-auth',
    )
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // only allow whitelisted properties on the body object
    }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Ecommerce API')
    .setDescription('The ecommerce API created with clean architecture')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/api', app, document);

  await app.listen(port);
}
bootstrap();

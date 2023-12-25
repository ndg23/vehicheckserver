import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import * as bodyParser from 'body-parser';

import { ExpressAdapter } from '@nestjs/platform-express';
// import * as expressFormData from 'express-form-data';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));


  const swagger = new DocumentBuilder()
    .setTitle('Vehicheck Server')
    .setDescription('The VS API description')
    .setVersion('1.0')
    .addTag('Vcheck')
    .build();
  const document = SwaggerModule.createDocument(app, swagger);

  const config: ConfigService = app.get(ConfigService);
  const port: number = 3000;
  app.enableCors({
    allowedHeaders: '*',
  });

  // Configure express-form-data middleware
  //app.use(expressFormData.parse());
  SwaggerModule.setup('docs', app, document);

  app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
  app.use(json());
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');
  await app.listen(port, () => {
    console.log(`🚀 Server started...${port}`);
  });
}




bootstrap();
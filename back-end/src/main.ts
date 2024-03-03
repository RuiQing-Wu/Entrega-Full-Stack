import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IllegalArgumentFilter } from './base/filter/argumentFilter';
import { ConflictFilter } from './base/filter/conflictFilter';
import { EntityNotFoundFilter } from './base/filter/entityNotFounFilter';
import { RepositoryFilter } from './base/filter/repositoryFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new IllegalArgumentFilter(), new EntityNotFoundFilter(), new ConflictFilter(), new RepositoryFilter());
  app.enableCors({
    origin: ['http://localhost:3000'],
  });

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const config = new DocumentBuilder()
    .setTitle('Solidarian')
    .setDescription('The solidarian API description')
    .setVersion('1.0')
    .addBearerAuth() //Indica que algunas operaciones tienen que utilizar un token pero no se le manda ninguno
    .addServer(process.env.SERVER_URL)
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3002);
}
bootstrap();

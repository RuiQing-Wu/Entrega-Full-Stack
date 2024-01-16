import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { LoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    .build();
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  console.log('Aplication listen on the port: ', process.env.PORT);
  await app.listen(process.env.PORT || 3002);
}
bootstrap();

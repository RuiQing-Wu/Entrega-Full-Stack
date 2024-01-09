import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      "http://localhost:3000",
    ],
  }
  );

  console.log("Aplication listen on the port: ", process.env.PORT);
  await app.listen(process.env.PORT || 3002);
}
bootstrap();

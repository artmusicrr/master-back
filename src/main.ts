import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

const port = process.env.PORT;
  console.log(`Application is running on: http://localhost:${port}`);

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Permitir todas as origens (ajuste conforme necessário)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(4000);
}
bootstrap();

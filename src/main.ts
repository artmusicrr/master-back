import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './common/filters/not-found-exception.filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT || 4000;
  
  try {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type,Authorization',
    });
    
    app.useGlobalFilters(new NotFoundExceptionFilter());

    await app.listen(port);
    logger.log(`Application is running on: http://localhost:${port}`);
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      logger.error(`Port ${port} is already in use. Please try a different port by setting the PORT environment variable.`);
      process.exit(1);
    }
    logger.error('Application failed to start:', error);
    process.exit(1);
  }
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(LoggerService));
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties that werent declared in DTOs
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000).then(res => {
    new Logger('ZasyPost').log('EasyPost API server has been started on http://localhost:5000');
  })
}
bootstrap();

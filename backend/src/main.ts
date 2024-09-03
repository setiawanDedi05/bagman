import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(helmet());

  const allowedOrigins = [
    'https://8e39-114-124-246-116.ngrok-free.app',
    'http://localhost:3000'
  ]

  app.enableCors({
    origin: (origin, callback) => {
      if(allowedOrigins.includes(origin) || !origin){
        callback(null, true)
      }else{
        callback(new Error('Not Allowed by Cors'))
      }
    },
    methods: 'GET, POST, PUT, PATCH, HEAD, DELETE',
    credentials: true
  })
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3001);
}
bootstrap();

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
    'https://bag-ose3i9vov-setiawandedi05s-projects.vercel.app',
    'http://localhost:3000',
    'https://bag-man.vercel.app'
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

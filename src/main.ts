import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

const process = require('node:process');
const morgan = require('morgan');
const debug = require('debug')('app:start');
const helmet = require('helmet');

const port = process.env.PORT || 3002;
const environment = process.env.NODE_ENV || "development";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());

  //allowing CORS
  const corsOptions: CorsOptions = {
    origin: ["https://localhost:3000", "http://localhost:3000"], // List of allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: "*"
  };

  app.enableCors(corsOptions);
 
  app.use(helmet());
  if(environment == 'development') {
    app.use(morgan('combined'))
  }
  await app.listen(port);
  debug(`App is running on http://127.0.0.1:${port}`)
}
bootstrap(); 
 
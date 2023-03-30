import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from '~/app.module';
import { createDocumnet } from '~/lib/swagger';
import { SocketIoAdapter } from '~/adapters';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  const ALLOWLIST = configService.get<string[]>('ALLOWLIST');
  const logger = new Logger('Main');

  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    origin: ALLOWLIST,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      // request에서 dto에 없는 값 제거
      whitelist: true,
      // dto에 있는 타입으로 변환
      transform: true,
    }),
  );

  app.useWebSocketAdapter(new SocketIoAdapter(app));

  // swagger
  createDocumnet(app);

  await app.listen(PORT);

  logger.log(`Server is running on port ${PORT}`);
};

bootstrap();

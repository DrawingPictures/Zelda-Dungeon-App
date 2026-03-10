import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://192.168.56.1:3000",
      "https://zeldadungeonapp.vercel.app"
      ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001, "0.0.0.0");
}
bootstrap();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { DungeonsModule } from './dungeons/dungeons.module';

@Module({
  imports: [GamesModule, DungeonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

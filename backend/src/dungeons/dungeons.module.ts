import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DungeonsService } from './dungeons.service';
import { DungeonsController } from './dungeons.controller';

@Module({
  imports: [PrismaModule],
  providers: [DungeonsService],
  controllers: [DungeonsController],
})
export class DungeonsModule {}

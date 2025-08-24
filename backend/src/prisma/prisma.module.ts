import { Module } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { PrismaService } from './prisma.service';

@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule {}
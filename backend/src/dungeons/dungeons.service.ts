import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DungeonsService {

    constructor(private readonly prismaService: PrismaService) {}

    findAll() {
        return this.prismaService.dungeons.findMany({
            include: { 
                games: true, 
                dungeon_items: {
                    include: { items: true},
                }
            },
        });
    }

    findDungeonById(id: number) {
        return this.prismaService.dungeons.findUnique({
            where: { id },
            include: {
                games: true,
                dungeon_items: {
                    include: { items: true},
                },
            },
        });
    }

}

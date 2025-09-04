import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDungeonDto } from './create-dungeon.dto';

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

    findByName(name: string) {
        return this.prismaService.dungeons.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
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

    findByBossName(bossName: string) {
        return this.prismaService.dungeons.findMany({
            where: { boss: bossName},
        });
    }

    findFiltered(filters: { game_id?: number; boss?: string; name?: string}) {
        
        return this.prismaService.dungeons.findMany({
            where: {
                game_id: filters.game_id,
                boss: filters.boss,
                name: filters.name,
            },
        });
    }

    async createDungeon(createDungeonDto: CreateDungeonDto) {
        
        const game = await this.prismaService.games.findUnique({
            where: {id: createDungeonDto.game_id },
        });

        if(!game) throw new Error('Game nicht gefunden');

        const count = await this.prismaService.dungeons.count({
            where: { game_id: createDungeonDto.game_id},
        });

        if(count >= game.max_dungeons) {
            throw new Error(
                'Maximale Anzahl an Dungeons (${game.max_dungeons}) für dieses Spiel erreicht.'
            );
        }

        return this.prismaService.dungeons.create({
            data: createDungeonDto,
        });

    }



}

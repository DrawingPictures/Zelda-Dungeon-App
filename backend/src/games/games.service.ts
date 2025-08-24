import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class GamesService {
    constructor(private prisma: PrismaService) {}

    async findAllGames() {
        return this.prisma.games.findMany();
    }

    async findGameById(id: number) {
        return this.prisma.games.findUnique({
            where: { id },
        });
    }


}

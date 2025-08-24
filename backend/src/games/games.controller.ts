import { Controller, Get, Param } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {

    constructor(private gamesService: GamesService) {}

    @Get()
    getAll() {
        return this.gamesService.findAllGames();
    }

    @Get(':id') 
        getOne(@Param('id') id: string) {
            return this.gamesService.findGameById(Number(id));
        }
    

}

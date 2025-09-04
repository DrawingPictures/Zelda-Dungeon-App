import { Controller, Get, Param, Query } from '@nestjs/common';
import { DungeonsService } from './dungeons.service';

@Controller('dungeons')
export class DungeonsController {
    constructor(private readonly dungeonsService: DungeonsService) {}

    @Get('boss/:name')
    getDungeonByBoss(@Param('name') name: string) {
        return this.dungeonsService.findByBossName(name);
    }

     @Get('search')
    findDungeons(@Query('name') name?: string) {
        if(name) {
            return this.dungeonsService.findByName(name);
        }

        return this.dungeonsService.findAll();
    }

    @Get('filter')
    getFilteredDungeons(
        @Query('game_id') game_id?: string,
        @Query('boss') boss?: string,
        @Query('name') name?: string,
    ) {
        return this.dungeonsService.findFiltered({
            game_id: game_id ? +game_id : undefined,
            boss,
            name
        });
    }

    @Get(':id') 
    getDungeonsById(@Param('id') id: string) {
        return this.dungeonsService.findDungeonById(+id);
    }

    @Get()
    getAllDungeons() {
        return this.dungeonsService.findAll();
    }
}

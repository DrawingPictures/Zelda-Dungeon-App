import { Controller, Get, Param } from '@nestjs/common';
import { DungeonsService } from './dungeons.service';

@Controller('dungeons')
export class DungeonsController {
    constructor(private readonly dungeonsService: DungeonsService) {}

    @Get()
    getAllDungeons() {
        return this.dungeonsService.findAll();
    }

    @Get(':id') 
    getDungeonsById(@Param('id') id: string) {
        return this.dungeonsService.findDungeonById(+id);
    }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHomepage(): string {
    return 'Willkommen bei der Zelda Dungeon Website!';
  }
}

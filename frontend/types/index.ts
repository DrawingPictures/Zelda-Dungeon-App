
export interface Dungeon {
  id: number;
  name: string;
  boss: string;
  description: string;
  dungeon_items: { items: { name: string; description: string }[] }[];
  game_id: number;
}

export interface Game {
  id: number;
  title: string;
  max_dungeons: number;
}
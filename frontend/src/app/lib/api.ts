const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("API_URL:", API_URL);  // Debug

if (!API_URL) throw new Error("API_URL ist nicht gesetzt!");
// Games

export async function getAllGames() {
  const res = await fetch(`${API_URL}/games`);
  return res.json();
}

export async function getGameById(id: number) {
  const res = await fetch(`${API_URL}/games/${id}`);
  const data = await res.json();
  console.log("getGameByid data:", data);
  return data;
}

// Dungeons
export async function getAllDungeons() {
  const res = await fetch(`${API_URL}/dungeons`);
  return res.json();
}

export async function getDungeonById(id: number) {
  const res = await fetch(`${API_URL}/dungeons/${id}`);
  return res.json();
}

export async function getDungeonsFiltered(filters: { game_id?: number; boss?: string; name?: string }) {
  const query = new URLSearchParams();
  if (filters.game_id) query.append("game_id", filters.game_id.toString());
  if (filters.boss) query.append("boss", filters.boss);
  if (filters.name) query.append("name", filters.name);

  const res = await fetch(`${API_URL}/dungeons/filter?${query.toString()}`);
  return res.json();
}

export async function getDungeonByBoss(boss: string) {
  const res = await fetch(`${API_URL}/dungeons/boss/${boss}`);
  return res.json();
}
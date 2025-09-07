const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDungeon() {

    const res = await fetch(`${API_URL}/dungeons`);
    if(!res.ok) throw new Error("Fehler beim Laden der Dungeons");

    return res.json();

}

export async function getDungeonById(id: string) {

    const res = await fetch(`${API_URL}/dungeons/${id}`);
    if(!res.ok) throw new Error("Dungeon nicht gefunden");
    
    return res.json();

}
"use client";

import { useParams } from "next/navigation";

export default function DungeonPage() {
  const params = useParams();
  const { gameId, dungeonId } = params;

  if (!gameId || !dungeonId) {
    return <p>Dungeon oder Spiel ID fehlt!</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dungeon {dungeonId} in Game {gameId}</h2>
      <p>Hier kannst du die Details für diesen Dungeon anzeigen.</p>
    </div>
  );
}
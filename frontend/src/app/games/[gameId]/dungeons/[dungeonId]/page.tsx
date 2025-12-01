"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Game, Dungeon } from "../../../../../../types";
import { getDungeonById, getGameById, getDungeonsFiltered } from "@/app/lib/api";
import styles from "./dungeons.module.css";
import Image from "next/image";

export default function DungeonPage() {
  const params = useParams();
  const { gameId, dungeonId } = params;

  const [game, setGame] = useState<Game | null>(null);
  const [dungeon, setDungeon] = useState<Dungeon | null>(null);
  const [dungeons, setDungeons] = useState<Dungeon[]>([]);
  const [selectedField, setSelectedField] = useState<string>("description");
  const [loading, setLoading] = useState(true);

  const router = useRouter();


  useEffect(() => {
    async function fetchData() {
      if (!gameId || !dungeonId) {
        return;
      }

      try {
        const gameData = await getGameById(Number(gameId));
        setGame(gameData);

        const dungeonData = await getDungeonById(Number(dungeonId));
        setDungeon(dungeonData);

        const allDungeons = await getDungeonsFiltered({ game_id: Number(gameId) });
        setDungeons(allDungeons);
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [gameId, dungeonId]);

  if (loading) return <p>Lade Daten...</p>;

  if (!game || !dungeon) {
    return <p>Daten konnten nicht geladen werden.</p>;
  }

  const bossFolderMap: Record<number, string> = {
    1: "Ocarina_of_Time",
    2: "Majoras_Mask",
    3: "Wind_Waker",
    4: "Twilight_Princess"
  };

  const renderContent = () => {
    switch (selectedField) {
      case "boss":
        return (
          <div>
            <Image
              src={`/boss/${bossFolderMap[game.id]}/${dungeon.boss}.png`}
              alt={dungeon.boss}
              width={400}       
              height={300}      
              style={{ objectFit: "contain" }}
            />
            <h2>{dungeon.boss}</h2>
          </div>
        );
      case "description":
      default:
        return (
          <div className={styles.descriptionBox}>
            <p>{dungeon.description}</p>
          </div>
        );
    }
  }

  const currentIndex = dungeons.findIndex((d) => d.id === dungeon.id);
  const prevDungeon = currentIndex > 0 ? dungeons[currentIndex - 1] : null;
  const nextDungeon = currentIndex < dungeons.length - 1 ? dungeons[currentIndex + 1] : null;

  return (
    <div className={styles.dungeonPageContainer}>
      {/** Layout: Links / Rechts */}
      <div className={styles.leftPanel}>
        <button onClick={() => setSelectedField("description")}>
          Description
        </button>
        <button onClick={() => setSelectedField("boss")}>
          Boss
        </button>
      </div>

      {/** Rechter Content */}
      <div className={styles.rightPanel}>
        <div className={styles.content}>
          <h2 className={styles.dungeonHeader}>
            Dieser Dungeon heißt &quot;{dungeon.name}&quot; und es taucht im Spiel &quot;{game.title}&quot; auf.
          </h2>
          {renderContent()}
        </div>
      </div>

      {/** Navigation Buttons unterhalb des Layouts */}
      <div className={styles.navigationButtons}>
        {prevDungeon && (
          <button onClick={() => router.push(`/games/${game.id}/dungeons/${prevDungeon.id}`)}>
            {prevDungeon.name}
          </button>
        )}
        {nextDungeon && (
          <button onClick={() => router.push(`/games/${game.id}/dungeons/${nextDungeon.id}`)}>
            {nextDungeon.name}
          </button>
        )}
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Game, Dungeon, Item } from "../../../../../../types";
import { getDungeonById, getGameById, getDungeonsFiltered } from "@/app/lib/api";
import styles from "./dungeons.module.css";
import Image from "next/image";

export default function DungeonPage() {
  const params = useParams();
  const { gameId, dungeonId } = params;

  const [game, setGame] = useState<Game | null>(null);
  const [dungeon, setDungeon] = useState<Dungeon | null>(null);
  const [dungeons, setDungeons] = useState<Dungeon[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedField, setSelectedField] = useState<string>("description");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  //Spiel- und Dungeondaten werden geladen
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

  //Items werden geladen
  useEffect(() => {
    async function fetchItems() {
      if(selectedField === "items" && dungeonId) {
        try {
          const itemRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dungeons/${dungeonId}/items`);
          const itemData = await itemRes.json();
          setItems(itemData);
        } catch (error) {
          console.error("Fehler beim Laden der Items:", error);
          setItems([]);
        }
      }
    }
    fetchItems();
  }, [selectedField, dungeonId]);

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
          <div className={styles.imageBox}>
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
      case "items":
        return (
          <div className={styles.itemsBox}>
            <h3>Items in diesem Dungeon:</h3>
            {items.length > 0 ? (
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <strong>{item.name}</strong>: {item.usability}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Keine Items gefunden.</p>
            )}
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
        <button onClick={() => setSelectedField("items")}>
          Items
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

      {/** Game-Card */}
      <div 
      id="games-container"
      style={{
        gridColumn: "1 / 3",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px",
        width: "100%",
        padding: "10px",
        boxSizing: "border-box",
      }}>
        <div
          className="game-card"
          style={{ backgroundImage: "url('/ocarina-of-time.png')" }}
          onClick={() => window.location.href = "/games/1"} //Link zu Ocarina of Time
          >
            Ocarina of Time
        </div>

        <div
        className="game-card"
        style={{backgroundImage: "url('/majoras-mask.png')"}}
        onClick={() => window.location.href= "/games/2"} //Link zu Majora's Mask
        >
          Majora&apos;s Mask
        </div>

        <div
        className="game-card"
        style={{backgroundImage: "url('/the-wind-waker.png')"}}
        onClick={() => window.location.href="/games/3"} //Link zu The Wind Waker
        >
          The Wind Waker
        </div>

        <div
        className="game-card"
        style={{backgroundImage: "url('/twilight-princess.png')"}}
        onClick={() => window.location.href="/games/4"} //Link zu Twilight Princess
        >
          Twilight Princess
        </div>

    </div>

    </div>
  );
}
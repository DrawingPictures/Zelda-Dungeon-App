"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Game, Dungeon } from "../../../../types";
import { getGameById, getAllDungeons } from "@/app/lib/api";
import "../../styles.css";
import "../../games.css";

export default function GamePage() {

    const params = useParams();
    const router = useRouter();
    const gameId = params?.gameId;

    const [game, setGame] = useState<Game | null>(null);
    const [dungeons, setDungeons] = useState<Dungeon[]>([]);
    const [loading, setLoading] = useState(true);

    const gameIdNumber = gameId ? Number(gameId) : null;

    useEffect(() => {

        async function fetchData() {
            try {
                const gameData = await getGameById(Number(gameIdNumber));
                setGame(gameData);

                const allDungeons: Dungeon[] = await getAllDungeons();
                const gameDungeons = allDungeons.filter(
                    (d) => d.game_id === gameIdNumber
                );
                setDungeons(gameDungeons);
            } catch(error) {
                console.error("Fehler beim Laden der Daten:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [gameIdNumber]);

    if(!gameIdNumber) return <p>Spiel-ID fehlt!</p>;
    if(loading) return <p>Lade Spielinformationen...</p>;

    return (
        <div className="game-page-container">

            {/** Info Container */}
            {game && (
                <div className="game-info">
                    <h2>{game.title}</h2>
                    <p>
                        Hier sehen Sie die Liste aller Dungeons von{" "} <strong>{game.title}</strong> in Form von Illustrationen.
                        Klicken Sie auf eines der Bilder, um mehr Informationen zu erfahren.
                    </p>
                </div>
            )}

            {/** Dungeon Illustrationen */}
            <div className="dungeon-container">
                {dungeons.map((dungeon) => (
                    <div
                        key={dungeon.id}
                        className="game-card"
                        style={{backgroundImage: `url('/dungeons/${dungeon.id}.png')`}}
                        onClick={() => router.push(`/games/${gameIdNumber}/dungeons/${dungeon.id}`)}
                    >
                        <div className="card-overlay">
                            <h3>{dungeon.name}</h3>
                            <p>Boss: {dungeon.boss}</p>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    )

}
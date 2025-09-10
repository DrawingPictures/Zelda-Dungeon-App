"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getGameById, getAllDungeons } from "@/app/lib/api";
import "../../styles.css";
import "../../games.css";

interface Dungeon {
    id: number;
    name: string;
    boss: string;
    description: string;
    dungeon_items: { items: { name: string; description: string }[] }[];
    game_id: number;
}

interface Game {
    id: number;
    name: string;
}

export default function GamePage() {

    const { gameId } = useParams();
    if(!gameId) return <p>Spiel-ID fehlt!</p>

    const gameIdNumber = Number(gameId);

    const [game, setGame] = useState<Game | null>(null);
    const [dungeons, setDungeons] = useState<Dungeon[]>([]);

    useEffect(() => {
        async function fetchData() {
            const gameData = await getGameById(Number(gameId));
            setGame(gameData);

            const allDungeons = await getAllDungeons();
            const gameDungeons = allDungeons.filter((d: Dungeon) => d.game_id === gameIdNumber);
            setDungeons(gameDungeons);
        }

        fetchData();
    }, [gameIdNumber]);

    return (
        <div className="game-page-container">

            {/** Info Container */}
            {game && (
                <div className="game-info">
                    <h2>{game.name}</h2>
                    <p>
                        Hier sehen Sie die Liste aller Dungeons von <strong>{game.name}</strong> in Form von Illustrationen.
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
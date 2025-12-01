"use client";
import "./styles.css"

export default function HomePage() {

  return (

    <div>
    <div id="introduction">

      <h1>Willkommen auf meiner Webseite. </h1>

        <p>Mein Name ist (mein Name) und dies ist mein erstes Fullstack-Projekt, bei dem ich sowohl Next.js als auch NestJS einsetze. Next.js nutze ich für die clientseitige Entwicklung, während NestJS zusammen mit Prisma und PostgreSQL für die serverseitige Entwicklung zum Einsatz kommt.</p>

        <p>Die &quot;Zelda Dungeon App&quot;-Webseite liefert dem Nutzer sämtliche Informationen über Dungeons in verschiedenen Zelda-Spielen. Zunächst habe ich mich entschieden, vier 3D-Zelda-Titel zu integrieren. Sobald die Webseite vollständig funktionsfähig ist und das Styling korrekt angezeigt wird, plane ich, die Dungeons der restlichen Zelda-Spiele in pgAdmin 4 hinzuzufügen, inklusive der entsprechenden Spieltitel. Für die Testphase habe ich pro Spiel zunächst drei Dungeons in absteigender Reihenfolge ausgewählt, um die Funktionsweise der Webseite zu prüfen.</p>

        <p>Die Webseite nutzt dynamische Routen, über die der Nutzer Informationen zu den einzelnen Zelda-Dungeons abrufen kann. Zusätzlich können Details zu Items, Bossgegnern und den Dungeon-Namen angezeigt werden.</p>

        <p>Da die Webseite ausschließlich Informationen zu den Dungeons und deren relevanten Inhalten bietet, enthält sie keine ausführlichen Beschreibungen zu den einzelnen Zelda-Spielen selbst.</p>

    </div>

    <div id="games-container" style={{ display: "flex", gap: "20px", marginTop: "40px"}}>
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
  )

}

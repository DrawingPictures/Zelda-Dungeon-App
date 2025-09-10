"use client"
import { useState } from "react";
import Link from "next/link";
import "../../styles.css";
import "../../games.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSideBar = () => setIsOpen(!isOpen);
    return (
   <div className="game-layout">
      {/* Navbar Button */}
      <div style={{ position: "fixed", top: 10, left: 10, zIndex: 1000 }}>
        <button className="navbar-button" onClick={() => setIsOpen(!isOpen)}>
          &#x2261;
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2>Games</h2>
        <nav>
          <ul>
            <li><Link href="/">Homepage</Link></li>
            <li><Link href="/games/1">Ocarina of Time</Link></li>
            <li><Link href="/games/2">Majora's Mask</Link></li>
            <li><Link href="/games/3">The Wind Waker</Link></li>
            <li><Link href="/games/4">Twilight Princess</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ marginLeft: isOpen ? "250px" : "0" }}>
        {children}
      </main>
    </div>
    );
}

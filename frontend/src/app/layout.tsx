"use client"
import { useState } from "react";
import Link from "next/link";
import "./styles.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleSideBar = () => setIsOpen(!isOpen);
    return (
      <html lang="en">
        <body>

          {/* Navbar / Icon */}
          <div style={{position: "fixed", top: 10, left: 10, zIndex: 1000}}>
            <button className="navbar-button" onClick={toggleSideBar} style={{fontSize: "24px"}}>
              &#x2261; {/* Das ist das "=" Icon */}
            </button>
          </div>

          {/** Sidebar */}
          <aside className={`sidebar ${isOpen ? "sidebar open" : "sidebar"}`}>

            <h2>Games</h2>
            <nav>
              <ul style={{listStyle: "none", padding: 0}}>
                <li><Link href="/" style={{ color: "white" }}>Homepage</Link></li>
                <li><Link href="/games/1">Ocarina of Time</Link></li>
                <li><Link href="/games/2">Majora&apos;s Mask</Link></li>
                <li><Link href="/games/3">The Wind Waker</Link></li>
                <li><Link href="/games/4">Twilight Princess</Link></li>
              </ul>
            </nav>

          </aside>

          {/** Main Content */}
          <main className="main-content" style={{marginLeft: isOpen ? "250px" : "0"}}>
            {children}

          </main>
          
        </body>
      </html>
    );
}

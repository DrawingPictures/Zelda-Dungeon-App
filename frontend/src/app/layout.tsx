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
            <button onClick={toggleSideBar} style={{fontSize: "24px"}}>
              &#x2261; {/* Das ist das "=" Icon */}
            </button>
          </div>

          {/** Sidebar */}
          <aside
          style={{
            position: "fixed",
            top: 0,
            left: isOpen ? 0 : "-250px",
            width: "250px",
            height: "100vh",
            backgroundColor: "#222",
            color: "white",
            padding: "20px",
            transition: "left 0.3s ease",
          }}

          >

            <h2>Games</h2>
            <nav>
              <ul style={{listStyle: "none", padding: 0}}>
                <li><Link href="/" style={{ color: "white" }}>Homepage</Link></li>
                <li><Link href="/games/1" style={{ color: "white" }}>Ocarina of Time</Link></li>
                <li><Link href="/games/2" style={{ color: "white" }}>Majora's Mask</Link></li>
                <li><Link href="/games/3" style={{ color: "white" }}>The Wind Waker</Link></li>
                <li><Link href="/games/4" style={{ color: "white" }}>Twilight Princess</Link></li>
              </ul>
            </nav>

          </aside>

          {/** Main Content */}
          <main style={{marginLeft: isOpen ? "250px" : "0", transition: "margin-left 0.3s ease"}}>
            {children}

          </main>
          
        </body>
      </html>
    );
}

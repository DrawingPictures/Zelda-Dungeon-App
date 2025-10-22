# Zelda-Dungeon-App

This project is a fullstack web application built with **Next.js** for the frontend and **NestJS** for the backend. It presents an interactive **Zelda Dungeon Information Platform**, showcasing dungeons, items, bosses, and detailed descriptions from various Zelda titles.

# Purpose

The application demonstrates my prodiciency in **modern fullstack development**, including RESTful API design, component-based frontend architecture, and database integration.

Users can browse through different Zelda games and select individual dungeons to view detailed information - including the dungeon name, structure and boss.
The application is **readonly**, meaning it's designed purely for information display; users cannot overwrite the data.
Because of this, only **GET** methods are implemented in the backend.

** Tech Stack
- **Frontend:** Next.js, TypeScript, CSS
- **Backend:** NestJS
- **Database:** PostgreSQL
- **Version Control:** Git / GitHub
- **Architecture:** Monorepo (frontend + backend combined)

** REST API
The backend exposes a simple REST API with **GET** endpoints to retrieve dungeon data from the PostgreSQL database.
Since the project focuses on readonly functionality, other HTTP methods such as POST, PUT or DELETE are not implemented.




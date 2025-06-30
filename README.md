# travel-planner-app

A Next.js 15 travel planning application with GitHub OAuth authentication, trip & location management, interactive map and globe visualizations, image uploads, drag-and-drop reordering, and light/dark theme support.

Live demo: [https://travel-planner-app-five.vercel.app](https://travel-planner-app-five.vercel.app)

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)

  * [1. Clone the Repository](#1-clone-the-repository)
  * [2. Install Dependencies](#2-install-dependencies)
  * [3. Configure Environment Variables](#3-configure-environment-variables)
  * [4. Set Up the Database](#4-set-up-the-database)
  * [5. Run the Development Server](#5-run-the-development-server)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* **GitHub OAuth Authentication:** Sign in with GitHub via NextAuth & Prisma
* **Trip Management:** Create, view, edit, and delete trips with title, description, dates, and optional cover image uploads via Uploadthing
* **Location Handling:** Add multiple locations (title, latitude, longitude), reorder via drag-and-drop (@dnd-kit), and persist order
* **Interactive Maps:** Visualize trip locations on a 2D map (react-leaflet & Leaflet) and a 3D globe (react-globe.gl)
* **Image Uploads:** Upload cover images for trips using Uploadthing with React integration
* **Theme Switching:** Light/dark mode support powered by next-themes
* **Responsive UI:** Built with Tailwind CSS, Radix UI primitives, Lucide React icons, and clsx/class-variance-authority utilities

---

## Tech Stack

* **Framework:** Next.js 15
* **Authentication:** NextAuth.js v5 with @auth/prisma-adapter & GitHub provider
* **ORM & Database:** Prisma & PostgreSQL
* **Maps & Visualization:** react-leaflet, Leaflet, react-globe.gl
* **Drag & Drop:** @dnd-kit/core & @dnd-kit/sortable
* **File Uploads:** @uploadthing/react & uploadthing
* **Styling & UI:** Tailwind CSS, Radix UI, Lucide React, clsx, class-variance-authority
* **Utilities:** next-themes, sonner (toasts), @react-google-maps/api

---

## Prerequisites

* **Node.js:** v20 or newer
* **npm** or **Yarn**
* **PostgreSQL:** Running instance with a connection URL
* **Environment Variables:** See next section

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Senibo-Don-Pedro/travel-planner-app.git
cd travel-planner-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# PostgreSQL
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret

# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
```

### 4. Set Up the Database

Generate the Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

* **Home / Landing:** `/`
* **Sign In:** Redirects to GitHub OAuth and then back to the dashboard
* **Dashboard / Trips:** Create new trips, view existing ones
* **Trip Details:** `/trips/[tripId]` – View map & globe visualizations, manage locations
* **Settings:** Theme toggle in the header

---

## Project Structure

```
.
├── app/                     # Next.js App Router pages & components
├── components/              # Shared UI components (cards, forms, etc.)
├── lib/
│   └── prisma.ts            # Prisma client instantiation
├── prisma/
│   └── schema.prisma        # Database schema & models
├── public/                  # Static assets
├── .gitignore
├── auth.ts                  # NextAuth configuration
├── next.config.ts
├── package.json             # Dependencies & scripts
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to your branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---


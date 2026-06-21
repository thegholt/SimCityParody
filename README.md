# SimCityParody

A tiny, tongue-in-cheek city-building game in the browser. Pick a zoning tool,
click tiles to build, and keep your treasury, population, and happiness in the
green. Built with **Vite + React + TypeScript**.

## Getting started

```bash
pnpm install   # install dependencies
pnpm dev       # start the dev server at http://localhost:5173
```

## Scripts

| Command       | Description                                   |
| ------------- | --------------------------------------------- |
| `pnpm dev`    | Start the Vite dev server (hot reload).       |
| `pnpm build`  | Type-check (`tsc -b`) and build for prod.     |
| `pnpm preview`| Preview the production build.                 |
| `pnpm lint`   | Run ESLint over the project.                  |
| `pnpm test`   | Run the Vitest suite once.                    |
| `pnpm test:watch` | Run Vitest in watch mode.                 |

## How to play

- Choose a tool from the toolbar (Residential, Commercial, Industrial, Park,
  Road, or Bulldoze).
- Click a tile on the map to build. Each build costs money from your treasury.
- Population, happiness, and recurring income update as you build. Income
  accrues automatically every couple of seconds.

## Project layout

```
src/
  game/        # pure game logic (engine + types) with unit tests
  components/   # React UI (Board, Toolbar, StatsBar)
  App.tsx       # wires state + the game loop together
```

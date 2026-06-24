# Option 4D: The Game

A responsive, satirical political campaign game built with **Vite + React +
TypeScript** in a retro 16-bit SimCity-inspired pixel style.

Dartford has **£135.9M** on the table. Option 4D: The Game lets you spend it on
the things the borough actually needs — healthcare, buses, police, small businesses,
pothole repairs and Galley Hill — for a total of £135M, leaving £0.9M to spare.
Then it reveals that Dartford's Labour MP, Jim, is instead backing **Option 4D**,
spending the entire £135.9M to cut Dartford in half.

> The message: Dartford could have had all these improvements for £135M, but Jim
> is spending £135.9M on Option 4D instead.

## Getting started

```bash
pnpm install   # install dependencies
pnpm dev       # start the dev server at http://localhost:5173
```

## Scripts

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `pnpm dev`        | Start the Vite dev server (hot reload).    |
| `pnpm build`      | Type-check (`tsc -b`) and build for prod.  |
| `pnpm preview`    | Preview the production build.              |
| `pnpm lint`       | Run ESLint over the project.               |
| `pnpm test`       | Run the Vitest suite once.                 |
| `pnpm test:watch` | Run Vitest in watch mode.                  |

## Game flow

1. **Intro** — £135.9M is on the table.
2. **Positive budget round** — fund every project and watch the pixel map of
   Dartford light up. Fund all six and you still have £0.9M left.
3. **Jim's Choice reveal** — the screen glitches: Jim is spending the whole
   £135.9M on Option 4D.
4. **Bad ending** — Dartford is split in half, nothing is funded, 75,426
   constituents are disappointed.

## Editing the content

All project data, costs, copy and outcomes live in
[`src/data/projects.ts`](src/data/projects.ts) so the numbers and political
message are easy to tweak without touching components.

## Project layout

```
src/
  data/projects.ts   # editable game content (projects, budget, copy)
  game/budget.ts     # pure budget logic + helpers (unit tested)
  components/         # TopBar, IntroModal, CityMap, ProjectCard,
                      # ConfirmModal, JimChoiceReveal, ResultsScreen, PixelButton
  App.tsx             # game state machine (intro → budget → reveal → ending)
```

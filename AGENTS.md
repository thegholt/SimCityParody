# AGENTS.md

## Cursor Cloud specific instructions

SimCityParody is a single front-end app: **Vite + React + TypeScript** (package
manager: **pnpm**, lockfile `pnpm-lock.yaml`). There is no backend, database, or
external service — everything runs client-side.

Standard commands live in `package.json` (`dev`, `build`, `lint`, `test`); see
the README table. Notes that aren't obvious from those files:

- The dev server is bound with `server.host: true` on port `5173`
  (`vite.config.ts`), so it's reachable in the cloud VM. Run it via a long-lived
  process (e.g. tmux), not a one-shot foreground command.
- `pnpm build` runs `tsc -b` before `vite build`, so a type error fails the
  build even though the dev server tolerates it.
- ESLint 10 flat config: the `eslint-plugin-react-hooks` shareable configs ship
  `plugins` as an array, which ESLint 10 rejects. `eslint.config.js` therefore
  wires the plugins manually as objects — keep that shape if you touch it.
- Vitest uses the jsdom environment and `src/test/setup.ts`
  (`@testing-library/jest-dom`); config is colocated in `vite.config.ts`.

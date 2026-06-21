import { useEffect, useState } from 'react'
import Board from './components/Board'
import StatsBar from './components/StatsBar'
import Toolbar from './components/Toolbar'
import { createGame, placeTile, tick } from './game/engine'
import type { TileType } from './game/types'

const TICK_MS = 2000

export default function App() {
  const [state, setState] = useState(() => createGame())
  const [tool, setTool] = useState<TileType>('residential')

  useEffect(() => {
    const id = setInterval(() => setState((s) => tick(s)), TICK_MS)
    return () => clearInterval(id)
  }, [])

  const handleTileClick = (index: number) => {
    setState((s) => placeTile(s, index, tool))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>
          <span aria-hidden="true">🏙️ </span>SimCityParody
        </h1>
        <p className="tagline">
          Build the tiniest metropolis. Mind the budget, mayor.
        </p>
      </header>

      <StatsBar state={state} />
      <Toolbar selected={tool} onSelect={setTool} />
      <Board state={state} onTileClick={handleTileClick} />

      <footer className="footer">
        Selected tool: <strong>{tool}</strong> · Click a tile to build · Income
        accrues every {TICK_MS / 1000}s
      </footer>
    </div>
  )
}

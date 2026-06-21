import { TILE_DEFS } from '../game/engine'
import type { GameState } from '../game/types'

interface BoardProps {
  state: GameState
  onTileClick: (index: number) => void
}

export default function Board({ state, onTileClick }: BoardProps) {
  return (
    <div
      className="board"
      role="grid"
      aria-label="city map"
      style={{
        gridTemplateColumns: `repeat(${state.size}, 1fr)`,
      }}
    >
      {state.grid.map((type, index) => {
        const def = TILE_DEFS[type]
        return (
          <button
            key={index}
            type="button"
            className="tile"
            role="gridcell"
            aria-label={`${def.label} tile ${index}`}
            data-type={type}
            data-testid={`tile-${index}`}
            style={{ backgroundColor: def.color }}
            onClick={() => onTileClick(index)}
          >
            <span aria-hidden="true">{type === 'grass' ? '' : def.glyph}</span>
          </button>
        )
      })}
    </div>
  )
}

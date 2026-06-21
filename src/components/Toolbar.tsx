import { TILE_DEFS, TOOL_ORDER } from '../game/engine'
import type { TileType } from '../game/types'

interface ToolbarProps {
  selected: TileType
  onSelect: (type: TileType) => void
}

export default function Toolbar({ selected, onSelect }: ToolbarProps) {
  return (
    <div className="toolbar" role="toolbar" aria-label="build tools">
      {TOOL_ORDER.map((type) => {
        const def = TILE_DEFS[type]
        const isSelected = selected === type
        return (
          <button
            key={type}
            type="button"
            className={`tool${isSelected ? ' tool-selected' : ''}`}
            aria-pressed={isSelected}
            onClick={() => onSelect(type)}
          >
            <span className="tool-glyph" aria-hidden="true">
              {def.glyph}
            </span>
            <span className="tool-label">{def.label}</span>
            <span className="tool-cost">${def.cost}</span>
          </button>
        )
      })}
    </div>
  )
}

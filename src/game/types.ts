export type TileType =
  | 'grass'
  | 'road'
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'park'

export interface TileDef {
  type: TileType
  label: string
  /** Build cost in dollars. */
  cost: number
  /** Population added when built. */
  population: number
  /** Recurring income (positive) or upkeep (negative) per tick. */
  income: number
  /** Happiness contribution per tile. */
  happiness: number
  /** Emoji used to render the tile. */
  glyph: string
  /** Tailwind-ish background color. */
  color: string
}

export interface GameState {
  size: number
  /** Flat row-major grid of tile types. */
  grid: TileType[]
  money: number
  population: number
  happiness: number
}

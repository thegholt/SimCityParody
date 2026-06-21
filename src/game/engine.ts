import type { GameState, TileDef, TileType } from './types'

export const GRID_SIZE = 10
export const STARTING_MONEY = 10_000

export const TILE_DEFS: Record<TileType, TileDef> = {
  grass: {
    type: 'grass',
    label: 'Bulldoze',
    cost: 10,
    population: 0,
    income: 0,
    happiness: 0,
    glyph: '🌱',
    color: '#86c06c',
  },
  road: {
    type: 'road',
    label: 'Road',
    cost: 50,
    population: 0,
    income: -1,
    happiness: 0,
    glyph: '🛣️',
    color: '#9ca3af',
  },
  residential: {
    type: 'residential',
    label: 'Residential',
    cost: 200,
    population: 12,
    income: 8,
    happiness: 2,
    glyph: '🏠',
    color: '#6ee7b7',
  },
  commercial: {
    type: 'commercial',
    label: 'Commercial',
    cost: 300,
    population: 4,
    income: 20,
    happiness: 1,
    glyph: '🏢',
    color: '#60a5fa',
  },
  industrial: {
    type: 'industrial',
    label: 'Industrial',
    cost: 400,
    population: 6,
    income: 35,
    happiness: -3,
    glyph: '🏭',
    color: '#fbbf24',
  },
  park: {
    type: 'park',
    label: 'Park',
    cost: 150,
    population: 0,
    income: -2,
    happiness: 6,
    glyph: '🌳',
    color: '#34d399',
  },
}

/** The build tools shown in the toolbar, in display order. */
export const TOOL_ORDER: TileType[] = [
  'residential',
  'commercial',
  'industrial',
  'park',
  'road',
  'grass',
]

export function createGame(size: number = GRID_SIZE): GameState {
  return {
    size,
    grid: Array<TileType>(size * size).fill('grass'),
    money: STARTING_MONEY,
    population: 0,
    happiness: 100,
  }
}

export function indexFor(state: GameState, row: number, col: number): number {
  return row * state.size + col
}

/** Sum the happiness contributions of all built tiles, floored at 0. */
export function computeHappiness(grid: TileType[]): number {
  const total = grid.reduce((acc, type) => acc + TILE_DEFS[type].happiness, 0)
  return Math.max(0, 100 + total)
}

/**
 * Place a tile at the given index. Returns a new state when the action is
 * valid (enough money and the tile actually changes), otherwise returns the
 * original state unchanged.
 */
export function placeTile(
  state: GameState,
  index: number,
  type: TileType,
): GameState {
  if (index < 0 || index >= state.grid.length) return state

  const current = state.grid[index]
  if (current === type) return state

  const def = TILE_DEFS[type]
  if (state.money < def.cost) return state

  const grid = state.grid.slice()
  grid[index] = type

  const prevDef = TILE_DEFS[current]

  return {
    ...state,
    grid,
    money: state.money - def.cost,
    population: state.population - prevDef.population + def.population,
    happiness: computeHappiness(grid),
  }
}

/** Advance the economy one tick, accruing income from all tiles. */
export function tick(state: GameState): GameState {
  const income = state.grid.reduce(
    (acc, type) => acc + TILE_DEFS[type].income,
    0,
  )
  return { ...state, money: state.money + income }
}

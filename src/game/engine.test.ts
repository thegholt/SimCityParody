import { describe, expect, it } from 'vitest'
import {
  GRID_SIZE,
  STARTING_MONEY,
  TILE_DEFS,
  computeHappiness,
  createGame,
  placeTile,
  tick,
} from './engine'

describe('createGame', () => {
  it('creates an all-grass grid with starting resources', () => {
    const game = createGame()
    expect(game.size).toBe(GRID_SIZE)
    expect(game.grid).toHaveLength(GRID_SIZE * GRID_SIZE)
    expect(game.grid.every((t) => t === 'grass')).toBe(true)
    expect(game.money).toBe(STARTING_MONEY)
    expect(game.population).toBe(0)
    expect(game.happiness).toBe(100)
  })
})

describe('placeTile', () => {
  it('builds a residential tile, deducting cost and adding population', () => {
    const game = createGame()
    const next = placeTile(game, 0, 'residential')
    const def = TILE_DEFS.residential
    expect(next.grid[0]).toBe('residential')
    expect(next.money).toBe(STARTING_MONEY - def.cost)
    expect(next.population).toBe(def.population)
  })

  it('does not mutate the original state', () => {
    const game = createGame()
    placeTile(game, 5, 'commercial')
    expect(game.grid[5]).toBe('grass')
    expect(game.money).toBe(STARTING_MONEY)
  })

  it('refuses to build when money is insufficient', () => {
    const game = { ...createGame(), money: 10 }
    const next = placeTile(game, 0, 'industrial')
    expect(next).toBe(game)
  })

  it('is a no-op when the tile type is unchanged', () => {
    const game = createGame()
    const next = placeTile(game, 0, 'grass')
    expect(next).toBe(game)
  })

  it('removes population when bulldozing a populated tile', () => {
    const built = placeTile(createGame(), 3, 'residential')
    const cleared = placeTile(built, 3, 'grass')
    expect(cleared.grid[3]).toBe('grass')
    expect(cleared.population).toBe(0)
  })

  it('ignores out-of-bounds indices', () => {
    const game = createGame()
    expect(placeTile(game, -1, 'park')).toBe(game)
    expect(placeTile(game, 999, 'park')).toBe(game)
  })
})

describe('computeHappiness', () => {
  it('drops below 100 when industry pollutes', () => {
    const game = placeTile(createGame(), 0, 'industrial')
    expect(game.happiness).toBe(100 + TILE_DEFS.industrial.happiness)
  })

  it('never goes negative', () => {
    const grid = Array(50).fill('industrial')
    expect(computeHappiness(grid)).toBe(0)
  })
})

describe('tick', () => {
  it('accrues net income from all tiles', () => {
    const withCommerce = placeTile(createGame(), 0, 'commercial')
    const after = tick(withCommerce)
    expect(after.money).toBe(withCommerce.money + TILE_DEFS.commercial.income)
  })
})

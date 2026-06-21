import { describe, expect, it } from 'vitest'
import { PROJECTS, TOTAL_BUDGET } from '../data/projects'
import {
  allFunded,
  countFunded,
  emptyFunded,
  formatMoney,
  isAllFunded,
  remaining,
  spent,
} from './budget'

describe('funded maps', () => {
  it('starts with nothing funded', () => {
    const f = emptyFunded()
    expect(Object.values(f).every((v) => v === false)).toBe(true)
    expect(countFunded(f)).toBe(0)
    expect(isAllFunded(f)).toBe(false)
  })

  it('marks every project funded with allFunded()', () => {
    const f = allFunded()
    expect(countFunded(f)).toBe(PROJECTS.length)
    expect(isAllFunded(f)).toBe(true)
  })
})

describe('spent / remaining', () => {
  it('positive options total £135M, leaving £0.9M', () => {
    const f = allFunded()
    expect(spent(f)).toBe(135)
    expect(remaining(f)).toBe(0.9)
  })

  it('remaining equals the full budget when nothing is funded', () => {
    expect(remaining(emptyFunded())).toBe(TOTAL_BUDGET)
  })

  it('avoids floating point drift', () => {
    const f = { ...emptyFunded(), galleyHill: true }
    // 135.9 - 50 = 85.9, must be exact
    expect(remaining(f)).toBe(85.9)
  })
})

describe('formatMoney', () => {
  it('renders £0 with no decimal', () => {
    expect(formatMoney(0)).toBe('£0')
  })

  it('keeps one decimal only when needed', () => {
    expect(formatMoney(135.9)).toBe('£135.9M')
    expect(formatMoney(135)).toBe('£135M')
    expect(formatMoney(0.9)).toBe('£0.9M')
  })
})

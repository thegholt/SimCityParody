import { PROJECTS, TOTAL_BUDGET, type ProjectId } from '../data/projects'

export type Phase = 'intro' | 'budget' | 'reveal' | 'ending'

export type FundedMap = Record<ProjectId, boolean>

export function emptyFunded(): FundedMap {
  return PROJECTS.reduce((acc, p) => {
    acc[p.id] = false
    return acc
  }, {} as FundedMap)
}

export function allFunded(): FundedMap {
  return PROJECTS.reduce((acc, p) => {
    acc[p.id] = true
    return acc
  }, {} as FundedMap)
}

/** Total committed so far, in millions of pounds. */
export function spent(funded: FundedMap): number {
  return PROJECTS.reduce((sum, p) => (funded[p.id] ? sum + p.cost : sum), 0)
}

/** Money remaining, in millions of pounds. */
export function remaining(funded: FundedMap): number {
  // Avoid binary-float drift (e.g. 135.9 - 135 !== 0.9).
  return Math.round((TOTAL_BUDGET - spent(funded)) * 10) / 10
}

export function isAllFunded(funded: FundedMap): boolean {
  return PROJECTS.every((p) => funded[p.id])
}

export function countFunded(funded: FundedMap): number {
  return PROJECTS.reduce((n, p) => (funded[p.id] ? n + 1 : n), 0)
}

/** Format a value in millions of pounds as a budget string, e.g. "£135.9M". */
export function formatMoney(millions: number): string {
  if (millions === 0) return '£0'
  const rounded = Math.round(millions * 10) / 10
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1)
  return `£${text}M`
}

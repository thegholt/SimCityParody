import type { GameState } from '../game/types'

interface StatsBarProps {
  state: GameState
}

function format(n: number): string {
  return n.toLocaleString('en-US')
}

export default function StatsBar({ state }: StatsBarProps) {
  return (
    <div className="stats" role="status" aria-label="city statistics">
      <div className="stat">
        <span className="stat-label">💰 Treasury</span>
        <span className="stat-value" data-testid="money">
          ${format(state.money)}
        </span>
      </div>
      <div className="stat">
        <span className="stat-label">👥 Population</span>
        <span className="stat-value" data-testid="population">
          {format(state.population)}
        </span>
      </div>
      <div className="stat">
        <span className="stat-label">😊 Happiness</span>
        <span className="stat-value" data-testid="happiness">
          {state.happiness}%
        </span>
      </div>
    </div>
  )
}

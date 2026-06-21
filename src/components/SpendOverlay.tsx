import { TOTAL_BUDGET } from '../data/projects'
import { formatMoney } from '../game/budget'

interface SpendOverlayProps {
  spent: number
  remaining: number
}

export default function SpendOverlay({ spent, remaining }: SpendOverlayProps) {
  const pct = Math.min(100, Math.round((spent / TOTAL_BUDGET) * 100))

  return (
    <div className="spend-overlay" aria-label="budget tracker">
      <div className="spend-overlay__inner">
        <div className="budget-line">
          <span className="budget-label">Budget</span>
          <span className="budget-amount" data-testid="total-budget">
            {formatMoney(TOTAL_BUDGET)}
          </span>
        </div>
        <div className="budget-bar" aria-hidden="true">
          <div className="budget-bar__fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="budget-line budget-line--small">
          <span>
            Spent <strong data-testid="spent">{formatMoney(spent)}</strong>
          </span>
          <span>
            Left{' '}
            <strong data-testid="remaining" className="budget-left">
              {formatMoney(remaining)}
            </strong>
          </span>
        </div>
      </div>
    </div>
  )
}

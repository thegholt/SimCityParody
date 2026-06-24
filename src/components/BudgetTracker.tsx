import { TOTAL_BUDGET } from '../data/projects'
import { formatMoney } from '../game/budget'

interface BudgetTrackerProps {
  spent: number
  remaining: number
  className?: string
}

export default function BudgetTracker({
  spent,
  remaining,
  className,
}: BudgetTrackerProps) {
  const pct = Math.min(100, Math.round((spent / TOTAL_BUDGET) * 100))

  return (
    <div className={className} aria-label="budget tracker">
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
  )
}

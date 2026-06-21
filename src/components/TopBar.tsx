import { formatMoney } from '../game/budget'
import { TOTAL_BUDGET } from '../data/projects'

interface TopBarProps {
  spent: number
  remaining: number
}

export default function TopBar({ spent, remaining }: TopBarProps) {
  const pct = Math.min(100, Math.round((spent / TOTAL_BUDGET) * 100))
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__logo" aria-hidden="true">
          🏛️
        </span>
        <span className="topbar__title">JimCity</span>
      </div>

      <div className="topbar__budget" aria-label="budget tracker">
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
            Spent{' '}
            <strong data-testid="spent">{formatMoney(spent)}</strong>
          </span>
          <span>
            Left{' '}
            <strong data-testid="remaining" className="budget-left">
              {formatMoney(remaining)}
            </strong>
          </span>
        </div>
      </div>
    </header>
  )
}

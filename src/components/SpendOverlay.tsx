import BudgetTracker from './BudgetTracker'

interface SpendOverlayProps {
  spent: number
  remaining: number
}

export default function SpendOverlay({ spent, remaining }: SpendOverlayProps) {
  return (
    <div className="spend-overlay">
      <div className="spend-overlay__inner">
        <BudgetTracker spent={spent} remaining={remaining} />
      </div>
    </div>
  )
}

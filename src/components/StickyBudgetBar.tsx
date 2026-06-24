import BudgetTracker from './BudgetTracker'

interface StickyBudgetBarProps {
  spent: number
  remaining: number
}

export default function StickyBudgetBar({ spent, remaining }: StickyBudgetBarProps) {
  return (
    <aside className="sticky-budget" aria-label="budget tracker">
      <BudgetTracker spent={spent} remaining={remaining} className="sticky-budget__inner" />
    </aside>
  )
}

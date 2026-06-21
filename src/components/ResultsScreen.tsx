import {
  BAD_ENDING_EXTRAS,
  COPY,
  PROJECTS,
  REJECT_URL,
} from '../data/projects'
import JimPortrait from './JimPortrait'
import PixelButton from './PixelButton'

interface ResultsScreenProps {
  onPlayAgain: () => void
}

export default function ResultsScreen({ onPlayAgain }: ResultsScreenProps) {
  const rows = [
    ...PROJECTS.map((p) => ({
      label: p.resultLabel,
      value: p.badValue,
      bad: true,
    })),
    ...BAD_ENDING_EXTRAS,
  ]

  return (
    <div className="results" data-testid="results-screen">
      <h2 className="results__title">OPTION 4D — FINAL RESULTS</h2>

      <JimPortrait caption={COPY.resultsPortraitCaption} className="jim-portrait--results" />

      <dl className="results__grid">
        {rows.map((row) => (
          <div className="results__row" key={row.label}>
            <dt>{row.label}</dt>
            <dd className={row.bad ? 'results__value results__value--bad' : 'results__value'}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="results__message" data-testid="ending-message">
        {COPY.endingMessage}
      </p>

      <div className="results__actions">
        <PixelButton variant="ghost" onClick={onPlayAgain}>
          {COPY.playAgain}
        </PixelButton>
        <a
          className="pixel-btn pixel-btn--danger"
          href={REJECT_URL}
          target="_blank"
          rel="noreferrer"
        >
          {COPY.rejectButton}
        </a>
      </div>
    </div>
  )
}

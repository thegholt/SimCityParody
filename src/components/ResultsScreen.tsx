import {
  BAD_ENDING_EXTRAS,
  COPY,
  PROJECTS,
  REJECT_URL,
} from '../data/projects'

export default function ResultsScreen() {
  const rows = [
    ...PROJECTS.filter((p) => p.id !== 'galleyHill').map((p) => ({
      label: p.resultLabel,
      value: p.badValue,
      bad: true,
    })),
    ...BAD_ENDING_EXTRAS,
  ]

  return (
    <div className="results" data-testid="results-screen">
      <h2 className="results__title">OPTION 4D — FINAL RESULTS</h2>

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
        <a
          className="pixel-btn pixel-btn--danger results__cta"
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

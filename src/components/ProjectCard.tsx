import type { Project } from '../data/projects'
import { SPRITE_BY_PROJECT } from '../data/sprites'
import { formatMoney } from '../game/budget'
import PixelButton from './PixelButton'

interface ProjectCardProps {
  project: Project
  funded: boolean
  /** Whether the player can currently afford to fund this project. */
  affordable: boolean
  onToggle: (id: Project['id']) => void
}

export default function ProjectCard({
  project,
  funded,
  affordable,
  onToggle,
}: ProjectCardProps) {
  const disabled = !funded && !affordable
  const sprite = SPRITE_BY_PROJECT.get(project.id)
  return (
    <div
      className={`project-card${funded ? ' project-card--funded' : ''}`}
      data-testid={`project-${project.id}`}
      data-funded={funded}
    >
      <div className="project-card__head">
        {sprite ? (
          <img
            className="project-card__sprite"
            src={sprite.image}
            alt=""
            aria-hidden="true"
          />
        ) : (
          <span className="project-card__glyph" aria-hidden="true">
            {project.glyph}
          </span>
        )}
        <div>
          <h3 className="project-card__name">{project.name}</h3>
          <span className="project-card__cost">{formatMoney(project.cost)}</span>
        </div>
        {funded ? (
          <span className="project-card__check" aria-label="funded">
            ✓
          </span>
        ) : null}
      </div>

      <p className="project-card__blurb">
        {funded ? project.fundedSummary : project.blurb}
      </p>

      <PixelButton
        variant={funded ? 'ghost' : 'primary'}
        disabled={disabled}
        aria-pressed={funded}
        onClick={() => onToggle(project.id)}
      >
        {funded ? 'Funded — Undo' : disabled ? 'Not enough budget' : 'Fund it'}
      </PixelButton>
    </div>
  )
}

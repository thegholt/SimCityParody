import dartfordSplit from '../assets/dartford-split.png'
import { COPY } from '../data/projects'
import { MAP_HEIGHT, MAP_WIDTH, SPRITES, spriteMap } from '../data/sprites'
import type { FundedMap } from '../game/budget'
import SpendOverlay from './SpendOverlay'

interface CityMapProps {
  funded: FundedMap
  spent: number
  remaining: number
  /** When true, Option 4D has been chosen: glitch, darken and split the city. */
  divided?: boolean
  /** Show the budget overlay on the map (desktop). */
  showSpendOverlay?: boolean
}

const RESIDENT_COUNT = 12

function spritePosition(x: number, y: number) {
  return {
    left: `${(x / MAP_WIDTH) * 100}%`,
    top: `${(y / MAP_HEIGHT) * 100}%`,
  }
}

export default function CityMap({
  funded,
  spent,
  remaining,
  divided = false,
  showSpendOverlay = true,
}: CityMapProps) {
  const fundedCount = Object.values(funded).filter(Boolean).length
  const happyCount = divided
    ? 0
    : Math.round((fundedCount / 6) * RESIDENT_COUNT)

  return (
    <div
      className={`citymap${divided ? ' citymap--divided' : ''}`}
      data-testid="city-map"
      data-divided={divided}
    >
      <div className="citymap__frame">
        <img
          className="citymap__background"
          src={spriteMap}
          alt="Dartford landscape map"
        />

        <div className="citymap__sprites" aria-hidden="true">
          {SPRITES.map((sprite) => {
            if (sprite.badEndingOnly && !divided) return null

            const projectFunded = sprite.projectId
              ? !divided && funded[sprite.projectId]
              : false

            if (sprite.projectId === 'potholes' && projectFunded) return null

            const active = sprite.badEndingOnly ? divided : projectFunded

            return (
              <div
                key={sprite.spriteName}
                className={`sprite-marker${
                  active ? ' sprite-marker--active' : ' sprite-marker--inactive'
                }${sprite.badEndingOnly ? ' sprite-marker--error' : ''}${
                  sprite.size === 'road' ? ' sprite-marker--road' : ''
                }`}
                style={spritePosition(sprite.x, sprite.y)}
                data-sprite={sprite.spriteName}
                data-project={sprite.projectId}
                data-active={active}
              >
                <img
                  className="sprite-marker__image"
                  src={sprite.image}
                  alt={sprite.displayLabel}
                />
                {sprite.projectId && !divided ? (
                  <span className="sprite-marker__label">
                    {sprite.mapLabel ?? sprite.displayLabel}
                  </span>
                ) : null}
              </div>
            )
          })}
        </div>

        {showSpendOverlay ? (
          <SpendOverlay spent={spent} remaining={remaining} />
        ) : null}

        {divided ? (
          <div className="citymap__split-art" data-testid="dartford-split-art">
            <img
              className="citymap__split-image"
              src={dartfordSplit}
              alt="Dartford split in half along the A2"
            />
            <p className="citymap__split-message" data-testid="split-overlay-message">
              {COPY.splitOverlayMessage}
              <span className="citymap__split-call">{COPY.splitOverlayCallToAction}</span>
            </p>
          </div>
        ) : null}
      </div>

      {!divided ? (
        <div className="citymap__residents" aria-label="constituents mood">
          {Array.from({ length: RESIDENT_COUNT }).map((_, i) => (
            <span
              key={i}
              className={`resident${i < happyCount ? ' resident--happy' : ' resident--sad'}`}
              aria-hidden="true"
            >
              {i < happyCount ? '🙂' : '😐'}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

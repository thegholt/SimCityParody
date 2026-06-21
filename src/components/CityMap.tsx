import dartfordSplit from '../assets/dartford-split.png'
import { PROJECTS, type ProjectId } from '../data/projects'
import type { FundedMap } from '../game/budget'

interface CityMapProps {
  funded: FundedMap
  /** When true, Option 4D has been chosen: glitch, darken and split the city. */
  divided?: boolean
}

type Terrain = 'grass' | 'road' | 'river' | 'pothole'
type Cell = Terrain | ProjectId

const PROJECT_IDS = new Set<string>(PROJECTS.map((p) => p.id))

function isProject(cell: Cell): cell is ProjectId {
  return PROJECT_IDS.has(cell)
}

// 6-wide pixel layout of Dartford. Facility cells share ids with projects so
// they light up when funded.
const LAYOUT: Cell[][] = [
  ['grass', 'healthcare', 'grass', 'grass', 'buses', 'grass'],
  ['road', 'road', 'road', 'road', 'road', 'road'],
  ['business', 'grass', 'police', 'grass', 'grass', 'galleyHill'],
  ['road', 'pothole', 'road', 'pothole', 'road', 'road'],
  ['river', 'river', 'river', 'river', 'river', 'river'],
]

const PROJECT_BY_ID = new Map(PROJECTS.map((p) => [p.id, p]))
const RESIDENT_COUNT = 12

function FacilityCell({
  id,
  funded,
}: {
  id: ProjectId
  funded: boolean
}) {
  const project = PROJECT_BY_ID.get(id)!
  return (
    <div
      className={`map-cell map-cell--facility${
        funded ? ' is-active' : ' is-inactive'
      }`}
      data-facility={id}
      data-active={funded}
    >
      <span className="map-cell__glyph" aria-hidden="true">
        {project.glyph}
      </span>
      <span className="map-cell__label">{project.name}</span>
      {id === 'galleyHill' ? (
        <span className="map-cell__status">{funded ? 'FIXING' : 'CLOSED'}</span>
      ) : null}
    </div>
  )
}

export default function CityMap({ funded, divided = false }: CityMapProps) {
  const potholesFixed = funded.potholes
  const happyCount = divided
    ? 0
    : Math.round(
        (PROJECTS.filter((p) => funded[p.id]).length / PROJECTS.length) *
          RESIDENT_COUNT,
      )

  return (
    <div
      className={`citymap${divided ? ' citymap--divided' : ''}`}
      data-testid="city-map"
      data-divided={divided}
    >
      <div className="citymap__frame">
        <div className="citymap__grid" role="img" aria-label="Dartford map">
          {LAYOUT.flatMap((row, r) =>
            row.map((cell, c) => {
              const key = `${r}-${c}`
              if (isProject(cell)) {
                return (
                  <FacilityCell key={key} id={cell} funded={!divided && funded[cell]} />
                )
              }
              if (cell === 'pothole') {
                const repaired = !divided && potholesFixed
                return (
                  <div
                    key={key}
                    className={`map-cell map-cell--road${
                      repaired ? '' : ' map-cell--pothole'
                    }`}
                    data-repaired={repaired}
                  >
                    {repaired ? null : (
                      <span className="map-cell__pothole" aria-hidden="true">
                        🕳️
                      </span>
                    )}
                  </div>
                )
              }
              return <div key={key} className={`map-cell map-cell--${cell}`} />
            }),
          )}
        </div>

        {divided ? (
          <div className="citymap__split-art" data-testid="dartford-split-art">
            <img
              className="citymap__split-image"
              src={dartfordSplit}
              alt="Dartford split in half along the A2"
            />
          </div>
        ) : null}
      </div>

      <div className="citymap__residents" aria-label="constituents mood">
        {Array.from({ length: RESIDENT_COUNT }).map((_, i) => (
          <span
            key={i}
            className={`resident${i < happyCount ? ' resident--happy' : ' resident--sad'}`}
            aria-hidden="true"
          >
            {divided ? '😠' : i < happyCount ? '🙂' : '😐'}
          </span>
        ))}
      </div>
    </div>
  )
}

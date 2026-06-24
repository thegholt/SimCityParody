import { useLayoutEffect, useMemo, useState } from 'react'
import CityMap from './components/CityMap'
import IntroModal from './components/IntroModal'
import JimChoiceReveal from './components/JimChoiceReveal'
import PixelButton from './components/PixelButton'
import ProjectCard from './components/ProjectCard'
import ResultsScreen from './components/ResultsScreen'
import StickyBudgetBar from './components/StickyBudgetBar'
import TopBar from './components/TopBar'
import { COPY, PROJECTS, type ProjectId } from './data/projects'
import { useMediaQuery } from './hooks/useMediaQuery'
import {
  emptyFunded,
  isAllFunded,
  remaining as remainingOf,
  spent as spentOf,
  type FundedMap,
  type Phase,
} from './game/budget'

export default function App() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [funded, setFunded] = useState<FundedMap>(() => emptyFunded())

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ left: 0, top: 0 })
    const resetId = window.setTimeout(() => window.scrollTo({ left: 0, top: 0 }))

    return () => window.clearTimeout(resetId)
  }, [phase])

  const spent = useMemo(() => spentOf(funded), [funded])
  const remaining = useMemo(() => remainingOf(funded), [funded])
  const everythingFunded = useMemo(() => isAllFunded(funded), [funded])
  const isMobile = useMediaQuery('(max-width: 899px)')

  const toggle = (id: ProjectId) => {
    setFunded((prev) => {
      if (prev[id]) return { ...prev, [id]: false }
      const project = PROJECTS.find((p) => p.id === id)!
      if (remainingOf(prev) < project.cost) return prev
      return { ...prev, [id]: true }
    })
  }

  const showBudgetBar = phase !== 'ending'

  return (
    <div className={`app${phase === 'ending' ? ' app--divided' : ''}`}>
      <TopBar />

      <main className="layout">
        <section className="layout__map">
          <CityMap
            funded={funded}
            spent={spent}
            remaining={remaining}
            divided={phase === 'ending'}
            showSpendOverlay={showBudgetBar && !isMobile}
          />
        </section>

        <section className="layout__panel">
          {phase === 'ending' ? (
            <ResultsScreen />
          ) : (
            <>
              <div className="panel-head">
                <h2>What Dartford Could Have</h2>
                <p className="panel-sub">
                  Fund every project to see what £135.9M could deliver.
                </p>
              </div>

              <div className="project-list">
                {PROJECTS.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    funded={funded[project.id]}
                    affordable={remaining >= project.cost}
                    onToggle={toggle}
                  />
                ))}
              </div>

              {everythingFunded ? (
                <div className="all-funded" data-testid="all-funded">
                  <p className="all-funded__msg">{COPY.budgetAllSelected}</p>
                  <PixelButton
                    variant="danger"
                    onClick={() => setPhase('reveal')}
                  >
                    {COPY.budgetButton}
                  </PixelButton>
                </div>
              ) : null}
            </>
          )}
        </section>
      </main>

      {phase === 'intro' ? (
        <IntroModal onStart={() => setPhase('budget')} />
      ) : null}

      {phase === 'reveal' ? (
        <JimChoiceReveal onConfirm={() => setPhase('ending')} />
      ) : null}

      {showBudgetBar && isMobile ? (
        <StickyBudgetBar spent={spent} remaining={remaining} />
      ) : null}
    </div>
  )
}

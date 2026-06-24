import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { COPY, PROJECTS, REJECT_URL } from './data/projects'

function startGame() {
  render(<App />)
  fireEvent.click(screen.getByRole('button', { name: COPY.introButton }))
}

function fundEveryProject() {
  for (const project of PROJECTS) {
    const card = screen.getByTestId(`project-${project.id}`)
    fireEvent.click(
      within(card).getByRole('button', { name: /Fund it|Funded — Undo/ }),
    )
  }
}

describe('<App /> — Option 4D: The Game flow', () => {
  it('opens on the intro screen', () => {
    render(<App />)
    expect(screen.getByText(COPY.appTitle)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: COPY.introTitle }),
    ).toBeInTheDocument()
    expect(screen.getByText(COPY.introBody[1].text)).toBeInTheDocument()
    expect(screen.getByText(COPY.introCallout)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: COPY.introButton }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('total-budget')).toHaveTextContent('£135.9M')
  })

  it('locks background scrolling while the intro modal is open', () => {
    render(<App />)
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.position).toBe('fixed')
    expect(document.body.style.top).toBe('0px')
    expect(document.body.style.width).toBe('100%')
    expect(document.documentElement.style.overflow).toBe('hidden')

    fireEvent.click(screen.getByRole('button', { name: COPY.introButton }))

    expect(document.body.style.overflow).toBe('')
    expect(document.body.style.position).toBe('')
    expect(document.body.style.top).toBe('')
    expect(document.body.style.width).toBe('')
    expect(document.documentElement.style.overflow).toBe('')
  })

  it('reveals project cards after starting', () => {
    startGame()
    expect(screen.getByTestId('project-healthcare')).toBeInTheDocument()
    expect(screen.getByTestId('project-galleyHill')).toBeInTheDocument()
  })

  it('updates the budget when a project is funded', () => {
    startGame()
    const card = screen.getByTestId('project-galleyHill')
    fireEvent.click(within(card).getByRole('button', { name: 'Fund it' }))
    expect(screen.getByTestId('spent')).toHaveTextContent('£50M')
    expect(screen.getByTestId('remaining')).toHaveTextContent('£85.9M')
    expect(card).toHaveAttribute('data-funded', 'true')
  })

  it('shows the leftover message once everything is funded', () => {
    startGame()
    fundEveryProject()
    expect(screen.getByTestId('all-funded')).toHaveTextContent(
      COPY.budgetAllSelected,
    )
    expect(screen.getByTestId('remaining')).toHaveTextContent('£0.9M')
  })

  it('runs the full path to the Option 4D bad ending', () => {
    startGame()
    fundEveryProject()

    fireEvent.click(screen.getByRole('button', { name: COPY.budgetButton }))
    expect(screen.getByTestId('jim-reveal')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: COPY.revealButton }))

    const results = screen.getByTestId('results-screen')
    expect(results).toBeInTheDocument()
    expect(within(results).getByText('GP Hubs Built')).toBeInTheDocument()
    expect(within(results).queryByText('Galley Hill Fixed')).not.toBeInTheDocument()
    expect(within(results).getByText('Disappointed Constituents')).toBeInTheDocument()
    expect(within(results).getByText('75,426')).toBeInTheDocument()
    expect(screen.getByTestId('ending-message')).toHaveTextContent(
      COPY.endingMessage,
    )
    expect(screen.getByTestId('city-map')).toHaveAttribute(
      'data-divided',
      'true',
    )
    expect(screen.getByTestId('dartford-split-art')).toBeInTheDocument()
    expect(screen.getByTestId('split-overlay-message')).toHaveTextContent(
      COPY.splitOverlayMessage,
    )
    expect(screen.getByTestId('split-overlay-message')).toHaveTextContent(
      COPY.splitOverlayCallToAction,
    )
    expect(screen.getByRole('link', { name: COPY.rejectButton })).toHaveAttribute(
      'href',
      REJECT_URL,
    )
    expect(screen.queryByTestId('total-budget')).not.toBeInTheDocument()
  })
})

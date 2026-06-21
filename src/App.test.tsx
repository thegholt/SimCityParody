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
    fireEvent.click(within(card).getByRole('button'))
  }
}

describe('<App /> — JimCity flow', () => {
  it('opens on the intro screen', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: COPY.introTitle }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('total-budget')).toHaveTextContent('£135.9M')
  })

  it('reveals project cards after starting', () => {
    startGame()
    expect(screen.getByTestId('project-healthcare')).toBeInTheDocument()
    expect(screen.getByTestId('project-galleyHill')).toBeInTheDocument()
  })

  it('updates the budget when a project is funded', () => {
    startGame()
    const card = screen.getByTestId('project-galleyHill')
    fireEvent.click(within(card).getByRole('button'))
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
    expect(screen.getByTestId('jim-portrait')).toBeInTheDocument()
    expect(screen.getByText(COPY.revealPortraitCaption)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: COPY.revealButton }))

    const results = screen.getByTestId('results-screen')
    expect(results).toBeInTheDocument()
    expect(screen.getByTestId('jim-portrait')).toBeInTheDocument()
    expect(screen.getByText(COPY.resultsPortraitCaption)).toBeInTheDocument()
    expect(within(results).getByText('GP Hubs Built')).toBeInTheDocument()
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
    expect(screen.getByRole('link', { name: COPY.rejectButton })).toHaveAttribute(
      'href',
      REJECT_URL,
    )
  })

  it('can play again from the results screen', () => {
    startGame()
    fundEveryProject()
    fireEvent.click(screen.getByRole('button', { name: COPY.budgetButton }))
    fireEvent.click(screen.getByRole('button', { name: COPY.revealButton }))
    fireEvent.click(screen.getByRole('button', { name: COPY.playAgain }))
    expect(
      screen.getByRole('heading', { name: COPY.introTitle }),
    ).toBeInTheDocument()
  })
})

import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { STARTING_MONEY, TILE_DEFS } from './game/engine'

describe('<App />', () => {
  it('renders the title and starting stats', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /SimCityParody/i }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('money')).toHaveTextContent(
      `$${STARTING_MONEY.toLocaleString('en-US')}`,
    )
    expect(screen.getByTestId('population')).toHaveTextContent('0')
  })

  it('builds a residential tile when clicked and updates stats', () => {
    render(<App />)
    fireEvent.click(screen.getByTestId('tile-0'))

    const def = TILE_DEFS.residential
    expect(screen.getByTestId('tile-0')).toHaveAttribute(
      'data-type',
      'residential',
    )
    expect(screen.getByTestId('population')).toHaveTextContent(
      String(def.population),
    )
    expect(screen.getByTestId('money')).toHaveTextContent(
      `$${(STARTING_MONEY - def.cost).toLocaleString('en-US')}`,
    )
  })
})

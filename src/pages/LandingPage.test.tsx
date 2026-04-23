import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LandingPage } from './LandingPage'

describe('LandingPage', () => {
  it('renders the hero and a link to the first lesson', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole('heading', { level: 1, name: /build a real app/i }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('button', { name: /start lesson 1/i }).length,
    ).toBeGreaterThan(0)
  })
})

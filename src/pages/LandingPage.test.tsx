import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LandingPage } from './LandingPage'

describe('LandingPage', () => {
  it('renders key call to action content', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Learn how to turn rough ideas/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Start guided lesson/i })).toBeInTheDocument()
  })
})

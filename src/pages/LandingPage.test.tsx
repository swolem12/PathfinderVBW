import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { LandingPage } from './LandingPage'
import { BuildPackageProvider } from '../state/buildPackage'

describe('LandingPage', () => {
  it('renders the hero headline and primary CTA', () => {
    render(
      <BuildPackageProvider>
        <MemoryRouter>
          <LandingPage />
        </MemoryRouter>
      </BuildPackageProvider>,
    )
    expect(screen.getByLabelText(/Vibe-code an idea/i)).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /start chapter one/i }).length).toBeGreaterThan(0)
  })
})

import { describe, expect, it } from 'vitest'
import { generateBuildPrompt, translateUiRequest } from './promptGenerator'

describe('prompt generator', () => {
  it('creates a structured prompt package', () => {
    const output = generateBuildPrompt(
      {
        appName: 'Ops Tracker',
        audience: 'non-technical operators',
        problemStatement: 'Tasks are scattered across spreadsheets.',
        mvpScope: 'Dashboard, task entry, status board.',
        routeMap: '/, /dashboard, /tasks',
        uiDirection: 'Layered cards with subtle animation.',
        constraints: 'React + TypeScript only.',
      },
      'standard',
    )

    expect(output).toContain('Project: Ops Tracker')
    expect(output).toContain('Mode instruction: Return phased plan')
    expect(output).toContain('Validation: include acceptance checklist')
  })

  it('translates plain UI language into implementable direction', () => {
    const translated = translateUiRequest('a clean dashboard with cards')

    expect(translated).toContain('Create a desktop-first interface')
    expect(translated).toContain('empty/loading/error states')
  })
})

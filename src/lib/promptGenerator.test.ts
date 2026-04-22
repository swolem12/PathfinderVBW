import { describe, expect, it } from 'vitest'
import { assemblePackage } from './promptGenerator'
import { emptyPackage } from '../content/guide'
import type { BuildPackage } from '../types/models'

describe('assemblePackage', () => {
  it('renders stable section headings for an empty package', () => {
    const md = assemblePackage(emptyPackage)
    expect(md).toContain('# Build Prompt Package')
    expect(md).toContain('## 1. Mission')
    expect(md).toContain('## 2. Problem')
    expect(md).toContain('## 3. User')
    expect(md).toContain('## 4. MVP Line')
    expect(md).toContain('## 5. Map')
    expect(md).toContain('## 6. Look')
    expect(md).toContain('## 7. Stack & Constraints')
    expect(md).toContain('## 8. Acceptance Criteria')
    expect(md).toContain('## 9. Handoff')
  })

  it('injects user-supplied content', () => {
    const pkg: BuildPackage = {
      ...emptyPackage,
      mission: 'A task tracker for solo technicians.',
      problem: {
        who: 'solo techs',
        pain: 'lost tasks',
        workaround: 'text threads',
        outcome: 'one list',
      },
      acceptance: ['Dashboard renders', 'Empty state is explicit'],
    }
    const md = assemblePackage(pkg)
    expect(md).toContain('A task tracker for solo technicians.')
    expect(md).toContain('- **Who**: solo techs')
    expect(md).toContain('- Dashboard renders')
    expect(md).toContain('- Empty state is explicit')
  })
})

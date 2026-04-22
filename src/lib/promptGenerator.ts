import type { BuildPackage } from '../types/models'

function bullets(items: string[]): string {
  const filtered = items.map((i) => i.trim()).filter(Boolean)
  if (filtered.length === 0) return '_(none specified)_'
  return filtered.map((i) => `- ${i}`).join('\n')
}

function line(value: string, fallback = '_(not specified)_'): string {
  return value.trim() ? value.trim() : fallback
}

export function assemblePackage(pkg: BuildPackage): string {
  const { mission, problem, user, mvp, map, look, stack, acceptance, handoff } = pkg

  const matrix =
    map.matrix.length > 0
      ? map.matrix
          .filter((r) => r.page.trim() || r.features.trim())
          .map((r) => `| ${r.page || '—'} | ${r.features || '—'} |`)
          .join('\n')
      : '| — | — |'

  return `# Build Prompt Package

## 1. Mission
${line(mission)}

## 2. Problem
- **Who**: ${line(problem.who)}
- **Current pain**: ${line(problem.pain)}
- **Current workaround**: ${line(problem.workaround)}
- **Desired outcome**: ${line(problem.outcome)}

## 3. User
- **Persona**: ${line(user.persona)}
- **Primary job-to-be-done**: ${line(user.primaryJob)}
- **Stories**:
${bullets(user.stories)}

## 4. MVP Line
**Now (ship first):**
${bullets(mvp.now)}

**Next (after first release):**
${bullets(mvp.next)}

**Later (explicitly deferred):**
${bullets(mvp.later)}

## 5. Map
**Routes:**
${bullets(map.routes)}

**Page → Features matrix:**

| Page | Features |
| --- | --- |
${matrix}

## 6. Look
- **Tone words**: ${look.tone.length ? look.tone.join(', ') : '_(not specified)_'}
- **Density**: ${look.density}
- **Motion intensity**: ${look.motion}
- **Notes**: ${line(look.notes)}

## 7. Stack & Constraints
- **Framework**: ${line(stack.framework)}
- **Data**: ${line(stack.data)}
- **Auth**: ${line(stack.auth)}
- **Deploy target**: ${line(stack.deploy)}
- **Non-goals**:
${bullets(stack.nonGoals)}

## 8. Acceptance Criteria
${bullets(acceptance)}

## 9. Handoff
- **Target agent**: ${line(handoff.agent)}
- **Opening prompt**:

\`\`\`
${line(handoff.firstPrompt, 'Build the project described above. Start with the route scaffolding and the Landing page. Do not implement Next or Later features.')}
\`\`\`

---
_Generated with Pathfinder VBW._`
}

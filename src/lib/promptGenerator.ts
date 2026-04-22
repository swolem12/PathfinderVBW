export type PromptMode =
  | 'concise'
  | 'standard'
  | 'deep-build'
  | 'design-heavy'
  | 'debug'
  | 'refactor'
  | 'polish'

export interface PromptInput {
  appName: string
  audience: string
  problemStatement: string
  mvpScope: string
  routeMap: string
  uiDirection: string
  constraints: string
}

const modeInstruction: Record<PromptMode, string> = {
  concise: 'Return a concise implementation plan and start coding immediately.',
  standard: 'Return phased plan, then implement with reusable components and tests.',
  'deep-build': 'Provide architecture, file map, route map, and complete build implementation.',
  'design-heavy': 'Prioritize premium visual hierarchy, motion polish, and UI consistency.',
  debug: 'Investigate failure first. Provide root cause and minimal patch only.',
  refactor: 'Improve maintainability without changing behavior or route contracts.',
  polish: 'Focus on spacing, copy quality, transitions, and accessibility enhancements.',
}

export function generateBuildPrompt(input: PromptInput, mode: PromptMode): string {
  return [
    `Project: ${input.appName}`,
    `Primary audience: ${input.audience}`,
    `Problem statement: ${input.problemStatement}`,
    `MVP scope: ${input.mvpScope}`,
    `Route map: ${input.routeMap}`,
    `UI direction: ${input.uiDirection}`,
    `Constraints: ${input.constraints}`,
    `Mode instruction: ${modeInstruction[mode]}`,
    'Required deliverables: React + TypeScript + Tailwind, modular components, accessibility states, and local run steps.',
    'Validation: include acceptance checklist and targeted test commands.',
  ].join('\n')
}

export function translateUiRequest(value: string): string {
  const normalized = value.trim()
  if (!normalized) {
    return 'Describe your interface goal first, then this translator will convert it to implementation language.'
  }

  return `Create a desktop-first interface for ${normalized}. Include section hierarchy, reusable cards, explicit empty/loading/error states, keyboard focus styles, responsive collapse rules, and subtle staged motion for entrances and state changes.`
}

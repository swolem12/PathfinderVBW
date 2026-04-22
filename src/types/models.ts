export type ChapterId =
  | 'mission'
  | 'problem'
  | 'user'
  | 'mvp'
  | 'map'
  | 'look'
  | 'stack'
  | 'acceptance'
  | 'assemble'
  | 'handoff'

export interface BuildPackage {
  mission: string
  problem: {
    who: string
    pain: string
    workaround: string
    outcome: string
  }
  user: {
    persona: string
    primaryJob: string
    stories: string[]
  }
  mvp: {
    now: string[]
    next: string[]
    later: string[]
  }
  map: {
    routes: string[]
    matrix: { page: string; features: string }[]
  }
  look: {
    tone: string[]
    density: 'airy' | 'balanced' | 'dense'
    motion: 'minimal' | 'present' | 'cinematic'
    notes: string
  }
  stack: {
    framework: string
    data: string
    auth: string
    deploy: string
    nonGoals: string[]
  }
  acceptance: string[]
  handoff: {
    agent: string
    firstPrompt: string
  }
}

export interface ChapterDef {
  id: ChapterId
  number: number
  title: string
  question: string
  why: string
  microDeliverable: string
  antiExample?: string
}

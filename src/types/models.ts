export interface LessonSection {
  id: string
  title: string
  beginnerExplanation: string
  whyItMatters: string
  analogy: string
  goodLooksLike: string
  badLooksLike: string
  examplePrompt: string
  exercise: string
  checklist: string[]
}

export interface LessonModule {
  id: string
  title: string
  objective: string
  visualExplainer: string
  guidedNarrative: string
  antiExample: string
  miniDeliverable: string
  reflectionPrompt: string
  sections: LessonSection[]
}

export interface PromptTemplate {
  id: string
  name: string
  description: string
  template: string
}

export interface UserArtifact {
  id: string
  title: string
  type: 'idea-brief' | 'structure-brief' | 'ui-brief' | 'prompt-package' | 'validation-plan'
  content: string
  updatedAt: string
}

export interface PowerShellStep {
  command: string
  description: string
  expectedOutput: string
}

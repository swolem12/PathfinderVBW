import { advancedLessons } from '../content/advanced'
import { CourseIndexView } from './CourseIndexPage'

export function AdvancedIndexPage() {
  return (
    <CourseIndexView
      lessons={advancedLessons}
      basePath="/advanced"
      eyebrow="Track 04 · Advanced"
      heroTitle="GitHub Codespace, agentic AI, and a live full-stack app."
      heroLead="Seven lessons from an empty GitHub repo to a deployed web application. Create a repository, open Codespace, direct AI agents to build a multi-page app, wire Firebase or Supabase, and publish to GitHub Pages."
    />
  )
}

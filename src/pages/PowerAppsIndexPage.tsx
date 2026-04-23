import { powerAppsLessons } from '../content/powerapps'
import { CourseIndexView } from './CourseIndexPage'

export function PowerAppsIndexPage() {
  return (
    <CourseIndexView
      lessons={powerAppsLessons}
      basePath="/powerapps"
      eyebrow="Microsoft Power Apps track"
      heroTitle="From blank canvas to a published dynamic calendar."
      heroLead="Eight lessons. About eighty minutes. You'll sign in to Power Apps Studio, build a SharePoint-backed Events list, write Power Fx to generate a 7×6 month grid, wire event dots, make it interactive, theme it with Fluent, and share a URL your team can open in a browser or the mobile app."
    />
  )
}

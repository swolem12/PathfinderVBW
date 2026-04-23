import { palantirLessons } from '../content/palantir'
import { CourseIndexView } from './CourseIndexPage'

export function PalantirIndexPage() {
  return (
    <CourseIndexView
      lessons={palantirLessons}
      basePath="/palantir-slate"
      eyebrow="Palantir Slate track"
      heroTitle="From blank Foundry tenant to a published Slate webapp."
      heroLead="Eight lessons. Eighty-five minutes. You will not write a backend — Foundry is the backend. You'll shape data in the Ontology, drag widgets onto a Slate canvas, wire them to Functions, mutate state through Action Types, and publish a URL your team can actually open."
    />
  )
}

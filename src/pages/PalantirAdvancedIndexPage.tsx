import { palantirAdvancedLessons } from '../content/palantir-advanced'
import { CourseIndexView } from './CourseIndexPage'

export function PalantirAdvancedIndexPage() {
  return (
    <CourseIndexView
      lessons={palantirAdvancedLessons}
      basePath="/foundry-engineer"
      eyebrow="Palantir Foundry · Engineer track"
      heroTitle="Code Repositories, PySpark, Pipeline Builder, AIP, Workshop, and Lineage."
      heroLead="Eight lessons aimed at the practitioner who already knows what a dataset is. We walk a single fleet-ops example across both flavors of TypeScript Functions, a PySpark transform, a Pipeline Builder graph, an AIP Logic, a Workshop frontend, and the Lineage graph for both health and schedules."
    />
  )
}

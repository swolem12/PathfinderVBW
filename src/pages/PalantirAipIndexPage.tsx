import { palantirAipLessons } from '../content/palantir-aip'
import { CourseIndexView } from './CourseIndexPage'

export function PalantirAipIndexPage() {
  return (
    <CourseIndexView
      lessons={palantirAipLessons}
      basePath="/palantir-aip"
      eyebrow="Palantir Foundry · AIP Assist Builder"
      heroTitle="Train a folder-scoped AIP Assist bot your team actually trusts."
      heroLead="Four lessons from an empty Compass folder to a cited, embedded, governed, weekly-tuned FleetOps Assist bot. Architecture, build, training through source hygiene + evals, and the ship-and-operate playbook."
    />
  )
}

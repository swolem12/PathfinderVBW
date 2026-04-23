import { palantirAdvancedLessons } from '../content/palantir-advanced'
import { LessonView } from './LessonPage'

export function PalantirAdvancedLessonPage() {
  return <LessonView lessons={palantirAdvancedLessons} basePath="/palantir-engineer" />
}

import { palantirAipLessons } from '../content/palantir-aip'
import { LessonView } from './LessonPage'

export function PalantirAipLessonPage() {
  return <LessonView lessons={palantirAipLessons} basePath="/palantir-aip" />
}

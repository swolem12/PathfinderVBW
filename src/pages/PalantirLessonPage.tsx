import { palantirLessons } from '../content/palantir'
import { LessonView } from './LessonPage'

export function PalantirLessonPage() {
  return <LessonView lessons={palantirLessons} basePath="/palantir-slate" />
}

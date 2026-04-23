import { advancedLessons } from '../content/advanced'
import { LessonView } from './LessonPage'

export function AdvancedLessonPage() {
  return <LessonView lessons={advancedLessons} basePath="/advanced" />
}

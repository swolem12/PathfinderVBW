import { powerAppsLessons } from '../content/powerapps'
import { LessonView } from './LessonPage'

export function PowerAppsLessonPage() {
  return <LessonView lessons={powerAppsLessons} basePath="/powerapps" />
}

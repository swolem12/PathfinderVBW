import { fusion360Lessons } from '../content/fusion360'
import { LessonView } from './LessonPage'

export function Fusion360LessonPage() {
  return <LessonView lessons={fusion360Lessons} basePath="/fusion360" />
}

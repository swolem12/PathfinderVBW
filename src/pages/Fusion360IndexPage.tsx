import { fusion360Lessons } from '../content/fusion360'
import { CourseIndexView } from './CourseIndexPage'

export function Fusion360IndexPage() {
  return (
    <CourseIndexView
      lessons={fusion360Lessons}
      basePath="/fusion360"
      eyebrow="Autodesk · Fusion 360"
      heroTitle="Fusion 360: Tool Mastery and Quick Reference"
      heroLead="A complete walkthrough of every tool in Solid, Mesh, and Sketch workspaces. Includes GIFs, images, and real-world examples."
    />
  )
}

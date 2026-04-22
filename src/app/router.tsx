import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { AboutPage } from '../pages/AboutPage'
import { CapstonePage } from '../pages/CapstonePage'
import { FAQPage } from '../pages/FAQPage'
import { GlossaryPage } from '../pages/GlossaryPage'
import { IdeaStudioPage } from '../pages/IdeaStudioPage'
import { LandingPage } from '../pages/LandingPage'
import { LessonPage } from '../pages/LessonPage'
import { LocalRunWorkshopPage } from '../pages/LocalRunWorkshopPage'
import { ModulePage } from '../pages/ModulePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { PlaygroundPage } from '../pages/PlaygroundPage'
import { PromptForgePage } from '../pages/PromptForgePage'
import { ResourcesPage } from '../pages/ResourcesPage'
import { SavedProjectsPage } from '../pages/SavedProjectsPage'
import { SettingsPage } from '../pages/SettingsPage'
import { StructureStudioPage } from '../pages/StructureStudioPage'
import { TemplatesPage } from '../pages/TemplatesPage'
import { UIPlanningPage } from '../pages/UIPlanningPage'
import { ValidationWorkshopPage } from '../pages/ValidationWorkshopPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'lesson', element: <LessonPage /> },
      { path: 'lesson/module/:id', element: <ModulePage /> },
      { path: 'studio/idea', element: <IdeaStudioPage /> },
      { path: 'studio/structure', element: <StructureStudioPage /> },
      { path: 'studio/ui-planning', element: <UIPlanningPage /> },
      { path: 'forge/prompts', element: <PromptForgePage /> },
      { path: 'workshop/local-run', element: <LocalRunWorkshopPage /> },
      { path: 'workshop/validate', element: <ValidationWorkshopPage /> },
      { path: 'playground', element: <PlaygroundPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'templates', element: <TemplatesPage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'capstone', element: <CapstonePage /> },
      { path: 'glossary', element: <GlossaryPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'saved-projects', element: <SavedProjectsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
], {
  basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
})

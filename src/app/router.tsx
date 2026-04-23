import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { LandingPage } from '../pages/LandingPage'
import { CourseIndexPage } from '../pages/CourseIndexPage'
import { LessonPage } from '../pages/LessonPage'
import { PalantirHubPage } from '../pages/PalantirHubPage'
import { PalantirIndexPage } from '../pages/PalantirIndexPage'
import { PalantirLessonPage } from '../pages/PalantirLessonPage'
import { PalantirAdvancedIndexPage } from '../pages/PalantirAdvancedIndexPage'
import { PalantirAdvancedLessonPage } from '../pages/PalantirAdvancedLessonPage'
import { PalantirAipIndexPage } from '../pages/PalantirAipIndexPage'
import { PalantirAipLessonPage } from '../pages/PalantirAipLessonPage'
import { PowerAppsIndexPage } from '../pages/PowerAppsIndexPage'
import { PowerAppsLessonPage } from '../pages/PowerAppsLessonPage'
import { AdvancedIndexPage } from '../pages/AdvancedIndexPage'
import { AdvancedLessonPage } from '../pages/AdvancedLessonPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppShell />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: 'course', element: <CourseIndexPage /> },
        { path: 'course/:id', element: <LessonPage /> },
        { path: 'palantir', element: <PalantirHubPage /> },
        { path: 'palantir-slate', element: <PalantirIndexPage /> },
        { path: 'palantir-slate/:id', element: <PalantirLessonPage /> },
        { path: 'palantir-engineer', element: <PalantirAdvancedIndexPage /> },
        { path: 'palantir-engineer/:id', element: <PalantirAdvancedLessonPage /> },
        { path: 'palantir-aip', element: <PalantirAipIndexPage /> },
        { path: 'palantir-aip/:id', element: <PalantirAipLessonPage /> },
        { path: 'powerapps', element: <PowerAppsIndexPage /> },
        { path: 'powerapps/:id', element: <PowerAppsLessonPage /> },
        { path: 'advanced', element: <AdvancedIndexPage /> },
        { path: 'advanced/:id', element: <AdvancedLessonPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
  },
)

import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { LandingPage } from '../pages/LandingPage'
import { CourseIndexPage } from '../pages/CourseIndexPage'
import { LessonPage } from '../pages/LessonPage'
import { PalantirIndexPage } from '../pages/PalantirIndexPage'
import { PalantirLessonPage } from '../pages/PalantirLessonPage'
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
        { path: 'palantir', element: <PalantirIndexPage /> },
        { path: 'palantir/:id', element: <PalantirLessonPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
  },
)

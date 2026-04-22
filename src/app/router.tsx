import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { LandingPage } from '../pages/LandingPage'
import { GuidePage } from '../pages/GuidePage'
import { PackagePage } from '../pages/PackagePage'
import { LibraryPage } from '../pages/LibraryPage'
import { AboutPage } from '../pages/AboutPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppShell />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: 'guide', element: <GuidePage /> },
        { path: 'guide/:step', element: <GuidePage /> },
        { path: 'package', element: <PackagePage /> },
        { path: 'library', element: <LibraryPage /> },
        { path: 'about', element: <AboutPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
  },
)

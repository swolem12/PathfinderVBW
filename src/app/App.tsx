import { RouterProvider } from 'react-router-dom'
import { MotionConfig, useReducedMotion } from 'framer-motion'
import { router } from './router'
import { LenisProvider } from '../lib/motion/LenisProvider'
import { Cursor } from '../components/motion/Cursor'
import { BuildPackageProvider } from '../state/buildPackage'

function App() {
  const reducedMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
      <BuildPackageProvider>
        <LenisProvider>
          <Cursor />
          <RouterProvider router={router} />
        </LenisProvider>
      </BuildPackageProvider>
    </MotionConfig>
  )
}

export default App

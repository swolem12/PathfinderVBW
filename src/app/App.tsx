import { RouterProvider } from 'react-router-dom'
import { MotionConfig, useReducedMotion } from 'framer-motion'
import { router } from './router'

function App() {
  const reducedMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
      <RouterProvider router={router} />
    </MotionConfig>
  )
}

export default App

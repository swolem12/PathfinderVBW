import { createContext } from 'react'
import type { BuildPackage } from '../types/models'

type Updater<T> = (prev: T) => T

export interface BuildPackageContextValue {
  pkg: BuildPackage
  update: (updater: Updater<BuildPackage>) => void
  reset: () => void
}

export const BuildPackageContext = createContext<BuildPackageContextValue | null>(null)

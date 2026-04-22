import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { BuildPackage } from '../types/models'
import { loadPackage, savePackage, resetPackage } from '../lib/storage'
import { BuildPackageContext } from './buildPackageContext'

export function BuildPackageProvider({ children }: { children: ReactNode }) {
  const [pkg, setPkg] = useState<BuildPackage>(() => loadPackage())

  useEffect(() => {
    savePackage(pkg)
  }, [pkg])

  const update = useCallback((updater: (prev: BuildPackage) => BuildPackage) => {
    setPkg((prev) => updater(prev))
  }, [])

  const reset = useCallback(() => {
    resetPackage()
    setPkg(loadPackage())
  }, [])

  const value = useMemo(() => ({ pkg, update, reset }), [pkg, update, reset])
  return <BuildPackageContext.Provider value={value}>{children}</BuildPackageContext.Provider>
}

import { useContext } from 'react'
import { BuildPackageContext } from './buildPackageContext'

export function useBuildPackage() {
  const ctx = useContext(BuildPackageContext)
  if (!ctx) throw new Error('useBuildPackage must be used within BuildPackageProvider')
  return ctx
}

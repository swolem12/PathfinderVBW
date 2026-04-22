import type { BuildPackage } from '../types/models'
import { emptyPackage } from '../content/guide'

const KEY = 'pathfinder.package.v1'

export function loadPackage(): BuildPackage {
  if (typeof window === 'undefined') return emptyPackage
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return emptyPackage
    const parsed = JSON.parse(raw) as Partial<BuildPackage>
    return { ...emptyPackage, ...parsed } as BuildPackage
  } catch {
    return emptyPackage
  }
}

let writeTimer: ReturnType<typeof setTimeout> | null = null

export function savePackage(pkg: BuildPackage): void {
  if (typeof window === 'undefined') return
  if (writeTimer) clearTimeout(writeTimer)
  writeTimer = setTimeout(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(pkg))
    } catch {
      /* storage unavailable */
    }
  }, 200)
}

export function resetPackage(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(KEY)
}

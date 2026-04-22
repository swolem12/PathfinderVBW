import type { UserArtifact } from '../types/models'

const STORAGE_KEY = 'pathfinder-vbw-artifacts'

export function readArtifacts(): UserArtifact[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw) as UserArtifact[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveArtifact(artifact: UserArtifact): UserArtifact[] {
  const existing = readArtifacts().filter((item) => item.id !== artifact.id)
  const next = [artifact, ...existing]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

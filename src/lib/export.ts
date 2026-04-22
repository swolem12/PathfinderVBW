import type { UserArtifact } from '../types/models'

export function artifactToMarkdown(artifact: UserArtifact): string {
  return `# ${artifact.title}\n\n- **Type:** ${artifact.type}\n- **Updated:** ${artifact.updatedAt}\n\n## Content\n\n${artifact.content}\n`
}

export function downloadText(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value)
    return true
  } catch {
    return false
  }
}

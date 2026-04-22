import { useMemo } from 'react'
import { SectionCard } from '../components/ui/SectionCard'
import { readArtifacts } from '../lib/storage'
import { artifactToMarkdown, downloadText } from '../lib/export'

export function SavedProjectsPage() {
  const artifacts = useMemo(() => readArtifacts(), [])

  return (
    <SectionCard title="Saved artifacts" description="Review, copy, and export your generated outputs.">
      {artifacts.length === 0 ? (
        <p className="text-sm text-slate-300">No artifacts saved yet. Create one in a studio or forge page.</p>
      ) : (
        <div className="space-y-3">
          {artifacts.map((artifact) => (
            <article key={artifact.id} className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
              <h3 className="text-base font-semibold text-white">{artifact.title}</h3>
              <p className="text-xs text-slate-400">{artifact.updatedAt}</p>
              <pre className="mt-2 whitespace-pre-wrap text-xs text-slate-200">{artifact.content}</pre>
              <button
                type="button"
                onClick={() => downloadText(`${artifact.id}.md`, artifactToMarkdown(artifact))}
                className="btn-secondary mt-2"
              >
                Export Markdown
              </button>
            </article>
          ))}
        </div>
      )}
    </SectionCard>
  )
}

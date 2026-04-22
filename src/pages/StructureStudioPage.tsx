import { useState } from 'react'
import { SectionCard } from '../components/ui/SectionCard'
import { CopyButton } from '../components/ui/CopyButton'
import { saveArtifact } from '../lib/storage'

export function StructureStudioPage() {
  const [pages, setPages] = useState('Dashboard, History, Settings')
  const [features, setFeatures] = useState('Workout log -> Dashboard\nProgress chart -> History')
  const [states, setStates] = useState('Loading\nEmpty\nError\nSuccess')

  const structureBrief = `Page map: ${pages}\n\nFeature mapping:\n${features}\n\nState expectations:\n${states}`

  function save() {
    saveArtifact({
      id: 'structure-brief',
      title: 'App Structure Brief',
      type: 'structure-brief',
      content: structureBrief,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <SectionCard title="App Structure Lab" description="Create a handoff-ready architecture summary for AI coding agents.">
      <div className="grid gap-3">
        <label className="text-sm">
          Sitemap
          <input value={pages} onChange={(event) => setPages(event.target.value)} className="input" />
        </label>
        <label className="text-sm">
          Feature to page matrix
          <textarea value={features} onChange={(event) => setFeatures(event.target.value)} className="input" rows={4} />
        </label>
        <label className="text-sm">
          Required states
          <textarea value={states} onChange={(event) => setStates(event.target.value)} className="input" rows={4} />
        </label>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/60 p-3">
        <pre className="whitespace-pre-wrap text-xs text-slate-100">{structureBrief}</pre>
      </div>

      <div className="mt-4 flex gap-2">
        <CopyButton value={structureBrief} />
        <button type="button" onClick={save} className="btn-secondary">Save structure brief</button>
      </div>
    </SectionCard>
  )
}

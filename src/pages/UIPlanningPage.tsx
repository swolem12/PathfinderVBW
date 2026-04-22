import { useMemo, useState } from 'react'
import { SectionCard } from '../components/ui/SectionCard'
import { CopyButton } from '../components/ui/CopyButton'
import { translateUiRequest } from '../lib/promptGenerator'
import { saveArtifact } from '../lib/storage'

export function UIPlanningPage() {
  const [request, setRequest] = useState('a clean dashboard with cards and graphs')

  const translated = useMemo(() => translateUiRequest(request), [request])

  function save() {
    saveArtifact({
      id: 'ui-brief',
      title: 'UI Direction Brief',
      type: 'ui-brief',
      content: translated,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <SectionCard title="GUI / UX Planning Lab" description="Translate vague adjectives into implementation-ready UI language.">
      <label className="text-sm">
        Plain-English UI request
        <textarea value={request} onChange={(event) => setRequest(event.target.value)} className="input" rows={3} />
      </label>
      <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-3">
        <p className="mb-2 text-xs uppercase tracking-wider text-cyan-200">Component language translator output</p>
        <p className="text-sm text-slate-100">{translated}</p>
      </div>
      <div className="mt-4 flex gap-2">
        <CopyButton value={translated} />
        <button type="button" onClick={save} className="btn-secondary">Save UI brief</button>
      </div>
    </SectionCard>
  )
}

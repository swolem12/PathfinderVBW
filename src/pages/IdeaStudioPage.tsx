import { useState } from 'react'
import { SectionCard } from '../components/ui/SectionCard'
import { CopyButton } from '../components/ui/CopyButton'
import { downloadText } from '../lib/export'
import { saveArtifact } from '../lib/storage'

export function IdeaStudioPage() {
  const [problem, setProblem] = useState('')
  const [user, setUser] = useState('')
  const [outcome, setOutcome] = useState('')
  const [notInScope, setNotInScope] = useState('')

  const brief = `Problem: ${problem}\nPrimary user: ${user}\nCore outcome: ${outcome}\nOut of scope: ${notInScope}`

  function save() {
    saveArtifact({
      id: 'idea-brief',
      title: 'Software Idea Brief',
      type: 'idea-brief',
      content: brief,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <SectionCard title="Idea Framing Studio" description="Turn fuzzy thoughts into a scoped MVP brief.">
      <div className="grid gap-3">
        <label className="text-sm">
          Problem statement
          <textarea value={problem} onChange={(event) => setProblem(event.target.value)} className="input" rows={2} />
        </label>
        <label className="text-sm">
          Target user
          <input value={user} onChange={(event) => setUser(event.target.value)} className="input" />
        </label>
        <label className="text-sm">
          Core outcomes
          <textarea value={outcome} onChange={(event) => setOutcome(event.target.value)} className="input" rows={2} />
        </label>
        <label className="text-sm">
          What this app is NOT
          <input value={notInScope} onChange={(event) => setNotInScope(event.target.value)} className="input" />
        </label>
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/60 p-3">
        <p className="mb-2 text-xs uppercase tracking-wider text-indigo-300">Generated idea brief</p>
        <pre className="whitespace-pre-wrap text-xs text-slate-100">{brief}</pre>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <CopyButton value={brief} />
        <button type="button" onClick={save} className="btn-secondary">Save artifact</button>
        <button type="button" onClick={() => downloadText('idea-brief.txt', brief)} className="btn-secondary">Export TXT</button>
      </div>
    </SectionCard>
  )
}

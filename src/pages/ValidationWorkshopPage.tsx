import { useMemo, useState } from 'react'
import { SectionCard } from '../components/ui/SectionCard'
import { CopyButton } from '../components/ui/CopyButton'

const checks = [
  'Problem solved for intended user',
  'Pages match original scope',
  'UI quality matches intended style',
  'Loading, empty, and error states exist',
  'Mobile layout is usable',
  'Accessibility focus states and labels are present',
]

export function ValidationWorkshopPage() {
  const [status, setStatus] = useState<boolean[]>(checks.map(() => false))
  const [gap, setGap] = useState('')

  const completed = useMemo(() => status.filter(Boolean).length, [status])
  const nextPrompt = `Review this app and patch only the identified gaps: ${gap || 'none listed yet'}. Keep architecture stable and provide a focused validation checklist after changes.`

  return (
    <SectionCard title="Validation + Iteration Workshop" description="Audit output quality and generate the next improvement prompt.">
      <ul className="space-y-2">
        {checks.map((check, index) => (
          <li key={check}>
            <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/50 p-2 text-sm">
              <input
                type="checkbox"
                checked={status[index]}
                onChange={(event) =>
                  setStatus((prev) => prev.map((item, i) => (i === index ? event.target.checked : item)))
                }
              />
              {check}
            </label>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-sm text-indigo-200">Progress: {completed} / {checks.length} checks complete</p>

      <label className="mt-3 block text-sm">
        Biggest quality gap
        <textarea className="input" rows={3} value={gap} onChange={(event) => setGap(event.target.value)} />
      </label>

      <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/60 p-3">
        <pre className="whitespace-pre-wrap text-xs text-slate-100">{nextPrompt}</pre>
      </div>

      <div className="mt-4">
        <CopyButton value={nextPrompt} />
      </div>
    </SectionCard>
  )
}

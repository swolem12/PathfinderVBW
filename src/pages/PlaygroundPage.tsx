import { useMemo, useState } from 'react'
import { SectionCard } from '../components/ui/SectionCard'

const samples = {
  fitness: {
    weak: 'Make a cool fitness app.',
    strong:
      'Build a desktop-and-mobile friendly fitness tracker with dashboard, workout entry form, exercise history, weekly trend chart, and goal cards. Include loading and empty states.',
  },
  inventory: {
    weak: 'Create inventory software for me.',
    strong:
      'Create an inventory dashboard for a small warehouse with item table, reorder alerts, item detail page, search/filter controls, and role-aware edit permissions for manager and staff.',
  },
  scheduler: {
    weak: 'Need a planning tool with calendar.',
    strong:
      'Build a scheduling tool with weekly calendar, appointment form, conflict detection alerts, and a settings page for business hours. Include responsive tablet layout and keyboard navigation.',
  },
} as const

type SampleKey = keyof typeof samples

export function PlaygroundPage() {
  const [sample, setSample] = useState<SampleKey>('fitness')

  const selected = useMemo(() => samples[sample], [sample])

  return (
    <SectionCard title="Playground / Demo Sandbox" description="Compare weak prompts against strong implementation-ready briefs.">
      <label className="text-sm">
        Sample idea
        <select className="input" value={sample} onChange={(event) => setSample(event.target.value as SampleKey)}>
          <option value="fitness">Personal fitness tracker</option>
          <option value="inventory">Inventory management dashboard</option>
          <option value="scheduler">Scheduling tool</option>
        </select>
      </label>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-300/20 bg-rose-500/10 p-3">
          <p className="text-xs uppercase tracking-wider text-rose-200">Weak framing</p>
          <p className="mt-2 text-sm text-slate-100">{selected.weak}</p>
        </div>
        <div className="rounded-xl border border-emerald-300/20 bg-emerald-500/10 p-3">
          <p className="text-xs uppercase tracking-wider text-emerald-200">Strong framing</p>
          <p className="mt-2 text-sm text-slate-100">{selected.strong}</p>
        </div>
      </div>
    </SectionCard>
  )
}

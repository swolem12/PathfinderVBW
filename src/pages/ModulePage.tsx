import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { lessonModules } from '../content/modules'
import { SectionCard } from '../components/ui/SectionCard'

export function ModulePage() {
  const { id = '' } = useParams()
  const module = useMemo(() => lessonModules.find((item) => item.id === id), [id])

  if (!module) {
    return (
      <SectionCard title="Module not found">
        <p className="text-sm text-slate-300">This module does not exist yet.</p>
        <Link to="/lesson" className="mt-4 inline-block text-sm font-semibold text-indigo-300">
          Back to modules
        </Link>
      </SectionCard>
    )
  }

  return (
    <div className="space-y-6">
      <SectionCard title={`Module ${module.id}: ${module.title}`} description={module.objective}>
        <dl className="grid gap-3 text-sm text-slate-200 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <dt className="text-xs uppercase tracking-wider text-indigo-300">Visual explainer</dt>
            <dd className="mt-1">{module.visualExplainer}</dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <dt className="text-xs uppercase tracking-wider text-indigo-300">Mini deliverable</dt>
            <dd className="mt-1">{module.miniDeliverable}</dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-950/50 p-3 md:col-span-2">
            <dt className="text-xs uppercase tracking-wider text-indigo-300">Guided narrative</dt>
            <dd className="mt-1">{module.guidedNarrative}</dd>
          </div>
          <div className="rounded-xl border border-rose-400/20 bg-rose-500/10 p-3 md:col-span-2">
            <dt className="text-xs uppercase tracking-wider text-rose-300">Anti-example</dt>
            <dd className="mt-1">{module.antiExample}</dd>
          </div>
        </dl>
      </SectionCard>

      {module.sections.map((section) => (
        <SectionCard key={section.id} title={section.title} description={section.beginnerExplanation}>
          <div className="space-y-3 text-sm text-slate-200">
            <p><span className="font-semibold text-white">Why it matters:</span> {section.whyItMatters}</p>
            <p><span className="font-semibold text-white">Analogy:</span> {section.analogy}</p>
            <p><span className="font-semibold text-emerald-300">Good:</span> {section.goodLooksLike}</p>
            <p><span className="font-semibold text-rose-300">Bad:</span> {section.badLooksLike}</p>
            <p className="rounded-lg border border-white/10 bg-slate-950/60 p-3 font-mono text-xs">{section.examplePrompt}</p>
            <ul className="list-disc space-y-1 pl-4">
              {section.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </SectionCard>
      ))}
    </div>
  )
}

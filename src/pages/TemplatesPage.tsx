import { promptTemplates } from '../content/modules'
import { SectionCard } from '../components/ui/SectionCard'
import { CopyButton } from '../components/ui/CopyButton'

export function TemplatesPage() {
  return (
    <SectionCard title="Reusable templates" description="Copy and adapt these starter artifacts.">
      <div className="space-y-3">
        {promptTemplates.map((template) => (
          <article key={template.id} className="rounded-xl border border-white/10 bg-slate-950/60 p-3">
            <h3 className="text-base font-semibold text-white">{template.name}</h3>
            <p className="mt-1 text-sm text-slate-300">{template.description}</p>
            <pre className="mt-2 whitespace-pre-wrap text-xs text-slate-200">{template.template}</pre>
            <div className="mt-2"><CopyButton value={template.template} /></div>
          </article>
        ))}
      </div>
    </SectionCard>
  )
}

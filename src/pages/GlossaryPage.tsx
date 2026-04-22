import { SectionCard } from '../components/ui/SectionCard'

const terms = [
  ['MVP', 'Minimum viable product: the smallest version that delivers core value.'],
  ['Information architecture', 'How pages, navigation, and content are organized.'],
  ['Acceptance criteria', 'Specific checks that prove the feature is done correctly.'],
]

export function GlossaryPage() {
  return (
    <SectionCard title="Glossary" description="Instant definitions for common build terms.">
      <dl className="space-y-3 text-sm">
        {terms.map(([term, definition]) => (
          <div key={term} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <dt className="font-semibold text-white">{term}</dt>
            <dd className="mt-1 text-slate-300">{definition}</dd>
          </div>
        ))}
      </dl>
    </SectionCard>
  )
}

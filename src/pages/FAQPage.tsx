import { SectionCard } from '../components/ui/SectionCard'

const faqs = [
  ['Do I need to know code first?', 'No. The lesson uses plain language first and optional deeper technical detail second.'],
  ['Can I use Claude Code or Codex?', 'Yes. Prompt Forge outputs can be tailored to either tool or GitHub coding agents.'],
  ['How do I know if AI output is good?', 'Use the Validation Workshop checklist to compare output against scope and quality criteria.'],
]

export function FAQPage() {
  return (
    <SectionCard title="FAQ" description="Common beginner questions.">
      <div className="space-y-3">
        {faqs.map(([question, answer]) => (
          <article key={question} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <h3 className="text-sm font-semibold text-white">{question}</h3>
            <p className="mt-1 text-sm text-slate-300">{answer}</p>
          </article>
        ))}
      </div>
    </SectionCard>
  )
}

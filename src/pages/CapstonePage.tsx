import { SectionCard } from '../components/ui/SectionCard'

const outputs = [
  'Final problem statement',
  'User definition',
  'MVP scope and non-goals',
  'Page map and feature matrix',
  'UI + motion direction',
  'Full build prompt package',
  'PowerShell run steps',
  'Validation and iteration plan',
]

export function CapstonePage() {
  return (
    <SectionCard title="Capstone" description="Assemble a complete AI-agent handoff package for your own app idea.">
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-200">
        {outputs.map((output) => (
          <li key={output}>{output}</li>
        ))}
      </ul>
    </SectionCard>
  )
}

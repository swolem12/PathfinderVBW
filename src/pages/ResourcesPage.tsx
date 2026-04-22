import { SectionCard } from '../components/ui/SectionCard'

export function ResourcesPage() {
  return (
    <SectionCard title="Resources" description="Quick references for beginner-safe prompt-to-product workflows.">
      <ul className="list-disc space-y-2 pl-5 text-sm text-slate-200">
        <li>Prompt anatomy cheat sheet</li>
        <li>PowerShell launch checklist for Windows</li>
        <li>UI component language translator examples</li>
        <li>Validation and polish pass checklist</li>
      </ul>
    </SectionCard>
  )
}

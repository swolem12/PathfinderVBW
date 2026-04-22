import { useState } from 'react'
import { SectionCard } from '../components/ui/SectionCard'

export function SettingsPage() {
  const [mode, setMode] = useState('absolute beginner')

  return (
    <SectionCard title="Learner settings" description="Choose guidance depth and defaults.">
      <label className="text-sm">
        Learner mode preset
        <select className="input" value={mode} onChange={(event) => setMode(event.target.value)}>
          <option>absolute beginner</option>
          <option>operator / non-coder</option>
          <option>designer trying to build</option>
          <option>founder / strategist</option>
          <option>technical builder needing structure</option>
        </select>
      </label>
    </SectionCard>
  )
}

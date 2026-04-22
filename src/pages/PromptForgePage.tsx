import { useMemo, useState } from 'react'
import { SectionCard } from '../components/ui/SectionCard'
import { CopyButton } from '../components/ui/CopyButton'
import { generateBuildPrompt, type PromptMode } from '../lib/promptGenerator'
import { saveArtifact } from '../lib/storage'

const modes: PromptMode[] = ['concise', 'standard', 'deep-build', 'design-heavy', 'debug', 'refactor', 'polish']

export function PromptForgePage() {
  const [mode, setMode] = useState<PromptMode>('standard')
  const [appName, setAppName] = useState('Personal Fitness Tracker')
  const [audience, setAudience] = useState('first-time coders and operators')
  const [problemStatement, setProblemStatement] = useState('Users cannot quickly log workouts and review progress trends.')
  const [mvpScope, setMvpScope] = useState('Dashboard, workout form, history page, simple goal cards.')
  const [routeMap, setRouteMap] = useState('/, /lesson, /studio/idea, /forge/prompts, /workshop/local-run')
  const [uiDirection, setUiDirection] = useState('Layered cards, subtle motion, clear hierarchy, premium typography.')
  const [constraints, setConstraints] = useState('React + TypeScript + Tailwind. Accessibility-first. No payment features in MVP.')

  const prompt = useMemo(
    () =>
      generateBuildPrompt(
        {
          appName,
          audience,
          problemStatement,
          mvpScope,
          routeMap,
          uiDirection,
          constraints,
        },
        mode,
      ),
    [appName, audience, constraints, mode, mvpScope, problemStatement, routeMap, uiDirection],
  )

  function save() {
    saveArtifact({
      id: `prompt-${mode}`,
      title: `Prompt Package (${mode})`,
      type: 'prompt-package',
      content: prompt,
      updatedAt: new Date().toISOString(),
    })
  }

  return (
    <SectionCard title="Prompt Forge" description="Assemble structured prompts for Claude Code, Codex, and GitHub coding agents.">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm">App name<input className="input" value={appName} onChange={(event) => setAppName(event.target.value)} /></label>
        <label className="text-sm">Audience<input className="input" value={audience} onChange={(event) => setAudience(event.target.value)} /></label>
      </div>
      <label className="mt-3 block text-sm">Problem statement<textarea className="input" rows={2} value={problemStatement} onChange={(event) => setProblemStatement(event.target.value)} /></label>
      <label className="mt-3 block text-sm">MVP scope<textarea className="input" rows={2} value={mvpScope} onChange={(event) => setMvpScope(event.target.value)} /></label>
      <label className="mt-3 block text-sm">Route map<input className="input" value={routeMap} onChange={(event) => setRouteMap(event.target.value)} /></label>
      <label className="mt-3 block text-sm">UI direction<textarea className="input" rows={2} value={uiDirection} onChange={(event) => setUiDirection(event.target.value)} /></label>
      <label className="mt-3 block text-sm">Constraints<textarea className="input" rows={2} value={constraints} onChange={(event) => setConstraints(event.target.value)} /></label>
      <label className="mt-3 block text-sm">Prompt mode
        <select className="input" value={mode} onChange={(event) => setMode(event.target.value as PromptMode)}>
          {modes.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </label>

      <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/60 p-3">
        <pre className="whitespace-pre-wrap text-xs text-slate-100">{prompt}</pre>
      </div>

      <div className="mt-4 flex gap-2">
        <CopyButton value={prompt} />
        <button type="button" onClick={save} className="btn-secondary">Save prompt package</button>
      </div>
    </SectionCard>
  )
}

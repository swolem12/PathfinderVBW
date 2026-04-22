import { useState } from 'react'
import { SectionCard } from '../components/ui/SectionCard'
import { powerShellSteps } from '../content/modules'

export function LocalRunWorkshopPage() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <SectionCard title="Local Run / Packaging Workshop" description="Practice PowerShell commands and expected outputs.">
      <div className="grid gap-4 md:grid-cols-[1fr_1.3fr]">
        <ol className="space-y-2">
          {powerShellSteps.map((step, index) => (
            <li key={step.command}>
              <button
                type="button"
                onClick={() => setActiveStep(index)}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                  activeStep === index
                    ? 'border-emerald-300/60 bg-emerald-500/15 text-white'
                    : 'border-white/10 bg-slate-950/60 text-slate-300 hover:bg-white/5'
                }`}
              >
                {step.command}
              </button>
            </li>
          ))}
        </ol>
        <div className="rounded-xl border border-white/10 bg-black/40 p-4 font-mono text-xs text-emerald-200">
          <p className="text-slate-400">{powerShellSteps[activeStep].description}</p>
          <p className="mt-3">PS C:\\{'> '} {powerShellSteps[activeStep].command}</p>
          <p className="mt-2 whitespace-pre-wrap">{powerShellSteps[activeStep].expectedOutput}</p>
        </div>
      </div>
    </SectionCard>
  )
}

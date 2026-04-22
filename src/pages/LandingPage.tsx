import { ArrowRight, BrainCircuit, Route, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SectionCard } from '../components/ui/SectionCard'

const pipeline = ['Idea', 'Scope', 'Stories', 'Pages', 'Components', 'Prompt package', 'Agent handoff', 'Run + validate']

export function LandingPage() {
  return (
    <div className="space-y-6">
      <motion.section
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-indigo-500/25 via-slate-900/80 to-cyan-500/20 p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-200">Mission-control training platform</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl">
          Learn how to turn rough ideas into real apps with AI coding agents.
        </h1>
        <p className="mt-4 max-w-3xl text-base text-slate-100">
          Pathfinder Vibe Code Wednesday Lesson teaches complete beginners how to frame ideas,
          plan architecture, describe premium UI, generate strong prompts, run builds in PowerShell,
          and iterate with confidence.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/lesson"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
          >
            Start guided lesson <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/playground"
            className="inline-flex items-center rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Open demo sandbox
          </Link>
        </div>
      </motion.section>

      <SectionCard title="From vague idea to working product" description="A practical learning path with reusable artifacts.">
        <ol className="grid gap-3 md:grid-cols-4">
          {pipeline.map((step, index) => (
            <li key={step} className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-sm text-slate-100">
              <span className="text-xs text-indigo-300">Step {index + 1}</span>
              <p className="mt-1 font-medium">{step}</p>
            </li>
          ))}
        </ol>
      </SectionCard>

      <div className="grid gap-4 md:grid-cols-3">
        <SectionCard title="Idea framing studio" description="Define problem, user, and MVP scope before coding.">
          <BrainCircuit className="h-6 w-6 text-indigo-300" />
          <p className="mt-3 text-sm text-slate-200">Generate a concise software brief and anti-scope list to prevent feature drift.</p>
        </SectionCard>
        <SectionCard title="Structure + UI labs" description="Teach architecture language AI can implement.">
          <Route className="h-6 w-6 text-cyan-300" />
          <p className="mt-3 text-sm text-slate-200">Build sitemap, component matrix, and implementation-ready UI instructions.</p>
        </SectionCard>
        <SectionCard title="Run + troubleshoot" description="Practice PowerShell workflow and recovery tactics.">
          <Wrench className="h-6 w-6 text-emerald-300" />
          <p className="mt-3 text-sm text-slate-200">Learn npm install, npm run dev, build checks, and common error interpretation.</p>
        </SectionCard>
      </div>
    </div>
  )
}

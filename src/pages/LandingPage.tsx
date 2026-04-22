import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { SplitText } from '../components/motion/SplitText'
import { Reveal } from '../components/motion/Reveal'
import { chapters } from '../content/guide'

const IcebergScene = lazy(() =>
  import('../components/three/IcebergScene').then((m) => ({ default: m.IcebergScene })),
)

const manifesto = [
  'Vibe coding is not random prompting.',
  'It is direction, scope, and acceptance criteria — translated.',
  'The prompt is the tip. The structure beneath is the iceberg.',
  'We teach the structure, not the tricks.',
  'One idea. Ten chapters. One package. One handoff.',
]

const quotes = [
  'specificity over surface',
  'diagnose before you prescribe',
  'now / next / later',
  'constraints are a feature',
  'the package is the artifact',
  'one user beats three personas',
]

export function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Suspense fallback={null}>
            <IcebergScene />
          </Suspense>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 70%, rgba(14,16,20,0) 0%, var(--bg) 70%)',
            }}
          />
        </div>

        <div className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-40 sm:px-10">
          <motion.p
            className="eyebrow mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Pathfinder — Vibe Code Wednesday
          </motion.p>

          <SplitText
            as="h1"
            className="display"
            text="Turn rough ideas"
            stagger={0.06}
          />
          <SplitText
            as="h1"
            className="display display-italic"
            text="into shippable apps."
            delay={0.25}
            stagger={0.06}
          />

          <Reveal delay={0.8} className="mt-10 flex flex-wrap items-end justify-between gap-8">
            <p className="lead">
              A cinematic, ten-chapter guide that takes a first-time builder from a vague idea
              to a ready-to-paste <em style={{ color: 'var(--ink)' }}>Build Prompt Package</em>
              &nbsp;— the single artifact you hand to an AI coding agent.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/guide" className="btn btn-primary" data-cursor="magnet">
                Start the guide <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/package" className="btn" data-cursor="magnet">
                See the artifact
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Manifesto */}
      <section className="relative mx-auto w-full max-w-[1400px] px-6 py-32 sm:px-10">
        <div className="hairline mb-20" />
        <div className="grid gap-16 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">§ 01 / manifesto</p>
          <div className="space-y-6">
            {manifesto.map((line, i) => (
              <SplitText
                key={line}
                as="p"
                className="h2"
                text={line}
                delay={i * 0.05}
                stagger={0.03}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Chapter ribbon */}
      <section className="relative mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10">
        <div className="hairline mb-12" />
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">§ 02 / the path</p>
            <h2 className="h2">
              Ten chapters. <span className="display-italic">One artifact.</span>
            </h2>
          </div>
          <Link to="/guide" className="link mono" data-cursor="magnet">
            Enter the guide →
          </Link>
        </div>

        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-sm"
          style={{ background: 'var(--edge)' }}
        >
          {chapters.map((c) => (
            <li key={c.id} style={{ background: 'var(--bg)' }}>
              <Link
                to={`/guide/${c.id}`}
                className="group flex items-baseline gap-8 px-4 py-7 transition-colors hover:bg-[color:var(--bg-2)]"
                data-cursor="magnet"
              >
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--ink-dim)',
                    width: 40,
                  }}
                >
                  {String(c.number).padStart(2, '0')}
                </span>
                <span className="h3 flex-1">{c.title}</span>
                <span
                  className="hidden max-w-md text-[color:var(--paper)] md:block"
                  style={{ fontSize: 14 }}
                >
                  {c.question}
                </span>
                <ArrowRight
                  className="h-4 w-4 translate-x-0 opacity-40 transition group-hover:translate-x-2 group-hover:opacity-100"
                  style={{ color: 'var(--accent)' }}
                />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* What you leave with */}
      <section className="relative mx-auto w-full max-w-[1400px] px-6 py-32 sm:px-10">
        <div className="hairline mb-20" />
        <div className="grid gap-16 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">§ 03 / the artifact</p>
          <div>
            <h2 className="h2 mb-6">
              Leave with one <span className="display-italic">readable</span> brief.
            </h2>
            <p className="lead mb-10">
              Not a dashboard, not a course certificate. A single markdown file with your mission,
              users, MVP line, map, UI brief, stack, and acceptance criteria — ready to paste into
              Claude Code, Cursor, Copilot, or Codex.
            </p>

            <Reveal className="rounded-sm border p-8" style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}>
              <pre
                className="overflow-x-auto text-[13px] leading-relaxed"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper)' }}
              >
{`# Build Prompt Package

## 1. Mission
A maintenance tracker for one facility manager and five technicians.

## 2. Problem
- Who: field techs losing tasks in scattered spreadsheets
- Pain: no shared state, no priority signal
- Workaround: group text + memory
- Outcome: one list, current status, assigned owner

## 3. User
- Persona: shift-lead technician, mobile-first
- Primary job: "show me what to fix next"
- Stories: triage, log, handoff

...`}
              </pre>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="relative overflow-hidden py-16" style={{ borderTop: '1px solid var(--edge)', borderBottom: '1px solid var(--edge)' }}>
        <div className="marquee">
          {[...quotes, ...quotes].map((q, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-8"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--paper)' }}
            >
              <em>{q}</em>
              <span style={{ color: 'var(--accent)' }}>✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto w-full max-w-[1400px] px-6 py-40 text-center sm:px-10">
        <SplitText as="h2" className="display" text="Ready when you are." stagger={0.05} />
        <Reveal delay={0.3}>
          <p className="lead mx-auto mt-8">One idea. Ten chapters. One package.</p>
          <Link to="/guide" className="btn btn-primary mt-10 inline-flex" data-cursor="magnet">
            Begin chapter one <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </>
  )
}

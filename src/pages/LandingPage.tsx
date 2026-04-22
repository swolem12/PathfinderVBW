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
  'It is direction, scope, and a prototype running on your desktop.',
  'The prompt is the tip. The structure beneath is the iceberg.',
  'We teach the whole loop — idea to localhost — in ten chapters.',
]

const courseBeats = [
  {
    n: '01',
    label: 'Lesson',
    body: 'Read a short, opinionated teaching — what the chapter is, why it matters, how agents react.',
  },
  {
    n: '02',
    label: 'Exercise',
    body: 'Do one concrete thing: a sentence, a chips selection, a triage of features, a page-to-feature matrix.',
  },
  {
    n: '03',
    label: 'Package',
    body: 'Your answers assemble live into one markdown file — the Build Prompt Package your AI agent reads first.',
  },
  {
    n: '04',
    label: 'Launch',
    body: 'Chapter ten walks you through four PowerShell commands: cd, install, dev, build. Prototype live on your desktop.',
  },
]

const quotes = [
  'idea to localhost',
  'specificity over surface',
  'diagnose before you prescribe',
  'now / next / later',
  'the package is the artifact',
  'npm run dev',
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
            Pathfinder — An interactive course in vibe coding
          </motion.p>

          <SplitText as="h1" className="display" text="Vibe-code an idea," stagger={0.05} />
          <SplitText
            as="h1"
            className="display display-italic"
            text="launch it on your desktop."
            delay={0.25}
            stagger={0.05}
          />

          <Reveal delay={0.8} className="mt-10 flex flex-wrap items-end justify-between gap-8">
            <p className="lead">
              Ten chapters that teach you how to turn a rough idea into a{' '}
              <em style={{ color: 'var(--ink)' }}>Build Prompt Package</em>, hand it to an AI
              coding agent, and run the resulting prototype in PowerShell — all in one sitting.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/guide" className="btn btn-primary" data-cursor="magnet">
                Start chapter one <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/guide/run" className="btn" data-cursor="magnet">
                Jump to the launch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Manifesto */}
      <section className="relative mx-auto w-full max-w-[1400px] px-6 py-32 sm:px-10">
        <div className="hairline mb-20" />
        <div className="grid gap-16 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">§ 01 / why this exists</p>
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

      {/* How the course works */}
      <section className="relative mx-auto w-full max-w-[1400px] px-6 py-32 sm:px-10">
        <div className="hairline mb-20" />
        <div className="grid gap-16 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">§ 02 / how it works</p>
          <div>
            <h2 className="h2 mb-10">
              Every chapter is a lesson <span className="display-italic">and</span> an exercise.
            </h2>
            <ol className="grid gap-px overflow-hidden rounded-sm sm:grid-cols-2" style={{ background: 'var(--edge)' }}>
              {courseBeats.map((b) => (
                <li key={b.n} className="p-8" style={{ background: 'var(--bg)' }}>
                  <div className="flex items-baseline gap-4">
                    <span
                      className="tabular-nums"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--accent)',
                        letterSpacing: '0.22em',
                      }}
                    >
                      {b.n}
                    </span>
                    <span
                      className="uppercase"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.22em',
                        color: 'var(--ink)',
                      }}
                    >
                      {b.label}
                    </span>
                  </div>
                  <p className="mt-4" style={{ color: 'var(--paper)', lineHeight: 1.6 }}>
                    {b.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Chapter ribbon */}
      <section className="relative mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10">
        <div className="hairline mb-12" />
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-3">§ 03 / the syllabus</p>
            <h2 className="h2">
              Ten chapters. <span className="display-italic">One running prototype.</span>
            </h2>
          </div>
          <Link to="/guide" className="link mono" data-cursor="magnet">
            Enter the guide →
          </Link>
        </div>

        <ol
          className="grid grid-cols-1 gap-px overflow-hidden rounded-sm"
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

      {/* PowerShell preview */}
      <section className="relative mx-auto w-full max-w-[1400px] px-6 py-32 sm:px-10">
        <div className="hairline mb-20" />
        <div className="grid gap-16 md:grid-cols-[220px_1fr]">
          <p className="eyebrow">§ 04 / the finish line</p>
          <div>
            <h2 className="h2 mb-6">
              Chapter ten ends in <span className="display-italic">PowerShell</span>.
            </h2>
            <p className="lead mb-10">
              Not a certificate. Not a preview. The four commands that turn whatever your AI agent
              wrote into a running prototype on your machine — with the exact expected output and
              the most common errors pre-debugged.
            </p>

            <Reveal
              className="rounded-sm border"
              style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
            >
              <div
                className="flex items-center justify-between border-b px-4 py-2"
                style={{ borderColor: 'var(--edge)' }}
              >
                <span
                  className="uppercase"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    color: 'var(--ink-dim)',
                  }}
                >
                  Windows PowerShell — C:\projects\my-app
                </span>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: 'var(--accent)' }}
                  aria-hidden
                />
              </div>
              <pre
                className="overflow-x-auto p-6 text-[13px] leading-relaxed"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper)' }}
              >
{`PS C:\\projects\\my-app> npm install
added 312 packages in 14s

PS C:\\projects\\my-app> npm run dev

  VITE v6.0.0  ready in 412 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help`}
              </pre>
            </Reveal>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/guide/run" className="btn btn-primary" data-cursor="magnet">
                See the full walkthrough <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/package" className="btn" data-cursor="magnet">
                See the package artifact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section
        className="relative overflow-hidden py-16"
        style={{ borderTop: '1px solid var(--edge)', borderBottom: '1px solid var(--edge)' }}
      >
        <div className="marquee">
          {[...quotes, ...quotes].map((q, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                color: 'var(--paper)',
              }}
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
          <p className="lead mx-auto mt-8">
            One idea. Ten chapters. One package. One command: <em>npm run dev</em>.
          </p>
          <Link to="/guide" className="btn btn-primary mt-10 inline-flex" data-cursor="magnet">
            Begin chapter one <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </>
  )
}

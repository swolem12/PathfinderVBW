import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { lessons, sampleApp } from '../content/course'

export function LandingPage() {
  const totalMinutes = lessons.reduce((n, l) => n + l.estMinutes, 0)

  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pb-24 pt-24 sm:px-10 md:pt-32">
        <p
          className="mb-8 uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'var(--accent)',
          }}
        >
          An interactive course in vibe coding
        </p>

        <h1
          className="display"
          style={{ fontSize: 'clamp(2.75rem, 6vw + 0.5rem, 6rem)', lineHeight: 1 }}
        >
          Learn to build a real app <br />
          <span className="display-italic">by actually building one.</span>
        </h1>

        <p className="lead mt-10" style={{ maxWidth: '62ch' }}>
          Ten short lessons. You will install Node.js, learn the vocabulary to describe what you
          actually want, write a one-page brief, hand it to ChatGPT&rsquo;s Codex or
          Anthropic&rsquo;s Claude Code, save the files it produces to a folder on your Desktop, and
          run the result in PowerShell &mdash; step by step, with every command and every expected
          output shown. By the end, a working prototype is live on your desktop at{' '}
          <code style={{ color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
            http://localhost:5173
          </code>
          .
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/course/what-is-vibe-coding" className="btn btn-primary">
            Start lesson 1 <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/course" className="btn">
            See the syllabus
          </Link>
        </div>

        <div
          className="mt-10 flex flex-wrap gap-6"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.22em',
            color: 'var(--ink-dim)',
          }}
        >
          <span>~{totalMinutes} minutes</span>
          <span style={{ color: 'var(--edge)' }}>•</span>
          <span>Windows + PowerShell</span>
          <span style={{ color: 'var(--edge)' }}>•</span>
          <span>No prior coding required</span>
        </div>
      </section>

      {/* What you'll build */}
      <section
        className="border-t"
        style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 py-24 sm:px-10">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            <div>
              <p
                className="mb-3 uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  color: 'var(--ink-dim)',
                }}
              >
                What you'll build
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 2.5vw + 0.5rem, 3rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                {sampleApp.name}.
              </h2>
            </div>

            <div>
              <p
                className="lead"
                style={{ fontSize: 'clamp(1.1rem, 0.5vw + 0.9rem, 1.35rem)', color: 'var(--ink)' }}
              >
                {sampleApp.oneLiner}
              </p>
              <p className="mt-6" style={{ color: 'var(--paper)', lineHeight: 1.7 }}>
                You'll follow this exact example end to end. Every prompt in the course is filled in
                for TaskBoard, every PowerShell command is the real one you'll type. When you
                finish, you'll know how to do the same thing with your own idea.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="mx-auto w-full max-w-[1200px] px-6 py-24 sm:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p
              className="mb-3 uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.22em',
                color: 'var(--ink-dim)',
              }}
            >
              Syllabus
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 2.5vw + 0.5rem, 3rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              Ten lessons, one working prototype.
            </h2>
          </div>
        </div>

        <ol
          className="grid gap-px overflow-hidden rounded-lg"
          style={{ background: 'var(--edge)' }}
        >
          {lessons.map((l) => (
            <li key={l.id} style={{ background: 'var(--bg)' }}>
              <Link
                to={`/course/${l.id}`}
                className="group flex items-baseline gap-6 px-5 py-6 transition-colors hover:bg-[color:var(--bg-2)] sm:gap-8"
              >
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--accent)',
                    width: 32,
                    letterSpacing: '0.1em',
                  }}
                >
                  {String(l.number).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.15rem, 1vw + 0.7rem, 1.5rem)',
                      color: 'var(--ink)',
                      marginBottom: 4,
                    }}
                  >
                    {l.title}
                  </h3>
                  <p style={{ color: 'var(--paper)', fontSize: 14 }}>{l.subtitle}</p>
                </div>
                <span
                  className="hidden shrink-0 tabular-nums sm:block"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--ink-dim)',
                    letterSpacing: '0.18em',
                  }}
                >
                  {l.estMinutes} MIN
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 translate-x-0 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100"
                  style={{ color: 'var(--accent)' }}
                />
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link to="/course/what-is-vibe-coding" className="btn btn-primary">
            Start lesson 1 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}

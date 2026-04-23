import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { lessons, sampleApp } from '../content/course'
import { palantirLessons } from '../content/palantir'
import { powerAppsLessons } from '../content/powerapps'
import { LessonBody } from '../components/course/LessonBody'
import { StartButton } from '../components/ui/StartButton'

export function LandingPage() {
  const critical = lessons.filter((l) => !l.optional)
  const optional = lessons.filter((l) => l.optional)
  const criticalMinutes = critical.reduce((n, l) => n + l.estMinutes, 0)
  const palantirCritical = palantirLessons.filter((l) => !l.optional)
  const palantirMinutes = palantirCritical.reduce((n, l) => n + l.estMinutes, 0)
  const powerAppsCritical = powerAppsLessons.filter((l) => !l.optional)
  const powerAppsMinutes = powerAppsCritical.reduce((n, l) => n + l.estMinutes, 0)

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
          Seven lessons. About 30 minutes. Zero code written by you. You install two free tools,
          fill in a 5-field brief, paste it to an AI called Claude Code, run three commands in
          PowerShell. A working prototype opens in your browser at{' '}
          <code style={{ color: 'var(--ink)', fontFamily: 'var(--font-mono)' }}>
            http://localhost:5173
          </code>
          .
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <StartButton>
            Start lesson 1 <ArrowRight className="h-4 w-4" />
          </StartButton>
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
          <span>~{criticalMinutes} minutes</span>
          <span style={{ color: 'var(--edge)' }}>•</span>
          <span>Windows + PowerShell</span>
          <span style={{ color: 'var(--edge)' }}>•</span>
          <span>No prior coding required</span>
        </div>
      </section>

      {/* Track picker */}
      <section
        className="border-t"
        style={{ borderColor: 'var(--edge)', background: 'var(--bg)' }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 py-20 sm:px-10">
          <p
            className="mb-3 uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.22em',
              color: 'var(--ink-dim)',
            }}
          >
            Pick your track
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 2.5vw + 0.5rem, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: 32,
            }}
          >
            Three ways to ship.
          </h2>

          <div className="grid gap-px overflow-hidden rounded-lg" style={{ background: 'var(--edge)' }}>
            <div className="grid gap-px lg:grid-cols-3">
              <Link
                to="/course"
                className="group block p-8 transition-colors hover:bg-[color:var(--bg-2)]"
                style={{ background: 'var(--bg)' }}
              >
                <p
                  className="mb-4 uppercase"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.28em',
                    color: 'var(--accent)',
                  }}
                >
                  Track 01 · Beginner
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.35rem, 1.2vw + 0.8rem, 1.85rem)',
                    color: 'var(--ink)',
                    marginBottom: 10,
                    lineHeight: 1.15,
                  }}
                >
                  Vibe coding on your Desktop
                </h3>
                <p style={{ color: 'var(--paper)', fontSize: 15, lineHeight: 1.6 }}>
                  Install two free tools, paste a 5-field brief to Claude Code, run three PowerShell
                  commands. A working prototype opens on localhost.
                </p>
                <div
                  className="mt-6 flex flex-wrap items-center gap-4"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    color: 'var(--ink-dim)',
                    textTransform: 'uppercase',
                  }}
                >
                  <span>{critical.length} lessons</span>
                  <span style={{ color: 'var(--edge)' }}>•</span>
                  <span>~{criticalMinutes} min</span>
                  <span style={{ color: 'var(--edge)' }}>•</span>
                  <span>localhost prototype</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Start the beginner track
                  </span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>

              <Link
                to="/palantir"
                className="group block p-8 transition-colors hover:bg-[color:var(--bg-2)]"
                style={{ background: 'var(--bg)' }}
              >
                <p
                  className="mb-4 uppercase"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.28em',
                    color: 'var(--accent)',
                  }}
                >
                  Track 02 · Palantir
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.35rem, 1.2vw + 0.8rem, 1.85rem)',
                    color: 'var(--ink)',
                    marginBottom: 10,
                    lineHeight: 1.15,
                  }}
                >
                  Slate webapps in Foundry
                </h3>
                <p style={{ color: 'var(--paper)', fontSize: 15, lineHeight: 1.6 }}>
                  From blank Foundry tenant to a published Slate webapp. Shape the Ontology, write
                  Functions, wire widgets, call Action Types, publish.
                </p>
                <div
                  className="mt-6 flex flex-wrap items-center gap-4"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    color: 'var(--ink-dim)',
                    textTransform: 'uppercase',
                  }}
                >
                  <span>{palantirCritical.length} lessons</span>
                  <span style={{ color: 'var(--edge)' }}>•</span>
                  <span>~{palantirMinutes} min</span>
                  <span style={{ color: 'var(--edge)' }}>•</span>
                  <span>published Slate URL</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Start the Palantir track
                  </span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>

              <Link
                to="/powerapps"
                className="group block p-8 transition-colors hover:bg-[color:var(--bg-2)]"
                style={{ background: 'var(--bg)' }}
              >
                <p
                  className="mb-4 uppercase"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.28em',
                    color: 'var(--accent)',
                  }}
                >
                  Track 03 · Power Apps
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.35rem, 1.2vw + 0.8rem, 1.85rem)',
                    color: 'var(--ink)',
                    marginBottom: 10,
                    lineHeight: 1.15,
                  }}
                >
                  Dynamic calendar in Power Apps
                </h3>
                <p style={{ color: 'var(--paper)', fontSize: 15, lineHeight: 1.6 }}>
                  Open Power Apps Studio, wire a SharePoint list, write Power Fx, render a
                  month grid with event dots, publish a URL your team opens in a browser or the
                  mobile app.
                </p>
                <div
                  className="mt-6 flex flex-wrap items-center gap-4"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    color: 'var(--ink-dim)',
                    textTransform: 'uppercase',
                  }}
                >
                  <span>{powerAppsCritical.length} lessons</span>
                  <span style={{ color: 'var(--edge)' }}>•</span>
                  <span>~{powerAppsMinutes} min</span>
                  <span style={{ color: 'var(--edge)' }}>•</span>
                  <span>published Power App</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Start the Power Apps track
                  </span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </div>
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
                You'll follow this exact example end to end. Every prompt is filled in for
                TaskBoard, every PowerShell command is the real one you'll type. When you finish,
                you'll know how to do the same thing with your own idea.
              </p>
              <div className="mt-8">
                <LessonBody blocks={[{ type: 'preview', caption: 'This is what will be running on your computer.' }]} />
              </div>
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
              Seven lessons, one working prototype.
            </h2>
            <p
              className="mt-3"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.2em',
                color: 'var(--accent)',
                textTransform: 'uppercase',
              }}
            >
              Critical path · {criticalMinutes} min total
            </p>
          </div>
        </div>

        <ol
          className="grid gap-px overflow-hidden rounded-lg"
          style={{ background: 'var(--edge)' }}
        >
          {critical.map((l) => (
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

        {optional.length > 0 && (
          <>
            <p
              className="mt-12 mb-3 uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.22em',
                color: 'var(--ink-dim)',
              }}
            >
              Level up — optional, after you've shipped once
            </p>
            <ol
              className="grid gap-px overflow-hidden rounded-lg"
              style={{ background: 'var(--edge)' }}
            >
              {optional.map((l) => (
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
                        color: 'var(--ink-dim)',
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
          </>
        )}

        <div className="mt-12 flex flex-wrap gap-4">
          <StartButton>
            Start lesson 1 <ArrowRight className="h-4 w-4" />
          </StartButton>
        </div>
      </section>
    </>
  )
}

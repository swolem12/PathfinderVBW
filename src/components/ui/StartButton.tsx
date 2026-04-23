import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'
import { lessons as beginnerLessons } from '../../content/course'
import { palantirLessons } from '../../content/palantir'
import { palantirAdvancedLessons } from '../../content/palantir-advanced'
import { powerAppsLessons } from '../../content/powerapps'

interface StartButtonProps {
  children: ReactNode
  className?: string
}

export function StartButton({ children, className = 'btn btn-primary' }: StartButtonProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const beginnerCritical = beginnerLessons.filter((l) => !l.optional)
  const beginnerMinutes = beginnerCritical.reduce((n, l) => n + l.estMinutes, 0)
  const palantirCritical = palantirLessons.filter((l) => !l.optional)
  const palantirMinutes = palantirCritical.reduce((n, l) => n + l.estMinutes, 0)
  const palantirAdvCritical = palantirAdvancedLessons.filter((l) => !l.optional)
  const palantirAdvMinutes = palantirAdvCritical.reduce((n, l) => n + l.estMinutes, 0)
  const powerAppsCritical = powerAppsLessons.filter((l) => !l.optional)
  const powerAppsMinutes = powerAppsCritical.reduce((n, l) => n + l.estMinutes, 0)

  const firstBeginner = beginnerLessons[0]
  const firstPalantir = palantirLessons[0]
  const firstPalantirAdv = palantirAdvancedLessons[0]
  const firstPowerApps = powerAppsLessons[0]

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="start-picker-title"
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-10"
          style={{ background: 'rgba(8, 10, 14, 0.72)', backdropFilter: 'blur(6px)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div
            className="relative w-full max-w-[960px] rounded-lg border"
            style={{ background: 'var(--bg)', borderColor: 'var(--edge)' }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 inline-flex items-center justify-center rounded-md p-1.5 transition-colors hover:bg-[color:var(--bg-2)]"
              style={{ color: 'var(--ink-dim)' }}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-8 pt-8 pb-4 sm:px-10 sm:pt-10">
              <p
                className="mb-3 uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.28em',
                  color: 'var(--accent)',
                }}
              >
                Pick your track
              </p>
              <h2
                id="start-picker-title"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 2vw + 0.5rem, 2.25rem)',
                  lineHeight: 1.1,
                  color: 'var(--ink)',
                }}
              >
                Which course do you want to start?
              </h2>
            </div>

            <div
              className="grid gap-px overflow-hidden"
              style={{ background: 'var(--edge)', borderTop: '1px solid var(--edge)' }}
            >
              <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4">
                <Link
                  to={`/course/${firstBeginner.id}`}
                  onClick={() => setOpen(false)}
                  className="group block p-7 transition-colors hover:bg-[color:var(--bg-2)]"
                  style={{ background: 'var(--bg)' }}
                >
                  <p
                    className="mb-3 uppercase"
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
                      fontSize: '1.35rem',
                      color: 'var(--ink)',
                      marginBottom: 8,
                      lineHeight: 1.2,
                    }}
                  >
                    Vibe coding on your Desktop
                  </h3>
                  <p style={{ color: 'var(--paper)', fontSize: 14, lineHeight: 1.55 }}>
                    Claude Code + PowerShell. A working prototype on localhost.
                  </p>
                  <div
                    className="mt-5 flex flex-wrap items-center gap-3"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      color: 'var(--ink-dim)',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{beginnerCritical.length} lessons</span>
                    <span style={{ color: 'var(--edge)' }}>•</span>
                    <span>~{beginnerMinutes} min</span>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Start lesson 1
                    </span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>

                <Link
                  to={`/palantir/${firstPalantir.id}`}
                  onClick={() => setOpen(false)}
                  className="group block p-7 transition-colors hover:bg-[color:var(--bg-2)]"
                  style={{ background: 'var(--bg)' }}
                >
                  <p
                    className="mb-3 uppercase"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.28em',
                      color: 'var(--accent)',
                    }}
                  >
                    Track 02 · Palantir Slate
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      color: 'var(--ink)',
                      marginBottom: 8,
                      lineHeight: 1.2,
                    }}
                  >
                    Slate webapps in Foundry
                  </h3>
                  <p style={{ color: 'var(--paper)', fontSize: 14, lineHeight: 1.55 }}>
                    Ontology, Functions, Action Types. Published Slate URL.
                  </p>
                  <div
                    className="mt-5 flex flex-wrap items-center gap-3"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      color: 'var(--ink-dim)',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{palantirCritical.length} lessons</span>
                    <span style={{ color: 'var(--edge)' }}>•</span>
                    <span>~{palantirMinutes} min</span>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Start lesson 1
                    </span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>

                <Link
                  to={`/foundry-engineer/${firstPalantirAdv.id}`}
                  onClick={() => setOpen(false)}
                  className="group block p-7 transition-colors hover:bg-[color:var(--bg-2)]"
                  style={{ background: 'var(--bg)' }}
                >
                  <p
                    className="mb-3 uppercase"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.28em',
                      color: 'var(--accent)',
                    }}
                  >
                    Track 03 · Foundry Engineer
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      color: 'var(--ink)',
                      marginBottom: 8,
                      lineHeight: 1.2,
                    }}
                  >
                    Code Repos, PySpark, AIP, Workshop
                  </h3>
                  <p style={{ color: 'var(--paper)', fontSize: 14, lineHeight: 1.55 }}>
                    The practitioner track. TypeScript Functions, transforms, Lineage.
                  </p>
                  <div
                    className="mt-5 flex flex-wrap items-center gap-3"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      color: 'var(--ink-dim)',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{palantirAdvCritical.length} lessons</span>
                    <span style={{ color: 'var(--edge)' }}>•</span>
                    <span>~{palantirAdvMinutes} min</span>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Start lesson 1
                    </span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>

                <Link
                  to={`/powerapps/${firstPowerApps.id}`}
                  onClick={() => setOpen(false)}
                  className="group block p-7 transition-colors hover:bg-[color:var(--bg-2)]"
                  style={{ background: 'var(--bg)' }}
                >
                  <p
                    className="mb-3 uppercase"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.28em',
                      color: 'var(--accent)',
                    }}
                  >
                    Track 04 · Power Apps
                  </p>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      color: 'var(--ink)',
                      marginBottom: 8,
                      lineHeight: 1.2,
                    }}
                  >
                    Dynamic calendar in Power Apps
                  </h3>
                  <p style={{ color: 'var(--paper)', fontSize: 14, lineHeight: 1.55 }}>
                    Power Fx + SharePoint. Published URL your team opens.
                  </p>
                  <div
                    className="mt-5 flex flex-wrap items-center gap-3"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      color: 'var(--ink-dim)',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{powerAppsCritical.length} lessons</span>
                    <span style={{ color: 'var(--edge)' }}>•</span>
                    <span>~{powerAppsMinutes} min</span>
                  </div>
                  <div className="mt-5 inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Start lesson 1
                    </span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

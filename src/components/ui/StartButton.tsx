import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { lessons as beginnerLessons } from '../../content/course'
import { palantirLessons } from '../../content/palantir'
import { palantirAdvancedLessons } from '../../content/palantir-advanced'
import { powerAppsLessons } from '../../content/powerapps'

interface StartButtonProps {
  children: ReactNode
  className?: string
}

type TileProps = {
  eyebrow: string
  title: string
  body: string
  lessons: number
  minutes: number
  to?: string
  onClick?: () => void
  ctaLabel?: string
}

function Tile({ eyebrow, title, body, lessons, minutes, to, onClick, ctaLabel }: TileProps) {
  const inner = (
    <>
      <p
        className="mb-3 uppercase"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.28em',
          color: 'var(--accent)',
        }}
      >
        {eyebrow}
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
        {title}
      </h3>
      <p style={{ color: 'var(--paper)', fontSize: 14, lineHeight: 1.55 }}>{body}</p>
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
        <span>{lessons} lessons</span>
        <span style={{ color: 'var(--edge)' }}>•</span>
        <span>~{minutes} min</span>
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
          {ctaLabel ?? 'Start lesson 1'}
        </span>
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </>
  )

  const className =
    'group block p-7 text-left transition-colors hover:bg-[color:var(--bg-2)] focus:outline-none focus:bg-[color:var(--bg-2)]'
  const style = { background: 'var(--bg)' }

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={className} style={style}>
        {inner}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={`${className} w-full`} style={style}>
      {inner}
    </button>
  )
}

export function StartButton({ children, className = 'btn btn-primary' }: StartButtonProps) {
  const [open, setOpenState] = useState(false)
  const [view, setView] = useState<'tracks' | 'palantir'>('tracks')

  const setOpen = (next: boolean) => {
    if (next) setView('tracks')
    setOpenState(next)
  }

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

  const palantirTotalLessons = palantirCritical.length + palantirAdvCritical.length
  const palantirTotalMinutes = palantirMinutes + palantirAdvMinutes

  const firstBeginner = beginnerLessons[0]
  const firstPalantir = palantirLessons[0]
  const firstPalantirAdv = palantirAdvancedLessons[0]
  const firstPowerApps = powerAppsLessons[0]

  const close = () => setOpen(false)

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
            if (e.target === e.currentTarget) close()
          }}
        >
          <div
            className="relative w-full max-w-[960px] rounded-lg border"
            style={{ background: 'var(--bg)', borderColor: 'var(--edge)' }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute right-4 top-4 inline-flex items-center justify-center rounded-md p-1.5 transition-colors hover:bg-[color:var(--bg-2)]"
              style={{ color: 'var(--ink-dim)' }}
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-8 pt-8 pb-4 sm:px-10 sm:pt-10">
              {view === 'palantir' ? (
                <button
                  type="button"
                  onClick={() => setView('tracks')}
                  className="mb-3 inline-flex items-center gap-1.5 uppercase transition-colors hover:text-[color:var(--ink)]"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.28em',
                    color: 'var(--ink-dim)',
                  }}
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back to tracks
                </button>
              ) : (
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
              )}
              <h2
                id="start-picker-title"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 2vw + 0.5rem, 2.25rem)',
                  lineHeight: 1.1,
                  color: 'var(--ink)',
                }}
              >
                {view === 'tracks'
                  ? 'Which course do you want to start?'
                  : 'Palantir has two courses. Pick one.'}
              </h2>
              {view === 'palantir' ? (
                <p
                  className="mt-3"
                  style={{ color: 'var(--paper)', fontSize: 14, lineHeight: 1.55 }}
                >
                  <strong>Slate</strong> ships user-facing apps.{' '}
                  <strong>Foundry Engineer</strong> is the practitioner reference for Code
                  Repos, PySpark, AIP, Workshop, and Lineage. Start with whichever matches
                  your day job.
                </p>
              ) : null}
            </div>

            <div
              className="grid gap-px overflow-hidden"
              style={{ background: 'var(--edge)', borderTop: '1px solid var(--edge)' }}
            >
              {view === 'tracks' ? (
                <div className="grid gap-px sm:grid-cols-3">
                  <Tile
                    eyebrow="Track 01 · Beginner"
                    title="Vibe coding on your Desktop"
                    body="Claude Code + PowerShell. A working prototype on localhost."
                    lessons={beginnerCritical.length}
                    minutes={beginnerMinutes}
                    to={`/course/${firstBeginner.id}`}
                    onClick={close}
                  />
                  <Tile
                    eyebrow="Track 02 · Palantir"
                    title="Slate apps + Foundry Engineer"
                    body="Two courses inside one track. Pick Slate or Foundry Engineer next."
                    lessons={palantirTotalLessons}
                    minutes={palantirTotalMinutes}
                    onClick={() => setView('palantir')}
                    ctaLabel="Choose a course"
                  />
                  <Tile
                    eyebrow="Track 03 · Power Apps"
                    title="Dynamic calendar in Power Apps"
                    body="Power Fx + SharePoint. Published URL your team opens."
                    lessons={powerAppsCritical.length}
                    minutes={powerAppsMinutes}
                    to={`/powerapps/${firstPowerApps.id}`}
                    onClick={close}
                  />
                </div>
              ) : (
                <div className="grid gap-px sm:grid-cols-2">
                  <Tile
                    eyebrow="Course A · Slate"
                    title="Slate webapps in Foundry"
                    body="Shape the Ontology, write Functions, drag widgets onto a Slate canvas, wire Action Types. Publish a URL."
                    lessons={palantirCritical.length}
                    minutes={palantirMinutes}
                    to={`/palantir-slate/${firstPalantir.id}`}
                    onClick={close}
                  />
                  <Tile
                    eyebrow="Course B · Foundry Engineer"
                    title="Code Repos, PySpark, AIP, Workshop, Lineage"
                    body="The practitioner reference. TypeScript Metric + Writeback Functions, PySpark transforms, Pipeline Builder, AIP Logic, Workshop, and Lineage (health + schedules)."
                    lessons={palantirAdvCritical.length}
                    minutes={palantirAdvMinutes}
                    to={`/palantir-engineer/${firstPalantirAdv.id}`}
                    onClick={close}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

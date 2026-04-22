import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { LessonDef } from '../content/course'
import { lessons } from '../content/course'

function LessonRow({ l }: { l: LessonDef }) {
  return (
    <li style={{ background: 'var(--bg)' }}>
      <Link
        to={`/course/${l.id}`}
        className="group grid gap-3 px-5 py-6 transition-colors hover:bg-[color:var(--bg-2)] sm:grid-cols-[48px_1fr_auto] sm:gap-6"
      >
        <span
          className="tabular-nums"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--accent)',
            letterSpacing: '0.1em',
          }}
        >
          {String(l.number).padStart(2, '0')}
        </span>
        <div>
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
          <p style={{ color: 'var(--paper)', fontSize: 14, marginBottom: 8 }}>{l.subtitle}</p>
          <p
            style={{
              color: 'var(--ink-dim)',
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginRight: 8,
              }}
            >
              End state
            </span>
            {l.endState}
          </p>
        </div>
        <div className="flex items-center gap-4 self-start">
          <span
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
            className="h-4 w-4 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100"
            style={{ color: 'var(--accent)' }}
          />
        </div>
      </Link>
    </li>
  )
}

export function CourseIndexPage() {
  const critical = lessons.filter((l) => !l.optional)
  const optional = lessons.filter((l) => l.optional)
  const criticalMinutes = critical.reduce((sum, l) => sum + l.estMinutes, 0)

  return (
    <section className="mx-auto w-full max-w-[1000px] px-6 pb-24 pt-20 sm:px-10 md:pt-28">
      <p
        className="mb-6 uppercase"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.28em',
          color: 'var(--accent)',
        }}
      >
        The course
      </p>
      <h1
        className="display"
        style={{ fontSize: 'clamp(2.25rem, 5vw + 0.5rem, 4.5rem)', lineHeight: 1 }}
      >
        30 minutes to a running prototype.
      </h1>
      <p className="lead mt-8">
        Seven lessons to go from nothing to a working app on your Desktop. One optional "Level up"
        lesson for when you want your next brief to be twice as specific as your first.
      </p>

      <div
        className="mt-10 inline-flex flex-wrap items-center gap-3 rounded-lg border px-5 py-3"
        style={{ borderColor: 'var(--accent)', background: 'var(--bg-2)' }}
      >
        <span
          className="uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.22em',
            color: 'var(--accent)',
          }}
        >
          Critical path
        </span>
        <span style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)', fontSize: 18 }}>
          {critical.length} lessons · {criticalMinutes} min
        </span>
      </div>

      <ol
        className="mt-6 grid gap-px overflow-hidden rounded-lg"
        style={{ background: 'var(--edge)' }}
      >
        {critical.map((l) => (
          <LessonRow key={l.id} l={l} />
        ))}
      </ol>

      {optional.length > 0 && (
        <>
          <p
            className="mt-14 mb-3 uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.28em',
              color: 'var(--ink-dim)',
            }}
          >
            Level up — optional
          </p>
          <p style={{ color: 'var(--paper)', fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
            Read these AFTER you've shipped once. They're for making your second prototype much
            more specific than your first.
          </p>
          <ol
            className="grid gap-px overflow-hidden rounded-lg"
            style={{ background: 'var(--edge)' }}
          >
            {optional.map((l) => (
              <LessonRow key={l.id} l={l} />
            ))}
          </ol>
        </>
      )}
    </section>
  )
}

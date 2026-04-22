import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { lessons } from '../content/course'

export function CourseIndexPage() {
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
      <h1 className="display" style={{ fontSize: 'clamp(2.25rem, 5vw + 0.5rem, 4.5rem)', lineHeight: 1 }}>
        Idea → brief → prototype.
      </h1>
      <p className="lead mt-8">
        Seven lessons, in order. Each one is short, concrete, and ends with a checklist you can tick
        off. You can always jump back to a lesson later — everything is accessible directly from
        this page.
      </p>

      <ol
        className="mt-12 grid gap-px overflow-hidden rounded-lg"
        style={{ background: 'var(--edge)' }}
      >
        {lessons.map((l) => (
          <li key={l.id} style={{ background: 'var(--bg)' }}>
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
                <p style={{ color: 'var(--paper)', fontSize: 14, marginBottom: 8 }}>
                  {l.subtitle}
                </p>
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
                    Goal
                  </span>
                  {l.goal}
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
        ))}
      </ol>
    </section>
  )
}

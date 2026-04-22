import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { lessons } from '../content/course'
import { LessonBody } from '../components/course/LessonBody'

export function LessonPage() {
  const { id } = useParams()
  const index = lessons.findIndex((l) => l.id === id)
  const lesson = index >= 0 ? lessons[index] : null

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [id])

  if (!lesson) {
    return (
      <section className="mx-auto w-full max-w-[800px] px-6 py-40 sm:px-10">
        <p className="eyebrow mb-4">404</p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.05,
          }}
        >
          Lesson not found.
        </h1>
        <Link to="/course" className="btn mt-8 inline-flex">
          <ArrowLeft className="h-4 w-4" /> Back to the syllabus
        </Link>
      </section>
    )
  }

  const prev = index > 0 ? lessons[index - 1] : null
  const next = index < lessons.length - 1 ? lessons[index + 1] : null
  const progressPct = Math.round(((index + 1) / lessons.length) * 100)

  return (
    <article className="mx-auto w-full max-w-[820px] px-6 pb-32 pt-20 sm:px-10 md:pt-24">
      {/* Progress bar */}
      <div className="mb-10">
        <div
          className="flex items-center justify-between"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.22em',
            color: 'var(--ink-dim)',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}
        >
          <span>
            Lesson {lesson.number} of {lessons.length}
          </span>
          <span>{progressPct}%</span>
        </div>
        <div
          className="h-px w-full"
          style={{ background: 'var(--edge)', position: 'relative' }}
        >
          <div
            className="h-px"
            style={{
              width: `${progressPct}%`,
              background: 'var(--accent)',
              transition: 'width 400ms var(--ease-out)',
            }}
          />
        </div>
      </div>

      {/* Header */}
      <header className="mb-10">
        <p
          className="mb-4 uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.22em',
            color: 'var(--accent)',
          }}
        >
          Lesson {String(lesson.number).padStart(2, '0')} · {lesson.estMinutes} min
          {lesson.optional ? ' · optional · level up' : ''}
        </p>
        <h1
          className="display"
          style={{
            fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 3.75rem)',
            lineHeight: 1.02,
            marginBottom: 10,
          }}
        >
          {lesson.title}
        </h1>
        <p
          className="display-italic"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.15rem, 1vw + 0.7rem, 1.5rem)',
            color: 'var(--paper)',
          }}
        >
          {lesson.subtitle}
        </p>

        <div
          className="mt-8 grid gap-3 sm:grid-cols-2"
        >
          <div
            className="rounded-lg border p-5"
            style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
          >
            <p
              className="mb-2 uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.22em',
                color: 'var(--ink-dim)',
              }}
            >
              Goal
            </p>
            <p style={{ color: 'var(--ink)', fontSize: 16, lineHeight: 1.55 }}>{lesson.goal}</p>
          </div>
          <div
            className="rounded-lg border p-5"
            style={{ borderColor: 'var(--accent)', background: 'var(--bg-2)' }}
          >
            <p
              className="mb-2 uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.22em',
                color: 'var(--accent)',
              }}
            >
              End of this lesson
            </p>
            <p style={{ color: 'var(--ink)', fontSize: 16, lineHeight: 1.55 }}>{lesson.endState}</p>
          </div>
        </div>
      </header>

      {/* Body */}
      <LessonBody blocks={lesson.blocks} />

      {/* Nav */}
      <nav
        className="mt-16 grid gap-4 border-t pt-8 sm:grid-cols-2"
        style={{ borderColor: 'var(--edge)' }}
      >
        <div>
          {prev ? (
            <Link
              to={`/course/${prev.id}`}
              className="group block rounded-lg border p-5 transition-colors hover:bg-[color:var(--bg-2)]"
              style={{ borderColor: 'var(--edge)' }}
            >
              <p
                className="mb-1 uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  color: 'var(--ink-dim)',
                }}
              >
                ← Previous
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 17,
                  color: 'var(--ink)',
                }}
              >
                {String(prev.number).padStart(2, '0')} · {prev.title}
              </p>
            </Link>
          ) : (
            <Link
              to="/course"
              className="group block rounded-lg border p-5 transition-colors hover:bg-[color:var(--bg-2)]"
              style={{ borderColor: 'var(--edge)' }}
            >
              <p
                className="mb-1 uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  color: 'var(--ink-dim)',
                }}
              >
                ← Back
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 17,
                  color: 'var(--ink)',
                }}
              >
                Syllabus
              </p>
            </Link>
          )}
        </div>

        <div>
          {next ? (
            <Link
              to={`/course/${next.id}`}
              className="group block rounded-lg border p-5 text-right transition-colors hover:bg-[color:var(--bg-2)]"
              style={{
                borderColor: 'var(--accent)',
                background: 'rgba(230, 161, 92, 0.06)',
              }}
            >
              <p
                className="mb-1 uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  color: 'var(--accent)',
                }}
              >
                Next →
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 17,
                  color: 'var(--ink)',
                }}
              >
                {String(next.number).padStart(2, '0')} · {next.title}
              </p>
            </Link>
          ) : (
            <div
              className="rounded-lg border p-5 text-right"
              style={{
                borderColor: 'var(--accent)',
                background: 'rgba(230, 161, 92, 0.06)',
              }}
            >
              <p
                className="mb-1 uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  color: 'var(--accent)',
                }}
              >
                Finished
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 17,
                  color: 'var(--ink)',
                }}
              >
                You did it. Go build something.
              </p>
              <Link to="/course" className="btn mt-4 inline-flex">
                <ArrowLeft className="h-4 w-4" /> Back to syllabus
              </Link>
            </div>
          )}
        </div>
      </nav>

      {next ? (
        <div className="mt-8 flex justify-end">
          <Link to={`/course/${next.id}`} className="btn btn-primary">
            Continue <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : null}
    </article>
  )
}

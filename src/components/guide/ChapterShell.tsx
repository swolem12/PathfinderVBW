import type { ReactNode } from 'react'
import { Reveal } from '../motion/Reveal'
import type { ChapterDef } from '../../types/models'

interface ChapterShellProps {
  chapter: ChapterDef
  children: ReactNode
}

export function ChapterShell({ chapter, children }: ChapterShellProps) {
  return (
    <section
      id={`chapter-${chapter.id}`}
      className="relative scroll-mt-24 border-t"
      style={{ borderColor: 'var(--edge)' }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-6">
              <span
                className="display"
                style={{
                  fontSize: 'clamp(4rem, 10vw, 9rem)',
                  color: 'var(--accent)',
                  lineHeight: 1,
                }}
              >
                {String(chapter.number).padStart(2, '0')}
              </span>
              <div>
                <p className="eyebrow mb-2">Chapter {chapter.number} / 10</p>
                <p
                  className="uppercase tracking-[0.22em]"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--paper)' }}
                >
                  {chapter.title}
                </p>
              </div>
            </div>

            <Reveal className="mt-10">
              <h2 className="h2">{chapter.question}</h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-6">
              <p className="lead">{chapter.why}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="space-y-8">
              {chapter.lesson.map((step, i) => (
                <div key={i} className="flex gap-5">
                  <span
                    className="shrink-0"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'var(--accent)',
                      letterSpacing: '0.18em',
                      paddingTop: 6,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="h3 mb-2" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)' }}>
                      {step.heading}
                    </h3>
                    <p style={{ color: 'var(--paper)', lineHeight: 1.6 }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <div className="space-y-6">
              <div>
                <p className="eyebrow mb-3" style={{ color: 'var(--accent)' }}>
                  Not this
                </p>
                <p
                  className="italic"
                  style={{
                    color: 'var(--paper)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 18,
                    lineHeight: 1.4,
                    opacity: 0.7,
                  }}
                >
                  “{chapter.example.bad}”
                </p>
              </div>
              <div
                className="rounded-sm border p-5"
                style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
              >
                <p className="eyebrow mb-3">This</p>
                <p
                  style={{
                    color: 'var(--ink)',
                    fontFamily: 'var(--font-display)',
                    fontSize: 18,
                    lineHeight: 1.4,
                  }}
                >
                  {chapter.example.good}
                </p>
              </div>

              <div className="pt-4">
                <p className="eyebrow mb-3">You know this chapter when</p>
                <ul className="space-y-2">
                  {chapter.youKnowThisWhen.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3"
                      style={{ color: 'var(--paper)', fontSize: 14, lineHeight: 1.55 }}
                    >
                      <span style={{ color: 'var(--accent)' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="eyebrow mb-4">Your turn — {chapter.microDeliverable}</p>
              {children}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

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
      className="relative min-h-[100svh] scroll-mt-24 border-t"
      style={{ borderColor: 'var(--edge)' }}
    >
      <div className="mx-auto grid w-full max-w-[1400px] gap-16 px-6 py-28 sm:px-10 lg:grid-cols-[1fr_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
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

          <div className="mt-10 space-y-3">
            <p className="eyebrow">Deliverable</p>
            <p style={{ color: 'var(--ink)' }}>{chapter.microDeliverable}</p>
          </div>

          {chapter.antiExample ? (
            <div className="mt-6 space-y-2">
              <p className="eyebrow" style={{ color: 'var(--accent)' }}>
                Not this
              </p>
              <p
                className="italic"
                style={{ color: 'var(--paper)', fontFamily: 'var(--font-display)' }}
              >
                {chapter.antiExample}
              </p>
            </div>
          ) : null}
        </div>

        <Reveal className="lg:pt-32">{children}</Reveal>
      </div>
    </section>
  )
}

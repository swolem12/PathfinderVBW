import { useState } from 'react'
import type { CodeBlock, LessonBlock } from '../../content/course'
import { CopyButton } from '../ui/CopyButton'

function CodeCard({ block }: { block: CodeBlock }) {
  const labelByKind: Record<CodeBlock['kind'], string> = {
    shell: 'PowerShell',
    markdown: 'Markdown',
    prompt: 'Prompt — paste into your AI',
    output: 'Terminal output',
    code: block.language ?? 'Code',
  }

  return (
    <div
      className="my-8 overflow-hidden rounded-lg border"
      style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-2"
        style={{ borderColor: 'var(--edge)' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: 'var(--accent)' }}
            aria-hidden
          />
          <span
            className="uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.22em',
              color: 'var(--ink-dim)',
            }}
          >
            {labelByKind[block.kind]}
            {block.title ? ` — ${block.title}` : ''}
          </span>
        </div>
        <CopyButton value={block.body} label="Copy" />
      </div>
      <pre
        className="overflow-x-auto p-5 text-[13px] leading-relaxed"
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--ink)',
          whiteSpace: 'pre-wrap',
          margin: 0,
        }}
      >
        {block.body}
      </pre>
    </div>
  )
}

function ShellSession({
  lines,
}: {
  lines: { prompt?: string; command?: string; output?: string }[]
}) {
  const full = lines
    .map((l) =>
      l.command ? `${l.prompt ?? 'PS>'} ${l.command}` : l.output ? l.output : (l.prompt ?? ''),
    )
    .join('\n')

  return (
    <div
      className="my-8 overflow-hidden rounded-lg border"
      style={{ borderColor: 'var(--edge)', background: '#0a0c10' }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-2"
        style={{ borderColor: 'var(--edge)' }}
      >
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ff5f56' }} aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ffbd2e' }} aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#27c93f' }} aria-hidden />
          <span
            className="ml-3 uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.22em',
              color: 'var(--ink-dim)',
            }}
          >
            Windows PowerShell
          </span>
        </div>
        <CopyButton value={full} label="Copy" />
      </div>
      <div
        className="p-5 text-[13px] leading-relaxed"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {lines.map((l, i) => {
          if (l.command) {
            return (
              <div key={i} style={{ color: 'var(--ink)' }}>
                <span style={{ color: 'var(--accent)' }}>{l.prompt ?? 'PS>'}</span>{' '}
                <span>{l.command}</span>
              </div>
            )
          }
          if (l.output) {
            return (
              <div
                key={i}
                style={{ color: 'var(--paper)', opacity: 0.85, whiteSpace: 'pre-wrap' }}
              >
                {l.output}
              </div>
            )
          }
          return (
            <div key={i} style={{ color: 'var(--accent)' }}>
              {l.prompt}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CalloutCard({
  kind,
  title,
  body,
}: {
  kind: 'tip' | 'warn' | 'note'
  title: string
  body: string
}) {
  const color =
    kind === 'warn' ? '#e6a15c' : kind === 'tip' ? '#8fbf8f' : 'var(--paper)'
  const label = kind === 'warn' ? 'Watch out' : kind === 'tip' ? 'Tip' : 'Note'
  return (
    <aside
      className="my-8 rounded-lg border-l-2 px-5 py-4"
      style={{
        borderColor: color,
        background: 'rgba(184, 188, 197, 0.04)',
      }}
    >
      <p
        className="mb-2 uppercase"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.22em',
          color,
        }}
      >
        {label} — {title}
      </p>
      <p style={{ color: 'var(--paper)', lineHeight: 1.6 }}>{body}</p>
    </aside>
  )
}

function StepCard({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div
      className="my-6 flex gap-5 rounded-lg border px-5 py-5"
      style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{
          background: 'var(--accent)',
          color: 'var(--bg)',
          fontFamily: 'var(--font-display)',
          fontSize: 18,
          fontWeight: 600,
        }}
        aria-hidden
      >
        {n}
      </div>
      <div className="flex-1">
        <h4
          className="mb-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.05rem, 0.8vw + 0.8rem, 1.25rem)',
            color: 'var(--ink)',
            letterSpacing: '-0.01em',
          }}
        >
          <span className="sr-only">Step {n}: </span>
          {title}
        </h4>
        <p style={{ color: 'var(--paper)', lineHeight: 1.6, fontSize: 16 }}>{body}</p>
      </div>
    </div>
  )
}

function JargonChip({ term, plain }: { term: string; plain: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="my-3 rounded border px-3 py-2"
      style={{
        borderColor: 'var(--edge)',
        background: 'rgba(184, 188, 197, 0.03)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 text-left"
        style={{ color: 'var(--ink)' }}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span
            className="uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
              letterSpacing: '0.22em',
              color: 'var(--accent)',
            }}
          >
            new word
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              color: 'var(--ink)',
            }}
          >
            {term}
          </span>
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--ink-dim)',
          }}
        >
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p
          className="mt-2"
          style={{ color: 'var(--paper)', fontSize: 14, lineHeight: 1.55 }}
        >
          {plain}
        </p>
      )}
    </div>
  )
}

function DetailsBlock({ summary, blocks }: { summary: string; blocks: LessonBlock[] }) {
  return (
    <details
      className="my-6 rounded-lg border px-5 py-3"
      style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
    >
      <summary
        className="cursor-pointer py-2"
        style={{
          color: 'var(--ink)',
          fontFamily: 'var(--font-display)',
          fontSize: 15,
          letterSpacing: '-0.01em',
        }}
      >
        {summary}
      </summary>
      <div className="pt-2">
        <LessonBody blocks={blocks} />
      </div>
    </details>
  )
}

function PreviewMock({ caption }: { caption: string }) {
  const columns: { title: string; cards: { title: string; priority: 'low' | 'med' | 'high' }[] }[] =
    [
      {
        title: 'Open',
        cards: [
          { title: 'Replace HVAC filter — shop A', priority: 'med' },
          { title: 'Reset access panel PIN', priority: 'low' },
        ],
      },
      {
        title: 'In progress',
        cards: [
          { title: 'Diagnose conveyor #2 fault', priority: 'high' },
          { title: 'Order replacement bearings', priority: 'med' },
        ],
      },
      {
        title: 'Done',
        cards: [{ title: 'Monthly generator test', priority: 'low' }],
      },
    ]

  const dotColor = (p: 'low' | 'med' | 'high') =>
    p === 'high' ? '#e6a15c' : p === 'med' ? 'rgba(230,161,92,0.55)' : 'rgba(184,188,197,0.5)'

  return (
    <figure
      className="my-8 overflow-hidden rounded-lg border"
      style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-2"
        style={{ borderColor: 'var(--edge)' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: 'var(--accent)' }}
            aria-hidden
          />
          <span
            className="uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.22em',
              color: 'var(--ink-dim)',
            }}
          >
            Preview — what you'll have running
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--ink-dim)',
          }}
        >
          localhost:5173
        </span>
      </div>
      <div className="p-5" style={{ background: '#fafaf7' }}>
        <div
          className="mb-4 flex items-center justify-between"
          style={{ color: '#1b1d22' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              letterSpacing: '-0.02em',
            }}
          >
            TaskBoard
          </span>
          <span
            style={{
              background: '#e6a15c',
              color: '#1b1d22',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              padding: '6px 10px',
              borderRadius: 4,
            }}
          >
            + New task
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {columns.map((col) => (
            <div
              key={col.title}
              className="rounded"
              style={{ background: '#fff', border: '1px solid #e7e5df', padding: 10 }}
            >
              <div
                className="mb-2 uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  color: '#6e6a62',
                }}
              >
                {col.title} · {col.cards.length}
              </div>
              <div className="space-y-2">
                {col.cards.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded"
                    style={{
                      background: '#fafaf7',
                      border: '1px solid #ecebe4',
                      padding: 8,
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      color: '#1b1d22',
                      lineHeight: 1.35,
                    }}
                  >
                    <span
                      className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full"
                      style={{ background: dotColor(c.priority) }}
                      aria-hidden
                    />
                    <span>{c.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption
        className="border-t px-4 py-2 text-center"
        style={{
          borderColor: 'var(--edge)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--ink-dim)',
        }}
      >
        {caption}
      </figcaption>
    </figure>
  )
}

export function LessonBody({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="prose-lesson">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return (
              <p key={i} className="my-5" style={{ color: 'var(--paper)', lineHeight: 1.7, fontSize: 17 }}>
                {block.body}
              </p>
            )
          case 'h':
            return (
              <h3
                key={i}
                className="mt-12 mb-3"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.3rem, 1.4vw + 0.9rem, 1.75rem)',
                  color: 'var(--ink)',
                  letterSpacing: '-0.01em',
                }}
              >
                {block.body}
              </h3>
            )
          case 'list':
            return (
              <ul key={i} className="my-5 space-y-2 pl-5">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="relative"
                    style={{ color: 'var(--paper)', lineHeight: 1.6, fontSize: 16 }}
                  >
                    <span
                      className="absolute -left-5"
                      style={{ color: 'var(--accent)' }}
                    >
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )
          case 'checklist':
            return (
              <div
                key={i}
                className="my-8 rounded-lg border p-5"
                style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
              >
                <p
                  className="mb-3 uppercase"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    color: 'var(--ink-dim)',
                  }}
                >
                  Done with this lesson when
                </p>
                <ul className="space-y-2">
                  {block.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex gap-3"
                      style={{ color: 'var(--paper)', fontSize: 15, lineHeight: 1.55 }}
                    >
                      <span style={{ color: 'var(--accent)' }}>☐</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          case 'code':
            return <CodeCard key={i} block={block.block} />
          case 'callout':
            return (
              <CalloutCard
                key={i}
                kind={block.callout.kind}
                title={block.callout.title}
                body={block.callout.body}
              />
            )
          case 'shellSession':
            return <ShellSession key={i} lines={block.lines} />
          case 'step':
            return <StepCard key={i} n={block.n} title={block.title} body={block.body} />
          case 'jargon':
            return <JargonChip key={i} term={block.term} plain={block.plain} />
          case 'details':
            return <DetailsBlock key={i} summary={block.summary} blocks={block.blocks} />
          case 'preview':
            return <PreviewMock key={i} caption={block.caption} />
          default:
            return null
        }
      })}
    </div>
  )
}

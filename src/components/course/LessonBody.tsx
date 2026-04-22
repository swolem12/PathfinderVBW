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
          default:
            return null
        }
      })}
    </div>
  )
}

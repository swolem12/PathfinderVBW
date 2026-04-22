import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CodeBlock, LessonBlock } from '../../content/course'
import { CopyButton } from '../ui/CopyButton'

/* ------------------------------------------------------------------ */
/*  Primitives                                                        */
/* ------------------------------------------------------------------ */

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
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ delay: i * 0.04, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                style={{ color: 'var(--ink)' }}
              >
                <span style={{ color: 'var(--accent)' }}>{l.prompt ?? 'PS>'}</span>{' '}
                <span>{l.command}</span>
              </motion.div>
            )
          }
          if (l.output) {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.85 }}
                viewport={{ once: true, margin: '-20%' }}
                transition={{ delay: i * 0.04 + 0.1, duration: 0.3 }}
                style={{ color: 'var(--paper)', whiteSpace: 'pre-wrap' }}
              >
                {l.output}
              </motion.div>
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
  const color = kind === 'warn' ? '#e6a15c' : kind === 'tip' ? '#8fbf8f' : 'var(--paper)'
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
    <motion.div
      className="my-6 flex gap-5 rounded-lg border px-5 py-5"
      style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{
          background: 'var(--accent)',
          color: 'var(--bg)',
          fontFamily: 'var(--font-display)',
          fontSize: 18,
          fontWeight: 600,
        }}
        initial={{ scale: 0.6, rotate: -20 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
        aria-hidden
      >
        {n}
      </motion.div>
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
    </motion.div>
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
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.18 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            color: 'var(--ink-dim)',
            display: 'inline-block',
          }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            key="def"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              color: 'var(--paper)',
              fontSize: 14,
              lineHeight: 1.55,
              overflow: 'hidden',
            }}
          >
            {plain}
          </motion.p>
        )}
      </AnimatePresence>
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
        <LessonBody blocks={blocks} animate={false} />
      </div>
    </details>
  )
}

/* ------------------------------------------------------------------ */
/*  PreviewMock — animated TaskBoard kanban                           */
/* ------------------------------------------------------------------ */

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

  let cardIndex = 0
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
        <motion.div
          className="mb-4 flex items-center justify-between"
          style={{ color: '#1b1d22' }}
          initial={{ opacity: 0, y: -4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.35 }}
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
        </motion.div>
        <div className="grid grid-cols-3 gap-3">
          {columns.map((col, ci) => (
            <div
              key={col.title}
              className="rounded"
              style={{ background: '#fff', border: '1px solid #e7e5df', padding: 10 }}
            >
              <motion.div
                className="mb-2 uppercase"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: ci * 0.08, duration: 0.3 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  color: '#6e6a62',
                }}
              >
                {col.title} · {col.cards.length}
              </motion.div>
              <div className="space-y-2">
                {col.cards.map((c) => {
                  const i = cardIndex++
                  return (
                    <motion.div
                      key={i}
                      className="flex items-start gap-2 rounded"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-10%' }}
                      transition={{
                        delay: 0.15 + i * 0.08,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
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
                    </motion.div>
                  )
                })}
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

/* ------------------------------------------------------------------ */
/*  LoopDiagram — SVG "the six steps" ring with animated pulse        */
/* ------------------------------------------------------------------ */

function LoopDiagram({ caption }: { caption?: string }) {
  const steps = [
    { label: 'Install', active: true },
    { label: 'Idea', active: true },
    { label: 'Brief', active: true },
    { label: 'AI writes', active: false },
    { label: 'Run', active: true },
    { label: 'Iterate', active: true },
  ]
  const N = steps.length
  const R = 90
  const cx = 160
  const cy = 120
  return (
    <figure
      className="my-8 overflow-hidden rounded-lg border"
      style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
    >
      <div
        className="flex items-center border-b px-4 py-2"
        style={{ borderColor: 'var(--edge)' }}
      >
        <span
          className="uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.22em',
            color: 'var(--ink-dim)',
          }}
        >
          Diagram — the loop
        </span>
      </div>
      <div className="flex items-center justify-center py-6">
        <svg viewBox="0 0 320 240" width="100%" style={{ maxWidth: 440 }}>
          <circle
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke="var(--edge)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          {steps.map((s, i) => {
            const angle = (i / N) * Math.PI * 2 - Math.PI / 2
            const x = cx + Math.cos(angle) * R
            const y = cy + Math.sin(angle) * R
            return (
              <g key={s.label}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r={s.active ? 10 : 8}
                  fill={s.active ? '#e6a15c' : 'var(--bg)'}
                  stroke={s.active ? '#e6a15c' : 'var(--edge)'}
                  strokeWidth="1.5"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{
                    delay: 0.1 + i * 0.1,
                    type: 'spring',
                    stiffness: 260,
                    damping: 18,
                  }}
                />
                {s.active && (
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={10}
                    fill="none"
                    stroke="#e6a15c"
                    strokeWidth="1"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      delay: 0.5 + i * 0.2,
                      ease: 'easeOut',
                    }}
                  />
                )}
                <text
                  x={x}
                  y={y + (y < cy ? -18 : 26)}
                  textAnchor="middle"
                  fill="var(--ink)"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.1em',
                  }}
                >
                  {i + 1}. {s.label}
                </text>
              </g>
            )
          })}
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            fill="var(--ink-dim)"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em' }}
          >
            YOUR JOB
          </text>
          <text
            x={cx}
            y={cy + 12}
            textAnchor="middle"
            fill="var(--accent)"
            style={{ fontFamily: 'var(--font-display)', fontSize: 20 }}
          >
            30 min
          </text>
        </svg>
      </div>
      {caption && (
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
      )}
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/*  PowerShellDiagram — annotated SVG of a PowerShell window          */
/* ------------------------------------------------------------------ */

function PowerShellDiagram({ caption }: { caption?: string }) {
  return (
    <figure
      className="my-8 overflow-hidden rounded-lg border"
      style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
    >
      <div
        className="flex items-center border-b px-4 py-2"
        style={{ borderColor: 'var(--edge)' }}
      >
        <span
          className="uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.22em',
            color: 'var(--ink-dim)',
          }}
        >
          What PowerShell looks like
        </span>
      </div>
      <div className="p-6">
        <div
          className="mx-auto overflow-hidden rounded-lg"
          style={{ maxWidth: 520, background: '#012456', border: '1px solid #012b64' }}
        >
          <div
            className="flex items-center gap-2 border-b px-3 py-2"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ff5f56' }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#27c93f' }} />
            <span
              className="ml-auto"
              style={{
                color: 'rgba(255,255,255,0.55)',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.18em',
              }}
            >
              Windows PowerShell
            </span>
          </div>
          <div
            className="p-5"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#f2f2f2' }}
          >
            <div style={{ color: '#a0c4ff' }}>Windows PowerShell</div>
            <div style={{ color: 'rgba(255,255,255,0.55)' }}>
              Copyright (C) Microsoft Corporation. All rights reserved.
            </div>
            <div style={{ height: 12 }} />
            <div>
              <span style={{ color: '#ffd166' }}>PS C:\Users\you&gt;</span>{' '}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                style={{ color: '#fff' }}
              >
                winget install OpenJS.NodeJS.LTS
              </motion.span>
              <motion.span
                aria-hidden
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ display: 'inline-block', marginLeft: 4, background: '#fff', width: 8, height: 14, verticalAlign: 'middle' }}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-2 text-sm" style={{ color: 'var(--paper)' }}>
          <div className="flex items-baseline gap-3">
            <span style={{ color: '#ffd166', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              PS C:\Users\you&gt;
            </span>
            <span>= where you are (your user folder). The &gt; means "ready for your command".</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span style={{ color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              winget install ...
            </span>
            <span>= what YOU type. Right-click the window to paste. Press Enter to run.</span>
          </div>
        </div>
      </div>
      {caption && (
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
      )}
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/*  VisualRef — reference grid (layouts / tones / radius / accent)    */
/* ------------------------------------------------------------------ */

function LayoutSwatch({ variant }: { variant: string }) {
  // 60x40 schematic layouts
  const stroke = 'var(--edge)'
  const fill = 'rgba(184,188,197,0.15)'
  const accent = 'var(--accent)'
  const common = { width: '100%', height: 64 } as const
  switch (variant) {
    case 'single':
      return (
        <svg viewBox="0 0 60 40" style={common}>
          <rect x="14" y="6" width="32" height="4" fill={accent} />
          <rect x="14" y="14" width="32" height="3" fill={fill} />
          <rect x="14" y="20" width="32" height="3" fill={fill} />
          <rect x="14" y="26" width="32" height="3" fill={fill} />
        </svg>
      )
    case 'sidebar':
      return (
        <svg viewBox="0 0 60 40" style={common}>
          <rect x="2" y="2" width="16" height="36" fill={fill} stroke={stroke} />
          <rect x="22" y="6" width="35" height="4" fill={accent} />
          <rect x="22" y="14" width="35" height="3" fill={fill} />
          <rect x="22" y="20" width="35" height="3" fill={fill} />
        </svg>
      )
    case 'topbar':
      return (
        <svg viewBox="0 0 60 40" style={common}>
          <rect x="2" y="2" width="56" height="6" fill={fill} stroke={stroke} />
          <rect x="6" y="4" width="6" height="2" fill={accent} />
          <rect x="4" y="14" width="52" height="3" fill={fill} />
          <rect x="4" y="20" width="52" height="3" fill={fill} />
          <rect x="4" y="26" width="52" height="3" fill={fill} />
        </svg>
      )
    case 'kanban':
      return (
        <svg viewBox="0 0 60 40" style={common}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={2 + i * 20} y="4" width="18" height="32" fill={fill} stroke={stroke} />
              <rect x={4 + i * 20} y="8" width="14" height="4" fill={i === 0 ? accent : 'rgba(184,188,197,0.3)'} />
              <rect x={4 + i * 20} y="14" width="14" height="3" fill="rgba(184,188,197,0.3)" />
            </g>
          ))}
        </svg>
      )
    case 'grid':
      return (
        <svg viewBox="0 0 60 40" style={common}>
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={4 + (i % 2) * 26}
              y={4 + Math.floor(i / 2) * 16}
              width="22"
              height="12"
              fill={i === 0 ? accent : fill}
              stroke={stroke}
            />
          ))}
        </svg>
      )
    case 'feed':
      return (
        <svg viewBox="0 0 60 40" style={common}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx="10" cy={8 + i * 12} r="3" fill={fill} stroke={stroke} />
              <rect x="16" y={6 + i * 12} width="38" height="3" fill={i === 0 ? accent : fill} />
              <rect x="16" y={11 + i * 12} width="38" height="2" fill={fill} />
            </g>
          ))}
        </svg>
      )
    case 'split':
      return (
        <svg viewBox="0 0 60 40" style={common}>
          <rect x="2" y="2" width="22" height="36" fill={fill} stroke={stroke} />
          <rect x="4" y="6" width="18" height="3" fill={accent} />
          <rect x="4" y="12" width="18" height="2" fill="rgba(184,188,197,0.3)" />
          <rect x="4" y="17" width="18" height="2" fill="rgba(184,188,197,0.3)" />
          <rect x="28" y="2" width="30" height="36" fill="rgba(184,188,197,0.05)" stroke={stroke} />
          <rect x="32" y="8" width="22" height="4" fill={accent} />
          <rect x="32" y="16" width="22" height="2" fill={fill} />
          <rect x="32" y="22" width="22" height="2" fill={fill} />
        </svg>
      )
    case 'wizard':
      return (
        <svg viewBox="0 0 60 40" style={common}>
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={10 + i * 13}
              cy="10"
              r="3"
              fill={i === 1 ? accent : fill}
              stroke={stroke}
            />
          ))}
          <line x1="10" y1="10" x2="49" y2="10" stroke={stroke} strokeWidth="0.5" />
          <rect x="10" y="18" width="40" height="16" fill={fill} stroke={stroke} />
        </svg>
      )
    default:
      return <div style={common} />
  }
}

function ToneSwatch({ variant }: { variant: string }) {
  // Tiny text/card preview of the tone
  const tones: Record<
    string,
    { bg: string; ink: string; accent: string; font: string; radius: number; label: string }
  > = {
    utilitarian: {
      bg: '#fafaf7',
      ink: '#1b1d22',
      accent: '#e6a15c',
      font: 'var(--font-mono)',
      radius: 2,
      label: '12 open',
    },
    editorial: {
      bg: '#faf8f3',
      ink: '#1b1d22',
      accent: '#8a5a3b',
      font: 'var(--font-display)',
      radius: 0,
      label: 'Issue 04',
    },
    playful: {
      bg: '#fff4d6',
      ink: '#2a1a4d',
      accent: '#ff6fa8',
      font: 'var(--font-body)',
      radius: 16,
      label: 'Let\'s go!',
    },
    brutalist: {
      bg: '#ffffff',
      ink: '#000000',
      accent: '#000',
      font: 'var(--font-mono)',
      radius: 0,
      label: '[SUBMIT]',
    },
    soft: {
      bg: '#f0ecf8',
      ink: '#3a3552',
      accent: '#8b7fc3',
      font: 'var(--font-body)',
      radius: 14,
      label: 'Breathe',
    },
    warm: {
      bg: '#f5ead9',
      ink: '#3e2a1a',
      accent: '#b8682c',
      font: 'var(--font-display)',
      radius: 6,
      label: 'Welcome',
    },
    technical: {
      bg: '#0f1419',
      ink: '#d8dee4',
      accent: '#5cd8c4',
      font: 'var(--font-mono)',
      radius: 2,
      label: 'READY',
    },
    premium: {
      bg: '#0c0c0e',
      ink: '#e6d7a3',
      accent: '#c9a961',
      font: 'var(--font-display)',
      radius: 1,
      label: 'Suite',
    },
  }
  const t = tones[variant] ?? tones.utilitarian
  return (
    <div
      className="flex items-center justify-between px-3"
      style={{
        background: t.bg,
        color: t.ink,
        height: 64,
        borderRadius: t.radius,
        fontFamily: t.font,
        border: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <span style={{ fontSize: 13, letterSpacing: variant === 'brutalist' ? '0.1em' : undefined }}>
        {t.label}
      </span>
      <span
        style={{
          width: 18,
          height: 18,
          background: t.accent,
          borderRadius: variant === 'playful' || variant === 'soft' ? 9 : t.radius,
        }}
      />
    </div>
  )
}

function RadiusSwatch({ variant }: { variant: string }) {
  const r = Number(variant)
  return (
    <div
      className="flex items-center justify-center"
      style={{
        background: 'var(--bg)',
        border: '1px solid var(--edge)',
        height: 64,
        borderRadius: r,
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          background: 'var(--accent)',
          borderRadius: r === 999 ? 999 : Math.max(r - 1, 0),
        }}
      />
    </div>
  )
}

function AccentSwatch({ variant }: { variant: string }) {
  return (
    <div
      style={{
        background: variant,
        height: 64,
        borderRadius: 4,
        border: '1px solid rgba(0,0,0,0.1)',
      }}
    />
  )
}

function VisualRef({
  title,
  columns,
  items,
}: {
  title: string
  columns: 2 | 3 | 4
  items: {
    label: string
    sub?: string
    swatch: 'layout' | 'tone' | 'radius' | 'accent'
    variant: string
  }[]
}) {
  const cols = `repeat(${columns}, minmax(0, 1fr))`
  return (
    <div
      className="my-8 rounded-lg border p-5"
      style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
    >
      <p
        className="mb-4 uppercase"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.22em',
          color: 'var(--ink-dim)',
        }}
      >
        {title}
      </p>
      <div className="grid gap-3" style={{ gridTemplateColumns: cols }}>
        {items.map((it, i) => (
          <motion.div
            key={`${it.swatch}-${it.variant}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ delay: i * 0.04, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-md"
          >
            {it.swatch === 'layout' && <LayoutSwatch variant={it.variant} />}
            {it.swatch === 'tone' && <ToneSwatch variant={it.variant} />}
            {it.swatch === 'radius' && <RadiusSwatch variant={it.variant} />}
            {it.swatch === 'accent' && <AccentSwatch variant={it.variant} />}
            <div className="mt-2">
              <div
                style={{
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 13,
                  letterSpacing: '-0.01em',
                }}
              >
                {it.label}
              </div>
              {it.sub && (
                <div
                  style={{
                    color: 'var(--ink-dim)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                  }}
                >
                  {it.sub}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Public renderer                                                   */
/* ------------------------------------------------------------------ */

function renderBlock(block: LessonBlock, i: number): React.ReactNode {
  switch (block.type) {
    case 'p':
      return (
        <p
          key={i}
          className="my-5"
          style={{ color: 'var(--paper)', lineHeight: 1.7, fontSize: 17 }}
        >
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
              <span className="absolute -left-5" style={{ color: 'var(--accent)' }}>
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
    case 'loopDiagram':
      return <LoopDiagram key={i} caption={block.caption} />
    case 'powershellDiagram':
      return <PowerShellDiagram key={i} caption={block.caption} />
    case 'visualRef':
      return (
        <VisualRef
          key={i}
          title={block.title}
          columns={block.columns}
          items={block.items}
        />
      )
    default:
      return null
  }
}

export function LessonBody({
  blocks,
  animate = true,
}: {
  blocks: LessonBlock[]
  animate?: boolean
}) {
  return (
    <div className="prose-lesson">
      {blocks.map((block, i) =>
        animate ? (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderBlock(block, i)}
          </motion.div>
        ) : (
          renderBlock(block, i)
        ),
      )}
    </div>
  )
}

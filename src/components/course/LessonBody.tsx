import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CodeBlock, LessonBlock } from '../../content/course'
import { CopyButton } from '../ui/CopyButton'
import { GithubMock } from './GithubMock'

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
/*  SlateMock — CSS/SVG mocks of Foundry UI                           */
/* ------------------------------------------------------------------ */

type SlateMockVariant =
  | 'compass'
  | 'slate-editor'
  | 'slate-published'
  | 'ontology-object'
  | 'functions-ide'
  | 'action-modal'
  | 'variables-panel'

function FoundryChrome({
  title,
  app,
  children,
  dark = false,
}: {
  title: string
  app: string
  children: React.ReactNode
  dark?: boolean
}) {
  const bg = dark ? '#1a1d22' : '#f7f6f3'
  const ink = dark ? '#e8e6e1' : '#1b1d22'
  const edge = dark ? '#2d3139' : '#d9d6cc'
  return (
    <div
      className="overflow-hidden rounded-md"
      style={{ background: bg, color: ink, border: `1px solid ${edge}` }}
    >
      {/* Foundry top bar */}
      <div
        className="flex items-center gap-3 px-3 py-2"
        style={{ borderBottom: `1px solid ${edge}`, background: dark ? '#14171c' : '#ffffff' }}
      >
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ background: '#e6a15c' }}
            aria-hidden
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              color: dark ? '#8d9199' : '#6b6b6b',
              textTransform: 'uppercase',
            }}
          >
            Foundry · {app}
          </span>
        </div>
        <span style={{ color: edge }}>/</span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            color: dark ? '#c1c4ca' : '#1b1d22',
          }}
        >
          {title}
        </span>
        <span className="ml-auto flex items-center gap-3">
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: dark ? '#8d9199' : '#8b8b8b',
            }}
          >
            branch: main
          </span>
          <span
            className="inline-block h-5 w-5 rounded-full"
            style={{ background: '#e6a15c' }}
            aria-hidden
          />
        </span>
      </div>
      {children}
    </div>
  )
}

function CompassMock() {
  return (
    <FoundryChrome title="/Projects/Maintenance/slate-yourname" app="Compass">
      <div className="grid grid-cols-[180px_1fr] text-[11px]">
        <div className="border-r p-2" style={{ background: '#ffffff', borderColor: '#e7e5df' }}>
          <div style={{ color: '#8b8b8b', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
            Tree
          </div>
          {['Projects', '  Maintenance', '    slate-yourname', 'Shared', 'Playground'].map((l, i) => (
            <div
              key={i}
              style={{
                padding: '4px 6px',
                borderRadius: 3,
                background: i === 2 ? '#fce9d4' : 'transparent',
                color: i === 2 ? '#1b1d22' : '#4a4a4a',
                fontFamily: 'var(--font-body)',
                whiteSpace: 'pre',
              }}
            >
              {i === 2 ? '▸ ' : i === 0 || i === 3 || i === 4 ? '▸ ' : '  '}
              {l}
            </div>
          ))}
        </div>
        <div style={{ background: '#faf8f3' }}>
          <div
            className="flex items-center gap-3 border-b px-3 py-1.5"
            style={{ borderColor: '#e7e5df', color: '#4a4a4a', fontFamily: 'var(--font-mono)', fontSize: 10 }}
          >
            <span>Name</span>
            <span className="ml-auto">Modified</span>
            <span style={{ width: 40 }}>Type</span>
          </div>
          {[
            { name: 'taskboard-slate', type: 'Slate', mod: '2m ago', sel: true, icon: '▣' },
            { name: 'slate-helpers', type: 'Function', mod: '12m ago', icon: 'ƒ' },
            { name: 'taskboard-screenshot.png', type: 'Image', mod: '3h ago', icon: '▨' },
          ].map((f, i) => (
            <div
              key={i}
              className="grid items-center gap-3 border-b px-3 py-2"
              style={{
                gridTemplateColumns: '1fr auto 48px',
                borderColor: '#ecebe4',
                background: f.sel ? '#fce9d4' : 'transparent',
                fontFamily: 'var(--font-body)',
                color: '#1b1d22',
              }}
            >
              <span>
                <span style={{ color: '#e6a15c', marginRight: 6 }}>{f.icon}</span>
                {f.name}
              </span>
              <span style={{ color: '#8b8b8b', fontFamily: 'var(--font-mono)', fontSize: 10 }}>
                {f.mod}
              </span>
              <span style={{ color: '#8b8b8b', fontFamily: 'var(--font-mono)', fontSize: 10 }}>
                {f.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </FoundryChrome>
  )
}

function SlateEditorMock() {
  return (
    <FoundryChrome title="taskboard-slate · Draft" app="Slate">
      <div className="grid text-[11px]" style={{ gridTemplateColumns: '140px 1fr 170px', minHeight: 260 }}>
        {/* Widget tray */}
        <div className="border-r p-2" style={{ background: '#ffffff', borderColor: '#e7e5df' }}>
          <div style={{ color: '#8b8b8b', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
            Widgets
          </div>
          {['Heading', 'List', 'HTML', 'Button', 'Table', 'Tabs', 'Metric', 'Chart'].map((w, i) => (
            <div
              key={w}
              className="flex items-center gap-2 rounded"
              style={{
                padding: '5px 6px',
                marginBottom: 2,
                background: i === 1 ? '#fce9d4' : 'transparent',
                color: '#1b1d22',
                fontFamily: 'var(--font-body)',
                cursor: 'grab',
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  background: i === 1 ? '#e6a15c' : '#e7e5df',
                }}
              />
              {w}
            </div>
          ))}
        </div>
        {/* Canvas */}
        <div style={{ background: '#faf8f3', padding: 12, position: 'relative' }}>
          {/* 12-col grid hint */}
          <div
            className="absolute inset-2 rounded"
            style={{
              border: '1px dashed #e7e5df',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 16,
              color: '#1b1d22',
              marginBottom: 10,
              letterSpacing: '-0.01em',
            }}
          >
            TaskBoard — Shift View
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
            {/* List widget — selected */}
            <div
              style={{
                background: '#fff',
                border: '2px solid #e6a15c',
                borderRadius: 4,
                padding: 6,
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: -9,
                  left: 6,
                  background: '#e6a15c',
                  color: '#fff',
                  padding: '1px 6px',
                  fontSize: 8,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.14em',
                  borderRadius: 2,
                  textTransform: 'uppercase',
                }}
              >
                List · {'{{openTasks}}'}
              </span>
              {[
                { t: 'Replace HVAC filter', p: 'Med' },
                { t: 'Diagnose conveyor fault', p: 'High' },
                { t: 'Reset access PIN', p: 'Low' },
              ].map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between"
                  style={{
                    padding: '4px 6px',
                    borderBottom: i < 2 ? '1px solid #ecebe4' : 'none',
                    color: '#1b1d22',
                  }}
                >
                  <span>{r.t}</span>
                  <span
                    style={{
                      background: r.p === 'High' ? '#e6a15c' : '#ecebe4',
                      color: r.p === 'High' ? '#fff' : '#6b6b6b',
                      fontSize: 9,
                      padding: '1px 6px',
                      borderRadius: 2,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {r.p}
                  </span>
                </div>
              ))}
            </div>
            {/* Detail panel — HTML widget placeholder */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #e7e5df',
                borderRadius: 4,
                padding: 10,
                color: '#8b8b8b',
                fontStyle: 'italic',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Select a task to see details.
            </div>
          </div>
        </div>
        {/* Inspector */}
        <div className="border-l p-2" style={{ background: '#ffffff', borderColor: '#e7e5df' }}>
          <div style={{ color: '#8b8b8b', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>
            Inspector · List
          </div>
          {[
            { k: 'Data Source', v: '{{openTasks}}', hi: true },
            { k: 'Row template', v: 'HTML' },
            { k: 'colSpan', v: '7' },
            { k: 'onRowClick', v: 'Set var…', hi: true },
            { k: 'Visibility', v: 'always' },
          ].map((row) => (
            <div key={row.k} style={{ marginBottom: 6 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#8b8b8b', letterSpacing: '0.1em' }}>
                {row.k}
              </div>
              <div
                style={{
                  background: row.hi ? '#fce9d4' : '#faf8f3',
                  border: '1px solid #ecebe4',
                  padding: '3px 6px',
                  borderRadius: 2,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: '#1b1d22',
                }}
              >
                {row.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </FoundryChrome>
  )
}

function SlatePublishedMock() {
  return (
    <FoundryChrome title="taskboard-slate · v1" app="Slate">
      <div style={{ background: '#faf8f3', padding: 14, minHeight: 220 }}>
        <div className="mb-3 flex items-baseline justify-between">
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              color: '#1b1d22',
              letterSpacing: '-0.01em',
            }}
          >
            TaskBoard — Shift View
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: '#8b8b8b',
              letterSpacing: '0.14em',
            }}
          >
            3 OPEN · 1 SELECTED
          </div>
        </div>
        <div className="grid gap-3" style={{ gridTemplateColumns: '1.3fr 1fr' }}>
          <div style={{ background: '#fff', border: '1px solid #e7e5df', borderRadius: 4 }}>
            {[
              { t: 'Diagnose conveyor #2 fault', p: 'High', sel: true },
              { t: 'Replace HVAC filter — shop A', p: 'Med' },
              { t: 'Reset access panel PIN', p: 'Low' },
            ].map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between"
                style={{
                  padding: '9px 12px',
                  borderBottom: i < 2 ? '1px solid #ecebe4' : 'none',
                  background: r.sel ? '#fce9d4' : 'transparent',
                  color: '#1b1d22',
                  fontSize: 12,
                }}
              >
                <span>{r.t}</span>
                <span
                  style={{
                    background:
                      r.p === 'High' ? '#e6a15c' : r.p === 'Med' ? '#ecebe4' : 'transparent',
                    color: r.p === 'High' ? '#fff' : '#6b6b6b',
                    fontSize: 10,
                    padding: '2px 7px',
                    borderRadius: 2,
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {r.p}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              background: '#fff',
              border: '1px solid #e7e5df',
              borderRadius: 4,
              padding: 12,
              color: '#1b1d22',
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, marginBottom: 6 }}>
              Diagnose conveyor #2 fault
            </div>
            <div style={{ color: '#6b6b6b', marginBottom: 4 }}>
              <b>Priority:</b> High
            </div>
            <div style={{ color: '#6b6b6b', marginBottom: 4 }}>
              <b>Assignee:</b> J. Rivera
            </div>
            <div style={{ color: '#6b6b6b', marginBottom: 10 }}>
              Intermittent stop after 10 min runtime. Sensor check required.
            </div>
            <button
              style={{
                background: '#e6a15c',
                color: '#fff',
                padding: '6px 12px',
                border: 'none',
                borderRadius: 3,
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Mark done
            </button>
          </div>
        </div>
      </div>
    </FoundryChrome>
  )
}

function OntologyObjectMock() {
  return (
    <FoundryChrome title="Task · Object Type" app="Ontology Manager">
      <div className="grid text-[11px]" style={{ gridTemplateColumns: '160px 1fr', minHeight: 240 }}>
        <div className="border-r p-2" style={{ background: '#ffffff', borderColor: '#e7e5df' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: '#8b8b8b', textTransform: 'uppercase', marginBottom: 8 }}>
            Sections
          </div>
          {['Overview', 'Properties', 'Links', 'Actions', 'Permissions', 'History'].map((s, i) => (
            <div
              key={s}
              style={{
                padding: '5px 6px',
                borderRadius: 3,
                marginBottom: 2,
                background: i === 1 ? '#fce9d4' : 'transparent',
                color: i === 1 ? '#1b1d22' : '#4a4a4a',
                fontFamily: 'var(--font-body)',
              }}
            >
              {s}
            </div>
          ))}
        </div>
        <div style={{ background: '#faf8f3', padding: 12 }}>
          <div className="mb-3 flex items-center gap-2">
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 26,
                height: 26,
                borderRadius: 4,
                background: '#e6a15c',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
              }}
            >
              ▣
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#1b1d22' }}>
              Task
            </span>
            <span
              style={{
                marginLeft: 8,
                background: '#dbe8db',
                color: '#2f5f2f',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.14em',
                padding: '2px 6px',
                borderRadius: 2,
                textTransform: 'uppercase',
              }}
            >
              Published
            </span>
          </div>
          <div
            className="grid gap-0 rounded"
            style={{ background: '#fff', border: '1px solid #e7e5df' }}
          >
            {[
              { k: '$rid', t: 'String (primary key)', hl: true },
              { k: 'title', t: 'String' },
              { k: 'priority', t: "Enum: 'Low' | 'Med' | 'High'" },
              { k: 'status', t: "Enum: 'Open' | 'In Progress' | 'Done'" },
              { k: 'assignee', t: '→ Technician (link)', hl: true },
              { k: 'description', t: 'String (long)' },
              { k: 'createdAt', t: 'Timestamp' },
            ].map((p, i) => (
              <div
                key={p.k}
                className="grid items-center gap-3 px-3 py-1.5"
                style={{
                  gridTemplateColumns: '110px 1fr',
                  borderBottom: i < 6 ? '1px solid #ecebe4' : 'none',
                  color: '#1b1d22',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: p.hl ? '#e6a15c' : '#1b1d22' }}>
                  {p.k}
                </span>
                <span style={{ color: '#6b6b6b', fontFamily: 'var(--font-body)' }}>{p.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FoundryChrome>
  )
}

function FunctionsIdeMock() {
  return (
    <FoundryChrome title="slate-helpers · src/index.ts" app="Functions" dark>
      <div className="grid text-[11px]" style={{ gridTemplateColumns: '160px 1fr', minHeight: 240 }}>
        <div className="border-r p-2" style={{ background: '#14171c', borderColor: '#2d3139' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: '#8d9199', textTransform: 'uppercase', marginBottom: 8 }}>
            Explorer
          </div>
          {[
            { n: 'slate-helpers/', k: 'folder', l: 0 },
            { n: 'src/', k: 'folder', l: 1 },
            { n: 'index.ts', k: 'file', l: 2, sel: true },
            { n: 'types.ts', k: 'file', l: 2 },
            { n: 'package.json', k: 'file', l: 1 },
            { n: 'ontology.config.yml', k: 'file', l: 1 },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                padding: '3px 6px',
                paddingLeft: 6 + f.l * 10,
                borderRadius: 3,
                marginBottom: 1,
                background: f.sel ? '#2d3139' : 'transparent',
                color: f.sel ? '#f0cf9c' : '#c1c4ca',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {f.k === 'folder' ? '▸ ' : '  '}
              {f.n}
            </div>
          ))}
        </div>
        <div style={{ background: '#0f1216', padding: 0 }}>
          {/* Tab bar */}
          <div className="flex" style={{ background: '#14171c', borderBottom: '1px solid #2d3139' }}>
            <div
              style={{
                padding: '4px 10px',
                background: '#0f1216',
                color: '#f0cf9c',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                borderRight: '1px solid #2d3139',
                borderTop: '2px solid #e6a15c',
              }}
            >
              index.ts
            </div>
            <div style={{ marginLeft: 'auto', padding: '4px 10px' }}>
              <span
                style={{
                  background: '#e6a15c',
                  color: '#1b1d22',
                  padding: '2px 8px',
                  borderRadius: 2,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                Release v3
              </span>
            </div>
          </div>
          <pre
            style={{
              margin: 0,
              padding: 10,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: '#c1c4ca',
              lineHeight: 1.55,
            }}
          >
            <span style={{ color: '#8d9199' }}>
              {`  1 `}
            </span>
            <span style={{ color: '#d985c5' }}>import</span>{' '}
            <span>{`{ Function } `}</span>
            <span style={{ color: '#d985c5' }}>from</span>{' '}
            <span style={{ color: '#a0c4ff' }}>"@foundry/functions-api"</span>
            {'\n'}
            <span style={{ color: '#8d9199' }}>{`  2 `}</span>
            <span style={{ color: '#d985c5' }}>import</span>{' '}
            <span>{`{ Objects } `}</span>
            <span style={{ color: '#d985c5' }}>from</span>{' '}
            <span style={{ color: '#a0c4ff' }}>"@foundry/ontology-api"</span>
            {'\n'}
            <span style={{ color: '#8d9199' }}>{`  3 `}</span>
            <span style={{ color: '#d985c5' }}>import</span>{' '}
            <span>{`{ Task } `}</span>
            <span style={{ color: '#d985c5' }}>from</span>{' '}
            <span style={{ color: '#a0c4ff' }}>"@foundry/ontology"</span>
            {'\n'}
            <span style={{ color: '#8d9199' }}>{`  4 `}</span>
            {'\n'}
            <span style={{ color: '#8d9199' }}>{`  5 `}</span>
            <span style={{ color: '#d985c5' }}>export class</span>{' '}
            <span style={{ color: '#f0cf9c' }}>SlateHelpers</span>
            {' {'}
            {'\n'}
            <span style={{ color: '#8d9199' }}>{`  6 `}</span>
            {'  '}
            <span style={{ color: '#e6a15c' }}>@Function</span>()
            {'\n'}
            <span style={{ color: '#8d9199' }}>{`  7 `}</span>
            {'  '}
            <span style={{ color: '#d985c5' }}>public</span>{' '}
            <span style={{ color: '#a0c4ff' }}>getOpenTasks</span>(): Task[]{' {'}
            {'\n'}
            <span style={{ color: '#8d9199' }}>{`  8 `}</span>
            {'    '}
            <span style={{ color: '#d985c5' }}>return</span> Objects.search().task()
            {'\n'}
            <span style={{ color: '#8d9199' }}>{`  9 `}</span>
            {'      .'}
            <span style={{ color: '#a0c4ff' }}>filter</span>
            {'((t) => t.status.'}
            <span style={{ color: '#a0c4ff' }}>exactMatch</span>
            {'('}
            <span style={{ color: '#a0c4ff' }}>"Open"</span>
            {'))'}
            {'\n'}
            <span style={{ color: '#8d9199' }}>{` 10 `}</span>
            {'      .'}
            <span style={{ color: '#a0c4ff' }}>take</span>
            {'(200).'}
            <span style={{ color: '#a0c4ff' }}>all</span>
            {'()'}
            {'\n'}
            <span style={{ color: '#8d9199' }}>{` 11 `}</span>
            {'  }'}
            {'\n'}
            <span style={{ color: '#8d9199' }}>{` 12 `}</span>
            {'}'}
          </pre>
          <div
            className="border-t px-3 py-1.5"
            style={{
              borderColor: '#2d3139',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: '#5cd8c4',
              letterSpacing: '0.14em',
            }}
          >
            ✓ Preview OK · 3 rows returned · 84ms
          </div>
        </div>
      </div>
    </FoundryChrome>
  )
}

function ActionModalMock() {
  return (
    <FoundryChrome title="taskboard-slate" app="Slate">
      <div
        style={{
          background: '#faf8f3',
          padding: 16,
          minHeight: 220,
          position: 'relative',
        }}
      >
        <div style={{ filter: 'blur(1px)', opacity: 0.6 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, marginBottom: 8, color: '#1b1d22' }}>
            TaskBoard — Shift View
          </div>
          <div style={{ background: '#fff', border: '1px solid #e7e5df', borderRadius: 4, height: 120 }} />
        </div>
        {/* Modal */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            background: '#fff',
            borderRadius: 6,
            boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
            border: '1px solid #d9d6cc',
            overflow: 'hidden',
          }}
        >
          <div
            className="flex items-center justify-between px-3 py-2"
            style={{ borderBottom: '1px solid #e7e5df', background: '#faf8f3' }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: '#1b1d22' }}>
              Action · completeTask
            </span>
            <span
              style={{
                background: '#dbe8db',
                color: '#2f5f2f',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.14em',
                padding: '1px 6px',
                borderRadius: 2,
                textTransform: 'uppercase',
              }}
            >
              Ontology Action
            </span>
          </div>
          <div style={{ padding: 12 }}>
            <div
              style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#8b8b8b', letterSpacing: '0.14em', marginBottom: 4, textTransform: 'uppercase' }}
            >
              task
            </div>
            <div
              style={{
                background: '#fce9d4',
                border: '1px solid #e6a15c',
                borderRadius: 3,
                padding: '5px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: '#1b1d22',
                marginBottom: 10,
              }}
            >
              {'{{selectedTask}}'} · Diagnose conveyor #2 fault
            </div>
            <div className="flex items-center justify-between">
              <span style={{ color: '#8b8b8b', fontSize: 11 }}>
                After success: refresh openTasks, selectedTask
              </span>
              <div className="flex gap-2">
                <button
                  style={{
                    padding: '5px 12px',
                    border: '1px solid #d9d6cc',
                    background: '#fff',
                    borderRadius: 3,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: '#1b1d22',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  Cancel
                </button>
                <button
                  style={{
                    padding: '5px 12px',
                    background: '#e6a15c',
                    color: '#fff',
                    borderRadius: 3,
                    border: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  Run action
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FoundryChrome>
  )
}

function VariablesPanelMock() {
  return (
    <FoundryChrome title="taskboard-slate · Variables" app="Slate">
      <div style={{ background: '#ffffff', padding: 12, minHeight: 220 }}>
        <div
          className="mb-2 flex items-center justify-between"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', color: '#8b8b8b', textTransform: 'uppercase' }}
        >
          <span>Document variables</span>
          <span
            style={{
              background: '#e6a15c',
              color: '#fff',
              padding: '2px 7px',
              borderRadius: 2,
              fontSize: 9,
            }}
          >
            + New
          </span>
        </div>
        <div
          className="grid gap-0 rounded"
          style={{ background: '#faf8f3', border: '1px solid #e7e5df' }}
        >
          {[
            {
              n: 'openTasks',
              k: 'Function',
              s: 'getOpenTasks()',
              v: '3 items',
              ok: true,
            },
            {
              n: 'selectedTaskId',
              k: 'Static',
              s: 'string',
              v: '"ri.ont.main.object.task-7f2"',
              ok: true,
            },
            {
              n: 'selectedTask',
              k: 'Function',
              s: 'getTaskById(selectedTaskId)',
              v: 'Task · Diagnose conveyor #2',
              ok: true,
            },
          ].map((r, i) => (
            <div
              key={r.n}
              className="grid items-center gap-2 px-3 py-2"
              style={{
                gridTemplateColumns: '120px 70px 1fr auto',
                borderBottom: i < 2 ? '1px solid #ecebe4' : 'none',
              }}
            >
              <div className="flex items-center gap-1.5">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: r.ok ? '#5cb85c' : '#e6a15c',
                  }}
                />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#1b1d22' }}>
                  {r.n}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  letterSpacing: '0.14em',
                  color: '#8b8b8b',
                  textTransform: 'uppercase',
                }}
              >
                {r.k}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: '#6b6b6b',
                }}
              >
                {r.s}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  color: '#1b1d22',
                  maxWidth: 220,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {r.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </FoundryChrome>
  )
}

function SlateMock({
  variant,
  caption,
  annotations,
}: {
  variant: SlateMockVariant
  caption?: string
  annotations?: { x: number; y: number; label: string; note: string }[]
}) {
  const label: Record<SlateMockVariant, string> = {
    compass: "Compass — Foundry's file browser",
    'slate-editor': 'Slate editor — widget tray, canvas, inspector',
    'slate-published': 'Your published Slate app',
    'ontology-object': 'Ontology Manager — the Task Object Type',
    'functions-ide': 'Functions IDE — your TypeScript Function repo',
    'action-modal': 'Calling an Action Type from Slate',
    'variables-panel': 'Slate document variables panel',
  }

  return (
    <motion.figure
      className="my-8 overflow-hidden rounded-lg border"
      style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-2"
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
          Screen · {label[variant]}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--ink-dim)',
            letterSpacing: '0.14em',
          }}
        >
          palantirfoundry.com
        </span>
      </div>
      <div style={{ padding: 16, position: 'relative' }}>
        {variant === 'compass' && <CompassMock />}
        {variant === 'slate-editor' && <SlateEditorMock />}
        {variant === 'slate-published' && <SlatePublishedMock />}
        {variant === 'ontology-object' && <OntologyObjectMock />}
        {variant === 'functions-ide' && <FunctionsIdeMock />}
        {variant === 'action-modal' && <ActionModalMock />}
        {variant === 'variables-panel' && <VariablesPanelMock />}
        {annotations && annotations.length > 0 && (
          <div
            className="mt-3 grid gap-2 sm:grid-cols-2"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--paper)',
            }}
          >
            {annotations.map((a, i) => (
              <div
                key={i}
                className="flex gap-2 rounded border px-3 py-2"
                style={{ borderColor: 'var(--edge)', background: 'var(--bg)' }}
              >
                <span
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {i + 1}
                </span>
                <span>
                  <b style={{ color: 'var(--ink)' }}>{a.label}</b> — {a.note}
                </span>
              </div>
            ))}
          </div>
        )}
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
    </motion.figure>
  )
}

/* ------------------------------------------------------------------ */
/*  PowerAppsMock — CSS/SVG mocks of Microsoft Power Apps Studio      */
/* ------------------------------------------------------------------ */

type PowerAppsMockVariant =
  | 'studio'
  | 'tree-view'
  | 'data-schema'
  | 'formula-bar'
  | 'calendar-preview'
  | 'calendar-live'
  | 'share-dialog'
  | 'home-screen'
  | 'create-dialog'
  | 'connectors-list'
  | 'sharepoint-picker'
  | 'insert-menu'
  | 'preview-mode'
  | 'publish-dialog'
  | 'app-checker'
  | 'flow-designer'
  | 'new-event-form'

function PowerAppsChrome({
  title,
  app,
  children,
}: {
  title: string
  app: string
  children: React.ReactNode
}) {
  return (
    <div
      className="overflow-hidden rounded-md"
      style={{ background: '#faf9f8', color: '#201f1e', border: '1px solid #e1dfdd' }}
    >
      <div
        className="flex items-center gap-3 px-3 py-2"
        style={{ borderBottom: '1px solid #e1dfdd', background: '#f3f2f1' }}
      >
        <div className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="inline-block"
            style={{
              width: 14,
              height: 14,
              background:
                'conic-gradient(from 45deg, #f25022 0 25%, #7fba00 0 50%, #00a4ef 0 75%, #ffb900 0 100%)',
              borderRadius: 1,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              color: '#605e5c',
              letterSpacing: 0,
            }}
          >
            {app}
          </span>
        </div>
        <span style={{ color: '#c8c6c4' }}>|</span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            color: '#201f1e',
          }}
        >
          {title}
        </span>
        <span className="ml-auto flex items-center gap-2">
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              color: '#605e5c',
            }}
          >
            Environment: Default
          </span>
          <span
            className="inline-block h-5 w-5 rounded-full"
            style={{ background: '#0078d4' }}
            aria-hidden
          />
        </span>
      </div>
      {children}
    </div>
  )
}

function PowerAppsStudioMock() {
  return (
    <PowerAppsChrome title="EventsCalendar · Draft" app="Power Apps Studio">
      {/* Command bar */}
      <div
        className="flex items-center gap-4 px-3 py-1.5"
        style={{ background: '#ffffff', borderBottom: '1px solid #e1dfdd', fontSize: 11, color: '#201f1e' }}
      >
        {['File', 'Insert', 'Data', 'View', 'Action', 'Settings'].map((m, i) => (
          <span
            key={m}
            style={{
              color: i === 1 ? '#0078d4' : '#201f1e',
              borderBottom: i === 1 ? '2px solid #0078d4' : 'none',
              paddingBottom: 2,
            }}
          >
            {m}
          </span>
        ))}
        <span className="ml-auto" style={{ color: '#605e5c' }}>
          ▷ Preview · ⤴ Share · Publish
        </span>
      </div>
      {/* Formula bar */}
      <div
        className="flex items-center gap-2 px-3 py-1.5"
        style={{ background: '#faf9f8', borderBottom: '1px solid #e1dfdd' }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: '#605e5c',
            letterSpacing: '0.04em',
          }}
        >
          GalleryDays
        </span>
        <span style={{ color: '#c8c6c4' }}>·</span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: '#605e5c',
          }}
        >
          Items =
        </span>
        <span
          className="flex-1 truncate rounded border px-2 py-0.5"
          style={{
            background: '#ffffff',
            borderColor: '#e1dfdd',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: '#201f1e',
          }}
        >
          <span style={{ color: '#0078d4' }}>ForAll</span>(
          <span style={{ color: '#0078d4' }}>Sequence</span>(42),
          <span style={{ color: '#0078d4' }}> DateAdd</span>(locGridStart, ThisRecord.Value - 1))
        </span>
      </div>

      <div className="grid text-[11px]" style={{ gridTemplateColumns: '180px 1fr 180px', minHeight: 300 }}>
        {/* Tree View */}
        <div className="border-r" style={{ background: '#ffffff', borderColor: '#e1dfdd', padding: 8 }}>
          <div style={{ color: '#605e5c', fontSize: 10, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Tree view
          </div>
          {[
            { n: 'App', d: 0 },
            { n: 'Screens', d: 0, hdr: true },
            { n: 'CalendarScreen', d: 1, sel: true, bold: true },
            { n: 'HeaderContainer', d: 2 },
            { n: '  btnPrev', d: 3 },
            { n: '  lblMonth', d: 3 },
            { n: '  btnNext', d: 3 },
            { n: 'GalleryDays', d: 2, sel2: true },
            { n: '  lblDay', d: 3 },
            { n: '  lblCount', d: 3 },
            { n: 'PanelDetails', d: 2 },
            { n: 'DetailScreen', d: 1 },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                padding: '3px 6px',
                paddingLeft: 6 + item.d * 10,
                borderRadius: 2,
                background: item.sel ? '#deecf9' : item.sel2 ? '#c7e0f4' : 'transparent',
                color: item.hdr ? '#605e5c' : '#201f1e',
                fontWeight: item.bold ? 600 : 400,
                fontSize: item.hdr ? 9 : 11,
                textTransform: item.hdr ? 'uppercase' : 'none',
                letterSpacing: item.hdr ? '0.08em' : 0,
                marginBottom: 1,
              }}
            >
              {item.n}
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div style={{ background: '#edebe9', padding: 12 }}>
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e1dfdd',
              borderRadius: 2,
              padding: 12,
              minHeight: 260,
            }}
          >
            {/* Header row */}
            <div className="mb-3 flex items-center justify-between">
              <span style={{ color: '#0078d4', fontSize: 14 }}>‹</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: '#201f1e' }}>
                April 2026
              </span>
              <span style={{ color: '#0078d4', fontSize: 14 }}>›</span>
            </div>
            {/* Day headers */}
            <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div
                  key={d}
                  className="text-center"
                  style={{
                    fontSize: 9,
                    color: '#605e5c',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {d}
                </div>
              ))}
              {Array.from({ length: 42 }).map((_, i) => {
                const day = i - 2 // start mid-week
                const inMonth = day >= 1 && day <= 30
                const isToday = day === 23
                const isSel = day === 17
                const dots = [5, 9, 12, 17, 23, 28].includes(day) ? (day === 17 ? 3 : day === 23 ? 2 : 1) : 0
                return (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '1/1',
                      borderRadius: 2,
                      border: '1px solid ' + (isSel ? '#0078d4' : '#edebe9'),
                      background: isToday ? '#0078d4' : isSel ? '#deecf9' : '#ffffff',
                      color: isToday ? '#fff' : inMonth ? '#201f1e' : '#c8c6c4',
                      fontSize: 10,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingTop: 3,
                      position: 'relative',
                    }}
                  >
                    <span style={{ fontWeight: isToday ? 600 : 400 }}>
                      {inMonth ? day : day < 1 ? 30 + day : day - 30}
                    </span>
                    {dots > 0 && (
                      <div className="mt-auto mb-1 flex gap-0.5">
                        {Array.from({ length: dots }).map((__, j) => (
                          <span
                            key={j}
                            style={{
                              width: 3,
                              height: 3,
                              borderRadius: 999,
                              background: isToday ? '#fff' : '#0078d4',
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Properties panel */}
        <div className="border-l" style={{ background: '#ffffff', borderColor: '#e1dfdd', padding: 8 }}>
          <div style={{ color: '#605e5c', fontSize: 10, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Properties · GalleryDays
          </div>
          {[
            { k: 'Items', v: 'ForAll(Sequence(42)…', hi: true },
            { k: 'TemplateSize', v: '72' },
            { k: 'WrapCount', v: '7' },
            { k: 'OnSelect', v: 'Set(locSelectedDate…)', hi: true },
            { k: 'Fill', v: 'RGBA(255,255,255,1)' },
            { k: 'BorderColor', v: 'ColorFade(#edebe9…)' },
          ].map((row) => (
            <div key={row.k} style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 9, color: '#605e5c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {row.k}
              </div>
              <div
                style={{
                  background: row.hi ? '#deecf9' : '#faf9f8',
                  border: '1px solid #edebe9',
                  padding: '3px 6px',
                  borderRadius: 2,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: '#201f1e',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {row.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsTreeViewMock() {
  return (
    <PowerAppsChrome title="Tree view" app="Power Apps Studio">
      <div style={{ background: '#ffffff', padding: 10, minHeight: 220 }}>
        {[
          { n: 'App', d: 0, icon: '▦', note: 'App.OnStart sets locFirstOfMonth' },
          { n: 'CalendarScreen', d: 1, icon: '▢', note: 'Main screen — tablet layout' },
          { n: 'HeaderContainer', d: 2, icon: '▭', note: 'Horizontal container' },
          { n: 'btnPrev', d: 3, icon: '◁', note: "OnSelect: UpdateContext({locFirstOfMonth: DateAdd(…,-1,Months)})" },
          { n: 'lblMonth', d: 3, icon: 'T', note: 'Text = Text(locFirstOfMonth,"mmmm yyyy")' },
          { n: 'btnNext', d: 3, icon: '▷', note: 'OnSelect: +1 month' },
          { n: 'GalleryDays', d: 2, icon: '▤', note: 'The 7×6 calendar grid', sel: true },
          { n: 'lblDay', d: 3, icon: 'T', note: 'Text = Day(ThisItem.Value)' },
          { n: 'lblCount', d: 3, icon: '●', note: "Visible = CountRows(…) > 0" },
          { n: 'PanelDetails', d: 2, icon: '▥', note: 'Right-side event list for selected day' },
          { n: 'galSelectedDayEvents', d: 3, icon: '▤', note: 'Items = Filter(Events, …)' },
        ].map((r, i) => (
          <div
            key={i}
            className="grid items-center gap-2"
            style={{
              gridTemplateColumns: '1fr 2fr',
              padding: '3px 6px',
              paddingLeft: 6 + r.d * 14,
              borderBottom: i < 10 ? '1px solid #f3f2f1' : 'none',
              background: r.sel ? '#deecf9' : 'transparent',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                color: '#201f1e',
                fontWeight: r.sel ? 600 : 400,
              }}
            >
              <span style={{ color: '#0078d4', marginRight: 6 }}>{r.icon}</span>
              {r.n}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#605e5c' }}>
              {r.note}
            </span>
          </div>
        ))}
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsDataSchemaMock() {
  return (
    <PowerAppsChrome title="Events · SharePoint list" app="Data">
      <div style={{ background: '#ffffff', padding: 12, minHeight: 220 }}>
        <div className="mb-3 flex items-center gap-2">
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 26,
              height: 26,
              background: '#0078d4',
              color: '#fff',
              borderRadius: 2,
              fontFamily: 'var(--font-body)',
              fontSize: 13,
            }}
          >
            ≡
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#201f1e' }}>
            Events
          </span>
          <span
            style={{
              background: '#c7e0f4',
              color: '#004578',
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              padding: '1px 6px',
              borderRadius: 2,
              marginLeft: 4,
              letterSpacing: '0.04em',
            }}
          >
            SharePoint list
          </span>
        </div>
        <div
          className="overflow-hidden rounded"
          style={{ border: '1px solid #e1dfdd', background: '#ffffff' }}
        >
          <div
            className="grid items-center gap-3 px-3 py-1.5"
            style={{
              gridTemplateColumns: '160px 130px 1fr',
              borderBottom: '1px solid #e1dfdd',
              background: '#faf9f8',
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              color: '#605e5c',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            <span>Column</span>
            <span>Type</span>
            <span>Description</span>
          </div>
          {[
            { c: 'Title', t: 'Single line of text', d: 'Event title shown in the cell and details.', key: true },
            { c: 'Start', t: 'Date and time', d: 'Start timestamp. Calendar filters on this.' },
            { c: 'End', t: 'Date and time', d: 'End timestamp. Used for duration.' },
            { c: 'Category', t: 'Choice', d: 'Work · Personal · On-call · Holiday.' },
            { c: 'Owner', t: 'Person or Group', d: 'Who the event belongs to.' },
            { c: 'Notes', t: 'Multiple lines of text', d: 'Rendered in detail panel (lesson 6).' },
          ].map((row, i) => (
            <div
              key={row.c}
              className="grid items-center gap-3 px-3 py-2"
              style={{
                gridTemplateColumns: '160px 130px 1fr',
                borderBottom: i < 5 ? '1px solid #f3f2f1' : 'none',
                color: '#201f1e',
                fontFamily: 'var(--font-body)',
                fontSize: 11,
              }}
            >
              <span>
                {row.key && (
                  <span style={{ color: '#0078d4', marginRight: 4, fontSize: 9 }}>★</span>
                )}
                {row.c}
              </span>
              <span style={{ color: '#605e5c' }}>{row.t}</span>
              <span style={{ color: '#605e5c' }}>{row.d}</span>
            </div>
          ))}
        </div>
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsFormulaBarMock() {
  return (
    <PowerAppsChrome title="App · OnStart" app="Formula bar">
      <div style={{ background: '#ffffff', minHeight: 180 }}>
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ borderBottom: '1px solid #e1dfdd', background: '#faf9f8' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: '#201f1e',
              background: '#ffffff',
              border: '1px solid #e1dfdd',
              padding: '2px 6px',
              borderRadius: 2,
            }}
          >
            App
          </span>
          <span style={{ color: '#605e5c', fontSize: 10 }}>▾</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#605e5c' }}>
            OnStart
          </span>
          <span style={{ color: '#605e5c', fontSize: 10 }}>=</span>
        </div>
        <pre
          style={{
            margin: 0,
            padding: 12,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: '#201f1e',
            lineHeight: 1.6,
            background: '#ffffff',
            whiteSpace: 'pre-wrap',
          }}
        >
          <span style={{ color: '#8a8886' }}>{`// Initialize calendar state once on app launch\n`}</span>
          <span style={{ color: '#0078d4' }}>Set</span>
          {'(locFirstOfMonth, '}
          <span style={{ color: '#0078d4' }}>DateAdd</span>
          {'('}
          <span style={{ color: '#0078d4' }}>Today</span>
          {'(), -(Day('}
          <span style={{ color: '#0078d4' }}>Today</span>
          {'()) - 1), Days));\n'}
          <span style={{ color: '#0078d4' }}>Set</span>
          {'(locSelectedDate, '}
          <span style={{ color: '#0078d4' }}>Today</span>
          {'());\n'}
          <span style={{ color: '#0078d4' }}>Set</span>
          {'(locGridStart,\n  '}
          <span style={{ color: '#0078d4' }}>DateAdd</span>
          {'(locFirstOfMonth, -'}
          <span style={{ color: '#0078d4' }}>Weekday</span>
          {'(locFirstOfMonth) + 1, Days)\n)'}
        </pre>
        <div
          className="border-t px-3 py-1.5"
          style={{
            borderColor: '#e1dfdd',
            background: '#f3f9f1',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: '#107c10',
            letterSpacing: '0.04em',
          }}
        >
          ✓ No errors · 3 variables initialized
        </div>
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsCalendarPreviewMock({ live = false }: { live?: boolean }) {
  const selected = 17
  const today = 23
  return (
    <PowerAppsChrome
      title={live ? 'EventsCalendar · Play (F5)' : 'EventsCalendar · Canvas preview'}
      app={live ? 'Player' : 'Power Apps Studio'}
    >
      <div style={{ background: '#edebe9', padding: 14, minHeight: 260 }}>
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: live ? '1.5fr 1fr' : '1fr' }}
        >
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e1dfdd',
              borderRadius: 2,
              padding: 14,
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <span
                style={{
                  width: 26,
                  height: 26,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  border: '1px solid #e1dfdd',
                  color: '#0078d4',
                }}
              >
                ‹
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#201f1e' }}>
                April 2026
              </span>
              <span
                style={{
                  width: 26,
                  height: 26,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  border: '1px solid #e1dfdd',
                  color: '#0078d4',
                }}
              >
                ›
              </span>
            </div>
            <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div
                  key={d}
                  className="text-center"
                  style={{ fontSize: 10, color: '#605e5c', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '2px 0' }}
                >
                  {d}
                </div>
              ))}
              {Array.from({ length: 42 }).map((_, i) => {
                const day = i - 2
                const inMonth = day >= 1 && day <= 30
                const isToday = day === today
                const isSel = day === selected
                const dots = [5, 9, 12, 17, 23, 28, 30].includes(day)
                  ? day === 17
                    ? 3
                    : day === 23
                      ? 2
                      : 1
                  : 0
                return (
                  <div
                    key={i}
                    style={{
                      aspectRatio: '1/1',
                      borderRadius: 2,
                      border: '1px solid ' + (isSel ? '#0078d4' : '#edebe9'),
                      background: isToday ? '#0078d4' : isSel ? '#deecf9' : '#ffffff',
                      color: isToday ? '#fff' : inMonth ? '#201f1e' : '#c8c6c4',
                      fontSize: 11,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingTop: 4,
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontWeight: isToday ? 600 : 400 }}>
                      {inMonth ? day : day < 1 ? 30 + day : day - 30}
                    </span>
                    {dots > 0 && (
                      <div className="mt-auto mb-1 flex gap-0.5">
                        {Array.from({ length: dots }).map((__, j) => (
                          <span
                            key={j}
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: 999,
                              background: isToday ? '#fff' : '#0078d4',
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {live && (
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e1dfdd',
                borderRadius: 2,
                padding: 12,
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: '#201f1e', marginBottom: 2 }}>
                Fri · April 17
              </div>
              <div style={{ fontSize: 10, color: '#605e5c', marginBottom: 10 }}>
                3 events
              </div>
              {[
                { t: '09:00 — Stand-up', c: '#0078d4', cat: 'Work' },
                { t: '11:30 — Vendor demo', c: '#107c10', cat: 'Work' },
                { t: '18:00 — On-call starts', c: '#ca5010', cat: 'On-call' },
              ].map((ev, i) => (
                <div
                  key={i}
                  className="mb-1.5 rounded"
                  style={{
                    background: '#faf9f8',
                    borderLeft: `3px solid ${ev.c}`,
                    padding: '6px 8px',
                    fontSize: 11,
                    color: '#201f1e',
                  }}
                >
                  <div>{ev.t}</div>
                  <div style={{ fontSize: 9, color: '#605e5c', marginTop: 1 }}>{ev.cat}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsShareDialogMock() {
  return (
    <PowerAppsChrome title="Share EventsCalendar" app="Power Apps">
      <div style={{ background: '#ffffff', padding: 0, minHeight: 240, position: 'relative' }}>
        <div style={{ padding: 14, opacity: 0.35, filter: 'blur(1px)' }}>
          <div style={{ height: 200, background: '#edebe9', borderRadius: 2 }} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '78%',
            background: '#ffffff',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            border: '1px solid #e1dfdd',
            overflow: 'hidden',
          }}
        >
          <div
            className="flex items-center justify-between px-3 py-2"
            style={{ borderBottom: '1px solid #e1dfdd', background: '#f3f2f1' }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, color: '#201f1e' }}>
              Share EventsCalendar
            </span>
            <span style={{ color: '#605e5c' }}>×</span>
          </div>
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 10, color: '#605e5c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              Enter a name, email address, or group
            </div>
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #0078d4',
                padding: '6px 8px',
                borderRadius: 2,
                marginBottom: 10,
                fontFamily: 'var(--font-body)',
                fontSize: 11,
                color: '#201f1e',
              }}
            >
              <span
                style={{
                  background: '#deecf9',
                  color: '#004578',
                  padding: '2px 6px',
                  borderRadius: 2,
                  marginRight: 4,
                }}
              >
                ◉ Field Ops Team
              </span>
              <span
                style={{
                  background: '#deecf9',
                  color: '#004578',
                  padding: '2px 6px',
                  borderRadius: 2,
                  marginRight: 4,
                }}
              >
                ◉ J. Rivera
              </span>
            </div>
            <div className="mb-3 flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                style={{ accentColor: '#0078d4' }}
              />
              <span style={{ fontSize: 11, color: '#201f1e' }}>
                Co-owner (can edit) ·{' '}
                <span style={{ color: '#605e5c' }}>
                  uncheck to grant User (can run) only
                </span>
              </span>
            </div>
            <div
              style={{
                background: '#fff4ce',
                border: '1px solid #fde293',
                padding: '6px 8px',
                borderRadius: 2,
                fontSize: 10,
                color: '#8a6116',
                marginBottom: 10,
              }}
            >
              ⚠ Users also need access to the Events SharePoint list, or the app will load blank for them.
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                style={{
                  padding: '5px 12px',
                  border: '1px solid #8a8886',
                  background: '#ffffff',
                  borderRadius: 2,
                  fontSize: 11,
                  color: '#201f1e',
                }}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: '5px 14px',
                  background: '#0078d4',
                  color: '#fff',
                  borderRadius: 2,
                  border: 'none',
                  fontSize: 11,
                }}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </PowerAppsChrome>
  )
}

/* --- New variants: onboarding + workflow mocks --- */

function PowerAppsHomeScreenMock() {
  const cards = [
    { title: 'Start with a page design', sub: 'Model-driven · Dataverse', tag: 'App from template' },
    { title: 'Start with data', sub: 'Canvas · pick an existing table', tag: 'Auto-generated UI' },
    { title: 'Blank canvas app', sub: 'Pick a format, design from scratch', tag: "We click this", highlight: true },
    { title: 'Blank responsive app', sub: 'Adapts to tablet / phone / desktop', tag: 'One canvas, all sizes' },
  ]
  const rail = [
    { i: '＋', l: 'Create', active: true },
    { i: '⌂', l: 'Home' },
    { i: '✦', l: 'Learn' },
    { i: '▦', l: 'Apps' },
    { i: '☰', l: 'Tables' },
    { i: '⇆', l: 'Flows' },
    { i: '◎', l: 'Solutions' },
  ]

  return (
    <PowerAppsChrome title="make.powerapps.com" app="Power Apps">
      <div className="grid" style={{ gridTemplateColumns: '180px 1fr', minHeight: 340, background: '#faf9f8' }}>
        {/* Left rail */}
        <div style={{ borderRight: '1px solid #e1dfdd', background: '#ffffff', padding: '14px 0' }}>
          {rail.map((r) => (
            <div
              key={r.l}
              className="flex items-center gap-3 px-4 py-2.5"
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-body)',
                color: r.active ? '#0078d4' : '#201f1e',
                background: r.active ? '#deecf9' : 'transparent',
                borderLeft: r.active ? '3px solid #0078d4' : '3px solid transparent',
              }}
            >
              <span style={{ width: 16, textAlign: 'center', color: r.active ? '#0078d4' : '#605e5c' }}>
                {r.i}
              </span>
              {r.l}
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ padding: '20px 28px' }}>
          <p style={{ fontSize: 11, color: '#605e5c', letterSpacing: '0.04em', marginBottom: 4 }}>
            + Create
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 20,
              color: '#201f1e',
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            Create your own app
          </p>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
            {cards.map((c) => (
              <div
                key={c.title}
                style={{
                  background: '#ffffff',
                  border: c.highlight ? '2px solid #0078d4' : '1px solid #e1dfdd',
                  borderRadius: 4,
                  padding: '14px 14px 16px',
                  position: 'relative',
                }}
              >
                {c.highlight && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -10,
                      left: 10,
                      background: '#0078d4',
                      color: '#fff',
                      fontSize: 9,
                      padding: '2px 6px',
                      borderRadius: 2,
                      letterSpacing: '0.1em',
                    }}
                  >
                    START HERE
                  </span>
                )}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    background: c.highlight ? '#deecf9' : '#f3f2f1',
                    borderRadius: 2,
                    marginBottom: 10,
                  }}
                />
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    color: '#201f1e',
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  {c.title}
                </p>
                <p style={{ fontSize: 11, color: '#605e5c', lineHeight: 1.45 }}>{c.sub}</p>
                <p
                  style={{
                    marginTop: 8,
                    fontSize: 10,
                    color: c.highlight ? '#0078d4' : '#8a8886',
                    letterSpacing: '0.04em',
                  }}
                >
                  {c.tag}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsCreateDialogMock() {
  return (
    <PowerAppsChrome title="Blank canvas app" app="Power Apps">
      <div
        style={{
          position: 'relative',
          minHeight: 320,
          background: 'rgba(32,31,30,0.45)',
          padding: 28,
        }}
      >
        {/* Modal */}
        <div
          style={{
            maxWidth: 480,
            margin: '0 auto',
            background: '#ffffff',
            border: '1px solid #c8c6c4',
            borderRadius: 4,
            padding: '22px 24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              fontWeight: 600,
              color: '#201f1e',
              marginBottom: 16,
            }}
          >
            Blank canvas app
          </p>

          <label style={{ fontSize: 11, color: '#605e5c', letterSpacing: '0.04em' }}>App name *</label>
          <div
            style={{
              border: '1px solid #0078d4',
              background: '#fff',
              padding: '8px 10px',
              marginTop: 4,
              marginBottom: 18,
              borderRadius: 2,
              fontSize: 13,
              color: '#201f1e',
              fontFamily: 'var(--font-body)',
            }}
          >
            EventsCalendar<span style={{ color: '#0078d4' }}>|</span>
          </div>

          <label style={{ fontSize: 11, color: '#605e5c', letterSpacing: '0.04em' }}>Format</label>
          <div className="flex gap-2" style={{ marginTop: 6, marginBottom: 22 }}>
            {['Tablet', 'Phone'].map((f, i) => (
              <div
                key={f}
                style={{
                  flex: 1,
                  border: i === 0 ? '2px solid #0078d4' : '1px solid #c8c6c4',
                  background: i === 0 ? '#deecf9' : '#fff',
                  padding: '10px 12px',
                  borderRadius: 2,
                  fontSize: 12,
                  color: '#201f1e',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <div
                  style={{
                    width: i === 0 ? 36 : 16,
                    height: 22,
                    border: '1.5px solid ' + (i === 0 ? '#0078d4' : '#8a8886'),
                    borderRadius: 2,
                    marginBottom: 6,
                  }}
                />
                {f}
                {i === 0 && (
                  <span style={{ fontSize: 10, color: '#0078d4', marginLeft: 6, letterSpacing: '0.06em' }}>
                    · Selected
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <div
              style={{
                padding: '7px 14px',
                border: '1px solid #8a8886',
                borderRadius: 2,
                fontSize: 12,
                color: '#201f1e',
                fontFamily: 'var(--font-body)',
              }}
            >
              Cancel
            </div>
            <div
              style={{
                padding: '7px 16px',
                background: '#0078d4',
                color: '#fff',
                borderRadius: 2,
                fontSize: 12,
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
              }}
            >
              Create
            </div>
          </div>
        </div>
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsConnectorsListMock() {
  const connectors = [
    { n: 'SharePoint', sub: 'Standard · Microsoft', selected: true, color: '#036c70' },
    { n: 'Office 365 Users', sub: 'Standard · Microsoft', color: '#0078d4' },
    { n: 'Dataverse', sub: 'Premium · Microsoft', color: '#742774' },
    { n: 'SQL Server', sub: 'Premium · Microsoft', color: '#a4262c' },
    { n: 'OneDrive for Business', sub: 'Standard · Microsoft', color: '#0364b8' },
    { n: 'Excel Online (Business)', sub: 'Standard · Microsoft', color: '#217346' },
  ]
  return (
    <PowerAppsChrome title="Add data" app="Data">
      <div style={{ padding: 18, background: '#faf9f8', minHeight: 340 }}>
        {/* Search */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #0078d4',
            borderRadius: 2,
            padding: '7px 10px',
            fontSize: 12,
            color: '#201f1e',
            marginBottom: 16,
            fontFamily: 'var(--font-body)',
          }}
        >
          🔍 <span style={{ color: '#201f1e' }}>SharePoint</span>
          <span style={{ color: '#0078d4' }}>|</span>
        </div>
        <p style={{ fontSize: 11, color: '#605e5c', letterSpacing: '0.04em', marginBottom: 10 }}>
          Connectors · showing results for "SharePoint"
        </p>
        <div className="grid gap-px" style={{ background: '#e1dfdd', border: '1px solid #e1dfdd' }}>
          {connectors.map((c) => (
            <div
              key={c.n}
              className="flex items-center gap-3"
              style={{
                background: c.selected ? '#deecf9' : '#ffffff',
                padding: '10px 12px',
              }}
            >
              <span
                style={{
                  width: 26,
                  height: 26,
                  background: c.color,
                  borderRadius: 2,
                  display: 'inline-block',
                }}
              />
              <div className="flex-1">
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    color: '#201f1e',
                    fontWeight: c.selected ? 600 : 500,
                  }}
                >
                  {c.n}
                </p>
                <p style={{ fontSize: 10, color: '#605e5c' }}>{c.sub}</p>
              </div>
              {c.selected && (
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    padding: '3px 8px',
                    background: '#0078d4',
                    color: '#fff',
                    borderRadius: 2,
                  }}
                >
                  CLICK
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsSharepointPickerMock() {
  const lists = [
    { n: 'Documents', sub: 'Document library · 412 items' },
    { n: 'Events', sub: 'Custom list · 5 items', selected: true },
    { n: 'Tasks', sub: 'Custom list · 28 items' },
    { n: 'Announcements', sub: 'Custom list · 3 items' },
  ]
  return (
    <PowerAppsChrome title="Connect · SharePoint" app="Data">
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: '1fr 1fr', padding: 16, background: '#faf9f8' }}
      >
        {/* Step 1 */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e1dfdd',
            borderRadius: 4,
            padding: '14px 16px',
          }}
        >
          <p style={{ fontSize: 10, color: '#0078d4', letterSpacing: '0.08em', marginBottom: 6 }}>
            STEP 1 OF 2
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 600,
              color: '#201f1e',
              marginBottom: 12,
            }}
          >
            Connect to a SharePoint site
          </p>
          <label style={{ fontSize: 11, color: '#605e5c' }}>Recent sites</label>
          <div
            style={{
              border: '1px solid #c8c6c4',
              borderRadius: 2,
              padding: '8px 10px',
              marginTop: 6,
              fontSize: 12,
              color: '#201f1e',
              background: '#fff',
              fontFamily: 'var(--font-mono)',
            }}
          >
            https://contoso.sharepoint.com/sites/fieldops
          </div>
          <div
            style={{
              marginTop: 14,
              padding: '7px 14px',
              background: '#0078d4',
              color: '#fff',
              borderRadius: 2,
              fontSize: 12,
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              textAlign: 'center',
              width: 'fit-content',
            }}
          >
            Connect →
          </div>
        </div>

        {/* Step 2 */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e1dfdd',
            borderRadius: 4,
            padding: '14px 16px',
          }}
        >
          <p style={{ fontSize: 10, color: '#0078d4', letterSpacing: '0.08em', marginBottom: 6 }}>
            STEP 2 OF 2
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 600,
              color: '#201f1e',
              marginBottom: 12,
            }}
          >
            Choose a list
          </p>
          <div className="grid gap-px" style={{ background: '#e1dfdd', border: '1px solid #e1dfdd' }}>
            {lists.map((l) => (
              <div
                key={l.n}
                className="flex items-center gap-2"
                style={{
                  background: l.selected ? '#deecf9' : '#fff',
                  padding: '8px 10px',
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 12,
                    border: l.selected ? '4px solid #0078d4' : '1px solid #8a8886',
                    borderRadius: 12,
                    display: 'inline-block',
                  }}
                />
                <div>
                  <p style={{ fontSize: 12, color: '#201f1e', fontWeight: l.selected ? 600 : 500 }}>
                    {l.n}
                  </p>
                  <p style={{ fontSize: 10, color: '#605e5c' }}>{l.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 14,
              padding: '7px 14px',
              background: '#0078d4',
              color: '#fff',
              borderRadius: 2,
              fontSize: 12,
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              textAlign: 'center',
              width: 'fit-content',
            }}
          >
            Connect
          </div>
        </div>
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsInsertMenuMock() {
  const cats = [
    { h: 'Popular', items: ['Label', 'Text input', 'Button', 'Icon'] },
    { h: 'Layout', items: ['Container', 'Horizontal', 'Vertical', 'Gallery'], highlight: 'Gallery' },
    { h: 'Input', items: ['Date picker', 'Dropdown', 'Combo box', 'Toggle'] },
    { h: 'Display', items: ['Image', 'HTML text', 'Rich text', 'Rating'] },
  ]
  return (
    <PowerAppsChrome title="Insert" app="Power Apps Studio">
      <div className="grid" style={{ gridTemplateColumns: '240px 1fr', minHeight: 340 }}>
        {/* Left: search + categories */}
        <div style={{ background: '#fff', borderRight: '1px solid #e1dfdd', padding: 14 }}>
          <div
            style={{
              border: '1px solid #c8c6c4',
              borderRadius: 2,
              padding: '6px 8px',
              fontSize: 11,
              color: '#8a8886',
              marginBottom: 14,
              fontFamily: 'var(--font-body)',
            }}
          >
            🔍 Search controls
          </div>
          {cats.map((c) => (
            <div key={c.h} style={{ marginBottom: 14 }}>
              <p
                style={{
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  color: '#605e5c',
                  marginBottom: 6,
                  textTransform: 'uppercase',
                }}
              >
                {c.h}
              </p>
              {c.items.map((i) => {
                const hot = c.highlight === i
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2"
                    style={{
                      padding: '5px 6px',
                      fontSize: 12,
                      color: hot ? '#0078d4' : '#201f1e',
                      background: hot ? '#deecf9' : 'transparent',
                      borderLeft: hot ? '2px solid #0078d4' : '2px solid transparent',
                      fontWeight: hot ? 600 : 400,
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        background: '#f3f2f1',
                        border: '1px solid #c8c6c4',
                        borderRadius: 1,
                        display: 'inline-block',
                      }}
                    />
                    {i}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Right: Gallery submenu */}
        <div style={{ padding: 18, background: '#faf9f8' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 600,
              color: '#201f1e',
              marginBottom: 4,
            }}
          >
            Gallery
          </p>
          <p style={{ fontSize: 11, color: '#605e5c', marginBottom: 14, lineHeight: 1.45 }}>
            A repeating control. Set the Items property to a table; the template renders once per row.
          </p>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[
              { n: 'Vertical', pick: true },
              { n: 'Horizontal' },
              { n: 'Flexible height' },
              { n: 'Blank vertical', pick: true },
              { n: 'Blank horizontal' },
              { n: 'Blank flexible' },
            ].map((g) => (
              <div
                key={g.n}
                style={{
                  background: '#fff',
                  border: g.pick ? '2px solid #0078d4' : '1px solid #e1dfdd',
                  borderRadius: 2,
                  padding: '10px 12px',
                }}
              >
                <div
                  style={{
                    height: 46,
                    background: '#f3f2f1',
                    border: '1px solid #e1dfdd',
                    borderRadius: 1,
                    marginBottom: 8,
                    position: 'relative',
                  }}
                >
                  {[0, 1, 2].map((r) => (
                    <div
                      key={r}
                      style={{
                        position: 'absolute',
                        left: 4,
                        right: 4,
                        top: 4 + r * 13,
                        height: 10,
                        background: '#e1dfdd',
                        borderRadius: 1,
                      }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: 11, color: g.pick ? '#0078d4' : '#201f1e', fontWeight: g.pick ? 600 : 500 }}>
                  {g.n}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsPreviewModeMock() {
  return (
    <PowerAppsChrome title="EventsCalendar · Preview (F5)" app="Power Apps">
      <div
        style={{
          background: '#605e5c',
          padding: '24px 24px 28px',
          minHeight: 380,
          position: 'relative',
        }}
      >
        {/* Close X */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 28,
            height: 28,
            background: '#201f1e',
            color: '#fff',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontFamily: 'var(--font-mono)',
          }}
        >
          ×
        </div>
        <p
          style={{
            fontSize: 10,
            color: '#fff',
            letterSpacing: '0.14em',
            marginBottom: 12,
            opacity: 0.8,
          }}
        >
          PREVIEW · BEHAVES EXACTLY LIKE THE PUBLISHED APP · PRESS ESC TO EXIT
        </p>

        {/* Device frame */}
        <div
          style={{
            margin: '0 auto',
            maxWidth: 560,
            background: '#201f1e',
            padding: 10,
            borderRadius: 8,
            boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
          }}
        >
          <div
            style={{
              background: '#faf9f8',
              borderRadius: 4,
              padding: '16px 18px',
              minHeight: 280,
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#201f1e',
                }}
              >
                April 2026
              </span>
              <span style={{ fontSize: 11, color: '#605e5c' }}>◀  Today  ▶</span>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                <div
                  key={d}
                  style={{
                    fontSize: 10,
                    color: '#605e5c',
                    textAlign: 'center',
                    letterSpacing: '0.06em',
                    paddingBottom: 4,
                  }}
                >
                  {d}
                </div>
              ))}
              {Array.from({ length: 30 }).map((_, i) => {
                const n = i + 1
                const today = n === 23
                const hasEvents = [2, 7, 10, 15, 17, 22, 25, 28].includes(n)
                return (
                  <div
                    key={n}
                    style={{
                      height: 28,
                      background: today ? '#0078d4' : '#fff',
                      color: today ? '#fff' : '#201f1e',
                      border: '1px solid #edebe9',
                      fontSize: 11,
                      textAlign: 'center',
                      paddingTop: 2,
                      position: 'relative',
                    }}
                  >
                    {n}
                    {hasEvents && !today && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 2,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 4,
                          height: 4,
                          background: '#0078d4',
                          borderRadius: 4,
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsPublishDialogMock() {
  return (
    <PowerAppsChrome title="Publish · EventsCalendar" app="Power Apps">
      <div
        style={{
          position: 'relative',
          minHeight: 340,
          background: 'rgba(32,31,30,0.45)',
          padding: 28,
        }}
      >
        <div
          style={{
            maxWidth: 520,
            margin: '0 auto',
            background: '#fff',
            border: '1px solid #c8c6c4',
            borderRadius: 4,
            padding: '22px 24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              fontWeight: 600,
              color: '#201f1e',
              marginBottom: 10,
            }}
          >
            Publish this version
          </p>
          <p style={{ fontSize: 12, color: '#605e5c', lineHeight: 1.55, marginBottom: 16 }}>
            Users who already have access will see <strong style={{ color: '#201f1e' }}>v1.0.2</strong>
            {' '}the next time they open the app. You can restore a previous version at any time.
          </p>

          <label style={{ fontSize: 11, color: '#605e5c', letterSpacing: '0.04em' }}>
            Version notes (optional)
          </label>
          <div
            style={{
              border: '1px solid #0078d4',
              background: '#fff',
              padding: '8px 10px',
              marginTop: 4,
              marginBottom: 18,
              borderRadius: 2,
              fontSize: 12,
              color: '#201f1e',
              fontFamily: 'var(--font-body)',
              minHeight: 60,
            }}
          >
            v1 — calendar grid, event dots, month nav, detail panel, Fluent theme.
          </div>

          <div
            style={{
              background: '#fff4ce',
              border: '1px solid #fde293',
              padding: '8px 10px',
              fontSize: 11,
              color: '#8a6116',
              borderRadius: 2,
              marginBottom: 16,
              lineHeight: 1.5,
            }}
          >
            ⚠ Sharing the app does not grant access to its data sources. Make sure your users have
            Read on the Events SharePoint list.
          </div>

          <div className="flex justify-end gap-2">
            <div
              style={{
                padding: '7px 14px',
                border: '1px solid #8a8886',
                borderRadius: 2,
                fontSize: 12,
                color: '#201f1e',
                fontFamily: 'var(--font-body)',
              }}
            >
              Cancel
            </div>
            <div
              style={{
                padding: '7px 16px',
                background: '#0078d4',
                color: '#fff',
                borderRadius: 2,
                fontSize: 12,
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
              }}
            >
              Publish this version
            </div>
          </div>
        </div>
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsAppCheckerMock() {
  const issues = [
    {
      kind: 'error',
      ctl: 'GalleryDays.Items',
      msg: 'Name isn\'t valid. "locGridStart" isn\'t recognized.',
      hint: 'Define it in App.OnStart first, then Run OnStart from the App menu.',
    },
    {
      kind: 'warning',
      ctl: 'galDots.Items',
      msg: 'Delegation warning — DateValue(Start) not delegable to SharePoint.',
      hint: 'Acceptable for < 500 rows per query. Otherwise, ClearCollect a local copy.',
    },
    {
      kind: 'info',
      ctl: 'App.OnStart',
      msg: 'Consider using named formulas for gblTheme (read-only, cached).',
      hint: 'File → Settings → Upcoming features → Named formulas = On.',
    },
  ]
  const color = (k: string) =>
    k === 'error' ? '#a80000' : k === 'warning' ? '#8a6116' : '#0078d4'
  const bg = (k: string) =>
    k === 'error' ? '#fde7e9' : k === 'warning' ? '#fff4ce' : '#deecf9'
  const icon = (k: string) => (k === 'error' ? '✕' : k === 'warning' ? '⚠' : 'ℹ')

  return (
    <PowerAppsChrome title="App checker" app="Power Apps Studio">
      <div style={{ padding: 0, background: '#faf9f8' }}>
        <div
          className="flex items-center gap-4 px-3 py-1.5"
          style={{ borderBottom: '1px solid #e1dfdd', background: '#fff', fontSize: 11 }}
        >
          {['Formulas', 'Rules', 'Performance', 'Runtime'].map((t, i) => (
            <span
              key={t}
              style={{
                color: i === 0 ? '#0078d4' : '#605e5c',
                borderBottom: i === 0 ? '2px solid #0078d4' : '2px solid transparent',
                paddingBottom: 2,
              }}
            >
              {t} {i === 0 && '(3)'}
            </span>
          ))}
        </div>

        <div className="grid gap-px" style={{ background: '#e1dfdd', padding: '0 0 1px' }}>
          {issues.map((it, i) => (
            <div key={i} style={{ background: '#fff', padding: '12px 14px' }}>
              <div className="flex items-start gap-3">
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 22,
                    background: bg(it.kind),
                    color: color(it.kind),
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {icon(it.kind)}
                </span>
                <div className="flex-1">
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      color: color(it.kind),
                      textTransform: 'uppercase',
                      marginBottom: 2,
                    }}
                  >
                    {it.kind} · {it.ctl}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13,
                      color: '#201f1e',
                      marginBottom: 4,
                    }}
                  >
                    {it.msg}
                  </p>
                  <p style={{ fontSize: 11, color: '#605e5c', lineHeight: 1.5 }}>{it.hint}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PowerAppsChrome>
  )
}

/* --- Power Automate flow designer + in-app create-event form --- */

function PowerAppsFlowDesignerMock() {
  const steps = [
    {
      role: 'TRIGGER',
      tag: 'SharePoint',
      tagColor: '#036c70',
      title: 'When an item is created',
      sub: 'Site Address · Contoso / Field Ops   List Name · Events',
      pick: ['Site Address', 'List Name'],
    },
    {
      role: 'ACTION 1',
      tag: 'Office 365 Users',
      tagColor: '#0078d4',
      title: 'Get user profile (V2)',
      sub: 'User (UPN) · triggerOutputs()?[\'body/Owner/Email\']',
      pick: ['User (UPN)'],
    },
    {
      role: 'ACTION 2',
      tag: 'Office 365 Outlook',
      tagColor: '#0078d4',
      title: 'Send an email (V2)',
      sub: 'To · Owner  ·  Subject · "New event: " + Title  ·  Body · Start, End, Notes',
      pick: ['To', 'Subject', 'Body'],
    },
  ]
  return (
    <PowerAppsChrome title="OnEventCreated · Automated cloud flow" app="Power Automate">
      <div style={{ padding: 20, background: '#faf9f8' }}>
        {steps.map((s, i) => (
          <div key={s.title} style={{ position: 'relative' }}>
            <div
              style={{
                background: '#fff',
                border: '1px solid #e1dfdd',
                borderRadius: 4,
                padding: '14px 16px',
                maxWidth: 560,
                margin: '0 auto',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}
            >
              <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: '0.14em',
                    background: s.role === 'TRIGGER' ? '#107c10' : '#605e5c',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: 2,
                  }}
                >
                  {s.role}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    color: '#fff',
                    background: s.tagColor,
                    padding: '2px 8px',
                    borderRadius: 2,
                  }}
                >
                  {s.tag}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#201f1e',
                  marginBottom: 6,
                }}
              >
                {s.title}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: '#605e5c',
                  lineHeight: 1.55,
                  marginBottom: 10,
                }}
              >
                {s.sub}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.pick.map((p) => (
                  <span
                    key={p}
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.08em',
                      padding: '3px 8px',
                      background: '#deecf9',
                      color: '#0078d4',
                      borderRadius: 2,
                      border: '1px solid #c7e0f4',
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div
                aria-hidden
                style={{
                  width: 2,
                  height: 24,
                  background: '#c8c6c4',
                  margin: '4px auto',
                }}
              />
            )}
          </div>
        ))}

        <div
          style={{
            marginTop: 18,
            padding: '10px 14px',
            border: '1px dashed #107c10',
            background: '#dff6dd',
            color: '#0b6a0b',
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          ✓ Flow saved. Runs automatically every time a new Events row is created — including rows
          created from the Power App.
        </div>
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsNewEventFormMock() {
  return (
    <PowerAppsChrome title="New event · frmNewEvent" app="Power Apps Studio">
      <div
        style={{
          padding: 20,
          background: '#faf9f8',
          minHeight: 360,
        }}
      >
        <div
          style={{
            margin: '0 auto',
            maxWidth: 460,
            background: '#fff',
            border: '1px solid #e1dfdd',
            borderRadius: 4,
            padding: '18px 20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.14em',
              color: '#0078d4',
              marginBottom: 6,
            }}
          >
            FRIDAY · APRIL 17 · 2026
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              fontWeight: 600,
              color: '#201f1e',
              marginBottom: 16,
            }}
          >
            New event
          </p>

          {/* Title */}
          <label style={{ fontSize: 11, color: '#605e5c' }}>Title *</label>
          <div
            style={{
              border: '1px solid #c8c6c4',
              borderRadius: 2,
              padding: '7px 10px',
              fontSize: 13,
              color: '#201f1e',
              marginTop: 4,
              marginBottom: 12,
              fontFamily: 'var(--font-body)',
            }}
          >
            Vendor demo · calendar v2
          </div>

          {/* Date row */}
          <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <label style={{ fontSize: 11, color: '#605e5c' }}>Start</label>
              <div
                className="flex items-center justify-between"
                style={{
                  border: '1px solid #0078d4',
                  borderRadius: 2,
                  padding: '7px 10px',
                  fontSize: 13,
                  marginTop: 4,
                  marginBottom: 12,
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span>Fri, Apr 17 · 11:30 AM</span>
                <span style={{ color: '#0078d4' }}>▾</span>
              </div>
            </div>
            <div>
              <label style={{ fontSize: 11, color: '#605e5c' }}>End</label>
              <div
                className="flex items-center justify-between"
                style={{
                  border: '1px solid #c8c6c4',
                  borderRadius: 2,
                  padding: '7px 10px',
                  fontSize: 13,
                  marginTop: 4,
                  marginBottom: 12,
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span>Fri, Apr 17 · 12:30 PM</span>
                <span style={{ color: '#8a8886' }}>▾</span>
              </div>
            </div>
          </div>

          {/* Duration helper */}
          <p style={{ fontSize: 11, color: '#605e5c', marginBottom: 12 }}>
            Duration · 1h 0m
            <span style={{ marginLeft: 8, color: '#0078d4' }}>30m · 1h · 2h · Custom</span>
          </p>

          {/* Category */}
          <label style={{ fontSize: 11, color: '#605e5c' }}>Category</label>
          <div className="flex gap-2" style={{ marginTop: 6, marginBottom: 14 }}>
            {[
              { n: 'Work', pick: true, c: '#0078d4' },
              { n: 'Personal', c: '#107c10' },
              { n: 'On-call', c: '#ca5010' },
              { n: 'Holiday', c: '#881798' },
            ].map((c) => (
              <span
                key={c.n}
                style={{
                  fontSize: 11,
                  padding: '5px 10px',
                  border: c.pick ? `2px solid ${c.c}` : '1px solid #c8c6c4',
                  background: c.pick ? '#deecf9' : '#fff',
                  color: c.pick ? c.c : '#201f1e',
                  borderRadius: 2,
                  fontWeight: c.pick ? 600 : 400,
                  fontFamily: 'var(--font-body)',
                }}
              >
                {c.n}
              </span>
            ))}
          </div>

          {/* Owner */}
          <label style={{ fontSize: 11, color: '#605e5c' }}>Owner</label>
          <div
            className="flex items-center gap-2"
            style={{
              border: '1px solid #c8c6c4',
              borderRadius: 2,
              padding: '5px 8px',
              marginTop: 4,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 22,
                background: '#0078d4',
                color: '#fff',
                fontSize: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-body)',
              }}
            >
              JR
            </span>
            <span style={{ fontSize: 12, color: '#201f1e', fontFamily: 'var(--font-body)' }}>
              J. Rivera
            </span>
            <span style={{ fontSize: 10, color: '#605e5c', marginLeft: 'auto' }}>User()</span>
          </div>

          {/* Notify toggle */}
          <div
            className="flex items-center justify-between"
            style={{
              padding: '10px 12px',
              background: '#f3f2f1',
              borderRadius: 2,
              marginBottom: 18,
            }}
          >
            <div>
              <p style={{ fontSize: 12, color: '#201f1e', fontFamily: 'var(--font-body)' }}>
                Email the owner
              </p>
              <p style={{ fontSize: 10, color: '#605e5c' }}>
                Sends via the OnEventCreated flow
              </p>
            </div>
            <div
              style={{
                width: 34,
                height: 18,
                background: '#0078d4',
                borderRadius: 18,
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  width: 14,
                  height: 14,
                  background: '#fff',
                  borderRadius: 14,
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <div
              style={{
                padding: '7px 14px',
                border: '1px solid #8a8886',
                borderRadius: 2,
                fontSize: 12,
                fontFamily: 'var(--font-body)',
              }}
            >
              Cancel
            </div>
            <div
              style={{
                padding: '7px 16px',
                background: '#0078d4',
                color: '#fff',
                borderRadius: 2,
                fontSize: 12,
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
              }}
            >
              Save event
            </div>
          </div>
        </div>
      </div>
    </PowerAppsChrome>
  )
}

function PowerAppsMock({
  variant,
  caption,
  annotations,
}: {
  variant: PowerAppsMockVariant
  caption?: string
  annotations?: { x: number; y: number; label: string; note: string }[]
}) {
  const label: Record<PowerAppsMockVariant, string> = {
    studio: 'Power Apps Studio — 3-panel editor',
    'tree-view': 'Tree view — your app structure',
    'data-schema': 'Your Events data source',
    'formula-bar': 'Power Fx formula bar',
    'calendar-preview': 'Calendar canvas preview',
    'calendar-live': 'Your published calendar',
    'share-dialog': 'Share dialog',
    'home-screen': 'Power Apps home (make.powerapps.com)',
    'create-dialog': 'Create app dialog',
    'connectors-list': 'Add data · connectors',
    'sharepoint-picker': 'Connect to SharePoint',
    'insert-menu': 'Insert panel',
    'preview-mode': 'Preview mode (F5)',
    'publish-dialog': 'Publish this version',
    'app-checker': 'App checker · formula errors',
    'flow-designer': 'Power Automate · flow designer',
    'new-event-form': 'New event form',
  }

  return (
    <motion.figure
      className="my-8 overflow-hidden rounded-lg border"
      style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-2"
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
          Screen · {label[variant]}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--ink-dim)',
            letterSpacing: '0.14em',
          }}
        >
          make.powerapps.com
        </span>
      </div>
      <div style={{ padding: 16, position: 'relative' }}>
        {variant === 'studio' && <PowerAppsStudioMock />}
        {variant === 'tree-view' && <PowerAppsTreeViewMock />}
        {variant === 'data-schema' && <PowerAppsDataSchemaMock />}
        {variant === 'formula-bar' && <PowerAppsFormulaBarMock />}
        {variant === 'calendar-preview' && <PowerAppsCalendarPreviewMock />}
        {variant === 'calendar-live' && <PowerAppsCalendarPreviewMock live />}
        {variant === 'share-dialog' && <PowerAppsShareDialogMock />}
        {variant === 'home-screen' && <PowerAppsHomeScreenMock />}
        {variant === 'create-dialog' && <PowerAppsCreateDialogMock />}
        {variant === 'connectors-list' && <PowerAppsConnectorsListMock />}
        {variant === 'sharepoint-picker' && <PowerAppsSharepointPickerMock />}
        {variant === 'insert-menu' && <PowerAppsInsertMenuMock />}
        {variant === 'preview-mode' && <PowerAppsPreviewModeMock />}
        {variant === 'publish-dialog' && <PowerAppsPublishDialogMock />}
        {variant === 'app-checker' && <PowerAppsAppCheckerMock />}
        {variant === 'flow-designer' && <PowerAppsFlowDesignerMock />}
        {variant === 'new-event-form' && <PowerAppsNewEventFormMock />}
        {annotations && annotations.length > 0 && (
          <div
            className="mt-3 grid gap-2 sm:grid-cols-2"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--paper)',
            }}
          >
            {annotations.map((a, i) => (
              <div
                key={i}
                className="flex gap-2 rounded border px-3 py-2"
                style={{ borderColor: 'var(--edge)', background: 'var(--bg)' }}
              >
                <span
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    width: 18,
                    height: 18,
                    borderRadius: 999,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {i + 1}
                </span>
                <span>
                  <b style={{ color: 'var(--ink)' }}>{a.label}</b> — {a.note}
                </span>
              </div>
            ))}
          </div>
        )}
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
    </motion.figure>
  )
}

/* ------------------------------------------------------------------ */
/*  DocLinkCard — official external reference card                    */
/* ------------------------------------------------------------------ */

function DocLinkCard({
  title,
  description,
  url,
  source,
}: {
  title: string
  description: string
  url: string
  source: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="my-6 flex items-start gap-4 rounded-lg border p-5 transition-colors hover:bg-[color:var(--bg-2)]"
      style={{ borderColor: 'var(--edge)', background: 'var(--bg)', textDecoration: 'none' }}
    >
      <div
        className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
        style={{ background: 'var(--accent)', color: 'var(--bg)' }}
        aria-hidden
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="mb-0.5 uppercase"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', color: 'var(--ink-dim)' }}
        >
          {source}
        </p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--ink)', lineHeight: 1.3, marginBottom: 4 }}>
          {title}
        </p>
        <p style={{ fontSize: 13, color: 'var(--paper)', lineHeight: 1.5 }}>{description}</p>
      </div>
    </a>
  )
}

/* ------------------------------------------------------------------ */
/*  AipMock — CSS mocks of AIP Assist UI screens                      */
/* ------------------------------------------------------------------ */

type AipMockVariant =
  | 'aip-launcher'
  | 'assist-new-bot'
  | 'assist-knowledge-tab'
  | 'assist-test-chat'
  | 'assist-embed-widget'
  | 'aip-evaluations'
  | 'assist-analytics'

function AipChrome({
  title,
  app,
  children,
}: {
  title: string
  app: string
  children: React.ReactNode
}) {
  return (
    <div
      className="overflow-hidden rounded-lg"
      style={{ background: '#0f1117', border: '1px solid #2a2d35', fontFamily: 'var(--font-body)' }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: '#1a1d24', borderBottom: '1px solid #2a2d35' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
              <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'block' }} />
            ))}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', color: '#6b7280', textTransform: 'uppercase' }}>
            {app}
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4b5563' }}>Palantir Foundry</span>
      </div>
      {/* App chrome nav */}
      <div
        className="flex items-center gap-1 overflow-x-auto px-4 py-2"
        style={{ background: '#13161c', borderBottom: '1px solid #2a2d35' }}
      >
        {['Home', 'AIP', 'Slate', 'Workshop', 'Compass'].map((item) => (
          <span
            key={item}
            style={{
              padding: '3px 10px',
              borderRadius: 4,
              fontSize: 11,
              color: item === 'AIP' ? '#fff' : '#6b7280',
              background: item === 'AIP' ? '#1e40af' : 'transparent',
              cursor: 'default',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </span>
        ))}
      </div>
      {children}
      {/* Caption bar */}
      <div
        className="px-4 py-1.5 text-center"
        style={{ borderTop: '1px solid #2a2d35', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4b5563' }}
      >
        Screen · {title}
      </div>
    </div>
  )
}

function AipLauncherMock() {
  const apps = [
    { icon: '⬡', label: 'AIP', color: '#1e40af', active: true },
    { icon: '▣', label: 'Slate', color: '#374151' },
    { icon: '◈', label: 'Workshop', color: '#374151' },
    { icon: '◉', label: 'Compass', color: '#374151' },
    { icon: '⌬', label: 'Functions', color: '#374151' },
  ]
  return (
    <AipChrome title="App Launcher — AIP is highlighted" app="Foundry">
      <div className="p-5" style={{ background: '#0f1117' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: '#6b7280', textTransform: 'uppercase', marginBottom: 12 }}>
          App Launcher
        </p>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(5, minmax(0, 1fr))' }}>
          {apps.map((a) => (
            <div
              key={a.label}
              className="flex flex-col items-center gap-2 rounded-lg p-4"
              style={{
                background: a.active ? 'rgba(30,64,175,0.18)' : '#1a1d24',
                border: a.active ? '1px solid #1e40af' : '1px solid #2a2d35',
                cursor: 'default',
              }}
            >
              <span style={{ fontSize: 22, color: a.active ? '#60a5fa' : '#6b7280' }}>{a.icon}</span>
              <span style={{ fontSize: 11, color: a.active ? '#e0e7ff' : '#6b7280' }}>{a.label}</span>
              {a.active && (
                <span style={{ fontSize: 8, background: '#1e40af', color: '#bfdbfe', padding: '1px 6px', borderRadius: 10, letterSpacing: '0.15em' }}>
                  OPEN
                </span>
              )}
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14, fontSize: 12, color: '#4b5563', fontStyle: 'italic' }}>
          Step 2: From the launcher, click <strong style={{ color: '#93c5fd' }}>AIP</strong> → then <strong style={{ color: '#93c5fd' }}>Assist</strong>
        </p>
      </div>
    </AipChrome>
  )
}

function AssistNewBotMock() {
  return (
    <AipChrome title="AIP → Assist → New Bot dialog" app="AIP · Assist">
      <div style={{ background: '#0f1117', display: 'grid', gridTemplateColumns: '220px 1fr' }}>
        {/* Left sidebar */}
        <div style={{ borderRight: '1px solid #2a2d35', padding: 12 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', color: '#6b7280', textTransform: 'uppercase', marginBottom: 8 }}>
            My Bots
          </p>
          {['FleetOps Assist (new)', 'Platform Helper'].map((b, i) => (
            <div
              key={b}
              style={{
                padding: '7px 10px',
                borderRadius: 5,
                fontSize: 12,
                marginBottom: 3,
                background: i === 0 ? 'rgba(30,64,175,0.2)' : 'transparent',
                color: i === 0 ? '#93c5fd' : '#6b7280',
                border: i === 0 ? '1px solid rgba(30,64,175,0.4)' : '1px solid transparent',
                cursor: 'default',
              }}
            >
              {b}
            </div>
          ))}
          <button
            style={{ marginTop: 12, width: '100%', padding: '6px 0', borderRadius: 5, background: '#1e40af', color: '#e0e7ff', fontSize: 11, border: 'none', cursor: 'default' }}
          >
            + New Bot
          </button>
        </div>
        {/* Main panel */}
        <div style={{ padding: 18 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: '#e0e7ff', marginBottom: 14 }}>Create new bot</p>
          {[
            { label: 'Name', value: 'FleetOps Assist', highlight: true },
            { label: 'Visibility', value: 'Fleet-Ops-Users group' },
            { label: 'Foundation model', value: 'Palantir default (governed)' },
            { label: 'Description (optional)', value: 'Q&A bot for the FleetOps app and folder' },
          ].map((f) => (
            <div key={f.label} style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 10, color: '#6b7280', marginBottom: 3, letterSpacing: '0.08em' }}>{f.label}</p>
              <div
                style={{
                  padding: '6px 10px',
                  borderRadius: 5,
                  border: f.highlight ? '1px solid #1e40af' : '1px solid #2a2d35',
                  background: f.highlight ? 'rgba(30,64,175,0.1)' : '#1a1d24',
                  fontSize: 12,
                  color: f.highlight ? '#93c5fd' : '#9ca3af',
                }}
              >
                {f.value}
              </div>
            </div>
          ))}
          <button style={{ marginTop: 4, padding: '7px 18px', borderRadius: 5, background: '#1e40af', color: '#e0e7ff', fontSize: 12, border: 'none', cursor: 'default' }}>
            Create bot →
          </button>
        </div>
      </div>
    </AipChrome>
  )
}

function AssistKnowledgeTabMock() {
  return (
    <AipChrome title="Bot settings → Knowledge tab → Add folder source" app="AIP · Assist · FleetOps Assist">
      <div style={{ background: '#0f1117', display: 'grid', gridTemplateColumns: '160px 1fr' }}>
        {/* Tab sidebar */}
        <div style={{ borderRight: '1px solid #2a2d35', padding: 10 }}>
          {['Overview', 'Knowledge', 'Prompt', 'Evaluations', 'Analytics'].map((t) => (
            <div
              key={t}
              style={{
                padding: '7px 10px',
                borderRadius: 5,
                fontSize: 12,
                marginBottom: 2,
                background: t === 'Knowledge' ? 'rgba(30,64,175,0.2)' : 'transparent',
                color: t === 'Knowledge' ? '#93c5fd' : '#6b7280',
                cursor: 'default',
              }}
            >
              {t}
            </div>
          ))}
        </div>
        {/* Knowledge content */}
        <div style={{ padding: 16 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: '#e0e7ff', marginBottom: 12 }}>Knowledge sources</p>
          {/* Existing source */}
          <div
            style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #1e40af', background: 'rgba(30,64,175,0.1)', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <p style={{ fontSize: 12, color: '#93c5fd', marginBottom: 2 }}>📁 /Projects/FleetOps</p>
              <p style={{ fontSize: 10, color: '#6b7280' }}>Compass folder · Recursive · Excluding /archive</p>
            </div>
            <span style={{ fontSize: 10, background: '#166534', color: '#86efac', padding: '2px 7px', borderRadius: 10 }}>Indexed</span>
          </div>
          {/* Chunking settings */}
          <div style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #2a2d35', background: '#1a1d24', marginBottom: 10 }}>
            <p style={{ fontSize: 10, color: '#6b7280', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Chunking settings</p>
            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {[['Chunk size', '800 tokens'], ['Overlap', '100 tokens'], ['Top-K', '6']].map(([k, v]) => (
                <div key={k}>
                  <p style={{ fontSize: 9, color: '#6b7280', marginBottom: 2 }}>{k}</p>
                  <p style={{ fontSize: 12, color: '#93c5fd', fontFamily: 'var(--font-mono)' }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
          <button style={{ padding: '6px 14px', borderRadius: 5, background: '#374151', color: '#d1d5db', fontSize: 11, border: '1px solid #4b5563', cursor: 'default' }}>
            + Add source
          </button>
        </div>
      </div>
    </AipChrome>
  )
}

function AssistTestChatMock() {
  const messages = [
    { role: 'user', text: 'Who can work on a job that needs the vehicle lift?' },
    {
      role: 'bot',
      text: 'Lift-required Tasks must route to Bay 3 — the only bay equipped with a vehicle lift [1]. Technicians assigned to those Tasks must hold the Heavy-Lift certification [2].',
      cites: ['[1] FleetOps Job Scheduling Rules §Bay routing', '[2] FleetOps Technician Certifications'],
    },
  ]
  return (
    <AipChrome title="Assist chat panel — test a question, see citations" app="AIP · Assist · Test chat">
      <div style={{ background: '#0f1117', maxHeight: 340, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
              }}
            >
              <div
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  fontSize: 12,
                  lineHeight: 1.5,
                  background: m.role === 'user' ? '#1e40af' : '#1a1d24',
                  color: m.role === 'user' ? '#e0e7ff' : '#d1d5db',
                  border: m.role === 'bot' ? '1px solid #2a2d35' : 'none',
                }}
              >
                {m.text}
                {m.cites && (
                  <div style={{ marginTop: 8, borderTop: '1px solid #2a2d35', paddingTop: 6 }}>
                    {m.cites.map((c) => (
                      <p key={c} style={{ fontSize: 10, color: '#60a5fa', marginBottom: 2 }}>↗ {c}</p>
                    ))}
                  </div>
                )}
              </div>
              {m.role === 'bot' && (
                <div style={{ marginTop: 5, display: 'flex', gap: 8 }}>
                  <span style={{ fontSize: 10, color: '#6b7280', cursor: 'default' }}>👍 Good answer</span>
                  <span style={{ fontSize: 10, color: '#6b7280', cursor: 'default' }}>👎 Flag this</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #2a2d35', padding: '8px 12px', display: 'flex', gap: 8 }}>
          <input
            readOnly
            defaultValue="Ask a question about FleetOps…"
            style={{ flex: 1, background: '#1a1d24', border: '1px solid #2a2d35', borderRadius: 5, padding: '5px 9px', fontSize: 12, color: '#6b7280' }}
          />
          <button style={{ padding: '5px 14px', borderRadius: 5, background: '#1e40af', color: '#e0e7ff', fontSize: 11, border: 'none', cursor: 'default' }}>Send</button>
        </div>
      </div>
    </AipChrome>
  )
}

function AssistEmbedWidgetMock() {
  return (
    <AipChrome title="Slate page with AIP Assist widget in the right rail" app="Slate · FleetOps Dispatch">
      <div style={{ background: '#0f1117', display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: 260 }}>
        {/* Main Slate content */}
        <div style={{ padding: 14, borderRight: '1px solid #2a2d35' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: '#e0e7ff', marginBottom: 10 }}>Open Tasks · Dispatch view</p>
          {[
            { id: 'TSK-001', desc: 'Oil change · Bay 1', tech: 'Elena', pri: 'Med' },
            { id: 'TSK-002', desc: 'Lift inspection · Bay 3', tech: 'Marcus', pri: 'High' },
            { id: 'TSK-003', desc: 'Tyre rotation · Bay 2', tech: 'Priya', pri: 'Low' },
          ].map((t) => (
            <div
              key={t.id}
              style={{ padding: '7px 10px', borderRadius: 5, border: '1px solid #2a2d35', background: '#1a1d24', marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <span style={{ fontSize: 10, color: '#6b7280', fontFamily: 'var(--font-mono)' }}>{t.id} </span>
                <span style={{ fontSize: 12, color: '#d1d5db' }}>{t.desc}</span>
              </div>
              <span style={{ fontSize: 10, background: t.pri === 'High' ? '#7f1d1d' : '#1a1d24', color: t.pri === 'High' ? '#fca5a5' : '#6b7280', padding: '1px 7px', borderRadius: 10, border: '1px solid ' + (t.pri === 'High' ? '#991b1b' : '#2a2d35') }}>
                {t.pri}
              </span>
            </div>
          ))}
        </div>
        {/* AIP Assist widget */}
        <div style={{ background: '#13161c', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '8px 12px', borderBottom: '1px solid #2a2d35', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 14, color: '#60a5fa' }}>⬡</span>
            <span style={{ fontSize: 11, color: '#93c5fd', fontWeight: 600 }}>FleetOps Assist</span>
          </div>
          <div style={{ flex: 1, padding: 10, fontSize: 11, color: '#6b7280', fontStyle: 'italic' }}>
            Ask me anything about FleetOps…
          </div>
          <div style={{ padding: 8, borderTop: '1px solid #2a2d35' }}>
            <div style={{ background: '#1a1d24', borderRadius: 5, border: '1px solid #2a2d35', padding: '5px 8px', fontSize: 11, color: '#4b5563' }}>
              Ask a question…
            </div>
          </div>
        </div>
      </div>
    </AipChrome>
  )
}

function AipEvaluationsMock() {
  const evals = [
    { id: 'basic-1', q: 'Who can work on a lift job?', status: 'pass', confidence: '0.94' },
    { id: 'paraphrase-1', q: 'Which bay has the lift?', status: 'pass', confidence: '0.91' },
    { id: 'refuse-1', q: "CEO's home address?", status: 'pass', confidence: '—' },
    { id: 'clarify-1', q: 'What is the status?', status: 'fail', confidence: '0.71' },
    { id: 'permission-1', q: 'Show Q4 comp plan', status: 'pass', confidence: '—' },
  ]
  return (
    <AipChrome title="AIP → Evaluations — run your eval set, diff pass rates" app="AIP · Evaluations">
      <div style={{ background: '#0f1117', padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: '#e0e7ff' }}>fleetops-assist.evals.yaml · v2 vs v1</p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 11, background: '#166534', color: '#86efac', padding: '2px 10px', borderRadius: 10 }}>4/5 pass · 80%</span>
            <button style={{ padding: '4px 12px', borderRadius: 5, background: '#1e40af', color: '#e0e7ff', fontSize: 11, border: 'none', cursor: 'default' }}>Re-run</button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2a2d35' }}>
              {['ID', 'Question', 'Status', 'Confidence'].map((h) => (
                <th key={h} style={{ padding: '4px 8px', textAlign: 'left', color: '#6b7280', fontWeight: 400, letterSpacing: '0.08em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {evals.map((e) => (
              <tr key={e.id} style={{ borderBottom: '1px solid #1a1d24' }}>
                <td style={{ padding: '6px 8px', color: '#6b7280', fontFamily: 'var(--font-mono)' }}>{e.id}</td>
                <td style={{ padding: '6px 8px', color: '#d1d5db' }}>{e.q}</td>
                <td style={{ padding: '6px 8px' }}>
                  <span style={{ fontSize: 10, background: e.status === 'pass' ? '#166534' : '#7f1d1d', color: e.status === 'pass' ? '#86efac' : '#fca5a5', padding: '1px 7px', borderRadius: 10 }}>{e.status}</span>
                </td>
                <td style={{ padding: '6px 8px', color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>{e.confidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AipChrome>
  )
}

function AssistAnalyticsMock() {
  return (
    <AipChrome title="Bot Analytics — confidence scores, thumbs-down sessions, weekly triage queue" app="AIP · Assist · Analytics">
      <div style={{ background: '#0f1117', padding: 14 }}>
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 14 }}>
          {[
            { label: 'Questions this week', value: '847' },
            { label: 'Avg confidence', value: '0.81' },
            { label: 'Thumbs-down', value: '23' },
            { label: 'Low-conf (<0.6)', value: '41' },
          ].map((s) => (
            <div key={s.label} style={{ padding: '10px 12px', borderRadius: 6, border: '1px solid #2a2d35', background: '#1a1d24' }}>
              <p style={{ fontSize: 9, color: '#6b7280', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: '#93c5fd' }}>{s.value}</p>
            </div>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.15em', color: '#6b7280', textTransform: 'uppercase', marginBottom: 8 }}>
          Triage queue · thumbs-down + low-confidence
        </p>
        {[
          { q: 'How do I schedule a lift job for tomorrow?', conf: '0.52', fb: '👎' },
          { q: 'What happens when Bay 3 is occupied?', conf: '0.44', fb: '👎' },
          { q: 'Can a trainee certify on a lift?', conf: '0.58', fb: '' },
        ].map((r, i) => (
          <div key={i} style={{ padding: '7px 10px', borderRadius: 5, border: '1px solid #2a2d35', background: '#1a1d24', marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#d1d5db' }}>{r.q}</span>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0, marginLeft: 10 }}>
              {r.fb && <span style={{ fontSize: 12 }}>{r.fb}</span>}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#f87171' }}>{r.conf}</span>
            </div>
          </div>
        ))}
      </div>
    </AipChrome>
  )
}

function AipMock({
  variant,
  caption,
  annotations,
}: {
  variant: AipMockVariant
  caption?: string
  annotations?: { x: number; y: number; label: string; note: string }[]
}) {
  const label: Record<AipMockVariant, string> = {
    'aip-launcher': 'App Launcher — select AIP',
    'assist-new-bot': 'AIP → Assist → New Bot',
    'assist-knowledge-tab': 'Bot settings → Knowledge tab',
    'assist-test-chat': 'Assist test chat with citations',
    'assist-embed-widget': 'Slate page with Assist widget in right rail',
    'aip-evaluations': 'AIP Evaluations — run eval set',
    'assist-analytics': 'Bot Analytics — weekly triage queue',
  }

  const inner: Record<AipMockVariant, React.ReactNode> = {
    'aip-launcher': <AipLauncherMock />,
    'assist-new-bot': <AssistNewBotMock />,
    'assist-knowledge-tab': <AssistKnowledgeTabMock />,
    'assist-test-chat': <AssistTestChatMock />,
    'assist-embed-widget': <AssistEmbedWidgetMock />,
    'aip-evaluations': <AipEvaluationsMock />,
    'assist-analytics': <AssistAnalyticsMock />,
  }

  return (
    <motion.figure
      className="my-8 overflow-hidden rounded-lg border"
      style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="flex items-center justify-between border-b px-4 py-2"
        style={{ borderColor: 'var(--edge)' }}
      >
        <span
          className="uppercase"
          style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--ink-dim)' }}
        >
          Screen · {label[variant]}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--ink-dim)' }}>
          Palantir AIP
        </span>
      </div>

      <div className="p-3">{inner[variant]}</div>

      {annotations && annotations.length > 0 && (
        <div
          className="mt-3 grid gap-2 border-t px-4 py-3 sm:grid-cols-2"
          style={{ borderColor: 'var(--edge)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--paper)' }}
        >
          {annotations.map((a, i) => (
            <div key={i} className="flex gap-2 rounded border px-3 py-2" style={{ borderColor: 'var(--edge)', background: 'var(--bg)' }}>
              <span
                style={{ background: 'var(--accent)', color: 'var(--bg)', width: 18, height: 18, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0, marginTop: 1 }}
              >
                {i + 1}
              </span>
              <span>
                <b style={{ color: 'var(--ink)' }}>{a.label}</b> — {a.note}
              </span>
            </div>
          ))}
        </div>
      )}

      {caption && (
        <figcaption
          className="border-t px-4 py-2 text-center"
          style={{ borderColor: 'var(--edge)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-dim)' }}
        >
          {caption}
        </figcaption>
      )}
    </motion.figure>
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
    case 'slateMock':
      return (
        <SlateMock
          key={i}
          variant={block.variant}
          caption={block.caption}
          annotations={block.annotations}
        />
      )
    case 'powerAppsMock':
      return (
        <PowerAppsMock
          key={i}
          variant={block.variant}
          caption={block.caption}
          annotations={block.annotations}
        />
      )
    case 'docLink':
      return (
        <DocLinkCard
          key={i}
          title={block.title}
          description={block.description}
          url={block.url}
          source={block.source}
        />
      )
    case 'aipMock':
      return (
        <AipMock
          key={i}
          variant={block.variant}
          caption={block.caption}
          annotations={block.annotations}
        />
      )
    case 'githubMock':
      return (
        <GithubMock
          key={i}
          variant={block.variant}
          caption={block.caption}
          annotations={block.annotations}
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

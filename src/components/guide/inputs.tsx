import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface FieldWrapProps {
  label: string
  hint?: string
  children: React.ReactNode
}

export function FieldWrap({ label, hint, children }: FieldWrapProps) {
  return (
    <label className="block space-y-2">
      <span className="eyebrow block">{label}</span>
      {children}
      {hint ? (
        <span className="block text-xs" style={{ color: 'var(--ink-dim)' }}>
          {hint}
        </span>
      ) : null}
    </label>
  )
}

export function TextField(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`field ${props.className ?? ''}`} />
}

export function LongField(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`field ${props.className ?? ''}`} />
}

interface ChipsFieldProps {
  options: string[]
  value: string[]
  onChange: (next: string[]) => void
}

export function ChipsField({ options, value, onChange }: ChipsFieldProps) {
  const toggle = (v: string) => {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            data-cursor="magnet"
            className="rounded-full border px-3 py-1.5 text-[12px] transition"
            style={{
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              borderColor: active ? 'var(--accent)' : 'var(--edge)',
              color: active ? 'var(--bg)' : 'var(--paper)',
              background: active ? 'var(--accent)' : 'transparent',
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

interface SegmentedFieldProps<T extends string> {
  options: readonly T[]
  value: T
  onChange: (v: T) => void
}

export function SegmentedField<T extends string>({ options, value, onChange }: SegmentedFieldProps<T>) {
  return (
    <div className="inline-flex rounded-full border p-1" style={{ borderColor: 'var(--edge)' }}>
      {options.map((opt) => {
        const active = opt === value
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            data-cursor="magnet"
            className="rounded-full px-4 py-1.5 text-[12px] transition"
            style={{
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              color: active ? 'var(--bg)' : 'var(--paper)',
              background: active ? 'var(--ink)' : 'transparent',
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

interface ListFieldProps {
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
}

export function ListField({ value, onChange, placeholder }: ListFieldProps) {
  const setAt = (i: number, v: string) => {
    const next = [...value]
    next[i] = v
    onChange(next)
  }
  const removeAt = (i: number) => onChange(value.filter((_, idx) => idx !== i))
  const add = () => onChange([...value, ''])
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="mono" style={{ width: 28 }}>
            {String(i + 1).padStart(2, '0')}
          </span>
          <input
            className="field flex-1"
            value={item}
            placeholder={placeholder}
            onChange={(e) => setAt(i, e.target.value)}
          />
          <button
            type="button"
            onClick={() => removeAt(i)}
            className="mono link"
            style={{ color: 'var(--ink-dim)' }}
            data-cursor="magnet"
          >
            remove
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="btn" data-cursor="magnet">
        + Add item
      </button>
    </div>
  )
}

interface MatrixRow {
  page: string
  features: string
}

interface MatrixFieldProps {
  value: MatrixRow[]
  onChange: (next: MatrixRow[]) => void
}

export function MatrixField({ value, onChange }: MatrixFieldProps) {
  const setAt = (i: number, patch: Partial<MatrixRow>) => {
    const next = [...value]
    next[i] = { ...next[i], ...patch }
    onChange(next)
  }
  const removeAt = (i: number) => onChange(value.filter((_, idx) => idx !== i))
  const add = () => onChange([...value, { page: '', features: '' }])
  return (
    <div className="space-y-3">
      <div
        className="grid grid-cols-[1fr_2fr_auto] gap-3 pb-2"
        style={{ borderBottom: '1px solid var(--edge)' }}
      >
        <span className="eyebrow">Page</span>
        <span className="eyebrow">Features</span>
        <span />
      </div>
      {value.map((row, i) => (
        <div key={i} className="grid grid-cols-[1fr_2fr_auto] items-center gap-3">
          <input
            className="field"
            value={row.page}
            placeholder="e.g. /dashboard"
            onChange={(e) => setAt(i, { page: e.target.value })}
          />
          <input
            className="field"
            value={row.features}
            placeholder="list, filter, empty state"
            onChange={(e) => setAt(i, { features: e.target.value })}
          />
          <button
            type="button"
            onClick={() => removeAt(i)}
            className="mono link"
            style={{ color: 'var(--ink-dim)' }}
            data-cursor="magnet"
          >
            remove
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="btn" data-cursor="magnet">
        + Add page
      </button>
    </div>
  )
}

interface TriageBoardProps {
  now: string[]
  next: string[]
  later: string[]
  onChange: (cols: { now: string[]; next: string[]; later: string[] }) => void
}

export function TriageBoard({ now, next, later, onChange }: TriageBoardProps) {
  const cols = { now, next, later }
  type Col = keyof typeof cols
  const labels: Record<Col, string> = { now: 'Now', next: 'Next', later: 'Later' }

  const setCol = (col: Col, items: string[]) => {
    onChange({ ...cols, [col]: items })
  }

  const move = (from: Col, to: Col, idx: number) => {
    const item = cols[from][idx]
    const removed = cols[from].filter((_, i) => i !== idx)
    const added = [...cols[to], item]
    onChange({ ...cols, [from]: removed, [to]: added })
  }

  const addTo = (col: Col) => setCol(col, [...cols[col], ''])
  const setItem = (col: Col, i: number, v: string) => {
    const arr = [...cols[col]]
    arr[i] = v
    setCol(col, arr)
  }
  const remove = (col: Col, i: number) => setCol(col, cols[col].filter((_, idx) => idx !== i))

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {(Object.keys(labels) as Col[]).map((col) => (
        <div
          key={col}
          className="rounded-sm border p-4"
          style={{
            borderColor: col === 'now' ? 'var(--accent)' : 'var(--edge)',
            background: 'var(--bg-2)',
          }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="eyebrow">{labels[col]}</span>
            <button
              type="button"
              onClick={() => addTo(col)}
              className="mono link"
              data-cursor="magnet"
            >
              + add
            </button>
          </div>
          <ul className="space-y-2">
            {cols[col].map((item, i) => (
              <li key={i} className="space-y-1">
                <input
                  className="field"
                  value={item}
                  placeholder="feature"
                  onChange={(e) => setItem(col, i, e.target.value)}
                />
                <div className="flex flex-wrap gap-2 text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-dim)' }}>
                  {(Object.keys(labels) as Col[])
                    .filter((other) => other !== col)
                    .map((other) => (
                      <button
                        key={other}
                        type="button"
                        onClick={() => move(col, other, i)}
                        className="link"
                        data-cursor="magnet"
                      >
                        → {labels[other]}
                      </button>
                    ))}
                  <button
                    type="button"
                    onClick={() => remove(col, i)}
                    className="link"
                    data-cursor="magnet"
                  >
                    remove
                  </button>
                </div>
              </li>
            ))}
            {cols[col].length === 0 ? (
              <li className="text-xs" style={{ color: 'var(--ink-dim)' }}>
                nothing here yet
              </li>
            ) : null}
          </ul>
        </div>
      ))}
    </div>
  )
}

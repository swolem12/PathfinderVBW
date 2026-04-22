import type { PowerShellCommand } from '../../types/models'

interface Props {
  steps: PowerShellCommand[]
}

export function PowerShellWalkthrough({ steps }: Props) {
  return (
    <div className="space-y-8">
      {steps.map((s, i) => (
        <div
          key={i}
          className="rounded-sm border"
          style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
        >
          <div
            className="flex items-center justify-between border-b px-4 py-2"
            style={{ borderColor: 'var(--edge)' }}
          >
            <span
              className="uppercase tracking-[0.22em]"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--ink-dim)',
              }}
            >
              Step {String(i + 1).padStart(2, '0')} / PowerShell
            </span>
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: 'var(--accent)' }}
              aria-hidden
            />
          </div>

          <div className="p-5 space-y-4">
            <pre
              className="overflow-x-auto rounded-sm px-4 py-3"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: 'var(--ink)',
                background: 'var(--bg)',
                border: '1px solid var(--edge)',
              }}
            >
              <span style={{ color: 'var(--accent)' }}>PS&gt; </span>
              {s.command}
            </pre>

            <p style={{ color: 'var(--paper)', fontSize: 14, lineHeight: 1.6 }}>
              {s.explanation}
            </p>

            <div>
              <p className="eyebrow mb-2">Expected output</p>
              <pre
                className="overflow-x-auto rounded-sm px-4 py-3"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--paper)',
                  background: 'var(--bg)',
                  border: '1px dashed var(--edge)',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {s.expected}
              </pre>
            </div>

            {s.commonError ? (
              <div
                className="rounded-sm border-l-2 px-4 py-3"
                style={{
                  borderColor: 'var(--accent)',
                  background: 'rgba(230, 161, 92, 0.06)',
                }}
              >
                <p
                  className="eyebrow mb-1"
                  style={{ color: 'var(--accent)' }}
                >
                  If you see this error
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: 'var(--ink)',
                    marginBottom: 8,
                  }}
                >
                  {s.commonError.error}
                </p>
                <p style={{ color: 'var(--paper)', fontSize: 13, lineHeight: 1.55 }}>
                  {s.commonError.fix}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

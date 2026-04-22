import { Link } from 'react-router-dom'
import { Download, RotateCcw } from 'lucide-react'
import { SplitText } from '../components/motion/SplitText'
import { Reveal } from '../components/motion/Reveal'
import { CopyButton } from '../components/ui/CopyButton'
import { useBuildPackage } from '../state/useBuildPackage'
import { assemblePackage } from '../lib/promptGenerator'
import { downloadText } from '../lib/export'

export function PackagePage() {
  const { pkg, reset } = useBuildPackage()
  const markdown = assemblePackage(pkg)

  const onDownload = () => {
    downloadText('build-prompt-package.md', markdown)
  }

  const onReset = () => {
    if (typeof window !== 'undefined') {
      const ok = window.confirm('Clear all your answers? This cannot be undone.')
      if (!ok) return
    }
    reset()
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 pb-40 pt-40 sm:px-10">
      <p className="eyebrow mb-8">The artifact</p>
      <SplitText as="h1" className="display" text="Your Build" stagger={0.06} />
      <SplitText
        as="h1"
        className="display display-italic"
        text="Prompt Package."
        delay={0.2}
        stagger={0.06}
      />

      <Reveal delay={0.4} className="mt-10 flex flex-wrap items-center gap-4">
        <CopyButton value={markdown} label="Copy markdown" className="btn-primary" />
        <button type="button" className="btn" onClick={onDownload} data-cursor="magnet">
          <Download className="h-4 w-4" /> Download .md
        </button>
        <Link to="/guide" className="btn" data-cursor="magnet">
          Edit in the guide
        </Link>
        <button type="button" className="btn" onClick={onReset} data-cursor="magnet">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </Reveal>

      <Reveal
        delay={0.5}
        className="mt-16 overflow-hidden rounded-sm border"
        style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
      >
        <div
          className="flex items-center justify-between border-b px-6 py-3"
          style={{ borderColor: 'var(--edge)' }}
        >
          <p className="eyebrow">build-prompt-package.md</p>
          <p className="mono">{markdown.split('\n').length} lines</p>
        </div>
        <pre
          className="overflow-auto p-6 text-[13px] leading-relaxed"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--paper)',
            whiteSpace: 'pre-wrap',
            maxHeight: '70vh',
          }}
        >
          {markdown}
        </pre>
      </Reveal>
    </div>
  )
}

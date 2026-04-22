import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { copyText } from '../../lib/export'

interface CopyButtonProps {
  value: string
}

export function CopyButton({ value }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    const ok = await copyText(value)
    if (!ok) {
      return
    }

    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
      aria-live="polite"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}

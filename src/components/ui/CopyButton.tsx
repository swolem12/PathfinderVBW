import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { copyText } from '../../lib/export'

interface CopyButtonProps {
  value: string
  label?: string
  className?: string
}

export function CopyButton({ value, label = 'Copy', className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    const ok = await copyText(value)
    if (!ok) return
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button type="button" onClick={onCopy} className={`btn ${className}`} data-cursor="magnet" aria-live="polite">
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  )
}

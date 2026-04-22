import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionCardProps {
  title: string
  description?: string
  children: ReactNode
}

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-indigo-950/30 backdrop-blur"
    >
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description ? <p className="mt-1 text-sm text-slate-300">{description}</p> : null}
      </header>
      {children}
    </motion.section>
  )
}

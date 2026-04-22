import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  return (
    <section className="mx-auto w-full max-w-[800px] px-6 py-40 sm:px-10">
      <p
        className="mb-4 uppercase"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.28em',
          color: 'var(--accent)',
        }}
      >
        404
      </p>
      <h1
        className="display"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}
      >
        Page not found.
      </h1>
      <p className="lead mt-6">The link you followed doesn't exist. Head back to the course.</p>
      <Link to="/" className="btn mt-8 inline-flex">
        <ArrowLeft className="h-4 w-4" /> Home
      </Link>
    </section>
  )
}

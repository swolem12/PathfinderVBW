import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { chapters } from '../../content/guide'

const nav = [
  ['/guide', 'Guide'],
  ['/package', 'Package'],
  ['/library', 'Library'],
  ['/about', 'About'],
] as const

export function AppShell() {
  const { pathname } = useLocation()
  const onGuide = pathname.startsWith('/guide')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!onGuide) return
    const handler = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    window.addEventListener('resize', handler)
    return () => {
      window.removeEventListener('scroll', handler)
      window.removeEventListener('resize', handler)
    }
  }, [onGuide])

  return (
    <div className="grain min-h-screen">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-5 sm:px-10">
          <Link to="/" className="flex items-center gap-2" data-cursor="magnet">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: 'var(--accent)' }}
              aria-hidden
            />
            <span
              className="text-[11px] uppercase tracking-[0.28em]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink)' }}
            >
              Pathfinder / VBW
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `link text-[12px] uppercase tracking-[0.22em] ${
                    isActive ? 'text-[color:var(--ink)]' : 'text-[color:var(--ink-dim)]'
                  }`
                }
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/guide"
            className="btn btn-primary hidden sm:inline-flex"
            data-cursor="magnet"
          >
            Begin
          </Link>
        </div>
        <div className="hairline" style={{ opacity: 0.6 }} />
      </header>

      {onGuide ? (
        <aside
          className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
          aria-label="Chapter progress"
        >
          <ol className="flex flex-col gap-3">
            {chapters.map((c) => (
              <li key={c.id}>
                <a
                  href={`#chapter-${c.id}`}
                  className="group flex items-center gap-3"
                  data-cursor="magnet"
                >
                  <span
                    className="text-[10px] tabular-nums"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-dim)' }}
                  >
                    {String(c.number).padStart(2, '0')}
                  </span>
                  <span
                    className="block h-px transition-all duration-500"
                    style={{
                      width: 28,
                      background: 'var(--edge)',
                    }}
                  />
                  <span
                    className="whitespace-nowrap text-[11px] uppercase tracking-[0.22em] opacity-0 transition group-hover:opacity-100"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper)' }}
                  >
                    {c.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <div
            className="mt-4 h-px w-[200px] origin-left"
            style={{
              transform: `scaleX(${progress})`,
              background: 'var(--accent)',
              transition: 'transform 200ms linear',
            }}
            aria-hidden
          />
        </aside>
      ) : null}

      <main>
        <Outlet />
      </main>

      <footer className="border-t" style={{ borderColor: 'var(--edge)' }}>
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start justify-between gap-4 px-6 py-10 sm:px-10 md:flex-row md:items-center">
          <p
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-dim)' }}
          >
            Pathfinder — Vibe Code Wednesday
          </p>
          <p
            className="text-[11px] uppercase tracking-[0.28em]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-dim)' }}
          >
            Tip of the iceberg, rest is structure.
          </p>
        </div>
      </footer>
    </div>
  )
}

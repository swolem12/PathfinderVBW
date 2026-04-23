import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { StartButton } from '../ui/StartButton'

const NAV_LINKS = [
  { to: '/course', label: 'Beginner' },
  { to: '/advanced', label: 'Advanced' },
  { to: '/powerapps', label: 'Microsoft' },
  { to: '/palantir', label: 'Palantir' },
]

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="min-h-screen">
      <header
        className="sticky top-0 z-40 backdrop-blur"
        style={{
          background: 'rgba(14, 16, 20, 0.78)',
          borderBottom: '1px solid var(--edge)',
        }}
      >
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4 sm:px-10">
          <Link to="/" className="flex items-center gap-2.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: 'var(--accent)' }}
              aria-hidden
            />
            <span
              className="uppercase"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.22em',
                color: 'var(--ink)',
              }}
            >
              Pathfinder / VBW
            </span>
          </Link>

          {/* ── Desktop nav (md+) ── */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map(({ to, label }) => (
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
            <StartButton className="btn btn-primary">Start</StartButton>
          </nav>

          {/* ── Mobile: Start + hamburger (<md) ── */}
          <div className="flex items-center gap-3 md:hidden">
            <StartButton className="btn btn-primary text-xs">
              Start
            </StartButton>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{ color: 'var(--ink)', lineHeight: 0 }}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile nav overlay ── */}
      {menuOpen && (
        <nav
          className="fixed inset-0 z-30 flex flex-col pt-[65px] md:hidden"
          style={{ background: 'var(--bg)' }}
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col px-6 py-4">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to} style={{ borderBottom: '1px solid var(--edge)' }}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `block py-5 uppercase tracking-[0.22em] ${
                      isActive ? 'text-[color:var(--ink)]' : 'text-[color:var(--ink-dim)]'
                    }`
                  }
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="px-6 pt-6">
            <StartButton className="btn btn-primary w-full justify-center">
              Start lesson 1
            </StartButton>
          </div>
        </nav>
      )}

      <main>
        <Outlet />
      </main>

      <footer className="border-t" style={{ borderColor: 'var(--edge)' }}>
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-between gap-3 px-6 py-8 sm:px-10 md:flex-row md:items-center">
          <p
            className="uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.28em',
              color: 'var(--ink-dim)',
            }}
          >
            Pathfinder — Vibe Code Wednesday
          </p>
          <p
            className="uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.28em',
              color: 'var(--ink-dim)',
            }}
          >
            Idea → brief → prototype → localhost
          </p>
        </div>
      </footer>
    </div>
  )
}

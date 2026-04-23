import { Link, NavLink, Outlet } from 'react-router-dom'
import { StartButton } from '../ui/StartButton'

export function AppShell() {
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

          <nav className="flex items-center gap-6">
            <NavLink
              to="/course"
              className={({ isActive }) =>
                `link text-[12px] uppercase tracking-[0.22em] ${
                  isActive ? 'text-[color:var(--ink)]' : 'text-[color:var(--ink-dim)]'
                }`
              }
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Beginner
            </NavLink>
            <NavLink
              to="/palantir"
              className={({ isActive }) =>
                `link text-[12px] uppercase tracking-[0.22em] ${
                  isActive ? 'text-[color:var(--ink)]' : 'text-[color:var(--ink-dim)]'
                }`
              }
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Palantir
            </NavLink>
            <NavLink
              to="/powerapps"
              className={({ isActive }) =>
                `link text-[12px] uppercase tracking-[0.22em] ${
                  isActive ? 'text-[color:var(--ink)]' : 'text-[color:var(--ink-dim)]'
                }`
              }
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Power Apps
            </NavLink>
            <StartButton className="btn btn-primary hidden sm:inline-flex">Start</StartButton>
          </nav>
        </div>
      </header>

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

import { Link, NavLink, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

const primaryNav = [
  ['/', 'Landing'],
  ['/lesson', 'Lesson'],
  ['/studio/idea', 'Idea Studio'],
  ['/studio/structure', 'Structure Lab'],
  ['/studio/ui-planning', 'UI Planning'],
  ['/forge/prompts', 'Prompt Forge'],
  ['/workshop/local-run', 'Local Run'],
  ['/workshop/validate', 'Validate'],
  ['/playground', 'Playground'],
]

const secondaryNav = [
  ['/resources', 'Resources'],
  ['/templates', 'Templates'],
  ['/faq', 'FAQ'],
  ['/about', 'About'],
]

export function AppShell() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1e293b_0,#020617_55%)] text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-200">
            Pathfinder Vibe Code Wednesday Lesson
          </Link>
          <nav className="hidden gap-2 xl:flex">
            {primaryNav.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    isActive ? 'bg-indigo-400/20 text-indigo-100' : 'text-slate-300 hover:bg-white/10'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[220px_1fr_260px]">
        <aside className="hidden rounded-2xl border border-white/10 bg-slate-900/50 p-4 lg:block">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-200">Experience map</p>
          <div className="space-y-2">
            {primaryNav.slice(1).map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm transition ${
                    isActive ? 'bg-indigo-400/20 text-white' : 'text-slate-300 hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </aside>

        <motion.main className="space-y-6">
          <Outlet />
        </motion.main>

        <aside className="hidden rounded-2xl border border-white/10 bg-slate-900/50 p-4 lg:block">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-indigo-200">Quick links</p>
          <div className="space-y-2">
            {secondaryNav.map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm transition ${
                    isActive ? 'bg-indigo-400/20 text-white' : 'text-slate-300 hover:bg-white/5'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { lessonModules } from '../content/modules'
import { SectionCard } from '../components/ui/SectionCard'

export function LessonPage() {
  return (
    <div className="space-y-6">
      <SectionCard
        title="Interactive course journey"
        description="Progress through 11 modules from framing to capstone handoff."
      >
        <div className="space-y-3">
          {lessonModules.map((module) => (
            <article key={module.id} className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
              <p className="text-xs uppercase tracking-wider text-indigo-300">Module {module.id}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{module.title}</h3>
              <p className="mt-1 text-sm text-slate-300">{module.objective}</p>
              <Link
                to={`/lesson/module/${module.id}`}
                className="mt-3 inline-flex rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-white/10"
              >
                Open module
              </Link>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { SplitText } from '../components/motion/SplitText'
import { Reveal } from '../components/motion/Reveal'
import { CopyButton } from '../components/ui/CopyButton'

const templates = [
  {
    id: 'brief',
    name: 'Full build brief',
    body:
      'Use the attached Build Prompt Package. Scaffold routes, components, and empty/loading/error states for the Now column only. Do not implement Next or Later features. After generation, summarize what was produced and flag any ambiguities.',
  },
  {
    id: 'debug',
    name: 'Targeted debug',
    body:
      'The build breaks at <paste error>. Identify the root cause, propose a minimal patch (changed files + diff), and the verification steps to confirm the fix. Do not rewrite unrelated modules.',
  },
  {
    id: 'polish',
    name: 'Polish pass',
    body:
      'Improve visual rhythm, spacing, and micro-interactions without changing routes, component APIs, or behavior. Keep the current architecture. List every file you touch and why.',
  },
]

const glossary = [
  ['Vibe coding', 'Directing an AI agent to build software by prompt rather than typing code directly.'],
  ['Build Prompt Package', 'A single markdown brief containing mission, users, MVP line, map, look, stack, acceptance, handoff.'],
  ['Now / Next / Later', 'A three-column triage board separating ship-first features from deferred work.'],
  ['Acceptance criteria', 'Testable statements used to grade agent output.'],
  ['Non-goal', 'A feature explicitly excluded to keep scope tight.'],
]

const faq = [
  [
    'Do I need to know how to code?',
    'No. The guide is designed for first-time builders. You write the brief; the agent writes the code.',
  ],
  [
    'Which AI agent should I use?',
    'Any mainstream agent (Claude Code, Cursor, Copilot, Codex) will accept the package. Pick whichever you already have access to.',
  ],
  [
    'What if I get stuck mid-generation?',
    'Use the "Targeted debug" template. Paste the error, let the agent propose a minimal patch, verify, repeat.',
  ],
  [
    'Will my answers be saved?',
    'Yes, locally in your browser. Nothing leaves your machine.',
  ],
]

export function LibraryPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 pb-40 pt-40 sm:px-10">
      <p className="eyebrow mb-8">Reference / library</p>
      <SplitText as="h1" className="display" text="Templates," stagger={0.06} />
      <SplitText
        as="h1"
        className="display display-italic"
        text="terms, and FAQ."
        delay={0.2}
        stagger={0.06}
      />

      <div className="mt-20 grid gap-16 lg:grid-cols-[220px_1fr]">
        <nav className="space-y-3 lg:sticky lg:top-28 lg:self-start">
          <a href="#templates" className="link mono block" data-cursor="magnet">
            § 01 / templates
          </a>
          <a href="#glossary" className="link mono block" data-cursor="magnet">
            § 02 / glossary
          </a>
          <a href="#faq" className="link mono block" data-cursor="magnet">
            § 03 / FAQ
          </a>
          <Link
            to="/guide"
            className="link mono block pt-6"
            style={{ color: 'var(--accent)' }}
            data-cursor="magnet"
          >
            → the guide
          </Link>
        </nav>

        <div className="space-y-32">
          <section id="templates" className="scroll-mt-28">
            <div className="hairline mb-12" />
            <h2 className="h2 mb-10">§ Templates</h2>
            <div className="space-y-10">
              {templates.map((t) => (
                <Reveal
                  key={t.id}
                  className="rounded-sm border p-6"
                  style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="h3">{t.name}</h3>
                    <CopyButton value={t.body} label="Copy" />
                  </div>
                  <p style={{ color: 'var(--paper)' }}>{t.body}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="glossary" className="scroll-mt-28">
            <div className="hairline mb-12" />
            <h2 className="h2 mb-10">§ Glossary</h2>
            <dl className="space-y-8">
              {glossary.map(([term, def]) => (
                <Reveal key={term} className="grid grid-cols-[1fr_2fr] gap-6">
                  <dt className="h3">{term}</dt>
                  <dd className="lead">{def}</dd>
                </Reveal>
              ))}
            </dl>
          </section>

          <section id="faq" className="scroll-mt-28">
            <div className="hairline mb-12" />
            <h2 className="h2 mb-10">§ FAQ</h2>
            <ul className="space-y-10">
              {faq.map(([q, a]) => (
                <Reveal key={q} className="grid grid-cols-[1fr_2fr] gap-6">
                  <p className="h3">{q}</p>
                  <p className="lead">{a}</p>
                </Reveal>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

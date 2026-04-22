import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SplitText } from '../components/motion/SplitText'
import { Reveal } from '../components/motion/Reveal'
import { ChapterShell } from '../components/guide/ChapterShell'
import {
  ChipsField,
  FieldWrap,
  ListField,
  LongField,
  MatrixField,
  SegmentedField,
  TextField,
  TriageBoard,
} from '../components/guide/inputs'
import { chapters, toneOptions, agentOptions } from '../content/guide'
import { useBuildPackage } from '../state/useBuildPackage'
import { assemblePackage } from '../lib/promptGenerator'

export function GuidePage() {
  const { step } = useParams()
  const { pkg, update } = useBuildPackage()

  useEffect(() => {
    if (!step) return
    const el = document.getElementById(`chapter-${step}`)
    if (el) {
      const t = setTimeout(
        () => el.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        100,
      )
      return () => clearTimeout(t)
    }
  }, [step])

  return (
    <>
      {/* Intro */}
      <section className="relative flex min-h-[80svh] items-end overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-44 sm:px-10">
          <p className="eyebrow mb-8">The Guide / 10 chapters</p>
          <SplitText as="h1" className="display" text="Ten questions," stagger={0.06} />
          <SplitText
            as="h1"
            className="display display-italic"
            text="one package."
            delay={0.2}
            stagger={0.06}
          />
          <Reveal delay={0.6} className="mt-8">
            <p className="lead">
              Answer each chapter in the right-hand panel. Your answers flow into a single Build
              Prompt Package on the <Link to="/package" className="link" data-cursor="magnet">
                Package page
              </Link>
              . Scroll to begin.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Chapter 1: Mission */}
      <ChapterShell chapter={chapters[0]}>
        <FieldWrap label="Mission sentence" hint="Who + outcome + the change it creates.">
          <LongField
            rows={3}
            value={pkg.mission}
            placeholder="A maintenance tracker that turns scattered group-texts into one ranked list the shift lead checks first thing every morning."
            onChange={(e) => update((p) => ({ ...p, mission: e.target.value }))}
          />
        </FieldWrap>
      </ChapterShell>

      {/* Chapter 2: Problem */}
      <ChapterShell chapter={chapters[1]}>
        <div className="space-y-6">
          <FieldWrap label="Who hurts">
            <TextField
              value={pkg.problem.who}
              placeholder="Field technicians at a single facility"
              onChange={(e) =>
                update((p) => ({ ...p, problem: { ...p.problem, who: e.target.value } }))
              }
            />
          </FieldWrap>
          <FieldWrap label="Current pain">
            <TextField
              value={pkg.problem.pain}
              placeholder="Tasks lost across texts, spreadsheets, paper tags"
              onChange={(e) =>
                update((p) => ({ ...p, problem: { ...p.problem, pain: e.target.value } }))
              }
            />
          </FieldWrap>
          <FieldWrap label="Current workaround">
            <TextField
              value={pkg.problem.workaround}
              placeholder="Group text + memory"
              onChange={(e) =>
                update((p) => ({ ...p, problem: { ...p.problem, workaround: e.target.value } }))
              }
            />
          </FieldWrap>
          <FieldWrap label="Desired outcome">
            <TextField
              value={pkg.problem.outcome}
              placeholder="One prioritized list with owners and status"
              onChange={(e) =>
                update((p) => ({ ...p, problem: { ...p.problem, outcome: e.target.value } }))
              }
            />
          </FieldWrap>
        </div>
      </ChapterShell>

      {/* Chapter 3: User */}
      <ChapterShell chapter={chapters[2]}>
        <div className="space-y-6">
          <FieldWrap label="Primary persona">
            <TextField
              value={pkg.user.persona}
              placeholder="Shift-lead technician, mobile-first, under time pressure"
              onChange={(e) =>
                update((p) => ({ ...p, user: { ...p.user, persona: e.target.value } }))
              }
            />
          </FieldWrap>
          <FieldWrap label="Primary job-to-be-done" hint="'When ___, I want to ___, so that ___.'">
            <TextField
              value={pkg.user.primaryJob}
              placeholder="When I arrive on shift, I want to see what needs fixing next, so I skip the text-scroll."
              onChange={(e) =>
                update((p) => ({ ...p, user: { ...p.user, primaryJob: e.target.value } }))
              }
            />
          </FieldWrap>
          <FieldWrap label="User stories" hint="Three is enough.">
            <ListField
              value={pkg.user.stories}
              onChange={(stories) => update((p) => ({ ...p, user: { ...p.user, stories } }))}
              placeholder="As a tech, I can mark a task done with one tap."
            />
          </FieldWrap>
        </div>
      </ChapterShell>

      {/* Chapter 4: MVP */}
      <ChapterShell chapter={chapters[3]}>
        <TriageBoard
          now={pkg.mvp.now}
          next={pkg.mvp.next}
          later={pkg.mvp.later}
          onChange={(cols) => update((p) => ({ ...p, mvp: cols }))}
        />
      </ChapterShell>

      {/* Chapter 5: Map */}
      <ChapterShell chapter={chapters[4]}>
        <div className="space-y-8">
          <FieldWrap label="Routes">
            <ListField
              value={pkg.map.routes}
              onChange={(routes) => update((p) => ({ ...p, map: { ...p.map, routes } }))}
              placeholder="/dashboard"
            />
          </FieldWrap>
          <FieldWrap label="Page → Features matrix">
            <MatrixField
              value={pkg.map.matrix}
              onChange={(matrix) => update((p) => ({ ...p, map: { ...p.map, matrix } }))}
            />
          </FieldWrap>
        </div>
      </ChapterShell>

      {/* Chapter 6: Look */}
      <ChapterShell chapter={chapters[5]}>
        <div className="space-y-8">
          <FieldWrap label="Tone words" hint="Pick 2–4.">
            <ChipsField
              options={toneOptions}
              value={pkg.look.tone}
              onChange={(tone) => update((p) => ({ ...p, look: { ...p.look, tone } }))}
            />
          </FieldWrap>
          <FieldWrap label="Density">
            <SegmentedField
              options={['airy', 'balanced', 'dense'] as const}
              value={pkg.look.density}
              onChange={(density) => update((p) => ({ ...p, look: { ...p.look, density } }))}
            />
          </FieldWrap>
          <FieldWrap label="Motion intensity">
            <SegmentedField
              options={['minimal', 'present', 'cinematic'] as const}
              value={pkg.look.motion}
              onChange={(motion) => update((p) => ({ ...p, look: { ...p.look, motion } }))}
            />
          </FieldWrap>
          <FieldWrap label="Rhythm & notes" hint="Type hierarchy, spacing, component mood.">
            <LongField
              rows={4}
              value={pkg.look.notes}
              placeholder="Large serif display, mono eyebrows, 1px hairlines between sections, 100svh hero."
              onChange={(e) => update((p) => ({ ...p, look: { ...p.look, notes: e.target.value } }))}
            />
          </FieldWrap>
        </div>
      </ChapterShell>

      {/* Chapter 7: Stack */}
      <ChapterShell chapter={chapters[6]}>
        <div className="space-y-6">
          <FieldWrap label="Framework">
            <TextField
              value={pkg.stack.framework}
              onChange={(e) => update((p) => ({ ...p, stack: { ...p.stack, framework: e.target.value } }))}
            />
          </FieldWrap>
          <FieldWrap label="Data">
            <TextField
              value={pkg.stack.data}
              onChange={(e) => update((p) => ({ ...p, stack: { ...p.stack, data: e.target.value } }))}
            />
          </FieldWrap>
          <FieldWrap label="Auth">
            <TextField
              value={pkg.stack.auth}
              onChange={(e) => update((p) => ({ ...p, stack: { ...p.stack, auth: e.target.value } }))}
            />
          </FieldWrap>
          <FieldWrap label="Deploy target">
            <TextField
              value={pkg.stack.deploy}
              onChange={(e) => update((p) => ({ ...p, stack: { ...p.stack, deploy: e.target.value } }))}
            />
          </FieldWrap>
          <FieldWrap label="Non-goals" hint="Things you are explicitly NOT building.">
            <ListField
              value={pkg.stack.nonGoals}
              onChange={(nonGoals) => update((p) => ({ ...p, stack: { ...p.stack, nonGoals } }))}
              placeholder="payments, admin analytics, multi-tenant"
            />
          </FieldWrap>
        </div>
      </ChapterShell>

      {/* Chapter 8: Acceptance */}
      <ChapterShell chapter={chapters[7]}>
        <FieldWrap
          label="Acceptance checklist"
          hint="How you will grade the AI. One line per item."
        >
          <ListField
            value={pkg.acceptance}
            onChange={(acceptance) => update((p) => ({ ...p, acceptance }))}
            placeholder="The dashboard renders an empty state with a single primary CTA."
          />
        </FieldWrap>
      </ChapterShell>

      {/* Chapter 9: Assemble */}
      <ChapterShell chapter={chapters[8]}>
        <div
          className="rounded-sm border p-6"
          style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
        >
          <p className="eyebrow mb-4">Live preview</p>
          <pre
            className="max-h-[60vh] overflow-auto text-[12px] leading-relaxed"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper)', whiteSpace: 'pre-wrap' }}
          >
            {assemblePackage(pkg)}
          </pre>
          <div className="mt-6">
            <Link to="/package" className="btn btn-primary" data-cursor="magnet">
              Open full package <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </ChapterShell>

      {/* Chapter 10: Handoff */}
      <ChapterShell chapter={chapters[9]}>
        <div className="space-y-8">
          <FieldWrap label="Target agent">
            <ChipsField
              options={agentOptions}
              value={[pkg.handoff.agent]}
              onChange={(arr) =>
                update((p) => ({
                  ...p,
                  handoff: { ...p.handoff, agent: arr[arr.length - 1] ?? p.handoff.agent },
                }))
              }
            />
          </FieldWrap>
          <FieldWrap
            label="Opening prompt"
            hint="Often: 'Build the project described above. Start with routes and landing. Do not implement Next or Later.'"
          >
            <LongField
              rows={5}
              value={pkg.handoff.firstPrompt}
              placeholder="Use the attached Build Prompt Package. Scaffold routes and components. Stop before implementing any Next or Later features. Summarize what you generated."
              onChange={(e) =>
                update((p) => ({ ...p, handoff: { ...p.handoff, firstPrompt: e.target.value } }))
              }
            />
          </FieldWrap>

          <div
            className="rounded-sm border p-6"
            style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
          >
            <p className="eyebrow mb-4">Run checklist</p>
            <ol
              className="space-y-2 text-[13px]"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--paper)' }}
            >
              <li>01 &nbsp; cd into the generated folder</li>
              <li>02 &nbsp; npm install</li>
              <li>03 &nbsp; npm run dev — verify the landing renders</li>
              <li>04 &nbsp; npm run build — catches type errors early</li>
            </ol>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/package" className="btn btn-primary" data-cursor="magnet">
              Assemble the package <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/library" className="btn" data-cursor="magnet">
              Reference library
            </Link>
          </div>
        </div>
      </ChapterShell>
    </>
  )
}

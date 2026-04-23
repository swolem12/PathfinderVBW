import { Link } from 'react-router-dom'
import { ArrowRight, Check, Sparkles, Wrench, Share2 } from 'lucide-react'
import { lessons as beginnerLessons } from '../content/course'
import { palantirLessons } from '../content/palantir'
import { palantirAdvancedLessons } from '../content/palantir-advanced'
import { powerAppsLessons } from '../content/powerapps'
import { advancedLessons } from '../content/advanced'
import { StartButton } from '../components/ui/StartButton'

type TrackDef = {
  slug: string
  badge: string
  title: string
  pitch: string
  destination: string
  lessons: number
  minutes: number
}

function buildTracks(): TrackDef[] {
  const beginner = beginnerLessons.filter((l) => !l.optional)
  const palantirSlate = palantirLessons.filter((l) => !l.optional)
  const palantirEng = palantirAdvancedLessons.filter((l) => !l.optional)
  const powerApps = powerAppsLessons.filter((l) => !l.optional)
  const advanced = advancedLessons.filter((l) => !l.optional)

  return [
    {
      slug: 'course',
      badge: 'Track 01 · Beginner',
      title: 'Vibe coding on your desktop',
      pitch:
        'Install two free tools, paste a 5-field brief to Claude Code, run three PowerShell commands. A working prototype opens at localhost:5173.',
      destination: 'A local web app you own.',
      lessons: beginner.length,
      minutes: beginner.reduce((n, l) => n + l.estMinutes, 0),
    },
    {
      slug: 'palantir',
      badge: 'Track 02 · Palantir',
      title: 'Slate apps, Data Sets, and AIP Assist bots',
      pitch:
        'Three sub-courses inside one track. Slate (ship a user-facing app), Data Sets (Code Repos, PySpark, AIP, Workshop, Lineage), or AIP Assist Builder (fold a bot into a project folder). Choose on the next screen.',
      destination: 'A published Foundry app — or a data product — or a cited chatbot.',
      lessons: palantirSlate.length + palantirEng.length,
      minutes:
        palantirSlate.reduce((n, l) => n + l.estMinutes, 0) +
        palantirEng.reduce((n, l) => n + l.estMinutes, 0),
    },
    {
      slug: 'powerapps',
      badge: 'Track 03 · Power Apps',
      title: 'A dynamic calendar in Power Apps',
      pitch:
        'Open Power Apps Studio, wire a SharePoint Events list, write Power Fx, render a month grid with event dots. Share a link teammates open in the mobile app.',
      destination: 'A published Microsoft Power App.',
      lessons: powerApps.length,
      minutes: powerApps.reduce((n, l) => n + l.estMinutes, 0),
    },
    {
      slug: 'advanced',
      badge: 'Track 04 · Advanced',
      title: 'GitHub Codespace, agentic AI, full-stack deploy',
      pitch:
        'Create a GitHub repo, open Codespace, direct AI agents (Claude 4.7, ChatGPT, Codex) to build a multi-page app, wire Firebase or Supabase as a real database, add the full Untitled UI design vocabulary, and publish to GitHub Pages.',
      destination: 'A full-stack app live at github.io.',
      lessons: advanced.length,
      minutes: advanced.reduce((n, l) => n + l.estMinutes, 0),
    },
  ]
}

const HOW_IT_WORKS = [
  {
    n: '01',
    title: 'Pick a track',
    body:
      'Three destinations, three toolchains. Pick the one that matches the world you work in — or do all three and compare.',
  },
  {
    n: '02',
    title: 'Follow the lessons',
    body:
      'Each lesson has a single goal, a concrete end-state, step-by-step prompts or clicks, and a checklist you can tick off.',
  },
  {
    n: '03',
    title: 'Build alongside the mocks',
    body:
      'Every tool — Claude Code, Foundry Slate, Power Apps Studio — is rendered inline. You see exactly what your screen should look like.',
  },
  {
    n: '04',
    title: 'Ship a URL',
    body:
      'End of every track is a real, working link you can send to a coworker. No dead-end "now imagine you deploy this" exercises.',
  },
] as const

const DIFFERENTIATORS = [
  {
    Icon: Sparkles,
    title: 'No prior coding required.',
    body:
      "You'll read code, but you won't write it from a blank page. The AI or the platform writes it — you direct.",
  },
  {
    Icon: Wrench,
    title: 'Real tools, real outputs.',
    body:
      'Not a fake sandbox. You ship to real platforms: localhost, Foundry Slate, Power Apps. Your work persists.',
  },
  {
    Icon: Share2,
    title: 'Sharable at the end.',
    body:
      "Every track ends with a URL. Send it to your manager. Demo it in a meeting. The course isn't over until you do.",
  },
] as const

const FAQ = [
  {
    q: 'Do I need to know how to code?',
    a: 'No. You will see code — the AI writes it in track 01, Power Fx formulas appear in track 03 — but you never start from a blank page. If you can read a recipe, you can follow the lessons.',
  },
  {
    q: 'How much does it cost?',
    a: 'Track 01 is free (Claude Code has a free tier, VS Code is free). Track 02 requires access to a Foundry tenant (most readers have one through work). Track 03 works with any Microsoft 365 business license or the free Power Apps Developer Plan.',
  },
  {
    q: 'How long does it actually take?',
    a: 'The minute counts on each track are the critical path — the minimum to finish with a working output. Assume 1.5× if you are new to the toolchain, 0.7× if you already know it.',
  },
  {
    q: 'What if I get stuck?',
    a: 'Every lesson ends with a checklist. If a box is not ticked, that is where you are stuck — not "somewhere in the middle." Re-read the step, check the mock screenshot, try again.',
  },
]

function TrackCard({ track }: { track: TrackDef }) {
  return (
    <Link
      to={`/${track.slug}`}
      className="group relative flex flex-col justify-between gap-6 rounded-lg border p-8 transition-colors hover:bg-[color:var(--bg-2)]"
      style={{ background: 'var(--bg)', borderColor: 'var(--edge)' }}
    >
      <div>
        <p
          className="mb-4 uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.28em',
            color: 'var(--accent)',
          }}
        >
          {track.badge}
        </p>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.35rem, 1.2vw + 0.8rem, 1.85rem)',
            color: 'var(--ink)',
            marginBottom: 10,
            lineHeight: 1.15,
          }}
        >
          {track.title}
        </h3>
        <p style={{ color: 'var(--paper)', fontSize: 15, lineHeight: 1.6 }}>{track.pitch}</p>
      </div>

      <div>
        <div
          className="flex flex-wrap items-center gap-3 border-t pt-5"
          style={{
            borderColor: 'var(--edge)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.22em',
            color: 'var(--ink-dim)',
            textTransform: 'uppercase',
          }}
        >
          <span>{track.lessons} lessons</span>
          <span style={{ color: 'var(--edge)' }}>•</span>
          <span>~{track.minutes} min</span>
          <span style={{ color: 'var(--edge)' }}>•</span>
          <span>{track.destination}</span>
        </div>
        <div className="mt-5 inline-flex items-center gap-2" style={{ color: 'var(--accent)' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Open this track
          </span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export function LandingPage() {
  const tracks = buildTracks()
  const totalLessons = tracks.reduce((n, t) => n + t.lessons, 0)
  const totalMinutes = tracks.reduce((n, t) => n + t.minutes, 0)

  return (
    <>
      {/* --------------------------- HERO --------------------------- */}
      <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-24 sm:px-10 md:pt-32">
        <p
          className="mb-8 uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            color: 'var(--accent)',
          }}
        >
          An interactive course in vibe coding
        </p>

        <h1
          className="display"
          style={{ fontSize: 'clamp(2.75rem, 6vw + 0.5rem, 6rem)', lineHeight: 1 }}
        >
          Learn to build a real app <br />
          <span className="display-italic">by actually building one.</span>
        </h1>

        <p className="lead mt-10" style={{ maxWidth: '62ch' }}>
          Three tracks. Three real tools. Three real outputs. Pick the world you live in —
          your laptop, Palantir Foundry, or Microsoft Power Apps — and ship a working app by
          the end of the afternoon.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <StartButton>
            Start lesson 1 <ArrowRight className="h-4 w-4" />
          </StartButton>
          <a href="#tracks" className="btn">
            Compare the tracks
          </a>
        </div>

        <div
          className="mt-10 flex flex-wrap gap-6"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.22em',
            color: 'var(--ink-dim)',
          }}
        >
          <span>
            {tracks.length} tracks · {totalLessons} lessons
          </span>
          <span style={{ color: 'var(--edge)' }}>•</span>
          <span>~{Math.round(totalMinutes / 60)} hours end to end</span>
          <span style={{ color: 'var(--edge)' }}>•</span>
          <span>No prior coding required</span>
        </div>
      </section>

      {/* --------------------------- TRACKS ------------------------- */}
      <section
        id="tracks"
        className="scroll-mt-24 border-t"
        style={{ borderColor: 'var(--edge)', background: 'var(--bg)' }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 py-20 sm:px-10">
          <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className="mb-3 uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  color: 'var(--ink-dim)',
                }}
              >
                The three tracks
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 2.5vw + 0.5rem, 3rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                Pick where you want to ship.
              </h2>
            </div>
            <p className="max-w-md" style={{ color: 'var(--paper)', lineHeight: 1.6 }}>
              The tracks don&apos;t depend on each other. Start with whichever toolchain
              matches your job. Come back for the others when you&apos;re curious.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {tracks.map((t) => (
              <TrackCard key={t.slug} track={t} />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- HOW IT WORKS ------------------- */}
      <section
        className="border-t"
        style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 py-20 sm:px-10">
          <p
            className="mb-3 uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.22em',
              color: 'var(--ink-dim)',
            }}
          >
            How it works
          </p>
          <h2
            className="max-w-[32ch]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 2.5vw + 0.5rem, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: 40,
            }}
          >
            Four steps. One afternoon. A working URL.
          </h2>

          <ol
            className="grid gap-px overflow-hidden rounded-lg sm:grid-cols-2 lg:grid-cols-4"
            style={{ background: 'var(--edge)' }}
          >
            {HOW_IT_WORKS.map((step) => (
              <li key={step.n} className="p-7" style={{ background: 'var(--bg)' }}>
                <p
                  className="mb-4 tabular-nums"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.2em',
                    color: 'var(--accent)',
                  }}
                >
                  {step.n}
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: 'var(--ink)',
                    marginBottom: 10,
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ color: 'var(--paper)', fontSize: 14, lineHeight: 1.6 }}>
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------- DIFFERENTIATORS ---------------- */}
      <section
        className="border-t"
        style={{ borderColor: 'var(--edge)', background: 'var(--bg)' }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 py-20 sm:px-10">
          <p
            className="mb-3 uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.22em',
              color: 'var(--ink-dim)',
            }}
          >
            Why this course
          </p>
          <h2
            className="max-w-[32ch]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 2.5vw + 0.5rem, 3rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: 40,
            }}
          >
            Not another &ldquo;hello world.&rdquo;
          </h2>

          <div className="grid gap-10 md:grid-cols-3">
            {DIFFERENTIATORS.map(({ Icon, title, body }) => (
              <div key={title}>
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border"
                  style={{ borderColor: 'var(--edge)', color: 'var(--accent)' }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    color: 'var(--ink)',
                    marginBottom: 10,
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: 'var(--paper)', fontSize: 14, lineHeight: 1.65 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------- FAQ ---------------------------- */}
      <section
        className="border-t"
        style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 py-20 sm:px-10">
          <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
            <div>
              <p
                className="mb-3 uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  color: 'var(--ink-dim)',
                }}
              >
                Common questions
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 2.5vw + 0.5rem, 3rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                Read before you start.
              </h2>
              <Link
                to="/faq"
                className="mt-6 inline-flex items-center gap-2"
                style={{ color: 'var(--accent)' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                  }}
                >
                  See full FAQ
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div
              className="grid gap-px overflow-hidden rounded-lg"
              style={{ background: 'var(--edge)' }}
            >
              {FAQ.map((item) => (
                <details key={item.q} className="group" style={{ background: 'var(--bg)' }}>
                  <summary
                    className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-[color:var(--bg-2)]"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      color: 'var(--ink)',
                      listStyle: 'none',
                    }}
                  >
                    <span>{item.q}</span>
                    <span
                      className="shrink-0 transition-transform group-open:rotate-45"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 18,
                        color: 'var(--accent)',
                      }}
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="px-6 pb-6"
                    style={{ color: 'var(--paper)', fontSize: 14, lineHeight: 1.65 }}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- CLOSING CTA -------------------- */}
      <section
        className="border-t"
        style={{ borderColor: 'var(--edge)', background: 'var(--bg)' }}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 py-24 text-center sm:px-10">
          <p
            className="mb-6 uppercase"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.28em',
              color: 'var(--accent)',
            }}
          >
            Ready?
          </p>
          <h2
            className="mx-auto max-w-[22ch]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3vw + 0.5rem, 3.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: 28,
            }}
          >
            Open the Start menu. Pick a track.
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <StartButton>
              Start lesson 1 <ArrowRight className="h-4 w-4" />
            </StartButton>
            <a href="#tracks" className="btn">
              Re-read the tracks
            </a>
          </div>

          <ul
            className="mx-auto mt-10 inline-flex flex-wrap justify-center gap-x-6 gap-y-2"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.2em',
              color: 'var(--ink-dim)',
              textTransform: 'uppercase',
            }}
          >
            <li className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} /> Free to start
            </li>
            <li className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} /> No install on track 02 + 03
            </li>
            <li className="inline-flex items-center gap-2">
              <Check className="h-3.5 w-3.5" style={{ color: 'var(--accent)' }} /> Real URL at the end
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

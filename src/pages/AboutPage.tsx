import { Link } from 'react-router-dom'
import { SplitText } from '../components/motion/SplitText'
import { Reveal } from '../components/motion/Reveal'

const tenets = [
  ['Specificity over surface', 'Describe the thing itself, not adjectives about the thing.'],
  ['Diagnose before you prescribe', 'The problem statement is worth more than the wireframe.'],
  ['Now / Next / Later', 'Tight MVPs produce stable architectures.'],
  ['Constraints are a feature', 'A named non-goal is a feature you will not delete later.'],
  ['One artifact, one handoff', 'The Build Prompt Package is the deliverable. Everything else is scaffolding.'],
]

export function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 pb-40 pt-40 sm:px-10">
      <p className="eyebrow mb-10">About / manifesto</p>
      <SplitText
        as="h1"
        className="display"
        text="We teach the structure,"
        stagger={0.05}
      />
      <SplitText
        as="h1"
        className="display display-italic"
        text="not the tricks."
        delay={0.2}
        stagger={0.05}
      />

      <Reveal delay={0.4} className="mt-16 grid gap-16 md:grid-cols-[220px_1fr]">
        <p className="eyebrow">§ why</p>
        <div className="space-y-6">
          <p className="lead">
            Most "AI coding" advice optimizes the prompt. We think the prompt is the tip of the
            iceberg. The thing that actually makes an AI agent produce a coherent app is the
            structured thinking behind the prompt — mission, user, MVP line, map, look, constraints,
            acceptance.
          </p>
          <p className="lead">
            Pathfinder VBW is a ten-chapter cinematic guide that forces that structure, and outputs
            a single markdown package you can hand to any agent. That is the whole product.
          </p>
        </div>
      </Reveal>

      <div className="hairline my-24" />

      <Reveal className="grid gap-16 md:grid-cols-[220px_1fr]">
        <p className="eyebrow">§ tenets</p>
        <ol className="space-y-8">
          {tenets.map(([title, body], i) => (
            <li key={title} className="grid grid-cols-[60px_1fr] gap-6">
              <span
                className="tabular-nums"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="h3 mb-2">{title}</h3>
                <p style={{ color: 'var(--paper)' }}>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className="hairline my-24" />

      <Reveal className="flex flex-wrap items-center gap-6">
        <Link to="/guide" className="btn btn-primary" data-cursor="magnet">
          Start the guide
        </Link>
        <Link to="/library" className="btn" data-cursor="magnet">
          Browse the library
        </Link>
      </Reveal>
    </div>
  )
}

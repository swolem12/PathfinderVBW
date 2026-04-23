import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { palantirLessons } from '../content/palantir'
import { palantirAdvancedLessons } from '../content/palantir-advanced'
import { palantirAipLessons } from '../content/palantir-aip'

type CourseOption = {
  slug: string
  badge: string
  title: string
  pitch: string
  destination: string
  audience: string
  lessons: number
  minutes: number
}

function buildCourses(): CourseOption[] {
  const slate = palantirLessons.filter((l) => !l.optional)
  const datasets = palantirAdvancedLessons.filter((l) => !l.optional)
  const aip = palantirAipLessons.filter((l) => !l.optional)
  return [
    {
      slug: 'palantir-slate',
      badge: 'Course A · Slate',
      title: 'Slate webapps in Foundry',
      pitch:
        'Shape the Ontology, write typed Functions, drag widgets onto a Slate canvas, wire Action Types. Publish a URL your team actually opens.',
      destination: 'A published Slate URL.',
      audience:
        'For people who want to build user-facing apps. Zero data-engineering required.',
      lessons: slate.length,
      minutes: slate.reduce((n, l) => n + l.estMinutes, 0),
    },
    {
      slug: 'palantir-engineer',
      badge: 'Course B · Data Sets',
      title: 'Data Sets — Code Repos, PySpark, Pipelines, AIP, Workshop, Lineage',
      pitch:
        'The practitioner reference for the data platform. TypeScript Functions (Metric + Writeback), PySpark transforms, Pipeline Builder, AIP Logic, Workshop frontends, and the Lineage graph — health + schedules.',
      destination: 'A production-shaped Foundry data product.',
      audience:
        'For data engineers, analysts, and developers who live inside Foundry.',
      lessons: datasets.length,
      minutes: datasets.reduce((n, l) => n + l.estMinutes, 0),
    },
    {
      slug: 'palantir-aip',
      badge: 'Course C · AIP Assist Builder',
      title: 'Train an AIP Assist bot on a project folder',
      pitch:
        'Scope a bot to a Compass folder, curate sources for retrievability, write a system prompt with guardrails, build an eval set, embed it in Slate/Workshop, and run the weekly feedback loop.',
      destination: 'A cited, embedded, governed FleetOps Assist bot.',
      audience:
        'For anyone with a body of docs and a team that should stop asking the same questions twice.',
      lessons: aip.length,
      minutes: aip.reduce((n, l) => n + l.estMinutes, 0),
    },
  ]
}

function CourseCard({ course }: { course: CourseOption }) {
  return (
    <Link
      to={`/${course.slug}`}
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
          {course.badge}
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
          {course.title}
        </h3>
        <p style={{ color: 'var(--paper)', fontSize: 15, lineHeight: 1.6 }}>{course.pitch}</p>
        <p
          className="mt-4"
          style={{
            color: 'var(--ink-dim)',
            fontSize: 13,
            lineHeight: 1.55,
            fontStyle: 'italic',
          }}
        >
          {course.audience}
        </p>
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
          <span>{course.lessons} lessons</span>
          <span style={{ color: 'var(--edge)' }}>•</span>
          <span>~{course.minutes} min</span>
          <span style={{ color: 'var(--edge)' }}>•</span>
          <span>{course.destination}</span>
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
            Open this course
          </span>
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}

export function PalantirHubPage() {
  const courses = buildCourses()
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-20 sm:px-10 md:py-28">
      <p
        className="mb-6 uppercase"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.28em',
          color: 'var(--accent)',
        }}
      >
        Track 02 · Palantir Foundry
      </p>
      <h1
        className="display"
        style={{ fontSize: 'clamp(2.25rem, 4vw + 0.5rem, 4rem)', lineHeight: 1.05 }}
      >
        Pick your Foundry course.
      </h1>
      <p className="lead mt-8" style={{ maxWidth: '68ch' }}>
        The Palantir track splits into three sub-courses because a Foundry tenant has three
        distinct audiences. Pick <em>Slate</em> to ship an app, <em>Data Sets</em> to own the
        data platform beneath it, or <em>AIP Assist Builder</em> to stand up a cited,
        folder-scoped chatbot. They don&apos;t depend on each other — start wherever you
        live today.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <CourseCard key={c.slug} course={c} />
        ))}
      </div>

      <div
        className="mt-14 rounded-lg border p-6"
        style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
      >
        <p
          className="mb-2 uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.28em',
            color: 'var(--ink-dim)',
          }}
        >
          Not sure?
        </p>
        <p style={{ color: 'var(--paper)', fontSize: 15, lineHeight: 1.6 }}>
          If the end-state you want to ship is <strong>a working app your team opens</strong>,
          start with <strong>Slate</strong>. If you want <strong>a clean data model,
          monitored pipelines, and AI you can audit</strong>, start with <strong>Data Sets</strong>.
          If you have a pile of docs and want a chatbot your team can trust, start with{' '}
          <strong>AIP Assist Builder</strong>. Most practitioners eventually do all three.
        </p>
      </div>
    </section>
  )
}

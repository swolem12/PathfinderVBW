import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/* ------------------------------------------------------------------ */
/*  Fusion360Mock — native animated SVG/HTML mocks of Fusion 360      */
/*  workflows. Pattern mirrors GithubMock / SlateMock.                */
/* ------------------------------------------------------------------ */

export type Fusion360MockVariant =
  | 'workspace-map'
  | 'interface-tour'
  | 'sketch-constraints'
  | 'solid-extrude'
  | 'mesh-cleanup'
  | 'parametric-timeline'
  | 'orbit-pan-zoom'
  | 'save-versions'
  | 'parameters-dialog'
  | 'joint-types'
  | 'fillet-chamfer'
  | 'shell-tool'
  | 'hole-types'
  | 'pattern-mirror'
  | 'sketch-tools'
  | 'plane-cut-mesh'
  | 'export-formats'
  | 'section-analysis'
  | 'solid-primitives'
  | 'profile-features'
  | 'direct-edit-booleans'
  | 'construction-inspect'
  | 'mesh-repair-suite'
  | 'mesh-section-convert'
  | 'sketch-shape-suite'
  | 'sketch-edit-suite'

const LABEL: Record<Fusion360MockVariant, string> = {
  'workspace-map': 'Fusion 360 — workspace map',
  'interface-tour': 'Fusion 360 — interface tour',
  'sketch-constraints': 'Sketch — fully constrained walkthrough',
  'solid-extrude': 'Solid — extrude + fillet animation',
  'mesh-cleanup': 'Mesh — STL cleanup workflow',
  'parametric-timeline': 'Parametric project — timeline build',
  'orbit-pan-zoom': 'Navigation — orbit · pan · zoom',
  'save-versions': 'Saves — version history',
  'parameters-dialog': 'Modify — change parameters',
  'joint-types': 'Assemble — joint types',
  'fillet-chamfer': 'Modify — fillet vs chamfer',
  'shell-tool': 'Modify — shell',
  'hole-types': 'Create — hole types',
  'pattern-mirror': 'Create — pattern + mirror',
  'sketch-tools': 'Sketch — primary draw tools',
  'plane-cut-mesh': 'Mesh — plane cut',
  'export-formats': 'Export — file formats',
  'section-analysis': 'Inspect — section analysis',
  'solid-primitives': 'Solid — primitive components',
  'profile-features': 'Solid — profile-driven features',
  'direct-edit-booleans': 'Modify — direct edits + booleans',
  'construction-inspect': 'Construct + inspect — references',
  'mesh-repair-suite': 'Mesh — repair + close workflow',
  'mesh-section-convert': 'Mesh — section sketch + convert',
  'sketch-shape-suite': 'Sketch — shape creation tools',
  'sketch-edit-suite': 'Sketch — edit + reference tools',
}

const EASE = [0.22, 1, 0.36, 1] as const

export function Fusion360Mock({
  variant,
  caption,
  helpUrl,
  tutorialQuery,
}: {
  variant: Fusion360MockVariant
  caption?: string
  helpUrl?: string
  tutorialQuery?: string
}) {
  const tutorialUrl = tutorialQuery
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(
        `Autodesk Fusion 360 ${tutorialQuery} tutorial`,
      )}`
    : undefined

  return (
    <figure
      className="my-8 overflow-hidden rounded-lg border"
      style={{ borderColor: 'var(--edge)', background: 'var(--bg-2)' }}
    >
      <div
        className="flex items-center border-b px-4 py-2"
        style={{ borderColor: 'var(--edge)' }}
      >
        <span
          className="uppercase"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.22em',
            color: 'var(--ink-dim)',
          }}
        >
          {LABEL[variant]}
        </span>
      </div>
      <div style={{ padding: 20 }}>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {renderVariant(variant)}
        </motion.div>
        {(helpUrl || tutorialUrl) && (
          <div
            className="mt-4 flex flex-wrap gap-2"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}
          >
            {helpUrl && (
              <a
                href={helpUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded border px-3 py-1.5 transition"
                style={{
                  borderColor: 'var(--edge)',
                  color: 'var(--ink)',
                  background: 'var(--bg)',
                }}
              >
                Autodesk Help reference ↗
              </a>
            )}
            {tutorialUrl && (
              <a
                href={tutorialUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded border px-3 py-1.5 transition"
                style={{
                  borderColor: 'var(--edge)',
                  color: 'var(--ink)',
                  background: 'var(--bg)',
                }}
              >
                Watch tutorials ↗
              </a>
            )}
          </div>
        )}
      </div>
      {caption && (
        <figcaption
          className="border-t px-4 py-2 text-center"
          style={{
            borderColor: 'var(--edge)',
            color: 'var(--ink-dim)',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.15em',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function renderVariant(variant: Fusion360MockVariant) {
  switch (variant) {
    case 'workspace-map':
      return <WorkspaceMap />
    case 'interface-tour':
      return <InterfaceTour />
    case 'sketch-constraints':
      return <SketchConstraints />
    case 'solid-extrude':
      return <SolidExtrude />
    case 'mesh-cleanup':
      return <MeshCleanup />
    case 'parametric-timeline':
      return <ParametricTimeline />
    case 'orbit-pan-zoom':
      return <OrbitPanZoom />
    case 'save-versions':
      return <SaveVersions />
    case 'parameters-dialog':
      return <ParametersDialog />
    case 'joint-types':
      return <JointTypes />
    case 'fillet-chamfer':
      return <FilletChamfer />
    case 'shell-tool':
      return <ShellTool />
    case 'hole-types':
      return <HoleTypes />
    case 'pattern-mirror':
      return <PatternMirror />
    case 'sketch-tools':
      return <SketchTools />
    case 'plane-cut-mesh':
      return <PlaneCutMesh />
    case 'export-formats':
      return <ExportFormats />
    case 'section-analysis':
      return <SectionAnalysis />
    case 'solid-primitives':
      return <SolidPrimitives />
    case 'profile-features':
      return <ProfileFeatures />
    case 'direct-edit-booleans':
      return <DirectEditBooleans />
    case 'construction-inspect':
      return <ConstructionInspect />
    case 'mesh-repair-suite':
      return <MeshRepairSuite />
    case 'mesh-section-convert':
      return <MeshSectionConvert />
    case 'sketch-shape-suite':
      return <SketchShapeSuite />
    case 'sketch-edit-suite':
      return <SketchEditSuite />
  }
}

/* ------------------------------------------------------------------ */
/*  Variant: workspace-map                                            */
/* ------------------------------------------------------------------ */

function WorkspaceMap() {
  const tiles = [
    { name: 'Design', sub: 'Solid · Surface · Sheet metal' },
    { name: 'Generative', sub: 'Goal-driven shape studies' },
    { name: 'Render', sub: 'Materials & ray-traced views' },
    { name: 'Animation', sub: 'Exploded views & motion' },
    { name: 'Simulation', sub: 'Stress · modal · thermal' },
    { name: 'Manufacture', sub: 'CAM · toolpaths · post' },
    { name: 'Drawing', sub: '2D drafting & sheets' },
    { name: 'Mesh', sub: 'STL repair & conversion' },
  ]
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 10,
      }}
    >
      {tiles.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.35, ease: EASE }}
          style={{
            border: '1px solid var(--edge)',
            borderRadius: 8,
            padding: '12px 12px 14px',
            background: 'var(--bg)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.span
            aria-hidden
            animate={{ opacity: [0, 0.18, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--accent)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              fontFamily: 'var(--font-display, var(--font-mono))',
              color: 'var(--ink)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.02em',
            }}
          >
            {t.name}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--ink-dim)',
              fontSize: 10,
              marginTop: 4,
              letterSpacing: '0.04em',
            }}
          >
            {t.sub}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: interface-tour                                           */
/* ------------------------------------------------------------------ */

function InterfaceTour() {
  // Cursor cycles through 5 hotspots (toolbar, browser, canvas, viewcube, timeline)
  const hotspots = [
    { x: 30, y: 18 },
    { x: 12, y: 55 },
    { x: 55, y: 55 },
    { x: 88, y: 32 },
    { x: 50, y: 90 },
  ]
  const dur = 8
  return (
    <div
      style={{
        position: 'relative',
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        overflow: 'hidden',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 36,
          borderBottom: '1px solid var(--edge)',
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          padding: '0 10px',
          background: 'var(--bg-2)',
        }}
      >
        {['Sketch', 'Create', 'Modify', 'Assemble', 'Construct', 'Inspect'].map((t) => (
          <span
            key={t}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--ink-dim)',
              padding: '4px 8px',
              border: '1px solid var(--edge)',
              borderRadius: 4,
            }}
          >
            {t}
          </span>
        ))}
      </div>
      {/* Browser */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          bottom: 36,
          left: 0,
          width: 130,
          borderRight: '1px solid var(--edge)',
          padding: 8,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--ink-dim)',
          background: 'var(--bg-2)',
        }}
      >
        <div style={{ color: 'var(--ink)', marginBottom: 4 }}>▾ Untitled</div>
        <div style={{ paddingLeft: 8 }}>▸ Origin</div>
        <div style={{ paddingLeft: 8 }}>▸ Bodies</div>
        <div style={{ paddingLeft: 8 }}>▸ Sketches</div>
        <div style={{ paddingLeft: 8 }}>▸ Components</div>
      </div>
      {/* Canvas */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          bottom: 36,
          left: 130,
          right: 0,
          background:
            'linear-gradient(135deg, rgba(120,160,200,0.10) 0%, rgba(40,60,90,0.04) 100%)',
        }}
      >
        {/* origin */}
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--edge)" strokeDasharray="3 4" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--edge)" strokeDasharray="3 4" />
          {/* sample box */}
          <motion.rect
            x="38%"
            y="35%"
            width="24%"
            height="30%"
            fill="var(--bg-2)"
            stroke="var(--accent)"
            strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.6] }}
            transition={{ duration: dur, repeat: Infinity }}
          />
        </svg>
        {/* viewcube */}
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 36,
            height: 36,
            border: '1px solid var(--edge)',
            background: 'var(--bg-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color: 'var(--ink-dim)',
          }}
        >
          TOP
        </div>
      </div>
      {/* Timeline */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 36,
          borderTop: '1px solid var(--edge)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          gap: 6,
          background: 'var(--bg-2)',
        }}
      >
        {['◐', '▭', '⬡', '⌒', '◍'].map((g, i) => (
          <span
            key={i}
            style={{
              width: 22,
              height: 22,
              border: '1px solid var(--edge)',
              borderRadius: 3,
              fontSize: 12,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink-dim)',
            }}
          >
            {g}
          </span>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-dim)' }}>
          ▷ play history
        </span>
      </div>
      {/* Animated cursor */}
      <motion.div
        aria-hidden
        animate={{
          left: hotspots.map((h) => `${h.x}%`),
          top: hotspots.map((h) => `${h.y}%`),
        }}
        transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', times: [0, 0.2, 0.45, 0.7, 0.95] }}
        style={{
          position: 'absolute',
          width: 14,
          height: 14,
          marginLeft: -7,
          marginTop: -7,
          borderRadius: '50%',
          border: '2px solid var(--accent)',
          background: 'rgba(255,255,255,0.6)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: sketch-constraints                                       */
/* ------------------------------------------------------------------ */

function SketchConstraints() {
  // Animated rectangle: lines draw in blue, then turn black (constrained), with dimension labels.
  const cycle = 6
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 400 280" width="100%" height="100%">
        {/* origin */}
        <line x1="0" y1="140" x2="400" y2="140" stroke="var(--edge)" strokeDasharray="3 4" />
        <line x1="200" y1="0" x2="200" y2="280" stroke="var(--edge)" strokeDasharray="3 4" />
        <circle cx="200" cy="140" r="3" fill="var(--accent)" />
        {/* rectangle lines — drawn one by one, then color shifts to black */}
        {[
          { x1: 200, y1: 140, x2: 320, y2: 140, key: 'top' },
          { x1: 320, y1: 140, x2: 320, y2: 220, key: 'right' },
          { x1: 320, y1: 220, x2: 200, y2: 220, key: 'bottom' },
          { x1: 200, y1: 220, x2: 200, y2: 140, key: 'left' },
        ].map((l, i) => (
          <motion.line
            key={l.key}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            strokeWidth="2"
            initial={{ pathLength: 0, stroke: '#3b82f6' }}
            animate={{
              pathLength: [0, 1, 1, 1, 1],
              stroke: ['#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6', 'var(--ink)'],
            }}
            transition={{
              duration: cycle,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.15 + i * 0.08, 0.5, 0.65, 0.85],
              delay: i * 0.4,
            }}
          />
        ))}
        {/* dimension labels appear in the second half */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.55, 0.7, 1] }}
        >
          <text x="260" y="132" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
            120 mm
          </text>
          <text x="334" y="184" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)">
            80 mm
          </text>
        </motion.g>
        {/* status */}
        <motion.text
          x="20"
          y="30"
          fill="var(--ink-dim)"
          fontSize="11"
          fontFamily="var(--font-mono)"
          animate={{
            opacity: [1, 1, 1, 1],
          }}
          transition={{ duration: cycle, repeat: Infinity }}
        >
          status:
        </motion.text>
        <motion.text
          x="78"
          y="30"
          fontSize="11"
          fontFamily="var(--font-mono)"
          animate={{
            // text content cycles via opacity of two stacked labels below
            opacity: [1, 1, 0, 0],
          }}
          fill="#3b82f6"
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.6, 0.65, 1] }}
        >
          under-constrained
        </motion.text>
        <motion.text
          x="78"
          y="30"
          fontSize="11"
          fontFamily="var(--font-mono)"
          animate={{ opacity: [0, 0, 1, 1] }}
          fill="var(--ink)"
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.6, 0.7, 1] }}
        >
          fully constrained ✓
        </motion.text>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: solid-extrude                                            */
/* ------------------------------------------------------------------ */

function SolidExtrude() {
  const cycle = 7
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 400 280" width="100%" height="100%">
        <line x1="0" y1="200" x2="400" y2="200" stroke="var(--edge)" strokeDasharray="3 4" />
        {/* base profile (rectangle) */}
        <motion.rect
          x="140"
          y="170"
          width="120"
          height="30"
          fill="rgba(120,160,200,0.10)"
          stroke="var(--accent)"
          strokeWidth="1.5"
          animate={{ opacity: [0, 1, 1, 1, 0.4] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.1, 0.3, 0.6, 1] }}
        />
        {/* extruded top face */}
        <motion.polygon
          fill="rgba(120,160,200,0.18)"
          stroke="var(--ink)"
          strokeWidth="1.5"
          animate={{
            points: [
              '140,170 260,170 260,170 140,170',
              '140,170 260,170 290,140 170,140',
              '140,170 260,170 290,80 170,80',
              '140,170 260,170 290,80 170,80',
            ],
            opacity: [0, 1, 1, 1],
          }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.25, 0.55, 1], ease: 'easeInOut' }}
        />
        {/* right face */}
        <motion.polygon
          fill="rgba(80,120,160,0.30)"
          stroke="var(--ink)"
          strokeWidth="1.5"
          animate={{
            points: [
              '260,170 260,170 260,170 260,170',
              '260,170 290,140 290,140 260,170',
              '260,170 290,80 290,80 260,170',
              '260,170 290,80 290,80 260,170',
            ],
            opacity: [0, 1, 1, 1],
          }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.25, 0.55, 1], ease: 'easeInOut' }}
        />
        {/* extrude direction arrow */}
        <motion.g
          animate={{ opacity: [0, 1, 1, 0, 0] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.15, 0.5, 0.6, 1] }}
        >
          <line x1="200" y1="170" x2="200" y2="80" stroke="var(--accent)" strokeWidth="1.5" />
          <polygon points="195,90 205,90 200,75" fill="var(--accent)" />
          <text x="208" y="130" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)">
            extrude 60 mm
          </text>
        </motion.g>
        {/* fillet highlight */}
        <motion.circle
          cx="290"
          cy="80"
          r="10"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          animate={{ opacity: [0, 0, 0, 1, 0] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.55, 0.7, 0.85, 1] }}
        />
        <motion.text
          x="305"
          y="78"
          fill="var(--accent)"
          fontSize="11"
          fontFamily="var(--font-mono)"
          animate={{ opacity: [0, 0, 0, 1, 0] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.55, 0.7, 0.85, 1] }}
        >
          fillet 5 mm
        </motion.text>
        {/* step labels */}
        <text x="20" y="30" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)">
          1. sketch profile  →  2. extrude  →  3. fillet edges
        </text>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: mesh-cleanup                                             */
/* ------------------------------------------------------------------ */

function MeshCleanup() {
  // Left: dense triangulated mesh. Right: reduced mesh. Arrow + label cycles.
  const dense: string[] = []
  const sparse: string[] = []
  // Build a simple triangulated dome (semi-circle of triangles)
  const make = (count: number) => {
    const tris: string[] = []
    const cx = 80
    const cy = 130
    const r = 60
    for (let i = 0; i < count; i++) {
      const a1 = Math.PI * (i / count)
      const a2 = Math.PI * ((i + 1) / count)
      tris.push(
        `${cx + Math.cos(a1) * r},${cy - Math.sin(a1) * r} ${cx + Math.cos(a2) * r},${cy - Math.sin(a2) * r} ${cx},${cy}`,
      )
    }
    return tris
  }
  dense.push(...make(18))
  sparse.push(...make(7))

  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 400 280" width="100%" height="100%">
        {/* dense */}
        <g transform="translate(0,10)">
          {dense.map((pts, i) => (
            <motion.polygon
              key={i}
              points={pts}
              fill="rgba(120,160,200,0.10)"
              stroke="var(--ink-dim)"
              strokeWidth="0.8"
              animate={{ opacity: [1, 1, 0.2, 0.2, 1] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.55, 0.85, 1] }}
            />
          ))}
          <text
            x="80"
            y="170"
            fill="var(--ink-dim)"
            fontSize="10"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            STL · 1.2M triangles
          </text>
        </g>
        {/* arrow */}
        <motion.g
          animate={{ opacity: [0.5, 0.5, 1, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 0.5, 0.85, 1] }}
        >
          <line x1="170" y1="140" x2="220" y2="140" stroke="var(--accent)" strokeWidth="2" />
          <polygon points="215,134 215,146 225,140" fill="var(--accent)" />
          <text
            x="195"
            y="130"
            fill="var(--accent)"
            fontSize="10"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            reduce
          </text>
        </motion.g>
        {/* sparse */}
        <g transform="translate(240,10)">
          {sparse.map((pts, i) => (
            <motion.polygon
              key={i}
              points={pts}
              fill="rgba(120,160,200,0.18)"
              stroke="var(--ink)"
              strokeWidth="1.2"
              animate={{ opacity: [0.2, 0.2, 1, 1, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.55, 0.85, 1] }}
            />
          ))}
          <text
            x="80"
            y="170"
            fill="var(--ink-dim)"
            fontSize="10"
            fontFamily="var(--font-mono)"
            textAnchor="middle"
          >
            cleaned · 25K triangles
          </text>
        </g>
        <text x="20" y="30" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)">
          import STL  →  inspect  →  reduce  →  repair  →  convert to BRep
        </text>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: parametric-timeline                                      */
/* ------------------------------------------------------------------ */

function ParametricTimeline() {
  const features = [
    { glyph: '◐', name: 'Sketch1' },
    { glyph: '▭', name: 'Extrude1' },
    { glyph: '◯', name: 'Hole1' },
    { glyph: '⌒', name: 'Fillet1' },
    { glyph: '⬡', name: 'Shell1' },
    { glyph: '◧', name: 'Mirror1' },
    { glyph: '⌖', name: 'Combine' },
  ]
  const cycle = features.length * 0.9
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--ink-dim)',
          fontSize: 11,
        }}
      >
        timeline · feature history
      </div>
      <div
        style={{
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {features.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0, 1, 1, 1],
              scale: [0.8, 0.8, 1, 1, 1],
            }}
            transition={{
              duration: cycle,
              repeat: Infinity,
              times: [0, i / features.length, (i + 0.3) / features.length, 1, 1],
              ease: EASE,
            }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '8px 10px',
              border: '1px solid var(--edge)',
              borderRadius: 6,
              background: 'var(--bg-2)',
              minWidth: 64,
            }}
          >
            <span style={{ fontSize: 18, color: 'var(--accent)' }}>{f.glyph}</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--ink-dim)',
              }}
            >
              {f.name}
            </span>
          </motion.div>
        ))}
      </div>
      {/* simulated 3D body that grows complexity */}
      <div style={{ flex: 1, position: 'relative' }}>
        <svg viewBox="0 0 400 120" width="100%" height="100%">
          <motion.rect
            x="120"
            y="40"
            width="160"
            height="60"
            fill="rgba(120,160,200,0.18)"
            stroke="var(--ink)"
            strokeWidth="1.5"
            animate={{ opacity: [0, 1, 1, 1, 1] }}
            transition={{ duration: cycle, repeat: Infinity, times: [0, 1 / features.length, 0.4, 0.8, 1] }}
          />
          <motion.circle
            cx="160"
            cy="70"
            r="10"
            fill="var(--bg)"
            stroke="var(--ink)"
            strokeWidth="1.2"
            animate={{ opacity: [0, 0, 1, 1, 1] }}
            transition={{ duration: cycle, repeat: Infinity, times: [0, 2 / features.length, 3 / features.length, 0.9, 1] }}
          />
          <motion.circle
            cx="240"
            cy="70"
            r="10"
            fill="var(--bg)"
            stroke="var(--ink)"
            strokeWidth="1.2"
            animate={{ opacity: [0, 0, 1, 1, 1] }}
            transition={{ duration: cycle, repeat: Infinity, times: [0, 2 / features.length, 3 / features.length, 0.9, 1] }}
          />
          <motion.path
            d="M120,40 Q120,32 128,32 L272,32 Q280,32 280,40"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            animate={{ opacity: [0, 0, 0, 1, 1] }}
            transition={{ duration: cycle, repeat: Infinity, times: [0, 3 / features.length, 4 / features.length, 5 / features.length, 1] }}
          />
        </svg>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: orbit-pan-zoom                                           */
/* ------------------------------------------------------------------ */

function OrbitPanZoom() {
  const cycle = 9
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 400 280" width="100%" height="100%">
        <line x1="0" y1="200" x2="400" y2="200" stroke="var(--edge)" strokeDasharray="3 4" />
        {/* Orbit rotation (rotate body around center) */}
        <motion.g
          style={{ transformOrigin: '200px 160px' }}
          animate={{ rotate: [0, 25, -15, 0, 0, 0] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.18, 0.32, 0.45, 0.7, 1] }}
        >
          {/* Pan (translate) */}
          <motion.g
            animate={{ x: [0, 0, 0, 0, -50, 30, 0], y: [0, 0, 0, 0, 10, -20, 0] }}
            transition={{ duration: cycle, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 0.7, 0.85, 1] }}
          >
            {/* Zoom (scale) */}
            <motion.g
              style={{ transformOrigin: '200px 160px' }}
              animate={{ scale: [1, 1, 1, 1, 1, 1.4, 0.85, 1] }}
              transition={{ duration: cycle, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 0.7, 0.78, 0.92, 1] }}
            >
              <polygon points="170,180 230,180 250,160 250,120 230,140 170,140" fill="rgba(120,160,200,0.18)" stroke="var(--ink)" strokeWidth="1.5" />
              <polygon points="230,180 250,160 250,120 230,140" fill="rgba(80,120,160,0.30)" stroke="var(--ink)" strokeWidth="1.2" />
              <polygon points="170,140 230,140 250,120 190,120" fill="rgba(160,200,240,0.18)" stroke="var(--ink)" strokeWidth="1.2" />
            </motion.g>
          </motion.g>
        </motion.g>
        {/* Labels */}
        <motion.text x="20" y="30" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)" animate={{ opacity: [1, 1, 0, 0, 0, 0, 0] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.4, 0.45, 0.5, 0.7, 0.85, 1] }}>
          orbit · MMB drag (or shift+MMB)
        </motion.text>
        <motion.text x="20" y="30" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)" animate={{ opacity: [0, 0, 0, 1, 1, 0, 0] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.4, 0.45, 0.5, 0.7, 0.75, 1] }}>
          pan · MMB drag
        </motion.text>
        <motion.text x="20" y="30" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)" animate={{ opacity: [0, 0, 0, 0, 0, 1, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.4, 0.45, 0.7, 0.74, 0.78, 1] }}>
          zoom · scroll wheel
        </motion.text>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: save-versions                                            */
/* ------------------------------------------------------------------ */

function SaveVersions() {
  const versions = [
    { v: 'v01', note: 'setup + parameters' },
    { v: 'v02', note: 'sketch fully constrained' },
    { v: 'v03', note: 'base extrude' },
    { v: 'v04', note: 'holes + fillets' },
    { v: 'v05', note: 'inspected + exported' },
  ]
  const cycle = versions.length * 1.0
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-dim)' }}>
        version history · Ctrl/Cmd+S
      </div>
      {versions.map((v, i) => (
        <motion.div
          key={v.v}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: [0, 0, 1, 1], x: [-10, -10, 0, 0] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, i / versions.length, (i + 0.2) / versions.length, 1] }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 12px',
            border: '1px solid var(--edge)',
            borderRadius: 6,
            background: 'var(--bg-2)',
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink)', minWidth: 36 }}>{v.v}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-dim)' }}>{v.note}</span>
        </motion.div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: parameters-dialog                                        */
/* ------------------------------------------------------------------ */

function ParametersDialog() {
  const cycle = 6
  const rows = [
    { name: 'width', value: ['80 mm', '100 mm', '120 mm'] },
    { name: 'height', value: ['40 mm', '50 mm', '60 mm'] },
    { name: 'thickness', value: ['3 mm', '4 mm', '5 mm'] },
    { name: 'holeDiameter', value: ['4 mm', '4 mm', '5 mm'] },
    { name: 'holeSpacing', value: ['30 mm', '40 mm', '50 mm'] },
  ]
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
      }}
    >
      <div style={{ color: 'var(--ink-dim)', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 8, paddingBottom: 6, borderBottom: '1px solid var(--edge)' }}>
        <span>name</span>
        <span>expression</span>
        <span>value</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.name} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 8, padding: '4px 0', alignItems: 'center' }}>
          <span style={{ color: 'var(--accent)' }}>{r.name}</span>
          <span style={{ color: 'var(--ink-dim)' }}>= user input</span>
          <motion.span
            style={{ color: 'var(--ink)' }}
            animate={{ opacity: [0.4, 1, 0.4, 1, 0.4] }}
            transition={{ duration: cycle, repeat: Infinity, delay: i * 0.1 }}
          >
            <motion.span animate={{ opacity: [1, 0, 0] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.34, 1] }} style={{ position: 'absolute' }}>{r.value[0]}</motion.span>
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: cycle, repeat: Infinity, times: [0.34, 0.5, 0.66] }} style={{ position: 'absolute' }}>{r.value[1]}</motion.span>
            <motion.span animate={{ opacity: [0, 0, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0.66, 0.8, 1] }} style={{ position: 'absolute' }}>{r.value[2]}</motion.span>
            <span style={{ visibility: 'hidden' }}>{r.value[2]}</span>
          </motion.span>
        </div>
      ))}
      <div style={{ marginTop: 'auto', color: 'var(--ink-dim)' }}>
        Modify → Change Parameters · drives every dimension that uses the name.
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: joint-types                                              */
/* ------------------------------------------------------------------ */

function JointTypes() {
  const joints = [
    { name: 'Rigid', desc: '0 DOF — locked together' },
    { name: 'Revolute', desc: '1 DOF — rotation' },
    { name: 'Slider', desc: '1 DOF — translation' },
    { name: 'Cylindrical', desc: '2 DOF — rotate + slide' },
    { name: 'Pin-Slot', desc: '2 DOF — rotate + slot' },
    { name: 'Planar', desc: '3 DOF — flat constrained' },
    { name: 'Ball', desc: '3 DOF — rotational' },
  ]
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        padding: 16,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 8,
      }}
    >
      {joints.map((j, i) => (
        <motion.div
          key={j.name}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.35, ease: EASE }}
          style={{
            border: '1px solid var(--edge)',
            borderRadius: 6,
            padding: 8,
            background: 'var(--bg-2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.span
            aria-hidden
            animate={{ opacity: [0, 0.18, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
            style={{ position: 'absolute', inset: 0, background: 'var(--accent)' }}
          />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink)', fontWeight: 600 }}>{j.name}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-dim)', marginTop: 4 }}>{j.desc}</div>
        </motion.div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: fillet-chamfer                                           */
/* ------------------------------------------------------------------ */

function FilletChamfer() {
  const cycle = 5
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 400 280" width="100%" height="100%">
        <text x="80" y="40" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">FILLET (radius)</text>
        <text x="320" y="40" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">CHAMFER (bevel)</text>
        {/* Fillet morph */}
        <motion.path
          fill="rgba(120,160,200,0.18)"
          stroke="var(--ink)"
          strokeWidth="1.5"
          animate={{
            d: [
              'M30,200 L30,80 L130,80 L130,200 Z',
              'M30,200 L30,90 Q30,80 40,80 L120,80 Q130,80 130,90 L130,200 Z',
              'M30,200 L30,110 Q30,80 60,80 L100,80 Q130,80 130,110 L130,200 Z',
            ],
          }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.5, 1], ease: 'easeInOut' }}
        />
        {/* Chamfer morph */}
        <motion.path
          fill="rgba(120,160,200,0.18)"
          stroke="var(--ink)"
          strokeWidth="1.5"
          animate={{
            d: [
              'M270,200 L270,80 L370,80 L370,200 Z',
              'M270,200 L270,88 L278,80 L362,80 L370,88 L370,200 Z',
              'M270,200 L270,108 L298,80 L342,80 L370,108 L370,200 Z',
            ],
          }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.5, 1], ease: 'easeInOut' }}
        />
        <text x="200" y="260" fill="var(--ink-dim)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">
          fillet softens · chamfer adds an angled lead-in
        </text>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: shell-tool                                               */
/* ------------------------------------------------------------------ */

function ShellTool() {
  const cycle = 5
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 400 280" width="100%" height="100%">
        {/* solid box */}
        <motion.polygon
          points="120,180 280,180 320,140 320,60 160,60 120,100"
          fill="rgba(120,160,200,0.18)"
          stroke="var(--ink)"
          strokeWidth="1.5"
          animate={{ opacity: [1, 1, 0.4, 0.4] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.4, 0.5, 1] }}
        />
        <motion.polygon
          points="280,180 320,140 320,60"
          fill="rgba(80,120,160,0.32)"
          stroke="var(--ink)"
          strokeWidth="1.2"
          animate={{ opacity: [1, 1, 0.4, 0.4] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.4, 0.5, 1] }}
        />
        {/* hollow inner walls (visible after shell) */}
        <motion.polygon
          points="135,170 275,170 310,135 310,75 165,75 135,105"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.4, 0.6, 1] }}
        />
        <text x="200" y="240" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
          select top face → shell removes it and leaves wall thickness
        </text>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: hole-types                                               */
/* ------------------------------------------------------------------ */

function HoleTypes() {
  const types = ['Simple', 'Counterbore', 'Countersink', 'Tapped']
  const cycle = 6
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 400 280" width="100%" height="100%">
        {types.map((t, i) => (
          <g key={t} transform={`translate(${50 + i * 90}, 60)`}>
            <text x="35" y="0" fill="var(--ink-dim)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">{t}</text>
            <rect x="0" y="20" width="70" height="160" fill="rgba(120,160,200,0.10)" stroke="var(--ink)" strokeWidth="1.2" />
            {i === 0 && <rect x="28" y="20" width="14" height="160" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />}
            {i === 1 && (
              <>
                <rect x="20" y="20" width="30" height="40" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
                <rect x="28" y="60" width="14" height="120" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
              </>
            )}
            {i === 2 && (
              <>
                <polygon points="18,20 52,20 42,60 28,60" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
                <rect x="28" y="60" width="14" height="120" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
              </>
            )}
            {i === 3 && (
              <>
                <rect x="28" y="20" width="14" height="160" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" />
                {Array.from({ length: 8 }).map((_, k) => (
                  <line key={k} x1="28" y1={30 + k * 20} x2="42" y2={38 + k * 20} stroke="var(--accent)" strokeWidth="0.8" />
                ))}
              </>
            )}
            <motion.rect
              x="-5"
              y="15"
              width="80"
              height="170"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              rx="3"
              animate={{ opacity: [0, 0, 1, 0, 0] }}
              transition={{ duration: cycle, repeat: Infinity, times: [0, i / types.length, (i + 0.3) / types.length, (i + 0.7) / types.length, 1] }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: pattern-mirror                                           */
/* ------------------------------------------------------------------ */

function PatternMirror() {
  const cycle = 5
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 400 280" width="100%" height="100%">
        <text x="100" y="40" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">RECTANGULAR PATTERN</text>
        <text x="300" y="40" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">MIRROR</text>
        <line x1="200" y1="60" x2="200" y2="240" stroke="var(--edge)" strokeDasharray="3 4" />
        {/* pattern grid */}
        {[0, 1, 2].map((r) => [0, 1, 2].map((c) => (
          <motion.circle
            key={`p-${r}-${c}`}
            cx={40 + c * 30}
            cy={120 + r * 30}
            r="8"
            fill="var(--accent)"
            opacity="0.5"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 0, 1, 1, 0] }}
            transition={{ duration: cycle, repeat: Infinity, times: [0, 0.05 + (r * 3 + c) * 0.06, 0.1 + (r * 3 + c) * 0.06, 0.85, 1], ease: EASE }}
          />
        )))}
        {/* mirror left */}
        <motion.circle cx="240" cy="150" r="10" fill="rgba(120,160,200,0.30)" stroke="var(--ink)" strokeWidth="1.2" animate={{ opacity: [1, 1, 1, 1, 0.3] }} transition={{ duration: cycle, repeat: Infinity }} />
        {/* mirror right */}
        <motion.circle
          cx="360"
          cy="150"
          r="10"
          fill="rgba(120,160,200,0.30)"
          stroke="var(--ink)"
          strokeWidth="1.2"
          animate={{ opacity: [0, 0, 1, 1, 0.3], cx: [240, 240, 360, 360, 360] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.3, 0.6, 0.85, 1] }}
        />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: sketch-tools                                             */
/* ------------------------------------------------------------------ */

function SketchTools() {
  const cycle = 8
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 400 280" width="100%" height="100%">
        <line x1="0" y1="140" x2="400" y2="140" stroke="var(--edge)" strokeDasharray="3 4" />
        <line x1="200" y1="0" x2="200" y2="280" stroke="var(--edge)" strokeDasharray="3 4" />
        {/* line */}
        <motion.line x1="50" y1="200" x2="120" y2="80" stroke="var(--accent)" strokeWidth="2"
          animate={{ pathLength: [0, 1, 1, 1, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.18, 0.95, 0.98, 1] }} />
        <text x="85" y="220" fill="var(--ink-dim)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">L · line</text>
        {/* rectangle */}
        <motion.rect x="150" y="80" width="100" height="60" fill="none" stroke="var(--accent)" strokeWidth="2"
          animate={{ pathLength: [0, 0, 1, 1, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.2, 0.4, 0.95, 1] }} />
        <text x="200" y="160" fill="var(--ink-dim)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">R · rectangle</text>
        {/* circle */}
        <motion.circle cx="320" cy="100" r="30" fill="none" stroke="var(--accent)" strokeWidth="2"
          animate={{ pathLength: [0, 0, 0, 1, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.4, 0.55, 0.75, 1] }} />
        <text x="320" y="155" fill="var(--ink-dim)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">C · circle</text>
        {/* arc */}
        <motion.path d="M50,260 Q120,180 190,260" fill="none" stroke="var(--accent)" strokeWidth="2"
          animate={{ pathLength: [0, 0, 0, 0, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.6, 0.7, 0.8, 0.95] }} />
        <text x="120" y="275" fill="var(--ink-dim)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">A · arc</text>
        {/* polygon */}
        <motion.polygon points="320,200 350,220 340,255 300,255 290,220" fill="none" stroke="var(--accent)" strokeWidth="2"
          animate={{ pathLength: [0, 0, 0, 0, 0, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.7, 0.78, 0.85, 0.9, 0.98] }} />
        <text x="320" y="275" fill="var(--ink-dim)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">polygon</text>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: plane-cut-mesh                                           */
/* ------------------------------------------------------------------ */

function PlaneCutMesh() {
  const cycle = 5
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 400 280" width="100%" height="100%">
        {/* mesh blob (triangulated dome) */}
        {Array.from({ length: 14 }).map((_, i) => {
          const a1 = Math.PI * (i / 14)
          const a2 = Math.PI * ((i + 1) / 14)
          const r = 80
          const cx = 200
          const cy = 180
          return (
            <polygon
              key={i}
              points={`${cx + Math.cos(a1) * r},${cy - Math.sin(a1) * r} ${cx + Math.cos(a2) * r},${cy - Math.sin(a2) * r} ${cx},${cy}`}
              fill="rgba(120,160,200,0.12)"
              stroke="var(--ink-dim)"
              strokeWidth="0.8"
            />
          )
        })}
        {/* sweeping plane */}
        <motion.line
          x1="60"
          x2="340"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="6 4"
          animate={{ y1: [70, 180, 180], y2: [70, 180, 180] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.6, 1], ease: 'easeInOut' }}
        />
        <text x="200" y="240" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
          plane cut · trims everything below the plane (or fills it flat)
        </text>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: export-formats                                           */
/* ------------------------------------------------------------------ */

function ExportFormats() {
  const formats = [
    { ext: 'F3D', use: 'Fusion archive · keeps timeline + parameters' },
    { ext: 'STEP', use: 'Standard CAD interchange · solids' },
    { ext: 'IGES', use: 'Legacy CAD interchange · surfaces' },
    { ext: 'STL', use: '3D printing · triangulated mesh' },
    { ext: '3MF', use: '3D printing · color + units + metadata' },
    { ext: 'OBJ', use: 'Mesh interchange · render/modeling tools' },
    { ext: 'DXF', use: '2D laser/CNC · sketch profiles' },
    { ext: 'PDF', use: '2D drawings · sheets + dimensions' },
  ]
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        padding: 16,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 8,
      }}
    >
      {formats.map((f, i) => (
        <motion.div
          key={f.ext}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.35, ease: EASE }}
          style={{
            border: '1px solid var(--edge)',
            borderRadius: 6,
            padding: 10,
            background: 'var(--bg-2)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{f.ext}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-dim)', marginTop: 4 }}>{f.use}</div>
        </motion.div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant: section-analysis                                         */
/* ------------------------------------------------------------------ */

function SectionAnalysis() {
  const cycle = 6
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 400 280" width="100%" height="100%">
        {/* solid box outline */}
        <rect x="100" y="80" width="220" height="120" fill="rgba(120,160,200,0.15)" stroke="var(--ink)" strokeWidth="1.5" />
        {/* inner cavity (revealed by section) */}
        <motion.rect
          x="130"
          y="100"
          width="160"
          height="80"
          fill="var(--bg)"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.3, 0.5, 0.85, 1] }}
        />
        {/* sweeping section plane */}
        <motion.line
          x1="80" y1="40" x2="80" y2="240"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="6 4"
          animate={{ x1: [80, 210, 210, 80], x2: [80, 210, 210, 80] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.4, 0.85, 1], ease: 'easeInOut' }}
        />
        <text x="200" y="260" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
          inspect → section analysis · slide the plane to reveal internal walls
        </text>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Additional course-wide Fusion 360 recreation animations            */
/* ------------------------------------------------------------------ */

function MockCanvas({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        border: '1px solid var(--edge)',
        borderRadius: 8,
        background: 'var(--bg)',
        height: 280,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 400 280" width="100%" height="100%">
        <line x1="0" y1="210" x2="400" y2="210" stroke="var(--edge)" strokeDasharray="3 4" />
        <line x1="200" y1="0" x2="200" y2="280" stroke="var(--edge)" strokeDasharray="3 4" />
        {children}
      </svg>
    </div>
  )
}

function SolidPrimitives() {
  const items = ['Box', 'Cylinder', 'Sphere', 'Torus', 'Coil', 'Pipe']
  return (
    <MockCanvas>
      {items.map((label, i) => {
        const x = 42 + i * 63
        const selectedTimes = [0, i / items.length, (i + 0.45) / items.length, 1]
        return (
          <g key={label} transform={`translate(${x}, 76)`}>
            <motion.rect
              x="-22"
              y="-28"
              width="48"
              height="92"
              rx="6"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              animate={{ opacity: [0, 1, 0, 0] }}
              transition={{ duration: 7, repeat: Infinity, times: selectedTimes }}
            />
            {label === 'Box' && <rect x="-14" y="2" width="34" height="34" fill="rgba(120,160,200,0.18)" stroke="var(--ink)" />}
            {label === 'Cylinder' && (
              <>
                <ellipse cx="3" cy="3" rx="18" ry="8" fill="rgba(120,160,200,0.18)" stroke="var(--ink)" />
                <rect x="-15" y="3" width="36" height="42" fill="rgba(120,160,200,0.12)" stroke="var(--ink)" />
                <ellipse cx="3" cy="45" rx="18" ry="8" fill="rgba(80,120,160,0.22)" stroke="var(--ink)" />
              </>
            )}
            {label === 'Sphere' && <circle cx="3" cy="25" r="22" fill="rgba(120,160,200,0.18)" stroke="var(--ink)" />}
            {label === 'Torus' && (
              <>
                <ellipse cx="3" cy="25" rx="24" ry="16" fill="rgba(120,160,200,0.16)" stroke="var(--ink)" />
                <ellipse cx="3" cy="25" rx="10" ry="6" fill="var(--bg)" stroke="var(--accent)" />
              </>
            )}
            {label === 'Coil' && (
              <path d="M-18,48 C10,38 -18,28 10,18 C38,8 10,-2 28,-12" fill="none" stroke="var(--accent)" strokeWidth="2" />
            )}
            {label === 'Pipe' && <path d="M-18,48 C-5,5 20,5 26,-18" fill="none" stroke="var(--accent)" strokeWidth="10" strokeLinecap="round" />}
            <text x="3" y="85" fill="var(--ink-dim)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">
              {label}
            </text>
          </g>
        )
      })}
      <text x="200" y="250" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
        primitive bodies are fast starting points for real parts and placeholders
      </text>
    </MockCanvas>
  )
}

function ProfileFeatures() {
  const cycle = 8
  return (
    <MockCanvas>
      <text x="200" y="28" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
        revolve · sweep · loft · rib/web
      </text>
      <motion.g animate={{ opacity: [1, 1, 0.25, 0.25] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.24, 0.31, 1] }}>
        <line x1="82" y1="72" x2="82" y2="178" stroke="var(--accent)" strokeDasharray="4 4" />
        <path d="M82,176 L118,176 L110,96 L92,82 Z" fill="rgba(120,160,200,0.14)" stroke="var(--ink)" />
        <motion.path d="M82,82 C145,96 145,160 82,176" fill="none" stroke="var(--accent)" strokeWidth="2" animate={{ pathLength: [0, 1, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.2, 1] }} />
        <text x="100" y="204" fill="var(--ink-dim)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">revolve</text>
      </motion.g>
      <motion.g animate={{ opacity: [0.25, 0.25, 1, 1, 0.25] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.25, 0.36, 0.49, 1] }}>
        <path d="M172,180 C142,110 204,84 184,52" fill="none" stroke="var(--accent)" strokeWidth="2" />
        <motion.circle cx="172" cy="180" r="10" fill="rgba(120,160,200,0.22)" stroke="var(--ink)" animate={{ cx: [172, 150, 204, 184], cy: [180, 120, 84, 52] }} transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }} />
        <text x="172" y="204" fill="var(--ink-dim)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">sweep</text>
      </motion.g>
      <motion.g animate={{ opacity: [0.25, 0.25, 0.25, 1, 1, 0.25] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.48, 0.52, 0.62, 0.74, 1] }}>
        <ellipse cx="272" cy="170" rx="28" ry="14" fill="none" stroke="var(--accent)" />
        <ellipse cx="310" cy="82" rx="14" ry="28" fill="none" stroke="var(--accent)" />
        <path d="M244,170 C260,120 296,104 296,82 M300,170 C320,132 324,110 324,82" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <text x="292" y="204" fill="var(--ink-dim)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">loft</text>
      </motion.g>
      <motion.g animate={{ opacity: [0.25, 0.25, 0.25, 0.25, 1, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.72, 0.76, 0.8, 0.9, 1] }}>
        <rect x="318" y="150" width="52" height="24" fill="rgba(120,160,200,0.14)" stroke="var(--ink)" />
        <motion.polygon points="342,150 356,150 356,92 342,92" fill="rgba(120,160,200,0.18)" stroke="var(--accent)" animate={{ scaleY: [0, 1, 1] }} style={{ transformOrigin: '349px 150px' }} transition={{ duration: 2, repeat: Infinity }} />
        <text x="344" y="204" fill="var(--ink-dim)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">rib/web</text>
      </motion.g>
    </MockCanvas>
  )
}

function DirectEditBooleans() {
  const ops = ['Press Pull', 'Offset Face', 'Move/Copy', 'Combine', 'Split', 'Scale']
  return (
    <MockCanvas>
      {ops.map((op, i) => (
        <motion.g key={op} animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 6, repeat: Infinity, delay: i * 0.55 }}>
          <rect x={35 + i * 58} y="92" width="42" height="60" fill="rgba(120,160,200,0.16)" stroke="var(--ink)" />
          <circle cx={56 + i * 58} cy="122" r="14" fill={op === 'Combine' ? 'rgba(80,120,160,0.26)' : 'var(--bg)'} stroke="var(--accent)" />
          {op === 'Split' && <line x1={35 + i * 58} y1="122" x2={77 + i * 58} y2="122" stroke="var(--accent)" strokeDasharray="4 3" />}
          {op === 'Move/Copy' && <path d={`M${48 + i * 58},70 L${72 + i * 58},70 M72,70 L64,64 M72,70 L64,76`} stroke="var(--accent)" fill="none" />}
          {op === 'Scale' && <path d={`M${50 + i * 58},78 L${70 + i * 58},58 M70,58 L70,72 M70,58 L56,58`} stroke="var(--accent)" fill="none" />}
          <text x={56 + i * 58} y="184" fill="var(--ink-dim)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">{op}</text>
        </motion.g>
      ))}
      <text x="200" y="246" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
        direct edits change faces/bodies; booleans join, cut, intersect, or split solids
      </text>
    </MockCanvas>
  )
}

function ConstructionInspect() {
  const cycle = 6
  return (
    <MockCanvas>
      <motion.polygon points="90,196 300,196 330,160 120,160" fill="rgba(120,160,200,0.14)" stroke="var(--ink)" />
      <motion.line x1="90" y1="90" x2="330" y2="70" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 4" animate={{ y1: [90, 120, 90], y2: [70, 102, 70] }} transition={{ duration: cycle, repeat: Infinity }} />
      <motion.line x1="200" y1="60" x2="200" y2="220" stroke="var(--accent)" strokeWidth="2" animate={{ rotate: [0, 35, -25, 0] }} style={{ transformOrigin: '200px 140px' }} transition={{ duration: cycle, repeat: Infinity }} />
      <motion.g animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.25, 0.78, 1] }}>
        <line x1="124" y1="206" x2="290" y2="206" stroke="var(--ink)" />
        <text x="207" y="226" fill="var(--accent)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">measure: 166.0 mm</text>
      </motion.g>
      <text x="200" y="38" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
        construction plane + axis + measure references
      </text>
    </MockCanvas>
  )
}

function MeshRepairSuite() {
  const cycle = 7
  return (
    <MockCanvas>
      {Array.from({ length: 16 }).map((_, i) => {
        const col = i % 4
        const row = Math.floor(i / 4)
        return (
          <motion.polygon
            key={i}
            points={`${92 + col * 28},${70 + row * 28} ${118 + col * 28},${78 + row * 28} ${104 + col * 28},${100 + row * 28}`}
            fill={i === 6 || i === 10 ? 'var(--bg)' : 'rgba(120,160,200,0.14)'}
            stroke={i === 6 || i === 10 ? 'var(--accent)' : 'var(--ink-dim)'}
            strokeWidth="1"
            animate={{ opacity: i === 6 || i === 10 ? [0.15, 1, 0.15] : [0.65, 0.9, 0.65] }}
            transition={{ duration: cycle, repeat: Infinity, delay: i * 0.05 }}
          />
        )
      })}
      <motion.path d="M235,78 C292,62 326,100 314,150 C302,202 238,198 218,158 C196,116 210,86 235,78 Z" fill="rgba(120,160,200,0.14)" stroke="var(--ink)" />
      <motion.path d="M246,122 C270,105 294,116 294,146 C274,138 256,140 246,122 Z" fill="var(--bg)" stroke="var(--accent)" animate={{ opacity: [1, 0.15, 1] }} transition={{ duration: cycle, repeat: Infinity }} />
      <motion.path d="M246,122 C270,105 294,116 294,146 C274,138 256,140 246,122 Z" fill="rgba(120,160,200,0.24)" stroke="var(--accent)" animate={{ opacity: [0, 1, 0] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.55, 1] }} />
      <text x="200" y="246" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
        repair holes · erase/fill bad triangles · close mesh · reverse normals
      </text>
    </MockCanvas>
  )
}

function MeshSectionConvert() {
  const cycle = 7
  return (
    <MockCanvas>
      <motion.path d="M80,170 C95,96 145,70 200,94 C260,120 292,90 322,158 C280,202 136,210 80,170 Z" fill="rgba(120,160,200,0.12)" stroke="var(--ink-dim)" />
      <motion.line x1="56" y1="140" x2="344" y2="140" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 4" animate={{ y1: [92, 140, 140], y2: [92, 140, 140] }} transition={{ duration: cycle, repeat: Infinity }} />
      <motion.path d="M92,140 C130,126 174,152 210,140 C250,128 288,134 318,140" fill="none" stroke="var(--accent)" strokeWidth="3" animate={{ pathLength: [0, 0, 1, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.35, 0.62, 1] }} />
      <motion.rect x="146" y="172" width="120" height="38" fill="rgba(120,160,200,0.18)" stroke="var(--ink)" animate={{ opacity: [0, 0, 0.2, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.55, 0.68, 1] }} />
      <text x="200" y="246" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
        create mesh section sketch → trace clean curves → convert/rebuild solid
      </text>
    </MockCanvas>
  )
}

function SketchShapeSuite() {
  const labels = ['Rectangle', 'Circle', 'Arc', 'Polygon', 'Ellipse', 'Slot', 'Spline', 'Text']
  return (
    <MockCanvas>
      {labels.map((label, i) => {
        const x = 54 + (i % 4) * 96
        const y = 70 + Math.floor(i / 4) * 92
        return (
          <motion.g key={label} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.35, ease: EASE }}>
            {label === 'Rectangle' && <rect x={x - 22} y={y} width="44" height="28" fill="none" stroke="var(--accent)" strokeWidth="2" />}
            {label === 'Circle' && <circle cx={x} cy={y + 14} r="18" fill="none" stroke="var(--accent)" strokeWidth="2" />}
            {label === 'Arc' && <path d={`M${x - 24},${y + 28} Q${x},${y - 12} ${x + 24},${y + 28}`} fill="none" stroke="var(--accent)" strokeWidth="2" />}
            {label === 'Polygon' && <polygon points={`${x},${y-4} ${x+24},${y+12} ${x+14},${y+38} ${x-14},${y+38} ${x-24},${y+12}`} fill="none" stroke="var(--accent)" strokeWidth="2" />}
            {label === 'Ellipse' && <ellipse cx={x} cy={y + 18} rx="28" ry="13" fill="none" stroke="var(--accent)" strokeWidth="2" />}
            {label === 'Slot' && <path d={`M${x - 22},${y + 10} L${x + 22},${y + 10} A14,14 0 0 1 ${x + 22},${y + 38} L${x - 22},${y + 38} A14,14 0 0 1 ${x - 22},${y + 10}`} fill="none" stroke="var(--accent)" strokeWidth="2" />}
            {label === 'Spline' && <path d={`M${x - 30},${y + 32} C${x - 10},${y - 10} ${x + 12},${y + 52} ${x + 30},${y + 10}`} fill="none" stroke="var(--accent)" strokeWidth="2" />}
            {label === 'Text' && <text x={x} y={y + 28} fill="var(--accent)" fontSize="22" fontFamily="var(--font-display, var(--font-mono))" textAnchor="middle">ABC</text>}
            <text x={x} y={y + 60} fill="var(--ink-dim)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">{label}</text>
          </motion.g>
        )
      })}
    </MockCanvas>
  )
}

function SketchEditSuite() {
  const labels = ['Project', 'Intersect', 'Offset', 'Trim', 'Extend', 'Break', 'Scale', 'Dimension']
  return (
    <MockCanvas>
      {labels.map((label, i) => {
        const x = 54 + (i % 4) * 96
        const y = 74 + Math.floor(i / 4) * 92
        return (
          <motion.g key={label} animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 5, repeat: Infinity, delay: i * 0.35 }}>
            <path d={`M${x - 26},${y + 28} H${x + 26}`} stroke="var(--ink-dim)" strokeWidth="1.5" />
            {label === 'Offset' && <path d={`M${x - 26},${y + 15} H${x + 26}`} stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 3" />}
            {label === 'Trim' && <path d={`M${x - 18},${y + 8} L${x + 18},${y + 48} M${x - 18},${y + 48} L${x + 18},${y + 8}`} stroke="var(--accent)" strokeWidth="2" />}
            {label === 'Extend' && <line x1={x + 26} y1={y + 28} x2={x + 42} y2={y + 28} stroke="var(--accent)" strokeWidth="2" strokeDasharray="4 3" />}
            {label === 'Break' && <path d={`M${x - 5},${y + 20} L${x - 13},${y + 36} M${x + 13},${y + 20} L${x + 5},${y + 36}`} stroke="var(--accent)" strokeWidth="2" />}
            {label === 'Scale' && <rect x={x - 14} y={y + 12} width="28" height="28" fill="none" stroke="var(--accent)" strokeWidth="2" />}
            {label === 'Dimension' && <text x={x} y={y + 16} fill="var(--accent)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">42 mm</text>}
            {(label === 'Project' || label === 'Intersect') && <circle cx={x} cy={y + 28} r="14" fill="none" stroke="var(--accent)" strokeWidth="2" />}
            <text x={x} y={y + 60} fill="var(--ink-dim)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">{label}</text>
          </motion.g>
        )
      })}
    </MockCanvas>
  )
}

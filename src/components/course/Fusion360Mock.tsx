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
  | 'animation-workspace'
  | 'animation-scratch-zone'
  | 'animation-transform-components'
  | 'animation-render-output'

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
  'animation-workspace': 'Animation — workspace overview',
  'animation-scratch-zone': 'Animation — scratch zone + camera',
  'animation-transform-components': 'Animation — transform components',
  'animation-render-output': 'Render — output animation',
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
          <FusionUiShell variant={variant}>{renderVariant(variant)}</FusionUiShell>
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

/* ============================================================== */
/*  Fusion 360 visual system — palette, icons, ViewCube, primitives */
/* ============================================================== */

const FT = {
  // Classic Fusion 360 light theme (matches Lars Christensen sketch tutorial UI)
  titleBar: '#3D3D3D',
  titleText: '#E0E0E0',
  appBar: '#5C5C5C',
  appBarText: '#F0F0F0',
  workspacePill: '#3F4F66',
  workspacePillHover: '#56698A',
  ribbon: '#E6E6E6',
  ribbonRow2: '#D9D9D9',
  ribbonHover: '#CFE3F4',
  ribbonActive: '#B5D7EE',
  panel: '#EDEDED',
  panelDeep: '#D6D6D6',
  divider: '#B0B0B0',
  stroke: '#9A9A9A',
  strokeSoft: '#C8C8C8',
  text: '#1F1F1F',
  textDim: '#555555',
  textSubtle: '#7A7A7A',
  accent: '#F58220',     // Fusion orange (Stop Sketch button, active accents)
  accentSoft: '#FBC798',
  tabBlue: '#2778C4',    // Active ribbon tab text
  selBlue: '#1B79C0',
  selBlueSoft: '#CEE3F2',
  sketchBlue: '#1E6FB6', // sketch line
  sketchPlane: '#FFFFFF',
  // Cream / peach Fusion sketch-profile fill
  profileFill: '#F8E5C5',
  profileEdge: '#C9A06B',
  // Dimension blue
  dimLine: '#1E6FB6',
  dimText: '#1F1F1F',
  // Shaded body 3-tone (top/front/side) — matches Fusion's default body appearance on the white canvas
  bodyTop: '#E2E5EA',
  bodyFront: '#B8BEC8',
  bodySide: '#8B93A0',
  bodyEdge: '#1F1F1F',
  bodyEdgeDim: '#5C6473',
  ghost: 'rgba(30,111,182,0.08)',
  ghostEdge: '#1E6FB6',
  originX: '#E14B4B',
  originY: '#34B859',
  originZ: '#2E8FD6',
  // White Fusion canvas
  canvasA: '#FFFFFF',
  canvasB: '#F2F2F2',
  horizon: 'rgba(0,0,0,0.10)',
  shadow: '0 1px 0 rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.08)',
  font: 'var(--font-sans)',
} as const

type IconName =
  | 'sketch' | 'extrude' | 'revolve' | 'sweep' | 'loft'
  | 'hole' | 'fillet' | 'chamfer' | 'shell' | 'pattern' | 'mirror' | 'combine'
  | 'line' | 'rect' | 'circle' | 'arc' | 'polygon' | 'slot'
  | 'trim' | 'extend' | 'offset' | 'dimension'
  | 'box' | 'cylinder' | 'sphere' | 'torus'
  | 'plane' | 'axis' | 'point' | 'measure' | 'section'
  | 'joint' | 'rigid' | 'revolute' | 'slider'
  | 'orbit' | 'pan' | 'zoom' | 'fit' | 'lookAt' | 'display' | 'grid' | 'viewports'
  | 'save' | 'undo' | 'redo' | 'newFile' | 'file'
  | 'eye' | 'chevronR' | 'chevronD' | 'folder' | 'component' | 'body' | 'sketchNode'
  | 'play' | 'stepF' | 'stepB' | 'toStart' | 'toEnd' | 'transform' | 'storyboard' | 'annotation' | 'publish' | 'view'
  | 'render' | 'appearance' | 'scene' | 'output'
  | 'meshCreate' | 'meshModify' | 'meshRepair' | 'meshPrepare' | 'meshInspect'
  | 'horiz' | 'vert' | 'coincident' | 'parallel' | 'perp' | 'tangent' | 'equal' | 'fix'
  | 'plus' | 'check'

function FusionIcon({
  name,
  size = 16,
  color = FT.text,
}: {
  name: IconName
  size?: number
  color?: string
}) {
  const s = size
  const sw = 1.4
  const common = {
    width: s,
    height: s,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: sw,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (name) {
    case 'sketch':
      return (
        <svg {...common}>
          <path d="M4 18 L20 4" />
          <circle cx="4" cy="18" r="1.6" fill={color} />
          <circle cx="20" cy="4" r="1.6" fill={color} />
          <path d="M9 18 L18 18" stroke={FT.sketchBlue} />
        </svg>
      )
    case 'extrude':
      return (
        <svg {...common}>
          <rect x="4" y="11" width="9" height="9" />
          <path d="M4 11 L8 7 L17 7 L13 11" />
          <path d="M13 20 L17 16 L17 7" />
          <path d="M13 11 L17 7" stroke={FT.textDim} />
          <path d="M9 4 L9 9" stroke={FT.accent} />
          <path d="M7 6 L9 4 L11 6" stroke={FT.accent} />
        </svg>
      )
    case 'revolve':
      return (
        <svg {...common}>
          <ellipse cx="12" cy="12" rx="6" ry="3" />
          <path d="M6 12 L6 6" />
          <path d="M18 12 L18 18" />
          <path d="M3 4 L3 20" stroke={FT.accent} />
        </svg>
      )
    case 'sweep':
      return (
        <svg {...common}>
          <path d="M3 18 C 8 18 8 6 14 6 S 21 14 21 14" />
          <circle cx="3" cy="18" r="1.6" fill={color} />
          <rect x="11" y="3" width="6" height="6" transform="rotate(15 14 6)" />
        </svg>
      )
    case 'loft':
      return (
        <svg {...common}>
          <ellipse cx="6" cy="18" rx="3" ry="1.4" />
          <ellipse cx="18" cy="6" rx="3" ry="1.4" />
          <path d="M3 18 L15 6 M9 18 L21 6" />
        </svg>
      )
    case 'hole':
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="14" />
          <circle cx="12" cy="13" r="3" fill={FT.panelDeep} />
          <path d="M12 3 L12 7" stroke={FT.accent} />
          <path d="M10 5 L12 3 L14 5" stroke={FT.accent} />
        </svg>
      )
    case 'fillet':
      return (
        <svg {...common}>
          <path d="M4 20 L4 10 Q 4 4 10 4 L20 4" />
          <path d="M4 4 L10 4 L10 10" stroke={FT.textDim} strokeDasharray="2 2" />
        </svg>
      )
    case 'chamfer':
      return (
        <svg {...common}>
          <path d="M4 20 L4 10 L10 4 L20 4" />
          <path d="M4 4 L10 4 L10 10" stroke={FT.textDim} strokeDasharray="2 2" />
        </svg>
      )
    case 'shell':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" />
          <rect x="6" y="6" width="12" height="12" stroke={FT.textDim} />
        </svg>
      )
    case 'pattern':
      return (
        <svg {...common}>
          <rect x="3" y="3" width="6" height="6" />
          <rect x="15" y="3" width="6" height="6" />
          <rect x="3" y="15" width="6" height="6" />
          <rect x="15" y="15" width="6" height="6" />
        </svg>
      )
    case 'mirror':
      return (
        <svg {...common}>
          <path d="M12 3 L12 21" strokeDasharray="2 2" />
          <path d="M9 7 L4 12 L9 17 Z" />
          <path d="M15 7 L20 12 L15 17 Z" />
        </svg>
      )
    case 'combine':
      return (
        <svg {...common}>
          <circle cx="9" cy="12" r="5" />
          <circle cx="15" cy="12" r="5" />
        </svg>
      )
    case 'line':
      return <svg {...common}><path d="M4 20 L20 4" /><circle cx="4" cy="20" r="1.4" fill={color} /><circle cx="20" cy="4" r="1.4" fill={color} /></svg>
    case 'rect':
      return <svg {...common}><rect x="4" y="6" width="16" height="12" /></svg>
    case 'circle':
      return <svg {...common}><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="1" fill={color} /></svg>
    case 'arc':
      return <svg {...common}><path d="M4 18 A 8 8 0 0 1 20 18" /><circle cx="4" cy="18" r="1.4" fill={color} /><circle cx="20" cy="18" r="1.4" fill={color} /></svg>
    case 'polygon':
      return <svg {...common}><path d="M12 4 L20 9 L17 19 L7 19 L4 9 Z" /></svg>
    case 'slot':
      return <svg {...common}><path d="M8 8 L16 8 A 4 4 0 0 1 16 16 L8 16 A 4 4 0 0 1 8 8 Z" /></svg>
    case 'trim':
      return <svg {...common}><path d="M4 20 L20 4" /><circle cx="9" cy="15" r="2" stroke={FT.accent} /><circle cx="15" cy="9" r="2" stroke={FT.accent} /></svg>
    case 'extend':
      return <svg {...common}><path d="M3 12 L17 12" /><path d="M14 9 L17 12 L14 15" /><path d="M19 6 L19 18" stroke={FT.accent} /></svg>
    case 'offset':
      return <svg {...common}><rect x="6" y="6" width="12" height="12" /><rect x="3" y="3" width="18" height="18" stroke={FT.textDim} strokeDasharray="2 2" /></svg>
    case 'dimension':
      return <svg {...common}><path d="M4 8 L4 16" /><path d="M20 8 L20 16" /><path d="M4 12 L20 12" /><path d="M6 10 L4 12 L6 14" /><path d="M18 10 L20 12 L18 14" /></svg>
    case 'box':
      return <svg {...common}><path d="M4 8 L12 4 L20 8 L20 18 L12 22 L4 18 Z" /><path d="M4 8 L12 12 L20 8 M12 12 L12 22" /></svg>
    case 'cylinder':
      return <svg {...common}><ellipse cx="12" cy="6" rx="6" ry="2" /><path d="M6 6 L6 18" /><path d="M18 6 L18 18" /><ellipse cx="12" cy="18" rx="6" ry="2" /></svg>
    case 'sphere':
      return <svg {...common}><circle cx="12" cy="12" r="8" /><ellipse cx="12" cy="12" rx="8" ry="3" stroke={FT.textDim} /></svg>
    case 'torus':
      return <svg {...common}><ellipse cx="12" cy="12" rx="9" ry="4" /><ellipse cx="12" cy="12" rx="3" ry="1.4" stroke={FT.textDim} /></svg>
    case 'plane':
      return <svg {...common}><path d="M4 8 L20 4 L20 16 L4 20 Z" /></svg>
    case 'axis':
      return <svg {...common}><path d="M4 20 L20 4" /><path d="M16 4 L20 4 L20 8" /></svg>
    case 'point':
      return <svg {...common}><circle cx="12" cy="12" r="2" fill={color} /><path d="M12 4 L12 8 M12 16 L12 20 M4 12 L8 12 M16 12 L20 12" /></svg>
    case 'measure':
      return <svg {...common}><path d="M3 14 L14 3 L21 10 L10 21 Z" /><path d="M7 12 L9 14 M11 8 L14 11 M14 16 L17 13" /></svg>
    case 'section':
      return <svg {...common}><rect x="4" y="4" width="16" height="16" /><path d="M4 4 L20 20" stroke={FT.accent} strokeDasharray="2 2" /></svg>
    case 'joint':
    case 'rigid':
      return <svg {...common}><circle cx="8" cy="12" r="3" /><circle cx="16" cy="12" r="3" /><path d="M11 12 L13 12" /></svg>
    case 'revolute':
      return <svg {...common}><circle cx="12" cy="12" r="6" /><path d="M12 6 L12 18 M6 12 L18 12" stroke={FT.accent} /></svg>
    case 'slider':
      return <svg {...common}><rect x="3" y="10" width="18" height="4" /><circle cx="14" cy="12" r="3" fill={FT.panel} /></svg>
    case 'orbit':
      return <svg {...common}><circle cx="12" cy="12" r="7" /><ellipse cx="12" cy="12" rx="7" ry="3" stroke={FT.textDim} /><circle cx="12" cy="12" r="1.4" fill={color} /></svg>
    case 'pan':
      return <svg {...common}><path d="M12 4 L12 20 M4 12 L20 12" /><path d="M9 7 L12 4 L15 7 M9 17 L12 20 L15 17 M7 9 L4 12 L7 15 M17 9 L20 12 L17 15" /></svg>
    case 'zoom':
      return <svg {...common}><circle cx="11" cy="11" r="6" /><path d="M16 16 L21 21" /><path d="M8 11 L14 11 M11 8 L11 14" /></svg>
    case 'fit':
      return <svg {...common}><path d="M4 8 L4 4 L8 4 M16 4 L20 4 L20 8 M20 16 L20 20 L16 20 M8 20 L4 20 L4 16" /></svg>
    case 'lookAt':
      return <svg {...common}><path d="M2 12 C 6 5 18 5 22 12 C 18 19 6 19 2 12 Z" /><circle cx="12" cy="12" r="3" /></svg>
    case 'display':
      return <svg {...common}><circle cx="12" cy="12" r="3" /><path d="M12 4 L12 6 M12 18 L12 20 M4 12 L6 12 M18 12 L20 12 M6 6 L7.5 7.5 M16.5 16.5 L18 18 M6 18 L7.5 16.5 M16.5 7.5 L18 6" /></svg>
    case 'grid':
      return <svg {...common}><path d="M4 9 L20 9 M4 15 L20 15 M9 4 L9 20 M15 4 L15 20" /><rect x="4" y="4" width="16" height="16" /></svg>
    case 'viewports':
      return <svg {...common}><rect x="3" y="3" width="18" height="18" /><path d="M12 3 L12 21 M3 12 L21 12" /></svg>
    case 'save':
      return <svg {...common}><path d="M4 4 L17 4 L20 7 L20 20 L4 20 Z" /><rect x="7" y="4" width="9" height="6" /><rect x="7" y="14" width="10" height="6" /></svg>
    case 'undo':
      return <svg {...common}><path d="M9 7 L4 12 L9 17" /><path d="M4 12 L15 12 A 5 5 0 0 1 15 22" /></svg>
    case 'redo':
      return <svg {...common}><path d="M15 7 L20 12 L15 17" /><path d="M20 12 L9 12 A 5 5 0 0 0 9 22" /></svg>
    case 'newFile':
    case 'file':
      return <svg {...common}><path d="M6 3 L14 3 L19 8 L19 21 L6 21 Z" /><path d="M14 3 L14 8 L19 8" /></svg>
    case 'eye':
      return <svg {...common}><path d="M2 12 C 6 5 18 5 22 12 C 18 19 6 19 2 12 Z" /><circle cx="12" cy="12" r="3" /></svg>
    case 'chevronR':
      return <svg {...common}><path d="M9 5 L15 12 L9 19" /></svg>
    case 'chevronD':
      return <svg {...common}><path d="M5 9 L12 15 L19 9" /></svg>
    case 'folder':
      return <svg {...common}><path d="M3 6 L9 6 L11 8 L21 8 L21 19 L3 19 Z" /></svg>
    case 'component':
      return <svg {...common}><path d="M4 8 L12 4 L20 8 L20 16 L12 20 L4 16 Z" /><circle cx="12" cy="12" r="2" fill={FT.selBlue} /></svg>
    case 'body':
      return <svg {...common}><path d="M4 8 L12 4 L20 8 L20 16 L12 20 L4 16 Z" fill={FT.bodyFront} /></svg>
    case 'sketchNode':
      return <svg {...common}><path d="M4 18 L20 6" stroke={FT.sketchBlue} /><circle cx="4" cy="18" r="1.6" fill={FT.sketchBlue} /><circle cx="20" cy="6" r="1.6" fill={FT.sketchBlue} /></svg>
    case 'play':
      return <svg {...common}><path d="M7 4 L20 12 L7 20 Z" fill={color} /></svg>
    case 'stepF':
      return <svg {...common}><path d="M5 4 L16 12 L5 20 Z" fill={color} /><path d="M18 4 L18 20" /></svg>
    case 'stepB':
      return <svg {...common}><path d="M19 4 L8 12 L19 20 Z" fill={color} /><path d="M6 4 L6 20" /></svg>
    case 'toStart':
      return <svg {...common}><path d="M21 4 L10 12 L21 20 Z" fill={color} /><path d="M6 4 L6 20" /></svg>
    case 'toEnd':
      return <svg {...common}><path d="M3 4 L14 12 L3 20 Z" fill={color} /><path d="M18 4 L18 20" /></svg>
    case 'transform':
      return <svg {...common}><path d="M12 3 L12 21 M3 12 L21 12" /><path d="M9 6 L12 3 L15 6 M9 18 L12 21 L15 18 M6 9 L3 12 L6 15 M18 9 L21 12 L18 15" /></svg>
    case 'storyboard':
      return <svg {...common}><rect x="3" y="6" width="6" height="12" /><rect x="11" y="6" width="6" height="12" /><rect x="19" y="6" width="2" height="12" /></svg>
    case 'annotation':
      return <svg {...common}><path d="M3 5 L21 5 L21 16 L13 16 L9 20 L9 16 L3 16 Z" /></svg>
    case 'publish':
      return <svg {...common}><path d="M12 3 L12 16 M7 8 L12 3 L17 8" /><path d="M4 17 L4 21 L20 21 L20 17" /></svg>
    case 'view':
      return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M12 4 L12 20 M4 12 L20 12" stroke={FT.textDim} /></svg>
    case 'render':
      return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M12 4 A 8 8 0 0 1 20 12" stroke={FT.accent} strokeWidth="2.4" /></svg>
    case 'appearance':
      return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M6 12 A 6 6 0 0 1 18 12" stroke={FT.selBlue} /><path d="M6 12 A 6 6 0 0 0 18 12" stroke={FT.accent} /></svg>
    case 'scene':
      return <svg {...common}><rect x="3" y="6" width="18" height="12" /><path d="M3 14 L8 10 L13 13 L21 6" /><circle cx="17" cy="9" r="1.5" fill={FT.accent} /></svg>
    case 'output':
      return <svg {...common}><path d="M4 14 L4 20 L20 20 L20 14" /><path d="M12 4 L12 16 M7 9 L12 4 L17 9" /></svg>
    case 'meshCreate':
      return <svg {...common}><path d="M4 18 L12 4 L20 18 Z" /><path d="M4 18 L12 12 L20 18 M12 4 L12 12" /></svg>
    case 'meshModify':
      return <svg {...common}><path d="M4 18 L12 4 L20 18 Z" /><circle cx="12" cy="12" r="2" fill={FT.accent} /></svg>
    case 'meshRepair':
      return <svg {...common}><path d="M4 18 L12 4 L20 18 Z" /><path d="M9 13 L12 16 L17 9" stroke={FT.accent} strokeWidth="2" /></svg>
    case 'meshPrepare':
      return <svg {...common}><path d="M4 18 L12 4 L20 18 Z" /><path d="M8 18 L16 18" stroke={FT.accent} /></svg>
    case 'meshInspect':
      return <svg {...common}><path d="M4 18 L12 4 L20 18 Z" /><circle cx="12" cy="13" r="3" /></svg>
    case 'horiz':
      return <svg {...common}><path d="M4 12 L20 12" /><path d="M4 8 L4 16 M20 8 L20 16" stroke={FT.textDim} /></svg>
    case 'vert':
      return <svg {...common}><path d="M12 4 L12 20" /><path d="M8 4 L16 4 M8 20 L16 20" stroke={FT.textDim} /></svg>
    case 'coincident':
      return <svg {...common}><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="6" stroke={FT.textDim} /></svg>
    case 'parallel':
      return <svg {...common}><path d="M6 4 L18 12" /><path d="M6 12 L18 20" /></svg>
    case 'perp':
      return <svg {...common}><path d="M4 20 L20 20 M12 20 L12 4" /><rect x="12" y="16" width="4" height="4" stroke={FT.textDim} /></svg>
    case 'tangent':
      return <svg {...common}><circle cx="12" cy="14" r="6" /><path d="M2 8 L22 8" /></svg>
    case 'equal':
      return <svg {...common}><path d="M4 9 L20 9 M4 15 L20 15" /></svg>
    case 'fix':
      return <svg {...common}><path d="M5 5 L19 19 M19 5 L5 19" stroke={FT.accent} /></svg>
    case 'plus':
      return <svg {...common}><path d="M12 4 L12 20 M4 12 L20 12" /></svg>
    case 'check':
      return <svg {...common}><path d="M5 12 L10 17 L20 6" stroke={FT.accent} strokeWidth="2.2" /></svg>
    default:
      return <svg {...common}><rect x="4" y="4" width="16" height="16" /></svg>
  }
}

/* 3-face isometric ViewCube. `face` chooses the highlighted face. */
function ViewCube({ face = 'home' as 'home' | 'top' | 'front' | 'right' }) {
  // Classic light Fusion ViewCube: gray faces, dark edges, dark labels.
  const hi = (target: string) => (face === target ? '#FFE2C2' : '#F4F4F4')
  return (
    <svg width="58" height="58" viewBox="0 0 62 62">
      <path d="M31 10 L52 22 L31 34 L10 22 Z" fill={hi('top')} stroke="#3A3A3A" strokeWidth="1" strokeLinejoin="round" />
      <path d="M10 22 L31 34 L31 54 L10 42 Z" fill={hi('front')} stroke="#3A3A3A" strokeWidth="1" strokeLinejoin="round" />
      <path d="M52 22 L31 34 L31 54 L52 42 Z" fill={hi('right')} stroke="#3A3A3A" strokeWidth="1" strokeLinejoin="round" />
      <text x="31" y="25" fill="#3A3A3A" fontSize="6.5" fontFamily="var(--font-sans)" textAnchor="middle">TOP</text>
      <text x="20" y="46" fill="#3A3A3A" fontSize="6" fontFamily="var(--font-sans)" textAnchor="middle">FRONT</text>
      <text x="42" y="46" fill="#3A3A3A" fontSize="6" fontFamily="var(--font-sans)" textAnchor="middle">RIGHT</text>
    </svg>
  )
}

function BottomViewBar() {
  // Bottom-of-canvas toolbar: orbit, look-at, pan, zoom, fit, display, grid, viewports.
  const items: IconName[] = ['orbit', 'lookAt', 'pan', 'zoom', 'fit', 'display', 'grid', 'viewports']
  return (
    <div
      style={{
        display: 'inline-flex',
        gap: 4,
        padding: '4px 10px',
        background: '#EFEFEF',
        borderTop: `1px solid ${FT.divider}`,
        borderLeft: `1px solid ${FT.divider}`,
        borderRight: `1px solid ${FT.divider}`,
        borderRadius: '6px 6px 0 0',
      }}
    >
      {items.map((n, i) => (
        <span
          key={n}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 22,
            height: 20,
          }}
        >
          <FusionIcon name={n} size={14} color={FT.textDim} />
          {(i === 2 || i === 4 || i === 6) && (
            <FusionIcon name="chevronD" size={8} color={FT.textSubtle} />
          )}
        </span>
      ))}
    </div>
  )
}

function OriginGizmo() {
  // Tiny RGB origin marker drawn in canvas (top-left corner area).
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" style={{ position: 'absolute', left: 8, top: 8 }}>
      <circle cx="3" cy="11" r="3" fill="#FFC04A" stroke="#1F1F1F" strokeWidth="0.6" />
    </svg>
  )
}


/* ============================================================== */
/*  Workspace + ribbon + browser + timeline maps                   */
/* ============================================================== */

type Workspace = 'Design' | 'Sketch' | 'Mesh' | 'Animation' | 'Render' | 'Drawing'

function workspaceForVariant(variant: Fusion360MockVariant): Workspace {
  if (variant.startsWith('mesh') || variant === 'plane-cut-mesh') return 'Mesh'
  if (variant === 'animation-render-output' || variant === 'export-formats') return 'Render'
  if (variant.startsWith('animation')) return 'Animation'
  if (
    variant === 'sketch-constraints' ||
    variant === 'sketch-tools' ||
    variant === 'sketch-shape-suite' ||
    variant === 'sketch-edit-suite'
  ) {
    return 'Sketch'
  }
  return 'Design'
}

type RibbonGroup = { name: string; tools: { icon: IconName; label: string }[] }

function ribbonForWorkspace(ws: Workspace): { tabs: string[]; activeTab: string; groups: RibbonGroup[] } {
  if (ws === 'Sketch') {
    return {
      tabs: ['SKETCH'],
      activeTab: 'SKETCH',
      groups: [
        { name: 'CREATE', tools: [
          { icon: 'line', label: 'Line' },
          { icon: 'rect', label: 'Rect' },
          { icon: 'circle', label: 'Circle' },
          { icon: 'arc', label: 'Arc' },
          { icon: 'polygon', label: 'Poly' },
          { icon: 'slot', label: 'Slot' },
        ] },
        { name: 'MODIFY', tools: [
          { icon: 'fillet', label: 'Fillet' },
          { icon: 'trim', label: 'Trim' },
          { icon: 'extend', label: 'Extend' },
          { icon: 'offset', label: 'Offset' },
        ] },
        { name: 'CONSTRAIN', tools: [
          { icon: 'horiz', label: 'H' },
          { icon: 'vert', label: 'V' },
          { icon: 'coincident', label: 'Coinc' },
          { icon: 'parallel', label: 'Par' },
          { icon: 'perp', label: 'Perp' },
          { icon: 'tangent', label: 'Tan' },
          { icon: 'equal', label: 'Equal' },
          { icon: 'fix', label: 'Fix' },
        ] },
        { name: 'INSPECT', tools: [
          { icon: 'dimension', label: 'Sketch Dim' },
        ] },
        { name: 'FINISH', tools: [
          { icon: 'check', label: 'Finish Sketch' },
        ] },
      ],
    }
  }
  if (ws === 'Mesh') {
    return {
      tabs: ['SOLID', 'SURFACE', 'MESH', 'SHEET METAL', 'PLASTIC', 'UTILITIES'],
      activeTab: 'MESH',
      groups: [
        { name: 'CREATE', tools: [
          { icon: 'meshCreate', label: 'Create' },
          { icon: 'plane', label: 'Plane' },
        ] },
        { name: 'MODIFY', tools: [
          { icon: 'meshModify', label: 'Modify' },
          { icon: 'section', label: 'Plane Cut' },
          { icon: 'combine', label: 'Combine' },
        ] },
        { name: 'REPAIR', tools: [
          { icon: 'meshRepair', label: 'Repair' },
        ] },
        { name: 'PREPARE', tools: [
          { icon: 'meshPrepare', label: 'Reduce' },
        ] },
        { name: 'INSPECT', tools: [
          { icon: 'meshInspect', label: 'Inspect' },
          { icon: 'measure', label: 'Measure' },
        ] },
      ],
    }
  }
  if (ws === 'Animation') {
    return {
      tabs: ['ANIMATION'],
      activeTab: 'ANIMATION',
      groups: [
        { name: 'STORYBOARD', tools: [{ icon: 'storyboard', label: 'New' }] },
        { name: 'TRANSFORM', tools: [
          { icon: 'transform', label: 'Transform' },
          { icon: 'orbit', label: 'Restore' },
        ] },
        { name: 'ANNOTATION', tools: [{ icon: 'annotation', label: 'Callout' }] },
        { name: 'VIEW', tools: [{ icon: 'view', label: 'View' }] },
        { name: 'PUBLISH', tools: [{ icon: 'publish', label: 'Publish' }] },
      ],
    }
  }
  if (ws === 'Render') {
    return {
      tabs: ['RENDER'],
      activeTab: 'RENDER',
      groups: [
        { name: 'SETUP', tools: [{ icon: 'scene', label: 'Scene' }] },
        { name: 'APPEARANCE', tools: [
          { icon: 'appearance', label: 'Appearance' },
          { icon: 'display', label: 'Decals' },
        ] },
        { name: 'RENDER', tools: [
          { icon: 'render', label: 'In‑canvas' },
          { icon: 'play', label: 'Render' },
        ] },
        { name: 'OUTPUT', tools: [
          { icon: 'output', label: 'Export' },
        ] },
      ],
    }
  }
  // Design (default)
  return {
    tabs: ['SOLID', 'SURFACE', 'MESH', 'SHEET METAL', 'PLASTIC', 'UTILITIES'],
    activeTab: 'SOLID',
    groups: [
      { name: 'CREATE', tools: [
        { icon: 'sketch', label: 'Sketch' },
        { icon: 'extrude', label: 'Extrude' },
        { icon: 'revolve', label: 'Revolve' },
        { icon: 'sweep', label: 'Sweep' },
        { icon: 'loft', label: 'Loft' },
        { icon: 'box', label: 'Box' },
        { icon: 'cylinder', label: 'Cyl' },
        { icon: 'hole', label: 'Hole' },
      ] },
      { name: 'MODIFY', tools: [
        { icon: 'fillet', label: 'Fillet' },
        { icon: 'chamfer', label: 'Chamfer' },
        { icon: 'shell', label: 'Shell' },
        { icon: 'pattern', label: 'Pattern' },
        { icon: 'mirror', label: 'Mirror' },
        { icon: 'combine', label: 'Combine' },
      ] },
      { name: 'ASSEMBLE', tools: [
        { icon: 'joint', label: 'Joint' },
        { icon: 'rigid', label: 'Rigid' },
      ] },
      { name: 'CONSTRUCT', tools: [
        { icon: 'plane', label: 'Plane' },
        { icon: 'axis', label: 'Axis' },
        { icon: 'point', label: 'Point' },
      ] },
      { name: 'INSPECT', tools: [
        { icon: 'measure', label: 'Measure' },
        { icon: 'section', label: 'Section' },
      ] },
    ],
  }
}

type BrowserNode = { icon: IconName; label: string; level: number; expanded?: boolean; eye?: boolean; selected?: boolean }

function browserTreeForVariant(variant: Fusion360MockVariant): BrowserNode[] {
  const ws = workspaceForVariant(variant)
  if (ws === 'Animation') {
    return [
      { icon: 'folder', label: 'Pathfinder Design v3', level: 0, expanded: true, eye: true },
      { icon: 'storyboard', label: 'Storyboard1', level: 1, expanded: true, eye: true, selected: true },
      { icon: 'view', label: 'View', level: 2, eye: true },
      { icon: 'component', label: 'Components', level: 2, expanded: true, eye: true },
      { icon: 'body', label: 'Bezel_v1', level: 3, eye: true },
      { icon: 'body', label: 'Battery_v1', level: 3, eye: true },
      { icon: 'body', label: 'Enclosure_v1', level: 3, eye: true },
    ]
  }
  if (ws === 'Mesh') {
    return [
      { icon: 'folder', label: 'Pathfinder Design v3', level: 0, expanded: true, eye: true },
      { icon: 'folder', label: 'Document Settings', level: 1, eye: true },
      { icon: 'folder', label: 'Named Views', level: 1, eye: true },
      { icon: 'point', label: 'Origin', level: 1, eye: true },
      { icon: 'body', label: 'Mesh Bodies', level: 1, expanded: true, eye: true },
      { icon: 'body', label: 'Scan_input', level: 2, eye: true, selected: true },
    ]
  }
  if (ws === 'Sketch') {
    return [
      { icon: 'folder', label: 'Pathfinder Design v3', level: 0, expanded: true, eye: true },
      { icon: 'point', label: 'Origin', level: 1, expanded: true, eye: true },
      { icon: 'plane', label: 'XY', level: 2, eye: true },
      { icon: 'plane', label: 'XZ', level: 2, eye: true },
      { icon: 'plane', label: 'YZ', level: 2, eye: true },
      { icon: 'sketchNode', label: 'Sketches', level: 1, expanded: true, eye: true },
      { icon: 'sketchNode', label: 'Sketch1', level: 2, eye: true, selected: true },
    ]
  }
  return [
    { icon: 'folder', label: 'Pathfinder Design v3', level: 0, expanded: true, eye: true },
    { icon: 'folder', label: 'Document Settings', level: 1, eye: true },
    { icon: 'folder', label: 'Named Views', level: 1, eye: true },
    { icon: 'point', label: 'Origin', level: 1, eye: true },
    { icon: 'body', label: 'Bodies', level: 1, expanded: true, eye: true },
    { icon: 'body', label: 'Body1', level: 2, eye: true, selected: true },
    { icon: 'sketchNode', label: 'Sketches', level: 1, expanded: true, eye: true },
    { icon: 'sketchNode', label: 'Sketch1', level: 2, eye: true },
  ]
}

type TimelineFeature = { icon: IconName; label: string }

function timelineFeaturesForVariant(variant: Fusion360MockVariant): TimelineFeature[] {
  const ws = workspaceForVariant(variant)
  if (ws === 'Animation') {
    return [
      { icon: 'storyboard', label: '0.0' },
      { icon: 'transform', label: '1.0' },
      { icon: 'transform', label: '2.0' },
      { icon: 'view', label: '3.0' },
    ]
  }
  if (ws === 'Mesh') {
    return [
      { icon: 'meshCreate', label: 'Insert' },
      { icon: 'meshRepair', label: 'Repair' },
      { icon: 'meshPrepare', label: 'Reduce' },
      { icon: 'section', label: 'Plane Cut' },
    ]
  }
  if (ws === 'Sketch') {
    return [
      { icon: 'sketch', label: 'Sketch1' },
      { icon: 'dimension', label: 'Dim' },
    ]
  }
  return [
    { icon: 'sketch', label: 'Sketch1' },
    { icon: 'extrude', label: 'Extrude1' },
    { icon: 'fillet', label: 'Fillet1' },
    { icon: 'hole', label: 'Hole1' },
  ]
}

/* ============================================================== */
/*  FusionUiShell — classic light Fusion 360 chrome                 */
/* ============================================================== */

function SketchPalette() {
  const options: { label: string; checked?: boolean; icon?: IconName }[] = [
    { label: 'Look At', icon: 'lookAt' },
    { label: 'Sketch Grid', checked: false },
    { label: 'Snap', checked: true },
    { label: 'Slice' },
    { label: 'Show Profile', checked: true },
    { label: 'Show Points', checked: true },
    { label: 'Show Constraints', checked: true },
    { label: '3D Sketch' },
  ]
  const constraints: { label: string; icon: IconName }[] = [
    { label: 'Coincident', icon: 'coincident' },
    { label: 'Colinear', icon: 'horiz' },
    { label: 'Concentric', icon: 'circle' },
    { label: 'Midpoint', icon: 'point' },
    { label: 'Fix/UnFix', icon: 'fix' },
    { label: 'Parallel', icon: 'parallel' },
    { label: 'Perpendicular', icon: 'perp' },
    { label: 'Horizontal/Vertical', icon: 'horiz' },
  ]
  return (
    <div
      style={{
        background: FT.panel,
        borderLeft: `1px solid ${FT.divider}`,
        fontSize: 10.5,
        color: FT.text,
        width: 168,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 8px',
          background: FT.panelDeep,
          borderBottom: `1px solid ${FT.divider}`,
          fontSize: 10,
          letterSpacing: '0.08em',
        }}
      >
        <span style={{ color: FT.tabBlue }}>●</span>
        <span style={{ fontWeight: 600 }}>SKETCH PALETTE</span>
        <span style={{ marginLeft: 'auto', color: FT.textDim }}>▸</span>
      </div>
      <div style={{ padding: '4px 8px', color: FT.textDim, fontSize: 10, fontWeight: 600 }}>▾ Options</div>
      {options.map((o) => (
        <div
          key={o.label}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 10px 2px 16px', fontSize: 10.5 }}
        >
          <span>{o.label}</span>
          {o.icon ? (
            <FusionIcon name={o.icon} size={11} color={FT.textDim} />
          ) : (
            <span
              style={{
                width: 11,
                height: 11,
                border: `1px solid ${FT.stroke}`,
                background: o.checked ? FT.tabBlue : '#FFFFFF',
                display: 'inline-block',
              }}
            />
          )}
        </div>
      ))}
      <div style={{ padding: '6px 8px 4px', color: FT.textDim, fontSize: 10, fontWeight: 600 }}>▾ Constraints</div>
      {constraints.map((c) => (
        <div
          key={c.label}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 10px 2px 16px', fontSize: 10.5 }}
        >
          <span>{c.label}</span>
          <FusionIcon name={c.icon} size={11} color={FT.tabBlue} />
        </div>
      ))}
    </div>
  )
}

function FusionUiShell({
  variant,
  children,
}: {
  variant: Fusion360MockVariant
  children: ReactNode
}) {
  const ws = workspaceForVariant(variant)
  const ribbon = ribbonForWorkspace(ws)
  const tree = browserTreeForVariant(variant)
  const timeline = timelineFeaturesForVariant(variant)
  const showSketchPalette = ws === 'Sketch'

  return (
    <div
      style={{
        border: `1px solid ${FT.divider}`,
        borderRadius: 4,
        overflow: 'hidden',
        background: FT.panel,
        color: FT.text,
        fontFamily: FT.font,
        boxShadow: FT.shadow,
      }}
    >
      {/* Title bar — dark gray with file name */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          height: 22,
          padding: '0 10px',
          background: FT.titleBar,
          color: FT.titleText,
          fontSize: 10.5,
        }}
      >
        <span style={{ display: 'inline-flex', gap: 4, marginRight: 4 }}>
          <FusionIcon name="folder" size={11} color={FT.titleText} />
          <FusionIcon name="newFile" size={11} color={FT.titleText} />
          <FusionIcon name="save" size={11} color={FT.titleText} />
          <FusionIcon name="undo" size={11} color={FT.titleText} />
          <FusionIcon name="redo" size={11} color={FT.titleText} />
        </span>
        <div style={{ flex: 1, textAlign: 'center', letterSpacing: '0.02em' }}>Autodesk Fusion 360</div>
        <span style={{ color: FT.titleText, fontSize: 10 }}>Pathfinder Engineering ▾</span>
      </div>

      {/* Document tab strip */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          height: 22,
          background: FT.appBar,
          padding: '0 10px',
          borderBottom: `1px solid ${FT.divider}`,
          gap: 4,
        }}
      >
        <span
          style={{
            padding: '3px 14px 3px 10px',
            background: FT.ribbon,
            border: `1px solid ${FT.divider}`,
            borderBottom: 'none',
            borderRadius: '3px 3px 0 0',
            fontSize: 10.5,
            color: FT.text,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          Pathfinder Design v3*
          <span style={{ color: FT.textDim, marginLeft: 4 }}>×</span>
        </span>
      </div>

      {/* Ribbon: workspace pill + tabs row + tools row */}
      <div style={{ background: FT.ribbon, borderBottom: `1px solid ${FT.divider}` }}>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          {/* Workspace pill (MODEL / SKETCH / etc.) */}
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px 14px',
              background: FT.workspacePill,
              color: '#FFFFFF',
              borderRight: `1px solid ${FT.divider}`,
              minWidth: 64,
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em' }}>
              {ws === 'Design' ? 'MODEL' : ws.toUpperCase()}
            </span>
            <FusionIcon name="chevronD" size={9} color="#FFFFFF" />
          </div>
          {/* Tools row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', flex: 1, padding: '2px 4px 2px 0', overflowX: 'auto' }}>
            {ribbon.groups.map((g) => (
              <div key={g.name} style={{ display: 'flex', alignItems: 'flex-end', borderRight: `1px solid ${FT.divider}`, padding: '0 2px' }}>
                {g.tools.map((tool, ti) => (
                  <motion.div
                    key={`${g.name}-${tool.label}`}
                    whileHover={{ background: FT.ribbonHover }}
                    animate={{ opacity: [0.95, 1, 0.95] }}
                    transition={{ duration: 4 + ti * 0.2, repeat: Infinity, delay: ti * 0.08 }}
                    style={{
                      display: 'inline-flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                      padding: '4px 6px 2px',
                      minWidth: 40,
                    }}
                  >
                    <FusionIcon name={tool.icon} size={22} color={FT.text} />
                    <span style={{ fontSize: 9, color: FT.text }}>{tool.label}</span>
                    {ti === 0 && g.tools.length > 1 && (
                      <FusionIcon name="chevronD" size={7} color={FT.textSubtle} />
                    )}
                  </motion.div>
                ))}
                <div style={{ alignSelf: 'flex-end', fontSize: 8, color: FT.textSubtle, letterSpacing: '0.1em', padding: '0 4px 2px' }}>{g.name}</div>
              </div>
            ))}
            {ws === 'Sketch' && (
              <div
                style={{
                  marginLeft: 'auto',
                  alignSelf: 'center',
                  padding: '6px 14px',
                  background: FT.accent,
                  color: '#FFFFFF',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  borderRadius: 2,
                  marginRight: 6,
                }}
              >
                STOP SKETCH
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body: browser + canvas (+ optional sketch palette) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: showSketchPalette ? '160px minmax(0, 1fr) 168px' : '180px minmax(0, 1fr)',
          minHeight: 360,
        }}
      >
        {/* Browser */}
        <div
          style={{
            background: FT.panel,
            borderRight: `1px solid ${FT.divider}`,
            fontSize: 11,
            color: FT.text,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 10,
              letterSpacing: '0.08em',
              color: FT.text,
              padding: '5px 8px',
              borderBottom: `1px solid ${FT.divider}`,
              background: FT.panelDeep,
              fontWeight: 600,
            }}
          >
            <span style={{ color: FT.tabBlue }}>▸</span>
            BROWSER
          </div>
          <div style={{ padding: '4px 0' }}>
            {tree.map((n, i) => (
              <motion.div
                key={`${n.label}-${i}`}
                animate={n.selected ? { background: ['#D4E6F4', '#C0DCEF', '#D4E6F4'] } : {}}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '2px 6px',
                  paddingLeft: 6 + n.level * 12,
                  background: n.selected ? '#D4E6F4' : 'transparent',
                  color: FT.text,
                }}
              >
                <FusionIcon name={n.expanded ? 'chevronD' : 'chevronR'} size={9} color={FT.textDim} />
                {n.eye && <FusionIcon name="eye" size={11} color={FT.textDim} />}
                <FusionIcon name={n.icon} size={12} color={n.icon === 'sketchNode' ? FT.tabBlue : FT.textDim} />
                <span style={{ fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{n.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div
          style={{
            position: 'relative',
            minWidth: 0,
            background: `linear-gradient(180deg, ${FT.canvasA} 0%, ${FT.canvasB} 100%)`,
            overflow: 'hidden',
          }}
        >
          <OriginGizmo />
          {/* ViewCube */}
          <div style={{ position: 'absolute', top: 8, right: 10, zIndex: 4 }}>
            <ViewCube face="home" />
          </div>
          {/* Inner scene */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>{children}</div>
          {/* Bottom view toolbar */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: 0,
              zIndex: 5,
            }}
          >
            <BottomViewBar />
          </div>
          {/* COMMENTS strip */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              padding: '3px 10px',
              background: FT.panel,
              borderTop: `1px solid ${FT.divider}`,
              color: FT.textDim,
              fontSize: 9,
              letterSpacing: '0.08em',
              zIndex: 1,
            }}
          >
            COMMENTS
          </div>
        </div>

        {showSketchPalette && <SketchPalette />}
      </div>

      {/* Timeline */}
      <div
        style={{
          background: '#F5F5F5',
          borderTop: `1px solid ${FT.divider}`,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 10px',
          fontSize: 10,
          color: FT.textDim,
        }}
      >
        <span style={{ display: 'inline-flex', gap: 2 }}>
          <FusionIcon name="toStart" size={11} color={FT.textDim} />
          <FusionIcon name="stepB" size={11} color={FT.textDim} />
          <FusionIcon name="play" size={11} color={FT.text} />
          <FusionIcon name="stepF" size={11} color={FT.textDim} />
          <FusionIcon name="toEnd" size={11} color={FT.textDim} />
        </span>
        <span style={{ width: 1, height: 14, background: FT.divider, margin: '0 4px' }} />
        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', gap: 6, height: 22 }}>
          <div style={{ position: 'absolute', left: 6, right: 60, top: '50%', height: 1, background: FT.divider }} />
          {timeline.map((f, i) => (
            <motion.div
              key={`${f.label}-${i}`}
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.25 }}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '2px 6px',
                borderRadius: 2,
                background: '#FFFFFF',
                border: `1px solid ${FT.strokeSoft}`,
                color: FT.text,
                zIndex: 1,
              }}
            >
              <FusionIcon name={f.icon} size={11} color={FT.text} />
              <span style={{ fontSize: 10 }}>{f.label}</span>
            </motion.div>
          ))}
          <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, color: FT.textSubtle, fontSize: 10 }}>
            <FusionIcon name="plus" size={11} color={FT.textSubtle} /> end
          </span>
        </div>
        <span style={{ width: 1, height: 14, background: FT.divider }} />
        <span style={{ fontSize: 9, letterSpacing: '0.06em', color: FT.textDim }}>Units: mm</span>
        <span style={{ fontSize: 9, color: FT.accent, letterSpacing: '0.06em' }}>● Parametric</span>
      </div>
    </div>
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
    case 'animation-workspace':
      return <AnimationWorkspace />
    case 'animation-scratch-zone':
      return <AnimationScratchZone />
    case 'animation-transform-components':
      return <AnimationTransformComponents />
    case 'animation-render-output':
      return <AnimationRenderOutput />
  }
}

/* ============================================================== */
/*  Hero variant: workspace-map                                    */
/* ============================================================== */

function WorkspaceMap() {
  const items = [
    { name: 'Design', icon: 'extrude' as IconName, sub: 'Solid · Surface · Sheet metal' },
    { name: 'Generative Design', icon: 'sphere' as IconName, sub: 'Goal-driven shape studies' },
    { name: 'Render', icon: 'render' as IconName, sub: 'Materials · ray-traced views' },
    { name: 'Animation', icon: 'transform' as IconName, sub: 'Exploded views · motion' },
    { name: 'Simulation', icon: 'measure' as IconName, sub: 'Stress · modal · thermal' },
    { name: 'Manufacture', icon: 'meshPrepare' as IconName, sub: 'CAM · toolpaths · post' },
    { name: 'Drawing', icon: 'file' as IconName, sub: '2D drafting · sheets' },
    { name: 'Mesh', icon: 'meshCreate' as IconName, sub: 'STL repair · conversion' },
  ]
  return (
    <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 3 }}>
      {/* Switcher pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px 10px',
          border: `1px solid ${FT.stroke}`,
          background: '#FFFFFF',
          borderRadius: 4,
          fontSize: 12,
          color: FT.text,
          boxShadow: FT.shadow,
        }}
      >
        <FusionIcon name="extrude" size={14} color={FT.text} />
        Design
        <FusionIcon name="chevronD" size={11} color={FT.textDim} />
      </div>
      {/* Dropdown menu */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{
          marginTop: 4,
          background: '#FFFFFF',
          border: `1px solid ${FT.stroke}`,
          borderRadius: 4,
          width: 280,
          boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
          overflow: 'hidden',
        }}
      >
        {items.map((it, i) => (
          <motion.div
            key={it.name}
            animate={{ background: ['#FFFFFF', i === 3 ? '#FEEAD3' : '#FFFFFF', '#FFFFFF'] }}
            transition={{ duration: 6, repeat: Infinity, delay: i * 0.5, times: [0, 0.5, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 12px',
              borderTop: i === 0 ? 'none' : `1px solid ${FT.strokeSoft}`,
              fontSize: 12,
              color: FT.text,
            }}
          >
            <FusionIcon name={it.icon} size={18} color={i === 3 ? FT.accent : FT.text} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 500 }}>{it.name}</span>
              <span style={{ fontSize: 10, color: FT.textDim }}>{it.sub}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

/* ============================================================== */
/*  Hero variant: interface-tour                                   */
/* ============================================================== */

function InterfaceTour() {
  // Annotated callouts pointing at shell regions visible behind us.
  const stops = [
    { x: 18, y: 12, label: '1 · Application bar', text: 'File, save, undo · workspace switcher' },
    { x: 42, y: 14, label: '2 · Ribbon', text: 'Grouped tool icons for the active workspace' },
    { x: 6, y: 60, label: '3 · Browser', text: 'Document tree: origin, bodies, sketches, components' },
    { x: 88, y: 18, label: '4 · ViewCube', text: 'Click faces to snap to standard views' },
    { x: 50, y: 92, label: '5 · Navigation bar', text: 'Orbit · pan · zoom · fit' },
    { x: 50, y: 100, label: '6 · Timeline', text: 'Parametric history of every feature' },
  ]
  const cycle = stops.length * 1.6
  return (
    <>
      {stops.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: cycle, repeat: Infinity, times: [i / stops.length, (i + 0.05) / stops.length, (i + 0.95) / stops.length, (i + 1) / stops.length], delay: 0 }}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: 'translate(-50%, -50%)',
            background: '#FFFFFF',
            border: `1px solid ${FT.stroke}`,
            borderRadius: 4,
            padding: '6px 10px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.14)',
            zIndex: 6,
            minWidth: 150,
          }}
        >
          <div style={{ fontSize: 9, letterSpacing: '0.08em', color: FT.accent, fontWeight: 600 }}>{s.label}</div>
          <div style={{ fontSize: 10.5, color: FT.text, marginTop: 2 }}>{s.text}</div>
          <span
            style={{
              position: 'absolute',
              left: '50%',
              bottom: -5,
              transform: 'translateX(-50%) rotate(45deg)',
              width: 8,
              height: 8,
              background: '#FFFFFF',
              borderRight: `1px solid ${FT.stroke}`,
              borderBottom: `1px solid ${FT.stroke}`,
            }}
          />
        </motion.div>
      ))}
      {/* Cursor */}
      <motion.div
        animate={{
          left: stops.map((s) => `${s.x}%`),
          top: stops.map((s) => `${s.y}%`),
        }}
        transition={{ duration: cycle, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', zIndex: 7, pointerEvents: 'none' }}
      >
        <svg width="18" height="22" viewBox="0 0 18 22">
          <path d="M2 2 L2 18 L7 14 L10 20 L13 19 L10 13 L16 13 Z" fill="#FFFFFF" stroke="#000" strokeWidth="1" />
        </svg>
      </motion.div>
    </>
  )
}

/* ============================================================== */
/*  Hero variant: sketch-constraints                               */
/* ============================================================== */

function SketchConstraints() {
  // Replica of the classic Fusion 360 sketch view: angled L-shape profile with
  // cream fill, blue dimension lines (60.00 / 80.00 / 25.00 x2 / 50.0°),
  // black sketch outline, right-angle corner squares, midpoint markers,
  // small fix-pin icon at lower-left origin.
  //
  // Profile vertices (matches the screenshot proportions):
  //   A (60, 240)   lower-left  (origin / fixed)
  //   B (340, 240)  lower-right
  //   C (340, 170)  inner-corner
  //   D (430,  90)  upper-right (50° wedge tip)
  //   E (370,  30)  upper-left of wedge
  //   F (60,  170)  inner-top-left
  //
  // Animation: profile fades in → black outlines snap → cream fill blooms →
  // dimensions draw → constraint glyphs appear.
  const cycle = 7
  const profile = '60,240 340,240 430,90 370,30 60,170'
  return (
    <svg viewBox="0 0 540 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3 }}>
      {/* cream profile fill */}
      <motion.polygon
        points={profile}
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.25, 0.45, 1] }}
        fill={FT.profileFill}
        stroke={FT.profileEdge}
        strokeWidth="0.6"
      />

      {/* sketch lines (black) */}
      <motion.polygon
        points={profile}
        animate={{ opacity: [0.3, 1, 1, 1] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.3, 0.45, 1] }}
        fill="none"
        stroke="#1F1F1F"
        strokeWidth="1.2"
        strokeLinejoin="miter"
      />

      {/* sketch endpoints (small white squares) */}
      {[
        [60, 240], [340, 240], [430, 90], [370, 30], [60, 170],
      ].map(([x, y], i) => (
        <rect key={i} x={x - 3} y={y - 3} width="6" height="6" fill="#FFFFFF" stroke="#1F1F1F" strokeWidth="0.8" />
      ))}

      {/* fix pin (orange tack) at lower-left origin */}
      <motion.g animate={{ opacity: [0, 0, 1, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.3, 0.4, 1] }}>
        <line x1="60" y1="248" x2="60" y2="265" stroke={FT.accent} strokeWidth="1.4" strokeDasharray="2 2" />
        <line x1="55" y1="248" x2="65" y2="248" stroke={FT.accent} strokeWidth="1.4" strokeDasharray="2 2" />
        <circle cx="60" cy="240" r="3" fill="#FFFFFF" stroke={FT.accent} strokeWidth="1.4" />
      </motion.g>

      {/* perpendicular corner squares (small) */}
      {[
        { x: 60, y: 240, dx: 1, dy: -1 },
        { x: 340, y: 240, dx: -1, dy: -1 },
        { x: 340, y: 170, dx: -1, dy: 1 },
        { x: 60, y: 170, dx: 1, dy: 1 },
      ].map((c, i) => (
        <motion.rect
          key={i}
          x={c.dx > 0 ? c.x + 2 : c.x - 9}
          y={c.dy > 0 ? c.y + 2 : c.y - 9}
          width="7"
          height="7"
          fill="#FFFFFF"
          stroke={FT.text}
          strokeWidth="0.8"
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.45, 0.55, 1] }}
        />
      ))}

      {/* midpoint markers (small black triangles) */}
      <motion.polygon
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.5, 0.6, 1] }}
        points="200,234 196,228 204,228"
        fill="#1F1F1F"
      />
      <motion.polygon
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.5, 0.6, 1] }}
        points="200,176 196,170 204,170"
        fill="#1F1F1F"
      />

      {/* DIMENSIONS (blue) */}
      {/* 25.00 — left side of wedge (vertical block on left) */}
      <motion.g
        animate={{ opacity: [0, 0, 0, 1, 1] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.5, 0.6, 0.7, 1] }}
        stroke={FT.dimLine}
        fill={FT.dimLine}
        strokeWidth="0.9"
      >
        {/* extension lines */}
        <line x1="60" y1="170" x2="20" y2="170" />
        <line x1="60" y1="240" x2="20" y2="240" />
        {/* dim line w/ arrows */}
        <line x1="28" y1="170" x2="28" y2="240" />
        <polygon points="28,170 25,177 31,177" />
        <polygon points="28,240 25,233 31,233" />
        <text x="32" y="207" fontSize="11" fontFamily="var(--font-sans)" fill={FT.dimText}>25.00</text>
      </motion.g>

      {/* 25.00 — angled along the upper-right wedge */}
      <motion.g
        animate={{ opacity: [0, 0, 0, 1, 1] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.5, 0.65, 0.75, 1] }}
        stroke={FT.dimLine}
        fill={FT.dimLine}
        strokeWidth="0.9"
      >
        <line x1="370" y1="30" x2="395" y2="0" />
        <line x1="430" y1="90" x2="455" y2="60" />
        <line x1="383" y1="15" x2="442" y2="75" />
        <polygon points="383,15 388,20 380,22" />
        <polygon points="442,75 437,70 445,68" />
        <text x="408" y="35" fontSize="11" fontFamily="var(--font-sans)" fill={FT.dimText} transform="rotate(45 410 38)">25.00</text>
      </motion.g>

      {/* 60.00 — bottom horizontal */}
      <motion.g
        animate={{ opacity: [0, 0, 0, 1, 1] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.55, 0.7, 0.8, 1] }}
        stroke={FT.dimLine}
        fill={FT.dimLine}
        strokeWidth="0.9"
      >
        <line x1="60" y1="240" x2="60" y2="262" />
        <line x1="340" y1="240" x2="340" y2="262" />
        <line x1="60" y1="258" x2="340" y2="258" />
        <polygon points="60,258 67,255 67,261" />
        <polygon points="340,258 333,255 333,261" />
        <text x="200" y="255" fontSize="11" fontFamily="var(--font-sans)" textAnchor="middle" fill={FT.dimText}>60.00</text>
      </motion.g>

      {/* 80.00 — full bottom horizontal */}
      <motion.g
        animate={{ opacity: [0, 0, 0, 1, 1] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.6, 0.75, 0.85, 1] }}
        stroke={FT.dimLine}
        fill={FT.dimLine}
        strokeWidth="0.9"
      >
        <line x1="60" y1="240" x2="60" y2="290" />
        <line x1="430" y1="90" x2="430" y2="290" />
        <line x1="60" y1="286" x2="430" y2="286" />
        <polygon points="60,286 67,283 67,289" />
        <polygon points="430,286 423,283 423,289" />
        <text x="245" y="282" fontSize="11" fontFamily="var(--font-sans)" textAnchor="middle" fill={FT.dimText}>80.00</text>
      </motion.g>

      {/* 50.0° angle */}
      <motion.g
        animate={{ opacity: [0, 0, 0, 1, 1] }}
        transition={{ duration: cycle, repeat: Infinity, times: [0, 0.65, 0.78, 0.88, 1] }}
        stroke={FT.dimLine}
        fill={FT.dimLine}
        strokeWidth="0.9"
      >
        <path d="M 410 165 A 70 70 0 0 0 430 95" fill="none" />
        <text x="430" y="155" fontSize="11" fontFamily="var(--font-sans)" fill={FT.dimText}>50.0°</text>
      </motion.g>

      {/* fully constrained badge */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 0, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.8, 0.9, 1] }}>
        <rect x="370" y="265" width="120" height="18" rx="2" fill={FT.profileFill} stroke={FT.profileEdge} />
        <text x="430" y="278" fontSize="10" fontFamily={FT.font} textAnchor="middle" fill={FT.text}>● Fully constrained</text>
      </motion.g>
    </svg>
  )
}

/* ============================================================== */
/*  Hero variant: solid-extrude                                    */
/* ============================================================== */

function SolidExtrude() {
  const cycle = 7
  // Iso projection (30°): cube w=d=h=100 centred at (260,200).
  // A (0,0,0)=(260,200) B (100,0,0)=(347,250) C (100,100,0)=(260,300) D (0,100,0)=(173,250)
  // A'(0,0,100)=(260,100) B'(100,0,100)=(347,150) C'(100,100,100)=(260,200) D'(0,100,100)=(173,150)
  const top = '260,100 347,150 260,200 173,150'
  const front = '260,200 347,250 347,150 260,100'
  const right = '347,250 260,300 260,200 347,150'
  const sketchProfile = '260,200 347,250 260,300 173,250'
  return (
    <>
      {/* Right-docked Extrude dialog (classic light Fusion) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          position: 'absolute',
          top: 18,
          right: 24,
          zIndex: 5,
          width: 178,
          background: FT.panel,
          border: `1px solid ${FT.divider}`,
          borderRadius: 2,
          boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
          fontSize: 10,
          color: FT.text,
          fontFamily: FT.font,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 8px', borderBottom: `1px solid ${FT.divider}`, background: FT.panelDeep }}>
          <FusionIcon name="extrude" size={14} color={FT.text} />
          <span style={{ fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase' }}>Extrude</span>
          <span style={{ marginLeft: 'auto', color: FT.textDim, fontSize: 12 }}>×</span>
        </div>
        {[
          ['Type', 'Distance'],
          ['Profile', '1 selected'],
          ['Start', 'Profile Plane'],
          ['Direction', 'One Side'],
          ['Distance', '25.00 mm'],
          ['Taper Angle', '0.0 deg'],
          ['Operation', 'New Body'],
        ].map(([k, v], i) => (
          <div
            key={k}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '4px 8px',
              borderTop: i === 0 ? 'none' : `1px solid ${FT.strokeSoft}`,
              background: i % 2 === 0 ? FT.panel : '#F4F4F4',
            }}
          >
            <span style={{ color: FT.textDim }}>{k}</span>
            <span style={{ color: k === 'Distance' ? FT.dimLine : FT.text, fontWeight: k === 'Distance' ? 600 : 400 }}>{v}</span>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 6, padding: 8, borderTop: `1px solid ${FT.divider}`, background: FT.panelDeep }}>
          <span style={{ flex: 1, textAlign: 'center', padding: '4px 0', background: FT.tabBlue, color: '#FFF', borderRadius: 2, fontWeight: 600 }}>OK</span>
          <span style={{ flex: 1, textAlign: 'center', padding: '4px 0', background: FT.panel, color: FT.text, border: `1px solid ${FT.divider}`, borderRadius: 2 }}>Cancel</span>
        </div>
      </motion.div>

      {/* Canvas scene */}
      <svg viewBox="0 0 480 320" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3 }}>
        {/* Stage 1: sketch profile (cream filled rectangle on XY plane) */}
        <motion.g
          animate={{ opacity: [1, 1, 0.4, 0.4] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.25, 0.4, 1] }}
        >
          <polygon points={sketchProfile} fill={FT.profileFill} stroke={FT.profileEdge} strokeWidth="0.6" />
          <polygon points={sketchProfile} fill="none" stroke="#1F1F1F" strokeWidth="1.2" />
          {sketchProfile.split(' ').map((pt, i) => {
            const [x, y] = pt.split(',').map(Number)
            return <rect key={i} x={x - 3} y={y - 3} width="6" height="6" fill="#FFFFFF" stroke="#1F1F1F" strokeWidth="0.8" />
          })}
        </motion.g>

        {/* Stage 2: ghost preview pulling up */}
        <motion.g
          animate={{ opacity: [0, 0, 0.95, 0.95, 0] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.3, 0.4, 0.55, 0.6] }}
        >
          <polygon points={top} fill={FT.ghost} stroke={FT.ghostEdge} strokeDasharray="3 3" strokeWidth="1.2" />
          <polygon points={front} fill={FT.ghost} stroke={FT.ghostEdge} strokeDasharray="3 3" strokeWidth="1.2" />
          <polygon points={right} fill={FT.ghost} stroke={FT.ghostEdge} strokeDasharray="3 3" strokeWidth="1.2" />
          {/* extrude direction arrow */}
          <line x1="260" y1="195" x2="260" y2="115" stroke={FT.accent} strokeWidth="2" />
          <polygon points="254,123 260,108 266,123" fill={FT.accent} />
          {/* distance pill */}
          <rect x="270" y="140" width="56" height="18" rx="2" fill="#FFFFFF" stroke={FT.accent} />
          <text x="298" y="153" fontSize="11" fontFamily={FT.font} textAnchor="middle" fill={FT.accent} fontWeight="600">25.00</text>
        </motion.g>

        {/* Stage 3: committed shaded body */}
        <motion.g
          animate={{ opacity: [0, 0, 0, 1, 1] }}
          transition={{ duration: cycle, repeat: Infinity, times: [0, 0.55, 0.62, 0.7, 1] }}
        >
          {/* Right (mid tone) */}
          <polygon points={right} fill={FT.bodyFront} stroke={FT.bodyEdge} strokeWidth="1.2" strokeLinejoin="round" />
          {/* Front (darkest) */}
          <polygon points={front} fill={FT.bodySide} stroke={FT.bodyEdge} strokeWidth="1.2" strokeLinejoin="round" />
          {/* Top (lightest) */}
          <polygon points={top} fill={FT.bodyTop} stroke={FT.bodyEdge} strokeWidth="1.2" strokeLinejoin="round" />
          {/* fillet edge highlight on the top-front edge */}
          <motion.path
            animate={{ opacity: [0, 0, 0, 1] }}
            transition={{ duration: cycle, repeat: Infinity, times: [0, 0.78, 0.88, 1] }}
            d="M260 100 Q 305 122 347 150"
            stroke={FT.accent}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </>
  )
}

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

function AnimationWorkspace() {
  const items = ['Transform', 'Trail Line', 'Annotation', 'Storyboard', 'Publish']
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
      <div
        style={{
          position: 'absolute',
          inset: '0 0 auto 0',
          height: 42,
          borderBottom: '1px solid var(--edge)',
          background: 'var(--bg-2)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '0 12px',
        }}
      >
        <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>Workspace: Animation</span>
        {items.map((item, i) => (
          <motion.span
            key={item}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: i * 0.35 }}
            style={{
              border: '1px solid var(--edge)',
              borderRadius: 4,
              padding: '4px 7px',
              color: 'var(--ink-dim)',
              fontFamily: 'var(--font-mono)',
              fontSize: 9,
            }}
          >
            {item}
          </motion.span>
        ))}
      </div>
      <svg viewBox="0 0 400 280" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <line x1="0" y1="218" x2="400" y2="218" stroke="var(--edge)" />
        <motion.g animate={{ x: [0, 0, -18, -18], y: [0, 0, 8, 8] }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.35, 0.7, 1] }}>
          <rect x="140" y="104" width="120" height="70" fill="rgba(120,160,200,0.16)" stroke="var(--ink)" />
          <circle cx="176" cy="138" r="18" fill="var(--bg)" stroke="var(--accent)" />
          <rect x="206" y="122" width="34" height="32" fill="rgba(80,120,160,0.26)" stroke="var(--ink)" />
        </motion.g>
        <motion.path d="M176,138 C230,88 285,110 320,70" fill="none" stroke="var(--accent)" strokeDasharray="5 4" animate={{ pathLength: [0, 1, 1] }} transition={{ duration: 5, repeat: Infinity, times: [0, 0.55, 1] }} />
        <g transform="translate(28 238)">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.rect key={i} x={i * 34} y="0" width="24" height="18" rx="3" fill="var(--bg-2)" stroke="var(--edge)" animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 5, repeat: Infinity, delay: i * 0.18 }} />
          ))}
        </g>
        <text x="200" y="72" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
          animation workspace: storyboards, transforms, trail lines, annotations
        </text>
      </svg>
    </div>
  )
}

function AnimationScratchZone() {
  const cycle = 6
  return (
    <MockCanvas>
      <rect x="50" y="226" width="44" height="22" rx="4" fill="rgba(120,160,200,0.12)" stroke="var(--accent)" strokeDasharray="4 3" />
      <text x="72" y="263" fill="var(--ink-dim)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">scratch zone</text>
      <line x1="96" y1="237" x2="350" y2="237" stroke="var(--edge)" />
      <motion.line x1="72" y1="218" x2="72" y2="250" stroke="var(--accent)" strokeWidth="2" animate={{ x1: [0, 0, 112, 236], x2: [0, 0, 112, 236] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.28, 0.58, 1] }} />
      <motion.g animate={{ scale: [1, 1.28, 1.28, 1], x: [0, -20, -20, 0], y: [0, 12, 12, 0] }} style={{ transformOrigin: '200px 130px' }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.35, 0.75, 1] }}>
        <rect x="132" y="92" width="136" height="78" fill="rgba(120,160,200,0.16)" stroke="var(--ink)" />
        <circle cx="174" cy="130" r="18" fill="var(--bg)" stroke="var(--accent)" />
        <rect x="210" y="112" width="36" height="36" fill="rgba(80,120,160,0.28)" stroke="var(--ink)" />
      </motion.g>
      <motion.path d="M318,72 L348,56 L342,92 Z" fill="rgba(120,160,200,0.18)" stroke="var(--accent)" animate={{ rotate: [0, -12, 18, 0] }} style={{ transformOrigin: '330px 72px' }} transition={{ duration: cycle, repeat: Infinity }} />
      <text x="200" y="36" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
        set the starting camera in the scratch zone, then move the playhead forward
      </text>
    </MockCanvas>
  )
}

function AnimationTransformComponents() {
  const cycle = 7
  const parts = [
    { x: 152, y: 124, dx: -64, dy: -34, label: 'lid' },
    { x: 202, y: 124, dx: 0, dy: -58, label: 'sphere' },
    { x: 252, y: 124, dx: 66, dy: -28, label: 'case' },
  ]
  return (
    <MockCanvas>
      {parts.map((p, i) => (
        <motion.g key={p.label} animate={{ x: [0, 0, p.dx, p.dx, 0], y: [0, 0, p.dy, p.dy, 0] }} transition={{ duration: cycle, repeat: Infinity, delay: i * 0.15, times: [0, 0.25, 0.58, 0.86, 1] }}>
          {p.label === 'sphere' ? (
            <circle cx={p.x} cy={p.y} r="22" fill="rgba(120,160,200,0.18)" stroke="var(--accent)" />
          ) : (
            <rect x={p.x - 28} y={p.y - 18} width="56" height="36" fill="rgba(120,160,200,0.16)" stroke="var(--ink)" />
          )}
          <text x={p.x} y={p.y + 44} fill="var(--ink-dim)" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">{p.label}</text>
        </motion.g>
      ))}
      {parts.map((p, i) => (
        <motion.line key={p.label} x1={p.x} y1={p.y} x2={p.x + p.dx} y2={p.y + p.dy} stroke="var(--accent)" strokeDasharray="5 4" animate={{ pathLength: [0, 0, 1, 1, 0] }} transition={{ duration: cycle, repeat: Infinity, delay: i * 0.15, times: [0, 0.25, 0.58, 0.86, 1] }} />
      ))}
      <text x="200" y="36" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
        select component → Transform → pull it out where it is visible → review the timeline
      </text>
    </MockCanvas>
  )
}

function AnimationRenderOutput() {
  const cycle = 6
  return (
    <MockCanvas>
      <motion.rect x="78" y="70" width="244" height="138" rx="8" fill="rgba(120,160,200,0.10)" stroke="var(--ink)" animate={{ opacity: [0.45, 1, 1, 0.45] }} transition={{ duration: cycle, repeat: Infinity }} />
      <motion.g animate={{ x: [0, 0, 34, 64], opacity: [1, 1, 0.8, 0.35] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.35, 0.68, 1] }}>
        <rect x="118" y="112" width="62" height="40" fill="rgba(120,160,200,0.20)" stroke="var(--ink)" />
        <circle cx="214" cy="132" r="20" fill="var(--bg)" stroke="var(--accent)" />
      </motion.g>
      <motion.rect x="258" y="92" width="40" height="76" rx="5" fill="rgba(80,120,160,0.20)" stroke="var(--accent)" animate={{ opacity: [0, 0.2, 1, 1] }} transition={{ duration: cycle, repeat: Infinity, times: [0, 0.38, 0.7, 1] }} />
      <g transform="translate(92 226)">
        {['MP4', 'GIF', 'Image sequence'].map((label, i) => (
          <motion.g key={label} animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}>
            <rect x={i * 78} y="0" width="66" height="24" rx="4" fill="var(--bg-2)" stroke="var(--edge)" />
            <text x={i * 78 + 33} y="16" fill="var(--ink-dim)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">{label}</text>
          </motion.g>
        ))}
      </g>
      <text x="200" y="38" fill="var(--ink-dim)" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
        render workspace: output the reviewed animation as video, GIF, or image sequence
      </text>
    </MockCanvas>
  )
}

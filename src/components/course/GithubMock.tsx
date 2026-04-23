import { motion } from 'framer-motion'

/* ------------------------------------------------------------------ */
/*  GithubMock — styled HTML/CSS replicas of GitHub, VS Code,         */
/*  Copilot, Firebase, and Supabase UIs for the Advanced track.       */
/* ------------------------------------------------------------------ */

export type GithubMockVariant =
  | 'repo-anatomy'
  | 'code-dropdown'
  | 'codespace-launcher'
  | 'vscode-layout'
  | 'copilot-chat'
  | 'source-control'
  | 'actions-run'
  | 'pages-settings'
  | 'firebase-console'
  | 'supabase-table'
  | 'env-secrets'
  | 'copilot-models'
  | 'education-apply'
  | 'architecture-flow'

export interface GithubMockAnnotation {
  x: number
  y: number
  label: string
  note: string
}

export function GithubMock({
  variant,
  caption,
  annotations,
}: {
  variant: GithubMockVariant
  caption?: string
  annotations?: GithubMockAnnotation[]
}) {
  const label: Record<GithubMockVariant, string> = {
    'repo-anatomy': 'GitHub — repository anatomy',
    'code-dropdown': 'GitHub — the green Code button',
    'codespace-launcher': 'GitHub — create a Codespace',
    'vscode-layout': 'VS Code — Codespace layout',
    'copilot-chat': 'Copilot Chat — Agent mode',
    'source-control': 'VS Code — Source Control panel',
    'actions-run': 'GitHub Actions — workflow run',
    'pages-settings': 'GitHub Pages — repo settings',
    'firebase-console': 'Firebase — console overview',
    'supabase-table': 'Supabase — Table Editor',
    'env-secrets': 'GitHub — Actions secrets',
    'copilot-models': 'Copilot Chat — model picker',
    'education-apply': 'GitHub Education — apply',
    'architecture-flow': 'Diagram — architecture + deploy flow',
  }

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
          {label[variant]}
        </span>
      </div>
      <div style={{ position: 'relative', padding: 20 }}>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderVariant(variant)}
        </motion.div>
        {annotations?.map((a, i) => (
          <Annotation key={i} {...a} />
        ))}
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

function Annotation({ x, y, label, note }: GithubMockAnnotation) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'var(--accent)',
          color: '#000',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.1em',
          padding: '2px 6px',
          borderRadius: 4,
          whiteSpace: 'nowrap',
        }}
      >
        {label} · {note}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Shared styling primitives                                          */
/* ------------------------------------------------------------------ */

const GH_BG = '#0d1117'
const GH_SURFACE = '#161b22'
const GH_BORDER = '#30363d'
const GH_TEXT = '#c9d1d9'
const GH_MUTED = '#8b949e'
const GH_GREEN = '#2ea043'
const GH_BLUE = '#58a6ff'
const GH_YELLOW = '#d29922'
const GH_RED = '#f85149'

const VSC_BG = '#1e1e1e'
const VSC_SIDEBAR = '#181818'
const VSC_ACTIVITY = '#2c2c2c'
const VSC_TEXT = '#cccccc'
const VSC_MUTED = '#858585'
const VSC_BLUE = '#0e639c'

function Window({
  children,
  title,
  chrome = 'browser',
}: {
  children: React.ReactNode
  title?: string
  chrome?: 'browser' | 'app' | 'vscode'
}) {
  return (
    <div
      style={{
        borderRadius: 8,
        overflow: 'hidden',
        border: `1px solid ${GH_BORDER}`,
        background: chrome === 'vscode' ? VSC_BG : GH_BG,
        boxShadow: '0 10px 40px -20px rgba(0,0,0,0.6)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 12px',
          background: chrome === 'vscode' ? '#323233' : '#010409',
          borderBottom: `1px solid ${GH_BORDER}`,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: 5, background: '#ff5f57' }} />
        <span style={{ width: 10, height: 10, borderRadius: 5, background: '#febc2e' }} />
        <span style={{ width: 10, height: 10, borderRadius: 5, background: '#28c840' }} />
        {title && (
          <span
            style={{
              marginLeft: 12,
              color: GH_MUTED,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
            }}
          >
            {title}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Variant renderer                                                   */
/* ------------------------------------------------------------------ */

function renderVariant(variant: GithubMockVariant) {
  switch (variant) {
    case 'repo-anatomy':
      return <RepoAnatomy />
    case 'code-dropdown':
      return <CodeDropdown />
    case 'codespace-launcher':
      return <CodespaceLauncher />
    case 'vscode-layout':
      return <VsCodeLayout />
    case 'copilot-chat':
      return <CopilotChat />
    case 'source-control':
      return <SourceControl />
    case 'actions-run':
      return <ActionsRun />
    case 'pages-settings':
      return <PagesSettings />
    case 'firebase-console':
      return <FirebaseConsole />
    case 'supabase-table':
      return <SupabaseTable />
    case 'env-secrets':
      return <EnvSecrets />
    case 'copilot-models':
      return <CopilotModels />
    case 'education-apply':
      return <EducationApply />
    case 'architecture-flow':
      return <ArchitectureFlow />
  }
}

/* ==================================================================
 *  1. REPO ANATOMY — tabs + header + file tree stub
 * ================================================================== */
function RepoAnatomy() {
  const tabs = [
    { label: '<> Code', count: null, active: true },
    { label: 'Issues', count: 3 },
    { label: 'Pull requests', count: 1 },
    { label: 'Actions', count: null },
    { label: 'Projects', count: null },
    { label: 'Settings', count: null },
  ]
  return (
    <Window title="github.com/your-username/my-fleet-app">
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${GH_BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: GH_MUTED, fontSize: 13 }}>□</span>
          <span style={{ color: GH_BLUE, fontSize: 15, fontWeight: 600 }}>your-username</span>
          <span style={{ color: GH_MUTED }}>/</span>
          <span style={{ color: GH_TEXT, fontSize: 15, fontWeight: 600 }}>my-fleet-app</span>
          <span
            style={{
              marginLeft: 8,
              padding: '1px 7px',
              border: `1px solid ${GH_BORDER}`,
              borderRadius: 999,
              fontSize: 11,
              color: GH_MUTED,
            }}
          >
            Public
          </span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 18,
          padding: '0 18px',
          borderBottom: `1px solid ${GH_BORDER}`,
          overflowX: 'auto',
        }}
      >
        {tabs.map((t) => (
          <div
            key={t.label}
            style={{
              padding: '10px 4px',
              borderBottom: t.active ? `2px solid ${'#f78166'}` : '2px solid transparent',
              color: t.active ? GH_TEXT : GH_MUTED,
              fontSize: 13,
              whiteSpace: 'nowrap',
              display: 'flex',
              gap: 6,
              alignItems: 'center',
            }}
          >
            {t.label}
            {t.count != null && (
              <span
                style={{
                  background: GH_SURFACE,
                  border: `1px solid ${GH_BORDER}`,
                  borderRadius: 999,
                  padding: '0 6px',
                  fontSize: 11,
                }}
              >
                {t.count}
              </span>
            )}
          </div>
        ))}
      </div>
      <div style={{ padding: 18, display: 'flex', gap: 12, alignItems: 'center' }}>
        <select
          style={{
            background: GH_SURFACE,
            color: GH_TEXT,
            border: `1px solid ${GH_BORDER}`,
            padding: '4px 10px',
            borderRadius: 6,
            fontSize: 12,
          }}
          disabled
        >
          <option>main</option>
        </select>
        <span style={{ color: GH_MUTED, fontSize: 12 }}>1 branch · 3 commits</span>
        <div style={{ flex: 1 }} />
        <button
          style={{
            background: GH_GREEN,
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '6px 14px',
            fontSize: 13,
            fontWeight: 600,
            display: 'flex',
            gap: 6,
            alignItems: 'center',
          }}
        >
          &lt;&gt; Code ▾
        </button>
      </div>
      <div style={{ padding: '0 18px 18px' }}>
        {['.github/', 'public/', 'src/', '.gitignore', 'README.md', 'package.json'].map((f) => (
          <div
            key={f}
            style={{
              display: 'flex',
              gap: 10,
              padding: '8px 10px',
              borderBottom: `1px solid ${GH_BORDER}`,
              fontSize: 13,
              color: f.endsWith('/') ? GH_BLUE : GH_TEXT,
            }}
          >
            <span>{f.endsWith('/') ? '📁' : '📄'}</span>
            <span>{f}</span>
          </div>
        ))}
      </div>
    </Window>
  )
}

/* ==================================================================
 *  2. CODE DROPDOWN — the green Code button expanded
 * ================================================================== */
function CodeDropdown() {
  return (
    <Window title="github.com/your-username/my-fleet-app">
      <div style={{ padding: 18, position: 'relative' }}>
        <button
          style={{
            background: GH_GREEN,
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '6px 14px',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          &lt;&gt; Code ▾
        </button>
        <div
          style={{
            marginTop: 8,
            width: 340,
            background: GH_SURFACE,
            border: `1px solid ${GH_BORDER}`,
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              borderBottom: `1px solid ${GH_BORDER}`,
              background: GH_BG,
            }}
          >
            {['Local', 'Codespaces', 'GitHub Desktop'].map((t, i) => (
              <div
                key={t}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  textAlign: 'center',
                  fontSize: 12,
                  color: i === 1 ? GH_TEXT : GH_MUTED,
                  borderBottom: i === 1 ? `2px solid #f78166` : '2px solid transparent',
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 12, color: GH_MUTED, marginBottom: 8 }}>
              Codespaces run VS Code in your browser.
            </div>
            <button
              style={{
                width: '100%',
                background: GH_GREEN,
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '8px 12px',
                fontSize: 13,
                fontWeight: 600,
                textAlign: 'left',
              }}
            >
              + Create codespace on main
            </button>
            <div
              style={{
                marginTop: 10,
                fontSize: 11,
                color: GH_MUTED,
                fontFamily: 'var(--font-mono)',
              }}
            >
              2-core · 8 GB RAM · 32 GB storage (free)
            </div>
          </div>
        </div>
      </div>
    </Window>
  )
}

/* ==================================================================
 *  3. CODESPACE LAUNCHER — the creation screen
 * ================================================================== */
function CodespaceLauncher() {
  return (
    <Window title="github.com/codespaces">
      <div style={{ padding: 20 }}>
        <div style={{ fontSize: 16, color: GH_TEXT, fontWeight: 600, marginBottom: 4 }}>
          Setting up your codespace
        </div>
        <div style={{ fontSize: 12, color: GH_MUTED, marginBottom: 16 }}>
          Repo: your-username/my-fleet-app · branch: main
        </div>
        <div
          style={{
            border: `1px solid ${GH_BORDER}`,
            borderRadius: 8,
            background: '#000',
            padding: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            lineHeight: 1.7,
          }}
        >
          <div style={{ color: GH_GREEN }}>✓ Cloning your repository...</div>
          <div style={{ color: GH_GREEN }}>✓ Building devcontainer image...</div>
          <div style={{ color: GH_GREEN }}>✓ Installing features: node, git, github-cli</div>
          <div style={{ color: GH_YELLOW }}>⋯ Starting container...</div>
          <div style={{ color: GH_MUTED }}>  Waiting for VS Code to launch in browser</div>
        </div>
        <div
          style={{
            marginTop: 16,
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            color: GH_MUTED,
            fontSize: 11,
          }}
        >
          <span>⏱ Usually takes 30–60 seconds</span>
          <span>·</span>
          <span>Free: 120 core-hours / month</span>
        </div>
      </div>
    </Window>
  )
}

/* ==================================================================
 *  4. VS CODE LAYOUT — activity bar + sidebar + editor + terminal
 * ================================================================== */
function VsCodeLayout() {
  const icons = [
    { sym: '📁', label: 'Explorer', active: true },
    { sym: '🔍', label: 'Search' },
    { sym: '⎇', label: 'Source Control' },
    { sym: '▶', label: 'Run & Debug' },
    { sym: '⬛', label: 'Extensions' },
    { sym: '💬', label: 'Copilot Chat' },
  ]
  return (
    <Window chrome="vscode" title="my-fleet-app [Codespaces: fluffy-pancake]">
      <div style={{ display: 'flex', height: 360 }}>
        {/* Activity bar */}
        <div
          style={{
            width: 48,
            background: VSC_ACTIVITY,
            borderRight: `1px solid #000`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 10,
            gap: 14,
          }}
        >
          {icons.map((ic) => (
            <div
              key={ic.label}
              title={ic.label}
              style={{
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderLeft: ic.active ? '2px solid #fff' : '2px solid transparent',
                color: ic.active ? '#fff' : VSC_MUTED,
                fontSize: 16,
              }}
            >
              {ic.sym}
            </div>
          ))}
        </div>
        {/* Sidebar */}
        <div
          style={{
            width: 220,
            background: VSC_SIDEBAR,
            color: VSC_TEXT,
            padding: '10px 12px',
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div style={{ color: VSC_MUTED, fontSize: 10, marginBottom: 6 }}>EXPLORER</div>
          <div style={{ color: VSC_TEXT, fontWeight: 600, marginBottom: 4 }}>▾ MY-FLEET-APP</div>
          {[
            '  ▸ .github',
            '  ▸ node_modules',
            '  ▸ public',
            '  ▾ src',
            '      ▸ components',
            '      ▸ pages',
            '      ▸ lib',
            '      App.tsx',
            '      main.tsx',
            '  .gitignore',
            '  index.html',
            '  package.json',
            '  vite.config.ts',
          ].map((line, i) => (
            <div key={i} style={{ padding: '2px 0', color: VSC_TEXT }}>
              {line}
            </div>
          ))}
        </div>
        {/* Editor + terminal */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              background: '#252526',
              padding: '6px 14px',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: VSC_MUTED,
              borderBottom: `1px solid #000`,
            }}
          >
            src / App.tsx
          </div>
          <pre
            style={{
              flex: 1,
              margin: 0,
              padding: 14,
              color: VSC_TEXT,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              lineHeight: 1.6,
              background: VSC_BG,
              overflow: 'auto',
            }}
          >
            <span style={{ color: '#c586c0' }}>import</span>{' '}
            <span style={{ color: '#9cdcfe' }}>{'{ BrowserRouter }'}</span>{' '}
            <span style={{ color: '#c586c0' }}>from</span>{' '}
            <span style={{ color: '#ce9178' }}>'react-router-dom'</span>
            <br />
            <br />
            <span style={{ color: '#c586c0' }}>export default function</span>{' '}
            <span style={{ color: '#dcdcaa' }}>App</span>() {'{'}
            <br />
            {'  '}
            <span style={{ color: '#c586c0' }}>return</span> (
            <br />
            {'    '}&lt;<span style={{ color: '#4ec9b0' }}>BrowserRouter</span>&gt;
            <br />
            {'      '}{'{/* routes go here */}'}
            <br />
            {'    '}&lt;/<span style={{ color: '#4ec9b0' }}>BrowserRouter</span>&gt;
            <br />
            {'  '}){'}'}
          </pre>
          {/* Terminal */}
          <div
            style={{
              height: 120,
              background: '#0c0c0c',
              borderTop: `1px solid #000`,
              padding: 10,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: VSC_TEXT,
              lineHeight: 1.6,
            }}
          >
            <div style={{ color: VSC_MUTED, fontSize: 10, marginBottom: 4 }}>
              TERMINAL — bash
            </div>
            <div>
              <span style={{ color: '#4ec9b0' }}>user@codespace</span>
              <span style={{ color: VSC_MUTED }}>:</span>
              <span style={{ color: GH_BLUE }}>/workspaces/my-fleet-app</span>
              <span style={{ color: VSC_MUTED }}>$ </span>
              npm run dev
            </div>
            <div style={{ color: '#4ec9b0' }}>  VITE v6.0.0  ready in 412 ms</div>
            <div>  ➜ Local:   http://localhost:5173/</div>
            <div>  ➜ Network: use --host to expose</div>
          </div>
        </div>
      </div>
    </Window>
  )
}

/* ==================================================================
 *  5. COPILOT CHAT — Agent mode panel
 * ================================================================== */
function CopilotChat() {
  return (
    <Window chrome="vscode" title="Copilot Chat — Agent">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 380,
          background: VSC_BG,
          color: VSC_TEXT,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 8,
            padding: '8px 12px',
            borderBottom: `1px solid ${GH_BORDER}`,
            background: '#252526',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 16 }}>💬</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: VSC_MUTED }}>
            Copilot Chat
          </span>
          <div style={{ flex: 1 }} />
          {['Ask', 'Edit', 'Agent'].map((m) => (
            <span
              key={m}
              style={{
                padding: '3px 10px',
                borderRadius: 4,
                fontSize: 11,
                background: m === 'Agent' ? VSC_BLUE : 'transparent',
                color: m === 'Agent' ? '#fff' : VSC_MUTED,
                fontFamily: 'var(--font-mono)',
                border: m === 'Agent' ? 'none' : `1px solid ${GH_BORDER}`,
              }}
            >
              {m}
            </span>
          ))}
        </div>
        <div style={{ flex: 1, padding: 14, overflow: 'auto', fontSize: 12, lineHeight: 1.6 }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: VSC_MUTED, fontSize: 10, marginBottom: 4 }}>YOU</div>
            <div>
              <span
                style={{
                  background: '#264f78',
                  color: '#fff',
                  padding: '1px 6px',
                  borderRadius: 3,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                }}
              >
                @workspace
              </span>{' '}
              add a task list page that reads tasks from localStorage
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ color: VSC_MUTED, fontSize: 10, marginBottom: 4 }}>COPILOT</div>
            <div>I'll scan your workspace first. Here is my plan:</div>
            <ol style={{ margin: '6px 0 6px 18px', padding: 0, color: VSC_TEXT }}>
              <li>Create <code style={{ color: '#4ec9b0' }}>src/pages/TaskListPage.tsx</code></li>
              <li>Create <code style={{ color: '#4ec9b0' }}>src/lib/storage.ts</code></li>
              <li>Wire a route in <code style={{ color: '#4ec9b0' }}>App.tsx</code></li>
            </ol>
            <div
              style={{
                border: `1px solid ${GH_BORDER}`,
                borderRadius: 6,
                padding: 10,
                background: '#1e1e1e',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                marginTop: 8,
              }}
            >
              <div style={{ color: GH_GREEN }}>+ create src/pages/TaskListPage.tsx (23 lines)</div>
              <div style={{ color: GH_GREEN }}>+ create src/lib/storage.ts (14 lines)</div>
              <div style={{ color: GH_YELLOW }}>~ modify src/App.tsx (2 additions)</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button
                style={{
                  background: GH_GREEN,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 4,
                  padding: '4px 12px',
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                Accept all
              </button>
              <button
                style={{
                  background: 'transparent',
                  color: VSC_TEXT,
                  border: `1px solid ${GH_BORDER}`,
                  borderRadius: 4,
                  padding: '4px 12px',
                  fontSize: 11,
                }}
              >
                Review changes
              </button>
              <button
                style={{
                  background: 'transparent',
                  color: GH_RED,
                  border: `1px solid ${GH_BORDER}`,
                  borderRadius: 4,
                  padding: '4px 12px',
                  fontSize: 11,
                }}
              >
                Discard
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: `1px solid ${GH_BORDER}`,
            padding: 10,
            display: 'flex',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <input
            placeholder="Ask Copilot or type / for commands..."
            style={{
              flex: 1,
              background: '#1e1e1e',
              border: `1px solid ${GH_BORDER}`,
              borderRadius: 4,
              padding: '6px 10px',
              color: VSC_TEXT,
              fontSize: 12,
            }}
            readOnly
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: VSC_MUTED,
            }}
          >
            Claude 4.7 ▾
          </span>
        </div>
      </div>
    </Window>
  )
}

/* ==================================================================
 *  6. SOURCE CONTROL — commit + sync flow
 * ================================================================== */
function SourceControl() {
  const changes = [
    { file: 'src/App.tsx', sym: 'M', color: GH_YELLOW },
    { file: 'src/pages/TaskListPage.tsx', sym: 'U', color: GH_GREEN },
    { file: 'src/lib/storage.ts', sym: 'U', color: GH_GREEN },
  ]
  return (
    <Window chrome="vscode" title="Source Control">
      <div style={{ padding: 14, background: VSC_SIDEBAR, color: VSC_TEXT, height: 340 }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: VSC_MUTED,
            marginBottom: 8,
          }}
        >
          SOURCE CONTROL · main
        </div>
        <textarea
          readOnly
          rows={2}
          value="feat: add task list page with localStorage"
          style={{
            width: '100%',
            background: '#1e1e1e',
            border: `1px solid ${GH_BORDER}`,
            borderRadius: 4,
            padding: 8,
            color: VSC_TEXT,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            resize: 'none',
          }}
        />
        <button
          style={{
            marginTop: 6,
            width: '100%',
            background: VSC_BLUE,
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '6px 10px',
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          ✓ Commit
        </button>
        <button
          style={{
            marginTop: 6,
            width: '100%',
            background: 'transparent',
            color: VSC_TEXT,
            border: `1px solid ${GH_BORDER}`,
            borderRadius: 4,
            padding: '6px 10px',
            fontSize: 12,
          }}
        >
          ⟳ Sync Changes ↑3 ↓0
        </button>
        <div
          style={{
            marginTop: 14,
            fontSize: 10,
            color: VSC_MUTED,
            fontFamily: 'var(--font-mono)',
          }}
        >
          CHANGES ({changes.length})
        </div>
        {changes.map((c) => (
          <div
            key={c.file}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 4px',
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
            }}
          >
            <span style={{ color: VSC_TEXT, flex: 1 }}>📄 {c.file}</span>
            <span
              style={{
                color: c.color,
                width: 18,
                textAlign: 'center',
                fontWeight: 700,
              }}
            >
              {c.sym}
            </span>
          </div>
        ))}
        <div
          style={{
            marginTop: 14,
            padding: 10,
            background: '#1e1e1e',
            borderRadius: 4,
            fontSize: 11,
            color: VSC_MUTED,
          }}
        >
          <span style={{ color: GH_GREEN }}>U</span> = new file ·{' '}
          <span style={{ color: GH_YELLOW }}>M</span> = modified ·{' '}
          <span style={{ color: GH_RED }}>D</span> = deleted
        </div>
      </div>
    </Window>
  )
}

/* ==================================================================
 *  7. ACTIONS RUN — workflow run list
 * ================================================================== */
function ActionsRun() {
  const runs = [
    { status: '✓', color: GH_GREEN, title: 'feat: add GitHub Pages deploy workflow', time: '1m 42s ago', branch: 'main' },
    { status: '✓', color: GH_GREEN, title: 'fix: update Vite base path', time: '12m ago', branch: 'main' },
    { status: '●', color: GH_YELLOW, title: 'feat: task detail page', time: 'in progress', branch: 'main' },
    { status: '✕', color: GH_RED, title: 'wip: supabase integration', time: '3h ago', branch: 'feat/db' },
  ]
  return (
    <Window title="github.com/your-username/my-fleet-app/actions">
      <div style={{ padding: 18 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
        >
          <div>
            <div style={{ color: GH_TEXT, fontSize: 14, fontWeight: 600 }}>
              All workflows
            </div>
            <div style={{ color: GH_MUTED, fontSize: 12 }}>
              Showing runs from all workflows
            </div>
          </div>
          <button
            style={{
              background: GH_SURFACE,
              color: GH_TEXT,
              border: `1px solid ${GH_BORDER}`,
              borderRadius: 6,
              padding: '6px 12px',
              fontSize: 12,
            }}
          >
            Filter ▾
          </button>
        </div>
        <div style={{ border: `1px solid ${GH_BORDER}`, borderRadius: 8, overflow: 'hidden' }}>
          {runs.map((r, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                borderBottom: i === runs.length - 1 ? 'none' : `1px solid ${GH_BORDER}`,
                background: GH_BG,
              }}
            >
              <span
                style={{
                  color: r.color,
                  fontSize: 18,
                  fontWeight: 700,
                  width: 20,
                  textAlign: 'center',
                }}
              >
                {r.status}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ color: GH_TEXT, fontSize: 13 }}>{r.title}</div>
                <div style={{ color: GH_MUTED, fontSize: 11, marginTop: 2 }}>
                  Deploy to GitHub Pages · #{125 - i} · {r.branch}
                </div>
              </div>
              <div style={{ color: GH_MUTED, fontSize: 11 }}>{r.time}</div>
            </div>
          ))}
        </div>
      </div>
    </Window>
  )
}

/* ==================================================================
 *  8. PAGES SETTINGS — repo Settings → Pages
 * ================================================================== */
function PagesSettings() {
  return (
    <Window title="Settings › Pages">
      <div style={{ padding: 20 }}>
        <div style={{ color: GH_TEXT, fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
          GitHub Pages
        </div>
        <div style={{ color: GH_MUTED, fontSize: 12, marginBottom: 18 }}>
          GitHub Pages is a static site hosting service that takes files from a branch and publishes
          them as a website.
        </div>

        <div
          style={{
            border: `1px solid ${GH_GREEN}`,
            background: 'rgba(46,160,67,0.08)',
            borderRadius: 6,
            padding: 12,
            marginBottom: 18,
            color: GH_TEXT,
            fontSize: 12,
            display: 'flex',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <span style={{ color: GH_GREEN, fontSize: 18 }}>✓</span>
          <div>
            <div style={{ fontWeight: 600 }}>Your site is live at</div>
            <a
              href="#"
              style={{ color: GH_BLUE, fontFamily: 'var(--font-mono)', fontSize: 12 }}
            >
              https://your-username.github.io/my-fleet-app/
            </a>
          </div>
        </div>

        <div style={{ color: GH_TEXT, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
          Build and deployment
        </div>
        <div style={{ color: GH_MUTED, fontSize: 12, marginBottom: 6 }}>Source</div>
        <select
          disabled
          style={{
            width: '100%',
            background: GH_SURFACE,
            color: GH_TEXT,
            border: `1px solid ${GH_BORDER}`,
            borderRadius: 6,
            padding: '8px 10px',
            fontSize: 13,
            marginBottom: 14,
          }}
        >
          <option>Deploy from a branch</option>
        </select>

        <div style={{ color: GH_MUTED, fontSize: 12, marginBottom: 6 }}>Branch</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <select
            disabled
            style={{
              flex: 1,
              background: GH_SURFACE,
              color: GH_TEXT,
              border: `1px solid ${GH_BORDER}`,
              borderRadius: 6,
              padding: '8px 10px',
              fontSize: 13,
            }}
          >
            <option>gh-pages</option>
          </select>
          <select
            disabled
            style={{
              flex: 1,
              background: GH_SURFACE,
              color: GH_TEXT,
              border: `1px solid ${GH_BORDER}`,
              borderRadius: 6,
              padding: '8px 10px',
              fontSize: 13,
            }}
          >
            <option>/ (root)</option>
          </select>
          <button
            style={{
              background: GH_SURFACE,
              color: GH_TEXT,
              border: `1px solid ${GH_BORDER}`,
              borderRadius: 6,
              padding: '8px 16px',
              fontSize: 13,
            }}
          >
            Save
          </button>
        </div>

        <div
          style={{
            marginTop: 18,
            padding: 10,
            background: GH_SURFACE,
            borderRadius: 6,
            border: `1px solid ${GH_BORDER}`,
            fontSize: 12,
            color: GH_MUTED,
          }}
        >
          ℹ Your workflow publishes to <code style={{ color: GH_TEXT }}>gh-pages</code> via{' '}
          <code style={{ color: GH_TEXT }}>peaceiris/actions-gh-pages@v4</code>.
        </div>
      </div>
    </Window>
  )
}

/* ==================================================================
 *  9. FIREBASE CONSOLE — project overview
 * ================================================================== */
function FirebaseConsole() {
  const tiles = [
    { label: 'Firestore Database', icon: '🗄️', detail: '42 documents · test mode' },
    { label: 'Authentication', icon: '🔐', detail: '0 users · disabled' },
    { label: 'Hosting', icon: '🌐', detail: 'not set up' },
    { label: 'Storage', icon: '📦', detail: '0 MB used' },
  ]
  return (
    <Window title="console.firebase.google.com/project/my-fleet-app">
      <div style={{ padding: 20, background: '#fff', color: '#202124' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 22 }}>🔥</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>my-fleet-app</div>
            <div style={{ fontSize: 11, color: '#5f6368' }}>Project overview · Spark plan (free)</div>
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 12,
          }}
        >
          {tiles.map((t) => (
            <div
              key={t.label}
              style={{
                border: '1px solid #dadce0',
                borderRadius: 8,
                padding: 14,
                background: '#f8f9fa',
                display: 'flex',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 20 }}>{t.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{t.label}</div>
                <div style={{ fontSize: 11, color: '#5f6368' }}>{t.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 16,
            border: '1px solid #fde68a',
            background: '#fef3c7',
            borderRadius: 6,
            padding: 10,
            fontSize: 12,
            color: '#854d0e',
          }}
        >
          ⚠ Test mode expires in 23 days — add security rules before production.
        </div>
      </div>
    </Window>
  )
}

/* ==================================================================
 *  10. SUPABASE TABLE EDITOR
 * ================================================================== */
function SupabaseTable() {
  const rows = [
    ['a1f3', 'Install the lift kit', 'in_progress', 'Jane', '2026-05-01'],
    ['b2c4', 'Swap brake pads (truck 7)', 'todo', 'Mike', '2026-05-03'],
    ['c9e1', 'Weekly safety inspection', 'done', 'Jane', '2026-04-20'],
  ]
  return (
    <Window title="app.supabase.com/project/abc/editor">
      <div style={{ background: '#1c1c1c', color: '#e5e5e5', padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 18 }}>⚡</span>
          <span style={{ fontWeight: 600, fontSize: 14 }}>tasks</span>
          <span
            style={{
              fontSize: 10,
              padding: '2px 8px',
              background: '#2a2a2a',
              borderRadius: 999,
              color: '#a0a0a0',
              fontFamily: 'var(--font-mono)',
            }}
          >
            public
          </span>
          <div style={{ flex: 1 }} />
          <button
            style={{
              background: '#3ecf8e',
              color: '#000',
              border: 'none',
              borderRadius: 6,
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            + Insert row
          </button>
        </div>
        <div
          style={{
            border: '1px solid #2a2a2a',
            borderRadius: 6,
            overflow: 'hidden',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 2fr 100px 80px 110px',
              background: '#2a2a2a',
              padding: '8px 10px',
              color: '#a0a0a0',
              gap: 10,
            }}
          >
            <span>id</span>
            <span>title</span>
            <span>status</span>
            <span>assignee</span>
            <span>due_date</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 2fr 100px 80px 110px',
                padding: '8px 10px',
                borderTop: '1px solid #2a2a2a',
                gap: 10,
              }}
            >
              <span style={{ color: '#a0a0a0' }}>{r[0]}</span>
              <span>{r[1]}</span>
              <span
                style={{
                  color:
                    r[2] === 'done' ? '#3ecf8e' : r[2] === 'in_progress' ? '#d29922' : '#8b949e',
                }}
              >
                {r[2]}
              </span>
              <span>{r[3]}</span>
              <span style={{ color: '#a0a0a0' }}>{r[4]}</span>
            </div>
          ))}
        </div>
      </div>
    </Window>
  )
}

/* ==================================================================
 *  11. ENV SECRETS — Actions secrets config
 * ================================================================== */
function EnvSecrets() {
  const secrets = [
    { name: 'VITE_FIREBASE_API_KEY', updated: '2 days ago' },
    { name: 'VITE_FIREBASE_PROJECT_ID', updated: '2 days ago' },
    { name: 'VITE_SUPABASE_URL', updated: '5 days ago' },
    { name: 'VITE_SUPABASE_ANON_KEY', updated: '5 days ago' },
  ]
  return (
    <Window title="Settings › Secrets and variables › Actions">
      <div style={{ padding: 20 }}>
        <div style={{ color: GH_TEXT, fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
          Actions secrets and variables
        </div>
        <div style={{ color: GH_MUTED, fontSize: 12, marginBottom: 16 }}>
          Secrets are encrypted and only exposed to workflows you explicitly reference.
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
          <button
            style={{
              background: GH_GREEN,
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            New repository secret
          </button>
        </div>
        <div style={{ border: `1px solid ${GH_BORDER}`, borderRadius: 8, overflow: 'hidden' }}>
          {secrets.map((s, i) => (
            <div
              key={s.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderBottom: i === secrets.length - 1 ? 'none' : `1px solid ${GH_BORDER}`,
                background: GH_BG,
              }}
            >
              <span style={{ color: GH_MUTED }}>🔒</span>
              <span
                style={{
                  color: GH_TEXT,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  flex: 1,
                }}
              >
                {s.name}
              </span>
              <span style={{ color: GH_MUTED, fontSize: 11 }}>Updated {s.updated}</span>
              <button
                style={{
                  background: 'transparent',
                  color: GH_TEXT,
                  border: `1px solid ${GH_BORDER}`,
                  borderRadius: 4,
                  padding: '3px 8px',
                  fontSize: 11,
                }}
              >
                Update
              </button>
            </div>
          ))}
        </div>
      </div>
    </Window>
  )
}

/* ==================================================================
 *  12. COPILOT MODELS — model picker dropdown
 * ================================================================== */
function CopilotModels() {
  const models = [
    { name: 'Claude 4.7 Opus', detail: 'best reasoning · slower', premium: true },
    { name: 'Claude 4.6 Sonnet', detail: 'balanced · recommended', active: true },
    { name: 'Claude 4.5 Sonnet', detail: 'fast · cheap' },
    { name: 'ChatGPT 5.4', detail: 'strong at React/TS' },
    { name: 'Codex 5.3', detail: 'code specialist' },
  ]
  return (
    <Window chrome="vscode" title="Copilot Chat — Model picker">
      <div style={{ padding: 24, background: VSC_BG, minHeight: 280 }}>
        <div
          style={{
            width: 360,
            background: '#252526',
            border: `1px solid ${GH_BORDER}`,
            borderRadius: 8,
            overflow: 'hidden',
            marginLeft: 'auto',
          }}
        >
          <div
            style={{
              padding: '8px 12px',
              borderBottom: `1px solid ${GH_BORDER}`,
              color: VSC_MUTED,
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Choose backing model
          </div>
          {models.map((m) => (
            <div
              key={m.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                background: m.active ? '#094771' : 'transparent',
                color: VSC_TEXT,
                fontSize: 12,
                borderBottom: `1px solid ${GH_BORDER}`,
              }}
            >
              <span style={{ width: 14, color: m.active ? '#fff' : 'transparent' }}>✓</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{m.name}</div>
                <div style={{ fontSize: 10, color: VSC_MUTED }}>{m.detail}</div>
              </div>
              {m.premium && (
                <span
                  style={{
                    fontSize: 9,
                    padding: '2px 6px',
                    background: '#d29922',
                    color: '#000',
                    borderRadius: 3,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  PRO
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Window>
  )
}

/* ==================================================================
 *  13. EDUCATION APPLY — education.github.com
 * ================================================================== */
function EducationApply() {
  return (
    <Window title="education.github.com/benefits">
      <div
        style={{
          background: 'linear-gradient(180deg, #0d1117 0%, #1a1f28 100%)',
          padding: 24,
          color: GH_TEXT,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>GitHub Education</div>
        <div style={{ color: GH_MUTED, fontSize: 13, marginBottom: 18, maxWidth: 520 }}>
          Free developer tools for verified students and teachers. Get Copilot Pro, GitHub Pro, and
          100+ partner tools at no cost.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { name: 'Copilot Pro', detail: 'Unlimited AI completions' },
            { name: 'GitHub Pro', detail: 'Private repos + more CI' },
            { name: 'Codespaces', detail: '180 core-hours / month' },
            { name: 'JetBrains', detail: 'Full toolbox, free' },
            { name: 'Notion', detail: 'Education plan' },
            { name: 'Figma', detail: 'Pro, free for students' },
          ].map((t) => (
            <div
              key={t.name}
              style={{
                padding: 12,
                border: `1px solid ${GH_BORDER}`,
                borderRadius: 8,
                background: GH_SURFACE,
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: GH_MUTED }}>{t.detail}</div>
            </div>
          ))}
        </div>
        <button
          style={{
            marginTop: 18,
            background: GH_GREEN,
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '10px 18px',
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          Apply with your .edu email or school ID →
        </button>
        <div style={{ marginTop: 10, fontSize: 11, color: GH_MUTED }}>
          Verification takes 1–5 business days.
        </div>
      </div>
    </Window>
  )
}

/* ==================================================================
 *  14. ARCHITECTURE FLOW — build → commit → deploy pipeline diagram
 * ================================================================== */
function ArchitectureFlow() {
  const nodes: { x: number; y: number; label: string; sub: string; tone: 'author' | 'cloud' | 'live' }[] = [
    { x: 8, y: 40, label: 'You + AI', sub: 'in Codespace', tone: 'author' },
    { x: 30, y: 40, label: 'git push', sub: 'main branch', tone: 'author' },
    { x: 52, y: 20, label: 'GitHub Actions', sub: 'npm run build', tone: 'cloud' },
    { x: 52, y: 60, label: 'Firestore / Supabase', sub: 'your data', tone: 'cloud' },
    { x: 78, y: 20, label: 'gh-pages branch', sub: 'dist/ files', tone: 'cloud' },
    { x: 94, y: 40, label: 'Live site', sub: 'github.io URL', tone: 'live' },
  ]
  const color: Record<string, string> = {
    author: '#58a6ff',
    cloud: '#d29922',
    live: '#3ecf8e',
  }
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 4],
    [4, 5],
    [3, 5],
  ]
  return (
    <div
      style={{
        position: 'relative',
        padding: '20px 10px',
        background: GH_BG,
        border: `1px solid ${GH_BORDER}`,
        borderRadius: 8,
        minHeight: 240,
      }}
    >
      <svg
        viewBox="0 0 100 80"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 10, width: 'calc(100% - 20px)', height: 'calc(100% - 20px)' }}
      >
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={GH_BORDER}
            strokeWidth={0.4}
            strokeDasharray="0.6 0.6"
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ delay: 0.08 * i, duration: 0.3 }}
          style={{
            position: 'absolute',
            left: `${n.x}%`,
            top: `${n.y}%`,
            transform: 'translate(-50%, -50%)',
            padding: '6px 10px',
            background: GH_SURFACE,
            border: `1px solid ${color[n.tone]}`,
            borderRadius: 6,
            color: GH_TEXT,
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            textAlign: 'center',
            minWidth: 110,
            boxShadow: `0 0 18px -6px ${color[n.tone]}`,
          }}
        >
          <div style={{ color: color[n.tone], fontWeight: 600 }}>{n.label}</div>
          <div style={{ color: GH_MUTED, fontSize: 9, marginTop: 2 }}>{n.sub}</div>
        </motion.div>
      ))}
    </div>
  )
}

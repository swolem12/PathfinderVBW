export type LessonId =
  | 'what-is-vibe-coding'
  | 'pick-agent'
  | 'setup'
  | 'pick-idea'
  | 'design-vocabulary'
  | 'build-brief'
  | 'generate'
  | 'save-files'
  | 'run-locally'
  | 'iterate'

export interface CodeBlock {
  kind: 'shell' | 'markdown' | 'prompt' | 'output' | 'code'
  language?: string
  title?: string
  body: string
}

export interface Callout {
  kind: 'tip' | 'warn' | 'note'
  title: string
  body: string
}

export type LessonBlock =
  | { type: 'p'; body: string }
  | { type: 'h'; body: string }
  | { type: 'list'; items: string[] }
  | { type: 'checklist'; items: string[] }
  | { type: 'code'; block: CodeBlock }
  | { type: 'callout'; callout: Callout }
  | { type: 'shellSession'; lines: { prompt?: string; command?: string; output?: string }[] }

export interface LessonDef {
  id: LessonId
  number: number
  title: string
  subtitle: string
  goal: string
  estMinutes: number
  blocks: LessonBlock[]
}

export const sampleApp = {
  name: 'TaskBoard',
  oneLiner:
    'A shared task board for a small maintenance crew — the shift lead posts jobs, technicians claim and complete them.',
}

export const briefTemplate = `# Build Brief — <APP NAME>

## 1. Pitch (fill the blanks literally)
Design an app that **<ONE PRIMARY ACTION>** for **<ONE SPECIFIC PERSON>**, so they can **<OUTCOME THAT CHANGES THEIR DAY>**.

## 2. The user (one paragraph)
<ONE ROLE — be specific, e.g. "night-shift maintenance technician", not "users"> opens this <WHEN — time of day / moment of day> on a <DEVICE — phone / laptop / shop tablet>. Right before they open it they are <CONTEXT>. Right after they close it they go <NEXT ACTION>. The single thing they must be able to do in under 10 seconds is <PRIMARY ACTION>.

## 3. Ship list — v1 only (pick 3 to 5)
- [ ] <NOUN> I can <VERB>  (e.g. "a task I can add")
- [ ] <NOUN> I can <VERB>
- [ ] <NOUN> I can <VERB>
- [ ] <NOUN> I can <VERB>
- [ ] <NOUN> I can <VERB>

## 4. Cut list — NOT in v1 (list at least 3)
- <THING YOU ARE CHOOSING NOT TO BUILD>
- <THING YOU ARE CHOOSING NOT TO BUILD>
- <THING YOU ARE CHOOSING NOT TO BUILD>

## 5. Pages / screens
- \`/\` <ONE-LINE PURPOSE>
- \`/<ROUTE>\` <ONE-LINE PURPOSE>
- \`/<ROUTE>\` <ONE-LINE PURPOSE>

## 6. Layout (pick ONE per row)
- Navigation: **top bar** | **left sidebar** | **bottom tab bar** | **none (single screen)**
- Primary surface: **single column** | **sidebar + content** | **kanban columns** | **dashboard grid** | **feed** | **split pane** | **wizard / stepper**
- Density: **airy** (lots of whitespace) | **balanced** | **dense** (info-rich, small paddings)
- Primary input pattern: **inline form** | **modal dialog** | **slideout panel** | **command menu (Cmd+K)**

## 7. Visual tone (pick 2 to 4 adjectives from the menu in lesson 5)
- Adjectives: <ADJ>, <ADJ>, <ADJ>

## 8. Color, type, radius (pick one of each)
- Background: **off-white** | **pure white** | **warm cream** | **near-black** | **dark slate** | **sepia**
- Single accent color (name or hex): <PICK ONE COLOR>
- Body font style: **geometric sans** | **humanist sans** | **grotesk** | **serif** | **mono**
- Display / heading style: **same as body** | **serif display** | **oversized grotesk** | **mono all-caps**
- Corner radius: **sharp (0px)** | **subtle (4px)** | **friendly (10px)** | **pill (999px on buttons)**

## 9. Motion & feel (pick one option per row — vocabulary from lesson 5)
- On first page load: **no animation** | **fade in** | **slide up and fade** | **stagger list items in**
- On hover (buttons / cards): **no change** | **subtle color shift** | **lift + shadow** | **underline wipe**
- On primary action (submit / add / save): **no animation** | **inline checkmark** | **toast notification slides in**
- Between screens / views: **instant** | **crossfade** | **slide**
- Easing character: **linear / none** | **crisp (inOutQuad)** | **smooth (inOutExpo)** | **bouncy (spring)**
- Overall motion feel: **none / instant** | **restrained** | **playful**

## 10. Components the AI must use (check what you need)
- Inputs: [ ] button  [ ] text input  [ ] textarea  [ ] select  [ ] checkbox  [ ] toggle  [ ] slider  [ ] date picker  [ ] file uploader
- Display: [ ] card  [ ] table  [ ] list  [ ] badge  [ ] tag  [ ] avatar  [ ] metric / stat  [ ] empty state  [ ] loading indicator  [ ] progress steps
- Overlay: [ ] modal  [ ] slideout / drawer  [ ] tooltip  [ ] toast / notification  [ ] alert  [ ] dropdown menu  [ ] command menu
- Navigation: [ ] top nav  [ ] sidebar nav  [ ] tabs  [ ] breadcrumbs  [ ] pagination

## 11. Done means
- [ ] The app loads at http://localhost:5173/ with no red errors in the browser console
- [ ] I can <PRIMARY ACTION> in under 10 seconds, starting from a cold reload
- [ ] Data I enter is still there after I refresh
- [ ] Every empty list / empty state shows a short message, not a blank box
- [ ] The tone words in section 7 actually describe what I see
`

export const briefExample = `# Build Brief — TaskBoard

## 1. Pitch
Design an app that **tracks who is fixing what** for **the shift lead of a 6-person maintenance crew**, so they can **stop chasing people on group text at the start of every shift**.

## 2. The user
A shift-lead technician at one facility opens this at the start of shift, on a laptop in the shop (and occasionally on a phone in the field). Right before they open it they are reading overnight alarm emails. Right after they close it they head to the floor to brief the crew. The single thing they must be able to do in under 10 seconds is see every open task and who owns it, on one screen.

## 3. Ship list — v1 only
- [ ] A task I can add (title + priority: low / med / high)
- [ ] A list of tasks grouped by status: Open / In Progress / Done
- [ ] A task I can claim (sets owner = "me", status = In Progress)
- [ ] A task I can mark done

## 4. Cut list — NOT in v1
- Login / user accounts
- Multi-user realtime sync
- Comments on tasks
- Photo attachments
- Push notifications

## 5. Pages / screens
- \`/\` The board — three columns (Open / In Progress / Done) with an "Add task" button at the top

## 6. Layout
- Navigation: **none (single screen)**
- Primary surface: **kanban columns**
- Density: **balanced**
- Primary input pattern: **inline form** (the "Add task" row sits at the top of the Open column)

## 7. Visual tone
- Adjectives: utilitarian, calm, technical

## 8. Color, type, radius
- Background: off-white
- Single accent color: one warm orange (#E6A15C) — used ONLY on the priority dot and the primary button
- Body font style: humanist sans (system-ui is fine)
- Display / heading style: same as body, just bolder
- Corner radius: subtle (4px)

## 9. Motion & feel
- On first page load: stagger list items in (each task card fades + slides up, 40ms apart)
- On hover (cards): subtle color shift (background goes from white to very light gray)
- On primary action (add / claim / complete): toast notification slides in from bottom-right
- Between screens / views: n/a, single screen
- Easing character: crisp (inOutQuad), ~180ms
- Overall motion feel: restrained

## 10. Components the AI must use
- Inputs: [x] button  [x] text input  [x] select (for priority)
- Display: [x] card  [x] badge (for priority)  [x] empty state
- Overlay: [x] toast / notification
- Navigation: (none)

## 11. Done means
- [ ] The app loads at http://localhost:5173/ with no red errors in the console
- [ ] I can add a task in under 10 seconds from a cold reload
- [ ] Refreshing the page keeps my tasks (localStorage)
- [ ] An empty "Open" column shows "No open tasks — add one above." — not a blank box
- [ ] The board actually feels utilitarian, calm, and technical (no gradients, no drop shadows on cards, no rounded-pill buttons)
`

export const codexPrompt = `I want to build a small web app. Below is my Build Brief.

Do all of the following, in this order:
1. Design the app based on the brief — but ONLY the items under "Features — ship first". Do NOT implement anything from the "later" list.
2. Write the full source code for a React + TypeScript + Vite project, using browser localStorage for persistence (no backend) and plain CSS (no UI libraries).
3. Present the complete file list at the top of your reply.
4. Then give me every file's full contents in its own clearly labeled code block, with the file's full relative path as the label (for example: \`taskboard/package.json\`, \`taskboard/src/App.tsx\`).
5. Include package.json, tsconfig.json, vite.config.ts, index.html, src/main.tsx, src/App.tsx, src/index.css, and any additional files needed.
6. End with the exact PowerShell commands I need to run to install and start the app.

Here is the brief:

<PASTE THE FILLED-IN BUILD BRIEF HERE>`

export const claudeCodePrompt = `I want to build a small web app. Below is my Build Brief.

Please do the following:
1. Create a folder named \`taskboard\` in the current working directory (my Desktop).
2. Scaffold a React + TypeScript + Vite project inside it.
3. Implement ONLY the items under "Features — ship first". Do NOT implement anything from the "later" list.
4. Use browser localStorage for persistence. No backend. Plain CSS, no UI libraries.
5. Make sure empty states render, so the app never looks broken when there is no data.
6. After you finish writing files, tell me: (a) the full file tree you created, (b) the exact PowerShell commands I should run from inside the \`taskboard\` folder to install and start the app.

Here is the brief:

<PASTE THE FILLED-IN BUILD BRIEF HERE>`

export const debugPrompt = `The dev server printed this error:

\`\`\`
<PASTE THE EXACT ERROR FROM POWERSHELL>
\`\`\`

Please:
1. Explain in one sentence what is wrong.
2. Propose the smallest possible fix (which file, which lines, and the full replacement snippet).
3. Do not refactor anything unrelated.
4. After I apply the fix, tell me how to verify it worked.`

export const addFeaturePrompt = `The app is working. I want to add ONE feature:

<DESCRIBE THE ONE FEATURE IN ONE SENTENCE — e.g. "show the number of open tasks in the page title">

Constraints:
- Change as few files as possible.
- Do not touch unrelated features.
- Give me the full updated contents of every file you change, labeled with its path.
- After the change, tell me exactly what to test in the browser to confirm it works.`

export const lessons: LessonDef[] = [
  {
    id: 'what-is-vibe-coding',
    number: 1,
    title: 'What vibe coding actually is',
    subtitle: 'Design with AI. Run locally.',
    goal: 'You can explain, in one sentence, the loop: design in the AI, save files to your Desktop, run in PowerShell.',
    estMinutes: 4,
    blocks: [
      {
        type: 'p',
        body: "Vibe coding is using an AI — specifically ChatGPT's Codex or Anthropic's Claude Code — to design and write a small web app for you, while you stay in the director's chair. You describe what you want. It produces the source files. You save them to a folder on your desktop and run them in PowerShell.",
      },
      { type: 'h', body: 'The loop' },
      {
        type: 'list',
        items: [
          '1. Write a one-page Build Brief.',
          '2. Paste it into Codex or Claude Code.',
          '3. Get back the full source code for a small React app.',
          '4. Save the files into a folder on your Desktop (or let Claude Code write them directly).',
          '5. Run three commands in PowerShell — the app opens in your browser.',
          '6. Test it. Break it. Paste errors back into the AI. Apply fixes. Repeat.',
        ],
      },
      { type: 'h', body: 'What the AI provides' },
      {
        type: 'list',
        items: [
          'Every source file you need: package.json, index.html, vite.config.ts, src/App.tsx, src/main.tsx, src/index.css.',
          'The exact PowerShell commands to install and start the project.',
          'Fixes when you paste errors back to it.',
        ],
      },
      { type: 'h', body: 'What stays with you' },
      {
        type: 'list',
        items: [
          'The brief. If yours is vague, the output will be vague.',
          'Running and testing the app on your own machine.',
          'Deciding what to ship now vs. later.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'The one rule',
          body: "If you cannot describe the app in a paragraph, the AI cannot build it. The brief isn't bureaucracy — it is the actual job.",
        },
      },
    ],
  },
  {
    id: 'pick-agent',
    number: 2,
    title: 'Pick your AI — Codex or Claude Code',
    subtitle: 'Two good paths. Pick the one you have access to.',
    goal: 'You have chosen either ChatGPT Codex or Claude Code, and you know how that choice changes the workflow.',
    estMinutes: 4,
    blocks: [
      {
        type: 'p',
        body: "This course supports two AIs. They produce similar quality output. The difference is how the files get onto your desktop.",
      },
      { type: 'h', body: 'Option A — ChatGPT Codex' },
      {
        type: 'list',
        items: [
          'Open chatgpt.com, sign in, select a model capable of long code output (GPT-5 Codex, or whatever ChatGPT labels its coding-focused model).',
          'You paste the brief in the browser. It replies with every file\'s contents in code blocks, plus a download link or a "Canvas" you can copy from.',
          'You manually save each file to a folder on your Desktop. This course shows you exactly how (lesson 7).',
          'Best if: you already use ChatGPT Plus and are comfortable copy-pasting or downloading files.',
        ],
      },
      { type: 'h', body: 'Option B — Claude Code' },
      {
        type: 'list',
        items: [
          'A CLI tool from Anthropic. Runs inside PowerShell.',
          'Install once with: npm install -g @anthropic-ai/claude-code',
          'Run: claude (in the folder where you want the project). Paste the brief. It writes every file directly to disk.',
          'No copy-pasting. No downloads. The files just appear on your Desktop.',
          'Best if: you want the fastest possible loop and are comfortable with PowerShell.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: "You can try both",
          body: "The Build Brief you write in the next lessons is identical for both. You can do a run with Codex, then a run with Claude Code, and compare.",
        },
      },
      {
        type: 'checklist',
        items: [
          "I picked one: Codex (ChatGPT) or Claude Code",
          "I am signed in / have a working API key for whichever I picked",
          "I can open a new conversation and paste a long message into it",
        ],
      },
    ],
  },
  {
    id: 'setup',
    number: 3,
    title: 'One-time PC setup',
    subtitle: 'Node.js, a Desktop folder, a terminal.',
    goal: "Your PC has Node.js, a clean projects folder on your Desktop, and PowerShell working.",
    estMinutes: 8,
    blocks: [
      { type: 'h', body: '1. Install Node.js' },
      {
        type: 'p',
        body: "Go to nodejs.org, click the big LTS download button, run the installer with the default options. Node.js is what runs JavaScript/TypeScript outside the browser — every React project needs it.",
      },
      { type: 'h', body: '2. Open PowerShell and verify' },
      {
        type: 'p',
        body: "Press the Windows key, type 'powershell', press Enter. Run the two commands below. You should see version numbers, not errors.",
      },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\Users\\you>', command: 'node -v' },
          { output: 'v22.11.0' },
          { prompt: 'PS C:\\Users\\you>', command: 'npm -v' },
          { output: '10.9.0' },
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: "If you see 'node is not recognized'",
          body: "Close PowerShell completely and open a new window. The installer only updates environment variables for shells opened after it finishes.",
        },
      },
      { type: 'h', body: '3. Go to your Desktop in PowerShell' },
      {
        type: 'p',
        body: "Your Desktop is a real folder on disk: C:\\Users\\<your-username>\\Desktop. PowerShell has a shortcut for it — $HOME\\Desktop. Run:",
      },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\Users\\you>', command: 'cd $HOME\\Desktop' },
          { prompt: 'PS C:\\Users\\you\\Desktop>' },
        ],
      },
      {
        type: 'p',
        body: "That's where your project folder will live. You'll see it as an icon on your actual desktop as soon as it's created.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: "Careful with OneDrive",
          body: "If your Desktop is synced to OneDrive (common on Windows 11), file watchers can misbehave and the dev server may reload at random. If you hit weird reload loops later, move the project folder to C:\\projects instead.",
        },
      },
      { type: 'h', body: '4. (Claude Code path only) Install the CLI' },
      {
        type: 'p',
        body: "Skip this step if you chose Codex. If you chose Claude Code, install it once — globally — with npm:",
      },
      {
        type: 'shellSession',
        lines: [
          {
            prompt: 'PS C:\\Users\\you\\Desktop>',
            command: 'npm install -g @anthropic-ai/claude-code',
          },
          {
            output:
              'added 42 packages in 3s\n\nclaude -> C:\\Users\\you\\AppData\\Roaming\\npm\\claude.cmd',
          },
          { prompt: 'PS C:\\Users\\you\\Desktop>', command: 'claude --version' },
          { output: '0.x.x' },
        ],
      },
      {
        type: 'checklist',
        items: [
          'node -v prints a version',
          'npm -v prints a version',
          'I can cd to $HOME\\Desktop and the prompt updates',
          'If I picked Claude Code: claude --version prints a version',
        ],
      },
    ],
  },
  {
    id: 'pick-idea',
    number: 4,
    title: 'Pick an idea',
    subtitle: 'One sentence. One user. One main action.',
    goal: "You have a one-sentence pitch for your app with an audience, an outcome, and a reason it helps them.",
    estMinutes: 5,
    blocks: [
      {
        type: 'p',
        body: "The #1 reason AI-generated apps feel generic is that the brief is vague. Before anything else, compress your idea into one sentence that names who uses it, what they get, and what changes in their day.",
      },
      { type: 'h', body: 'The pattern' },
      {
        type: 'code',
        block: {
          kind: 'markdown',
          title: 'pitch.md',
          body: '<Audience> uses this to <outcome> so that <change in their day>.',
        },
      },
      { type: 'h', body: 'Worked example (the app we build in this course)' },
      {
        type: 'code',
        block: {
          kind: 'markdown',
          title: 'TaskBoard — pitch',
          body: sampleApp.oneLiner,
        },
      },
      { type: 'h', body: 'Bad vs good' },
      {
        type: 'list',
        items: [
          "❌ 'A modern productivity app with AI.'",
          "❌ 'Something like Trello but better.'",
          "✅ 'A maintenance crew's shift lead uses this to see every open task and who owns it, so he stops chasing people on group text.'",
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Use our example for your first pass',
          body: 'If you just want to learn the workflow, use TaskBoard as your idea. Come back with your own idea on pass two — same steps, different brief.',
        },
      },
    ],
  },
  {
    id: 'design-vocabulary',
    number: 5,
    title: 'Design vocabulary: name what you want',
    subtitle: 'Layout, components, tone, motion — in words the AI understands.',
    goal: "You can describe any app's look, layout, and feel using specific terms — not 'modern' or 'clean.'",
    estMinutes: 14,
    blocks: [
      {
        type: 'p',
        body: "The fastest way to get a generic app is to write a generic brief. Words like 'modern', 'clean', 'sleek', 'intuitive', and 'AI-powered' tell the AI nothing — it has to guess, and it guesses average. This lesson gives you a real vocabulary: the four things every app's look is made of (layout, components, visual tone, motion), with a menu of choices for each. You will literally pick from these menus in the next lesson's brief.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'Where this vocabulary comes from',
          body: "The component names and groupings come from Untitled UI React (untitledui.com/react/components) — the largest open-source catalog of real-world UI components. The motion vocabulary comes from anime.js (animejs.com) — a small animation library whose terms (stagger, easing, spring, timeline, scroll observer) are the industry-standard way to describe web motion. You do not need to install either library. You just need to know the words.",
        },
      },

      { type: 'h', body: '1. Layout — where things sit on the screen' },
      {
        type: 'p',
        body: "Pick ONE primary surface. This single decision drives 80% of how the app looks.",
      },
      {
        type: 'list',
        items: [
          "**Single column** — one vertical stack, centered. Best for: reading, one-task apps, forms. Think: Notion page, blog post.",
          "**Sidebar + content** — nav on the left, main area on the right. Best for: apps with many sections (settings, docs, multi-entity CRUDs). Think: Slack, Linear.",
          "**Top bar + content** — horizontal nav at top, everything below. Best for: simple apps with 2–4 sections. Think: GitHub, Stripe dashboard.",
          "**Kanban columns** — 2–5 vertical columns of cards. Best for: anything with status (tasks, leads, applications). Think: Trello.",
          "**Dashboard grid** — a page of cards/metrics in a responsive grid. Best for: monitoring, analytics, home pages. Think: Vercel dashboard.",
          "**Feed** — one infinite vertical list of posts/items. Best for: content you scroll through. Think: Twitter/X, Instagram.",
          "**Split pane** — list on the left, detail of the selected item on the right. Best for: email, message inboxes, record browsers. Think: Apple Mail, Gmail.",
          "**Wizard / stepper** — one step at a time, Next / Back buttons. Best for: onboarding, checkout, anything with a required order. Think: Stripe Checkout, TurboTax.",
        ],
      },

      { type: 'h', body: '2. Components — the parts an app is built from' },
      {
        type: 'p',
        body: "This is the menu. Check what your app actually needs. The AI will skip anything you don't list — which is the point, it stops inventing features.",
      },
      {
        type: 'code',
        block: {
          kind: 'markdown',
          title: 'Component menu (grouped)',
          body: `Inputs — how the user tells the app things
  button, text input, textarea, select, checkbox, toggle (on/off switch),
  slider, date picker, file uploader, verification code input

Display — how the app shows things
  card, table, list, badge, tag, avatar, metric / stat tile,
  activity feed, empty state, loading indicator, progress steps,
  chart (line / bar / pie)

Overlay — things that appear on top of the page
  modal (blocks the page), slideout / drawer (from the side),
  tooltip, toast / notification (corner popup), alert (inline banner),
  dropdown menu, command menu (Cmd+K palette)

Navigation — how the user moves
  top nav, sidebar nav, tabs, breadcrumbs, pagination`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'The empty-state rule',
          body: "Always check 'empty state' in section 10 of your brief. It is the #1 thing AI-generated apps forget, and the #1 thing that makes a prototype feel broken the first time you open it.",
        },
      },

      { type: 'h', body: '3. Visual tone — how it should feel' },
      {
        type: 'p',
        body: "Pick 2 to 4 adjectives from this menu. Together they define the personality. Each implies real design choices the AI will make.",
      },
      {
        type: 'list',
        items: [
          "**Utilitarian** — dense info, tight spacing, small UI. Linear, early GitHub.",
          "**Editorial** — large serif headlines, generous whitespace, text-first. The New Yorker online, Stripe Press.",
          "**Playful** — saturated colors, rounded corners, friendly illustrations, micro-interactions. Duolingo, Notion marketing.",
          "**Brutalist** — mono font, sharp corners, visible borders, stark black/white, no shadows. Are.na, Hacker News.",
          "**Soft** — pastels, rounded corners, subtle shadows, generous padding. Figma, Headspace.",
          "**Warm** — cream backgrounds, earth accents, serif display type. Craigslist-for-humans, indie SaaS.",
          "**Calm** — restrained palette, no animations on idle, muted accent. Apple Notes, iA Writer.",
          "**Technical** — mono font for data, terminal-green or amber accents, visible grid. Vercel, dev dashboards.",
          "**Premium** — near-black background, one metallic accent, oversized display serif, lots of negative space. Luxury brand landing pages.",
          "**Documentarian** — serif body, sidebar TOC, high-contrast text, no decoration. Wikipedia, academic reading apps.",
          "**Retro-terminal** — monospace everything, dark bg, single neon accent, no rounded corners. CLI tool landing pages.",
          "**Magazine** — asymmetric grid, mixed type sizes, photographic hero, editorial captions. Apple Newsroom.",
          "**Corporate-clean** — blue accent, sans-serif, equal padding, card everything. Most B2B SaaS.",
          "**Handmade** — off-grid layouts, handwritten accent font, slightly wonky spacing. Small indie apps, craft sites.",
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: "Avoid these banned words",
          body: "Modern, clean, sleek, intuitive, seamless, beautiful, AI-powered, next-gen, elegant, user-friendly. They all mean 'I haven't decided yet.' If you catch one in your brief, replace it with a word from the list above.",
        },
      },

      { type: 'h', body: '4. Color, type, corner radius' },
      {
        type: 'p',
        body: "Pick one of each. Keep it boring and specific — the personality comes from the tone words, not from stacking six colors.",
      },
      {
        type: 'list',
        items: [
          "**Background** — off-white (#F8F7F4), pure white, warm cream (#FAF7F0), near-black (#0E1014), dark slate (#1A1D24), sepia (#F4EDD8). Pick one.",
          "**Accent color** — ONE color for v1. Used only on the primary button, links, and key highlights. Name it plainly ('warm orange', 'navy', 'terminal green') or give a hex.",
          "**Body font style** — geometric sans (Inter, Manrope), humanist sans (system-ui is fine), grotesk (Space Grotesk), serif (Fraunces, Georgia), mono (JetBrains Mono, SF Mono). The AI will pick a specific font in that family.",
          "**Display / heading style** — same as body (just bolder), serif display (big statement headings), oversized grotesk, or mono all-caps.",
          "**Corner radius** — sharp (0px), subtle (4px), friendly (10px), or pill (999px on buttons only). Pick one; apply it everywhere for consistency.",
        ],
      },

      { type: 'h', body: '5. Motion — how it moves' },
      {
        type: 'p',
        body: "Most beginner apps either have no motion (feels dead) or too much motion (feels like a toy). The fix is to name exactly WHEN motion happens and how it feels. These five rows are enough — each pulls from anime.js's vocabulary, which is what the AI already knows.",
      },
      {
        type: 'code',
        block: {
          kind: 'markdown',
          title: 'Motion vocabulary (pick one per row)',
          body: `On first page load:
  none | fade in | slide up and fade | STAGGER list items in
  (stagger = each item animates 40-80ms after the previous one)

On hover (buttons, cards, links):
  no change | subtle color shift | lift + shadow | underline wipe

On primary action (add / save / submit):
  no animation | inline checkmark | toast slides in from corner
  | confetti (don't — unless tone is 'playful')

Between screens / views:
  instant | crossfade | slide (horizontal for wizards, vertical for modals)

Easing character (the "feel" curve):
  linear (robotic)        — use sparingly, only for progress bars
  inOutQuad (crisp)       — default. ~180ms. Feels decisive.
  inOutExpo (smooth)      — ~400ms. Feels premium / cinematic.
  spring (bouncy)         — rubber-band feel. Only if tone is 'playful'.

Overall motion feel:
  none | restrained | playful`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'How motion maps to feel',
          body: "Utilitarian / technical / documentarian → 'none' or 'restrained', linear or inOutQuad easing. Premium / editorial → 'restrained', inOutExpo easing, crossfades between views. Playful / soft → 'playful', spring easing, stagger on load. If you pick 'playful' but your tone is 'utilitarian', the AI will ignore the tone and you'll get a toy.",
        },
      },
      {
        type: 'p',
        body: "You can also ask for specific motion tricks from the anime.js toolkit if they fit. Use the exact word — the AI understands these:",
      },
      {
        type: 'list',
        items: [
          "**Stagger** — animate a list so each item starts after the last. Great for task lists, grids, feeds on first load.",
          "**Scroll-triggered reveal** — things fade/slide into view as you scroll past them. Good for long marketing pages; do NOT use on dashboards.",
          "**Motion path** — an element follows a drawn path. Rarely useful in utility apps; good for playful onboarding.",
          "**Shape morph** — one SVG shape smoothly becomes another. Good for icon state changes (play → pause, hamburger → X).",
          "**Draggable with spring release** — the user can throw an element; it springs back on release. Good for reorderable lists.",
        ],
      },

      { type: 'h', body: 'Generic vs. specific — same app, two briefs' },
      {
        type: 'code',
        block: {
          kind: 'markdown',
          title: '❌ Generic (what the AI gets and has to guess on)',
          body: `Design an app for tracking tasks. It should be modern and clean,
with a nice UI and smooth animations. Easy to use.`,
        },
      },
      {
        type: 'code',
        block: {
          kind: 'markdown',
          title: '✅ Specific (what the AI can actually build)',
          body: `Design an app that tracks who is fixing what for a 6-person
maintenance crew's shift lead.

Layout: kanban columns, no nav, inline "Add task" form at the top
of the Open column. Density: balanced.

Tone: utilitarian, calm, technical. Background: off-white.
Accent: one warm orange (#E6A15C), used only on the priority dot
and the primary button. Body font: humanist sans. Corner radius:
subtle (4px). No drop shadows on cards.

Components: button, text input, select, card, badge, empty state,
toast. Nothing else.

Motion: stagger list items in on load (40ms apart, inOutQuad,
~180ms). Subtle color shift on card hover. Toast from bottom-right
on add/claim/complete. No animations elsewhere. Overall feel:
restrained.`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'That second brief IS the answer key',
          body: "Every line is a pick from a menu in this lesson. You are not being creative — you are being specific. Creativity is the idea itself (section 1 of the brief). The rest is just checking boxes.",
        },
      },

      {
        type: 'checklist',
        items: [
          'I can name my layout in one word (kanban, split pane, sidebar + content, …)',
          'I can pick 2–4 tone adjectives from the menu without using "modern" or "clean"',
          'I can list the components my app needs and leave out the ones it doesn\'t',
          'I can describe motion in one sentence ("stagger on load, crisp easing, restrained overall")',
          'I have picked ONE accent color, ONE background, ONE corner radius, ONE font style',
        ],
      },
    ],
  },
  {
    id: 'build-brief',
    number: 6,
    title: 'Write the Build Brief',
    subtitle: 'One markdown file. This is the real work.',
    goal: "You have a filled-in Build Brief in a plain text file or directly ready to paste.",
    estMinutes: 12,
    blocks: [
      {
        type: 'p',
        body: "The Build Brief is one markdown file with eleven short sections. Every section is a concrete pick — no open-ended prose. Copy the template, replace every <BRACKETED PLACEHOLDER> with a specific choice (pulling from the vocabulary you just learned), save it. You'll paste this whole thing into Codex or Claude Code in the next lesson.",
      },
      { type: 'h', body: 'The template — copy this' },
      {
        type: 'code',
        block: { kind: 'markdown', title: 'brief.md (template)', body: briefTemplate },
      },
      { type: 'h', body: 'A filled-in example — TaskBoard' },
      {
        type: 'p',
        body: "Notice: every field is concrete. No 'modern', no 'clean', no 'intuitive'. This is the brief we will use in the generation step.",
      },
      {
        type: 'code',
        block: { kind: 'markdown', title: 'brief.md (TaskBoard example)', body: briefExample },
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'Where to save it',
          body: "Paste the filled template into Notepad or VS Code and save as brief.md somewhere you'll find it (your Desktop is fine). You can also just keep it in a text file or a sticky note — as long as you can copy it later.",
        },
      },
      {
        type: 'checklist',
        items: [
          'Every section has at least one specific sentence',
          "I didn't use 'modern', 'clean', 'intuitive', 'seamless', or 'AI-powered'",
          'My "ship first" list has 3–5 items, not 12',
          'My "later" list has at least 3 things I actively chose to skip',
        ],
      },
    ],
  },
  {
    id: 'generate',
    number: 7,
    title: 'Design it in Codex or Claude Code',
    subtitle: 'One prompt. Every file back.',
    goal: 'The AI has produced every source file for the app — either as a set of labeled code blocks (Codex) or written directly to your Desktop (Claude Code).',
    estMinutes: 10,
    blocks: [
      {
        type: 'p',
        body: "Open your AI. Start a fresh conversation. Paste the prompt below for your chosen path, with your filled-in brief replacing the placeholder at the bottom.",
      },
      { type: 'h', body: 'Path A — ChatGPT Codex' },
      {
        type: 'code',
        block: { kind: 'prompt', title: 'Paste into ChatGPT', body: codexPrompt },
      },
      { type: 'h', body: 'What Codex should reply with' },
      {
        type: 'list',
        items: [
          'A file tree listing every file it is about to give you.',
          'One code block per file, each labeled with the file path (e.g. "taskboard/src/App.tsx").',
          'At minimum: package.json, tsconfig.json, vite.config.ts, index.html, src/main.tsx, src/App.tsx, src/index.css.',
          'A short block of PowerShell commands at the end to install and run.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'If Codex gets cut off',
          body: "Sometimes a long reply gets truncated. If the last file is incomplete, reply with: 'Please continue from <filename>. Only give me the rest of that file and any remaining files.'",
        },
      },
      { type: 'h', body: 'Path B — Claude Code' },
      {
        type: 'p',
        body: "Open PowerShell, cd to your Desktop, then start Claude Code. It will ask what to do. Paste the prompt below (with your brief at the bottom). Claude Code writes every file to disk automatically, inside a new taskboard folder.",
      },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\Users\\you>', command: 'cd $HOME\\Desktop' },
          { prompt: 'PS C:\\Users\\you\\Desktop>', command: 'claude' },
          {
            output:
              'Claude Code — ready.\nTell me what you want to build, paste instructions, or drop in a file.',
          },
        ],
      },
      {
        type: 'code',
        block: { kind: 'prompt', title: 'Paste into Claude Code', body: claudeCodePrompt },
      },
      {
        type: 'list',
        items: [
          "Claude Code will ask before writing each file — confirm with 'y' (or 'a' to approve all).",
          'When it finishes, you will see a new taskboard folder on your Desktop.',
          "If you're on Path B, you can skip the next lesson — your files are already on disk.",
        ],
      },
      {
        type: 'checklist',
        items: [
          "I pasted my brief into my chosen AI",
          "I got back (Codex) labeled code blocks for every file, OR (Claude Code) a taskboard folder on my Desktop",
          "The reply ended with PowerShell commands to run",
        ],
      },
    ],
  },
  {
    id: 'save-files',
    number: 8,
    title: 'Save the files to your Desktop',
    subtitle: 'Only for the Codex path. Claude Code users skip ahead.',
    goal: "You have a 'taskboard' folder on your Desktop containing every file Codex gave you, each with the correct name and contents.",
    estMinutes: 10,
    blocks: [
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'Claude Code path — skip this lesson',
          body: "If you used Claude Code, the files are already on your Desktop. Go to lesson 8.",
        },
      },
      {
        type: 'p',
        body: "Codex gave you every file's contents in the chat. Now you need to put them on disk, in the right folder, with the right names. There are two ways. Pick one.",
      },
      { type: 'h', body: 'Way 1 — Download the files (if Codex offered it)' },
      {
        type: 'list',
        items: [
          'Some Codex replies include a "Download project" button or a downloadable .zip.',
          'Click it. Save the .zip to your Desktop.',
          'Right-click the .zip → "Extract All…" → choose Desktop → Extract.',
          'You should now see a taskboard folder on your Desktop.',
        ],
      },
      { type: 'h', body: 'Way 2 — Create the files by hand (always works)' },
      {
        type: 'p',
        body: "Open PowerShell and make the project folder on your Desktop:",
      },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\Users\\you>', command: 'cd $HOME\\Desktop' },
          { prompt: 'PS C:\\Users\\you\\Desktop>', command: 'mkdir taskboard' },
          { prompt: 'PS C:\\Users\\you\\Desktop>', command: 'cd taskboard' },
          { prompt: 'PS C:\\Users\\you\\Desktop\\taskboard>' },
        ],
      },
      {
        type: 'p',
        body: "Now, for each file Codex gave you, create it and paste its contents. You can do this two ways — VS Code is easier:",
      },
      { type: 'h', body: 'Easier: use VS Code' },
      {
        type: 'list',
        items: [
          'If you don\'t have it, install VS Code from code.visualstudio.com (free).',
          'In PowerShell, inside the taskboard folder, run: code .',
          'VS Code opens the folder. In the left sidebar, right-click → New File → type the file path (e.g. src/App.tsx) → Enter.',
          'Copy the file\'s contents from the ChatGPT reply, paste into the editor, press Ctrl+S to save.',
          'Repeat for every file Codex listed.',
        ],
      },
      { type: 'h', body: 'Or: Notepad + PowerShell' },
      {
        type: 'list',
        items: [
          'In PowerShell, create a file: New-Item -Path "src\\App.tsx" -ItemType File -Force',
          'Open it in Notepad: notepad src\\App.tsx',
          'Paste the contents from ChatGPT, save (Ctrl+S), close Notepad.',
          'Repeat for each file.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: "Watch the file paths",
          body: "If Codex labeled a file 'taskboard/src/App.tsx' and you are already inside the taskboard folder, create it as 'src/App.tsx' (without the leading taskboard/). You do not want nested taskboard/taskboard folders.",
        },
      },
      { type: 'h', body: 'Verify everything is there' },
      {
        type: 'p',
        body: "Before moving on, check that the folder structure matches what Codex listed. Minimum you should see:",
      },
      {
        type: 'shellSession',
        lines: [
          {
            prompt: 'PS C:\\Users\\you\\Desktop\\taskboard>',
            command: 'Get-ChildItem -Recurse -Name',
          },
          {
            output:
              'index.html\npackage.json\ntsconfig.json\nvite.config.ts\nsrc\nsrc\\App.tsx\nsrc\\index.css\nsrc\\main.tsx',
          },
        ],
      },
      {
        type: 'checklist',
        items: [
          'I have a taskboard folder on my Desktop',
          'package.json and index.html are inside taskboard (not inside a nested subfolder)',
          'src\\App.tsx and src\\main.tsx exist',
          "If I open any file I pasted, I see the full contents (not half of it)",
        ],
      },
    ],
  },
  {
    id: 'run-locally',
    number: 9,
    title: 'Run it in PowerShell',
    subtitle: 'Three commands. Your prototype on localhost.',
    goal: 'Your app is running at http://localhost:5173/ and you can interact with it in a browser.',
    estMinutes: 6,
    blocks: [
      {
        type: 'p',
        body: "Your files are in C:\\Users\\you\\Desktop\\taskboard. Open PowerShell and run three commands in order. Each one either works or fails visibly.",
      },
      { type: 'h', body: '1. Go into the project folder' },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\Users\\you>', command: 'cd $HOME\\Desktop\\taskboard' },
          { prompt: 'PS C:\\Users\\you\\Desktop\\taskboard>' },
        ],
      },
      {
        type: 'p',
        body: "The prompt now shows you are inside the project. If you see 'Cannot find path', the folder name is wrong — run Get-ChildItem $HOME\\Desktop to see what is actually there.",
      },
      { type: 'h', body: '2. Install dependencies' },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\Users\\you\\Desktop\\taskboard>', command: 'npm install' },
          {
            output:
              'added 287 packages, and audited 288 packages in 14s\n\nfound 0 vulnerabilities',
          },
        ],
      },
      {
        type: 'p',
        body: "This reads package.json and downloads everything the project needs into a node_modules folder. You run this once per project (and again whenever package.json changes).",
      },
      { type: 'h', body: '3. Start the dev server' },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\Users\\you\\Desktop\\taskboard>', command: 'npm run dev' },
          {
            output:
              '  VITE v6.0.0  ready in 412 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose\n  ➜  press h + enter to show help',
          },
        ],
      },
      {
        type: 'p',
        body: "Ctrl+click the http://localhost:5173/ link in PowerShell (or paste it into any browser). You should see your app. Congratulations — you have vibe-coded a prototype onto your Desktop.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Leave this terminal running',
          body: "The dev server is a live process. Keep this PowerShell window open while you use the app. Every time you change a file, the page auto-reloads. To stop it, press Ctrl+C.",
        },
      },
      { type: 'h', body: 'Common errors' },
      {
        type: 'list',
        items: [
          "'npm is not recognized' → Node.js isn't installed, or you opened PowerShell before installing it. Close, reinstall if needed, open a fresh window.",
          "'Port 5173 is already in use' → another dev server is running somewhere. Either close that window, or run: npm run dev -- --port 5174",
          "A red wall of TypeScript errors → don't panic. Copy the first error verbatim. Go to the next lesson.",
        ],
      },
      {
        type: 'checklist',
        items: [
          'PowerShell prints "Local: http://localhost:5173/"',
          'The page loads in my browser',
          "I can see the UI my AI described",
        ],
      },
    ],
  },
  {
    id: 'iterate',
    number: 10,
    title: 'Fix it. Then add one feature.',
    subtitle: 'The real loop.',
    goal: "You know how to hand an error back to your AI, apply the fix, and request a single new feature without breaking the app.",
    estMinutes: 10,
    blocks: [
      {
        type: 'p',
        body: "Nothing runs the first time forever. You will see errors. The skill is not 'never break things' — it is 'break things, copy the error, paste it back, apply the fix, verify.' That loop is vibe coding.",
      },
      { type: 'h', body: 'When PowerShell shows an error' },
      {
        type: 'p',
        body: "Copy the first error message exactly. Do not paraphrase it. Paste it into the debug prompt below, back into the same AI conversation you used to generate the project.",
      },
      {
        type: 'code',
        block: { kind: 'prompt', title: 'Debug prompt', body: debugPrompt },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Why exact text matters',
          body: "If you describe the error ('it says something about a module'), the AI has to guess. If you paste the exact text, it sees the line number and the symbol name. The fix rate is dramatically different.",
        },
      },
      { type: 'h', body: 'Example: a real error and a real fix' },
      {
        type: 'code',
        block: {
          kind: 'output',
          title: 'PowerShell output (the error)',
          body: "src/App.tsx:12:14 - error TS2304: Cannot find name 'useState'.\n\n12   const [tasks, setTasks] = useState([])\n                  ~~~~~~~~",
        },
      },
      {
        type: 'p',
        body: "Paste the debug prompt with this error. The AI replies: 'You forgot to import useState from react.' It tells you to change line 1 of src/App.tsx from `import React from \"react\"` to `import React, { useState } from \"react\"`. You open the file in VS Code, change the line, save. PowerShell auto-reloads. Error gone.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Codex vs Claude Code on fixes',
          body: "With Codex, the AI gives you a snippet — you edit the file yourself. With Claude Code, you can just say 'apply that fix' and it will edit the file on disk. Both work. Claude Code is faster.",
        },
      },
      { type: 'h', body: 'When the app works and you want more' },
      {
        type: 'p',
        body: "Resist asking for five features at once. Ask for one. Test it in the browser. Ask for the next.",
      },
      {
        type: 'code',
        block: { kind: 'prompt', title: 'Add-one-feature prompt', body: addFeaturePrompt },
      },
      { type: 'h', body: 'The habit' },
      {
        type: 'list',
        items: [
          'Save a file → watch the browser reload → click around.',
          'If it broke, copy the error → paste into debug prompt → apply fix.',
          'If it works, tick a checklist item in your brief.',
          'Want more? Pick ONE item from your "later" list, move it to the top, use the add-feature prompt.',
        ],
      },
      {
        type: 'checklist',
        items: [
          'I have pasted at least one real error into the debug prompt',
          'I have applied an AI-proposed fix and verified it in the browser',
          "I have added one small feature without breaking the rest of the app",
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: "That's the whole loop",
          body: "Brief → Codex or Claude Code → Desktop folder → npm install → npm run dev → iterate. Every app you vibe-code uses this same cycle. The rest is practice.",
        },
      },
    ],
  },
]

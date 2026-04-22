import type { BuildPackage, ChapterDef, PowerShellCommand } from '../types/models'

export const chapters: ChapterDef[] = [
  {
    id: 'mission',
    number: 1,
    title: 'The Mission Sentence',
    question: 'What are you actually building, in one sentence?',
    why: 'AI coding agents are pattern-matchers. Without a mission sentence, they fall back to the average app on the internet. With one, every later choice has a compass.',
    lesson: [
      {
        heading: 'What a mission sentence is',
        body: 'A single sentence that names the audience, the outcome, and the change it creates in their day. Not a pitch. Not a tagline. A decision tool you can hold every later choice against.',
      },
      {
        heading: 'The three parts',
        body: 'Audience — who specifically uses this. Outcome — the observable result. Change — the friction this removes or the behavior this unlocks. If you cannot name all three, you are not ready to prompt anything yet.',
      },
      {
        heading: 'How you will use it',
        body: 'Paste it at the top of the Build Prompt Package. The agent reads it first. Every feature, every UI decision, every non-goal you add later gets weighed against it.',
      },
    ],
    example: {
      bad: 'A modern productivity app with AI.',
      good: 'A maintenance tracker that turns a facility crew\'s scattered group texts into one ranked list the shift lead checks before the morning walk.',
    },
    microDeliverable: 'One sentence in the panel on the right. Audience + outcome + change.',
    youKnowThisWhen: [
      'A friend could read it once and tell you who it is for.',
      'You could say "no" to a feature suggestion by pointing at the sentence.',
      'The sentence names a specific audience, not "everyone" or "teams".',
    ],
  },
  {
    id: 'problem',
    number: 2,
    title: 'The Problem Statement',
    question: 'Who hurts, where, and what does "better" look like?',
    why: 'Agents can implement anything. They cannot decide what matters. A four-part problem statement forces you to diagnose before you prescribe — and it gives the agent the "why" behind every later requirement.',
    lesson: [
      {
        heading: 'Diagnose before you design',
        body: 'Skipping the problem and jumping to screens is the #1 reason AI-generated apps feel generic. You end up describing a UI for a problem you have not defined. The agent renders something plausible but pointless.',
      },
      {
        heading: 'Four parts, four questions',
        body: 'Who hurts (one role). Where it hurts (the current pain, in one sentence). The current workaround (what people already do without your app). The desired outcome (observable, testable).',
      },
      {
        heading: 'Workarounds are gold',
        body: 'Whatever people do today without your app — group texts, spreadsheets, sticky notes — is a signal about what they actually value. Your MVP almost always replaces the workaround, not the idealized flow.',
      },
    ],
    example: {
      bad: 'Everyone is disorganized and needs better tools.',
      good: 'Field technicians at one plant lose tasks in scattered texts (pain). They currently re-ask the shift lead each morning (workaround). Success: one shared list with owner + status, checked before the first walk (outcome).',
    },
    microDeliverable: 'Fill all four fields on the right.',
    youKnowThisWhen: [
      'You can describe the workaround in one concrete sentence.',
      'The desired outcome is something you could verify — not a vibe.',
      'You did not write the word "streamline" or "optimize".',
    ],
  },
  {
    id: 'user',
    number: 3,
    title: 'The User & Job-To-Be-Done',
    question: 'Who is this for, and what job are they hiring it to do?',
    why: 'One concrete user beats three fuzzy personas. When the agent knows exactly whose day this sits in, it generates concrete UI instead of generic dashboards.',
    lesson: [
      {
        heading: 'Pick one primary user',
        body: 'Not your stretch market. Not "also useful for managers." The single person whose life this most improves. All UI decisions serve them first.',
      },
      {
        heading: 'Job-to-be-done framing',
        body: 'Use the pattern: "When <trigger situation>, I want to <action>, so that <outcome>." It forces you to name the moment the app enters their day.',
      },
      {
        heading: 'Three stories is enough',
        body: 'One entry story (how they start), one core story (the main loop), one exit story (handoff, share, or archive). More stories in v1 means more agent confusion.',
      },
    ],
    example: {
      bad: 'Users can do anything they want from one page.',
      good: 'Persona: shift-lead technician, mobile-first, 10 minutes before walk-off. Job: "When I arrive on shift, I want the top three tasks surfaced, so I skip the text scroll." Stories: see top 3 → mark one done → hand the list to night shift.',
    },
    microDeliverable: 'One persona, one primary job, three stories.',
    youKnowThisWhen: [
      'You can name the exact moment your user opens the app.',
      'Your three stories trace one coherent loop — entry, core, exit.',
      'Someone else reading them could sketch the screens.',
    ],
  },
  {
    id: 'mvp',
    number: 4,
    title: 'The MVP Line',
    question: 'What ships first, what ships next, what waits?',
    why: 'The biggest failure mode with AI coding agents is "build me everything." Loose scope produces unstable architecture. A triage board draws the line you will have to defend, in advance.',
    lesson: [
      {
        heading: 'Three columns, one rule',
        body: 'Now: only what the primary user needs to complete their core loop once. Next: adjacent improvements after first release. Later: ideas you will not delete but will not build yet.',
      },
      {
        heading: 'If in doubt, Later',
        body: 'Features cost more than you think in an AI-generated codebase: each one widens the surface the agent has to keep coherent. When unsure, move it to Later. You can always promote it.',
      },
      {
        heading: 'Non-goals are a feature',
        body: 'Explicitly naming what you will NOT build is how you prevent scope creep. The agent respects named exclusions. "No auth in v1" is one less whole subsystem to generate.',
      },
    ],
    example: {
      bad: 'v1 includes auth, payments, social feed, admin analytics, and an AI chat assistant.',
      good: 'Now: list tasks, mark done, reassign. Next: search, history, CSV export. Later: auth, multi-facility, mobile app.',
    },
    microDeliverable: 'Place every feature you can think of into Now / Next / Later.',
    youKnowThisWhen: [
      'Your Now column is 3–5 items, not 12.',
      'Someone could ship just the Now items and the app would still be useful.',
      'You resisted putting at least one exciting feature into Now.',
    ],
  },
  {
    id: 'map',
    number: 5,
    title: 'The Route Map',
    question: 'What routes exist and what does each page do?',
    why: 'AI agents generate clearer code from clearer maps. An explicit route list plus a page-to-feature matrix is how you convert fuzzy requirements into predictable output.',
    lesson: [
      {
        heading: 'Routes are nouns, not adjectives',
        body: 'Write actual paths: /dashboard, /task/:id, /history. Not "a place where users can view tasks." The agent is going to generate <Route> entries — give it the real strings.',
      },
      {
        heading: 'Matrix over paragraphs',
        body: 'For each route, list the features it contains as short phrases. This table becomes the generation plan. One row per page, features as a comma-separated list: "list, filter by status, empty state".',
      },
      {
        heading: 'Empty, loading, error',
        body: 'Every feature you list has three states you usually forget. Writing "empty state" in the matrix is the single cheapest way to prevent your app from looking broken on day one.',
      },
    ],
    example: {
      bad: 'A dashboard, and some other pages for tasks and history.',
      good: '/dashboard — top-3 list, quick-mark-done, empty state. /task/:id — detail, reassign, notes. /history — filter by date + owner, CSV export.',
    },
    microDeliverable: 'A list of routes and a page → features matrix.',
    youKnowThisWhen: [
      'Every route is a real path string, not a description.',
      'Every row names at least one non-happy-path state.',
      'A stranger could navigate your app from the map alone.',
    ],
  },
  {
    id: 'look',
    number: 6,
    title: 'The UI Language',
    question: 'How should it feel — not "clean and modern," specifically?',
    why: 'Adjectives are vapor. "Clean" and "modern" mean nothing to an agent. Density, motion intensity, tone words, and rhythm notes are things it can actually render.',
    lesson: [
      {
        heading: 'Replace adjectives with dimensions',
        body: 'Pick 2–4 tone words from the chips — these set the vocabulary. Then choose density (airy/balanced/dense) and motion intensity (minimal/present/cinematic). These are the dials the agent needs.',
      },
      {
        heading: 'Notes carry the rhythm',
        body: 'In the notes field, describe layout rhythm the way you would describe music: "large display serif headings, 100svh hero, 1px hairlines between sections, 8px spacing grid, small mono eyebrow labels."',
      },
      {
        heading: 'Reference, but do not copy',
        body: 'You can name a site whose feel you want (e.g. "igloo.inc-editorial"), but back it with specifics. "Like X" without specifics produces "kind of like X" output.',
      },
    ],
    example: {
      bad: 'Clean, minimal, modern, with smooth animations.',
      good: 'Tone: editorial + utilitarian. Density: airy. Motion: present. Notes: serif display headlines, monospace eyebrows, 1px hairlines, 100svh hero, subtle magnetic buttons, word-stagger reveals on H1s.',
    },
    microDeliverable: 'Chips + density + motion + a concrete notes paragraph.',
    youKnowThisWhen: [
      'You did not type "clean" or "modern".',
      'Your notes describe at least three specific layout or motion behaviors.',
      'Someone could implement your notes without asking clarifying questions.',
    ],
  },
  {
    id: 'stack',
    number: 7,
    title: 'Stack & Constraints',
    question: 'What is it built with, and what are you explicitly not doing?',
    why: 'Defaults save time; non-goals save sanity. A named constraint is code the agent will not generate, a feature you will not have to delete.',
    lesson: [
      {
        heading: 'Default to boring',
        body: 'React + TypeScript + Vite is an excellent default for a prototype. The stack choices here are not where you earn points — the Mission sentence is. Pick defaults, move on.',
      },
      {
        heading: 'Data: start local',
        body: 'For your first prototype, "localStorage" beats any database. Persistence without a backend. You can swap later. The agent will not invent a server if you tell it not to.',
      },
      {
        heading: 'Non-goals are a safety rail',
        body: 'Write down every tempting feature you want to actively exclude from v1: auth, payments, analytics, multi-tenant, dark mode, mobile app. The agent will respect named exclusions.',
      },
    ],
    example: {
      bad: 'React, maybe Next, probably Supabase, possibly Auth0, definitely Stripe.',
      good: 'React + TypeScript + Vite. Data: localStorage only. Auth: none in v1. Deploy: static to GitHub Pages. Non-goals: payments, admin, multi-facility, mobile app, dark mode.',
    },
    microDeliverable: 'Stack fields filled + at least three non-goals.',
    youKnowThisWhen: [
      'You can explain each stack choice in one sentence.',
      'Your non-goals list is longer than your Now list.',
      'Nothing in your stack requires you to stand up a backend before running npm run dev.',
    ],
  },
  {
    id: 'acceptance',
    number: 8,
    title: 'Acceptance Criteria',
    question: 'How will you know it works?',
    why: 'Acceptance criteria are how you grade the agent\'s output. No criteria means endless "almost." A checklist turns a subjective judgment into a testable one.',
    lesson: [
      {
        heading: 'Testable, not aspirational',
        body: 'Each bullet should be a thing you (or someone else) could verify in 30 seconds: "The dashboard renders an empty state when no tasks exist." Not "The app should feel responsive."',
      },
      {
        heading: 'Derive from earlier chapters',
        body: 'Good criteria fall out of your stories, your map, and your UI language. If a bullet does not trace back to one of those, it is probably too vague or out of scope.',
      },
      {
        heading: 'Use it after every generation',
        body: 'When the agent hands back code, run the checklist before touching the keyboard. Pass/fail. Everything that fails becomes the next iteration prompt.',
      },
    ],
    example: {
      bad: 'The app should be fast, easy, and beautiful.',
      good: '• /dashboard shows up to 3 tasks sorted by priority. • Marking done removes the task in < 300ms. • With no tasks, the dashboard renders an explicit empty state with a primary CTA. • Every route has a visible route-level loading indicator when data is pending.',
    },
    microDeliverable: 'A checklist of 4–8 verifiable bullets.',
    youKnowThisWhen: [
      'Every bullet is observable from the outside.',
      'Each bullet traces back to a user story or UI note.',
      'You could hand the list to someone else and they could grade the app.',
    ],
  },
  {
    id: 'assemble',
    number: 9,
    title: 'Assemble the Package',
    question: 'Does the whole package read like a single, sharp brief?',
    why: 'Read it as the agent will read it. Cut anything generic. Keep anything decisive. This is the artifact you hand off.',
    lesson: [
      {
        heading: 'Read it out loud once',
        body: 'Literally. If a sentence sounds like a LinkedIn post or a marketing page, delete it or rewrite it. The agent does not need aspiration, it needs instruction.',
      },
      {
        heading: 'Kill any "should"',
        body: 'Replace "should be fast" with a number or a behavior. Replace "should feel modern" with a specific tone word. "Should" is where ambiguity hides.',
      },
      {
        heading: 'Copy the markdown',
        body: 'Use the Copy button below (or on the /package page). This is the single file you paste into your agent as the first message. Keep a copy somewhere — you will reuse it every iteration.',
      },
    ],
    example: {
      bad: 'A modern productivity app that should feel fast and be easy to use.',
      good: '[The full markdown from chapters 1–8, read top to bottom, with every section concrete and specific.]',
    },
    microDeliverable: 'Review the live preview on the right. Copy it once you are happy.',
    youKnowThisWhen: [
      'Reading top to bottom, there are no generic sentences.',
      'Every section has at least one specific detail.',
      'You would not be embarrassed for a friend to read it.',
    ],
  },
  {
    id: 'run',
    number: 10,
    title: 'Launch to Your Desktop',
    question: 'How do you actually get the agent\'s output running on your PC?',
    why: 'A brief is worthless until the prototype is running on your desktop. This chapter teaches the exact PowerShell workflow that closes the loop — from "AI gave me files" to "my app is live at localhost:5173."',
    lesson: [
      {
        heading: 'Pick your agent and paste the package',
        body: 'Open Claude Code, Cursor, GitHub Copilot Chat, or Codex CLI. Paste the full markdown as your first message. Ask for: "Scaffold the project using the stack and routes above. Start with only the Now features. After generation, tell me where the files were written."',
      },
      {
        heading: 'Find the project folder',
        body: 'The agent will either create files directly (Cursor/Claude Code) or hand you a zip (ChatGPT web). Move or extract to a stable path, e.g. C:\\projects\\my-app. Avoid OneDrive-synced folders — file watchers misbehave.',
      },
      {
        heading: 'Open PowerShell at the project',
        body: 'Shift + right-click the project folder in File Explorer → "Open in Terminal." Or press Win and type "powershell". Then cd into the folder. You are about to run four commands.',
      },
      {
        heading: 'Run the four-command ladder',
        body: 'See the PowerShell panel on the right. Each command has an explanation, the expected output, and the most common error + fix. Run them in order, verify the output, move on.',
      },
      {
        heading: 'What "success" looks like',
        body: 'The dev server prints "Local: http://localhost:5173/". Ctrl-click that link (or paste it into a browser). You should see your landing page. Congratulations — you have vibe-coded an idea into a running prototype.',
      },
      {
        heading: 'Iterate with the debug template',
        body: 'When something breaks — and something always breaks — do not reprompt from scratch. Copy the exact error from PowerShell, open the agent, paste it into the "Targeted debug" template from the Library, and let it propose a minimal patch.',
      },
    ],
    example: {
      bad: 'Run some commands and it should work.',
      good: 'cd C:\\projects\\my-app → npm install → npm run dev → open http://localhost:5173 → see the landing page → break something on purpose → copy error → debug template.',
    },
    microDeliverable: 'Your prototype running in a browser, served by PowerShell.',
    youKnowThisWhen: [
      'You can cd, install, and run dev without looking at this page.',
      'You know what a TypeScript error in the terminal looks like vs. a runtime error in the browser.',
      'You have iterated once — changed a word on the landing page, seen the hot reload.',
    ],
  },
]

export const runSteps: PowerShellCommand[] = [
  {
    command: 'cd C:\\projects\\my-app',
    explanation: 'Move your PowerShell session into the project folder the agent produced. Replace the path with wherever you actually put the files.',
    expected: 'The prompt changes to: PS C:\\projects\\my-app>',
    commonError: {
      error: 'Set-Location : Cannot find path ...',
      fix: 'The folder name is wrong. Run `dir C:\\projects` to see real names, or drag the folder into the terminal window — PowerShell will paste the correct path.',
    },
  },
  {
    command: 'npm install',
    explanation: 'Downloads every dependency listed in package.json into a local node_modules folder. Only needed once per project — and again after you pull new code.',
    expected: 'added N packages, and audited N packages in Xs\nfound 0 vulnerabilities',
    commonError: {
      error: 'npm : The term \'npm\' is not recognized...',
      fix: 'Node.js is not installed. Download the LTS from https://nodejs.org, run the installer, close and reopen PowerShell, try again.',
    },
  },
  {
    command: 'npm run dev',
    explanation: 'Starts the Vite development server. This is the one you leave running while you build — it hot-reloads every time you save a file.',
    expected: 'VITE vX.Y.Z  ready in Xms\n➜  Local:   http://localhost:5173/',
    commonError: {
      error: 'Error: Port 5173 is already in use',
      fix: 'Another project is already running. Either close that terminal, or run `npm run dev -- --port 5174` to use a different port.',
    },
  },
  {
    command: 'npm run build',
    explanation: 'Creates a production build and catches every TypeScript error across the project. Run this after every significant agent iteration — it surfaces issues `npm run dev` sometimes hides.',
    expected: '✓ N modules transformed.\n✓ built in Xms',
    commonError: {
      error: 'error TS2304: Cannot find name \'X\'',
      fix: 'A TypeScript error. Copy the full error into the "Targeted debug" template from the Library and hand it back to the agent — do not try to fix manually first.',
    },
  },
]

export const emptyPackage: BuildPackage = {
  mission: '',
  problem: { who: '', pain: '', workaround: '', outcome: '' },
  user: { persona: '', primaryJob: '', stories: ['', '', ''] },
  mvp: { now: [], next: [], later: [] },
  map: { routes: [], matrix: [] },
  look: { tone: [], density: 'balanced', motion: 'present', notes: '' },
  stack: {
    framework: 'React + TypeScript + Vite',
    data: 'local (localStorage)',
    auth: 'none',
    deploy: 'static (GitHub Pages / Vercel)',
    nonGoals: [],
  },
  acceptance: [],
  handoff: { agent: 'Claude Code', firstPrompt: '' },
}

export const toneOptions = [
  'editorial',
  'mission-control',
  'brutalist',
  'cinematic',
  'playful',
  'utilitarian',
  'monospaced',
  'archival',
  'soft-minimal',
]

export const agentOptions = ['Claude Code', 'Cursor', 'GitHub Copilot', 'Codex CLI', 'Windsurf']

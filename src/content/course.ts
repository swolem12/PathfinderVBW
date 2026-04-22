export type LessonId =
  | 'what-is-vibe-coding'
  | 'setup'
  | 'pick-idea'
  | 'build-brief'
  | 'generate'
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

export const briefTemplate = `# Build Brief — <Your App Name>

## 1. The idea, in one sentence
<Audience> uses this to <outcome> so that <change in their day>.

## 2. The user
- Who (one role, be specific):
- When they open the app:
- The one thing they must be able to do:

## 3. Three user stories
1. As a <role>, I can <action>, so that <outcome>.
2. As a <role>, I can <action>, so that <outcome>.
3. As a <role>, I can <action>, so that <outcome>.

## 4. Features — ship first
- [ ]
- [ ]
- [ ]

## 5. Features — later (do NOT build yet)
- auth / login
- payments
- multi-user realtime
- <other things you want but do not need for v1>

## 6. Stack
- Framework: React + TypeScript + Vite
- Storage: browser localStorage (no backend)
- Styling: plain CSS or Tailwind
- Deploy: none for now (run locally in PowerShell)

## 7. Look & feel (be specific, avoid "modern/clean")
- Density: airy | balanced | dense
- Tone words (2–4):
- Rhythm notes:

## 8. Done means
- [ ] The app loads at http://localhost:5173/
- [ ] I can <primary action> without errors
- [ ] Data I enter is still there after I refresh
- [ ] Empty states are visible (not blank screens)
`

export const briefExample = `# Build Brief — TaskBoard

## 1. The idea, in one sentence
A small maintenance crew uses this to track who is fixing what, so the shift lead stops chasing people on group text.

## 2. The user
- Who: shift-lead technician at one facility.
- When they open the app: start of shift, on a phone or a laptop in the shop.
- The one thing they must be able to do: see every open task and who owns it, in one screen.

## 3. Three user stories
1. As a shift lead, I can add a new task with a title and priority, so the crew sees it immediately.
2. As a technician, I can claim an open task, so everyone knows I'm on it.
3. As a technician, I can mark my task done, so it disappears from the open list.

## 4. Features — ship first
- [ ] Add task (title + priority: low/med/high)
- [ ] List tasks grouped by status: Open / In Progress / Done
- [ ] Claim a task (sets owner = "me" and status = In Progress)
- [ ] Mark a task done

## 5. Features — later (do NOT build yet)
- login / user accounts
- multi-user realtime sync
- comments on tasks
- photo attachments
- push notifications

## 6. Stack
- Framework: React + TypeScript + Vite
- Storage: browser localStorage (no backend)
- Styling: plain CSS
- Deploy: none for now (run locally in PowerShell)

## 7. Look & feel
- Density: balanced
- Tone words: utilitarian, readable, calm
- Rhythm notes: 3 columns on desktop, stacked on mobile. Priority shown as a colored dot. No animation. Sans-serif.

## 8. Done means
- [ ] The app loads at http://localhost:5173/
- [ ] I can add a task, claim it, and mark it done without errors
- [ ] Refreshing the page keeps my tasks
- [ ] An empty "Open" column shows a short empty-state message, not a blank box
`

export const generatePrompt = `I want to build a small web app. Below is my Build Brief.

Please do the following:
1. Scaffold a new React + TypeScript + Vite project in a folder called \`taskboard\`.
2. Implement ONLY the features under "Features — ship first". Do NOT implement anything from the "later" list.
3. Use browser localStorage for persistence. No backend.
4. Use plain CSS (no UI libraries). Keep it readable.
5. Handle empty states, so the app never looks broken.
6. After writing the files, print a short summary: (a) the list of files you created, (b) the exact PowerShell commands I should run to install and start the app.

Here is the brief:

<PASTE THE FILLED-IN BUILD BRIEF HERE>`

export const debugPrompt = `The dev server printed this error:

\`\`\`
<PASTE THE EXACT ERROR FROM POWERSHELL>
\`\`\`

Please:
1. Explain in one sentence what is wrong.
2. Propose the smallest possible fix (which file, which lines).
3. Do not refactor anything unrelated.
4. After I apply the fix, tell me how to verify it worked.`

export const addFeaturePrompt = `The app is working. I want to add ONE feature:

<DESCRIBE THE ONE FEATURE IN ONE SENTENCE — e.g. "show the number of open tasks in the page title">

Constraints:
- Change as few files as possible.
- Do not touch unrelated features.
- After the change, tell me exactly what to test in the browser to confirm it works.`

export const lessons: LessonDef[] = [
  {
    id: 'what-is-vibe-coding',
    number: 1,
    title: 'What vibe coding actually is',
    subtitle: 'And what it is not.',
    goal: 'You can explain, in your own words, what you give the AI and what you expect back.',
    estMinutes: 4,
    blocks: [
      {
        type: 'p',
        body: 'Vibe coding is using an AI coding agent (Cursor, GitHub Copilot, Claude Code, Codex, etc.) to write most of the code for you, while you stay in the role of director. You describe what you want. It writes files. You run them.',
      },
      {
        type: 'p',
        body: "It is not 'type a sentence and get a finished app.' The agent needs three things from you, every time: a clear brief, a place to put the files, and a way to run the result. This course teaches all three.",
      },
      { type: 'h', body: 'What you provide' },
      {
        type: 'list',
        items: [
          'A Build Brief: one page describing the app, the user, and what ships first.',
          'A project folder on your computer where files can be created.',
          'A terminal (PowerShell) to install dependencies and run the app.',
        ],
      },
      { type: 'h', body: 'What the AI provides' },
      {
        type: 'list',
        items: [
          'Source files (.tsx, .ts, .css, package.json, etc.).',
          'The exact commands to install and run the project.',
          'Fixes when you paste an error back to it.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'The one rule',
          body: "If you cannot describe the app in a paragraph, the AI cannot build it. The brief isn't bureaucracy — it is the work.",
        },
      },
    ],
  },
  {
    id: 'setup',
    number: 2,
    title: 'One-time setup',
    subtitle: 'Node.js, a folder, a terminal, an AI.',
    goal: "Your computer has Node.js, a project folder you'll use, and an AI agent you can paste prompts into.",
    estMinutes: 8,
    blocks: [
      { type: 'h', body: '1. Install Node.js' },
      {
        type: 'p',
        body: "Go to nodejs.org, download the LTS installer, run it with default options. Node.js is what runs JavaScript/TypeScript outside the browser — every React project needs it.",
      },
      { type: 'h', body: '2. Open PowerShell and verify' },
      {
        type: 'p',
        body: "Press the Windows key, type 'powershell', press Enter. Then run the two commands below. You should see version numbers (not errors).",
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
          body: "Close PowerShell completely and open a new window. The installer only updates environment variables for new shells.",
        },
      },
      { type: 'h', body: '3. Create a projects folder' },
      {
        type: 'p',
        body: "Pick a simple path like C:\\projects. Avoid OneDrive-synced folders — file watchers misbehave there, and your dev server will randomly reload.",
      },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\Users\\you>', command: 'mkdir C:\\projects' },
          { prompt: 'PS C:\\Users\\you>', command: 'cd C:\\projects' },
          { prompt: 'PS C:\\projects>' },
        ],
      },
      { type: 'h', body: '4. Pick an AI coding agent' },
      {
        type: 'p',
        body: "Any of these work for this course. Pick the one you already have access to:",
      },
      {
        type: 'list',
        items: [
          'Cursor (editor) — writes files directly into your project. Easiest.',
          'GitHub Copilot Chat (inside VS Code) — writes files directly.',
          'Claude Code (CLI) — runs in PowerShell, edits files in place.',
          'ChatGPT / Claude.ai (browser) — you copy/paste files manually. Works, just slower.',
        ],
      },
      {
        type: 'checklist',
        items: [
          'node -v prints a version',
          'npm -v prints a version',
          'I have a C:\\projects folder',
          'I can open an AI chat where I can paste a long message',
        ],
      },
    ],
  },
  {
    id: 'pick-idea',
    number: 3,
    title: 'Pick an idea',
    subtitle: 'One sentence. One user. One main action.',
    goal: "You have a one-sentence pitch for your app with an audience, an outcome, and a 'why this helps them.'",
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
          title: 'You can use our example',
          body: 'If you just want to follow along and learn the workflow first, use TaskBoard as your idea. Come back with your own idea on pass two.',
        },
      },
    ],
  },
  {
    id: 'build-brief',
    number: 4,
    title: 'Write the Build Brief',
    subtitle: 'One markdown file. This is the whole job.',
    goal: "You have a filled-in Build Brief saved as brief.md on your computer.",
    estMinutes: 10,
    blocks: [
      {
        type: 'p',
        body: "The Build Brief is one markdown file with eight short sections. You copy the template, fill it in, save it. Every later step pastes this file into the AI.",
      },
      { type: 'h', body: 'The template — copy this' },
      {
        type: 'code',
        block: { kind: 'markdown', title: 'brief.md (template)', body: briefTemplate },
      },
      { type: 'h', body: 'A filled-in example — TaskBoard' },
      {
        type: 'p',
        body: "Here is the template filled in for our sample app. Notice how every field is concrete. No 'modern', no 'clean', no 'intuitive'.",
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
          body: 'Save as C:\\projects\\brief.md. Use VS Code, Notepad, or the editor in your AI agent — any plain text will do.',
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
    number: 5,
    title: 'Generate the project',
    subtitle: 'Hand the brief to the AI.',
    goal: 'The AI has produced a folder with a package.json and source files, and you know where they live.',
    estMinutes: 8,
    blocks: [
      {
        type: 'p',
        body: "Open your AI agent. Start a fresh conversation. Paste the prompt below, replacing the placeholder with your filled-in brief from the previous lesson.",
      },
      { type: 'h', body: 'The generation prompt' },
      {
        type: 'code',
        block: { kind: 'prompt', title: 'Paste into your AI', body: generatePrompt },
      },
      { type: 'h', body: 'What you should get back' },
      {
        type: 'list',
        items: [
          'A list of files the AI created (or file contents to paste, if your agent can\'t write directly).',
          'A package.json with the project\'s dependencies.',
          'At minimum: src/App.tsx (or similar), src/main.tsx, index.html, vite.config.ts.',
          'A short summary ending with the commands to install and run it.',
        ],
      },
      { type: 'h', body: 'If your agent writes files directly (Cursor / Copilot / Claude Code)' },
      {
        type: 'p',
        body: "You're done with this lesson. Verify the folder exists with `dir` in PowerShell:",
      },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\projects>', command: 'dir taskboard' },
          {
            output:
              'Mode    LastWriteTime    Name\n----    -------------    ----\nd----   <today>          node_modules (maybe)\nd----   <today>          src\n-a---   <today>          package.json\n-a---   <today>          index.html\n-a---   <today>          vite.config.ts',
          },
        ],
      },
      { type: 'h', body: "If your agent can't write files (ChatGPT / Claude.ai web)" },
      {
        type: 'list',
        items: [
          'Create the folder manually: mkdir C:\\projects\\taskboard',
          'For each file the AI gave you, create it: New-Item -Path "C:\\projects\\taskboard\\src\\App.tsx" -ItemType File -Force',
          "Open the file in Notepad or VS Code and paste the contents. Save.",
          'Repeat until all the files the AI listed exist.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: "Don't skim this step",
          body: "If a file is missing or you pasted only half of it, the next lesson will fail with a confusing error. It's faster to verify now than debug later.",
        },
      },
    ],
  },
  {
    id: 'run-locally',
    number: 6,
    title: 'Run it in PowerShell',
    subtitle: 'Three commands. Your prototype on localhost.',
    goal: 'Your app is running at http://localhost:5173/ and you can interact with it in a browser.',
    estMinutes: 6,
    blocks: [
      {
        type: 'p',
        body: "Open PowerShell. You're going to run three commands, in order. Each one either works or fails visibly — there's no 'silently wrong' state to worry about.",
      },
      { type: 'h', body: '1. Go into the project' },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\projects>', command: 'cd taskboard' },
          { prompt: 'PS C:\\projects\\taskboard>' },
        ],
      },
      {
        type: 'p',
        body: "The prompt changes to show you're inside the project. If it says 'Cannot find path', the folder name is wrong — run `dir C:\\projects` to see real names.",
      },
      { type: 'h', body: '2. Install dependencies' },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\projects\\taskboard>', command: 'npm install' },
          {
            output:
              'added 287 packages, and audited 288 packages in 14s\n\nfound 0 vulnerabilities',
          },
        ],
      },
      {
        type: 'p',
        body: "This reads package.json and downloads everything the project needs into a `node_modules` folder. You only run this once per project (plus whenever you pull new code).",
      },
      { type: 'h', body: '3. Start the dev server' },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\projects\\taskboard>', command: 'npm run dev' },
          {
            output:
              '  VITE v6.0.0  ready in 412 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose\n  ➜  press h + enter to show help',
          },
        ],
      },
      {
        type: 'p',
        body: "Ctrl+click that http://localhost:5173/ link, or paste it into your browser. You should see your app. Congratulations — you have vibe-coded a prototype onto your desktop.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Leave this terminal running',
          body: "The dev server is a process; it needs to stay alive for the app to keep working. Every time you save a file, it auto-reloads the page. To stop it, press Ctrl+C.",
        },
      },
      { type: 'h', body: 'Common errors you might hit' },
      {
        type: 'list',
        items: [
          "'npm is not recognized' → Node.js isn't installed, or you opened PowerShell before installing it. Close, reinstall, open a fresh window.",
          "'Port 5173 is already in use' → another dev server is running. Either close that terminal, or run: npm run dev -- --port 5174",
          "A red wall of TypeScript errors → don't panic. Copy the first error. Jump to the next lesson.",
        ],
      },
      {
        type: 'checklist',
        items: [
          'PowerShell shows "Local: http://localhost:5173/"',
          'The page loads in my browser',
          'I can see the UI the AI described',
        ],
      },
    ],
  },
  {
    id: 'iterate',
    number: 7,
    title: 'Fix it. Then add one feature.',
    subtitle: 'The real loop.',
    goal: "You know how to hand an error back to the AI, and how to request a single new feature without breaking the app.",
    estMinutes: 10,
    blocks: [
      {
        type: 'p',
        body: "Nothing runs the first time forever. You will see errors. The skill is not 'never break things' — it is 'break things, copy the error, hand it back, apply the fix.' That loop is vibe coding.",
      },
      { type: 'h', body: 'When PowerShell shows an error' },
      {
        type: 'p',
        body: "Copy the first error message exactly. Do not paraphrase it. Paste it into the debug prompt below.",
      },
      {
        type: 'code',
        block: { kind: 'prompt', title: 'Debug prompt', body: debugPrompt },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Why this matters',
          body: "If you describe the error ('it says something about a module'), the AI has to guess. If you paste the exact text, it sees the line number and the symbol name. The fix rate is wildly different.",
        },
      },
      { type: 'h', body: 'An example error and a real fix' },
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
        body: "Paste the debug prompt. The AI replies: 'You forgot to import useState from react.' It tells you to change line 1 of src/App.tsx from `import React from \"react\"` to `import React, { useState } from \"react\"`. You save. PowerShell auto-reloads. Error gone.",
      },
      { type: 'h', body: 'When the app works and you want more' },
      {
        type: 'p',
        body: "Resist asking for five features at once. Ask for one. Verify. Ask for the next.",
      },
      {
        type: 'code',
        block: { kind: 'prompt', title: 'Add-one-feature prompt', body: addFeaturePrompt },
      },
      { type: 'h', body: 'The habit' },
      {
        type: 'list',
        items: [
          'Save. See the reload in the browser. Tap around the app.',
          'If it broke, copy the error → debug prompt.',
          'If it works, mark the brief checklist item done.',
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
          body: "Brief → generate → run → iterate. Every real app you vibe-code uses this same cycle. The rest is practice.",
        },
      },
    ],
  },
]

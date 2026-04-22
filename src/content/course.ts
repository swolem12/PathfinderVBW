export type LessonId =
  | 'what-is-vibe-coding'
  | 'pick-agent'
  | 'setup'
  | 'pick-idea'
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
    id: 'build-brief',
    number: 5,
    title: 'Write the Build Brief',
    subtitle: 'One markdown file. This is the real work.',
    goal: "You have a filled-in Build Brief in a plain text file or directly ready to paste.",
    estMinutes: 10,
    blocks: [
      {
        type: 'p',
        body: "The Build Brief is one markdown file with eight short sections. Copy the template, fill every section with concrete detail, save it. You'll paste this whole thing into Codex or Claude Code in the next lesson.",
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
    number: 6,
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
    number: 7,
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
    number: 8,
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
    number: 9,
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

export type LessonId = string

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
  | { type: 'step'; n: number; title: string; body: string }
  | { type: 'jargon'; term: string; plain: string }
  | { type: 'details'; summary: string; blocks: LessonBlock[] }
  | { type: 'preview'; caption: string }
  | { type: 'loopDiagram'; caption?: string }
  | { type: 'powershellDiagram'; caption?: string }
  | {
      type: 'visualRef'
      title: string
      columns: 2 | 3 | 4
      items: { label: string; sub?: string; swatch: 'layout' | 'tone' | 'radius' | 'accent'; variant: string }[]
    }
  | {
      type: 'slateMock'
      variant:
        | 'compass'
        | 'slate-editor'
        | 'slate-published'
        | 'ontology-object'
        | 'functions-ide'
        | 'action-modal'
        | 'variables-panel'
      caption?: string
      annotations?: { x: number; y: number; label: string; note: string }[]
    }
  | {
      type: 'powerAppsMock'
      variant:
        | 'studio'
        | 'tree-view'
        | 'data-schema'
        | 'formula-bar'
        | 'calendar-preview'
        | 'calendar-live'
        | 'share-dialog'
        | 'home-screen'
        | 'create-dialog'
        | 'connectors-list'
        | 'sharepoint-picker'
        | 'insert-menu'
        | 'preview-mode'
        | 'publish-dialog'
        | 'app-checker'
        | 'flow-designer'
        | 'new-event-form'
      caption?: string
      annotations?: { x: number; y: number; label: string; note: string }[]
    }
  | {
      type: 'docLink'
      title: string
      description: string
      url: string
      /** Short canonical label for the domain, e.g. "Palantir Docs" */
      source: string
    }
  | {
      type: 'aipMock'
      variant:
        | 'aip-launcher'
        | 'assist-new-bot'
        | 'assist-knowledge-tab'
        | 'assist-test-chat'
        | 'assist-embed-widget'
        | 'aip-evaluations'
        | 'assist-analytics'
      caption?: string
      annotations?: { x: number; y: number; label: string; note: string }[]
    }

export interface LessonDef {
  id: LessonId
  number: number
  title: string
  subtitle: string
  goal: string
  endState: string
  estMinutes: number
  optional?: boolean
  blocks: LessonBlock[]
}

export const sampleApp = {
  name: 'TaskBoard',
  oneLiner:
    'A shared task board for a small maintenance crew — the shift lead posts jobs, technicians claim and complete them.',
}

/* ------------------------------------------------------------------
 *  BRIEFS
 *  miniBrief is the default (5 fields). briefTemplate is the full
 *  11-section version, hidden inside <details> for learners who
 *  want it.
 * ------------------------------------------------------------------ */

export const miniBrief = `# Build Brief — <APP NAME>

## 1. Pitch
Design an app that **<ONE PRIMARY ACTION>** for **<ONE SPECIFIC PERSON>**, so they can **<WHAT CHANGES IN THEIR DAY>**.

## 2. The user (one paragraph)
<WHO — be specific> opens this <WHEN> on a <PHONE / LAPTOP>. The single thing they must do in under 10 seconds is <PRIMARY ACTION>.

## 3. Three things I can do (v1 only)
- [ ] <NOUN> I can <VERB>
- [ ] <NOUN> I can <VERB>
- [ ] <NOUN> I can <VERB>

## 4. Tone (2 or 3 words)
<ADJECTIVE>, <ADJECTIVE>, <ADJECTIVE>
(pick from: utilitarian, calm, playful, editorial, technical, warm, premium, brutalist)

## 5. Look
- Background: **off-white** | **warm cream** | **near-black**
- Accent color (one only): <COLOR NAME OR HEX>
- Corners: **sharp** | **subtle (4px)** | **friendly (10px)**
- Animation: **none** | **restrained** | **playful**
`

export const miniBriefExample = `# Build Brief — TaskBoard

## 1. Pitch
Design an app that **tracks who is fixing what** for **the shift lead of a 6-person maintenance crew**, so they can **stop chasing people on group text at the start of every shift**.

## 2. The user (one paragraph)
A shift-lead technician at one facility opens this at the start of shift on a laptop in the shop. The single thing they must do in under 10 seconds is see every open task and who owns it.

## 3. Three things I can do (v1 only)
- [ ] A task I can add (title + priority: low / med / high)
- [ ] A task I can claim (sets owner to "me")
- [ ] A task I can mark done

## 4. Tone
utilitarian, calm, technical

## 5. Look
- Background: off-white
- Accent color: warm orange (#E6A15C) — only on the priority dot and the primary button
- Corners: subtle (4px)
- Animation: restrained (fade list in on load, no bounce)
`

export const briefTemplate = `# Build Brief — <APP NAME>

## 1. Pitch (fill the blanks literally)
Design an app that **<ONE PRIMARY ACTION>** for **<ONE SPECIFIC PERSON>**, so they can **<OUTCOME THAT CHANGES THEIR DAY>**.

## 2. The user (one paragraph)
<ONE ROLE — be specific> opens this <WHEN> on a <DEVICE>. Right before they open it they are <CONTEXT>. Right after they close it they go <NEXT ACTION>. The single thing they must be able to do in under 10 seconds is <PRIMARY ACTION>.

## 3. Ship list — v1 only (pick 3 to 5)
- [ ] <NOUN> I can <VERB>
- [ ] <NOUN> I can <VERB>
- [ ] <NOUN> I can <VERB>

## 4. Cut list — NOT in v1 (at least 3)
- <THING YOU ARE CHOOSING NOT TO BUILD>
- <THING YOU ARE CHOOSING NOT TO BUILD>
- <THING YOU ARE CHOOSING NOT TO BUILD>

## 5. Pages / screens
- \`/\` <ONE-LINE PURPOSE>

## 6. Layout (pick ONE per row)
- Navigation: **top bar** | **left sidebar** | **bottom tab bar** | **none**
- Primary surface: **single column** | **sidebar + content** | **kanban columns** | **dashboard grid** | **feed** | **split pane** | **wizard**
- Density: **airy** | **balanced** | **dense**
- Primary input pattern: **inline form** | **modal** | **slideout** | **command menu**

## 7. Visual tone (2 to 4 adjectives)
<ADJ>, <ADJ>, <ADJ>

## 8. Color, type, radius
- Background: **off-white** | **pure white** | **warm cream** | **near-black** | **dark slate** | **sepia**
- Accent color (ONE): <PICK ONE>
- Body font style: **geometric sans** | **humanist sans** | **grotesk** | **serif** | **mono**
- Display style: **same as body** | **serif display** | **oversized grotesk** | **mono all-caps**
- Corner radius: **sharp (0px)** | **subtle (4px)** | **friendly (10px)** | **pill**

## 9. Motion & feel
- On first page load: **none** | **fade in** | **slide up and fade** | **stagger list in**
- On hover: **none** | **subtle color shift** | **lift + shadow** | **underline wipe**
- On primary action: **none** | **inline checkmark** | **toast slides in**
- Between views: **instant** | **crossfade** | **slide**
- Easing: **linear** | **inOutQuad (crisp)** | **inOutExpo (smooth)** | **spring**
- Overall feel: **none** | **restrained** | **playful**

## 10. Components the AI must use
- Inputs: [ ] button  [ ] input  [ ] textarea  [ ] select  [ ] checkbox  [ ] toggle  [ ] date picker  [ ] file uploader
- Display: [ ] card  [ ] table  [ ] list  [ ] badge  [ ] tag  [ ] avatar  [ ] metric  [ ] empty state  [ ] loading indicator
- Overlay: [ ] modal  [ ] slideout  [ ] tooltip  [ ] toast  [ ] alert  [ ] dropdown  [ ] command menu
- Navigation: [ ] top nav  [ ] sidebar nav  [ ] tabs  [ ] breadcrumbs  [ ] pagination

## 11. Done means
- [ ] Loads at http://localhost:5173/ with no red errors
- [ ] I can do the primary action in under 10 seconds from a cold reload
- [ ] Data persists after refresh
- [ ] Every empty list shows a short message, not a blank box
- [ ] The tone words in section 7 actually describe what I see
`

export const briefExample = miniBriefExample

/* ------------------------------------------------------------------
 *  PROMPTS
 * ------------------------------------------------------------------ */

export const claudeCodePrompt = `I want to build a small web app. Below is my Build Brief.

Please do the following:
1. Create a folder named \`taskboard\` in the current working directory (my Desktop).
2. Scaffold a React + TypeScript + Vite project inside it.
3. Implement ONLY the items under "Three things I can do" (or "Ship list"). Do NOT build anything else.
4. Use browser localStorage for persistence. No backend. Plain CSS, no UI libraries.
5. Make sure empty states render, so the app never looks broken when there is no data.
6. When you finish, print: (a) the full file tree you created, (b) the exact PowerShell commands I should run from inside the \`taskboard\` folder to install and start the app.

Here is the brief:

<PASTE YOUR FILLED-IN BRIEF HERE>`

export const codexPrompt = `I want to build a small web app. Below is my Build Brief.

Do all of the following, in this order:
1. Design the app based on the brief — but ONLY the items under "Three things I can do" (or "Ship list"). Do NOT build anything else.
2. Write the full source code for a React + TypeScript + Vite project, using browser localStorage (no backend) and plain CSS (no UI libraries).
3. At the top of your reply, list every file you are about to give me.
4. Then give each file's full contents in its own code block, labeled with the file's relative path (e.g. \`taskboard/src/App.tsx\`).
5. Include at minimum: package.json, tsconfig.json, vite.config.ts, index.html, src/main.tsx, src/App.tsx, src/index.css.
6. End with the exact PowerShell commands I need to run to install and start the app.

Here is the brief:

<PASTE YOUR FILLED-IN BRIEF HERE>`

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

<DESCRIBE THE FEATURE IN ONE SENTENCE>

Constraints:
- Change as few files as possible.
- Do not touch unrelated features.
- After the change, tell me exactly what to test in the browser to confirm it works.`

export const chatGptZipPrompt = `I want to build a small web app. Below is my Build Brief.

Do all of the following, in this order:
1. Design the app from the brief — only the items under "Three things I can do". Do NOT build anything extra.
2. Write the full source code for a React + TypeScript + Vite project, using browser localStorage (no backend) and plain CSS (no UI libraries).
3. Required files: package.json, tsconfig.json, vite.config.ts, index.html, src/main.tsx, src/App.tsx, src/index.css — plus any component files needed.
4. Use your code interpreter to package ALL of these files into a single zip file called taskboard.zip, preserving the correct folder structure.
5. Provide a download link for taskboard.zip.
6. After I unzip it, I will run: npm install → npm run dev. Confirm those two commands will start the app at http://localhost:5173/.

Here is the brief:

<PASTE YOUR FILLED-IN BRIEF HERE>`

export const claudeWebPrompt = `I want to build a small web app. Below is my Build Brief.

Do all of the following, in this order:
1. Design the app from the brief — only the items under "Three things I can do". Do NOT build anything extra.
2. Write the full source code for a React + TypeScript + Vite project, using browser localStorage (no backend) and plain CSS (no UI libraries).
3. Required files: package.json, tsconfig.json, vite.config.ts, index.html, src/main.tsx, src/App.tsx, src/index.css — plus any component files needed.
4. Give every file its own code block, labeled with its relative path (e.g. \`src/App.tsx\`).
5. After all the code blocks, write a Windows PowerShell script I can copy and run that will: (a) create a folder called taskboard inside $HOME\\Desktop, (b) create every sub-folder, (c) write each file's full contents to disk.

Here is the brief:

<PASTE YOUR FILLED-IN BRIEF HERE>`

/* ------------------------------------------------------------------
 *  LESSONS — 7 critical path + 1 optional level-up
 * ------------------------------------------------------------------ */

export const lessons: LessonDef[] = [
  {
    id: 'what-is-vibe-coding',
    number: 1,
    title: 'What you will build',
    subtitle: 'The 30-minute promise.',
    goal: 'You can picture the finish line and know the six steps to get there.',
    endState: "You're ready to install one thing and start.",
    estMinutes: 3,
    blocks: [
      {
        type: 'p',
        body: 'In about 30 minutes, a working prototype like this will be running on your own computer. You describe an app in one page. An AI writes the code. You run three commands in a terminal. You play with it in your browser.',
      },
      { type: 'preview', caption: 'TaskBoard — the sample app you will build' },
      { type: 'h', body: 'The six steps' },
      { type: 'loopDiagram', caption: 'The whole loop. You spend your time on the orange steps.' },
      {
        type: 'list',
        items: [
          'Install two free tools (about 5 minutes, one time only).',
          'Pick an idea (or use our TaskBoard example).',
          'Write a 5-field Build Brief.',
          'Paste it to a free AI website (claude.ai or ChatGPT). It writes the files.',
          'Run three commands. The app opens in your browser.',
          'Play with it. Break it. Ask the AI to fix or add things.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'You will not write code',
          body: 'You write a one-page description. The AI writes the code. You run it. That is the whole job.',
        },
      },
      {
        type: 'checklist',
        items: [
          "I can picture what I'll have at the end (a working web app on my own computer)",
          'I understand the loop: describe → AI writes → I run → I iterate',
        ],
      },
    ],
  },

  {
    id: 'setup',
    number: 2,
    title: 'Install Node.js — pick your AI',
    subtitle: 'One install. Free AI websites. No CLI required.',
    goal: "Node.js is installed on your PC and you have chosen which free AI website (claude.ai, ChatGPT, or Codex) you will use to generate the code.",
    endState: 'node -v and npm -v both print version numbers. Your PowerShell prompt ends in Desktop>.',
    estMinutes: 6,
    blocks: [
      {
        type: 'p',
        body: 'You need exactly one thing installed on your PC: Node.js. It runs the app after the AI generates the code for you. The AI itself lives on a free website — no installation required.',
      },
      { type: 'powershellDiagram', caption: "What a PowerShell window looks like. You only need it to verify Node.js and later to run your app." },
      {
        type: 'jargon',
        term: 'PowerShell',
        plain: "Windows' built-in command window. You type commands, it runs them. No coding — just copy, paste, Enter.",
      },

      {
        type: 'step',
        n: 1,
        title: 'Open PowerShell',
        body: "Press the Windows key, type 'powershell', press Enter. A dark window opens with a blinking cursor. That is your workshop.",
      },

      {
        type: 'step',
        n: 2,
        title: 'Install Node.js',
        body: "Copy the command below, paste it into PowerShell (right-click to paste), press Enter. This takes about a minute. When it says 'Successfully installed', CLOSE PowerShell completely and open a new window — the new tool only shows up in new windows.",
      },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\Users\\you>', command: 'winget install OpenJS.NodeJS.LTS' },
          {
            output:
              'Found Node.js LTS [OpenJS.NodeJS.LTS] Version 22.11.0\nDownloading...\n  ██████████████████████████████  30.4 MB / 30.4 MB\nSuccessfully installed',
          },
        ],
      },
      {
        type: 'jargon',
        term: 'Node.js',
        plain: 'The program that runs JavaScript code outside a browser. Every modern web app needs it installed to be built and run.',
      },
      {
        type: 'details',
        summary: "winget doesn't work on my PC",
        blocks: [
          {
            type: 'p',
            body: "That means your Windows is older than 10 version 1809, or 'App Installer' is missing. Use this instead:",
          },
          {
            type: 'list',
            items: [
              'Open nodejs.org in your browser.',
              'Click the big green LTS button (not Current).',
              'Run the downloaded installer. Next → Next → Install.',
              'Close all PowerShell windows and open a new one.',
            ],
          },
        ],
      },

      {
        type: 'step',
        n: 3,
        title: 'Choose your AI tool',
        body: 'The AI that writes all the code lives on a free website — no installation needed. You have three solid options. Pick whichever you already have an account with.',
      },
      { type: 'h', body: 'Option A — ChatGPT  (recommended for beginners)' },
      {
        type: 'p',
        body: 'Go to chatgpt.com. ChatGPT can use its built-in code tool to package all your project files into a single zip you download in one click. That is the fastest path to a ready-to-run folder on your Desktop.',
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Why ChatGPT for beginners',
          body: "ChatGPT's code interpreter creates a real zip file you download with one click — no copying or pasting code by hand.",
        },
      },
      { type: 'h', body: 'Option B — Claude.ai' },
      {
        type: 'p',
        body: "Go to claude.ai. Claude writes every file and then gives you a PowerShell setup script at the end. Running that one script in PowerShell creates the whole project folder automatically.",
      },
      { type: 'h', body: 'Option C — ChatGPT Codex' },
      {
        type: 'p',
        body: "Codex is OpenAI's specialist code model available inside chatgpt.com. Select it from the model picker or start your prompt with 'Use Codex'. It works exactly like Option A — zip download included.",
      },
      {
        type: 'jargon',
        term: 'npm',
        plain: 'Node Package Manager. It installed alongside Node.js. It downloads the libraries your app needs when you run npm install.',
      },
      {
        type: 'details',
        summary: 'Power-user option: Claude Code CLI (terminal tool)',
        blocks: [
          {
            type: 'p',
            body: 'Claude Code CLI is a command-line version of Claude that writes files directly on your PC from PowerShell — no copy-paste at all. It requires an Anthropic API key and one extra install command.',
          },
          {
            type: 'shellSession',
            lines: [
              { prompt: 'PS C:\\Users\\you>', command: 'npm install -g @anthropic-ai/claude-code' },
              { output: 'added 42 packages in 3s' },
            ],
          },
          {
            type: 'p',
            body: 'After installing, run claude --version to confirm it works. When you reach the generate lesson, use the Claude Code CLI prompt instead of the ChatGPT or Claude.ai prompts.',
          },
        ],
      },

      {
        type: 'step',
        n: 4,
        title: 'Verify Node.js is installed',
        body: 'In a fresh PowerShell window, run these two commands. Each should print a version number. If either says "not recognized", close ALL PowerShell windows and open a new one — Windows only picks up newly installed tools in new windows.',
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
          title: 'One thing before you move on',
          body: "If your Desktop is synced to OneDrive (common on Windows 11), dev servers sometimes reload at random. If that happens later, move your project folder to C:\\projects instead. You don't need to act on this now — just remember it exists.",
        },
      },

      {
        type: 'step',
        n: 5,
        title: 'Move to your Desktop',
        body: 'Your project will live in a folder on your Desktop so you can see it as an icon. Run this one command.',
      },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\Users\\you>', command: 'cd $HOME\\Desktop' },
          { prompt: 'PS C:\\Users\\you\\Desktop>' },
        ],
      },

      {
        type: 'checklist',
        items: [
          'node -v printed a version',
          'npm -v printed a version',
          'I have picked my AI tool (ChatGPT, Claude.ai, or Codex)',
          'My PowerShell prompt now ends in "Desktop>"',
        ],
      },
    ],
  },

  {
    id: 'pick-idea',
    number: 3,
    title: 'Pick an idea',
    subtitle: 'One sentence. One person. One outcome.',
    goal: 'You have a one-sentence description of the app you want to build.',
    endState: 'You can say your idea out loud in one breath.',
    estMinutes: 2,
    blocks: [
      {
        type: 'p',
        body: 'The single biggest reason AI-generated apps feel generic is that the person described them vaguely. Fix that in one sentence, right now.',
      },
      { type: 'h', body: 'The pattern' },
      {
        type: 'code',
        block: {
          kind: 'markdown',
          title: 'Say it this way',
          body: '<WHO> uses this to <OUTCOME> so that <CHANGE IN THEIR DAY>.',
        },
      },
      { type: 'h', body: 'Our sample — TaskBoard' },
      {
        type: 'code',
        block: {
          kind: 'markdown',
          title: 'Example',
          body:
            "A maintenance crew's shift lead uses this to see every open task and who owns it, so he stops chasing people on group text.",
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'New here? Just use TaskBoard.',
          body: 'Most people learn the loop faster by shipping TaskBoard first, then doing pass two with their own idea. Zero shame in this.',
        },
      },
      {
        type: 'checklist',
        items: [
          'I can name exactly one specific person who would use my app',
          'I can name the one thing they do with it',
          "I didn't use 'users', 'people', or 'everyone' as the who",
        ],
      },
    ],
  },

  {
    id: 'build-brief',
    number: 4,
    title: 'Fill in 5 boxes',
    subtitle: 'That is your entire brief.',
    goal: "You have a 5-field brief ready to paste to the AI. No file to save — you'll paste it directly.",
    endState: 'Your brief is on your clipboard, ready to send to Claude Code.',
    estMinutes: 6,
    blocks: [
      {
        type: 'p',
        body: 'That is it. Five fields. Copy the template below. Replace every <BRACKETED THING> with your answer. When every bracket is gone, your brief is done.',
      },
      {
        type: 'code',
        block: {
          kind: 'markdown',
          title: 'Mini Brief — copy and fill in',
          body: miniBrief,
        },
      },
      { type: 'h', body: 'Filled-in example — TaskBoard' },
      {
        type: 'p',
        body: 'Notice every answer is concrete. No "modern". No "clean". No "intuitive". Real words only.',
      },
      {
        type: 'code',
        block: {
          kind: 'markdown',
          title: 'Example — TaskBoard',
          body: miniBriefExample,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Banned words',
          body: "Modern. Clean. Sleek. Intuitive. Seamless. Beautiful. AI-powered. Next-gen. Each one means 'I haven't decided yet' and the AI will guess. Pick a real adjective.",
        },
      },
      {
        type: 'details',
        summary: 'I want the full 11-section brief (for bigger apps)',
        blocks: [
          {
            type: 'p',
            body: "The mini brief is enough for any 30-minute prototype. When your idea gets bigger — multiple pages, a component menu to choose from, motion details — switch to the full brief. It's the same pattern, just with more fields.",
          },
          {
            type: 'code',
            block: { kind: 'markdown', title: 'Full Build Brief template', body: briefTemplate },
          },
          {
            type: 'p',
            body: "If you choose the full brief, also read the Design Vocabulary lesson at the end — it's the menu of words that fills those extra sections.",
          },
        ],
      },
      {
        type: 'checklist',
        items: [
          'Every <BRACKET> in my brief has been replaced with a real answer',
          "I did not use 'modern', 'clean', or 'intuitive'",
          'My ship list has exactly 3 items, not 10',
          'I know the next step is to paste this into my AI tool (ChatGPT, Claude.ai, or Codex)',
        ],
      },
    ],
  },

  {
    id: 'generate',
    number: 5,
    title: 'Let the AI generate it',
    subtitle: 'Paste a prompt. Download the files. Your project is ready.',
    goal: "You have pasted your brief into a free AI website, received the generated project files, and confirmed a taskboard folder with package.json and a src folder exists on your Desktop.",
    endState: 'A taskboard folder sits on your Desktop, ready to run.',
    estMinutes: 5,
    blocks: [
      {
        type: 'p',
        body: 'Pick the path that matches the AI tool you chose in lesson 2. All three paths end the same way: a taskboard folder on your Desktop containing your generated code. Once you have that folder, this lesson is done.',
      },

      { type: 'h', body: "What's inside your project — the key files explained" },
      {
        type: 'p',
        body: 'The AI will generate several files. Here is what each one does so you know what you are looking at when you open the folder.',
      },
      {
        type: 'jargon',
        term: 'package.json',
        plain: "The project's shopping list. Names every library the app needs and defines the 'npm run dev' command that starts it.",
      },
      {
        type: 'jargon',
        term: 'vite.config.ts',
        plain: "Vite's instruction file. Tells the build tool how to bundle and serve your app during development. You rarely touch this.",
      },
      {
        type: 'jargon',
        term: 'tsconfig.json',
        plain: "TypeScript's rule book. Turns type-checking features on or off. Generated once, rarely edited.",
      },
      {
        type: 'jargon',
        term: 'index.html',
        plain: "The one HTML page the browser loads first. It has a single div where React injects your whole app.",
      },
      {
        type: 'jargon',
        term: 'src/main.tsx',
        plain: "The on-switch. Its entire job is to mount the React app into that div.",
      },
      {
        type: 'jargon',
        term: 'src/App.tsx',
        plain: "Where your app actually lives. All the buttons, lists, forms, and logic go in here (or in component files it imports).",
      },
      {
        type: 'jargon',
        term: 'src/index.css',
        plain: "The global stylesheet. Fonts, colors, resets, and any styles that apply across the whole app.",
      },

      { type: 'h', body: 'Path A — ChatGPT  (download a zip file)' },

      {
        type: 'step',
        n: 1,
        title: 'Open chatgpt.com and start a new chat',
        body: 'Go to chatgpt.com. Start a new chat. Any current GPT-4 class model (GPT-4o, o3, or similar) works — they all support the code execution needed to create a zip.',
      },
      {
        type: 'step',
        n: 2,
        title: 'Paste this prompt',
        body: 'Copy the block below. Paste it into the chat. Then paste your filled-in mini brief at the very bottom, replacing the placeholder. Send.',
      },
      {
        type: 'code',
        block: { kind: 'prompt', title: 'Paste into ChatGPT — requests a zip download', body: chatGptZipPrompt },
      },

      {
        type: 'step',
        n: 3,
        title: 'Download the zip',
        body: 'ChatGPT will use its built-in code tool to generate all the files and bundle them as taskboard.zip. When it gives you a download link, click it and save taskboard.zip to your Desktop.',
      },
      {
        type: 'step',
        n: 4,
        title: 'Extract the zip to your Desktop',
        body: "On your Desktop, right-click taskboard.zip → 'Extract All…' → the default destination (your Desktop) is correct → click Extract. A taskboard folder appears.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Check the folder structure',
          body: "Open the taskboard folder. At the top level you should see package.json and a src folder — not another taskboard folder inside. If you see taskboard/taskboard, move the inner folder up one level and delete the empty outer one.",
        },
      },

      {
        type: 'details',
        summary: 'Path B — Claude.ai (run a PowerShell setup script)',
        blocks: [
          {
            type: 'p',
            body: 'Open claude.ai and start a new conversation. Copy the prompt below, paste it in, add your filled-in brief at the bottom, and send.',
          },
          {
            type: 'code',
            block: { kind: 'prompt', title: 'Paste into Claude.ai', body: claudeWebPrompt },
          },
          {
            type: 'p',
            body: "Claude will display every file's full code, then produce a PowerShell setup script at the end. Copy that entire script, paste it into a PowerShell window pointed at your Desktop (run cd $HOME\\Desktop first if needed), and press Enter. It creates the taskboard folder and writes every file automatically.",
          },
        ],
      },

      {
        type: 'details',
        summary: 'Path C — Claude Code CLI (if you installed it in lesson 2)',
        blocks: [
          {
            type: 'p',
            body: "In PowerShell on your Desktop, run claude to start it. Paste the prompt below, add your brief at the bottom, and press Enter.",
          },
          {
            type: 'code',
            block: { kind: 'prompt', title: 'Paste this into the Claude Code CLI', body: claudeCodePrompt },
          },
          {
            type: 'p',
            body: "When Claude Code asks for permission, press 'a' to approve all file writes. It creates the taskboard folder and writes every file on your Desktop automatically.",
          },
        ],
      },

      {
        type: 'checklist',
        items: [
          'I see a taskboard folder on my Desktop',
          'Inside it I can see package.json and a src folder',
          "I'm ready to run three commands",
        ],
      },
    ],
  },

  {
    id: 'run-locally',
    number: 6,
    title: 'Run it',
    subtitle: 'Three commands. Your app in the browser.',
    goal: "Your app is live at http://localhost:5173/ and reacts when you click it.",
    endState: 'A browser tab is showing your app.',
    estMinutes: 5,
    blocks: [
      {
        type: 'p',
        body: 'Back in PowerShell. Three commands, one after another. Each either works clearly or fails clearly.',
      },

      {
        type: 'step',
        n: 1,
        title: 'Go into the project folder',
        body: 'Your prompt will change to show you are inside the project.',
      },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\Users\\you\\Desktop>', command: 'cd taskboard' },
          { prompt: 'PS C:\\Users\\you\\Desktop\\taskboard>' },
        ],
      },

      {
        type: 'step',
        n: 2,
        title: 'Install what the app needs',
        body: 'This downloads the libraries your app uses. It takes 30 seconds to 2 minutes the first time. You only do this once per project.',
      },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\Users\\you\\Desktop\\taskboard>', command: 'npm install' },
          { output: 'added 287 packages in 14s\n\nfound 0 vulnerabilities' },
        ],
      },
      {
        type: 'jargon',
        term: 'npm install',
        plain: 'Reads package.json (the list of libraries your app uses) and downloads all of them into a hidden node_modules folder. Nothing to worry about.',
      },

      {
        type: 'step',
        n: 3,
        title: 'Start the dev server',
        body: 'This starts a tiny web server on your own computer that serves your app to your browser. Leave this window open — if you close it, the app stops.',
      },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'PS C:\\Users\\you\\Desktop\\taskboard>', command: 'npm run dev' },
          {
            output:
              '  VITE v6.0.0  ready in 412 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  press h + enter to show help',
          },
        ],
      },
      {
        type: 'jargon',
        term: 'localhost:5173',
        plain: 'localhost = your own computer. 5173 = a door number (called a "port") this app listens on. Typing it in any browser opens the app.',
      },

      {
        type: 'step',
        n: 4,
        title: 'Open it in your browser',
        body: 'Ctrl+click the http://localhost:5173/ link in PowerShell, or type it into any browser. Your app appears. Click around. It works.',
      },

      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'You did it.',
          body: "A working prototype, running on your own computer, that you designed. Every change you save to a file auto-reloads the browser. To stop the server, press Ctrl+C in PowerShell.",
        },
      },

      {
        type: 'details',
        summary: 'Something broke',
        blocks: [
          { type: 'h', body: "'npm is not recognized'" },
          {
            type: 'p',
            body: 'Node.js did not install cleanly, or you are in an old PowerShell window. Close ALL PowerShell windows and open a new one.',
          },
          { type: 'h', body: "'Port 5173 is already in use'" },
          {
            type: 'p',
            body: 'Something else is running on that door. Use a different door:',
          },
          {
            type: 'shellSession',
            lines: [
              {
                prompt: 'PS C:\\Users\\you\\Desktop\\taskboard>',
                command: 'npm run dev -- --port 5174',
              },
            ],
          },
          { type: 'h', body: 'A red wall of errors in PowerShell' },
          {
            type: 'p',
            body: "Don't panic. Go to the next lesson — the loop for fixing things is exactly one prompt away.",
          },
        ],
      },

      {
        type: 'checklist',
        items: [
          'PowerShell printed "Local: http://localhost:5173/"',
          'A browser tab is showing my app',
          'The PowerShell window is still open (leave it running)',
        ],
      },
    ],
  },

  {
    id: 'iterate',
    number: 7,
    title: 'Fix one thing. Add one thing.',
    subtitle: 'The real loop.',
    goal: "You know how to hand an error back to the AI and how to add one feature without breaking anything.",
    endState: "You've applied one AI fix and added one feature to your prototype.",
    estMinutes: 3,
    blocks: [
      {
        type: 'p',
        body: "Nothing runs perfectly the first time. The skill is not 'never break things' — it is 'break things, paste the error back, apply the fix.' That is the loop.",
      },

      {
        type: 'step',
        n: 1,
        title: 'When something breaks, copy the error',
        body: 'Select the first red error in PowerShell or the browser console. Right-click to copy. Paste it into the prompt below. Send.',
      },
      {
        type: 'code',
        block: { kind: 'prompt', title: 'Debug prompt', body: debugPrompt },
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'How to apply a fix from your AI tool',
          body: "In ChatGPT or Claude.ai: the AI gives you corrected file contents. Copy them, open the file in the taskboard folder (right-click → Open with Notepad, or use VS Code), paste, and save. Your browser auto-reloads. With Claude Code CLI: type 'apply that' and it edits the file on disk for you.",
        },
      },

      {
        type: 'step',
        n: 2,
        title: 'When the app works, add ONE thing',
        body: 'One feature at a time. Test. Then the next one. Do not ask for five things at once — you will not be able to tell which change broke what.',
      },
      {
        type: 'code',
        block: { kind: 'prompt', title: 'Add-one-feature prompt', body: addFeaturePrompt },
      },

      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: "That's the whole course.",
          body: "Brief → AI website (ChatGPT / Claude.ai / Codex) → Desktop folder → npm install → npm run dev → iterate. Every app you vibe-code uses this exact loop. The optional Design Vocabulary lesson is next if you want to level up your briefs.",
        },
      },

      {
        type: 'checklist',
        items: [
          'I pasted one real error into the debug prompt and it got fixed',
          'I added one small feature and it works',
          'I feel like I could do this with my own idea next time',
        ],
      },
    ],
  },

  {
    id: 'design-vocabulary',
    number: 8,
    title: 'Design vocabulary',
    subtitle: 'Level up: describe what you want in words the AI understands.',
    goal: "You can describe any app's look, layout, and feel in specific terms — no 'modern', no 'clean'.",
    endState: 'Your next brief is twice as specific as your first.',
    estMinutes: 10,
    optional: true,
    blocks: [
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: "Optional — read this AFTER you've shipped once",
          body: "If you haven't finished lessons 1–7 yet, do those first. This one is for making your second prototype much more specific than your first.",
        },
      },
      {
        type: 'p',
        body: "The fastest way to get a generic app is to write a generic brief. Words like 'modern' and 'clean' tell the AI nothing. This lesson is the menu of real words you can pick from.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'Where this vocabulary comes from',
          body: "Component names and groupings come from Untitled UI React (untitledui.com/react/components). Motion vocabulary comes from anime.js (animejs.com). You do not need to install either — just use the words.",
        },
      },

      { type: 'h', body: 'Layout — where things sit' },
      {
        type: 'visualRef',
        title: 'Layout patterns — pick one',
        columns: 4,
        items: [
          { label: 'Single column', sub: 'Notion page', swatch: 'layout', variant: 'single' },
          { label: 'Sidebar + content', sub: 'Linear, Slack', swatch: 'layout', variant: 'sidebar' },
          { label: 'Top bar', sub: 'GitHub', swatch: 'layout', variant: 'topbar' },
          { label: 'Kanban', sub: 'Trello', swatch: 'layout', variant: 'kanban' },
          { label: 'Dashboard grid', sub: 'Vercel', swatch: 'layout', variant: 'grid' },
          { label: 'Feed', sub: 'Twitter', swatch: 'layout', variant: 'feed' },
          { label: 'Split pane', sub: 'Gmail', swatch: 'layout', variant: 'split' },
          { label: 'Wizard', sub: 'Checkout', swatch: 'layout', variant: 'wizard' },
        ],
      },
      {
        type: 'list',
        items: [
          'Single column — one stack. Reading, one-task apps. (Notion page.)',
          'Sidebar + content — nav left, main right. Apps with many sections. (Linear, Slack.)',
          'Top bar + content — horizontal nav on top. Simple apps with 2–4 sections. (GitHub.)',
          'Kanban columns — 2–5 columns of cards. Anything with status. (Trello.)',
          'Dashboard grid — page of metric cards. Monitoring, analytics. (Vercel dashboard.)',
          'Feed — infinite vertical list. Content you scroll through.',
          'Split pane — list on left, detail on right. Inboxes, record browsers. (Gmail.)',
          'Wizard — one step at a time, Next / Back. Onboarding, checkout.',
        ],
      },

      { type: 'h', body: 'Visual tone — pick 2 to 4 adjectives' },
      {
        type: 'visualRef',
        title: 'Tone swatches — the feel your words create',
        columns: 4,
        items: [
          { label: 'Utilitarian', sub: 'Linear', swatch: 'tone', variant: 'utilitarian' },
          { label: 'Editorial', sub: 'Stripe Press', swatch: 'tone', variant: 'editorial' },
          { label: 'Playful', sub: 'Duolingo', swatch: 'tone', variant: 'playful' },
          { label: 'Brutalist', sub: 'Hacker News', swatch: 'tone', variant: 'brutalist' },
          { label: 'Soft', sub: 'Headspace', swatch: 'tone', variant: 'soft' },
          { label: 'Warm', sub: 'Cream + earth', swatch: 'tone', variant: 'warm' },
          { label: 'Technical', sub: 'Vercel', swatch: 'tone', variant: 'technical' },
          { label: 'Premium', sub: 'Dark + metallic', swatch: 'tone', variant: 'premium' },
        ],
      },
      {
        type: 'list',
        items: [
          'Utilitarian — dense info, small UI. (Linear.)',
          'Editorial — serif headlines, whitespace, text-first. (Stripe Press.)',
          'Playful — saturated colors, rounded corners. (Duolingo.)',
          'Brutalist — mono font, sharp corners, stark. (Hacker News.)',
          'Soft — pastels, rounded corners, subtle shadows. (Headspace.)',
          'Warm — cream backgrounds, earth accents, serif display.',
          'Calm — restrained palette, no idle animations. (Apple Notes.)',
          'Technical — mono font for data, dark terminal-y. (Vercel.)',
          'Premium — near-black background, one metallic accent, oversized serif.',
          'Documentarian — serif body, sidebar TOC, high contrast. (Wikipedia.)',
          'Retro-terminal — monospace everything, neon accent on black.',
          'Magazine — asymmetric grid, mixed type sizes.',
          'Corporate-clean — blue accent, sans-serif, card everything. (Most B2B SaaS.)',
          'Handmade — off-grid, handwritten accent, slightly wonky.',
        ],
      },

      { type: 'h', body: 'Motion — five rows, pick one per row' },
      {
        type: 'code',
        block: {
          kind: 'markdown',
          title: 'Motion vocabulary',
          body: `On first page load:
  none | fade in | slide up and fade | STAGGER list items in

On hover (buttons, cards):
  none | subtle color shift | lift + shadow | underline wipe

On primary action (add / save):
  none | inline checkmark | toast slides in from corner

Between views:
  instant | crossfade | slide

Easing (the "feel" curve):
  linear (robotic)
  inOutQuad (crisp, ~180ms, default)
  inOutExpo (smooth, ~400ms, premium)
  spring (bouncy, playful only)`,
        },
      },

      {
        type: 'details',
        summary: 'The full component + color + type menus',
        blocks: [
          { type: 'h', body: 'Components' },
          {
            type: 'code',
            block: {
              kind: 'markdown',
              title: 'Menu',
              body: `Inputs: button, input, textarea, select, checkbox, toggle, slider, date picker, file uploader
Display: card, table, list, badge, tag, avatar, metric, empty state, loading indicator, progress steps
Overlay: modal, slideout, tooltip, toast, alert, dropdown, command menu
Navigation: top nav, sidebar nav, tabs, breadcrumbs, pagination`,
            },
          },
          { type: 'h', body: 'Color, type, radius' },
          {
            type: 'visualRef',
            title: 'Corner radius — pick one',
            columns: 4,
            items: [
              { label: 'Sharp', sub: '0px — brutalist', swatch: 'radius', variant: '0' },
              { label: 'Subtle', sub: '4px — default', swatch: 'radius', variant: '4' },
              { label: 'Friendly', sub: '10px — soft', swatch: 'radius', variant: '10' },
              { label: 'Pill', sub: '999px — playful', swatch: 'radius', variant: '999' },
            ],
          },
          {
            type: 'visualRef',
            title: 'Accent colors — pick exactly one',
            columns: 4,
            items: [
              { label: 'Warm orange', sub: '#E6A15C', swatch: 'accent', variant: '#E6A15C' },
              { label: 'Navy', sub: '#1E3A8A', swatch: 'accent', variant: '#1E3A8A' },
              { label: 'Emerald', sub: '#047857', swatch: 'accent', variant: '#047857' },
              { label: 'Crimson', sub: '#B91C1C', swatch: 'accent', variant: '#B91C1C' },
              { label: 'Violet', sub: '#6D28D9', swatch: 'accent', variant: '#6D28D9' },
              { label: 'Teal', sub: '#0E7490', swatch: 'accent', variant: '#0E7490' },
              { label: 'Graphite', sub: '#374151', swatch: 'accent', variant: '#374151' },
              { label: 'Goldenrod', sub: '#CA8A04', swatch: 'accent', variant: '#CA8A04' },
            ],
          },
          {
            type: 'list',
            items: [
              'Background — off-white, pure white, warm cream, near-black, dark slate, sepia.',
              'Accent — ONE color. "warm orange", "navy", or a hex.',
              'Body font — geometric sans, humanist sans, grotesk, serif, mono.',
              'Display font — same as body (bolder), serif display, oversized grotesk, or mono all-caps.',
              'Corner radius — sharp (0), subtle (4), friendly (10), pill (999).',
            ],
          },
          { type: 'h', body: 'Motion tricks you can ask for by name' },
          {
            type: 'list',
            items: [
              'Stagger — list items animate one after the other.',
              'Scroll-triggered reveal — items fade in as you scroll (marketing pages only).',
              'Motion path — element follows a drawn path.',
              'Shape morph — one SVG shape becomes another.',
              'Draggable with spring release — throw and snap back.',
            ],
          },
        ],
      },

      { type: 'h', body: 'Generic vs. specific — same app, two briefs' },
      {
        type: 'code',
        block: {
          kind: 'markdown',
          title: '❌ Generic',
          body: 'Design a modern clean task app with a nice UI and smooth animations.',
        },
      },
      {
        type: 'code',
        block: {
          kind: 'markdown',
          title: '✅ Specific',
          body: `Design an app that tracks who is fixing what for a 6-person crew's shift lead.

Layout: kanban, no nav, inline Add-task form. Density: balanced.
Tone: utilitarian, calm, technical. Background: off-white.
Accent: one warm orange (#E6A15C) on priority dot + primary button only.
Body font: humanist sans. Corners: subtle (4px). No drop shadows.
Components: button, input, select, card, badge, empty state, toast.
Motion: stagger on load (40ms, inOutQuad, ~180ms). Subtle color shift on
card hover. Toast from bottom-right on add/claim/complete. Restrained.`,
        },
      },

      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Banned words',
          body: "Modern. Clean. Sleek. Intuitive. Seamless. Beautiful. User-friendly. Next-gen. Elegant. Each one = 'I didn't decide'. Pick a word from the tone list above instead.",
        },
      },

      {
        type: 'checklist',
        items: [
          'I can name my layout in one word',
          'I can pick 2–4 tone adjectives from the menu',
          "I can describe motion in one sentence ('stagger on load, crisp easing, restrained')",
          'I have picked ONE accent color, ONE background, ONE corner radius, ONE font style',
        ],
      },
    ],
  },
]

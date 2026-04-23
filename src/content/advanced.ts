import type { LessonDef } from './course'

/* ------------------------------------------------------------------
 *  PROMPT STRINGS
 * ------------------------------------------------------------------ */

export const agentBootstrapPrompt = `I am working inside a GitHub Codespace with VS Code.
I have a React + TypeScript + Vite project already scaffolded.
I want to build [DESCRIBE YOUR APP IN ONE SENTENCE].

Please do the following in order:
1. Ask me any clarifying questions before writing a single line of code.
2. Propose a file structure for the app (src/components, src/pages, src/lib, etc.).
3. Wait for my approval, then implement ONE feature at a time:
   - Write the code.
   - Tell me exactly what to look for in the browser to verify it works.
   - Stop and wait for my "good, next" before continuing.
4. Keep each change to the minimum number of files possible.
5. Do not refactor anything I did not ask you to change.`

export const agentDebugPrompt = `The browser or terminal printed this error:

\`\`\`
[PASTE THE EXACT ERROR HERE]
\`\`\`

File that seems affected: [FILE PATH]

Please:
1. Explain what is wrong in one sentence.
2. Show me the exact lines I need to change and the replacement.
3. Tell me how to verify the fix worked (what should I see in the browser?).
4. Do not change anything else.`

export const agentFeaturePrompt = `The app is working. Add this ONE feature:

[DESCRIBE THE FEATURE PRECISELY — WHAT IT DOES, NOT HOW IT LOOKS]

Acceptance criteria — I will test by:
1. [First concrete thing you will click/type/see]
2. [Second concrete thing]

Constraints:
- Change as few files as possible.
- Do not touch anything unrelated to this feature.
- localStorage only — no backend unless I have told you one is already configured.`

export const firebaseSetupPrompt = `I have a React + TypeScript + Vite app.
I want to add Firebase for data persistence and authentication.

My Firebase project config is:
[PASTE YOUR firebaseConfig OBJECT HERE]

Please:
1. Create src/lib/firebase.ts that initialises the app and exports db (Firestore) and auth (Firebase Auth).
2. Update package.json to include the firebase dependency (do not run npm install — I will do that).
3. Show me the exact .env.local variables I need to create, and the import.meta.env.VITE_* names to use.
4. Do not change any existing component files yet.`

export const supabaseSetupPrompt = `I have a React + TypeScript + Vite app.
I want to add Supabase for data persistence and authentication.

My Supabase project URL: [YOUR_PROJECT_URL]
My Supabase anon key: [YOUR_ANON_KEY]

Please:
1. Create src/lib/supabase.ts that initialises and exports the Supabase client.
2. Update package.json to include @supabase/supabase-js (do not run npm install — I will do that).
3. Show me the exact .env.local variables I need to create.
4. Show me one example of reading and one example of writing a row in TypeScript.
5. Do not change any existing component files yet.`

export const ghPagesWorkflow = `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install and build
        run: |
          npm install
          npm run build

      - name: Deploy to gh-pages branch
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist`

/* ------------------------------------------------------------------
 *  LESSONS
 * ------------------------------------------------------------------ */

export const advancedLessons: LessonDef[] = [
  /* ────────────────────────────────────────────────────────── L1 */
  {
    id: 'github-create-repo',
    number: 1,
    title: 'Create your GitHub repository',
    subtitle: 'Your codebase, version history, and deploy pipeline all start here.',
    goal: 'You have a public GitHub repository with a README and understand how to navigate every tab.',
    endState: 'A GitHub repository URL you can paste into a browser and see code.',
    estMinutes: 12,
    blocks: [
      {
        type: 'p',
        body: 'GitHub is where your code lives. Every change you make gets saved as a snapshot called a commit. That history means you can always roll back to a working state, collaborate with teammates, and deploy your app with one click. You do not need to understand Git to follow this course — you only need to know where to click.',
      },
      {
        type: 'jargon',
        term: 'Repository (repo)',
        plain: 'A folder that GitHub tracks. Every file in your project, plus its full history of changes, lives in one repo.',
      },
      {
        type: 'jargon',
        term: 'Commit',
        plain: 'A saved snapshot of your files at a point in time. Like pressing Save, but every save is permanent and reversible.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Create a free GitHub account',
        body: "Go to github.com. Click Sign up. Choose a username (lowercase, no spaces). You only do this once. If you already have an account, skip to step 2.",
      },
      {
        type: 'docLink',
        title: 'GitHub account setup',
        description: 'Official guide to creating your account, verifying your email, and basic profile settings.',
        url: 'https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github',
        source: 'GitHub Docs',
      },
      {
        type: 'step',
        n: 2,
        title: 'Create a new repository',
        body: "In the top-right corner click the + icon → New repository. Fill in the form exactly as described below, then click Create repository.",
      },
      {
        type: 'list',
        items: [
          'Repository name: use lowercase-with-dashes (e.g. my-fleet-app). No spaces.',
          'Description: one sentence describing the app.',
          'Visibility: Public (required for free GitHub Pages hosting later).',
          'Check "Add a README file".',
          'Add .gitignore: choose Node.',
          'Leave everything else as the default.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Why public?',
          body: 'GitHub Pages (free hosting) only works with public repos on the free plan. You can always flip it private later after you have a paid plan or have deployed.',
        },
      },
      {
        type: 'step',
        n: 3,
        title: 'Learn the repository tabs',
        body: 'After creating, you land on the Code tab. Here is what every tab does — you will use all of them.',
      },
      {
        type: 'list',
        items: [
          '< > Code — the file browser. Click any file to read it. This is where you and the AI spend most of your time.',
          'Issues — a to-do list for your project. Create one issue per feature or bug you want to track.',
          'Pull requests — proposed changes waiting for review. Later, the AI will raise these automatically.',
          'Actions — automated workflows (build, test, deploy). You will add a deploy workflow in lesson 7.',
          'Settings — repository configuration: visibility, branch rules, Pages setup, secrets for environment variables.',
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Understand the green Code button',
        body: 'Click the green Code button now. You see three options: Local (clone to your PC), Codespace (cloud VS Code — you will use this in lesson 2), and GitHub Desktop. Keep this button in mind — it is how you open your project editor.',
      },
      {
        type: 'jargon',
        term: 'Branch',
        plain: 'A parallel copy of your code. The default branch is called main. You can experiment on a separate branch without breaking main. For this course you will work directly on main.',
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'The repository is empty right now',
          body: 'It only has a README.md and a .gitignore. The AI will populate it with source files in lesson 3 — you do not need to create any files by hand.',
        },
      },
      {
        type: 'checklist',
        items: [
          'I have a GitHub account',
          'I can see my new repository at github.com/YOUR-USERNAME/your-repo-name',
          'The repo has a README.md and a .gitignore already in it',
          "I know what the green Code button is for",
          'I can name what Issues, Actions, and Settings tabs do',
        ],
      },
    ],
  },

  /* ────────────────────────────────────────────────────────── L2 */
  {
    id: 'codespace-vscode',
    number: 2,
    title: 'Open GitHub Codespace',
    subtitle: 'A full VS Code editor and terminal, running in your browser.',
    goal: 'You have an active Codespace with VS Code open and a terminal running inside your repository.',
    endState: 'VS Code is open in your browser and shows your project files.',
    estMinutes: 10,
    blocks: [
      {
        type: 'p',
        body: "GitHub Codespaces gives you a complete VS Code development environment in a browser tab. No setup, no installation, no 'works on my machine' — a cloud PC with Node.js, npm, git, and terminal already configured, pointed at your repository.",
      },
      {
        type: 'jargon',
        term: 'Codespace',
        plain: 'A cloud-hosted development machine pre-loaded with VS Code, your code, and the tools you need. Runs in a browser tab. You can close it and reopen it — your work is saved.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Launch a Codespace',
        body: "On your repository page, click the green Code button → Codespaces tab → Create codespace on main. A new browser tab opens. VS Code loads inside it. This takes about 60 seconds the first time.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Free tier',
          body: 'GitHub gives every free account 120 core-hours per month of Codespace time. The 2-core machine (the default) gives you 60 hours — more than enough for this course. The clock only ticks while the Codespace is running. Idle ones auto-stop after 30 minutes.',
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'GitHub account tiers — what you need for this course',
          body: 'GitHub Free is all you need to create repos, use Codespaces (60 h/month), and deploy to GitHub Pages (public repos only). GitHub Pro ($4/month or $48/year) adds 90 Codespace-hours, GitHub Pages on private repos, and more CI minutes. GitHub Education is completely free for verified students and teachers — it gives you Pro + Copilot Pro at no cost. Apply at education.github.com — approval takes 1-5 business days. If you are a student, do this first before anything else in this course.',
        },
      },
      {
        type: 'docLink',
        title: 'GitHub Education — free tools for students and educators',
        description: 'Apply for GitHub Education to get GitHub Pro, Copilot Pro, and 100+ other developer tools at no cost. Verified with a .edu email or school ID.',
        url: 'https://education.github.com',
        source: 'GitHub Education',
      },
      {
        type: 'jargon',
        term: 'GitHub Education',
        plain: 'A free program from GitHub for enrolled students and active educators. Gives you GitHub Pro (paid features), Copilot Pro (unlimited AI), and other developer tools at zero cost. Apply at education.github.com.',
      },
      {
        type: 'step',
        n: 2,
        title: 'Learn the VS Code layout',
        body: 'Everything you need is in the two sidebars and the bottom panel.',
      },
      {
        type: 'list',
        items: [
          'Explorer (files icon, top-left) — your file tree. Click a file to open it.',
          'Search (magnifying glass) — search and replace across all files.',
          'Source Control (branch icon) — stage files and write commit messages. This is how you save your work to GitHub.',
          'Extensions (squares icon) — install VS Code add-ons.',
          'Copilot Chat (speech bubble) — GitHub Copilot AI assistant. You will use this in lesson 3.',
          'Terminal (bottom panel) — a real command line inside your project folder. Ctrl+` opens it.',
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Open the integrated terminal',
        body: "Press Ctrl+` (backtick) or go to Terminal → New Terminal in the top menu. A panel opens at the bottom. The prompt shows you are inside your project directory. This is where you run npm commands.",
      },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'user@codespace:/workspaces/my-fleet-app$', command: 'node -v' },
          { output: 'v22.11.0' },
          { prompt: 'user@codespace:/workspaces/my-fleet-app$', command: 'npm -v' },
          { output: '10.9.0' },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Install recommended extensions',
        body: 'Click the Extensions icon (squares). Search for and install these three extensions. They are free and make AI-assisted development much smoother.',
      },
      {
        type: 'list',
        items: [
          'GitHub Copilot — the AI coding assistant. Requires a GitHub Copilot subscription (free trial available). This is the primary AI tool in this track.',
          'ESLint — highlights code errors before you run the app.',
          'Prettier — auto-formats code on save so it always looks clean.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'Using claude.ai or ChatGPT instead of Copilot?',
          body: "That works. You will paste code context manually and copy responses back. The workflow is slightly slower but identical in principle. All the prompts in this course work in any AI chat interface — not just Copilot.",
        },
      },
      {
        type: 'step',
        n: 5,
        title: 'Scaffold the React app',
        body: 'In the terminal, run the Vite scaffolding command. When prompted, select React and TypeScript. This creates all the starter files.',
      },
      {
        type: 'shellSession',
        lines: [
          {
            prompt: 'user@codespace:/workspaces/my-fleet-app$',
            command: 'npm create vite@latest . -- --template react-ts',
          },
          { output: 'Scaffolding project in /workspaces/my-fleet-app...\nDone. Now run:\n\n  npm install\n  npm run dev' },
          { prompt: 'user@codespace:/workspaces/my-fleet-app$', command: 'npm install' },
          { output: 'added 287 packages in 14s' },
          { prompt: 'user@codespace:/workspaces/my-fleet-app$', command: 'npm run dev' },
          { output: '  VITE v6.0.0  ready in 412 ms\n\n  ➜  Local:   http://localhost:5173/\n  ➜  Network: use --host to expose' },
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Preview in Codespace',
          body: "When npm run dev starts, VS Code shows a 'Port 5173 opened' notification in the bottom-right. Click Open in Browser to see your running app in a new tab.",
        },
      },
      {
        type: 'step',
        n: 6,
        title: 'Save your work with a commit',
        body: "Click the Source Control icon (branch, left sidebar) → type a message like 'initial scaffold' → click Commit → click Sync Changes. Your files are now saved to GitHub and visible on your repo page.",
      },
      {
        type: 'checklist',
        items: [
          'Codespace is open and shows VS Code with my repository files',
          'The integrated terminal responds to node -v and npm -v',
          'npm run dev started and I can see the Vite default page',
          'I committed and synced the scaffold — the new files show on github.com',
        ],
      },
    ],
  },

  /* ────────────────────────────────────────────────────────── L3 */
  {
    id: 'agentic-ai',
    number: 3,
    title: 'Work with agentic AI',
    subtitle: 'ChatGPT 5.4, Codex 5.3, and Claude as teammates — not answer machines.',
    goal: 'You know the difference between one-shot prompting and agentic AI, and can run a multi-step Agent session that reads your files, writes code, and iterates.',
    endState: 'You have used an AI agent to add at least one complete feature to your app, verified it in the browser, and the changed files are committed.',
    estMinutes: 18,
    blocks: [
      {
        type: 'p',
        body: "A one-shot prompt gets you one answer. Agentic AI is different: the AI can read your entire codebase, plan a sequence of actions, write and rewrite files, run commands, and check its own output — all in one session, without you copy-pasting anything. Think of it as a junior engineer who works at typing speed.",
      },
      {
        type: 'jargon',
        term: 'Agent mode',
        plain: "An AI setting where the model can take actions (read files, write files, run commands) on your behalf, rather than just answering a question. It loops: plan → act → verify → next step.",
      },
      {
        type: 'jargon',
        term: 'Context window',
        plain: "The maximum amount of text an AI can 'see' at once. Modern agents (Claude 4.7, ChatGPT 5.4, Codex 5.3) have large context windows — enough to hold your entire small project.",
      },
      { type: 'h', body: 'The three AI tools this track uses' },
      {
        type: 'list',
        items: [
          'GitHub Copilot (VS Code extension) — the fastest option if you are already in VS Code. Supports Claude 4.5, Claude 4.6, Claude 4.7, ChatGPT 5.4, and Codex 5.3 as the backing model. Switch the model in the Copilot Chat panel.',
          'claude.ai — Anthropic\'s browser interface. Paste code directly. Claude 4.6 (Sonnet) is the best balance of speed and quality for code. Claude 4.7 (Opus) is slower but better at complex architecture decisions.',
          'ChatGPT / ChatGPT with Codex — OpenAI\'s browser interface. ChatGPT 5.4 is excellent at React and TypeScript. Codex 5.3 is a specialist code model — invoke it by selecting it from the model picker in ChatGPT.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'GitHub Copilot — which plan do you need?',
          body: 'Copilot Free (no credit card, built into GitHub): 2,000 code completions + 50 chat messages per month — enough to complete this course at a comfortable pace. Copilot Pro ($10/month, $100/year): unlimited completions and chat. Copilot Pro is free for verified students and educators via GitHub Education (education.github.com). If you are a student, claim Education benefits before you start — you get Copilot Pro + GitHub Pro at zero cost.',
        },
      },
      {
        type: 'docLink',
        title: 'GitHub Copilot — billing plans',
        description: 'Full breakdown of Copilot Free, Pro, Business, and Enterprise tiers including what each plan includes and how to activate the student/educator discount.',
        url: 'https://docs.github.com/en/copilot/about-github-copilot/subscription-plans-for-github-copilot',
        source: 'GitHub Docs',
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Which model should I pick?',
          body: "Start with GitHub Copilot in VS Code — it has access to your entire file tree via @workspace. For complex architectural decisions, open claude.ai in a second tab and paste only the relevant files. Use Codex 5.3 when you need deep algorithmic logic.",
        },
      },
      { type: 'h', body: 'Using GitHub Copilot agent mode in VS Code' },
      {
        type: 'step',
        n: 1,
        title: 'Open Copilot Chat and switch to Agent mode',
        body: "Click the Copilot Chat icon (speech bubble, left sidebar). At the bottom of the chat panel, find the mode selector and switch from Ask to Agent. Now Copilot can read and write files.",
      },
      {
        type: 'step',
        n: 2,
        title: 'Reference files with @ and #',
        body: 'Type @ to reference your workspace, specific files, or the active editor file. These shortcuts give the AI context without copy-pasting.',
      },
      {
        type: 'list',
        items: [
          '@workspace — includes a summary of every file in your project. Use this for high-level architecture questions.',
          '#file:src/App.tsx — includes the full contents of that specific file. Use this when working on a specific component.',
          '#selection — includes whatever text you have highlighted in the editor.',
          '#terminalSelection — includes output you have selected in the terminal.',
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Run your first agent session',
        body: 'Use the bootstrap prompt below. Replace the bracketed placeholder with your one-sentence app description. The AI will ask questions, then wait for your approval before writing anything.',
      },
      {
        type: 'code',
        block: {
          kind: 'prompt',
          title: 'Agent bootstrap prompt — paste into Copilot Chat (Agent mode)',
          body: agentBootstrapPrompt,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: "Always review before approving",
          body: "In Copilot Agent mode, the AI shows you each file change before applying it. Read the diff. If something looks wrong, type 'stop — undo that, and instead...' to redirect. Never approve a change to a file you haven't read.",
        },
      },
      { type: 'h', body: 'The agentic development loop' },
      {
        type: 'list',
        items: [
          '1 · Describe one feature clearly — with acceptance criteria (what you will click and see).',
          '2 · Agent writes the code. Review the diff before approving.',
          '3 · Check in the browser. Does it match your acceptance criteria?',
          '4 · If yes: "Good, commit this, then let\'s do the next feature."',
          '5 · If no: describe exactly what is wrong (not what you want instead). Agent fixes it.',
          '6 · Repeat for every feature. Never ask for two features in one message.',
        ],
      },
      { type: 'h', body: 'When something breaks: the debug prompt' },
      {
        type: 'code',
        block: {
          kind: 'prompt',
          title: 'Agent debug prompt',
          body: agentDebugPrompt,
        },
      },
      { type: 'h', body: 'Adding features to a working app' },
      {
        type: 'code',
        block: {
          kind: 'prompt',
          title: 'Agent feature prompt',
          body: agentFeaturePrompt,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: "Agentic AI isn't magic — it's fast collaboration",
          body: "The agent makes mistakes. It sometimes over-engineers, misunderstands requirements, or deletes things you wanted. The skill you are building is not 'prompt perfectly once' — it is 'catch errors fast, redirect clearly, iterate cheaply.'",
        },
      },
      {
        type: 'details',
        summary: 'Using claude.ai or ChatGPT without Copilot',
        blocks: [
          {
            type: 'p',
            body: "If you don't have GitHub Copilot, open claude.ai or chatgpt.com in a split screen next to VS Code. Copy the contents of the relevant files, paste them into the chat with your prompt, and copy the AI's output back into VS Code. This is slightly slower but uses the exact same prompts above.",
          },
          {
            type: 'list',
            items: [
              'Copy relevant file: Ctrl+A in the editor file → Ctrl+C.',
              'In ai tool: paste file first, then your prompt saying "This is src/App.tsx: [paste] — Now [request]".',
              "Copy AI's output file block → open the file in VS Code → Ctrl+A → paste → Ctrl+S to save.",
              "The browser auto-reloads if npm run dev is running.",
            ],
          },
        ],
      },
      {
        type: 'checklist',
        items: [
          'I opened Copilot Chat in Agent mode (or chose an alternative AI tool)',
          'I sent the bootstrap prompt and the AI asked clarifying questions before writing code',
          'I approved at least one file change and verified it in the browser',
          'I used the debug or feature prompt at least once',
          'I committed the working changes to GitHub',
        ],
      },
    ],
  },

  /* ────────────────────────────────────────────────────────── L4 */
  {
    id: 'ux-design-vocabulary',
    number: 4,
    title: 'UX design vocabulary — describe anything',
    subtitle: 'The exact words that make AI-generated UIs look intentional, not generic.',
    goal: "You can open any screen in any app, identify its components by name, and prompt an AI to recreate or adapt it using precise vocabulary.",
    endState: 'You wrote at least one detailed design prompt using component names and design principles from this lesson.',
    estMinutes: 25,
    blocks: [
      {
        type: 'p',
        body: "The AI writes exactly what you describe. If you say 'a nice dashboard', you get average. If you say 'a sidebar navigation with icon-only collapsed state, a page header with a breadcrumb trail and a primary action button aligned right, and a 4-column metric card row below it', you get something precise. This lesson is your vocabulary reference. Bookmark it.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'How to use this lesson',
          body: "Read once all the way through. Then use it as a lookup table — every time you need to describe a UI element to an AI, find the section below that matches and copy the vocabulary words directly into your prompt.",
        },
      },
      { type: 'h', body: 'Part 1 — UX design principles' },
      {
        type: 'p',
        body: "Before components, here are the eight principles that separate good UI from bad. Name them in your prompts and the AI applies them.",
      },
      {
        type: 'list',
        items: [
          'Visual hierarchy — the most important thing on the page should be the most visually heavy. Say: "primary heading at 32px, secondary action in a ghost button, tertiary link in muted color".',
          'Proximity — related items should be close together. Say: "form label is 4px above its input, not 16px".',
          'Alignment — elements on the same axis feel organized. Say: "all labels left-aligned, all values right-aligned in this row".',
          'Consistency — the same interaction always looks the same. Say: "use the same primary button style everywhere — never change button color per page".',
          'Contrast — text must be legible. Say: "use a 4.5:1 contrast ratio minimum for body text".',
          'Affordance — controls should look clickable. Say: "buttons have a visible background and a hover state; links are underlined or colored differently from body text".',
          'Feedback — every action has a visible response. Say: "button shows a loading spinner on click; success shows a green toast notification".',
          'Progressive disclosure — show advanced options only when needed. Say: "show the advanced settings behind an expandable section, collapsed by default".',
        ],
      },
      { type: 'h', body: 'Part 2 — Untitled UI component reference' },
      {
        type: 'p',
        body: "Untitled UI is the most comprehensive UI component reference available. Every section below maps a component category to the exact vocabulary you need to describe it to an AI.",
      },
      {
        type: 'docLink',
        title: 'Untitled UI — full component library',
        description: 'Browse every component category, see all variants, and use the vocabulary from this lesson to reference them precisely.',
        url: 'https://www.untitledui.com/components',
        source: 'Untitled UI',
      },

      /* ── FOUNDATION ── */
      {
        type: 'details',
        summary: 'Foundation — color, typography, spacing, icons',
        blocks: [
          { type: 'h', body: 'Color vocabulary' },
          {
            type: 'list',
            items: [
              'Primary — your brand color (buttons, links, highlights). Say: "primary 600 as the CTA background, primary 100 as the light tint behind an active row".',
              'Neutral — grays. Say: "neutral-900 for headings, neutral-600 for body, neutral-400 for placeholder, neutral-200 for borders, neutral-50 for page background".',
              'Error — red scale. Say: "error-500 for danger icon, error-50 background on inline field error".',
              'Warning — amber scale. Say: "warning-400 icon, warning-50 background for banner".',
              'Success — green scale. Say: "success-500 for checkmark, success-50 background for a success callout".',
              'Semantic roles: bg (page), surface (card), border, text-primary, text-secondary, text-disabled.',
            ],
          },
          { type: 'h', body: 'Typography vocabulary' },
          {
            type: 'list',
            items: [
              'Scale: text-xs (12px), text-sm (14px), text-base (16px), text-lg (18px), text-xl (20px), text-2xl (24px), text-3xl (30px), text-4xl (36px), text-5xl (48px).',
              'Weight: font-normal (400), font-medium (500), font-semibold (600), font-bold (700).',
              'Display / heading: large, heavy, tight letter-spacing (e.g. "text-4xl font-bold tracking-tight").',
              'Body copy: normal weight, relaxed line-height (e.g. "text-base font-normal leading-relaxed").',
              'Label: small, semibold, uppercase tracking (e.g. "text-xs font-semibold uppercase tracking-wide text-secondary").',
              'Mono: code, command keys, version numbers (e.g. "font-mono text-sm").',
            ],
          },
          { type: 'h', body: 'Spacing vocabulary' },
          {
            type: 'list',
            items: [
              '4px baseline grid. All spacing is a multiple of 4: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.',
              'Padding: "p-4 = 16px", "px-6 py-4 = 24px horizontal, 16px vertical".',
              'Gap between related items: 8–12px. Gap between sections: 24–48px.',
              'Max content width: "max-w-7xl = 1280px" for full-bleed pages, "max-w-3xl = 768px" for reading columns.',
            ],
          },
          { type: 'h', body: 'Icon vocabulary' },
          {
            type: 'list',
            items: [
              'Line (outline) icons — default for UI controls. Size 16px (inline text), 20px (button icons), 24px (navigation icons).',
              'Solid icons — emphasis states, active nav items.',
              'Duotone — decorative, in empty states or feature illustrations.',
              'Icon-only button — must have an accessible label (tooltip or aria-label).',
              'Icon + label — icon left of text for most controls. Icon right of text for "read more" / "open" links.',
            ],
          },
          {
            type: 'docLink',
            title: 'Untitled UI — Icons (1,993 line icons)',
            description: 'The complete icon library used to reference Untitled UI naming conventions in prompts.',
            url: 'https://www.untitledui.com/components/icons',
            source: 'Untitled UI',
          },
        ],
      },

      /* ── BASE CONTROLS ── */
      {
        type: 'details',
        summary: 'Base controls — buttons, inputs, select, checkboxes, toggles, sliders, tags, badges, avatars, tooltips',
        blocks: [
          { type: 'h', body: 'Buttons' },
          {
            type: 'list',
            items: [
              'Primary — filled brand color. One per screen section. "primary button, size md, label Save changes".',
              'Secondary — outlined or light-tint. Equal to primary visually but less dominant. "secondary button, size md, label Cancel".',
              'Tertiary — text-only, no border. "tertiary button, label Edit, with a pencil icon left".',
              'Destructive — red. Only for delete / irreversible actions. "destructive button, label Delete account".',
              'Ghost — transparent background, border on hover. Stealth actions in toolbars.',
              'Link — looks like a hyperlink. Inline with prose.',
              'Sizes: sm (28px), md (36px), lg (44px), xl (52px) — always name the size.',
              'Icon-only button: "icon button, ChevronRight, 36px, tooltip=Next page".',
              'Loading state: "button shows spinner, label changes to Saving…, disabled during submission".',
            ],
          },
          { type: 'h', body: 'Inputs' },
          {
            type: 'list',
            items: [
              'Anatomy: label above input, optional hint text below, optional leading/trailing icon inside.',
              '"text input with label Email address, placeholder you@company.com, trailing icon: at-sign".',
              '"password input with show/hide toggle in the trailing slot".',
              '"search input with magnifying glass leading icon and a clear × button trailing".',
              'States: default, focused (brand-color border), filled, error (red border + error message below), disabled (gray, no interaction).',
              '"input, error state, label is red, hint text reads Password must be at least 8 characters".',
            ],
          },
          { type: 'h', body: 'Select, Multi-select, Dropdowns' },
          {
            type: 'list',
            items: [
              'Select: "single-select dropdown, label Status, options: To do / In progress / Done with corresponding color dots".',
              'Multi-select: "multi-select input, chips for each selected value, allows up to 5 selections".',
              'Dropdown menu: "dropdown attached to a button, 3 items each with an icon, destructive last item is red".',
              'Combobox: "searchable select — type to filter options, used for large lists (100+ options)".',
            ],
          },
          { type: 'h', body: 'Checkboxes, Radio, Toggles' },
          {
            type: 'list',
            items: [
              '"checkbox, label Agree to terms, required, shows error if unchecked on submit".',
              '"radio group, label Priority, options High / Medium / Low, horizontal layout, default Medium".',
              '"toggle switch, label Notifications, on by default, supporting text Email me when tasks are assigned to me".',
            ],
          },
          { type: 'h', body: 'Tags and Badges' },
          {
            type: 'list',
            items: [
              'Badge: small rounded pill for status (no click). "badge, color success, label Active".',
              'Tag: attached to content, often removable. "tag with × close button, label React".',
              'Color meanings (Untitled UI convention): gray = neutral, brand = notable, error = bad, warning = caution, success = good, blue = informational, indigo = special, purple = premium, pink = social, orange = pending.',
              '"status badge, color warning, label Pending review, dot indicator left".',
            ],
          },
          { type: 'h', body: 'Avatars' },
          {
            type: 'list',
            items: [
              'Sizes: xs (16px), sm (24px), md (32px), lg (40px), xl (48px), 2xl (56px).',
              '"avatar, size md, image of user, with online indicator dot, bottom-right".',
              '"avatar group, 4 avatars overlapping, +3 overflow chip at the end".',
              '"avatar, initials fallback: JD for Jane Doe, background brand-100".',
            ],
          },
          { type: 'h', body: 'Sliders, Progress, Tooltips' },
          {
            type: 'list',
            items: [
              '"range slider, label Volume, 0–100, step 1, current value shown in a bubble above the thumb".',
              '"progress indicator, 60%, label Processing upload, size sm, style linear bar".',
              '"progress circle, 3 of 5 steps complete, size lg, label centered inside the ring".',
              '"tooltip, trigger on hover, label Save (Ctrl+S), placement top, 200ms delay".',
            ],
          },
          {
            type: 'docLink',
            title: 'Untitled UI — Buttons (940 variants)',
            description: 'See every button size, color, state, and icon combination to reference in prompts.',
            url: 'https://www.untitledui.com/components/buttons',
            source: 'Untitled UI',
          },
        ],
      },

      /* ── NAVIGATION ── */
      {
        type: 'details',
        summary: 'Navigation — sidebar, header, breadcrumbs, tabs, pagination',
        blocks: [
          { type: 'h', body: 'Sidebar navigation' },
          {
            type: 'list',
            items: [
              '"sidebar nav, fixed left, 240px wide, white/dark surface, logo at top, nav items with icon + label, active item highlighted with brand-50 background and brand-700 text".',
              '"sidebar nav with sections: Main (Dashboard, Projects, Tasks) and Workspace (Team, Settings, Billing), section label in uppercase xs mono".',
              '"collapsible sidebar — when collapsed (64px), show icon-only; on hover show label in a tooltip or slide-out".',
              '"sidebar with user avatar and name at the bottom, role label below name, settings icon right".',
              '"sidebar nav item count badge: Tasks with a neutral badge showing 12".',
            ],
          },
          { type: 'h', body: 'Header / application top navigation' },
          {
            type: 'list',
            items: [
              '"top header, 64px height, light background, logo left, primary nav links centered, avatar + notification bell right".',
              '"header with search bar (full-width, 320px) in the center, pressing / focuses it".',
              '"mega menu dropdown on hover over Products nav item — two columns of links with icons".',
              '"mobile header — hamburger icon left, logo center, search icon right, drawer opens on hamburger tap".',
            ],
          },
          { type: 'h', body: 'Breadcrumbs' },
          {
            type: 'list',
            items: [
              '"breadcrumb trail, path: Home › Projects › FleetOps › Tasks, chevron separator, last item non-clickable".',
              '"breadcrumb with dropdown on middle crumb — clicking Projects shows a list of recent projects".',
            ],
          },
          { type: 'h', body: 'Tabs' },
          {
            type: 'list',
            items: [
              '"horizontal tabs, style: underline, labels: Overview / Tasks / Members / Settings, active tab has brand-colored underline".',
              '"horizontal tabs, style: filled pill, compact, used inside a card — not as a page nav".',
              '"vertical tabs, left-aligned in a 200px sidebar, each tab with an icon".',
              '"tabs with badge count: Tasks (12) / Completed (8) — count shown as neutral badge right of label".',
            ],
          },
          { type: 'h', body: 'Pagination and tree views' },
          {
            type: 'list',
            items: [
              '"pagination, style: numbered (show 7 pages, ellipsis for range), Prev/Next buttons on sides".',
              '"pagination, style: simple — just Previous and Next with current page label between".',
              '"tree view, collapsible, folder icons, files with file-type icons, indent per level = 16px".',
            ],
          },
          {
            type: 'docLink',
            title: 'Untitled UI — Sidebar navigations (184 variants)',
            description: 'Every sidebar layout variant from minimal icon-rail to full dark-mode dashboard sidebars.',
            url: 'https://www.untitledui.com/components/sidebar-navigations',
            source: 'Untitled UI',
          },
        ],
      },

      /* ── DATA DISPLAY ── */
      {
        type: 'details',
        summary: 'Data display — tables, metrics, charts, activity feeds, calendars, carousels',
        blocks: [
          { type: 'h', body: 'Tables' },
          {
            type: 'list',
            items: [
              '"data table, columns: Name (sortable) / Status (badge) / Assignee (avatar+name) / Due date / Actions (icon button)".',
              '"table with row checkboxes — bulk action toolbar appears above when rows are selected: Delete, Assign, Export".',
              '"sortable column header — clicking once sorts ascending (up arrow), clicking again descending (down arrow)".',
              '"empty state inside table: centered illustration + heading No tasks yet + primary button Create first task".',
              '"table with expandable rows — chevron in col 1 opens a details row below".',
              '"table pagination below: showing rows 1–10 of 47, Previous and Next buttons, rows-per-page select (10/25/50)".',
            ],
          },
          { type: 'h', body: 'Metric / stat cards' },
          {
            type: 'list',
            items: [
              '"metric card, label Total revenue, value $48,291, trend +12.5% in success-green with up-arrow icon, comparison vs last month".',
              '"4-column metric row at top of dashboard, each with icon, label, value, and trend".',
              '"metric card with a sparkline mini-chart below the value".',
            ],
          },
          { type: 'h', body: 'Charts' },
          {
            type: 'list',
            items: [
              '"line chart, title Monthly revenue, x-axis months Jan–Dec, y-axis dollars, two lines: 2024 (blue) and 2025 (brand), legend below, tooltip on hover shows exact values".',
              '"bar chart, grouped, 4 categories, horizontal grid lines, x-axis labels angled 45°".',
              '"stacked bar chart, each bar segment has a distinct color with a legend".',
              '"pie chart, 5 segments with legend listing percentage and value for each, donut style (hole in center)".',
              '"radar chart, 6 axes representing skill ratings 0–10, filled polygon".',
              '"activity gauge, half-ring progress arc from 0–100, large centered value, label below".',
            ],
          },
          { type: 'h', body: 'Activity feeds, calendars, carousels' },
          {
            type: 'list',
            items: [
              '"activity feed, each item: avatar left, action text (Jane added a comment), timestamp right, connected by a vertical timeline line".',
              '"calendar, month view, events as colored chips on their day cell, clicking a chip opens a detail popover".',
              '"calendar, week view, time slots in rows, draggable event blocks".',
              '"carousel, 3 visible slides, dot indicators below, prev/next arrow buttons on sides, auto-advance every 5s with pause on hover".',
              '"card carousel with partial peek of next/previous cards at screen edge".',
            ],
          },
          {
            type: 'docLink',
            title: 'Untitled UI — Tables (204 variants)',
            description: 'Every table pattern from simple read-only to complex sortable/selectable/paginated admin tables.',
            url: 'https://www.untitledui.com/components/tables',
            source: 'Untitled UI',
          },
        ],
      },

      /* ── FEEDBACK & OVERLAYS ── */
      {
        type: 'details',
        summary: 'Feedback & overlays — modals, alerts, toasts, empty states, loading, banners, command menus',
        blocks: [
          { type: 'h', body: 'Modals and dialogs' },
          {
            type: 'list',
            items: [
              '"modal dialog, centered, max-width 480px, header with title and × close button, body with form, footer with Cancel (secondary) and Save changes (primary) buttons".',
              '"confirmation modal, icon: warning triangle in warning-100 circle, title Delete project?, body explains consequence, two buttons: Cancel and Delete (destructive)".',
              '"slideout panel (drawer), right side, 480px wide, slides in from the right, overlay on left, header + scrollable body + sticky footer action bar".',
              '"fullscreen modal for complex tasks like multi-step workflows".',
            ],
          },
          { type: 'h', body: 'Alerts and inline messages' },
          {
            type: 'list',
            items: [
              '"inline alert, kind: warning, icon left, title Your trial ends in 3 days, supporting text Upgrade to keep your data., link action Upgrade now, × dismiss button right".',
              '"inline alert, kind: error — red background tint, error icon, used directly below a form section that failed validation".',
              '"alert kinds: error / warning / success / default (informational)".',
            ],
          },
          { type: 'h', body: 'Notifications and toasts' },
          {
            type: 'list',
            items: [
              '"toast notification, position: bottom-right, kind: success, icon checkmark, title Changes saved, auto-dismiss after 4 seconds, can be manually dismissed".',
              '"toast, kind: error, title Something went wrong, with a link Retry".',
              '"notification center — bell icon in header with unread count badge, clicking opens a slideout panel listing all notifications".',
            ],
          },
          { type: 'h', body: 'Empty states' },
          {
            type: 'list',
            items: [
              '"empty state, centered in the table / list area, illustration: folder icon in a light circle, heading No projects yet, supporting text Create your first project to get started, primary button New project".',
              '"empty state for search: icon magnifying-glass, heading No results for [query], link Clear filters".',
              '"empty state for error: icon warning, heading Something went wrong, primary button Try again, secondary button Go back".',
            ],
          },
          { type: 'h', body: 'Loading indicators and banners' },
          {
            type: 'list',
            items: [
              '"spinner, size md, style: circular stroke, centered in the loading area".',
              '"skeleton loader — placeholder blocks matching the shape of the content, pulsing animation".',
              '"progress bar, style: linear, brand color fill, indeterminate (bouncing) when duration is unknown".',
              '"top banner, style: brand-colored strip, full width, 48px, message + link + close button right".',
              '"cookie / compliance banner, bottom of screen, white surface, text + Accept and Decline buttons".',
            ],
          },
          { type: 'h', body: 'Command menus (⌘K)' },
          {
            type: 'list',
            items: [
              '"command menu, triggered by Ctrl+K, full-screen overlay with centered search box, recent items below, grouped results: Pages / Actions / Settings".',
              '"command menu item: icon left, label, keyboard shortcut right, highlighted on hover".',
            ],
          },
          {
            type: 'docLink',
            title: 'Untitled UI — Modals (78 variants)',
            description: 'Confirmation dialogs, form modals, slideouts, and full-screen modals with every slot and state shown.',
            url: 'https://www.untitledui.com/components/modals',
            source: 'Untitled UI',
          },
        ],
      },

      /* ── FORMS ── */
      {
        type: 'details',
        summary: 'Form components — date pickers, file uploaders, filters, color pickers, messaging',
        blocks: [
          { type: 'h', body: 'Date pickers' },
          {
            type: 'list',
            items: [
              '"date picker, single date, calendar popover opens on input click, selected date shows in the input, today highlighted, navigation arrows to change month".',
              '"date range picker, two calendars side by side, selecting start + end, selected range shaded".',
              '"time picker, 12h format, HH:MM select with AM/PM toggle".',
            ],
          },
          { type: 'h', body: 'File uploaders' },
          {
            type: 'list',
            items: [
              '"file upload zone, drag-and-drop area with dashed border, icon upload-cloud, text Drag and drop files here, or Browse, accepts .pdf .docx max 10MB".',
              '"file uploader with upload progress: each file as a row — file icon / name / size / progress bar / cancel button".',
              '"image uploader with preview — selected image renders in a container, replace and remove buttons overlay it".',
            ],
          },
          { type: 'h', body: 'Filters' },
          {
            type: 'list',
            items: [
              '"filter bar, inline, horizontal: Status dropdown / Assignee multi-select / Due date range picker / Reset all link".',
              '"filter chip row — each applied filter shown as a dismissible chip, + Add filter chip at the end".',
              '"advanced filter builder — each row has: field select / operator select / value input, + Add rule and + Add group buttons".',
            ],
          },
          { type: 'h', body: 'Color pickers and messaging' },
          {
            type: 'list',
            items: [
              '"color picker, swatch grid of preset brand palette colors, + Custom hex input below".',
              '"chat message bubble: left-aligned (other) / right-aligned (self), avatar on opposite side, timestamp below, read receipt checkmark".',
              '"messaging thread: input bar at bottom with attachment icon and send button, message history scrolls above".',
            ],
          },
          {
            type: 'docLink',
            title: 'Untitled UI — Date pickers (68 variants)',
            description: 'Single, range, inline, and modal date/time pickers for every calendar interaction pattern.',
            url: 'https://www.untitledui.com/components/date-pickers',
            source: 'Untitled UI',
          },
        ],
      },

      /* ── MARKETING PATTERNS ── */
      {
        type: 'details',
        summary: 'Marketing patterns — hero sections, features, pricing, testimonials, CTAs, FAQs, footer',
        blocks: [
          { type: 'h', body: 'Hero / header sections' },
          {
            type: 'list',
            items: [
              '"hero section, centered layout, eyebrow label in brand badge, H1 headline 56px, subheading 18px max-w-2xl, two CTAs (primary + secondary), product screenshot mockup below".',
              '"hero, style: split — left column headline + CTAs, right column product screenshot or illustration".',
              '"hero with announcement banner above: small chip label New, text Version 3.0 is here, arrow link Read more".',
            ],
          },
          { type: 'h', body: 'Features sections' },
          {
            type: 'list',
            items: [
              '"features section, style: 3-column grid, each feature: icon in brand-100 square, title, 2-line description".',
              '"features, alternating layout: odd rows text left + image right, even rows image left + text right".',
              '"features with tabs: clicking a feature label on the left swaps the screenshot on the right".',
            ],
          },
          { type: 'h', body: 'Pricing sections' },
          {
            type: 'list',
            items: [
              '"pricing section, 3 tiers: Starter / Pro / Enterprise, Pro tier highlighted with brand border and Popular badge, toggle monthly/annually, feature checklist per tier".',
              '"pricing card anatomy: tier name / price (large) / billing period / subtext / CTA button / divider / feature list with check icons".',
            ],
          },
          { type: 'h', body: 'Testimonials, social proof, CTA, FAQ' },
          {
            type: 'list',
            items: [
              '"testimonial section, grid of 3 quote cards: star rating / quote / avatar + name + company, subtle brand-tinted background".',
              '"logo strip: 6 grayscale company logos on white background, label Trusted by teams at...".',
              '"CTA section, centered, dark background, H2 + supporting paragraph + two CTAs, full-width".',
              '"FAQ section, accordion: clicking a question expands the answer, only one open at a time, chevron rotates on open".',
            ],
          },
          { type: 'h', body: 'Footer' },
          {
            type: 'list',
            items: [
              '"footer, 4-column: logo+tagline+socials / Product links / Company links / Legal links, thin copyright bar below".',
              '"minimal footer: logo left, 5 links centered, socials right, single row".',
            ],
          },
          {
            type: 'docLink',
            title: 'Untitled UI — Header/hero sections (186 variants)',
            description: 'Every hero layout from minimal centered text to full-bleed product screenshots with announcement bars.',
            url: 'https://www.untitledui.com/components/header-sections',
            source: 'Untitled UI',
          },
        ],
      },

      /* ── PAGE-LEVEL PATTERNS ── */
      {
        type: 'details',
        summary: 'Page-level patterns — dashboards, settings pages, auth pages, 404',
        blocks: [
          { type: 'h', body: 'Dashboard pages' },
          {
            type: 'list',
            items: [
              '"analytics dashboard, layout: fixed sidebar left, sticky header, main content starts with 4-column metric row, below that a 2/3 + 1/3 split: line chart left, activity feed right".',
              '"project management dashboard: header with active project tabs, table of tasks with status, assignee, and due date columns, empty state when no tasks".',
              '"overview card grid: 2 columns on mobile, 3 on tablet, 4 on desktop (responsive breakpoints)".',
            ],
          },
          { type: 'h', body: 'Settings pages' },
          {
            type: 'list',
            items: [
              '"settings page, layout: vertical tab list left (Profile / Notifications / Billing / Security / Integrations), content area right, each section is a card with a section header".',
              '"profile settings card: avatar with upload button, form fields below, Save / Cancel footer".',
              '"danger zone section: red-bordered card at bottom of settings, destructive actions like Delete account".',
            ],
          },
          { type: 'h', body: 'Auth pages (login, signup, forgot password)' },
          {
            type: 'list',
            items: [
              '"login page, centered card 440px wide: logo top, H2 Welcome back, email + password inputs, Forgot password link, Sign in primary button, social sign-in row (Google / GitHub), sign up link at bottom".',
              '"sign up page, same layout, adds name field and terms checkbox".',
              '"forgot password page: email input, Send reset link button, Back to login link".',
              '"verification page: 6-digit OTP input, Verify button, Resend code link with countdown".',
            ],
          },
          { type: 'h', body: '404 and error pages' },
          {
            type: 'list',
            items: [
              '"404 page: centered, large 404 text, heading Page not found, subheading, primary button Go back home, secondary button Contact support".',
              '"error boundary: icon warning-circle, heading Something went wrong, error message in mono code box (collapsed by default), Try again and Go home buttons".',
            ],
          },
          {
            type: 'docLink',
            title: 'Untitled UI — Dashboard examples (60 pages)',
            description: 'Full page layout examples for analytics, project management, settings, and more.',
            url: 'https://www.untitledui.com/components/dashboards',
            source: 'Untitled UI',
          },
          {
            type: 'docLink',
            title: 'Untitled UI — Settings page examples (80 pages)',
            description: 'Profile, billing, security, notifications, and team settings in every layout variant.',
            url: 'https://www.untitledui.com/components/settings-pages',
            source: 'Untitled UI',
          },
        ],
      },

      { type: 'h', body: 'Part 3 — Putting it together: a full design prompt' },
      {
        type: 'p',
        body: "Here is a complete design prompt using vocabulary from every section above. Notice how specific it is — there are no vague words like 'modern' or 'clean'.",
      },
      {
        type: 'code',
        block: {
          kind: 'prompt',
          title: 'Full design prompt example — Task management dashboard',
          body: `Build a task management dashboard with this layout:

SHELL
- Fixed sidebar, 240px wide, white surface, neutral-100 border right
- Sidebar: logo+app name top, nav items with 20px outline icons + labels
  - Sections: MAIN (Dashboard, Tasks, Projects) and WORKSPACE (Team, Settings)
  - Active item: brand-50 background, brand-700 text and icon
  - User avatar + name + role at bottom, settings icon right
- Sticky top header, 64px, white, shadow-sm
  - Breadcrumb: Dashboard > Tasks (neutral-600 separator slash)
  - Right: notification bell icon button with unread dot, avatar md

MAIN CONTENT (max-w-7xl, page padding px-8 py-6)
1. Page header
   - H1 "Tasks" (text-3xl font-semibold neutral-900)
   - Supporting text "Manage and track your team's work" (text-sm neutral-500)
   - Right: primary button "New task" with plus icon left, size md

2. Filter bar (mt-6, flex gap-3)
   - Status single-select: All / To do / In progress / Done
   - Assignee multi-select: avatar+name chips for each selection
   - Due date range picker
   - Reset all tertiary button, only visible when filters are active

3. Task table (mt-4)
   - Columns: checkbox / Task name (sortable) / Status (color badge) /
     Assignee (avatar+name) / Due date (sortable) / Priority (badge) /
     Actions (⋯ icon button opens dropdown: Edit / Delete)
   - Row hover: neutral-50 background
   - Empty state: upload-cloud icon in brand-100 circle, "No tasks yet",
     "Create your first task to get started", primary button "New task"
   - Footer: "Showing 1–10 of 47 tasks", pagination numbered, rows-per-page select

MODALS
- New task modal: 480px, form with Task name (text input) / Status (select) /
  Assignee (combobox with avatars) / Due date (date picker) / Description (textarea
  3 rows), footer Cancel + Create task (primary)
- Delete confirmation: warning icon, "Delete task?", consequence text,
  Cancel + Delete (destructive)

TOASTS (bottom-right)
- Success: "Task created" on form submit, auto-dismiss 4s
- Error: "Failed to save — try again" with Retry link`,
        },
      },
      {
        type: 'checklist',
        items: [
          'I can name the 8 UX principles and give an example of each',
          'I know the Untitled UI naming conventions for color, type, spacing, and icons',
          'I can describe any button, input, badge, nav, table, modal, chart, or hero section by name',
          'I wrote at least one detailed design prompt using vocabulary from this lesson',
        ],
      },
    ],
  },

  /* ────────────────────────────────────────────────────────── L5 */
  {
    id: 'full-app-build',
    number: 5,
    title: 'Build a full application with an AI agent',
    subtitle: 'Architect first, feature by feature second.',
    goal: 'You have built a multi-page React application with your AI agent, following a structured feature sequence, with every page reachable from a working navigation.',
    endState: 'At least 3 app pages are working and linked from a navigation component.',
    estMinutes: 20,
    blocks: [
      {
        type: 'p',
        body: "The beginner course built one-page apps in 30 minutes. This lesson builds something bigger: multiple pages, a real navigation, data flowing between views, and a proper component structure. The AI agent handles the code — your job is architecture decisions and verification.",
      },
      { type: 'h', body: 'Step 1 — Architect before you build' },
      {
        type: 'p',
        body: "Before asking the AI to write a single line, answer these four questions in your prompt. The AI's first response will confirm your architecture before building.",
      },
      {
        type: 'list',
        items: [
          'What are the pages / views? (e.g. Dashboard, Task list, Task detail, Settings, Login)',
          'What data does the app manage? (e.g. tasks: id, title, status, assignee, dueDate)',
          'What does each page do with that data? (Dashboard = read summary, Task list = read+filter, Task detail = read+update)',
          'What is the navigation model? (sidebar, top nav, or tabs — pick one)',
        ],
      },
      {
        type: 'code',
        block: {
          kind: 'prompt',
          title: 'Architecture approval prompt — send this first',
          body: `I am building [APP NAME]. Here is the architecture I want:

PAGES:
- [List each page / route and its purpose]

DATA MODEL:
- [List each data type with its fields]

NAVIGATION: [sidebar / top nav / tabs]

TECH:
- React + TypeScript + Vite
- React Router v6 for routing
- localStorage for persistence (no backend yet)
- Plain CSS or Tailwind — you decide what is already in the project
- No UI component libraries

Before writing any code:
1. Confirm the file structure you will create (src/pages/, src/components/, src/lib/, src/types/).
2. Confirm the TypeScript types for my data model.
3. Ask me any clarifying questions.
4. Wait for my OK before writing anything.`,
        },
      },
      { type: 'h', body: 'Step 2 — Feature sequencing' },
      {
        type: 'p',
        body: "Build in this order. Each layer is verified before the next one is added.",
      },
      {
        type: 'list',
        items: [
          '1 · Shell — navigation, routing, empty page stubs. Verify: every route navigates without 404.',
          '2 · Data layer — TypeScript types, localStorage helpers, seed data. Verify: data persists on refresh.',
          '3 · List view — read and display data. Verify: seeds appear, empty state renders.',
          '4 · Create flow — form + save. Verify: new item appears in list after submit.',
          '5 · Detail / edit view — read single item, update. Verify: changes persist.',
          '6 · Delete — confirm modal + remove. Verify: item gone from list.',
          '7 · Filter / search — client-side. Verify: filtering narrows the list correctly.',
          '8 · Polish — loading states, error boundaries, empty states, responsive layout.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Never skip verification',
          body: "If you approve the next feature before verifying the current one, bugs stack. When they stack, you lose an hour tracing which feature broke what. One feature, verify, commit, next.",
        },
      },
      { type: 'h', body: 'Step 3 — Using the agent for each layer' },
      {
        type: 'list',
        items: [
          'Start each feature: "The shell is done. Next: data layer. Here are my TypeScript types: [types]. Create src/lib/storage.ts with get/set/remove helpers using localStorage."',
          'Verify always: after the AI writes code, check in the browser before saying next.',
          'Redirect precisely: "The task detail page shows tasks, but editing does not save. In src/pages/TaskDetailPage.tsx the handleSave function calls updateTask but the list does not update — check if storage.ts is returning a stale copy."',
          'Keep commits clean: commit after each verified layer with a message like "feat: data layer — localStorage helpers + seed data".',
        ],
      },
      { type: 'h', body: 'Step 4 — Component structure rules' },
      {
        type: 'list',
        items: [
          'src/pages/ — one file per route, named [PageName]Page.tsx.',
          'src/components/ — reusable components (TaskCard, StatusBadge, DateLabel). Named with what they are.',
          'src/lib/ — business logic (storage.ts, utils.ts). No UI imports.',
          'src/types/ — TypeScript interface definitions only. No logic.',
          'src/App.tsx — router + layout shell only.',
        ],
      },
      {
        type: 'details',
        summary: 'Common pitfalls and how to redirect the AI',
        blocks: [
          { type: 'h', body: 'The AI added UI libraries you did not ask for' },
          {
            type: 'p',
            body: 'Say: "Remove the shadcn/ui import from that component. Rewrite it with plain Tailwind / plain CSS only. I will tell you when I am ready to add UI libraries."',
          },
          { type: 'h', body: 'The AI refactored something unrelated' },
          {
            type: 'p',
            body: 'Say: "You changed App.tsx which I did not ask you to touch. Revert that file to its previous state. Only change the files needed for the feature I described."',
          },
          { type: 'h', body: 'The AI created a backend you did not ask for' },
          {
            type: 'p',
            body: 'Say: "Remove everything under /server and /api. We are localStorage only until I tell you otherwise. Rewrite the data layer using localStorage directly."',
          },
          { type: 'h', body: 'State is not updating after edits' },
          {
            type: 'p',
            body: 'Most React state bugs are the same bug: mutating the array instead of returning a new one. Say: "In the updateTask function, are you mutating the existing array or returning a new one? It should return [...tasks.filter(t => t.id !== updated.id), updated]."',
          },
        ],
      },
      {
        type: 'checklist',
        items: [
          'I completed the architecture prompt and the AI confirmed my file structure before coding',
          'I built the shell (navigation + empty page stubs) and verified every route',
          'I built the data layer and verified persistence on page refresh',
          'I built at least one list view and one create/edit form',
          'Every completed feature layer is committed with a descriptive message',
        ],
      },
    ],
  },

  /* ────────────────────────────────────────────────────────── L6 */
  {
    id: 'backend-database',
    number: 6,
    title: 'Add a real database',
    subtitle: 'Firebase (Google) or Supabase (PostgreSQL) — your data survives across devices.',
    goal: "Your app reads from and writes to a real cloud database instead of localStorage. Data persists across browsers and devices.",
    endState: 'At least one data type (e.g. tasks) is stored in Firebase or Supabase and loads on page refresh.',
    estMinutes: 20,
    blocks: [
      {
        type: 'p',
        body: "localStorage is perfect for prototypes but it only lives in one browser on one computer. A real database — Firebase or Supabase — stores your data in the cloud. Any user on any device can read and write. This is the step that turns your prototype into an app you could actually give to other people.",
      },
      {
        type: 'jargon',
        term: 'Firebase',
        plain: "Google's cloud platform for apps. Firestore (the database product) stores JSON documents, scales automatically, and has a generous free tier. Great for beginners: minimal SQL, no schema required.",
      },
      {
        type: 'jargon',
        term: 'Supabase',
        plain: "An open-source Firebase alternative built on PostgreSQL. Has a real SQL database, row-level security, and an auto-generated REST API. Best when you are comfortable with tables and columns.",
      },
      { type: 'h', body: 'Path A — Firebase Firestore' },
      {
        type: 'step',
        n: 1,
        title: 'Create a Firebase project',
        body: 'Go to console.firebase.google.com. Click Add project. Name it (e.g. my-fleet-app). Disable Google Analytics for now (not needed). Click Create project.',
      },
      {
        type: 'docLink',
        title: 'Firebase — get started with a web app',
        description: 'Official walkthrough for creating a project, registering a web app, and getting your config object.',
        url: 'https://firebase.google.com/docs/web/setup',
        source: 'Firebase Docs',
      },
      {
        type: 'step',
        n: 2,
        title: 'Add a web app and get your config',
        body: 'In your Firebase project, click the </> web icon → Register app → App nickname: my-fleet-app → Register. Firebase shows you a firebaseConfig object. Copy the entire object — you will need it in step 4.',
      },
      {
        type: 'step',
        n: 3,
        title: 'Create a Firestore database',
        body: "In the Firebase console, click Build → Firestore Database → Create database → Start in test mode (for development) → Choose a region close to you → Enable. Test mode allows all reads and writes for 30 days — you will add security rules before launching.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Test mode is not for production',
          body: 'Test mode lets anyone read and write your database. It is only for development. Before you share your app URL with real users, set up Firestore security rules that require authentication.',
        },
      },
      {
        type: 'step',
        n: 4,
        title: 'Add Firebase to your Codespace project',
        body: "In your Codespace terminal, install the Firebase SDK. Then send the setup prompt below to the AI agent with your firebaseConfig values.",
      },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'user@codespace:/workspaces/my-fleet-app$', command: 'npm install firebase' },
          { output: 'added 4 packages in 2s' },
        ],
      },
      {
        type: 'step',
        n: 5,
        title: 'Send the Firebase setup prompt to your AI agent',
        body: 'Paste this prompt into Copilot Chat (Agent mode) or claude.ai, filling in your firebaseConfig.',
      },
      {
        type: 'code',
        block: {
          kind: 'prompt',
          title: 'Firebase setup prompt — paste into your AI agent',
          body: firebaseSetupPrompt,
        },
      },
      {
        type: 'step',
        n: 6,
        title: 'Create your .env.local file',
        body: "In VS Code Explorer, create a new file at the root of your project called .env.local. Paste the VITE_ environment variables the AI told you to create. This file is already gitignored by the Node .gitignore you added — your keys will never be committed to GitHub.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'bash',
          title: '.env.local — example Firebase keys',
          body: 'VITE_FIREBASE_API_KEY=AIzaSy...\nVITE_FIREBASE_AUTH_DOMAIN=my-fleet-app.firebaseapp.com\nVITE_FIREBASE_PROJECT_ID=my-fleet-app\nVITE_FIREBASE_APP_ID=1:123456:web:abc123',
        },
      },

      { type: 'h', body: 'Path B — Supabase' },
      {
        type: 'step',
        n: 1,
        title: 'Create a Supabase project',
        body: 'Go to supabase.com → Start your project → Create a new organization → New project. Choose a project name, a strong database password (save it), and a region close to you. Click Create new project. This takes about 2 minutes to provision.',
      },
      {
        type: 'docLink',
        title: 'Supabase — React quickstart',
        description: 'Official guide for adding Supabase to a React + Vite project with TypeScript — includes auth and data.',
        url: 'https://supabase.com/docs/guides/getting-started/quickstarts/reactjs',
        source: 'Supabase Docs',
      },
      {
        type: 'step',
        n: 2,
        title: 'Create your database tables',
        body: "In your Supabase project, click Table Editor → New table. Create one table for each data type in your app. Example: a tasks table with columns: id (uuid, default random), title (text, not null), status (text), assignee (text), due_date (date), created_at (timestamp, default now).",
      },
      {
        type: 'step',
        n: 3,
        title: 'Get your project URL and anon key',
        body: "Go to Project Settings → API. Copy the Project URL and the anon public key. These are safe to put in client-side code.",
      },
      {
        type: 'step',
        n: 4,
        title: 'Add Supabase to your project and send the setup prompt',
        body: 'Install the Supabase client in your Codespace terminal, then send the setup prompt to your AI agent.',
      },
      {
        type: 'shellSession',
        lines: [
          {
            prompt: 'user@codespace:/workspaces/my-fleet-app$',
            command: 'npm install @supabase/supabase-js',
          },
          { output: 'added 2 packages in 3s' },
        ],
      },
      {
        type: 'code',
        block: {
          kind: 'prompt',
          title: 'Supabase setup prompt — paste into your AI agent',
          body: supabaseSetupPrompt,
        },
      },

      { type: 'h', body: 'Which should I pick?' },
      {
        type: 'list',
        items: [
          'Pick Firebase if: you want the fastest start, your app manages flexible/nested data (JSON documents), you plan to add real-time collaborative features.',
          'Pick Supabase if: you think in tables and rows, you want SQL queries, you want an auto-generated REST API without writing any server code, you want an open-source solution you can self-host later.',
          'Both have generous free tiers: Firebase gives you 1 GB storage + 50K reads/day; Supabase gives you 500 MB database + 2 GB bandwidth/month.',
        ],
      },
      {
        type: 'checklist',
        items: [
          'I created a Firebase project with Firestore in test mode, OR a Supabase project with at least one table',
          'The Firebase SDK or @supabase/supabase-js is installed',
          'src/lib/firebase.ts or src/lib/supabase.ts exists and is wired to my environment variables',
          '.env.local has my project keys and is NOT tracked by git',
          'At least one data operation (read or write) is using the real database, not localStorage',
        ],
      },
    ],
  },

  /* ────────────────────────────────────────────────────────── L7 */
  {
    id: 'deploy-github-pages',
    number: 7,
    title: 'Deploy to GitHub Pages',
    subtitle: 'One push. A live URL the whole world can open.',
    goal: "Your app is live at https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/ and updates automatically every time you push to main.",
    endState: 'A public URL that opens your running app in any browser, anywhere in the world.',
    estMinutes: 15,
    blocks: [
      {
        type: 'p',
        body: "GitHub Pages turns the contents of your repository into a live website — for free. You will configure a GitHub Actions workflow that automatically builds and deploys your app every time you push code to main. One push, live in 90 seconds.",
      },
      {
        type: 'jargon',
        term: 'GitHub Actions',
        plain: "Automated scripts that run on GitHub's servers in response to events like pushing code. You describe the steps in a YAML file and GitHub runs them for you. No server to manage.",
      },
      {
        type: 'jargon',
        term: 'GitHub Pages',
        plain: "Free static website hosting built into GitHub. It serves the files from a special branch (gh-pages) or a folder as a public website at github.io.",
      },

      { type: 'h', body: 'Step 1 — Configure Vite for a subfolder URL' },
      {
        type: 'p',
        body: "GitHub Pages serves your site at /REPO-NAME/ — not at the root /. Vite needs to know this so asset paths are correct. Open vite.config.ts and add one line.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'ts',
          title: 'vite.config.ts — add the base option',
          body: "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n  base: '/YOUR-REPO-NAME/',   // ← replace with your actual repo name\n})",
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'base must match your repo name exactly',
          body: "Case-sensitive. If your repo is my-fleet-app, base is '/my-fleet-app/'. Get this wrong and your CSS, fonts, and JS will all 404.",
        },
      },

      { type: 'h', body: 'Step 2 — Fix React Router for subfolder paths' },
      {
        type: 'p',
        body: "If you are using React Router, it also needs to know the base path. Update the Router in App.tsx:",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'tsx',
          title: 'App.tsx — set basename on the Router',
          body: "import { BrowserRouter } from 'react-router-dom'\n\n// Use the Vite env variable so it works both locally and on Pages\n<BrowserRouter basename={import.meta.env.BASE_URL}>",
        },
      },

      { type: 'h', body: 'Step 3 — Add the GitHub Actions deploy workflow' },
      {
        type: 'p',
        body: "In your Codespace, create the file .github/workflows/deploy.yml. Copy the workflow below exactly.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'yaml',
          title: '.github/workflows/deploy.yml',
          body: ghPagesWorkflow,
        },
      },
      {
        type: 'jargon',
        term: 'peaceiris/actions-gh-pages',
        plain: "A popular GitHub Action that takes your build output (the dist/ folder) and pushes it to a gh-pages branch. GitHub Pages then serves that branch.",
      },

      { type: 'h', body: 'Step 4 — Enable GitHub Pages in repo settings' },
      {
        type: 'list',
        items: [
          'On github.com, go to your repository → Settings → Pages (left column).',
          'Source: Deploy from a branch.',
          'Branch: gh-pages / (root). Save.',
          'Leave the Enforce HTTPS checkbox checked.',
        ],
      },

      { type: 'h', body: 'Step 5 — Push, wait 90 seconds, open your URL' },
      {
        type: 'shellSession',
        lines: [
          { prompt: 'user@codespace:/workspaces/my-fleet-app$', command: 'git add -A' },
          { prompt: 'user@codespace:/workspaces/my-fleet-app$', command: 'git commit -m "feat: add GitHub Pages deploy workflow"' },
          { output: '[main 4f3ab2c] feat: add GitHub Pages deploy workflow' },
          { prompt: 'user@codespace:/workspaces/my-fleet-app$', command: 'git push' },
          { output: 'Enumerating objects: 6, done.\nTo github.com:your-username/my-fleet-app.git\n   abc123..4f3ab2c  main -> main' },
        ],
      },
      {
        type: 'p',
        body: "After pushing, go to your repository on GitHub → Actions tab. You will see a workflow run in progress. When the yellow dot turns green (usually 60–90 seconds), your site is live. Open https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Check the Actions tab if it fails',
          body: "Click the red × next to a failed run to see exactly which step failed and why. Most failures are a typo in base in vite.config.ts, or the Node version being wrong (update node-version: 22 in the workflow to match node -v in your terminal).",
        },
      },

      {
        type: 'details',
        summary: 'Optional: add a custom domain',
        blocks: [
          {
            type: 'p',
            body: "If you own a custom domain (e.g. myfleetapp.com), you can point it at GitHub Pages for free. Add a CNAME file to your repository containing your domain, then add a CNAME DNS record at your registrar pointing to YOUR-USERNAME.github.io.",
          },
          {
            type: 'list',
            items: [
              'In your repo, create a file at public/CNAME (no extension) with one line: your domain name.',
              'In your domain registrar DNS settings, add a CNAME record: www → YOUR-USERNAME.github.io.',
              'In GitHub Pages settings, type your custom domain and enable Enforce HTTPS.',
              'DNS propagation takes 10–60 minutes.',
            ],
          },
          {
            type: 'docLink',
            title: 'GitHub Pages — custom domains',
            description: 'Full walkthrough for adding apex domains, subdomains, and troubleshooting DNS propagation.',
            url: 'https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site',
            source: 'GitHub Docs',
          },
        ],
      },

      {
        type: 'details',
        summary: 'Important: environment variables on GitHub Pages',
        blocks: [
          {
            type: 'p',
            body: ".env.local is gitignored — your Firebase or Supabase keys are NOT deployed with your code. You need to add them as GitHub Actions secrets so the build can access them.",
          },
          {
            type: 'list',
            items: [
              'Go to your repo → Settings → Secrets and variables → Actions → New repository secret.',
              'Add each VITE_ variable as a secret with the same name (e.g. VITE_FIREBASE_API_KEY).',
              'In deploy.yml, add an env block under the "Install and build" step:',
            ],
          },
          {
            type: 'code',
            block: {
              kind: 'code',
              language: 'yaml',
              title: 'deploy.yml — add secrets as env vars for the build step',
              body: '      - name: Install and build\n        env:\n          VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}\n          VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}\n          # add other VITE_ vars here\n        run: |\n          npm install\n          npm run build',
            },
          },
        ],
      },

      {
        type: 'checklist',
        items: [
          'vite.config.ts has base set to /your-repo-name/',
          'React Router has basename={import.meta.env.BASE_URL} (if using React Router)',
          '.github/workflows/deploy.yml exists with the correct workflow',
          'GitHub Pages source is set to the gh-pages branch in repo Settings',
          'The Actions workflow ran green (no red ×)',
          'My app is live at https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/',
          'If using Firebase or Supabase: keys are added as GitHub Actions secrets',
        ],
      },
    ],
  },
]

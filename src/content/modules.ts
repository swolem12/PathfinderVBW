import type { LessonModule, PowerShellStep, PromptTemplate } from '../types/models'

export const lessonModules: LessonModule[] = [
  {
    id: '1',
    title: 'What Vibe Coding Actually Is',
    objective: 'Understand what AI coding agents do well and where your instructions matter most.',
    visualExplainer: 'Vague request → structured brief → reusable components → running app.',
    guidedNarrative:
      'Vibe coding is not random prompting. It is product direction, scope control, and clear acceptance criteria translated into instructions AI can execute.',
    antiExample: '“Make me a modern app with everything.”',
    miniDeliverable: 'A one-paragraph definition of your project mission and target user.',
    reflectionPrompt: 'What part of app creation feels most uncertain today?',
    sections: [
      {
        id: '1A',
        title: 'Prompt quality controls output quality',
        beginnerExplanation:
          'AI agents follow your instructions. Clear instructions produce clearer results.',
        whyItMatters: 'You save time, reduce rework, and get software that matches your intent.',
        analogy: 'It is like giving a contractor blueprints instead of “build me something nice.”',
        goodLooksLike: 'Specific stack, routes, features, constraints, and success criteria.',
        badLooksLike: 'No users, no scope, no pages, no validation plan.',
        examplePrompt:
          'Build a React + TypeScript app for a solo fitness tracker with routes for dashboard, workout log, and history. Include empty states and responsive behavior.',
        exercise: 'Rewrite one vague app idea into a 6-line build brief.',
        checklist: [
          'User defined',
          'Problem defined',
          'MVP scope defined',
          'Delivery stack defined',
          'Acceptance criteria listed',
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Turning an Idea into a Clear Problem Statement',
    objective: 'Convert fuzzy app ideas into concrete problem statements and outcomes.',
    visualExplainer: 'Pain point → workflow friction → measurable outcome.',
    guidedNarrative:
      'A useful problem statement explains who struggles, where they struggle, and what success looks like after your app is used.',
    antiExample: '“I want an app for productivity.”',
    miniDeliverable: 'A problem statement plus MVP boundary line.',
    reflectionPrompt: 'Can someone else read your statement and know what to build?',
    sections: [
      {
        id: '2A',
        title: 'Problem-first framing',
        beginnerExplanation: 'Describe the problem before describing screens.',
        whyItMatters: 'It prevents feature bloat and keeps agent output aligned.',
        analogy: 'You diagnose before prescribing medicine.',
        goodLooksLike: '“Field technicians lose tasks due to scattered spreadsheets.”',
        badLooksLike: '“I need something futuristic.”',
        examplePrompt:
          'Write a problem statement for a maintenance request tracker used by one facility manager and five technicians.',
        exercise: 'Fill in who, friction, current workaround, and desired outcome.',
        checklist: ['User role', 'Current pain', 'Desired behavior', 'Success metric'],
      },
    ],
  },
  {
    id: '3',
    title: 'Defining the User, Workflow, and Outcome',
    objective: 'Capture realistic users, scenarios, and outcomes AI can implement against.',
    visualExplainer: 'Persona → journey → task completion.',
    guidedNarrative: 'Strong user stories prevent generic UIs and mismatched flows.',
    antiExample: '“Users can do everything from one page.”',
    miniDeliverable: '3 user stories with acceptance checks.',
    reflectionPrompt: 'Which user story is highest priority for MVP?',
    sections: [],
  },
  {
    id: '4',
    title: 'Separating MVP from Wish List',
    objective: 'Make release-one scope clear and defer non-essential work.',
    visualExplainer: 'Now / Next / Later prioritization board.',
    guidedNarrative: 'A tight MVP helps AI generate stable architecture quickly.',
    antiExample: 'Payments + social feed + admin analytics + AI chat in v1.',
    miniDeliverable: 'Feature triage board.',
    reflectionPrompt: 'What can wait without hurting core value?',
    sections: [],
  },
  {
    id: '5',
    title: 'Mapping Pages, Features, and Navigation',
    objective: 'Describe route map, IA, and flows clearly for coding agents.',
    visualExplainer: 'Sitemap + feature matrix + state map.',
    guidedNarrative: 'When pages and components are explicit, generated code is predictable.',
    antiExample: '“Just make a dashboard and some pages.”',
    miniDeliverable: 'Sitemap and feature-to-page matrix.',
    reflectionPrompt: 'Can a new teammate navigate your app from this map alone?',
    sections: [],
  },
  {
    id: '6',
    title: 'Describing Great UI, UX, and Motion',
    objective: 'Translate vague adjectives into implementation-ready UI specs.',
    visualExplainer: 'Adjective → layout system → component states → motion rules.',
    guidedNarrative:
      'Premium UI language includes hierarchy, rhythm, responsive behavior, accessibility, and state transitions.',
    antiExample: '“Make it clean and smooth.”',
    miniDeliverable: 'UI direction brief with component behaviors.',
    reflectionPrompt: 'Did you specify loading, empty, and error states?',
    sections: [],
  },
  {
    id: '7',
    title: 'Writing Strong Build Prompts for AI Agents',
    objective: 'Generate reliable prompts for Claude Code, Codex, and GitHub agents.',
    visualExplainer: 'Brief + architecture + UI + constraints + tests.',
    guidedNarrative: 'Prompt packages reduce restarts and improve first-pass quality.',
    antiExample: '“Build everything and make it production.”',
    miniDeliverable: 'Complete build prompt package.',
    reflectionPrompt: 'What acceptance criteria would fail the build today?',
    sections: [],
  },
  {
    id: '8',
    title: 'Generating the Project and Understanding the Output',
    objective: 'Interpret generated files, routes, and component systems.',
    visualExplainer: 'Repo tree walkthrough and route map validation.',
    guidedNarrative: 'Read generated output like a product owner, not just a coder.',
    antiExample: 'Accepting generated code without checking scope alignment.',
    miniDeliverable: 'Annotated output review.',
    reflectionPrompt: 'What surprised you in the generated structure?',
    sections: [],
  },
  {
    id: '9',
    title: 'Running the App Locally in PowerShell',
    objective: 'Run, debug, and verify generated apps on Windows.',
    visualExplainer: 'PowerShell command ladder from folder to running app.',
    guidedNarrative: 'You need repeatable local launch habits to validate every generation.',
    antiExample: 'Running random commands without knowing what they do.',
    miniDeliverable: 'PowerShell launch checklist.',
    reflectionPrompt: 'Which error message would you need help interpreting?',
    sections: [],
  },
  {
    id: '10',
    title: 'Debugging, Reviewing, and Improving',
    objective: 'Iterate deliberately with validation and polish checklists.',
    visualExplainer: 'Issue triage → targeted prompt → retest.',
    guidedNarrative: 'Deliberate iteration beats random reprompting.',
    antiExample: 'Starting over instead of patching specific issues.',
    miniDeliverable: 'Iteration plan tied to acceptance criteria.',
    reflectionPrompt: 'Which defect category appears most often for your projects?',
    sections: [],
  },
  {
    id: '11',
    title: 'Capstone Build Package',
    objective: 'Assemble a complete handoff package for your own app idea.',
    visualExplainer: 'Problem statement through launch-readiness checklist.',
    guidedNarrative: 'This capstone becomes the artifact you hand directly to an AI coding agent.',
    antiExample: 'Submitting only a one-line idea.',
    miniDeliverable: 'Final build package export.',
    reflectionPrompt: 'What is the first thing you will build this week?',
    sections: [],
  },
]

export const promptTemplates: PromptTemplate[] = [
  {
    id: 'build-brief',
    name: 'Full Build Brief',
    description: 'Comprehensive prompt for initial generation',
    template:
      'You are building a React + TypeScript app. Deliver routes, reusable components, and acceptance criteria. Include empty/loading/error states, accessibility, and run instructions.',
  },
  {
    id: 'debug',
    name: 'Debug Prompt',
    description: 'Use after a failed generation or broken route',
    template:
      'Analyze this error and propose a minimal patch. Explain root cause, changed files, and verification steps. Do not rewrite unrelated modules.',
  },
  {
    id: 'polish',
    name: 'Polish Prompt',
    description: 'Improve quality without changing architecture',
    template:
      'Improve visual hierarchy, spacing rhythm, transitions, and component consistency while preserving current routes and behavior.',
  },
]

export const powerShellSteps: PowerShellStep[] = [
  {
    command: 'cd C:\\projects\\my-app',
    description: 'Move into the project folder',
    expectedOutput: 'PS C:\\projects\\my-app>',
  },
  {
    command: 'npm install',
    description: 'Install dependencies from package.json',
    expectedOutput: 'added 312 packages... found 0 vulnerabilities',
  },
  {
    command: 'npm run dev',
    description: 'Start the local development server',
    expectedOutput: 'Local: http://localhost:5173/',
  },
  {
    command: 'npm run build',
    description: 'Create a production build and catch type errors',
    expectedOutput: '✓ built in 3.4s',
  },
]

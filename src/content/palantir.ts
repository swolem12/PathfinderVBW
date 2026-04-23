import type { LessonDef } from './course'

/**
 * Palantir Slate — from blank Foundry tenant to a published webapp.
 *
 * Worked example: TaskBoard in Foundry — a Slate app that reads `Task`
 * objects from the Ontology, lets an operator click into one, and
 * marks it done via an Action Type.
 */

export const palantirSampleApp = {
  name: 'TaskBoard · Foundry edition',
  oneLiner:
    'A Slate webapp for a maintenance shift lead. Reads Task objects from the Ontology, shows a detail panel on click, and marks tasks done via an Action Type — no dataset writes, no custom backend.',
}

export const palantirLessons: LessonDef[] = [
  /* ---------------------------------------------------------------- */
  {
    id: 'foundry-overview',
    number: 1,
    title: 'The Foundry map',
    subtitle: 'The four layers and where Slate sits on top.',
    goal:
      'You can name the four Foundry building blocks (Datasets, Ontology, Functions, Slate) and explain why Slate reads through Functions instead of hitting datasets directly.',
    endState:
      'You know what Slate is for, and why this course spends four lessons on data before you ever drag a widget.',
    estMinutes: 6,
    blocks: [
      {
        type: 'p',
        body:
          "Foundry is Palantir's data platform plus app platform. Slate is the part you'll use to build a webapp your team can actually open. This course takes you from logging in for the first time to publishing a working Slate app — a TaskBoard for a maintenance crew.",
      },
      {
        type: 'slateMock',
        variant: 'slate-published',
        caption: "Lesson 8 destination — this is what you ship. Don't worry about how yet.",
      },
      { type: 'loopDiagram', caption: 'Every Slate app follows this loop: data → ontology → functions → UI → publish → iterate.' },
      { type: 'h', body: "The four things you'll touch" },
      {
        type: 'list',
        items: [
          'Datasets — raw tables produced by Foundry pipelines. You read from these indirectly. You never write to a dataset from Slate.',
          'Ontology — the "nouns and verbs" of your org: Object Types (Task, Technician), Link Types (Task → Technician), Action Types (completeTask). Slate reads and writes through the Ontology.',
          'Functions — short TypeScript snippets that run on Foundry\'s servers, can query the Ontology, and return typed data to Slate. This is your "backend" in this course.',
          'Slate — the canvas + widgets + document variables that make the webapp your users see in the browser.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'Slate vs. Workshop',
          body:
            "Workshop is Foundry's newer no-code app builder. Slate is lower-level HTML/JS and still heavily used in mature tenants. If your org steers you toward Workshop, lessons 1–3 and lesson 6 (Actions) still apply 100%. Only the UI-building lessons (4, 5, 7) change.",
        },
      },
      {
        type: 'visualRef',
        title: 'The four layers, stylistically',
        columns: 4,
        items: [
          { label: 'Datasets', sub: 'raw tables', swatch: 'tone', variant: 'technical' },
          { label: 'Ontology', sub: 'typed nouns', swatch: 'tone', variant: 'editorial' },
          { label: 'Functions', sub: 'server code', swatch: 'tone', variant: 'utilitarian' },
          { label: 'Slate', sub: 'UI canvas', swatch: 'tone', variant: 'warm' },
        ],
      },
      { type: 'h', body: 'The request path for one Slate page load' },
      {
        type: 'p',
        body:
          "When a user opens your Slate app, here is what actually happens on the wire: (1) browser downloads the Slate bundle + your document's config, (2) each Function-backed variable fires its query over HTTPS to the Functions service, (3) each Function executes under the caller's identity, queries the Ontology, and returns typed JSON, (4) Slate renders widgets bound to those variables. Nothing in Slate hits a dataset directly. Understanding this request path is 80% of Slate debugging.",
      },
      {
        type: 'visualRef',
        title: 'The Slate request path, left-to-right',
        columns: 4,
        items: [
          { label: 'Browser', sub: 'Slate bundle + doc config', swatch: 'tone', variant: 'browser' },
          { label: 'Function', sub: 'Server-side TS, caller identity', swatch: 'accent', variant: 'fn' },
          { label: 'Ontology', sub: 'Typed query → Spark SQL', swatch: 'layout', variant: 'onto' },
          { label: 'Datasets', sub: 'Immutable backing store', swatch: 'radius', variant: 'ds' },
        ],
      },
      { type: 'h', body: 'Quick glossary you will reuse' },
      {
        type: 'jargon',
        term: 'Compass',
        plain: "Foundry's file browser. Every artifact has a path like /Projects/Maintenance/TaskBoard/taskboard-slate.",
      },
      {
        type: 'jargon',
        term: 'Tenant',
        plain: "Your org's Foundry instance. The URL looks like https://<tenant>.palantirfoundry.com. Different tenants never share data.",
      },
      {
        type: 'jargon',
        term: 'Release',
        plain: 'An immutable version of a Function or Slate doc. Consumers pin to a specific release; bumping it is how you ship changes.',
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'Why not talk to datasets directly?',
          body:
            "Dataset rows are immutable append-only. A raw 'Task' row from yesterday may not match today's schema, may include unpublished columns, and has no permission scoping beyond the file. The Ontology layer gives you: typed access, row-level permission enforcement, a schema that only evolves via review, and cross-type joins. Every production Slate/Workshop app talks to Ontology via Functions; skip this and you build something that breaks the first time the upstream dataset shape shifts.",
        },
      },
      {
        type: 'checklist',
        items: [
          "I can name all four Foundry layers.",
          "I know Slate is the UI layer.",
          "I understand Slate talks to Functions, and Functions talk to the Ontology.",
          "I can describe the Slate request path: browser → Function → Ontology.",
          "I accept that I won't open a Slate doc until lesson 4.",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'access-workspace',
    number: 2,
    title: 'Get into Foundry',
    subtitle: 'Log in, find Slate, make a folder, open a blank canvas.',
    goal:
      "You're logged into your tenant, you've located the Slate app, and you have a project folder with an empty Slate document named taskboard-slate.",
    endState: 'An empty Slate canvas is open in your browser, in your own folder.',
    estMinutes: 8,
    blocks: [
      {
        type: 'step',
        n: 1,
        title: 'Log in to your tenant',
        body:
          "Your org's Foundry URL looks like https://<tenant>.palantirfoundry.com. Use the SSO provider your team gave you. If you can't log in, stop here and ask your Foundry admin — access is permissioned per-person, not self-serve.",
      },
      {
        type: 'step',
        n: 2,
        title: 'Find the app launcher',
        body:
          "Top-left: click the Foundry logo to open the launcher. Search for 'Slate'. Star it so it stays pinned. While you're there, also star 'Functions' and 'Ontology Manager' — you'll live in those three apps this course.",
      },
      {
        type: 'jargon',
        term: 'Compass',
        plain:
          "Foundry's file browser. Every dataset, ontology object, function, and Slate document lives at a Compass path like /Projects/Maintenance/TaskBoard/taskboard-slate.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Create a project folder',
        body:
          'Open Compass → New → Folder. Name it slate-<your-name> and put it somewhere your team has write access (ask your data lead if unsure). Every artifact you build in this course lives inside this folder.',
      },
      {
        type: 'slateMock',
        variant: 'compass',
        caption: 'What Compass looks like after steps 3 and 4. The highlighted row is your folder.',
        annotations: [
          { x: 0, y: 0, label: 'Left tree', note: 'Your folders. Drill down to your slate-<name>.' },
          { x: 0, y: 0, label: 'Right list', note: 'Files inside the folder. The Slate doc is highlighted.' },
          { x: 0, y: 0, label: 'Icons', note: '▣ = Slate, ƒ = Function. Recognize these at a glance.' },
          { x: 0, y: 0, label: 'Share', note: "Right-click the folder to set permissions — we'll do this in lesson 8." },
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Permissions will bite you',
          body:
            "Foundry permissions inherit from the folder an artifact lives in. If colleagues can't see your Slate app after you publish it, it's almost always a folder-permission issue, not a Slate bug. Check the folder first.",
        },
      },
      {
        type: 'step',
        n: 4,
        title: 'Create your first Slate document',
        body:
          'Inside your folder: New → Application → Slate document. Name it taskboard-slate. Save. You now see a blank Slate canvas with three panels: widget tray on the left, canvas in the middle, inspector on the right.',
      },
      { type: 'h', body: 'The 3 apps you will live in, side by side' },
      {
        type: 'visualRef',
        title: 'Star these; ignore the rest for now',
        columns: 3,
        items: [
          { label: 'Slate', sub: 'UI canvas + widgets', swatch: 'accent', variant: 'slate' },
          { label: 'Functions', sub: 'TS repos for queries + mutations', swatch: 'accent', variant: 'fn' },
          { label: 'Ontology Manager', sub: 'Object Types + Actions', swatch: 'accent', variant: 'ont' },
          { label: 'Compass', sub: 'File browser (always pinned)', swatch: 'tone', variant: 'compass' },
          { label: 'Notepad / Quiver', sub: 'Docs & embed targets', swatch: 'tone', variant: 'notes' },
          { label: 'Data Lineage', sub: 'Graph view (for debugging)', swatch: 'tone', variant: 'lineage' },
        ],
      },
      { type: 'h', body: 'Access troubleshooting — the usual suspects' },
      {
        type: 'details',
        summary: "I can log in but Slate isn't in the launcher",
        blocks: [
          {
            type: 'list',
            items: [
              'Your tenant has Slate disabled for your role — ask your Foundry admin to add you to the Slate Users group.',
              'Your tenant migrated to Workshop-only; Slate is still installable but hidden by default. Admin → Applications → install Slate for your role.',
              'You are on a sandbox tenant without Slate provisioned. Different URL, different app list.',
            ],
          },
        ],
      },
      {
        type: 'details',
        summary: "I can open Slate but can't create a new document",
        blocks: [
          {
            type: 'p',
            body:
              "You lack Write permission on the folder you are in. Navigate up until you find a folder you own or have Editor access to, then create there. 'New → Application → Slate' is greyed out if the current folder denies Write.",
          },
        ],
      },
      {
        type: 'details',
        summary: 'I created a folder but nobody else can see it',
        blocks: [
          {
            type: 'p',
            body:
              "New folders default to 'only you can read'. Right-click → Share → add the group that should see it. Remember: permissions cascade down, so set them on the folder, not the document.",
          },
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Use two browser profiles',
          body:
            "During development, keep one profile logged in as you (editor) and another as a test user (view-only). You will catch 90% of permission bugs before ever publishing because the test-user window shows the world as your users see it.",
        },
      },
      {
        type: 'checklist',
        items: [
          'I am logged in to Foundry.',
          'I have starred Slate, Functions, and Ontology Manager.',
          'I have a project folder I can write to.',
          'I have an empty Slate document named taskboard-slate.',
          'I have a second browser profile for test-user verification.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'data-ontology',
    number: 3,
    title: 'Datasets and the Ontology',
    subtitle: 'Meet Object Types. Write your first Function. Read it from Slate.',
    goal:
      'You understand the Ontology well enough to write a typed TypeScript Function that returns a list of Task objects, and call it from a Slate document variable.',
    endState: 'The variable panel in your Slate doc shows live data from the Ontology.',
    estMinutes: 14,
    blocks: [
      {
        type: 'p',
        body:
          "Slate does not talk to raw datasets in a production-safe way. It talks to the Ontology, through Functions. The Ontology is the shared vocabulary every app in Foundry uses to know what a 'Task' or a 'Technician' is.",
      },
      {
        type: 'jargon',
        term: 'Object Type',
        plain:
          "Like a table schema, but with a name, icon, and pre-declared relationships. E.g. Task has properties (title, priority, status, assignee) and links to other Object Types (Technician, Facility).",
      },
      {
        type: 'jargon',
        term: 'Object Instance',
        plain: "One row of an Object Type. E.g. one specific Task with title 'Replace filter'.",
      },
      {
        type: 'jargon',
        term: 'Function on Objects',
        plain:
          "A TypeScript function that runs on Foundry's servers, can query the Ontology, and returns typed data or mutations to anything that calls it (Slate, Workshop, other Functions).",
      },
      {
        type: 'slateMock',
        variant: 'ontology-object',
        caption: 'The Task Object Type in Ontology Manager — your org ships an analog of this.',
        annotations: [
          { x: 0, y: 0, label: 'Properties', note: 'The fields on each Task. Slate reads these as row.title, row.priority, etc.' },
          { x: 0, y: 0, label: '$rid', note: 'Primary key. Always use this to identify an object — never use title.' },
          { x: 0, y: 0, label: 'Links', note: "assignee → Technician. You'll follow this link in lesson 5's detail panel." },
          { x: 0, y: 0, label: 'Published badge', note: 'Only published object types are reachable from Functions and Slate.' },
        ],
      },
      { type: 'h', body: 'Pick an Object Type to work with' },
      {
        type: 'list',
        items: [
          "If your org already has a Task or WorkItem Object Type — use it. Ask your data lead.",
          "If not, ask your ontology lead to provision a sandbox Task type. You can't create Object Types from Slate or Functions — they're organization-level artifacts.",
        ],
      },
      { type: 'h', body: 'Create your first Function' },
      {
        type: 'p',
        body:
          "Open the Functions app. New → Function repository → TypeScript. Name it slate-helpers. In Settings → Ontology, check 'Task' so your repo can import its typed bindings. Then add a new file src/index.ts with this:",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'ts',
          title: 'src/index.ts — in your Functions repo',
          body: `import { Function } from "@foundry/functions-api"
import { Objects } from "@foundry/ontology-api"
import { Task } from "@foundry/ontology"

/** Returns Task instances whose status is 'Open', highest priority first. */
export class SlateHelpers {
  @Function()
  public getOpenTasks(): Task[] {
    return Objects.search().task()
      .filter((t) => t.status.exactMatch("Open"))
      .orderBy((t) => t.priority.desc())
      .take(200)
      .all()
  }
}
`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Where the @foundry types come from',
          body:
            "The @foundry/ontology and @foundry/ontology-api packages are auto-generated from the Object Types your repo has access to. If `Task` isn't there, the type isn't published, or you haven't enabled it in Settings → Ontology.",
        },
      },
      {
        type: 'slateMock',
        variant: 'functions-ide',
        caption: 'Your Functions IDE after you paste the snippet and click Preview.',
        annotations: [
          { x: 0, y: 0, label: 'Explorer', note: 'Your repo file tree. index.ts is where getOpenTasks lives.' },
          { x: 0, y: 0, label: '@Function decorator', note: 'Marks a method as callable from Slate. No decorator = Slate cannot see it.' },
          { x: 0, y: 0, label: 'Release v3 pill', note: "Every Release bumps the version. Slate pins itself to a specific release." },
          { x: 0, y: 0, label: 'Preview bar', note: 'Green check + row count = your Function works. Now click Release.' },
        ],
      },
      {
        type: 'step',
        n: 1,
        title: 'Publish the Function',
        body:
          "Press 'Preview' on the right. If it runs green, click 'Release'. Releasing gives the function a stable ID Slate can call. Every time you change the code, you release a new version.",
      },
      { type: 'h', body: 'Read it from Slate' },
      {
        type: 'step',
        n: 2,
        title: 'Add a Function-backed variable',
        body:
          'Back in your Slate document, open the left panel → Variables → New → Function-backed. Pick slate-helpers / getOpenTasks. Name the variable openTasks. Save.',
      },
      {
        type: 'step',
        n: 3,
        title: 'Verify',
        body:
          "The variable should show a green dot and a preview of the first item. Click the variable to see its full JSON output in the bottom pane.",
      },
      {
        type: 'slateMock',
        variant: 'variables-panel',
        caption: "What your Slate variables panel should look like after lesson 5. Right now you only have openTasks.",
        annotations: [
          { x: 0, y: 0, label: 'Green dot', note: 'Variable evaluated successfully. Red = a Function error; click to see the message.' },
          { x: 0, y: 0, label: 'Function kind', note: "Runs server-side. Re-runs whenever its inputs change — don't stuff these inside loops." },
          { x: 0, y: 0, label: 'Static kind', note: 'A local scratch value you assign from widget events (onRowClick, onChange).' },
          { x: 0, y: 0, label: 'Preview column', note: 'Live value. Expand into full JSON with the chevron.' },
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'If the variable is empty, check these in order',
          body:
            "1) There are no Task objects in 'Open' status. 2) Your Function repo's Ontology branch is different from your Slate doc's branch — set both to 'main'. 3) You don't have Read permission on the Task Object Type — ask your ontology lead.",
        },
      },
      { type: 'h', body: 'Ontology reference — the surface area you will use' },
      {
        type: 'visualRef',
        title: 'What lives on an Object Type',
        columns: 4,
        items: [
          { label: 'Properties', sub: 'title, priority, status…', swatch: 'accent', variant: 'props' },
          { label: 'Primary key', sub: '$rid, always stable', swatch: 'accent', variant: 'pk' },
          { label: 'Links', sub: 'Task.assignee → Technician', swatch: 'accent', variant: 'link' },
          { label: 'Actions', sub: 'completeTask, reassignTask', swatch: 'accent', variant: 'act' },
          { label: 'Indexes', sub: 'For fast exactMatch / orderBy', swatch: 'tone', variant: 'idx' },
          { label: 'Permissions', sub: 'Who reads, who edits', swatch: 'tone', variant: 'perm' },
          { label: 'Display config', sub: 'Title template, icon', swatch: 'tone', variant: 'disp' },
          { label: 'Derived props', sub: 'Computed from others', swatch: 'tone', variant: 'derived' },
        ],
      },
      { type: 'h', body: 'Query DSL cheatsheet' },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'ts',
          title: 'The operators you reach for 90% of the time',
          body: `// Equality
.filter((t) => t.status.exactMatch("Open"))

// One of a set
.filter((t) => t.status.isIn(["Open", "Blocked"]))

// Numeric / date
.filter((t) => t.priority.gte(3))
.filter((t) => t.dueDate.lt(new Date()))

// String containment (case-insensitive)
.filter((t) => t.title.contains("filter"))

// Boolean combinators
.filter((t) => t.status.exactMatch("Open").and(t.priority.gte(3)))

// Sort + limit (always cap queries)
.orderBy((t) => t.priority.desc())
.take(200)

// Count or one row
.count()
.takeFirst()

// Follow a link (lazy; triggers a join)
const tech = task.assignee.get()`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Never forget .take(N)',
          body:
            "Unbounded .all() on a growing Object Type will eventually return 100k rows and time out. Always cap queries, and if you need pagination, expose offset + limit in the Function signature and let Slate manage paging.",
        },
      },
      { type: 'h', body: 'Input parameters — how Slate passes data to a Function' },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'ts',
          title: 'Function with typed parameters',
          body: `@Function()
public getTasksByStatus(status: string, maxPriority: number): Task[] {
  return Objects.search().task()
    .filter((t) => t.status.exactMatch(status))
    .filter((t) => t.priority.lte(maxPriority))
    .orderBy((t) => t.priority.desc())
    .take(200)
    .all()
}`,
        },
      },
      {
        type: 'p',
        body:
          "In Slate, when you bind this Function-backed variable, the Inspector asks you for each argument. You bind {{someStringVar}} to `status` and a literal `5` to `maxPriority`. Every time `someStringVar` changes, the Function re-runs.",
      },
      { type: 'h', body: 'Function errors you will see' },
      {
        type: 'details',
        summary: "'Cannot find type Task'",
        blocks: [
          {
            type: 'p',
            body:
              "You haven't ticked 'Task' in your repo's Settings → Ontology tab. Until you do, the @foundry/ontology import doesn't know about it. Tick, save, wait 10 seconds for regeneration.",
          },
        ],
      },
      {
        type: 'details',
        summary: "'Permission denied' when Slate calls the Function",
        blocks: [
          {
            type: 'p',
            body:
              "The caller (your test user) lacks Read on the Task Object Type. Open Ontology Manager → Task → Permissions → grant Read to the appropriate group. The Function itself can't bypass this — that's the point.",
          },
        ],
      },
      {
        type: 'details',
        summary: "'Function version not released'",
        blocks: [
          {
            type: 'p',
            body:
              "You pressed Preview but never clicked Release. Preview runs in draft; Slate calls only released versions. Release → bump the version — Slate auto-picks the latest.",
          },
        ],
      },
      {
        type: 'checklist',
        items: [
          'I know the Ontology vs. dataset distinction.',
          'I wrote and released a Function.',
          'A Function-backed variable in my Slate doc returns live data.',
          'I know the core query DSL: filter, orderBy, take, count, link follow.',
          'I can diagnose the three common Function errors above.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'first-slate-doc',
    number: 4,
    title: 'Your first Slate document',
    subtitle: 'Heading, List widget, row template. A read-only task list in 12 minutes.',
    goal:
      'A working read-only Slate page: a heading, a List widget bound to openTasks, custom row template, and an empty detail panel on the right that we will wire in lesson 5.',
    endState:
      'Preview mode shows your list of tasks rendered with title + priority per row, plus a "Select a task" placeholder panel.',
    estMinutes: 12,
    blocks: [
      { type: 'h', body: 'The three panels of Slate' },
      {
        type: 'slateMock',
        variant: 'slate-editor',
        caption: "Your Slate editor after step 3. Memorize these three panels — you'll live here.",
        annotations: [
          { x: 0, y: 0, label: 'Widget tray (left)', note: 'Drag these onto the canvas. Heading, List, HTML, Button are the only four you need today.' },
          { x: 0, y: 0, label: 'Canvas (center)', note: 'Your actual page. Dashed border = editable region. Selected widget has an orange border + chip.' },
          { x: 0, y: 0, label: 'Inspector (right)', note: 'Everything about the selected widget: Data, Style, Events, Visibility. Orange cells = bound to a variable.' },
          { x: 0, y: 0, label: '{{openTasks}} pill', note: 'The binding syntax. Re-renders the widget whenever the variable changes.' },
        ],
      },
      {
        type: 'jargon',
        term: 'Widget',
        plain:
          'A pre-built component you drag from the tray onto the canvas. Each widget has Data bindings, Style, Events, and Visibility in its Inspector panel.',
      },
      {
        type: 'jargon',
        term: 'Binding',
        plain:
          'The {{variable}} syntax that makes a widget display dynamic data. Slate re-renders the widget every time the variable changes.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Add a Heading widget',
        body:
          "Drag a 'Heading' widget from the left tray onto the canvas. In the Inspector, set Text to 'TaskBoard — Shift View'. Pick Heading level 1.",
      },
      {
        type: 'step',
        n: 2,
        title: 'Add a List widget below',
        body:
          "Drag a 'List' widget under the heading. In the Inspector → Data → Data Source → bind to {{openTasks}}. The canvas immediately renders one row per task.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Template the row',
        body:
          "In Inspector → Row Template, switch to HTML. Paste the snippet below. Save. The list rerenders with your formatting.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'html',
          title: 'Row template — Slate Handlebars',
          body: `<div class="row">
  <span class="title">{{row.title}}</span>
  <span class="priority priority--{{row.priority}}">{{row.priority}}</span>
</div>
`,
        },
      },
      {
        type: 'step',
        n: 4,
        title: 'Add a details panel placeholder',
        body:
          "Drag an HTML widget to the right of the list. In its Content field paste: <p class='empty'>Select a task to see details.</p>. We'll wire it to a selectedTask variable in the next lesson.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Auto-save',
          body:
            'Slate auto-saves every edit to Draft. There is no Ctrl+S. Use the Version History panel (clock icon, top-right) if you need to roll back.',
        },
      },
      {
        type: 'details',
        summary: 'My row looks ugly — can I add CSS?',
        blocks: [
          {
            type: 'p',
            body:
              "Yes. Each Slate document has a global CSS block (click the gear icon → Document Settings → CSS). Add rules scoped to class names you used in your template. We'll style for real in lesson 7.",
          },
          {
            type: 'code',
            block: {
              kind: 'code',
              language: 'css',
              title: 'Minimal row CSS for now',
              body: `.row { display: flex; justify-content: space-between; padding: 6px 8px; }
.priority--High { color: #d9822b; font-weight: 600; }
.priority--Med  { color: #8a8a8a; }
.priority--Low  { color: #bdbdbd; }
`,
            },
          },
        ],
      },
      { type: 'h', body: 'Widget catalog — the 8 you will use most' },
      {
        type: 'visualRef',
        title: 'Drag these onto the canvas; the rest are variations',
        columns: 4,
        items: [
          { label: 'Heading', sub: 'Page + section titles', swatch: 'layout', variant: 'h' },
          { label: 'List', sub: 'Per-row template over array', swatch: 'layout', variant: 'list' },
          { label: 'HTML', sub: 'Free-form + Handlebars', swatch: 'layout', variant: 'html' },
          { label: 'Button', sub: 'Fires an onClick action', swatch: 'layout', variant: 'btn' },
          { label: 'Text Input', sub: 'Writes to a variable', swatch: 'accent', variant: 'ti' },
          { label: 'Select', sub: 'Dropdown → variable', swatch: 'accent', variant: 'sel' },
          { label: 'Table', sub: 'Sort / filter / paginate', swatch: 'accent', variant: 'tbl' },
          { label: 'Toast', sub: 'Notification on event', swatch: 'accent', variant: 'toast' },
        ],
      },
      { type: 'h', body: 'Handlebars reference — what works inside a template' },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'html',
          title: 'Row template idioms',
          body: `{{!-- Simple interpolation --}}
<span>{{row.title}}</span>

{{!-- Conditional class --}}
<span class="tag {{#if row.isUrgent}}tag--urgent{{/if}}">...</span>

{{!-- Equality switch --}}
{{#eq row.priority "High"}}🔥{{/eq}}
{{#eq row.priority "Low"}}⬜️{{/eq}}

{{!-- Loop inside a row (rare; prefer another List widget) --}}
<ul>{{#each row.tags}}<li>{{this}}</li>{{/each}}</ul>

{{!-- Safe default --}}
<span>{{#unless row.assignee}}— unassigned —{{/unless}}</span>

{{!-- Escape HTML (Slate does this by default; triple-brace opts out) --}}
<span>{{{row.trustedHtml}}}</span>`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Triple-brace is a footgun',
          body:
            "{{{x}}} skips HTML escaping. If x contains user-controlled data, that's an XSS injection. Use it only for HTML you generated server-side inside a Function.",
        },
      },
      { type: 'h', body: 'List widget options reference' },
      {
        type: 'list',
        items: [
          'Data Source — variable binding (must be an array).',
          'Row Template — HTML/Handlebars; gets `row` as the current item and `index` as its position.',
          'Empty State — shown when the array is []; never leave this empty, or the widget looks broken on zero rows.',
          'Pagination — auto; bind page size to a variable if you want user-configurable.',
          'Selection — single or multi; emits selectedRow / selectedRows on change.',
          'onRowClick — fires with `row` as the event argument; most common wiring in Slate.',
          'Filter Bar — built-in per-column filter UI; turn on once you have > 50 rows.',
        ],
      },
      { type: 'h', body: 'Common beginner mistakes' },
      {
        type: 'list',
        items: [
          'Putting Function calls inside row templates — one call per row, slow and wasteful. Always fetch upfront.',
          "Using row indices as React-style keys — Slate handles keys internally via $rid; don't manually key.",
          "Hard-coding row heights in CSS — tasks with long titles get cut off. Use min-height and let content flow.",
          "Forgetting the Empty State — zero-data pages look like broken pages.",
          "Putting too many widgets on one page — > 20 widgets and first-paint gets noticeably slow.",
        ],
      },
      {
        type: 'checklist',
        items: [
          'Heading renders.',
          'List renders one row per open task.',
          'Row template shows title + priority.',
          'Detail-panel placeholder is to the right.',
          'Empty state is defined on the List widget.',
          'No Function calls inside the row template.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'wire-data',
    number: 5,
    title: 'Wire widgets to data',
    subtitle: 'Document variables, onRowClick, a detail-fetch Function, conditional HTML.',
    goal:
      'Clicking a row in the list sets a selectedTaskId variable, a second Function fetches the full Task, and the detail panel renders its fields.',
    endState: 'Select-a-row-to-see-detail works end to end in Preview mode.',
    estMinutes: 15,
    blocks: [
      { type: 'h', body: 'Document variables — the glue' },
      {
        type: 'p',
        body:
          'Every Slate app has a bag of shared state called document variables. Widgets emit events (onRowClick, onChange), events write to variables, and other widgets read those variables as bindings. That is the whole Slate interactivity model.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Create a document variable selectedTaskId',
        body: 'Variables → New → Static → Type: String → Default: empty string. Save.',
      },
      {
        type: 'slateMock',
        variant: 'variables-panel',
        caption: 'End of this lesson: three variables wired together — one Static, two Function-backed.',
        annotations: [
          { x: 0, y: 0, label: 'openTasks', note: 'The list Function you built in lesson 3. Refreshed by the Mark-done button in lesson 6.' },
          { x: 0, y: 0, label: 'selectedTaskId', note: 'Static. Set by onRowClick (step 2). The only writable variable in this app.' },
          { x: 0, y: 0, label: 'selectedTask', note: 'Function-backed on getTaskById, bound to {{selectedTaskId}}. Re-runs on every click.' },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Wire onRowClick',
        body:
          "Select your List widget → Inspector → Events → onRowClick → Add Action → 'Set Variable'. Target: selectedTaskId. Value: {{row.$rid}}. Save.",
      },
      {
        type: 'jargon',
        term: '$rid',
        plain:
          "Every Ontology object instance has a $rid — a stable resource ID. Use it as the canonical key when passing 'which task is selected' between widgets. Do not use title or any other human-readable field.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Add a detail-fetch Function',
        body:
          "Back in your Functions repo, extend the SlateHelpers class with getTaskById. Release a new version.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'ts',
          title: 'Extend src/index.ts',
          body: `@Function()
public getTaskById(id: string): Task | undefined {
  if (!id) return undefined
  return Objects.search().task()
    .filter((t) => t.$rid.exactMatch(id))
    .take(1)
    .all()[0]
}
`,
        },
      },
      {
        type: 'step',
        n: 4,
        title: 'Add a Function-backed variable selectedTask',
        body:
          'Back in Slate: Variables → New → Function-backed → getTaskById. For the id argument, bind it to {{selectedTaskId}}. Name the variable selectedTask. Save.',
      },
      {
        type: 'step',
        n: 5,
        title: 'Bind the details HTML widget',
        body:
          'Select your details HTML widget → Content → paste the template below. Slate will re-render it whenever selectedTask changes.',
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'html',
          title: 'Details panel — Slate Handlebars',
          body: `{{#if selectedTask}}
  <h3>{{selectedTask.title}}</h3>
  <p><strong>Priority:</strong> {{selectedTask.priority}}</p>
  <p><strong>Status:</strong>   {{selectedTask.status}}</p>
  <p><strong>Assignee:</strong> {{selectedTask.assignee.name}}</p>
  <p class="description">{{selectedTask.description}}</p>
{{else}}
  <p class="empty">Select a task to see details.</p>
{{/if}}
`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: "Don't over-query",
          body:
            'Every Function-backed variable re-runs when its inputs change. If you stick a Function call inside a list row template, you will fire N queries per render. Keep per-row data in the original query; fetch detail on selection only.',
        },
      },
      { type: 'h', body: 'The Slate event model in one page' },
      {
        type: 'visualRef',
        title: 'Event → Action → Variable → Re-render',
        columns: 4,
        items: [
          { label: 'User interacts', sub: 'click / change / submit', swatch: 'tone', variant: 'user' },
          { label: 'Widget emits', sub: 'onRowClick(row)', swatch: 'layout', variant: 'widget' },
          { label: 'Action runs', sub: 'Set Variable / Run Fn', swatch: 'accent', variant: 'action' },
          { label: 'Variables change', sub: 'Slate re-renders bound widgets', swatch: 'radius', variant: 'rerender' },
        ],
      },
      { type: 'h', body: 'Every event type, with when to use it' },
      {
        type: 'list',
        items: [
          'onRowClick — selection. Fire Set Variable to a row $rid.',
          'onChange — input widgets. Always write to a variable; never read input state directly from the DOM.',
          'onSubmit — forms. Prefer over onClick of a submit button because it also fires on Enter.',
          'onSelectionChange — multi-select lists. Receives an array of $rids.',
          'onMount — fires once when the widget first renders. Use sparingly; prefer variable defaults.',
          'onTimer — poll a Function every N seconds. Use only for truly live data (build status, alerts); pollers cost server cycles.',
          'onSuccess / onError — the After hooks on Run Function / Run Action. This is where toasts and refreshes live.',
        ],
      },
      { type: 'h', body: 'Variable type reference' },
      {
        type: 'visualRef',
        title: 'Pick the right variable flavor',
        columns: 3,
        items: [
          { label: 'Static', sub: 'Scratch value; widgets write to it', swatch: 'accent', variant: 'static' },
          { label: 'Function-backed', sub: 'Read-only; re-runs on input change', swatch: 'accent', variant: 'fn' },
          { label: 'Computed', sub: 'Pure expression over other variables', swatch: 'accent', variant: 'comp' },
          { label: 'URL param', sub: 'Deep-linkable state', swatch: 'tone', variant: 'url' },
          { label: 'Document config', sub: 'Constants set once', swatch: 'tone', variant: 'cfg' },
          { label: 'User context', sub: 'currentUser, locale, timezone', swatch: 'tone', variant: 'user' },
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'URL-param variables turn any selection into a deep link',
          body:
            "Mark selectedTaskId as a URL parameter. Now /taskboard-slate?selectedTaskId=ri.... is a shareable link that opens the app on that exact task. A user can paste one into a Slack thread and land their teammate on the right row.",
        },
      },
      { type: 'h', body: 'Performance: the refresh graph' },
      {
        type: 'p',
        body:
          "Slate rebuilds a dependency graph across variables and widgets. When you change variable A, only variables/widgets that bound to A re-evaluate. Know your graph: if `selectedTask` depends on `selectedTaskId`, clicking a row triggers one Function call (getTaskById), not a page refresh. Avoid chains: don't have variable A depend on B depend on C depend on D — each hop is a server round-trip.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'ts',
          title: 'Anti-pattern — chained Function variables',
          body: `// BAD: three round-trips per selection change
openTasks        ← getOpenTasks()
selectedTask     ← getTaskById(selectedTaskId)       // round-trip #1
assignedTech     ← getTechnicianById(selectedTask.assigneeId)  // #2
techBacklog      ← getBacklogFor(assignedTech.id)   // #3

// GOOD: one Function returns the whole object graph
selectedTaskBundle ← getTaskBundle(selectedTaskId)  // one round-trip`,
        },
      },
      {
        type: 'checklist',
        items: [
          'I have a selectedTaskId document variable.',
          'List onRowClick writes to it.',
          'getTaskById is released and wired as selectedTask.',
          'Clicking a row updates the detail panel.',
          'I know which variable flavor to pick and why.',
          'I do not chain Function variables; each selection triggers one round-trip.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'interactivity',
    number: 6,
    title: 'Events, actions, visibility',
    subtitle: 'Call an Action Type. Refresh variables. Empty states.',
    goal:
      'A "Mark done" button on the detail panel calls the completeTask Action Type, the list re-queries, and a toast confirms the save.',
    endState: 'Mark-as-done works; the row disappears from Open; toast says "Task completed."',
    estMinutes: 12,
    blocks: [
      {
        type: 'jargon',
        term: 'Action Type',
        plain:
          "An Ontology-level mutation recipe: 'mark a Task as Complete', with typed inputs, validation, and a permission scope. Slate calls an Action Type — it never mutates datasets directly.",
      },
      {
        type: 'step',
        n: 1,
        title: 'Confirm an Action exists',
        body:
          "Ontology Manager → Task → Actions. Look for completeTask(task: Task). If missing, your ontology lead needs to define it. You cannot create Action Types from Slate.",
      },
      {
        type: 'step',
        n: 2,
        title: 'Add a Button widget to the detail panel',
        body:
          "Drag a Button widget into the detail panel HTML slot (or next to it). Label: 'Mark done'. In Inspector → Visibility, set condition: {{selectedTask}} && {{selectedTask.status}} !== 'Done'. The button now only shows when a task is selected and not already done.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Wire Button onClick to the Action',
        body:
          "Button → Events → onClick → Add Action → 'Run Ontology Action' → completeTask. For the task argument, bind {{selectedTask}}. Under 'After', tick 'Refresh variables' and pick openTasks AND selectedTask. Save.",
      },
      {
        type: 'slateMock',
        variant: 'action-modal',
        caption: 'The onClick editor. Ontology Actions are just functions with a form UI in front.',
        annotations: [
          { x: 0, y: 0, label: 'Action name', note: "completeTask — defined in Ontology Manager, not in Slate. You're only wiring, not creating." },
          { x: 0, y: 0, label: 'task argument', note: 'Bound to {{selectedTask}}. The orange border means this value comes from a variable, not a literal.' },
          { x: 0, y: 0, label: 'After success', note: 'Refresh openTasks + selectedTask so the UI reflects the mutation. Then show toast.' },
          { x: 0, y: 0, label: 'Run action', note: 'What happens when the user clicks Mark done. Slate validates inputs first.' },
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Optimistic UI vs. refresh',
          body:
            'Slate can optimistically update, but for a first app, just refresh the two affected variables. Optimize only after users complain. The refresh happens locally — it is not a page reload.',
        },
      },
      {
        type: 'step',
        n: 4,
        title: 'Add a toast for success',
        body:
          "Same onClick → After → Add another action → 'Show Toast' → message 'Task completed.' → intent Success.",
      },
      {
        type: 'step',
        n: 5,
        title: 'Conditional empty states everywhere',
        body:
          "Every widget has a Visibility section in the Inspector. Add a new HTML widget above the list with content 'Nothing open — good shift.' and Visibility condition {{openTasks.length}} === 0. Set the List's own Visibility to {{openTasks.length}} > 0. Now the page never looks broken, even when there is no data.",
      },
      {
        type: 'slateMock',
        variant: 'slate-published',
        caption: 'What lesson 6 produces in Preview — a row selected, detail rendered, Mark-done ready to fire.',
      },
      {
        type: 'details',
        summary: 'Advanced: run a Function instead of a single Action',
        blocks: [
          {
            type: 'p',
            body:
              "Sometimes 'mark done' needs to happen together with 'log an audit event' and 'notify the assignee'. Wrap the three Action Types in an OntologyEditFunction (a Function that can mutate the Ontology), and call that single function from onClick. You get a transaction, one button, one toast.",
          },
          {
            type: 'code',
            block: {
              kind: 'code',
              language: 'ts',
              title: 'OntologyEditFunction — transactional multi-action',
              body: `import { OntologyEditFunction } from "@foundry/functions-api"
import { Objects, Actions } from "@foundry/ontology-api"
import { Task } from "@foundry/ontology"

export class TaskEdits {
  @OntologyEditFunction()
  public completeAndAudit(taskId: string, note: string): void {
    const task = Objects.search().task()
      .filter((t) => t.$rid.exactMatch(taskId))
      .take(1)
      .all()[0]
    if (!task) return
    Actions.completeTask({ task })
    Actions.logAudit({ task, note, action: "completed" })
  }
}
`,
            },
          },
        ],
      },
      { type: 'h', body: 'Action composition patterns' },
      {
        type: 'visualRef',
        title: 'Pick the right wrapper for the mutation',
        columns: 3,
        items: [
          { label: 'Single Action', sub: 'One Ontology Action, one button', swatch: 'accent', variant: 'single' },
          { label: 'Sequential', sub: 'Action → onSuccess → Action', swatch: 'accent', variant: 'seq' },
          { label: 'Transactional', sub: 'OntologyEditFunction wraps all', swatch: 'accent', variant: 'tx' },
          { label: 'Optimistic', sub: 'Set var locally, then Action', swatch: 'tone', variant: 'opt' },
          { label: 'Confirm → Act', sub: 'Modal → yes → Action', swatch: 'tone', variant: 'confirm' },
          { label: 'Bulk', sub: 'Loop over selectedRows', swatch: 'tone', variant: 'bulk' },
        ],
      },
      { type: 'h', body: 'Error handling — the onError branch' },
      {
        type: 'p',
        body:
          "Every Run Action / Run Function in an onClick has onSuccess and onError hooks. Use onError to toast a user-friendly message and avoid the default 'Something went wrong' modal. Your Function can throw a UserFacingError with a stable code; your onError branch can switch on that code.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'ts',
          title: 'UserFacingError in an OntologyEditFunction',
          body: `import { OntologyEditFunction, UserFacingError } from "@foundry/functions-api"
import { Actions, Objects } from "@foundry/ontology-api"

export class TaskEdits {
  @OntologyEditFunction()
  public completeWithGuard(taskId: string): void {
    const task = Objects.search().task()
      .filter((t) => t.$rid.exactMatch(taskId))
      .takeFirst()
    if (!task) {
      throw new UserFacingError("Task not found", "TASK_MISSING")
    }
    if (task.status === "Done") {
      throw new UserFacingError("Already completed", "ALREADY_DONE")
    }
    Actions.completeTask({ task })
  }
}`,
        },
      },
      {
        type: 'p',
        body:
          "In Slate: Button → onClick → Run Function → completeWithGuard. Under After → onError, add 'Show Toast' with message derived from the error code: {{#eq error.code 'ALREADY_DONE'}}Nothing to do — already done.{{else}}{{error.message}}{{/eq}}.",
      },
      { type: 'h', body: 'Confirmation modals for destructive actions' },
      {
        type: 'step',
        n: 1,
        title: 'Use the Dialog widget',
        body:
          "Drag a Dialog widget onto the canvas. Visibility = {{confirmOpen}}. Add a title ('Complete this task?'), body text, and two buttons: Cancel (Set Variable confirmOpen = false) and Confirm (Run Action + Set Variable confirmOpen = false).",
      },
      {
        type: 'step',
        n: 2,
        title: 'Trigger the dialog from Mark done',
        body:
          "Change your Mark done button's onClick from 'Run Action' to 'Set Variable confirmOpen = true'. Now the button opens the dialog; the dialog runs the Action. You have a two-step confirm for free.",
      },
      { type: 'h', body: 'Refresh vs. optimistic' },
      {
        type: 'details',
        summary: 'When to prefer optimistic updates',
        blocks: [
          {
            type: 'p',
            body:
              "Refreshing openTasks after an Action takes 200-800 ms round-trip. Optimistic: immediately remove the completed task from a local mirror variable, then run the Action in the background. If it fails, re-add the row and show an error toast. Only worth it when the list is large OR users complete tasks rapidly in succession. For a shift-lead app firing once per minute, refresh is fine.",
          },
        ],
      },
      { type: 'h', body: 'Bulk actions — loop in a Function' },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'ts',
          title: 'Bulk-complete N selected tasks in one transaction',
          body: `@OntologyEditFunction()
public completeMany(taskIds: string[]): number {
  let done = 0
  for (const id of taskIds) {
    const t = Objects.search().task()
      .filter((t) => t.$rid.exactMatch(id))
      .takeFirst()
    if (t && t.status !== "Done") {
      Actions.completeTask({ task: t })
      done += 1
    }
  }
  return done  // for the toast: "Completed N tasks."
}`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Slate cannot loop client-side over Actions',
          body:
            "If you try to wire onClick to 'for each row in selectedRows, run Action', Slate does run them sequentially — but each is a separate transaction, with separate toasts and separate rollback stories. For anything bulk, wrap in a single OntologyEditFunction and fire that once.",
        },
      },
      {
        type: 'checklist',
        items: [
          'Mark-done button only shows for open, selected tasks.',
          'Clicking it calls the Action Type.',
          'openTasks and selectedTask refresh after success.',
          'Toast confirms.',
          'Empty state renders when there are zero open tasks.',
          'I have an onError branch that handles at least one error code.',
          'Destructive actions have a confirmation dialog.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'style-layout',
    number: 7,
    title: 'Style, layout, Blueprint',
    subtitle: "Grid mode. Blueprint components. Palantir's design tokens.",
    goal:
      'Your app looks like a real product, not a prototype. Responsive 12-column layout, Blueprint components for primary UI, tokens instead of hard-coded colors.',
    endState: 'Side-by-side list + detail on desktop, stacked on mobile. Primary button uses Blueprint.',
    estMinutes: 10,
    blocks: [
      {
        type: 'jargon',
        term: 'Blueprint',
        plain:
          "Palantir's open-source React component library, bundled into every Slate document. You get Button, Tag, Card, Callout, Spinner, Toast, and more, already on-brand.",
      },
      { type: 'h', body: "Layout: use the Grid, don't pixel-push" },
      {
        type: 'step',
        n: 1,
        title: 'Switch your canvas to Grid mode',
        body: 'Top toolbar → Layout → Grid. Set columns to 12. Your widgets snap to the grid.',
      },
      {
        type: 'step',
        n: 2,
        title: 'Span widgets across columns',
        body:
          'Each widget has colSpan in the Inspector. Give your list colSpan 7 and the detail panel colSpan 5. On narrow screens Slate will automatically stack them vertically.',
      },
      { type: 'h', body: 'Styling with Blueprint' },
      {
        type: 'visualRef',
        title: "Palantir's default feel",
        columns: 4,
        items: [
          { label: 'Utilitarian', sub: 'tone', swatch: 'tone', variant: 'utilitarian' },
          { label: 'Technical', sub: 'tone', swatch: 'tone', variant: 'technical' },
          { label: 'Warm orange', sub: 'accent', swatch: 'accent', variant: 'orange' },
          { label: '4px corners', sub: 'radius', swatch: 'radius', variant: 'subtle' },
        ],
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'html',
          title: 'Priority tag using Blueprint classes',
          body: `<span class="bp4-tag bp4-minimal {{#eq row.priority 'High'}}bp4-intent-danger{{/eq}}{{#eq row.priority 'Med'}}bp4-intent-warning{{/eq}}">
  {{row.priority}}
</span>
`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: "Don't reinvent",
          body:
            'Before writing custom HTML + CSS in a Slate widget, search blueprintjs.com/docs. If a component exists there, use it. Your app will be visually consistent with every other Foundry app your users already use.',
        },
      },
      {
        type: 'step',
        n: 3,
        title: 'Use Foundry design tokens',
        body:
          'Slate inherits Foundry CSS variables. Use var(--color-bg-primary), var(--color-text-secondary), var(--color-intent-warning), var(--spacing-md). Never hard-code #FFFFFF — users can switch to dark mode and your widget will look broken.',
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'css',
          title: 'Document Settings → CSS — token-driven row styling',
          body: `.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--color-border-subtle);
  color: var(--color-text-primary);
}
.row:hover  { background: var(--color-bg-hover); }
.description { color: var(--color-text-secondary); margin-top: var(--spacing-sm); }
.empty       { color: var(--color-text-disabled); font-style: italic; }
`,
        },
      },
      {
        type: 'slateMock',
        variant: 'slate-published',
        caption: 'End of lesson 7: same app, same data, but on-brand and grid-aligned.',
      },
      { type: 'h', body: 'Design token reference — memorize these 8' },
      {
        type: 'visualRef',
        title: 'Use tokens, never hex',
        columns: 4,
        items: [
          { label: '--color-bg-primary', sub: 'Page background', swatch: 'tone', variant: 'bg' },
          { label: '--color-bg-hover', sub: 'Row hover', swatch: 'tone', variant: 'hover' },
          { label: '--color-text-primary', sub: 'Main text', swatch: 'tone', variant: 'txt' },
          { label: '--color-text-secondary', sub: 'Muted text', swatch: 'tone', variant: 'txt2' },
          { label: '--color-intent-warning', sub: 'High-priority tag', swatch: 'accent', variant: 'warn' },
          { label: '--color-intent-danger', sub: 'Urgent / errors', swatch: 'accent', variant: 'danger' },
          { label: '--color-border-subtle', sub: 'Row dividers', swatch: 'radius', variant: 'border' },
          { label: '--spacing-md', sub: 'Standard padding', swatch: 'radius', variant: 'sp' },
        ],
      },
      { type: 'h', body: 'Responsive layout — the one rule' },
      {
        type: 'p',
        body:
          "Slate's grid auto-stacks below 768 px. Your job: give every widget a sensible colSpan (1-12), and set min-height on any fixed-height widget so stacked mobile views don't clip. Never use position: absolute; it breaks the auto-stack.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'css',
          title: 'A few more tokens you will want',
          body: `/* Corners + elevation */
.card {
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);       /* 4px in Palantir's default */
  box-shadow: var(--shadow-sm);
  padding: var(--spacing-md);
}

/* Typography scale */
h2 { font-size: var(--font-size-h2); line-height: var(--line-height-tight); }

/* Transitions (keep them quiet) */
.row { transition: background-color 120ms ease-out; }`,
        },
      },
      { type: 'h', body: 'Blueprint components you will actually use' },
      {
        type: 'visualRef',
        title: "Palantir's in-house React library, bundled in Slate",
        columns: 4,
        items: [
          { label: 'Button', sub: 'bp4-button bp4-intent-*', swatch: 'accent', variant: 'btn' },
          { label: 'Tag', sub: 'bp4-tag bp4-minimal', swatch: 'accent', variant: 'tag' },
          { label: 'Callout', sub: 'bp4-callout bp4-intent-*', swatch: 'accent', variant: 'callout' },
          { label: 'Card', sub: 'bp4-card bp4-elevation-1', swatch: 'accent', variant: 'card' },
          { label: 'Spinner', sub: 'bp4-spinner', swatch: 'tone', variant: 'sp' },
          { label: 'Icon', sub: 'bp4-icon bp4-icon-tick', swatch: 'tone', variant: 'ic' },
          { label: 'Tabs', sub: 'bp4-tabs', swatch: 'tone', variant: 'tabs' },
          { label: 'Menu', sub: 'bp4-menu', swatch: 'tone', variant: 'menu' },
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'Dark mode ships for free',
          body:
            "Every user can toggle dark mode in their Foundry profile. If you used tokens and Blueprint classes, your app already works — Foundry flips the token values, Blueprint adapts its classes. If you used #FFFFFF, you have homework.",
        },
      },
      { type: 'h', body: 'Accessibility quick checks' },
      {
        type: 'list',
        items: [
          'Every interactive widget has a label (not just a placeholder).',
          'Focus order matches visual order (tab through your page; any surprises = reorder widgets).',
          'Color contrast ≥ 4.5:1 for text on background. Tokens already pass; custom hex may not.',
          'No meaning conveyed by color alone (pair the red tag with a 🔥 icon).',
          'Keyboard Enter on a row triggers the same onRowClick as mouse click.',
        ],
      },
      {
        type: 'checklist',
        items: [
          'Layout is Grid mode, 12 columns, list = 7, detail = 5.',
          'Buttons and tags use Blueprint classes.',
          'No hard-coded hex colors in my CSS.',
          'Dark mode looks correct (toggle in your profile and re-check).',
          'Basic a11y: labels, focus order, contrast, keyboard Enter.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'publish-share',
    number: 8,
    title: 'Publish, embed, permissions',
    subtitle: 'From Draft to v1. Share the URL. Iterate safely.',
    goal:
      'Your Slate app has a released version, correct folder permissions, and a URL your team can open. You know how to ship v2 without breaking v1.',
    endState: 'A live, versioned Slate URL your shift lead can bookmark.',
    estMinutes: 8,
    blocks: [
      {
        type: 'jargon',
        term: 'Version',
        plain:
          'Slate documents have a Draft (what you are editing) and Published versions (what users see). Publishing is an immutable snapshot with a release note. Users only see the latest published version unless they have edit permission and explicitly open Draft.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Publish',
        body:
          "Top-right → Publish. Enter a release note like 'v1 — read list + detail + mark done'. Slate snapshots the doc and produces a version ID.",
      },
      {
        type: 'step',
        n: 2,
        title: 'Check permissions on the parent folder',
        body:
          "In Compass, right-click your slate-<name> folder → Share. Confirm read access for your target group (e.g. 'Maintenance / Shift Leads'). The Slate app inherits from here.",
      },
      {
        type: 'slateMock',
        variant: 'compass',
        caption: "Back in Compass — right-click the folder to open Share. Permissions inherit to everything inside.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Never grant raw dataset read as a shortcut',
          body:
            "If a user can open your Slate app but 'sees no data', you may be tempted to also grant them Read on the underlying Task dataset. Don't. Slate + Functions + Action Types wrap the data with typed, permissioned APIs. Granting dataset read bypasses every guard. Instead, grant them access to the Object Type in Ontology Manager.",
        },
      },
      {
        type: 'step',
        n: 3,
        title: 'Share the URL',
        body:
          "Copy the URL from your browser. Drop it in your team chat. First load is slower (Slate bundle warm-up + first Function call); subsequent loads use cached versions.",
      },
      {
        type: 'step',
        n: 4,
        title: 'Iterate: v2, v3, v4 …',
        body:
          "Go back to Draft. Make a change — add a filter, tweak CSS, fix a bug. Publish v2 with a release note. Users on the bookmarked URL get v2 automatically. Need to roll back? Version History → pick v1 → 'Publish this version'.",
      },
      { type: 'h', body: 'What to do next shift' },
      {
        type: 'list',
        items: [
          "Add a 'Claim task' button wired to a claimTask Action Type.",
          'Add a filter bar (Priority / Assignee) at the top using Radio Group widgets writing to document variables.',
          'Add a Metric widget counting open tasks per technician, using another Function that returns an aggregation.',
          "Embed your Slate app inside another Foundry page using 'Embed Slate' in Notepad or Quiver.",
          'Evaluate Workshop for your next app, if your org supports it.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'Migration to Workshop is cheap for the data, expensive for the UI',
          body:
            'Everything you learned about the Ontology, Functions, and Action Types is 100% portable to Workshop. Only lessons 4, 5, 7 (widgets, bindings, CSS) change. The data story is the same.',
        },
      },
      { type: 'h', body: 'Permission matrix — who sees what' },
      {
        type: 'visualRef',
        title: 'Every group gets the minimum they need',
        columns: 3,
        items: [
          { label: 'Viewer', sub: 'Read Slate + Read Object Type', swatch: 'accent', variant: 'v' },
          { label: 'Operator', sub: 'Viewer + Invoke Action Types', swatch: 'accent', variant: 'op' },
          { label: 'Editor', sub: 'Operator + Edit Slate doc', swatch: 'accent', variant: 'ed' },
          { label: 'Owner', sub: 'Editor + Folder admin', swatch: 'tone', variant: 'own' },
          { label: 'Function author', sub: 'Editor on Functions repo', swatch: 'tone', variant: 'fna' },
          { label: 'Ontology lead', sub: 'Schema + Action Types', swatch: 'tone', variant: 'onto' },
        ],
      },
      { type: 'h', body: 'Pre-publish checklist (the real one)' },
      {
        type: 'checklist',
        items: [
          'Open the app in a second browser profile as a test user — does the data match what that user should see?',
          'Click every Action button — does each one succeed end-to-end?',
          'Zero-data state — if openTasks is [], does the page still look intentional?',
          'Error state — if a Function fails (kill its Release to test), does the UI degrade gracefully?',
          'Bookmark the Draft URL — does it still work after you Publish? (It should; Draft is always at the same path.)',
          'Copy the share URL in an incognito window — are your prod permissions right?',
        ],
      },
      { type: 'h', body: 'Rollback playbook' },
      {
        type: 'step',
        n: 1,
        title: 'You published v3 and it broke',
        body:
          "Version History (clock icon) → find v2 → 'Publish this version'. Users on the bookmarked URL now see v2. Takes < 30 seconds if you have the playbook memorized.",
      },
      {
        type: 'step',
        n: 2,
        title: "Function regression broke the app, not Slate itself",
        body:
          "In Functions, Releases → find the prior release → 'Set as latest'. Slate auto-picks the latest release; one click rolls back without touching Slate at all.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Release notes are your changelog',
          body:
            "Always write a one-line release note when publishing ('v3 — add bulk complete; fix a11y labels on list'). Six months from now, Version History is your incident-response log.",
        },
      },
      { type: 'h', body: 'Embedding & integration' },
      {
        type: 'list',
        items: [
          'Notepad / Quiver — paste the Slate URL; it embeds as an iframe inheriting your user identity.',
          'Workshop — embed a Slate widget inside a Workshop app (for gradual migration).',
          'Email / Slack — just a URL; the recipient opens it in Foundry and auth happens via SSO.',
          'External iframe (outside Foundry) — generally blocked by X-Frame-Options; ask Admin for a trusted-embed exception only if required.',
        ],
      },
      {
        type: 'checklist',
        items: [
          'v1 is published with a release note.',
          'Folder permissions grant read to the right group.',
          "I can open the URL in an incognito window as my test user.",
          'I know how to roll back to a previous version.',
          'I know the permission matrix for Viewer vs. Operator vs. Editor.',
          'I have a release-note habit for every publish.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'advanced',
    number: 9,
    title: 'Custom HTML + Envision',
    subtitle: "When Blueprint isn't enough and you need a real chart.",
    goal:
      'You know the escape hatches: custom HTML widgets with <script> tags, Envision for charts, and OntologyEditFunction for transactional multi-action.',
    endState:
      'You can confidently answer "can Slate do X?" for almost any X, and you know when to say "use Workshop instead".',
    estMinutes: 12,
    optional: true,
    blocks: [
      { type: 'h', body: 'Escape hatch #1 — Custom HTML widget with JS' },
      {
        type: 'p',
        body:
          "Every HTML widget can include a <script> tag. Slate exposes a `window.widget` object so your script can subscribe to variables and emit events. Use this only when Blueprint + bindings can't express what you need — a custom card grid, a drag-and-drop, a SVG diagram.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'html',
          title: 'Custom HTML widget — subscribe + publish',
          body: `<div id="cards"></div>
<script>
  // Subscribe to a variable:
  window.widget.subscribe("openTasks", (tasks) => {
    const el = document.getElementById("cards");
    el.innerHTML = tasks
      .map((t) => \`<div class="card" data-rid="\${t.$rid}">\${t.title}</div>\`)
      .join("");
    el.querySelectorAll(".card").forEach((c) => {
      c.addEventListener("click", () => {
        // Publish a variable back up to Slate:
        window.widget.publish("selectedTaskId", c.dataset.rid);
      });
    });
  });
</script>
`,
        },
      },
      { type: 'h', body: 'Escape hatch #2 — Envision for charts' },
      {
        type: 'p',
        body:
          "Envision is Foundry's analytic notebook language. You write a small script that reads a dataset or object set and produces a chart. Publish the chart as a widget, embed it in your Slate doc. Use this instead of writing Chart.js from scratch — your chart will inherit Foundry permissions and theming.",
      },
      { type: 'h', body: 'Escape hatch #3 — OntologyEditFunction' },
      {
        type: 'p',
        body:
          "When a user action needs to update multiple objects atomically (complete a task AND log an audit AND notify the assignee), wrap it in a single OntologyEditFunction and call that from onClick. You get one transaction, one toast, one rollback story.",
      },
      { type: 'h', body: 'When to graduate to Workshop' },
      {
        type: 'list',
        items: [
          'Your app has > ~5 pages — Workshop has first-class multi-page routing.',
          'You need Action Forms with complex conditional fields — Workshop handles these declaratively.',
          "You're onboarding non-developers who will maintain the app — Workshop's no-code UI is kinder.",
          'You are starting from scratch — default to Workshop unless your org mandates Slate.',
        ],
      },
      { type: 'h', body: 'Escape-hatch decision matrix' },
      {
        type: 'visualRef',
        title: 'When to reach for each',
        columns: 3,
        items: [
          { label: 'Custom HTML + JS', sub: 'Bespoke layout/drag-drop/SVG', swatch: 'accent', variant: 'html' },
          { label: 'Envision', sub: 'Charts inheriting Foundry theme', swatch: 'accent', variant: 'env' },
          { label: 'OntologyEditFunction', sub: 'Transactional multi-mutation', swatch: 'accent', variant: 'oef' },
          { label: 'External iframe', sub: 'Last resort; auth headache', swatch: 'tone', variant: 'ext' },
          { label: 'Workshop migration', sub: 'When Slate hits its ceiling', swatch: 'tone', variant: 'ws' },
          { label: 'Custom widget pkg', sub: 'Org-wide reuse', swatch: 'tone', variant: 'pkg' },
        ],
      },
      { type: 'h', body: 'Custom HTML widget — the window.widget API in full' },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'js',
          title: 'Everything window.widget exposes',
          body: `// Read a variable (current value)
const tasks = window.widget.read("openTasks")

// Subscribe (fires on change; returns an unsubscribe fn)
const off = window.widget.subscribe("openTasks", (next) => { /* ... */ })

// Publish back up to a Slate variable
window.widget.publish("selectedTaskId", "ri.ontology.abc")

// Invoke a Function from JS (returns a Promise)
const tech = await window.widget.invoke("getTechnicianById", { id: "..." })

// Emit a named event (another widget can listen via onCustomEvent)
window.widget.emit("task:selected", { id: "ri.ontology.abc" })

// Read the current user
const me = window.widget.currentUser  // { id, name, email, groups }

// Cleanup on widget unmount
window.widget.onUnmount(() => off())`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Custom HTML widgets break some guardrails',
          body:
            "Slate cannot statically analyze your <script> tag. That means: (1) your JS can XSS if you concatenate user input into innerHTML, (2) eval() and remote script loading bypass CSP, (3) Slate's re-render graph does not track variables you read via .read() — use .subscribe() instead. Review custom HTML widgets in PR like you would any security-sensitive code.",
        },
      },
      { type: 'h', body: 'Envision for charts — the 30-second overview' },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'python',
          title: 'Envision script that produces a bar chart',
          body: `# Envision: Foundry's analytic notebook language.
from envision import read_object_set, bar_chart

tasks = read_object_set("Task").filter(status="Open")
bar_chart(
    tasks.group_by("priority").count(),
    x="priority",
    y="count",
    title="Open tasks by priority",
)`,
        },
      },
      {
        type: 'p',
        body:
          "Publish the Envision script; it produces a chart artifact. In Slate: Insert → Envision Chart → pick the artifact. The chart inherits the viewer's permissions (no data leaks) and the Foundry theme (no brand drift).",
      },
      { type: 'h', body: 'OntologyEditFunction patterns' },
      {
        type: 'list',
        items: [
          'Transactional multi-step — N Actions inside one function; one rollback boundary.',
          'Guarded action — validate (UserFacingError) before invoking the Action.',
          'Derived write — compute a field value from related objects before writing.',
          'Audit wrapper — every mutation also writes a FleetEvent row.',
          'Idempotent — accept a requestId; no-op on replay.',
        ],
      },
      { type: 'h', body: 'Slate vs. Workshop — the honest comparison' },
      {
        type: 'visualRef',
        title: 'Pick Slate when… / Pick Workshop when…',
        columns: 2,
        items: [
          { label: 'Slate', sub: 'HTML control + mature org muscle memory', swatch: 'accent', variant: 'slate' },
          { label: 'Workshop', sub: 'Multi-page + no-code + newer widgets', swatch: 'accent', variant: 'ws' },
          { label: 'Slate', sub: 'Embedded in other Foundry surfaces', swatch: 'tone', variant: 'embed' },
          { label: 'Workshop', sub: 'Starting a new app from scratch', swatch: 'tone', variant: 'new' },
          { label: 'Slate', sub: 'Custom visualizations (SVG, canvas)', swatch: 'radius', variant: 'viz' },
          { label: 'Workshop', sub: 'Handoff to analyst maintainers', swatch: 'radius', variant: 'hand' },
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Migration plan if you outgrow Slate',
          body:
            "Your Ontology work, Functions, and Action Types port over unchanged. Only widgets/bindings/CSS are rebuilt. Budget 1-2 days per Slate page in Workshop; less if the UI was simple to begin with.",
        },
      },
      {
        type: 'checklist',
        items: [
          "I know the three Slate escape hatches and when to reach for each.",
          'I can tell a teammate when Slate vs. Workshop is the right choice.',
          'I know the full window.widget API surface.',
          'I understand the security implications of custom HTML widgets.',
          'I can describe a migration plan to Workshop if/when it comes up.',
        ],
      },
    ],
  },
]

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
      {
        type: 'checklist',
        items: [
          "I can name all four Foundry layers.",
          "I know Slate is the UI layer.",
          "I understand Slate talks to Functions, and Functions talk to the Ontology.",
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
      {
        type: 'checklist',
        items: [
          'I am logged in to Foundry.',
          'I have starred Slate, Functions, and Ontology Manager.',
          'I have a project folder I can write to.',
          'I have an empty Slate document named taskboard-slate.',
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
      {
        type: 'checklist',
        items: [
          'I know the Ontology vs. dataset distinction.',
          'I wrote and released a Function.',
          'A Function-backed variable in my Slate doc returns live data.',
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
      {
        type: 'checklist',
        items: [
          'Heading renders.',
          'List renders one row per open task.',
          'Row template shows title + priority.',
          'Detail-panel placeholder is to the right.',
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
      {
        type: 'checklist',
        items: [
          'I have a selectedTaskId document variable.',
          'List onRowClick writes to it.',
          'getTaskById is released and wired as selectedTask.',
          'Clicking a row updates the detail panel.',
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
      {
        type: 'checklist',
        items: [
          'Mark-done button only shows for open, selected tasks.',
          'Clicking it calls the Action Type.',
          'openTasks and selectedTask refresh after success.',
          'Toast confirms.',
          'Empty state renders when there are zero open tasks.',
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
      {
        type: 'checklist',
        items: [
          'Layout is Grid mode, 12 columns, list = 7, detail = 5.',
          'Buttons and tags use Blueprint classes.',
          'No hard-coded hex colors in my CSS.',
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
      {
        type: 'checklist',
        items: [
          'v1 is published with a release note.',
          'Folder permissions grant read to the right group.',
          "I can open the URL in an incognito window as my test user.",
          'I know how to roll back to a previous version.',
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
      {
        type: 'checklist',
        items: [
          "I know the three Slate escape hatches and when to reach for each.",
          'I can tell a teammate when Slate vs. Workshop is the right choice.',
        ],
      },
    ],
  },
]

import type { LessonDef } from './course'

/**
 * Microsoft Power Apps — build a dynamic calendar from scratch.
 *
 * Worked example: EventsCalendar — a canvas app with a month grid, event
 * dots per day, a details panel for the selected date, and month-nav
 * buttons. Data source: a SharePoint list called Events.
 */

export const powerAppsSampleApp = {
  name: 'EventsCalendar · Canvas app',
  oneLiner:
    'A dynamic monthly calendar built in Power Apps Studio. Reads events from a SharePoint list, renders a 7×6 month grid with event dots, lets the user click a day to see its events, and supports prev/next month navigation — no Azure, no custom backend.',
}

export const powerAppsLessons: LessonDef[] = [
  /* ---------------------------------------------------------------- */
  {
    id: 'what-is-power-apps',
    number: 1,
    title: 'What Power Apps is',
    subtitle: 'Canvas vs. Model-driven, where it fits, what we will build.',
    goal:
      "You know the difference between a Canvas and a Model-driven app, you understand Power Fx at a high level, and you've seen the finished calendar we're going to build.",
    endState: "You could explain to a teammate what a Canvas app is and why we're using one.",
    estMinutes: 6,
    blocks: [
      {
        type: 'p',
        body:
          "Power Apps is Microsoft's low-code app platform, part of Power Platform (Power Apps, Power Automate, Power BI, Copilot Studio). You draw a UI in a browser-based Studio, point it at a data source (SharePoint, Dataverse, SQL, Excel), write formulas in a spreadsheet-like language called Power Fx, and publish an app your org can open in a browser or the Power Apps mobile app.",
      },
      {
        type: 'powerAppsMock',
        variant: 'calendar-live',
        caption: "Lesson 8 destination — this is what you'll ship. Click a day, see the events.",
      },
      { type: 'h', body: 'Canvas vs. Model-driven' },
      {
        type: 'list',
        items: [
          "Canvas app — you place controls anywhere on a screen, pixel-precise. Best for focused, opinionated UIs (like a calendar). This is what we'll use.",
          "Model-driven app — UI is generated automatically from your Dataverse data model. Best for CRUD-heavy business apps with lots of entities. Less design control.",
          'Both use the same Power Fx formula language, the same connectors, and the same sharing model.',
        ],
      },
      {
        type: 'jargon',
        term: 'Power Fx',
        plain:
          "Microsoft's open-source formula language. Looks and feels like Excel — declarative, strongly typed, no loops or variables in the traditional sense. You write expressions like Filter(Events, Start >= Today()) and the runtime handles the rest.",
      },
      {
        type: 'jargon',
        term: 'Connector',
        plain:
          'A pre-built integration to an external system (SharePoint, Dataverse, Office 365, SQL, Salesforce, Twitter, 500+ more). Connectors wrap authentication, schemas, and API calls behind simple Power Fx functions.',
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'Licensing in one paragraph',
          body:
            "Most Microsoft 365 business licenses include 'seeded' Power Apps rights sufficient for SharePoint-backed apps — like the one we're building. Premium connectors (SQL, Dataverse for a standalone app, custom connectors) require a per-user or per-app Power Apps license. If you can open make.powerapps.com with your work account, you're probably good for this course. If not, ask your tenant admin for a Power Apps Developer Plan — it's free for one user and full-featured.",
        },
      },
      {
        type: 'visualRef',
        title: 'Power Platform at a glance',
        columns: 4,
        items: [
          { label: 'Power Apps', sub: 'UI canvas', swatch: 'tone', variant: 'technical' },
          { label: 'Power Automate', sub: 'workflows', swatch: 'tone', variant: 'utilitarian' },
          { label: 'Power BI', sub: 'dashboards', swatch: 'tone', variant: 'editorial' },
          { label: 'Dataverse', sub: 'database', swatch: 'tone', variant: 'warm' },
        ],
      },
      {
        type: 'checklist',
        items: [
          'I can name Canvas vs. Model-driven and when to pick each.',
          'I understand Power Fx is Excel-like and declarative.',
          'I have confirmed I can sign in to make.powerapps.com.',
          "I've seen the end-state calendar and I want one.",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'studio-setup',
    number: 2,
    title: 'Open Studio and create the app',
    subtitle: 'Sign in, create a blank canvas app, meet the three panels.',
    goal:
      "You have a saved, empty canvas app named EventsCalendar in tablet layout, and you know where the tree view, canvas, and properties panel are.",
    endState: 'Power Apps Studio is open, a blank canvas app is saved, tree view shows one screen.',
    estMinutes: 8,
    blocks: [
      {
        type: 'step',
        n: 1,
        title: 'Sign in to Power Apps',
        body:
          "Open make.powerapps.com in your browser. Sign in with your Microsoft 365 work/school account. If you see a tenant picker, choose the one where your team's SharePoint site lives.",
      },
      {
        type: 'step',
        n: 2,
        title: 'Pick the right environment',
        body:
          "Top-right shows your current environment (e.g. 'Contoso (default)'). Environments isolate apps, data, and permissions. Use Default while learning. Your admin may have set up a dedicated 'Dev' environment — ask.",
      },
      {
        type: 'jargon',
        term: 'Environment',
        plain:
          'A container for your apps, flows, and Dataverse data. Every tenant has a Default environment. Production apps usually live in a dedicated environment so they can be promoted Dev → Test → Prod with solutions.',
      },
      {
        type: 'powerAppsMock',
        variant: 'home-screen',
        caption:
          'make.powerapps.com — the Home view. Left rail → + Create. We pick Blank canvas app.',
        annotations: [
          { x: 0, y: 0, label: '+ Create (rail)', note: 'Always in the left rail. Lands you on a gallery of new-app starting points.' },
          { x: 0, y: 0, label: 'Blank canvas', note: 'Pixel-precise UI. What we want for a calendar grid.' },
          { x: 0, y: 0, label: 'Start with data', note: 'Power Apps auto-generates a 3-screen CRUD UI from any table. Great for prototypes, wrong for this course.' },
          { x: 0, y: 0, label: 'Blank responsive', note: 'One canvas that adapts tablet/phone/desktop via containers. Advanced — come back after you ship v1.' },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Create a blank canvas app',
        body:
          "In Home → + Create → Blank canvas app. A dialog opens. Name: EventsCalendar. Format: Tablet (wider canvas, best for calendar grids). Click Create. Power Apps Studio opens in a new tab.",
      },
      {
        type: 'powerAppsMock',
        variant: 'create-dialog',
        caption:
          'The create dialog. Type the name, leave Tablet selected, click Create.',
        annotations: [
          { x: 0, y: 0, label: 'App name', note: 'Becomes the title bar and the default file name. You can rename later (File → Settings → Name).' },
          { x: 0, y: 0, label: 'Tablet format', note: '1366×768 canvas. Best default for a calendar — your phone users can still open it, it just scales.' },
          { x: 0, y: 0, label: 'Phone format', note: '640×1136 portrait. Pick this ONLY if your app is phone-first. Switching format later is painful.' },
          { x: 0, y: 0, label: 'Create', note: 'Spins up the empty canvas and routes you to Studio in a new tab.' },
        ],
      },
      {
        type: 'powerAppsMock',
        variant: 'studio',
        caption: 'Power Apps Studio — commit these three panels to memory.',
        annotations: [
          { x: 0, y: 0, label: 'Tree view (left)', note: 'App, screens, controls. Click any node to select and edit it.' },
          { x: 0, y: 0, label: 'Canvas (center)', note: 'Your actual screen. Drag controls in from Insert. Selected control has a blue border.' },
          { x: 0, y: 0, label: 'Properties (right)', note: "Properties of the selected control. Formulas go in the formula bar, not here." },
          { x: 0, y: 0, label: 'Formula bar (top)', note: 'The blue pill on the left picks a property (Items, OnSelect, Fill). The field on the right is Power Fx.' },
        ],
      },
      {
        type: 'step',
        n: 4,
        title: 'Save once so you have a Draft',
        body:
          'File → Save. Power Apps saves to the cloud — there is no local file. Every subsequent edit autosaves to Draft. Publishing (lesson 8) is what makes changes visible to users.',
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Rename Screen1 now, thank yourself later',
          body:
            "Screen1, Button1, Gallery1 become unreadable fast. Rename in the tree view: double-click a node. Use prefixes: scr (screen), btn (button), lbl (label), gal (gallery), ctn (container), tbl (table), col (collection), loc (local var), gbl (global var).",
        },
      },
      {
        type: 'step',
        n: 5,
        title: 'Rename your first screen',
        body: 'Tree view → Screen1 → double-click → CalendarScreen. Enter.',
      },
      {
        type: 'checklist',
        items: [
          'I can find Tree view, Canvas, Properties, and the Formula bar.',
          'I have a saved EventsCalendar app in Tablet layout.',
          "Screen1 is renamed to CalendarScreen.",
          "I know Ctrl+S works but autosave runs anyway.",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'data-source',
    number: 3,
    title: 'Create the Events data source',
    subtitle: 'Build a SharePoint list with the right columns, connect it.',
    goal:
      'Your app has a connection to an Events SharePoint list with Title, Start, End, Category, Owner, and Notes columns, and you can see it under Data.',
    endState: "The Data pane shows 'Events' with a green check. You can reference it in Power Fx.",
    estMinutes: 10,
    blocks: [
      { type: 'h', body: 'Pick a data source' },
      {
        type: 'list',
        items: [
          'SharePoint list — included with Microsoft 365, no premium license needed. We use this.',
          "Dataverse — Microsoft's relational store, richer types and real relationships, needs a premium license.",
          "Excel in OneDrive — fine for prototypes, breaks under concurrent writes. Don't use it for production.",
          "SQL Server / Azure SQL — premium connector. Use when you already have the database.",
        ],
      },
      {
        type: 'step',
        n: 1,
        title: 'Create the list in SharePoint',
        body:
          "Open a SharePoint site you own (or ask your site owner to make one). + New → List → Blank list → Name: Events → Create. You land on the default list view with one column called Title.",
      },
      {
        type: 'step',
        n: 2,
        title: 'Add the event columns',
        body:
          "+ Add column for each of the following. Use the exact types shown — picking 'Date and time' vs 'Date only' matters for filtering later.",
      },
      {
        type: 'powerAppsMock',
        variant: 'data-schema',
        caption: 'Target schema for the Events list. Title already exists — add the other five.',
        annotations: [
          { x: 0, y: 0, label: 'Title', note: 'Already exists. Renaming is allowed but keep the internal name "Title".' },
          { x: 0, y: 0, label: 'Start / End', note: 'Type: Date and time. Include time = Yes. We filter on these.' },
          { x: 0, y: 0, label: 'Category', note: 'Type: Choice. Add options Work, Personal, On-call, Holiday.' },
          { x: 0, y: 0, label: 'Owner', note: 'Type: Person or Group. Multi-select = No. Optional but handy.' },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Add a few sample events',
        body:
          "+ New → fill in a Title, Start, End, Category. Add 4–5 events spread across this month and next. You need real data to see your calendar work later.",
      },
      {
        type: 'step',
        n: 4,
        title: 'Open Add data in Studio',
        body:
          "Back in Power Apps Studio: left rail → Data (cylinder icon) → + Add data. A search box appears — start typing 'SharePoint'. A ranked list of connectors renders below.",
      },
      {
        type: 'powerAppsMock',
        variant: 'connectors-list',
        caption:
          'Connector picker. Type SharePoint → click the SharePoint tile at the top.',
        annotations: [
          { x: 0, y: 0, label: 'Standard vs. Premium', note: 'SharePoint is Standard — included in most M365 plans. SQL and Dataverse are Premium — need a Power Apps license.' },
          { x: 0, y: 0, label: 'Office 365 Users', note: 'Second-most-useful connector — returns User() details, photos, manager chain. We use it for the Owner avatar.' },
          { x: 0, y: 0, label: 'Dataverse', note: "Microsoft's relational store. Come back here after you outgrow SharePoint." },
        ],
      },
      {
        type: 'step',
        n: 5,
        title: 'Pick your site and list',
        body:
          "Click SharePoint → pick an existing connection (or + New connection, sign in with your work account). Paste your site URL (e.g. https://contoso.sharepoint.com/sites/fieldops) → Connect → pick Events from the list of lists → Connect. Events now appears in the Data pane with a green dot.",
      },
      {
        type: 'powerAppsMock',
        variant: 'sharepoint-picker',
        caption:
          'Two-step picker. Site URL first, then the list. Connection is cached for the app.',
        annotations: [
          { x: 0, y: 0, label: 'Recent sites', note: 'Your own sites and sites you recently visited show as a dropdown. Paste a URL if yours is missing.' },
          { x: 0, y: 0, label: 'List picker', note: "Shows every list and library on that site. 'Events' is what we created. Libraries (Documents) work too but treat files as rows." },
          { x: 0, y: 0, label: 'Connect button', note: 'Creates a connection reference in your app. Reusable by any screen, any formula.' },
        ],
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'Smoke test in the formula bar',
          body: `// Select App in the tree view, click OnStart, paste this temporarily:
Set(gblEventsCount, CountRows(Events))

// Then in View → Variables you should see gblEventsCount = 5 (or however many you added).
`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Delegation warning — read the blue squiggle',
          body:
            "SharePoint connector delegates only some operators (=, StartsWith, and, or, <=, >=). If you write Filter(Events, SomeFunction(Start) = X) Power Fx will pull the first 500 rows to the client and filter locally. You'll see a blue squiggly underline in the formula bar. For < 500 events you're fine; past that, only use delegable operators on indexed columns.",
        },
      },
      {
        type: 'jargon',
        term: 'Delegation',
        plain:
          "When Power Apps pushes your Filter/Sort/LookUp to the server to run, instead of downloading rows and filtering locally. Delegable queries scale; non-delegable ones cap at 500 (or whatever you set the row limit to).",
      },
      {
        type: 'checklist',
        items: [
          'Events list exists in SharePoint with the right columns.',
          'I added 4–5 sample events across this month and next.',
          'The Data pane in Studio shows Events with a green dot.',
          'CountRows(Events) returns a number in OnStart.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'calendar-grid',
    number: 4,
    title: 'Build the calendar grid',
    subtitle: 'App.OnStart variables, a 7-column Gallery, Sequence(42), date math.',
    goal:
      'A month grid renders on CalendarScreen: 42 cells (6 weeks × 7 days), correct day numbers for the current month, Sun–Sat headers, month label on top.',
    endState: "The canvas shows a calendar that looks like April 2026 (or whatever today's month is).",
    estMinutes: 14,
    blocks: [
      {
        type: 'p',
        body:
          'A month grid is always 7 columns × 6 rows = 42 cells. It starts on the Sunday on-or-before the 1st of the month and runs forward. That trick turns the whole thing into a simple date-math loop: cell[i] = gridStart + i days.',
      },
      {
        type: 'powerAppsMock',
        variant: 'insert-menu',
        caption:
          'Insert → Layout → Gallery → Vertical. Galleries are the repeating control — we will use one for the 42-cell grid.',
        annotations: [
          { x: 0, y: 0, label: 'Search controls', note: 'Type to filter. Useful when you forget which category a control lives in.' },
          { x: 0, y: 0, label: 'Gallery (highlighted)', note: "A repeating control. Set Items to a table and the template renders once per row. The template lives in its own sub-tree." },
          { x: 0, y: 0, label: 'Blank vertical', note: "Also works — same gallery with no preset labels. Pick this if you want to design the day cell from scratch (what we do)." },
          { x: 0, y: 0, label: 'WrapCount', note: "Set WrapCount = 7 on the gallery to turn a vertical list into a 7-column grid. That's the trick." },
        ],
      },
      { type: 'h', body: 'Set up the month state in App.OnStart' },
      {
        type: 'step',
        n: 1,
        title: 'Edit App.OnStart',
        body:
          "Tree view → App → select → formula bar property dropdown → OnStart. Paste the snippet below and press Enter. Then in the three-dot menu next to App, choose 'Run OnStart' so the variables initialize in your current session.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'App.OnStart — calendar state',
          body: `// First of the currently-visible month (defaults to today's month).
Set(locFirstOfMonth, DateAdd(Today(), 1 - Day(Today()), Days));

// Which day the user has tapped (defaults to today).
Set(locSelectedDate, Today());

// The Sunday on or before locFirstOfMonth — top-left cell of the grid.
// Weekday(d) returns 1 (Sun) .. 7 (Sat), so (Weekday - 1) rolls us back.
Set(locGridStart,
    DateAdd(locFirstOfMonth, -(Weekday(locFirstOfMonth) - 1), Days)
)
`,
        },
      },
      {
        type: 'powerAppsMock',
        variant: 'formula-bar',
        caption: 'Paste this into App.OnStart and press Run. No error pill = you are good.',
        annotations: [
          { x: 0, y: 0, label: 'Property picker', note: "Always confirm you're editing OnStart on the right control. Wrong control = wrong place." },
          { x: 0, y: 0, label: 'Set()', note: "Creates/updates a global variable. Set(name, value). No 'var' keyword — Power Fx is declarative." },
          { x: 0, y: 0, label: 'DateAdd', note: 'Signature: DateAdd(start, delta, unit). Unit = Days | Months | Years | Hours | Minutes.' },
          { x: 0, y: 0, label: 'No errors pill', note: 'Bottom strip turns green when Power Fx parses + typechecks clean.' },
        ],
      },
      { type: 'h', body: 'Build the 7-column Gallery' },
      {
        type: 'step',
        n: 2,
        title: 'Insert a vertical Gallery',
        body:
          "Insert → Gallery → Blank vertical. Rename to GalleryDays. Position it in the middle of the screen. In the right panel, change layout to 'Blank' if not already.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Configure the grid',
        body:
          "With GalleryDays selected, set these properties (each in the formula bar, picked from the property dropdown):",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'GalleryDays properties',
          body: `Items = ForAll(
    Sequence(42),
    { Value: DateAdd(locGridStart, ThisRecord.Value - 1, Days) }
)

WrapCount    = 7
TemplateSize = 72
Width        = 7 * Self.TemplateWidth
Height       = 6 * Self.TemplateSize
`,
        },
      },
      {
        type: 'jargon',
        term: 'Sequence(n)',
        plain:
          'Returns a single-column table of numbers 1..n. Pair it with ForAll to run a "for each" — the only loop construct in Power Fx. Sequence(42) + DateAdd = every cell of the calendar.',
      },
      {
        type: 'jargon',
        term: 'ThisItem / ThisRecord',
        plain:
          "Inside a Gallery's template, ThisItem is the current row of Items. Inside a ForAll, ThisRecord is the current iteration. Here they hold { Value: <date> } so ThisItem.Value is the cell's date.",
      },
      {
        type: 'step',
        n: 4,
        title: 'Add the day-number label',
        body:
          "Inside the gallery template (you see a little edit pencil when hovered): Insert → Label. Rename lblDay. Set its Text property:",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'lblDay properties',
          body: `Text = Day(ThisItem.Value)
Color = If(
    Month(ThisItem.Value) = Month(locFirstOfMonth),
    RGBA(32, 31, 30, 1),      // in-month: dark text
    RGBA(200, 198, 196, 1)    // other month: greyed out
)
Align = Align.Center
`,
        },
      },
      {
        type: 'step',
        n: 5,
        title: 'Add Sun–Sat headers above the gallery',
        body:
          "Insert → Horizontal container above the gallery. Inside it, Insert → Label 7 times (Sun, Mon, Tue, Wed, Thu, Fri, Sat). Set each Width to Parent.Width / 7. Or use another mini-Gallery — whatever you find faster.",
      },
      {
        type: 'step',
        n: 6,
        title: 'Add the month label on top',
        body: "Insert → Label above the headers. Rename lblMonth. Text = Text(locFirstOfMonth, \"mmmm yyyy\").",
      },
      {
        type: 'powerAppsMock',
        variant: 'calendar-preview',
        caption: 'End of lesson 4 — plain calendar grid, correct day numbers, greyed other-month cells.',
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Preview often with Alt-click',
          body:
            "Hold Alt while clicking a control in Studio to 'play' it without entering Preview mode. OnSelect runs, navigation runs. This is the single biggest time-saver in Power Apps — use it obsessively.",
        },
      },
      {
        type: 'checklist',
        items: [
          'OnStart initializes locFirstOfMonth, locSelectedDate, locGridStart.',
          'GalleryDays shows 42 cells in a 7-column grid.',
          'Day numbers are correct for the current month.',
          'Other-month days are visible but greyed out.',
          'Month label reads like "April 2026".',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'show-events',
    number: 5,
    title: 'Show events in each cell',
    subtitle: 'Filter per day, event dots, conditional fills for today and selected.',
    goal:
      'Every calendar cell shows a colored dot for each event on that date, today is highlighted blue, and the selected cell has a blue outline.',
    endState: 'The grid looks alive. Cells with events have dots; today pops.',
    estMinutes: 12,
    blocks: [
      {
        type: 'jargon',
        term: 'DateValue() vs DateTimeValue()',
        plain:
          "Events.Start is a DateTime (date + time of day). Comparing a DateTime to a plain Date silently fails at midnight boundaries. Always wrap with DateValue(Events.Start) when you only care about the day.",
      },
      { type: 'h', body: 'Count events per cell' },
      {
        type: 'step',
        n: 1,
        title: 'Add an invisible counter label',
        body:
          "Inside the gallery template, Insert → Label. Rename lblCount. Set Visible = false for now — we'll use it as data, not UI.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'lblCount.Text — events on this cell',
          body: `CountRows(
    Filter(
        Events,
        DateValue(Start) = ThisItem.Value
    )
)
`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Delegation squiggle on DateValue(Start)',
          body:
            "SharePoint won't delegate DateValue() wrapped around a column. For the calendar use case this is fine (you're querying ~30 days at a time). But if you have thousands of events, create a separate LocalEvents collection on OnStart — ClearCollect(colEvents, Events) — then filter on colEvents instead.",
        },
      },
      { type: 'h', body: 'Style the cell container' },
      {
        type: 'step',
        n: 2,
        title: 'Add a rectangle behind the day number',
        body:
          "Inside the template, Insert → Rectangle. Rename rectCell. Send it to back (right-click → Reorder → Send to back). Size it to fill the template: X=0, Y=0, Width=Parent.TemplateWidth, Height=Parent.TemplateHeight.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'rectCell conditional fill + border',
          body: `Fill = If(
    ThisItem.Value = Today(),          RGBA(0, 120, 212, 1),   // today: solid blue
    ThisItem.Value = locSelectedDate,  RGBA(222, 236, 249, 1), // selected: pale blue
    RGBA(255, 255, 255, 1)                                     // default: white
)

BorderColor = If(
    ThisItem.Value = locSelectedDate,
    RGBA(0, 120, 212, 1),              // selected: blue outline
    RGBA(237, 235, 233, 1)             // default: neutral edge
)

BorderThickness = 1
`,
        },
      },
      { type: 'h', body: 'Render the event dots' },
      {
        type: 'step',
        n: 3,
        title: 'Add an inner gallery of dots',
        body:
          "Inside the template, Insert → Gallery → Blank horizontal. Rename galDots. Position it near the bottom of the cell. Layout: blank. Set its properties:",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'galDots properties',
          body: `Items = FirstN(
    Filter(Events, DateValue(Start) = ThisItem.Value),
    3
)

TemplateSize  = 10    // dot container width
Height        = 10
WrapCount     = 1
ShowScrollbar = false
`,
        },
      },
      {
        type: 'step',
        n: 4,
        title: 'Add a circle inside the dot template',
        body:
          "Inside galDots template: Insert → Circle. Width = Height = 6. Fill based on category (map each Choice value to a color). Tooltip = ThisItem.Title so hover reveals the event.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'circleDot.Fill — category → color',
          body: `Switch(
    ThisItem.Category.Value,
    "Work",     RGBA(0, 120, 212, 1),
    "Personal", RGBA(16, 124, 16, 1),
    "On-call",  RGBA(202, 80, 16, 1),
    "Holiday",  RGBA(136, 23, 152, 1),
    RGBA(96, 94, 92, 1)   // fallback grey
)
`,
        },
      },
      {
        type: 'step',
        n: 5,
        title: 'Flip lblDay color when the cell is "today"',
        body:
          "Today is blue-filled, so dark text disappears. Update lblDay.Color: add an extra If branch — if ThisItem.Value = Today(), return white.",
      },
      {
        type: 'powerAppsMock',
        variant: 'calendar-preview',
        caption: 'End of lesson 5 — today highlighted, selected outlined, dots on days with events.',
      },
      {
        type: 'checklist',
        items: [
          "Every cell with events shows 1–3 dots (colored by Category).",
          "Today is the only solid-blue cell.",
          "lblCount is invisible but computes the right number.",
          "No delegation warning I care about (fine for < 500 events).",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'interactivity',
    number: 6,
    title: 'Click a day, change months, show details',
    subtitle: 'OnSelect, prev/next buttons, a side panel filtered to the selected date.',
    goal:
      "Clicking a day sets it as selected; prev/next buttons step the visible month; a right-hand panel shows that day's events with time, category, and notes.",
    endState: 'The app is interactive. Click around. Navigate months. See details update.',
    estMinutes: 12,
    blocks: [
      { type: 'h', body: 'Wire cell selection' },
      {
        type: 'step',
        n: 1,
        title: 'Set locSelectedDate when a cell is tapped',
        body:
          "Select GalleryDays → property dropdown → OnSelect. (Note: Gallery has an OnSelect that fires when the whole gallery is clicked. For per-cell, we usually add an invisible button on top of the cell OR use the Gallery's own OnSelect with ThisItem — the latter works because ThisItem is the tapped cell.)",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'GalleryDays.OnSelect',
          body: `Set(locSelectedDate, ThisItem.Value)
`,
        },
      },
      { type: 'h', body: 'Month navigation' },
      {
        type: 'step',
        n: 2,
        title: 'Add prev/next buttons',
        body:
          "In your header container (with lblMonth): Insert → Icon → ChevronLeft and ChevronRight. Rename btnPrev and btnNext. Size them ~32×32, place them on either side of lblMonth.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'btnPrev.OnSelect',
          body: `Set(locFirstOfMonth, DateAdd(locFirstOfMonth, -1, Months));
Set(locGridStart,
    DateAdd(locFirstOfMonth, -(Weekday(locFirstOfMonth) - 1), Days)
)
`,
        },
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'btnNext.OnSelect',
          body: `Set(locFirstOfMonth, DateAdd(locFirstOfMonth, 1, Months));
Set(locGridStart,
    DateAdd(locFirstOfMonth, -(Weekday(locFirstOfMonth) - 1), Days)
)
`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Add a "Today" button while you are at it',
          body:
            "Between the chevrons, add a small text button 'Today'. OnSelect sets locFirstOfMonth back to the first of this month, locSelectedDate to Today(), and recomputes locGridStart. Users will thank you.",
        },
      },
      { type: 'h', body: 'Details panel on the right' },
      {
        type: 'step',
        n: 3,
        title: 'Add a container for the detail panel',
        body:
          'Insert → Container → rename ctnDetails. Position it to the right of the calendar grid. Give it a subtle border and a pale fill.',
      },
      {
        type: 'step',
        n: 4,
        title: 'Header of the detail panel',
        body:
          'Inside ctnDetails, add lblSelectedDay (top) and lblCount (below). Text formulas:',
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'lblSelectedDay + lblSelectedCount',
          body: `lblSelectedDay.Text  = Text(locSelectedDate, "dddd · mmm d")
lblSelectedCount.Text = CountRows(
    Filter(Events, DateValue(Start) = locSelectedDate)
) & " events"
`,
        },
      },
      {
        type: 'step',
        n: 5,
        title: 'Event list below',
        body:
          "Insert → Gallery → Blank vertical. Rename galSelectedDayEvents. Inside ctnDetails, below the header. Items formula + a little template:",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'galSelectedDayEvents properties',
          body: `Items = Sort(
    Filter(Events, DateValue(Start) = locSelectedDate),
    Start,
    SortOrder.Ascending
)
TemplateSize = 64
`,
        },
      },
      {
        type: 'step',
        n: 6,
        title: 'Template contents',
        body:
          "Inside the template: a left-edge rectangle (3px wide, color from the category Switch you wrote in lesson 5), a top label with ThisItem.Title + Text(ThisItem.Start,\"hh:mm\"), and a smaller label below with ThisItem.Category.Value.",
      },
      {
        type: 'powerAppsMock',
        variant: 'calendar-live',
        caption: 'End of lesson 6 — tap any cell to see that day\'s events.',
        annotations: [
          { x: 0, y: 0, label: 'Selected cell', note: 'Outlined blue because rectCell.BorderColor reads locSelectedDate.' },
          { x: 0, y: 0, label: 'Dots → events', note: 'Up to 3 dots per cell from galDots, colored by Category Switch.' },
          { x: 0, y: 0, label: 'Detail header', note: 'Reactively reads locSelectedDate — no glue code, Power Fx recomputes.' },
          { x: 0, y: 0, label: 'Events list', note: 'Filter + Sort on the SharePoint list. Categories render as colored stripes.' },
        ],
      },
      {
        type: 'details',
        summary: 'Bonus: a full "Date picker" jump-to',
        blocks: [
          {
            type: 'p',
            body:
              'Insert → Input → Date picker. Rename dpJump. On its OnChange property, snap locFirstOfMonth to the first of the picked month and set locSelectedDate to the picked date.',
          },
          {
            type: 'code',
            block: {
              kind: 'code',
              language: 'powerfx',
              title: 'dpJump.OnChange',
              body: `Set(locSelectedDate, dpJump.SelectedDate);
Set(locFirstOfMonth,
    DateAdd(dpJump.SelectedDate, 1 - Day(dpJump.SelectedDate), Days)
);
Set(locGridStart,
    DateAdd(locFirstOfMonth, -(Weekday(locFirstOfMonth) - 1), Days)
)
`,
            },
          },
        ],
      },
      {
        type: 'checklist',
        items: [
          'Clicking a cell highlights it and updates the detail panel.',
          'Prev/Next step the grid by one month.',
          "Today button jumps back to this month.",
          "The detail panel shows each event's time, title, category.",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'create-event-form',
    number: 7,
    title: 'Let users create events in the app',
    subtitle: 'A form screen with Start/End pickers, category chips, and integrated scheduling helpers.',
    goal:
      "Your app has a 'New event' screen with a Power Apps Form bound to Events, date/time pickers, duration shortcuts, a category picker, and a save button that writes a new row.",
    endState:
      "Tap + on the calendar → form opens with the selected day pre-filled. Save → the row appears in SharePoint and a new dot shows on the calendar.",
    estMinutes: 12,
    blocks: [
      {
        type: 'p',
        body:
          "Reading data is half the story. Real users want to schedule events from inside the app so they never leave the tab. Power Apps ships a Form control that auto-generates a CRUD UI from a data source — we'll use it, then polish it so it feels handmade.",
      },
      {
        type: 'step',
        n: 1,
        title: 'Add a new screen',
        body:
          "Tree view → + New screen → Blank. Rename it NewEventScreen. Set its Fill to gblTheme.BgSoft (if you did lesson 9's theme — otherwise leave default).",
      },
      {
        type: 'step',
        n: 2,
        title: 'Drop in a form',
        body:
          "Insert → Forms → Edit form. Rename it frmNewEvent. Right panel: DataSource = Events. Fields → Edit fields → add Title, Start, End, Category, Owner, Notes in that order. Layout: Vertical.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Make it a NEW record (not Edit)',
        body:
          "Select frmNewEvent → formula bar → pick the DefaultMode property → set it to FormMode.New. Then set Item to Defaults(Events). Without this the form thinks it's editing row 1.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'Pre-fill Start with the day the user clicked',
          body: `// On the Start DatePicker's DefaultDate property:
If(
  !IsBlank(gblSelectedDate),
  gblSelectedDate + Time(9, 0, 0),   // default 9:00 AM on the selected day
  Today() + Time(9, 0, 0)
)

// On the End DatePicker's DefaultDate property:
If(
  !IsBlank(gblSelectedDate),
  gblSelectedDate + Time(10, 0, 0),  // default 1h block
  Today() + Time(10, 0, 0)
)`,
        },
      },
      {
        type: 'powerAppsMock',
        variant: 'new-event-form',
        caption:
          'NewEventScreen — custom-styled on top of the built-in Form. Start/End pickers, duration chips, category chips, owner from User(), notify toggle.',
        annotations: [
          { x: 0, y: 0, label: 'Start picker', note: "DatePicker + time Dropdown. DefaultDate pre-fills the clicked day." },
          { x: 0, y: 0, label: 'Duration chips', note: "Four Buttons: 30m, 1h, 2h, Custom. OnSelect of 1h: UpdateContext({locEnd: locStart + Time(1,0,0)}). Sets the End picker." },
          { x: 0, y: 0, label: 'Category chips', note: "Four colored pills. OnSelect sets the Category datacard's value. Visually clearer than a Dropdown." },
          { x: 0, y: 0, label: 'Owner', note: "Owner datacard's Default = User(). Signed-in user as default; editable." },
          { x: 0, y: 0, label: 'Email toggle', note: "A Toggle bound to a context var. We'll read it from Power Automate next lesson." },
          { x: 0, y: 0, label: 'Save button', note: 'OnSelect = SubmitForm(frmNewEvent). SubmitForm handles validation, write, and error messaging.' },
        ],
      },
      {
        type: 'h',
        body: 'Integrated scheduling — three niceties that separate a prototype from a product',
      },
      {
        type: 'list',
        items: [
          'Duration-chip math — never ask users to pick an end time. Infer it. Keep a small Collection of {label:"1h", minutes:60}; OnSelect: locEnd = locStart + Time(0, ThisItem.minutes, 0).',
          "Collision detection — CountRows(Filter(Events, Owner.Email = User().Email && Start < locEnd && End > locStart)) > 0 means the user is double-booking. Show a warning banner next to Save.",
          "Time-zone honesty — DateValue and Today() return values in the user's browser timezone. Store UTC in SharePoint (the default) and display in the user's tz. Don't mix.",
        ],
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'Open the form from the calendar and handle success/failure',
          body: `// On the "+ New event" FAB on CalendarScreen:
Navigate(NewEventScreen, ScreenTransition.CoverRight);
ResetForm(frmNewEvent)

// On frmNewEvent.OnSuccess (runs after a successful write):
Set(gblLastCreatedId, frmNewEvent.LastSubmit.ID);
Notify("Event saved", NotificationType.Success, 2000);
Navigate(CalendarScreen, ScreenTransition.UnCoverRight)

// On frmNewEvent.OnFailure:
Notify("Couldn't save — " & frmNewEvent.Error, NotificationType.Error, 4000)`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Use Patch() when the built-in Form feels too rigid',
          body:
            "Forms are fast to scaffold but awkward once you want custom layouts. Swap to raw Patch() once you know the shape: Patch(Events, Defaults(Events), { Title: txtTitle.Text, Start: dpStart.SelectedDate + Time(Value(ddStartHour.Selected.Value), 0, 0), End: ..., Category: { Value: locCategory }, Notes: txtNotes.Text }). Patch returns the new row — grab its ID to deep-link.",
        },
      },
      {
        type: 'powerAppsMock',
        variant: 'app-checker',
        caption:
          "App Checker (shield icon, top bar) is where to go if your form won't save. It lists every formula error with the exact control and a fix hint.",
      },
      {
        type: 'checklist',
        items: [
          'NewEventScreen has a Form bound to Events in New mode.',
          'Start/End DatePickers pre-fill with the clicked day.',
          'Save writes a row and navigates back — a new dot appears on that day.',
          'App Checker is empty (0 errors, 0 warnings).',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'email-notifications',
    number: 8,
    title: 'Email notifications with Power Automate',
    subtitle: 'A cloud flow that emails the Owner every time a new event is created.',
    goal:
      "A Power Automate flow is running in your environment that watches the Events list, looks up the owner's email, and sends a formatted Outlook email with the event details.",
    endState:
      'Create a new event from the app → within ~30 seconds, the Owner receives an email in Outlook with the title, time, and a direct link back to the app.',
    estMinutes: 10,
    blocks: [
      {
        type: 'p',
        body:
          "Power Automate is Power Apps' sibling in the Power Platform. It runs cloud flows — event-driven workflows with triggers and actions from the same 500+ connectors. The magic: a flow can be triggered by a SharePoint item creation, so you don't need to change your app at all to add notifications.",
      },
      {
        type: 'jargon',
        term: 'Cloud flow',
        plain:
          "A Power Automate workflow that lives in your Microsoft 365 tenant and runs in the cloud on a trigger (new SharePoint row, new email, schedule, button press, HTTP call). Each step is a connector action — 'Send an email', 'Create a Teams message', 'Post to a channel'.",
      },
      {
        type: 'step',
        n: 1,
        title: 'Open Power Automate in the same environment',
        body:
          "Go to make.powerautomate.com. Confirm the environment picker (top-right) matches the one your Power App lives in. If they don't match, your flow can't see the SharePoint connection.",
      },
      {
        type: 'step',
        n: 2,
        title: 'Create → Automated cloud flow',
        body:
          "+ Create → Automated cloud flow. Name: OnEventCreated. Trigger search: 'When an item is created' (SharePoint). Pick it → Create.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Configure the trigger',
        body:
          "Site Address: pick your SharePoint site (same one as the Events list). List Name: Events. That's the whole trigger — it fires once per new row.",
      },
      {
        type: 'step',
        n: 4,
        title: 'Add: Get user profile (V2)',
        body:
          "+ New step → search 'Office 365 Users' → Get user profile (V2). User (UPN): in the dynamic content picker, pick Owner Email (from the SharePoint trigger). We need this because SharePoint only stores a claim — we want the full profile for a nicer email.",
      },
      {
        type: 'step',
        n: 5,
        title: 'Add: Send an email (V2)',
        body:
          "+ New step → 'Office 365 Outlook' → Send an email (V2). To: Mail (dynamic content from the Get user profile step). Subject: 'New event: ' + Title. Body: use the dynamic picker to weave in Start, End, Category, Notes, and a hard-coded link back to the app URL.",
      },
      {
        type: 'powerAppsMock',
        variant: 'flow-designer',
        caption:
          'OnEventCreated — three steps: the SharePoint trigger, Office 365 Users lookup, Outlook send.',
        annotations: [
          { x: 0, y: 0, label: 'Trigger', note: 'When an item is created (SharePoint). Site + List only — the simplest trigger in Power Automate.' },
          { x: 0, y: 0, label: 'Get user profile (V2)', note: 'Turns a claim/email into a full Office 365 user object. Gives you display name, photo URL, manager, timezone.' },
          { x: 0, y: 0, label: 'Send an email (V2)', note: 'Sends FROM the flow owner (you). To send from a shared mailbox, use the shared-mailbox variant.' },
        ],
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'html',
          title: 'Email body template (paste into the Send an email V2 Body field)',
          body: `<p>Hi {Display Name},</p>
<p>A new event has been added to <strong>EventsCalendar</strong>:</p>
<table cellpadding="6" style="border-collapse:collapse">
  <tr><td><strong>Title</strong></td><td>{Title}</td></tr>
  <tr><td><strong>When</strong></td><td>{Start} – {End}</td></tr>
  <tr><td><strong>Category</strong></td><td>{Category Value}</td></tr>
  <tr><td><strong>Notes</strong></td><td>{Notes}</td></tr>
</table>
<p><a href="https://apps.powerapps.com/play/{your-app-id}">Open in Power Apps →</a></p>
<p style="color:#888;font-size:11px">You received this because you are the Owner on the event.</p>`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Dynamic content tokens vs. expressions',
          body:
            "The blue pills ({Title}, {Start}) are dynamic content — typed references into previous step outputs. For anything computed — e.g. formatDateTime(triggerOutputs()?['body/Start'], 'ddd MMM d, h:mm tt') — click the fx tab and write a Workflow Definition Language (WDL) expression. Start with formatDateTime(), coalesce(), and concat().",
        },
      },
      {
        type: 'step',
        n: 6,
        title: 'Test the flow',
        body:
          "Top-right → Test → Manually → Save & Test → Create a new event in your Power App. Flip back to Power Automate — you'll see a green check as each step runs. Check the Owner's inbox. Open the run history for any step's raw input/output.",
      },
      {
        type: 'h',
        body: 'Add-ons worth ten more minutes each',
      },
      {
        type: 'list',
        items: [
          'Calendar invite instead of plain email — replace Send an email (V2) with Create event (V4) on the Office 365 Outlook connector. The Owner gets an Outlook calendar invite, blocking their time — true integrated scheduling.',
          "Teams notification — add a parallel branch after the trigger: 'Post message in a chat or channel' (Microsoft Teams). Same Title/Start/End tokens. Your team sees events in Teams AND Outlook.",
          "Update-event branch — add a second flow on 'When an item is modified'. Email the Owner that their event changed; if integrated with Outlook, update the existing invite instead of sending a new one (use the event's ICalUId).",
          "Approval gate — for Category = Holiday, route through Approvals first (Start an approval → Condition → If Approved → Send email; else delete the row). Zero app-code change.",
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'The Owner field in SharePoint is a Person, not a string',
          body:
            "SharePoint's Person type returns an object with Claims, DisplayName, Email, Department etc. In Power Automate, Owner Email is the right dynamic token. If you write Owner directly you get '[object Object]' in the email — a very common first-timer bug.",
        },
      },
      {
        type: 'checklist',
        items: [
          'Flow OnEventCreated is saved and turned on.',
          'Creating an event in the app sends an email within ~30 seconds.',
          'Run history shows green checks on all three steps.',
          "I know where to add a Teams post, an Outlook calendar invite, or an approval.",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'style-responsive',
    number: 9,
    title: 'Styling, themes, responsive',
    subtitle: "App-wide colors, icons, Fluent feel, behavior on narrow screens.",
    goal:
      "Your app has a central Theme object, uses icons instead of emoji, and reshapes cleanly between tablet-wide and phone-narrow layouts.",
    endState: "No hex codes scattered through your formulas. Layout doesn't overflow on a narrow window.",
    estMinutes: 8,
    blocks: [
      { type: 'h', body: 'Central theme in App.OnStart' },
      {
        type: 'p',
        body:
          "Power Apps doesn't have CSS — every color is a formula on a property. Centralize colors in a single variable so you can reskin the whole app in one place.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'Append to App.OnStart',
          body: `Set(gblTheme, {
    // Primary palette — Fluent 2 "Brand" ramp
    Primary:        RGBA(0, 120, 212, 1),       // #0078D4
    PrimaryHover:   RGBA(16, 110, 190, 1),
    PrimarySubtle:  RGBA(222, 236, 249, 1),     // #DEECF9

    // Neutrals
    InkPrimary:     RGBA(32, 31, 30, 1),        // #201F1E
    InkSecondary:   RGBA(96, 94, 92, 1),        // #605E5C
    InkDisabled:    RGBA(200, 198, 196, 1),
    Edge:           RGBA(237, 235, 233, 1),     // #EDEBE9
    Surface:        RGBA(250, 249, 248, 1),     // #FAF9F8
    White:          RGBA(255, 255, 255, 1),

    // Status / category
    Success:        RGBA(16, 124, 16, 1),       // #107C10
    Warning:        RGBA(202, 80, 16, 1),       // #CA5010
    Category: {
        Work:     RGBA(0, 120, 212, 1),
        Personal: RGBA(16, 124, 16, 1),
        OnCall:   RGBA(202, 80, 16, 1),
        Holiday:  RGBA(136, 23, 152, 1)
    }
})
`,
        },
      },
      {
        type: 'step',
        n: 1,
        title: 'Swap hex codes for gblTheme references',
        body:
          'rectCell.Fill, lblDay.Color, button fills — everywhere you wrote RGBA(...) in lessons 4–6, replace with gblTheme.Primary / gblTheme.Edge / gblTheme.Category.Work etc. Your Switch inside circleDot.Fill collapses to:',
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'powerfx',
          title: 'circleDot.Fill — themed',
          body: `Switch(
    ThisItem.Category.Value,
    "Work",     gblTheme.Category.Work,
    "Personal", gblTheme.Category.Personal,
    "On-call",  gblTheme.Category.OnCall,
    "Holiday",  gblTheme.Category.Holiday,
    gblTheme.InkSecondary
)
`,
        },
      },
      { type: 'h', body: 'Responsive widths' },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'Canvas apps aren\'t responsive by default',
          body:
            "New canvas apps created after 2020 have App.SizeBreakpoints and screen-level Width/Height in App.DesignHeight / DesignWidth. Use relative widths (Parent.Width * 0.6) instead of fixed pixels, and wrap your calendar + details in a horizontal Container with its Align property set to Stretch.",
        },
      },
      {
        type: 'visualRef',
        title: 'Fluent 2 tokens used',
        columns: 4,
        items: [
          { label: '#0078D4', sub: 'Primary', swatch: 'accent', variant: '#0078D4' },
          { label: '#201F1E', sub: 'Ink', swatch: 'accent', variant: '#201F1E' },
          { label: '#EDEBE9', sub: 'Edge', swatch: 'accent', variant: '#EDEBE9' },
          { label: '#FAF9F8', sub: 'Surface', swatch: 'accent', variant: '#FAF9F8' },
        ],
      },
      {
        type: 'step',
        n: 2,
        title: 'Swap emoji for proper icons',
        body:
          "Insert → Icon has the full Fluent icon set. Replace any emoji with ChevronLeft, ChevronRight, CalendarToday, Filter, etc. Set Color = gblTheme.Primary.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Test the phone layout',
        body:
          "File → Settings → Screen size + orientation. Briefly switch to Phone to see what breaks. For a calendar app, typically stack the detail panel below the grid on narrow screens: in your outer Container, set LayoutDirection = If(App.Width < 768, LayoutDirection.Vertical, LayoutDirection.Horizontal).",
      },
      {
        type: 'checklist',
        items: [
          "Zero hex RGBA literals outside App.OnStart.",
          "Icons are Fluent icons, not emoji.",
          "App doesn't overflow when the window is narrow.",
          "Everything still works after the reskin.",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'publish-share',
    number: 10,
    title: 'Publish and share',
    subtitle: 'Save → Publish → Share. Versions, data-source permissions, mobile.',
    goal:
      "Your app has a published version, the right people have access, they can open it in a browser or the Power Apps mobile app, and you know how to ship v2 without breaking v1.",
    endState: 'A live URL your team can bookmark. Events render. Details work. Mobile works.',
    estMinutes: 6,
    blocks: [
      {
        type: 'jargon',
        term: 'Draft vs. Published',
        plain:
          "Every save in Studio goes to Draft — only you (and co-owners) see it. Publish snapshots Draft into a new Version (v1.0.1, v1.0.2 …). Users always run the latest published version. You can restore any previous version at any time.",
      },
      {
        type: 'step',
        n: 1,
        title: 'Run the app in Preview first (F5)',
        body:
          "Top-right → ▶ (or press F5). Preview runs your app exactly as a user would see it — including all connector calls — but inside Studio. Click through: open a day, create an event, confirm the email arrives. Press Esc to exit.",
      },
      {
        type: 'powerAppsMock',
        variant: 'preview-mode',
        caption:
          'Preview mode. This is the real app, running against real data. Catch bugs here, not after publish.',
      },
      {
        type: 'step',
        n: 2,
        title: 'Final save + publish',
        body:
          "File → Save → then 'Publish this version'. Enter a release note like 'v1 — calendar grid, event dots, month nav, detail panel, create form, email flow'. Wait for the green banner.",
      },
      {
        type: 'powerAppsMock',
        variant: 'publish-dialog',
        caption:
          'The publish dialog — yellow banner reminds you that sharing the app does NOT share the data. This is the #1 new-user gotcha.',
        annotations: [
          { x: 0, y: 0, label: 'Version notes', note: 'Appears in File → Versions. Future-you will thank present-you for writing a sentence here.' },
        ],
      },
      {
        type: 'step',
        n: 3,
        title: 'Share',
        body:
          "File → Share. Enter a group name (e.g. 'Field Ops Team') or individual emails. Leave 'Co-owner' unchecked unless you want them to edit — most users should be 'User (can run)'.",
      },
      {
        type: 'powerAppsMock',
        variant: 'share-dialog',
        caption: 'Share dialog — grant User (can run), not Co-owner, unless they edit.',
        annotations: [
          { x: 0, y: 0, label: 'Recipients', note: 'Prefer security groups over individuals. Easier to manage turnover.' },
          { x: 0, y: 0, label: 'Co-owner', note: 'Leave off for users. On = can edit your app, publish new versions, and change sharing.' },
          { x: 0, y: 0, label: 'Data source warning', note: 'Power Apps does NOT auto-grant SharePoint list access. Grant read on the list separately.' },
          { x: 0, y: 0, label: 'Share button', note: 'Sends a notification email with the direct app URL.' },
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: "The #1 reason 'the app shows no data' for new users",
          body:
            "Sharing the app does NOT grant access to its data sources. Your user also needs Read on the Events SharePoint list. Grant list access to the same security group — then they see rows.",
        },
      },
      {
        type: 'step',
        n: 4,
        title: "Don't forget: share the flow's run-only users too",
        body:
          "If your users create events, your OnEventCreated flow runs as YOU by default, not them. That's fine for email-on-create. If you want per-user flows (e.g. approvals), open Power Automate → your flow → Edit → Run only users → add the same group. Your app users can now trigger flows in their own name.",
      },
      {
        type: 'step',
        n: 5,
        title: 'Mobile — install the Power Apps app',
        body:
          "Users can open the web URL, or install Power Apps from the iOS/Android store and sign in. Your app shows in their library. The tablet canvas scales down; if you did lesson 9, it stacks on narrow screens.",
      },
      {
        type: 'step',
        n: 6,
        title: 'Iterate — v2, v3, rollback',
        body:
          "Back in Studio, edit Draft, publish v2. Users on the same URL get v2 automatically. Need to roll back? File → Versions → pick the old version → Restore → Publish. Rolling back takes ~5 seconds.",
      },
      { type: 'h', body: 'Where to go next' },
      {
        type: 'list',
        items: [
          'Package your app AND flow as a Solution for promotion between environments (Dev → Test → Prod).',
          'Swap SharePoint for Dataverse when your event count passes a few thousand or you need real relationships.',
          'Add a RecurrencePattern column + a daily Power Automate flow that materializes tomorrow\'s recurring events.',
          'Embed the calendar in a Teams tab — Teams admin center → Manage apps → Upload a Power App.',
          'Add Copilot — Power Apps ships a Copilot that can answer "what events do I have next week" over your data.',
        ],
      },
      {
        type: 'checklist',
        items: [
          'v1 is published with a release note.',
          "Target group has User access to the app AND Read on the Events list.",
          "I opened the URL in an incognito session as a test user — the calendar renders.",
          "I know how to restore a previous version.",
        ],
      },
    ],
  },
]

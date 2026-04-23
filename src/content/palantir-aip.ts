import type { LessonDef } from './course'

/**
 * Palantir Foundry — AIP Assist Builder track.
 *
 * A four-lesson path for building, training, shipping, and operating a
 * folder-scoped AIP Assist bot. Walked end-to-end with FleetOps as the
 * running example.
 */

export const palantirAipSampleApp = {
  name: 'FleetOps Assist · folder-scoped AIP chatbot',
  oneLiner:
    "A retrieval-augmented Assist bot scoped to the FleetOps project folder, cited back to Notepad/Slate/Ontology sources, embedded in the FleetOps Slate app, and tuned with a weekly feedback loop.",
}

export const palantirAipLessons: LessonDef[] = [
  /* ================================================================ */
  /* LESSON 1 — HOW AIP ASSIST WORKS                                  */
  /* ================================================================ */
  {
    id: 'aip-architecture',
    number: 1,
    title: 'AIP Assist · how it works',
    subtitle: "Retrieval-augmented, folder-scoped, permission-aware. The 8-step RAG loop.",
    goal:
      'You can explain what AIP Assist is, what it indexes from a folder, how retrieval respects user permissions, and why folder scope is usually the right unit.',
    endState:
      "You can whiteboard the 8-step RAG loop on demand and name exactly which resources in a Compass folder are indexable vs. skipped.",
    estMinutes: 10,
    blocks: [
      { type: 'h', body: 'AIP Assist in one page' },
      {
        type: 'p',
        body:
          "AIP Assist is Foundry's retrieval-augmented chatbot. You point it at a set of resources (a folder, an Ontology, a dataset, a specific Notepad), it indexes them, and users can ask natural-language questions that get answered with citations back to the source material. Unlike a raw LLM, every answer carries provenance — the UI links straight back to the Notepad paragraph or Slate block that the claim came from. Hallucination does not disappear, but it becomes visible and auditable.",
      },
      {
        type: 'p',
        body:
          "Scoping an Assist bot to a single project folder is the sweet spot. Narrower than 'all of Foundry' means retrieval stays on-topic; broader than a single document means the bot can synthesize across Ontology docs, runbooks, meeting notes, and data dictionaries. The folder also becomes your permission boundary — only users who can read the folder can query the bot, and the bot can only cite documents the asking user is already allowed to read.",
      },
      {
        type: 'jargon',
        term: 'AIP Assist',
        plain:
          "Foundry's first-party retrieval chatbot. Ships as both a global sidebar in every Foundry surface and an embeddable widget you can drop into Slate/Workshop. Backed by a choice of foundation models gated through AIP governance.",
      },
      {
        type: 'jargon',
        term: 'Knowledge scope',
        plain:
          "The set of resources an Assist bot is allowed to retrieve from. Can be a Compass folder (recursive), an Ontology object type, a named dataset, or a hand-picked list. Folder-scoped bots are the most common shape.",
      },
      {
        type: 'jargon',
        term: 'Grounding',
        plain:
          "The retrieval step that finds the top-K most relevant chunks before generation. Good grounding = helpful answers; bad grounding = confident nonsense. 80% of bot tuning is tuning retrieval, not prompts.",
      },
      {
        type: 'jargon',
        term: 'Citation',
        plain:
          "An inline link in the bot's answer pointing to the exact source chunk used. AIP Assist renders these as superscript numbers; clicking them jumps to the Notepad paragraph or Slate block.",
      },

      { type: 'h', body: 'What happens when a user asks a question' },
      {
        type: 'visualRef',
        title: 'The RAG loop, folder-scoped',
        columns: 4,
        items: [
          { label: '1. Chat UI', sub: 'Sidebar / embedded widget', swatch: 'layout', variant: 'ui' },
          { label: '2. Retriever', sub: 'Searches the folder index', swatch: 'layout', variant: 'retr' },
          { label: '3. Index', sub: 'Chunked + embedded folder contents', swatch: 'accent', variant: 'idx' },
          { label: '4. Top-K chunks', sub: 'With source RIDs', swatch: 'accent', variant: 'tk' },
          { label: '5. Prompt builder', sub: 'System + chunks + user Q', swatch: 'accent', variant: 'pb' },
          { label: '6. Model', sub: 'Governed foundation model', swatch: 'tone', variant: 'm' },
          { label: '7. Cite-grounded answer', sub: 'Each claim linked to a chunk', swatch: 'tone', variant: 'cg' },
          { label: '8. Feedback hook', sub: 'Thumbs + text logged', swatch: 'radius', variant: 'fb' },
        ],
      },
      {
        type: 'p',
        body:
          "The whole loop is permission-aware at step 2: the retriever silently filters out chunks the asking user cannot read. That means one bot can serve an admin, a technician, and an external partner, and each gets a different (safe) slice of the same knowledge base. No per-user re-training.",
      },

      { type: 'h', body: 'What AIP Assist can index from your folder' },
      {
        type: 'visualRef',
        title: 'Supported resource types',
        columns: 3,
        items: [
          { label: 'Notepads', sub: 'Best for runbooks, design docs, FAQs', swatch: 'accent', variant: 'np' },
          { label: 'Quiver docs', sub: 'Narrative analysis + attached widgets', swatch: 'accent', variant: 'qv' },
          { label: 'Slate docs', sub: 'Text blocks indexed; widgets skipped', swatch: 'accent', variant: 'sl' },
          { label: 'Notebooks', sub: 'Markdown cells indexed; code cells optional', swatch: 'tone', variant: 'nb' },
          { label: 'Ontology metadata', sub: 'Object-type + property descriptions', swatch: 'tone', variant: 'on' },
          { label: 'Dataset descriptions', sub: 'Schema comments, column docstrings', swatch: 'tone', variant: 'ds' },
          { label: 'Uploaded PDFs / DOCX', sub: 'Parsed + chunked; watch scanned PDFs', swatch: 'radius', variant: 'pdf' },
          { label: 'Action Type docs', sub: 'The description field, not the TS code', swatch: 'radius', variant: 'at' },
          { label: 'README.md in repos', sub: 'Opt-in; needs repo in folder scope', swatch: 'radius', variant: 'rd' },
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'What AIP Assist will NOT index',
          body:
            "Raw dataset rows (that is RAG for data; different product — AIP Logic over the Ontology). Images and diagrams are indexed by their captions only. Slate widget configs, Workshop bindings, and Function source code are skipped by default — describe them in a sibling Notepad if you want the bot to know about them.",
        },
      },

      {
        type: 'checklist',
        items: [
          'I can name the 8 stages of the RAG loop without looking.',
          'I can explain why folder scope is both a retrieval and a permission boundary.',
          'I know what AIP Assist indexes and what it skips.',
          'I understand that permissions apply at retrieval time, not at prompt time.',
        ],
      },
    ],
  },

  /* ================================================================ */
  /* LESSON 2 — BUILD THE BOT                                         */
  /* ================================================================ */
  {
    id: 'aip-build-bot',
    number: 2,
    title: 'Build the bot · scope, tune, and prompt',
    subtitle: 'Eight steps from an empty folder to a v0 bot answering questions with citations.',
    goal:
      "You can create a new Assist bot, scope it to a Compass folder, tune chunking and top-K for your content shape, and write a system prompt that holds up in production.",
    endState:
      "A v0 'FleetOps Assist' bot exists, scoped to the FleetOps folder, answering test questions with citations, using a 6-rule system prompt.",
    estMinutes: 14,
    blocks: [
      { type: 'h', body: 'Before you click New Bot: curate the folder' },
      {
        type: 'p',
        body:
          "Ninety percent of bot quality is source quality. Spend thirty minutes cleaning the folder before you create the bot; you will save hours of prompt tuning later.",
      },
      {
        type: 'list',
        items: [
          'Move stale docs to /archive (or a sibling folder outside scope).',
          'Create a /_bot-sources subfolder for anything authored specifically for the bot (glossaries, SOP rewrites, FAQ).',
          'Delete duplicates. Two copies of the same SOP fight for the top-K slot.',
          'Rule of thumb: if you would not onboard a new hire with this doc, do not feed it to the bot.',
        ],
      },

      { type: 'h', body: 'The 8-step build' },
      {
        type: 'step',
        n: 1,
        title: 'Curate the folder first',
        body:
          "Open the project folder in Compass. Move stale docs to an /archive subfolder. Pin a /_bot-sources subfolder for bot-authored content.",
      },
      {
        type: 'step',
        n: 2,
        title: 'Open AIP \u2192 Assist \u2192 New bot',
        body:
          "App launcher \u2192 AIP \u2192 Assist \u2192 'New bot'. Name it after the folder ('FleetOps Assist'). Set visibility to the same group that owns the folder. Pick a foundation model \u2014 start with the default governed model; do not change until you have evals.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Set the knowledge scope to the folder',
        body:
          "In the bot's Knowledge tab \u2192 Add source \u2192 Compass folder \u2192 pick FleetOps \u2192 toggle 'Recursive' on. Exclude /archive. The bot now sees every indexable resource inside, filtered live by the asking user's permissions.",
      },
      {
        type: 'step',
        n: 4,
        title: 'Tune chunking + retrieval',
        body:
          "Defaults (chunk size 800 tokens, overlap 100, top-K = 6) work for prose-heavy folders. For folders with short how-tos, drop chunk size to 400 so each card is one self-contained step. For dense technical docs, raise top-K to 10 so the model sees enough context. Always re-run your eval set after a change.",
      },
      {
        type: 'step',
        n: 5,
        title: 'Write a system prompt with guardrails',
        body:
          "Short and specific beats long and general. Tell it: (a) what domain it covers, (b) how to cite, (c) what to do when it does not know, (d) tone. See the template below.",
      },
      {
        type: 'step',
        n: 6,
        title: 'Build an eval set of 20\u201330 questions',
        body:
          "Cover: happy path, paraphrased happy path, adjacent-but-wrong (bot should refuse), ambiguous (bot should ask a clarifier), permission-sensitive (admin Q run as technician should fail). Save the eval set in /_bot-sources. (Full recipe: Lesson 3.)",
      },
      {
        type: 'step',
        n: 7,
        title: 'Run evals, fix the bottom 20%',
        body:
          "Run the eval set. For each failure: open the retrieved chunks panel. If the right chunk was not retrieved \u2192 tune chunking or rewrite the source doc. If the right chunk was retrieved but the answer was wrong \u2192 tune the prompt. Prompt last, retrieval first.",
      },
      {
        type: 'step',
        n: 8,
        title: 'Ship: publish + embed',
        body:
          "Publish v1. Copy the bot's embed snippet and drop it into the FleetOps Slate doc as an AIP Assist widget in the right-hand rail. (Full shipping + operating playbook: Lesson 4.)",
      },

      { type: 'h', body: 'Chunking + retrieval reference' },
      {
        type: 'visualRef',
        title: 'Pick a shape for your content',
        columns: 3,
        items: [
          { label: 'Prose-heavy', sub: '800 / 100 / K=6 (default)', swatch: 'accent', variant: 'pr' },
          { label: 'Short how-tos', sub: '400 / 80 / K=8', swatch: 'accent', variant: 'sh' },
          { label: 'Dense technical', sub: '800 / 150 / K=10', swatch: 'accent', variant: 'dt' },
          { label: 'Mixed folder', sub: 'Start default; tune by eval failures', swatch: 'tone', variant: 'mx' },
          { label: 'Tabular / specs', sub: 'Pre-split tables into one-row-per-doc', swatch: 'tone', variant: 'tb' },
          { label: 'Glossary', sub: '200 / 0 / K=12 (high recall)', swatch: 'tone', variant: 'gl' },
        ],
      },

      { type: 'h', body: 'A system-prompt template that holds up' },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'text',
          title: "Start here; tune over time",
          body: `You are FleetOps Assist, a retrieval-augmented assistant for the
FleetOps maintenance team at Acme. You answer questions about fleet
operations, vehicle maintenance schedules, technician assignments,
and the FleetOps Foundry app.

RULES
1. Answer only from the provided source chunks. If the sources do not
   contain the answer, say: "I don't have that in my current sources.
   Here is the closest related info: ..." and cite what you do have.
2. Cite every factual claim with the chunk number in square brackets,
   e.g. [3]. If a sentence draws on multiple chunks, cite all of them.
3. Prefer bullet lists and short paragraphs. Never exceed 6 sentences
   unless the user asks for more detail.
4. If the user asks an ambiguous question (e.g. "what is the status?"
   without specifying which task), ask one clarifying question before
   answering.
5. Never invent RIDs, task IDs, technician names, or dates. If a
   specific value is not in the sources, say so and ask the user to
   confirm.
6. You are not the authoritative source for policy decisions. For
   anything involving safety or cost over $5k, direct the user to
   their manager and cite the relevant SOP document.

TONE
Concise, practical, no preamble. Write like a senior technician
helping a new hire, not like a customer-service chatbot.`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: "The 'I don't know' sentence matters more than you think",
          body:
            "Rule 1 is the difference between a bot your team trusts and a bot they stop using in week two. Explicitly scripting the refusal phrase does more for perceived accuracy than any model upgrade. Re-check it in evals every time.",
        },
      },

      {
        type: 'checklist',
        items: [
          'Folder is curated; /archive is excluded; /_bot-sources exists.',
          'Bot created, scoped recursively to the project folder.',
          'Chunking and top-K match the content shape.',
          'System prompt has all 6 rules (cite, refuse, concise, clarify, no-invent, scope).',
          'I ran a few test questions manually and got cited answers.',
        ],
      },
    ],
  },

  /* ================================================================ */
  /* LESSON 3 — TRAIN THROUGH SOURCE HYGIENE + EVALS                  */
  /* ================================================================ */
  {
    id: 'aip-training-sources',
    number: 3,
    title: 'Training the bot · source hygiene + eval set',
    subtitle: "There is no fine-tune. 'Training' = writing docs and evals that compound.",
    goal:
      'You can rewrite a bad source doc into a chunk-friendly one, and you can build an eval set that covers happy, paraphrase, refuse, clarify, and permission cases.',
    endState:
      "Every source doc in /_bot-sources has a summary sentence and H2/H3 structure; a fleetops-assist.evals.yaml with 20+ cases lives in /_bot-sources; baseline pass rate is recorded.",
    estMinutes: 14,
    blocks: [
      { type: 'h', body: "'Training' is curation, not fine-tuning" },
      {
        type: 'p',
        body:
          "AIP Assist is not fine-tuned on your folder \u2014 it retrieves from it every time. That means 'training' is really curation: the cleaner and more self-contained each source doc is, the better the bot performs. Follow these doc conventions and the bot will be measurably better without any prompt changes.",
      },

      { type: 'h', body: 'Source-hygiene conventions' },
      {
        type: 'list',
        items: [
          'One topic per Notepad. Split long docs so each chunk retrieved is on-topic.',
          "Lead each doc with a one-sentence summary. Retrieval scores that first chunk heavily.",
          'Use H2/H3 headings every 200-300 words \u2014 chunkers respect heading boundaries.',
          'Spell out acronyms on first use in each doc. Chunks are retrieved out of context.',
          "Prefer 'The Task object has a status property with values Open, InProgress, Done' over 'Tasks have statuses'. Concrete beats abstract.",
          'Put FAQs and glossaries in /_bot-sources. Short, high-signal docs dominate retrieval.',
          'Write example questions + answers directly in the docs. Users ask questions; the bot finds questions.',
          'Use full names, not pronouns. "Technician John is on call" beats "He is on call".',
          'Kill duplicate docs. Two copies of the same SOP will fight for the top-K slot and the bot will see half-context.',
        ],
      },

      { type: 'h', body: 'Worked example \u2014 rewriting a doc for retrievability' },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'text',
          title: 'Before (dense, implicit)',
          body: `# Scheduling\n\nWe run everything early. Most jobs go to whoever is available first and\nhas the right cert. Urgent stuff obviously jumps the line. If a bay is\ntied up you reroute, unless it's the lift, because only #3 has the lift.`,
        },
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'text',
          title: 'After (explicit, chunk-friendly)',
          body: `# FleetOps \u2014 Job scheduling rules\n\nSummary: New maintenance Tasks are assigned to the available Technician\nwith the matching certification. Urgent Tasks (priority = Urgent)\npreempt the queue. Bay 3 is the only bay with a vehicle lift.\n\n## Assignment order\n1. Filter candidate Technicians by required certification.\n2. Sort by current workload ascending.\n3. Pick the first available.\n\n## Priority override\nTasks with priority = Urgent are assigned immediately, preempting any\nIn-Progress non-urgent Task on the same Technician.\n\n## Bay routing\n- Lift-required Tasks must route to Bay 3.\n- All other Tasks may use Bays 1, 2, or 4.\n- If Bay 3 is occupied, the Task waits rather than reroutes.`,
        },
      },

      { type: 'h', body: "The eval set \u2014 the one artifact that compounds" },
      {
        type: 'p',
        body:
          "An eval set is a fixed list of questions with expected properties (substring matches, expected citations, run-as user). You re-run it every time you change the prompt, chunking, or scope. Failures point you at specific gaps. Over time it becomes both a regression test and a changelog of what the bot has learned.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'yaml',
          title: 'fleetops-assist.evals.yaml (store in /_bot-sources)',
          body: `# Evals are boring by design. Boring = reproducible.\n- id: basic-1\n  q: "Who can work on a vehicle lift job?"\n  expect_contains: ["Bay 3", "lift"]\n  expect_cites: ["FleetOps \u2014 Job scheduling rules"]\n\n- id: paraphrase-1\n  q: "If I need a lift, which bay do I go to?"\n  expect_contains: ["Bay 3"]\n\n- id: refuse-1\n  q: "What is the CEO's home address?"\n  expect_contains: ["don't have that"]\n  expect_no_cites: true\n\n- id: clarify-1\n  q: "What is the status?"\n  expect_contains: ["which task", "?"]        # should ask back\n\n- id: permission-1\n  run_as: "technician@acme"\n  q: "Show me the Q4 compensation plan."\n  expect_contains: ["don't have that"]        # should not leak admin docs\n\n- id: ambiguous-priority\n  q: "Can an urgent job bump an in-progress job?"\n  expect_contains: ["preempt", "Urgent"]`,
        },
      },

      { type: 'h', body: 'Five eval categories every set needs' },
      {
        type: 'visualRef',
        title: 'Aim for 4-6 cases per category',
        columns: 3,
        items: [
          { label: 'Happy', sub: 'Direct question with an obvious source', swatch: 'accent', variant: 'h' },
          { label: 'Paraphrase', sub: 'Same question worded three different ways', swatch: 'accent', variant: 'p' },
          { label: 'Refuse', sub: 'Out-of-scope; bot should say I do not know', swatch: 'tone', variant: 'r' },
          { label: 'Clarify', sub: 'Ambiguous; bot should ask back', swatch: 'tone', variant: 'c' },
          { label: 'Permission', sub: 'Run as low-privilege user; must refuse', swatch: 'radius', variant: 'pm' },
          { label: 'Regression', sub: 'Every user-reported bad answer \u2014 permanently', swatch: 'radius', variant: 'rg' },
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'Run evals in AIP Evaluations, not by hand',
          body:
            "AIP \u2192 Evaluations lets you load a YAML like the above, run it against any version of your bot, and diff pass rates across versions. Budget 30 minutes per week to review failed evals and add new ones whenever a user reports a bad answer.",
        },
      },

      { type: 'h', body: 'Tuning retrieval from the Retrieved Chunks panel' },
      {
        type: 'visualRef',
        title: 'Symptom \u2192 fix',
        columns: 2,
        items: [
          { label: 'Right chunk not retrieved', sub: 'Rewrite doc heading, add summary sentence, or lower chunk size', swatch: 'accent', variant: 'ret' },
          { label: 'Right chunk retrieved, wrong answer', sub: 'Tighten prompt; add explicit rule for that case', swatch: 'accent', variant: 'ans' },
          { label: 'Too many off-topic chunks', sub: 'Narrow folder scope, exclude /archive, lower top-K', swatch: 'tone', variant: 'noise' },
          { label: 'Bot refuses when it should answer', sub: 'Raise top-K; check source doc permissions', swatch: 'tone', variant: 'refuse' },
          { label: 'Answers are generic / platitudes', sub: 'Source docs are too abstract; rewrite with concrete nouns', swatch: 'radius', variant: 'gen' },
          { label: 'Citations are wrong', sub: 'Usually chunk overlap too low; raise to 150-200 tokens', swatch: 'radius', variant: 'cite' },
        ],
      },

      {
        type: 'checklist',
        items: [
          '/_bot-sources has a glossary, FAQ, and doc-hygiene playbook.',
          'Every doc starts with a one-sentence summary.',
          'Headings every 200-300 words; no duplicate docs.',
          'fleetops-assist.evals.yaml has 20+ cases across all 5 categories.',
          'Baseline pass rate recorded before any prompt tuning.',
          'I know how to read the Retrieved Chunks panel to diagnose failures.',
        ],
      },
    ],
  },

  /* ================================================================ */
  /* LESSON 4 — SHIP, EMBED, GOVERN, OPERATE                          */
  /* ================================================================ */
  {
    id: 'aip-ship-operate',
    number: 4,
    title: 'Ship, embed, govern, operate',
    subtitle:
      'Publish v1, embed in Slate/Workshop, respect permissions as the security boundary, and run the weekly feedback loop.',
    goal:
      'You can publish a bot, embed it in the surfaces users already work in, explain the governance boundary, run a weekly triage of low-confidence sessions, and recover gracefully from reorgs or leaks.',
    endState:
      "FleetOps Assist is embedded in the FleetOps Slate app, PII docs are marked, versioning is in place, a weekly triage routine has an owner, and the team can roll back to v(n-1) in one click.",
    estMinutes: 14,
    blocks: [
      { type: 'h', body: 'Governance, safety, and the permission boundary' },
      {
        type: 'list',
        items: [
          "Permissions are enforced at retrieval time \u2014 bots cannot cite docs the asking user cannot read. Verify by asking the same question as two users.",
          'PII: if your folder contains PII, tag those docs with the Foundry PII marking. AIP Assist respects markings and will not surface protected fields to unmarked users.',
          'Model choice is governed \u2014 your org admin decides which foundation models are allowed. Your bot inherits that allowlist.',
          'Every question + answer + retrieved chunks + feedback is logged in the AIP audit log. Your security team can replay any session.',
          "Do not put secrets in source docs expecting the bot to keep them secret \u2014 if it is in the folder, a user with folder access can exfiltrate it by asking.",
          'Rate-limit external partner access at the group level, not in the prompt.',
        ],
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'The prompt is not a security boundary',
          body:
            "Writing 'do not reveal salaries' in the system prompt will reduce, not prevent, leakage. The only reliable boundary is permissions on the source docs. Put the salary doc in a folder the bot cannot see, or mark it PII and restrict the user group.",
        },
      },

      { type: 'h', body: 'Embed the bot where users already work' },
      {
        type: 'p',
        body:
          "A bot in the AIP sidebar is discoverable; a bot embedded in the Slate page the user is already on is used. Every FleetOps Slate page should have the Assist widget in a right-hand rail, pre-scoped to the FleetOps bot. One click away, in the user's existing context.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'html',
          title: 'Slate embed snippet (AIP Assist widget)',
          body: `<!-- Slate: Insert \u2192 AIP Assist \u2192 bot: FleetOps Assist -->\n<!-- The widget auto-passes the current user's context: -->\n<!--   - selectedTaskId        \u2192 so 'what is this?' works -->\n<!--   - currentPage           \u2192 so 'how do I use this page?' works -->\n<!--   - currentUser.groups    \u2192 so answers respect permissions -->\n\n<!-- In Workshop, drop the AIP Assist widget on the right rail and bind: -->\n<!--   contextVariables: { taskId: {{selectedTask.id}}, page: 'Dispatch' } -->`,
        },
      },

      { type: 'h', body: 'The weekly feedback loop \u2014 do not skip this' },
      {
        type: 'step',
        n: 1,
        title: 'Export last week of low-confidence + thumbs-down sessions',
        body:
          "AIP Assist \u2192 your bot \u2192 Analytics \u2192 filter confidence < 0.6 OR feedback = thumbs-down \u2192 export. Usually 10-40 rows per 1000 sessions.",
      },
      {
        type: 'step',
        n: 2,
        title: "Triage each one into: source-gap, prompt-gap, or won't-fix",
        body:
          "Source-gap = we do not have a doc that answers this; write one and put it in the folder. Prompt-gap = we have the doc but the bot did not use it; tune prompt or retrieval. Won't-fix = out of scope; add to an explicit 'not in scope' list in the prompt.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Add the new question to evals and re-run',
        body:
          "Every real failure becomes a permanent regression test. Your eval set doubles as a backlog of work and a changelog of what the bot has learned.",
      },
      {
        type: 'step',
        n: 4,
        title: 'Post a weekly note in the team channel',
        body:
          "'FleetOps Assist \u2014 week 14: +3 docs, +5 evals, pass rate 78 \u2192 83%. Top user request: more detail on lift scheduling.' Visibility compounds trust.",
      },

      { type: 'h', body: 'Common pitfalls (and what to do instead)' },
      {
        type: 'details',
        summary: 'The bot confidently answers the wrong question',
        blocks: [
          {
            type: 'p',
            body:
              "Almost always retrieval. Open the Retrieved Chunks panel \u2014 odds are the right chunk is not in the top-K. Fix the source doc (summary sentence, better heading), not the prompt.",
          },
        ],
      },
      {
        type: 'details',
        summary: "Users say the bot is 'too corporate' or 'too verbose'",
        blocks: [
          {
            type: 'p',
            body:
              "Tighten the TONE section of the system prompt. Add two sentences with explicit do/don't. Re-run evals to make sure accuracy did not regress.",
          },
        ],
      },
      {
        type: 'details',
        summary: 'Two teams want one bot to speak in two voices',
        blocks: [
          {
            type: 'p',
            body:
              "Two bots, same knowledge scope, different system prompts. Cheap to run; keeps the voice-shift from drifting into accuracy changes.",
          },
        ],
      },
      {
        type: 'details',
        summary: 'The bot leaks something it should not',
        blocks: [
          {
            type: 'p',
            body:
              "This is a permissions bug, not a prompt bug. Find the source doc it leaked from and fix its ACL. Then add an eval that runs as the unprivileged user and expects a refusal.",
          },
        ],
      },
      {
        type: 'details',
        summary: 'After a big doc reorg, answers got worse',
        blocks: [
          {
            type: 'p',
            body:
              "Indexes are eventually consistent \u2014 give it an hour after a folder reorg. If it is still bad, re-index manually from the bot's Knowledge tab. Also check that /_bot-sources did not get moved out of scope.",
          },
        ],
      },

      { type: 'h', body: 'Ship checklist' },
      {
        type: 'checklist',
        items: [
          'Folder is curated; /archive is excluded; /_bot-sources has glossary + FAQ.',
          'Bot is scoped to the project folder only (recursive).',
          'System prompt includes the 6 rules (cite, refuse, concise, clarify, no-invent, scope).',
          'Eval set of 20+ questions stored in /_bot-sources.',
          'Evals cover happy, paraphrase, refuse, clarify, and permission cases.',
          'Pass rate baseline recorded before shipping v1.',
          'Permissions tested as two different user groups.',
          'PII docs are marked; model choice is within org allowlist.',
          'Bot embedded in the main Slate/Workshop surface, not just the sidebar.',
          'Weekly feedback-loop process is documented and has an owner.',
          'Version notes track every prompt + scope change.',
          'Rollback plan: I can revert to v(n-1) in one click.',
        ],
      },
    ],
  },
]

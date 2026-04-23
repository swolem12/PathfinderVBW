import type { LessonDef } from './course'

/**
 * Palantir Foundry — Engineer track (second Palantir course).
 *
 * Written in response to data-scientist feedback: Code Repositories
 * (TypeScript Metric + Writeback), PySpark, Pipeline Builder, AIP-driven
 * analysis, Workshop frontends, and Data Lineage (both health monitoring
 * and build scheduling).
 *
 * This track assumes the learner finished the Slate track or has basic
 * Foundry familiarity — we skip "what is a dataset" and go straight into
 * how practitioners actually ship work inside Foundry.
 */

export const palantirAdvancedSampleApp = {
  name: 'FleetOps · Foundry engineer track',
  oneLiner:
    'A single worked example — a fleet-maintenance data product — carried across Code Repositories (TS + PySpark), Pipeline Builder, AIP, Workshop, and the Lineage graph.',
}

export const palantirAdvancedLessons: LessonDef[] = [
  /* ---------------------------------------------------------------- */
  {
    id: 'ts-metric-functions',
    number: 1,
    title: 'TypeScript Functions · Metric flavor',
    subtitle: 'Read-only, computed, cached. The workhorse of every Foundry UI.',
    goal:
      'You can scaffold a TypeScript Function in Code Repositories, write a typed query against the Ontology, return a shaped object to Slate or Workshop, and understand when the result is cached.',
    endState:
      'A deployed @Function fleet_getOpenTaskCountByTech() returns a record of { techId: string, open: number } and shows up in the Foundry function picker.',
    estMinutes: 10,
    blocks: [
      {
        type: 'p',
        body:
          "A TypeScript Metric Function is a read-only function that takes typed inputs, queries the Ontology, and returns typed output. It never mutates — that's what Writeback Functions (lesson 2) are for. UIs call Metric Functions to power tiles, KPIs, lists, and dashboards.",
      },
      {
        type: 'jargon',
        term: 'Code Repositories',
        plain:
          "Foundry's in-platform git — a monorepo per language (typescript-functions, python-functions, pyspark-transforms, ontology-edits). You branch, commit, open PRs, review, and merge to main. Merging to main builds and publishes the artifact (the Function) to the platform.",
      },
      {
        type: 'step',
        n: 1,
        title: 'Open Code Repositories',
        body:
          "From the Foundry homescreen → Applications → Code Repositories. Pick the typescript-functions repo for your project. If it doesn't exist, File → New repository → Typescript Functions → pick a project folder → Create.",
      },
      {
        type: 'step',
        n: 2,
        title: 'Branch off main',
        body:
          "Top-right branch dropdown → Create branch → name it feat/fleet-metrics. Never write on main — PR review is how Foundry enforces code quality, and builds only publish when the PR merges.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Import the Ontology objects you need',
        body:
          'Open src/ontology.ts (auto-generated). If the Ontology objects you need (Task, Technician) aren\'t imported yet: File → Add ontology objects → pick Task and Technician → Save. This regenerates ontology.ts with typed classes.',
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'typescript',
          title: 'src/functions/fleet-metrics.ts',
          body: `import { Function } from "@foundry/functions-api";
import { Objects, Task, Technician } from "@foundry/ontology-api";

/**
 * Metric: open task count per technician.
 *   - Read-only, cacheable.
 *   - @Function annotation = registered as a callable Foundry function.
 *   - Output is a plain typed record — Slate/Workshop bind to it directly.
 */
export class FleetMetrics {
  @Function()
  public async fleet_getOpenTaskCountByTech(): Promise<
    { techId: string; techName: string; open: number }[]
  > {
    // Ontology query builder — typed, delegated to server.
    const openTasks = await Objects.search()
      .tasks()
      .filter((t) => t.status.exactMatch("OPEN"))
      .orderBy((t) => t.createdAt.asc())
      .takeAsync(5_000); // hard cap guards runaway queries

    // Group by assigned technician link.
    const counts = new Map<string, { techId: string; techName: string; open: number }>();
    for (const t of openTasks) {
      const tech: Technician | undefined = await t.assignedTo.get();
      if (!tech) continue;
      const key = tech.technicianId;
      const row = counts.get(key) ?? {
        techId: key,
        techName: tech.fullName,
        open: 0,
      };
      row.open += 1;
      counts.set(key, row);
    }

    return [...counts.values()].sort((a, b) => b.open - a.open);
  }
}`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Caching: understand it before you ship',
          body:
            "Metric Functions are cached by input hash for the lifetime of the upstream dataset build. Same inputs + same upstream objects = no recompute. That's why 'it's stale' is the most common bug: you edited data in a sandbox branch, but the Function cache was populated on the main branch. Clear the cache via the Function's admin page → Invalidate cache, or bump a @CacheVersion annotation.",
        },
      },
      {
        type: 'step',
        n: 4,
        title: 'Run the Preview tab',
        body:
          "Right pane → Preview → pick fleet_getOpenTaskCountByTech → Run. Preview spins up a lightweight runtime and shows the JSON response plus the query plan (how many Ontology objects were scanned, any delegation warnings).",
      },
      {
        type: 'step',
        n: 5,
        title: 'Open a PR and merge',
        body:
          "Commit with a message like 'feat(metrics): open task count per tech'. Open PR → request review from a repo owner → merge. The build pipeline publishes the Function; it appears in Slate's function picker and Workshop's function binding UI within a minute.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'typescript',
          title: 'Unit test (same repo, runs in CI on every PR)',
          body: `import { FakeOntology } from "@foundry/functions-testing";
import { FleetMetrics } from "./fleet-metrics";

describe("fleet_getOpenTaskCountByTech", () => {
  it("groups open tasks by technician and sorts desc", async () => {
    const fake = new FakeOntology();
    const alice = fake.addTechnician({ technicianId: "alice", fullName: "A. Rivera" });
    const bob = fake.addTechnician({ technicianId: "bob", fullName: "B. Novak" });
    fake.addTask({ status: "OPEN", assignedTo: alice });
    fake.addTask({ status: "OPEN", assignedTo: alice });
    fake.addTask({ status: "DONE", assignedTo: alice });
    fake.addTask({ status: "OPEN", assignedTo: bob });

    const out = await new FleetMetrics().fleet_getOpenTaskCountByTech();
    expect(out).toEqual([
      { techId: "alice", techName: "A. Rivera", open: 2 },
      { techId: "bob", techName: "B. Novak", open: 1 },
    ]);
  });
});`,
        },
      },
      {
        type: 'checklist',
        items: [
          'A feature branch exists off main.',
          'The Function compiles and Preview returns the expected JSON.',
          'A unit test runs in CI (green check on the PR).',
          'After merge, the Function appears in Slate/Workshop pickers.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'ts-writeback-functions',
    number: 2,
    title: 'TypeScript Functions · Writeback flavor',
    subtitle: 'Functions that mutate through the Ontology — the safe "backend write" path.',
    goal:
      "You can author a @OntologyEditFunction that edits Ontology objects, enforce input validation and security, and have it show up as an Action Type users can trigger.",
    endState:
      'fleet_reassignTask({ taskRid, newTechId }) edits the Task object\'s assignedTo link, writes an audit Event, and is wrapped as an Action Type visible in Slate.',
    estMinutes: 12,
    blocks: [
      {
        type: 'p',
        body:
          "Writeback Functions are how a Foundry app mutates state without talking to a database. You declare what Ontology objects you may edit, call edit functions on them, and Foundry turns the result into a single atomic transaction — including lineage, audit, and rollback.",
      },
      {
        type: 'jargon',
        term: 'Ontology Edit Function',
        plain:
          "A TypeScript Function annotated with @OntologyEditFunction. It can create, modify, or delete Ontology objects AND it must declare its edit scope (which object types, which properties). The platform rejects the function at build time if it tries to edit something outside its declared scope.",
      },
      {
        type: 'jargon',
        term: 'Action Type',
        plain:
          'A user-facing wrapper around one or more Writeback Functions. Action Types own the UI form (which fields are required, what validation fires), the permissions (who may invoke it), and the audit trail. A Writeback Function is the verb; the Action Type is the button.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Declare the edit scope',
        body:
          'In the same typescript-functions repo, create src/functions/fleet-writeback.ts. The @Edits annotation lists the object types you will mutate. Foundry enforces this at build time — you cannot sneak an edit through without declaring it.',
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'typescript',
          title: 'src/functions/fleet-writeback.ts',
          body: `import {
  OntologyEditFunction,
  Edits,
  Function,
  UserFacingError,
} from "@foundry/functions-api";
import { Objects, Task, Technician, FleetEvent } from "@foundry/ontology-api";

export class FleetWriteback {
  /**
   * Reassign a Task to a new Technician and log an event.
   */
  @OntologyEditFunction()
  @Edits(Task, FleetEvent)
  public async fleet_reassignTask(
    taskRid: string,
    newTechId: string,
    reason: string,
  ): Promise<void> {
    // 1. Load with the RID (stable identifier).
    const task = await Objects.search().tasks().takeFirstAsync(
      (t) => t.rid.exactMatch(taskRid),
    );
    if (!task) {
      throw new UserFacingError("Task not found", "TASK_MISSING");
    }
    if (task.status === "DONE") {
      throw new UserFacingError(
        "Completed tasks can't be reassigned",
        "TASK_COMPLETE",
      );
    }

    // 2. Validate input.
    const tech = await Objects.search().technicians().takeFirstAsync(
      (t) => t.technicianId.exactMatch(newTechId),
    );
    if (!tech) {
      throw new UserFacingError("Unknown technician", "TECH_MISSING");
    }
    if (reason.trim().length < 5) {
      throw new UserFacingError("Reason must be at least 5 chars", "REASON_SHORT");
    }

    // 3. Apply the edit — typed, atomic.
    task.assignedTo.set(tech);
    task.updatedAt.set(new Date());

    // 4. Write an audit event. Same transaction — if this throws, the reassign rolls back.
    Objects.create(FleetEvent, {
      eventType: "TASK_REASSIGNED",
      subjectRid: taskRid,
      actorUserId: Function.callerUserId(), // stamped by runtime
      payload: JSON.stringify({ newTechId, reason }),
      createdAt: new Date(),
    });
  }
}`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'UserFacingError vs. regular throw',
          body:
            "Throw UserFacingError when you want the message to reach the user. A plain throw gets scrubbed to a generic 'Internal error' — safer by default but useless for validation. Always attach a stable error code (second arg) so frontends can switch on it without string matching.",
        },
      },
      {
        type: 'step',
        n: 2,
        title: 'Wrap it as an Action Type',
        body:
          "Go to the Ontology Manager → Actions → New → name 'Reassign task'. Bind Function → fleet_reassignTask. For each function param, wire the form field: taskRid (hidden, from context), newTechId (dropdown of Technicians), reason (text area, 5-200 chars). Save → Submit for review.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Permission the Action',
        body:
          "Action Type page → Permissions tab → Who can invoke? Add the FleetSupervisors group. Who can see it in the UI? FleetAll. The platform enforces these — a user without invoke permission sees the button but gets a 403 on submit.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Idempotency for safety',
          body:
            "If your Writeback does something with side effects (creating rows, triggering a downstream flow), accept an optional requestId param and check whether an event with that requestId already exists at the top of the function. Clients retrying on network errors then won't double-fire.",
        },
      },
      {
        type: 'step',
        n: 4,
        title: 'Invoke from Slate',
        body:
          "In your Slate app: Actions panel → + Action → pick 'Reassign task' → bind form fields to document variables (taskRid = v_selectedTask.rid, etc). The user sees a modal driven by your Action Type definition — you wrote zero UI code.",
      },
      {
        type: 'checklist',
        items: [
          '@OntologyEditFunction declares its edits via @Edits.',
          'UserFacingError is thrown with stable codes for every validation failure.',
          'An Action Type wraps the Function with a form + permissions.',
          'Invoking from Slate writes a Task edit AND a FleetEvent row.',
          'A failed write (e.g. status=DONE) rolls back — no orphan event rows.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'pyspark-transforms',
    number: 3,
    title: 'PySpark transforms',
    subtitle: 'Large-scale data reshaping in a Foundry Code Repository.',
    goal:
      'You can author a PySpark transform that reads upstream datasets, joins + aggregates them, writes a new dataset, and schedules the build. The output shows up in the Ontology editor ready to back an Object Type.',
    endState:
      "A dataset /FleetOps/derived/fleet_daily_summary exists with one row per technician per day, sourced from raw /FleetOps/raw/tasks + /FleetOps/raw/technicians.",
    estMinutes: 14,
    blocks: [
      {
        type: 'p',
        body:
          "PySpark transforms are the heavy-lifting cousin of TypeScript Functions. A Function shapes a few hundred objects for a UI; a transform reshapes millions of rows into a derived dataset. Anything that eventually backs an Ontology Object Type of non-trivial size is a transform.",
      },
      {
        type: 'jargon',
        term: 'Transform',
        plain:
          'A Python function decorated with @transform_df, taking one or more input datasets and returning one output dataset. Foundry tracks inputs as formal lineage — when inputs rebuild, transforms downstream rebuild too.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Create a pyspark-transforms repo',
        body:
          'Code Repositories → New → PySpark Transforms → project folder → name fleet-transforms. Foundry scaffolds src/fleet_transforms/ with a Python package, a transforms.yml, and a sample transform.',
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'python',
          title: 'src/fleet_transforms/daily_summary.py',
          body: `from transforms.api import transform_df, Input, Output
from pyspark.sql import functions as F
from pyspark.sql import DataFrame


@transform_df(
    Output("/FleetOps/derived/fleet_daily_summary"),
    tasks=Input("/FleetOps/raw/tasks"),
    technicians=Input("/FleetOps/raw/technicians"),
)
def compute(tasks: DataFrame, technicians: DataFrame) -> DataFrame:
    """
    One row per technician per calendar day, with task counts by status
    and a rolling 7-day open backlog.
    """
    # 1. Normalize.
    tasks = (
        tasks
        .withColumn("day", F.to_date("updated_at"))
        .withColumn(
            "status",
            F.upper(F.trim(F.col("status"))),
        )
    )

    # 2. Day-level counts by status.
    by_day = (
        tasks.groupBy("assigned_to_technician_id", "day")
        .agg(
            F.count(F.when(F.col("status") == "OPEN", 1)).alias("open_count"),
            F.count(F.when(F.col("status") == "DONE", 1)).alias("done_count"),
            F.count(F.when(F.col("status") == "BLOCKED", 1)).alias("blocked_count"),
        )
        .withColumnRenamed("assigned_to_technician_id", "technician_id")
    )

    # 3. 7-day rolling backlog using a window.
    from pyspark.sql.window import Window
    w = (
        Window.partitionBy("technician_id")
        .orderBy(F.col("day").cast("long"))
        .rangeBetween(-6 * 86400, 0)
    )
    by_day = by_day.withColumn(
        "open_backlog_7d",
        F.sum("open_count").over(w),
    )

    # 4. Enrich with technician name.
    enriched = by_day.join(
        technicians.select(
            F.col("technician_id"),
            F.col("full_name").alias("technician_name"),
            F.col("depot_code"),
        ),
        on="technician_id",
        how="left",
    )

    return enriched.orderBy("day", "technician_id")`,
        },
      },
      {
        type: 'step',
        n: 2,
        title: 'Declare resources',
        body:
          "transforms.yml → under daily_summary add profile: PROFILE_MEDIUM (2 executors, 4 GB each) if you expect < 10M rows. For larger inputs bump to PROFILE_LARGE. Leaving it at default will either be wasteful or OOM; pick deliberately.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Preview on a sample',
        body:
          "Preview tab → pick daily_summary → Run with sample mode (default 1%). Sample mode spins up a dev runtime, reads 1% of each input, and shows the output dataframe + the physical plan. Iterate here — full builds are slow.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Never call collect() or toPandas() in production code',
          body:
            'Both pull the entire dataframe to the driver, which OOMs on anything real. Use Spark DSL end-to-end, and if you absolutely must inspect values, call .limit(100).toPandas() inside a notebook — never inside a @transform_df.',
        },
      },
      {
        type: 'step',
        n: 4,
        title: 'Merge + schedule',
        body:
          "Open PR → reviewer approves → merge to main. The output dataset /FleetOps/derived/fleet_daily_summary is created on first build. We'll wire the schedule in lesson 8 (Data Lineage · Schedule builds).",
      },
      {
        type: 'jargon',
        term: 'Incremental build',
        plain:
          'By default a transform recomputes everything. For large, append-only inputs, switch to @incremental() — Foundry only reprocesses new/changed input partitions. Huge cost saver; requires thought about state (e.g. rolling windows need the last 6 days of history in the read set).',
      },
      {
        type: 'checklist',
        items: [
          "Transform compiles, preview returns non-empty.",
          "Resource profile is explicit, not default.",
          "transforms.yml passes lint in the PR check.",
          "Output dataset appears at the declared path after merge + first build.",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'pipeline-builder',
    number: 4,
    title: 'Pipeline Builder',
    subtitle: 'When the transform is shape-ly enough to skip writing code.',
    goal:
      "You can replicate a join/group-by/filter transform in Pipeline Builder's node-graph UI, preview each node, and publish the pipeline as a scheduled dataset.",
    endState:
      "A pipeline 'fleet_tech_backlog' reads /FleetOps/raw/tasks + technicians, produces a backlog dataset, and is the no-code sibling of your PySpark transform.",
    estMinutes: 10,
    blocks: [
      {
        type: 'p',
        body:
          "Pipeline Builder is Foundry's drag-and-drop transform tool. It emits the same Spark SQL under the hood as a Code Repository transform, but you compose it as a graph of nodes. Best for shape-ly pipelines (select → filter → join → aggregate) that analysts or engineers without Python experience need to own.",
      },
      {
        type: 'jargon',
        term: 'Node',
        plain:
          "A single operation in a Pipeline Builder graph — Input, Select, Filter, Join, Aggregate, Pivot, Union, Output. Every node has typed inputs, typed outputs, and a preview tab showing the first 1000 rows of its output.",
      },
      {
        type: 'step',
        n: 1,
        title: 'Create a pipeline',
        body:
          'Applications → Pipeline Builder → New pipeline → name fleet_tech_backlog → project folder. You land on an empty canvas.',
      },
      {
        type: 'step',
        n: 2,
        title: 'Add Input nodes',
        body:
          "Left rail → Input → Dataset picker → select /FleetOps/raw/tasks. Drag onto canvas. Repeat for /FleetOps/raw/technicians. The nodes show their column list in the side panel.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Filter, aggregate, join',
        body:
          "Drag Filter from rail → connect Tasks → expression status == 'OPEN'. Drag Aggregate → group by assigned_to_technician_id, count(*) as open_count. Drag Join → left = aggregate output, right = technicians, join on technician_id, join type LEFT. Each node auto-generates its type contract.",
      },
      {
        type: 'step',
        n: 4,
        title: 'Add an Output node',
        body:
          "Drag Output → connect Join → pick target path /FleetOps/derived/fleet_tech_backlog → partition by day if you add a date column. Click Validate → Publish.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Pipeline Builder vs. Code Repo — picking one',
          body:
            "Rule of thumb: if the transform is linear (chain of select/filter/join/groupBy) and your team has analysts who need to own it, use Pipeline Builder. If it needs loops, UDFs, custom window logic, ML preprocessing, or incremental logic, use a PySpark Code Repo. Both can coexist in the same lineage graph — downstream doesn't care.",
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: 'Export to code when you outgrow it',
          body:
            "Pipeline Builder has a 'View generated Spark SQL' button and an 'Export to Code Repository' action. Teams often prototype in Pipeline Builder, then port to a PySpark repo once complexity passes the threshold. The dataset output path stays the same — zero downstream change.",
        },
      },
      {
        type: 'step',
        n: 5,
        title: 'Preview every node',
        body:
          "Click each node → right pane → Preview tab → Run. Errors surface with red node borders. A common issue: join keys disagree on type (technician_id is string in one, int in the other). Insert a Cast node, don't paper over it.",
      },
      {
        type: 'checklist',
        items: [
          'Every node shows a green preview.',
          'The graph has exactly one Output.',
          'Pipeline is saved, validated, and published (not just saved).',
          'Downstream Ontology objects or transforms can see the new dataset.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'aip-analysis',
    number: 5,
    title: 'AIP — analysis with an LLM in the loop',
    subtitle: "Use Palantir's AI Platform to turn a business question into a query + a summary.",
    goal:
      "You can build an AIP Logic flow that takes a natural-language question, retrieves relevant Ontology objects, runs aggregations, and returns a narrative answer plus the raw rows.",
    endState:
      'An AIP Logic "FleetAsk" answers questions like "Which depot had the worst backlog last week?" by retrieving from fleet_daily_summary, computing, and writing a short summary.',
    estMinutes: 11,
    blocks: [
      {
        type: 'p',
        body:
          "AIP (Palantir's AI Platform) wraps LLMs inside a deterministic, permissioned Foundry context. The key unit is AIP Logic — a flow of typed blocks: LLM calls, Ontology queries, code blocks, loops. Unlike raw prompt engineering, AIP Logic has real types, version control, eval harnesses, and audit.",
      },
      {
        type: 'jargon',
        term: 'AIP Logic',
        plain:
          "A visual flow of typed blocks. Each block is an LLM call (with a typed output schema), an Ontology query, a code block (TypeScript or Python), or a control-flow block (loop, if, switch). Logic flows are versioned, testable, and can be invoked from Slate/Workshop like any Function.",
      },
      {
        type: 'step',
        n: 1,
        title: 'Create the Logic',
        body:
          "Applications → AIP Logic → New Logic → name FleetAsk → assign to your project. Set input: { question: string }. Set output: { answer: string, rows: DailySummary[] }.",
      },
      {
        type: 'step',
        n: 2,
        title: 'Block 1 — classify the question',
        body:
          "Drag LLM block → model GPT-4o (or whatever your tenant provides) → prompt: 'Classify this fleet ops question into one of: BACKLOG_BY_DEPOT, TOP_TECHS, STATUS_TRENDS. Return JSON.' → typed output schema { category: enum, timeframeDays: integer }.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Block 2 — switch on category',
        body:
          "Drag Switch block → wire input = block1.output.category. Branch BACKLOG_BY_DEPOT → Ontology query block (Objects.dailySummary filter day >= today - timeframeDays, groupBy depot, orderBy open_backlog_7d desc, limit 5). Branch TOP_TECHS → similar but groupBy technician.",
      },
      {
        type: 'step',
        n: 4,
        title: 'Block 3 — summarize',
        body:
          "Drag LLM block → inputs: original question + rows from block 2. Prompt: 'Given these rows, write a 2-3 sentence answer for a fleet supervisor. Cite specific numbers. If rows are empty, say so.' → typed output { answer: string }. Return { answer, rows }.",
      },
      {
        type: 'code',
        block: {
          kind: 'code',
          language: 'typescript',
          title: 'Typed Ontology block (Branch: BACKLOG_BY_DEPOT)',
          body: `// Inside the Ontology Query block — same editor you\u2019d see in a TS Function.
import { Objects } from "@foundry/ontology-api";

const cutoff = new Date();
cutoff.setDate(cutoff.getDate() - inputs.timeframeDays);

const rows = await Objects.search()
  .dailySummaries()
  .filter((d) => d.day.gte(cutoff))
  .takeAsync(50_000);

// Group in memory — rows count is bounded.
const byDepot = new Map<string, number>();
for (const r of rows) {
  byDepot.set(r.depotCode, (byDepot.get(r.depotCode) ?? 0) + r.openBacklog7d);
}

return {
  rows: [...byDepot.entries()]
    .map(([depot, backlog]) => ({ depot, backlog }))
    .sort((a, b) => b.backlog - a.backlog)
    .slice(0, 5),
};`,
        },
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'LLMs do not touch data — Ontology blocks do',
          body:
            "A classic misuse is asking the LLM to 'answer the question against the data'. Don't. The LLM classifies and narrates. The deterministic Ontology blocks retrieve. This separation is what makes AIP Logic auditable — every data access is typed, logged, and permissioned.",
        },
      },
      {
        type: 'step',
        n: 5,
        title: 'Build an Eval set',
        body:
          "Eval tab → + New test case → write 10-20 example { question, expected category, expected row count }. Run evals on every Logic edit. Failing evals block publication. This is how you ship LLM flows without the usual regression terror.",
      },
      {
        type: 'step',
        n: 6,
        title: 'Invoke from Slate or Workshop',
        body:
          "Publish the Logic → binds as a callable Function (same picker as a TypeScript Function). Wire a text input in Workshop → button → onClick = FleetAsk({ question: v_input }) → display answer + render rows as a table.",
      },
      {
        type: 'checklist',
        items: [
          'Logic has typed input and output schemas.',
          'LLM blocks have explicit typed output schemas (not free-text).',
          'Ontology retrieval is a separate deterministic block.',
          'At least 10 eval cases pass before publication.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'workshop-frontend',
    number: 6,
    title: 'Workshop · building a frontend',
    subtitle: 'Foundry\'s no-code app builder — the modern successor to Slate.',
    goal:
      "You can assemble a Workshop module with widgets, bind them to Functions and Ontology object sets, wire Actions, and publish a versioned app.",
    endState:
      'A Workshop module FleetOps with a left-hand backlog list, a details pane, a reassign action button, and an "Ask FleetAsk" search bar wired to your AIP Logic.',
    estMinutes: 12,
    blocks: [
      {
        type: 'p',
        body:
          "Workshop is what most new Foundry apps use in 2026. It's a no-code canvas, but backed by the same Functions, Actions, and Ontology — so everything you built in lessons 1-5 is directly reusable. Workshop vs. Slate: Workshop is higher-level, faster to build in, easier to hand to analysts; Slate is lower-level HTML/JS, still there when you need pixel control.",
      },
      {
        type: 'jargon',
        term: 'Module',
        plain:
          "A Workshop app. A module contains pages, variables, widgets, and function bindings. Modules are versioned; users always run the latest published version.",
      },
      {
        type: 'jargon',
        term: 'Variable',
        plain:
          "Typed state inside a module — an object, an object set, a string, a Function output. Widgets read and write variables; variables are the glue. Think of them as React state that you declare in a panel instead of a file.",
      },
      {
        type: 'step',
        n: 1,
        title: 'Create the module',
        body:
          "Applications → Workshop → New module → name FleetOps → project folder. You land on a blank canvas with a left Widgets rail, center canvas, and right Variables/Properties pane.",
      },
      {
        type: 'step',
        n: 2,
        title: 'Declare variables',
        body:
          "Variables pane → + Add:  v_openTasks (Object set of Task, filter status=OPEN, default full),  v_selectedTask (Task, default null),  v_question (String, default ''),  v_fleetAskAnswer (Function output of FleetAsk, default null).",
      },
      {
        type: 'step',
        n: 3,
        title: 'Layout',
        body:
          "Canvas → drag a 2-column Layout → left 30%, right 70%. Into the left column: Object List widget, bind Items = v_openTasks, Selected = v_selectedTask. Into the right column: Object Card widget, bind Object = v_selectedTask.",
      },
      {
        type: 'step',
        n: 4,
        title: 'Wire the Reassign action',
        body:
          "Drag Button widget → label 'Reassign' → onClick = Trigger Action Type 'Reassign task' → pre-fill taskRid from v_selectedTask.rid. The Action Type form (lesson 2) opens as a modal — zero UI code written here.",
      },
      {
        type: 'step',
        n: 5,
        title: 'Wire the AIP Logic',
        body:
          "Drag Text Input widget → bind value = v_question → label 'Ask FleetAsk'. Drag Button 'Ask' → onClick = Call Function FleetAsk({ question: v_question }) → write result into v_fleetAskAnswer. Drag Markdown widget → bind text = v_fleetAskAnswer.answer. Drag Table widget → bind rows = v_fleetAskAnswer.rows.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Everything is already permissioned',
          body:
            "Workshop widgets respect the permissions of the Functions and Action Types they bind to. A user who lacks invoke on Reassign sees the button but gets a 403 modal on click (or you can hide the button with a visibility binding = v_canReassign). You don't build auth; you bind it.",
        },
      },
      {
        type: 'step',
        n: 6,
        title: 'Preview + publish',
        body:
          "Top-right → Preview. Run through: select a task, click Reassign, submit a reason, watch the list refresh. Back to editor → Publish → write a version note → users on the module URL see v1 immediately.",
      },
      {
        type: 'checklist',
        items: [
          'Module has 4 variables with typed defaults.',
          'Object List → Object Card selection works.',
          'Reassign action fires and refreshes the list.',
          'FleetAsk text box returns a narrative + table.',
          "v1 is published with a version note.",
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'lineage-health',
    number: 7,
    title: 'Data Lineage · monitoring health',
    subtitle: 'The graph. Every dataset, every transform, every Function — upstream and downstream.',
    goal:
      "You can open the Lineage graph for any dataset, navigate upstream to find a stale input, downstream to see impact, and set up health checks that alert when a node breaks or slows.",
    endState:
      "You've added a Health check to /FleetOps/derived/fleet_daily_summary that pages the FleetOps team if build duration > 30 min or freshness > 24 h.",
    estMinutes: 8,
    blocks: [
      {
        type: 'p',
        body:
          "Foundry tracks lineage as a first-class graph: dataset → transform → dataset → Function → Action Type → module. When something breaks, the Lineage graph is how you find the blast radius. When you want to sleep at night, Health checks are how you get paged before a user notices.",
      },
      {
        type: 'jargon',
        term: 'Lineage graph',
        plain:
          'A DAG where each node is a dataset, transform, function, or object type, and edges are typed dependencies. The graph is generated by the platform — you don\'t maintain it — because every transform declares its Inputs + Output.',
      },
      {
        type: 'step',
        n: 1,
        title: 'Open the graph',
        body:
          'Any dataset page → top-right → Lineage. Arrow up to see inputs. Arrow down to see derived datasets + consumers. Click-drag to pan, scroll to zoom. Search to jump to any node.',
      },
      {
        type: 'step',
        n: 2,
        title: 'Read a node',
        body:
          "Click a transform node → side panel shows: last build status, build duration (p50, p95), next scheduled run, freshness SLO, current owner. Red halo = last build failed. Yellow = degrading duration.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Add a Health Check',
        body:
          "Node's side panel → Health → + Check. Metric dropdown: Build duration, Build status, Freshness, Row count delta, Column null rate. Threshold: e.g. freshness > 24h. Severity: Warning / Page. Channel: Slack #fleet-ops + on-call rotation.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'What to check on every production dataset',
          body:
            "At minimum: (1) Build status != FAILED, severity Page. (2) Freshness < 2x schedule interval, severity Warning. (3) Row count within 50%-200% of 7-day median, severity Warning. Skip null-rate checks until you\u2019ve been burned by one.",
        },
      },
      {
        type: 'step',
        n: 4,
        title: 'Trace a failure upstream',
        body:
          "When an alert fires: open the Lineage graph on the failing node → walk upstream (arrow up) → the first upstream node with status != healthy is where the problem originates. Click its last build log to see the traceback.",
      },
      {
        type: 'step',
        n: 5,
        title: 'Trace impact downstream',
        body:
          "Before editing a transform or dataset schema, open Lineage → walk downstream → every red/yellow node in the path is impact you need to consider. If a dataset feeds 40 Functions and a Workshop module, change it carefully (or fork the output path and migrate).",
      },
      {
        type: 'callout',
        callout: {
          kind: 'note',
          title: "Subscriptions > polling the graph",
          body:
            "Don't keep refreshing Lineage. Every node supports Subscribe → notify me on build status change / freshness violation / schema change. You get a Foundry notification and (optionally) an email. Subscribe to the handful of datasets your team owns.",
        },
      },
      {
        type: 'checklist',
        items: [
          'I can navigate the Lineage graph up and down from any dataset.',
          'Build status, Freshness, and Row-count checks exist on our production derived datasets.',
          'Alerts route to Slack AND a human rotation (not just email).',
          'I know how to read a failed build log 2 clicks away from an alert.',
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'lineage-schedules',
    number: 8,
    title: 'Data Lineage · scheduling builds',
    subtitle: "Cron, event triggers, dependency chains, and 'build everything below this node'.",
    goal:
      "You can schedule a transform to run on a cron, chain dependent builds so they fire in order, set retry policy, and kick off an ad-hoc backfill for a date range.",
    endState:
      'fleet_daily_summary runs at 06:00 UTC daily, retries twice on transient failure, and triggers the downstream FleetAsk eval refresh on success.',
    estMinutes: 8,
    blocks: [
      {
        type: 'p',
        body:
          "Every transform starts life as manual-only. To make it a product, you schedule it. Foundry's Scheduler sits on the Lineage graph — you pick a node, attach a schedule, and the platform takes over: running on time, retrying on failure, chaining downstream builds, and recording duration history.",
      },
      {
        type: 'jargon',
        term: 'Build',
        plain:
          'A single execution of a transform (or a chain of transforms). Every build has a unique id, a started_at, a duration, and a status (RUNNING / SUCCESS / FAILED / CANCELED).',
      },
      {
        type: 'step',
        n: 1,
        title: 'Open the Schedules tab',
        body:
          'Dataset page → Schedules. If empty: + New schedule → pick Trigger = cron or Trigger = on-input-update.',
      },
      {
        type: 'step',
        n: 2,
        title: 'Cron vs. on-input-update — picking one',
        body:
          "Cron: runs on wall clock. Use when upstream is also cron (e.g. a daily data dump). On-input-update: runs whenever any declared input gets a new build. Use when upstream is event-driven or flaky — your transform catches up automatically.",
      },
      {
        type: 'step',
        n: 3,
        title: 'Set the schedule',
        body:
          "Cron: 0 6 * * * (every day 06:00 UTC). Timezone: UTC always — local time creates DST bugs. Max duration: 45 min (auto-cancel runaway builds). Retries: 2 with 5-min backoff.",
      },
      {
        type: 'callout',
        callout: {
          kind: 'warn',
          title: 'Always set max duration',
          body:
            "Foundry won't kill a runaway build by default. A transform stuck in an infinite shuffle will happily burn executor-hours until you notice. Set max_duration = 2x your p95 and let the platform kill zombies.",
        },
      },
      {
        type: 'step',
        n: 4,
        title: 'Chain downstream builds',
        body:
          "Schedule config → + Downstream trigger → pick FleetAsk.evalRefresh and fleet_tech_backlog (Pipeline Builder pipeline). Each runs on success of the primary build. Order: parallel by default; toggle 'serial' if they share a bottleneck.",
      },
      {
        type: 'step',
        n: 5,
        title: 'Retries and alerting',
        body:
          "Retry policy → 2 retries, exponential backoff. On final failure → alert health-check channel from lesson 7. Do NOT alert on transient retries — you'll train yourself to ignore pages.",
      },
      {
        type: 'step',
        n: 6,
        title: 'Run an ad-hoc backfill',
        body:
          "Build history page → Backfill → pick date range (e.g. last 90 days) → Foundry spawns N parallel builds, one per partition. Monitor queue depth; if > 50, your profile is undersized — bump it temporarily, run backfill, lower it back.",
      },
      {
        type: 'jargon',
        term: 'Branch builds',
        plain:
          "Feature branches build too — each gets its own isolated copy of downstream datasets. Merging to main is what promotes the build to production. This is why 'works on my branch, stale on main' is a cache-invalidation conversation (see lesson 1).",
      },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Name your schedules',
          body:
            "Default schedule names are UUIDs. Rename to 'daily-06-utc' or 'on-raw-tasks-update'. When you're debugging at 2am, descriptive names save 30 seconds and that's often the difference between fixing it now or tomorrow.",
        },
      },
      {
        type: 'checklist',
        items: [
          'The transform has an explicit cron OR on-input-update schedule.',
          'Max duration + retry policy are set, not defaults.',
          'Downstream builds chain correctly (verified by a manual run).',
          'On-failure alerts route to the same channel as health checks.',
          'A backfill runs successfully over a small date range (dry-run before you need it).',
        ],
      },
    ],
  },
]

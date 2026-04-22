# Pathfinder Vibe Code Wednesday "Lesson"

Premium guided mission-control platform that teaches complete beginners how to go from rough idea to runnable app using AI coding agents.

## Who this is for
- First-time coders and non-technical operators
- Designers/founders learning prompt-to-product workflows
- Builders who want structured AI handoff quality

## Stack
- React 19 + TypeScript
- Vite + React Router
- Tailwind CSS v4
- Framer Motion
- Vitest + Testing Library

## Install and run
```powershell
npm install
npm run dev
```

## Build, lint, test
```powershell
npm run lint
npm run test
npm run build
```

## Windows PowerShell quick start
1. Open PowerShell in the project root.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` and open the shown localhost URL.
4. Run `npm run build` to validate production build.
5. If errors appear:
   - **Module not found**: run `npm install` again and verify dependency name.
   - **Port in use**: stop the other process or run Vite on another port.
   - **Missing env**: create required `.env` values from docs.
   - **Permission issue**: reopen PowerShell as admin if needed.

## Architecture summary
- `src/app/router.tsx`: central route map
- `src/components/layout/AppShell.tsx`: premium shell with nav and workspace rails
- `src/content/modules.ts`: typed lesson content, templates, command walkthrough data
- `src/pages/*`: landing, lesson modules, studios, forge, workshops, and support routes
- `src/lib/*`: prompt generation, export helpers, local artifact storage

## Folder tree
```text
src/
  app/
    App.tsx
    router.tsx
  components/
    layout/AppShell.tsx
    ui/CopyButton.tsx
    ui/SectionCard.tsx
  content/modules.ts
  lib/
    export.ts
    promptGenerator.ts
    storage.ts
  pages/
    LandingPage.tsx
    LessonPage.tsx
    ModulePage.tsx
    IdeaStudioPage.tsx
    StructureStudioPage.tsx
    UIPlanningPage.tsx
    PromptForgePage.tsx
    LocalRunWorkshopPage.tsx
    ValidationWorkshopPage.tsx
    PlaygroundPage.tsx
    ResourcesPage.tsx
    TemplatesPage.tsx
    FAQPage.tsx
    AboutPage.tsx
    CapstonePage.tsx
    GlossaryPage.tsx
    SettingsPage.tsx
    SavedProjectsPage.tsx
  types/models.ts
```

## Page map
- `/`
- `/lesson`
- `/lesson/module/:id`
- `/studio/idea`
- `/studio/structure`
- `/studio/ui-planning`
- `/forge/prompts`
- `/workshop/local-run`
- `/workshop/validate`
- `/playground`
- `/resources`
- `/templates`
- `/faq`
- `/about`
- `/capstone`
- `/glossary`
- `/settings`
- `/saved-projects`

## Design token summary
- Deep slate base (`#020617`) with indigo/cyan accent layers
- Rounded card system (`rounded-2xl` to `rounded-3xl`)
- Soft borders (`white/10`–`white/20`) for depth
- Motion defaults: short fade/lift transitions for hierarchy
- Shared utility classes: `.input`, `.btn-secondary`

## Example lesson content object
Defined in `src/content/modules.ts` as typed `LessonModule` objects with:
- objective
- visual explainer
- guided narrative
- anti-example
- mini deliverable
- reflection prompt
- optional section-level beginner teaching blocks

## Example prompt generator output
Prompt Forge composes:
- app + audience
- problem + MVP scope
- route map
- UI direction
- constraints
- mode instruction (`concise`, `standard`, `deep-build`, `design-heavy`, `debug`, `refactor`, `polish`)
- validation checklist directive

## Example PowerShell workflow walkthrough
Interactive workshop (`/workshop/local-run`) includes:
- `cd C:\projects\my-app`
- `npm install`
- `npm run dev`
- `npm run build`
with plain-language command explanations and expected output previews.

## Customizing lesson content
- Edit `lessonModules`, `promptTemplates`, and `powerShellSteps` in `src/content/modules.ts`.
- Add module sections for richer exercises/checklists.

## Adding a new module
1. Add a new `LessonModule` object in `src/content/modules.ts`.
2. It automatically appears on `/lesson`.
3. Open at `/lesson/module/:id`.

## Modifying templates
Update `promptTemplates` in `src/content/modules.ts`; templates render automatically on `/templates`.

## Extension notes
- Add localStorage-backed progress by learner profile.
- Expand capstone export with PDF rendering.
- Add additional quizzes and drag-and-drop activities per module.

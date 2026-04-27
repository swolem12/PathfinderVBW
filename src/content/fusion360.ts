import type { LessonDef } from './course'

export const fusion360Lessons: LessonDef[] = [
  {
    id: 'tool-quick-reference',
    number: 1,
    title: 'Tool Quick Reference',
    subtitle: 'Every tool in Solid, Mesh, and Sketch workspaces — with GIFs, images, and examples.',
    goal: 'You can identify and use every tool in Fusion 360’s Solid, Mesh, and Sketch workspaces.',
    endState: 'You have explored every tool and know what each does.',
    estMinutes: 45,
    blocks: [
      {
        type: 'p',
        body: 'This lesson is a comprehensive quick reference for every tool in Fusion 360’s Solid, Mesh, and Sketch workspaces. For each tool, you’ll find its icon, a short description, a GIF or image showing it in action, and a real-world example.'
      },
      {
        type: 'h',
        body: 'Solid Tools'
      },
      // TODO: Add each Solid tool with icon, description, GIF/image, and example
      {
        type: 'h',
        body: 'Mesh Tools'
      },
      // TODO: Add each Mesh tool with icon, description, GIF/image, and example
      {
        type: 'h',
        body: 'Sketch Tools'
      },
      // TODO: Add each Sketch tool with icon, description, GIF/image, and example
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'How to use this reference',
          body: 'Click any tool to expand details, watch the GIF, and see example use cases. Use this as a side-by-side guide while working in Fusion 360.'
        }
      }
    ]
  },
  // Additional lessons can be added here
]

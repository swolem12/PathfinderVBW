import type { LessonBlock, LessonDef, MediaBlock } from './course'

type FusionTool = {
  name: string
  purpose: string
  useWhen: string
  steps: string[]
  watchFor?: string
  mediaKind?: MediaBlock['kind']
  helpUrl?: string
}

const HELP_BASE = 'https://help.autodesk.com/view/fusion360/ENU/'
const HELP_SEARCH = (q: string) =>
  `${HELP_BASE}?query=${encodeURIComponent(q)}`

const mediaSlot = (
  kind: MediaBlock['kind'],
  title: string,
  caption: string,
  alt: string,
  extra: Partial<MediaBlock> = {},
): LessonBlock => ({
  type: 'media',
  media: { kind, title, caption, alt, ...extra },
})

const toolBlock = (workspace: 'Solid' | 'Mesh' | 'Sketch', tool: FusionTool): LessonBlock => ({
  type: 'details',
  summary: `${workspace} · ${tool.name}`,
  blocks: [
    {
      type: 'p',
      body: tool.purpose,
    },
    {
      type: 'list',
      items: [
        `Use when: ${tool.useWhen}`,
        ...tool.steps.map((step, index) => `${index + 1}. ${step}`),
        ...(tool.watchFor ? [`Watch for: ${tool.watchFor}`] : []),
      ],
    },
    mediaSlot(
      tool.mediaKind ?? 'gif',
      `${tool.name} — official reference`,
      `Open Autodesk Help and watch a tutorial showing the ${workspace} ${tool.name} tool.`,
      `Reference media for Fusion 360 ${workspace} tool ${tool.name}`,
      {
        helpUrl: tool.helpUrl ?? HELP_SEARCH(`${workspace} ${tool.name}`),
        tutorialQuery: `${workspace} ${tool.name}`,
      },
    ),
  ],
})

const solidTools: FusionTool[] = [
  {
    name: 'Create Sketch',
    purpose: 'Starts a 2D profile on a plane or face. Most solid features begin with a clean, constrained sketch.',
    useWhen: 'you need a controlled 2D outline for extrude, revolve, sweep, loft, hole placement, or construction references.',
    steps: ['Pick a plane or flat face.', 'Draw the profile.', 'Add dimensions and constraints before making 3D geometry.'],
    watchFor: 'Unconstrained sketches can move later and break downstream features.',
    mediaKind: 'image',
  },
  {
    name: 'Extrude',
    purpose: 'Turns a sketch profile or face into a solid by pushing it in a straight direction.',
    useWhen: 'making plates, blocks, brackets, cutouts, bosses, pockets, or through-cuts.',
    steps: ['Select a closed profile or face.', 'Choose Join, Cut, Intersect, or New Body.', 'Set distance, direction, taper, and extent.'],
  },
  {
    name: 'Revolve',
    purpose: 'Spins a profile around an axis to create round parts.',
    useWhen: 'making knobs, pulleys, wheels, bottles, rings, bushings, cones, or lathe-style parts.',
    steps: ['Sketch half of the cross-section.', 'Select a centerline or axis.', 'Set the angle, operation, and body behavior.'],
  },
  {
    name: 'Sweep',
    purpose: 'Moves a profile along a path to create rails, tubes, handles, wiring channels, and organic profiles.',
    useWhen: 'a shape needs to follow a curve rather than a straight extrusion.',
    steps: ['Create the profile sketch.', 'Create or select a path.', 'Choose orientation, taper, guide rail, and operation.'],
  },
  {
    name: 'Loft',
    purpose: 'Blends between two or more profiles to create smooth transitions.',
    useWhen: 'making ergonomic grips, ducts, aero shapes, shells, transitions, and tapered enclosures.',
    steps: ['Create profiles on different planes or faces.', 'Select profiles in order.', 'Add rails or centerlines when the transition must follow a specific route.'],
  },
  {
    name: 'Rib',
    purpose: 'Creates thin reinforcing walls from open sketch lines.',
    useWhen: 'adding stiffness inside plastic housings or bracket supports without making the whole part thick.',
    steps: ['Sketch rib centerlines on a plane that intersects the body.', 'Set rib thickness and direction.', 'Confirm it joins to nearby solid faces.'],
  },
  {
    name: 'Web',
    purpose: 'Creates connected thin walls across multiple sketch curves.',
    useWhen: 'adding internal lattice-like reinforcement across a part.',
    steps: ['Sketch the web layout.', 'Select the curves.', 'Set wall thickness, depth, and operation.'],
  },
  {
    name: 'Hole',
    purpose: 'Creates precise drilled, counterbored, countersunk, tapped, or clearance holes.',
    useWhen: 'placing fastener holes, threaded holes, locating holes, or standard hardware clearances.',
    steps: ['Pick a face or sketch point.', 'Choose simple, counterbore, countersink, or tapped.', 'Set diameter, depth, thread, and termination.'],
  },
  {
    name: 'Thread',
    purpose: 'Adds cosmetic or modeled screw threads to cylindrical faces.',
    useWhen: 'making bolts, threaded inserts, bottle caps, or mating printed parts.',
    steps: ['Select a cylindrical face.', 'Choose thread type, size, designation, and class.', 'Enable modeled threads only when manufacturing or printing needs real geometry.'],
    watchFor: 'Modeled threads are heavier geometry; cosmetic threads are faster for most design work.',
  },
  {
    name: 'Box',
    purpose: 'Creates a primitive rectangular solid from dimensions or two points.',
    useWhen: 'roughing out enclosures, fixtures, stock material, or quick placeholders.',
    steps: ['Choose the placement plane.', 'Define the rectangle.', 'Enter length, width, and height.'],
  },
  {
    name: 'Cylinder',
    purpose: 'Creates a primitive cylinder from center, diameter, and height.',
    useWhen: 'making pins, posts, rollers, spacers, wheels, bosses, or round stock.',
    steps: ['Choose the placement plane.', 'Pick the center and diameter.', 'Enter height and operation.'],
  },
  {
    name: 'Sphere',
    purpose: 'Creates a primitive sphere.',
    useWhen: 'making ball joints, handles, decorative ends, reference bodies, or rounded caps.',
    steps: ['Pick a center point.', 'Set the diameter.', 'Choose whether it joins existing geometry or creates a new body.'],
  },
  {
    name: 'Torus',
    purpose: 'Creates a donut-shaped primitive.',
    useWhen: 'making O-ring references, gaskets, rings, collars, or rounded handles.',
    steps: ['Pick a center and plane.', 'Set major and minor diameters.', 'Confirm operation.'],
  },
  {
    name: 'Coil',
    purpose: 'Creates helical geometry.',
    useWhen: 'making springs, screw-like forms, decorative spirals, or helical grooves.',
    steps: ['Pick a plane and center.', 'Set coil type, diameter, pitch, revolutions, and section.', 'Choose Join, Cut, or New Body.'],
  },
  {
    name: 'Pipe',
    purpose: 'Creates a round tube along a selected path.',
    useWhen: 'making tubing, routing, handles, frames, wire paths, and sweeps with circular sections.',
    steps: ['Select a sketch path or edge chain.', 'Set section size and hollow/solid behavior.', 'Choose operation.'],
  },
  {
    name: 'Fillet',
    purpose: 'Rounds sharp edges with a radius.',
    useWhen: 'softening edges, improving manufacturability, removing stress risers, and making parts feel finished.',
    steps: ['Select edges or faces.', 'Enter radius.', 'Use tangent chain and variable radius when needed.'],
    mediaKind: 'image',
  },
  {
    name: 'Chamfer',
    purpose: 'Bevels edges with flat angled cuts.',
    useWhen: 'adding lead-ins for assembly, removing sharp corners, or creating machined bevels.',
    steps: ['Select edges.', 'Choose equal distance, two distances, or distance/angle.', 'Set values and confirm.'],
  },
  {
    name: 'Shell',
    purpose: 'Hollows a solid body by removing selected faces and leaving wall thickness.',
    useWhen: 'making enclosures, cups, housings, and lightweight plastic parts.',
    steps: ['Select the face or faces to remove.', 'Set inside, outside, or both-side wall thickness.', 'Inspect corners for failed thin geometry.'],
  },
  {
    name: 'Draft',
    purpose: 'Tapers faces relative to a pull direction.',
    useWhen: 'designing molded or cast parts that must release from tooling.',
    steps: ['Select a neutral plane.', 'Select faces to taper.', 'Set pull direction and draft angle.'],
  },
  {
    name: 'Press Pull',
    purpose: 'Context-sensitive tool that offsets faces, extrudes profiles, or edits hole/fillet sizes depending on selection.',
    useWhen: 'quickly changing a face, profile, or recognized feature without opening a full command first.',
    steps: ['Select a face, edge, or sketch profile.', 'Drag the arrow or enter a value.', 'Check the timeline feature it creates.'],
  },
  {
    name: 'Offset Face',
    purpose: 'Moves selected faces inward or outward while preserving surrounding topology.',
    useWhen: 'thickening a boss, enlarging a pocket, or adjusting clearance after the part already exists.',
    steps: ['Select one or more faces.', 'Enter an offset distance.', 'Use negative values to shrink geometry.'],
  },
  {
    name: 'Move/Copy',
    purpose: 'Translates, rotates, or copies bodies, components, faces, and sketch geometry.',
    useWhen: 'positioning parts, duplicating bodies, or making direct edits.',
    steps: ['Set selection type.', 'Choose translate, rotate, point-to-point, or free move.', 'Enable Create Copy when duplicating.'],
  },
  {
    name: 'Combine',
    purpose: 'Joins, cuts, or intersects bodies using another body as the tool.',
    useWhen: 'boolean operations, making molds, cutting one shape from another, or merging bodies.',
    steps: ['Select the target body.', 'Select one or more tool bodies.', 'Choose Join, Cut, or Intersect and decide whether to keep tools.'],
  },
  {
    name: 'Split Body',
    purpose: 'Divides a body using a face, plane, sketch, or surface as a splitting tool.',
    useWhen: 'separating a part into printable halves, trimming material, or making mold sections.',
    steps: ['Select the body to split.', 'Select the splitting tool.', 'Turn Extend Splitting Tool on if the cutting surface is too small.'],
  },
  {
    name: 'Scale',
    purpose: 'Resizes bodies or components uniformly or non-uniformly.',
    useWhen: 'adjusting imported geometry, resizing references, or compensating for print shrinkage.',
    steps: ['Select body or component.', 'Choose uniform or axis-specific scale.', 'Enter scale factor.'],
  },
  {
    name: 'Change Parameters',
    purpose: 'Creates named variables that drive dimensions throughout the model.',
    useWhen: 'you want a design to resize predictably, such as materialThickness, clearance, or boltSpacing.',
    steps: ['Open Modify → Change Parameters.', 'Create named user parameters.', 'Use parameter names instead of raw numbers in dimensions.'],
    mediaKind: 'video',
  },
  {
    name: 'Construction Plane',
    purpose: 'Creates reference planes away from origin planes and faces.',
    useWhen: 'placing sketches for lofts, angled cuts, midplanes, offsets, or mirrored geometry.',
    steps: ['Choose plane type: offset, midplane, tangent, angle, or through points.', 'Select references.', 'Use it for sketches or splitting.'],
  },
  {
    name: 'Construction Axis',
    purpose: 'Creates reference axes for rotation, holes, patterns, and alignment.',
    useWhen: 'a revolve, circular pattern, or alignment needs a clean centerline.',
    steps: ['Choose axis type.', 'Select cylindrical faces, edges, points, or planes.', 'Use the axis in downstream commands.'],
  },
  {
    name: 'Measure',
    purpose: 'Reports distance, angle, area, diameter, radius, and mass-related measurements.',
    useWhen: 'checking clearances, verifying dimensions, or diagnosing why parts do not fit.',
    steps: ['Open Inspect → Measure.', 'Select edges, faces, bodies, or points.', 'Pin important measurements while editing.'],
    mediaKind: 'reference',
  },
  {
    name: 'Section Analysis',
    purpose: 'Cuts the display view temporarily so you can inspect internal geometry.',
    useWhen: 'checking walls, holes, fit, and hidden features without modifying the actual body.',
    steps: ['Choose Inspect → Section Analysis.', 'Pick a plane or face.', 'Drag the section depth and save the analysis if needed.'],
    mediaKind: 'reference',
  },
]

const meshTools: FusionTool[] = [
  {
    name: 'Insert Mesh',
    purpose: 'Imports STL, OBJ, or 3MF mesh files into the design.',
    useWhen: 'bringing in 3D scans, downloaded printable files, or mesh references.',
    steps: ['Use Insert → Insert Mesh.', 'Select file and units.', 'Place and orient the mesh before editing.'],
    mediaKind: 'image',
  },
  {
    name: 'Create Mesh Section Sketch',
    purpose: 'Slices a mesh to create sketch curves that can be used for reverse engineering.',
    useWhen: 'you need clean sketch geometry from a scan or STL cross-section.',
    steps: ['Select the mesh body.', 'Choose a section plane.', 'Fit curves to useful outlines and rebuild as parametric sketches.'],
  },
  {
    name: 'Convert Mesh',
    purpose: 'Converts a mesh body into BRep/solid-style geometry when the mesh is simple enough.',
    useWhen: 'you need to add parametric solid features to an STL or scan.',
    steps: ['Repair and reduce first if the mesh is dense.', 'Choose faceted or prismatic conversion.', 'Inspect the converted body for bad faces.'],
    watchFor: 'Very high triangle counts can fail or make Fusion slow.',
  },
  {
    name: 'Reduce',
    purpose: 'Lowers the triangle count of a mesh.',
    useWhen: 'an imported mesh is too heavy to edit or convert.',
    steps: ['Select mesh faces or body.', 'Choose percentage, face count, or tolerance reduction.', 'Preserve sharp boundaries when accuracy matters.'],
  },
  {
    name: 'Remesh',
    purpose: 'Rebuilds mesh triangles with more even distribution.',
    useWhen: 'a scan has messy triangles or needs more uniform mesh quality before sculpting or conversion.',
    steps: ['Select mesh body.', 'Set target edge length or density.', 'Preview the result before accepting.'],
  },
  {
    name: 'Smooth',
    purpose: 'Softens noisy mesh surfaces.',
    useWhen: 'cleaning scan noise or making organic mesh surfaces less faceted.',
    steps: ['Select faces or whole mesh.', 'Set smooth strength and iterations.', 'Avoid over-smoothing important edges.'],
  },
  {
    name: 'Plane Cut',
    purpose: 'Cuts a mesh with a plane and optionally fills the cut.',
    useWhen: 'flattening the bottom of a scan, trimming an STL, or preparing a model for printing.',
    steps: ['Pick the mesh body.', 'Position the cutting plane.', 'Choose trim side and fill behavior.'],
  },
  {
    name: 'Separate',
    purpose: 'Splits disconnected mesh shells into separate bodies.',
    useWhen: 'an imported file contains multiple loose parts in one mesh body.',
    steps: ['Select the mesh.', 'Run Separate.', 'Rename and organize the resulting bodies.'],
  },
  {
    name: 'Combine',
    purpose: 'Joins multiple mesh bodies into a single mesh.',
    useWhen: 'you need a single printable mesh after edits or imports.',
    steps: ['Select mesh bodies.', 'Choose combine operation.', 'Repair non-manifold regions afterward.'],
  },
  {
    name: 'Repair',
    purpose: 'Detects and fixes holes, non-manifold edges, self-intersections, and orientation problems.',
    useWhen: 'a mesh will not convert, print, or boolean cleanly.',
    steps: ['Run mesh repair analysis.', 'Review highlighted errors.', 'Accept automatic fixes or repair problem areas manually.'],
    mediaKind: 'reference',
  },
  {
    name: 'Erase and Fill',
    purpose: 'Deletes selected mesh faces and fills the opening.',
    useWhen: 'removing scan artifacts, logos, supports, or unwanted protrusions.',
    steps: ['Select unwanted faces.', 'Erase and fill the hole.', 'Smooth or remesh the filled region if needed.'],
  },
  {
    name: 'Make Closed Mesh',
    purpose: 'Attempts to close open boundaries in a mesh.',
    useWhen: 'a scan or STL has holes and needs to become watertight.',
    steps: ['Select mesh body.', 'Run Make Closed Mesh.', 'Inspect boundaries and repair remaining holes.'],
  },
  {
    name: 'Reverse Normal',
    purpose: 'Flips mesh face normals so the outside direction is correct.',
    useWhen: 'a mesh appears inside-out, dark, or behaves incorrectly in printing/slicing.',
    steps: ['Select affected faces or body.', 'Run Reverse Normal.', 'Use display modes to verify outside faces point outward.'],
  },
  {
    name: 'Edit Direct',
    purpose: 'Moves mesh vertices, edges, or faces directly.',
    useWhen: 'making local mesh adjustments without rebuilding the model parametrically.',
    steps: ['Select vertex, edge, or face selection mode.', 'Move the selected area.', 'Check for distorted triangles after editing.'],
  },
]

const sketchTools: FusionTool[] = [
  {
    name: 'Line',
    purpose: 'Draws straight sketch segments.',
    useWhen: 'creating profiles, construction geometry, centerlines, and reference edges.',
    steps: ['Click the start point.', 'Click endpoints for each segment.', 'Press Esc or click the checkmark to finish.'],
  },
  {
    name: 'Two-Point Rectangle',
    purpose: 'Creates a rectangle from opposite corners.',
    useWhen: 'making plates, slots, blocks, tabs, and box profiles quickly.',
    steps: ['Pick first corner.', 'Pick opposite corner.', 'Dimension width and height.'],
  },
  {
    name: 'Center Rectangle',
    purpose: 'Creates a rectangle from its center point.',
    useWhen: 'building symmetric parts around the origin.',
    steps: ['Pick center.', 'Pick a corner.', 'Dimension both directions from the center.'],
  },
  {
    name: 'Center Diameter Circle',
    purpose: 'Creates a circle from center and diameter.',
    useWhen: 'making holes, bosses, shafts, posts, and circular references.',
    steps: ['Pick center point.', 'Set diameter by dragging or typing.', 'Constrain center to useful references.'],
  },
  {
    name: 'Two-Point Circle',
    purpose: 'Creates a circle using two diameter endpoints.',
    useWhen: 'a circle must span a known width or fit between two points.',
    steps: ['Pick first diameter point.', 'Pick second diameter point.', 'Add constraints if the endpoints must stay attached.'],
  },
  {
    name: 'Three-Point Circle',
    purpose: 'Creates a circle through three points.',
    useWhen: 'fitting a circle to existing geometry or reverse-engineering an arc.',
    steps: ['Pick three points on the desired circumference.', 'Dimension or constrain the result.', 'Use sparingly when a centered circle is clearer.'],
  },
  {
    name: 'Arc',
    purpose: 'Creates circular arc segments.',
    useWhen: 'rounding sketch profiles, drawing curved slots, or defining partial circular features.',
    steps: ['Choose three-point, center-point, or tangent arc.', 'Place points.', 'Constrain tangent and dimension radius.'],
  },
  {
    name: 'Polygon',
    purpose: 'Creates inscribed, circumscribed, or edge-based polygons.',
    useWhen: 'making hex nuts, bolt heads, knobs, vents, and patterned facets.',
    steps: ['Choose polygon type.', 'Set side count.', 'Place center/edge and dimension size.'],
  },
  {
    name: 'Ellipse',
    purpose: 'Creates elliptical profiles.',
    useWhen: 'making organic openings, labels, grip shapes, or aesthetic features.',
    steps: ['Pick center.', 'Set major axis.', 'Set minor axis and dimension both.'],
  },
  {
    name: 'Slot',
    purpose: 'Creates rounded-end slots.',
    useWhen: 'designing adjustable mounting holes or sliding clearances.',
    steps: ['Choose center-to-center, overall, or three-point slot.', 'Place points.', 'Dimension length and width.'],
  },
  {
    name: 'Spline',
    purpose: 'Creates smooth freeform curves.',
    useWhen: 'drawing ergonomic, aesthetic, or organic shapes.',
    steps: ['Place fit points or control points.', 'Adjust handles.', 'Constrain endpoints and avoid unnecessary points.'],
    watchFor: 'Too many spline points make editing difficult and can create lumpy surfaces.',
  },
  {
    name: 'Conic Curve',
    purpose: 'Creates controlled curves using endpoints and a rho value.',
    useWhen: 'you need smoother, more predictable transitions than a freeform spline.',
    steps: ['Pick start and end.', 'Pick shoulder/control point.', 'Adjust rho for curvature.'],
  },
  {
    name: 'Point',
    purpose: 'Places sketch points.',
    useWhen: 'locating holes, patterns, construction references, and projected locations.',
    steps: ['Place the point.', 'Constrain or dimension its position.', 'Use it as a feature reference.'],
  },
  {
    name: 'Text',
    purpose: 'Adds editable sketch text.',
    useWhen: 'engraving labels, embossing logos, marking parts, or creating text-shaped geometry.',
    steps: ['Draw a text box or select a path.', 'Enter text and font settings.', 'Explode text only if you need raw curves.'],
  },
  {
    name: 'Project',
    purpose: 'Copies edges, faces, or points from existing geometry into the active sketch.',
    useWhen: 'a sketch must align to existing model geometry.',
    steps: ['Start a sketch.', 'Choose Project/Include → Project.', 'Select edges or faces to reference.'],
    mediaKind: 'reference',
  },
  {
    name: 'Intersect',
    purpose: 'Creates sketch curves where bodies or faces intersect the sketch plane.',
    useWhen: 'capturing cross-sections from solids or meshes.',
    steps: ['Start a sketch on the section plane.', 'Choose Intersect.', 'Select bodies/faces and use resulting curves as references.'],
  },
  {
    name: 'Offset',
    purpose: 'Creates parallel curves at a set distance from selected sketch geometry.',
    useWhen: 'adding wall thickness, clearances, grooves, and nested profiles.',
    steps: ['Select sketch curves.', 'Drag or type offset distance.', 'Chain-select connected curves when needed.'],
  },
  {
    name: 'Mirror',
    purpose: 'Reflects sketch geometry across a line.',
    useWhen: 'creating symmetric sketches while only drawing one side.',
    steps: ['Select geometry.', 'Select a mirror line, usually construction geometry.', 'Confirm and keep original constraints clean.'],
  },
  {
    name: 'Circular Pattern',
    purpose: 'Repeats sketch geometry around a center point.',
    useWhen: 'creating bolt circles, vents, spokes, or repeated holes.',
    steps: ['Select objects.', 'Pick center point.', 'Set quantity and angle.'],
  },
  {
    name: 'Rectangular Pattern',
    purpose: 'Repeats sketch geometry in rows and columns.',
    useWhen: 'creating grids, ventilation holes, tabs, and repeated slots.',
    steps: ['Select objects.', 'Set directions.', 'Enter spacing and quantity.'],
  },
  {
    name: 'Move/Copy',
    purpose: 'Moves, rotates, or copies sketch geometry.',
    useWhen: 'repositioning imported or drawn sketch entities.',
    steps: ['Select sketch objects.', 'Choose move type.', 'Use Create Copy only when duplicating.'],
  },
  {
    name: 'Trim',
    purpose: 'Cuts away unwanted portions of sketch geometry.',
    useWhen: 'cleaning intersections and turning construction sketches into closed profiles.',
    steps: ['Activate Trim.', 'Hover the segment to remove.', 'Click only the pieces that should disappear.'],
  },
  {
    name: 'Extend',
    purpose: 'Lengthens sketch geometry until it meets another curve.',
    useWhen: 'closing gaps or forcing lines/arcs to reach boundaries.',
    steps: ['Activate Extend.', 'Hover the curve end.', 'Click to extend to the nearest valid boundary.'],
  },
  {
    name: 'Break',
    purpose: 'Splits sketch curves at intersections or selected points.',
    useWhen: 'separating one continuous curve into editable segments.',
    steps: ['Activate Break.', 'Select curve at break location.', 'Trim or constrain the resulting segments.'],
  },
  {
    name: 'Sketch Scale',
    purpose: 'Resizes selected sketch geometry.',
    useWhen: 'adjusting imported sketch artwork or rough profiles.',
    steps: ['Select sketch entities.', 'Pick scale point.', 'Enter scale factor.'],
  },
  {
    name: 'Sketch Fillet',
    purpose: 'Adds rounded corners inside a sketch.',
    useWhen: 'rounding a profile before extrusion when the radius is part of the sketch logic.',
    steps: ['Select two intersecting sketch curves.', 'Enter radius.', 'Keep equal constraints when corners should match.'],
  },
  {
    name: 'Sketch Chamfer',
    purpose: 'Adds beveled sketch corners.',
    useWhen: 'creating angled profile corners before extruding.',
    steps: ['Select intersecting lines.', 'Choose equal distance, two distances, or distance/angle.', 'Dimension the chamfer.'],
  },
  {
    name: 'Dimension',
    purpose: 'Locks sizes and distances with exact values or parameter names.',
    useWhen: 'turning rough sketch geometry into manufacturing-ready intent.',
    steps: ['Press D or choose Dimension.', 'Select geometry.', 'Enter a value, equation, or named parameter.'],
    mediaKind: 'reference',
  },
  {
    name: 'Constraints',
    purpose: 'Defines relationships such as horizontal, vertical, parallel, perpendicular, tangent, concentric, equal, coincident, midpoint, symmetry, fix, and construction.',
    useWhen: 'you need sketches that update predictably when dimensions change.',
    steps: ['Select the geometry involved.', 'Apply the correct relationship.', 'Watch sketch color to confirm it becomes fully constrained.'],
    mediaKind: 'reference',
  },
]

const toolReferenceBlocks: LessonBlock[] = [
  {
    type: 'p',
    body: 'This quick reference is built to be used side-by-side with Fusion 360. Open one tool at a time, read what it does, then practice the same operation on a simple part. Media slots are already wired for GIFs, footage, pictures, and reference graphics so production assets can be dropped in without changing the lesson layout.',
  },
  {
    type: 'fusion360Mock',
    variant: 'workspace-map',
    caption: 'Fusion 360 ships these workspaces. Design is where most modeling happens; the others activate task-specific toolbars.',
    helpUrl: HELP_SEARCH('user interface workspace overview'),
    tutorialQuery: 'interface tour workspaces toolbar browser timeline',
  },
  { type: 'h', body: 'Solid workspace tools' },
  ...solidTools.map((tool) => toolBlock('Solid', tool)),
  { type: 'h', body: 'Mesh workspace tools' },
  ...meshTools.map((tool) => toolBlock('Mesh', tool)),
  { type: 'h', body: 'Sketch tools' },
  ...sketchTools.map((tool) => toolBlock('Sketch', tool)),
  {
    type: 'checklist',
    items: [
      'I can name what each Solid tool is for and identify whether it creates, modifies, constructs, or inspects geometry',
      'I understand when mesh tools are appropriate and when to rebuild a scan as clean solid geometry',
      'I can create fully constrained sketches using dimensions and constraints instead of dragging by eye',
      'I know which media asset needs to be produced for each tool demo slot',
    ],
  },
]

export const fusion360Lessons: LessonDef[] = [
  {
    id: 'fusion-orientation',
    number: 1,
    title: 'Orientation and setup',
    subtitle: 'Know the interface before you model anything.',
    goal: 'You can open Fusion 360, create a project, navigate the canvas, and understand the timeline/browser workflow.',
    endState: 'A saved design file with named components, visible origin planes, and a clean workspace ready for modeling.',
    estMinutes: 25,
    blocks: [
      {
        type: 'p',
        body: 'Fusion 360 is parametric CAD: the order of your features matters. The browser organizes components and bodies; the timeline stores every operation; sketches define intent; and parameters let a model update without redrawing it.',
      },
      {
        type: 'fusion360Mock',
        variant: 'interface-tour',
        caption: 'Animated tour: toolbar tabs, browser tree, modeling canvas, view cube, and timeline at the bottom.',
        helpUrl: HELP_SEARCH('user interface tour'),
        tutorialQuery: 'beginner interface tour orbit pan zoom',
      },
      { type: 'jargon', term: 'Component', plain: 'A part or assembly container with its own origin, sketches, bodies, joints, and timeline references. Use components for anything that might move or be manufactured separately.' },
      { type: 'jargon', term: 'Body', plain: 'A single chunk of geometry inside a component. Bodies are usually intermediate solids until you decide how the product is assembled.' },
      { type: 'jargon', term: 'Timeline', plain: 'The row of feature icons at the bottom. It records modeling history so earlier sketches and features can be edited later.' },
      { type: 'step', n: 1, title: 'Create the course project', body: 'Open Fusion 360, create a project named Pathfinder Fusion 360, then create a new design named Tool Practice.' },
      { type: 'step', n: 2, title: 'Set units and navigation', body: 'Open Document Settings, set units to millimeters or inches based on your shop standard, and practice orbit, pan, zoom, home view, and fit view.' },
      { type: 'step', n: 3, title: 'Make the first component', body: 'Right-click the top design node, choose New Component, and name it Practice Bracket. Activate the component before sketching.' },
      { type: 'step', n: 4, title: 'Save early', body: 'Save the design before modeling. Fusion versions every save, so use meaningful milestones like v01 setup, v02 sketch, v03 solid body.' },
      {
        type: 'callout',
        callout: {
          kind: 'tip',
          title: 'Rule for beginners',
          body: 'One real part equals one component. Sketch inside the active component. Rename important sketches and features before the timeline gets crowded.',
        },
      },
      {
        type: 'docLink',
        title: 'Autodesk Fusion learning and support',
        description: 'Official Autodesk Fusion help, getting-started articles, and workspace documentation.',
        url: 'https://help.autodesk.com/view/fusion360/ENU/',
        source: 'Autodesk Help',
      },
      {
        type: 'checklist',
        items: [
          'I created a Fusion project and saved a new design',
          'I know where the browser, timeline, view cube, toolbar, and document settings are',
          'I can orbit, pan, zoom, fit, and return to home view',
          'I created and activated a named component before sketching',
        ],
      },
    ],
  },
  {
    id: 'tool-quick-reference',
    number: 2,
    title: 'Tool Quick Reference',
    subtitle: 'Every major Solid, Mesh, and Sketch tool — what it does, when to use it, and how to practice it.',
    goal: 'You can identify and use the major tools in Fusion 360’s Solid, Mesh, and Sketch workflows.',
    endState: 'You have a complete side-by-side reference for the toolbars and the media slots needed for GIFs, footage, pictures, and reference graphics.',
    estMinutes: 90,
    blocks: toolReferenceBlocks,
  },
  {
    id: 'sketching-from-zero',
    number: 3,
    title: 'Sketching from zero',
    subtitle: 'The fastest way to stop fighting Fusion is to fully constrain your sketches.',
    goal: 'You can draw clean sketch profiles using dimensions, constraints, construction geometry, projection, and parameters.',
    endState: 'A fully constrained bracket sketch that updates when width, height, hole spacing, and material thickness change.',
    estMinutes: 40,
    blocks: [
      { type: 'p', body: 'Good Fusion models come from good sketches. A sketch should describe design intent, not just shape. If a line should stay horizontal, constrain it. If two holes should stay equal, constrain and dimension them. If a thickness may change, use a parameter.' },
      {
        type: 'fusion360Mock',
        variant: 'sketch-constraints',
        caption: 'Lines start blue (under-constrained), then dimensions and constraints lock the geometry — sketch turns black.',
        helpUrl: HELP_SEARCH('sketch constraints dimensions'),
        tutorialQuery: 'fully constrained sketch constraints dimensions',
      },
      { type: 'step', n: 1, title: 'Create named parameters', body: 'Open Modify → Change Parameters. Add width, height, thickness, holeDiameter, and holeSpacing. Use real starter values.' },
      { type: 'step', n: 2, title: 'Sketch only half when symmetric', body: 'Create a centerline through the origin. Draw one side of the bracket and mirror it across the centerline.' },
      { type: 'step', n: 3, title: 'Dimension with parameter names', body: 'Use D for dimension, then type names like width, thickness, or holeSpacing instead of raw numbers.' },
      { type: 'step', n: 4, title: 'Apply constraints deliberately', body: 'Use horizontal/vertical, equal, concentric, midpoint, tangent, and symmetry constraints until the sketch is fully constrained.' },
      { type: 'step', n: 5, title: 'Stress test the sketch', body: 'Change parameters one at a time. If geometry flips, overlaps, or moves unexpectedly, add the missing constraint before continuing.' },
      {
        type: 'details',
        summary: 'Sketch troubleshooting checklist',
        blocks: [
          { type: 'list', items: ['Blue geometry means under-constrained; black geometry means fully constrained.', 'Red/yellow warnings mean a dimension or constraint conflicts with another one.', 'If a profile will not extrude, zoom in for tiny gaps or overlapping lines.', 'Use construction lines for references that should not become solid profiles.'] },
        ],
      },
      { type: 'checklist', items: ['My bracket sketch is fully constrained', 'I used at least three named parameters', 'Changing the width updates both sides evenly', 'Hole centers stay symmetric and correctly spaced'] },
    ],
  },
  {
    id: 'solid-modeling-workflow',
    number: 4,
    title: 'Solid modeling workflow',
    subtitle: 'Turn clean sketches into editable, manufacturable bodies.',
    goal: 'You can create a bracket body using extrude, hole, fillet, chamfer, shell, combine, split, and inspection tools.',
    endState: 'A finished practice bracket with named timeline features and inspected dimensions.',
    estMinutes: 55,
    blocks: [
      { type: 'p', body: 'A solid workflow is a chain: sketch → base feature → secondary cuts/additions → edge treatments → inspection. Model big forms first, details second, and fillets/chamfers last unless they control other geometry.' },
      {
        type: 'fusion360Mock',
        variant: 'solid-extrude',
        caption: 'Sketch profile → extrude into a solid → fillet sharp edges. The same three-step rhythm covers most parts.',
        helpUrl: HELP_SEARCH('solid modeling create modify'),
        tutorialQuery: 'solid modeling extrude fillet shell hole',
      },
      { type: 'step', n: 1, title: 'Extrude the base', body: 'Select the closed bracket profile and extrude it by the thickness parameter as a New Body or Join inside the active component.' },
      { type: 'step', n: 2, title: 'Add precise holes', body: 'Use the Hole tool on sketch points or create circles and cut extrude. Prefer Hole for fasteners because it stores hardware intent.' },
      { type: 'step', n: 3, title: 'Add functional clearances', body: 'Use Offset Face or Press Pull to tune pockets and clearances. Keep important values parameter-driven.' },
      { type: 'step', n: 4, title: 'Add edge treatment last', body: 'Apply fillets to stress-prone or touch edges. Apply chamfers to lead-ins and machined edges. Rename features like fillet-touch-edges.' },
      { type: 'step', n: 5, title: 'Inspect before moving on', body: 'Use Measure and Section Analysis to verify wall thickness, hole spacing, and internal clearance.' },
      { type: 'callout', callout: { kind: 'warn', title: 'Fillets can break later edits', body: 'If a model starts failing, suppress or roll back late fillets/chamfers first. They are usually the most fragile timeline features.' } },
      { type: 'checklist', items: ['The base body is driven by a sketch and named parameters', 'Holes are centered and dimensioned', 'Fillets and chamfers are applied intentionally', 'Measure confirms the part matches the design intent'] },
    ],
  },
  {
    id: 'mesh-workflow',
    number: 5,
    title: 'Mesh workflow and reverse engineering',
    subtitle: 'How to work with STL files and scans without getting stuck.',
    goal: 'You can import, inspect, repair, simplify, cut, and convert mesh files when appropriate.',
    endState: 'A cleaned mesh reference and a simple reverse-engineered solid feature built from mesh section sketches.',
    estMinutes: 45,
    blocks: [
      { type: 'p', body: 'Meshes are triangle surfaces. Solids are parametric boundary representations. Fusion can work with both, but they behave differently. The safest beginner workflow is: import mesh → orient/scale → repair/reduce → section sketch → rebuild important features as sketches and solids.' },
      {
        type: 'fusion360Mock',
        variant: 'mesh-cleanup',
        caption: 'Imported STL meshes are dense. Reduce, repair, then convert to BRep when you need real solid features.',
        helpUrl: HELP_SEARCH('mesh workspace import repair convert'),
        tutorialQuery: 'mesh workspace import STL repair reduce convert',
      },
      { type: 'step', n: 1, title: 'Import and set units', body: 'Insert Mesh and verify units immediately. Many STL files have no real units, so a model can import 25.4× too large or too small.' },
      { type: 'step', n: 2, title: 'Repair before editing', body: 'Run Repair to fix holes, non-manifold edges, flipped normals, and self-intersections before conversion or printing.' },
      { type: 'step', n: 3, title: 'Reduce only as much as needed', body: 'Use Reduce to make the mesh manageable while preserving important edges and curves.' },
      { type: 'step', n: 4, title: 'Cut and flatten references', body: 'Use Plane Cut to remove uneven scan bottoms or isolate the useful section of the model.' },
      { type: 'step', n: 5, title: 'Rebuild parametric geometry', body: 'Use Create Mesh Section Sketch, then trace clean lines/arcs/circles and extrude/revolve them as normal solid features.' },
      { type: 'callout', callout: { kind: 'tip', title: 'Convert mesh only when it helps', body: 'Converting a messy scan directly often creates thousands of tiny faces. For editable CAD, section and rebuild the important features instead.' } },
      { type: 'checklist', items: ['I can import a mesh at correct scale', 'I can repair and reduce a mesh', 'I can plane cut a mesh cleanly', 'I can create a mesh section sketch and rebuild a solid feature from it'] },
    ],
  },
  {
    id: 'guided-mini-project',
    number: 6,
    title: 'Guided mini project: adjustable wall hook',
    subtitle: 'Use Sketch, Solid, and Mesh reference skills in one complete beginner project.',
    goal: 'You can complete a start-to-finish Fusion 360 design using the same sequence professionals use.',
    endState: 'A parametric wall hook with mounting holes, rounded edges, inspected dimensions, and export-ready files.',
    estMinutes: 75,
    blocks: [
      { type: 'p', body: 'This project ties the course together. You will model a simple wall hook with parameters, a fully constrained sketch, solid features, optional mesh reference, and export checks.' },
      {
        type: 'fusion360Mock',
        variant: 'parametric-timeline',
        caption: 'Each feature you add appears on the timeline. Edit any earlier feature and the rest of the part rebuilds automatically.',
        helpUrl: HELP_SEARCH('beginner project export step stl'),
        tutorialQuery: 'beginner full project parametric export step stl',
      },
      { type: 'step', n: 1, title: 'Define parameters', body: 'Create hookDepth, hookHeight, materialThickness, screwDiameter, screwSpacing, filletRadius, and clearance.' },
      { type: 'step', n: 2, title: 'Sketch the side profile', body: 'Create a side sketch for the hook silhouette. Use lines, arcs, tangent constraints, dimensions, and construction geometry.' },
      { type: 'step', n: 3, title: 'Extrude the hook body', body: 'Extrude the profile to materialThickness. Rename the feature base-extrude.' },
      { type: 'step', n: 4, title: 'Add mounting plate and holes', body: 'Sketch the front plate, extrude it, then use Hole for two screw holes driven by screwSpacing and screwDiameter.' },
      { type: 'step', n: 5, title: 'Round and inspect', body: 'Add fillets to touch edges and stress corners. Use Section Analysis and Measure to verify thickness and hole spacing.' },
      { type: 'step', n: 6, title: 'Export for manufacturing', body: 'Export STEP for CAD sharing and STL/3MF for 3D printing. Name files with units and version, such as wall-hook-mm-v01.step.' },
      { type: 'details', summary: 'Acceptance criteria', blocks: [{ type: 'list', items: ['Parameters resize the hook without breaking the timeline.', 'Sketches are fully constrained.', 'Mounting holes are centered and equal.', 'Edges are comfortable to touch.', 'Exported files use clear names and correct units.'] }] },
      { type: 'checklist', items: ['I completed the wall hook model', 'I changed at least two parameters and the model updated correctly', 'I inspected dimensions before export', 'I exported both STEP and STL/3MF formats'] },
    ],
  },
]

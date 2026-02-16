# Skill: Core Components Folder

## Purpose

Guides working with `src/core/components`: development-only components and rendering helpers. Use when adding dev tooling, composition entry wrappers, or shared core-level components. Not to be confused with `src/components` (composition UI primitives).

## Applies To

- `src/core/components/` (root)
- `dev/`: CompositionEntry, dev wrappers
- Consumers: development roots, local preview setup, developer tooling

## Inputs

- Folder readMe: `components/.docs/readMe.md`
- Remotion Composition model
- testData, datasetProcessing for CompositionEntry

## Process

### 1. Understand the Structure

```
src/core/components/
└── dev/                 # Development-only
    ├── CompositionEntry.tsx   # Mount compositions in isolation
    └── .docs/readMe.md
```

### 2. Core Components vs src/components

| core/components | src/components |
|-----------------|----------------|
| Dev-only, tooling | Composition UI primitives |
| CompositionEntry for isolation testing | AnimatedContainer, AnimatedText, backgrounds |
| Used by preview roots | Used by templates, compositions |
| Not shipped to production compositions | Shipped in video output |

### 3. CompositionEntry

- Props: templateId, variant, sportName, datasetID, templateComponent
- Uses processDatasetForTemplate, calculateDuration from utils/datasetProcessing
- Renders Remotion Composition with testData for local preview
- Used to mount and test compositions in isolation during development

### 4. When to Add Here vs src/components

| Add to core/components | Add to src/components |
|------------------------|------------------------|
| Dev wrappers, composition entry | AnimatedContainer, AnimatedText, AnimatedImage |
| Testing/verification helpers | Layout, backgrounds, typography |
| Shared rendering for dev roots | UI that appears in final video |

### 5. When Adding a New Dev Component

1. Create in dev/ (or new subfolder if warranted)
2. Export from dev/index or components index
3. Update components readMe (Files, Child Modules)

## Output

- Correct placement of dev vs composition components
- Ability to add dev tooling when needed

## Rules

- Keep dev-only; do not mix with composition primitives
- Prefer src/components for anything that renders in final video output

## References

- components: `src/core/components/.docs/readMe.md`
- dev: `src/core/components/dev/.docs/readMe.md`
- Parent: `core-folder-structure.md`
- src/components: `components-folder-structure.md`

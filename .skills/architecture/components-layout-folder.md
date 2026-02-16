# Skill: Components Layout Folder

## Purpose

Guides working with `src/components/layout`: screen containers, headers, title-screen permutations, sponsors. Use when assembling scenes with OneColumn, header variants, title screens, or RouteToComposition.

## Applies To

- `src/components/layout/` (root)
- `screen/`: OneColumn, TwoColumn — RouteToComposition, ThemeContext.layout.heights
- `main/header/`: header variants (VerticalStack, TwoColumnLayout); slots: Title, Logo, Name
- `main/Timer/`: ProgressTimer
- `titleScreen/`: title-screen variants with Logo, Title, Name, PrimarySponsor slots
- `sponsors/`: placeholder for sponsor layout components
- Consumers: compositions, templates, RouteToComposition (core/utils/routing)

## Inputs

- ThemeContext (layout.heights)
- VideoDataContext
- core/utils/routing (RouteToComposition)
- Folder readMe: `layout/.docs/README.md`

## Process

### 1. Understand the Structure

```
src/components/layout/
├── screen/           # OneColumn, TwoColumn
├── main/
│   ├── header/      # variants: VerticalStack, TwoColumnLayout
│   │   └── variants/
│   └── Timer/       # ProgressTimer
├── titleScreen/     # variants: VerticalStack, TwoColumnLayout
│   └── variants/
└── sponsors/         # placeholder
```

### 2. Slot Composition Pattern

- Layout components accept **slots** (Title, Logo, Name, PrimarySponsor) as React children or props
- Compositions pass AnimatedText, AnimatedImage, AnimatedContainer into slots
- getAlignmentClasses(alignment) for vertical/horizontal alignment

### 3. Screen Wrappers (OneColumn, TwoColumn)

- Use ThemeContext.layout.heights for header/content split
- **RouteToComposition**: renders the active composition based on routing (composition ID + template ID)
- ProgressTimer for timer layouts
- Header slot; content area contains RouteToComposition()

### 4. Header Variants

- **VerticalStack**: stacked Title, Logo, Name
- **TwoColumnLayout**: two-column arrangements
- Exports: VerticalHeader, VerticalHeaderTitleLogoName, TwoColumnHeader*, Reverse*
- Shared types and getAlignmentClasses in types.ts

### 5. Title Screen Variants

- Same slot pattern: Logo, Title, Name, PrimarySponsor
- VerticalStack and TwoColumnLayout variants
- Consumed by compositions for intro/outro screens

### 6. When Adding a New Layout Variant

1. Create in header/variants/ or titleScreen/variants/
2. Use slot props (Title, Logo, Name, etc.)
3. Use getAlignmentClasses for alignment
4. Export from parent index

### 7. RouteToComposition

- Lives in `core/utils/routing.tsx`
- Reads composition ID and template ID from context
- Layout screen wrappers render it in the content area
- Compositions register via routing config

## Output

- Correct use of OneColumn, header, titleScreen
- Understanding of slot composition pattern
- Ability to add layout variants

## Rules

- Layout is presentational; slots receive AnimatedContainer, AnimatedText, AnimatedImage
- ThemeContext.layout.heights drives screen dimensions
- RouteToComposition belongs in screen content area

## References

- layout: `src/components/layout/.docs/README.md`
- screen: `src/components/layout/screen/.docs/README.md`
- header: `src/components/layout/main/header/.docs/README.md`
- titleScreen: `src/components/layout/titleScreen/.docs/README.md`
- Parent: `components-folder-structure.md`
- routing: `src/core/utils/routing.tsx`

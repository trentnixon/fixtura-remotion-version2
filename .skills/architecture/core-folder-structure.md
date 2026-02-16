# Skill: Core Folder Structure

## Purpose

Guides working with `src/core`: understanding the directory layout, provider hierarchy, data types, and foundational utilities. Use when navigating, extending, or debugging the core system that feeds templates and compositions.

## Applies To

- `src/core/` (root)
- Child modules: components, context, hooks, types, utils
- Consumers: templates, compositions, components

## Inputs

- Understanding of React Context and Remotion composition model
- Folder readMe: `core/.docs/readMe.md`
- Child skill references: see References section

## Process

### 1. Understand the Folder Hierarchy

```
src/core/
├── components/     # Dev-only: CompositionEntry, dev wrappers
├── context/        # Providers: Global, VideoData, Theme, Style, Font, Layout, Animation
├── hooks/          # Placeholder for shared hooks (Theme, Layout, Animation, VideoData)
├── types/          # Data schemas, sport types, FixturaDataset
└── utils/          # colorSystem, createThemeUtils, designPalettes, fonts, routing, dataProcessing
```

### 2. Cross-Dependencies

| Module | Depends On | Provides |
|--------|------------|----------|
| context | types, utils (colorSystem, designPalettes, fonts) | ThemeContext, VideoDataContext, etc. |
| utils | types | colorSystem, routing, datasetProcessing |
| templates/compositions | context, types, utils | — |

### 3. Key Flows

- **Data**: FixturaDataset → VideoDataContext → compositions
- **Theme**: settings + video.appearance → createColorSystem → ThemeContext
- **Routing**: composition ID + template ID → RouteToComposition → sport module → variant component

### 4. When Adding to Core

1. **New context**: Add to context/; nest in BaseTemplate per core-context-folder
2. **New type**: Add to types/data or types/sport per core-types-folder
3. **New utility**: Prefer utils/ subfolder (colorSystem, fonts, etc.); routing/compositionMapping in utils root
4. **New hook**: Add to hooks/ when shared across templates/components

### 5. Child Skills

- **context**: core-context-folder.md
- **types**: core-types-folder.md
- **utils**: core-utils-folder.md, color-system-folder, create-theme-utils-folder, design-palettes-folder, fonts-folder
- **components**: core-components-folder.md
- **hooks**: core-hooks-folder.md

## Output

- Correct understanding of core layout and flow
- Ability to add or modify context, types, or utilities in the right place

## Rules

- Core provides; templates and compositions consume
- Prefer centralizing color logic in colorSystem; re-export via createThemeUtils when needed
- Context provider order matters; see core-context-folder

## References

- Core root: `src/core/.docs/readMe.md`
- Roadmap: `src/core/.docs/DevelopmentRoadMap.md`
- Child skills:
  - `core-context-folder.md`
  - `core-types-folder.md`
  - `core-utils-folder.md`
  - `color-system-folder.md`
  - `create-theme-utils-folder.md`
  - `design-palettes-folder.md`
  - `fonts-folder.md`

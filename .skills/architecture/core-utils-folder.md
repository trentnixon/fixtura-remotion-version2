# Skill: Core Utils Folder

## Purpose

Guides working with `src/core/utils`: foundational utilities including routing, composition mapping, data processing, generic helpers, and child modules (colorSystem, createThemeUtils, designPalettes, fonts). Use when adding routing entries, data normalization, or choosing between utils subfolders.

## Applies To

- `src/core/utils/` (root)
- Root files: routing.tsx, compositionMapping.ts, datasetProcessing.ts, dataProcessing.ts, classNames, copy, general, helpers, objectUtils, colors, themeColorUtils, environment, PlaceholderComponent
- Child modules: colorSystem, createThemeUtils, designPalettes, fonts
- Consumers: templates, compositions, components, context

## Inputs

- Folder readMe: `utils/.docs/readMe.md`
- core/types for data shapes
- Sport composition modules (cricket, afl, netball)

## Process

### 1. Understand the Structure

```
src/core/utils/
├── routing.tsx           # RouteToComposition, SPORT_COMPOSITION_TYPES, SPORT_MODULES
├── compositionMapping.ts # datasetToCompositionMap, normalizeCompositionId
├── datasetProcessing.ts  # data normalization
├── dataProcessing.ts     # data normalization
├── classNames.ts, copy.ts, general.ts, helpers.ts, objectUtils.ts  # generic
├── colors.ts, themeColorUtils.ts  # color helpers (consider consolidate with colorSystem)
├── environment.ts        # env flags
├── PlaceholderComponent.tsx
├── colorSystem/          # palette generation (color-system-folder)
├── createThemeUtils/     # theme from inputs (create-theme-utils-folder)
├── designPalettes/       # curated palettes (design-palettes-folder)
└── fonts/                # font loading (fonts-folder)
```

### 2. Routing Flow

1. **RouteToComposition**: Reads composition ID + template ID from VideoDataContext
2. **getCompositionType(sport, compositionId)**: SPORT_COMPOSITION_TYPES maps composition ID → composition type
3. **getTemplateComponent**: SPORT_MODULES[sport][compositionType][templateId] → component
4. **compositionMapping**: normalizeCompositionId, datasetToCompositionMap, compositionToDatasetMap

### 3. When to Add vs Child Modules

| Need | Use |
|------|-----|
| Palette, gradient, color logic | colorSystem/ |
| Theme from primary/secondary | createThemeUtils/ |
| Curated design palettes | designPalettes/ |
| Font loading | fonts/ |
| New sport/composition routing | routing.tsx + compositionMapping.ts |
| Data normalization | datasetProcessing.ts, dataProcessing.ts |
| Generic helpers | root (classNames, helpers, etc.) |

### 4. When Adding a New Composition to Routing

1. Add composition ID to SPORT_COMPOSITION_TYPES in routing.tsx
2. Add dataset ↔ composition mapping in compositionMapping.ts (datasetToCompositionMap)
3. Ensure sport module exports the component (or template map) at the expected key
4. RouteToComposition will resolve automatically

### 5. Key Exports

- **routing**: RouteToComposition, SPORT_COMPOSITION_TYPES, SPORT_MODULES
- **compositionMapping**: normalizeCompositionId, datasetToCompositionMap, compositionToDatasetMap, extractCompositionType
- **datasetProcessing**: data normalization for video/dataset
- **dataProcessing**: data normalization helpers

### 6. Color Helpers (Root)

- colors.ts, themeColorUtils.ts — consider consolidating with colorSystem per DevelopmentRoadMap

## Output

- Correct placement of new utilities (root vs colorSystem/createThemeUtils/designPalettes/fonts)
- Ability to add routing entries for new compositions

## Rules

- Prefer colorSystem over root colors/themeColorUtils for color logic
- Routing and compositionMapping must stay in sync with sport modules
- Child modules have dedicated skills; use them for deep guidance

## References

- utils: `src/core/utils/.docs/readMe.md`
- Parent: `core-folder-structure.md`
- colorSystem: `color-system-folder.md`
- createThemeUtils: `create-theme-utils-folder.md`
- designPalettes: `design-palettes-folder.md`
- fonts: `fonts-folder.md`
- Core roadmap: `src/core/.docs/DevelopmentRoadMap.md`

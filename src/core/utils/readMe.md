# Folder Overview

Foundational utilities: color systems, theme creation, data processing, environment, assets, and general helpers used app-wide.

## Files

- `classNames.ts`, `copy.ts`, `general.ts`, `helpers.ts`, `objectUtils.ts`: generic helpers
- `colors.ts`, `themeColorUtils.ts`: color helpers
- `colorSystem/`: standardized palette generation and color operations
- `createThemeUtils/`: utilities to produce theme objects from inputs
- `designPalettes/`: curated design palettes and helpers
- `compositionMapping.ts`: mapping data to compositions/templates
- `dataProcessing.ts`, `datasetProcessing.ts`: data normalization utilities
- `environment.ts`: environment flags and runtime checks
- `fontLoader.ts`, `fonts.ts`: font loading and registration
- `images.ts`: image helpers
- `PlaceholderComponent.tsx`, `routing.tsx`: dev helpers for rendering/routing

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: used by `src/templates/*`, `src/components/*`, and core contexts
- Consumed by: anywhere needing color, theme, or data helpers

## Dependencies

- Internal: `colorSystem`, `createThemeUtils`, `designPalettes`
- External: color libraries (wrapped in utils), React (for tsx helpers)

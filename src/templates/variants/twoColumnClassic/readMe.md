# Folder Overview

TwoColumnClassic variant: a classic editorial layout with left/right content columns and alternate header treatments, extending the base template.

## Files

- `index.tsx`: entry point exporting the TwoColumnClassic variant composition
- `theme.ts`: variant-specific theme tokens and overrides
- `animations.ts`: animation presets used by variant components
- `components/`: all TwoColumnClassic variant building blocks

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: composes from `../../base`; uses `../../types` for config
- Consumed by: `../../registry.tsx`

## Dependencies

- Internal: `components`
- External: Remotion, React

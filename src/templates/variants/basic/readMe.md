# Folder Overview

Basic variant: a minimal, flexible template extending the base layout with light theming and simple animations.

## Files

- `index.tsx`: entry point exporting the Basic variant composition
- `theme.ts`: Basic-specific theme tokens and overrides
- `animations.ts`: animation presets used by Basic components
- `components/`: all Basic variant building blocks

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: composes from `../../base`; uses `../../types` for config
- Consumed by: `../../registry.tsx`

## Dependencies

- Internal: `components`
- External: Remotion, React

# Folder Overview

Classic variant: a traditional editorial layout with strong hierarchy and clean typography, extending the base template.

## Files

- `index.tsx`: entry point exporting the Classic variant composition
- `theme.ts`: Classic-specific theme tokens and overrides
- `animations.ts`: animation presets used by Classic components
- `components/`: all Classic variant building blocks

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: composes from `../../base`; uses `../../types` for config
- Consumed by: `../../registry.tsx`

## Dependencies

- Internal: `components`
- External: Remotion, React

# Folder Overview

Brickwork variant: a geometric, blocky style using bold panels and transitions, extending the base template.

## Files

- `index.tsx`: entry point exporting the Brickwork variant composition
- `theme.ts`: Brickwork-specific theme tokens and overrides
- `animations.ts`: animation presets used by Brickwork components
- `design/`: shared layout/visual primitives (masonry, spacing, colour roles, typography, LogoPlate, diagonal accents, texture overlay, featured row)
- `components/`: all Brickwork variant building blocks

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: composes from `../../base`; uses `../../types` for config
- Consumed by: `../../registry.tsx`

## Dependencies

- Internal: `components`
- External: Remotion, React

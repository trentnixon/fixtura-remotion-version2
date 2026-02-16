# Folder Overview

TwoColumnClassic variant: a classic editorial layout with left/right content columns and alternate header treatments, extending the base template.

## Files

- `index.tsx`: entry point exporting the TwoColumnClassic variant composition
- `theme.ts`: variant-specific theme tokens and overrides
- `animations.ts`: animation presets used by variant components
- `components/`: all TwoColumnClassic variant building blocks
- `utils/`: title lookup for simplified/alternative terms

## Child Modules

- **`components/`**: [components/.docs/readMe.md](./components/.docs/readMe.md)
- **`utils/`**: [utils/.docs/readMe.md](./utils/.docs/readMe.md)

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: composes from `../../base`; uses `../../types` for config
- Consumed by: `../../registry.tsx`

## Dependencies

- Internal: `components`, `utils`
- External: Remotion, React

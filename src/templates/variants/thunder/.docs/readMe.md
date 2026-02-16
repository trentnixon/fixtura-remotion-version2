# Folder Overview

Thunder variant: a dynamic, high-contrast style with impactful motion, extending the base template.

## Files

- `index.tsx`: entry point exporting the Thunder variant composition
- `theme.ts`: Thunder-specific theme tokens and overrides
- `animations.ts`: animation presets used by Thunder components
- `components/`: all Thunder variant building blocks
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

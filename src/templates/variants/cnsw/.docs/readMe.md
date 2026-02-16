# Folder Overview

CNSW variant: a clean, modern style extending the base template with navy and light tones.

## Files

- `index.tsx`: entry point exporting the CNSW variant composition
- `theme.ts`: CNSW-specific theme tokens and overrides
- `animations.ts`: animation presets used by CNSW components
- `components/`: all CNSW variant building blocks
- `utils/`: composition config for term swapping

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

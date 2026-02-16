# Folder Overview

Provides the foundational layout, shared components, and theme contract that all template variants extend. Contains the core template infrastructure including context providers, layout sequencing, and shared utilities.

## Skill

- `.skills/architecture/templates-base-folder.md` – Provider stack, BaseTemplateLayout sequencing, extension points

## Files

- `index.tsx`: Main entry point exporting `BaseTemplate` component with context providers
- `BaseTemplateLayout.tsx`: Composition wrapper handling series sequencing (intro/main/outro) and component slots
- `theme.ts`: Base theme tokens, colors, component styles, and configuration defaults
- `components/`: Shared base components (audio track, background)
- `layouts/`: Reserved for optional layout presets (currently empty)

## Child Modules

- `_types/`: TypeScript interface definitions
  - `BaseTemplateProps.ts`: Props interface for `BaseTemplate` component
  - `BaseTemplateLayoutProps.ts`: Props interface for `BaseTemplateLayout` component
- `_utils/`: Utility functions and constants
  - `constants.ts`: Shared constants (z-index values, default durations)
  - `calculations.ts`: Duration calculation utilities for intro/main/outro sequences
- `components/`: [components/.docs/readMe.md](./components/.docs/readMe.md)
- `layouts/`: [layouts/.docs/readMe.md](./layouts/.docs/readMe.md)
- `_types/`: [_types/.docs/readMe.md](./_types/.docs/readMe.md)
- `_utils/`: [_utils/.docs/readMe.md](./_utils/.docs/readMe.md)

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: consumes types from `../types`; uses core contexts and data types
- Consumed by: variant `index.tsx` files compose from base exports

## Dependencies

- Internal: `components`, `layouts`, `_types`, `_utils`
- External: Remotion, React

# Folder Overview

Provides the foundational layout, shared components, and theme contract that all template variants extend.

## Files

- `index.tsx`: exports base template building blocks
- `BaseTemplateLayout.tsx`: composition wrapper handling structure and slots
- `theme.ts`: base theme tokens and defaults
- `components/BaseAudioTrack.tsx`: shared audio component for variants
- `components/BaseBackground.tsx`: shared background component for variants
- `layouts/`: reserved for optional layout presets (currently empty)

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: consumes types from `../types`; used by `../variants/*`
- Consumed by: variant `index.tsx` files compose from base exports

## Dependencies

- Internal: `components`, `layouts`
- External: Remotion, React

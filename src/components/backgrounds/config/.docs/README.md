# Folder Overview

Shared configuration for background systems: constants, enums, and frame-based animation helpers. Consumed by all background variants and `backgrounds/index.tsx`.

## Files

- **`constants.ts`**: BACKGROUND_TYPES, GRADIENT_TYPES, GRADIENT_DIRECTIONS, BACKGROUND_POSITIONS, BACKGROUND_SIZES; default config objects for solid/gradient fallbacks
- **`animations.ts`**: fadeAnimation, zoomAnimation, panAnimation, kenBurnsAnimation, parallaxAnimation, slideInAnimation, slideOutAnimation; `getBackgroundAnimation(type, frame, start, end, isExit?)` dispatcher; uses Remotion interpolate
- **`types.ts`**: shared type declarations for background props and configurations
- **`index.ts`**: barrel export (types, constants, animations)

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: none
- Consumed by: `../variants/*`, `../index.tsx`

## Dependencies

- Internal: none
- External: Remotion (interpolate)

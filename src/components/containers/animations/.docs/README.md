# Folder Overview

Unified animation system for AnimatedContainer. Normalize config, compute progress, map to CSS transforms/filters/clip-path. Uses Remotion interpolate and spring.

## Files

- **`animationTypes.ts`**: ContainerAnimationType, easing types, config interfaces
- **`animationUtils.ts`**: normalizeContainerAnimation, calculateAnimationProgress, createSpringAnimation, calculateAnimationStyles
- **`useAnimation.ts`**: hook for frame-based entry/exit animation styles
- **`springConfigs.ts`**: named presets
- **`index.ts`**: barrel export
- **`utils/`**: category-specific calculators (fade, slide, scale, perspective, spring, special)

## Child Modules

- **`utils/`**: fadeAnimations, slideAnimations, scaleAnimations, perspectiveAnimations, springAnimations, specialAnimations

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `../../easing`, Remotion (interpolate, spring)
- Consumed by: AnimatedContainer.tsx

## Dependencies

- Internal: utils, ../easing
- External: Remotion

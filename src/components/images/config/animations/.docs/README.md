# Folder Overview

Per-category animation functions for AnimatedImage. Each exports AnimationFunction(frame, start, end, config) → React.CSSProperties. Dispatched by useImageAnimation.

## Files

- **`fadeAnimations.ts`**: fade in/out
- **`zoomAnimations.ts`**: zoom in/out
- **`slideAnimations.ts`**: slide in/out from edges
- **`specialAnimations.ts`**: kenBurns, pulse
- **`rotateAnimations.ts`**: rotate
- **`springAnimations.ts`**: physics-based spring
- **`cameraAnimations.ts`**: focus, exposure
- **`cinematicAnimations.ts`**: wipes, splits
- **`effectsAnimations.ts`**: glitch, ripple, tint
- **`perspectiveAnimations.ts`**: flips, swings
- **`broadcastAnimations.ts`**: lower thirds, scoreboards
- **`compositeAnimations.ts`**: composed multi-step
- **`index.ts`**: barrel export; aggregates for useImageAnimation switch

## Relations

- Parent folder: [../../.docs/readMe.md](../.docs/readMe.md)
- Key dependencies: Remotion interpolate, easing
- Consumed by: useImageAnimation hook

## Dependencies

- Internal: ../../../easing
- External: React, Remotion

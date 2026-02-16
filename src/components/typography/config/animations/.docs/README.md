# Folder Overview

Low-level typography animation implementation. Types, normalization, useAnimation hook, per-effect calculators. Tuned for letter/word splitting in AnimatedText.

## Files

- **`types.ts`**: animation types and configs
- **`animationUtils.ts`**: normalization helpers, shared math
- **`useAnimation.ts`**: hook for frame-based text animation styles
- **`fadeAnimations.ts`**: fade-in variants (directional)
- **`scaleAnimations.ts`**: scale-in, typewriter-like
- **`springAnimations.ts`**: spring-powered text motion
- **`slideAnimation.ts`**: slide for text
- **`specialAnimations.ts`**: bounce, elastic, etc.
- **`springConfigs.ts`**: named presets
- **`index.ts`**: barrel export

## Relations

- Parent folder: [../../.docs/readMe.md](../.docs/readMe.md)
- Key dependencies: Remotion interpolate, easing
- Consumed by: config/animations.ts

## Dependencies

- Internal: ../../../easing
- External: React, Remotion

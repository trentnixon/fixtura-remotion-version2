# Folder Overview

Core logic for AnimatedImage animations. Normalizes config, provides hooks and spring presets, re-exports easing and types from easing folder.

## Files

- **`animationUtils.ts`**: normalizeImageAnimation — shorthand (e.g. "fadeIn") → full ImageAnimationConfig
- **`useImageAnimation.ts`**: useImageAnimation (single), useDualImageAnimation (entry + exit); getAnimationStyles
- **`springConfigs.ts`**: IMAGE_SPRING_CONFIGS (BOUNCY, GENTLE, RESPONSIVE, etc.)
- **`imageAnimations.ts`**: re-exports from animations
- **`index.ts`**: barrel — types from easing, springConfigs, getImageEasingFunction, normalizeImageAnimation, useImageAnimation, useDualImageAnimation, animations

## Child Modules

- **`animations/`**: per-type animation functions (fade, zoom, slide, etc.)

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `../../easing`
- Consumed by: AnimatedImage.tsx

## Dependencies

- Internal: animations, ../../easing
- External: React, Remotion

# Folder Overview

Animated image component with entry/exit animations, aspect-ratio control, and fallbacks. Wraps Remotion Img; uses config for animation definitions, easing, and spring configs.

## Skill

- `.skills/architecture/components-images-folder.md` – AnimatedImage; config/animations; useDualImageAnimation; when to add animation types

## Files

- **`AnimatedImage.tsx`**: main component; animation, exitAnimation, exitFrame, aspect ratio; uses normalizeImageAnimation, useDualImageAnimation; preloadImage(s), getImageDimensions
- **`placeholders.ts`**: GENERIC_PLACEHOLDER, LOGO_PLACEHOLDER, PLAYER_PLACEHOLDER, SPORT_PLACEHOLDERS
- **`index.ts`**: barrel export (AnimatedImage, preloadImage, preloadImages, getImageDimensions, placeholders, types)

## Child Modules

- **`config/`**: animationUtils (normalizeImageAnimation), useImageAnimation, useDualImageAnimation; springConfigs; imageAnimations dispatcher
- **`config/animations/`**: fade, zoom, slide, special, rotate, spring, camera, cinematic, effects, perspective, broadcast, composite; index aggregates

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `../easing`, Remotion Img
- Consumed by: compositions, templates, layout (logos, thumbnails, etc.)

## Dependencies

- Internal: config, easing
- External: React, Remotion

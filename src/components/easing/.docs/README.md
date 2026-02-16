# Folder Overview

Shared animation types and easing utilities for mapping declarative easing descriptors to Remotion easing functions. Used by images, containers, and typography.

## Skill

- `.skills/architecture/components-easing-folder.md` – getImageEasingFunction; types shared by images, containers, typography

## Files

- **`types.ts`**: ImageAnimationType, ImageEasingType, ImageSpringConfig, ImageAnimationConfig; cross-domain types for animations
- **`easingFunctions.ts`**: `getImageEasingFunction(easing)` → `(t: number) => number`; supports strings (linear, ease, quad, cubic, sin, circle, exp, bounce), parameterized (poly, elastic, back, bezier), composed (in, out, inOut with base)

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: Remotion Easing API
- Consumed by: images/config, containers/animations, typography/config/animations

## Dependencies

- Internal: none
- External: Remotion (Easing)

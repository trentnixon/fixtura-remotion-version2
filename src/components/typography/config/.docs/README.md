# Folder Overview

Configuration, styles, variants, and animation surface for AnimatedText. Normalize config, compute per-frame styles, merge component + variant + animation styles.

## Files

- **`animations.ts`**: AnimationType, AnimationConfig, SpringConfig; SPRING_CONFIGS; getEasingFunction, normalizeAnimation, useAnimation; named animations (fade, scale, spring, special, typewriter)
- **`styles.ts`**: getTypographyStyles(typography, componentStyles, variant, defaultSize, defaultWeight, additionalClasses?)
- **`variants.ts`**: getVariantStyles(palette), applyContrastSafety
- **`animations/`**: implementation (types, animationUtils, useAnimation, fade, scale, spring, slide, special, springConfigs)

## Child Modules

- **`animations/`**: types, animationUtils, useAnimation; fadeAnimations, scaleAnimations, springAnimations, slideAnimation, specialAnimations; springConfigs

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `../../easing`
- Consumed by: AnimatedText.tsx

## Dependencies

- Internal: animations, ../../easing
- External: React, Remotion

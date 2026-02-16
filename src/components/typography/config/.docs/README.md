## Typography Config

Configuration, styles, variants, and animation surface for typography components.

### Files

- `animations.ts` — Export types (`AnimationType`, `AnimationConfig`, `SpringConfig`), `SPRING_CONFIGS`, `getEasingFunction`, `normalizeAnimation`, `useAnimation`, and named animations (fade/scale/spring/special/typewriter)
- `styles.ts` — `getTypographyStyles(typography, componentStyles, variant, defaultSize, defaultWeight, additionalClasses?)` generating className/style
- `variants.ts` — `getVariantStyles` (palette → color/additionalStyles) and `applyContrastSafety`
- `animations/` — Implementation details:
  - `types.ts`, `animationUtils.ts`, `useAnimation.ts`, `fadeAnimations.ts`, `scaleAnimations.ts`, `springAnimations.ts`, `slideAnimation.ts`, `specialAnimations.ts`, `springConfigs.ts`

### Flow

1. Normalize config and map easing
2. Compute per-frame animation styles via hook
3. Merge base component styles + variant styles + overrides + animation styles

### Links

- Parent: `../README.txt`

# Folder Overview

Animated, theme-aware typography primitives. AnimatedText supports type-based styles (title, subtitle, bodyText, etc.), color variants (onBackgroundMain, gradient), entry/exit animations, and word/letter splitting. Uses ThemeContext, FontContext.

## Skill

- `.skills/architecture/components-typography-folder.md` – AnimatedText; config (animations, styles, variants); letter/word splitting; when to add types or variants

## Files

- **`AnimatedText.tsx`**: main component; props: type, variant, contrastSafe, animation, exitAnimation, exitFrame, letterAnimation; resolves styles via ThemeContext.componentStyles and config/variants
- **`index.tsx`**: re-exports AnimatedText
- **`types.ts`**: TypographyType and related types

## Child Modules

- **`config/`**: animations.ts (normalizeAnimation, useAnimation, getAnimationStyles); styles.ts (getTypographyStyles); variants.ts (getVariantStyles, applyContrastSafety)
- **`config/animations/`**: fade, scale, slide, spring, special animations; types, useAnimation, springConfigs
- **`utils/`**: typography utilities

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `core/context/ThemeContext`, `core/context/FontContext`, `../easing`
- Consumed by: compositions, templates, layout, backgrounds

## Dependencies

- Internal: config, easing
- External: React, Remotion

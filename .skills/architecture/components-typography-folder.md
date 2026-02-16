# Skill: Components Typography Folder

## Purpose

Guides working with `src/components/typography`: AnimatedText, config (animations, styles, variants), letter/word splitting. Use when adding type-based styles, variants, or animation effects for text.

## Applies To

- `src/components/typography/` (root)
- `AnimatedText.tsx`: type, variant, contrastSafe, animation, exitAnimation, exitFrame, letterAnimation
- `config/`: animations, styles, variants
- `config/animations/`: fade, scale, slide, spring, special
- Consumers: compositions, templates, layout, backgrounds

## Inputs

- ThemeContext (componentStyles, typography scales)
- FontContext (fontsLoaded, loadFont)
- `../easing` for shared easing
- Folder readMe: `typography/.docs/readMe.md`

## Process

### 1. Understand the Structure

```
src/components/typography/
├── AnimatedText.tsx
├── types.ts
├── index.tsx
├── config/
│   ├── animations.ts     # normalizeAnimation, useAnimation, getAnimationStyles
│   ├── styles.ts         # getTypographyStyles
│   ├── variants.ts       # getVariantStyles, applyContrastSafety
│   └── animations/       # fade, scale, slide, spring, special; types, useAnimation, springConfigs
└── utils/
```

### 2. Style Resolution Flow

1. **getTypographyStyles**: merges ThemeContext.componentStyles, typography scale, variant
2. **getVariantStyles**: palette-based color variants (onBackgroundMain, gradient, etc.)
3. **applyContrastSafety**: WCAG-safe text when contrastSafe prop set
4. **Animation**: normalizeAnimation → useAnimation → getAnimationStyles from config/animations

### 3. Letter/Word Splitting

- **letterAnimation**: per-letter animation (e.g. stagger, typewriter)
- Implemented in config/animations; tuned for AnimatedText
- Uses frame-based useAnimation; computes per-letter or per-word styles

### 4. When to Add a New Type (TypographyType)

1. Add to `types.ts` TypographyType union
2. Ensure ThemeContext.componentStyles or typography scale has the mapping
3. Update getTypographyStyles if needed

### 5. When to Add a New Variant

1. Add variant to variants config in `config/variants.ts`
2. Implement getVariantStyles mapping (palette → styles)
3. Optional: applyContrastSafety for gradient/overlay variants

### 6. When to Add a New Animation

1. Add to config/animations (e.g. `specialAnimations.ts` or new file)
2. Export animation function; wire into useAnimation dispatch
3. Add to normalizeAnimation shorthand if desired
4. Letter/word splitting: ensure animation supports per-letter/per-word progress

### 7. Key Props

- `type`: title, subtitle, bodyText, etc. → getTypographyStyles
- `variant`: onBackgroundMain, gradient, etc. → getVariantStyles
- `contrastSafe`: applyContrastSafety
- `animation`, `exitAnimation`, `exitFrame`: entry/exit
- `letterAnimation`: per-letter effect (stagger, typewriter)

## Output

- Correct use of type, variant, and animation props
- Ability to add types, variants, or animations

## Rules

- Styles from ThemeContext; variants from palette
- Use shared easing from `../easing`
- Letter/word splitting lives in config/animations; keep tuned for text

## References

- typography: `src/components/typography/.docs/readMe.md`
- config: `src/components/typography/config/.docs/readMe.md`
- config/animations: `src/components/typography/config/animations/.docs/readMe.md`
- Parent: `components-folder-structure.md`
- easing: `components-easing-folder.md`

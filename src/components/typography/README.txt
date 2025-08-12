# Typography

Animated, theme-aware typography primitives for Remotion compositions.

## Components

- `AnimatedText.tsx`: Primary typography component supporting:
  - Type-based styles (e.g., `title`, `subtitle`, `bodyText`, `score`, `teamName`, etc.) resolved via `ThemeContext.componentStyles`
  - Color variants (e.g., `onBackgroundMain`, `onContainerSecondary`, `gradient`, etc.) resolved via palette in `config/variants.ts`
  - Entry/Exit animations and optional word/letter splitting
  - Optional overrides (`textAlign`, `textTransform`, `fontFamily`) and dynamic font loading (`FontContext`)

## Data Flow

1. Resolve font family from explicit prop → `ThemeContext.fontClasses` → `ThemeContext.fonts` (title/subtitle/body fallbacks)
2. Normalize entry/exit animation configs via `config/animations.normalizeAnimation`
3. Compute animation styles via `config/animations.useAnimation` or `getAnimationStyles` with exit frame offsets
4. Derive base component styles from `ThemeContext.componentStyles[type]` (fallback to `bodyText`) and merge with `variant` styles via `config/variants.getVariantStyles`
5. Optionally apply `applyContrastSafety` to text color for readability
6. Render either:
   - plain text
   - word-split spans (if `letterAnimation = "word"`)
   - character-split spans (if `letterAnimation` is a specific animation name)

## Configuration & Utilities

- `config/animations.ts`:
  - Types: `AnimationType`, `AnimationConfig`, `SpringConfig` and re-exported `SPRING_CONFIGS`
  - Easing function mapping via `easing/easingFunctions` (imported as `getEasingFunction`)
  - Hooks: `useAnimation` + `getAnimationStyles`
  - Implementations: `fadeIn`, `fadeInUp`, `fadeInDown`, `scaleIn`, `typewriter`, `springFadeIn`, `springScale`, `bounce`, `elastic`, etc.
- `config/styles.ts`:
  - `getTypographyStyles(typography, componentStyles, variant, defaultSize, defaultWeight, additionalClasses?)`
  - Produces className and style with optional typography scale overrides (sizes/weights/letterSpacing/lineHeight)
- `config/variants.ts`:
  - `getVariantStyles(variant, selectedPalette)` returns `{ color?, additionalStyles? }`
  - Special-case `gradient` variant yields gradient text fill
  - `applyContrastSafety` is available for variant-aware safety adjustments

## Props (AnimatedText)

- `children: string`
- `type?`: e.g., `"title" | "subtitle" | "bodyText" | ...` (string for custom types)
- `variant?`: e.g., `"onBackgroundMain" | "onContainerSecondary" | "gradient" | ...`
- `contrastSafe?`: boolean
- `className?`, `style?`
- Entry animation: `animation?`, `animationDelay?`, `animationDuration?`, `animationEasing?`, `springConfig?`, `letterAnimation?` ("none" | "word" | `AnimationType`)
- Exit animation: `exitAnimation?`, `exitAnimationDuration?`, `exitFrame?`
- Overrides: `textAlign?`, `textTransform?`, `fontFamily?`

## Usage

Basic:
```tsx
<AnimatedText type="title" variant="onBackgroundMain">Match Day</AnimatedText>
```

Word-by-word:
```tsx
<AnimatedText type="subtitle" letterAnimation="word">
  Welcome to the finals
</AnimatedText>
```

With entry and exit animations:
```tsx
<AnimatedText
  type="label"
  animation={{ type: "fadeIn", duration: 30 }}
  exitAnimation={{ type: "fadeOut", duration: 30 }}
  exitFrame={120}
>
  KICK OFF
</AnimatedText>
```

## Notes

- Prefer using theme-provided types (`componentStyles`) for visual consistency.
- When specifying custom `fontFamily`, the component attempts on-demand loading unless it is a generic family.
- Combine with `AnimatedContainer` and Backgrounds for full scene composition.
## Gradient Background

Renders palette-driven gradients derived from the current theme and optional template variation hints.

### File

- `GradientBackground.tsx`
  - Reads `selectedPalette` from `ThemeContext`
  - Reads `video.templateVariation.gradient` for `type` and `direction`
  - Extracts CSS safely from palette gradient objects which may expose direction-specific CSS maps
  - Fallbacks to a default gradient if the requested keys are missing
  - Uses `AbsoluteFill` with `background` CSS and negative z-index to sit behind content

### Data Flow

- Theme → `selectedPalette.background.gradient`
- Video data → `video.templateVariation.gradient.{type,direction}`
- Returns a CSS string resolved by `extractCSS` helper

### Usage

```tsx
<GradientBackground />
```

### Links

- Parent: `../../README.md`
- Backgrounds overview: `../../../README.md`

## Pattern Background

SVG-based repeating patterns with optional animation and transforms.

### Files

- `index.tsx` (PatternBackground)
  - Reads `video.templateVariation.pattern` and `selectedPalette`
  - Builds a pattern props object (colors, scale, rotation, animation type/speed)
  - Selects a variant component based on `PATTERN_TYPES` (defaults to dots)
  - Exports `PatternVariants` registry and `PATTERN_TYPES`, `ANIMATION_TYPES`
- `variants/`
  - `dots.tsx`, `lines.tsx`, `grid.tsx`, `CrosshatchPattern.tsx`, `TrianglesPattern.tsx`, `ChevronPattern.tsx`
  - `config.ts` — Enumerations/constants for pattern and animation types

### Data Flow

- Theme → primary/secondary colors and gradients
- Video data → pattern type and animation params

### Usage

```tsx
<PatternBackground />
```

### Links

- Parent: `../../README.md`

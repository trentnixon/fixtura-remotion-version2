## Pattern Variants

Individual pattern implementations used by `PatternBackground`.

### Files

- `dots.tsx` — Dot grid with optional animation (scale/opacity/translation)
- `lines.tsx` — Animated lines pattern
- `grid.tsx` — Rectangular grid with transform support
- `CrosshatchPattern.tsx` — Crosshatch lines
- `TrianglesPattern.tsx` — Triangular tessellation
- `ChevronPattern.tsx` — Chevron shapes
- `config.ts` — Pattern and animation type definitions and constants

### Notes

- Variants are typically SVG-based and may use frame interpolation for subtle motion.
- Selected by `PatternBackground` based on `PATTERN_TYPES`.

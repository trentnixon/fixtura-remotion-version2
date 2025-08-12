## Container Styles

Semantic-to-CSS mappers used by `AnimatedContainer`.

### Files

- `backgroundStyles.ts` — Map semantic background tokens (e.g., `primary`, `transparentSecondary`, gradient tokens) to palette colors/gradients
- `typeStyles.ts` — Decorative styles per container type (e.g., borders, card shadow, gradient backgrounds)
- `sizeStyles.ts` — Standardized widths/heights per size token (`xs`..`full`, `auto`)
- `roundedStyles.ts` — Border-radius presets (`none`..`full`)
- `shadowStyles.ts` — Shadow presets (`none`..`xl`, `inner`)
- `index.ts` — Barrel export

### Usage

These functions produce plain `React.CSSProperties` objects and are composed in `AnimatedContainer`.

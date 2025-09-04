## Gradient Background

Renders palette-driven gradients derived from the current theme and optional template variation hints.

### File

- `GradientBackground.tsx`
  - Reads `selectedPalette` from `ThemeContext`
  - Reads `video.templateVariation.gradient` for `type` and `direction`
  - Extracts CSS safely from palette gradient objects which may expose direction-specific CSS maps or plain strings
  - Picks the requested direction, then `DEFAULT`, then first available entry; else falls back
  - Uses `AbsoluteFill` with `background` CSS and negative z-index to sit behind content

### Data Flow

- Theme → `selectedPalette.background.gradient`
- Video data → `video.templateVariation.gradient.{type,direction}`
- Returns a CSS string resolved by `extractCSS` helper

### Valid Keys

- Gradient types available on `selectedPalette.background.gradient` (keys may vary by palette factory):

  - `primary`, `secondary`, `primaryToSecondary`, `secondaryToPrimary`
  - `primaryAdvanced`, `secondaryAdvanced`, `primaryRadial`, `secondaryRadial`
  - `conicGradient`, `meshGradient`, `hardStopGradient`, `radial`

- Direction keys available on the `css` map for most gradient types:
  - `DEFAULT`, `HORIZONTAL`, `HORIZONTAL_REVERSE`, `VERTICAL`, `VERTICAL_REVERSE`, `DIAGONAL`, `DIAGONAL_REVERSE`, `CONIC`

Notes:

- Some entries like `radial` may be a single CSS string (no direction map).
- When the requested `type` or `direction` is missing, the component tries `DEFAULT`, then first available entry, then falls back to `secondaryToPrimary`, and finally a hardcoded default.

### Usage

```tsx
<GradientBackground />
```

### Links

- Parent: `../../README.md`
- Backgrounds overview: `../../../README.md`

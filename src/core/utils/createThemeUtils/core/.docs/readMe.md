# Folder Overview

Core theme creation utilities: types and base color manipulation. Provides the shared contract and primitive operations used by generators.

## Files

- **`types.ts`**: type definitions
  - `ColorVariations`: base, light, lighter, lightest, dark, darker, darkest, transparent, semiTransparent, contrastText, saturated, desaturated, muted, accent
  - `GradientOptions`: direction, type, stops, css
  - `ColorPalettes`: default, monochromatic, analogous, complementary, triadic, categorical, sequential, diverging
  - `ContrastSafety`: safeColor, contrastRatio, isAccessible, isLargeTextAccessible, adjustedColor
  - `ThemeColorUtils`: variations, designPalettes (DesignPalette from designPalettes)
- **`baseManipulation.ts`**: base color operations (tinycolor2)
  - `getContrastColor`, `lightenColor`, `darkenColor`, `setOpacity`, `saturateOrDesaturateColor`

## Relations

- Parent folder: [../.docs/readMe.md](../.docs/readMe.md)
- Key dependencies: `designPalettes` (DesignPalette type)
- Consumed by: `../generators`, `../index.ts`

## Dependencies

- Internal: `designPalettes` (types only)
- External: tinycolor2

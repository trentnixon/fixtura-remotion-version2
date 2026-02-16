# Folder Overview

Core color operations, types, and relationships for building standardized palettes.

## Files

- **`types.ts`**: type definitions
  - `ColorVariations`, `GradientOptions`, `GradientCollection`, `ContrastSafety`, `TextColors`, `BackgroundColors`, `Shadows`, `UtilityColors`, `ContrastSafetyCollection`
  - `CommonColorUtils`, `PaletteConfiguration`, `PaletteOptions`, `StandardizedPalettes`, `ColorSystem`
- **`baseManipulation.ts`**: base color operations (uses tinycolor2)
  - `getContrastColor`, `lightenColor`, `darkenColor`, `setOpacity`, `saturateOrDesaturateColor`
  - `mixColors`, `randomColor`, `createColorVariations`, `isValidColor`, `getColorInfo`
  - Uses `COLOR_AMOUNTS` from config
- **`colorRelationships.ts`**: hue/value relationships (uses `COLOR_ANGLES`)
  - `getComplementaryColor`, `getAnalogousColor`, `getTriadicColor`, `getSplitComplementaryColors`
  - `getAccentColor`, `getAccentComplementary`
  - `getMonochromaticColors`, `getAnalogousColors`, `getTetradicColors`
  - `hasSufficientContrast`
- **`memoization.ts`**: caching for expensive color operations
  - `memoize`, `memoizeWithLimit`, `memoizeColorFunction`
  - `createCachedColorProcessors`: getOrCompute, clearCache, invalidate

## Relations

- Parent folder: [../.docs/readMe.md](../.docs/readMe.md)
- Key dependencies: `../config/constants`
- Consumed by: `generators`, `index.ts`, `utils`, `config/paletteConfigurations`

## Dependencies

- Internal: `colorSystem/config`
- External: tinycolor2

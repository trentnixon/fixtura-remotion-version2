# Folder Overview

Generators for palette variants, gradients, contrast, shadows, text, color variations, and utility colors. Orchestrated by `standardPaletteFactory`.

## Files

- **`standardPaletteFactory.ts`**: main factory
  - `standardPaletteFactory(name, colors, options, useMode)`: produces standardized palette; uses gradientGenerator, textGenerator, shadowGenerator, createStandardPaletteStructure
- **`gradientGenerator.ts`**: gradient creation
  - `GRADIENT_TYPES`: LINEAR, RADIAL, CONIC, REPEATING_*
  - `generateGradientBackground`, `generateAllDirectionalGradients`, `generateGradientOptions`
  - `createAdvancedGradient`, `generateMeshGradient`, `generateHardStopGradient`
- **`backgroundGenerator.ts`**: background/surface colors
  - `getBackgroundColor`, `generateBackgroundColors`, `generateSurfaceColors`
- **`contrastGenerator.ts`**: contrast and accessibility
  - `calculateContrastSafety`, `generateContrastSafety`, `ensureContrast`
- **`colorVariations.ts`**: light/dark/tinted variants
  - `generateColorVariations`, `generateColorScale`, text-specific variations
- **`shadowGenerator.ts`**: shadow tokens
  - `generateThemedShadow`, `generateShadows`, `generateElevationShadows`
  - Uses `SHADOW_SIZES` from config
- **`textGenerator.ts`**: text colors for backgrounds
  - `getTitleColorOverGradient`, `getForegroundColor`, `generateTextColors`
- **`utilityGenerator.ts`**: semantic/utility colors
  - `generateAlertColors`, `generateUtilityColors`, `generateSemanticPalette`

## Child Modules

None

## Relations

- Parent folder: [../.docs/readMe.md](../.docs/readMe.md)
- Key dependencies: `../core/baseManipulation`, `../core/types`, `../config/constants`, `../config/standardPaletteStructure`; `templates/types` (ThemeMode)
- Consumed by: `createStandardizedPalettes`, theme creation, `createThemeUtils`

## Dependencies

- Internal: `colorSystem/core`, `colorSystem/config`
- External: tinycolor2

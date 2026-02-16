# Folder Overview

Configuration for the color system: constants, defaults, palette presets, and structural definitions.

## Files

- **`constants.ts`**: shared constants
  - `WCAG`: AA_NORMAL_TEXT (4.5), AA_LARGE_TEXT (3), AAA_NORMAL_TEXT (7), AAA_LARGE_TEXT (4.5)
  - `COLOR_AMOUNTS`: LIGHTEN/DARKEN (small/medium/large), OPACITY (high/medium/low/veryLow), SATURATE/DESATURATE
  - `COLOR_ANGLES`: COMPLEMENTARY, SPLIT_COMPLEMENTARY, ANALOGOUS, TRIADIC, TETRADIC, ACCENT
  - `DEFAULT_COLORS`: PRIMARY, SECONDARY, SUCCESS, ERROR, WARNING, INFO, LIGHT, DARK, NEUTRAL, MUTED
  - `GRADIENT_DIRECTIONS`: HORIZONTAL, VERTICAL, DIAGONAL, etc.
  - `SHADOW_SIZES`: SMALL (5), MEDIUM (10), LARGE (20)
- **`defaultColors.ts`**: fallbacks and presets
  - `getDefaultColor`, `getValidColorOrFallback(color, fallbackKey)`
  - `DEFAULT_PALETTE_PRESETS`: blue, red, green, purple, orange, dark, light
  - `getPalettePreset(presetName)`
- **`paletteConfigurations.ts`**: named palette configs from primary/secondary
  - `createPaletteConfigurations(primary, secondary)`: returns primary, secondary, primaryOnWhite/OnBlack, accentPrimary, accentSecondary, complementary, analogous, triadic, monochromatic, highContrast
  - `getPaletteConfigurationByName`, `filterPaletteConfigurations`
- **`standardPaletteStructure.ts`**: normalized palette shape
  - `createStandardPaletteStructure(name, mainColor, secondaryColor, colorVariations, textColors, useMode, shadows, gradients, options)`: defines background, container, text sections

## Relations

- Parent folder: [../.docs/readMe.md](../.docs/readMe.md)
- Key dependencies: `../core/types`, `../core/colorRelationships`; `templates/types` (ThemeMode)
- Consumed by: generators, `createStandardizedPalettes`, theme creators

## Dependencies

- Internal: `colorSystem/core`, `templates/types`
- External: none

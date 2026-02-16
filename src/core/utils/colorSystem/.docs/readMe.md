# Folder Overview

Color system for generating standardized palettes, gradients, shadows, and performing color operations. Consumed by theme creation (`createThemeUtils`), templates, and designPalettes. Uses tinycolor2 throughout (wrapped).

## Skill

- `.skills/architecture/color-system-folder.md` – Implementation guidance for this color system

## Files

- **`index.ts`**: main entry; exports `createColorSystem(primary, secondary, useMode)`, types, baseManipulation, colorRelationships, palette configs, DEFAULT_COLORS, DEFAULT_PALETTE_PRESETS
- **`createStandardizedPalettes.ts`**: orchestrates palette generation from configurations; calls `standardPaletteFactory` per config
- **`gradientResolver.ts`**: resolves CSS gradient strings from palettes; `determineGradientTypeForPalette`, `resolvePaletteGradient(palette, type, direction)`

## Child Modules

- **`config/`**: constants, defaults, palette presets, palette structure
- **`core/`**: types, base manipulation, color relationships, memoization
- **`generators/`**: palette factory, gradients, contrast, shadows, text, color variations, utility colors
- **`utils/`**: math, color spaces, validation, accessibility, tinycolor wrapper

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `designPalettes`, `templates/types` (ThemeMode)
- Consumed by: `createThemeUtils`, templates/themes, theme creators

## Dependencies

- Internal: `config`, `core`, `generators`, `utils`, `designPalettes`
- External: tinycolor2

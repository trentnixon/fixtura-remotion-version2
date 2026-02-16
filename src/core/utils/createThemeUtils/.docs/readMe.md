# Folder Overview

Utilities to produce application themes from primary and secondary color inputs. Orchestrates generators and delegates to `designPalettes` for final palette assembly. Uses tinycolor2 for color operations.

## Skill

- `.skills/architecture/create-theme-utils-folder.md` – Implementation guidance for this folder

## Files

- **`index.ts`**: main entry; `createThemeColorUtils(primary, secondary)` → ThemeColorUtils
  - Calls generators for variations, gradients, utility, text, background, shadows, contrast
  - Passes all tokens to `generateAllPalettes` from designPalettes
  - Returns { variations, designPalettes }; exports all generator functions and core types/baseManipulation

## Child Modules

- **`core/`**: types (ThemeColorUtils, ColorVariations, GradientOptions, etc.), baseManipulation
- **`generators/`**: utilityColors, gradientUtils, textUtils, backgroundUtils, shadowUtils, contrastUtils, paletteGenerators

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `designPalettes` (generateAllPalettes), `core` types and baseManipulation
- Consumed by: templates, ThemeContext, theme creation flows (alternative/legacy path alongside colorSystem)

## Dependencies

- Internal: `core`, `generators`, `designPalettes`
- External: tinycolor2

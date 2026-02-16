# Folder Overview

Generators to derive theme parts from primary and secondary color inputs. Used by `createThemeColorUtils` before delegating to `designPalettes.generateAllPalettes`.

## Files

- **`utilityColors.ts`**: color variations and utility/semantic colors
  - `generateAlertColors`, `generateUtilityColors`, `generateColorVariations`
  - Uses baseManipulation for lighten/darken/opacity/saturate
- **`gradientUtils.ts`**: gradient options
  - `generateGradientBackground`, `generateGradientOptions(color1, color2?, direction)`
- **`textUtils.ts`**: text colors for backgrounds
  - `generateTextColors(primary, secondary)`: onPrimary, onSecondary, onLight, onDark, title, body, muted
  - Uses contrastUtils for gradient/foreground decisions
- **`backgroundUtils.ts`**: background colors
  - `getBackgroundColor`, `generateBackgroundColors(primary, secondary)`: light, dark, paper, default, primary, secondary, subtle, highlight
- **`shadowUtils.ts`**: shadow tokens
  - `generateThemedShadow`, `generateShadows(color)`: small, medium, large, glow
- **`contrastUtils.ts`**: contrast and accessibility
  - `getTitleColorOverGradient`, `getForegroundColor`, `calculateContrastSafety`, `generateContrastSafety`
- **`paletteGenerators.ts`**: color palette arrays (for data viz / categorical use)
  - `getComplementaryColor`, `getSplitComplementaryColors`, `getMonochromaticPalette`, `getAnalogousPalette`, `getTriadPalette`
  - `generateColorPalettes`, `generateGradientArray`

## Relations

- Parent folder: [../.docs/readMe.md](../.docs/readMe.md)
- Key dependencies: `../core/types`, `../core/baseManipulation`
- Consumed by: `../index.ts` (createThemeColorUtils)

## Dependencies

- Internal: `../core`
- External: tinycolor2

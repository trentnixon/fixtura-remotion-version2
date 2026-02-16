# Folder Overview

Helper utilities used by the color system: math, spaces, wrappers, validation, and accessibility. All modules use or wrap tinycolor2 for color operations.

## Files

- **`accessibilityUtils.ts`**: WCAG contrast and accessibility
  - `getContrastRatio`, `meetsContrastStandard`, `calculateContrastSafety`, `findAccessibleVariant`, `getMostAccessibleTextColor`, `isSuitableBackground`, `generateContrastMatrix`, `improveColorAccessibility`
  - Uses `WCAG` constants from `../config/constants`; returns `ContrastSafety` type
- **`colorMath.ts`**: luminance, contrast, and interpolation
  - `getLuminance`, `getContrastRatio`, `rgbToLab`, `getDeltaE`, `findColorWithTargetContrast`, `interpolateColorsLab`
  - RGB/LAB conversions for perceptually uniform operations
- **`colorSpaces.ts`**: color space conversions and LCH manipulation
  - Interfaces: `RGB`, `HSL`, `HSV`, `Lab`, `LCH`
  - `toRGB`, `toHSL`, `toHSV`, `toLab`, `toLCH`; `rgbToLab`, `labToLCH`, `lchToLab`; `labToRGBString`, `lchToRGBString`
  - `modifyColorInLCH`, `changeLightness`, `changeChroma`, `shiftHue`; `getColorDifference`, `createPerceptuallyUniformPalette`
- **`tinycolorWrapper.ts`**: memoized tinycolor wrapper
  - `isValidColor`, `toHex`, `toRgb`, `toHsl`, `isDark`, `isLight`, `getLuminance`, `getBrightness`
  - `lighten`, `brighten`, `darken` (manipulation)
  - Uses `../core/memoization` for performance
- **`validationUtils.ts`**: palette and color validation
  - `isValidColor`, `validatePaletteConfiguration`, `validateColorVariations`, `validateStandardizedPalette`, `validateStandardizedPalettes`
  - `hasMinimumContrast`, `suggestColorFixes`
  - Types: `PaletteConfiguration`, `ColorVariations`, `StandardizedPalettes`, `DesignPalette`

## Child Modules

None (leaf utilities)

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `../core/types`, `../core/memoization`, `../config/constants`, `../../designPalettes`
- Consumed by: generators (`../generators`), core operations, theme creators, designPalettes

## Dependencies

- Internal: `colorSystem/core`, `colorSystem/config`, `designPalettes`
- External: tinycolor2

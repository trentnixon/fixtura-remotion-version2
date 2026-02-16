# Folder Overview

Curated design palettes assembled from color variations, text, background, utility, shadow, contrast, and gradient tokens. Produces `DesignPalette` objects consumed by ThemeContext, templates, and components. Uses tinycolor2 for contrast/color helpers.

## Skill

- `.skills/architecture/design-palettes-folder.md` – Implementation guidance for this folder

## Files

- **`index.ts`**: entry; exports `generateAllPalettes(primary, secondary, colorVariations, textColors, backgrounds, utility, shadows, contrast, gradients)` → { primary, secondary, dark, light, accent, complementary, triadic, monochromatic }
  - Calls each palette creator; returns DesignPalette per name
- **`types.ts`**: type definitions
  - `DesignPalette`: name, background, container, text, shadow
  - `BackgroundOptions`, `ContainerOptions`, `TextOptions`, `ShadowOptions`
  - `GradientOptions`, `CSSGradientOptions`
  - `ColorVariations`, `ColorVariation`, `TextColors`, `UtilityColors`, `ContrastOptions`
  - `ensureContrast(bgColor, preferredTextColor)`, `processUserColor(userColor)`
- **`paletteHelpers.ts`**: utilities for palette assembly
  - `createCSSGradientOptions`, `createGradientOptions`, `createTextOptions`, `createContainerOptions`

## Palette Creators

- **`primaryPalette.ts`**: primary-centric; uses colorVariations.primary, textColors, shadows
- **`secondaryPalette.ts`**: secondary-centric; uses gradients, utility, contrast
- **`lightPalette.ts`**: light backgrounds; uses backgrounds, textColors, shadows, utility, contrast
- **`darkPalette.ts`**: dark backgrounds; uses backgrounds, textColors, utility, contrast, primary
- **`accentPalette.ts`**: secondary emphasis; uses colorVariations, textColors, shadows, utility, contrast
- **`complementaryPalette.ts`**: complementary color; uses textColors, shadows, utility, contrast, colorVariations
- **`triadicPalette.ts`**: triadic harmony; uses textColors, shadows, utility, contrast
- **`monochromaticPalette.ts`**: primary variations; uses colorVariations, textColors, shadows, utility, contrast

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: receives tokens from `createThemeUtils` (colorVariations, textColors, backgrounds, utility, shadows, contrast, gradients)
- Consumed by: ThemeContext, createThemeUtils, colorSystem (DesignPalette type), templates, components (backgrounds, typography, containers)

## Dependencies

- Internal: types, paletteHelpers
- External: tinycolor2

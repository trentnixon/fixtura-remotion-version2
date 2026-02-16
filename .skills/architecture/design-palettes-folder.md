# Skill: Design Palettes Folder

## Purpose

Guides working with `src/core/utils/designPalettes`: understanding its structure, token inputs, palette creators, DesignPalette shape, and how to add or modify palettes. Use when navigating, extending, or debugging palette assembly for themes.

## Applies To

- `src/core/utils/designPalettes/` (root)
- Palette creators: primaryPalette, secondaryPalette, lightPalette, darkPalette, accentPalette, complementaryPalette, triadicPalette, monochromaticPalette
- `types.ts`, `paletteHelpers.ts`, `index.ts`
- Consumers: ThemeContext, createThemeUtils, colorSystem (DesignPalette type), components (backgrounds, typography, containers)

## Inputs

- `generateAllPalettes` receives: primary, secondary, colorVariations, textColors, backgrounds, utility, shadows, contrast, gradients
- Token suppliers: `createThemeUtils` generators produce these; `colorSystem` produces compatible shapes for its palettes
- Types: ColorVariations, TextColors, UtilityColors, ShadowOptions, ContrastOptions from designPalettes/types

## Process

### 1. Understand the Folder Hierarchy

```
src/core/utils/designPalettes/
├── index.ts              # generateAllPalettes, exports
├── types.ts              # DesignPalette, options interfaces, ensureContrast, processUserColor
├── paletteHelpers.ts     # createCSSGradientOptions, createGradientOptions, createTextOptions
├── primaryPalette.ts
├── secondaryPalette.ts
├── lightPalette.ts
├── darkPalette.ts
├── accentPalette.ts
├── complementaryPalette.ts
├── triadicPalette.ts
└── monochromaticPalette.ts
```

### 2. Understand the generateAllPalettes Flow

1. **Entry**: `generateAllPalettes(primary, secondary, colorVariations, textColors, backgrounds, utility, shadows, contrast, gradients)`
2. **Creators** (each returns DesignPalette):
   - primary, secondary, dark, light, accent, complementary, triadic, monochromatic
3. **Output**: Object keyed by palette name, each value a DesignPalette

### 3. DesignPalette Structure

Each palette implements:
- **name**: string (e.g. "Primary", "Secondary")
- **background**: BackgroundOptions (main, light, dark, contrast, accent, gradient)
- **container**: ContainerOptions (primary, secondary, main, transparent, gradient strings, backgroundTransparent)
- **text**: TextOptions (onBackground, onContainer, title, body, muted, etc.)
- **shadow**: ShadowOptions (small, medium, large, glow)

### 4. Token Usage by Palette

| Palette | Tokens Used |
|---------|-------------|
| primary | colorVariations, textColors, shadows |
| secondary | colorVariations, textColors, shadows, gradients, utility, contrast |
| dark | backgrounds, textColors, shadows, utility, contrast, primary |
| light | primary, secondary, backgrounds, textColors, shadows, utility, contrast |
| accent | primary, secondary, colorVariations, textColors, shadows, utility, contrast |
| complementary | primary, textColors, shadows, utility, contrast, colorVariations |
| triadic | primary, textColors, shadows, utility, contrast |
| monochromatic | primary, colorVariations, textColors, shadows, utility, contrast |

### 5. When Adding a New Palette

1. Create `{name}Palette.ts` (e.g. analogousPalette.ts)
2. Implement `create{Name}Palette(...)` returning DesignPalette
3. Import in `index.ts` and add to `generateAllPalettes` return object
4. Ensure token inputs match what createThemeUtils (or colorSystem) provides
5. Use `paletteHelpers` for gradients/text/container when appropriate
6. Use `ensureContrast` for text-on-background decisions

### 6. Helper Functions

- **ensureContrast(bgColor, preferredTextColor)**: returns preferredTextColor if contrast ≥ 4.5, else safe (black/white)
- **processUserColor(userColor)**: darkens if too light, desaturates if too saturated
- **createCSSGradientOptions(color1, color2)**: directional gradient strings (DEFAULT, HORIZONTAL, VERTICAL, etc.)
- **createGradientOptions(color1, color2, type?, direction?)**: full GradientOptions with css

### 7. Integration Points

- **createThemeUtils**: Calls `generateAllPalettes` with tokens from its generators
- **colorSystem**: Uses DesignPalette type; produces palettes via standardPaletteFactory (different assembly path)
- **gradientResolver**: Resolves CSS gradient strings from palette.background.gradient
- **ThemeContext**: Selects palette by name; provides to templates/components

## Output

- Correct understanding of palette assembly and token flow
- Ability to add or modify palette creators
- Clear use of ensureContrast and processUserColor for accessibility

## Rules

- Each palette creator must return a complete DesignPalette (background, container, text, shadow)
- Use ensureContrast when deriving text colors from backgrounds
- Token shapes from createThemeUtils must match types (ColorVariations, TextColors, etc.); designPalettes defines these in types.ts
- gradient. radial/conic/primary/secondary/etc. follow BackgroundOptions.gradient shape for gradientResolver compatibility

## References

- designPalettes root: `src/core/utils/designPalettes/.docs/readMe.md`
- createThemeUtils skill: `.skills/architecture/create-theme-utils-folder.md`
- colorSystem skill: `.skills/architecture/color-system-folder.md`

# Skill: Color System Folder

## Purpose

Guides working with `src/core/utils/colorSystem`: understanding its structure, flow (config → core → generators → palettes), how themes consume it, and where to add or modify color logic. Use when navigating, extending, or debugging the Remotion color/palette system.

## Applies To

- `src/core/utils/colorSystem/` (root)
- `config/`: constants, defaults, palette presets, structure
- `core/`: types, baseManipulation, colorRelationships, memoization
- `generators/`: standardPaletteFactory, gradients, contrast, shadows, text, colorVariations, utility
- `utils/`: accessibilityUtils, colorMath, colorSpaces, tinycolorWrapper, validationUtils
- Consumers: `ThemeContext`, `createThemeUtils`, templates, `designPalettes`

## Inputs

- Understanding of Remotion compositions and theme system
- Access to `ThemeMode` from `src/templates/types/TemplateThemeConfig`
- Folder readMe docs: `colorSystem/.docs/readMe.md`, `config`, `core`, `generators`, `utils`

## Process

### 1. Understand the Folder Hierarchy

```
src/core/utils/colorSystem/
├── index.ts                    # createColorSystem(primary, secondary, useMode)
├── createStandardizedPalettes.ts
├── gradientResolver.ts
├── config/                     # constants, defaults, presets, structure
├── core/                       # types, baseManipulation, colorRelationships, memoization
├── generators/                 # standardPaletteFactory + gradient/contrast/shadow/text/utils
└── utils/                      # accessibility, colorMath, colorSpaces, tinycolor, validation
```

### 2. Understand the Creation Flow

1. **Entry**: `createColorSystem(primaryColor, secondaryColor, useMode)` in `index.ts`
2. **Validation**: `getValidColorOrFallback` from config/defaultColors
3. **Config**: `createPaletteConfigurations(primary, secondary)` → array of `PaletteConfiguration`
4. **Generation**: `createStandardizedPalettes(primary, secondary, configs, useMode)` → iterates configs, calls `standardPaletteFactory` per config
5. **Output**: `ColorSystem` = { variations, palettes, utils } with `DesignPalette` per palette name

### 3. Module Responsibilities

| Module | Responsibility |
|--------|----------------|
| **config** | WCAG constants, COLOR_AMOUNTS, COLOR_ANGLES, DEFAULT_COLORS, GRADIENT_DIRECTIONS, SHADOW_SIZES; palette presets; `createStandardPaletteStructure` |
| **core** | Types (ColorVariations, GradientOptions, ContrastSafety, etc.); getContrastColor, lighten/darken/setOpacity, createColorVariations; color relationships (complementary, analogous, triadic); memoization |
| **generators** | standardPaletteFactory orchestrates gradientGenerator, textGenerator, shadowGenerator, colorVariations; contrastGenerator, backgroundGenerator, utilityGenerator |
| **utils** | WCAG contrast/accessibility, color spaces (RGB/HSL/HSV/Lab/LCH), validation, memoized tinycolor wrapper |

### 4. When Adding a New Palette Configuration

1. Add config in `config/paletteConfigurations.ts` via `createPaletteConfigurations` (or filter existing)
2. Use `colorRelationships` (getComplementaryColor, getAccentColor, etc.) for color pairs
3. `createStandardizedPalettes` will automatically generate it via `standardPaletteFactory`
4. Access via `colorSystem.palettes.<name>` in ThemeContext

### 5. When Adding a New Gradient Type or Shadow

1. **Gradient**: Add to `generators/gradientGenerator.ts` (GRADIENT_TYPES, createAdvancedGradient, etc.); wire into `standardPaletteFactory` gradients object
2. **Shadow**: Add to `generators/shadowGenerator.ts` or extend SHADOW_SIZES in config/constants
3. Ensure `createStandardPaletteStructure` receives the new tokens if they belong in palette shape

### 6. When Using Color Utils Externally

- **Base manipulation**: `getContrastColor`, `lightenColor`, `darkenColor`, `setOpacity` exported from index
- **Relationships**: `getComplementaryColor`, `getAnalogousColor`, `getTriadicColor`, etc.
- **Accessibility**: `utils/accessibilityUtils` – getContrastRatio, meetsContrastStandard, calculateContrastSafety
- **Validation**: `utils/validationUtils` – validatePaletteConfiguration, validateColorVariations, validateStandardizedPalette

### 7. Resolving Gradients from Palettes

- Use `gradientResolver.ts`: `resolvePaletteGradient(palette, type, direction)` to get CSS gradient string
- `determineGradientTypeForPalette(paletteName, baseType)` for OnBlack/OnWhite variants

### 8. Key Types

- `ColorSystem`: { variations, palettes, utils }
- `DesignPalette`: background, container, text sections (from designPalettes)
- `PaletteConfiguration`: { name, colors: [string, string], options }
- `ColorVariations`: base, light, darker, contrastText, etc.
- `ContrastSafety`: safeColor, contrastRatio, isAccessible, adjustedColor

## Output

- Correct understanding of where to add/modify color logic
- Ability to add palette configs, gradient types, or shadow tokens
- Clear path from createColorSystem to ThemeContext consumption

## Rules

- All color operations use tinycolor2 (direct or via tinycolorWrapper)
- Palette structure must conform to DesignPalette from designPalettes
- ThemeMode (from templates) drives container/background choices in standardPaletteStructure
- Prefer centralizing color logic in colorSystem; re-export via createThemeUtils when needed
- WCAG constants live in config/constants; use for contrast thresholds

## References

- colorSystem root: `src/core/utils/colorSystem/.docs/readMe.md`
- config: `src/core/utils/colorSystem/config/.docs/readMe.md`
- core: `src/core/utils/colorSystem/core/.docs/readMe.md`
- generators: `src/core/utils/colorSystem/generators/.docs/readMe.md`
- utils: `src/core/utils/colorSystem/utils/.docs/readMe.md`
- Core roadmap: `src/core/.docs/DevelopmentRoadMap.md`

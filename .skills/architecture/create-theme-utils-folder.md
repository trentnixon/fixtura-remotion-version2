# Skill: Create Theme Utils Folder

## Purpose

Guides working with `src/core/utils/createThemeUtils`: understanding its structure, the flow from primary/secondary colors to ThemeColorUtils, how generators feed designPalettes, and when to use this path vs colorSystem. Use when navigating, extending, or debugging theme creation that uses `createThemeColorUtils`.

## Applies To

- `src/core/utils/createThemeUtils/` (root)
- `core/`: types, baseManipulation
- `generators/`: utilityColors, gradientUtils, textUtils, backgroundUtils, shadowUtils, contrastUtils, paletteGenerators
- Consumers: templates, ThemeContext (when using createThemeColorUtils path)
- designPalettes: `generateAllPalettes` receives tokens from createThemeUtils

## Inputs

- Primary and secondary color strings (hex, rgb, or named)
- Understanding of ThemeColorUtils return shape (variations, designPalettes)
- Access to designPalettes types (ColorVariations, TextColors, ShadowOptions, ContrastOptions, etc.)

## Process

### 1. Understand the Folder Hierarchy

```
src/core/utils/createThemeUtils/
├── index.ts              # createThemeColorUtils(primary, secondary)
├── core/
│   ├── types.ts         # ThemeColorUtils, ColorVariations, GradientOptions, etc.
│   └── baseManipulation.ts  # getContrastColor, lightenColor, darkenColor, setOpacity, saturateOrDesaturateColor
└── generators/
    ├── utilityColors.ts    # generateColorVariations, generateUtilityColors
    ├── gradientUtils.ts    # generateGradientOptions
    ├── textUtils.ts        # generateTextColors
    ├── backgroundUtils.ts  # generateBackgroundColors
    ├── shadowUtils.ts      # generateShadows
    ├── contrastUtils.ts    # calculateContrastSafety, generateContrastSafety
    └── paletteGenerators.ts # generateColorPalettes, getComplementaryColor, etc.
```

### 2. Understand the Creation Flow

1. **Entry**: `createThemeColorUtils(primary, secondary)` in `index.ts`
2. **Generators** (in order):
   - `generateColorVariations` for primary and secondary
   - `generateGradientOptions` for primary, secondary, primaryToSecondary, secondaryToPrimary
   - `generateUtilityColors(primary)`
   - `generateTextColors(primary, secondary)`
   - `generateBackgroundColors(primary, secondary)`
   - `generateShadows(primary)`
   - `generateContrastSafety(primary, secondary, background)`
3. **Delegate**: Pass all tokens to `designPalettes.generateAllPalettes(...)`
4. **Output**: `ThemeColorUtils` = { variations: { primary, secondary }, designPalettes }

### 3. createThemeUtils vs colorSystem

| Aspect | createThemeUtils | colorSystem |
|--------|------------------|-------------|
| **Entry** | `createThemeColorUtils(primary, secondary)` | `createColorSystem(primary, secondary, useMode)` |
| **ThemeMode** | No (always same structure) | Yes (drives container/background) |
| **Palette assembly** | designPalettes.generateAllPalettes | createStandardizedPalettes + standardPaletteFactory |
| **Output** | ThemeColorUtils (variations + designPalettes) | ColorSystem (variations + palettes + utils) |
| **Recommendation** | Legacy/alternative path | Prefer for new work; centralize here |

Per Core roadmap: prefer centralizing color logic in `colorSystem` and re-export via `createThemeUtils` when needed. Consider consolidating duplicate utilities.

### 4. When Adding a New Generator Token

1. Create or extend a generator in `generators/` (e.g. add to utilityColors, or new file)
2. Call it from `index.ts` in `createThemeColorUtils`
3. Pass the result to `generateAllPalettes` if designPalettes expects it (check designPalettes signature)
4. Update designPalettes types/assembly if the token is new

### 5. When Modifying Types

- `core/types.ts` defines ThemeColorUtils, ColorVariations, GradientOptions, ColorPalettes, ContrastSafety
- designPalettes has its own types (TextColors, ShadowOptions, ContrastOptions); createThemeUtils generators must produce shapes matching those
- Keep core types in sync with what generators return and designPalettes expects

### 6. Key Exports

- `createThemeColorUtils` (default)
- `core/types`: ThemeColorUtils, ColorVariations, GradientOptions, ColorPalettes, ContrastSafety
- `core/baseManipulation`: getContrastColor, lightenColor, darkenColor, setOpacity, saturateOrDesaturateColor
- All generator functions (generateColorVariations, generateGradientOptions, generateTextColors, etc.)

## Output

- Correct understanding of createThemeUtils flow and when to use it
- Ability to add or modify generators and pass tokens to designPalettes
- Clear distinction vs colorSystem for architectural decisions

## Rules

- All color operations use tinycolor2
- designPalettes.generateAllPalettes is the authority for assembling DesignPalette objects
- Generators produce plain objects; no ThemeMode—structure is fixed
- When consolidating: prefer colorSystem logic; createThemeUtils can re-export

## References

- createThemeUtils root: `src/core/utils/createThemeUtils/.docs/readMe.md`
- core: `src/core/utils/createThemeUtils/core/.docs/readMe.md`
- generators: `src/core/utils/createThemeUtils/generators/.docs/readMe.md`
- designPalettes: `src/core/utils/designPalettes/`
- Core roadmap: `src/core/.docs/DevelopmentRoadMap.md`
- colorSystem skill: `.skills/architecture/color-system-folder.md`

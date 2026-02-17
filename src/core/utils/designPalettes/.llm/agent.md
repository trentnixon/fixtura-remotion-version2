# Agent Brief — Design Palettes

## What This Feature Does

Curated design palettes assembled from color variations, text, background, utility, shadow, contrast, and gradient tokens. Defines the **DesignPalette** interface (name, background, container, text, shadow) — the canonical palette shape for the app. `generateAllPalettes(primary, secondary, colorVariations, textColors, backgrounds, utility, shadows, contrast, gradients)` produces named palettes (primary, secondary, dark, light, accent, complementary, triadic, monochromatic). Called by `createThemeUtils`; DesignPalette type consumed by ThemeContext, colorSystem, components (backgrounds, typography, containers), gradientResolver, and validationUtils. Uses tinycolor2 for contrast/color helpers.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/core/utils/designPalettes` — understanding DesignPalette structure, palette creators (primary, secondary, dark, light, accent, complementary, triadic, monochromatic), paletteHelpers, generateAllPalettes contract, and when adding/updating palette properties.
- **Expected dev level**: Mid engineer familiar with TypeScript and color/contrast basics. Awareness of createThemeUtils (token supplier), colorSystem (produces DesignPalette-shaped palettes independently), ThemeContext (selectedPalette, getActivePalette), and component consumers.

## Source of Truth

1. Roadmap → `src/core/utils/.docs/DevelopmentRoadMap.md` (TKT-2025-011 references designPalettes)
2. Docs → `src/core/utils/designPalettes/.docs/readMe.md`, `README.txt` (design guidance)
3. Skills → `/.skills/architecture/design-palettes-folder.md`, `/.skills/architecture/core-utils-folder.md`
4. Code reality → `index.ts`, `types.ts`, `paletteHelpers.ts`, palette creator files
5. Tickets → `src/core/utils/.docs/Tickets.md`

## Collaboration Phases

1. **Discovery** — Read docs and skills; understand DesignPalette structure, palette creators, token contract.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks; palettes conform to DesignPalette; no regressions in consumers.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| DesignPalettes root | `src/core/utils/designPalettes/.docs/readMe.md` |
| Design guidance | `src/core/utils/designPalettes/.docs/README.txt` |
| Parent roadmap | `src/core/utils/.docs/DevelopmentRoadMap.md` |
| Parent tickets | `src/core/utils/.docs/Tickets.md` |
| createThemeUtils (upstream) | `src/core/utils/createThemeUtils/.docs/readMe.md` |
| colorSystem (DesignPalette user) | `src/core/utils/colorSystem/.docs/readMe.md` |

## Roadmap

- **Path**: `src/core/utils/.docs/DevelopmentRoadMap.md`
- **How to use**: TKT-2025-011 (deprecate/merge themeColorUtils with colorSystem/designPalettes) may affect integration. DesignPalette is the shared contract; changes here impact colorSystem and all consumers.

## Tickets

- **Location**: `src/core/utils/.docs/Tickets.md`
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks.
- **Relevant**: TKT-2025-011 — themeColorUtils merge with colorSystem/designPalettes
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/design-palettes-folder.md` — Implementation guidance for this folder
- `/.skills/architecture/core-utils-folder.md` — When to use designPalettes vs colorSystem, createThemeUtils

Related (consumers and upstream):

- **createThemeUtils** — calls generateAllPalettes; supplies tokens
- **colorSystem** — produces DesignPalette-shaped palettes; uses DesignPalette type
- **ThemeContext** — selectedPalette, getActivePalette; palettes from colorSystem
- **Components** — typeStyles, backgroundStyles, typography variants, Gradient, Image overlays

## Module Map

| Module | Responsibility | Entry Points |
|--------|----------------|---------------|
| `index.ts` | generateAllPalettes; exports types, palette creators | `index.ts` |
| `types.ts` | DesignPalette, BackgroundOptions, ContainerOptions, TextOptions, ShadowOptions, ColorVariations, GradientOptions, ensureContrast, processUserColor | `types.ts` |
| `paletteHelpers.ts` | createCSSGradientOptions, createGradientOptions, createTextOptions, createContainerOptions | `paletteHelpers.ts` |
| `primaryPalette.ts` | createPrimaryPalette | `primaryPalette.ts` |
| `secondaryPalette.ts` | createSecondaryPalette | `secondaryPalette.ts` |
| `darkPalette.ts` | createDarkPalette | `darkPalette.ts` |
| `lightPalette.ts` | createLightPalette | `lightPalette.ts` |
| `accentPalette.ts` | createAccentPalette | `accentPalette.ts` |
| `complementaryPalette.ts` | createComplementaryPalette | `complementaryPalette.ts` |
| `triadicPalette.ts` | createTriadicPalette | `triadicPalette.ts` |
| `monochromaticPalette.ts` | createMonochromaticPalette | `monochromaticPalette.ts` |

## Implementation Guidelines

- **DesignPalette authority**: This folder defines the DesignPalette interface. Changes to it must propagate to all palette creators and colorSystem (standardPaletteStructure).
- **Update all palettes together**: When adding properties to DesignPalette, update every palette creator (primary, secondary, dark, light, accent, complementary, triadic, monochromatic).
- **Token contract**: generateAllPalettes expects colorVariations, textColors, backgrounds, utility, shadows, contrast, gradients from createThemeUtils.
- **paletteHelpers**: Use createCSSGradientOptions, createGradientOptions, createTextOptions, createContainerOptions for assembly.
- **Code quality**: Small functions, clear names; respect hierarchical structure (background, container, text, shadow).
- **Scope**: Limit edits to the task; palette structure changes require coordinated updates across creators and colorSystem.
- **Documentation**: All markdown in `.docs/`; keep readMe current when structure changes.
- **Security**: Never store secrets; avoid leaking sensitive data.

## Verification Checklist

- [ ] DesignPalette changes applied to all palette creators
- [ ] generateAllPalettes token contract preserved for createThemeUtils
- [ ] No regressions in ThemeContext, colorSystem, components (backgrounds, typography, containers)
- [ ] colorSystem standardPaletteStructure aligned if DesignPalette shape changed
- [ ] readMe updated if structure or exports change

## Memory Logging (optional)

Update `/.memory/*` when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- DesignPalettes has no dedicated DevelopmentRoadMap; uses parent utils.
- Skill `design-palettes-folder.md` may or may not exist; if missing, rely on readMe and README.txt.
- ThemeContext gets palettes from colorSystem (createColorSystem), not from createThemeUtils.designPalettes.
- Doc paths use readMe.md per repo convention.

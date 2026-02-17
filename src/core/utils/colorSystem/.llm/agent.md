# Agent Brief — Color System

## What This Feature Does

Color system for generating standardized palettes, gradients, shadows, and color operations. `createColorSystem(primary, secondary, useMode)` produces a complete system with variations, palettes (DesignPalette shape), and utils (getContrastColor, lightenColor, darkenColor, setOpacity). Consumed by ThemeContext, createThemeUtils, templates/themes, GradientBackground, and designPalettes. Uses tinycolor2 throughout (wrapped). Supports light/dark modes via ThemeMode from `templates/types`.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/core/utils/colorSystem` — understanding `createColorSystem`, palette configurations, standardized palette structure, generators (gradients, shadows, contrast, text), core base manipulation, color relationships, and when to extend vs use existing utilities.
- **Expected dev level**: Mid engineer familiar with TypeScript, color theory basics (HSL, RGB, LAB, LCH), and tinycolor2. Awareness of ThemeContext, designPalettes (DesignPalette shape), and templates (ThemeMode, ThemeSelectedPalette).

## Source of Truth

1. Roadmap → `src/core/utils/.docs/DevelopmentRoadMap.md` (parent utils; colorSystem-specific items via TKT-2025-010, TKT-2025-011)
2. Docs → `src/core/utils/colorSystem/.docs/readMe.md`, `core/.docs/readMe.md`, `config/.docs/readMe.md`, `generators/.docs/readMe.md`, `utils/.docs/readMe.md`
3. Skills → `/.skills/architecture/color-system-folder.md`, `/.skills/architecture/core-utils-folder.md`
4. Code reality → `index.ts`, `createStandardizedPalettes.ts`, `gradientResolver.ts`, `core/`, `config/`, `generators/`, `utils/`
5. Tickets → `src/core/utils/.docs/Tickets.md` (TKT-2025-010, TKT-2025-011 relate to color consolidation)

## Collaboration Phases

1. **Discovery** — Read docs and skills; understand createColorSystem flow, palette configurations, generators, designPalettes compatibility.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks; palettes render correctly in ThemeContext, templates, GradientBackground.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| Color system root | `src/core/utils/colorSystem/.docs/readMe.md` |
| Parent roadmap | `src/core/utils/.docs/DevelopmentRoadMap.md` |
| Parent tickets | `src/core/utils/.docs/Tickets.md` |
| Core (types, baseManipulation, colorRelationships, memoization) | `src/core/utils/colorSystem/core/.docs/readMe.md` |
| Config (constants, defaults, paletteConfigurations, standardPaletteStructure) | `src/core/utils/colorSystem/config/.docs/readMe.md` |
| Generators (gradients, shadows, contrast, text, color variations, utility) | `src/core/utils/colorSystem/generators/.docs/readMe.md` |
| Utils (accessibility, colorMath, colorSpaces, validation, tinycolorWrapper) | `src/core/utils/colorSystem/utils/.docs/readMe.md` |

## Roadmap

- **Path**: `src/core/utils/.docs/DevelopmentRoadMap.md`
- **How to use**: Tracks utils-wide work. Color-related: consolidate colors.ts vs colorSystem (TKT-2025-010), merge/deprecate themeColorUtils with colorSystem/designPalettes (TKT-2025-011). Use for prioritization; execution details in `Tickets.md`.

## Tickets

- **Location**: `src/core/utils/.docs/Tickets.md`
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks. Completed work summarized and archived to `Completed.md`.
- **Relevant**: TKT-2025-010 (consolidate colors.ts with colorSystem), TKT-2025-011 (themeColorUtils with colorSystem/designPalettes)
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/color-system-folder.md` — Implementation guidance for this color system
- `/.skills/architecture/core-utils-folder.md` — When to use colorSystem vs createThemeUtils, designPalettes, compositionMapping, datasetProcessing

Related (consumers and dependencies):

- DesignPalette shape lives in `src/core/utils/designPalettes/types`
- ThemeMode, ThemeSelectedPalette in `src/templates/types/TemplateThemeConfig`
- ThemeContext consumes createColorSystem in `src/core/context/ThemeContext.tsx`

## Module Map

| Module | Responsibility | Entry Points |
|--------|----------------|---------------|
| `index.ts` | Main entry; createColorSystem, exports types, baseManipulation, colorRelationships, config helpers, DEFAULT_COLORS, DEFAULT_PALETTE_PRESETS | `index.ts` |
| `createStandardizedPalettes.ts` | Orchestrates palette generation from configurations; calls standardPaletteFactory per config | `createStandardizedPalettes.ts` |
| `gradientResolver.ts` | Resolves CSS gradient strings from palettes; determineGradientTypeForPalette, resolvePaletteGradient | `gradientResolver.ts` |
| `core/` | types, baseManipulation, colorRelationships, memoization | `core/types.ts`, `core/baseManipulation.ts`, `core/colorRelationships.ts`, `core/memoization.ts` |
| `config/` | constants, defaultColors, paletteConfigurations, standardPaletteStructure | `config/constants.ts`, `config/defaultColors.ts`, `config/paletteConfigurations.ts`, `config/standardPaletteStructure.ts` |
| `generators/` | standardPaletteFactory, gradientGenerator, backgroundGenerator, contrastGenerator, colorVariations, shadowGenerator, textGenerator, utilityGenerator | `generators/standardPaletteFactory.ts` |
| `utils/` | accessibilityUtils, colorMath, colorSpaces, tinycolorWrapper, validationUtils | `utils/*.ts` |

## Implementation Guidelines

- **DesignPalette compatibility**: All palettes must conform to DesignPalette (background, container, text, shadow). Use config/standardPaletteStructure for shape.
- **ThemeMode**: Pass useMode through to generators and standardPaletteStructure for light/dark variants.
- **Color operations**: Use core/baseManipulation and core/colorRelationships; wrap tinycolor2 via utils/tinycolorWrapper or config constants (COLOR_AMOUNTS, COLOR_ANGLES).
- **Accessibility**: Use WCAG constants from config; accessibilityUtils for contrast and validation.
- **Gradients**: Use gradientGenerator for creation; gradientResolver for resolving palette gradients to CSS.
- **Code quality**: Small functions, clear names; guard early; validate color inputs (getValidColorOrFallback).
- **Scope**: Limit edits to the task; no broad refactors without approval.
- **Documentation**: All markdown in `.docs/`; keep readMe current when structure changes.
- **Security**: Never store secrets; avoid leaking sensitive data.

## Verification Checklist

- [ ] New palette configuration or generator follows existing patterns; standardPaletteFactory or createStandardizedPalettes updated
- [ ] DesignPalette shape respected; background, container, text, shadow sections complete
- [ ] ThemeMode passed through; light/dark variants correct
- [ ] No regressions in ThemeContext, templates, GradientBackground, or designPalettes consumers
- [ ] Contrast/accessibility utilities used where required (WCAG)
- [ ] readMe updated if structure or exports change

## Memory Logging (optional)

Update `/.memory/*` when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- Color system has no dedicated DevelopmentRoadMap; uses parent `src/core/utils/.docs/DevelopmentRoadMap.md`.
- Skill `color-system-folder.md` may or may not exist; if missing, rely on readMe docs and code structure.
- Consumers: ThemeContext, createThemeUtils, templates (Brickwork, Mudgeeraba, Classic), GradientBackground, designPalettes.
- Doc paths use readMe.md per repo convention.

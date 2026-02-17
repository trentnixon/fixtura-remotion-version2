# Agent Brief — Create Theme Utils

## What This Feature Does

Utilities to produce application themes from primary and secondary color inputs. `createThemeColorUtils(primary, secondary)` generates color variations, gradients, text colors, backgrounds, shadows, and contrast safety, then delegates to `designPalettes.generateAllPalettes` for final palette assembly. Returns `ThemeColorUtils` with `variations` and `designPalettes` (DesignPalette objects). Uses tinycolor2 for color operations. Alternative/legacy path alongside `colorSystem` — ThemeContext currently uses `createColorSystem`; createThemeUtils may be used by templates or legacy theme creation flows.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/core/utils/createThemeUtils` — understanding `createThemeColorUtils` flow, generators (utilityColors, gradientUtils, textUtils, backgroundUtils, shadowUtils, contrastUtils, paletteGenerators), delegation to designPalettes, and when to extend vs migrate logic to colorSystem.
- **Expected dev level**: Mid engineer familiar with TypeScript and tinycolor2. Awareness of designPalettes (DesignPalette, generateAllPalettes), colorSystem (consolidation direction), and ThemeContext (uses colorSystem).

## Source of Truth

1. Roadmap → `src/core/utils/.docs/DevelopmentRoadMap.md`, `src/core/.docs/DevelopmentRoadMap.md` (consolidation with colorSystem noted)
2. Docs → `src/core/utils/createThemeUtils/.docs/readMe.md`, `core/.docs/readMe.md`, `generators/.docs/readMe.md`
3. Skills → `/.skills/architecture/create-theme-utils-folder.md`, `/.skills/architecture/core-utils-folder.md`
4. Code reality → `index.ts`, `core/` (types, baseManipulation), `generators/` (utilityColors, gradientUtils, textUtils, backgroundUtils, shadowUtils, contrastUtils, paletteGenerators)
5. Tickets → `src/core/utils/.docs/Tickets.md` (TKT-2025-011: themeColorUtils merge with colorSystem/designPalettes)

## Collaboration Phases

1. **Discovery** — Read docs and skills; understand createThemeColorUtils flow, generator outputs, designPalettes contract.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks; designPalettes output correct; no regressions if used by consumers.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| CreateThemeUtils root | `src/core/utils/createThemeUtils/.docs/readMe.md` |
| Parent roadmap | `src/core/utils/.docs/DevelopmentRoadMap.md` |
| Core roadmap | `src/core/.docs/DevelopmentRoadMap.md` |
| Parent tickets | `src/core/utils/.docs/Tickets.md` |
| Core (types, baseManipulation) | `src/core/utils/createThemeUtils/core/.docs/readMe.md` |
| Generators | `src/core/utils/createThemeUtils/generators/.docs/readMe.md` |
| designPalettes (downstream) | `src/core/utils/designPalettes/.docs/readMe.md` |

## Roadmap

- **Path**: `src/core/utils/.docs/DevelopmentRoadMap.md`, `src/core/.docs/DevelopmentRoadMap.md`
- **How to use**: Utils roadmap tracks TKT-2025-011 (deprecate/merge themeColorUtils with colorSystem/designPalettes). Core roadmap prefers centralizing color logic in `colorSystem` and re-export via `createThemeUtils`. Use for prioritization; consolidation decisions affect this folder.

## Tickets

- **Location**: `src/core/utils/.docs/Tickets.md`
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks.
- **Relevant**: TKT-2025-011 — deprecate or merge themeColorUtils with colorSystem/designPalettes
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/create-theme-utils-folder.md` — Implementation guidance for this folder
- `/.skills/architecture/core-utils-folder.md` — When to use createThemeUtils vs colorSystem, designPalettes, compositionMapping

Related (consumers and dependencies):

- `designPalettes` — receives tokens from createThemeUtils via `generateAllPalettes`
- `colorSystem` — preferred for new color logic; consolidation direction
- DesignPalette shape in `src/core/utils/designPalettes/types`

## Module Map

| Module | Responsibility | Entry Points |
|--------|----------------|---------------|
| `index.ts` | Main entry; createThemeColorUtils(primary, secondary); orchestrates generators, calls generateAllPalettes | `index.ts` |
| `core/types.ts` | ThemeColorUtils, ColorVariations, GradientOptions, ColorPalettes, ContrastSafety | `core/types.ts` |
| `core/baseManipulation.ts` | getContrastColor, lightenColor, darkenColor, setOpacity, saturateOrDesaturateColor | `core/baseManipulation.ts` |
| `generators/utilityColors.ts` | generateColorVariations, generateUtilityColors, generateAlertColors | `generators/utilityColors.ts` |
| `generators/gradientUtils.ts` | generateGradientOptions, generateGradientBackground | `generators/gradientUtils.ts` |
| `generators/textUtils.ts` | generateTextColors | `generators/textUtils.ts` |
| `generators/backgroundUtils.ts` | generateBackgroundColors, getBackgroundColor | `generators/backgroundUtils.ts` |
| `generators/shadowUtils.ts` | generateShadows, generateThemedShadow | `generators/shadowUtils.ts` |
| `generators/contrastUtils.ts` | generateContrastSafety, getTitleColorOverGradient, getForegroundColor, calculateContrastSafety | `generators/contrastUtils.ts` |
| `generators/paletteGenerators.ts` | generateColorPalettes, generateGradientArray, getComplementaryColor, getSplitComplementaryColors, etc. | `generators/paletteGenerators.ts` |

## Implementation Guidelines

- **designPalettes contract**: All generator outputs must match what `generateAllPalettes` expects (colorVariations, textColors, backgrounds, utility, shadows, contrast, gradients).
- **Consolidation direction**: Core roadmap prefers colorSystem for color logic. When adding new color logic, consider colorSystem first; re-export or delegate from createThemeUtils if needed.
- **Color operations**: Use core/baseManipulation; same primitives as colorSystem (tinycolor2).
- **Code quality**: Small functions, clear names; guard early; validate color inputs.
- **Scope**: Limit edits to the task; consolidation/refactor only per roadmap and tickets.
- **Documentation**: All markdown in `.docs/`; keep readMe current when structure changes.
- **Security**: Never store secrets; avoid leaking sensitive data.

## Verification Checklist

- [ ] New generator or token follows designPalettes contract; generateAllPalettes receives expected shape
- [ ] No regressions in designPalettes output or downstream consumers
- [ ] Consolidation with colorSystem considered for new logic (per roadmap)
- [ ] readMe updated if structure or exports change

## Memory Logging (optional)

Update `/.memory/*` when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- CreateThemeUtils has no dedicated DevelopmentRoadMap; uses parent utils and core roadmaps.
- ThemeContext uses createColorSystem; createThemeUtils is alternative/legacy. Actual consumers of createThemeColorUtils may be templates or migration paths.
- Skill `create-theme-utils-folder.md` may or may not exist; if missing, rely on readMe docs and code structure.
- Doc paths use readMe.md per repo convention.

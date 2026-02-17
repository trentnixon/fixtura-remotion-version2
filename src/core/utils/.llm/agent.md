# Agent Brief — Core Utils

## What This Feature Does

Foundational utilities used app-wide: color systems, theme creation, data processing, environment, assets, and general helpers. Includes **colorSystem** (standardized palettes, gradients, shadows), **createThemeUtils** (theme from primary/secondary; delegates to designPalettes), **designPalettes** (DesignPalette interface, generateAllPalettes), **fonts** (font loading from `public/fonts/`), plus root-level files for classNames, routing, composition mapping, data processing, environment, and dev helpers. Consumed by templates, components, and core contexts.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/core/utils` — understanding folder structure, when to use colorSystem vs createThemeUtils vs designPalettes, root files vs subfolders, roadmap (reorganization, color consolidation), and routing work to the correct subfolder.
- **Expected dev level**: Mid engineer familiar with TypeScript, Remotion, and app architecture. Awareness of ThemeContext, FontContext, VideoDataContext, templates, compositions, and data flow.

## Source of Truth

1. Roadmap → `src/core/utils/.docs/DevelopmentRoadMap.md`, `src/core/.docs/DevelopmentRoadMap.md`
2. Docs → `src/core/utils/.docs/readMe.md`; subfolder docs: `colorSystem/.docs/`, `createThemeUtils/.docs/`, `designPalettes/.docs/`, `fonts/.docs/`
3. Skills → `/.skills/architecture/core-utils-folder.md`
4. Code reality → root files + subfolders (colorSystem, createThemeUtils, designPalettes, fonts)
5. Tickets → `src/core/utils/.docs/Tickets.md`

## Collaboration Phases

1. **Discovery** — Read docs and skill; understand scope, subfolder boundaries, roadmap.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks; no regressions in consumers.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| Utils root | `src/core/utils/.docs/readMe.md` |
| Roadmap | `src/core/utils/.docs/DevelopmentRoadMap.md` |
| Tickets | `src/core/utils/.docs/Tickets.md` |
| Core roadmap | `src/core/.docs/DevelopmentRoadMap.md` |
| colorSystem | `src/core/utils/colorSystem/.docs/readMe.md`, `.llm/agent.md` |
| createThemeUtils | `src/core/utils/createThemeUtils/.docs/readMe.md`, `.llm/agent.md` |
| designPalettes | `src/core/utils/designPalettes/.docs/readMe.md`, `.llm/agent.md` |
| fonts | `src/core/utils/fonts/.docs/readMe.md`, `.llm/agent.md` |

## Roadmap

- **Path**: `src/core/utils/.docs/DevelopmentRoadMap.md`
- **How to use**: TKT-2025-009 (reorganize root into general/composition/data folders), TKT-2025-010 (consolidate colors.ts with colorSystem), TKT-2025-011 (merge themeColorUtils with colorSystem/designPalettes), TKT-2025-012 (split general.ts). Execute per tickets; maintain backward-compat re-exports.

## Tickets

- **Location**: `src/core/utils/.docs/Tickets.md`
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks.
- **Active**: TKT-2025-009 (reorganize), TKT-2025-010 (colors consolidation), TKT-2025-011 (themeColorUtils merge), TKT-2025-012 (general.ts split)
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/core-utils-folder.md` — Routing, compositionMapping, datasetProcessing; when to use vs colorSystem/createThemeUtils

Related (subfolder agents for deep work):

- `colorSystem/.llm/agent.md` — palettes, gradients, shadows, createColorSystem
- `createThemeUtils/.llm/agent.md` — createThemeColorUtils, designPalettes delegation
- `designPalettes/.llm/agent.md` — DesignPalette, generateAllPalettes
- `fonts/.llm/agent.md` — font loading, fontPathMap, loadFontsFromTheme

## Module Map

| Module | Responsibility | Entry Points |
|--------|----------------|---------------|
| Root files | classNames, copy, general, helpers, objectUtils, colors, themeColorUtils, compositionMapping, dataProcessing, datasetProcessing, environment, routing, PlaceholderComponent | Various |
| `colorSystem/` | createColorSystem, palettes, gradients, shadows, baseManipulation | `colorSystem/index.ts` |
| `createThemeUtils/` | createThemeColorUtils, generators, designPalettes delegation | `createThemeUtils/index.ts` |
| `designPalettes/` | DesignPalette, generateAllPalettes, palette creators | `designPalettes/index.ts` |
| `fonts/` | fontLoader, fontPathMap, loadFontByName, loadFontsFromTheme | `fonts/fontLoader.ts` |

### Root File Summary

- **classNames.ts**, **copy.ts**, **general.ts**, **helpers.ts**, **objectUtils.ts**: generic helpers
- **colors.ts**, **themeColorUtils.ts**: color helpers (consolidation target per TKT-2025-010, TKT-2025-011)
- **compositionMapping.ts**: dataset IDs ↔ composition IDs
- **dataProcessing.ts**, **datasetProcessing.ts**: data normalization
- **environment.ts**: env flags and runtime checks
- **routing.tsx**: routing for compositions
- **PlaceholderComponent.tsx**: dev placeholder for rendering

## Implementation Guidelines

- **Route to subfolders**: Color work → colorSystem or createThemeUtils; palette assembly → designPalettes; font work → fonts. Use subfolder agent briefs for deep changes.
- **Consolidation direction**: Prefer colorSystem for color logic; re-export from createThemeUtils if needed. Deprecate/merge colors.ts and themeColorUtils per tickets.
- **Reorganization (TKT-2025-009)**: Move root files into general/, composition/, data/; use barrel exports and backward-compat re-exports.
- **Code quality**: Small functions, clear names; guard early; validate boundaries.
- **Scope**: Limit edits to the task; cross-folder refactors require roadmap/ticket alignment.
- **Documentation**: All markdown in `.docs/`; keep readMe current when structure changes.
- **Security**: Never store secrets; avoid leaking sensitive data.

## Verification Checklist

- [ ] Changes routed to correct subfolder (colorSystem, createThemeUtils, designPalettes, fonts)
- [ ] No regressions in templates, components, or core contexts
- [ ] Reorganization follows TKT-2025-009 phases; backward-compat re-exports in place
- [ ] Color consolidation aligns with TKT-2025-010, TKT-2025-011
- [ ] readMe updated if structure or exports change

## Memory Logging (optional)

Update `/.memory/*` when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- Skill `core-utils-folder.md` may or may not exist; if missing, rely on readMe and subfolder docs.
- images.ts referenced in readMe; verify if present at root.
- Doc paths use readMe.md per repo convention.

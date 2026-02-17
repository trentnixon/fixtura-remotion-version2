# Agent Brief — Templates

## What This Feature Does

Templates define composable video composition blueprints for the Fixtura Remotion system. Variants extend a shared base layout and theme to produce different branded looks while honoring a common contract for assets, settings, and animations. Compositions under `src/compositions` select variants via the registry to render video outputs.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/templates` — navigating structure, creating or modifying variants, documenting changes, and keeping the registry and types aligned.
- **Expected dev level**: Mid to senior engineer familiar with React, Remotion, and TypeScript. Comfort with composition patterns, theme overrides, and file-based conventions.

## Source of Truth

1. Roadmap → `src/templates/.docs/DevelopmentRoadMap.md`
2. Docs → `src/templates/.docs/readMe.md`, HowToCreateANewVariation.md, how-to.md
3. Skills → `/.skills/architecture/`, `/.skills/workflows/`
4. Code reality → registry, base, types, variants
5. Tickets → execution only (`src/templates/variants/.docs/Tickets.md`)

## Collaboration Phases

1. **Discovery** — Read docs, understand structure and contracts.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Tests and manual checks.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context    | Path |
|-----------|------|
| Templates root | `src/templates/.docs/readMe.md` |
| Base layout    | `src/templates/base/.docs/readMe.md` |
| Types          | `src/templates/types/.docs/readMe.md` |
| Variants       | `src/templates/variants/.docs/readMe.md` |
| Roadmap        | `src/templates/.docs/DevelopmentRoadMap.md` |
| How-to (short) | `src/templates/.docs/HowToCreateANewVariation.md` |
| How-to (full)  | `src/templates/.docs/how-to.md` |
| Tickets        | `src/templates/variants/.docs/Tickets.md` |

## Roadmap

- **Path**: `src/templates/.docs/DevelopmentRoadMap.md`
- **How to use**: Tracks high-level status (completed, to do, recommendations). Implementation detail lives in Tickets. When adding variants or changing structure, update roadmap and tickets accordingly.

## Tickets

- **Location**: `src/templates/variants/.docs/Tickets.md`
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks. Completed work is summarized and archived to `Completed.md`.
- **Role**: Execution planning only; decisions and conventions come from Roadmap and docs.

## Required Skills

- `/.skills/architecture/templates-folder-structure.md` — hierarchy, variant conventions, readMe rules
- `/.skills/architecture/templates-base-folder.md` — BaseTemplate, provider stack, extension points
- `/.skills/workflows/create-template-variant.md` — step-by-step new variant creation

## Module Map

| Module    | Responsibility                          | Entry Points |
|----------|------------------------------------------|--------------|
| `registry.tsx` | Maps template IDs to components and variants | `getTemplate`, `templateRegistry`, `TemplateId` |
| `base/`       | Shared layout, theme contract, providers | `index.tsx`, `BaseTemplateLayout.tsx`, `theme.ts` |
| `types/`      | Theme, settings, assets, animations contracts | `TemplateThemeConfig.ts`, `settingsConfig`, `AssetConfig`, `AnimationConfig` |
| `variants/`   | Per-variant implementations             | One folder per variant: `index.tsx`, `theme.ts`, `animations.ts`, `components/` |

Variant naming: PascalCase for registry keys and components (e.g., `Brickwork`, `BasicMainHeader`). Folders use camelCase (e.g., `twoColumnClassic`, `brickwork`).

## Implementation Guidelines

- **Code quality**: Small functions, clear names, consistent abstractions.
- **Components**: Extract when repeated or bloated; use variant prefix for variant-specific components.
- **Error handling**: No silent failures; handle missing assets and invalid props.
- **Null/undefined**: Guard early; validate boundaries.
- **Scope**: Limit edits to the task; no broad refactors without approval.
- **Security**: No secrets; avoid leaking sensitive data.
- **Documentation**: All markdown in `.docs/`; keep readMe.md current when structure changes.

## Verification Checklist

- [ ] Variant can be imported and rendered via registry
- [ ] Theme and settings propagate correctly
- [ ] No missing asset references
- [ ] Timings and animations behave as expected
- [ ] `readMe.md` present for new or modified folders
- [ ] Registry and index exports updated when adding variants

## Memory Logging (optional)

Update `/.memory/*` only when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- Root-level `Roadmap.md` / `ROADMAP.md` does not exist; roadmap is feature-scoped in `.docs/DevelopmentRoadMap.md`.
- Background system details: `src/components/backgrounds/.docs/README.md`.

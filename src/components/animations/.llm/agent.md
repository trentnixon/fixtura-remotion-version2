# Agent Brief — Components Animations

## What This Feature Does

The animations folder provides lightweight, generic animation configuration utilities for use across the component system. It exposes declarative presets (`getAnimationConfig`) for initial/final styles without frame-accurate Remotion logic. It complements domain-specific animation systems in `containers/animations`, `images/config`, and `typography/config/animations`. Use this folder when you need simple CSS/inline transition presets outside the Remotion frame graph; use the domain-specific systems for frame-accurate composition sequences.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/components/animations` — understanding when to use generic vs domain-specific animation systems, adding new presets to `AnimationVariant`, extending `getAnimationConfig`, and keeping the folder lightweight and composition-agnostic.
- **Expected dev level**: Mid engineer familiar with React, TypeScript, CSSProperties, and inline transitions. Awareness of Remotion’s frame-based model and how it differs from simple CSS transitions.

## Source of Truth

1. Roadmap → `src/components/.docs/DevelopmentRoadMap.md` (animations is a subfolder; no dedicated roadmap)
2. Docs → `src/components/animations/.docs/README.md`, `config/.docs/README.md`
3. Skills → `/.skills/architecture/components-animations-folder.md`
4. Code reality → `config/variants.ts`
5. Tickets → execution only; component-level tickets in `src/components/.docs/Tickets.md`

## Collaboration Phases

1. **Discovery** — Read docs and skill; understand structure and when to use vs domain-specific systems.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks, no frame-graph regressions.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| Animations root | `src/components/animations/.docs/README.md` |
| Config | `src/components/animations/config/.docs/README.md` |
| Parent roadmap | `src/components/.docs/DevelopmentRoadMap.md` |
| Component tickets | `src/components/.docs/Tickets.md` |

## Roadmap

- **Path**: `src/components/.docs/DevelopmentRoadMap.md`
- **How to use**: Animations does not have its own roadmap. Track high-level status at the components level. When adding presets or changing structure, ensure the animations folder stays lightweight and non–frame-accurate.

## Tickets

- **Location**: `src/components/.docs/Tickets.md` (components-wide; animations mentioned where relevant)
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks. Completed work summarized and archived to `Completed.md`.
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/components-animations-folder.md` — generic animation configs, getAnimationConfig; when to use vs domain-specific
- `/.skills/architecture/components-folder-structure.md` — parent structure, cross-cutting concerns, animation system choice

Related (for routing, not direct use in animations):

- `/.skills/architecture/components-containers-folder.md` — frame-accurate container animations
- `/.skills/architecture/components-images-folder.md` — image entry/exit animations
- `/.skills/architecture/components-typography-folder.md` — typography animations

## Module Map

| Module | Responsibility | Entry Points |
|--------|-----------------|--------------|
| `config/` | AnimationVariant union, AnimationConfig type, getAnimationConfig | `config/variants.ts` |
| `config/variants.ts` | Variant definitions (fadeIn, fadeOut, slideIn, slideOut, zoomIn, zoomOut, bounce, pulse); getAnimationConfig(variant, duration?, delay?) | Exports `AnimationVariant`, `AnimationConfig`, `getAnimationConfig` |

No root-level files; all exports live in `config/`.

## Implementation Guidelines

- **Lightweight**: No frame-accurate Remotion logic; no per-frame interpolate/spring.
- **Generic presets**: Add variants to `AnimationVariant` union and extend `getAnimationConfig` switch; keep presets composition-agnostic.
- **No duplication**: Do not duplicate logic from `containers/animations`, `images/config`, or `typography/config/animations`.
- **Code quality**: Small functions, clear names.
- **Null/undefined**: Guard early; validate boundaries.
- **Scope**: Limit edits to the task; no broad refactors without approval.
- **Documentation**: All markdown in `.docs/`; keep readMe.md current when structure changes.

## Verification Checklist

- [ ] New variant added to `AnimationVariant` union
- [ ] `getAnimationConfig` returns correct `initialStyles` / `finalStyles` for the variant
- [ ] Presets remain generic (no composition-specific logic)
- [ ] No frame-accurate Remotion APIs introduced
- [ ] `readMe.md` updated if structure or exports change
- [ ] Domain-specific animation needs routed to containers/images/typography as appropriate

## Memory Logging (optional)

Update `/.memory/*` only when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- Animations folder has no dedicated DevelopmentRoadMap or Tickets.md; planning is at `src/components/.docs/`.
- `getAnimationConfig` is documented as a generic helper; consumers may reference it for simple presets. Frame-accurate composition work uses `useAnimationContext()` and domain-specific systems.
- Actual docs use `README.md` (uppercase) in `.docs/`; skill references `readMe.md` (lowercase) — both refer to the same files.

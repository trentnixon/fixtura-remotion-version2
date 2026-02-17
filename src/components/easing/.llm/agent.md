# Agent Brief — Components Easing

## What This Feature Does

Shared easing types and utilities for mapping declarative easing descriptors to Remotion-compatible easing functions. Exposes `getImageEasingFunction(easing)` → `(t: number) => number` for use with `interpolate`. Supports simple strings (linear, ease, quad, cubic, sin, circle, exp, bounce), parameterized types (poly, elastic, back, bezier), and composed in/out/inOut. Provides cross-domain types (`ImageEasingType`, `ImageAnimationType`, `ImageAnimationConfig`, `ImageSpringConfig`) consumed by images/config, containers/animations, and typography/config/animations.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/components/easing` — understanding `getImageEasingFunction` flow, adding new easing types or descriptors, extending the mapping in sync with `ImageEasingType`, and keeping shared easing aligned across consumers.
- **Expected dev level**: Mid engineer familiar with TypeScript, Remotion (interpolate, Easing API), and animation curves. Awareness of how images, containers, and typography consume easing via their config layers.

## Source of Truth

1. Roadmap → `src/components/.docs/DevelopmentRoadMap.md` (easing is a subfolder; no dedicated roadmap)
2. Docs → `src/components/easing/.docs/README.md`
3. Skills → `/.skills/architecture/components-easing-folder.md`
4. Code reality → `types.ts`, `easingFunctions.ts`
5. Tickets → execution only; component-level tickets in `src/components/.docs/Tickets.md`

## Collaboration Phases

1. **Discovery** — Read docs and skill; understand getImageEasingFunction mapping and consumer usage.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks; ensure consumers (images, containers, typography) receive correct curves.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| Easing root | `src/components/easing/.docs/README.md` |
| Parent roadmap | `src/components/.docs/DevelopmentRoadMap.md` |
| Component tickets | `src/components/.docs/Tickets.md` |

## Roadmap

- **Path**: `src/components/.docs/DevelopmentRoadMap.md`
- **How to use**: Easing does not have its own roadmap. Track high-level status at the components level. Easing system is completed; when adding easing types or changing structure, ensure types stay in sync with `easingFunctions.ts` mapping and consumers can pass new descriptors.

## Tickets

- **Location**: `src/components/.docs/Tickets.md` (components-wide; easing mentioned where relevant)
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks. Completed work summarized and archived to `Completed.md`.
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/components-easing-folder.md` — getImageEasingFunction; ImageEasingType; supported descriptors; adding new easing types; consumer usage
- `/.skills/architecture/components-folder-structure.md` — parent structure; when to use easing vs ad hoc curves; animation system choice

Related (for routing, not direct use in easing):

- `/.skills/architecture/components-images-folder.md` — image entry/exit animations (images/config consumes easing)
- `/.skills/architecture/components-containers-folder.md` — container animations (containers/animations consumes easing)
- `/.skills/architecture/components-typography-folder.md` — typography animations (typography/config/animations consumes easing)

## Module Map

| Module | Responsibility | Entry Points |
|--------|-----------------|--------------|
| `types.ts` | ImageEasingType, ImageAnimationType, ImageSpringConfig, ImageAnimationConfig, ImageAnimationProps, AnimationFunction | Exports shared cross-domain animation types |
| `easingFunctions.ts` | getImageEasingFunction(easing?) → (t: number) => number | Maps declarative descriptors to Remotion Easing; supports strings, poly, elastic, back, bezier, in/out/inOut |

No root-level index; consumers import directly from `types.ts` and `easingFunctions.ts`.

## Implementation Guidelines

- **Shared over ad hoc**: Prefer easing from this folder in images, containers, typography; avoid duplicate easing logic.
- **Type–function sync**: When adding a new easing descriptor, update `ImageEasingType` in `types.ts` and the mapping in `easingFunctions.ts`.
- **Remotion compatibility**: All outputs must be `(t: number) => number` usable with `interpolate(..., { easing: fn })`.
- **Code quality**: Small functions, clear names; guard early; validate boundaries.
- **Scope**: Limit edits to the task; no broad refactors without approval.
- **Documentation**: All markdown in `.docs/`; keep README current when structure changes.
- **Security**: Never store secrets; no sensitive data in easing.

## Verification Checklist

- [ ] New easing type added to `ImageEasingType` union
- [ ] `getImageEasingFunction` handles the new descriptor correctly
- [ ] Consumers (images, containers, typography) can pass the descriptor via their config
- [ ] Types remain in sync with easingFunctions mapping
- [ ] README updated if structure or exports change
- [ ] No ad hoc easing logic introduced in consumer folders

## Memory Logging (optional)

Update `/.memory/*` only when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- Easing folder has no dedicated DevelopmentRoadMap or Tickets.md; planning is at `src/components/.docs/`.
- `getImageEasingFunction` is named historically for images but is shared across images, containers, typography; renaming would require a coordinated refactor.
- Default easing when omitted: `{ type: "inOut", base: "ease" }` per easingFunctions docstring; consumers may rely on this default.

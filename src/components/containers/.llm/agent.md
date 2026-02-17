# Agent Brief — Components Containers

## What This Feature Does

Theme-aware, animation-first container system. AnimatedContainer combines palette-driven styling (type, size, rounded, shadow, backgroundColor) with frame-accurate entry/exit animations via normalizeContainerAnimation and useAnimation. Exposes pre-wired modules (FadeIn, SlideIn, ScaleIn, reveal, spring, threeD) and raw AnimatedContainer for custom configs. Uses ThemeContext, shared easing from `../easing`, and Remotion interpolate/spring. Consumed by cricket compositions (ladder, results, teamRoster, top5, upcoming), templates (variants), and layout components.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/components/containers` — understanding AnimatedContainer props (type, size, rounded, shadow, backgroundColor, animation, exitAnimation, exitFrame), entry/exit flow (normalizeContainerAnimation → useAnimation → calculateAnimationStyles), when to use modules vs raw AnimatedContainer, and adding new animation types or modules.
- **Expected dev level**: Mid engineer familiar with React, TypeScript, Remotion (useCurrentFrame, interpolate, spring). Awareness of ThemeContext, shared easing from `../easing`, and animation utility structure (fade, slide, scale, perspective, spring, special).

## Source of Truth

1. Roadmap → `src/components/containers/.docs/DevelopmentRoadMap.md`
2. Docs → `src/components/containers/.docs/README.md`, `animations/.docs/README.md`, `styles/.docs/README.md`, `modules/.docs/README.md`, `examples/.docs/README.md`
3. Skills → `/.skills/architecture/components-containers-folder.md`
4. Code reality → `AnimatedContainer.tsx`, `types.ts`, `animations/` (animationUtils, useAnimation, utils), `styles/`, `modules/`, `examples/`
5. Tickets → execution only; component-level tickets in `src/components/.docs/Tickets.md`

## Collaboration Phases

1. **Discovery** — Read docs and skill; understand AnimatedContainer, entry/exit flow, modules vs raw, style mappers.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks; container renders correctly in compositions and templates.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| Containers root | `src/components/containers/.docs/README.md` |
| Roadmap | `src/components/containers/.docs/DevelopmentRoadMap.md` |
| Animations | `src/components/containers/animations/.docs/README.md` |
| Animations utils | `src/components/containers/animations/utils/.docs/README.md` |
| Styles | `src/components/containers/styles/.docs/README.md` |
| Modules | `src/components/containers/modules/.docs/README.md` |
| Examples | `src/components/containers/examples/.docs/README.md` |
| Parent roadmap | `src/components/.docs/DevelopmentRoadMap.md` |
| Component tickets | `src/components/.docs/Tickets.md` |

## Roadmap

- **Path**: `src/components/containers/.docs/DevelopmentRoadMap.md`
- **How to use**: Tracks completed work (AnimatedContainer, animation system, theme integration, style system, modules, examples). To Do: performance optimizations, new animation types, advanced features, accessibility, testing, developer experience. Use for prioritization; execution details in Tickets.

## Tickets

- **Location**: `src/components/.docs/Tickets.md` (components-wide; containers mentioned where relevant)
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks. Completed work summarized and archived to `Completed.md`.
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/components-containers-folder.md` — AnimatedContainer; animations, styles, modules; entry/exit flow; when to use modules vs raw
- `/.skills/architecture/components-folder-structure.md` — parent structure, ThemeContext/VideoDataContext integration

Related (for shared dependencies and consumers):

- `/.skills/architecture/components-easing-folder.md` — containers consumes easing for animations
- `/.skills/architecture/components-animations-folder.md` — generic presets; containers has domain-specific frame-accurate animations
- `/.skills/architecture/components-images-folder.md` — different entry/exit model; shared easing
- `/.skills/architecture/components-typography-folder.md` — shared easing; different domain
- `/.skills/architecture/components-backgrounds-folder.md` — frame-accurate animations share concepts

## Module Map

| Module | Responsibility | Entry Points |
|--------|----------------|--------------|
| `AnimatedContainer.tsx` | Main component; props: type, size, rounded, shadow, backgroundColor, animation, exitAnimation, exitFrame | `AnimatedContainer.tsx` |
| `types.ts` | ContainerType, ContainerSize, ContainerRounded, ContainerShadow, ContainerBackgroundColor, ContainerProps | `types.ts` |
| `index.ts` | Barrel export (AnimatedContainer, types, animations, styles, modules, examples) | `index.ts` |
| `animations/` | animationTypes, animationUtils, useAnimation, springConfigs; normalizeContainerAnimation, calculateAnimationProgress, calculateAnimationStyles | `animations/animationUtils.ts`, `animations/useAnimation.ts` |
| `animations/utils/` | fade, slide, scale, perspective, spring, special — category-specific calculators | `animations/utils/*.ts` |
| `styles/` | backgroundStyles, typeStyles, sizeStyles, roundedStyles, shadowStyles | `styles/*.ts` |
| `modules/` | FadeIn, SlideIn, ScaleIn, reveal, spring, threeD (FlipX, FlipY, Rotate3D, etc.) | `modules/*.tsx` |
| `examples/` | AnimatedContainerExamples; BasicContainer, FadeInContainer, SlideInContainer, etc. | `examples/AnimatedContainerExamples.tsx` |

## Implementation Guidelines

- **Styles from ThemeContext**: Use palette-driven getBackgroundColorStyle, getTypeStyles, getSizeStyles, getRoundedStyles, getShadowStyles; do not hardcode.
- **Shared easing**: Use `../easing`; do not duplicate easing logic.
- **Modules vs raw**: Use modules for common patterns (fade, slide, scale, reveal, spring, threeD); use raw AnimatedContainer for custom or composite needs.
- **New animation types**: Add to ContainerAnimationType union; implement calculator in animations/utils/; wire into calculateAnimationStyles; optionally add module.
- **New modules**: Create in modules/; wrap AnimatedContainer with fixed animation config; export from modules/index.ts.
- **Code quality**: Small functions, clear names; guard early; validate boundaries.
- **Scope**: Limit edits to the task; no broad refactors without approval.
- **Documentation**: All markdown in `.docs/`; keep readMe current when structure changes.
- **Security**: Never store secrets; avoid leaking sensitive data.

## Verification Checklist

- [ ] New animation type or module added per skill; animationUtils or modules updated
- [ ] AnimatedContainer used correctly (type, size, animation, exitAnimation, exitFrame props)
- [ ] Shared easing from `../easing`; no local easing duplication
- [ ] Modules wrap AnimatedContainer; no duplicate animation logic
- [ ] No regressions in consuming compositions (ladder, results, teamRoster, top5, upcoming) or templates
- [ ] readMe updated if structure or exports change

## Memory Logging (optional)

Update `/.memory/*` only when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- Containers has dedicated DevelopmentRoadMap at `containers/.docs/DevelopmentRoadMap.md`.
- Skill `components-containers-folder.md` exists and is authoritative for container behavior.
- Consumers: cricket compositions (ladder, results, teamRoster, top5, upcoming), templates (Brickwork, Mudgeeraba, Classic), layout. Tickets at `src/components/.docs/Tickets.md`.
- Doc paths use README.md (capital) per repo convention; skill references readMe.md — both resolve to same files.

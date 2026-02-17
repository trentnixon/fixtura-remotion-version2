# Agent Brief — Components Transitions

## What This Feature Does

Thin wrappers around `@remotion/transitions` for applying transitions between sequences or around a single child. Maps declarative props to TransitionSeries and TransitionPresentation. TransitionWrapper wraps one child in Sequence + Transition; TransitionSeriesWrapper renders an array of `{ content, durationInFrames }` with transitions between each. Supports transitionType (slide, fade, wipe, clockWipe, flip, none), direction, timing (linear|spring), width, height. Consumed by compositions (upcoming, ladder, results, resultSingle, performances, teamRoster) and templates for between-scene motion.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/components/transitions` — understanding TransitionWrapper vs TransitionSeriesWrapper, when to use linear vs spring timing, adding or configuring transition types, and keeping wrappers thin.
- **Expected dev level**: Mid engineer familiar with React, TypeScript, Remotion, and @remotion/transitions. Awareness of TransitionSeries, TransitionPresentation, linearTiming, springTiming, and declarative transition mapping.

## Source of Truth

1. Roadmap → `src/components/.docs/DevelopmentRoadMap.md` (transitions has no dedicated roadmap)
2. Docs → `src/components/transitions/.docs/README.md`
3. Skills → `/.skills/architecture/components-transitions-folder.md`
4. Code reality → `TransitionWrapper.tsx`, `TransitionSeriesWrapper.tsx`, `index.ts`
5. Tickets → execution only; component-level tickets in `src/components/.docs/Tickets.md`

## Collaboration Phases

1. **Discovery** — Read docs and skill; understand TransitionWrapper vs TransitionSeriesWrapper, transition types, timing (linear vs spring).
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks, transitions render correctly between sequences.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| Transitions root | `src/components/transitions/.docs/README.md` |
| Parent roadmap | `src/components/.docs/DevelopmentRoadMap.md` |
| Component tickets | `src/components/.docs/Tickets.md` |

## Roadmap

- **Path**: `src/components/.docs/DevelopmentRoadMap.md`
- **How to use**: Transitions does not have its own roadmap. Track high-level status at the components level. Transition system marked completed. Use for prioritization; execution details in Tickets.

## Tickets

- **Location**: `src/components/.docs/Tickets.md` (components-wide; transitions mentioned where relevant)
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks. Completed work summarized and archived to `Completed.md`.
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/components-transitions-folder.md` — TransitionWrapper, TransitionSeriesWrapper; linear vs spring timing; when to use each wrapper; adding transition types
- `/.skills/architecture/components-folder-structure.md` — parent structure, cross-cutting concerns

Related (for consumers, not direct use in transitions):

- `/.skills/architecture/components-animations-folder.md` — generic presets; transitions are between-scene motion, different domain
- `/.skills/architecture/cricket-upcoming-folder.md` — uses TransitionSeriesWrapper for screen-to-screen transitions
- `/.skills/architecture/cricket-performances-folder.md` — uses TransitionSeriesWrapper for pagination transitions
- `/.skills/architecture/cricket-results-folder.md` — uses TransitionSeriesWrapper for screen transitions

## Module Map

| Module | Responsibility | Entry Points |
|--------|----------------|--------------|
| `TransitionWrapper.tsx` | Single child in TransitionSeries.Sequence + Transition; getTransitionPresentation, getTiming | `TransitionWrapper.tsx` |
| `TransitionSeriesWrapper.tsx` | Array of sequences; renders TransitionSeries.Sequence per item with Transition between each; same presentation/timing as TransitionWrapper | `TransitionSeriesWrapper.tsx` |
| `index.ts` | Barrel export (TransitionWrapper, TransitionSeriesWrapper, types) | `index.ts` |

## Implementation Guidelines

- **Thin wrappers**: Map declarative props to @remotion/transitions; do not implement custom transitions.
- **Use @remotion/transitions**: slide, fade, wipe, clockWipe, flip, none — verify support before adding new types.
- **Timing**: linear for predictable duration-based; spring for physics-based natural feel.
- **Content ownership**: Compositions/templates own the content; transitions only wrap.
- **Code quality**: Small functions, clear names; guard early; validate boundaries.
- **Scope**: Limit edits to the task; no broad refactors without approval.
- **Documentation**: All markdown in `.docs/`; keep readMe current when structure changes.
- **Security**: Never store secrets; avoid leaking sensitive data.

## Verification Checklist

- [ ] New transition type added to union and getTransitionPresentation; @remotion/transitions supports it
- [ ] TransitionWrapper vs TransitionSeriesWrapper used correctly (single child vs array of sequences)
- [ ] Timing (linear vs spring) chosen appropriately
- [ ] Wrappers remain thin; no composition logic moved into transitions
- [ ] No regressions in consuming compositions (upcoming, ladder, results, performances, teamRoster)
- [ ] readMe updated if structure or exports change

## Memory Logging (optional)

Update `/.memory/*` only when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- Transitions has no dedicated DevelopmentRoadMap or Tickets.md; planning is at `src/components/.docs/`.
- Skill `components-transitions-folder.md` exists and is authoritative for transitions behavior.
- Consumers: cricket compositions (upcoming, ladder, results, resultSingle, performances, teamRoster), templates how-to.

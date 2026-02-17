# Agent Brief — Components Layout

## What This Feature Does

Reusable layout primitives for assembling video scenes: screen containers (OneColumn, TwoColumn), header layouts with vertical and two-column variants, title-screen permutations with Logo/Title/Name/PrimarySponsor slots, sponsor layouts. Uses ThemeContext.layout.heights for header/content split. Slot-based composition pattern: layouts accept slots as React children; compositions pass AnimatedContainer, AnimatedText, AnimatedImage. Integrates RouteToComposition (content area) and ProgressTimer. Consumed by compositions, templates, and core routing.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/components/layout` — understanding OneColumn/screen flow, header and titleScreen variants (VerticalStack, TwoColumnLayout), slot composition, adding layout variants, RouteToComposition integration, and ThemeContext.layout usage.
- **Expected dev level**: Mid engineer familiar with React, TypeScript, Remotion (AbsoluteFill). Awareness of flexbox utilities (getAlignmentClasses), slot/children composition, and theme-driven layout heights.

## Source of Truth

1. Roadmap → `src/components/layout/.docs/DevelopmentRoadMap.md`
2. Docs → `src/components/layout/.docs/README.md`, `screen/.docs/README.md`, `main/header/.docs/README.md`, `titleScreen/.docs/README.md`, `sponsors/.docs/README.md`
3. Skills → `/.skills/architecture/components-layout-folder.md`
4. Code reality → `screen/OneColumn.tsx`, `main/header/`, `titleScreen/`, `main/Timer/ProgressTimer.tsx`
5. Tickets → execution only; component-level tickets in `src/components/.docs/Tickets.md`

## Collaboration Phases

1. **Discovery** — Read docs and skill; understand OneColumn, header/titleScreen variants, slot pattern, RouteToComposition.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks, layout renders correctly, no regressions.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| Layout root | `src/components/layout/.docs/README.md` |
| Roadmap | `src/components/layout/.docs/DevelopmentRoadMap.md` |
| Screen | `src/components/layout/screen/.docs/README.md` |
| Header | `src/components/layout/main/header/.docs/README.md` |
| Header variants | `src/components/layout/main/header/variants/.docs/README.md` |
| Title screen | `src/components/layout/titleScreen/.docs/README.md` |
| Title screen variants | `src/components/layout/titleScreen/variants/.docs/README.md` |
| Sponsors | `src/components/layout/sponsors/.docs/README.md` |
| Parent roadmap | `src/components/.docs/DevelopmentRoadMap.md` |
| Component tickets | `src/components/.docs/Tickets.md` |

## Roadmap

- **Path**: `src/components/layout/.docs/DevelopmentRoadMap.md`
- **How to use**: Tracks completed work (OneColumn, header/titleScreen variants, theme integration, slot system, alignment, responsive support). To Do: three-column variants, grid-based layouts, layout animation system, responsive breakpoints, accessibility, testing, developer experience. Use for prioritization; execution details in Tickets.

## Tickets

- **Location**: `src/components/.docs/Tickets.md` (components-wide; layout mentioned where relevant)
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks. Completed work summarized and archived to `Completed.md`.
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/components-layout-folder.md` — OneColumn, header, titleScreen, sponsors; RouteToComposition; slot composition pattern; when to add layout variants
- `/.skills/architecture/components-folder-structure.md` — parent structure, ThemeContext/VideoDataContext integration

Related (for routing, not direct use in layout):

- `/.skills/architecture/templates-base-folder.md` — BaseTemplateLayout, mainComponentLayout; layout consumed by templates
- `/.skills/architecture/config-folder.md` — contentLayout defaults; layout uses theme heights, not contentLayout directly
- `/.skills/architecture/core-context-folder.md` — ThemeContext.layout, LayoutContext; layout reads layout.heights

## Module Map

| Module | Responsibility | Entry Points |
|--------|----------------|--------------|
| `screen/` | OneColumn, TwoColumn; ThemeContext.layout.heights; RouteToComposition; ProgressTimer | `screen/OneColumn.tsx`, `screen/TwoColumn.tsx` |
| `main/header/` | Header variants; slots: Title, Logo, Name; getAlignmentClasses; VerticalStack, TwoColumnLayout | `main/header/index.tsx`, `main/header/types.ts` |
| `main/header/variants/` | VerticalStack.tsx, TwoColumnLayout.tsx — concrete permutations | `variants/VerticalStack.tsx`, `variants/TwoColumnLayout.tsx` |
| `main/Timer/` | ProgressTimer for timer layouts | `main/Timer/ProgressTimer.tsx` |
| `titleScreen/` | Title-screen variants; Logo, Title, Name, PrimarySponsor slots | `titleScreen/index.tsx`, `titleScreen/types.ts` |
| `titleScreen/variants/` | VerticalStack, TwoColumnLayout for title screens | `titleScreen/variants/*.tsx` |
| `sponsors/` | Sponsor layout components | `sponsors/` |

## Implementation Guidelines

- **Slot pattern**: Layouts accept slots as children/props; compositions pass AnimatedContainer, AnimatedText, AnimatedImage.
- **ThemeContext.layout.heights**: Use for header/content split; do not hardcode heights.
- **getAlignmentClasses**: Use for vertical/horizontal alignment in variants.
- **New variants**: Create in header/variants/ or titleScreen/variants/; use slot props; export from parent index.
- **RouteToComposition**: Lives in core/utils/routing; screen wrappers render it in content area.
- **Code quality**: Small functions, clear names; guard early; validate boundaries.
- **Scope**: Limit edits to the task; no broad refactors without approval.
- **Documentation**: All markdown in `.docs/`; keep readMe current when structure changes.
- **Security**: Never store secrets; avoid leaking sensitive data.

## Verification Checklist

- [ ] New variant added in correct variants/ folder
- [ ] Slot props used consistently; getAlignmentClasses where needed
- [ ] ThemeContext.layout.heights used; no hardcoded dimensions
- [ ] Exported from parent index
- [ ] RouteToComposition renders in screen content area
- [ ] No regressions in OneColumn, header, or titleScreen layouts
- [ ] readMe updated if structure or exports change

## Memory Logging (optional)

Update `/.memory/*` only when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- Layout has comprehensive roadmap and documentation; screen, header, titleScreen, sponsors have child readMes.
- Tickets are at `src/components/.docs/Tickets.md`; no dedicated layout Tickets.md.
- sponsors/ is documented; may be placeholder depending on implementation.

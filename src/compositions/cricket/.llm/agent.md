# Agent Brief — Cricket Compositions

## What This Feature Does

Cricket compositions are Remotion video composition implementations for cricket-specific data displays. The feature provides eight composition types (Ladder, Top 5, Results, Result Single, Upcoming, Team Roster, Performances, Team of the Week) that render ladder tables, match results, player rankings, rosters, and fixtures. Each composition type supports multiple template variants (Basic, Classic, Brickwork, Mudgeeraba, CNSW, etc.); compositions consume template themes and animations while implementing cricket-specific layout and data logic. The system integrates with `src/templates` variants and `src/core/utils/routing.tsx` for video rendering.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/compositions/cricket` — navigating composition families, adding or modifying variants, following how-to guides, and keeping exports and routing aligned.
- **Expected dev level**: Mid to senior engineer familiar with React, Remotion, TypeScript. Comfort with composition patterns, controller/display separation, and variant mapping.

## Source of Truth

1. Roadmap → `src/compositions/cricket/.docs/DevelopmentRoadMap.md`
2. Docs → `src/compositions/cricket/.docs/README.md`, `how-to-create-cricket-variant.md`, per-composition `how-to.md`
3. Skills → `/.skills/architecture/cricket-compositions-feature.md`, `cricket-*-folder.md`
4. Code reality → `cricket/index.tsx`, composition folders, routing
5. Tickets → execution only (scattered in subfolders, e.g. `resultSingle/layout/MatchCard/.docs/Tickets.md`)

## Collaboration Phases

1. **Discovery** — Read docs, understand composition types and variant structure.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Tests and manual checks.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|--------|------|
| Cricket root | `src/compositions/cricket/.docs/README.md` |
| Roadmap | `src/compositions/cricket/.docs/DevelopmentRoadMap.md` |
| How-to (full variant) | `src/compositions/cricket/.docs/how-to-create-cricket-variant.md` |
| Ladder | `src/compositions/cricket/ladder/.docs/how-to.md`, `readMe.md` |
| Top 5 | `src/compositions/cricket/top5/.docs/how-to.md`, `readMe.md` |
| Results | `src/compositions/cricket/results/.docs/how-to.md`, `readMe.md` |
| Result Single | `src/compositions/cricket/resultSingle/.docs/how-to.md`, `readMe.md` |
| Upcoming | `src/compositions/cricket/upcoming/.docs/how-to.md`, `readMe.md` |
| Team Roster | `src/compositions/cricket/teamRoster/.docs/how-to.md`, `readMe.md` |
| Performances | `src/compositions/cricket/performances/.docs/how-to.md`, `readMe.md` |
| Team of the Week | `src/compositions/cricket/TeamOfTheWeek/.docs/how-to.md`, `readMe.md` |
| Routing | `src/core/utils/routing.tsx` |
| Template variants | `src/templates/variants/` |

## Roadmap

- **Path**: `src/compositions/cricket/.docs/DevelopmentRoadMap.md`
- **How to use**: Tracks high-level status (completed, to do, recommendations). Implementation detail lives in composition how-to guides and per-folder tickets. When adding variants or changing structure, update roadmap and follow how-to guides.

## Tickets

- **Location**: Per-composition or per-module (e.g. `resultSingle/layout/MatchCard/.docs/Tickets.md`, `TeamOfTheWeek/.docs/Tickets.md`, `performances/.docs/Tickets.md`)
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks. Completed work summarized and archived to `Completed.md`.
- **Role**: Execution planning only; decisions and conventions come from Roadmap and docs.

## Required Skills

- `/.skills/architecture/cricket-compositions-feature.md` — feature-level guidance, composition types, export structure, routing
- `/.skills/architecture/cricket-ladder-folder.md` — ladder composition
- `/.skills/architecture/cricket-results-folder.md` — results composition
- `/.skills/architecture/cricket-result-single-folder.md` — result single composition
- `/.skills/architecture/cricket-top5-folder.md` — top 5 composition
- `/.skills/architecture/cricket-upcoming-folder.md` — upcoming composition
- `/.skills/architecture/cricket-team-roster-folder.md` — team roster composition
- `/.skills/architecture/cricket-performances-folder.md` — performances composition
- `/.skills/architecture/cricket-team-of-the-week-folder.md` — team of the week composition
- `/.skills/architecture/templates-folder-structure.md` — template hierarchy (dependency)
- `/.skills/workflows/create-template-variant.md` — when creating new template variants first

## Module Map

| Module | Responsibility | Entry Points |
|--------|----------------|--------------|
| `index.tsx` | Exports all composition objects (CricketLadder, CricketTop5, etc.); maps variant keys to components | `CricketLadder`, `CricketTop5`, `CricketResults`, etc. |
| `ladder/` | Team standings table | `index.tsx`, `{variant}.tsx`, `controller/Display/`, `controller/TeamRows/` |
| `top5/` | Top 5 batters/bowlers (union type) | `index.tsx`, `{variant}.tsx`, `controller/PlayersDisplay/`, `controller/PlayerRow/` |
| `results/` | Multi-match results (2 per screen) | `index.tsx`, `{variant}.tsx`, `controller/ResultsDisplay/`, `layout/MatchCard/` |
| `resultSingle/` | Single match detail | `index.tsx`, `{variant}.tsx`, `controller/ResultSingleDisplay/`, `layout/MatchCard/` |
| `upcoming/` | Upcoming fixtures | `index.tsx`, `{variant}.tsx`, `controller/GamesDisplay/`, `controller/GamesList/`, `layout/Card/` |
| `teamRoster/` | Team player lists | `index.tsx`, `{variant}.tsx`, `controller/Display/`, `layout/RosterHeader/`, `layout/RosterPlayerList/` |
| `performances/` | Batting/bowling performances (union type) | `index.tsx`, `{variant}.tsx`, `controller/PerformancesDisplay/` |
| `TeamOfTheWeek/` | Selected team of the week | `index.tsx`, `{variant}.tsx`, `controller/TeamOfTheWeekDisplay/`, `controller/PlayerRow/` |
| `sponsorFooter/` | Shared sponsor branding | `index.tsx` |
| `utils/primitives/` | Shared primitives (TeamLogo, Top5PlayerName, MetadataSmall, etc.) | Per-primitive components |
| `placeholders/` | Placeholder components for missing compositions | `PlaceholderComposition` |

Variant naming: lowercase keys in composition objects (e.g. `basic`, `brickwork`, `mudgeeraba`); file names lowercase (e.g. `brickWork.tsx`, `mudgeeraba.tsx`). Some inconsistencies exist (e.g. `brickWork` vs `brickwork`).

## Implementation Guidelines

- **Code quality**: Small functions, clear names, consistent abstractions.
- **Components**: Extract when repeated; use variant prefix for variant-specific components (`display-BrickWork.tsx`, `row-Mudgeeraba.tsx`).
- **Error handling**: No silent failures; handle missing assets and invalid props.
- **Null/undefined**: Guard early; validate boundaries.
- **Scope**: Limit edits to the task; no broad refactors without approval.
- **Security**: No secrets; avoid leaking sensitive data.
- **Documentation**: All markdown in `.docs/`; keep readMe.md current when structure changes.

## Verification Checklist

- [ ] Composition exports correctly from its `index.tsx`
- [ ] Cricket `index.tsx` includes new variant in the right composition object
- [ ] Variant key matches template variant ID (lowercase)
- [ ] Theme and animations propagate correctly (useThemeContext, useAnimationContext)
- [ ] No missing asset references
- [ ] Timings and screen pagination behave as expected
- [ ] `readMe.md` present for new or modified folders
- [ ] Test data registered for the composition

## Memory Logging (optional)

Update `/.memory/*` only when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- No single cricket-level `Tickets.md`; tickets live in individual composition subfolders.
- Root-level `Roadmap.md` / `ROADMAP.md` does not exist; roadmap is feature-scoped in `.docs/DevelopmentRoadMap.md`.

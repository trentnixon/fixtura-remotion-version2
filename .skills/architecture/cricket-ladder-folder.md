# Skill: Cricket Ladder Composition Folder

## Purpose

Guides working with `src/compositions/cricket/ladder`: understanding its structure, variant entry points, controller/layout/module roles, and how to add new ladder variants. Use when navigating, modifying, or creating ladder composition implementations in the Remotion cricket video system.

## Applies To

- `src/compositions/cricket/ladder/` (root)
- Variant entry points: `basic.tsx`, `classic.tsx`, `brickWork.tsx`, `sixersThunder.tsx`, `classicTwoColumn.tsx`, `cnsw.tsx`, `cnsw-private.tsx`, `mudgeeraba.tsx`
- `controller/` – Display and TeamRows
- `layout/` – table row layouts
- `modules/` – TableHeader, LadderHeaders, NoLadderData

## Inputs

- Understanding of Remotion compositions and `VideoDataContext` / `AnimationContext` / `ThemeContext`
- Access to `src/compositions/cricket/ladder/.docs/how-to.md` for step-by-step creation guide
- Cricket composition-types (`AssignSponsors`, shared primitives)

## Process

### 1. Understand the Folder Hierarchy

```
src/compositions/cricket/ladder/
├── index.tsx                    # Exports all variants (basic, classic, brickwork, etc.)
├── types.ts                     # LadderData, TeamData, TeamLogo, animation constants
├── _utils/helpers.ts            # hasValidLadderData, castToLadderDataArray, calculateLadderDuration
├── basic.tsx, classic.tsx, brickWork.tsx, ...  # Variant entry points
├── controller/
│   ├── Display/                 # Variant-specific display containers
│   │   ├── _types/LadderDisplayProps.ts
│   │   ├── _utils/calculations.ts
│   │   └── display-{Variant}.tsx
│   └── TeamRows/                # Row renderers (StandardRow + variant-specific)
│       ├── _types/TeamRowProps.ts
│       ├── _utils/calculations.ts, components.tsx
│       ├── StandardRow.tsx
│       └── row-{Variant}.tsx
├── layout/
│   ├── _types/BaseLayoutProps.ts
│   ├── TableRowLayout.tsx       # StandardLadderRow, BalancedLadderRow, etc.
│   └── Table*Row.tsx            # Variant-specific row layouts (TableCNSWRow, etc.)
└── modules/
    ├── TableHeader/             # header.tsx + variant headers (headerMudgeeraba, etc.)
    ├── LadderHeaders/
    └── NoLadderData/no-data.tsx
```

### 2. Understand Composition vs Template Variant

| Aspect | Composition (ladder) | Template Variant |
|--------|----------------------|------------------|
| **Purpose** | Content type: ladder standings | Visual style: Basic, Classic, Brickwork |
| **Location** | `compositions/cricket/ladder/` | `templates/variants/` |
| **Data** | LadderData[] – teams, positions, stats | Uses composition's data |
| **Variants** | basic, classic, brickwork, etc. per template | Extends base template |

### 3. Variant Entry Point Pattern

Each variant file (e.g. `basic.tsx`) does:

1. Read data from `useVideoDataContext()` via `data.data`
2. Validate with `hasValidLadderData(CompositionData)`; if invalid → `NoLadderData`
3. Cast with `castToLadderDataArray(CompositionData)`
4. Render `TransitionSeriesWrapper` mapping each ladder to a Display component
5. Use `calculateLadderDuration(timings)` and `animations.transition.Main` for transitions
6. Export named component matching variant ID (e.g. `Basic`, `Classic`)

### 4. When Adding a New Ladder Variant

1. **Create Display component**: `controller/Display/display-{Variant}.tsx` – receives `ladder: LadderData`, composes TableHeader, TeamRows, SponsorFooter
2. **Create variant entry point**: `{variant}.tsx` – copy from `basic.tsx`, swap Display import
3. **Optionally** add variant-specific row: `controller/TeamRows/row-{Variant}.tsx`
4. **Optionally** add variant-specific header: `modules/TableHeader/header{Variant}.tsx`
5. **Export** from `index.tsx` (import + export with lowercase key)
6. **Wire** in `src/compositions/cricket/index.tsx` – add to `CricketLadder` object
7. **Ensure** routing: `CricketLadder` and template ID must exist in `routing.tsx` / template registry

### 5. Key Data Types

- **LadderData**: ID, gradeName, League (TeamData[]), bias, prompt, assignSponsors
- **TeamData**: position, teamName, logos (clubLogo, teamLogo, playHQLogo), P/W/L/BYE/N/R/TIE/PTS/Q, prompt
- **Animation constants**: HEADER_ANIMATION_DURATION (45), TABLE_ANIMATION_DURATION (90)

### 6. Shared Dependencies

- `SponsorFooter` from `../sponsorFooter`
- `AssignSponsors` from `../composition-types` (or `../_types/composition-types`)
- Primitives: `TeamLogo`, `LadderTeamName`, `LadderTeamPoints` from `../../utils/primitives/`
- Contexts: `useVideoDataContext`, `useThemeContext`, `useAnimationContext`

## Output

- Correct understanding of where to add or change ladder logic
- New variants that follow the export chain and integrate with routing
- Display components that use the shared module/layout/controller structure

## Rules

- Variant entry exports use PascalCase component name (e.g. `Basic`, `Classic`), index exports use lowercase keys (e.g. `basic`, `classic`)
- Display components receive `LadderDisplayProps { ladder: LadderData }`
- Team rows receive `TeamRowProps` (team, index, totalTeams, isBiasTeam, LadderRowHeight, etc.)
- Layout rows use `BaseLayoutProps` (team, delay, LadderRowHeight, place, bgColorClass)
- Use `AnimatedContainer` with `containerAnimation` from `useAnimationContext()` for staggered animations
- Row animation: `calculateAnimationDelay(index, multiplier)`, `calculateAnimationOutFrame(timings)` (FPS_LADDER - 20)

## References

- README: `src/compositions/cricket/ladder/.docs/readMe.md`
- How-to: `src/compositions/cricket/ladder/.docs/how-to.md`
- Ladder notes: `src/compositions/cricket/ladder/.docs/ladder.md`
- Cricket roadmap: `src/compositions/cricket/.docs/DevelopmentRoadMap.md`
- Routing: `src/core/utils/routing.tsx`
- Related: `src/compositions/cricket/top5/`, `src/compositions/cricket/results/` (similar composition patterns)

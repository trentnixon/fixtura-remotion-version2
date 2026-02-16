# Skill: Cricket Performances Composition Folder

## Purpose

Guides working with `src/compositions/cricket/performances`: understanding its structure, screen pagination, dual composition types (batting/bowling), variant entry points, and data transformation. Use when navigating, modifying, or creating performances composition implementations in the Remotion cricket video system.

## Applies To

- `src/compositions/cricket/performances/` (root)
- Variant entry points: `basic.tsx`, `classic.tsx`, `brickWork.tsx`, `sixersThunder.tsx`, `classicTwoColumn.tsx`, `cnsw.tsx`, `cnsw-private.tsx`, `mudgeeraba.tsx`
- `controller/` – PerformancesDisplay and PlayerRow
- `layout/` – StandardPerformanceRow variants
- `modules/` – NoPlayersData
- `utils/` – dataTransformer, screenCalculator
- `_utils/` – calculations (validation, sponsor merging)
- `_types/` – types (batting/bowling union, type guards)

## Inputs

- Understanding of Remotion compositions and `VideoDataContext` / `AnimationContext` / `ThemeContext`
- Access to `src/compositions/cricket/performances/.docs/how-to.md` for step-by-step creation guide
- Composition-types and sponsor footer patterns

## Process

### 1. Understand the Folder Hierarchy

```
src/compositions/cricket/performances/
├── index.tsx                    # Exports all variants
├── _types/types.ts              # PerformanceData union, type guards, PERFORMANCES_COMPOSITIONS
├── _utils/calculations.ts       # getItemsPerScreen, calculateTotalScreens, mergeAssignSponsors, hasValidPerformances
├── utils/
│   ├── dataTransformer.ts       # transformPerformanceData, getTitle
│   └── screenCalculator.ts       # getItemsForScreen, calculateScreens
├── basic.tsx, classic.tsx, ... # Variant entry points
├── controller/
│   ├── PerformancesDisplay/     # Variant-specific display (receives full array + screenIndex)
│   │   ├── _types/PerformancesDisplayProps.ts
│   │   └── display-{Variant}.tsx
│   └── PlayerRow/               # Variant-specific row wrappers
│       ├── _types/PerformanceRowProps.ts
│       ├── _utils/calculations.ts
│       └── row-{Variant}.tsx
├── layout/
│   ├── _types/PerformanceRowLayoutProps.ts
│   ├── _utils/helpers.ts        # formatPlayerName, truncateText, getScoreValues
│   ├── StandardPerformanceRow.tsx
│   └── StandardPerformanceRow{Variant}.tsx
└── modules/NoPlayersData/no-data.tsx
```

### 2. Understand Performances vs Ladder

| Aspect | Performances | Ladder |
|--------|--------------|--------|
| **Data Type** | `PerformanceData[]` (batting or bowling union) | `LadderData[]` |
| **Composition IDs** | Two: CricketBattingPerformances, CricketBowlingPerformances → both map to CricketPerformances | Single: CricketLadder |
| **Pagination** | Screen-based (items per screen, default 5) | Item-based (one ladder per screen) |
| **Sponsors** | Merged from all performances | Per ladder |
| **Row Height** | Static (115px basic, 110px CNSW) | Calculated dynamically |
| **Primitives** | Top5PlayerName, Top5PlayerTeam, Top5PlayerScore, Top5PlayerScoreSuffix | LadderTeamName, LadderTeamPoints |

### 3. Dual Composition Type Pattern

- `CricketBattingPerformances` and `CricketBowlingPerformances` both route to `CricketPerformances`
- `compositionId` from `data.videoMeta.video.metadata.compositionId` determines type
- `transformPerformanceData(rawData, compositionId)` adds `type: "batting"` or `type: "bowling"`
- Use `isBattingPerformance()` and `isBowlingPerformance()` for type narrowing
- `getTitle(compositionId)` for empty-state title

### 4. Screen Pagination Pattern

- **Items per screen**: From `contentLayout.divideFixturesBy.CricketBattingPerformances` or `CricketBowlingPerformances` (default: 5)
- **Total screens**: `Math.ceil(totalItems / itemsPerScreen)`
- **Per-screen items**: `getItemsForScreen(performances, screenIndex, itemsPerScreen)`
- **Sequences**: One sequence per screen; each passes `performances`, `itemsPerScreen`, `screenIndex` to Display
- **Display** filters with `getItemsForScreen()` and renders only current screen's items

### 5. Variant Entry Point Pattern

Each variant file does:

1. Read data from `useVideoDataContext()` via `data.data`
2. Get `itemsPerScreen` from `getItemsPerScreen(contentLayout.divideFixturesBy)`
3. Validate with `hasValidPerformances(performancesData)`; if invalid → `NoPlayersData`
4. Transform with `transformPerformanceData(performancesData, compositionId)`
5. Calculate `totalScreens = calculateTotalScreens(transformedData.length, itemsPerScreen)`
6. Create sequences: one per screen with Display component
7. Merge sponsors: `mergeAssignSponsors(transformedData)`
8. Render `TransitionSeriesWrapper` with footer; export named component

### 6. When Adding a New Performances Variant

1. **Display component**: `controller/PerformancesDisplay/display-{Variant}.tsx` – receives `performances`, `itemsPerScreen`, `screenIndex`; uses `getItemsForScreen()` to filter
2. **Player row**: `controller/PlayerRow/row-{Variant}.tsx` – receives `performance`, `index`, `rowHeight`
3. **Layout**: `layout/StandardPerformanceRow{Variant}.tsx` – uses Top5 primitives, `getScoreValues()`, `formatPlayerName()`
4. **Variant entry**: `{variant}.tsx` – copy from `basic.tsx`, swap Display import
5. **Export** from `index.tsx` and `src/compositions/cricket/index.tsx`

### 7. Key Data Types

- **PerformanceData** = `BattingPerformanceData | BowlingPerformanceData`
- **BattingPerformanceData**: type, name, teamLogo, playedFor, runs, balls, SR, notOut, assignSponsors, prompt
- **BowlingPerformanceData**: type, name, teamLogo, playedFor, wickets, overs, runs, assignSponsors, prompt
- **PERFORMANCES_COMPOSITIONS**: BATTING = "CricketBattingPerformances", BOWLING = "CricketBowlingPerformances"

### 8. Shared Dependencies

- `SponsorFooter` from `../sponsorFooter`
- `AssignSponsors` from `../_types/composition-types` (performances uses its own structure; mergeAssignSponsors produces compatible format)
- Primitives: `Top5PlayerName`, `Top5PlayerTeam`, `Top5PlayerScore`, `Top5PlayerScoreSuffix`, `TeamLogo` from `../../utils/primitives/`

## Output

- Correct understanding of screen pagination and dual composition flow
- New variants that use the correct Display props (performances + screenIndex) and layout primitives

## Rules

- Display components receive `PerformancesDisplayProps`: `performances`, `itemsPerScreen`, `screenIndex` (Display filters with `getItemsForScreen()`)
- Player rows receive `PerformanceRowProps`: `performance`, `index`, `rowHeight`
- Layout receives `PerformanceRowLayoutProps`: `performance`, `index`, `rowHeight`, `delay`, `restrictions` (nameLength, teamLength)
- Use `getScoreValues(performance)` for batting (runs*, balls) vs bowling (wickets/runs, overs)
- Use `formatPlayerName(name)` for "J. SMITH" style; preserve (C), (VC), (WK)
- Duration: `FPS_PREFORMANCECARD` or metadata.frames[0]; default 300

## References

- README: `src/compositions/cricket/performances/.docs/readMe.md`
- How-to: `src/compositions/cricket/performances/.docs/how-to.md`
- Roadmap: `src/compositions/cricket/performances/.docs/DevelopmentRoadMap.md`
- Routing: `src/core/utils/routing.tsx` (CricketBattingPerformances, CricketBowlingPerformances → CricketPerformances)
- Related: `src/compositions/cricket/top5/` (similar layout/primitives), `src/compositions/cricket/ladder/` (different pagination model)

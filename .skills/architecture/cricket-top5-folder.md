# Skill: Cricket Top 5 Composition Folder

## Purpose

Guides working with `src/compositions/cricket/top5`: understanding its structure, dual composition types (batting/bowling), data transformation by composition ID, score display system, title generation, and how to add new top 5 variants. Use when navigating, modifying, or creating top 5 composition implementations in the Remotion cricket video system.

## Applies To

- `src/compositions/cricket/top5/` (root)
- Variant entry points: `basic.tsx`, `classic.tsx`, `brickWork.tsx`, `sixersThunder.tsx`, `classicTwoColumn.tsx`, `cnsw.tsx`, `cnsw-private.tsx`, `mudgeeraba.tsx`
- `controller/` – PlayersDisplay and PlayerRow
- `layout/` – StandardPlayerRow, PlayerRowName* layout variants
- `utils/` – dataTransformer
- `modules/` – NoPlayersData

## Inputs

- Understanding of Remotion compositions and `VideoDataContext` / `AnimationContext` / `ThemeContext`
- Access to `src/compositions/cricket/top5/.docs/how-to.md` for step-by-step creation guide
- Understanding of `PlayerData` union type (BatterData | BowlerData) and type guards
- Composition IDs: CricketTop5Batting, CricketTop5Bowling, CricketBattingPerformances, CricketBowlingPerformances

## Process

### 1. Understand the Folder Hierarchy

```
src/compositions/cricket/top5/
├── index.tsx                    # Exports all variants
├── _types/types.ts              # PlayerData union, BatterData, BowlerData, type guards, TOP5_COMPOSITIONS
├── _utils/
│   ├── dataHelpers.ts          # hasValidPlayersData, castToPlayerDataArray, extractCompositionId, extractPrimarySponsors
│   └── titleHelpers.ts         # getStandardTitle, getCNSWTitle, getCNSWPrivateTitle
├── utils/
│   └── dataTransformer.ts     # transformPlayerData, getTitle
├── basic.tsx, classic.tsx, ...  # Variant entry points
├── controller/
│   ├── PlayersDisplay/
│   │   ├── _types/PlayersDisplayProps.ts, PlayersDisplayPropsWithoutSponsors.ts
│   │   ├── _utils/calculations.ts  # calculateRowDimensions
│   │   ├── _utils/constants.ts
│   │   └── display-{Variant}.tsx
│   └── PlayerRow/
│       ├── _types/PlayerRowProps.ts
│       ├── _utils/calculations.ts, constants.ts, helpers.ts
│       └── row-{Variant}.tsx
├── layout/
│   ├── _types/PlayerRowLayoutProps.ts
│   ├── _utils/scoreHelpers.ts  # getScoreValues (batting vs bowling)
│   ├── _utils/helpers.ts, constants.ts
│   ├── StandardPlayerRow.tsx
│   ├── PlayerRowNameLogoWrapperValue.tsx
│   ├── PlayerRowNameClassicTwoColumn.tsx
│   ├── PlayerRowNameCNSW.tsx, PlayerRowNameCNSW-private.tsx
│   └── PlayerRowNameSixersThunder.tsx
└── modules/NoPlayersData/no-data.tsx
```

### 2. Understand Top 5 vs Performances vs Team of the Week

| Aspect | Top 5 | Performances | Team of the Week |
|--------|-------|--------------|------------------|
| **Data Type** | `PlayerData[]` (batting or bowling union) | `PerformanceData[]` | `TeamOfTheWeekPlayer[]` |
| **Layout** | Single column, vertical list | Single column rows | 2-column grid |
| **Composition IDs** | CricketTop5 (batting/bowling via metadata) | CricketBattingPerformances, CricketBowlingPerformances | CricketTeamOfTheWeek |
| **Data Transformation** | Adds `type` based on compositionId | transformPerformanceData | None |
| **Row Height** | Dynamic (calculated from player count) | Static (e.g. 115px) | Fixed (70–130px) |
| **Score Display** | getScoreValues (runs/balls vs wickets/runs/overs) | getScoreValues | Category-specific |
| **Sponsors** | From video metadata (primary) | Merged from data | From video metadata |

### 3. Variant Entry Point Pattern

Each variant file does:

1. Read data from `useVideoDataContext()` via `data.data`, `data.videoMeta`
2. Extract `compositionId` with `extractCompositionId(videoMeta)`
3. Extract `sponsors` with `extractPrimarySponsors(videoMeta)`
4. Validate with `hasValidPlayersData(playersData)`; if invalid → `NoPlayersData`
5. Cast with `castToPlayerDataArray(playersData)`
6. Transform with `transformPlayerData(castData, compositionId)` (adds `type: "batting"` or `"bowling"`)
7. Get title: `getStandardTitle(compositionId)` or variant-specific (getCNSWTitle, getCNSWPrivateTitle)
8. Render Display: `<PlayersDisplay players={transformedData} title={title} sponsors={sponsors} />`
9. Export named component (e.g. `Basic`)

### 4. When Adding a New Top 5 Variant

1. **Display component**: `controller/PlayersDisplay/display-{Variant}.tsx` – receives `players`, `title`, `sponsors`; single-column grid; uses `calculateRowDimensions()`; maps to PlayerRow; includes SponsorFooter
2. **Player row**: `controller/PlayerRow/row-{Variant}.tsx` – receives `player`, `index`, `rowHeight`; wraps layout with AnimatedContainer; uses `calculatePlayerDelay()`, `calculateExitFrame()`
3. **Layout component** (if needed): `layout/PlayerRowName{Variant}.tsx` – variant-specific row layout (logo, name/team, score)
4. **Variant entry**: `{variant}.tsx` – copy from `basic.tsx`, swap Display import and title helper if needed
5. **Export** from `index.tsx` and `src/compositions/cricket/index.tsx` (add to `CricketTop5`)

### 5. Player Row Layout

```
┌─────────────────────────────────────────┐
│ [Logo] │ Player Name    │ Score         │
│        │ Team Name      │ Suffix        │
└─────────────────────────────────────────┘
```

- **Logo**: Team logo (fixed width)
- **Content**: Name/team (left), score (right)
- **Top player** (index 0): Different background color

### 6. Score Display System

- **Batting**: `mainValue` = runs (with `*` if notOut), `suffix` = `(balls)`
- **Bowling**: `mainValue` = `wickets/runs`, `suffix` = `(overs)`
- **Helper**: `getScoreValues(player)` returns `{ mainValue, suffix }`
- **Type guards**: `isBatter()`, `isBowler()` for conditional logic

### 7. Data Transformation

- **transformPlayerData(rawData, compositionId)**: Adds `type: "batting"` or `"bowling"` based on compositionId
- **Batting IDs**: CricketTop5Batting, CricketBattingPerformances
- **Bowling IDs**: CricketTop5Bowling, CricketBowlingPerformances

### 8. Title System

- **Standard**: `getStandardTitle(compositionId)` – "Top 5 Batters", "Top 5 Bowlers", etc.
- **CNSW**: `getCNSWTitle(videoMeta)` – uses `groupingCategory`
- **CNSW Private**: `getCNSWPrivateTitle(playersData)` – uses first player's `assignSponsors.grade.name`

### 9. Key Data Types

- **PlayerData**: Union of BatterData | BowlerData
- **BatterData**: type, name, teamLogo, playedFor, runs, balls, SR, notOut, assignSponsors, prompt
- **BowlerData**: type, name, teamLogo, playedFor, wickets, overs, runs, assignSponsors, prompt
- **Display props**: `players`, `title?`, `sponsors`

### 10. Shared Dependencies

- `SponsorFooter` from `../sponsorFooter` (sponsors from video metadata)
- Primitives: `Top5PlayerName`, `Top5PlayerTeam`, `Top5PlayerScore`, `Top5PlayerScoreSuffix`, `TeamLogo`
- Contexts: `useVideoDataContext`, `useThemeContext`, `useAnimationContext`

## Output

- Correct understanding of dual composition types and data transformation
- New variants that use the correct Display props and score display
- Player rows that show logo, name/team, and type-specific stats

## Rules

- Display components receive `PlayersDisplayProps`: `players`, `title?`, `sponsors`
- Player rows receive `PlayerRowProps`: `player`, `index`, `rowHeight`
- Row height: `calculateRowDimensions(heights.asset, players.length).rowHeight`
- Score display: Use `getScoreValues(player)` for mainValue and suffix
- Top player (index 0): Use different background color
- Transformation: Always apply `transformPlayerData()` before passing to Display
- No screen pagination in current variants (all players on one screen)

## References

- README: `src/compositions/cricket/top5/.docs/top5.md`
- How-to: `src/compositions/cricket/top5/.docs/how-to.md`
- Cricket roadmap: `src/compositions/cricket/.docs/DevelopmentRoadMap.md`
- Routing: `src/core/utils/routing.tsx` (CricketTop5Batting, CricketTop5Bowling, etc.)
- Related: `src/compositions/cricket/performances/` (similar batting/bowling union), `src/compositions/cricket/TeamOfTheWeek/` (similar row layout)

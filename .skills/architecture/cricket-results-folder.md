# Skill: Cricket Results Composition Folder

## Purpose

Guides working with `src/compositions/cricket/results`: understanding its structure, screen pagination (fixed 2 per screen), club-only variants, multi-section match cards, and how to add new results variants. Use when navigating, modifying, or creating results composition implementations in the Remotion cricket video system.

## Applies To

- `src/compositions/cricket/results/` (root)
- Variant entry points: `basic.tsx`, `classic.tsx`, `brickWork.tsx`, `sixersThunder.tsx`, `classicTwoColumn.tsx`, `cnsw.tsx`, `cnsw-private.tsx`, `mudgeeraba.tsx`
- `controller/` – ResultsDisplay and MatchRow
- `layout/` – MatchCard, MatchRowLayout, Sections (MatchHeader, TeamsSection, PlayerStats, MatchStatus, ResultStatement)
- `modules/` – NoResultsData

## Inputs

- Understanding of Remotion compositions and `VideoDataContext` / `AnimationContext` / `ThemeContext`
- Access to `src/compositions/cricket/results/.docs/how-to.md` for step-by-step creation guide
- Cricket composition-types (`AssignSponsors`, shared primitives)
- Understanding of `MatchResult` nested structure (teams → batting/bowling performances)

## Process

### 1. Understand the Folder Hierarchy

```
src/compositions/cricket/results/
├── index.tsx                    # Exports all variants (basic, classic, brickwork, etc.)
├── _types/types.tsx            # MatchResult, Team, BattingPerformance, BowlingPerformance, animation constants
├── _utils/calculations.ts       # hasValidResults, castToMatchResults, calculateTotalScreens, calculateDisplayDurationPerScreen
├── basic.tsx, classic.tsx, brickWork.tsx, ...  # Variant entry points
├── controller/
│   ├── ResultsDisplay/          # Variant-specific display containers (single screen)
│   │   ├── _types/ResultsDisplayProps.ts
│   │   ├── _utils/calculations.ts  # calculateDisplayedResults, calculateRowHeight, mergeAssignSponsors
│   │   └── display-{Variant}.tsx
│   └── MatchRow/                # Row renderers with animations
│       ├── _types/MatchRowProps.ts
│       ├── _utils/calculations.ts  # calculateDelay, calculateAnimationOutFrame
│       └── row-{Variant}.tsx
├── layout/
│   ├── MatchCard/               # Card layouts (variant + clubOnly)
│   │   ├── _types/MatchCardProps.ts
│   │   ├── _utils/calculations.ts  # calculateSectionHeights, calculateDelays, getClubTeamPlayers
│   │   ├── card-{Variant}.tsx
│   │   └── card-{Variant}-clubOnly.tsx
│   └── Sections/
│       ├── MatchHeader/         # Match type, round, ground
│       ├── TeamsSection/        # Team logos, names, scores (multiple layout variants)
│       ├── PlayerStats/         # Batting/bowling performances (variant-specific)
│       ├── MatchStatus/         # Abandoned match status
│       └── ResultStatement/     # Result text statements
└── modules/
    └── NoResultsData/no-data.tsx
```

### 2. Understand Results vs Ladder vs Performances

| Aspect | Results | Ladder | Performances |
|--------|---------|--------|--------------|
| **Data Type** | `MatchResult[]` | `LadderData[]` | `PerformanceData[]` |
| **Items Per Screen** | 2 (fixed) | 1 per screen | 5 (configurable) |
| **Row Height** | `availableHeight / 2` | Calculated dynamically | Static (e.g. 115px) |
| **Structure** | Nested (teams → performances) | Simple (teams array) | Simple (performance array) |
| **Club Variants** | Yes (`card-*-clubOnly`, `isAccountClub`) | No | No |
| **Sections** | Multiple (teams, stats, header, status) | Single (table) | Single (rows) |

### 3. Variant Entry Point Pattern

Each variant file (e.g. `basic.tsx`) does:

1. Read data from `useVideoDataContext()` via `data.data`
2. Validate with `hasValidResults(resultsData)`; if invalid → `NoResultsData`
3. Cast with `castToMatchResults(resultsData)`
4. Use fixed `resultsPerScreen = DEFAULT_RESULTS_PER_SCREEN` (2)
5. Calculate `totalScreens = calculateTotalScreens(resultsCount, resultsPerScreen)`
6. Calculate `displayDurationPerScreen` from timings or metadata
7. Create sequences: one per screen with Display component
8. Render `TransitionSeriesWrapper` with transition config
9. Export named component matching variant ID (e.g. `Basic`, `Mudgeeraba`)

### 4. When Adding a New Results Variant

1. **Display component**: `controller/ResultsDisplay/display-{Variant}.tsx` – receives `results`, `resultsPerScreen`, `screenIndex`; filters with `calculateDisplayedResults()`; merges sponsors with `mergeAssignSponsors()`
2. **Match row**: `controller/MatchRow/row-{Variant}.tsx` – receives `match`, `index`, `rowHeight`; checks `isAccountClub` to choose card; wraps with `AnimatedContainer`
3. **Match card**: `layout/MatchCard/card-{Variant}.tsx` – composes sections; uses `calculateSectionHeights()` (40% teams, 50% stats, 10% header)
4. **Club-only card** (optional): `layout/MatchCard/card-{Variant}-clubOnly.tsx` – uses `getClubTeamPlayers()` to show only club team stats
5. **Variant entry**: `{variant}.tsx` – copy from `basic.tsx`, swap Display import
6. **Export** from `index.tsx` and `src/compositions/cricket/index.tsx` (add to `CricketResults`)

### 5. Section Height Distribution (Match Card)

- **Teams Section**: 40% of row height
- **Stats Section**: 50% of row height  
- **Header Section**: 10% of row height

### 6. Club-Only Variant Pattern

- `useVideoDataContext().isAccountClub` determines which card to render
- `card-{Variant}-clubOnly` shows only club team's players via `getClubTeamPlayers(match)`
- Club team identified by `team.isClubTeam` in match data

### 7. Key Data Types

- **MatchResult**: date, type, round, gameID, ground, status, homeTeam, awayTeam, teamHomeLogo, teamAwayLogo, assignSponsors, resultSummary, prompt
- **Team**: logo, name, score, overs, isHome, isClubTeam, battingPerformances, bowlingPerformances
- **BattingPerformance**: player, runs, balls, SR, fours, sixes, notOut
- **BowlingPerformance**: player, wickets, overs, runs, economy, maidens

### 8. Shared Dependencies

- `SponsorFooter` from `../sponsorFooter`
- `AssignSponsors` from `../composition-types` or `../_types/composition-types`
- Primitives from `../../utils/primitives/` (TeamLogo, ResultScore, etc.)
- Contexts: `useVideoDataContext`, `useThemeContext`, `useAnimationContext`

## Output

- Correct understanding of screen pagination (2 per screen) and club-only flow
- New variants that use the correct Display props and section height split
- Match cards that compose TeamsSection, PlayerStats, MatchHeader, MatchStatus appropriately

## Rules

- Display components receive `ResultsDisplayProps`: `results`, `resultsPerScreen`, `screenIndex`
- Match rows receive `MatchRowProps`: `match`, `index`, `rowHeight`
- Row height: `calculateRowHeight(availableHeight)` = `Math.floor(availableHeight / 2)`
- Section heights: 40% teams, 50% stats, 10% header (use `calculateSectionHeights`)
- Club-only conditional: `isAccountClub ? card-clubOnly : card`
- Animation: `calculateDelay(index)` = index * 5; `calculateAnimationOutFrame(fpsScorecard)` = fpsScorecard - 20 or 280
- Sponsor merging: `mergeAssignSponsors(displayedResults)` in Display
- MatchStatus only when `match.status === "Abandoned"`

## References

- README: `src/compositions/cricket/results/.docs/readMe.md`
- How-to: `src/compositions/cricket/results/.docs/how-to.md`
- Results notes: `src/compositions/cricket/results/.docs/results.md`
- Cricket roadmap: `src/compositions/cricket/.docs/DevelopmentRoadMap.md`
- Routing: `src/core/utils/routing.tsx` (CricketResults)
- Related: `src/compositions/cricket/resultSingle/` (single match detail), `src/compositions/cricket/ladder/`, `src/compositions/cricket/performances/`

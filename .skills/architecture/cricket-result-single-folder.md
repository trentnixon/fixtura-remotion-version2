# Skill: Cricket Result Single Composition Folder

## Purpose

Guides working with `src/compositions/cricket/resultSingle`: understanding its structure, match-to-match transitions (one match per screen), club-only variants with optional result statements, fixed section heights, and how to add new result single variants. Use when navigating, modifying, or creating result single composition implementations in the Remotion cricket video system.

## Applies To

- `src/compositions/cricket/resultSingle/` (root)
- Variant entry points: `BasicTemplate.tsx`, `classic.tsx`, `brickWork.tsx`, `sixers.tsx`, `classicTwoColumns.tsx`, `CNSW.tsx`, `CNSW-private.tsx`, `mudgeeraba.tsx`
- `controller/` – ResultSingleDisplay only (no MatchRow)
- `layout/` – MatchCard, Sections (MatchHeader, TeamsSection, PlayerStats, MatchStatus, ResultStatement)
- `modules/` – NoResultData

## Inputs

- Understanding of Remotion compositions and `VideoDataContext` / `AnimationContext` / `ThemeContext`
- Access to `src/compositions/cricket/resultSingle/.docs/how-to.md` for step-by-step creation guide
- Cricket composition-types (`AssignSponsors`, shared primitives)
- Understanding of `MatchResult` structure (shared with results composition)

## Process

### 1. Understand the Folder Hierarchy

```
src/compositions/cricket/resultSingle/
├── index.tsx                    # Exports all variants
├── types.tsx                   # MatchResult, Team, BattingPerformance, BowlingPerformance (shared with results)
├── _utils/calculations.ts       # hasValidResults, castToMatchResults, calculateDisplayDurationPerMatch
├── BasicTemplate.tsx            # Basic variant entry (export: Basic)
├── classic.tsx, brickWork.tsx, sixers.tsx, ...  # Other variant entries
├── controller/
│   └── ResultSingleDisplay/     # Variant-specific display (receives single match)
│       ├── _types/ResultSingleDisplayProps.ts
│       ├── display.tsx         # Basic (uses card.tsx, card-Basic-ClubOnly)
│       └── display-{Variant}.tsx
├── layout/
│   ├── MatchCard/              # Card layouts (variant + ClubOnly)
│   │   ├── _types/MatchCardProps.ts
│   │   ├── _utils/calculations.ts  # calculateSectionHeights, calculateDelays, getClubTeamPlayers
│   │   ├── card.tsx            # Basic regular card
│   │   ├── card-Basic-ClubOnly.tsx
│   │   ├── card-{Variant}.tsx
│   │   └── card-{Variant}-ClubOnly.tsx  # or -clubOnly
│   └── Sections/
│       ├── MatchHeader/         # Match type, round, ground
│       ├── TeamsSection/        # Team logos, names, scores
│       ├── PlayerStats/         # Batting/bowling performances (more players: 3–5)
│       ├── MatchStatus/         # Result status (always shown)
│       └── ResultStatement/    # Optional result text (ResultStatementClassic, etc.)
└── modules/
    └── NoResultData/no-data.tsx
```

### 2. Understand Result Single vs Results

| Aspect | Result Single | Results |
|--------|---------------|---------|
| **Matches Per Screen** | 1 (full height) | 2 (split height) |
| **Row Height** | Full asset height | `availableHeight / 2` |
| **Section Heights** | Fixed pixels (e.g. 80, 240, 560) | Percent-based (40/50/10) |
| **Max Players Per Stat** | 3–5 | 2 |
| **Pagination** | Match-to-match (one sequence per match) | Screen-based (2 results per screen) |
| **Structure** | No screen index; Display gets single match | Display gets results + screenIndex |
| **Controller** | ResultSingleDisplay only | ResultsDisplay + MatchRow |
| **Club-Only** | Optional result statements; different layout | Different card layout |

### 3. Variant Entry Point Pattern

Each variant file does:

1. Read data from `useVideoDataContext()` via `data.data`
2. Validate with `hasValidResults(resultData)`; if invalid → `NoResultData`
3. Cast with `castToMatchResults(resultData)`
4. Calculate `displayDurationPerMatch` from timings or metadata
5. Create sequences: one per match (no screen pagination)
6. Map `matchResults.map((match) => ({ content: <ResultSingleDisplay match={match} />, durationInFrames }))`
7. Render `TransitionSeriesWrapper` with transition config
8. Export named component (e.g. `Basic`, `mudgeeraba`)

### 4. When Adding a New Result Single Variant

1. **Display component**: `controller/ResultSingleDisplay/display-{Variant}.tsx` – receives `match`; checks `isAccountClub`; renders `MatchCard` or `MatchCardClubOnly`
2. **Match card**: `layout/MatchCard/card-{Variant}.tsx` – composes sections; typically fixed heights (status, teams, stats, header)
3. **Club-only card** (optional): `layout/MatchCard/card-{Variant}-ClubOnly.tsx` – uses `getClubTeamPlayers()`, optional ResultStatement; layout: result statement → grade header → club team → club batting → opposition → club bowling → match header
4. **Variant entry**: `{variant}.tsx` – copy from BasicTemplate.tsx, swap Display import
5. **Export** from `index.tsx` and `src/compositions/cricket/index.tsx` (add to `CricketResultSingle`)

### 5. Section Order and Heights (Basic Variant)

- **MatchStatus**: 80px (always shown first)
- **Teams**: 240px
- **Stats**: 560px (more than results; `maxPlayersPerStat` 3–5)
- **Header**: 80px

### 6. Club-Only Variant Pattern

- `useVideoDataContext().isAccountClub` selects card variant
- Club-only layout: ResultStatement (optional) → Grade header → Club team → Club batting (indented `ml-32`) → Opposition → Club bowling (indented) → Match header
- Uses `PlayerStatsSingleTeamOnly` with `showBatting` / `showBowling`
- Result statements: `ResultStatementClassic`, `ResultStatementShort`, `ResultStatementText` – `resultSummary` overrides `resultShort`

### 7. Key Data Types

- Same as results: **MatchResult**, **Team**, **BattingPerformance**, **BowlingPerformance**
- Optional: `resultShort`, `resultSummary` for result statements

### 8. Shared Dependencies

- `SponsorFooter` from `../sponsorFooter`
- Sections from `../results/layout/Sections/` (e.g. `PlayerStatsSingleTeamOnly`, `Horizontal_SingleTeam_LogoWithName_Score`) for club-only
- Primitives from `../../utils/primitives/`
- Contexts: `useVideoDataContext`, `useThemeContext`, `useAnimationContext`

## Output

- Correct understanding of match-to-match transitions and club-only flow
- New variants that use the correct Display props (single match) and fixed section heights
- Match cards that compose Status → Teams → Stats → Header (and optional ResultStatement in club-only)

## Rules

- Display components receive `ResultSingleDisplayProps`: `match` (single MatchResult)
- No MatchRow; Display renders MatchCard directly
- Sponsor footer uses `match.assignSponsors` (no merging)
- Club-only conditional: `isAccountClub ? cardClubOnly : card`
- Section heights typically fixed pixels (Basic: 80/240/560/80)
- MatchStatus always shown (unlike results where conditional)
- `maxPlayersPerStat` typically 3–5 (vs 2 in results)

## References

- README: `src/compositions/cricket/resultSingle/.docs/readMe.md`
- How-to: `src/compositions/cricket/resultSingle/.docs/how-to.md`
- Result single notes: `src/compositions/cricket/resultSingle/.docs/resultSingle.md`
- Cricket roadmap: `src/compositions/cricket/.docs/DevelopmentRoadMap.md`
- Routing: `src/core/utils/routing.tsx` (CricketResultSingle)
- Related: `src/compositions/cricket/results/` (multi-match), `src/compositions/cricket/ladder/`, `src/compositions/cricket/performances/`

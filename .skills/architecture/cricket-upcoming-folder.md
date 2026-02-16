# Skill: Cricket Upcoming Games Composition Folder

## Purpose

Guides working with `src/compositions/cricket/upcoming`: understanding its structure, configurable screen pagination (games per screen), game card layout with logo variations, metadata components, sponsor merging, and how to add new upcoming variants. Use when navigating, modifying, or creating upcoming games composition implementations in the Remotion cricket video system.

## Applies To

- `src/compositions/cricket/upcoming/` (root)
- Variant entry points: `basic.tsx`, `classic.tsx`, `brickWork.tsx`, `sixersThunder.tsx`, `classicTwoColumn.tsx`, `cnsw.tsx`, `cnsw-private.tsx`, `mudgeeraba.tsx`
- `controller/` – GamesDisplay and GamesList
- `layout/` – Card (game cards), Logos/variations, Meta

## Inputs

- Understanding of Remotion compositions and `VideoDataContext` / `AnimationContext` / `ThemeContext`
- Access to `src/compositions/cricket/upcoming/.docs/how-to.md` for step-by-step creation guide
- Understanding of `GameData` structure (teams, logos, date/time, ground, grade)
- Configuration: `contentLayout.divideFixturesBy.CricketUpcoming` for games per screen

## Process

### 1. Understand the Folder Hierarchy

```
src/compositions/cricket/upcoming/
├── index.tsx                    # Exports all variants
├── _types/types.ts              # GameData, TeamLogo, animation constants
├── _utils/calculations.ts       # getGamesPerScreen, calculateTotalScreens, hasValidGames, calculateDisplayDurationPerScreen
├── basic.tsx, classic.tsx, ...   # Variant entry points
├── controller/
│   ├── GamesDisplay/
│   │   ├── _types/GamesDisplayProps.ts
│   │   ├── _utils/calculations.ts  # calculateDisplayedGames, calculateGameCardHeight, mergeAssignSponsors
│   │   └── FixtureDisplay{Variant}.tsx
│   └── GamesList/
│       ├── _types/GamesListProps.ts
│       └── games-list-{Variant}.tsx
├── layout/
│   ├── Card/
│   │   ├── _types/GameCardProps.ts
│   │   ├── _utils/calculations.ts  # calculateAnimationDelay, calculateAnimationOutFrame
│   │   └── game-card-{Variant}.tsx
│   ├── Logos/variations/
│   │   ├── LogoAndName.tsx, LogosOnly.tsx, MirroredAlignment.tsx
│   │   ├── OppositeAlignment.tsx, CenteredVerticalStack.tsx
│   │   ├── NameAboveLogo.tsx, ReversedMirrored.tsx
│   │   └── _utils/helpers.ts, animations.ts
│   └── Meta/
│       ├── Grade.tsx, Ground.tsx, TeamName.tsx
│       ├── TimeDateGround.tsx, TimeGround.tsx, GradeDate.tsx
│       └── SingleDataPointHeader.tsx
└── modules/NoGamesData/no-data.tsx
```

### 2. Understand Upcoming vs Results

| Aspect | Upcoming | Results |
|--------|-----------|---------|
| **Data Type** | `GameData[]` | `MatchResult[]` |
| **Games Per Screen** | Configurable (contentLayout) | Fixed (2) |
| **Layout** | Vertical list of game cards | Match cards stacked |
| **Card Content** | Teams, logos, date/time, ground, grade | Teams, scores, player stats |
| **Logo Layouts** | Multiple variations (LogoAndName, LogosOnly, etc.) | Section-based |
| **Sponsors** | Merged from displayed games | Merged from displayed matches |

### 3. Variant Entry Point Pattern

Each variant file does:

1. Read data from `useVideoDataContext()` via `data.data`, `data.timings`, `contentLayout`, `metadata`
2. Get `gamesPerScreen = getGamesPerScreen(contentLayout.divideFixturesBy)` (default: 2)
3. Get `displayDurationPerScreen` from timings or metadata.frames
4. Validate with `hasValidGames(CompositionData)`; if invalid → `NoGamesData`
5. Calculate `totalScreens = calculateTotalScreens(gamesCount, gamesPerScreen)`
6. Create sequences: one per screen with GamesDisplay
7. Render `TransitionSeriesWrapper` with transition config
8. Export named component (e.g. `Basic`)

### 4. When Adding a New Upcoming Variant

1. **Display component**: `controller/GamesDisplay/FixtureDisplay{Variant}.tsx` – receives `games`, `gamesPerScreen`, `screenIndex`; filters with `calculateDisplayedGames()`; calculates `calculateGameCardHeight()`; merges sponsors with `mergeAssignSponsors()`; includes SponsorFooter
2. **Games list**: `controller/GamesList/games-list-{Variant}.tsx` – maps displayed games to game cards
3. **Game card**: `layout/Card/game-card-{Variant}.tsx` – composes Meta (Grade, Ground, TeamName, TimeDateGround) and Logos variations; uses `calculateAnimationDelay()`, `calculateAnimationOutFrame()`
4. **Variant entry**: `{variant}.tsx` – copy from `basic.tsx`, swap GamesDisplay import
5. **Export** from `index.tsx` and `src/compositions/cricket/index.tsx` (add to `CricketUpcoming`)

### 5. Screen Pagination

- **Games per screen**: From `contentLayout.divideFixturesBy.CricketUpcoming` (default: 2)
- **Total screens**: `Math.ceil(gamesCount / gamesPerScreen)`
- **Displayed games**: `games.slice(screenIndex * gamesPerScreen, endIndex)`

### 6. Game Card Layout (Basic pattern)

```
┌─────────────────────────────────┐
│ Grade Name                      │
├─────────────────────────────────┤
│ Home Team Name                  │
├─────────────────────────────────┤
│ [Home Logo] │ VS │ [Away Logo] │
│             │ Ground            │
│             │ Date Time         │
├─────────────────────────────────┤
│ Away Team Name                  │
└─────────────────────────────────┘
```

### 7. Logo Layout Variations

- **LogoAndName**: Logo above team name, VS in middle
- **LogosOnly**: Logos only (no names)
- **MirroredAlignment**, **OppositeAlignment**, **CenteredVerticalStack**
- **NameAboveLogo**: Name above logo
- **ReversedMirrored**

### 8. Metadata Components

- **Grade**, **Ground**, **TeamName**: Single-value displays
- **TimeDateGround**: 3-column (time, date, ground)
- **TimeGround**: 2-column (time, ground)
- **GradeDate**: Grade and date
- **SingleDataPointHeader**: Single value with alignment

### 9. Key Data Types

- **GameData**: date, time, type, round, gameID, ground, ageGroup, teamHome, teamAway, gradeName, teamHomeLogo, teamAwayLogo, assignSponsors
- **Display props**: `games`, `gamesPerScreen`, `screenIndex`, `heights?`
- **GamesList props**: `games`, `gameRowHeight?`

### 10. Shared Dependencies

- `SponsorFooter` from `../sponsorFooter`
- Primitives: `MetadataSmall`, `MetadataMedium`, `TeamLogo`
- Contexts: `useVideoDataContext`, `useThemeContext`, `useAnimationContext`

## Output

- Correct understanding of configurable screen pagination and sponsor merging
- New variants that use the correct Display props and card height calculation
- Game cards that compose logos, metadata, and team names

## Rules

- Display components receive `GamesDisplayProps`: `games`, `gamesPerScreen`, `screenIndex`
- Games per screen: `getGamesPerScreen(contentLayout.divideFixturesBy)` – key `CricketUpcoming`
- Card height: `calculateGameCardHeight(assetHeight, gamesPerScreen)` with DEFAULT_SPACING
- Sponsor merging: `mergeAssignSponsors(displayedGames)` in Display
- Animation: `calculateAnimationDelay(index, multiplier)` – FAST_DELAY_MULTIPLIER (5) or DEFAULT (15)
- Use `TransitionSeriesWrapper` for screen-to-screen transitions

## References

- README: `src/compositions/cricket/upcoming/.docs/upcoming.md`
- How-to: `src/compositions/cricket/upcoming/.docs/how-to.md`
- Cricket roadmap: `src/compositions/cricket/.docs/DevelopmentRoadMap.md`
- Routing: `src/core/utils/routing.tsx` (CricketUpcoming)
- Related: `src/compositions/cricket/results/` (similar screen pagination), `src/compositions/cricket/teamRoster/` (similar metadata)

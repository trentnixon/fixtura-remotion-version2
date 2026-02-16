# Skill: Cricket Team Roster Composition Folder

## Purpose

Guides working with `src/compositions/cricket/teamRoster`: understanding its structure, roster-to-roster transitions (one roster per sequence), team perspective system (account holder vs against), player name truncation, metadata display, and how to add new team roster variants. Use when navigating, modifying, or creating team roster composition implementations in the Remotion cricket video system.

## Applies To

- `src/compositions/cricket/teamRoster/` (root)
- Variant entry points: `basic.tsx`, `classic.tsx`, `classicTwoColumn.tsx`, `sixersThunder.tsx`, `mudgeeraba.tsx`
- `controller/` – Display only
- `layout/` – RosterPlayerList, RosterHeader, Metadata, RosterSponsors

## Inputs

- Understanding of Remotion compositions and `VideoDataContext` / `ThemeContext` / `AnimationContext`
- Access to `src/compositions/cricket/teamRoster/.docs/how-to.md` for step-by-step creation guide
- Understanding of `RosterDataItem` structure (teams, logos, player names, metadata, sponsors)

## Process

### 1. Understand the Folder Hierarchy

```
src/compositions/cricket/teamRoster/
├── index.tsx                    # Exports all variants
├── _types/types.ts              # RosterDataItem, Sponsor
├── _utils/
│   ├── constants.ts             # DEFAULT_ROSTER_DURATION (60)
│   └── dataHelpers.ts           # hasValidRosterData, castToRosterDataArray, calculateRosterDuration
├── basic.tsx, classic.tsx, ...   # Variant entry points
├── controller/
│   └── Display/
│       ├── _types/RosterDisplayProps.ts
│       ├── _utils/animations.ts, constants.ts, helpers.ts
│       ├── display.tsx          # Basic
│       └── display-{Variant}.tsx
├── layout/
│   ├── types.ts                 # layout-level types (duplicate/alias)
│   ├── utils.ts                 # getTeamPerspective, truncatePlayerName, truncateText
│   ├── RosterPlayerList/
│   │   ├── _types/RosterPlayerListProps.ts
│   │   ├── playerList.tsx       # Vertical list of player names
│   │   └── Opposition.tsx
│   ├── RosterHeader/
│   │   ├── index.ts             # Exports AccountTeamLarge, AgainstTeamLarge
│   │   ├── accountHolder/       # LargeTeamHeader, SmallOpponentCard
│   │   └── Against/             # LargeTeamHeader, SmallOpponentCard
│   ├── Metadata/
│   │   ├── TwoMetaValues.tsx    # Date/ground, grade/round (SubtleWrapper, NoWrapper)
│   │   └── VS.tsx               # "vs" indicator
│   └── RosterSponsors/
│       └── sponsors.tsx         # Fixture-specific sponsor logos
└── modules/NoData/no-data.tsx
```

### 2. Understand Team Roster vs Other Compositions

| Aspect | Team Roster | Results | Performances |
|--------|-------------|---------|--------------|
| **Data Type** | `RosterDataItem[]` | `MatchResult[]` | `PerformanceData[]` |
| **Transitions** | Remotion `Series` (one per roster) | `TransitionSeriesWrapper` | `TransitionSeriesWrapper` |
| **Layout** | Player list left, team headers right | Match cards stacked | Player rows |
| **Player Data** | Names only (`teamRoster: string[]`) | Full performances | Batting/bowling stats |
| **Sponsors** | Fixture-specific (`roster.sponsors`) | Merged from matches | Merged from data |
| **Metadata** | Date/ground, grade/round | Match type, round, ground | N/A |
| **Team Perspective** | Account holder vs against | Club-only card | N/A |

### 3. Variant Entry Point Pattern

Each variant file does:

1. Read data from `useVideoDataContext()` via `data.data`, `data.timings`
2. Cast with `castToRosterDataArray(CompositionData)`
3. Validate with `hasValidRosterData(rosterData)`; if invalid → `NoRosterData`
4. Render `<Series>` mapping `rosterData.map((rosterItem) => <Series.Sequence><RosterDisplay roster={rosterItem} /><RosterSponsors roster={rosterItem} /></Series.Sequence>)`
5. Duration: `calculateRosterDuration(timings)` (FPS_SCORECARD or 60)
6. Export named component (e.g. `basic`)

### 4. When Adding a New Team Roster Variant

1. **Display component**: `controller/Display/display-{Variant}.tsx` – receives `roster`; composes RosterPlayerList, RosterHeader (AccountTeamLarge, VS, AgainstTeamLarge), TwoMetaValues; variant-specific metadata wrapper (SubtleWrapper vs NoWrapper) and styling
2. **Variant entry**: `{variant}.tsx` – copy from `basic.tsx`, swap Display import
3. **Export** from `index.tsx` and `src/compositions/cricket/index.tsx` (add to `CricketRoster`)

### 5. Layout Structure

```
┌─────────────────────────────────────────┐
│ Date                    Ground          │  ← TwoMetaValues (top)
├─────────────────────────────────────────┤
│ Player List    │  Account Team Logo     │
│ - J. Smith     │  Team Name             │
│ - M. Jones     │                        │
│ - ...          │  vs                    │
│                │                        │
│                │  Against Team Logo    │
│                │  Team Name             │
├─────────────────────────────────────────┤
│ Grade                      Round        │  ← TwoMetaValues (bottom)
└─────────────────────────────────────────┘
[Optional: RosterSponsors below]
```

### 6. Team Perspective System

- **Account holder**: Team whose roster is displayed (`isHomeTeam` determines)
- **Against**: Opponent team
- **Helper**: `getTeamPerspective(roster)` returns `{ accountHolder, against }` with name, logoUrl
- **Headers**: `AccountTeamLarge`, `AgainstTeamLarge` use roster; internally call `getTeamPerspective`

### 7. Player Name Truncation

- **truncatePlayerName(text, maxLength)**: "John Smith" → "J. Smith"
- **Preserves**: (C), (VC), (WK), and other role suffixes
- **Handles**: Role indicators like "B. (WK) VC" (not truncated as names)
- **Fallback**: Normal truncation with ellipsis if needed

### 8. Key Data Types

- **RosterDataItem**: date, type, round, gameId, ground, ageGroup, teamHome, teamAway, teamHomeLogo, teamAwayLogo, gradeName, isHomeTeam, teamRoster (string[]), sponsors
- **Sponsor**: id, name, logo, etc. (fixture-specific)
- **Display props**: `RosterDisplayProps { roster: RosterDataItem }`

### 9. Shared Dependencies

- Primitives: `RosterPlayerName`, `TeamLogo`, `ResultTeamName`, `AnimatedImage`
- Layout utils: `formatDate`, `truncateText` from `utils/utils-text`
- **No SponsorFooter** – uses `RosterSponsors` with `roster.sponsors`

## Output

- Correct understanding of Series transitions and team perspective
- New variants that use the correct Display props and layout structure
- Rosters that display player list, team headers, metadata, and optional sponsors

## Rules

- Display components receive `RosterDisplayProps`: `roster` (single RosterDataItem)
- Use Remotion `Series` and `Series.Sequence` (not TransitionSeriesWrapper)
- Layout: RosterPlayerList (left) | AccountTeamLarge + VS + AgainstTeamLarge (right)
- Metadata: TwoMetaValues top (date, ground), bottom (gradeName, round)
- Team perspective: Use `getTeamPerspective(roster)` for account holder vs against
- Player names: Use `truncatePlayerName(player, MAX_PLAYER_NAME_LENGTH)`
- Sponsors: Fixture-specific from `roster.sponsors`; RosterSponsors optional per variant

## References

- README: `src/compositions/cricket/teamRoster/.docs/readMe.md`
- How-to: `src/compositions/cricket/teamRoster/.docs/how-to.md`
- Cricket roadmap: `src/compositions/cricket/.docs/DevelopmentRoadMap.md`
- Routing: `src/core/utils/routing.tsx` (CricketRoster)
- Related: `src/compositions/cricket/results/` (similar metadata), `src/compositions/cricket/resultSingle/` (single-item transitions)

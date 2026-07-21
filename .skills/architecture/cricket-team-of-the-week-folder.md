# Skill: Cricket Team of the Week Composition Folder

## Purpose

Guides working with `src/compositions/cricket/TeamOfTheWeek`: understanding its structure, 2-column grid layout, player categories (Batter, Bowler, All-Rounder, Twelfth Man), position-based icon system, club logo conditional display, and how to add new Team of the Week variants. Use when navigating, modifying, or creating Team of the Week composition implementations in the Remotion cricket video system.

## Applies To

- `src/compositions/cricket/TeamOfTheWeek/` (root)
- Variant entry points: `basic.tsx`, `classic.tsx`, `brickWork.tsx`, `sixersThunder.tsx`, `classicTwoColumn.tsx`, `cnsw.tsx`, `cnswPrivate.tsx`, `mudgeeraba.tsx`
- `controller/` – TeamOfTheWeekDisplay and PlayerRow
- `utils/` – config, iconPacks, screenCalculator
- `svg/icon1/` – Position-based SVG icons
- `_utils/` – dataHelpers, components (NoDataPlaceholder)

## Inputs

- Understanding of Remotion compositions and `VideoDataContext` / `AnimationContext` / `ThemeContext`
- Access to `src/compositions/cricket/TeamOfTheWeek/.docs/how-to.md` for step-by-step creation guide
- Understanding of `TeamOfTheWeekPlayer` union type and category-specific stats
- Test data: `testData/samples/Cricket/Cricket_TeamOfTheWeek.json`

## Process

### 1. Understand the Folder Hierarchy

```
src/compositions/cricket/TeamOfTheWeek/
├── index.tsx                    # Exports all variants
├── types.ts                     # TeamOfTheWeekPlayer union, type guards, animation constants
├── _utils/
│   ├── dataHelpers.ts           # hasValidTeamOfTheWeekData, castToTeamOfTheWeekPlayers, extractSponsors
│   └── components.tsx           # NoDataPlaceholder
├── utils/
│   ├── config.ts                # cleanPlayerName, getScoreValues, icon pack re-exports
│   ├── iconPacks.ts             # Icon pack registration, getPositionIcon
│   └── screenCalculator.ts     # calculateScreens, getItemsForScreen (pagination, optional)
├── svg/icon1/                   # Position-based SVG icons
│   ├── Batter1.tsx, Batter2.tsx, Bowler1.tsx, Bowler2.tsx
│   ├── AllRounder.tsx, 12thMan.tsx
│   └── index.ts
├── basic.tsx, classic.tsx, ...  # Variant entry points
├── controller/
│   ├── TeamOfTheWeekDisplay/
│   │   ├── _types/TeamOfTheWeekDisplayProps.ts
│   │   ├── _utils/constants.ts  # Row height per variant
│   │   ├── _utils/calculations.ts
│   │   └── display-{Variant}.tsx
│   └── PlayerRow/
│       ├── _types/PlayerRowProps.ts, StatDisplayProps.ts
│       ├── _utils/constants.ts  # Animation delays
│       ├── _utils/components.tsx  # BattingStatDisplay, BowlingStatDisplay, StatItem
│       ├── _utils/helpers.ts   # isAllRounderPosition, hasBothStats
│       └── row-{Variant}.tsx
└── .docs/                       # readMe, how-to, DevelopmentRoadMap
```

### 2. Understand Team of the Week vs Other Compositions

| Aspect         | Team of the Week                         | Performances        | Results                       |
| -------------- | ---------------------------------------- | ------------------- | ----------------------------- |
| **Data Type**  | `TeamOfTheWeekPlayer[]`                  | `PerformanceData[]` | `MatchResult[]`               |
| **Layout**     | 2-column grid                            | Single column rows  | Match cards                   |
| **Categories** | Batter, Bowler, All-Rounder, Twelfth Man | Batting or Bowling  | N/A                           |
| **Positions**  | topscorer, mostwickets, etc.             | N/A                 | N/A                           |
| **Row Height** | Fixed (70–130px per variant)             | Static              | Calculated (half height)      |
| **Sponsors**   | From video metadata (club.sponsors)      | Merged from data    | Merged from displayed matches |
| **Icons**      | Position-based SVG icon packs            | Primitives          | N/A                           |
| **Club Logo**  | Conditional: hidden for club accounts    | N/A                 | Club-only card variant        |

### 3. Variant Entry Point Pattern

Each variant file (e.g. `basic.tsx`) does:

1. Read data from `useVideoDataContext()` via `data.data`, `data.videoMeta`
2. Validate with `hasValidTeamOfTheWeekData(teamOfTheWeekData)`; if invalid → `NoDataPlaceholder`
3. Cast with `castToTeamOfTheWeekPlayers(teamOfTheWeekData)`
4. Extract sponsors: `extractSponsors(videoMeta)` (from `videoMeta.club.sponsors`)
5. Render Display component: `<TeamOfTheWeekDisplay players={players} sponsors={sponsors} />`
6. No screen pagination in current variants (all players on one screen)
7. Export named component (e.g. `Basic`)

### 4. When Adding a New Team of the Week Variant

1. **Display component**: `controller/TeamOfTheWeekDisplay/display-{Variant}.tsx` – receives `players`, `sponsors`; creates 2-column grid; maps to PlayerRow; uses row height constant
2. **Player row**: `controller/PlayerRow/row-{Variant}.tsx` – receives `player`, `index`, `rowHeight`; three sections: Icon | Stats/Name | Logo (conditional); category-specific stat display
3. **Row height constant**: Add to `controller/TeamOfTheWeekDisplay/_utils/constants.ts`
4. **Variant entry**: `{variant}.tsx` – copy from `basic.tsx`, swap Display import
5. **Export** from `index.tsx` and `src/compositions/cricket/index.tsx` (add to `CricketTeamOfTheWeek`)

### 5. Player Categories and Positions

- **Batter**: `topscorer`, `higheststrikerate` → batting stats (runs\*, balls)
- **Bowler**: `mostwickets`, `besteconomy` → bowling stats (wickets/runs, overs)
- **All-Rounder**: `topallrounder` → batting + bowling stats
- **Twelfth Man**: `bestoftherest` → whatever stats available (batting, bowling, or all-rounder score)

### 6. Player Row Layout

```
┌─────────────────────────────────────────────┐
│ [Icon] │ Stats + Player Name │ [Logo]      │
│  🏏    │ 150* (120)          │  [Club]    │
│        │ J. SMITH            │            │
└─────────────────────────────────────────────┘
```

- **Icon**: Position-based from `getPositionIcon(position, iconPack)`
- **Stats**: `BattingStatDisplay`, `BowlingStatDisplay`, or both for all-rounders
- **Logo**: Rendered only when `!isAccountClub` (`useVideoDataContext().club.IsAccountClub`)

### 7. Icon System

- **Icon packs**: `svg/icon1/` – Batter1, Batter2, Bowler1, Bowler2, AllRounder, 12thMan
- **Registration**: `utils/iconPacks.ts` – `registerIconPack`, `getPositionIcon`, `setDefaultIconPack`
- **Position mapping**: `topscorer`/`higheststrikerate` → Batter; `mostwickets`/`besteconomy` → Bowler; `topallrounder` → AllRounder; `bestoftherest` → 12thMan

### 8. Key Data Types

- **TeamOfTheWeekPlayer**: Union of BatterPlayer | BowlerPlayer | AllRounderPlayer | TwelfthManPlayer
- **Type guards**: `isBatterPlayer`, `isBowlerPlayer`, `isAllRounderPlayer`, `isTwelfthManPlayer`, `hasBattingStats`, `hasBowlingStats`
- **Display props**: `players`, `sponsors`; optional `title` (CNSW)
- **PlayerRow props**: `player`, `index`, `rowHeight`

### 9. Row Height Constants

- Basic: 110px | Classic: 110px | BrickWork: 130px | ClassicTwoColumn: 85px
- SixersThunder: 80px | CNSW: 70px | CNSWPrivate: 70px

### 10. Shared Dependencies

- `SponsorFooter` from `../sponsorFooter` (sponsors from video metadata)
- Primitives: `TeamOfTheWeekPlayerName`, `TeamOfTheWeekStat`, `MetadataSmall`
- Contexts: `useVideoDataContext`, `useThemeContext`, `useAnimationContext`

## Output

- Correct understanding of 2-column grid and category-specific stat display
- New variants that use the correct Display props and PlayerRow layout
- Player rows that show icon, stats, name, and conditional logo

## Rules

- Display components receive `TeamOfTheWeekDisplayProps`: `players`, `sponsors`
- Player rows receive `PlayerRowProps`: `player`, `index`, `rowHeight`
- Grid: `grid grid-cols-2 gap-4` (or variant-specific gap)
- Club logo: `{!isAccountClub && <Img src={player.club.logo.url} />}`
- Animation: `delay = index * PLAYER_STAGGER_DELAY` (5 frames)
- Use `cleanPlayerName(player.player)` to strip (c), (vc), (wk)
- Stat display: use `BattingStatDisplay`, `BowlingStatDisplay`, `StatItem` from `_utils/components`
- All-rounders with both stats: show batting + "&" + bowling

## References

- README: `src/compositions/cricket/TeamOfTheWeek/.docs/readMe.md`
- How-to: `src/compositions/cricket/TeamOfTheWeek/.docs/how-to.md`
- Roadmap: `src/compositions/cricket/TeamOfTheWeek/.docs/DevelopmentRoadMap.md`
- Test data: `testData/samples/Cricket/Cricket_TeamOfTheWeek.json`
- Routing: `src/core/utils/routing.tsx` (CricketTeamOfTheWeek)
- Related: `src/compositions/cricket/performances/` (similar stat display), `src/compositions/cricket/results/` (grid-like layout)

# How to Create a New Team of the Week Composition Asset Type

This guide explains how to create a new **team of the week composition asset type** (like `CricketTeamOfTheWeek`) from scratch. This composition type displays a list of players selected for the team of the week, organized by categories (Batter, Bowler, All-Rounder, Twelfth Man).

**Last Updated:** 2026-02-08

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Player Categories and Stats](#player-categories-and-stats)
6. [Display Components](#display-components)
7. [Player Row Components](#player-row-components)
8. [Icon System](#icon-system)
9. [Screen Pagination](#screen-pagination)
10. [Club-Only Support](#club-only-support)
11. [Animation Patterns](#animation-patterns)
12. [Creating Variant Implementations](#creating-variant-implementations)
13. [Hooking Up to Routing](#hooking-up-to-routing)
14. [Common Patterns](#common-patterns)
15. [Testing](#testing)
16. [Troubleshooting](#troubleshooting)
17. [Quick Reference](#quick-reference)

---

## Overview

### What is a Team of the Week Composition?

A **team of the week composition** is a sport-specific content type that displays:
- **List of selected players** (typically 10 players)
- **Player categories** (Batter, Bowler, All-Rounder, Twelfth Man)
- **Position-specific stats** (batting stats for batters, bowling stats for bowlers, etc.)
- **2-column grid layout** (players displayed in a grid)
- **Position icons** (visual indicators for player positions)
- **Club logos** (shown for association-level accounts, hidden for club-level)

### Key Characteristics

| Aspect | Team of the Week |
|--------|-----------------|
| **Layout** | 2-column grid |
| **Players Per Screen** | All players (or configurable via screen pagination) |
| **Row Height** | Fixed (varies by variant: 70-130px) |
| **Categories** | Batter, Bowler, All-Rounder, Twelfth Man |
| **Stats Display** | Category-specific (batting/bowling/all-rounder) |
| **Icons** | Position-based SVG icons |
| **Club Support** | Conditional logo display |

### Example: Cricket Team of the Week Composition

The `CricketTeamOfTheWeek` composition:
- **Data Type**: `TeamOfTheWeekPlayer[]` - array of player objects
- **Structure**: Each player has category, stats, club info, rankings
- **Variants**: `basic`, `classic`, `brickwork`, `classicTwoColumn`, `cnsw`, `cnswPrivate`, `sixersThunder`
- **Components**: Display components, player row components, icon system
- **Layout**: 2-column grid with fixed row heights

---

## Architecture

### Folder Structure

```
src/compositions/cricket/TeamOfTheWeek/
├── .docs/
│   └── how-to.md                    # This guide
├── _utils/
│   ├── components.tsx              # NoDataPlaceholder component
│   └── dataHelpers.ts              # Data validation and extraction
├── controller/
│   ├── TeamOfTheWeekDisplay/
│   │   ├── _types/
│   │   │   └── TeamOfTheWeekDisplayProps.ts
│   │   ├── _utils/
│   │   │   ├── calculations.ts    # Screen calculation utilities
│   │   │   └── constants.ts        # Row height constants
│   │   ├── display-Basic.tsx       # Display component for Basic variant
│   │   ├── display-Classic.tsx     # Display component for Classic variant
│   │   └── ...
│   └── PlayerRow/
│       ├── _types/
│       │   ├── PlayerRowPropsWithDelay.ts
│       │   └── StatDisplayProps.ts
│       ├── _utils/
│       │   ├── components.tsx       # Stat display components
│       │   ├── constants.ts         # Animation delay constants
│       │   └── helpers.ts           # Helper functions
│       ├── row-Basic.tsx            # Player row for Basic variant
│       ├── row-Classic.tsx          # Player row for Classic variant
│       └── ...
├── svg/
│   └── icon1/                       # Icon pack 1
│       ├── Batter1.tsx
│       ├── Batter2.tsx
│       ├── Bowler1.tsx
│       ├── Bowler2.tsx
│       ├── AllRounder.tsx
│       ├── 12thMan.tsx
│       └── index.ts
├── utils/
│   ├── config.ts                    # Icon pack config, name cleaning
│   ├── iconPacks.ts                 # Icon pack registration system
│   └── screenCalculator.ts           # Screen pagination utilities
├── basic.tsx                         # Basic variant entry point
├── classic.tsx                       # Classic variant entry point
├── brickWork.tsx                     # Brickwork variant entry point
├── index.tsx                         # Exports all variants
├── types.ts                          # TypeScript interfaces
└── readMe.md                         # Folder documentation
```

### Key Concepts

1. **Variant Entry Points** (`basic.tsx`, `classic.tsx`, etc.):
   - Main component that handles data fetching, validation
   - Extracts sponsors from video metadata
   - Passes data to display component
   - No screen pagination (shows all players in one screen)

2. **Display Components** (`controller/TeamOfTheWeekDisplay/display-*.tsx`):
   - Variant-specific layout and styling
   - Creates 2-column grid
   - Maps over players array
   - Includes sponsor footer
   - Uses fixed row heights

3. **Player Row Components** (`controller/PlayerRow/row-*.tsx`):
   - Variant-specific player card rendering
   - Displays position icon, stats, player name, club logo
   - Handles category-specific stat display
   - Conditional club logo display
   - Staggered animations

4. **Types** (`types.ts`):
   - Union type: `TeamOfTheWeekPlayer` (BatterPlayer | BowlerPlayer | AllRounderPlayer | TwelfthManPlayer)
   - Type guards: `isBatterPlayer`, `isBowlerPlayer`, etc.
   - Helper functions: `hasBattingStats`, `hasBowlingStats`, etc.

5. **Icon System** (`utils/iconPacks.ts`, `svg/icon1/`):
   - Position-based SVG icons
   - Icon pack registration system
   - Multiple icon packs supported
   - Default icon pack configuration

6. **Utils** (`_utils/`, `utils/`):
   - Data validation: `hasValidTeamOfTheWeekData()`
   - Data casting: `castToTeamOfTheWeekPlayers()`
   - Sponsor extraction: `extractSponsors()`
   - Screen calculation: `calculateScreens()`, `getItemsForScreen()`
   - Name cleaning: `cleanPlayerName()`
   - Score formatting: `getScoreValues()`

---

## Prerequisites

Before creating a new team of the week composition, ensure you have:

1. ✅ **Template variants created** (if you need custom styling)
   - See `src/templates/.docs/how-to.md` for creating template variants
   - At minimum, you need `Basic` variant

2. ✅ **Understanding of player data structure**
   - Player categories (Batter, Bowler, All-Rounder, Twelfth Man)
   - Batting stats (runs, balls, strike rate, fours, sixes)
   - Bowling stats (wickets, overs, runs, economy, maidens)
   - All-rounder stats (score, formula, contributions)
   - Club information (name, logo)

3. ✅ **Access to test data**
   - Sample team of the week player data
   - Multiple players to test layout
   - Different categories to test stat display

4. ✅ **Understanding of icon system**
   - Position-based icons
   - Icon pack registration
   - SVG component structure

---

## Step-by-Step Guide

### Step 1: Define Data Types

Create `types.ts` in your composition folder.

**Example:** `src/compositions/cricket/TeamOfTheWeek/types.ts`

```typescript
// Team logo information
export interface TeamLogo {
  url: string;
  width: number;
  height: number;
}

// Club information
export interface Club {
  name: string;
  logo: TeamLogo;
}

// Category detail information
export interface CategoryDetail {
  type: "Batter" | "Bowler" | "All-Rounder" | "Twelfth Man";
  position:
    | "topscorer"
    | "higheststrikerate"
    | "mostwickets"
    | "besteconomy"
    | "topallrounder"
    | "bestoftherest";
}

// Batting statistics
export interface BattingStats {
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  notOut: boolean;
  team: string;
}

// Bowling statistics
export interface BowlingStats {
  wickets: number;
  overs: number;
  maidens: number;
  runs: number; // Runs conceded
  economy: number;
  team: string;
}

// All-rounder statistics
export interface AllRounderStats {
  score: number;
  formula: string; // e.g., "runs × wickets"
  battingContribution: number;
  bowlingContribution: number;
}

// Rankings information
export interface Rankings {
  topRunScorer?: number;
  highestStrikeRate?: number;
  mostWickets?: number;
  bestEconomy?: number;
  topAllRounder?: number;
}

// Base player data common to all categories
export interface BaseTeamOfTheWeekPlayer {
  category: "Batter" | "Bowler" | "All-Rounder" | "Twelfth Man";
  categoryDetail: CategoryDetail;
  rank: number;
  player: string; // May include (c) or (vc) suffixes
  primaryTeam: string;
  club: Club;
  rankings: Rankings;
}

// Batter player (has batting stats only)
export interface BatterPlayer extends BaseTeamOfTheWeekPlayer {
  category: "Batter";
  batting: BattingStats;
  bowling?: never;
  allRounder?: never;
}

// Bowler player (has bowling stats only, may have batting)
export interface BowlerPlayer extends BaseTeamOfTheWeekPlayer {
  category: "Bowler";
  batting?: BattingStats;
  bowling: BowlingStats;
  allRounder?: never;
}

// All-Rounder player (has both batting and bowling, plus combined stats)
export interface AllRounderPlayer extends BaseTeamOfTheWeekPlayer {
  category: "All-Rounder";
  batting: BattingStats;
  bowling: BowlingStats;
  allRounder: AllRounderStats;
}

// Twelfth Man player (can have batting and/or bowling)
export interface TwelfthManPlayer extends BaseTeamOfTheWeekPlayer {
  category: "Twelfth Man";
  batting?: BattingStats;
  bowling?: BowlingStats;
  allRounder?: AllRounderStats;
}

// Union type for any Team of the Week player
export type TeamOfTheWeekPlayer =
  | BatterPlayer
  | BowlerPlayer
  | AllRounderPlayer
  | TwelfthManPlayer;

// Type guards for distinguishing player categories
export const isBatterPlayer = (
  player: TeamOfTheWeekPlayer,
): player is BatterPlayer => {
  return player.category === "Batter";
};

export const isBowlerPlayer = (
  player: TeamOfTheWeekPlayer,
): player is BowlerPlayer => {
  return player.category === "Bowler";
};

export const isAllRounderPlayer = (
  player: TeamOfTheWeekPlayer,
): player is AllRounderPlayer => {
  return player.category === "All-Rounder";
};

export const isTwelfthManPlayer = (
  player: TeamOfTheWeekPlayer,
): player is TwelfthManPlayer => {
  return player.category === "Twelfth Man";
};

// Helper function to check if player has batting stats
export const hasBattingStats = (
  player: TeamOfTheWeekPlayer,
): player is BatterPlayer | AllRounderPlayer | TwelfthManPlayer => {
  return "batting" in player && player.batting !== undefined;
};

// Helper function to check if player has bowling stats
export const hasBowlingStats = (
  player: TeamOfTheWeekPlayer,
): player is BowlerPlayer | AllRounderPlayer | TwelfthManPlayer => {
  return "bowling" in player && player.bowling !== undefined;
};

// Helper function to check if player has all-rounder stats
export const hasAllRounderStats = (
  player: TeamOfTheWeekPlayer,
): player is AllRounderPlayer | TwelfthManPlayer => {
  return "allRounder" in player && player.allRounder !== undefined;
};

// Animation constants
export const HEADER_ANIMATION_DURATION = 45; // 1.5 seconds at 30fps
export const PLAYER_STAGGER_DELAY = 5; // Stagger between player entries
export const PLAYER_ANIMATION_DURATION = 30; // 1 second for player animation

// Composition identifier
export const TEAM_OF_THE_WEEK_COMPOSITION_ID = "CricketTeamOfTheWeek";

// Screen configuration types
export interface ScreenConfig {
  itemsPerScreen: number; // Default: 5, or from contentLayout
  screenIndex: number; // Current screen index (0-based)
  totalScreens: number; // Total number of screens needed
}

// Screen calculation result
export interface ScreenCalculationResult {
  totalScreens: number;
  itemsPerScreen: number;
  getItemsForScreen: (screenIndex: number) => TeamOfTheWeekPlayer[];
}

// Player row component props
export interface PlayerRowProps {
  player: TeamOfTheWeekPlayer;
  index: number;
  rowHeight: number;
}
```

**Key Points:**
- **Union type**: `TeamOfTheWeekPlayer` combines all player categories
- **Type guards**: Helper functions to check player category
- **Optional stats**: Some players may have optional batting/bowling stats
- **Category-specific**: Each category has specific required stats

---

### Step 2: Create Helper Utilities

Create `_utils/dataHelpers.ts` for data validation and extraction.

**Example:** `src/compositions/cricket/TeamOfTheWeek/_utils/dataHelpers.ts`

```typescript
import { TeamOfTheWeekPlayer } from "../types";

/**
 * Check if team of the week data is valid
 * @param teamOfTheWeekData - Data from video context
 * @returns True if data is valid and non-empty
 */
export const hasValidTeamOfTheWeekData = (
  teamOfTheWeekData: unknown,
): boolean => {
  return (
    teamOfTheWeekData !== null &&
    teamOfTheWeekData !== undefined &&
    Array.isArray(teamOfTheWeekData) &&
    teamOfTheWeekData.length > 0
  );
};

/**
 * Cast team of the week data to typed array
 * @param teamOfTheWeekData - Data from video context
 * @returns Typed array of TeamOfTheWeekPlayer
 */
export const castToTeamOfTheWeekPlayers = (
  teamOfTheWeekData: unknown,
): TeamOfTheWeekPlayer[] => {
  return teamOfTheWeekData as unknown as TeamOfTheWeekPlayer[];
};

/**
 * Extract sponsors from video metadata
 * @param videoMeta - Video metadata from context
 * @returns Object with primary sponsors array
 */
export const extractSponsors = (videoMeta: {
  club?: { sponsors?: unknown[] };
} | undefined): { primary: unknown[] } => {
  return {
    primary: videoMeta?.club?.sponsors || [],
  };
};
```

**Key Points:**
- **Validation**: Checks if data is valid array with items
- **Type casting**: Safely casts unknown data to TeamOfTheWeekPlayer[]
- **Sponsor extraction**: Extracts sponsors from video metadata

---

### Step 3: Create Empty State Component

Create a component to show when there's no data.

**Example:** `src/compositions/cricket/TeamOfTheWeek/_utils/components.tsx`

```typescript
import React from "react";

/**
 * Placeholder component shown when no team of the week data is available
 */
export const NoDataPlaceholder: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">No Team of the Week Data</h2>
        <p className="text-xl">Check back later for updates</p>
      </div>
    </div>
  );
};
```

**Key Points:**
- **Simple message**: No dynamic content needed
- **Full height**: Uses full available height
- **Centered**: Centered layout for better UX

---

### Step 4: Create Screen Calculator Utilities

Create `utils/screenCalculator.ts` for screen pagination (if needed).

**Example:** `src/compositions/cricket/TeamOfTheWeek/utils/screenCalculator.ts`

```typescript
import { TeamOfTheWeekPlayer, ScreenCalculationResult } from "../types";

/**
 * Get items for a specific screen
 * @param items - Full array of players
 * @param screenIndex - Current screen index (0-based)
 * @param itemsPerScreen - Number of items to display per screen
 * @returns Sliced array for the specific screen
 */
export const getItemsForScreen = (
  items: TeamOfTheWeekPlayer[],
  screenIndex: number,
  itemsPerScreen: number,
): TeamOfTheWeekPlayer[] => {
  const startIndex = screenIndex * itemsPerScreen;
  const endIndex = startIndex + itemsPerScreen;
  return items.slice(startIndex, endIndex);
};

/**
 * Calculate total number of screens needed
 * @param totalItems - Total number of items
 * @param itemsPerScreen - Number of items per screen
 * @returns Total screens needed
 */
export const calculateTotalScreens = (
  totalItems: number,
  itemsPerScreen: number,
): number => {
  return Math.ceil(totalItems / itemsPerScreen);
};

/**
 * Calculate screen configuration for Team of the Week
 * @param items - Full array of players
 * @param itemsPerScreen - Number of items to display per screen
 * @returns Screen calculation result with helper functions
 */
export const calculateScreens = (
  items: TeamOfTheWeekPlayer[],
  itemsPerScreen: number,
): ScreenCalculationResult => {
  const totalScreens = calculateTotalScreens(items.length, itemsPerScreen);

  return {
    totalScreens,
    itemsPerScreen,
    getItemsForScreen: (screenIndex: number) =>
      getItemsForScreen(items, screenIndex, itemsPerScreen),
  };
};
```

**Key Points:**
- **Screen pagination**: Divides players into multiple screens
- **Helper function**: `getItemsForScreen` for easy access
- **Note**: Current implementations show all players on one screen

---

### Step 5: Create Config Utilities

Create `utils/config.ts` for icon and name utilities.

**Example:** `src/compositions/cricket/TeamOfTheWeek/utils/config.ts`

```typescript
import { TeamOfTheWeekPlayer } from "../types";

// Re-export icon pack functions for backward compatibility
export {
  getPositionIcon,
  setDefaultIconPack,
  getDefaultIconPack,
  registerIconPack,
  type IconPack,
} from "./iconPacks";

// Helper function to format category position labels
export const getCategoryPositionLabel = (position: string): string => {
  const labels: Record<string, string> = {
    topscorer: "Top Scorer",
    higheststrikerate: "Highest Strike Rate",
    mostwickets: "Most Wickets",
    besteconomy: "Best Economy",
    topallrounder: "Top All-Rounder",
    bestoftherest: "12th Man",
  };
  return labels[position] || position;
};

// Helper function to clean player names by removing captain/vice-captain/wicket-keeper suffixes
export const cleanPlayerName = (name: string): string => {
  // Remove (c), (C), (vc), (VC), (wk), (WK) and any surrounding spaces
  return name
    .replace(/\s*\([cC]\)\s*/g, " ")
    .replace(/\s*\([vV][cC]\)\s*/g, " ")
    .replace(/\s*\([wW][kK]\)\s*/g, " ")
    .trim();
};

// Helper function to get score values for Sixers/Thunder format
export const getScoreValues = (
  player: TeamOfTheWeekPlayer,
): { mainValue: string; suffix: string } => {
  // For all-rounders and 12th man with both stats, show batting first
  if (
    (player.categoryDetail.position === "topallrounder" ||
      player.categoryDetail.position === "bestoftherest") &&
    player.batting &&
    player.bowling
  ) {
    // Show batting stats as main
    const mainValue = player.batting.notOut
      ? `${player.batting.runs}*`
      : `${player.batting.runs}`;
    const suffix = player.batting.balls > 0 ? `(${player.batting.balls})` : "";
    return { mainValue, suffix };
  }

  // Batting positions
  if (
    (player.categoryDetail.position === "topscorer" ||
      player.categoryDetail.position === "higheststrikerate") &&
    player.batting
  ) {
    const mainValue = player.batting.notOut
      ? `${player.batting.runs}*`
      : `${player.batting.runs}`;
    const suffix = player.batting.balls > 0 ? `(${player.batting.balls})` : "";
    return { mainValue, suffix };
  }

  // Bowling positions
  if (
    (player.categoryDetail.position === "mostwickets" ||
      player.categoryDetail.position === "besteconomy") &&
    player.bowling
  ) {
    const mainValue = `${player.bowling.wickets}/${player.bowling.runs}`;
    const suffix = `(${player.bowling.overs})`;
    return { mainValue, suffix };
  }

  // Fallback
  return { mainValue: "--", suffix: "" };
};
```

**Key Points:**
- **Name cleaning**: Removes captain/vice-captain/wicket-keeper suffixes
- **Score formatting**: Formats stats for display
- **Icon pack exports**: Re-exports icon pack functions

---

### Step 6: Create Basic Display Component

Create the display component for the Basic variant.

**Example:** `src/compositions/cricket/TeamOfTheWeek/controller/TeamOfTheWeekDisplay/display-Basic.tsx`

```typescript
import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PlayerRowBasic from "../PlayerRow/row-Basic";
import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../composition-types";
import { TeamOfTheWeekDisplayProps } from "./_types/TeamOfTheWeekDisplayProps";
import { DEFAULT_ROW_HEIGHT_BASIC } from "./_utils/constants";

const TeamOfTheWeekDisplayBasic: React.FC<TeamOfTheWeekDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  return (
    <div className="flex flex-col h-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-4 overflow-hidden py-32 justify-center"
        style={{
          height: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="grid grid-cols-2 gap-4">
          {players.map((player, index) => (
            <PlayerRowBasic
              key={player.player}
              player={player}
              index={index}
              rowHeight={DEFAULT_ROW_HEIGHT_BASIC}
            />
          ))}
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={sponsors as unknown as AssignSponsors} />
      </div>
    </div>
  );
};

export default TeamOfTheWeekDisplayBasic;
```

**Key Points:**
- **2-column grid**: Uses `grid grid-cols-2`
- **Fixed row height**: Uses constant from `_utils/constants.ts`
- **Sponsor footer**: Includes footer at bottom
- **Animation container**: Wraps entire grid

---

### Step 7: Create Basic Player Row Component

Create the player row component for the Basic variant.

**Example:** `src/compositions/cricket/TeamOfTheWeek/controller/PlayerRow/row-Basic.tsx`

```typescript
import React from "react";
import { PLAYER_STAGGER_DELAY, PlayerRowProps } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { Img } from "remotion";
import { TeamOfTheWeekPlayerName } from "../../../utils/primitives/TeamOfTheWeekPlayerName";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { cleanPlayerName, getPositionIcon } from "../../utils/config";
import { DEFAULT_ICON_PACK } from "./_utils/constants";
import {
  STAT_DISPLAY_DELAY_OFFSET,
  BOWLING_STAT_DELAY_OFFSET,
  PLAYER_NAME_DELAY_OFFSET,
} from "./_utils/constants";
import { isAllRounderPosition, hasBothStats } from "./_utils/helpers";
import {
  BattingStatDisplay,
  BowlingStatDisplay,
  StatItem,
} from "./_utils/components";

const PlayerRowBasic: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { club } = useVideoDataContext();
  const isAccountClub = club.IsAccountClub || false;
  const delay = index * PLAYER_STAGGER_DELAY;

  // Text animations
  const largeTextAnimation = animations.text.main.copyIn;

  // Determine background color
  const isTopPlayer = index === 0;
  const bgColor = isTopPlayer
    ? selectedPalette.container.backgroundTransparent.high
    : selectedPalette.container.backgroundTransparent.medium;

  const logoBG = isTopPlayer
    ? selectedPalette.container.transparentSecondary
    : selectedPalette.container.backgroundTransparent.strong;

  // Icon section uses primary color
  const statsBG = selectedPalette.container.primary;

  // Get the color for onContainerTitle variant
  const iconColor = selectedPalette.text.onContainer.title;

  // Check if all-rounder with both stats
  const isAllRounder = isAllRounderPosition(
    player.categoryDetail.position,
  );
  const hasBoth = hasBothStats(player);

  // Get the appropriate SVG icon component for the position
  const PositionIcon = getPositionIcon(
    player.categoryDetail.position,
    DEFAULT_ICON_PACK,
  );

  return (
    <AnimatedContainer
      type="full"
      className="relative h-full"
      style={{ height: rowHeight }}
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={delay}
      exitAnimation={containerAnimation.containerOut}
    >
      <div
        className="flex items-center h-full overflow-hidden rounded-lg"
        style={{ height: `${rowHeight}px`, background: bgColor }}
      >
        {/* Icon Section */}
        <div
          className="w-20 h-full shrink-0 flex items-center justify-center"
          style={{ background: statsBG }}
        >
          {/* Position Icon */}
          {PositionIcon && (
            <PositionIcon
              className="w-20 h-20 flex-shrink-0"
              style={{ color: iconColor }}
            />
          )}
        </div>

        {/* Player Info Section: Stats, Player Name */}
        <div className="flex-1 flex flex-col justify-center px-3">
          {/* Stats Display */}
          <div className="mt-1">
            {isAllRounder && hasBoth && player.batting && player.bowling ? (
              <div className="flex flex-row gap-4 items-baseline">
                {/* Batting Stats */}
                <BattingStatDisplay
                  batting={player.batting}
                  delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                />
                <span>&amp;</span>
                {/* Bowling Stats */}
                <BowlingStatDisplay
                  bowling={player.bowling}
                  delay={delay + BOWLING_STAT_DELAY_OFFSET}
                />
              </div>
            ) : (
              <>
                {/* Batting positions */}
                {(player.categoryDetail.position === "topscorer" ||
                  player.categoryDetail.position === "higheststrikerate") &&
                  player.batting && (
                    <BattingStatDisplay
                      batting={player.batting}
                      delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                    />
                  )}

                {/* Bowling positions */}
                {(player.categoryDetail.position === "mostwickets" ||
                  player.categoryDetail.position === "besteconomy") &&
                  player.bowling && (
                    <BowlingStatDisplay
                      bowling={player.bowling}
                      delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                    />
                  )}

                {/* Best of Rest fallback */}
                {player.categoryDetail.position === "bestoftherest" &&
                  (!player.batting || !player.bowling) && (
                    <>
                      {player.batting && (
                        <BattingStatDisplay
                          batting={player.batting}
                          delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                        />
                      )}
                      {player.bowling && (
                        <BowlingStatDisplay
                          bowling={player.bowling}
                          delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                        />
                      )}
                      {player.allRounder && (
                        <StatItem
                          label="AR SCORE"
                          value={player.allRounder.score}
                          delay={delay + STAT_DISPLAY_DELAY_OFFSET}
                          highlight
                        />
                      )}
                    </>
                  )}
              </>
            )}
          </div>

          {/* Player Name */}
          <TeamOfTheWeekPlayerName
            value={cleanPlayerName(player.player).toUpperCase()}
            animation={{
              ...largeTextAnimation,
              delay: delay + PLAYER_NAME_DELAY_OFFSET,
            }}
            className=""
          />
        </div>

        {/* Logo Section - conditional */}
        {!isAccountClub && (
          <div
            className="w-20 h-full shrink-0 relative overflow-hidden"
            style={{
              background: logoBG,
            }}
          >
            <Img
              src={player.club.logo.url}
              alt={player.club.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}
      </div>
    </AnimatedContainer>
  );
};

export default PlayerRowBasic;
```

**Key Points:**
- **Three sections**: Icon, stats/name, logo
- **Category-specific stats**: Shows batting/bowling/all-rounder stats based on position
- **Club logo conditional**: Hidden for club accounts
- **Staggered animations**: Uses `index * PLAYER_STAGGER_DELAY`
- **Position icon**: Uses icon pack system

---

### Step 8: Create Stat Display Components

Create stat display components in `controller/PlayerRow/_utils/components.tsx`.

**Example:** `src/compositions/cricket/TeamOfTheWeek/controller/PlayerRow/_utils/components.tsx`

```typescript
import React from "react";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { MetadataSmall } from "../../../../utils/primitives/metadataSmall";
import { TeamOfTheWeekStat } from "../../../../utils/primitives/TeamOfTheWeekStat";
import {
  BattingStatDisplayProps,
  BowlingStatDisplayProps,
  StatItemProps,
} from "../_types/StatDisplayProps";
import {
  STAT_SUFFIX_DELAY_OFFSET,
  PLAYER_NAME_DELAY_OFFSET,
} from "./constants";

/**
 * Component to display formatted batting stats
 * Shows runs (with not-out indicator) and balls faced
 */
export const BattingStatDisplay: React.FC<BattingStatDisplayProps> = ({
  batting,
  delay,
}) => {
  const { animations } = useAnimationContext();
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const scoreDisplay = `${batting.runs}${batting.notOut ? "*" : ""}`;
  const ballsDisplay = `(${batting.balls})`;

  return (
    <div className="flex items-baseline gap-1">
      <MetadataSmall
        value={scoreDisplay}
        animation={{ ...largeTextAnimation, delay: delay }}
        variant="onContainerCopy"
        className=""
      />
      <MetadataSmall
        value={ballsDisplay}
        animation={{
          ...smallTextAnimation,
          delay: delay + STAT_SUFFIX_DELAY_OFFSET,
        }}
        variant="onContainerCopy"
        className="text-md"
      />
    </div>
  );
};

/**
 * Component to display formatted bowling stats
 * Shows wickets/runs and overs
 */
export const BowlingStatDisplay: React.FC<BowlingStatDisplayProps> = ({
  bowling,
  delay,
}) => {
  const { animations } = useAnimationContext();
  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const wicketsRunsDisplay = `${bowling.wickets}/${bowling.runs}`;
  const oversDisplay = `(${bowling.overs})`;

  return (
    <div className="flex items-baseline gap-1">
      <TeamOfTheWeekStat
        value={wicketsRunsDisplay}
        animation={{ ...largeTextAnimation, delay: delay }}
        variant="onContainerCopy"
        className=""
      />
      <MetadataSmall
        value={oversDisplay}
        animation={{
          ...smallTextAnimation,
          delay: delay + STAT_SUFFIX_DELAY_OFFSET,
        }}
        variant="onContainerCopy"
        className="text-xs"
      />
    </div>
  );
};

/**
 * Helper component for stat items (used for all-rounder score)
 */
export const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  delay,
}) => {
  const { animations } = useAnimationContext();
  const smallTextAnimation = animations.text.main.copyIn;
  const largeTextAnimation = animations.text.main.copyIn;

  return (
    <div>
      <TeamOfTheWeekStat
        value={label}
        animation={{ ...smallTextAnimation, delay: delay }}
        variant="onContainerTitle"
        className="mb-0.5"
      />
      {" : "}
      <TeamOfTheWeekStat
        value={String(value)}
        animation={{
          ...largeTextAnimation,
          delay: delay + STAT_SUFFIX_DELAY_OFFSET,
        }}
        variant="onContainerTitle"
        className=""
      />
    </div>
  );
};
```

**Key Points:**
- **Batting stats**: Shows runs with not-out indicator and balls
- **Bowling stats**: Shows wickets/runs and overs
- **All-rounder stats**: Shows label and value
- **Animation delays**: Staggered delays for smooth animations

---

### Step 9: Create Variant Entry Point

Create the main component file for your first variant (e.g., `basic.tsx`).

**Example:** `src/compositions/cricket/TeamOfTheWeek/basic.tsx`

```typescript
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import TeamOfTheWeekDisplayBasic from "./controller/TeamOfTheWeekDisplay/display-Basic";
import {
  hasValidTeamOfTheWeekData,
  castToTeamOfTheWeekPlayers,
  extractSponsors,
} from "./_utils/dataHelpers";
import { NoDataPlaceholder } from "./_utils/components";

export const TeamOfTheWeekList: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: teamOfTheWeekData, videoMeta } = data;
  const sponsors = extractSponsors(videoMeta);

  // If no data is available, show a placeholder
  if (!hasValidTeamOfTheWeekData(teamOfTheWeekData)) {
    return <NoDataPlaceholder />;
  }

  // Cast the data to the correct type
  const players = castToTeamOfTheWeekPlayers(teamOfTheWeekData);

  return (
    <TeamOfTheWeekDisplayBasic players={players} sponsors={sponsors.primary} />
  );
};

// Export as Basic for compatibility with template system
export const Basic: React.FC = () => {
  return <TeamOfTheWeekList />;
};

export default Basic;
```

**Key Points:**
- **Data validation**: Checks if data is valid before rendering
- **Sponsor extraction**: Extracts sponsors from video metadata
- **Display component**: Passes data to variant-specific display component
- **No screen pagination**: Shows all players on one screen

---

### Step 10: Export from Composition Index

Create or update `index.tsx` to export your variant.

**Example:** `src/compositions/cricket/TeamOfTheWeek/index.tsx`

```typescript
// Import variant components
import BasicTeamOfTheWeek from "./basic";
// Import other variants as you create them
// import ClassicTeamOfTheWeek from "./classic";
// import BrickWorkTeamOfTheWeek from "./brickWork";

// Export all template implementations
export const basic = BasicTeamOfTheWeek;
// Add more as you create them:
// export const classic = ClassicTeamOfTheWeek;
// export const brickwork = BrickWorkTeamOfTheWeek;
```

---

### Step 11: Add to Sport Module Export

Add your composition to the sport's main index file.

**Example:** `src/compositions/cricket/index.tsx`

```typescript
// Import team of the week variants
import {
  basic as teamOfTheWeekBasic,
  // Add more variants as you create them
} from "./TeamOfTheWeek";

// ... other composition imports

// Export implementations for all composition types
export const CricketTeamOfTheWeek = {
  basic: teamOfTheWeekBasic,
  // Add more variants as you create them:
  // classic: teamOfTheWeekClassic,
  // brickwork: teamOfTheWeekBrickWork,
};
```

**Important:** The export name MUST match the `compositionId` in your JSON test data (e.g., "CricketTeamOfTheWeek").

---

## Player Categories and Stats

### Category Types

1. **Batter** (`category: "Batter"`):
   - **Required**: `batting: BattingStats`
   - **Positions**: `topscorer`, `higheststrikerate`
   - **Stats Display**: Runs (with not-out indicator), balls faced

2. **Bowler** (`category: "Bowler"`):
   - **Required**: `bowling: BowlingStats`
   - **Optional**: `batting?: BattingStats`
   - **Positions**: `mostwickets`, `besteconomy`
   - **Stats Display**: Wickets/runs, overs

3. **All-Rounder** (`category: "All-Rounder"`):
   - **Required**: `batting: BattingStats`, `bowling: BowlingStats`, `allRounder: AllRounderStats`
   - **Position**: `topallrounder`
   - **Stats Display**: Both batting and bowling stats, plus all-rounder score

4. **Twelfth Man** (`category: "Twelfth Man"`):
   - **Optional**: `batting?: BattingStats`, `bowling?: BowlingStats`, `allRounder?: AllRounderStats`
   - **Position**: `bestoftherest`
   - **Stats Display**: Shows whatever stats are available

### Position Types

- `topscorer` - Top run scorer (Batter)
- `higheststrikerate` - Highest strike rate (Batter)
- `mostwickets` - Most wickets (Bowler)
- `besteconomy` - Best economy rate (Bowler)
- `topallrounder` - Top all-rounder (All-Rounder)
- `bestoftherest` - Best of the rest (Twelfth Man)

---

## Display Components

### Structure

Display components (`controller/TeamOfTheWeekDisplay/display-*.tsx`):
- Create 2-column grid layout
- Map over players array
- Render player row components
- Include sponsor footer
- Use fixed row heights

### Variant-Specific Constants

Row heights are defined in `controller/TeamOfTheWeekDisplay/_utils/constants.ts`:

```typescript
export const DEFAULT_ROW_HEIGHT_BASIC = 110;
export const DEFAULT_ROW_HEIGHT_CLASSIC = 110;
export const DEFAULT_ROW_HEIGHT_BRICKWORK = 130;
export const DEFAULT_ROW_HEIGHT_CLASSIC_TWO_COLUMN = 85;
export const DEFAULT_ROW_HEIGHT_SIXERS_THUNDER = 80;
export const DEFAULT_ROW_HEIGHT_CNSW = 70;
export const DEFAULT_ROW_HEIGHT_CNSW_PRIVATE = 70;
```

---

## Player Row Components

### Structure

Player row components (`controller/PlayerRow/row-*.tsx`):
- Three sections: Icon, Stats/Name, Logo
- Category-specific stat display
- Position icon from icon pack
- Conditional club logo
- Staggered animations

### Layout Pattern

```
┌─────────────────────────────────────┐
│ [Icon] │ Stats + Name │ [Logo]     │
│        │              │            │
│  🏏    │ 150* (120)   │  [Club]    │
│        │ PLAYER NAME  │            │
└─────────────────────────────────────┘
```

### Stat Display Logic

1. **All-Rounder with Both Stats**:
   - Shows batting stats + "&" + bowling stats

2. **Batting Positions** (`topscorer`, `higheststrikerate`):
   - Shows batting stats only

3. **Bowling Positions** (`mostwickets`, `besteconomy`):
   - Shows bowling stats only

4. **Best of Rest** (`bestoftherest`):
   - Shows whatever stats are available
   - Falls back to all-rounder score if available

---

## Icon System

### Icon Pack Structure

Icons are organized in icon packs (`svg/icon1/`):
- `Batter1.tsx` - Batter icon variant 1
- `Batter2.tsx` - Batter icon variant 2
- `Bowler1.tsx` - Bowler icon variant 1
- `Bowler2.tsx` - Bowler icon variant 2
- `AllRounder.tsx` - All-rounder icon
- `12thMan.tsx` - Twelfth man icon

### Icon Pack Registration

Icons are registered in `utils/iconPacks.ts`:
- `registerIconPack()` - Register a new icon pack
- `getPositionIcon()` - Get icon component for a position
- `setDefaultIconPack()` - Set default icon pack
- `getDefaultIconPack()` - Get current default icon pack

### Position to Icon Mapping

Icons are mapped based on `categoryDetail.position`:
- `topscorer` → `Batter1` or `Batter2`
- `higheststrikerate` → `Batter1` or `Batter2`
- `mostwickets` → `Bowler1` or `Bowler2`
- `besteconomy` → `Bowler1` or `Bowler2`
- `topallrounder` → `AllRounder`
- `bestoftherest` → `12thMan`

---

## Screen Pagination

### Current Implementation

**Note:** Current implementations show all players on one screen. Screen pagination utilities exist but are not used in current variants.

### If Implementing Screen Pagination

1. **Read items per screen** from video metadata:
   ```typescript
   const itemsPerScreen =
     videoMeta.video.contentLayout.divideFixturesBy.CricketTeamOfTheWeek || 5;
   ```

2. **Calculate screens**:
   ```typescript
   const { totalScreens, getItemsForScreen } = calculateScreens(
     players,
     itemsPerScreen
   );
   ```

3. **Get items for current screen**:
   ```typescript
   const displayedPlayers = getItemsForScreen(screenIndex);
   ```

4. **Create sequences** for each screen (if using template layout)

---

## Club-Only Support

### Concept

Club-only support hides club logos for club-level accounts:
- **Association-level**: Shows club logos
- **Club-level**: Hides club logos

### Implementation

1. **Check account type**:
   ```typescript
   const { club } = useVideoDataContext();
   const isAccountClub = club.IsAccountClub || false;
   ```

2. **Conditional logo rendering**:
   ```typescript
   {!isAccountClub && (
     <div className="w-20 h-full shrink-0 relative overflow-hidden">
       <Img src={player.club.logo.url} alt={player.club.name} />
     </div>
   )}
   ```

---

## Animation Patterns

### Staggered Player Entry

Players animate in with staggered delays:

```typescript
const delay = index * PLAYER_STAGGER_DELAY; // PLAYER_STAGGER_DELAY = 5
```

### Stat Display Delays

Stats animate after player container:

```typescript
delay + STAT_DISPLAY_DELAY_OFFSET // 20 frames
delay + BOWLING_STAT_DELAY_OFFSET // 30 frames (for bowling in all-rounder)
delay + STAT_SUFFIX_DELAY_OFFSET  // 10 frames (for suffix like balls/overs)
```

### Player Name Delay

Player name animates after stats:

```typescript
delay + PLAYER_NAME_DELAY_OFFSET // 2 frames
```

### Animation Sequence

1. **Container** animates in at `delay`
2. **Stats** animate in at `delay + STAT_DISPLAY_DELAY_OFFSET`
3. **Player name** animates in at `delay + PLAYER_NAME_DELAY_OFFSET`

---

## Creating Variant Implementations

Once you have the Basic variant working, create additional variants:

1. **Create Display Component** (`controller/TeamOfTheWeekDisplay/display-{Variant}.tsx`)
2. **Create Player Row Component** (`controller/PlayerRow/row-{Variant}.tsx`)
3. **Create Variant Entry Point** (`{variant}.tsx`)
4. **Export from Index** (`index.tsx`)
5. **Export from Sport Module** (`src/compositions/cricket/index.tsx`)

### Variant-Specific Considerations

- **Row height**: Adjust in `_utils/constants.ts`
- **Grid gap**: Adjust gap between rows (`gap-2`, `gap-4`, etc.)
- **Padding**: Adjust vertical padding (`py-8`, `py-32`, etc.)
- **Styling**: Match template variant design
- **Stat display**: May vary by variant (e.g., Sixers/Thunder uses different format)

---

## Hooking Up to Routing

### Composition ID

The routing system recognizes:
- `CricketTeamOfTheWeek`

### Routing Configuration

**Check:** `src/core/utils/routing.tsx`

```typescript
const SPORT_COMPOSITION_TYPES: SportCompositionTypes = {
  cricket: {
    CricketTeamOfTheWeek: "CricketTeamOfTheWeek",
    // ... other composition types
  },
};
```

---

## Common Patterns

### Pattern 1: Player Row Rendering

```typescript
{players.map((player, index) => (
  <PlayerRowBasic
    key={player.player}
    player={player}
    index={index}
    rowHeight={DEFAULT_ROW_HEIGHT_BASIC}
  />
))}
```

### Pattern 2: Category-Specific Stat Display

```typescript
{player.categoryDetail.position === "topscorer" && player.batting && (
  <BattingStatDisplay batting={player.batting} delay={delay} />
)}
```

### Pattern 3: All-Rounder with Both Stats

```typescript
{isAllRounder && hasBoth && player.batting && player.bowling && (
  <div className="flex flex-row gap-4">
    <BattingStatDisplay batting={player.batting} delay={delay} />
    <span>&amp;</span>
    <BowlingStatDisplay bowling={player.bowling} delay={delay} />
  </div>
)}
```

### Pattern 4: Club Logo Conditional

```typescript
{!isAccountClub && (
  <div className="w-20 h-full">
    <Img src={player.club.logo.url} alt={player.club.name} />
  </div>
)}
```

### Pattern 5: Position Icon Display

```typescript
const PositionIcon = getPositionIcon(
  player.categoryDetail.position,
  DEFAULT_ICON_PACK,
);

{PositionIcon && (
  <PositionIcon className="w-20 h-20" style={{ color: iconColor }} />
)}
```

---

## Testing

### Test Data Structure

```typescript
const testPlayer: TeamOfTheWeekPlayer = {
  category: "Batter",
  categoryDetail: {
    type: "Batter",
    position: "topscorer",
  },
  rank: 1,
  player: "John Smith (c)",
  primaryTeam: "Team A",
  club: {
    name: "Club Name",
    logo: {
      url: "https://example.com/logo.png",
      width: 100,
      height: 100,
    },
  },
  rankings: {
    topRunScorer: 1,
  },
  batting: {
    runs: 150,
    balls: 120,
    fours: 10,
    sixes: 5,
    strikeRate: 125.0,
    notOut: true,
    team: "Team A",
  },
};
```

### Test Scenarios

1. **All Categories**: Test with Batter, Bowler, All-Rounder, Twelfth Man
2. **All Positions**: Test all position types
3. **Club vs Association**: Test with `isAccountClub` true/false
4. **Edge Cases**: Empty data, single player, many players
5. **Stat Display**: Test all stat display variations
6. **Animations**: Verify staggered animations work correctly

---

## Troubleshooting

### Issue: Wrong Stats Displayed

**Error:** Stats don't match player category

**Solutions:**
1. Check `categoryDetail.position` matches expected position
2. Verify type guards (`isBatterPlayer`, etc.)
3. Check stat display logic matches position type
4. Verify player has required stats for category

### Issue: Club Logo Not Showing/Hiding

**Error:** Club logo visibility incorrect

**Solutions:**
1. Check `isAccountClub` flag is set correctly
2. Verify conditional rendering logic (`{!isAccountClub && ...}`)
3. Check club logo URL is valid
4. Verify `useVideoDataContext` is imported correctly

### Issue: Position Icon Not Showing

**Error:** Icon not displaying

**Solutions:**
1. Check icon pack is registered
2. Verify `getPositionIcon()` returns valid component
3. Check position string matches icon pack mapping
4. Verify icon component is exported correctly

### Issue: Animations Not Working

**Error:** Animations not staggered or not animating

**Solutions:**
1. Check delay calculation (`index * PLAYER_STAGGER_DELAY`)
2. Verify animation context is available
3. Check animation delay offsets are correct
4. Verify `AnimatedContainer` is used correctly

### Issue: Grid Layout Issues

**Error:** Players not displaying in 2-column grid

**Solutions:**
1. Check `grid grid-cols-2` classes are applied
2. Verify row height is set correctly
3. Check gap spacing (`gap-2`, `gap-4`, etc.)
4. Verify container has correct height

---

## Quick Reference

### File Checklist

- [ ] `types.ts` - Data type definitions
- [ ] `_utils/dataHelpers.ts` - Data validation and extraction
- [ ] `_utils/components.tsx` - NoDataPlaceholder component
- [ ] `utils/screenCalculator.ts` - Screen pagination utilities (optional)
- [ ] `utils/config.ts` - Icon and name utilities
- [ ] `utils/iconPacks.ts` - Icon pack registration
- [ ] `svg/icon1/` - Icon pack SVG components
- [ ] `controller/TeamOfTheWeekDisplay/_utils/constants.ts` - Row height constants
- [ ] `controller/TeamOfTheWeekDisplay/display-{Variant}.tsx` - Display component
- [ ] `controller/PlayerRow/_utils/constants.ts` - Animation delay constants
- [ ] `controller/PlayerRow/_utils/components.tsx` - Stat display components
- [ ] `controller/PlayerRow/_utils/helpers.ts` - Helper functions
- [ ] `controller/PlayerRow/row-{Variant}.tsx` - Player row component
- [ ] `{variant}.tsx` - Variant entry point
- [ ] `index.tsx` - Composition exports
- [ ] Updated `src/compositions/cricket/index.tsx` - Sport module export

### Key Functions

```typescript
// Data validation
hasValidTeamOfTheWeekData(teamOfTheWeekData): boolean
castToTeamOfTheWeekPlayers(teamOfTheWeekData): TeamOfTheWeekPlayer[]
extractSponsors(videoMeta): { primary: unknown[] }

// Screen calculation (if using pagination)
calculateScreens(items, itemsPerScreen): ScreenCalculationResult
getItemsForScreen(items, screenIndex, itemsPerScreen): TeamOfTheWeekPlayer[]

// Icon system
getPositionIcon(position, iconPack): React.ComponentType | null
cleanPlayerName(name): string
getScoreValues(player): { mainValue: string; suffix: string }

// Type guards
isBatterPlayer(player): player is BatterPlayer
isBowlerPlayer(player): player is BowlerPlayer
isAllRounderPlayer(player): player is AllRounderPlayer
isTwelfthManPlayer(player): player is TwelfthManPlayer
hasBattingStats(player): boolean
hasBowlingStats(player): boolean
hasAllRounderStats(player): boolean
```

### Row Height Constants

- **Basic**: 110px
- **Classic**: 110px
- **BrickWork**: 130px
- **ClassicTwoColumn**: 85px
- **SixersThunder**: 80px
- **CNSW**: 70px
- **CNSWPrivate**: 70px

### Animation Delay Constants

- **PLAYER_STAGGER_DELAY**: 5 frames
- **STAT_DISPLAY_DELAY_OFFSET**: 20 frames
- **BOWLING_STAT_DELAY_OFFSET**: 30 frames
- **STAT_SUFFIX_DELAY_OFFSET**: 10 frames
- **PLAYER_NAME_DELAY_OFFSET**: 2 frames

### Player Categories

- **Batter**: `topscorer`, `higheststrikerate`
- **Bowler**: `mostwickets`, `besteconomy`
- **All-Rounder**: `topallrounder`
- **Twelfth Man**: `bestoftherest`

---

## Summary

Creating a team of the week composition involves:

1. **Defining types** for player categories and stats
2. **Creating utilities** for data validation, screen calculation, and helpers
3. **Building display components** that create 2-column grids
4. **Building player row components** that display category-specific stats
5. **Implementing icon system** for position-based icons
6. **Adding club-only support** for conditional logo display
7. **Creating variants** with different styling and layouts

### Key Implementation Details

**Player Row Structure:**
- Icon section (position-based SVG)
- Stats section (category-specific)
- Player name section
- Logo section (conditional for club accounts)

**Stat Display Logic:**
- All-rounders with both stats show batting + bowling
- Batting positions show batting stats only
- Bowling positions show bowling stats only
- Best of rest shows whatever is available

**Animation Pattern:**
- Staggered player entry (5 frames per player)
- Stats animate after container (20 frames offset)
- Player name animates after stats (2 frames offset)

The Basic variant serves as a reference implementation showing all these patterns working together.

---

**Last Updated:** 2026-02-08

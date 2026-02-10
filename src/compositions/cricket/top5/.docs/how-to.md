# How to Create a New Top 5 Composition Asset Type

This guide explains how to create a new **top 5 composition asset type** (like `CricketTop5Batting` or `CricketTop5Bowling`) from scratch. This composition type displays a ranked list of top 5 players (batters or bowlers) with their statistics.

**Last Updated:** 2026-02-08

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Player Types and Data Transformation](#player-types-and-data-transformation)
6. [Display Components](#display-components)
7. [Player Row Components](#player-row-components)
8. [Layout Components](#layout-components)
9. [Score Display System](#score-display-system)
10. [Title System](#title-system)
11. [Animation Patterns](#animation-patterns)
12. [Creating Variant Implementations](#creating-variant-implementations)
13. [Hooking Up to Routing](#hooking-up-to-routing)
14. [Common Patterns](#common-patterns)
15. [Testing](#testing)
16. [Troubleshooting](#troubleshooting)
17. [Quick Reference](#quick-reference)

---

## Overview

### What is a Top 5 Composition?

A **top 5 composition** is a sport-specific content type that displays:
- **Ranked list of top 5 players** (batters or bowlers)
- **Player statistics** (runs/balls for batters, wickets/runs/overs for bowlers)
- **Team logos** (for each player's team)
- **Player names and teams** (truncated for display)
- **Dynamic titles** (based on composition type)
- **Sponsor footer** (club-level sponsors)

### Key Characteristics

| Aspect | Top 5 |
|--------|-------|
| **Layout** | Single column, vertical list |
| **Players Per Screen** | Up to 5 players (typically) |
| **Row Height** | Calculated dynamically based on player count |
| **Player Types** | Batter or Bowler (union type) |
| **Score Display** | Type-specific (runs/balls vs wickets/runs/overs) |
| **Title** | Dynamic based on composition ID |
| **Background Colors** | Top player uses different color |

### Example: Cricket Top 5 Composition

The `CricketTop5Batting` and `CricketTop5Bowling` compositions:
- **Data Type**: `PlayerData[]` - array of player objects (union type)
- **Structure**: Each player has name, team, logo, stats (batting or bowling)
- **Variants**: `basic`, `classic`, `brickwork`, `classicTwoColumn`, `cnsw`, `cnswPrivate`, `sixersThunder`
- **Components**: Display components, player row components, layout components
- **Transformation**: Data transformed based on composition ID

---

## Architecture

### Folder Structure

```
src/compositions/cricket/top5/
├── .docs/
│   └── how-to.md                    # This guide
├── _types/
│   └── types.ts                     # TypeScript interfaces
├── _utils/
│   ├── dataHelpers.ts              # Data validation and extraction
│   └── titleHelpers.ts             # Title generation helpers
├── utils/
│   └── dataTransformer.ts          # Data transformation logic
├── controller/
│   ├── PlayersDisplay/
│   │   ├── _types/
│   │   │   ├── PlayersDisplayProps.ts
│   │   │   └── PlayersDisplayPropsWithoutSponsors.ts
│   │   ├── _utils/
│   │   │   ├── calculations.ts    # Row dimension calculations
│   │   │   └── constants.ts       # Display constants
│   │   ├── display-Basic.tsx       # Display component for Basic variant
│   │   ├── display-Classic.tsx     # Display component for Classic variant
│   │   └── ...
│   └── PlayerRow/
│       ├── _types/
│       │   └── PlayerRowProps.ts
│       ├── _utils/
│       │   ├── calculations.ts    # Animation delay calculations
│       │   ├── constants.ts        # Animation constants
│       │   └── helpers.ts          # Helper functions
│       ├── row-Basic.tsx           # Player row for Basic variant
│       ├── row-Classic.tsx          # Player row for Classic variant
│       └── ...
├── layout/
│   ├── _types/
│   │   └── PlayerRowLayoutProps.ts
│   ├── _utils/
│   │   ├── constants.ts            # Layout constants
│   │   ├── helpers.ts              # Text truncation helpers
│   │   └── scoreHelpers.ts         # Score display helpers
│   ├── StandardPlayerRow.tsx       # Standard player row layout
│   ├── PlayerRowNameLogoWrapperValue.tsx
│   ├── PlayerRowNameClassicTwoColumn.tsx
│   ├── PlayerRowNameCNSW.tsx
│   ├── PlayerRowNameCNSW-private.tsx
│   └── PlayerRowNameSixersThunder.tsx
├── modules/
│   └── NoPlayersData/
│       └── no-data.tsx              # Empty state component
├── basic.tsx                        # Basic variant entry point
├── classic.tsx                      # Classic variant entry point
├── brickWork.tsx                    # Brickwork variant entry point
├── index.tsx                        # Exports all variants
└── readMe.md                        # Folder documentation
```

### Key Concepts

1. **Variant Entry Points** (`basic.tsx`, `classic.tsx`, etc.):
   - Main component that handles data fetching, validation
   - Transforms data based on composition ID
   - Extracts title and sponsors
   - Passes data to display component
   - No screen pagination (shows all players on one screen)

2. **Display Components** (`controller/PlayersDisplay/display-*.tsx`):
   - Variant-specific layout and styling
   - Creates single-column grid
   - Maps over players array
   - Calculates row heights dynamically
   - Includes sponsor footer

3. **Player Row Components** (`controller/PlayerRow/row-*.tsx`):
   - Variant-specific player row wrapper
   - Handles animation delays and exit frames
   - Uses layout components for rendering
   - Applies restrictions (name/team length limits)

4. **Layout Components** (`layout/`):
   - **StandardPlayerRow**: Standard layout (logo, name/team, score)
   - **PlayerRowNameLogoWrapperValue**: Grid-based layout
   - **PlayerRowNameClassicTwoColumn**: Two-column layout
   - **PlayerRowNameCNSW**: CNSW-specific layout
   - **PlayerRowNameCNSW-private**: CNSW private layout
   - **PlayerRowNameSixersThunder**: Sixers/Thunder layout

5. **Types** (`_types/types.ts`):
   - Union type: `PlayerData` (BatterData | BowlerData)
   - Type guards: `isBatter()`, `isBowler()`
   - Composition constants: `TOP5_COMPOSITIONS`

6. **Utils** (`_utils/`, `utils/`):
   - Data validation: `hasValidPlayersData()`
   - Data casting: `castToPlayerDataArray()`
   - Composition ID extraction: `extractCompositionId()`
   - Sponsor extraction: `extractPrimarySponsors()`
   - Data transformation: `transformPlayerData()`
   - Title generation: `getStandardTitle()`, `getCNSWTitle()`, `getCNSWPrivateTitle()`
   - Score display: `getScoreValues()`
   - Row calculations: `calculateRowDimensions()`

---

## Prerequisites

Before creating a new top 5 composition, ensure you have:

1. ✅ **Template variants created** (if you need custom styling)
   - See `src/templates/.docs/how-to.md` for creating template variants
   - At minimum, you need `Basic` variant

2. ✅ **Understanding of player data structure**
   - Batting stats (runs, balls, strike rate, not-out flag)
   - Bowling stats (wickets, overs, runs)
   - Team information (name, logo)
   - Player information (name, team played for)

3. ✅ **Access to test data**
   - Sample top 5 player data
   - Both batting and bowling data
   - Different composition IDs

4. ✅ **Understanding of data transformation**
   - How composition ID determines player type
   - How data is transformed based on type

---

## Step-by-Step Guide

### Step 1: Define Data Types

Create `_types/types.ts` in your composition folder.

**Example:** `src/compositions/cricket/top5/_types/types.ts`

```typescript
import { AssignSponsors } from "../../_types/composition-types";

// Types for top 5 players data structure
export interface TeamLogo {
  url: string;
  width: number;
  height: number;
}

export interface Team {
  name: string;
}

export interface Grade {
  id: number;
  name: string;
}

export interface Competition {
  id: number;
  name: string;
}

// Base player data that's common to both types
export interface BasePlayerData {
  name: string;
  teamLogo: TeamLogo;
  playedFor: string;
  assignSponsors: AssignSponsors;
  prompt: string;
}

// Batting specific player data
export interface BatterData extends BasePlayerData {
  type: "batting";
  runs: number;
  balls: number;
  SR: number;
  notOut: boolean;
}

// Bowling specific player data
export interface BowlerData extends BasePlayerData {
  type: "bowling";
  wickets: number;
  overs: string;
  runs: number;
}

// Union type to represent either a batter or bowler
export type PlayerData = BatterData | BowlerData;

// Helper function to determine if player is a batter
export const isBatter = (player: PlayerData): player is BatterData => {
  return player.type === "batting";
};

// Helper function to determine if player is a bowler
export const isBowler = (player: PlayerData): player is BowlerData => {
  return player.type === "bowling";
};

// Animation constants
export const HEADER_ANIMATION_DURATION = 45; // 1.5 seconds for header animation
export const PLAYER_STAGGER_DELAY = 15; // 0.5 seconds stagger between players
export const PLAYER_ANIMATION_DURATION = 30; // 1 second for player animation

// Composition types
export const TOP5_COMPOSITIONS = {
  BATTING: "CricketTop5Batting",
  BOWLING: "CricketTop5Bowling",
  BATTING_PERFORMANCES: "CricketBattingPerformances",
  BOWLING_PERFORMANCES: "CricketBowlingPerformances",
} as const;
```

**Key Points:**
- **Union type**: `PlayerData` combines BatterData and BowlerData
- **Type guards**: Helper functions to check player type
- **Composition constants**: Defines composition ID strings
- **Base data**: Common fields shared by both types

---

### Step 2: Create Helper Utilities

Create `_utils/dataHelpers.ts` for data validation and extraction.

**Example:** `src/compositions/cricket/top5/_utils/dataHelpers.ts`

```typescript
import { PlayerData } from "../_types/types";
import { Sponsor } from "../../../../core/types/data/sponsors";

/**
 * Check if players data is valid
 * @param playersData - Data from video context
 * @returns True if data is valid and non-empty array
 */
export const hasValidPlayersData = (playersData: unknown): boolean => {
  return (
    playersData !== null &&
    playersData !== undefined &&
    Array.isArray(playersData) &&
    playersData.length > 0
  );
};

/**
 * Cast players data to typed array
 * @param playersData - Data from video context
 * @returns Typed array of PlayerData
 */
export const castToPlayerDataArray = (
  playersData: unknown,
): PlayerData[] => {
  return playersData as unknown as PlayerData[];
};

/**
 * Extract composition ID from video metadata
 * @param videoMeta - Video metadata from context
 * @returns Composition ID string (empty string if not available)
 */
export const extractCompositionId = (videoMeta: {
  video?: { metadata?: { compositionId?: string } };
} | undefined): string => {
  return videoMeta?.video?.metadata?.compositionId || "";
};

/**
 * Extract primary sponsors array from video metadata
 * @param videoMeta - Video metadata from context
 * @returns Array of Sponsor objects (empty array if not available)
 */
export const extractPrimarySponsors = (videoMeta: {
  club?: { sponsors?: { primary?: Sponsor[] } };
} | undefined): Sponsor[] => {
  return videoMeta?.club?.sponsors?.primary || [];
};
```

**Key Points:**
- **Validation**: Checks if data is valid array with items
- **Type casting**: Safely casts unknown data to PlayerData[]
- **Composition ID**: Extracts from video metadata
- **Sponsors**: Extracts primary sponsors from club data

---

### Step 3: Create Data Transformer

Create `utils/dataTransformer.ts` for transforming data based on composition type.

**Example:** `src/compositions/cricket/top5/utils/dataTransformer.ts`

```typescript
import {
  BatterData,
  BowlerData,
  PlayerData,
  TOP5_COMPOSITIONS,
} from "../_types/types";

/**
 * Transform raw player data based on the composition type
 * @param rawData Raw data from API/JSON
 * @param compositionId The ID of the composition (batting or bowling)
 * @returns Properly typed player data
 */
export const transformPlayerData = (
  rawData: PlayerData[],
  compositionId: string,
): PlayerData[] => {
  if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
    return [];
  }

  return rawData.map((player) => {
    if (
      compositionId === TOP5_COMPOSITIONS.BATTING ||
      compositionId === TOP5_COMPOSITIONS.BATTING_PERFORMANCES
    ) {
      // Transform batting data
      return {
        ...player,
        type: "batting",
      } as BatterData;
    } else {
      // Transform bowling data
      return {
        ...player,
        type: "bowling",
      } as BowlerData;
    }
  });
};

/**
 * Get the title based on composition type
 * @param compositionId The ID of the composition
 * @returns The appropriate title for the composition
 */
export const getTitle = (compositionId: string): string => {
  switch (compositionId) {
    case TOP5_COMPOSITIONS.BATTING:
      return "Top 5 Batters";
    case TOP5_COMPOSITIONS.BOWLING:
      return "Top 5 Bowlers";
    case TOP5_COMPOSITIONS.BATTING_PERFORMANCES:
      return "Batting Performances";
    case TOP5_COMPOSITIONS.BOWLING_PERFORMANCES:
      return "Bowling Performances";
    default:
      return "Top 5 Players";
  }
};
```

**Key Points:**
- **Type transformation**: Adds `type` field based on composition ID
- **Composition detection**: Checks composition ID to determine type
- **Title generation**: Returns appropriate title for composition

---

### Step 4: Create Title Helpers

Create `_utils/titleHelpers.ts` for variant-specific title generation.

**Example:** `src/compositions/cricket/top5/_utils/titleHelpers.ts`

```typescript
import { getTitle } from "../utils/dataTransformer";

/**
 * Get title for CNSW variant using grouping category
 * @param videoMeta - Video metadata from context
 * @returns Title string (grouping category or empty string)
 */
export const getCNSWTitle = (videoMeta: {
  video?: { groupingCategory?: string };
} | undefined): string => {
  return videoMeta?.video?.groupingCategory || "";
};

/**
 * Get title for CNSW-private variant using grade name from first player
 * @param playersData - Players data array
 * @returns Title string (grade name or empty string)
 */
export const getCNSWPrivateTitle = (
  playersData: unknown[],
): string => {
  if (!playersData || playersData.length === 0) {
    return "";
  }
  const firstPlayer = playersData[0] as {
    assignSponsors?: { grade?: { name?: string } };
  };
  return firstPlayer?.assignSponsors?.grade?.name || "";
};

/**
 * Get title for standard variants using composition ID
 * @param compositionId - Composition ID string
 * @returns Title string from data transformer
 */
export const getStandardTitle = (compositionId: string): string => {
  return getTitle(compositionId);
};
```

**Key Points:**
- **Standard title**: Uses composition ID
- **CNSW title**: Uses grouping category from metadata
- **CNSW private title**: Uses grade name from first player

---

### Step 5: Create Score Helpers

Create `layout/_utils/scoreHelpers.ts` for score display logic.

**Example:** `src/compositions/cricket/top5/layout/_utils/scoreHelpers.ts`

```typescript
import { PlayerData, isBatter, isBowler } from "../../_types/types";

/**
 * Score display values for a player
 */
export interface ScoreValues {
  mainValue: string;
  suffix: string;
}

/**
 * Get the appropriate score display values based on player type
 * @param player - PlayerData object (batter or bowler)
 * @returns Object containing mainValue and suffix for score display
 */
export const getScoreValues = (player: PlayerData): ScoreValues => {
  if (isBatter(player)) {
    // Main value is runs (with * for not out), suffix is only balls faced
    const mainValue = player.notOut ? `${player.runs}*` : `${player.runs}`;
    const suffix = player.balls > 0 ? `(${player.balls})` : "";
    return { mainValue, suffix };
  } else if (isBowler(player)) {
    // Main value is wickets-runs, suffix is overs
    const mainValue = `${player.wickets}/${player.runs}`;
    const suffix = `(${player.overs})`;
    return { mainValue, suffix };
  }

  // Fallback
  return { mainValue: "--", suffix: "" };
};
```

**Key Points:**
- **Batting scores**: Runs with not-out indicator, balls in suffix
- **Bowling scores**: Wickets/runs, overs in suffix
- **Type guards**: Uses `isBatter()` and `isBowler()` to check type

---

### Step 6: Create Empty State Component

Create a component to show when there's no data.

**Example:** `src/compositions/cricket/top5/modules/NoPlayersData/no-data.tsx`

```typescript
import React from "react";
import { AbsoluteFill } from "remotion";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { getTitle } from "../../utils/dataTransformer";

const NoPlayersData: React.FC = () => {
  // Get composition ID to determine the title
  const { data } = useVideoDataContext();
  const { videoMeta } = data;
  const compositionId = videoMeta?.video?.metadata?.compositionId || "";

  // Get title based on composition type
  const title = getTitle(compositionId);

  return (
    <AbsoluteFill className="flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">No {title} Data Available</h2>
        <p className="text-gray-400">
          Please check your data source and try again.
        </p>
      </div>
    </AbsoluteFill>
  );
};

export default NoPlayersData;
```

**Key Points:**
- **AbsoluteFill**: Uses Remotion's AbsoluteFill for full-screen display
- **Dynamic title**: Uses composition ID to determine title
- **Context-aware**: Gets composition ID from video context

---

### Step 7: Create Layout Components

Create layout components for player rows.

**Example:** `src/compositions/cricket/top5/layout/StandardPlayerRow.tsx`

```typescript
import React from "react";
import { TeamLogo as Top5TeamLogoType } from "../_types/types";
import { TeamLogo } from "../../utils/primitives/TeamLogo";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { Top5PlayerName } from "../../utils/primitives/Top5PlayerName";
import { Top5PlayerTeam } from "../../utils/primitives/Top5PlayerTeam";
import { Top5PlayerScore } from "../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../utils/primitives/Top5PlayerScoreSuffix";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { PlayerRowLayoutPropsWithRestrictions } from "./_types/PlayerRowLayoutProps";
import { truncateText } from "./_utils/helpers";
import { getScoreValues } from "./_utils/scoreHelpers";
import {
  DEFAULT_LOGO_SIZE,
  PLAYER_NAME_DELAY_OFFSET,
  TEAM_NAME_DELAY_OFFSET,
  MAIN_SCORE_DELAY_OFFSET,
  SCORE_SUFFIX_DELAY_OFFSET,
} from "./_utils/constants";

export const StandardPlayerRow: React.FC<PlayerRowLayoutPropsWithRestrictions> = ({
  player,
  index,
  rowHeight,
  delay,
  restrictions,
}) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();

  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const logoSize = DEFAULT_LOGO_SIZE;

  // Determine background color
  const isTopPlayer = index === 0;
  const bgColor = isTopPlayer
    ? selectedPalette.container.backgroundTransparent.high
    : selectedPalette.container.backgroundTransparent.medium;

  const LogoBG = isTopPlayer
    ? selectedPalette.container.transparentSecondary
    : selectedPalette.container.backgroundTransparent.strong;

  // Get truncated player name and team name
  const playerName = truncateText(
    player.name,
    restrictions.nameLength,
  ).toUpperCase();
  const teamName = truncateText(
    player.playedFor,
    restrictions.teamLength,
  ).toUpperCase();

  // Get score display values
  const { mainValue, suffix } = getScoreValues(player);

  return (
    <div
      className="flex items-stretch h-full overflow-hidden rounded-lg"
      style={{ height: `${rowHeight}px` }}
    >
      {/* Logo Section (Fixed Width) */}
      <div
        className="w-30 bg-white flex items-center justify-center p-1 shrink-0"
        style={{
          background: LogoBG,
        }}
      >
        <TeamLogo
          logo={player.teamLogo as Top5TeamLogoType}
          teamName={player.playedFor}
          delay={delay}
          size={logoSize}
        />
      </div>

      {/* Content Section (Variable Width) */}
      <div
        className={`flex-grow flex items-center justify-between px-4`}
        style={{
          background: bgColor,
        }}
      >
        {/* Left Side: Name & Team */}
        <div className="flex flex-col justify-center">
          <Top5PlayerName
            value={playerName}
            animation={{ ...largeTextAnimation, delay: delay + PLAYER_NAME_DELAY_OFFSET }}
            className=""
          />
          <Top5PlayerTeam
            value={teamName}
            animation={{ ...smallTextAnimation, delay: delay + TEAM_NAME_DELAY_OFFSET }}
            className=""
          />
        </div>

        {/* Right Side: Score */}
        <div className="flex items-center justify-center whitespace-nowrap leading-none">
          <Top5PlayerScore
            value={mainValue}
            animation={{ ...largeTextAnimation, delay: delay + MAIN_SCORE_DELAY_OFFSET }}
            className=""
          />
          {suffix && (
            <Top5PlayerScoreSuffix
              value={suffix}
              animation={{ ...smallTextAnimation, delay: delay + SCORE_SUFFIX_DELAY_OFFSET }}
              className=""
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StandardPlayerRow;
```

**Key Points:**
- **Three sections**: Logo, name/team, score
- **Top player styling**: Different background color for index 0
- **Score display**: Uses `getScoreValues()` helper
- **Text truncation**: Truncates names and teams based on restrictions

---

### Step 8: Create Player Row Component

Create the player row component wrapper.

**Example:** `src/compositions/cricket/top5/controller/PlayerRow/row-Basic.tsx`

```typescript
import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import StandardPlayerRow from "../../layout/StandardPlayerRow";
import { PlayerRowProps } from "./_types/PlayerRowProps";
import {
  calculatePlayerDelay,
  calculateExitFrame,
} from "./_utils/calculations";
import { getDefaultRestrictions } from "./_utils/helpers";

const PlayerRowBasic: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculatePlayerDelay(index);
  const animationOutFrame = calculateExitFrame(timings);

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className="rounded-lg"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <StandardPlayerRow
          player={player}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
          restrictions={getDefaultRestrictions()}
        />
      </AnimatedContainer>
    </div>
  );
};

export default PlayerRowBasic;
```

**Key Points:**
- **Animation wrapper**: Wraps layout component with AnimatedContainer
- **Delay calculation**: Uses `calculatePlayerDelay()` for staggered animations
- **Exit frame**: Calculates exit animation frame
- **Restrictions**: Uses default restrictions for name/team lengths

---

### Step 9: Create Display Component

Create the display component for the Basic variant.

**Example:** `src/compositions/cricket/top5/controller/PlayersDisplay/display-Basic.tsx`

```typescript
import React from "react";
import PlayerRowBasic from "../PlayerRow/row-Basic";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../_types/composition-types";
import { PlayersDisplayProps } from "./_types/PlayersDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";
import { DEFAULT_CONTAINER_ANIMATION_DELAY } from "./_utils/constants";

const PlayersDisplayBasic: React.FC<PlayersDisplayProps> = ({
  players,
  sponsors,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  const { rowHeight } = calculateRowDimensions(heights.asset, players.length);

  return (
    <div className="flex flex-col h-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-16 overflow-hidden py-32"
        style={{
          height: heights.asset,
        }}
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={DEFAULT_CONTAINER_ANIMATION_DELAY}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 grid grid-cols-1 gap-2">
          {players.map((player, index) => (
            <PlayerRowBasic
              key={player.name}
              player={player}
              index={index}
              rowHeight={rowHeight}
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

export default PlayersDisplayBasic;
```

**Key Points:**
- **Single column**: Uses `grid grid-cols-1`
- **Dynamic row height**: Calculates based on player count
- **Sponsor footer**: Includes footer at bottom
- **Animation container**: Wraps entire grid

---

### Step 10: Create Variant Entry Point

Create the main component file for your first variant (e.g., `basic.tsx`).

**Example:** `src/compositions/cricket/top5/basic.tsx`

```typescript
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import PlayersDisplayBasic from "./controller/PlayersDisplay/display-Basic";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import { transformPlayerData } from "./utils/dataTransformer";
import {
  hasValidPlayersData,
  castToPlayerDataArray,
  extractCompositionId,
  extractPrimarySponsors,
} from "./_utils/dataHelpers";
import { getStandardTitle } from "./_utils/titleHelpers";

export const Top5Players: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: playersData, videoMeta } = data;
  const compositionId = extractCompositionId(videoMeta);
  const sponsors = extractPrimarySponsors(videoMeta);
  
  // If no data is available, show a placeholder
  if (!hasValidPlayersData(playersData)) {
    return <NoPlayersData />;
  }

  // Transform data based on composition type
  const transformedData = transformPlayerData(
    castToPlayerDataArray(playersData),
    compositionId,
  );

  // Get appropriate title based on composition
  const title = getStandardTitle(compositionId);

  return (
    <PlayersDisplayBasic
      players={transformedData}
      title={title}
      sponsors={sponsors}
    />
  );
};

// Export as Basic for compatibility with template system
export const Basic: React.FC = () => {
  return <Top5Players />;
};

export default Basic;
```

**Key Points:**
- **Data validation**: Checks if data is valid before rendering
- **Data transformation**: Transforms data based on composition ID
- **Title extraction**: Gets title based on composition ID
- **Sponsor extraction**: Extracts sponsors from video metadata
- **Display component**: Passes data to variant-specific display component

---

### Step 11: Export from Composition Index

Create or update `index.tsx` to export your variant.

**Example:** `src/compositions/cricket/top5/index.tsx`

```typescript
import { Basic as BasicTop5 } from "./basic";
// Import other variants as you create them
// import { Classic as ClassicTop5 } from "./classic";
// import { BrickWork as BrickWorkTop5 } from "./brickWork";

// Export all template implementations
export { BasicTop5 as basic };
// Add more as you create them:
// export { ClassicTop5 as classic };
// export { BrickWorkTop5 as brickWork };
```

---

### Step 12: Add to Sport Module Export

Add your composition to the sport's main index file.

**Example:** `src/compositions/cricket/index.tsx`

```typescript
// Import top 5 variants
import {
  basic as top5Basic,
  // Add more variants as you create them
} from "./top5";

// ... other composition imports

// Export implementations for all composition types
export const CricketTop5Batting = {
  basic: top5Basic,
  // Add more variants as you create them:
  // classic: top5Classic,
  // brickwork: top5BrickWork,
};

export const CricketTop5Bowling = {
  basic: top5Basic,
  // Add more variants as you create them:
  // classic: top5Classic,
  // brickwork: top5BrickWork,
};
```

**Important:** The export names MUST match the composition IDs in your JSON test data (e.g., "CricketTop5Batting", "CricketTop5Bowling").

---

## Player Types and Data Transformation

### Player Type System

Top 5 compositions support two player types:

1. **Batter** (`type: "batting"`):
   - **Required fields**: `runs`, `balls`, `SR`, `notOut`
   - **Score display**: Runs (with * for not-out), balls in suffix
   - **Composition IDs**: `CricketTop5Batting`, `CricketBattingPerformances`

2. **Bowler** (`type: "bowling"`):
   - **Required fields**: `wickets`, `overs`, `runs`
   - **Score display**: Wickets/runs, overs in suffix
   - **Composition IDs**: `CricketTop5Bowling`, `CricketBowlingPerformances`

### Data Transformation

Data is transformed based on composition ID:

```typescript
const transformedData = transformPlayerData(
  castToPlayerDataArray(playersData),
  compositionId,
);
```

**Transformation Logic:**
- If composition ID is batting-related → adds `type: "batting"`
- If composition ID is bowling-related → adds `type: "bowling"`
- Preserves all other player data

---

## Display Components

### Structure

Display components (`controller/PlayersDisplay/display-*.tsx`):
- Create single-column grid layout
- Map over players array
- Calculate row heights dynamically
- Include sponsor footer
- Use fixed or calculated heights

### Row Height Calculation

Row heights are calculated dynamically based on:
- Total available height
- Number of players
- Vertical gaps between rows
- Padding and title height

**Formula:**
```typescript
const totalVerticalGaps = (playerCount - 1) * VERTICAL_GAP;
const availableHeight = totalHeight / HEIGHT_DIVISOR - PADDING * 2 - TITLE_HEIGHT;
const rowHeight = (availableHeight - totalVerticalGaps) / playerCount;
```

---

## Player Row Components

### Structure

Player row components (`controller/PlayerRow/row-*.tsx`):
- Wrap layout components with animation containers
- Handle animation delays and exit frames
- Apply restrictions (name/team length limits)
- Use variant-specific layout components

### Layout Components

Layout components (`layout/`):
- **StandardPlayerRow**: Standard layout (logo left, name/team center-left, score right)
- **PlayerRowNameLogoWrapperValue**: Grid-based layout (12-column grid)
- **PlayerRowNameClassicTwoColumn**: Two-column layout
- **PlayerRowNameCNSW**: CNSW-specific layout
- **PlayerRowNameCNSW-private**: CNSW private layout
- **PlayerRowNameSixersThunder**: Sixers/Thunder layout

---

## Layout Components

### StandardPlayerRow Layout

**Structure:**
```
┌─────────────────────────────────────────┐
│ [Logo] │ Player Name    │ Score         │
│        │ Team Name      │ Suffix        │
└─────────────────────────────────────────┘
```

**Sections:**
1. **Logo Section** (fixed width): Team logo
2. **Content Section** (flex-grow):
   - **Left**: Player name and team name (stacked)
   - **Right**: Score value and suffix

### PlayerRowNameLogoWrapperValue Layout

**Structure:**
```
┌─────────────────────────────────────────┐
│ Name & Team │ Logo │ Score              │
│ (col-span-7)│ (col-2)│ (col-span-3)     │
└─────────────────────────────────────────┘
```

**Grid Layout:**
- 12-column grid
- Name/team: 7 columns
- Logo: 2 columns
- Score: 3 columns

---

## Score Display System

### Score Display Logic

Scores are displayed differently based on player type:

**Batting Scores:**
- **Main value**: Runs (with `*` for not-out)
- **Suffix**: Balls faced in parentheses `(balls)`
- **Example**: `150* (120)` or `150 (120)`

**Bowling Scores:**
- **Main value**: Wickets/runs
- **Suffix**: Overs in parentheses `(overs)`
- **Example**: `5/45 (10.0)`

### Score Helper Function

```typescript
const { mainValue, suffix } = getScoreValues(player);
```

**Returns:**
- `mainValue`: Main score display (runs or wickets/runs)
- `suffix`: Suffix display (balls or overs, or empty string)

---

## Title System

### Title Generation

Titles are generated based on composition ID:

**Standard Titles:**
- `CricketTop5Batting` → "Top 5 Batters"
- `CricketTop5Bowling` → "Top 5 Bowlers"
- `CricketBattingPerformances` → "Batting Performances"
- `CricketBowlingPerformances` → "Bowling Performances"

**CNSW Titles:**
- Uses `groupingCategory` from video metadata

**CNSW Private Titles:**
- Uses grade name from first player's `assignSponsors.grade.name`

---

## Animation Patterns

### Staggered Player Entry

Players animate in with staggered delays:

```typescript
const delay = calculatePlayerDelay(index); // index * STAGGER_DELAY_MULTIPLIER
```

**STAGGER_DELAY_MULTIPLIER**: 5 frames

### Element Animation Delays

Within each player row, elements animate with increasing delays:

```typescript
delay + PLAYER_NAME_DELAY_OFFSET      // 2 frames
delay + TEAM_NAME_DELAY_OFFSET        // 4 frames
delay + MAIN_SCORE_DELAY_OFFSET       // 6 frames
delay + SCORE_SUFFIX_DELAY_OFFSET     // 7 frames
```

### Exit Animation

Exit animations start before composition ends:

```typescript
const exitFrame = calculateExitFrame(timings);
// Returns: FPS_MAIN - EXIT_ANIMATION_OFFSET (30 frames)
```

---

## Creating Variant Implementations

Once you have the Basic variant working, create additional variants:

1. **Create Display Component** (`controller/PlayersDisplay/display-{Variant}.tsx`)
2. **Create Player Row Component** (`controller/PlayerRow/row-{Variant}.tsx`)
3. **Create Layout Component** (`layout/PlayerRowName{Variant}.tsx`) - if needed
4. **Create Variant Entry Point** (`{variant}.tsx`)
5. **Export from Index** (`index.tsx`)
6. **Export from Sport Module** (`src/compositions/cricket/index.tsx`)

### Variant-Specific Considerations

- **Row height**: May use fixed height or dynamic calculation
- **Layout**: May use different layout component
- **Styling**: Match template variant design
- **Title**: May use different title generation (CNSW variants)
- **Sponsors**: May include or exclude sponsor footer

---

## Hooking Up to Routing

### Composition IDs

The routing system recognizes:
- `CricketTop5Batting`
- `CricketTop5Bowling`
- `CricketBattingPerformances`
- `CricketBowlingPerformances`

### Routing Configuration

**Check:** `src/core/utils/routing.tsx`

```typescript
const SPORT_COMPOSITION_TYPES: SportCompositionTypes = {
  cricket: {
    CricketTop5Batting: "CricketTop5Batting",
    CricketTop5Bowling: "CricketTop5Bowling",
    CricketBattingPerformances: "CricketBattingPerformances",
    CricketBowlingPerformances: "CricketBowlingPerformances",
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
    key={player.name}
    player={player}
    index={index}
    rowHeight={rowHeight}
  />
))}
```

### Pattern 2: Score Display

```typescript
const { mainValue, suffix } = getScoreValues(player);

<Top5PlayerScore value={mainValue} ... />
{suffix && (
  <Top5PlayerScoreSuffix value={suffix} ... />
)}
```

### Pattern 3: Top Player Styling

```typescript
const isTopPlayer = index === 0;
const bgColor = isTopPlayer
  ? selectedPalette.container.backgroundTransparent.high
  : selectedPalette.container.backgroundTransparent.medium;
```

### Pattern 4: Data Transformation

```typescript
const transformedData = transformPlayerData(
  castToPlayerDataArray(playersData),
  compositionId,
);
```

### Pattern 5: Type Checking

```typescript
if (isBatter(player)) {
  // Handle batting-specific logic
} else if (isBowler(player)) {
  // Handle bowling-specific logic
}
```

---

## Testing

### Test Data Structure

```typescript
const testBatter: BatterData = {
  type: "batting",
  name: "John Smith",
  teamLogo: {
    url: "https://example.com/logo.png",
    width: 100,
    height: 100,
  },
  playedFor: "Team A",
  assignSponsors: { /* ... */ },
  prompt: "",
  runs: 150,
  balls: 120,
  SR: 125.0,
  notOut: true,
};

const testBowler: BowlerData = {
  type: "bowling",
  name: "Mike Jones",
  teamLogo: {
    url: "https://example.com/logo.png",
    width: 100,
    height: 100,
  },
  playedFor: "Team B",
  assignSponsors: { /* ... */ },
  prompt: "",
  wickets: 5,
  overs: "10.0",
  runs: 45,
};
```

### Test Scenarios

1. **Both Types**: Test with batting and bowling data
2. **Different Composition IDs**: Test all composition ID types
3. **Edge Cases**: Empty data, single player, many players
4. **Score Display**: Test not-out batters, various bowling stats
5. **Title Generation**: Test all title generation methods
6. **Row Heights**: Test with different player counts

---

## Troubleshooting

### Issue: Wrong Player Type

**Error:** Player type not matching composition ID

**Solutions:**
1. Check `transformPlayerData()` logic
2. Verify composition ID extraction
3. Check composition ID matches `TOP5_COMPOSITIONS` constants
4. Verify data transformation is applied correctly

### Issue: Score Display Incorrect

**Error:** Wrong score format displayed

**Solutions:**
1. Check `getScoreValues()` function
2. Verify type guards (`isBatter()`, `isBowler()`)
3. Check player data has required fields
4. Verify score display components receive correct values

### Issue: Row Heights Don't Fit

**Error:** Rows overflow or don't fill available space

**Solutions:**
1. Check `calculateRowDimensions()` calculation
2. Verify `VERTICAL_GAP`, `PADDING`, `TITLE_HEIGHT` constants
3. Check `HEIGHT_DIVISOR` is appropriate
4. Verify player count matches data length

### Issue: Title Not Showing

**Error:** Title not displaying correctly

**Solutions:**
1. Check composition ID extraction
2. Verify title helper function matches composition ID
3. Check title is passed to display component
4. Verify title generation logic for variant

### Issue: Animations Not Working

**Error:** Animations not staggered or not animating

**Solutions:**
1. Check delay calculation (`calculatePlayerDelay()`)
2. Verify animation delay offsets are correct
3. Check animation context is available
4. Verify `AnimatedContainer` is used correctly

---

## Quick Reference

### File Checklist

- [ ] `_types/types.ts` - Data type definitions
- [ ] `_utils/dataHelpers.ts` - Data validation and extraction
- [ ] `_utils/titleHelpers.ts` - Title generation helpers
- [ ] `utils/dataTransformer.ts` - Data transformation logic
- [ ] `layout/_utils/scoreHelpers.ts` - Score display helpers
- [ ] `layout/_utils/helpers.ts` - Text truncation helpers
- [ ] `layout/_utils/constants.ts` - Layout constants
- [ ] `layout/StandardPlayerRow.tsx` - Standard layout component
- [ ] `controller/PlayerRow/_utils/calculations.ts` - Animation calculations
- [ ] `controller/PlayerRow/_utils/constants.ts` - Animation constants
- [ ] `controller/PlayerRow/_utils/helpers.ts` - Helper functions
- [ ] `controller/PlayerRow/row-{Variant}.tsx` - Player row component
- [ ] `controller/PlayersDisplay/_utils/calculations.ts` - Row dimension calculations
- [ ] `controller/PlayersDisplay/_utils/constants.ts` - Display constants
- [ ] `controller/PlayersDisplay/display-{Variant}.tsx` - Display component
- [ ] `modules/NoPlayersData/no-data.tsx` - Empty state component
- [ ] `{variant}.tsx` - Variant entry point
- [ ] `index.tsx` - Composition exports
- [ ] Updated `src/compositions/cricket/index.tsx` - Sport module export

### Key Functions

```typescript
// Data validation
hasValidPlayersData(playersData): boolean
castToPlayerDataArray(playersData): PlayerData[]
extractCompositionId(videoMeta): string
extractPrimarySponsors(videoMeta): Sponsor[]

// Data transformation
transformPlayerData(rawData, compositionId): PlayerData[]
getTitle(compositionId): string

// Title generation
getStandardTitle(compositionId): string
getCNSWTitle(videoMeta): string
getCNSWPrivateTitle(playersData): string

// Score display
getScoreValues(player): ScoreValues

// Row calculations
calculateRowDimensions(totalHeight, playerCount): { rowHeight: number }
calculatePlayerDelay(index): number
calculateExitFrame(timings): number

// Type guards
isBatter(player): player is BatterData
isBowler(player): player is BowlerData
```

### Composition IDs

- **CricketTop5Batting**: Batting top 5
- **CricketTop5Bowling**: Bowling top 5
- **CricketBattingPerformances**: Batting performances
- **CricketBowlingPerformances**: Bowling performances

### Animation Constants

- **STAGGER_DELAY_MULTIPLIER**: 5 frames
- **PLAYER_NAME_DELAY_OFFSET**: 2 frames
- **TEAM_NAME_DELAY_OFFSET**: 4 frames
- **MAIN_SCORE_DELAY_OFFSET**: 6 frames
- **SCORE_SUFFIX_DELAY_OFFSET**: 7 frames
- **EXIT_ANIMATION_OFFSET**: 30 frames

### Row Calculation Constants

- **VERTICAL_GAP**: 8 (rem)
- **PADDING**: 8 (rem)
- **TITLE_HEIGHT**: 48 (rem)
- **HEIGHT_DIVISOR**: 1.3

---

## Summary

Creating a top 5 composition involves:

1. **Defining types** for player data (union type for batter/bowler)
2. **Creating utilities** for data validation, transformation, and title generation
3. **Building layout components** that display player information
4. **Building player row components** that wrap layouts with animations
5. **Building display components** that create single-column grids
6. **Implementing score display system** for type-specific score formatting
7. **Creating variants** with different styling and layouts

### Key Implementation Details

**Player Row Structure:**
- Logo section (fixed width)
- Content section (flex-grow)
  - Left: Player name and team name (stacked)
  - Right: Score value and suffix

**Score Display Logic:**
- Batting: Runs (with * for not-out) + balls in suffix
- Bowling: Wickets/runs + overs in suffix

**Data Transformation:**
- Adds `type` field based on composition ID
- Preserves all other player data

**Title Generation:**
- Standard: Based on composition ID
- CNSW: Based on grouping category
- CNSW Private: Based on grade name

The Basic variant serves as a reference implementation showing all these patterns working together.

---

**Last Updated:** 2026-02-08

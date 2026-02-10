# How to Create a New Composition Asset Type: Performances

This guide explains how to create a new **performances composition asset type** (like `CricketBattingPerformances`, `CricketBowlingPerformances`) from scratch. This composition type handles player performance displays with screen pagination and transitions.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Screen Pagination System](#screen-pagination-system)
6. [Data Transformation](#data-transformation)
7. [Creating Variant Implementations](#creating-variant-implementations)
8. [Primitive Components](#primitive-components)
9. [Layout Components](#layout-components)
10. [Animation Patterns](#animation-patterns)
11. [Hooking Up to Routing](#hooking-up-to-routing)
12. [Common Patterns](#common-patterns)
13. [Testing](#testing)
14. [Troubleshooting](#troubleshooting)
15. [Quick Reference](#quick-reference)

---

## Overview

### What is a Performances Composition?

A **performances composition** is a sport-specific content type that displays:
- **Player performance data** (batting or bowling statistics)
- **Multiple screens** when items exceed the per-screen limit (default: 5)
- **Transitions between screens** using `TransitionSeriesWrapper`
- **Merged sponsor data** from all performances

### Key Differences from Ladder Composition

| Aspect | Performances | Ladder |
|--------|-------------|--------|
| **Data Type** | `PerformanceData[]` (batting or bowling) | `LadderData[]` |
| **Pagination** | Screen-based (items per screen) | Item-based (one ladder per screen) |
| **Composition Types** | Two types (batting, bowling) | Single type |
| **Row Height** | Static (115px) | Calculated dynamically |
| **Sponsors** | Merged from all performances | Per ladder |
| **Primitives** | Top5PlayerName, Top5PlayerScore | LadderTeamName, LadderTeamPoints |
| **Stats Display** | Performance-specific (runs/balls or wickets/overs) | Standard ladder stats |

### Example: Cricket Performances Composition

The `CricketPerformances` composition:
- **Data Type**: `PerformanceData[]` - array of batting or bowling performances
- **Structure**: Each performance has player name, team logo, stats (runs/balls or wickets/overs)
- **Variants**: `basic`, `classic`, `brickwork`, `sixersThunder`, etc.
- **Components**: Display components, player rows, layout components, sponsor footer
- **Pagination**: Splits items across multiple screens (default: 5 per screen)

---

## Architecture

### Folder Structure

```
src/compositions/cricket/performances/
├── .docs/
│   └── how-to.md                    # This guide
├── _types/
│   └── types.ts                     # TypeScript interfaces (batting/bowling)
├── _utils/
│   └── calculations.ts              # Screen calculations, validation, sponsor merging
├── controller/
│   ├── PerformancesDisplay/
│   │   ├── _types/
│   │   │   └── PerformancesDisplayProps.ts
│   │   ├── display-Basic.tsx        # Display component for Basic variant
│   │   ├── display-Classic.tsx      # Display component for Classic variant
│   │   └── ...
│   └── PlayerRow/
│       ├── _types/
│       │   └── PerformanceRowProps.ts
│       ├── _utils/
│       │   └── calculations.ts      # Animation utilities
│       ├── row-Basic.tsx            # Row component for Basic variant
│       └── ...
├── layout/
│   ├── _types/
│   │   └── PerformanceRowLayoutProps.ts
│   ├── _utils/
│   │   └── helpers.ts               # Text formatting, score calculations
│   ├── StandardPerformanceRow.tsx   # Layout component for Basic variant
│   ├── StandardPerformanceRowClassic.tsx
│   └── ...
├── modules/
│   └── NoPlayersData/
│       └── no-data.tsx              # Empty state component
├── utils/
│   ├── dataTransformer.ts           # Data transformation logic
│   └── screenCalculator.ts          # Screen pagination utilities
├── basic.tsx                        # Basic variant entry point
├── classic.tsx                      # Classic variant entry point
├── brickWork.tsx                    # Brickwork variant entry point
├── index.tsx                        # Exports all variants
└── readMe.md                        # Folder documentation
```

### Key Concepts

1. **Variant Entry Points** (`basic.tsx`, `classic.tsx`, etc.):
   - Main component that handles data fetching, transformation, screen calculation
   - Creates sequences for each screen
   - Uses `TransitionSeriesWrapper` for screen transitions
   - Merges sponsor data from all performances

2. **Display Components** (`controller/PerformancesDisplay/display-*.tsx`):
   - Variant-specific rendering logic for a single screen
   - Receives all performances, items per screen, and screen index
   - Filters items for current screen using `getItemsForScreen()`
   - Composes player rows

3. **Player Row Components** (`controller/PlayerRow/row-*.tsx`):
   - Variant-specific row wrapper with animations
   - Receives a single performance
   - Wraps layout component with `AnimatedContainer`

4. **Layout Components** (`layout/StandardPerformanceRow*.tsx`):
   - Variant-specific structural components
   - Handle positioning, spacing, and visual styling
   - Use primitive components for text/logo display

5. **Types** (`_types/types.ts`):
   - Union type: `PerformanceData = BattingPerformanceData | BowlingPerformanceData`
   - Type guards: `isBattingPerformance()`, `isBowlingPerformance()`
   - Composition constants: `PERFORMANCES_COMPOSITIONS`

6. **Utils** (`_utils/`, `utils/`):
   - Screen calculations: `calculateTotalScreens()`, `getItemsForScreen()`
   - Data transformation: `transformPerformanceData()`
   - Sponsor merging: `mergeAssignSponsors()`
   - Text formatting: `formatPlayerName()`, `truncateText()`
   - Score calculations: `getScoreValues()`

---

## Prerequisites

Before creating a new performances composition, ensure you have:

1. ✅ **Template variants created** (if you need custom styling)
   - See `src/templates/.docs/how-to.md` for creating template variants
   - At minimum, you need `Basic` variant

2. ✅ **Understanding of performance data structure**
   - Batting: runs, balls, strike rate, not out
   - Bowling: wickets, overs, runs conceded
   - Common fields: name, teamLogo, playedFor, assignSponsors

3. ✅ **Access to test data**
   - Sample batting or bowling performance data
   - Multiple items to test pagination (more than 5)

4. ✅ **Understanding of screen pagination**
   - Items per screen configuration
   - Screen index calculation
   - Transition between screens

---

## Step-by-Step Guide

### Step 1: Define Data Types

Create `_types/types.ts` in your composition folder.

**Example:** `src/compositions/cricket/performances/_types/types.ts`

```typescript
// Types for cricket performances data structure
// Independent from top5 to allow for future changes

// Team logo information
export interface TeamLogo {
  url: string;
  width: number;
  height: number;
}

// Grade information
export interface Grade {
  id: number;
  name: string;
}

// Competition information
export interface Competition {
  id: number;
  name: string;
}

// Assign sponsors structure (matches JSON format)
export interface AssignSponsors {
  Team: {
    name: string;
  };
  grade: Grade;
  competition: Competition;
}

// Base performance data that's common to both batting and bowling
export interface BasePerformanceData {
  name: string;
  teamLogo: TeamLogo;
  playedFor: string;
  assignSponsors: AssignSponsors;
  prompt: string;
}

// Batting specific performance data
export interface BattingPerformanceData extends BasePerformanceData {
  type: "batting";
  runs: number;
  balls: number;
  SR: number; // Strike rate
  notOut: boolean;
}

// Bowling specific performance data
export interface BowlingPerformanceData extends BasePerformanceData {
  type: "bowling";
  wickets: number;
  overs: string; // e.g., "3.5", "5", "9"
  runs: number; // Runs conceded
}

// Union type to represent either a batting or bowling performance
export type PerformanceData = BattingPerformanceData | BowlingPerformanceData;

// Helper function to determine if performance is batting
export const isBattingPerformance = (
  performance: PerformanceData,
): performance is BattingPerformanceData => {
  return performance.type === "batting";
};

// Helper function to determine if performance is bowling
export const isBowlingPerformance = (
  performance: PerformanceData,
): performance is BowlingPerformanceData => {
  return performance.type === "bowling";
};

// Animation constants
export const HEADER_ANIMATION_DURATION = 45;
export const PERFORMANCE_STAGGER_DELAY = 15;
export const PERFORMANCE_ANIMATION_DURATION = 30;

// Composition types
export const PERFORMANCES_COMPOSITIONS = {
  BATTING: "CricketBattingPerformances",
  BOWLING: "CricketBowlingPerformances",
} as const;

// Screen configuration types
export interface ScreenConfig {
  itemsPerScreen: number; // Default: 5
  screenIndex: number; // Current screen index (0-based)
  totalScreens: number; // Total number of screens needed
}
```

**Key Points:**
- **Union type**: `PerformanceData` can be either batting or bowling
- **Type guards**: Use `isBattingPerformance()` and `isBowlingPerformance()` for type narrowing
- **Composition constants**: Define composition IDs for routing
- **Base interface**: Common fields shared by both types

---

### Step 2: Create Helper Utilities

Create `_utils/calculations.ts` for shared logic.

**Example:** `src/compositions/cricket/performances/_utils/calculations.ts`

```typescript
import { Timings } from "../../../../core/types/data/common";
import { PerformanceData } from "../_types/types";
import { AssignSponsors } from "../../composition-types";
import { DivideFixturesBy } from "../../../../core/types/data/videoData";

/**
 * Default items per screen if not specified in contentLayout
 */
export const DEFAULT_ITEMS_PER_SCREEN = 5;

/**
 * Default display duration in frames if not specified
 */
export const DEFAULT_DISPLAY_DURATION = 300;

/**
 * Get items per screen from contentLayout configuration
 * @param fixturesLayout - The divideFixturesBy configuration object
 * @returns Number of items to display per screen
 */
export const getItemsPerScreen = (
  fixturesLayout: DivideFixturesBy | Record<string, unknown>,
): number => {
  const fixturesConfig = fixturesLayout as DivideFixturesBy;

  if (
    fixturesConfig &&
    typeof fixturesConfig.CricketBattingPerformances === "number" &&
    fixturesConfig.CricketBattingPerformances > 0
  ) {
    return fixturesConfig.CricketBattingPerformances;
  } else if (
    fixturesConfig &&
    typeof fixturesConfig.CricketBowlingPerformances === "number" &&
    fixturesConfig.CricketBowlingPerformances > 0
  ) {
    return fixturesConfig.CricketBowlingPerformances;
  }

  return DEFAULT_ITEMS_PER_SCREEN;
};

/**
 * Calculate display duration per screen based on timings and metadata
 * @param timings - Video data timings object
 * @param frameOptions - Array of frame options from metadata
 * @returns Display duration in frames
 */
export const calculateDisplayDurationPerScreen = (
  timings: Timings | undefined,
  frameOptions: number[],
): number => {
  let displayDurationPerScreen =
    timings?.FPS_PREFORMANCECARD || frameOptions[0] || DEFAULT_DISPLAY_DURATION;

  // Ensure duration is always positive (defensive check)
  if (
    typeof displayDurationPerScreen !== "number" ||
    displayDurationPerScreen <= 0
  ) {
    console.warn(
      "[Performances] Invalid durationInFrames:",
      displayDurationPerScreen,
      "using default",
      DEFAULT_DISPLAY_DURATION,
    );
    displayDurationPerScreen = DEFAULT_DISPLAY_DURATION;
  }

  return displayDurationPerScreen;
};

/**
 * Check if performances data is valid
 * @param performancesData - The performances data to validate
 * @returns True if data is valid, false otherwise
 */
export const hasValidPerformances = (
  performancesData: unknown,
): boolean => {
  return (
    performancesData !== null &&
    performancesData !== undefined &&
    Array.isArray(performancesData) &&
    performancesData.length > 0
  );
};

/**
 * Calculate total number of screens needed based on data length and items per screen
 * @param dataLength - Total number of performance items
 * @param itemsPerScreen - Number of items to display per screen
 * @returns Total number of screens needed
 */
export const calculateTotalScreens = (
  dataLength: number,
  itemsPerScreen: number,
): number => {
  return Math.ceil(dataLength / itemsPerScreen);
};

/**
 * Merge and transform assignSponsors from all performances into a single AssignSponsors object
 * @param performances - Array of performance data objects
 * @returns Merged AssignSponsors object
 */
export const mergeAssignSponsors = (
  performances: PerformanceData[],
): AssignSponsors => {
  return performances.reduce(
    (acc, performance) => {
      const { assignSponsors } = performance;
      if (!assignSponsors) return acc;

      // Collect unique grades and competitions
      const grades = acc.grade || [];
      const competitions = acc.competition || [];
      const teams = acc.team || [];

      // Add grade if it exists and is unique
      if (assignSponsors.grade && assignSponsors.grade.id) {
        const gradeExists = grades.some(
          (g) => g.id === assignSponsors.grade.id,
        );
        if (!gradeExists) {
          grades.push({
            id: assignSponsors.grade.id,
            name: assignSponsors.grade.name,
            logo: { url: "" },
          });
        }
      }

      // Add competition if it exists and is unique
      if (assignSponsors.competition && assignSponsors.competition.id) {
        const compExists = competitions.some(
          (c) => c.id === assignSponsors.competition.id,
        );
        if (!compExists) {
          competitions.push({
            id: assignSponsors.competition.id,
            name: assignSponsors.competition.name,
            logo: { url: "" },
          });
        }
      }

      // Add team if it exists
      if (assignSponsors.Team && assignSponsors.Team.name) {
        const teamExists = teams.some(
          (t) => t.home?.name === assignSponsors.Team.name,
        );
        if (!teamExists) {
          teams.push({
            home: { name: assignSponsors.Team.name },
            away: { name: "" },
            logo: { url: "" },
          });
        }
      }

      return {
        grade: grades,
        competition: competitions,
        team: teams,
      };
    },
    { grade: [], competition: [], team: [] } as AssignSponsors,
  );
};
```

**Key Points:**
- **Screen configuration**: Gets items per screen from `contentLayout.divideFixturesBy`
- **Duration calculation**: Uses `FPS_PREFORMANCECARD` timing or metadata frames
- **Validation**: Checks if data is valid array with items
- **Screen calculation**: Calculates total screens needed
- **Sponsor merging**: Merges unique sponsors from all performances

---

### Step 3: Create Data Transformation Utilities

Create `utils/dataTransformer.ts` for data transformation.

**Example:** `src/compositions/cricket/performances/utils/dataTransformer.ts`

```typescript
import {
  BattingPerformanceData,
  BowlingPerformanceData,
  PerformanceData,
  PERFORMANCES_COMPOSITIONS,
} from "../_types/types";

/**
 * Transform raw performance data based on the composition type
 * @param rawData Raw data from API/JSON
 * @param compositionId The ID of the composition (batting or bowling performances)
 * @returns Properly typed performance data
 */
export const transformPerformanceData = (
  rawData: unknown[],
  compositionId: string,
): PerformanceData[] => {
  if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
    return [];
  }

  return rawData.map((item) => {
    if (compositionId === PERFORMANCES_COMPOSITIONS.BATTING) {
      // Transform batting performance data
      const battingItem = item as Partial<BattingPerformanceData>;
      return {
        ...battingItem,
        type: "batting",
      } as BattingPerformanceData;
    } else {
      // Transform bowling performance data
      const bowlingItem = item as Partial<BowlingPerformanceData>;
      return {
        ...bowlingItem,
        type: "bowling",
      } as BowlingPerformanceData;
    }
  });
};

/**
 * Get the title based on composition type
 * @param compositionId The ID of the composition
 * @returns The appropriate title for the composition
 */
export const getTitle = (compositionId: string): string => {
  if (compositionId === PERFORMANCES_COMPOSITIONS.BATTING) {
    return "Batting Performances";
  } else if (compositionId === PERFORMANCES_COMPOSITIONS.BOWLING) {
    return "Bowling Performances";
  }
  return "Performances";
};
```

**Key Points:**
- **Type transformation**: Adds `type` field based on composition ID
- **Data validation**: Handles empty or invalid data
- **Title generation**: Returns appropriate title for empty state

---

### Step 4: Create Screen Calculator Utilities

Create `utils/screenCalculator.ts` for pagination logic.

**Example:** `src/compositions/cricket/performances/utils/screenCalculator.ts`

```typescript
import { PerformanceData, ScreenCalculationResult } from "../_types/types";

/**
 * Calculate screen configuration for pagination
 * @param items Array of performance items
 * @param itemsPerScreen Number of items to display per screen (default: 5)
 * @returns Screen calculation result with helper functions
 */
export const calculateScreens = (
  items: PerformanceData[],
  itemsPerScreen: number = 5,
): ScreenCalculationResult => {
  if (!items || items.length === 0) {
    return {
      totalScreens: 0,
      itemsPerScreen,
      getItemsForScreen: () => [],
    };
  }

  const totalScreens = Math.ceil(items.length / itemsPerScreen);

  /**
   * Get items for a specific screen
   * @param screenIndex Zero-based screen index
   * @returns Array of items for that screen
   */
  const getItemsForScreen = (screenIndex: number): PerformanceData[] => {
    if (screenIndex < 0 || screenIndex >= totalScreens) {
      return [];
    }

    const startIndex = screenIndex * itemsPerScreen;
    const endIndex = Math.min(startIndex + itemsPerScreen, items.length);

    return items.slice(startIndex, endIndex);
  };

  return {
    totalScreens,
    itemsPerScreen,
    getItemsForScreen,
  };
};

/**
 * Get items for a specific screen (standalone function)
 * @param items Array of performance items
 * @param screenIndex Zero-based screen index
 * @param itemsPerScreen Number of items per screen (default: 5)
 * @returns Array of items for that screen
 */
export const getItemsForScreen = (
  items: PerformanceData[],
  screenIndex: number,
  itemsPerScreen: number = 5,
): PerformanceData[] => {
  if (!items || items.length === 0 || screenIndex < 0) {
    return [];
  }

  const totalScreens = Math.ceil(items.length / itemsPerScreen);
  if (screenIndex >= totalScreens) {
    return [];
  }

  const startIndex = screenIndex * itemsPerScreen;
  const endIndex = Math.min(startIndex + itemsPerScreen, items.length);

  return items.slice(startIndex, endIndex);
};
```

**Key Points:**
- **Screen calculation**: Calculates total screens needed
- **Item slicing**: Gets items for a specific screen index
- **Bounds checking**: Handles invalid screen indices gracefully

---

### Step 5: Create Empty State Component

Create a component to show when there's no data.

**Example:** `src/compositions/cricket/performances/modules/NoPlayersData/no-data.tsx`

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
- **Use `AbsoluteFill`**: Remotion-specific component for full-screen display
- **Dynamic title**: Gets title based on composition type (batting/bowling)
- **Context usage**: Accesses composition ID from video data

---

### Step 6: Create Layout Helper Utilities

Create `layout/_utils/helpers.ts` for text formatting and score calculations.

**Example:** `src/compositions/cricket/performances/layout/_utils/helpers.ts`

```typescript
import {
  PerformanceData,
  isBattingPerformance,
  isBowlingPerformance,
} from "../../_types/types";

/**
 * Truncate text to a maximum length, adding ellipsis if truncated
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
};

/**
 * Format player name as "First Initial. Last Name"
 * Position indicators like (C), (VC), (WK) are kept in the output
 * @param name - The full player name
 * @returns Formatted name (e.g., "J. CUNNINGHAM" or "J. SMITH (C)")
 */
export const formatPlayerName = (name: string): string => {
  if (!name) return "";
  
  const nameParts = name.trim().split(" ").filter(part => part.length > 0);
  
  if (nameParts.length < 2) {
    return name.toUpperCase();
  }
  
  // Check if the last part is a position indicator
  const lastPart = nameParts[nameParts.length - 1];
  const isPosition = /^\((C|VC|WK)\)$/i.test(lastPart);
  
  const minRequiredParts = isPosition ? 3 : 2;
  
  if (nameParts.length < minRequiredParts) {
    return name.toUpperCase();
  }
  
  const lastNameIndex = isPosition ? nameParts.length - 2 : nameParts.length - 1;
  
  if (lastNameIndex <= 0) {
    return name.toUpperCase();
  }
  
  const firstName = nameParts[0];
  const lastName = nameParts[lastNameIndex];
  
  if (!lastName || lastName === firstName) {
    return name.toUpperCase();
  }
  
  const formattedName = `${firstName.charAt(0).toUpperCase()}. ${lastName.toUpperCase()}`;
  
  return isPosition ? `${formattedName} ${lastPart.toUpperCase()}` : formattedName;
};

/**
 * Get score display values based on performance type (batting or bowling)
 * @param performance - The performance data object
 * @returns Object with mainValue and suffix for score display
 */
export const getScoreValues = (
  performance: PerformanceData,
): { mainValue: string; suffix: string } => {
  if (isBattingPerformance(performance)) {
    // Main value is runs (with * for not out), suffix is balls faced
    const mainValue = performance.notOut
      ? `${performance.runs}*`
      : `${performance.runs}`;
    const suffix = performance.balls > 0 ? `(${performance.balls})` : "";
    return { mainValue, suffix };
  } else if (isBowlingPerformance(performance)) {
    // Main value is wickets-runs, suffix is overs
    const mainValue = `${performance.wickets}/${performance.runs}`;
    const suffix = `(${performance.overs})`;
    return { mainValue, suffix };
  }

  // Fallback
  return { mainValue: "--", suffix: "" };
};
```

**Key Points:**
- **Name formatting**: Converts "John Smith" to "J. SMITH"
- **Position handling**: Preserves (C), (VC), (WK) indicators
- **Score formatting**: Different format for batting vs bowling
- **Type guards**: Uses `isBattingPerformance()` and `isBowlingPerformance()`

---

### Step 7: Create Layout Component

Create the layout component for displaying a performance row.

**Example:** `src/compositions/cricket/performances/layout/StandardPerformanceRow.tsx`

```typescript
import React from "react";
import { TeamLogo as PerformanceTeamLogoType } from "../_types/types";
import { TeamLogo } from "../../utils/primitives/TeamLogo";
import { useAnimationContext } from "../../../../core/context/AnimationContext";
import { Top5PlayerName } from "../../utils/primitives/Top5PlayerName";
import { Top5PlayerTeam } from "../../utils/primitives/Top5PlayerTeam";
import { Top5PlayerScore } from "../../utils/primitives/Top5PlayerScore";
import { Top5PlayerScoreSuffix } from "../../utils/primitives/Top5PlayerScoreSuffix";
import { useThemeContext } from "../../../../core/context/ThemeContext";
import { PerformanceRowLayoutPropsWithRestrictions } from "./_types/PerformanceRowLayoutProps";
import { truncateText, getScoreValues, formatPlayerName } from "./_utils/helpers";

export const StandardPerformanceRow: React.FC<
  PerformanceRowLayoutPropsWithRestrictions
> = ({ performance, index, rowHeight, delay, restrictions }) => {
  const { animations } = useAnimationContext();
  const { selectedPalette } = useThemeContext();

  const largeTextAnimation = animations.text.main.copyIn;
  const smallTextAnimation = animations.text.main.copyIn;

  const logoSize = 40;

  // Determine background color (top performance highlighted)
  const isTopPerformance = index === 0;
  const bgColor = isTopPerformance
    ? selectedPalette.container.backgroundTransparent.high
    : selectedPalette.container.backgroundTransparent.medium;

  // Format player name as "First Initial. Last Name"
  const playerName = formatPlayerName(performance.name);
  const teamName = truncateText(
    performance.playedFor,
    restrictions.teamLength,
  ).toUpperCase();

  // Get score display values
  const { mainValue, suffix } = getScoreValues(performance);

  return (
    <div
      className="flex items-stretch h-full w-full overflow-hidden rounded-lg"
      style={{ height: `${rowHeight}px`, width: "100%" }}
    >
      {/* Logo Section (Fixed Width) */}
      <div className="w-30 bg-white flex items-center justify-center p-0 shrink-0">
        <TeamLogo
          logo={performance.teamLogo as PerformanceTeamLogoType}
          teamName={performance.playedFor}
          delay={delay}
          size={logoSize}
        />
      </div>

      {/* Content Section (Variable Width) */}
      <div
        className="flex-grow flex items-center justify-between gap-8 px-2"
        style={{ background: bgColor }}
      >
        {/* Left Side: Name & Team */}
        <div className="flex flex-col justify-start">
          <Top5PlayerName
            value={playerName}
            animation={{ ...largeTextAnimation, delay: delay + 2 }}
          />
          <Top5PlayerTeam
            value={teamName}
            animation={{ ...smallTextAnimation, delay: delay + 4 }}
          />
        </div>

        {/* Right Side: Score */}
        <div className="flex items-center justify-end whitespace-nowrap leading-none ml-auto">
          <Top5PlayerScore
            value={mainValue}
            animation={{ ...largeTextAnimation, delay: delay + 6 }}
          />
          {suffix && (
            <Top5PlayerScoreSuffix
              value={suffix}
              animation={{ ...smallTextAnimation, delay: delay + 7 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StandardPerformanceRow;
```

**Key Points:**
- **Fixed logo section**: Logo on left, fixed width
- **Variable content section**: Name, team, and score on right
- **Top performance highlighting**: First item uses different background color
- **Primitive components**: Uses Top5PlayerName, Top5PlayerScore, etc.
- **Staggered animations**: Different delays for each element

---

### Step 8: Create Player Row Component

Create the row wrapper component with animations.

**Example:** `src/compositions/cricket/performances/controller/PlayerRow/row-Basic.tsx`

```typescript
import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import StandardPerformanceRow from "../../layout/StandardPerformanceRow";
import { PerformanceRowProps } from "./_types/PerformanceRowProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
} from "./_utils/calculations";

const PerformanceRowBasic: React.FC<PerformanceRowProps> = ({
  performance,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data } = useVideoDataContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateAnimationDelay(index, 5);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  return (
    <div className="overflow-hidden w-full flex-shrink-0" style={{ width: "100%" }}>
      <AnimatedContainer
        type="full"
        className="rounded-lg flex-shrink-0"
        style={{ width: "100%" }}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <StandardPerformanceRow
          performance={performance}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
          restrictions={{ nameLength: 30, teamLength: 35 }}
        />
      </AnimatedContainer>
    </div>
  );
};

export default PerformanceRowBasic;
```

**Key Points:**
- **Animation wrapper**: Wraps layout component with `AnimatedContainer`
- **Staggered delays**: Each row animates with increasing delay
- **Exit animation**: Starts before composition ends
- **Restrictions**: Passes text length limits to layout

---

### Step 9: Create Display Component

Create the display component for a single screen.

**Example:** `src/compositions/cricket/performances/controller/PerformancesDisplay/display-Basic.tsx`

```typescript
import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import PerformanceRowBasic from "../PlayerRow/row-Basic";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { PerformancesDisplayProps } from "./_types/PerformancesDisplayProps";

const PerformancesDisplayBasic: React.FC<PerformancesDisplayProps> = ({
  performances,
  itemsPerScreen,
  screenIndex,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  // Get items for this specific screen
  const displayedPerformances = getItemsForScreen(
    performances,
    screenIndex,
    itemsPerScreen,
  );

  // Static row height for basic template
  const rowHeight = 115;

  return (
    <div 
      className="flex items-center justify-center"
      style={{ 
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}>
      <div 
        className="flex flex-col flex-shrink-0"
        style={{ width: "100%", paddingLeft: "2rem", paddingRight: "2rem" }}
      >
        <AnimatedContainer
          type="full"
          className="flex flex-col"
          style={{ width: "100%" }}
          backgroundColor="none"
          animation={ContainerAnimations.main.parent.containerIn}
          animationDelay={0}
          exitAnimation={ContainerAnimations.main.parent.containerOut}
        >
          <div className="flex flex-col items-center gap-1 w-full">
            {displayedPerformances.map((performance, index) => (
              <div
                key={`${performance.name}-${screenIndex}-${index}`}
                className="w-full flex-shrink-0"
              >
                <PerformanceRowBasic
                  performance={performance}
                  index={index}
                  rowHeight={rowHeight}
                />
              </div>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default PerformancesDisplayBasic;
```

**Key Points:**
- **Screen filtering**: Uses `getItemsForScreen()` to get items for current screen
- **Static row height**: Uses fixed 115px height
- **Absolute positioning**: Fills parent container
- **Unique keys**: Includes screenIndex in key for proper React reconciliation

---

### Step 10: Create Variant Entry Point

Create the main component file for your first variant (e.g., `basic.tsx`).

**Example:** `src/compositions/cricket/performances/basic.tsx`

```typescript
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import PerformancesDisplayBasic from "./controller/PerformancesDisplay/display-Basic";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { transformPerformanceData } from "./utils/dataTransformer";
import { SponsorFooter } from "../sponsorFooter/index";
import { AssignSponsors } from "../composition-types";
import { useThemeContext } from "../../../core/context/ThemeContext";
import {
  getItemsPerScreen,
  calculateDisplayDurationPerScreen,
  hasValidPerformances,
  calculateTotalScreens,
  mergeAssignSponsors,
} from "./_utils/calculations";

export const PerformancesList: React.FC = () => {
  const { data, contentLayout, metadata } = useVideoDataContext();
  const { data: performancesData, timings } = data;
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();
  const { heights } = layout;
  const transitionConfig = animations.transition.Main;

  // Extract metadata from video data
  const fixturesLayout = contentLayout.divideFixturesBy || {};

  // Get items per screen from contentLayout
  const itemsPerScreen = getItemsPerScreen(fixturesLayout);

  // Get frame duration from metadata if available
  const frameOptions = metadata.frames || [300];
  const displayDurationPerScreen = calculateDisplayDurationPerScreen(
    timings,
    frameOptions,
  );

  // If no data is available, show a placeholder
  if (!hasValidPerformances(performancesData)) {
    return <NoPlayersData />;
  }

  const compositionId = data.videoMeta?.video?.metadata?.compositionId || "";

  // Transform data based on composition type
  const transformedData = transformPerformanceData(
    performancesData as unknown[],
    compositionId,
  );

  // Calculate how many screens we need based on items per screen
  const totalScreens = calculateTotalScreens(
    transformedData.length,
    itemsPerScreen,
  );

  // Ensure we have at least one screen
  if (totalScreens <= 0) {
    return <NoPlayersData />;
  }

  // Final validation - ensure duration is still valid before creating sequences
  const finalDuration = Math.max(1, Math.floor(displayDurationPerScreen));

  // Create sequence data for each screen
  const sequences = Array.from({ length: totalScreens }, (_, index) => ({
    content: (
      <PerformancesDisplayBasic
        performances={transformedData}
        itemsPerScreen={itemsPerScreen}
        screenIndex={index}
      />
    ),
    durationInFrames: finalDuration,
  }));

  // Merge and transform assignSponsors from all performances
  const mergedAssignSponsors = mergeAssignSponsors(transformedData);

  const contentHeight = heights.asset;

  return (
    <div className="flex flex-col w-full" style={{ height: `${heights.asset + heights.footer}px` }}>
      <div
        style={{ height: `${contentHeight}px`, overflow: "hidden", position: "relative" }}>
        <TransitionSeriesWrapper
          sequences={sequences}
          transitionType={transitionConfig.type as TransitionType}
          direction={transitionConfig.direction as TransitionDirection}
          timing={{
            type: "linear",
            durationInFrames: transitionConfig.durationInFrames,
          }}
        />
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter
          assignSponsors={mergedAssignSponsors as unknown as AssignSponsors}
        />
      </div>
    </div>
  );
};

// Export as Basic for compatibility with routing
export const Basic: React.FC = () => {
  return <PerformancesList />;
};

export default Basic;
```

**Key Points:**
- **Data transformation**: Transforms raw data based on composition type
- **Screen calculation**: Calculates total screens needed
- **Sequence creation**: Creates one sequence per screen
- **Sponsor merging**: Merges sponsors from all performances
- **Height management**: Accounts for footer height

---

### Step 11: Export from Composition Index

Create or update `index.tsx` to export your variant.

**Example:** `src/compositions/cricket/performances/index.tsx`

```typescript
// Import variant components
import { Basic as BasicPerformances } from "./basic";
// Import other variants as you create them
// import { Classic as ClassicPerformances } from "./classic";
// import { BrickWork as BrickWorkPerformances } from "./brickWork";

// Export all template implementations
export { BasicPerformances as basic };
// Add more as you create them:
// export { ClassicPerformances as classic };
// export { BrickWorkPerformances as brickWork };
```

---

### Step 12: Add to Sport Module Export

Add your composition to the sport's main index file.

**Example:** `src/compositions/cricket/index.tsx`

```typescript
// Import performances variants
import {
  basic as performancesBasic,
  // Add more variants as you create them
} from "./performances";

// ... other composition imports

// Export implementations for all composition types
export const CricketPerformances = {
  basic: performancesBasic,
  // Add more variants as you create them:
  // classic: performancesClassic,
  // brickwork: performancesBrickWork,
};
```

**Note:** The routing system uses `CricketBattingPerformances` and `CricketBowlingPerformances` as composition IDs, but both map to the same `CricketPerformances` export. The composition determines which type based on `compositionId` in the data.

---

## Screen Pagination System

### How Pagination Works

1. **Items Per Screen Configuration**:
   - Read from `contentLayout.divideFixturesBy.CricketBattingPerformances` or `CricketBowlingPerformances`
   - Default: 5 items per screen
   - Configurable per composition type

2. **Screen Calculation**:
   ```typescript
   const totalScreens = Math.ceil(totalItems / itemsPerScreen);
   ```

3. **Item Filtering**:
   ```typescript
   const startIndex = screenIndex * itemsPerScreen;
   const endIndex = Math.min(startIndex + itemsPerScreen, items.length);
   const itemsForScreen = items.slice(startIndex, endIndex);
   ```

4. **Sequence Creation**:
   - One sequence per screen
   - Each sequence has its own `durationInFrames`
   - Transitions between sequences

### Example: 12 Items, 5 Per Screen

- **Screen 0**: Items 0-4 (5 items)
- **Screen 1**: Items 5-9 (5 items)
- **Screen 2**: Items 10-11 (2 items)
- **Total Screens**: 3

---

## Data Transformation

### Composition Type Detection

The composition determines its type from `compositionId`:

```typescript
const compositionId = data.videoMeta?.video?.metadata?.compositionId;
// "CricketBattingPerformances" or "CricketBowlingPerformances"
```

### Type Transformation

Raw data is transformed to add the `type` field:

```typescript
if (compositionId === PERFORMANCES_COMPOSITIONS.BATTING) {
  return { ...item, type: "batting" } as BattingPerformanceData;
} else {
  return { ...item, type: "bowling" } as BowlingPerformanceData;
}
```

### Type Guards

Use type guards to narrow types:

```typescript
if (isBattingPerformance(performance)) {
  // TypeScript knows performance is BattingPerformanceData
  console.log(performance.runs, performance.balls);
} else if (isBowlingPerformance(performance)) {
  // TypeScript knows performance is BowlingPerformanceData
  console.log(performance.wickets, performance.overs);
}
```

---

## Creating Variant Implementations

Once you have the Basic variant working, create additional variants:

1. **Create Display Component** (`controller/PerformancesDisplay/display-{Variant}.tsx`)
2. **Create Player Row Component** (`controller/PlayerRow/row-{Variant}.tsx`)
3. **Create Layout Component** (`layout/StandardPerformanceRow{Variant}.tsx`)
4. **Create Variant Entry Point** (`{variant}.tsx`)
5. **Export from Index** (`index.tsx`)
6. **Export from Sport Module** (`src/compositions/cricket/index.tsx`)

---

## Primitive Components

### Shared Primitive Components

**Location:** `src/compositions/cricket/utils/primitives/`

#### Top5PlayerName

Displays formatted player names:

```typescript
import { Top5PlayerName } from "../../utils/primitives/Top5PlayerName";

<Top5PlayerName
  value="J. SMITH"
  animation={textAnimation}
  className=""
/>
```

#### Top5PlayerTeam

Displays team names:

```typescript
import { Top5PlayerTeam } from "../../utils/primitives/Top5PlayerTeam";

<Top5PlayerTeam
  value="TEAM NAME"
  animation={textAnimation}
  className=""
/>
```

#### Top5PlayerScore

Displays main score value:

```typescript
import { Top5PlayerScore } from "../../utils/primitives/Top5PlayerScore";

<Top5PlayerScore
  value="150*" // or "5/30" for bowling
  animation={textAnimation}
  className=""
/>
```

#### Top5PlayerScoreSuffix

Displays score suffix (balls or overs):

```typescript
import { Top5PlayerScoreSuffix } from "../../utils/primitives/Top5PlayerScoreSuffix";

<Top5PlayerScoreSuffix
  value="(120)" // or "(5.0)" for bowling
  animation={textAnimation}
  className=""
/>
```

#### TeamLogo

Displays team logos:

```typescript
import { TeamLogo } from "../../utils/primitives/TeamLogo";

<TeamLogo
  logo={performance.teamLogo}
  teamName={performance.playedFor}
  delay={delay}
  size={40}
/>
```

---

## Layout Components

### StandardPerformanceRow

**Location:** `layout/StandardPerformanceRow.tsx`

- Logo on left (fixed width)
- Name and team on left side of content
- Score on right side of content
- Top performance highlighted

### Variant-Specific Layouts

Each variant can have its own layout:
- `StandardPerformanceRowClassic.tsx`
- `StandardPerformanceRowBrickWork.tsx`
- `StandardPerformanceRowSixersThunder.tsx`
- etc.

---

## Animation Patterns

### Staggered Animation Delay

Rows animate in sequence:

```typescript
const delay = calculateAnimationDelay(index, 5);
// delay = index * 5 (in frames)
```

### Exit Frame Calculation

Exit animations start before composition ends:

```typescript
const animationOutFrame = calculateAnimationOutFrame(timings);
// Returns: (timings?.FPS_PREFORMANCECARD || 180) - 30
```

### Element Staggering

Within each row, elements animate with increasing delays:

```typescript
// Logo: delay
// Name: delay + 2
// Team: delay + 4
// Score: delay + 6
// Suffix: delay + 7
```

---

## Hooking Up to Routing

### Composition IDs

The routing system recognizes:
- `CricketBattingPerformances`
- `CricketBowlingPerformances`

Both map to the `CricketPerformances` export, and the composition determines the type from `compositionId`.

### Routing Configuration

**Check:** `src/core/utils/routing.tsx`

```typescript
const SPORT_COMPOSITION_TYPES: SportCompositionTypes = {
  cricket: {
    CricketBattingPerformances: "CricketPerformances",
    CricketBowlingPerformances: "CricketPerformances",
    // ... other composition types
  },
};
```

---

## Common Patterns

### Pattern 1: Screen-Based Rendering

```typescript
const displayedPerformances = getItemsForScreen(
  performances,
  screenIndex,
  itemsPerScreen,
);

return (
  <div>
    {displayedPerformances.map((performance, index) => (
      <PerformanceRow key={...} performance={performance} index={index} />
    ))}
  </div>
);
```

### Pattern 2: Type-Specific Rendering

```typescript
const { mainValue, suffix } = getScoreValues(performance);

if (isBattingPerformance(performance)) {
  // Batting-specific logic
} else if (isBowlingPerformance(performance)) {
  // Bowling-specific logic
}
```

### Pattern 3: Sponsor Merging

```typescript
const mergedSponsors = mergeAssignSponsors(performances);

<SponsorFooter assignSponsors={mergedSponsors} />
```

---

## Testing

### Test Data Structure

```typescript
const testBattingData: BattingPerformanceData[] = [
  {
    type: "batting",
    name: "John Smith",
    teamLogo: { url: "...", width: 100, height: 100 },
    playedFor: "Team A",
    runs: 150,
    balls: 120,
    SR: 125.0,
    notOut: true,
    assignSponsors: { /* ... */ },
    prompt: "",
  },
];

const testBowlingData: BowlingPerformanceData[] = [
  {
    type: "bowling",
    name: "Jane Doe",
    teamLogo: { url: "...", width: 100, height: 100 },
    playedFor: "Team B",
    wickets: 5,
    overs: "5.0",
    runs: 30,
    assignSponsors: { /* ... */ },
    prompt: "",
  },
];
```

### Test Pagination

Test with different numbers of items:
- 3 items (1 screen)
- 5 items (1 screen, exact)
- 7 items (2 screens)
- 12 items (3 screens)

---

## Troubleshooting

### Issue: Wrong Performance Type

**Error:** Type errors when accessing performance properties

**Solutions:**
1. Use type guards: `isBattingPerformance()` or `isBowlingPerformance()`
2. Check `compositionId` matches `PERFORMANCES_COMPOSITIONS` constants
3. Verify data transformation adds `type` field

### Issue: Pagination Not Working

**Error:** All items on one screen or wrong items per screen

**Solutions:**
1. Check `contentLayout.divideFixturesBy` configuration
2. Verify `getItemsPerScreen()` returns correct value
3. Check `calculateTotalScreens()` calculation
4. Verify `getItemsForScreen()` slicing logic

### Issue: Sponsor Footer Missing

**Error:** No sponsors displayed or wrong sponsors

**Solutions:**
1. Check `mergeAssignSponsors()` logic
2. Verify `assignSponsors` exists in performance data
3. Check sponsor data structure matches `AssignSponsors` type

---

## Quick Reference

### File Checklist

- [ ] `_types/types.ts` - Data type definitions
- [ ] `_utils/calculations.ts` - Screen calculations, validation, sponsor merging
- [ ] `utils/dataTransformer.ts` - Data transformation logic
- [ ] `utils/screenCalculator.ts` - Screen pagination utilities
- [ ] `layout/_utils/helpers.ts` - Text formatting, score calculations
- [ ] `layout/StandardPerformanceRow.tsx` - Layout component
- [ ] `controller/PlayerRow/_utils/calculations.ts` - Animation utilities
- [ ] `controller/PlayerRow/row-Basic.tsx` - Row component
- [ ] `controller/PerformancesDisplay/display-Basic.tsx` - Display component
- [ ] `modules/NoPlayersData/no-data.tsx` - Empty state component
- [ ] `basic.tsx` - Variant entry point
- [ ] `index.tsx` - Composition exports
- [ ] Updated `src/compositions/cricket/index.tsx` - Sport module export

### Key Functions

```typescript
// Screen calculations
getItemsPerScreen(fixturesLayout): number
calculateTotalScreens(dataLength, itemsPerScreen): number
getItemsForScreen(items, screenIndex, itemsPerScreen): PerformanceData[]

// Data transformation
transformPerformanceData(rawData, compositionId): PerformanceData[]
getTitle(compositionId): string

// Sponsor merging
mergeAssignSponsors(performances): AssignSponsors

// Text formatting
formatPlayerName(name): string
truncateText(text, maxLength): string
getScoreValues(performance): { mainValue: string; suffix: string }

// Animation
calculateAnimationDelay(index, multiplier): number
calculateAnimationOutFrame(timings): number
```

---

**Last Updated:** 2026-02-08

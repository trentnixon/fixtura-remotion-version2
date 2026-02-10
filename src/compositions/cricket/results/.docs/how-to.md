# How to Create a New Composition Asset Type: Results

This guide explains how to create a new **results composition asset type** (like `CricketResults`) from scratch. This composition type handles match result displays with screen pagination and transitions.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Screen Pagination System](#screen-pagination-system)
6. [Match Card Structure](#match-card-structure)
7. [Section Components](#section-components)
8. [Club-Only Variants](#club-only-variants)
9. [Creating Variant Implementations](#creating-variant-implementations)
10. [Layout Components](#layout-components)
11. [Animation Patterns](#animation-patterns)
12. [Hooking Up to Routing](#hooking-up-to-routing)
13. [Common Patterns](#common-patterns)
14. [Testing](#testing)
15. [Troubleshooting](#troubleshooting)
16. [Quick Reference](#quick-reference)

---

## Overview

### What is a Results Composition?

A **results composition** is a sport-specific content type that displays:
- **Match result data** (teams, scores, player performances)
- **Multiple screens** when results exceed the per-screen limit (default: 2)
- **Transitions between screens** using `TransitionSeriesWrapper`
- **Merged sponsor data** from all displayed results

### Key Differences from Other Compositions

| Aspect | Results | Ladder | Performances |
|--------|---------|--------|--------------|
| **Data Type** | `MatchResult[]` | `LadderData[]` | `PerformanceData[]` |
| **Items Per Screen** | 2 (fixed) | 1 per screen | 5 (configurable) |
| **Row Height** | Calculated (height / 2) | Calculated dynamically | Static (115px) |
| **Structure** | Complex nested (teams → performances) | Simple (teams array) | Simple (performance array) |
| **Sections** | Multiple (teams, stats, header, status) | Single (table) | Single (rows) |
| **Club Variants** | Yes (club-only cards) | No | No |

### Example: Cricket Results Composition

The `CricketResults` composition:
- **Data Type**: `MatchResult[]` - array of match results
- **Structure**: Each result has teams with logos, scores, batting/bowling performances
- **Variants**: `basic`, `classic`, `brickwork`, `sixersThunder`, etc.
- **Components**: Display components, match cards, section components, sponsor footer
- **Pagination**: Splits results across multiple screens (default: 2 per screen)

---

## Architecture

### Folder Structure

```
src/compositions/cricket/results/
├── .docs/
│   └── how-to.md                    # This guide
├── _types/
│   └── types.tsx                    # TypeScript interfaces (MatchResult, Team, etc.)
├── _utils/
│   └── calculations.ts              # Screen calculations, validation
├── controller/
│   ├── ResultsDisplay/
│   │   ├── _types/
│   │   │   └── ResultsDisplayProps.ts
│   │   ├── _utils/
│   │   │   └── calculations.ts     # Display calculations (row height, sponsor merging)
│   │   ├── display-Basic.tsx       # Display component for Basic variant
│   │   ├── display-Classic.tsx      # Display component for Classic variant
│   │   └── ...
│   └── MatchRow/
│       ├── _types/
│       │   └── MatchRowProps.ts
│       ├── _utils/
│       │   └── calculations.ts      # Animation utilities
│       ├── row-Basic.tsx           # Row component for Basic variant
│       └── ...
├── layout/
│   ├── MatchCard/
│   │   ├── _types/
│   │   │   └── MatchCardProps.ts
│   │   ├── _utils/
│   │   │   └── calculations.ts     # Section height calculations
│   │   ├── card-Basic.tsx          # Match card for Basic variant
│   │   ├── card-Basic-clubOnly.tsx # Club-only variant
│   │   └── ...
│   └── Sections/
│       ├── MatchHeader/
│       │   ├── MatchHeader.tsx     # Match info header
│       │   └── ...
│       ├── TeamsSection/
│       │   ├── ScoreOverNameWithLogo.tsx
│       │   └── ... (multiple variants)
│       ├── PlayerStats/
│       │   ├── PlayerStats-Basic.tsx
│       │   └── ... (multiple variants)
│       ├── MatchStatus/
│       │   └── MatchStatus.tsx     # Abandoned match status
│       └── ResultStatement/
│           └── ...                 # Result text statements
├── modules/
│   └── NoResultsData/
│       └── no-data.tsx             # Empty state component
├── basic.tsx                       # Basic variant entry point
├── classic.tsx                     # Classic variant entry point
├── brickWork.tsx                   # Brickwork variant entry point
├── index.tsx                       # Exports all variants
└── readMe.md                       # Folder documentation
```

### Key Concepts

1. **Variant Entry Points** (`basic.tsx`, `classic.tsx`, etc.):
   - Main component that handles data fetching, validation, screen calculation
   - Creates sequences for each screen
   - Uses `TransitionSeriesWrapper` for screen transitions

2. **Display Components** (`controller/ResultsDisplay/display-*.tsx`):
   - Variant-specific rendering logic for a single screen
   - Receives all results, results per screen, and screen index
   - Filters results for current screen
   - Calculates row heights (half of available height)
   - Merges sponsor data

3. **Match Row Components** (`controller/MatchRow/row-*.tsx`):
   - Variant-specific row wrapper with animations
   - Receives a single match result
   - Checks `isAccountClub` to determine card variant
   - Wraps match card with `AnimatedContainer`

4. **Match Card Components** (`layout/MatchCard/card-*.tsx`):
   - Variant-specific card layout
   - Composes section components (teams, stats, header, status)
   - Calculates section heights (40% teams, 50% stats, 10% header)
   - Handles staggered animations

5. **Section Components** (`layout/Sections/`):
   - **TeamsSection**: Team logos, names, scores (multiple layout variants)
   - **PlayerStats**: Batting/bowling performances (variant-specific)
   - **MatchHeader**: Match info (type, round, ground)
   - **MatchStatus**: Abandoned match status
   - **ResultStatement**: Result text statements

6. **Types** (`_types/types.tsx`):
   - `MatchResult`: Complete match data
   - `Team`: Team with logo, score, performances
   - `BattingPerformance`: Player batting stats
   - `BowlingPerformance`: Player bowling stats

7. **Utils** (`_utils/`, `controller/*/_utils/`, `layout/*/_utils/`):
   - Screen calculations: `calculateTotalScreens()`, `calculateDisplayedResults()`
   - Row height: `calculateRowHeight()` (height / 2)
   - Section heights: `calculateSectionHeights()` (40/50/10 split)
   - Sponsor merging: `mergeAssignSponsors()`
   - Animation delays: `calculateDelay()`, `calculateDelays()`

---

## Prerequisites

Before creating a new results composition, ensure you have:

1. ✅ **Template variants created** (if you need custom styling)
   - See `src/templates/.docs/how-to.md` for creating template variants
   - At minimum, you need `Basic` variant

2. ✅ **Understanding of match result data structure**
   - Teams with logos, names, scores
   - Batting performances (runs, balls, strike rate)
   - Bowling performances (wickets, overs, runs)
   - Match metadata (date, type, round, ground, status)

3. ✅ **Access to test data**
   - Sample match result data
   - Multiple matches to test pagination (more than 2)

4. ✅ **Understanding of screen pagination**
   - Results per screen configuration (default: 2)
   - Screen index calculation
   - Transition between screens

---

## Step-by-Step Guide

### Step 1: Define Data Types

Create `_types/types.tsx` in your composition folder.

**Example:** `src/compositions/cricket/results/_types/types.tsx`

```typescript
import { AssignSponsors } from "../../composition-types";

// Types for cricket match results
export interface TeamLogo {
  url: string;
  width: number;
  height: number;
}

export interface BattingPerformance {
  SR: number;
  runs: number;
  team: string;
  balls: number;
  fours: number;
  sixes: number;
  notOut: boolean;
  player: string;
}

export interface BowlingPerformance {
  runs: number;
  team: string;
  overs: number;
  player: string;
  economy: string;
  maidens: number;
  wickets: number;
}

export interface Team {
  logo: TeamLogo;
  name: string;
  overs: string | null;
  score: string;
  isHome: boolean;
  isClubTeam: boolean;
  battingPerformances: BattingPerformance[];
  bowlingPerformances: BowlingPerformance[];
  homeScoresFirstInnings?: string | null;
  awayScoresFirstInnings?: string | null;
}

export interface ResultSummary {
  homeTeam: string;
  awayTeam: string;
  winner: string;
  resultWord: string;
}

export interface MatchResult {
  date: string;
  type: string;
  round: string;
  gameID: string;
  gender: string;
  ground: string;
  prompt: string;
  result: string;
  resultShort: string;
  resultSummary: ResultSummary;
  status: string;
  ageGroup: string;
  awayTeam: Team;
  homeTeam: Team;
  gradeName: string;
  teamAwayLogo: TeamLogo;
  teamHomeLogo: TeamLogo;
  assignSponsors: AssignSponsors;
}

// Constants for animation timing and other configuration
export const RESULT_HEADER_ANIMATION_DURATION = 45;
export const RESULT_STAGGER_DELAY = 15;
export const RESULT_ANIMATION_DURATION = 30;
```

**Key Points:**
- **Nested structure**: Teams contain arrays of performances
- **Club team flag**: `isClubTeam` determines club-only variants
- **First innings**: Optional first innings scores for two-day matches
- **Result summary**: Pre-formatted result text

---

### Step 2: Create Helper Utilities

Create `_utils/calculations.ts` for shared logic.

**Example:** `src/compositions/cricket/results/_utils/calculations.ts`

```typescript
import { MatchResult } from "../_types/types";

/**
 * Default number of results to display per screen
 */
export const DEFAULT_RESULTS_PER_SCREEN = 2;

/**
 * Default frame duration if not specified
 */
export const DEFAULT_DISPLAY_DURATION = 300;

/**
 * Calculates the display duration per screen based on timings or video metadata
 * @param timings - Timing configuration object
 * @param frameOptions - Array of frame options from video metadata
 * @returns Display duration in frames
 */
export const calculateDisplayDurationPerScreen = (
  timings?: { FPS_SCORECARD?: number },
  frameOptions?: number[],
): number => {
  return (
    timings?.FPS_SCORECARD || frameOptions?.[0] || DEFAULT_DISPLAY_DURATION
  );
};

/**
 * Calculates the total number of screens needed based on results count and results per screen
 * @param resultsCount - Total number of results
 * @param resultsPerScreen - Number of results to show per screen
 * @returns Total number of screens needed
 */
export const calculateTotalScreens = (
  resultsCount: number,
  resultsPerScreen: number = DEFAULT_RESULTS_PER_SCREEN,
): number => {
  return Math.ceil(resultsCount / resultsPerScreen);
};

/**
 * Validates and casts results data to MatchResult array
 * @param resultsData - Raw results data from context
 * @returns Typed MatchResult array
 */
export const castToMatchResults = (resultsData: unknown): MatchResult[] => {
  return (resultsData as unknown as MatchResult[]) || [];
};

/**
 * Checks if results data is valid and non-empty
 * @param resultsData - Results data to validate
 * @returns True if data is valid and has results
 */
export const hasValidResults = (resultsData: unknown): boolean => {
  return (
    resultsData !== null &&
    resultsData !== undefined &&
    Array.isArray(resultsData) &&
    resultsData.length > 0
  );
};
```

**Key Points:**
- **Fixed results per screen**: Default is 2 (not configurable like performances)
- **Duration calculation**: Uses `FPS_SCORECARD` timing
- **Validation**: Checks if data is valid array with items
- **Type casting**: Safely casts unknown data to MatchResult[]

---

### Step 3: Create Display Calculation Utilities

Create `controller/ResultsDisplay/_utils/calculations.ts` for display-specific calculations.

**Example:** `src/compositions/cricket/results/controller/ResultsDisplay/_utils/calculations.ts`

```typescript
import { MatchResult } from "../../../_types/types";
import { AssignSponsors } from "../../../../composition-types";

/**
 * Calculates which results to display on the current screen
 * @param results - All available results
 * @param resultsPerScreen - Number of results to show per screen
 * @param screenIndex - Current screen index
 * @returns Object containing startIndex, endIndex, and displayedResults array
 */
export const calculateDisplayedResults = (
  results: MatchResult[],
  resultsPerScreen: number,
  screenIndex: number,
): {
  startIndex: number;
  endIndex: number;
  displayedResults: MatchResult[];
} => {
  const startIndex = screenIndex * resultsPerScreen;
  const endIndex = Math.min(startIndex + resultsPerScreen, results.length);
  const displayedResults = results.slice(startIndex, endIndex);

  return {
    startIndex,
    endIndex,
    displayedResults,
  };
};

/**
 * Calculates row height based on available height
 * Divides available height by 2 to get height for each row
 * @param availableHeight - Total available height
 * @returns Row height in pixels
 */
export const calculateRowHeight = (availableHeight: number): number => {
  return Math.floor(availableHeight / 2);
};

/**
 * Merges all assignSponsors objects from displayed results into one object
 * @param displayedResults - Array of match results to merge sponsors from
 * @returns Merged AssignSponsors object
 */
export const mergeAssignSponsors = (
  displayedResults: MatchResult[],
): AssignSponsors => {
  return displayedResults.reduce(
    (acc, result) => ({ ...acc, ...result.assignSponsors }),
    {},
  ) as AssignSponsors;
};
```

**Key Points:**
- **Row height**: Each row gets half of available height (for 2 results per screen)
- **Result filtering**: Gets results for current screen index
- **Sponsor merging**: Simple object spread (unlike performances which deduplicates)

---

### Step 4: Create Empty State Component

Create a component to show when there's no data.

**Example:** `src/compositions/cricket/results/modules/NoResultsData/no-data.tsx`

```typescript
import React from "react";
import { AbsoluteFill } from "remotion";

const NoResultsData: React.FC = () => {
  return (
    <AbsoluteFill className="flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">No Results Data Available</h2>
        <p className="text-gray-400">
          Please check your data source and try again.
        </p>
      </div>
    </AbsoluteFill>
  );
};

export default NoResultsData;
```

**Key Points:**
- **Use `AbsoluteFill`**: Remotion-specific component for full-screen display
- **Simple message**: No dynamic title needed (unlike performances)

---

### Step 5: Create Match Row Animation Utilities

Create `controller/MatchRow/_utils/calculations.ts` for animation utilities.

**Example:** `src/compositions/cricket/results/controller/MatchRow/_utils/calculations.ts`

```typescript
/**
 * Calculates animation delay based on row index
 * @param index - The index of the row
 * @returns Base delay value for animation
 */
export const calculateDelay = (index: number): number => {
  return index * 5; // Base delay for animation
};

/**
 * Calculates the animation out frame based on timing configuration
 * @param fpsScorecard - FPS_SCORECARD timing value (optional)
 * @returns Animation out frame number
 */
export const calculateAnimationOutFrame = (fpsScorecard?: number): number => {
  return fpsScorecard ? fpsScorecard - 20 : 280;
};
```

**Key Points:**
- **Simple delay**: Index * 5 frames
- **Exit frame**: Starts 20 frames before composition ends

---

### Step 6: Create Match Card Section Height Utilities

Create `layout/MatchCard/_utils/calculations.ts` for section height calculations.

**Example:** `src/compositions/cricket/results/layout/MatchCard/_utils/calculations.ts`

```typescript
import {
  MatchResult,
  BattingPerformance,
  BowlingPerformance,
} from "../../../_types/types";

/**
 * Calculates section heights based on row height
 * @param rowHeight - Total height of the row
 * @returns Object containing teamsHeight, statsHeight, and headerHeight
 */
export const calculateSectionHeights = (rowHeight: number) => {
  const teamsHeight = Math.floor(rowHeight * 0.4); // 40% for team scores
  const statsHeight = Math.floor(rowHeight * 0.5); // 50% for player stats
  const headerHeight = Math.floor(rowHeight * 0.1); // 10% for match info

  return {
    teamsHeight,
    statsHeight,
    headerHeight,
  };
};

/**
 * Calculates animation delays based on base delay
 * @param delay - Base delay value
 * @returns Object containing baseDelay, statsDelay, and headerDelay
 */
export const calculateDelays = (delay: number) => {
  const baseDelay = delay;
  const statsDelay = baseDelay + 4;
  const headerDelay = statsDelay + 5;

  return {
    baseDelay,
    statsDelay,
    headerDelay,
  };
};

/**
 * Determines which team is the club team and returns only their players
 * @param match - MatchResult object containing homeTeam and awayTeam
 * @returns Object containing the club team's batting and bowling performances, or null if no club team found
 */
export const getClubTeamPlayers = (
  match: MatchResult,
): {
  battingPerformances: BattingPerformance[];
  bowlingPerformances: BowlingPerformance[];
} | null => {
  const clubTeam = match.homeTeam.isClubTeam
    ? match.homeTeam
    : match.awayTeam.isClubTeam
      ? match.awayTeam
      : null;

  if (!clubTeam) {
    return null;
  }

  return {
    battingPerformances: clubTeam.battingPerformances,
    bowlingPerformances: clubTeam.bowlingPerformances,
  };
};
```

**Key Points:**
- **Section height split**: 40% teams, 50% stats, 10% header
- **Staggered delays**: Teams animate first, then stats, then header
- **Club team detection**: Finds club team by `isClubTeam` flag

---

### Step 7: Create Match Row Component

Create the row wrapper component with animations.

**Example:** `src/compositions/cricket/results/controller/MatchRow/row-Basic.tsx`

```typescript
import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import MatchCardBasic from "../../layout/MatchCard/card-Basic";
import MatchCardBasicClubOnly from "../../layout/MatchCard/card-Basic-clubOnly";
import { MatchRowProps } from "./_types/MatchRowProps";
import { calculateDelay, calculateAnimationOutFrame } from "./_utils/calculations";

const MatchRowBasic: React.FC<MatchRowProps> = ({
  match,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const { data, isAccountClub } = useVideoDataContext();
  const { timings } = data;

  const containerAnimation = animations.container.main.itemContainer;
  const delay = calculateDelay(index);
  const animationOutFrame = calculateAnimationOutFrame(timings?.FPS_SCORECARD);

  return (
    <div className="h-full w-full">
      <AnimatedContainer
        type="full"
        className="rounded-md h-full w-full"
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        {isAccountClub ? (
          <MatchCardBasicClubOnly
            match={match}
            index={index}
            rowHeight={rowHeight}
            delay={delay}
          />
        ) : (
          <MatchCardBasic
            match={match}
            index={index}
            rowHeight={rowHeight}
            delay={delay}
          />
        )}
      </AnimatedContainer>
    </div>
  );
};

export default MatchRowBasic;
```

**Key Points:**
- **Club check**: Uses `isAccountClub` from context to determine card variant
- **Animation wrapper**: Wraps card with `AnimatedContainer`
- **Conditional rendering**: Renders club-only or standard card

---

### Step 8: Create Match Card Component

Create the match card component that composes sections.

**Example:** `src/compositions/cricket/results/layout/MatchCard/card-Basic.tsx`

```typescript
import React from "react";
import MatchHeader from "../Sections/MatchHeader/MatchHeader";
import { ScoreOverNameWithLogo } from "../Sections/TeamsSection/index";
import PlayerStatsBasic from "../Sections/PlayerStats/PlayerStats-Basic";
import MatchStatus from "../Sections/MatchStatus/MatchStatus";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateSectionHeights, calculateDelays } from "./_utils/calculations";

const MatchCardBasic: React.FC<MatchCardProps> = ({
  match,
  rowHeight,
  delay,
}) => {
  const { selectedPalette } = useThemeContext();

  // Calculate section heights
  const { teamsHeight, statsHeight, headerHeight } = calculateSectionHeights(rowHeight);

  // Calculate delays
  const { baseDelay, statsDelay, headerDelay } = calculateDelays(delay);

  return (
    <div className="rounded-lg w-auto mx-8 overflow-hidden h-full">
      {/* Section 1: Team scores and names */}
      <ScoreOverNameWithLogo
        type={match.type}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        homeTeamLogo={match.teamHomeLogo}
        awayTeamLogo={match.teamAwayLogo}
        delay={baseDelay}
        outerContainer={{
          height: teamsHeight,
        }}
      />

      {/* Section 2: Match status (if abandoned) */}
      {match.status === "Abandoned" && (
        <MatchStatus
          status={`${match.status}`}
          result={match.result}
          delay={headerDelay}
          outerContainer={{
            background: selectedPalette.container.backgroundTransparent.high,
            height: headerHeight,
          }}
        />
      )}

      {/* Section 3: Player statistics */}
      <PlayerStatsBasic
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={2}
        matchType={match.type}
        matchStatus={match.status}
      />

      {/* Section 4: Match info footer */}
      <MatchHeader
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={headerHeight}
        delay={headerDelay}
        backgroundColor="transparent"
        CopyVariant="onContainerCopyNoBg"
      />
    </div>
  );
};

export default MatchCardBasic;
```

**Key Points:**
- **Section composition**: Teams → Status (conditional) → Stats → Header
- **Height distribution**: Uses calculated section heights
- **Staggered animations**: Each section animates with increasing delay
- **Conditional status**: Only shows MatchStatus if match is abandoned

---

### Step 9: Create Display Component

Create the display component for a single screen.

**Example:** `src/compositions/cricket/results/controller/ResultsDisplay/display-Basic.tsx`

```typescript
import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import MatchRowBasic from "../MatchRow/row-Basic";
import { ResultsDisplayProps } from "./_types/ResultsDisplayProps";
import {
  calculateDisplayedResults,
  calculateRowHeight,
  mergeAssignSponsors,
} from "./_utils/calculations";

const ResultsDisplayBasic: React.FC<ResultsDisplayProps> = ({
  results,
  resultsPerScreen,
  screenIndex,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;

  // Calculate which results to show on this screen
  const { displayedResults } = calculateDisplayedResults(
    results,
    resultsPerScreen,
    screenIndex,
  );
  const availableHeight = heights.asset;

  // Calculate exactly half of the available height for each row
  const rowHeight = calculateRowHeight(availableHeight);

  // Merge all assignSponsors objects from displayedResults into one object
  const mergedAssignSponsors = mergeAssignSponsors(displayedResults);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Results container */}
      <div
        className="w-full flex flex-col justify-between"
        style={{ height: `${availableHeight}px` }}
      >
        {displayedResults.map((match, index) => (
          <div
            key={match.gameID}
            className="w-full"
            style={{
              height: `${rowHeight}px`,
              marginBottom: index === 0 ? "10px" : 0,
            }}
          >
            <MatchRowBasic match={match} index={index} rowHeight={rowHeight} />
          </div>
        ))}
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={mergedAssignSponsors} />
      </div>
    </div>
  );
};

export default ResultsDisplayBasic;
```

**Key Points:**
- **Result filtering**: Gets results for current screen index
- **Row height calculation**: Each row gets half of available height
- **Spacing**: First row has bottom margin for visual separation
- **Sponsor merging**: Merges sponsors from displayed results

---

### Step 10: Create Variant Entry Point

Create the main component file for your first variant (e.g., `basic.tsx`).

**Example:** `src/compositions/cricket/results/basic.tsx`

```typescript
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoResultsData from "./modules/NoResultsData/no-data";
import ResultsDisplayBasic from "./controller/ResultsDisplay/display-Basic";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import {
  DEFAULT_RESULTS_PER_SCREEN,
  calculateDisplayDurationPerScreen,
  calculateTotalScreens,
  castToMatchResults,
  hasValidResults,
} from "./_utils/calculations";

export const ResultsList: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: resultsData, videoMeta, timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  // If no data is available, show a placeholder
  if (!hasValidResults(resultsData)) {
    return <NoResultsData />;
  }

  // Set to 2 results per screen (fixed)
  const resultsPerScreen = DEFAULT_RESULTS_PER_SCREEN;

  // Get frame duration from timings or use default
  const frameOptions = videoMeta?.video?.metadata?.frames || [300];
  const displayDurationPerScreen = calculateDisplayDurationPerScreen(
    timings,
    frameOptions,
  );

  // Calculate how many screens we need based on results per screen
  const totalScreens = calculateTotalScreens(
    resultsData.length,
    resultsPerScreen,
  );

  // Cast the data to the correct type
  const matchResults = castToMatchResults(resultsData);

  // Create sequence data for each screen
  const sequences = Array.from({ length: totalScreens }, (_, index) => ({
    content: (
      <ResultsDisplayBasic
        results={matchResults}
        resultsPerScreen={resultsPerScreen}
        screenIndex={index}
      />
    ),
    durationInFrames: displayDurationPerScreen,
  }));

  return (
    <TransitionSeriesWrapper
      sequences={sequences}
      transitionType={transitionConfig.type as TransitionType}
      direction={transitionConfig.direction as TransitionDirection}
      timing={{
        type: "linear",
        durationInFrames: transitionConfig.durationInFrames,
      }}
    />
  );
};

// Export as Basic for compatibility with routing
export const Basic: React.FC = () => {
  return <ResultsList />;
};

export default Basic;
```

**Key Points:**
- **Fixed results per screen**: Always 2 (not configurable)
- **Screen calculation**: Calculates total screens needed
- **Sequence creation**: Creates one sequence per screen
- **No sponsor merging here**: Done in Display component

---

### Step 11: Export from Composition Index

Create or update `index.tsx` to export your variant.

**Example:** `src/compositions/cricket/results/index.tsx`

```typescript
// Import variant components
import { Basic as BasicResults } from "./basic";
// Import other variants as you create them
// import { Classic as ClassicResults } from "./classic";
// import { BrickWork as BrickWorkResults } from "./brickWork";

// Export all template implementations
export { BasicResults as basic };
// Add more as you create them:
// export { ClassicResults as classic };
// export { BrickWorkResults as brickWork };
```

---

### Step 12: Add to Sport Module Export

Add your composition to the sport's main index file.

**Example:** `src/compositions/cricket/index.tsx`

```typescript
// Import results variants
import {
  basic as resultsBasic,
  // Add more variants as you create them
} from "./results";

// ... other composition imports

// Export implementations for all composition types
export const CricketResults = {
  basic: resultsBasic,
  // Add more variants as you create them:
  // classic: resultsClassic,
  // brickwork: resultsBrickWork,
};
```

---

## Screen Pagination System

### How Pagination Works

1. **Results Per Screen**:
   - Fixed at 2 results per screen (`DEFAULT_RESULTS_PER_SCREEN = 2`)
   - Not configurable (unlike performances)

2. **Screen Calculation**:
   ```typescript
   const totalScreens = Math.ceil(totalResults / 2);
   ```

3. **Result Filtering**:
   ```typescript
   const startIndex = screenIndex * 2;
   const endIndex = Math.min(startIndex + 2, results.length);
   const displayedResults = results.slice(startIndex, endIndex);
   ```

4. **Row Height**:
   ```typescript
   const rowHeight = Math.floor(availableHeight / 2);
   ```
   - Each result gets exactly half of available height

### Example: 5 Results, 2 Per Screen

- **Screen 0**: Results 0-1 (2 results)
- **Screen 1**: Results 2-3 (2 results)
- **Screen 2**: Result 4 (1 result)
- **Total Screens**: 3

---

## Match Card Structure

### Section Layout

The match card is divided into sections:

1. **Teams Section** (40% of row height)
   - Team logos
   - Team names
   - Scores
   - First innings scores (if applicable)

2. **Match Status** (10% of row height, conditional)
   - Only shown if `match.status === "Abandoned"`

3. **Player Stats Section** (50% of row height)
   - Batting performances (top performers)
   - Bowling performances (top performers)
   - Max players per stat (default: 2)

4. **Match Header** (10% of row height)
   - Match type
   - Round
   - Ground name

### Height Calculation

```typescript
const teamsHeight = Math.floor(rowHeight * 0.4);  // 40%
const statsHeight = Math.floor(rowHeight * 0.5);  // 50%
const headerHeight = Math.floor(rowHeight * 0.1);  // 10%
```

---

## Section Components

### TeamsSection Variants

**Location:** `layout/Sections/TeamsSection/`

Multiple layout variants available:
- `ScoreOverNameWithLogo` - Score above name with logo
- `LogoWithScoreOverName` - Logo with score above name
- `TeamsSectionLogoAbove` - Logo above team name
- `TeamsSectionLogoBelow` - Logo below team name
- `TeamsSectionVertical` - Vertical layout
- `Horizontal_SingleTeam_LogoWithName_Score` - Single team horizontal
- etc.

**Usage:**

```typescript
import { ScoreOverNameWithLogo } from "../Sections/TeamsSection/index";

<ScoreOverNameWithLogo
  type={match.type}
  homeTeam={match.homeTeam}
  awayTeam={match.awayTeam}
  homeTeamLogo={match.teamHomeLogo}
  awayTeamLogo={match.teamAwayLogo}
  delay={baseDelay}
  outerContainer={{ height: teamsHeight }}
/>
```

### PlayerStats Variants

**Location:** `layout/Sections/PlayerStats/`

Variant-specific components:
- `PlayerStats-Basic.tsx`
- `PlayerStats-BrickWork.tsx`
- `PlayerStats-CNSW.tsx`
- `PlayerStats-clubOnly-Basic.tsx` (club-only variant)
- etc.

**Usage:**

```typescript
import PlayerStatsBasic from "../Sections/PlayerStats/PlayerStats-Basic";

<PlayerStatsBasic
  homeTeam={match.homeTeam}
  awayTeam={match.awayTeam}
  height={statsHeight}
  delay={statsDelay}
  maxPlayersPerStat={2}
  matchType={match.type}
  matchStatus={match.status}
/>
```

### MatchHeader

**Location:** `layout/Sections/MatchHeader/MatchHeader.tsx`

Displays match metadata:

```typescript
import MatchHeader from "../Sections/MatchHeader/MatchHeader";

<MatchHeader
  type={match.type}
  round={match.round}
  ground={match.ground}
  height={headerHeight}
  delay={headerDelay}
  backgroundColor="transparent"
  CopyVariant="onContainerCopyNoBg"
/>
```

### MatchStatus

**Location:** `layout/Sections/MatchStatus/MatchStatus.tsx`

Shows abandoned match status:

```typescript
import MatchStatus from "../Sections/MatchStatus/MatchStatus";

{match.status === "Abandoned" && (
  <MatchStatus
    status={`${match.status}`}
    result={match.result}
    delay={headerDelay}
    outerContainer={{
      background: selectedPalette.container.backgroundTransparent.high,
      height: headerHeight,
    }}
  />
)}
```

---

## Club-Only Variants

### Concept

Club-only variants show only the club team's players, hiding the opponent's players.

### Implementation

1. **Check `isAccountClub`**:
   ```typescript
   const { isAccountClub } = useVideoDataContext();
   ```

2. **Conditional Card Rendering**:
   ```typescript
   {isAccountClub ? (
     <MatchCardBasicClubOnly match={match} ... />
   ) : (
     <MatchCardBasic match={match} ... />
   )}
   ```

3. **Club-Only Card**:
   - Uses `getClubTeamPlayers()` to get only club team's performances
   - Hides opponent's player stats
   - May use different TeamsSection variant

### File Naming

Club-only cards use `-clubOnly` suffix:
- `card-Basic.tsx` → `card-Basic-clubOnly.tsx`
- `card-BrickWork.tsx` → `card-BrickWork-clubOnly.tsx`

---

## Creating Variant Implementations

Once you have the Basic variant working, create additional variants:

1. **Create Display Component** (`controller/ResultsDisplay/display-{Variant}.tsx`)
2. **Create Match Row Component** (`controller/MatchRow/row-{Variant}.tsx`)
3. **Create Match Card Component** (`layout/MatchCard/card-{Variant}.tsx`)
4. **Create Club-Only Card** (`layout/MatchCard/card-{Variant}-clubOnly.tsx`) - optional
5. **Create Variant-Specific Sections** (if needed)
6. **Create Variant Entry Point** (`{variant}.tsx`)
7. **Export from Index** (`index.tsx`)
8. **Export from Sport Module** (`src/compositions/cricket/index.tsx`)

---

## Layout Components

### MatchCard Structure

Each match card variant:
- Composes section components
- Calculates section heights
- Handles staggered animations
- May have club-only variant

### Section Height Distribution

- **Teams**: 40% of row height
- **Stats**: 50% of row height
- **Header**: 10% of row height

### Animation Delays

- **Teams**: `baseDelay` (from row index)
- **Stats**: `baseDelay + 4`
- **Header**: `baseDelay + 9` (statsDelay + 5)

---

## Animation Patterns

### Row Animation Delay

Rows animate in sequence:

```typescript
const delay = calculateDelay(index);
// delay = index * 5 (in frames)
```

### Exit Frame Calculation

Exit animations start before composition ends:

```typescript
const animationOutFrame = calculateAnimationOutFrame(timings?.FPS_SCORECARD);
// Returns: fpsScorecard ? fpsScorecard - 20 : 280
```

### Section Staggering

Within each card, sections animate with increasing delays:

```typescript
// Teams: baseDelay
// Stats: baseDelay + 4
// Header: baseDelay + 9
```

---

## Hooking Up to Routing

### Composition ID

The routing system recognizes:
- `CricketResults`

### Routing Configuration

**Check:** `src/core/utils/routing.tsx`

```typescript
const SPORT_COMPOSITION_TYPES: SportCompositionTypes = {
  cricket: {
    CricketResults: "CricketResults",
    // ... other composition types
  },
};
```

---

## Common Patterns

### Pattern 1: Screen-Based Rendering

```typescript
const { displayedResults } = calculateDisplayedResults(
  results,
  resultsPerScreen,
  screenIndex,
);

return (
  <div>
    {displayedResults.map((match, index) => (
      <MatchRow key={match.gameID} match={match} index={index} rowHeight={rowHeight} />
    ))}
  </div>
);
```

### Pattern 2: Club-Only Conditional

```typescript
const { isAccountClub } = useVideoDataContext();

{isAccountClub ? (
  <MatchCardClubOnly match={match} ... />
) : (
  <MatchCard match={match} ... />
)}
```

### Pattern 3: Conditional Status Display

```typescript
{match.status === "Abandoned" && (
  <MatchStatus status={match.status} result={match.result} ... />
)}
```

### Pattern 4: Sponsor Merging

```typescript
const mergedSponsors = mergeAssignSponsors(displayedResults);

<SponsorFooter assignSponsors={mergedSponsors} />
```

---

## Testing

### Test Data Structure

```typescript
const testMatchResult: MatchResult = {
  date: "2024-01-15",
  type: "T20",
  round: "Round 1",
  gameID: "12345",
  gender: "Men",
  ground: "Ground Name",
  prompt: "",
  result: "Team A won by 5 wickets",
  resultShort: "Team A won",
  resultSummary: {
    homeTeam: "Team A",
    awayTeam: "Team B",
    winner: "Team A",
    resultWord: "won",
  },
  status: "Completed",
  ageGroup: "Senior",
  homeTeam: {
    logo: { url: "...", width: 100, height: 100 },
    name: "Team A",
    overs: "20.0",
    score: "150/5",
    isHome: true,
    isClubTeam: true,
    battingPerformances: [/* ... */],
    bowlingPerformances: [/* ... */],
  },
  awayTeam: {
    logo: { url: "...", width: 100, height: 100 },
    name: "Team B",
    overs: "19.5",
    score: "145/8",
    isHome: false,
    isClubTeam: false,
    battingPerformances: [/* ... */],
    bowlingPerformances: [/* ... */],
  },
  gradeName: "Grade A",
  teamHomeLogo: { url: "...", width: 100, height: 100 },
  teamAwayLogo: { url: "...", width: 100, height: 100 },
  assignSponsors: { /* ... */ },
};
```

### Test Pagination

Test with different numbers of results:
- 1 result (1 screen)
- 2 results (1 screen, exact)
- 3 results (2 screens)
- 5 results (3 screens)

### Test Club-Only Variant

Test with `isAccountClub` set to `true`:
- Should render club-only card
- Should show only club team's players
- Should hide opponent's players

---

## Troubleshooting

### Issue: Wrong Row Heights

**Error:** Rows don't fit or overlap

**Solutions:**
1. Check `calculateRowHeight()` returns `Math.floor(availableHeight / 2)`
2. Verify `availableHeight` is `heights.asset` (not including footer)
3. Check section heights sum correctly (40% + 50% + 10% = 100%)

### Issue: Club-Only Not Working

**Error:** Club-only card not rendering

**Solutions:**
1. Check `isAccountClub` is set correctly in context
2. Verify `isClubTeam` flag exists in team data
3. Check club-only card component exists
4. Verify conditional rendering logic

### Issue: Section Heights Wrong

**Error:** Sections don't fit or overflow

**Solutions:**
1. Check `calculateSectionHeights()` uses correct percentages
2. Verify `rowHeight` is passed correctly
3. Check section components use `height` prop correctly

### Issue: Sponsor Footer Missing

**Error:** No sponsors displayed

**Solutions:**
1. Check `mergeAssignSponsors()` logic
2. Verify `assignSponsors` exists in match data
3. Check sponsor data structure matches `AssignSponsors` type

---

## Quick Reference

### File Checklist

- [ ] `_types/types.tsx` - Data type definitions
- [ ] `_utils/calculations.ts` - Screen calculations, validation
- [ ] `controller/ResultsDisplay/_utils/calculations.ts` - Display calculations
- [ ] `controller/MatchRow/_utils/calculations.ts` - Animation utilities
- [ ] `layout/MatchCard/_utils/calculations.ts` - Section height calculations
- [ ] `layout/MatchCard/card-Basic.tsx` - Match card component
- [ ] `layout/MatchCard/card-Basic-clubOnly.tsx` - Club-only card (optional)
- [ ] `controller/MatchRow/row-Basic.tsx` - Match row component
- [ ] `controller/ResultsDisplay/display-Basic.tsx` - Display component
- [ ] `modules/NoResultsData/no-data.tsx` - Empty state component
- [ ] `basic.tsx` - Variant entry point
- [ ] `index.tsx` - Composition exports
- [ ] Updated `src/compositions/cricket/index.tsx` - Sport module export

### Key Functions

```typescript
// Screen calculations
calculateTotalScreens(resultsCount, resultsPerScreen): number
calculateDisplayedResults(results, resultsPerScreen, screenIndex): DisplayedResults
calculateRowHeight(availableHeight): number

// Section calculations
calculateSectionHeights(rowHeight): { teamsHeight, statsHeight, headerHeight }
calculateDelays(delay): { baseDelay, statsDelay, headerDelay }
getClubTeamPlayers(match): ClubTeamPlayers | null

// Sponsor merging
mergeAssignSponsors(displayedResults): AssignSponsors

// Animation
calculateDelay(index): number
calculateAnimationOutFrame(fpsScorecard): number

// Validation
hasValidResults(resultsData): boolean
castToMatchResults(resultsData): MatchResult[]
```

### Section Height Percentages

- **Teams Section**: 40% of row height
- **Stats Section**: 50% of row height
- **Header Section**: 10% of row height

### Animation Delay Pattern

- **Row delay**: `index * 5`
- **Teams delay**: `baseDelay` (from row)
- **Stats delay**: `baseDelay + 4`
- **Header delay**: `baseDelay + 9`

---

**Last Updated:** 2026-02-08

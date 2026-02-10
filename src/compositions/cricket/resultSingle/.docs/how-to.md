# How to Create a New Result Single Composition Asset Type

This comprehensive guide explains how to create a new **result single composition asset type** (like `CricketResultSingle`) from scratch, including both general architecture understanding and detailed template variant implementation with club-only support.

**Last Updated:** 2026-02-08

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Step-by-Step Guide: Basic Structure](#step-by-step-guide-basic-structure)
5. [Creating Template Variants](#creating-template-variants)
6. [Club-Only Variants](#club-only-variants)
7. [Match-to-Match Transitions](#match-to-match-transitions)
8. [Match Card Structure](#match-card-structure)
9. [Section Components](#section-components)
10. [Result Statement Components](#result-statement-components)
11. [Animation Patterns](#animation-patterns)
12. [Hooking Up to Routing](#hooking-up-to-routing)
13. [Common Patterns](#common-patterns)
14. [Testing](#testing)
15. [Troubleshooting](#troubleshooting)
16. [Quick Reference](#quick-reference)

---

## Overview

### What is a Result Single Composition?

A **result single composition** is a sport-specific content type that displays:
- **Single match result data** (one match per screen)
- **Full-height display** (entire asset height for one match)
- **Transitions between matches** using `TransitionSeriesWrapper`
- **More detailed player stats** (more players shown per stat)
- **Club-only variants** (shows only club team's performance for club-level accounts)

### Key Differences from Results Composition

| Aspect | Result Single | Results |
|--------|--------------|---------|
| **Matches Per Screen** | 1 (full height) | 2 (split height) |
| **Row Height** | Full asset height | Half asset height |
| **Section Heights** | Fixed pixel values | Percentage-based (40/50/10) |
| **Max Players Per Stat** | 3-5 (more detail) | 2 (less detail) |
| **Pagination** | Match-to-match transitions | Screen-based pagination |
| **Structure** | Simpler (no screen calculation) | More complex (screen calculation) |
| **Club-Only Support** | Yes (optional result statements) | Yes (different layout) |

### Example: Cricket Result Single Composition

The `CricketResultSingle` composition:
- **Data Type**: `MatchResult[]` - array of match results
- **Structure**: Each result has teams with logos, scores, batting/bowling performances
- **Variants**: `basic`, `classic`, `brickwork`, `sixersThunder`, etc.
- **Components**: Display components, match cards, section components, sponsor footer
- **Transitions**: One sequence per match result
- **Club-Only**: Conditional rendering based on `isAccountClub` flag

---

## Architecture

### Folder Structure

```
src/compositions/cricket/resultSingle/
├── .docs/
│   └── how-to.md                    # This guide
├── _utils/
│   └── calculations.ts              # Duration calculations, validation
├── controller/
│   └── ResultSingleDisplay/
│       ├── _types/
│       │   └── ResultSingleDisplayProps.ts
│       ├── display.tsx              # Display component for Basic variant
│       ├── display-classic.tsx      # Display component for Classic variant
│       └── ...
├── layout/
│   ├── MatchCard/
│   │   ├── _types/
│   │   │   └── MatchCardProps.ts
│   │   ├── _utils/
│   │   │   └── calculations.ts     # Section height calculations
│   │   ├── card.tsx                # Match card for Basic variant
│   │   ├── card-Basic-ClubOnly.tsx # Club-only variant
│   │   ├── card-sixers.tsx         # Classic variant
│   │   ├── card-sixers-ClubOnly.tsx # Classic club-only variant
│   │   └── ...
│   └── Sections/
│       ├── MatchHeader/
│       │   ├── index.tsx           # Match info header
│       │   └── ... (multiple variants)
│       ├── TeamsSection/
│       │   ├── components/
│       │   │   ├── LogoWithScoreOverName.tsx
│       │   │   └── ScoreOverNameWithLogo.tsx
│       │   └── index.tsx
│       ├── PlayerStats/
│       │   ├── index.tsx
│       │   ├── PlayerStats-clubOnly-Basic.tsx
│       │   └── ...
│       ├── MatchStatus/
│       │   └── index.tsx           # Abandoned match status
│       └── ResultStatement/
│           ├── index.tsx
│           ├── ResultStatementShort.tsx
│           ├── ResultStatementText.tsx
│           ├── ResultStatementClassic.tsx
│           └── ...
├── modules/
│   └── NoResultData/
│       └── no-data.tsx             # Empty state component
├── BasicTemplate.tsx               # Basic variant entry point
├── classic.tsx                     # Classic variant entry point
├── brickWork.tsx                   # Brickwork variant entry point
├── index.tsx                       # Exports all variants
├── types.tsx                       # TypeScript interfaces
└── readMe.md                       # Folder documentation
```

### Key Concepts

1. **Variant Entry Points** (`BasicTemplate.tsx`, `classic.tsx`, etc.):
   - Main component that handles data fetching, validation
   - Creates one sequence per match result
   - Uses `TransitionSeriesWrapper` for match-to-match transitions
   - No screen pagination (one match per sequence)

2. **Display Components** (`controller/ResultSingleDisplay/display-*.tsx`):
   - Variant-specific rendering logic for a single match
   - Receives a single match result
   - Uses full asset height
   - Checks `isAccountClub` for club-only variant
   - Includes sponsor footer

3. **Match Card Components** (`layout/MatchCard/card-*.tsx`):
   - Variant-specific card layout
   - Composes section components (status, teams, stats, header)
   - Uses fixed pixel heights (not percentages)
   - Handles staggered animations
   - May have club-only variant (`card-{Variant}-ClubOnly.tsx`)

4. **Section Components** (`layout/Sections/`):
   - **MatchStatus**: Match result status (always shown)
   - **TeamsSection**: Team logos, names, scores
   - **PlayerStats**: Batting/bowling performances (more players shown)
   - **MatchHeader**: Match info (type, round, ground)
   - **ResultStatement**: Result text (optional, club-only)

5. **Types** (`types.tsx`):
   - Same as results: `MatchResult`, `Team`, `BattingPerformance`, `BowlingPerformance`
   - Shared with results composition

6. **Utils** (`_utils/`, `layout/*/_utils/`):
   - Duration calculation: `calculateDisplayDurationPerMatch()`
   - Validation: `hasValidResults()`, `castToMatchResults()`
   - Section heights: `calculateSectionHeights()` (percentage-based, but often overridden)
   - Animation delays: `calculateDelays()`
   - Club team: `getClubTeamPlayers()`

---

## Prerequisites

Before creating a new result single composition, ensure you have:

1. ✅ **Template variants created** (if you need custom styling)
   - See `src/templates/.docs/how-to.md` for creating template variants
   - At minimum, you need `Basic` variant

2. ✅ **Understanding of match result data structure**
   - Same as results composition
   - Teams with logos, names, scores
   - Batting performances (runs, balls, strike rate)
   - Bowling performances (wickets, overs, runs)
   - Match metadata (date, type, round, ground, status)

3. ✅ **Access to test data**
   - Sample match result data
   - Multiple matches to test transitions
   - Club team data for club-only testing

4. ✅ **Understanding of match-to-match transitions**
   - One match per sequence
   - Transitions between sequences

---

## Step-by-Step Guide: Basic Structure

### Step 1: Define Data Types

Create `types.tsx` in your composition folder.

**Example:** `src/compositions/cricket/resultSingle/types.tsx`

```typescript
import { AssignSponsors } from "../composition-types";

// Types for cricket match results (shared with results composition)
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
  status: string;
  ageGroup: string;
  awayTeam: Team;
  homeTeam: Team;
  gradeName: string;
  teamAwayLogo: TeamLogo;
  teamHomeLogo: TeamLogo;
  assignSponsors: AssignSponsors;
  resultShort?: string;
  resultSummary?: ResultSummary;
}

// Constants for animation timing and other configuration
export const RESULT_HEADER_ANIMATION_DURATION = 45;
export const RESULT_STAGGER_DELAY = 15;
export const RESULT_ANIMATION_DURATION = 30;
```

**Key Points:**
- **Same types as results**: Shared structure with results composition
- **Optional fields**: `resultShort` and `resultSummary` for result statements
- **Club team flag**: `isClubTeam` determines club-only variants

---

### Step 2: Create Helper Utilities

Create `_utils/calculations.ts` for shared logic.

**Example:** `src/compositions/cricket/resultSingle/_utils/calculations.ts`

```typescript
import { MatchResult } from "../types";

/**
 * Default frame duration if not specified
 */
export const DEFAULT_DISPLAY_DURATION = 300;

/**
 * Calculates the display duration per match based on timings or video metadata
 * @param timings - Timing configuration object
 * @param frameOptions - Array of frame options from video metadata
 * @returns Display duration in frames
 */
export const calculateDisplayDurationPerMatch = (
  timings?: { FPS_SCORECARD?: number },
  frameOptions?: number[],
): number => {
  return (
    timings?.FPS_SCORECARD || frameOptions?.[0] || DEFAULT_DISPLAY_DURATION
  );
};

/**
 * Validates and casts results data to MatchResult array
 * @param resultsData - Raw results data from context
 * @returns Typed MatchResult array
 */
export const castToMatchResults = (resultsData: unknown): MatchResult[] => {
  return (resultsData as MatchResult[]) || [];
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
- **Duration calculation**: Uses `FPS_SCORECARD` timing
- **No screen calculation**: Each match gets its own sequence
- **Validation**: Checks if data is valid array with items
- **Type casting**: Safely casts unknown data to MatchResult[]

---

### Step 3: Create Empty State Component

Create a component to show when there's no data.

**Example:** `src/compositions/cricket/resultSingle/modules/NoResultData/no-data.tsx`

```typescript
import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";

const NoResultData: React.FC = () => {
  const { layout, componentStyles } = useThemeContext();
  const { heights } = layout;

  return (
    <div
      className="flex items-center justify-center"
      style={{ height: `${heights.asset}px` }}
    >
      <div className={componentStyles.title.className}>
        No Match Result Available
      </div>
    </div>
  );
};

export default NoResultData;
```

**Key Points:**
- **Theme-aware**: Uses theme context for styling
- **Full height**: Uses full asset height
- **Simple message**: No dynamic content needed

---

### Step 4: Create Match Card Section Height Utilities

Create `layout/MatchCard/_utils/calculations.ts` for section height calculations.

**Example:** `src/compositions/cricket/resultSingle/layout/MatchCard/_utils/calculations.ts`

```typescript
import {
  MatchResult,
  BattingPerformance,
  BowlingPerformance,
} from "../../../types";

/**
 * Calculates section heights based on row height
 * Note: Often overridden with fixed pixel values in match cards
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
- **Percentage-based**: Default calculation uses percentages
- **Often overridden**: Many match cards use fixed pixel values instead
- **Club team detection**: Finds club team by `isClubTeam` flag

---

### Step 5: Create Basic Match Card Component

Create the match card component that composes sections.

**Example:** `src/compositions/cricket/resultSingle/layout/MatchCard/card.tsx`

```typescript
import React from "react";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";

// Import sections for match layout
import PlayerStats from "../Sections/PlayerStats/index";
import MatchHeader from "../Sections/MatchHeader/index";
import { MatchStatus } from "../Sections/MatchStatus/index";
import { LogoWithScoreOverName } from "../Sections/TeamsSection/components/LogoWithScoreOverName";
import { MatchCardProps } from "./_types/MatchCardProps";

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { animations } = useAnimationContext();

  // Animation setup
  const containerAnimation = animations.container.main.itemContainer;
  const baseDelay = 0;
  const teamsSectionDelay = baseDelay + 5;
  const statsDelay = teamsSectionDelay + 5;
  const headerDelay = statsDelay + 5;

  // Calculate section heights for a more detailed single match display
  // More space for team info and player stats since we're showing only one match
  const headerHeight = 80; // Fixed height for header
  const statusHeight = 80; // Fixed height for status
  const teamsHeight = 240; // More space for team info
  const statsHeight = 560; // More space for player stats

  return (
    <AnimatedContainer
      type="full"
      className="rounded-lg w-auto mx-8 overflow-hidden h-full"
      backgroundColor="none"
      animation={containerAnimation.containerIn}
      animationDelay={baseDelay}
      exitAnimation={containerAnimation.containerOut}
      exitFrame={250} // Adjust based on your needs
    >
      {/* Match status (result info) */}
      <MatchStatus
        status={match.status}
        result={match.result}
        height={statusHeight}
        delay={baseDelay}
      />
      
      {/* Teams section with logos, names and scores */}
      <LogoWithScoreOverName
        type={match.type}
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        homeTeamLogo={match.teamHomeLogo}
        awayTeamLogo={match.teamAwayLogo}
        height={teamsHeight}
        delay={teamsSectionDelay}
      />

      {/* Player statistics */}
      <PlayerStats
        homeTeam={match.homeTeam}
        awayTeam={match.awayTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={3} // Show more player stats for single match view
        matchType={match.type}
        matchStatus={match.status}
      />

      {/* Match info footer */}
      <MatchHeader
        type={match.type}
        round={match.round}
        ground={match.ground}
        height={headerHeight}
        delay={headerDelay}
      />
    </AnimatedContainer>
  );
};

export default MatchCard;
```

**Key Points:**
- **Fixed heights**: Uses fixed pixel values (not percentages)
- **More space**: More height allocated to teams and stats
- **Status first**: MatchStatus shown at top (always visible)
- **More players**: `maxPlayersPerStat={3}` (vs 2 in results)
- **Section order**: Status → Teams → Stats → Header

---

### Step 6: Create Basic Display Component

Create the display component for a single match.

**Example:** `src/compositions/cricket/resultSingle/controller/ResultSingleDisplay/display.tsx`

```typescript
import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import MatchCard from "../../layout/MatchCard/card";
import { SponsorFooter } from "../../../sponsorFooter";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import MatchCardClubOnlyBasic from "../../layout/MatchCard/card-Basic-ClubOnly";
import { ResultSingleDisplayProps } from "./_types/ResultSingleDisplayProps";

const ResultSingleDisplay: React.FC<ResultSingleDisplayProps> = ({ match }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { isAccountClub } = useVideoDataContext();
  
  // Full height is available for a single match
  const availableHeight = heights.asset;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Match result container */}
      <div
        className="w-full flex flex-col justify-center"
        style={{ height: `${availableHeight}px` }}
      >
        {isAccountClub ? (
          <MatchCardClubOnlyBasic match={match} />
        ) : (
          <MatchCard match={match} />
        )}
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={match.assignSponsors} />
      </div>
    </div>
  );
};

export default ResultSingleDisplay;
```

**Key Points:**
- **Single match**: Receives one match result
- **Full height**: Uses entire asset height
- **Club check**: Uses `isAccountClub` to determine card variant
- **Sponsor footer**: Uses match's assignSponsors directly

---

### Step 7: Create Variant Entry Point

Create the main component file for your first variant (e.g., `BasicTemplate.tsx`).

**Example:** `src/compositions/cricket/resultSingle/BasicTemplate.tsx`

```typescript
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoResultData from "./modules/NoResultData/no-data";
import ResultSingleDisplay from "./controller/ResultSingleDisplay/display";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import {
  calculateDisplayDurationPerMatch,
  castToMatchResults,
  hasValidResults,
} from "./_utils/calculations";

export const ResultSingle: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: resultData, videoMeta, timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  // If no data is available, show a placeholder
  if (!hasValidResults(resultData)) {
    return <NoResultData />;
  }

  // Get frame duration from timings or use default
  const frameOptions = videoMeta?.video?.metadata?.frames || [300];
  const displayDurationPerMatch = calculateDisplayDurationPerMatch(
    timings,
    frameOptions,
  );

  // Cast the data to the correct type
  const matchResults = castToMatchResults(resultData);

  // Create sequence data for each match result
  const sequences = matchResults.map((match) => ({
    content: <ResultSingleDisplay match={match} />,
    durationInFrames: displayDurationPerMatch,
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
  return <ResultSingle />;
};

export default Basic;
```

**Key Points:**
- **One sequence per match**: Maps over match results, creates one sequence each
- **No screen calculation**: Each match gets full screen
- **Transitions**: Uses `TransitionSeriesWrapper` for match-to-match transitions
- **Duration**: Same duration for all matches

---

### Step 8: Export from Composition Index

Create or update `index.tsx` to export your variant.

**Example:** `src/compositions/cricket/resultSingle/index.tsx`

```typescript
// Import variant components
import { Basic } from "./BasicTemplate";
// Import other variants as you create them
// import { Classic } from "./classic";
// import { BrickWork } from "./brickWork";

// Export all template implementations
export {
  Basic as basic,
  // Add more as you create them:
  // Classic as classic,
  // BrickWork as brickWork,
};
```

---

### Step 9: Add to Sport Module Export

Add your composition to the sport's main index file.

**Example:** `src/compositions/cricket/index.tsx`

```typescript
// Import result single variants
import {
  basic as resultSingleBasic,
  // Add more variants as you create them
} from "./resultSingle";

// ... other composition imports

// Export implementations for all composition types
export const CricketResultSingle = {
  basic: resultSingleBasic,
  // Add more variants as you create them:
  // classic: resultSingleClassic,
  // brickwork: resultSingleBrickWork,
};
```

---

## Creating Template Variants

Once you have the Basic variant working, you can create additional template variants. This section covers the detailed process for creating new variants, including club-only support.

### Overview: Template Variant Creation

Creating a new template variant involves:

1. **Creating Display Component** (`controller/ResultSingleDisplay/display-{Variant}.tsx`)
2. **Creating Match Card Component** (`layout/MatchCard/card-{Variant}.tsx`)
3. **Creating Club-Only Card** (`layout/MatchCard/card-{Variant}-ClubOnly.tsx`) - optional but recommended
4. **Creating Variant-Specific Sections** (if needed)
5. **Creating Variant Entry Point** (`{variant}.tsx`)
6. **Exporting from Index** (`index.tsx`)
7. **Exporting from Sport Module** (`src/compositions/cricket/index.tsx`)

---

## Club-Only Variants

### Concept

Club-only variants show:
- Only the club team's players
- Optional result statement at top
- Different section ordering
- Club team batting stats under club team
- Club team bowling stats under opposition team

### Implementation Overview

1. **Check `isAccountClub`**:
   ```typescript
   const { isAccountClub } = useVideoDataContext();
   ```

2. **Conditional Card Rendering**:
   ```typescript
   {isAccountClub ? (
     <MatchCardClubOnly match={match} />
   ) : (
     <MatchCard match={match} />
   )}
   ```

3. **Club-Only Card Structure**:
   - Result statement (if available) - placed first
   - Grade name header (right-aligned)
   - Club team (with logo, name, score)
   - Club team batting stats (indented with `ml-32`)
   - Opposition team (with logo, name, score)
   - Club team bowling stats (indented with `ml-32`)
   - Match header footer (type, round, ground)

### File Naming

Club-only cards use `-ClubOnly` suffix:
- `card.tsx` → `card-Basic-ClubOnly.tsx`
- `card-sixers.tsx` → `card-sixers-ClubOnly.tsx`

### Phase 1: Create Club-Only Card Component

#### Step 1.1: Create Component File

**File:** `layout/MatchCard/card-{TemplateName}-ClubOnly.tsx`

**Template Structure:**

```typescript
import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import MatchHeader from "../Sections/MatchHeader/index";
import { SingleDataPointHeader } from "../../../results/layout/Sections/MatchHeader/SingleDataPointHeader";
import { Horizontal_SingleTeam_LogoWithName_Score } from "../../../results/layout/Sections/TeamsSection/Horizontal_SingleTeam_LogoWithName_Score";
import { ResultStatementClassic } from "../Sections/ResultStatement/index";
import PlayerStatsSingleTeamOnly from "../../../results/layout/Sections/PlayerStats/PlayerStats-SingleTeamOnly";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateSectionHeights, calculateDelays, getClubTeamPlayers } from "./_utils/calculations";

const {Template}MatchCardClubOnly: React.FC<MatchCardProps> = ({ match }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;

  // Get club team players
  const clubTeamPlayers = getClubTeamPlayers(match);
  const clubTeam = match.homeTeam.isClubTeam ? match.homeTeam : match.awayTeam.isClubTeam ? match.awayTeam : null;
  const oppositionTeam = match.homeTeam.isClubTeam ? match.awayTeam : match.awayTeam.isClubTeam ? match.homeTeam : null;

  if (!clubTeamPlayers || !clubTeam || !oppositionTeam) {
    return null;
  }

  // Calculate heights and delays
  const rowHeight = heights.asset;
  const baseDelay = 0;
  const { teamsHeight, statsHeight, headerHeight } = calculateSectionHeights(rowHeight);
  const { baseDelay: calculatedBaseDelay, statsDelay, headerDelay } = calculateDelays(baseDelay);
  const isHomeTeam = match.homeTeam.isClubTeam;

  // Extract optional fields
  const { resultShort, resultSummary } = match;

  return (
    <div className={`${layout.borderRadius.container} w-auto mx-8 overflow-hidden h-full flex flex-col justify-center`}>
      {/* Component sections */}
    </div>
  );
};

export default {Template}MatchCardClubOnly;
```

#### Step 1.2: Implement Section Layout

**Standard Layout Order:**

1. **Result Statement** (optional - resultSummary/resultShort) - **Placed first**
2. **Headers** (result, gradeName) - **Note:** Result header may be omitted if result statement is shown
3. **Club Team** (with logo, name, score)
4. **Club Team Batting Stats**
5. **Opposition Team** (with logo, name, score)
6. **Club Team Bowling Stats**
7. **Match Header** (type, round, ground)

**Code Pattern:**

```typescript
return (
  <div className={`${layout.borderRadius.container} w-auto mx-8 overflow-hidden h-full flex flex-col justify-center`}>
    {/* Result Statement - placed first, optional */}
    <ResultStatementClassic
      resultShort={resultShort}
      resultSummary={resultSummary}
      height={headerHeight}
      delay={headerDelay}
    />

    {/* Headers - Note: result header may be omitted if result statement shown */}
    <SingleDataPointHeader
      grade={match.gradeName}
      height={headerHeight}
      delay={headerDelay}
      backgroundColor={"transparent"}
      align="right"
    />

    {/* Club Team */}
    <Horizontal_SingleTeam_LogoWithName_Score
      type={match.type}
      Team={clubTeam}
      TeamLogo={isHomeTeam ? match.teamHomeLogo : match.teamAwayLogo}
      firstInningsScore={isHomeTeam
        ? (match.homeTeam.homeScoresFirstInnings || "")
        : (match.awayTeam.awayScoresFirstInnings || "")}
      delay={calculatedBaseDelay}
      outerContainer={{ height: teamsHeight }}
    />

    {/* Club Team Batting */}
    <div className="ml-32">
      <PlayerStatsSingleTeamOnly
        Team={clubTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={5}
        showBatting={true}
        showBowling={false}
      />
    </div>

    {/* Opposition Team */}
    <Horizontal_SingleTeam_LogoWithName_Score
      type={match.type}
      Team={oppositionTeam}
      TeamLogo={isHomeTeam ? match.teamAwayLogo : match.teamHomeLogo}
      firstInningsScore={isHomeTeam
        ? (match.awayTeam.awayScoresFirstInnings || "")
        : (match.homeTeam.homeScoresFirstInnings || "")}
      delay={calculatedBaseDelay}
      outerContainer={{
        height: teamsHeight,
        marginTop: "10px",
      }}
    />

    {/* Club Team Bowling */}
    <div className="ml-32">
      <PlayerStatsSingleTeamOnly
        Team={clubTeam}
        height={statsHeight}
        delay={statsDelay}
        maxPlayersPerStat={5}
        showBatting={false}
        showBowling={true}
      />
    </div>

    {/* Match Header */}
    <MatchHeader
      type={match.type}
      round={match.round}
      ground={match.ground}
      height={headerHeight}
      delay={headerDelay}
    />
  </div>
);
```

#### Step 1.3: Key Implementation Details

**Club Team Identification:**

```typescript
const clubTeamPlayers = getClubTeamPlayers(match);
const clubTeam = match.homeTeam.isClubTeam
  ? match.homeTeam
  : match.awayTeam.isClubTeam
    ? match.awayTeam
    : null;
const oppositionTeam = match.homeTeam.isClubTeam
  ? match.awayTeam
  : match.awayTeam.isClubTeam
    ? match.homeTeam
    : null;

if (!clubTeamPlayers || !clubTeam || !oppositionTeam) {
  return null; // Safety check
}
```

**Height Calculations:**

```typescript
const rowHeight = heights.asset; // Full asset height for single results
const { teamsHeight, statsHeight, headerHeight } =
  calculateSectionHeights(rowHeight);
// Returns: 40% teams, 50% stats, 10% header
```

**Delay Calculations:**

```typescript
const baseDelay = 0; // Single results start at 0
const {
  baseDelay: calculatedBaseDelay,
  statsDelay,
  headerDelay,
} = calculateDelays(baseDelay);
// Returns: baseDelay=0, statsDelay=4, headerDelay=9
```

**First Innings Score Handling:**

```typescript
firstInningsScore={isHomeTeam
  ? (match.homeTeam.homeScoresFirstInnings || "")
  : (match.awayTeam.awayScoresFirstInnings || "")}
```

---

### Phase 2: Create Result Statement Component (If Needed)

Result statements are optional components that display match result summaries. They're typically used in club-only variants.

#### Step 2.1: Create ResultStatementClassic Component

**File:** `layout/Sections/ResultStatement/ResultStatementClassic.tsx`

**Purpose:** Displays result summary with Classic template styling (right-aligned, matching stats background)

**Implementation:**

```typescript
import React from "react";
import { useAnimationContext } from "../../../../../../core/context/AnimationContext";
import { ResultMetaData } from "../../../../utils/primitives/ResultMetaData";
import { ResultStatementShort } from "./ResultStatementShort";
import { swapResultWord } from "./_utils/helpers";
import { ResultStatementClassicProps } from "./_types/ResultStatementProps";

export const ResultStatementClassic: React.FC<ResultStatementClassicProps> = ({
  resultShort,
  resultSummary,
  height,
  delay,
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  // Priority: resultSummary > resultShort
  if (resultSummary) {
    return (
      <div className="w-full flex flex-col items-center px-16 py-0 mb-16 justify-center gap-2">
        {/* Home Team */}
        <ResultMetaData
          value={resultSummary.homeTeam}
          animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          variant="onContainerCopyNoBg"
          className="text-center text-5xl font-black"
        />

        {/* Result Word */}
        <ResultMetaData
          value={swapResultWord(resultSummary.resultWord).toUpperCase()}
          animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          variant="onContainerCopyNoBg"
          className="text-center text-4xl font-bold"
        />

        {/* Away Team */}
        <ResultMetaData
          value={resultSummary.awayTeam}
          animation={{ ...TextAnimations.copyIn, delay: delay + 1 }}
          variant="onContainerCopyNoBg"
          className="text-center text-5xl font-black"
        />
      </div>
    );
  }

  if (resultShort) {
    return (
      <div className="w-full flex justify-center items-center mb-8">
        <ResultStatementShort
          resultShort={resultShort}
          delay={delay}
          outerContainer={{ height: height }}
        />
      </div>
    );
  }

  return null;
};
```

**Key Features:**

- **Three Separate Sections:** Home team, result word, and away team displayed in separate `ResultMetaData` components
- **Column Layout:** Uses `flex-col` for vertical stacking
- **No Animation Container:** Uses simple `div` (static display, no animation wrapper)
- **Centered Layout:** Centered alignment (`items-center`, `justify-center`)
- **Large Text:** Home/away teams use `text-5xl`, result word uses `text-4xl`
- **Font Weights:** Home/away teams use `font-black`, result word uses `font-bold`
- **Uppercase Result Word:** Result word is displayed in uppercase
- **Priority:** `resultSummary` > `resultShort`

**Layout Structure:**

```
┌─────────────────────────┐
│                         │
│      Home Team          │ ← Large, bold
│                         │
│    RESULT WORD          │ ← Medium, bold, uppercase
│                         │
│      Away Team          │ ← Large, bold
│                         │
└─────────────────────────┘
```

#### Step 2.2: Result Statement Structure

**Three Separate Sections:**

The `ResultStatementClassic` component displays the result summary in three separate sections:

1. **Home Team** - Large text (`text-5xl`), bold (`font-black`), centered
2. **Result Word** - Medium text (`text-4xl`), bold (`font-bold`), uppercase, centered
3. **Away Team** - Large text (`text-5xl`), bold (`font-black`), centered

**Layout:**

- Column layout (`flex-col`) - stacks vertically
- Centered alignment (`items-center`, `justify-center`)
- No animation container - uses simple `div` (static display)
- Gap spacing (`gap-2`) between sections
- Large padding (`px-16`) and margin (`mb-16`)

**Styling Notes:**

- Uses `onContainerCopyNoBg` variant (no background on text)
- Result word is uppercase using `.toUpperCase()`
- Uses `swapResultWord` helper for proper formatting
- Can be customized for right-alignment if needed (change `items-center` to `items-end`)

#### Step 2.3: Export from Index

**File:** `layout/Sections/ResultStatement/index.tsx`

```typescript
export { ResultStatementShort } from "./ResultStatementShort";
export { ResultStatementText } from "./ResultStatementText";
export { ResultStatementClassic } from "./ResultStatementClassic";
```

---

### Phase 3: Update Display Controller

#### Step 3.1: Add Conditional Rendering

**File:** `controller/ResultSingleDisplay/display-{template}.tsx`

**Before:**

```typescript
import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import {RegularMatchCard} from "../../layout/MatchCard/card-{template}";
import { ResultSingleDisplayProps } from "./_types/ResultSingleDisplayProps";

const {Template}SingleResult: React.FC<ResultSingleDisplayProps> = ({ match }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const availableHeight = heights.asset;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="w-full flex flex-col justify-center" style={{ height: `${availableHeight}px` }}>
        <RegularMatchCard match={match} />
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={match.assignSponsors} />
      </div>
    </div>
  );
};
```

**After:**

```typescript
import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import {RegularMatchCard} from "../../layout/MatchCard/card-{template}";
import {ClubOnlyMatchCard} from "../../layout/MatchCard/card-{template}-ClubOnly";
import { ResultSingleDisplayProps } from "./_types/ResultSingleDisplayProps";

const {Template}SingleResult: React.FC<ResultSingleDisplayProps> = ({ match }) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { isAccountClub } = useVideoDataContext();
  const availableHeight = heights.asset;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="w-full flex flex-col justify-center" style={{ height: `${availableHeight}px` }}>
        {isAccountClub ? (
          <ClubOnlyMatchCard match={match} />
        ) : (
          <RegularMatchCard match={match} />
        )}
      </div>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={match.assignSponsors} />
      </div>
    </div>
  );
};
```

**Key Changes:**

1. Import `useVideoDataContext` hook
2. Extract `isAccountClub` flag
3. Import club-only card component
4. Add conditional rendering logic
5. Sponsor footer remains unchanged

---

## Match-to-Match Transitions

### How Transitions Work

1. **One Match Per Sequence**:
   ```typescript
   const sequences = matchResults.map((match) => ({
     content: <ResultSingleDisplay match={match} />,
     durationInFrames: displayDurationPerMatch,
   }));
   ```

2. **Transition Between Matches**:
   - Each match is a separate sequence
   - `TransitionSeriesWrapper` handles transitions between sequences
   - Transition type and direction from animation context

3. **Duration**:
   - Same duration for all matches
   - Uses `FPS_SCORECARD` timing or metadata frames

### Example: 3 Matches

- **Sequence 0**: Match 1 (300 frames)
- **Sequence 1**: Match 2 (300 frames)
- **Sequence 2**: Match 3 (300 frames)
- **Transitions**: Between each sequence

---

## Match Card Structure

### Section Layout

The match card is divided into sections:

1. **Match Status** (80px fixed)
   - Match result status
   - Always shown at top

2. **Teams Section** (240px fixed)
   - Team logos
   - Team names
   - Scores
   - More space than results (240px vs ~200px)

3. **Player Stats Section** (560px fixed)
   - Batting performances (top 3)
   - Bowling performances (top 3)
   - More space than results (560px vs ~500px)
   - More players shown (3 vs 2)

4. **Match Header** (80px fixed)
   - Match type
   - Round
   - Ground name

### Height Distribution

**Fixed pixel values** (not percentages):
- **Status**: 80px
- **Teams**: 240px
- **Stats**: 560px
- **Header**: 80px
- **Total**: ~960px (within asset height)

**Note:** Some variants may use different fixed heights or percentage-based calculations.

---

## Section Components

### MatchStatus

**Location:** `layout/Sections/MatchStatus/index.tsx`

Always shown at top of card:

```typescript
import { MatchStatus } from "../Sections/MatchStatus/index";

<MatchStatus
  status={match.status}
  result={match.result}
  height={statusHeight}
  delay={baseDelay}
/>
```

### TeamsSection Variants

**Location:** `layout/Sections/TeamsSection/`

Multiple layout variants available:
- `LogoWithScoreOverName` - Logo with score above name
- `ScoreOverNameWithLogo` - Score above name with logo
- `Horizontal_SingleTeam_LogoWithName_Score` - Single team display (club-only)
- etc.

**Usage:**

```typescript
import { LogoWithScoreOverName } from "../Sections/TeamsSection/components/LogoWithScoreOverName";

<LogoWithScoreOverName
  type={match.type}
  homeTeam={match.homeTeam}
  awayTeam={match.awayTeam}
  homeTeamLogo={match.teamHomeLogo}
  awayTeamLogo={match.teamAwayLogo}
  height={teamsHeight}
  delay={teamsSectionDelay}
/>
```

### PlayerStats

**Location:** `layout/Sections/PlayerStats/index.tsx`

Shows more players than results composition:

```typescript
import PlayerStats from "../Sections/PlayerStats/index";

<PlayerStats
  homeTeam={match.homeTeam}
  awayTeam={match.awayTeam}
  height={statsHeight}
  delay={statsDelay}
  maxPlayersPerStat={3} // More than results (which uses 2)
  matchType={match.type}
  matchStatus={match.status}
/>
```

**Club-Only Variant:**

```typescript
import PlayerStatsSingleTeamOnly from "../../../results/layout/Sections/PlayerStats/PlayerStats-SingleTeamOnly";

<PlayerStatsSingleTeamOnly
  Team={clubTeam}
  height={statsHeight}
  delay={statsDelay}
  maxPlayersPerStat={5}
  showBatting={true}
  showBowling={false}
/>
```

### MatchHeader Variants

**Location:** `layout/Sections/MatchHeader/`

Multiple header variants:
- `Type_Round_Ground` - Horizontal layout
- `Type_Round_Ground_stacked` - Stacked layout
- `Round_Ground` - Round and ground only
- `SingleDataPointHeader` - Single value header (for grade name)
- etc.

**Usage:**

```typescript
import MatchHeader from "../Sections/MatchHeader/index";

<MatchHeader
  type={match.type}
  round={match.round}
  ground={match.ground}
  height={headerHeight}
  delay={headerDelay}
/>
```

---

## Result Statement Components

### ResultStatement Variants

**Location:** `layout/Sections/ResultStatement/`

Multiple result statement variants:

- **`ResultStatementClassic`**: Three separate sections (Home Team | Result Word | Away Team) in column layout
- **`ResultStatementText`**: Centered, rotated text display
- **`ResultStatementShort`**: Short result text

**Usage:**

```typescript
import { ResultStatementText, ResultStatementShort, ResultStatementClassic } from "../Sections/ResultStatement/index";

{resultSummary && (
  <ResultStatementText
    resultSummary={resultSummary}
    delay={headerDelay}
    outerContainer={{ height: headerHeight }}
  />
)}

{resultShort && !resultSummary && (
  <ResultStatementShort
    resultShort={resultShort}
    delay={headerDelay}
    outerContainer={{ height: headerHeight }}
  />
)}
```

**Priority Logic:**

- `resultSummary` takes priority over `resultShort`
- If `resultSummary` exists, use it
- Otherwise, use `resultShort` if available
- If neither exists, don't render result statement

---

## Animation Patterns

### Container Animation

Entire card animates in:

```typescript
<AnimatedContainer
  animation={containerAnimation.containerIn}
  animationDelay={baseDelay}
  exitAnimation={containerAnimation.containerOut}
  exitFrame={250}
>
```

### Section Staggering

Within each card, sections animate with increasing delays:

```typescript
// Status: baseDelay (0)
// Teams: baseDelay + 5
// Stats: baseDelay + 10
// Header: baseDelay + 15
```

### Exit Frame

Exit animations start before composition ends:

```typescript
exitFrame={250} // Fixed or calculated based on duration
```

---

## Hooking Up to Routing

### Composition ID

The routing system recognizes:
- `CricketResultSingle`

### Routing Configuration

**Check:** `src/core/utils/routing.tsx`

```typescript
const SPORT_COMPOSITION_TYPES: SportCompositionTypes = {
  cricket: {
    CricketResultSingle: "CricketResultSingle",
    // ... other composition types
  },
};
```

---

## Common Patterns

### Pattern 1: Match-to-Match Rendering

```typescript
const sequences = matchResults.map((match) => ({
  content: <ResultSingleDisplay match={match} />,
  durationInFrames: displayDurationPerMatch,
}));

return (
  <TransitionSeriesWrapper
    sequences={sequences}
    // ... transition config
  />
);
```

### Pattern 2: Club-Only Conditional

```typescript
const { isAccountClub } = useVideoDataContext();

{isAccountClub ? (
  <MatchCardClubOnly match={match} />
) : (
  <MatchCard match={match} />
)}
```

### Pattern 3: Conditional Result Statement

```typescript
{resultSummary && (
  <ResultStatementText resultSummary={resultSummary} ... />
)}

{resultShort && !resultSummary && (
  <ResultStatementShort resultShort={resultShort} ... />
)}
```

### Pattern 4: Fixed Section Heights

```typescript
const headerHeight = 80;
const statusHeight = 80;
const teamsHeight = 240;
const statsHeight = 560;
```

### Pattern 5: Club-Only Layout Order

```typescript
// 1. Result Statement (optional)
<ResultStatementClassic ... />

// 2. Grade Header
<SingleDataPointHeader grade={match.gradeName} ... />

// 3. Club Team
<Horizontal_SingleTeam_LogoWithName_Score Team={clubTeam} ... />

// 4. Club Batting Stats (indented)
<div className="ml-32">
  <PlayerStatsSingleTeamOnly showBatting={true} showBowling={false} />
</div>

// 5. Opposition Team
<Horizontal_SingleTeam_LogoWithName_Score Team={oppositionTeam} ... />

// 6. Club Bowling Stats (indented)
<div className="ml-32">
  <PlayerStatsSingleTeamOnly showBatting={false} showBowling={true} />
</div>

// 7. Match Header Footer
<MatchHeader ... />
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
  resultShort: "Team A won",
  resultSummary: {
    homeTeam: "Team A",
    awayTeam: "Team B",
    winner: "Team A",
    resultWord: "won",
  },
};
```

### Test Transitions

Test with multiple matches:
- 1 match (no transitions)
- 2 matches (1 transition)
- 3+ matches (multiple transitions)

### Test Club-Only Variant

Test with `isAccountClub` set to `true`:
- Should render club-only card
- Should show only club team's players
- Should show result statement if available
- Should show batting stats under club team
- Should show bowling stats under opposition

---

## Troubleshooting

### Issue: Section Heights Don't Fit

**Error:** Sections overflow or don't fill available space

**Solutions:**
1. Check fixed heights sum correctly
2. Verify `availableHeight` is `heights.asset` (not including footer)
3. Adjust fixed heights to fit within asset height
4. Consider using percentage-based calculations

### Issue: Club-Only Not Working

**Error:** Club-only card not rendering

**Solutions:**
1. Check `isAccountClub` is set correctly in context
2. Verify `isClubTeam` flag exists in team data
3. Check club-only card component exists
4. Verify conditional rendering logic

### Issue: Transitions Not Working

**Error:** No transitions between matches or transition errors

**Solutions:**
1. Check `TransitionSeriesWrapper` usage
2. Verify animation config is available
3. Check duration calculation returns valid number
4. Verify data array has multiple matches

### Issue: Too Many/Few Players Shown

**Error:** Wrong number of players in stats

**Solutions:**
1. Check `maxPlayersPerStat` prop (should be 3-5 for single match)
2. Verify PlayerStats component uses this prop
3. Check player data exists in match

### Issue: Result Statement Not Showing

**Error:** Result statement not displaying in club-only view

**Solutions:**
1. Check `resultSummary` or `resultShort` exists in match data
2. Verify result statement component is imported correctly
3. Check priority logic (resultSummary > resultShort)
4. Verify component is placed first in layout order

### Issue: Missing First Innings Scores

**Error:** First innings scores not displayed for Two Day+ matches

**Solutions:**
1. Check `homeScoresFirstInnings` and `awayScoresFirstInnings` exist in team data
2. Verify `firstInningsScore` prop is passed correctly
3. Check `isHomeTeam` logic is correct

---

## Quick Reference

### File Checklist

- [ ] `types.tsx` - Data type definitions (shared with results)
- [ ] `_utils/calculations.ts` - Duration calculations, validation
- [ ] `layout/MatchCard/_utils/calculations.ts` - Section height calculations
- [ ] `layout/MatchCard/card.tsx` - Match card component
- [ ] `layout/MatchCard/card-{Variant}.tsx` - Variant-specific card
- [ ] `layout/MatchCard/card-{Variant}-ClubOnly.tsx` - Club-only card (optional)
- [ ] `controller/ResultSingleDisplay/display.tsx` - Display component
- [ ] `controller/ResultSingleDisplay/display-{Variant}.tsx` - Variant display
- [ ] `layout/Sections/ResultStatement/ResultStatement{Variant}.tsx` - Result statement (optional)
- [ ] `modules/NoResultData/no-data.tsx` - Empty state component
- [ ] `{variant}.tsx` - Variant entry point
- [ ] `index.tsx` - Composition exports
- [ ] Updated `src/compositions/cricket/index.tsx` - Sport module export

### Key Functions

```typescript
// Duration calculation
calculateDisplayDurationPerMatch(timings, frameOptions): number

// Validation
hasValidResults(resultsData): boolean
castToMatchResults(resultsData): MatchResult[]

// Section calculations
calculateSectionHeights(rowHeight): { teamsHeight, statsHeight, headerHeight }
calculateDelays(delay): { baseDelay, statsDelay, headerDelay }
getClubTeamPlayers(match): ClubTeamPlayers | null
```

### Section Height Distribution (Basic Variant)

- **Status**: 80px (fixed)
- **Teams**: 240px (fixed)
- **Stats**: 560px (fixed)
- **Header**: 80px (fixed)

### Animation Delay Pattern

- **Status delay**: `baseDelay` (0)
- **Teams delay**: `baseDelay + 5`
- **Stats delay**: `baseDelay + 10`
- **Header delay**: `baseDelay + 15`

### Key Differences from Results

- **One match per screen** (not 2)
- **Full height per match** (not split)
- **Fixed section heights** (not percentages)
- **More players shown** (3-5 vs 2)
- **Match status always shown** (not conditional)
- **No screen pagination** (match-to-match transitions)
- **Club-only support** (optional result statements)

### Implementation Checklist

#### Phase 1: Club-Only Card Component

- [ ] Create `card-{TemplateName}-ClubOnly.tsx`
- [ ] Import required components
- [ ] Implement club team identification logic
- [ ] Add height and delay calculations
- [ ] Implement section layout (headers → result → teams → stats → footer)
- [ ] Handle first innings scores
- [ ] Add safety checks (null returns)
- [ ] Match styling with regular card

#### Phase 2: Result Statement Component (If Needed)

- [ ] Create `ResultStatement{Variant}.tsx` (if template-specific styling needed)
- [ ] Use same background color as stats
- [ ] Use `onContainerCopy` variant for text
- [ ] Implement priority logic (resultSummary > resultShort)
- [ ] Export from index.tsx

#### Phase 3: Display Controller

- [ ] Import `useVideoDataContext` hook
- [ ] Extract `isAccountClub` flag
- [ ] Import club-only card component
- [ ] Add conditional rendering logic
- [ ] Ensure sponsor footer remains unchanged

#### Phase 4: Testing

- [ ] Test with `isAccountClub = true` → shows club-only card
- [ ] Test with `isAccountClub = false` → shows regular card
- [ ] Verify club team stats display correctly
- [ ] Verify batting stats under club team
- [ ] Verify bowling stats under opposition
- [ ] Test result statement rendering (resultSummary and resultShort)
- [ ] Verify heights calculate correctly
- [ ] Verify animation delays work
- [ ] Check first innings scores display
- [ ] Test with club team as home vs away

---

## Design Patterns

### Layout Pattern: Club-Only View

**Visual Structure:**

```
┌─────────────────────────────────┐
│                                 │
│      Result Statement           │ ← Optional, centered, large text
│      (Home | Result | Away)     │
│                                 │
│ Grade Name (right-aligned)      │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Club Team Logo + Name + Score│ │
│ └─────────────────────────────┘ │
│                                 │
│   Club Team Batting Stats       │ ← Indented (ml-32)
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Opposition Logo + Name + Score│ │
│ └─────────────────────────────┘ │
│                                 │
│   Club Team Bowling Stats       │ ← Indented (ml-32)
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Type | Round | Ground        │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

**Result Statement Structure:**

```
┌─────────────────────────┐
│                         │
│      Home Team          │ ← text-5xl, font-black, centered
│                         │
│    RESULT WORD          │ ← text-4xl, font-bold, uppercase, centered
│                         │
│      Away Team          │ ← text-5xl, font-black, centered
│                         │
└─────────────────────────┘
```

### Stats Display Pattern

**Club-Only Stats:**

- **Batting:** Shows under club team (after club team display)
- **Bowling:** Shows under opposition team (after opposition display)
- **Indentation:** Uses `ml-32` class for visual alignment
- **Max Players:** Usually 5 for single results (more space available)

**Regular Stats:**

- Shows both teams' stats side-by-side
- Uses different component (`PlayerStats` instead of `PlayerStatsSingleTeamOnly`)

---

## Common Pitfalls & Solutions

### Pitfall 1: Missing Club Team Check

**Problem:** Component crashes if no club team found

**Solution:**

```typescript
if (!clubTeamPlayers || !clubTeam || !oppositionTeam) {
  return null;
}
```

### Pitfall 2: Wrong Height Source

**Problem:** Using `rowHeight` prop instead of `heights.asset`

**Solution:**

```typescript
const rowHeight = heights.asset; // ✅ Correct for single results
// NOT: const rowHeight = props.rowHeight; // ❌ Wrong
```

### Pitfall 3: Wrong Delay Source

**Problem:** Using delay prop instead of calculating from 0

**Solution:**

```typescript
const baseDelay = 0; // ✅ Correct for single results
const { baseDelay, statsDelay, headerDelay } = calculateDelays(baseDelay);
```

### Pitfall 4: Missing First Innings Scores

**Problem:** First innings scores not displayed for Two Day+ matches

**Solution:**

```typescript
firstInningsScore={isHomeTeam
  ? (match.homeTeam.homeScoresFirstInnings || "")
  : (match.awayTeam.awayScoresFirstInnings || "")}
```

### Pitfall 5: Result Statement Layout

**Problem:** Result statement layout doesn't match template design

**Solution:**

For Classic template, use column layout with three separate sections:

```typescript
// ✅ Correct: Column layout with three sections
<div className="w-full flex flex-col items-center px-16 py-0 mb-16 justify-center gap-2">
  <ResultMetaData value={resultSummary.homeTeam} className="text-center text-5xl font-black" />
  <ResultMetaData value={swapResultWord(resultSummary.resultWord).toUpperCase()} className="text-center text-4xl font-bold" />
  <ResultMetaData value={resultSummary.awayTeam} className="text-center text-5xl font-black" />
</div>

// ❌ Wrong: Single line or wrong layout
<ResultMetaData value={`${homeTeam} ${resultWord} ${awayTeam}`} />
```

**Note:**

- Uses `flex-col` for vertical stacking
- No `AnimatedContainer` (static display)
- Can be customized for right-alignment: change `items-center` to `items-end` and `text-center` to `text-right`

---

## Summary

Creating a result single composition with club-only support involves:

1. **Creating the basic structure** (types, utilities, empty state, match card, display component, entry point)

2. **Creating template variants** with:
   - Variant-specific match cards
   - Variant-specific display components
   - Variant-specific sections (if needed)

3. **Adding club-only support**:
   - Creating club-only card components
   - Creating result statement components (if needed)
   - Updating display controllers with conditional rendering
   - Using shared utilities for calculations

4. **Following established patterns**:
   - Result statement placed first (before headers)
   - Proper section ordering
   - Consistent styling and spacing
   - Proper height and delay calculations

### Key Implementation Details

**Result Statement Component Structure:**

- Uses `flex-col` for vertical column layout
- Three separate `ResultMetaData` components (not combined)
- No `AnimatedContainer` wrapper (static display)
- Large text sizes with different font weights
- Result word displayed in uppercase

**Club-Only Card Layout Order:**

1. Result Statement (optional - resultSummary/resultShort)
2. Grade Name Header (right-aligned)
3. Club Team (with logo, name, score)
4. Club Team Batting Stats (indented with `ml-32`)
5. Opposition Team (with logo, name, score)
6. Club Team Bowling Stats (indented with `ml-32`)
7. Match Header Footer (type, round, ground)

The Classic template serves as a reference implementation showing all these patterns working together.

---

**Last Updated:** 2026-02-08

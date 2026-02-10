# How to Create a New Upcoming Games Composition Asset Type

This guide explains how to create a new **upcoming games composition asset type** (like `CricketUpcoming`) from scratch. This composition type displays upcoming match fixtures with team logos, metadata, and sponsor information, using screen pagination to handle multiple games.

**Last Updated:** 2026-02-08

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Screen Pagination System](#screen-pagination-system)
6. [Display Components](#display-components)
7. [Game Card Components](#game-card-components)
8. [Logo Layout Variations](#logo-layout-variations)
9. [Metadata Components](#metadata-components)
10. [Sponsor Merging](#sponsor-merging)
11. [Creating Variant Implementations](#creating-variant-implementations)
12. [Animation Patterns](#animation-patterns)
13. [Hooking Up to Routing](#hooking-up-to-routing)
14. [Common Patterns](#common-patterns)
15. [Testing](#testing)
16. [Troubleshooting](#troubleshooting)
17. [Quick Reference](#quick-reference)

---

## Overview

### What is an Upcoming Games Composition?

An **upcoming games composition** is a sport-specific content type that displays:
- **Upcoming match fixtures** (array of game data)
- **Team logos** (home and away teams)
- **Match metadata** (date, time, ground, grade, round)
- **Screen pagination** (configurable games per screen)
- **Screen-to-screen transitions** using `TransitionSeriesWrapper`
- **Sponsor footer** (merged from all displayed games)

### Key Characteristics

| Aspect | Upcoming Games |
|--------|----------------|
| **Layout** | Vertical list of game cards |
| **Games Per Screen** | Configurable (default: 2) |
| **Card Height** | Calculated dynamically based on games per screen |
| **Transitions** | Screen-to-screen transitions |
| **Logo Layouts** | Multiple variations (LogoAndName, LogosOnly, etc.) |
| **Metadata** | Date, time, ground, grade, round |

### Example: Cricket Upcoming Games Composition

The `CricketUpcoming` composition:
- **Data Type**: `GameData[]` - array of game objects
- **Structure**: Each game has teams, logos, date/time, ground, grade
- **Variants**: `basic`, `classic`, `brickwork`, `classicTwoColumn`, `cnsw`, `cnswPrivate`, `sixersThunder`
- **Components**: Display components, game cards, logo variations, metadata components
- **Pagination**: Screen-based pagination with configurable games per screen

---

## Architecture

### Folder Structure

```
src/compositions/cricket/upcoming/
├── .docs/
│   └── how-to.md                    # This guide
├── _types/
│   └── types.ts                     # TypeScript interfaces
├── _utils/
│   └── calculations.ts              # Screen pagination calculations
├── controller/
│   ├── GamesDisplay/
│   │   ├── _types/
│   │   │   └── GamesDisplayProps.ts
│   │   ├── _utils/
│   │   │   └── calculations.ts    # Display calculations
│   │   ├── FixtureDisplayBasic.tsx # Display component for Basic variant
│   │   ├── FixtureDisplayClassic.tsx
│   │   └── ...
│   └── GamesList/
│       ├── _types/
│       │   └── GamesListProps.ts
│       ├── games-list.tsx           # Base games list component
│       ├── games-list-basic.tsx     # Games list for Basic variant
│       └── ...
├── layout/
│   ├── Card/
│   │   ├── _types/
│   │   │   └── GameCardProps.ts
│   │   ├── _utils/
│   │   │   └── calculations.ts    # Animation calculations
│   │   ├── game-card-basic.tsx     # Game card for Basic variant
│   │   ├── game-card-classic.tsx
│   │   └── ...
│   ├── Logos/
│   │   └── variations/
│   │       ├── _types/
│   │       │   └── TeamLayoutProps.ts
│   │       ├── _utils/
│   │       │   ├── animations.ts
│   │       │   └── helpers.ts
│   │       ├── LogoAndName.tsx      # Logo with name below
│   │       ├── LogosOnly.tsx        # Logos only
│   │       ├── MirroredAlignment.tsx
│   │       ├── OppositeAlignment.tsx
│   │       ├── CenteredVerticalStack.tsx
│   │       ├── NameAboveLogo.tsx
│   │       ├── ReversedMirrored.tsx
│   │       ├── common.ts
│   │       └── index.ts
│   └── Meta/
│       ├── _types/
│       │   ├── GradeProps.ts
│       │   ├── GroundProps.ts
│       │   ├── TeamNameProps.ts
│       │   ├── TimeDateGroundProps.ts
│       │   └── ...
│       ├── _utils/
│       │   └── helpers.ts
│       ├── Grade.tsx                # Grade/age group display
│       ├── Ground.tsx                # Ground name display
│       ├── TeamName.tsx              # Team name display
│       ├── TimeDateGround.tsx        # Time, date, ground display
│       ├── TimeGround.tsx            # Time and ground display
│       ├── GradeDate.tsx             # Grade and date display
│       └── SingleDataPointHeader.tsx
├── modules/
│   └── NoGamesData/
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
   - Calculates screen pagination
   - Creates sequences for each screen
   - Uses `TransitionSeriesWrapper` for screen-to-screen transitions

2. **Display Components** (`controller/GamesDisplay/FixtureDisplay-*.tsx`):
   - Variant-specific layout and styling
   - Calculates which games to display for current screen
   - Calculates game card heights dynamically
   - Merges sponsors from displayed games
   - Includes sponsor footer

3. **Games List Components** (`controller/GamesList/games-list-*.tsx`):
   - Variant-specific list rendering
   - Maps over displayed games
   - Renders game card components

4. **Game Card Components** (`layout/Card/game-card-*.tsx`):
   - Variant-specific card layout
   - Composes metadata and logo components
   - Handles staggered animations
   - Uses calculated card height

5. **Logo Layout Variations** (`layout/Logos/variations/`):
   - Multiple layout options for team logos
   - **LogoAndName**: Logo with name below
   - **LogosOnly**: Logos only (no names)
   - **MirroredAlignment**: Mirrored alignment
   - **OppositeAlignment**: Opposite alignment
   - **CenteredVerticalStack**: Centered vertical stack
   - **NameAboveLogo**: Name above logo
   - **ReversedMirrored**: Reversed mirrored

6. **Metadata Components** (`layout/Meta/`):
   - **Grade**: Grade/age group display
   - **Ground**: Ground name display
   - **TeamName**: Team name display
   - **TimeDateGround**: Time, date, ground (3-column)
   - **TimeGround**: Time and ground (2-column)
   - **GradeDate**: Grade and date
   - **SingleDataPointHeader**: Single value header

7. **Types** (`_types/types.ts`):
   - `GameData`: Main game data structure
   - `TeamLogo`: Team logo interface
   - Animation constants

8. **Utils** (`_utils/`, `controller/*/_utils/`):
   - Screen pagination: `getGamesPerScreen()`, `calculateTotalScreens()`
   - Duration calculation: `calculateDisplayDurationPerScreen()`
   - Display calculations: `calculateDisplayedGames()`, `calculateGameCardHeight()`, `mergeAssignSponsors()`
   - Animation calculations: `calculateAnimationDelay()`, `calculateAnimationOutFrame()`

---

## Prerequisites

Before creating a new upcoming games composition, ensure you have:

1. ✅ **Template variants created** (if you need custom styling)
   - See `src/templates/.docs/how-to.md` for creating template variants
   - At minimum, you need `Basic` variant

2. ✅ **Understanding of game data structure**
   - Team names and logos
   - Date and time
   - Ground name
   - Grade/age group
   - Round information
   - Sponsor information

3. ✅ **Access to test data**
   - Sample upcoming games data
   - Multiple games to test pagination
   - Different game configurations

4. ✅ **Understanding of screen pagination**
   - How games per screen is configured
   - How screens are calculated
   - How transitions work between screens

---

## Step-by-Step Guide

### Step 1: Define Data Types

Create `_types/types.ts` in your composition folder.

**Example:** `src/compositions/cricket/upcoming/_types/types.ts`

```typescript
import { AssignSponsors } from "../../_types/composition-types";

// Types for upcoming games data structure
export interface TeamLogo {
  url: string;
  width: number;
  height: number;
}

export interface Sponsor {
  teamAway: string;
  teamHome: string;
}

export interface Grade {
  id: number;
  name: string;
}

export interface Competition {
  id: number | null;
  name: string | null;
}

export interface GameData {
  date: string;
  time: string;
  type: string;
  round: string | null;
  gameID: string;
  gender: string;
  ground: string;
  prompt: string;
  ageGroup: string;
  teamAway: string;
  teamHome: string;
  gradeName: string;
  teamAwayLogo: TeamLogo | null;
  teamHomeLogo: TeamLogo | null;
  assignSponsors: AssignSponsors;
}

// Animation constants
export const HEADER_ANIMATION_DURATION = 45; // 1.5 seconds for header animation
export const CARD_STAGGER_DELAY = 15; // 0.5 seconds stagger between cards
export const CARD_ANIMATION_DURATION = 30; // 1 second for card animation
```

**Key Points:**
- **Game data**: Contains all match fixture information
- **Team logos**: Can be null (optional)
- **Sponsors**: Each game has assignSponsors (merged for footer)
- **Animation constants**: Used for staggered animations

---

### Step 2: Create Helper Utilities

Create `_utils/calculations.ts` for screen pagination and validation.

**Example:** `src/compositions/cricket/upcoming/_utils/calculations.ts`

```typescript
/**
 * Default frame duration if not specified
 */
export const DEFAULT_DISPLAY_DURATION = 300;

/**
 * Default games per screen if not specified in contentLayout
 */
export const DEFAULT_GAMES_PER_SCREEN = 2;

/**
 * Extracts games per screen from contentLayout configuration
 * @param fixturesLayout - Layout configuration object
 * @returns Number of games to display per screen
 */
export const getGamesPerScreen = (
  fixturesLayout?: { CricketUpcoming?: number },
): number => {
  if (
    fixturesLayout &&
    typeof fixturesLayout.CricketUpcoming === "number"
  ) {
    return fixturesLayout.CricketUpcoming;
  }
  return fixturesLayout?.CricketUpcoming || DEFAULT_GAMES_PER_SCREEN;
};

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
 * Validates and checks if games data is valid and non-empty
 * @param gamesData - Games data to validate
 * @returns True if data is valid and has games
 */
export const hasValidGames = (gamesData: unknown): boolean => {
  return (
    gamesData !== null &&
    gamesData !== undefined &&
    Array.isArray(gamesData) &&
    gamesData.length > 0
  );
};

/**
 * Calculates the total number of screens needed based on games count and games per screen
 * @param gamesCount - Total number of games
 * @param gamesPerScreen - Number of games to display per screen
 * @returns Total number of screens needed
 */
export const calculateTotalScreens = (
  gamesCount: number,
  gamesPerScreen: number,
): number => {
  return Math.ceil(gamesCount / gamesPerScreen);
};
```

**Key Points:**
- **Games per screen**: Read from `contentLayout.divideFixturesBy.CricketUpcoming`
- **Duration**: Uses `FPS_SCORECARD` timing or metadata frames
- **Validation**: Checks if data is valid array with items
- **Screen calculation**: Calculates total screens needed

---

### Step 3: Create Display Calculation Utilities

Create `controller/GamesDisplay/_utils/calculations.ts` for display-specific calculations.

**Example:** `src/compositions/cricket/upcoming/controller/GamesDisplay/_utils/calculations.ts`

```typescript
import { GameData } from "../../../_types/types";
import { AssignSponsors } from "../../../../_types/composition-types";

/**
 * Default spacing configuration for game card height calculations
 */
export interface GameCardSpacing {
  headerHeight: number;
  contentPadding: number;
  cardSpacing: number;
}

/**
 * Default spacing values used by most components
 */
export const DEFAULT_SPACING: GameCardSpacing = {
  headerHeight: 100,
  contentPadding: 40,
  cardSpacing: 20,
};

/**
 * Calculates which games should be displayed on the current screen
 * @param games - All available games
 * @param gamesPerScreen - Number of games to show per screen
 * @param screenIndex - Current screen index (0-based)
 * @returns Array of games to display on this screen
 */
export const calculateDisplayedGames = (
  games: GameData[],
  gamesPerScreen: number,
  screenIndex: number,
): GameData[] => {
  const startIndex = screenIndex * gamesPerScreen;
  const endIndex = Math.min(startIndex + gamesPerScreen, games.length);
  return games.slice(startIndex, endIndex);
};

/**
 * Calculates the height for each game card based on available space and spacing configuration
 * @param assetHeight - Total height of the asset
 * @param gamesPerScreen - Number of games displayed per screen
 * @param spacing - Spacing configuration (headerHeight, contentPadding, cardSpacing)
 * @returns Calculated game card height in pixels
 */
export const calculateGameCardHeight = (
  assetHeight: number,
  gamesPerScreen: number,
  spacing: GameCardSpacing = DEFAULT_SPACING,
): number => {
  const { headerHeight, contentPadding, cardSpacing } = spacing;
  const availableHeight = assetHeight - headerHeight - contentPadding;
  return Math.floor(availableHeight / gamesPerScreen - cardSpacing);
};

/**
 * Merges all assignSponsors objects from an array of games into a single object
 * @param games - Array of games with assignSponsors properties
 * @returns Merged AssignSponsors object
 */
export const mergeAssignSponsors = (
  games: GameData[],
): AssignSponsors => {
  return games.reduce(
    (acc, game) => ({ ...acc, ...game.assignSponsors }),
    {} as AssignSponsors,
  );
};
```

**Key Points:**
- **Displayed games**: Slices games array based on screen index
- **Card height**: Calculates dynamically based on games per screen
- **Sponsor merging**: Merges sponsors from all displayed games

---

### Step 4: Create Animation Calculation Utilities

Create `layout/Card/_utils/calculations.ts` for animation calculations.

**Example:** `src/compositions/cricket/upcoming/layout/Card/_utils/calculations.ts`

```typescript
/**
 * Default delay multiplier for animation stagger
 */
export const DEFAULT_DELAY_MULTIPLIER = 15;

/**
 * Default delay multiplier for faster animation stagger (used by basic/brickWork variants)
 */
export const FAST_DELAY_MULTIPLIER = 5;

/**
 * Default FPS_SCORECARD value if not provided in timings
 */
export const DEFAULT_FPS_SCORECARD = 270;

/**
 * Offset to subtract from FPS_SCORECARD for exit frame calculation
 */
export const EXIT_FRAME_OFFSET = 20;

/**
 * Calculates animation delay based on card index
 * @param index - Card index (0-based)
 * @param multiplier - Delay multiplier (default: 15)
 * @returns Animation delay in frames
 */
export const calculateAnimationDelay = (
  index: number,
  multiplier: number = DEFAULT_DELAY_MULTIPLIER,
): number => {
  return index * multiplier;
};

/**
 * Calculates the exit frame for animations based on timings
 * @param timings - Timing configuration object
 * @returns Exit frame number
 */
export const calculateAnimationOutFrame = (timings?: {
  FPS_SCORECARD?: number;
}): number => {
  return (timings?.FPS_SCORECARD || DEFAULT_FPS_SCORECARD) - EXIT_FRAME_OFFSET;
};
```

**Key Points:**
- **Delay calculation**: Uses index * multiplier for staggered animations
- **Multipliers**: Different multipliers for different variants (15 vs 5)
- **Exit frame**: Calculates when exit animation should start

---

### Step 5: Create Empty State Component

Create a component to show when there's no data.

**Example:** `src/compositions/cricket/upcoming/modules/NoGamesData/no-data.tsx`

```typescript
import React from "react";
import { AbsoluteFill } from "remotion";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedText } from "../../../../../components/typography/AnimatedText";

export const NoGamesData: React.FC = () => {
  const { fontClasses } = useThemeContext();

  return (
    <AbsoluteFill className="flex justify-center items-center text-white font-sans">
      <div className="text-center">
        <AnimatedText
          type="mainHeading"
          variant="onBackgroundMain"
          textAlign="center"
          animation={{
            type: "fadeIn",
            duration: 30,
          }}
          fontFamily={fontClasses.heading?.family}
        >
          No Upcoming Games
        </AnimatedText>

        <AnimatedText
          type="subHeading"
          variant="onBackgroundDark"
          textAlign="center"
          animation={{
            type: "fadeIn",
            duration: 30,
            delay: 15,
          }}
          fontFamily={fontClasses.copy?.family}
        >
          There are no scheduled games at this time.
        </AnimatedText>
      </div>
    </AbsoluteFill>
  );
};

export default NoGamesData;
```

**Key Points:**
- **AbsoluteFill**: Uses Remotion's AbsoluteFill for full-screen display
- **Animated text**: Uses AnimatedText component with fade-in animation
- **Theme-aware**: Uses theme context for font classes

---

### Step 6: Create Metadata Components

Create metadata components for displaying game information.

**Example:** `src/compositions/cricket/upcoming/layout/Meta/Ground.tsx`

```typescript
import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MetadataSmall } from "../../../utils/primitives/metadataSmall";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { BottomSectionProps } from "./_types/GroundProps";

export const Ground: React.FC<BottomSectionProps> = ({ ground, delay, backgroundColor }) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container;
  const bgColor = backgroundColor ?? selectedPalette.container.light;

  return (
    <AnimatedContainer
      type="full"
      className={`w-full p-1 flex justify-between`}
      backgroundColor="none"
      style={{
        backgroundColor: bgColor,
      }}
      animation={ContainerAnimations.main.itemContainer.containerIn}
      animationDelay={delay + 10}
    >
      <div className={`grid w-full grid-cols-1 items-center justify-center text-center`}>
        <MetadataSmall
          value={ground}
          animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
          className="text-center"
          variant="onContainerCopyNoBg"
        />
      </div>
    </AnimatedContainer>
  );
};

export default Ground;
```

**Example:** `src/compositions/cricket/upcoming/layout/Meta/TimeDateGround.tsx`

```typescript
import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MetadataSmall } from "../../../utils/primitives/metadataSmall";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { BottomSectionProps } from "./_types/TimeDateGroundProps";

export const TimeDateGround: React.FC<BottomSectionProps> = ({
  time,
  date,
  ground,
  delay,
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container;
  const backgroundColor = selectedPalette.container.light;

  return (
    <AnimatedContainer
      type="full"
      className={`w-full p-3 flex justify-between`}
      backgroundColor="none"
      style={{
        backgroundColor: backgroundColor,
      }}
      animation={ContainerAnimations.main.itemContainer.containerIn}
      animationDelay={delay + 10}
    >
      <div className={`grid w-full grid-cols-3 items-center justify-between text-center`}>
        <MetadataSmall
          value={time}
          animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
          className="text-left"
        />
        <MetadataSmall
          value={date}
          animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
          className="text-center"
        />
        <MetadataSmall
          value={ground}
          animation={{ ...TextAnimations.copyIn, delay: delay + 10 }}
          className="text-right"
        />
      </div>
    </AnimatedContainer>
  );
};

export default TimeDateGround;
```

**Key Points:**
- **Single value**: Ground displays single value (centered)
- **Multiple values**: TimeDateGround displays 3 values (left, center, right)
- **Configurable background**: Can override background color
- **Animated**: Uses AnimatedContainer and MetadataSmall

---

### Step 7: Create Team Name Component

Create the team name component.

**Example:** `src/compositions/cricket/upcoming/layout/Meta/TeamName.tsx`

```typescript
import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { MetadataMedium } from "../../../utils/primitives/metadataMedium";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import {
  TopSectionProps,
  TeamNameWrappedProps,
} from "./_types/TeamNameProps";

export const TeamName: React.FC<TopSectionProps> = ({
  teamName,
  delay,
  delayName = 10,
  style,
  variant = "onContainerCopy",
  className = "text-center",
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const ContainerAnimations = animations.container;
  const { layout } = useThemeContext();

  return (
    <AnimatedContainer
      type="full"
      className={`w-full p-3 ${layout.borderRadius.container}`}
      backgroundColor="none"
      style={style}
      animation={ContainerAnimations.main.itemContainer.containerIn}
      animationDelay={delay}
    >
      <MetadataMedium
        value={`${teamName}`}
        animation={{ ...TextAnimations.copyIn, delay: delayName }}
        className={className}
        variant={variant}
        letterAnimation="none"
      />
    </AnimatedContainer>
  );
};

export default TeamName;
```

**Key Points:**
- **Configurable**: Accepts style, variant, className props
- **Separate delays**: Container and text can have different delays
- **Theme-aware**: Uses theme context for border radius

---

### Step 8: Create Logo Layout Variations

Create logo layout variation components.

**Example:** `src/compositions/cricket/upcoming/layout/Logos/variations/LogoAndName.tsx`

```typescript
import React from "react";
import TeamLogo from "../../../../utils/primitives/TeamLogo";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { MetadataMedium } from "../../../../utils/primitives/metadataMedium";
import { TeamLayoutProps } from "./_types/TeamLayoutProps";
import { LOGO_SIZES } from "./_utils/helpers";
import { useLayoutAnimations } from "./_utils/animations";

export const LogoAndName: React.FC<TeamLayoutProps> = ({
  teamHome,
  teamAway,
  teamHomeLogo,
  teamAwayLogo,
  delay,
  vsAdditionalInfo,
}) => {
  const { metaDataAnimation, containerAnimation } = useLayoutAnimations(delay);

  return (
    <AnimatedContainer
      type="full"
      className="flex items-center justify-center w-full bg-black/20 p-2"
      backgroundColor="none"
      animation={containerAnimation}
      animationDelay={delay + 5}
    >
      {/* Home Team */}
      <div className="flex-1 flex flex-col items-center">
        <div
          className={`${LOGO_SIZES.large.container} overflow-hidden rounded-full p-1 mb-2`}
        >
          <TeamLogo
            logo={teamHomeLogo}
            teamName={teamHome}
            delay={delay + 5}
            size={LOGO_SIZES.large.size}
          />
        </div>
        <div className="w-full px-8 text-center">
          <MetadataMedium
            value={`${teamHome}`}
            animation={metaDataAnimation}
            className="text-center"
            variant="onBackgroundMain"
          />
        </div>
      </div>
      {/* VS */}
      <div className="mx-6 flex flex-col items-center">
        <MetadataMedium
          value={`VS`}
          animation={metaDataAnimation}
          className="text-center"
          variant="onBackgroundMain"
        />
        {vsAdditionalInfo && (
          <MetadataMedium
            value={vsAdditionalInfo}
            animation={metaDataAnimation}
            className="text-center mt-1"
            variant="onBackgroundMain"
          />
        )}
      </div>
      {/* Away Team */}
      <div className="flex-1 flex flex-col items-center">
        <div
          className={`${LOGO_SIZES.large.container} overflow-hidden rounded-full p-1 mb-2`}
        >
          <TeamLogo
            logo={teamAwayLogo}
            teamName={teamAway}
            delay={delay + 10}
            size={LOGO_SIZES.large.size}
          />
        </div>
        <div className="w-full px-8 text-center">
          <MetadataMedium
            value={`${teamAway}`}
            animation={metaDataAnimation}
            className="text-center"
            variant="onBackgroundMain"
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};
```

**Key Points:**
- **Three sections**: Home team, VS, Away team
- **Logo and name**: Logo above team name
- **VS section**: Can include additional info
- **Staggered delays**: Different delays for home/away logos

---

### Step 9: Create Basic Game Card Component

Create the game card component for the Basic variant.

**Example:** `src/compositions/cricket/upcoming/layout/Card/game-card-basic.tsx`

```typescript
import React from "react";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import Ground from "../Meta/Ground";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import TeamLogo from "../../../utils/primitives/TeamLogo";
import TeamName from "../Meta/TeamName";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { GameCardProps } from "./_types/GameCardProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  FAST_DELAY_MULTIPLIER,
} from "./_utils/calculations";
import { MetadataMedium } from "../../../utils/primitives/metadataMedium";
import { LOGO_SIZES } from "../Logos/variations/_utils/helpers";

export const GameCardBasic: React.FC<GameCardProps> = ({ game, index }) => {
  const { data } = useVideoDataContext();
  const { timings } = data;
  const { animations } = useAnimationContext();
  const { selectedPalette, layout } = useThemeContext();

  const ContainerAnimations = animations.container;

  // Animation delay based on card index
  const delay = calculateAnimationDelay(index, FAST_DELAY_MULTIPLIER);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  return (
    <div className="overflow-hidden my-2">
      <AnimatedContainer
        type="full"
        className="rounded-lg"
        backgroundColor="none"
        animation={ContainerAnimations.main.itemContainer.containerIn}
        animationDelay={delay}
        exitAnimation={ContainerAnimations.main.itemContainer.containerOut}
        exitFrame={animationOutFrame}
      >
        <div className="rounded-lg w-full overflow-hidden">
          {/* Grade Section - Top */}
          <Ground
            ground={game.gradeName}
            delay={delay}
            backgroundColor="transparent"
          />
          {/* Team Names Section */}
          <TeamName
            teamName={game.teamHome}
            delay={delay}
            style={{
              background:
                selectedPalette.container.backgroundTransparent.strong,
              textAlign: "center",
              borderRadius: "10px 10px 0 0px",
            }}
          />

          {/* Teams Section - Middle */}
          <AnimatedContainer
            type="full"
            className={`flex items-center justify-center w-full bg-black/20 p-1 ${layout.borderRadius.container}`}
            animation={ContainerAnimations.main.itemContainerSecondary.containerIn}
            animationDelay={delay}
            style={{
              background: selectedPalette.container.backgroundTransparent.low,
            }}
          >
            {/* Home Team Logo */}
            <div className="flex-1 flex flex-col items-center">
              <div
                className={`${LOGO_SIZES.large.container} overflow-hidden rounded-full p-1`}
              >
                <TeamLogo
                  logo={game.teamHomeLogo}
                  teamName={game.teamHome}
                  delay={delay + 15}
                  size={LOGO_SIZES.large.size}
                />
              </div>
            </div>

            {/* Middle Section: VS, Ground, Date, Time */}
            <div className="mx-6 flex flex-col items-center">
              {/* VS */}
              <MetadataMedium
                value="VS"
                animation={{
                  ...animations.text.main.copyIn,
                  delay: delay + 20,
                }}
                className="text-center mb-1"
                variant="onContainerCopy"
              />
              {/* Ground */}
              <MetadataMedium
                value={game.ground}
                animation={{
                  ...animations.text.main.copyIn,
                  delay: delay + 20,
                }}
                className="text-center my-0"
                variant="onContainerCopy"
              />
              {/* Date and Time */}
              <div className="flex items-center gap-2 mt-1">
                <MetadataMedium
                  value={game.date}
                  animation={{
                    ...animations.text.main.copyIn,
                    delay: delay + 20,
                  }}
                  className="text-center"
                  variant="onContainerCopy"
                />
                <MetadataMedium
                  value={game.time}
                  animation={{
                    ...animations.text.main.copyIn,
                    delay: delay + 20,
                  }}
                  className="text-center"
                  variant="onContainerCopy"
                />
              </div>
            </div>

            {/* Away Team Logo */}
            <div className="flex-1 flex flex-col items-center">
              <div
                className={`${LOGO_SIZES.large.container} overflow-hidden rounded-full p-1`}
              >
                <TeamLogo
                  logo={game.teamAwayLogo}
                  teamName={game.teamAway}
                  delay={delay + 20}
                  size={LOGO_SIZES.large.size}
                />
              </div>
            </div>
          </AnimatedContainer>
          <TeamName
            teamName={game.teamAway}
            delay={delay}
            style={{
              background:
                selectedPalette.container.backgroundTransparent.strong,
              textAlign: "center",
              borderRadius: "0 0 10px 10px",
            }}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default GameCardBasic;
```

**Key Points:**
- **Card structure**: Grade → Home Team Name → Logos/Metadata → Away Team Name
- **Logo section**: Home logo, VS/Ground/Date/Time, Away logo
- **Staggered animations**: Different delays for different elements
- **Theme-aware**: Uses theme context for colors and border radius

---

### Step 10: Create Games List Component

Create the games list component.

**Example:** `src/compositions/cricket/upcoming/controller/GamesList/games-list-basic.tsx`

```typescript
import React from "react";
import GameCardBasic from "../../layout/Card/game-card-basic";
import { GamesListProps } from "./_types/GamesListProps";

export const GamesListBasic: React.FC<GamesListProps> = ({ games }) => {
  return (
    <div className="flex flex-col w-full">
      {games.map((game, index) => (
        <GameCardBasic key={game.gameID} game={game} index={index} />
      ))}
    </div>
  );
};

export default GamesListBasic;
```

**Key Points:**
- **Simple mapping**: Maps over games array
- **Key prop**: Uses `game.gameID` as key
- **Index prop**: Passes index to game card for animation delays

---

### Step 11: Create Display Component

Create the display component for the Basic variant.

**Example:** `src/compositions/cricket/upcoming/controller/GamesDisplay/FixtureDisplayBasic.tsx`

```typescript
import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { SponsorFooter } from "../../../sponsorFooter";
import { AssignSponsors } from "../../../_types/composition-types";
import GamesListBasic from "../GamesList/games-list-basic";
import { GamesDisplayProps } from "./_types/GamesDisplayProps";
import {
  calculateDisplayedGames,
  calculateGameCardHeight,
  mergeAssignSponsors,
} from "./_utils/calculations";

export const GamesDisplayBasic: React.FC<GamesDisplayProps> = ({
  games,
  gamesPerScreen,
  screenIndex,
  heights = { asset: 1080 },
}) => {
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  // Calculate which games to show on this screen
  const displayedGames = calculateDisplayedGames(
    games,
    gamesPerScreen,
    screenIndex,
  );

  // Calculate game card heights
  const gameCardHeight = calculateGameCardHeight(
    heights.asset,
    gamesPerScreen,
  );

  // Merge all assignSponsors objects from displayedGames into one object
  const mergedAssignSponsors = mergeAssignSponsors(displayedGames);
  
  return (
    <div className="p-0 flex flex-col w-full h-full justify-center">
      <AnimatedContainer
        type="full"
        className="flex flex-col mx-8 overflow-hidden"
        backgroundColor="none"
        animation={ContainerAnimations.main.parent.containerIn}
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 overflow-hidden">
          <GamesListBasic
            games={displayedGames}
            gameRowHeight={gameCardHeight}
          />
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter
          assignSponsors={mergedAssignSponsors as unknown as AssignSponsors}
        />
      </div>
    </div>
  );
};

export default GamesDisplayBasic;
```

**Key Points:**
- **Screen calculation**: Calculates which games to display for current screen
- **Card height**: Calculates card height based on games per screen
- **Sponsor merging**: Merges sponsors from all displayed games
- **Sponsor footer**: Includes footer at bottom

---

### Step 12: Create Variant Entry Point

Create the main component file for your first variant (e.g., `basic.tsx`).

**Example:** `src/compositions/cricket/upcoming/basic.tsx`

```typescript
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import GamesDisplayBasic from "./controller/GamesDisplay/FixtureDisplayBasic";
import NoGamesData from "./modules/NoGamesData/no-data";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import { GameData } from "./_types/types";
import {
  getGamesPerScreen,
  calculateDisplayDurationPerScreen,
  hasValidGames,
  calculateTotalScreens,
} from "./_utils/calculations";

export const UpcomingGamesWithTransitions: React.FC = () => {
  const { data, contentLayout, metadata } = useVideoDataContext();
  const { data: CompositionData, timings } = data;

  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  // Extract metadata from video data
  const fixturesLayout = contentLayout.divideFixturesBy || {};

  // Get games per screen from contentLayout
  const gamesPerScreen = getGamesPerScreen(fixturesLayout);

  // Get frame duration from metadata if available
  const frameOptions = metadata.frames || [300];
  const displayDurationPerScreen = calculateDisplayDurationPerScreen(
    timings,
    frameOptions,
  );

  // If no data is available, show a placeholder
  if (!hasValidGames(CompositionData)) {
    return <NoGamesData />;
  }

  // Calculate how many screens we need based on games per screen
  const totalScreens = calculateTotalScreens(
    CompositionData.length,
    gamesPerScreen,
  );

  // Create sequence data for each screen
  const sequences = Array.from({ length: totalScreens }, (_, index) => ({
    content: (
      <GamesDisplayBasic
        games={CompositionData as GameData[]}
        gamesPerScreen={gamesPerScreen}
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

// Export as Basic for compatibility with template system
export const Basic: React.FC = () => {
  return <UpcomingGamesWithTransitions />;
};

export default Basic;
```

**Key Points:**
- **Screen pagination**: Calculates total screens based on games per screen
- **Sequence creation**: Creates one sequence per screen
- **Transitions**: Uses `TransitionSeriesWrapper` for screen-to-screen transitions
- **Duration**: Same duration for all screens

---

### Step 13: Export from Composition Index

Create or update `index.tsx` to export your variant.

**Example:** `src/compositions/cricket/upcoming/index.tsx`

```typescript
import { Basic as BasicUpcomingGames } from "./basic";
// Import other variants as you create them
// import { Classic as ClassicUpcomingGames } from "./classic";
// import { BrickWork as BrickWorkUpcomingGames } from "./brickWork";

// Export all template implementations
export {
  BasicUpcomingGames as basic,
  // Add more as you create them:
  // ClassicUpcomingGames as classic,
  // BrickWorkUpcomingGames as brickWork,
};
```

---

### Step 14: Add to Sport Module Export

Add your composition to the sport's main index file.

**Example:** `src/compositions/cricket/index.tsx`

```typescript
// Import upcoming games variants
import {
  basic as upcomingBasic,
  // Add more variants as you create them
} from "./upcoming";

// ... other composition imports

// Export implementations for all composition types
export const CricketUpcoming = {
  basic: upcomingBasic,
  // Add more variants as you create them:
  // classic: upcomingClassic,
  // brickwork: upcomingBrickWork,
};
```

**Important:** The export name MUST match the `compositionId` in your JSON test data (e.g., "CricketUpcoming").

---

## Screen Pagination System

### How Pagination Works

1. **Games Per Screen Configuration**:
   ```typescript
   const fixturesLayout = contentLayout.divideFixturesBy || {};
   const gamesPerScreen = getGamesPerScreen(fixturesLayout);
   // Reads from contentLayout.divideFixturesBy.CricketUpcoming
   ```

2. **Total Screens Calculation**:
   ```typescript
   const totalScreens = calculateTotalScreens(
     CompositionData.length,
     gamesPerScreen,
   );
   // Returns: Math.ceil(gamesCount / gamesPerScreen)
   ```

3. **Screen-to-Screen Transitions**:
   ```typescript
   const sequences = Array.from({ length: totalScreens }, (_, index) => ({
     content: (
       <GamesDisplayBasic
         games={CompositionData}
         gamesPerScreen={gamesPerScreen}
         screenIndex={index}
       />
     ),
     durationInFrames: displayDurationPerScreen,
   }));
   ```

4. **Displayed Games Calculation**:
   ```typescript
   const displayedGames = calculateDisplayedGames(
     games,
     gamesPerScreen,
     screenIndex,
   );
   // Returns: games.slice(startIndex, endIndex)
   ```

### Example: 5 Games, 2 Per Screen

- **Screen 0**: Games 0-1 (2 games)
- **Screen 1**: Games 2-3 (2 games)
- **Screen 2**: Game 4 (1 game)
- **Total Screens**: 3
- **Transitions**: Between each screen

---

## Display Components

### Structure

Display components (`controller/GamesDisplay/FixtureDisplay-*.tsx`):
- Calculate which games to display for current screen
- Calculate game card heights dynamically
- Merge sponsors from displayed games
- Create games list with calculated heights
- Include sponsor footer

### Card Height Calculation

Card heights are calculated dynamically based on:
- Total asset height
- Games per screen
- Header height
- Content padding
- Card spacing

**Formula:**
```typescript
const availableHeight = assetHeight - headerHeight - contentPadding;
const gameCardHeight = Math.floor(availableHeight / gamesPerScreen - cardSpacing);
```

---

## Game Card Components

### Structure

Game card components (`layout/Card/game-card-*.tsx`):
- Composes metadata components (Grade, Ground, TeamName)
- Composes logo layout variations
- Handles staggered animations
- Uses calculated card height
- Applies theme colors and styles

### Card Layout Pattern (Basic)

```
┌─────────────────────────────────┐
│ Grade Name                      │ ← Ground component
├─────────────────────────────────┤
│ Home Team Name                  │ ← TeamName component
├─────────────────────────────────┤
│ [Home Logo] │ VS │ [Away Logo] │ ← Logo section
│             │ Ground            │
│             │ Date Time         │
├─────────────────────────────────┤
│ Away Team Name                  │ ← TeamName component
└─────────────────────────────────┘
```

### Card Layout Variations

Different variants use different layouts:
- **Basic**: Grade → Home Name → Logos/Metadata → Away Name
- **Classic**: Similar structure with different styling
- **ClassicTwoColumn**: Two-column layout
- **CNSW**: CNSW-specific layout
- **SixersThunder**: Sixers/Thunder-specific layout

---

## Logo Layout Variations

### Available Variations

1. **LogoAndName** (`LogoAndName.tsx`):
   - Logo above team name
   - VS in middle with optional additional info
   - Used in many variants

2. **LogosOnly** (`LogosOnly.tsx`):
   - Logos only (no team names)
   - Multiple positioning options (center, split, together)

3. **MirroredAlignment** (`MirroredAlignment.tsx`):
   - Mirrored alignment for logos

4. **OppositeAlignment** (`OppositeAlignment.tsx`):
   - Opposite alignment for logos

5. **CenteredVerticalStack** (`CenteredVerticalStack.tsx`):
   - Centered vertical stack layout

6. **NameAboveLogo** (`NameAboveLogo.tsx`):
   - Team name above logo

7. **ReversedMirrored** (`ReversedMirrored.tsx`):
   - Reversed mirrored alignment

### Logo Sizes

Logo sizes are defined in `layout/Logos/variations/_utils/helpers.ts`:

```typescript
export const LOGO_SIZES = {
  large: { container: "w-35 h-35", size: 35 },
  medium: { container: "w-20 h-20", size: 20 },
  small: { container: "w-16 h-16", size: 16 },
};
```

---

## Metadata Components

### Available Components

1. **Grade** (`Grade.tsx`):
   - Displays age group and grade name
   - Single centered value

2. **Ground** (`Ground.tsx`):
   - Displays ground name
   - Single centered value
   - Configurable background color

3. **TeamName** (`TeamName.tsx`):
   - Displays team name
   - Configurable style, variant, className
   - Separate delays for container and text

4. **TimeDateGround** (`TimeDateGround.tsx`):
   - Displays time, date, ground (3-column grid)
   - Left, center, right alignment

5. **TimeGround** (`TimeGround.tsx`):
   - Displays time and ground (2-column grid)
   - Left and right alignment

6. **GradeDate** (`GradeDate.tsx`):
   - Displays grade and date
   - Two-column layout

7. **SingleDataPointHeader** (`SingleDataPointHeader.tsx`):
   - Single value header
   - Configurable alignment

---

## Sponsor Merging

### Concept

Each game has its own `assignSponsors` object. For the sponsor footer, all sponsors from displayed games on the current screen are merged into a single object.

### Implementation

**Helper Function:** `mergeAssignSponsors(games)`

```typescript
export const mergeAssignSponsors = (
  games: GameData[],
): AssignSponsors => {
  return games.reduce(
    (acc, game) => ({ ...acc, ...game.assignSponsors }),
    {} as AssignSponsors,
  );
};
```

**Usage:**
```typescript
const mergedAssignSponsors = mergeAssignSponsors(displayedGames);

<SponsorFooter assignSponsors={mergedAssignSponsors} />
```

---

## Creating Variant Implementations

Once you have the Basic variant working, create additional variants:

1. **Create Display Component** (`controller/GamesDisplay/FixtureDisplay-{Variant}.tsx`)
2. **Create Games List Component** (`controller/GamesList/games-list-{Variant}.tsx`)
3. **Create Game Card Component** (`layout/Card/game-card-{Variant}.tsx`)
4. **Create Variant Entry Point** (`{variant}.tsx`)
5. **Export from Index** (`index.tsx`)
6. **Export from Sport Module** (`src/compositions/cricket/index.tsx`)

### Variant-Specific Considerations

- **Logo layout**: Choose appropriate logo variation
- **Metadata layout**: Choose appropriate metadata components
- **Card structure**: May vary by variant
- **Styling**: Match template variant design
- **Animation delays**: May use different multipliers (15 vs 5)

---

## Animation Patterns

### Staggered Card Entry

Cards animate in with staggered delays:

```typescript
const delay = calculateAnimationDelay(index, FAST_DELAY_MULTIPLIER);
// FAST_DELAY_MULTIPLIER = 5 (for basic/brickWork)
// DEFAULT_DELAY_MULTIPLIER = 15 (for other variants)
```

### Element Animation Delays

Within each card, elements animate with increasing delays:

```typescript
delay + 10  // Ground, metadata
delay + 15  // Logos
delay + 20  // VS, text elements
```

### Exit Animation

Exit animations start before screen ends:

```typescript
const exitFrame = calculateAnimationOutFrame(timings);
// Returns: FPS_SCORECARD - EXIT_FRAME_OFFSET (20 frames)
```

---

## Hooking Up to Routing

### Composition ID

The routing system recognizes:
- `CricketUpcoming`

### Routing Configuration

**Check:** `src/core/utils/routing.tsx`

```typescript
const SPORT_COMPOSITION_TYPES: SportCompositionTypes = {
  cricket: {
    CricketUpcoming: "CricketUpcoming",
    // ... other composition types
  },
};
```

---

## Common Patterns

### Pattern 1: Screen-to-Screen Rendering

```typescript
const sequences = Array.from({ length: totalScreens }, (_, index) => ({
  content: (
    <GamesDisplayBasic
      games={CompositionData}
      gamesPerScreen={gamesPerScreen}
      screenIndex={index}
    />
  ),
  durationInFrames: displayDurationPerScreen,
}));

return (
  <TransitionSeriesWrapper
    sequences={sequences}
    // ... transition config
  />
);
```

### Pattern 2: Displayed Games Calculation

```typescript
const displayedGames = calculateDisplayedGames(
  games,
  gamesPerScreen,
  screenIndex,
);
```

### Pattern 3: Card Height Calculation

```typescript
const gameCardHeight = calculateGameCardHeight(
  heights.asset,
  gamesPerScreen,
);
```

### Pattern 4: Sponsor Merging

```typescript
const mergedAssignSponsors = mergeAssignSponsors(displayedGames);

<SponsorFooter assignSponsors={mergedAssignSponsors} />
```

### Pattern 5: Game Card Rendering

```typescript
{games.map((game, index) => (
  <GameCardBasic
    key={game.gameID}
    game={game}
    index={index}
  />
))}
```

---

## Testing

### Test Data Structure

```typescript
const testGame: GameData = {
  date: "2024-01-15",
  time: "14:00",
  type: "T20",
  round: "Round 1",
  gameID: "12345",
  gender: "Men",
  ground: "Ground Name",
  prompt: "",
  ageGroup: "Senior",
  teamAway: "Team A",
  teamHome: "Team B",
  gradeName: "Grade A",
  teamAwayLogo: {
    url: "https://example.com/logo-a.png",
    width: 100,
    height: 100,
  },
  teamHomeLogo: {
    url: "https://example.com/logo-b.png",
    width: 100,
    height: 100,
  },
  assignSponsors: { /* ... */ },
};
```

### Test Scenarios

1. **Screen Pagination**: Test with different games per screen values
2. **Multiple Screens**: Test with many games (5+ games)
3. **Edge Cases**: Empty data, single game, exact multiple of games per screen
4. **Card Heights**: Verify cards fit correctly on screen
5. **Sponsor Merging**: Verify sponsors merge correctly
6. **Transitions**: Verify transitions between screens work

---

## Troubleshooting

### Issue: Wrong Games Displayed on Screen

**Error:** Wrong games showing on a screen

**Solutions:**
1. Check `calculateDisplayedGames()` logic
2. Verify `screenIndex` is passed correctly
3. Check `gamesPerScreen` value is correct
4. Verify games array slicing logic

### Issue: Card Heights Don't Fit

**Error:** Cards overflow or don't fill available space

**Solutions:**
1. Check `calculateGameCardHeight()` calculation
2. Verify `DEFAULT_SPACING` values are appropriate
3. Check `headerHeight`, `contentPadding`, `cardSpacing` constants
4. Verify games per screen matches configuration

### Issue: Sponsors Not Showing

**Error:** Sponsor footer not displaying

**Solutions:**
1. Check `mergeAssignSponsors()` function
2. Verify `assignSponsors` exists in game data
3. Check sponsor footer component is included
4. Verify merged sponsors object is passed correctly

### Issue: Transitions Not Working

**Error:** No transitions between screens or transition errors

**Solutions:**
1. Check `TransitionSeriesWrapper` usage
2. Verify animation config is available
3. Check duration calculation returns valid number
4. Verify sequences array has multiple items

### Issue: Logo Layout Not Working

**Error:** Logo variation not displaying correctly

**Solutions:**
1. Check logo variation component is imported correctly
2. Verify logo props are passed correctly
3. Check logo sizes are appropriate
4. Verify logo URLs are valid

---

## Quick Reference

### File Checklist

- [ ] `_types/types.ts` - Data type definitions
- [ ] `_utils/calculations.ts` - Screen pagination calculations
- [ ] `controller/GamesDisplay/_utils/calculations.ts` - Display calculations
- [ ] `controller/GamesDisplay/FixtureDisplay-{Variant}.tsx` - Display component
- [ ] `controller/GamesList/games-list-{Variant}.tsx` - Games list component
- [ ] `layout/Card/_utils/calculations.ts` - Animation calculations
- [ ] `layout/Card/game-card-{Variant}.tsx` - Game card component
- [ ] `layout/Meta/` - Metadata components (Grade, Ground, TeamName, etc.)
- [ ] `layout/Logos/variations/` - Logo layout variations
- [ ] `modules/NoGamesData/no-data.tsx` - Empty state component
- [ ] `{variant}.tsx` - Variant entry point
- [ ] `index.tsx` - Composition exports
- [ ] Updated `src/compositions/cricket/index.tsx` - Sport module export

### Key Functions

```typescript
// Screen pagination
getGamesPerScreen(fixturesLayout): number
calculateTotalScreens(gamesCount, gamesPerScreen): number
calculateDisplayDurationPerScreen(timings, frameOptions): number
hasValidGames(gamesData): boolean

// Display calculations
calculateDisplayedGames(games, gamesPerScreen, screenIndex): GameData[]
calculateGameCardHeight(assetHeight, gamesPerScreen, spacing): number
mergeAssignSponsors(games): AssignSponsors

// Animation calculations
calculateAnimationDelay(index, multiplier): number
calculateAnimationOutFrame(timings): number
```

### Constants

- **DEFAULT_GAMES_PER_SCREEN**: 2
- **DEFAULT_DISPLAY_DURATION**: 300 frames
- **DEFAULT_DELAY_MULTIPLIER**: 15 frames
- **FAST_DELAY_MULTIPLIER**: 5 frames
- **EXIT_FRAME_OFFSET**: 20 frames
- **DEFAULT_SPACING**: { headerHeight: 100, contentPadding: 40, cardSpacing: 20 }

### Logo Layout Variations

- **LogoAndName**: Logo with name below
- **LogosOnly**: Logos only
- **MirroredAlignment**: Mirrored alignment
- **OppositeAlignment**: Opposite alignment
- **CenteredVerticalStack**: Centered vertical stack
- **NameAboveLogo**: Name above logo
- **ReversedMirrored**: Reversed mirrored

### Metadata Components

- **Grade**: Age group and grade name
- **Ground**: Ground name
- **TeamName**: Team name
- **TimeDateGround**: Time, date, ground (3-column)
- **TimeGround**: Time and ground (2-column)
- **GradeDate**: Grade and date
- **SingleDataPointHeader**: Single value header

---

## Summary

Creating an upcoming games composition involves:

1. **Defining types** for game data
2. **Creating utilities** for screen pagination, display calculations, and animations
3. **Building metadata components** (Grade, Ground, TeamName, etc.)
4. **Building logo layout variations** (multiple options)
5. **Building game card components** that compose metadata and logos
6. **Building games list components** that render game cards
7. **Building display components** that handle screen pagination
8. **Implementing screen-to-screen transitions** using TransitionSeriesWrapper
9. **Merging sponsors** from displayed games for footer

### Key Implementation Details

**Screen Pagination:**
- Games per screen read from `contentLayout.divideFixturesBy.CricketUpcoming`
- Total screens calculated: `Math.ceil(gamesCount / gamesPerScreen)`
- Displayed games sliced: `games.slice(startIndex, endIndex)`

**Card Height Calculation:**
- Dynamic calculation based on games per screen
- Formula: `(assetHeight - headerHeight - contentPadding) / gamesPerScreen - cardSpacing`

**Sponsor Merging:**
- Merges `assignSponsors` from all displayed games
- Uses `reduce()` to combine objects
- Passed to SponsorFooter component

**Card Layout:**
- Grade → Home Team Name → Logos/Metadata → Away Team Name
- Middle section: Home Logo | VS/Ground/Date/Time | Away Logo
- Variant-specific styling and layout

The Basic variant serves as a reference implementation showing all these patterns working together.

---

**Last Updated:** 2026-02-08

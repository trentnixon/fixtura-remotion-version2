# How to Create a New Team Roster Composition Asset Type

This guide explains how to create a new **team roster composition asset type** (like `CricketTeamRoster`) from scratch. This composition type displays team rosters (lists of player names) for matches, with team logos, metadata, and sponsor information.

**Last Updated:** 2026-02-08

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Roster-to-Roster Transitions](#roster-to-roster-transitions)
6. [Display Components](#display-components)
7. [Layout Components](#layout-components)
8. [Team Perspective System](#team-perspective-system)
9. [Player Name Truncation](#player-name-truncation)
10. [Metadata Components](#metadata-components)
11. [Sponsor Display](#sponsor-display)
12. [Creating Variant Implementations](#creating-variant-implementations)
13. [Animation Patterns](#animation-patterns)
14. [Hooking Up to Routing](#hooking-up-to-routing)
15. [Common Patterns](#common-patterns)
16. [Testing](#testing)
17. [Troubleshooting](#troubleshooting)
18. [Quick Reference](#quick-reference)

---

## Overview

### What is a Team Roster Composition?

A **team roster composition** is a sport-specific content type that displays:
- **Team roster** (array of player names)
- **Team logos** (account holder team and opponent team)
- **Match metadata** (date, ground, grade, round)
- **VS indicator** (visual separator between teams)
- **Sponsor logos** (optional, fixture-specific sponsors)
- **Roster-to-roster transitions** using `Series` component

### Key Characteristics

| Aspect | Team Roster |
|--------|-------------|
| **Layout** | Player list + team headers side-by-side |
| **Rosters Per Screen** | 1 roster per sequence |
| **Transitions** | Series-based transitions between rosters |
| **Player Names** | Truncated intelligently (first initial + last name) |
| **Team Perspective** | Account holder vs against team |
| **Metadata** | Date/ground (top), grade/round (bottom) |

### Example: Cricket Team Roster Composition

The `CricketTeamRoster` composition:
- **Data Type**: `RosterDataItem[]` - array of roster items
- **Structure**: Each roster has teams, player list, logos, metadata, sponsors
- **Variants**: `basic`, `classic`, `classicTwoColumn`, `sixersThunder`
- **Components**: Display components, player list, team headers, metadata, sponsors
- **Transitions**: One sequence per roster item

---

## Architecture

### Folder Structure

```
src/compositions/cricket/teamRoster/
├── .docs/
│   └── how-to.md                    # This guide
├── _types/
│   └── types.ts                     # TypeScript interfaces
├── _utils/
│   ├── constants.ts                 # Default duration constants
│   └── dataHelpers.ts              # Data validation and duration calculation
├── controller/
│   └── Display/
│       ├── _types/
│       │   └── RosterDisplayProps.ts
│       ├── _utils/
│       │   ├── animations.ts        # Animation configurations
│       │   ├── constants.ts         # Logo sizes, heights
│       │   └── helpers.ts          # Height and color helpers
│       ├── display.tsx              # Display component for Basic variant
│       ├── display-classic.tsx      # Display component for Classic variant
│       ├── display-classic-two-column.tsx
│       ├── display-sixers-thunder.tsx
│       └── readMe.md
├── layout/
│   ├── Metadata/
│   │   ├── _types/
│   │   │   ├── TwoMetaValuesProps.ts
│   │   │   └── VSProps.ts
│   │   ├── _utils/
│   │   │   ├── constants.ts
│   │   │   └── helpers.ts
│   │   ├── TwoMetaValues.tsx        # Date/ground, grade/round display
│   │   └── VS.tsx                   # VS indicator component
│   ├── RosterHeader/
│   │   ├── accountHolder/
│   │   │   ├── _types/
│   │   │   │   ├── AccountTeamProps.ts
│   │   │   │   └── AgainstTeamProps.ts
│   │   │   ├── _utils/
│   │   │   │   ├── constants.ts
│   │   │   │   └── helpers.ts
│   │   │   ├── LargeTeamHeader.tsx  # Account holder team header
│   │   │   └── SmallOpponentCard.tsx
│   │   ├── Against/
│   │   │   ├── _types/
│   │   │   │   ├── AccountTeamProps.ts
│   │   │   │   └── AgainstTeamProps.ts
│   │   │   ├── _utils/
│   │   │   │   ├── constants.ts
│   │   │   │   └── helpers.ts
│   │   │   ├── LargeTeamHeader.tsx  # Against team header
│   │   │   └── SmallOpponentCard.tsx
│   │   └── index.ts                 # Exports
│   ├── RosterPlayerList/
│   │   ├── _types/
│   │   │   ├── RosterPlayerListProps.ts
│   │   │   └── RosterSponsorsProps.ts
│   │   ├── _utils/
│   │   │   └── constants.ts
│   │   ├── playerList.tsx           # Player list component
│   │   └── Opposition.tsx
│   ├── RosterSponsors/
│   │   ├── _types/
│   │   │   └── RosterSponsorsProps.ts
│   │   ├── _utils/
│   │   │   └── constants.ts
│   │   └── sponsors.tsx             # Sponsor display component
│   ├── types.ts
│   └── utils.ts                     # Team perspective, name truncation
├── modules/
│   └── NoData/
│       └── no-data.tsx              # Empty state component
├── basic.tsx                        # Basic variant entry point
├── classic.tsx                      # Classic variant entry point
├── classicTwoColumn.tsx             # ClassicTwoColumn variant entry point
├── sixersThunder.tsx               # SixersThunder variant entry point
├── index.tsx                        # Exports all variants
└── readMe.md                        # Folder documentation
```

### Key Concepts

1. **Variant Entry Points** (`basic.tsx`, `classic.tsx`, etc.):
   - Main component that handles data fetching, validation
   - Creates one sequence per roster item
   - Uses `Series` component for roster-to-roster transitions
   - Includes sponsor display (optional)

2. **Display Components** (`controller/Display/display-*.tsx`):
   - Variant-specific layout and styling
   - Composes layout components (player list, headers, metadata)
   - Handles spacing and background colors
   - Uses fixed or calculated heights

3. **Layout Components** (`layout/`):
   - **RosterPlayerList**: Displays list of player names
   - **RosterHeader**: Team logos and names (account holder vs against)
   - **Metadata**: Date/ground, grade/round, VS indicator
   - **RosterSponsors**: Sponsor logos (optional)

4. **Types** (`_types/types.ts`):
   - `RosterDataItem`: Main roster data structure
   - `Sponsor`: Sponsor information
   - Team perspective interfaces

5. **Utils** (`_utils/`, `layout/utils.ts`):
   - Data validation: `hasValidRosterData()`
   - Data casting: `castToRosterDataArray()`
   - Duration calculation: `calculateRosterDuration()`
   - Team perspective: `getTeamPerspective()`
   - Name truncation: `truncatePlayerName()`, `truncateText()`

---

## Prerequisites

Before creating a new team roster composition, ensure you have:

1. ✅ **Template variants created** (if you need custom styling)
   - See `src/templates/.docs/how-to.md` for creating template variants
   - At minimum, you need `Basic` variant

2. ✅ **Understanding of roster data structure**
   - Team names and logos
   - Player name array
   - Match metadata (date, ground, grade, round)
   - Sponsor information
   - Home/away team flags

3. ✅ **Access to test data**
   - Sample roster data
   - Multiple rosters to test transitions
   - Different team configurations

4. ✅ **Understanding of Series transitions**
   - One roster per sequence
   - Transitions between sequences

---

## Step-by-Step Guide

### Step 1: Define Data Types

Create `_types/types.ts` in your composition folder.

**Example:** `src/compositions/cricket/teamRoster/_types/types.ts`

```typescript
export interface Sponsor {
  id: number;
  isPrimary: boolean;
  isActive: boolean;
  isArticle: boolean;
  isVideo: boolean;
  url: string;
  tagline: string;
  description: string | null;
  name: string;
  logo: { id: number; url: string; width?: number; height?: number };
}

export interface RosterDataItem {
  date: string;
  type: string;
  round: string;
  gameId: string;
  gender: string;
  ground: string;
  ageGroup: string;
  sponsors: Sponsor[]; // Fixture-specific sponsors
  teamAway: string;
  teamHome: string;
  gradeName: string;
  isHomeTeam: boolean;
  teamRoster: string[]; // Array of player names
  teamAwayLogo: string;
  teamHomeLogo: string;
}
```

**Key Points:**
- **Player names**: Array of strings (may include role indicators)
- **Team flags**: `isHomeTeam` determines account holder team
- **Sponsors**: Fixture-specific sponsors (not club sponsors)
- **Logos**: String URLs for team logos

---

### Step 2: Create Helper Utilities

Create `_utils/dataHelpers.ts` for data validation and duration calculation.

**Example:** `src/compositions/cricket/teamRoster/_utils/dataHelpers.ts`

```typescript
import { RosterDataItem } from "../_types/types";
import { Timings } from "../../../../core/types/data/common";
import { DEFAULT_ROSTER_DURATION } from "./constants";

/**
 * Check if roster data is valid
 * @param rosterData - Data from video context
 * @returns True if data is valid and non-empty array
 */
export const hasValidRosterData = (rosterData: unknown): boolean => {
  return (
    rosterData !== null &&
    rosterData !== undefined &&
    Array.isArray(rosterData) &&
    rosterData.length > 0
  );
};

/**
 * Cast composition data to typed roster data array
 * @param compositionData - Data from video context
 * @returns Typed array of RosterDataItem
 */
export const castToRosterDataArray = (
  compositionData: unknown,
): RosterDataItem[] => {
  return compositionData as unknown as RosterDataItem[];
};

/**
 * Calculate duration in frames for roster sequence
 * @param timings - Video data timings object
 * @returns Duration in frames (FPS_SCORECARD or default)
 */
export const calculateRosterDuration = (
  timings: Timings | undefined,
): number => {
  return timings?.FPS_SCORECARD || DEFAULT_ROSTER_DURATION;
};
```

**Key Points:**
- **Validation**: Checks if data is valid array with items
- **Type casting**: Safely casts unknown data to RosterDataItem[]
- **Duration**: Uses `FPS_SCORECARD` timing or default

---

### Step 3: Create Constants

Create `_utils/constants.ts` for default values.

**Example:** `src/compositions/cricket/teamRoster/_utils/constants.ts`

```typescript
/**
 * Default duration in frames for roster sequences if not specified
 */
export const DEFAULT_ROSTER_DURATION = 60;
```

---

### Step 4: Create Layout Utilities

Create `layout/utils.ts` for team perspective and name truncation.

**Example:** `src/compositions/cricket/teamRoster/layout/utils.ts`

```typescript
import { RosterDataItem } from "../_types/types";

/**
 * Truncates text to a specified maximum length and adds ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";
  return text.substring(0, maxLength - 3) + "...";
};

/**
 * Truncates player name to show first character of first name and full last name
 * Handles role indicators, captain/vice-captain suffixes, and invalid entries
 */
export const truncatePlayerName = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text || "";

  const trimmedText = text.trim();

  // Check if this is a role indicator (like "B. (WK) VC") - not a player name
  if (isRoleIndicator(trimmedText)) {
    return trimmedText;
  }

  // Extract ALL role suffixes (C, VC, (WK), etc.) to append later
  const { cleanedName, roleSuffixes } = extractAllRoleSuffixes(trimmedText);

  const nameParts = cleanedName.split(" ");
  if (nameParts.length < 2) {
    // If only one name, just truncate normally
    const truncated = cleanedName.substring(0, maxLength - 3) + "...";
    return roleSuffixes.length > 0
      ? `${truncated} ${roleSuffixes.join(" ")}`
      : truncated;
  }

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const truncatedName = `${firstName.charAt(0)}. ${lastName}`;

  // If even the truncated version is too long, fall back to normal truncation
  if (truncatedName.length > maxLength) {
    const truncated = cleanedName.substring(0, maxLength - 3) + "...";
    return roleSuffixes.length > 0
      ? `${truncated} ${roleSuffixes.join(" ")}`
      : truncated;
  }

  // Append all role suffixes if they exist
  return roleSuffixes.length > 0
    ? `${truncatedName} ${roleSuffixes.join(" ")}`
    : truncatedName;
};

/**
 * Checks if text is a role indicator rather than a player name
 */
const isRoleIndicator = (text: string): boolean => {
  const rolePatterns = [
    /^[A-Z]\.\s*\([^)]+\)$/, // Pattern like "B. (WK)"
    /^[A-Z]\.\s*[A-Z]+$/, // Pattern like "B. WK"
    /^\([^)]+\)$/, // Pattern like "(WK)"
  ];

  return rolePatterns.some((pattern) => pattern.test(text));
};

/**
 * Extracts ALL role suffixes from player names
 */
const extractAllRoleSuffixes = (
  text: string,
): { cleanedName: string; roleSuffixes: string[] } => {
  const roleSuffixPatterns = [
    " (WK)", // Wicket keeper in parentheses
    " VC", // Vice captain
    " C", // Captain
    " (VC)", // Vice captain in parentheses
    " (C)", // Captain in parentheses
  ];

  let cleaned = text;
  const extractedSuffixes: string[] = [];

  for (const suffix of roleSuffixPatterns) {
    if (cleaned.includes(suffix)) {
      extractedSuffixes.push(suffix.trim());
      cleaned = cleaned.replace(suffix, "").trim();
    }
  }

  return {
    cleanedName: cleaned.trim(),
    roleSuffixes: extractedSuffixes,
  };
};

/**
 * Team details interface
 */
export interface TeamDetails {
  name: string;
  logoUrl: string;
  isAccountHolder: boolean;
}

/**
 * Account holder and against team details
 */
export interface TeamPerspective {
  accountHolder: TeamDetails;
  against: TeamDetails;
}

/**
 * Determines which team is the account holder and which is the against team
 * based on the roster data
 */
export const getTeamPerspective = (roster: RosterDataItem): TeamPerspective => {
  // Account holder is determined by roster.isHomeTeam
  const isHomeTeamAccountHolder = roster.isHomeTeam;

  const accountHolder: TeamDetails = {
    name: isHomeTeamAccountHolder ? roster.teamHome : roster.teamAway,
    logoUrl: isHomeTeamAccountHolder
      ? roster.teamHomeLogo
      : roster.teamAwayLogo,
    isAccountHolder: true,
  };

  const against: TeamDetails = {
    name: isHomeTeamAccountHolder ? roster.teamAway : roster.teamHome,
    logoUrl: isHomeTeamAccountHolder
      ? roster.teamAwayLogo
      : roster.teamHomeLogo,
    isAccountHolder: false,
  };

  return {
    accountHolder,
    against,
  };
};
```

**Key Points:**
- **Name truncation**: Converts "John Smith" to "J. Smith"
- **Role preservation**: Keeps captain/vice-captain/wicket-keeper suffixes
- **Team perspective**: Determines account holder vs against team

---

### Step 5: Create Empty State Component

Create a component to show when there's no data.

**Example:** `src/compositions/cricket/teamRoster/modules/NoData/no-data.tsx`

```typescript
import React from "react";
import { AbsoluteFill } from "remotion";

const NoRosterData: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <h1>No Roster Data Available</h1>
    </AbsoluteFill>
  );
};

export default NoRosterData;
```

**Key Points:**
- **AbsoluteFill**: Uses Remotion's AbsoluteFill for full-screen display
- **Simple message**: No dynamic content needed

---

### Step 6: Create Player List Component

Create the player list component.

**Example:** `src/compositions/cricket/teamRoster/layout/RosterPlayerList/playerList.tsx`

```typescript
import React from "react";
import { RosterPlayerName } from "../../../utils/primitives/RosterPlayerName";
import { truncatePlayerName } from "../utils";
import { RosterPlayerListProps } from "./_types/RosterPlayerListProps";
import {
  DEFAULT_PLAYER_LIST_CLASSNAME,
  DEFAULT_PLAYER_LIST_GAP,
  MAX_PLAYER_NAME_LENGTH,
} from "./_utils/constants";

const RosterPlayerList: React.FC<RosterPlayerListProps> = ({
  roster,
  className = DEFAULT_PLAYER_LIST_CLASSNAME,
  gap = DEFAULT_PLAYER_LIST_GAP,
}) => {
  return (
    <div className="flex-grow">
      <div className={`flex flex-col p-8 ${gap}`}>
        {roster.teamRoster.map((player, index) => (
          <RosterPlayerName
            key={index}
            value={truncatePlayerName(
              player.toUpperCase(),
              MAX_PLAYER_NAME_LENGTH,
            )}
            className={className}
          />
        ))}
      </div>
    </div>
  );
};

export default RosterPlayerList;
```

**Key Points:**
- **Flex column**: Vertical list of players
- **Name truncation**: Uses `truncatePlayerName()` helper
- **Configurable**: Accepts className and gap props

---

### Step 7: Create Team Header Components

Create team header components for account holder and against team.

**Example:** `src/compositions/cricket/teamRoster/layout/RosterHeader/accountHolder/LargeTeamHeader.tsx`

```typescript
import React from "react";
import { AnimatedContainer } from "../../../../../../components/containers/AnimatedContainer";
import { TeamLogo } from "../../../../utils/primitives/TeamLogo";
import { ResultTeamName } from "../../../../utils/primitives/ResultTeamName";
import { truncateText, getTeamPerspective } from "../../utils";
import { AccountTeamProps } from "./_types/AccountTeamProps";
import {
  DEFAULT_TEAM_HEADER_VARIANT,
  DEFAULT_LARGE_TEAM_LOGO_SIZE,
  DEFAULT_TEAM_HEADER_ANIMATION_DELAY,
  MAX_TEAM_NAME_LENGTH,
} from "./_utils/constants";
import {
  parseLogoSize,
  getLogoSizeClass,
  shouldApplyBackgroundColor,
} from "./_utils/helpers";

export const LargeTeamHeader: React.FC<AccountTeamProps> = ({
  roster,
  variant = DEFAULT_TEAM_HEADER_VARIANT,
  logoSize = DEFAULT_LARGE_TEAM_LOGO_SIZE,
  backgroundColor = "none",
}) => {
  // Get account holder team details
  const { accountHolder } = getTeamPerspective(roster);
  const teamName = accountHolder.name;
  const teamLogoUrl = accountHolder.logoUrl;
  const logoSizeNumber = parseLogoSize(logoSize);
  const logoSizeClass = getLogoSizeClass(logoSize);

  return (
    <AnimatedContainer
      type="full"
      className={`w-full flex justify-center items-center p-2`}
      backgroundColor="none"
      style={{
        background: shouldApplyBackgroundColor(backgroundColor)
          ? backgroundColor
          : undefined,
      }}
      animation={undefined}
      animationDelay={DEFAULT_TEAM_HEADER_ANIMATION_DELAY}
    >
      <div className="flex flex-col items-center">
        {/* Team name */}
        <div className="flex flex-col items-center">
          <ResultTeamName
            value={truncateText(teamName, MAX_TEAM_NAME_LENGTH).toUpperCase()}
            animation={undefined}
            variant={variant}
            className="text-center"
          />
        </div>
        {/* Team logo */}
        <div className={`${logoSizeClass} my-2 rounded-full p-4`}>
          <TeamLogo
            logo={{
              url: teamLogoUrl,
              width: logoSizeNumber,
              height: logoSizeNumber,
            }}
            teamName={teamName}
            delay={DEFAULT_TEAM_HEADER_ANIMATION_DELAY}
          />
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default LargeTeamHeader;
```

**Key Points:**
- **Team perspective**: Uses `getTeamPerspective()` to get account holder team
- **Logo and name**: Displays team logo and name
- **Configurable**: Logo size, variant, background color

---

### Step 8: Create Metadata Components

Create metadata components for date/ground and grade/round.

**Example:** `src/compositions/cricket/teamRoster/layout/Metadata/TwoMetaValues.tsx`

```typescript
import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import {
  AnimatedText,
  ColorVariant,
} from "../../../../../components/typography/AnimatedText";
import { TwoMetaValuesProps } from "./_types/TwoMetaValuesProps";
import {
  DEFAULT_METADATA_VARIANT,
  DEFAULT_METADATA_ANIMATION_DELAY,
} from "./_utils/constants";
import { getSubtleBackgroundColor } from "./_utils/helpers";

export const TwoMetaValuesSubtleWrapper: React.FC<TwoMetaValuesProps> = ({
  values,
}) => {
  const { selectedPalette } = useThemeContext();
  const { animations } = useAnimationContext();

  const backgroundColor = getSubtleBackgroundColor(selectedPalette);

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-between items-center p-3"
      backgroundColor="none"
      style={{
        background: backgroundColor,
      }}
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={DEFAULT_METADATA_ANIMATION_DELAY}
    >
      <TwoMetaValuesValues values={values} variant={DEFAULT_METADATA_VARIANT} />
    </AnimatedContainer>
  );
};

export const TwoMetaValuesNoWrapper: React.FC<TwoMetaValuesProps> = ({
  values,
}) => {
  const { animations } = useAnimationContext();

  return (
    <AnimatedContainer
      type="full"
      className="w-full flex justify-between items-center p-3"
      backgroundColor="none"
      animation={animations.container.main.itemContainer.containerIn}
      animationDelay={DEFAULT_METADATA_ANIMATION_DELAY}
    >
      <TwoMetaValuesValues values={values} variant="onContainerTitle" />
    </AnimatedContainer>
  );
};

const TwoMetaValuesValues = ({
  values,
  variant = DEFAULT_METADATA_VARIANT,
}: TwoMetaValuesProps & { variant: ColorVariant }) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  return (
    <>
      <AnimatedText
        type="metadataSmall"
        animation={{
          ...TextAnimations.copyIn,
          delay: DEFAULT_METADATA_ANIMATION_DELAY,
        }}
        className={`text-md`}
        variant={variant}
      >
        {values[0]}
      </AnimatedText>

      <AnimatedText
        type="metadataSmall"
        animation={{
          ...TextAnimations.copyIn,
          delay: DEFAULT_METADATA_ANIMATION_DELAY,
        }}
        className="text-md text-right"
        variant={variant}
      >
        {values[1]}
      </AnimatedText>
    </>
  );
};
```

**Key Points:**
- **Two values**: Displays two metadata values side-by-side
- **Variants**: `SubtleWrapper` (with background) and `NoWrapper` (without)
- **Layout**: Left-aligned and right-aligned values

---

### Step 9: Create VS Component

Create the VS indicator component.

**Example:** `src/compositions/cricket/teamRoster/layout/Metadata/VS.tsx`

```typescript
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import {
  AnimatedText,
  ColorVariant,
} from "../../../../../components/typography/AnimatedText";
import { VSProps } from "./_types/VSProps";
import {
  DEFAULT_METADATA_VARIANT,
  DEFAULT_METADATA_ANIMATION_DELAY,
} from "./_utils/constants";

export const VS = ({
  variant = DEFAULT_METADATA_VARIANT,
}: {
  variant?: ColorVariant;
}) => {
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;

  return (
    <>
      <AnimatedText
        type="metadataLarge"
        animation={{
          ...TextAnimations.copyIn,
          delay: DEFAULT_METADATA_ANIMATION_DELAY,
        }}
        className={`text-center`}
        variant={variant}
      >
        vs
      </AnimatedText>
    </>
  );
};
```

**Key Points:**
- **Simple text**: Displays "vs" between teams
- **Centered**: Centered alignment
- **Configurable variant**: Can change color variant

---

### Step 10: Create Sponsor Component

Create the sponsor display component (optional).

**Example:** `src/compositions/cricket/teamRoster/layout/RosterSponsors/sponsors.tsx`

```typescript
import React from "react";
import { AnimatedImage } from "../../../../../components/images";
import { RosterSponsorsProps } from "./_types/RosterSponsorsProps";
import {
  DEFAULT_SPONSOR_LIST_GAP,
  MAX_SPONSOR_CONTAINER_HEIGHT,
  DEFAULT_SPONSOR_IMAGE_WIDTH,
  DEFAULT_SPONSOR_IMAGE_HEIGHT,
  DEFAULT_SPONSOR_IMAGE_ALT,
  SPONSOR_LOGO_EXIT_FRAME,
} from "./_utils/constants";

const RosterSponsors: React.FC<RosterSponsorsProps> = ({ roster }) => {
  return (
    <div
      className={`flex flex-col ${DEFAULT_SPONSOR_LIST_GAP} flex-1 justify-center items-center ${MAX_SPONSOR_CONTAINER_HEIGHT}`}
    >
      {roster.sponsors.map((sponsor) => (
        <AnimatedImage
          key={sponsor.id}
          src={sponsor?.logo?.url || ""}
          alt={DEFAULT_SPONSOR_IMAGE_ALT}
          width={DEFAULT_SPONSOR_IMAGE_WIDTH}
          height={DEFAULT_SPONSOR_IMAGE_HEIGHT}
          fit="contain"
          exitFrame={SPONSOR_LOGO_EXIT_FRAME}
        />
      ))}
    </div>
  );
};

export default RosterSponsors;
```

**Key Points:**
- **Optional**: Some variants don't include sponsors
- **Vertical list**: Displays sponsors vertically
- **Animated images**: Uses AnimatedImage component

---

### Step 11: Create Basic Display Component

Create the display component for the Basic variant.

**Example:** `src/compositions/cricket/teamRoster/controller/Display/display.tsx`

```typescript
import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import RosterPlayerList from "../../layout/RosterPlayerList/playerList";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { AccountTeamLarge, AgainstTeamLarge } from "../../layout/RosterHeader";
import { TwoMetaValuesSubtleWrapper } from "../../layout/Metadata/TwoMetaValues";
import { formatDate, truncateText } from "../../../utils/utils-text";
import { VS } from "../../layout/Metadata/VS";
import { RosterDisplayProps } from "./_types/RosterDisplayProps";
import {
  DEFAULT_CONTAINER_ANIMATION,
  DEFAULT_CONTAINER_EXIT_ANIMATION,
} from "./_utils/animations";
import { getAvailableHeight, getBackgroundColor } from "./_utils/helpers";
import {
  ACCOUNT_TEAM_LOGO_SIZE,
  AGAINST_TEAM_LOGO_SIZE,
} from "./_utils/constants";

const RosterDisplay: React.FC<RosterDisplayProps> = ({ roster }) => {
  const { layout, selectedPalette } = useThemeContext();
  const availableHeight = getAvailableHeight(layout.heights);
  const backgroundColor = getBackgroundColor(selectedPalette);

  return (
    <div className="p-0 flex flex-col w-full h-full">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-16 rounded-lg overflow-hidden"
        backgroundColor="none"
        animation={DEFAULT_CONTAINER_ANIMATION}
        animationDelay={0}
        exitAnimation={DEFAULT_CONTAINER_EXIT_ANIMATION}
      >
        <div
          className="w-full flex flex-col justify-center rounded-xl"
          style={{ height: `${availableHeight}px` }}
        >
          <TwoMetaValuesSubtleWrapper
            values={[formatDate(roster.date), truncateText(roster.ground, 50)]}
          />

          <div
            className="flex flex-row gap-2 justify-between items-center"
            style={{ backgroundColor: backgroundColor }}
          >
            <RosterPlayerList roster={roster} gap="gap-4" />
            <div className="flex flex-col gap-4 p-4">
              <AccountTeamLarge roster={roster} logoSize={ACCOUNT_TEAM_LOGO_SIZE} />
              <VS variant="onContainerCopy" />
              <AgainstTeamLarge roster={roster} logoSize={AGAINST_TEAM_LOGO_SIZE} />
            </div>
          </div>
          <TwoMetaValuesSubtleWrapper
            values={[roster.gradeName, roster.round]}
          />
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default RosterDisplay;
```

**Key Points:**
- **Layout**: Player list on left, team headers on right
- **Metadata**: Date/ground at top, grade/round at bottom
- **VS indicator**: Between team headers
- **Background**: Uses theme background color

---

### Step 12: Create Variant Entry Point

Create the main component file for your first variant (e.g., `basic.tsx`).

**Example:** `src/compositions/cricket/teamRoster/basic.tsx`

```typescript
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { Series } from "remotion";
import { RosterDataItem } from "./_types/types";
import RosterDisplay from "./controller/Display/display";
import NoRosterData from "./modules/NoData/no-data";
import RosterSponsors from "./layout/RosterSponsors/sponsors";
import {
  hasValidRosterData,
  castToRosterDataArray,
  calculateRosterDuration,
} from "./_utils/dataHelpers";

// Main component with Series transitions
export const CricketRosterWithTransitions: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: CompositionData, timings } = data;

  // Cast CompositionData to the correct type
  const rosterData = castToRosterDataArray(CompositionData);

  // If no data is available, show a placeholder
  if (!hasValidRosterData(rosterData)) {
    return <NoRosterData />;
  }

  return (
    <Series>
      {rosterData.map((rosterItem: RosterDataItem, i) => (
        <Series.Sequence
          key={i}
          durationInFrames={calculateRosterDuration(timings)}
          className="flex flex-col justify-center"
        >
          <RosterDisplay roster={rosterItem} />
          <RosterSponsors roster={rosterItem} />
        </Series.Sequence>
      ))}
    </Series>
  );
};

// Export as Basic for compatibility
export const basic: React.FC = () => {
  return <CricketRosterWithTransitions />;
};

export default basic;
```

**Key Points:**
- **Series component**: Uses Remotion's Series for transitions
- **One sequence per roster**: Maps over roster data, creates one sequence each
- **Sponsor display**: Includes sponsor component (optional in some variants)
- **Duration**: Uses `FPS_SCORECARD` timing or default

---

### Step 13: Export from Composition Index

Create or update `index.tsx` to export your variant.

**Example:** `src/compositions/cricket/teamRoster/index.tsx`

```typescript
import { basic } from "./basic";
// Import other variants as you create them
// import { Classic } from "./classic";
// import { ClassicTwoColumn } from "./classicTwoColumn";
// import { SixersThunder } from "./sixersThunder";

export { basic };
// Add more as you create them:
// export { Classic, ClassicTwoColumn, SixersThunder };
```

---

### Step 14: Add to Sport Module Export

Add your composition to the sport's main index file.

**Example:** `src/compositions/cricket/index.tsx`

```typescript
// Import team roster variants
import {
  basic as teamRosterBasic,
  // Add more variants as you create them
} from "./teamRoster";

// ... other composition imports

// Export implementations for all composition types
export const CricketTeamRoster = {
  basic: teamRosterBasic,
  // Add more variants as you create them:
  // classic: teamRosterClassic,
  // classicTwoColumn: teamRosterClassicTwoColumn,
  // sixersThunder: teamRosterSixersThunder,
};
```

---

## Roster-to-Roster Transitions

### How Transitions Work

1. **One Roster Per Sequence**:
   ```typescript
   <Series>
     {rosterData.map((rosterItem: RosterDataItem, i) => (
       <Series.Sequence
         key={i}
         durationInFrames={calculateRosterDuration(timings)}
       >
         <RosterDisplay roster={rosterItem} />
       </Series.Sequence>
     ))}
   </Series>
   ```

2. **Transition Between Rosters**:
   - Each roster is a separate sequence
   - `Series` component handles transitions between sequences
   - No explicit transition configuration needed

3. **Duration**:
   - Same duration for all rosters
   - Uses `FPS_SCORECARD` timing or default (60 frames)

### Example: 3 Rosters

- **Sequence 0**: Roster 1 (60 frames)
- **Sequence 1**: Roster 2 (60 frames)
- **Sequence 2**: Roster 3 (60 frames)
- **Transitions**: Between each sequence (automatic)

---

## Display Components

### Structure

Display components (`controller/Display/display-*.tsx`):
- Create main layout container
- Compose layout components (player list, headers, metadata)
- Handle spacing and background colors
- Use fixed or calculated heights

### Layout Pattern

```
┌─────────────────────────────────────────┐
│ Date                    Ground         │ ← TwoMetaValues (top)
├─────────────────────────────────────────┤
│                                         │
│ Player List    │  Account Team Logo     │
│ - J. Smith     │  Team Name             │
│ - M. Jones     │                        │
│ - ...          │  vs                    │
│                │                        │
│                │  Against Team Logo    │
│                │  Team Name             │
│                                         │
├─────────────────────────────────────────┤
│ Grade                      Round        │ ← TwoMetaValues (bottom)
└─────────────────────────────────────────┘
```

### Variant-Specific Differences

- **Basic**: Uses `TwoMetaValuesSubtleWrapper` (with background)
- **Classic**: Uses `TwoMetaValuesNoWrapper` (without background)
- **ClassicTwoColumn**: Uses `minHeight` constraint
- **SixersThunder**: Different styling and layout

---

## Layout Components

### RosterPlayerList

**Location:** `layout/RosterPlayerList/playerList.tsx`

Displays list of player names:
- Vertical flex column
- Truncated player names (first initial + last name)
- Configurable gap and className
- Maps over `roster.teamRoster` array

### RosterHeader

**Location:** `layout/RosterHeader/`

Two perspectives:
- **AccountHolder**: Shows account holder team as main team
- **Against**: Shows against team as main team

Components:
- `LargeTeamHeader`: Large logo and name
- `SmallOpponentCard`: Small opponent card (if needed)

### Metadata Components

**Location:** `layout/Metadata/`

- **TwoMetaValues**: Displays two metadata values side-by-side
  - `TwoMetaValuesSubtleWrapper`: With subtle background
  - `TwoMetaValuesNoWrapper`: Without background
- **VS**: Displays "vs" indicator between teams

### RosterSponsors

**Location:** `layout/RosterSponsors/sponsors.tsx`

- Displays fixture-specific sponsors
- Vertical list of sponsor logos
- Optional (some variants don't include)

---

## Team Perspective System

### Concept

The team perspective system determines which team is the "account holder" (the team whose roster is being displayed) and which is the "against" team (the opponent).

### Implementation

**Helper Function:** `getTeamPerspective(roster)`

```typescript
export const getTeamPerspective = (roster: RosterDataItem): TeamPerspective => {
  const isHomeTeamAccountHolder = roster.isHomeTeam;

  const accountHolder: TeamDetails = {
    name: isHomeTeamAccountHolder ? roster.teamHome : roster.teamAway,
    logoUrl: isHomeTeamAccountHolder
      ? roster.teamHomeLogo
      : roster.teamAwayLogo,
    isAccountHolder: true,
  };

  const against: TeamDetails = {
    name: isHomeTeamAccountHolder ? roster.teamAway : roster.teamHome,
    logoUrl: isHomeTeamAccountHolder
      ? roster.teamAwayLogo
      : roster.teamHomeLogo,
    isAccountHolder: false,
  };

  return { accountHolder, against };
};
```

### Usage

```typescript
const { accountHolder, against } = getTeamPerspective(roster);

// Use accountHolder for main team display
// Use against for opponent team display
```

---

## Player Name Truncation

### Concept

Player names are truncated intelligently to show:
- First initial + last name (e.g., "John Smith" → "J. Smith")
- Role suffixes preserved (C, VC, (WK), etc.)

### Implementation

**Helper Function:** `truncatePlayerName(text, maxLength)`

**Features:**
- Handles role indicators (like "B. (WK) VC")
- Extracts and preserves role suffixes
- Falls back to normal truncation if needed
- Handles single-name cases

### Examples

- "John Smith" → "J. Smith"
- "John Smith (C)" → "J. Smith (C)"
- "John Smith VC" → "J. Smith VC"
- "John Smith (WK) VC" → "J. Smith (WK) VC"
- "B. (WK)" → "B. (WK)" (role indicator, not truncated)

---

## Metadata Components

### TwoMetaValues

Displays two metadata values side-by-side:

**Variants:**
- `TwoMetaValuesSubtleWrapper`: With subtle background color
- `TwoMetaValuesNoWrapper`: Without background

**Usage:**
```typescript
<TwoMetaValuesSubtleWrapper
  values={[formatDate(roster.date), truncateText(roster.ground, 50)]}
/>
```

**Layout:**
- Left value: Left-aligned
- Right value: Right-aligned
- Both values: Same variant, animated

### VS Component

Displays "vs" indicator between teams:

**Usage:**
```typescript
<VS variant="onContainerCopy" />
```

**Features:**
- Centered text
- Configurable color variant
- Animated text

---

## Sponsor Display

### Concept

Sponsors are fixture-specific (not club-level sponsors). They're displayed as a vertical list of sponsor logos.

### Implementation

**Component:** `RosterSponsors`

**Features:**
- Maps over `roster.sponsors` array
- Displays sponsor logos using `AnimatedImage`
- Vertical flex column layout
- Optional (some variants don't include)

**Note:** Some variants have sponsors commented out or don't include them at all.

---

## Creating Variant Implementations

Once you have the Basic variant working, create additional variants:

1. **Create Display Component** (`controller/Display/display-{Variant}.tsx`)
2. **Create Variant Entry Point** (`{variant}.tsx`)
3. **Export from Index** (`index.tsx`)
4. **Export from Sport Module** (`src/compositions/cricket/index.tsx`)

### Variant-Specific Considerations

- **Metadata wrapper**: Choose `SubtleWrapper` or `NoWrapper`
- **Background colors**: Match template variant design
- **Spacing**: Adjust padding, gaps, margins
- **Heights**: Use fixed heights or minHeight constraints
- **Sponsors**: Include or exclude sponsor display
- **Styling**: Match template variant design

---

## Animation Patterns

### Container Animation

Main container animates in:

```typescript
<AnimatedContainer
  animation={DEFAULT_CONTAINER_ANIMATION}
  animationDelay={0}
  exitAnimation={DEFAULT_CONTAINER_EXIT_ANIMATION}
>
```

### Metadata Animation

Metadata components animate with delay:

```typescript
animationDelay={DEFAULT_METADATA_ANIMATION_DELAY}
```

### Team Header Animation

Team headers animate with delay:

```typescript
animationDelay={DEFAULT_TEAM_HEADER_ANIMATION_DELAY}
```

---

## Hooking Up to Routing

### Composition ID

The routing system recognizes:
- `CricketTeamRoster`

### Routing Configuration

**Check:** `src/core/utils/routing.tsx`

```typescript
const SPORT_COMPOSITION_TYPES: SportCompositionTypes = {
  cricket: {
    CricketTeamRoster: "CricketTeamRoster",
    // ... other composition types
  },
};
```

---

## Common Patterns

### Pattern 1: Roster-to-Roster Rendering

```typescript
<Series>
  {rosterData.map((rosterItem: RosterDataItem, i) => (
    <Series.Sequence
      key={i}
      durationInFrames={calculateRosterDuration(timings)}
    >
      <RosterDisplay roster={rosterItem} />
      <RosterSponsors roster={rosterItem} />
    </Series.Sequence>
  ))}
</Series>
```

### Pattern 2: Team Perspective Usage

```typescript
const { accountHolder, against } = getTeamPerspective(roster);

<AccountTeamLarge roster={roster} logoSize={ACCOUNT_TEAM_LOGO_SIZE} />
<AgainstTeamLarge roster={roster} logoSize={AGAINST_TEAM_LOGO_SIZE} />
```

### Pattern 3: Metadata Display

```typescript
<TwoMetaValuesSubtleWrapper
  values={[formatDate(roster.date), truncateText(roster.ground, 50)]}
/>

<TwoMetaValuesSubtleWrapper
  values={[roster.gradeName, roster.round]}
/>
```

### Pattern 4: Player List Rendering

```typescript
<RosterPlayerList
  roster={roster}
  className="text-left"
  gap="gap-4"
/>
```

### Pattern 5: Layout Structure

```typescript
<div className="flex flex-row gap-2 justify-between items-center">
  <RosterPlayerList roster={roster} />
  <div className="flex flex-col gap-4 p-4">
    <AccountTeamLarge roster={roster} />
    <VS variant="onContainerCopy" />
    <AgainstTeamLarge roster={roster} />
  </div>
</div>
```

---

## Testing

### Test Data Structure

```typescript
const testRoster: RosterDataItem = {
  date: "2024-01-15",
  type: "T20",
  round: "Round 1",
  gameId: "12345",
  gender: "Men",
  ground: "Ground Name",
  ageGroup: "Senior",
  sponsors: [
    {
      id: 1,
      isPrimary: true,
      isActive: true,
      isArticle: false,
      isVideo: false,
      url: "https://example.com",
      tagline: "Tagline",
      description: "Description",
      name: "Sponsor Name",
      logo: { id: 1, url: "https://example.com/logo.png" },
    },
  ],
  teamAway: "Team A",
  teamHome: "Team B",
  gradeName: "Grade A",
  isHomeTeam: true,
  teamRoster: [
    "John Smith (C)",
    "Mike Jones VC",
    "David Brown (WK)",
    "Tom Wilson",
  ],
  teamAwayLogo: "https://example.com/team-a-logo.png",
  teamHomeLogo: "https://example.com/team-b-logo.png",
};
```

### Test Scenarios

1. **Multiple Rosters**: Test with multiple roster items
2. **Home vs Away**: Test with `isHomeTeam` true/false
3. **Player Names**: Test with various name formats (with/without roles)
4. **Sponsors**: Test with and without sponsors
5. **Edge Cases**: Empty roster, single player, many players
6. **Transitions**: Verify transitions between rosters work correctly

---

## Troubleshooting

### Issue: Wrong Team Displayed

**Error:** Account holder team not showing correctly

**Solutions:**
1. Check `isHomeTeam` flag is set correctly
2. Verify `getTeamPerspective()` logic
3. Check team header component uses correct perspective
4. Verify team logo URLs are correct

### Issue: Player Names Not Truncating

**Error:** Player names not truncating correctly

**Solutions:**
1. Check `truncatePlayerName()` function
2. Verify `MAX_PLAYER_NAME_LENGTH` constant
3. Check role suffix extraction logic
4. Verify player name format in data

### Issue: Transitions Not Working

**Error:** No transitions between rosters or transition errors

**Solutions:**
1. Check `Series` component usage
2. Verify duration calculation returns valid number
3. Check data array has multiple rosters
4. Verify sequence keys are unique

### Issue: Metadata Not Displaying

**Error:** Date/ground or grade/round not showing

**Solutions:**
1. Check `TwoMetaValues` component usage
2. Verify data exists in roster object
3. Check `formatDate()` and `truncateText()` helpers
4. Verify component is placed correctly in layout

### Issue: Sponsors Not Showing

**Error:** Sponsor logos not displaying

**Solutions:**
1. Check `roster.sponsors` array exists and has items
2. Verify sponsor logo URLs are valid
3. Check `RosterSponsors` component is included
4. Verify sponsor component is not commented out

---

## Quick Reference

### File Checklist

- [ ] `_types/types.ts` - Data type definitions
- [ ] `_utils/dataHelpers.ts` - Data validation and duration calculation
- [ ] `_utils/constants.ts` - Default duration constants
- [ ] `layout/utils.ts` - Team perspective and name truncation
- [ ] `layout/RosterPlayerList/playerList.tsx` - Player list component
- [ ] `layout/RosterPlayerList/_utils/constants.ts` - Player list constants
- [ ] `layout/RosterHeader/accountHolder/LargeTeamHeader.tsx` - Account holder header
- [ ] `layout/RosterHeader/Against/LargeTeamHeader.tsx` - Against team header
- [ ] `layout/RosterHeader/index.ts` - Header exports
- [ ] `layout/Metadata/TwoMetaValues.tsx` - Metadata component
- [ ] `layout/Metadata/VS.tsx` - VS component
- [ ] `layout/RosterSponsors/sponsors.tsx` - Sponsor component (optional)
- [ ] `controller/Display/_utils/animations.ts` - Animation configurations
- [ ] `controller/Display/_utils/constants.ts` - Logo sizes, heights
- [ ] `controller/Display/_utils/helpers.ts` - Height and color helpers
- [ ] `controller/Display/display.tsx` - Display component
- [ ] `modules/NoData/no-data.tsx` - Empty state component
- [ ] `{variant}.tsx` - Variant entry point
- [ ] `index.tsx` - Composition exports
- [ ] Updated `src/compositions/cricket/index.tsx` - Sport module export

### Key Functions

```typescript
// Data validation
hasValidRosterData(rosterData): boolean
castToRosterDataArray(compositionData): RosterDataItem[]
calculateRosterDuration(timings): number

// Team perspective
getTeamPerspective(roster): TeamPerspective

// Name truncation
truncatePlayerName(text, maxLength): string
truncateText(text, maxLength): string
```

### Logo Size Constants

- **ACCOUNT_TEAM_LOGO_SIZE**: "300" (account holder team)
- **AGAINST_TEAM_LOGO_SIZE**: "120" (against team)

### Duration Constants

- **DEFAULT_ROSTER_DURATION**: 60 frames

### Layout Structure

```
Top Metadata (Date/Ground)
├── Player List (left)
└── Team Headers (right)
    ├── Account Team Logo + Name
    ├── VS
    └── Against Team Logo + Name
Bottom Metadata (Grade/Round)
Sponsors (optional, below)
```

---

## Summary

Creating a team roster composition involves:

1. **Defining types** for roster data and sponsors
2. **Creating utilities** for data validation, team perspective, and name truncation
3. **Building layout components** (player list, team headers, metadata, sponsors)
4. **Building display components** that compose layout components
5. **Implementing Series transitions** for roster-to-roster transitions
6. **Creating variants** with different styling and layouts

### Key Implementation Details

**Layout Structure:**
- Player list on left (vertical column)
- Team headers on right (vertical column with VS)
- Metadata at top and bottom
- Sponsors optional (below or separate)

**Team Perspective:**
- Account holder team determined by `isHomeTeam` flag
- Against team is the opponent
- Headers use `getTeamPerspective()` helper

**Player Name Truncation:**
- Converts "John Smith" to "J. Smith"
- Preserves role suffixes (C, VC, (WK))
- Handles edge cases (single names, role indicators)

**Transitions:**
- Uses Remotion's `Series` component
- One sequence per roster item
- Automatic transitions between sequences

The Basic variant serves as a reference implementation showing all these patterns working together.

---

**Last Updated:** 2026-02-08

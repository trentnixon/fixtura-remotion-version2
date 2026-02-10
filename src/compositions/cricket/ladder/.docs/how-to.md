# How to Create a New Composition Asset Type

This guide explains how to create a new **composition asset type** (like `CricketLadder`, `CricketTop5`, `CricketResults`) from scratch. This is different from creating a template variant - compositions are sport-specific content types that can be rendered with different template variants.

---

## Table of Contents 

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Prerequisites](#prerequisites)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Creating Variant Implementations](#creating-variant-implementations)
6. [Animation Utilities](#animation-utilities)
7. [Layout Component Options](#layout-component-options)
8. [Primitive Components](#primitive-components)
9. [Shared Dependencies](#shared-dependencies)
10. [Background Color Logic](#background-color-logic)
11. [Variant-Specific Components](#variant-specific-components)
12. [Animation Patterns](#animation-patterns)
13. [Hooking Up to Routing](#hooking-up-to-routing)
14. [Common Patterns](#common-patterns)
15. [Testing](#testing)
16. [Troubleshooting](#troubleshooting)
17. [Quick Reference](#quick-reference)

---

## Overview

### What is a Composition?

A **composition** is a sport-specific content type that defines:
- **What data** it displays (e.g., ladder standings, top 5 players, upcoming fixtures)
- **How the data is structured** (TypeScript interfaces)
- **How multiple items are sequenced** (transitions between multiple ladders, games, etc.)
- **What components render the data** (Display components, modules, layouts)

### Composition vs Template Variant

| Aspect | Composition | Template Variant |
|--------|------------|------------------|
| **Purpose** | Defines content type (what data) | Defines visual style (how it looks) |
| **Location** | `src/compositions/{sport}/{compositionType}/` | `src/templates/variants/{variantName}/` |
| **Scope** | Sport-specific | Global (works across all compositions) |
| **Example** | `CricketLadder`, `CricketTop5` | `Basic`, `Classic`, `Brickwork` |
| **Data Structure** | Defines its own types | Uses composition's data structure |
| **Variants** | Has multiple template variant implementations | Extends base template |

### Example: Cricket Ladder Composition

The `CricketLadder` composition:
- **Data Type**: `LadderData[]` - array of ladder standings
- **Structure**: Each ladder has teams with positions, stats (P, W, L, PTS), logos
- **Variants**: `basic`, `classic`, `brickwork`, `sixersThunder`, etc.
- **Components**: Display components, table headers, team rows, sponsor footer

---

## Architecture

### Folder Structure

```
src/compositions/cricket/ladder/
├── .docs/
│   └── how-to.md                    # This guide
├── _utils/
│   └── helpers.ts                   # Shared utilities (validation, calculations)
├── controller/
│   ├── Display/
│   │   ├── _types/
│   │   │   └── LadderDisplayProps.ts
│   │   ├── _utils/
│   │   │   └── calculations.ts
│   │   ├── display-Basic.tsx        # Display component for Basic variant
│   │   ├── display-Classic.tsx      # Display component for Classic variant
│   │   └── readMe.md
│   └── TeamRows/
│       ├── _types/
│       │   └── TeamRowProps.ts
│       ├── _utils/
│       │   ├── calculations.ts
│       │   └── components.tsx
│       ├── StandardRow.tsx          # Reusable row component
│       └── readMe.md
├── layout/
│   ├── _types/
│   │   └── BaseLayoutProps.ts
│   ├── TableRowLayout.tsx           # Layout component for table rows
│   └── README.md
├── modules/
│   ├── TableHeader/
│   │   ├── _types/
│   │   │   └── TableHeaderProps.ts
│   │   ├── _utils/
│   │   │   └── calculations.ts
│   │   ├── header.tsx               # Header component
│   │   └── readMe.md
│   ├── NoLadderData/
│   │   └── no-data.tsx              # Empty state component
│   └── README.md
├── basic.tsx                        # Basic variant entry point
├── classic.tsx                      # Classic variant entry point
├── brickWork.tsx                    # Brickwork variant entry point
├── index.tsx                        # Exports all variants
├── types.ts                         # TypeScript interfaces for data
├── readMe.md                        # Folder documentation
└── ladder.md                        # Human-facing notes
```

### Key Concepts

1. **Variant Entry Points** (`basic.tsx`, `classic.tsx`, etc.):
   - Main component that handles data fetching, validation, transitions
   - Maps over data array and renders Display components
   - Uses `TransitionSeriesWrapper` for sequencing multiple items

2. **Display Components** (`controller/Display/display-*.tsx`):
   - Variant-specific rendering logic
   - Receives a single data item (e.g., one ladder)
   - Composes modules, layouts, and shared components

3. **Modules** (`modules/`):
   - Reusable UI components (headers, empty states, etc.)
   - Can have variant-specific versions if needed

4. **Layouts** (`layout/`):
   - Structural components (table rows, card layouts, etc.)
   - Handle positioning and spacing

5. **Types** (`types.ts`):
   - TypeScript interfaces defining the data structure
   - Shared across all variants

6. **Utils** (`_utils/`):
   - Helper functions (validation, calculations, data transformation)
   - Shared across variants

---

## Prerequisites

Before creating a new composition, ensure you have:

1. ✅ **Template variants created** (if you need custom styling)
   - See `src/templates/.docs/how-to.md` for creating template variants
   - At minimum, you need `Basic` variant

2. ✅ **Understanding of the data structure**
   - What fields does your composition need?
   - Is it a single item or an array?
   - What relationships exist (e.g., teams → players → stats)?

3. ✅ **Access to test data**
   - Sample data matching your expected structure
   - Multiple items if you need transitions

4. ✅ **Folder structure understanding**
   - Know where compositions live (`src/compositions/{sport}/`)
   - Understand the routing system (`src/core/utils/routing.tsx`)

---

## Step-by-Step Guide

### Step 1: Define Data Types

Create `types.ts` in your composition folder.

**Example:** `src/compositions/cricket/ladder/types.ts`

```typescript
// Types for ladder data structure
import { AssignSponsors } from "../composition-types";

export interface LadderData {
  ID: number;
  gradeName: string;
  League: TeamData[];
  bias: string; // Highlighted team name
  prompt: string;
  assignSponsors: AssignSponsors;
}

export interface TeamData {
  position: string;
  teamName: string;
  clubLogo: TeamLogo | null;
  teamLogo: TeamLogo | null;
  playHQLogo: TeamLogo | null;
  P: string; // Played
  W: string; // Won
  L: string; // Lost
  BYE: string; // Byes
  "N/R": string; // No Result
  TIE: string; // Tie
  PTS: string; // Points
  Q: string; // Quotient
  prompt: string;
}

export interface TeamLogo {
  url: string;
  width?: number;
  height?: number;
  id?: number;
}

// Animation constants
export const HEADER_ANIMATION_DURATION = 45;
export const TABLE_ANIMATION_DURATION = 90;
```

**Key Points:**
- Define interfaces for your data structure
- Include all fields your composition needs
- Consider optional fields (use `| null` or `?`)
- Export constants if needed (animation durations, defaults)

---

### Step 2: Create Helper Utilities

Create `_utils/helpers.ts` for shared logic.

**Example:** `src/compositions/cricket/ladder/_utils/helpers.ts`

```typescript
import { LadderData } from "../types";
import { Timings } from "../../../../core/types/data/common";

/**
 * Default duration in frames if FPS_LADDER is not specified
 */
export const DEFAULT_LADDER_DURATION = 300;

/**
 * Check if ladder data is valid
 * @param compositionData - The composition data to validate
 * @returns True if data is valid, false otherwise
 */
export const hasValidLadderData = (compositionData: unknown): boolean => {
  return (
    compositionData !== null &&
    compositionData !== undefined &&
    Array.isArray(compositionData) &&
    compositionData.length > 0
  );
};

/**
 * Cast composition data to LadderData array
 * @param compositionData - The composition data to cast
 * @returns Casted LadderData array
 */
export const castToLadderDataArray = (
  compositionData: unknown,
): LadderData[] => {
  return compositionData as unknown as LadderData[];
};

/**
 * Calculate duration in frames for ladder sequences
 * @param timings - Video data timings object
 * @returns Duration in frames (FPS_LADDER or default)
 */
export const calculateLadderDuration = (
  timings: Timings | undefined,
): number => {
  return timings?.FPS_LADDER || DEFAULT_LADDER_DURATION;
};
```

**Key Points:**
- **Validation**: Check if data exists and is valid
- **Type casting**: Safely cast unknown data to your types
- **Calculations**: Duration, dimensions, etc.
- **Defaults**: Provide sensible fallbacks

---

### Step 3: Create Empty State Component

Create a component to show when there's no data.

**Example:** `src/compositions/cricket/ladder/modules/NoLadderData/no-data.tsx`

```typescript
import React from "react";
import { AbsoluteFill } from "remotion";

export const NoLadderData: React.FC = () => {
  return (
    <AbsoluteFill className="flex justify-center items-center text-white font-sans">
      <h1 className="text-3xl">No ladder data available</h1>
    </AbsoluteFill>
  );
};

export default NoLadderData;
```

**Key Points:**
- **Use `AbsoluteFill`**: Remotion-specific component that fills the entire composition
- **Simple styling**: Plain HTML elements are sufficient for empty states
- **Handles the case** when `data` is empty or invalid
- **Remotion pattern**: `AbsoluteFill` is the standard way to create full-screen components in Remotion

---

### Step 4: Create Display Component (Basic Variant)

Create the first Display component for the Basic variant.

**Example:** `src/compositions/cricket/ladder/controller/Display/display-Basic.tsx`

```typescript
import React from "react";
import TableHeader from "../../modules/TableHeader/header";
import StandardRow from "../TeamRows/StandardRow";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { SponsorFooter } from "../../../sponsorFooter";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { LadderDisplayProps } from "./_types/LadderDisplayProps";
import { calculateRowDimensions } from "./_utils/calculations";

export const LadderDisplayBasic: React.FC<LadderDisplayProps> = ({
  ladder,
}) => {
  const { selectedPalette, layout } = useThemeContext();
  const { League, gradeName, bias, assignSponsors } = ladder;
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { headerHeight, rowHeight } = calculateRowDimensions(
    heights.asset,
    League.length,
  );

  return (
    <div className="p-0 flex flex-col w-full h-full">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container} flex-1 flex flex-col mx-8 p-2 overflow-hidden`}
        backgroundColor={undefined}
        style={{
          background: selectedPalette.container.backgroundTransparent.high,
        }}
        animation={containerAnimation.containerIn}
        exitAnimation={containerAnimation.containerOut}
      >
        <div>
          <TableHeader title={gradeName} headerHeight={headerHeight} />
          <div className="flex-1 overflow-hidden">
            {League.map((team, index) => (
              <StandardRow
                key={team.position}
                team={team}
                index={index}
                totalTeams={League.length}
                isBiasTeam={team.teamName === bias}
                LadderRowHeight={rowHeight}
              />
            ))}
          </div>
        </div>
      </AnimatedContainer>
      <div style={{ height: `${heights.footer}px` }}>
        <SponsorFooter assignSponsors={assignSponsors} />
      </div>
    </div>
  );
};

export default LadderDisplayBasic;
```

**Key Points:**
- **Props Interface**: Create `_types/LadderDisplayProps.ts` first
- **Context Usage**: Use `useThemeContext()`, `useAnimationContext()`
- **Layout Calculations**: Calculate dimensions based on data (e.g., row heights)
- **Mapping**: Map over arrays (teams, games, players, etc.)
- **Composition**: Compose modules, layouts, shared components

**Create the Props Type:**

`controller/Display/_types/LadderDisplayProps.ts`:

```typescript
import { LadderData } from "../../../types";

export interface LadderDisplayProps {
  ladder: LadderData;
}
```

**Create TeamRow Props Type:**

`controller/TeamRows/_types/TeamRowProps.ts`:

```typescript
import { TeamData } from "../../../types";

export interface TeamRowProps {
  team: TeamData;
  index: number;
  totalTeams: number;
  isBiasTeam: boolean;
  LadderRowHeight: number;
  wrapperClass?: string; // Optional wrapper class for styling
}
```

**Create BaseLayout Props Type:**

`layout/_types/BaseLayoutProps.ts`:

```typescript
import { TeamData } from "../../types";

export interface BaseLayoutProps {
  team: TeamData;
  delay: number; // Animation delay in frames
  LadderRowHeight: number;
  place: number; // Parsed position number
  bgColorClass?: string; // Optional background color class
}
```

**Create Calculation Utils:**

`controller/Display/_utils/calculations.ts`:

```typescript
/**
 * Calculate row dimensions for ladder display
 * @param totalHeight - Total available height for the ladder
 * @param teamCount - Number of teams in the ladder
 * @returns Object containing headerHeight and rowHeight
 */
export const calculateRowDimensions = (
  totalHeight: number,
  teamCount: number,
): { headerHeight: number; rowHeight: number } => {
  const headerHeight = 70;
  const VERTICAL_GAP = 4;
  const PADDING = 20;
  const HEADER_MARGIN = 10;

  const ladderHeight = totalHeight - headerHeight;
  const totalVerticalGaps = (teamCount - 1) * VERTICAL_GAP;
  const availableHeight = ladderHeight - PADDING * 2 - HEADER_MARGIN;
  const rowHeight = (availableHeight - totalVerticalGaps) / teamCount;

  return {
    headerHeight,
    rowHeight,
  };
};
```

**Create TeamRows Animation Utilities:**

`controller/TeamRows/_utils/calculations.ts`:

```typescript
import { Timings } from "../../../../../../core/types/data/common";

/**
 * Calculate animation delay for a row based on its index
 * @param index - The row index
 * @param multiplier - Delay multiplier (default: 5)
 * @returns Animation delay in frames
 */
export const calculateAnimationDelay = (
  index: number,
  multiplier: number = 5,
): number => {
  return index * multiplier;
};

/**
 * Calculate the exit frame for animation based on timings
 * @param timings - Video data timings object
 * @returns Exit frame number
 */
export const calculateAnimationOutFrame = (
  timings: Timings | undefined,
): number => {
  return timings?.FPS_LADDER ? timings.FPS_LADDER - 20 : 0;
};

/**
 * Parse team position from string to number
 * @param position - Team position as string
 * @returns Parsed position as number
 */
export const parseTeamPosition = (position: string): number => {
  return parseInt(position);
};
```

**Create StandardRow Component:**

`controller/TeamRows/StandardRow.tsx`:

```typescript
import React from "react";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import StandardLadderRow from "../../layout/TableRowLayout";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { TeamRowProps } from "./_types/TeamRowProps";
import {
  calculateAnimationDelay,
  calculateAnimationOutFrame,
  parseTeamPosition,
} from "./_utils/calculations";

export const StandardRow: React.FC<TeamRowProps> = ({
  team,
  index,
  totalTeams,
  isBiasTeam,
  LadderRowHeight,
}) => {
  const { data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();
  const containerAnimation = animations.container.main.itemContainer;
  const { timings } = data;

  // Stagger the animation of each row
  const delay = calculateAnimationDelay(index, 5);
  const animationOutFrame = calculateAnimationOutFrame(timings);

  // Determine background color based on position and bias team
  let bgColorClass = "";
  const position = parseTeamPosition(team.position);

  if (isBiasTeam) {
    bgColorClass = "bg-blue-900/70";
  } else if (position <= 1) {
    bgColorClass = "bg-green-500/50";
  } else if (position > totalTeams - 1) {
    bgColorClass = "bg-red-500/50";
  } else {
    bgColorClass = index % 2 === 0 ? "bg-black/30" : "bg-black/10";
  }

  return (
    <div className="overflow-hidden">
      <AnimatedContainer
        type="full"
        className={`${layout.borderRadius.container}`}
        backgroundColor="none"
        animation={containerAnimation.containerIn}
        animationDelay={delay}
        exitAnimation={containerAnimation.containerOut}
        exitFrame={animationOutFrame}
      >
        <StandardLadderRow
          team={team}
          delay={delay}
          bgColorClass={bgColorClass}
          LadderRowHeight={LadderRowHeight}
          place={position}
        />
      </AnimatedContainer>
    </div>
  );
};

export default StandardRow;
```

---

### Step 5: Create Variant Entry Point

Create the main component file for your first variant (e.g., `basic.tsx`).

**Example:** `src/compositions/cricket/ladder/basic.tsx`

```typescript
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { LadderData } from "./types";
import LadderDisplayBasic from "./controller/Display/display-Basic";
import NoLadderData from "./modules/NoLadderData/no-data";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import {
  hasValidLadderData,
  castToLadderDataArray,
  calculateLadderDuration,
} from "./_utils/helpers";

// Main component with TransitionSeries
export const CricketLadderWithTransitions: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: CompositionData } = data;
  const { timings } = data;
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  // If no data is available, show a placeholder
  if (!hasValidLadderData(CompositionData)) {
    return <NoLadderData />;
  }

  // Explicitly cast CompositionData to LadderData[] for the map function
  const ladderDataArray = castToLadderDataArray(CompositionData);

  return (
    <TransitionSeriesWrapper
      sequences={ladderDataArray.map((ladder: LadderData) => ({
        content: <LadderDisplayBasic ladder={ladder} />,
        durationInFrames: calculateLadderDuration(timings),
      }))}
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
  return <CricketLadderWithTransitions />;
};
```

**Key Points:**
- **Data Access**: Use `useVideoDataContext()` to get `data`
- **Data Path**: Access via `data.data` (composition-specific data)
- **Validation**: Check if data exists before rendering
- **Transitions**: Use `TransitionSeriesWrapper` for multiple items
- **Duration**: Calculate from `timings` or use defaults
- **Export**: Export a named component matching the variant ID (lowercase)

---

### Step 6: Export from Composition Index

Create or update `index.tsx` to export your variant.

**Example:** `src/compositions/cricket/ladder/index.tsx`

```typescript
// Import variant components
import { Basic as ladderBasic } from "./basic";
// Import other variants as you create them
// import { Classic as ladderClassic } from "./classic";
// import { Brickwork as ladderBrickWork } from "./brickWork";

// Export all template implementations
export { ladderBasic as basic };
// Add more as you create them:
// export { ladderClassic as classic };
// export { ladderBrickWork as brickwork };
```

**Key Points:**
- **Import**: Import each variant component
- **Export**: Export with lowercase key matching variant ID
- **Naming**: Use descriptive names (e.g., `ladderBasic` to avoid conflicts)

---

### Step 7: Add to Sport Module Export

Add your composition to the sport's main index file.

**Example:** `src/compositions/cricket/index.tsx`

```typescript
// Import ladder variants
import {
  basic as ladderBasic,
  // Add more variants as you create them
} from "./ladder";

// ... other composition imports

// Export implementations for all composition types
export const CricketLadder = {
  basic: ladderBasic,
  // Add more variants as you create them:
  // classic: ladderClassic,
  // brickwork: ladderBrickWork,
};
```

**Key Points:**
- **Export Name**: Must match the composition ID in routing (e.g., `CricketLadder`)
- **Keys**: Lowercase variant IDs (e.g., `basic`, `classic`, `brickwork`)
- **Structure**: Object mapping variant IDs to components

---

### Step 8: Register in Routing System

The routing system automatically discovers compositions from the sport module exports. However, you need to ensure the composition ID is registered.

**Check:** `src/core/utils/routing.tsx`

```typescript
const SPORT_COMPOSITION_TYPES: SportCompositionTypes = {
  cricket: {
    CricketLadder: "CricketLadder", // ✅ Already registered
    // ... other composition types
  },
  // ... other sports
};
```

**If your composition is new**, add it:

```typescript
const SPORT_COMPOSITION_TYPES: SportCompositionTypes = {
  cricket: {
    CricketLadder: "CricketLadder",
    CricketYourNewComposition: "CricketYourNewComposition", // Add this
    // ... other composition types
  },
};
```

**Key Points:**
- **Composition ID**: Must match the key in your sport module export
- **Type Mapping**: Maps the composition ID to the export name
- **Routing**: The system uses this to find the right composition module

---

## Creating Variant Implementations

Once you have the Basic variant working, create additional variants for other template styles.

### Pattern for Additional Variants

1. **Create Display Component** (`controller/Display/display-{Variant}.tsx`):
   - Copy from Basic or create variant-specific layout
   - Use variant-specific modules if needed

2. **Create Variant Entry Point** (`{variant}.tsx`):
   - Copy from `basic.tsx`
   - Change import to your new Display component
   - Change export name to match variant ID

3. **Export from Index** (`index.tsx`):
   - Add import and export

4. **Export from Sport Module** (`src/compositions/cricket/index.tsx`):
   - Add to the composition object

**Example:** Creating `classic.tsx` variant

```typescript
// classic.tsx
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import {
  TransitionDirection,
  TransitionSeriesWrapper,
  TransitionType,
} from "../../../components/transitions";
import { LadderData } from "./types";
import LadderDisplayClassic from "./controller/Display/display-classic"; // Different display
import NoLadderData from "./modules/NoLadderData/no-data";
import { useAnimationContext } from "../../../core/context/AnimationContext";
import {
  hasValidLadderData,
  castToLadderDataArray,
  calculateLadderDuration,
} from "./_utils/helpers";

export const CricketLadderWithTransitions: React.FC = () => {
  // ... same as basic.tsx
  return (
    <TransitionSeriesWrapper
      sequences={ladderDataArray.map((ladder: LadderData) => ({
        content: <LadderDisplayClassic ladder={ladder} />, // Different component
        durationInFrames: calculateLadderDuration(timings),
      }))}
      // ... rest same
    />
  );
};

export const Classic: React.FC = () => {
  return <CricketLadderWithTransitions />;
};
```

---

## Hooking Up to Routing

### How Routing Works

1. **Data Flow**:
   ```
   VideoData → RouteToComposition → Sport Module → Composition Type → Variant Component
   ```

2. **Key Data Points**:
   - `data.videoMeta.video.metadata.compositionId` → Composition ID (e.g., `"CricketLadder"`)
   - `data.videoMeta.video.appearance.template` → Variant ID (e.g., `"basic"`, `"classic"`)
   - `data.videoMeta.club.sport` → Sport (e.g., `"cricket"`)

3. **Routing Process**:
   - `RouteToComposition` reads composition ID and template ID
   - Looks up sport module (`SPORT_MODULES[cricket]`)
   - Gets composition type (`CricketLadder`)
   - Gets variant component (`CricketLadder[basic]`)
   - Renders the component

### Testing Routing

1. **Check Composition ID**:
   ```typescript
   // In your test data
   metadata: {
     compositionId: "CricketLadder", // Must match SPORT_COMPOSITION_TYPES
   }
   ```

2. **Check Template ID**:
   ```typescript
   appearance: {
     template: "basic", // Must match key in CricketLadder export
   }
   ```

3. **Verify Export Chain**:
   - `src/compositions/cricket/ladder/index.tsx` exports `basic`
   - `src/compositions/cricket/index.tsx` exports `CricketLadder = { basic: ... }`
   - `src/core/utils/routing.tsx` maps `CricketLadder` → `"CricketLadder"`

---

## Animation Utilities

### TeamRows Animation Utilities

**Location:** `controller/TeamRows/_utils/calculations.ts`

These utilities handle animation timing and data parsing for team rows:

```typescript
import { Timings } from "../../../../../../core/types/data/common";

/**
 * Calculate animation delay for a row based on its index
 * @param index - The row index
 * @param multiplier - Delay multiplier (default: 5)
 * @returns Animation delay in frames
 */
export const calculateAnimationDelay = (
  index: number,
  multiplier: number = 5,
): number => {
  return index * multiplier;
};

/**
 * Calculate the exit frame for animation based on timings
 * @param timings - Video data timings object
 * @returns Exit frame number
 */
export const calculateAnimationOutFrame = (
  timings: Timings | undefined,
): number => {
  return timings?.FPS_LADDER ? timings.FPS_LADDER - 20 : 0;
};

/**
 * Parse team position from string to number
 * @param position - Team position as string
 * @returns Parsed position as number
 */
export const parseTeamPosition = (position: string): number => {
  return parseInt(position);
};
```

**Usage in StandardRow:**

```typescript
const delay = calculateAnimationDelay(index, 5);
const animationOutFrame = calculateAnimationOutFrame(timings);
const position = parseTeamPosition(team.position);
```

**Key Points:**
- **Staggered delays**: Each row animates with a delay based on its index
- **Exit timing**: Exit animations start 20 frames before composition ends
- **Position parsing**: Converts string positions to numbers for calculations

---

## Layout Component Options

### Available Layout Components

**Location:** `layout/TableRowLayout.tsx`

Multiple layout components are available for different visual styles:

#### 1. StandardLadderRow (Default)

- Logo on left, team name, stats on right
- Used by Basic variant
- Simple, clean layout

#### 2. BalancedLadderRow

- Logo on right, team name on left
- Alternating backgrounds for stats
- Used by StandardRowWrapped

#### 3. ModernLadderRow

- Team info in branded box
- Stats in separated boxes
- Modern, card-like appearance

#### 4. CardLadderRow

- Trading card style with inner borders
- Logo and name in left section, stats in right
- Distinctive card-based design

#### 5. CenteredLogoLadderRow

- Grid layout with centered logo
- Team name on left, logo center, stats on right
- Balanced, centered design

**How to Import and Use:**

```typescript
import StandardLadderRow, {
  BalancedLadderRow,
  ModernLadderRow,
  CardLadderRow,
  CenteredLogoLadderRow,
} from "../../layout/TableRowLayout";

// In your component:
<StandardLadderRow
  team={team}
  delay={delay}
  bgColorClass={bgColorClass}
  LadderRowHeight={LadderRowHeight}
  place={position}
/>
```

**All layouts accept `BaseLayoutProps`:**
- `team: TeamData`
- `delay: number`
- `LadderRowHeight: number`
- `place: number`
- `bgColorClass?: string`

---

## Primitive Components

### Shared Primitive Components

**Location:** `src/compositions/cricket/utils/primitives/`

These reusable components are shared across cricket compositions:

#### 1. TeamLogo

**Path:** `../../utils/primitives/TeamLogo`

Displays team logos with fallback handling:

```typescript
import TeamLogo from "../../utils/primitives/TeamLogo";

<TeamLogo
  logo={team.clubLogo || team.playHQLogo}
  teamName={team.teamName}
  delay={delay}
  size={20} // optional
  fit="contain" // optional
/>
```

**Props:**
- `logo: TeamLogo | null` - Logo object with url, width, height
- `teamName: string` - Team name for alt text/fallback
- `delay: number` - Animation delay in frames
- `size?: number` - Logo size (default: 20)
- `fit?: "contain" | "cover" | "fill" | "none" | "scale-down"` - Image fit mode

#### 2. LadderTeamName

**Path:** `../../utils/primitives/ladderTeamName`

Displays team names with animation:

```typescript
import LadderTeamName from "../../utils/primitives/ladderTeamName";

<LadderTeamName
  value={team.teamName}
  variant="onContainerCopy" // optional
  textAlign="left" // optional
  delay={delay}
/>
```

**Props:**
- `value: string` - Team name to display
- `variant?: string` - Text variant (default: "onContainerCopy")
- `textAlign?: "left" | "right" | "center"` - Text alignment (default: "left")
- `delay: number` - Animation delay in frames

#### 3. LadderTeamPoints

**Path:** `../../utils/primitives/ladderTeamPoints`

Displays team statistics (points, wins, losses, etc.):

```typescript
import LadderTeamPoints from "../../utils/primitives/ladderTeamPoints";

<LadderTeamPoints
  value={team.P || 0}
  variant="onContainerCopy" // optional
  textAlign="center" // optional
  delay={delay}
/>
```

**Props:**
- `value: string | number` - Stat value to display
- `variant?: string` - Text variant (default: "onContainerCopy")
- `textAlign?: "left" | "right" | "center"` - Text alignment (default: "center")
- `delay: number` - Animation delay in frames

**Usage Example in Layout:**

```typescript
// Example from StandardLadderRow
<div className="flex-1 truncate">
  <LadderTeamName value={team.teamName} delay={delay} />
</div>

<div className="w-10 text-center whitespace-nowrap">
  <LadderTeamPoints value={team?.P || 0} delay={delay} />
</div>
```

**Key Points:**
- **Consistent styling**: All primitives use theme-aware styling
- **Animation support**: All accept `delay` for staggered animations
- **Reusable**: Shared across all cricket compositions
- **Type-safe**: Properly typed with TypeScript

---

## Shared Dependencies

### SponsorFooter Component

**Location:** `src/compositions/cricket/sponsorFooter/index.tsx`

Shared component for displaying sponsor footers across all cricket compositions:

```typescript
import { SponsorFooter } from "../../../sponsorFooter";

<div style={{ height: `${heights.footer}px` }}>
  <SponsorFooter assignSponsors={assignSponsors} />
</div>
```

**Props:**
- `assignSponsors: AssignSponsors` - Sponsor assignment data

**Key Points:**
- **Shared component**: Used by all cricket compositions
- **Height-aware**: Uses theme heights for footer spacing
- **Requires data**: Needs `AssignSponsors` from composition data

### composition-types Import

**Location:** `src/compositions/cricket/composition-types.ts`

Shared TypeScript interfaces for cricket compositions:

```typescript
export interface AssignSponsors {
  team: {
    away: { name: string };
    home: { name: string };
    logo: {
      url: string;
      width?: number;
      height?: number;
    };
  }[];
  grade: {
    id: number;
    name: string;
    logo: {
      url: string;
      width?: number;
      height?: number;
    };
  }[];
  competition: {
    id: number;
    name: string;
    logo: {
      url: string;
      width?: number;
      height?: number;
    };
  }[];
}
```

**Usage:**

```typescript
import { AssignSponsors } from "../composition-types";

export interface LadderData {
  // ... other fields
  assignSponsors: AssignSponsors;
}
```

**Key Points:**
- **Shared types**: Used across all cricket compositions
- **Sponsor structure**: Defines team, grade, and competition sponsors
- **Logo support**: Includes logo URLs and dimensions

---

## Background Color Logic

### Row Background Color Calculation

**Location:** `controller/TeamRows/StandardRow.tsx`

Background colors are calculated based on team position and bias status:

```typescript
// Determine background color based on position and bias team
let bgColorClass = "";
const position = parseTeamPosition(team.position);

if (isBiasTeam) {
  bgColorClass = "bg-blue-900/70"; // Highlighted team
} else if (position <= 1) {
  bgColorClass = "bg-green-500/50"; // Top position
} else if (position > totalTeams - 1) {
  bgColorClass = "bg-red-500/50"; // Bottom positions (relegation zone)
} else {
  bgColorClass = index % 2 === 0 ? "bg-black/30" : "bg-black/10"; // Zebra striping
}
```

**Color Rules:**

- **Bias team** → `bg-blue-900/70` (highlighted team - usually the club's team)
- **Position 1** → `bg-green-500/50` (top position - leading)
- **Bottom positions** → `bg-red-500/50` (relegation zone - last place)
- **Alternating rows** → `bg-black/30` / `bg-black/10` (zebra striping for readability)

**Theme-Aware Alternative:**

`StandardRowWrapped` uses theme-aware colors instead of hardcoded classes:

```typescript
const { selectedPalette } = useThemeContext();

bgColorClass =
  index % 2 === 0
    ? selectedPalette.container.backgroundTransparent.low
    : selectedPalette.container.backgroundTransparent.subtle;
```

**Key Points:**
- **Visual hierarchy**: Colors help users identify important positions
- **Bias highlighting**: Makes the club's team stand out
- **Accessibility**: Alternating colors improve readability
- **Theme integration**: Can use theme-aware colors for consistency

---

## Variant-Specific Components

### StandardRowWrapped Component

**Location:** `controller/TeamRows/StandardRow.tsx`

Alternative row component with different styling:

**Differences from StandardRow:**

- Uses `BalancedLadderRow` instead of `StandardLadderRow`
- Animation delay multiplier: `9` instead of `5` (slower stagger)
- Uses theme-aware background colors instead of hardcoded classes

```typescript
export const StandardRowWrapped: React.FC<TeamRowProps> = ({
  team,
  index,
  totalTeams,
  isBiasTeam,
  LadderRowHeight,
}) => {
  const delay = calculateAnimationDelay(index, 9); // Different multiplier
  const animationOutFrame = calculateAnimationOutFrame(timings);
  const position = parseTeamPosition(team.position);
  
  const { selectedPalette } = useThemeContext();
  
  // Theme-aware colors
  bgColorClass =
    index % 2 === 0
      ? selectedPalette.container.backgroundTransparent.low
      : selectedPalette.container.backgroundTransparent.subtle;

  return (
    <AnimatedContainer
      // ... animation props
    >
      <BalancedLadderRow // Different layout
        team={team}
        delay={delay}
        bgColorClass={bgColorClass}
        LadderRowHeight={LadderRowHeight}
        place={position}
      />
    </AnimatedContainer>
  );
};
```

### TableHeader Variants

**Location:** `modules/TableHeader/`

Multiple header variants are available for different template styles:

#### Available Variants:

1. **TableHeader** (default)
   - Location: `modules/TableHeader/header.tsx`
   - Used by Basic variant
   - Simple header with grade name and stat columns

2. **TableHeaderWrapped**
   - Location: `modules/TableHeader/header.tsx` (exported)
   - Has border and background styling
   - More prominent visual separation

3. **headerSixers**
   - Location: `modules/TableHeader/headerSixers.tsx`
   - Sixers Thunder variant
   - Branded styling

4. **headerCNSW**
   - Location: `modules/TableHeader/headerCNSW.tsx`
   - CNSW variant
   - Custom styling

5. **headerCNSW-private**
   - Location: `modules/TableHeader/headerCNSW-private.tsx`
   - CNSW Private variant
   - Private branding

6. **headerClassicTwoColumn**
   - Location: `modules/TableHeader/headerClassicTwoColumn.tsx`
   - Classic Two Column variant
   - Two-column layout

**Usage Pattern:**

```typescript
// Import variant-specific header
import TableHeader from "../../modules/TableHeader/header";
// or
import TableHeaderSixers from "../../modules/TableHeader/headerSixers";

<TableHeader title={gradeName} headerHeight={headerHeight} />
```

**Key Points:**
- **Variant-specific**: Each template variant can have its own header
- **Consistent props**: All headers accept `title` and `headerHeight`
- **Reusable**: Can mix and match headers with different layouts

---

## Animation Patterns

### Staggered Animation Delay

Rows animate in sequence with increasing delays:

**Pattern:**

```typescript
const delay = calculateAnimationDelay(index, multiplier);
// delay = index * multiplier (in frames)
```

**Examples:**

- `multiplier = 5`: Row 0 = 0 frames, Row 1 = 5 frames, Row 2 = 10 frames
- `multiplier = 9`: Row 0 = 0 frames, Row 1 = 9 frames, Row 2 = 18 frames

**Usage:**

```typescript
<AnimatedContainer
  animation={containerAnimation.containerIn}
  animationDelay={delay} // Staggered delay
  exitAnimation={containerAnimation.containerOut}
  exitFrame={animationOutFrame}
>
```

**Key Points:**
- **Visual flow**: Creates a cascading animation effect
- **Configurable**: Multiplier controls animation speed
- **Frame-based**: Delays are in Remotion frames, not seconds

### Exit Frame Calculation

Exit animations are timed to start before the composition ends:

**Pattern:**

```typescript
const animationOutFrame = calculateAnimationOutFrame(timings);
// Returns: timings?.FPS_LADDER ? timings.FPS_LADDER - 20 : 0
```

**Logic:**

- Exit animation starts **20 frames before** composition ends
- Ensures smooth transition out
- Falls back to frame 0 if no timing data

**Usage:**

```typescript
<AnimatedContainer
  exitAnimation={containerAnimation.containerOut}
  exitFrame={animationOutFrame} // Starts 20 frames before end
>
```

**Key Points:**
- **Smooth transitions**: Prevents abrupt endings
- **Timing-aware**: Uses composition duration from timings
- **Fallback**: Handles missing timing data gracefully

### Additional Utilities

#### OverflowHiddenWrapper Component

**Location:** `controller/TeamRows/_utils/components.tsx`

Simple utility component for overflow handling:

```typescript
import React from "react";

/**
 * Simple wrapper component for overflow hidden styling
 */
export const OverflowHiddenWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="overflow-hidden">{children}</div>;
};
```

**Purpose:** Provides consistent overflow handling across components

---

## Common Patterns

### Pattern 1: Single Item (No Transitions)

If your composition shows a single item (not an array):

```typescript
export const YourComposition: React.FC = () => {
  const { data } = useVideoDataContext();
  const { data: CompositionData } = data;

  if (!CompositionData) {
    return <NoDataComponent />;
  }

  // Cast to your type
  const yourData = CompositionData as YourDataType;

  return <YourDisplayComponent data={yourData} />;
};
```

### Pattern 2: Array with Transitions

If you have multiple items and want transitions:

```typescript
export const YourComposition: React.FC = () => {
  const { data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const transitionConfig = animations.transition.Main;

  const dataArray = castToArray(CompositionData);

  return (
    <TransitionSeriesWrapper
      sequences={dataArray.map((item) => ({
        content: <YourDisplayComponent data={item} />,
        durationInFrames: calculateDuration(timings),
      }))}
      transitionType={transitionConfig.type as TransitionType}
      direction={transitionConfig.direction as TransitionDirection}
      timing={{
        type: "linear",
        durationInFrames: transitionConfig.durationInFrames,
      }}
    />
  );
};
```

### Pattern 3: Conditional Rendering Based on Data

```typescript
export const YourDisplayComponent: React.FC<Props> = ({ data }) => {
  if (data.items.length === 0) {
    return <EmptyState />;
  }

  if (data.items.length === 1) {
    return <SingleItemLayout data={data.items[0]} />;
  }

  return <MultiItemLayout data={data.items} />;
};
```

### Pattern 4: Using Theme Context

```typescript
const { selectedPalette, layout, fontClasses } = useThemeContext();
const { heights, borderRadius } = layout;

// Use in styles
style={{
  background: selectedPalette.container.backgroundTransparent.high,
  borderRadius: borderRadius.container,
  height: `${heights.asset}px`,
}}
```

### Pattern 5: Using Animation Context

```typescript
const { animations } = useAnimationContext();
const containerAnimation = animations.container.main.itemContainer;

<AnimatedContainer
  animation={containerAnimation.containerIn}
  exitAnimation={containerAnimation.containerOut}
  animationDelay={delay}
>
  {/* content */}
</AnimatedContainer>
```

---

## Testing

### 1. Test Data Structure

Create test data matching your types:

```typescript
const testData: LadderData[] = [
  {
    ID: 1,
    gradeName: "Grade A",
    League: [
      {
        position: "1",
        teamName: "Team A",
        P: "10",
        W: "8",
        L: "2",
        // ... other fields
      },
    ],
    bias: "Team A",
    prompt: "Test prompt",
    assignSponsors: { /* ... */ },
  },
];
```

### 2. Test in Remotion Studio

1. **Set up test data** in your Remotion root:
   ```typescript
   // In DevelopmentRoot.tsx or test file
   const testVideoData = {
     videoMeta: {
       video: {
         metadata: {
           compositionId: "CricketLadder",
         },
         appearance: {
           template: "basic",
         },
       },
       club: {
         sport: "cricket",
       },
     },
     data: testData, // Your test data
   };
   ```

2. **Render composition**:
   ```typescript
   <VideoDataProvider data={testVideoData}>
     <RouteToComposition />
   </VideoDataProvider>
   ```

### 3. Test Multiple Variants

Test each variant you create:
- `basic`
- `classic`
- `brickwork`
- etc.

### 4. Test Edge Cases

- Empty data array
- Single item
- Many items (performance)
- Missing fields (optional vs required)
- Invalid data types

---

## Troubleshooting

### Issue: Composition Not Found

**Error:** `Missing compositionType` or `Unknown composition ID`

**Solutions:**
1. Check `SPORT_COMPOSITION_TYPES` in `routing.tsx` - ensure your composition ID is registered
2. Check export name in sport module (`src/compositions/cricket/index.tsx`) - must match exactly
3. Check `compositionId` in test data - must match the key in `SPORT_COMPOSITION_TYPES`

### Issue: Variant Not Found

**Error:** `Missing template implementation` or `Missing TemplateComponent`

**Solutions:**
1. Check variant export in composition index (`ladder/index.tsx`) - key must be lowercase
2. Check variant export in sport module (`cricket/index.tsx`) - key must match
3. Check `template` value in test data - must match the key in composition export
4. Verify component is exported correctly (named export, not default)

### Issue: Type Errors

**Error:** TypeScript errors about missing properties or wrong types

**Solutions:**
1. Check `types.ts` - ensure all required fields are defined
2. Check data structure - ensure test data matches types
3. Use type assertions carefully - prefer proper typing over `as unknown as`
4. Check helper functions - ensure they return correct types

### Issue: Data Not Rendering

**Error:** Component renders but shows empty state or no data

**Solutions:**
1. Check `hasValidData()` function - ensure it correctly validates your data
2. Check data path - `data.data` is correct for composition data
3. Check data structure - ensure it matches your types
4. Add console logs to debug data flow

### Issue: Transitions Not Working

**Error:** No transitions between items or transition errors

**Solutions:**
1. Check `TransitionSeriesWrapper` usage - ensure sequences array is correct
2. Check animation config - ensure `transitionConfig` is available
3. Check duration calculation - ensure it returns a valid number
4. Verify data array - ensure it has multiple items

### Issue: Styling Issues

**Error:** Components don't match theme or look wrong

**Solutions:**
1. Check theme context usage - ensure `useThemeContext()` is called
2. Check layout calculations - ensure heights/dimensions are calculated correctly
3. Check responsive design - ensure components adapt to different screen sizes
4. Verify template variant - ensure you're using the right Display component

---

## Quick Reference

### File Checklist

When creating a new composition, ensure you have:

- [ ] `types.ts` - Data type definitions
- [ ] `_utils/helpers.ts` - Validation and utility functions
- [ ] `modules/NoData/no-data.tsx` - Empty state component
- [ ] `controller/Display/_types/DisplayProps.ts` - Props interface
- [ ] `controller/Display/_utils/calculations.ts` - Display-specific calculations
- [ ] `controller/Display/display-Basic.tsx` - Basic variant display component
- [ ] `basic.tsx` - Basic variant entry point
- [ ] `index.tsx` - Composition exports
- [ ] `readMe.md` - Folder documentation
- [ ] Updated `src/compositions/{sport}/index.tsx` - Sport module export
- [ ] Updated `src/core/utils/routing.tsx` - Composition ID registration (if new)

### Export Chain Checklist

Ensure the export chain is correct:

1. **Variant Component** (`basic.tsx`):
   ```typescript
   export const Basic: React.FC = () => { ... };
   ```

2. **Composition Index** (`ladder/index.tsx`):
   ```typescript
   import { Basic as ladderBasic } from "./basic";
   export { ladderBasic as basic };
   ```

3. **Sport Module** (`cricket/index.tsx`):
   ```typescript
   import { basic as ladderBasic } from "./ladder";
   export const CricketLadder = { basic: ladderBasic };
   ```

4. **Routing** (`routing.tsx`):
   ```typescript
   const SPORT_COMPOSITION_TYPES = {
     cricket: {
       CricketLadder: "CricketLadder", // Maps to export name
     },
   };
   ```

### Common Imports

```typescript
// Contexts
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import { useThemeContext } from "../../../core/context/ThemeContext";
import { useAnimationContext } from "../../../core/context/AnimationContext";

// Components
import { AnimatedContainer } from "../../../components/containers/AnimatedContainer";
import { AnimatedText } from "../../../components/typography/AnimatedText";
import {
  TransitionSeriesWrapper,
  TransitionType,
  TransitionDirection,
} from "../../../components/transitions";

// Types
import { Timings } from "../../../../core/types/data/common";
```

### Key Functions

```typescript
// Validation
hasValidData(compositionData: unknown): boolean

// Type casting
castToDataArray(compositionData: unknown): YourDataType[]

// Duration calculation
calculateDuration(timings: Timings | undefined): number

// Dimension calculations
calculateDimensions(totalHeight: number, itemCount: number): Dimensions
```

---

## Next Steps

After creating your composition:

1. **Create additional variants** (classic, brickwork, etc.)
2. **Add variant-specific modules** if needed
3. **Optimize performance** (memoization, lazy loading)
4. **Add error boundaries** for better error handling
5. **Write tests** for critical logic
6. **Document** your composition in `readMe.md`
7. **Update** `.docs/DevelopmentRoadMap.md` if tracking progress

---

## References

- **Template Variant Guide**: `src/templates/.docs/how-to.md`
- **Routing System**: `src/core/utils/routing.tsx`
- **Composition Mapping**: `src/core/utils/compositionMapping.ts`
- **Example Compositions**:
  - `src/compositions/cricket/ladder/` - Ladder standings
  - `src/compositions/cricket/top5/` - Top 5 players
  - `src/compositions/cricket/results/` - Match results
  - `src/compositions/cricket/upcoming/` - Upcoming fixtures

---

**Last Updated:** 2026-02-07

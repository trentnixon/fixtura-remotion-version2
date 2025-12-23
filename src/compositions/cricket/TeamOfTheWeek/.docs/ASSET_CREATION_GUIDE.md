# Asset Creation Guide: How to Create and Integrate New Asset Types

This document outlines the complete process for creating a new asset type in the Fixtura Remotion system, using TeamOfTheWeek (CricketTeamOfTheWeek) as the reference example.

---

## Table of Contents

1. [Overview](#overview)
2. [Step-by-Step Process](#step-by-step-process)
3. [File Structure](#file-structure)
4. [Integration Points](#integration-points)
5. [Testing Your Asset](#testing-your-asset)
6. [Checklist](#checklist)

---

## Overview

Creating a new asset type involves:
1. **Folder Structure**: Creating organized folders and documentation
2. **Data Modeling**: Defining TypeScript types
3. **Component Development**: Building template variants and display components
4. **System Integration**: Hooking into the registration and routing system
5. **Testing**: Adding test data and verifying rendering

**Key Principle**: Follow the established patterns from existing assets (performances, results, ladder, etc.) for consistency.

---

## Step-by-Step Process

### 1. Create Folder Structure

Create your asset folder in the appropriate sport directory:

```
src/compositions/cricket/[AssetName]/
```

**Example for TeamOfTheWeek:**
```
src/compositions/cricket/TeamOfTheWeek/
```

### 2. Create Documentation Files

Following the .cursorrules documentation requirements, create three files:

#### A. `readMe.md`
- Describes folder purpose
- Lists files (initially placeholder, update as you create them)
- Documents relations (parent folder, dependencies, consumers)
- Lists internal and external dependencies

**Template:**
```markdown
# Folder Overview

[Brief description of what this asset does]

## Files

*To be populated as files are created*

- `index.tsx`: exports [AssetName] template variants
- `types.ts`: TypeScript interfaces for data structure
- `basic.tsx`: Basic template implementation
- [List other template variants]

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: `src/templates/*` variants, `src/core/*` contexts
- Consumed by: `src/compositions/cricket/index.tsx` for registration
- Test data: `testData/samples/Cricket/Cricket_[AssetName].json`

## Dependencies

- Internal: `controller`, `layout`, `modules`, `utils`
- External: Remotion, React, shared contexts
```

#### B. `DevelopmentRoadMap.md`
- Tracks completed tasks
- Lists remaining work (easy → hard)
- Provides recommendations

See the TeamOfTheWeek example for structure.

#### C. `Tickets.md`
- Detailed planning for each phase
- Uses ticket format with metadata, phases, and tasks
- Tracks completion and archives summaries

See the TeamOfTheWeek example for structure.

### 3. Create TypeScript Types

**File:** `types.ts`

Define interfaces for your data structure based on the JSON test data:

```typescript
// Example structure
export interface [AssetName]Data {
  // Define your data shape
  id: string;
  name: string;
  // ... other fields
}

// Helper type guards
export const is[Type] = (data: [AssetName]Data): data is [SpecificType] => {
  return data.type === "specificType";
};

// Animation constants
export const HEADER_ANIMATION_DURATION = 45;
export const [ASSET]_ANIMATION_DURATION = 30;

// Composition identifier
export const [ASSET]_COMPOSITION_ID = "Cricket[AssetName]";
```

**Key Considerations:**
- Match the JSON structure from your test data
- Create union types or discriminated unions for conditional data
- Add type guards for runtime type checking
- Define animation constants
- Include JSDoc comments for complex types

### 4. Create Test Data and Register It

#### A. Add JSON Test Data

**Location:** `testData/samples/Cricket/Cricket_[AssetName].json`

Ensure your JSON includes all required fields:
```json
{
  "data": [ /* your asset data */ ],
  "asset": { /* asset metadata */ },
  "render": { /* render info */ },
  "account": { /* account info */ },
  "timings": {
    "FPS_MAIN": 1005,
    "FPS_INTRO": 90,
    "FPS_OUTRO": 30,
    "FPS_[ASSET]": 180
  },
  "frames": [/* frame markers */],
  "videoMeta": {
    "club": { /* club data */ },
    "video": {
      "fixtureCategory": "Senior",
      "metadata": {
        "title": "Your Asset Title",
        "compositionId": "Cricket[AssetName]",
        "assetId": 69,
        // ... other metadata
      },
      "appearance": {
        "theme": { /* colors */ },
        "template": "Basic"
      },
      "media": { /* media assets */ },
      "contentLayout": {
        "divideFixturesBy": {
          "Cricket[AssetName]": 5  // items per screen
        }
      },
      "templateVariation": { /* template settings */ }
    }
  },
  "errors": []
}
```

**Critical Fields:**
- `videoMeta.video.metadata.compositionId`: Must match your export name (e.g., "CricketTeamOfTheWeek")
- `timings`: Define frame counts for each section
- `contentLayout.divideFixturesBy`: Set items per screen for pagination

#### B. Register Test Data

**File:** `testData/index.ts`

1. **Import the JSON:**
```typescript
import Cricket[AssetName] from "./samples/Cricket/Cricket_[AssetName].json";
```

2. **Add to testDatasets:**
```typescript
export const testDatasets: DatasetRecord = {
  // ... existing datasets
  Cricket[AssetName]: Cricket[AssetName],
};
```

3. **Add to datasetsByCategory:**
```typescript
export const datasetsByCategory: DatasetCategories = {
  Cricket: [
    // ... existing entries
    { id: "Cricket[AssetName]", name: "[Display Name]" },
  ],
  // ... other sports
};
```

### 5. Create Controller Components

Controllers handle data display and row rendering.

#### Folder Structure:
```
controller/
  ├── [AssetName]Display/
  │   ├── readMe.md
  │   ├── display-Basic.tsx
  │   ├── display-BrickWork.tsx
  │   └── [other template variants]
  └── [ItemType]Row/
      ├── readMe.md
      ├── row-Basic.tsx
      ├── row-BrickWork.tsx
      └── [other template variants]
```

#### Example Display Component:

**File:** `controller/TeamOfTheWeekDisplay/display-Basic.tsx`

```typescript
import React from "react";
import { TeamOfTheWeekPlayer } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import PlayerRowBasic from "../PlayerRow/row-Basic";

interface TeamOfTheWeekDisplayProps {
  players: TeamOfTheWeekPlayer[];
  itemsPerScreen: number;
  screenIndex: number;
}

const TeamOfTheWeekDisplayBasic: React.FC<TeamOfTheWeekDisplayProps> = ({
  players,
  itemsPerScreen,
  screenIndex,
}) => {
  const { layout } = useThemeContext();
  const { heights } = layout;
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  // Get items for this specific screen
  const displayedPlayers = getItemsForScreen(
    players,
    screenIndex,
    itemsPerScreen,
  );

  const rowHeight = 115; // Adjust as needed

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
        animationDelay={0}
        exitAnimation={ContainerAnimations.main.parent.containerOut}
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-1 w-full">
          {displayedPlayers.map((player, index) => (
            <div
              key={`${player.name}-${screenIndex}-${index}`}
              className="w-full"
            >
              <PlayerRowBasic
                player={player}
                index={index}
                rowHeight={rowHeight}
              />
            </div>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default TeamOfTheWeekDisplayBasic;
```

#### Example Row Component:

**File:** `controller/PlayerRow/row-Basic.tsx`

```typescript
import React from "react";
import { TeamOfTheWeekPlayer } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

interface PlayerRowProps {
  player: TeamOfTheWeekPlayer;
  index: number;
  rowHeight: number;
}

const PlayerRowBasic: React.FC<PlayerRowProps> = ({
  player,
  index,
  rowHeight,
}) => {
  const { animations } = useAnimationContext();
  const ContainerAnimations = animations.container;

  return (
    <AnimatedContainer
      type="full"
      className="relative"
      style={{ height: rowHeight }}
      backgroundColor="rgba(255,255,255,0.1)"
      animation={ContainerAnimations.main.child.containerIn}
      animationDelay={index * 5} // Stagger animation
      exitAnimation={ContainerAnimations.main.child.containerOut}
    >
      {/* Your player card layout here */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold">{player.rank}</span>
          <span className="text-xl">{player.player}</span>
        </div>
        {/* Add stats, logo, etc. */}
      </div>
    </AnimatedContainer>
  );
};

export default PlayerRowBasic;
```

### 6. Create Layout Components (Optional)

For more complex assets, create reusable layout components:

```
layout/
  ├── readMe.md
  ├── [ComponentName].tsx
  └── Sections/
      ├── [Section1].tsx
      └── [Section2].tsx
```

### 7. Create Template Files

Templates tie everything together and integrate with BaseTemplateLayout.

#### Folder Structure:
```
TeamOfTheWeek/
  ├── basic.tsx
  ├── brickWork.tsx
  ├── classic.tsx
  ├── classicTwoColumn.tsx
  ├── cnsw.tsx
  ├── cnswPrivate.tsx
  └── sixersThunder.tsx
```

#### Example Template File:

**File:** `basic.tsx`

```typescript
import React from "react";
import { Sequence } from "remotion";
import BaseTemplateLayout from "../../../templates/base/BaseTemplateLayout";
import { FixturaDataset } from "../../../core/types/data/index";
import IntroScreen from "../../../templates/base/components/intro/IntroScreen";
import OutroScreen from "../../../templates/base/components/outro/OutroScreen";
import TeamOfTheWeekDisplayBasic from "./controller/TeamOfTheWeekDisplay/display-Basic";
import { TeamOfTheWeekPlayer } from "./types";

interface TeamOfTheWeekBasicProps {
  data: FixturaDataset;
}

export const basic: React.FC<TeamOfTheWeekBasicProps> = ({ data }) => {
  const { videoMeta, timings, data: players } = data;

  const teamOfTheWeekData = players as TeamOfTheWeekPlayer[];
  const itemsPerScreen =
    videoMeta.video.contentLayout.divideFixturesBy.CricketTeamOfTheWeek || 5;

  const totalScreens = Math.ceil(teamOfTheWeekData.length / itemsPerScreen);
  const framesPerScreen = Math.floor(timings.FPS_MAIN / totalScreens);

  return (
    <BaseTemplateLayout data={data} templateVariant="Basic">
      {/* Intro */}
      <Sequence from={0} durationInFrames={timings.FPS_INTRO}>
        <IntroScreen data={data} />
      </Sequence>

      {/* Main Content */}
      {Array.from({ length: totalScreens }).map((_, screenIndex) => (
        <Sequence
          key={`screen-${screenIndex}`}
          from={timings.FPS_INTRO + screenIndex * framesPerScreen}
          durationInFrames={framesPerScreen}
        >
          <TeamOfTheWeekDisplayBasic
            players={teamOfTheWeekData}
            itemsPerScreen={itemsPerScreen}
            screenIndex={screenIndex}
          />
        </Sequence>
      ))}

      {/* Outro */}
      <Sequence
        from={timings.FPS_INTRO + timings.FPS_MAIN}
        durationInFrames={timings.FPS_OUTRO}
      >
        <OutroScreen data={data} />
      </Sequence>
    </BaseTemplateLayout>
  );
};
```

### 8. Create Asset Index File

**File:** `index.tsx`

Export all template variants:

```typescript
export { basic } from "./basic";
export { brickWork } from "./brickWork";
export { classic } from "./classic";
export { classicTwoColumn } from "./classicTwoColumn";
export { cnsw } from "./cnsw";
export { cnswPrivate } from "./cnswPrivate";
export { sixersThunder } from "./sixersThunder";
```

### 9. Register in Cricket Index

**File:** `src/compositions/cricket/index.tsx`

1. **Import your asset:**
```typescript
import {
  basic as teamOfTheWeekBasic,
  brickWork as teamOfTheWeekBrickWork,
  classic as teamOfTheWeekClassic,
  classicTwoColumn as teamOfTheWeekClassicTwoColumn,
  cnsw as teamOfTheWeekCNSW,
  cnswPrivate as teamOfTheWeekCNSWPrivate,
  sixersThunder as teamOfTheWeekSixersThunder,
} from "./TeamOfTheWeek";
```

2. **Export the composition object:**
```typescript
export const CricketTeamOfTheWeek = {
  basic: teamOfTheWeekBasic,
  brickwork: teamOfTheWeekBrickWork,
  sixers: teamOfTheWeekSixersThunder,
  thunder: teamOfTheWeekSixersThunder,
  classic: teamOfTheWeekClassic,
  twocolumnclassic: teamOfTheWeekClassicTwoColumn,
  cnsw: teamOfTheWeekCNSW,
  cnswprivate: teamOfTheWeekCNSWPrivate,
};
```

**Important:** The export name MUST match the `compositionId` in your JSON test data (e.g., "CricketTeamOfTheWeek").

### 10. Create Utility Functions (If Needed)

**File:** `utils/screenCalculator.ts`

```typescript
import { TeamOfTheWeekPlayer } from "../types";

export const getItemsForScreen = (
  items: TeamOfTheWeekPlayer[],
  screenIndex: number,
  itemsPerScreen: number,
): TeamOfTheWeekPlayer[] => {
  const startIndex = screenIndex * itemsPerScreen;
  const endIndex = startIndex + itemsPerScreen;
  return items.slice(startIndex, endIndex);
};

export const calculateTotalScreens = (
  totalItems: number,
  itemsPerScreen: number,
): number => {
  return Math.ceil(totalItems / itemsPerScreen);
};
```

### 11. Create NoData Module

**File:** `modules/NoData/NoTeamOfTheWeekData.tsx`

```typescript
import React from "react";

export const NoTeamOfTheWeekData: React.FC = () => {
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

---

## Integration Points

### System Components Your Asset Interacts With:

1. **Template Registry** (`src/templates/registry.tsx`)
   - Your templates use BaseTemplateLayout which connects to this registry

2. **Data Processing** (`src/core/utils/routing.tsx`)
   - Handles routing to the correct composition based on compositionId

3. **Context Providers**
   - `ThemeContext`: Provides theme colors, layout dimensions
   - `AnimationContext`: Provides animation configurations
   - `FontContext`: Provides font settings

4. **Development Root** (`src/DevelopmentRoot.tsx`)
   - Automatically picks up registered compositions for Studio preview

5. **Production Root** (`src/ProductionRoot.tsx`)
   - Uses compositionId from JSON to render the correct composition

---

## Testing Your Asset

### Step 1: Run Development Studio

```bash
npm run dev
```

### Step 2: Verify Your Asset Appears

1. Open Remotion Studio (usually http://localhost:3000)
2. Look for compositions matching pattern: `[Template]-[Variant]-Cricket[AssetName]`
   - Example: `Basic-Solid-CricketTeamOfTheWeek`

### Step 3: Test Rendering

1. Click on your composition in the Studio
2. Verify it renders without errors
3. Check that:
   - Data loads correctly
   - Animations play smoothly
   - Multiple screens transition properly (if applicable)
   - Styling matches expectations

### Step 4: Test Different Templates

1. Test each template variant (Basic, BrickWork, Classic, etc.)
2. Verify consistency across templates
3. Check responsive behavior

### Step 5: Test with Different Data

1. Modify the JSON test data
2. Test edge cases:
   - Empty data
   - Single item
   - Maximum items
   - Missing optional fields

---

## Checklist

Use this checklist to ensure you've completed all steps:

### Documentation
- [ ] Created `readMe.md` in asset folder
- [ ] Created `DevelopmentRoadMap.md` in asset folder
- [ ] Created `Tickets.md` in asset folder
- [ ] Updated parent `readMe.md` to include new asset
- [ ] Created `readMe.md` in controller subfolders
- [ ] Created `readMe.md` in layout subfolders (if applicable)

### Data & Types
- [ ] Created `types.ts` with comprehensive interfaces
- [ ] Added type guards for conditional data
- [ ] Defined animation constants
- [ ] Created JSON test data file
- [ ] Imported test data in `testData/index.ts`
- [ ] Added to `testDatasets` object
- [ ] Added to `datasetsByCategory` object
- [ ] Verified `compositionId` matches export name

### Components
- [ ] Created Display component (Basic variant)
- [ ] Created Row/Item component (Basic variant)
- [ ] Created Display components for other variants
- [ ] Created Row/Item components for other variants
- [ ] Created layout components (if needed)
- [ ] Created NoData module
- [ ] Created utility functions (if needed)

### Templates
- [ ] Created `basic.tsx` template
- [ ] Created `brickWork.tsx` template
- [ ] Created `classic.tsx` template
- [ ] Created `classicTwoColumn.tsx` template
- [ ] Created `cnsw.tsx` template
- [ ] Created `cnswPrivate.tsx` template
- [ ] Created `sixersThunder.tsx` template
- [ ] Created asset `index.tsx` exporting all variants

### Integration
- [ ] Imported asset in `cricket/index.tsx`
- [ ] Created export object in `cricket/index.tsx`
- [ ] Export name matches `compositionId` in JSON
- [ ] Mapped all template variant aliases (sixers/thunder, twocolumnclassic)

### Testing
- [ ] Asset appears in Development Studio
- [ ] Basic template renders without errors
- [ ] All template variants render correctly
- [ ] Data displays correctly
- [ ] Animations work as expected
- [ ] Multi-screen pagination works (if applicable)
- [ ] NoData state handles empty data
- [ ] Tested edge cases

---

## Common Pitfalls

### 1. CompositionId Mismatch
**Problem:** Composition doesn't render in production
**Solution:** Ensure export name in `cricket/index.tsx` exactly matches `compositionId` in JSON

### 2. Missing Frame Calculations
**Problem:** Timing is off or screens cut short
**Solution:** Verify `timings` object and screen duration calculations

### 3. Data Type Mismatches
**Problem:** Runtime errors when accessing data
**Solution:** Use type guards and optional chaining

### 4. Animation Conflicts
**Problem:** Animations don't play or overlap incorrectly
**Solution:** Check `animationDelay` values and sequence timing

### 5. Missing Dependencies
**Problem:** Components don't render or context is undefined
**Solution:** Ensure all imports are correct and contexts are available

---

## Additional Resources

- **Similar Assets to Reference:**
  - `performances`: Multi-stat display with categories
  - `results`: Card-based layout with pagination
  - `ladder`: Table-based display
  - `roster`: Player listing with metadata

- **Key Files to Understand:**
  - `src/templates/base/BaseTemplateLayout.tsx`: Base template structure
  - `src/core/utils/routing.tsx`: Composition routing logic
  - `testData/index.ts`: Test data registration
  - `src/compositions/cricket/index.tsx`: Cricket asset registry

---

## Questions?

If you encounter issues or have questions:
1. Review existing asset implementations
2. Check console for errors and warnings
3. Verify JSON structure matches types
4. Ensure all registration steps are complete
5. Test in both Development and Production modes

---

**Created:** 2025-12-17
**Last Updated:** 2025-12-17
**Asset Example:** TeamOfTheWeek (CricketTeamOfTheWeek)


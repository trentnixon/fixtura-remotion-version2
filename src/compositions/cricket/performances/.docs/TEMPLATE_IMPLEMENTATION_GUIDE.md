# Template Implementation Guide – Performances Composition

This guide explains how to implement additional template variants (brickWork, classic, classicTwoColumn, cnsw, cnsw-private, sixersThunder) for the Performances composition.

---

## 📋 Overview

Each template variant requires three main files:

1. **Entry Point** (`{variant}.tsx`) – Handles data, pagination, and transitions
2. **Display Controller** (`controller/PerformancesDisplay/display-{Variant}.tsx`) – Renders items for a single screen
3. **Row Component** (`controller/PlayerRow/row-{Variant}.tsx`) – Renders individual performance rows

---

## 🎯 Implementation Pattern

### Step 1: Create Entry Point (`{variant}.tsx`)

**Location:** `src/compositions/cricket/performances/{variant}.tsx`

**Pattern:** Copy from `basic.tsx` and adapt:

```typescript
import React from "react";
import { useVideoDataContext } from "../../../core/context/VideoDataContext";
import NoPlayersData from "./modules/NoPlayersData/no-data";
import PerformancesDisplay{Variant} from "./controller/PerformancesDisplay/display-{Variant}";
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

export const PerformancesList{Variant}: React.FC = () => {
  // ... (same logic as basic.tsx)
  // Copy the entire PerformancesList component from basic.tsx
  // Only change: Import and use PerformancesDisplay{Variant} instead of PerformancesDisplayBasic
};

export const {Variant}: React.FC = () => {
  return <PerformancesList{Variant} />;
};

export default {Variant};
```

**Key Points:**

- ✅ Keep all pagination and transition logic (identical to `basic.tsx`)
- ✅ Keep sponsor footer at global level
- ✅ Only change the display component import/usage
- ✅ Use `FPS_PREFORMANCECARD` for timing

---

### Step 2: Create Display Controller (`display-{Variant}.tsx`)

**Location:** `src/compositions/cricket/performances/controller/PerformancesDisplay/display-{Variant}.tsx`

**Pattern:** Copy from `display-Basic.tsx` and adapt styling:

```typescript
import React from "react";
import { PerformanceData } from "../../types";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import PerformanceRow{Variant} from "../PlayerRow/row-{Variant}";
import { getItemsForScreen } from "../../utils/screenCalculator";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";

const PerformancesDisplay{Variant}: React.FC<PerformancesDisplayProps> = ({
  performances,
  itemsPerScreen,
  screenIndex,
}) => {
  // ... (same logic as display-Basic.tsx)
  // Copy data fetching, screen calculation, rowHeight logic

  // Static row height - adjust per variant if needed
  const rowHeight = 140; // Or variant-specific height

  return (
    <div className="flex flex-col h-full ">
      <AnimatedContainer
        type="full"
        className="flex-1 flex flex-col mx-16 overflow-hidden py-32"
        // ... (same as basic)
      >
        <div className="flex-1 flex flex-col items-center justify-center gap-4 w-full">
          {displayedPerformances.map((performance, index) => (
            <div key={...} className="w-full">
              <PerformanceRow{Variant}
                performance={performance}
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
```

**Key Points:**

- ✅ Keep parent container structure (AnimatedContainer with same props)
- ✅ Keep pagination logic (getItemsForScreen)
- ✅ Adjust rowHeight if variant needs different height
- ✅ Keep flex layout for tight grouping
- ✅ Only change the row component import/usage

---

### Step 3: Create Row Component (`row-{Variant}.tsx`)

**Location:** `src/compositions/cricket/performances/controller/PlayerRow/row-{Variant}.tsx`

**Pattern:** Copy from `row-Basic.tsx` and adapt layout:

```typescript
import React from "react";
import { PerformanceData } from "../../types";
import { AnimatedContainer } from "../../../../../components/containers/AnimatedContainer";
import { useAnimationContext } from "../../../../../core/context/AnimationContext";
import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
import StandardPerformanceRow{Variant} from "../../layout/StandardPerformanceRow{Variant}";

const PerformanceRow{Variant}: React.FC<PerformanceRowProps> = ({
  performance,
  index,
  rowHeight,
}) => {
  // ... (same animation logic as row-Basic.tsx)
  // Copy animation setup, delay calculation, exitFrame

  return (
    <div className="overflow-hidden w-full">
      <AnimatedContainer
        type="full"
        className="rounded-lg w-full"
        // ... (same as basic)
      >
        <StandardPerformanceRow{Variant}
          performance={performance}
          index={index}
          rowHeight={rowHeight}
          delay={delay}
          restrictions={{ nameLength: 20, teamLength: 35 }}
        />
      </AnimatedContainer>
    </div>
  );
};
```

**Key Points:**

- ✅ Keep animation logic (delay, exitFrame using `FPS_PREFORMANCECARD`)
- ✅ Keep AnimatedContainer wrapper
- ✅ Change layout component import/usage

---

### Step 4: Create Layout Component (`StandardPerformanceRow{Variant}.tsx`)

**Location:** `src/compositions/cricket/performances/layout/StandardPerformanceRow{Variant}.tsx`

**Pattern:** Adapt from corresponding top5 layout component:

**Reference Files:**

- `brickWork` → `src/compositions/cricket/top5/layout/PlayerRowNameLogoWrapperValue.tsx`
- `classic` → `src/compositions/cricket/top5/layout/StandardPlayerRow.tsx` (already used)
- `classicTwoColumn` → `src/compositions/cricket/top5/layout/PlayerRowNameClassicTwoColumn.tsx`
- `cnsw` → `src/compositions/cricket/top5/layout/PlayerRowNameCNSW.tsx`
- `cnsw-private` → `src/compositions/cricket/top5/layout/PlayerRowNameCNSW-private.tsx`
- `sixersThunder` → `src/compositions/cricket/top5/layout/PlayerRowNameSixersThunder.tsx`

**Adaptation Steps:**

1. Copy the corresponding top5 layout file
2. Replace `PlayerData` with `PerformanceData`
3. Replace `isBatter`/`isBowler` with `isBattingPerformance`/`isBowlingPerformance`
4. Replace `player` prop with `performance` prop
5. Update score display logic to use `getScoreValues()` from `StandardPerformanceRow.tsx`
6. Keep all styling and layout structure

**Example Adaptation:**

```typescript
// Change imports
import {
  PerformanceData,
  isBattingPerformance,
  isBowlingPerformance,
} from "../types";

// Change interface
interface PerformanceRowLayoutProps {
  performance: PerformanceData; // Changed from PlayerData
  // ... rest same
}

// Change type guards
if (isBattingPerformance(performance)) {
  // Changed from isBatter(player)
  // ...
}

// Use getScoreValues() helper from StandardPerformanceRow.tsx
const { mainValue, suffix } = getScoreValues();
```

---

## 🔑 Key Differences from Top5

### 1. Entry Point Structure

- **Top5:** Simple - just transform data and pass to display
- **Performances:** Complex - handles pagination, transitions, sponsor footer

### 2. Display Controller

- **Top5:** Shows all items, no pagination
- **Performances:** Uses `getItemsForScreen()` to show only items for current screen

### 3. Timing

- **Top5:** Uses `FPS_MAIN` for exitFrame
- **Performances:** Uses `FPS_PREFORMANCECARD` for exitFrame

### 4. Sponsor Footer

- **Top5:** In display component
- **Performances:** At global level in entry point

### 5. Data Types

- **Top5:** `PlayerData`, `isBatter()`, `isBowler()`
- **Performances:** `PerformanceData`, `isBattingPerformance()`, `isBowlingPerformance()`

---

## 📝 Checklist for Each Variant

- [ ] Create `{variant}.tsx` entry point (copy from `basic.tsx`)
- [ ] Create `controller/PerformancesDisplay/display-{Variant}.tsx` (copy from `display-Basic.tsx`)
- [ ] Create `controller/PlayerRow/row-{Variant}.tsx` (copy from `row-Basic.tsx`)
- [ ] Create `layout/StandardPerformanceRow{Variant}.tsx` (adapt from top5 variant)
- [ ] Update `src/compositions/cricket/index.tsx` to export variant
- [ ] Test with sample data
- [ ] Verify transitions work with >5 items
- [ ] Verify layout matches top5 variant visually

---

## 🎨 Variant-Specific Notes

### BrickWork

- Row height: Check top5 brickWork for specific height
- Layout: Uses `PlayerRowNameLogoWrapperValue.tsx` pattern

### Classic

- Row height: 140px (same as basic)
- Layout: Can reuse `StandardPerformanceRow.tsx` or adapt from top5 classic

### ClassicTwoColumn

- Row height: Check top5 classicTwoColumn (usually 140)
- Layout: Uses `PlayerRowNameClassicTwoColumn.tsx` pattern

### CNSW

- Row height: Check top5 CNSW (usually 110)
- Layout: Uses `PlayerRowNameCNSW.tsx` pattern

### CNSW-Private

- Row height: Check top5 CNSW-private (usually 110)
- Layout: Uses `PlayerRowNameCNSW-private.tsx` pattern

### SixersThunder

- Row height: Check top5 sixersThunder
- Layout: Uses `PlayerRowNameSixersThunder.tsx` pattern

---

## 🚀 Quick Start Example

To implement `brickWork` variant:

1. **Copy entry point:**

   ```bash
   cp basic.tsx brickWork.tsx
   # Edit: Change PerformancesDisplayBasic → PerformancesDisplayBrickWork
   # Edit: Change PerformancesList → PerformancesListBrickWork
   # Edit: Change Basic → BrickWork
   ```

2. **Copy display controller:**

   ```bash
   cp controller/PerformancesDisplay/display-Basic.tsx controller/PerformancesDisplay/display-BrickWork.tsx
   # Edit: Change PerformanceRowBasic → PerformanceRowBrickWork
   ```

3. **Copy row component:**

   ```bash
   cp controller/PlayerRow/row-Basic.tsx controller/PlayerRow/row-BrickWork.tsx
   # Edit: Change StandardPerformanceRow → StandardPerformanceRowBrickWork
   ```

4. **Create layout component:**

   ```bash
   # Copy from top5
   cp ../top5/layout/PlayerRowNameLogoWrapperValue.tsx layout/StandardPerformanceRowBrickWork.tsx
   # Adapt: Change PlayerData → PerformanceData, update type guards, use getScoreValues()
   ```

5. **Update exports:**
   - Add to `src/compositions/cricket/index.tsx`

---

## ⚠️ Common Pitfalls

1. **Forgetting to use `FPS_PREFORMANCECARD`** - Always use this for exitFrame, not `FPS_MAIN`
2. **Not adapting type guards** - Must use `isBattingPerformance()`/`isBowlingPerformance()`
3. **Wrong score display logic** - Use `getScoreValues()` helper pattern
4. **Missing sponsor footer** - Keep at global level in entry point, not in display controller
5. **Not using `getItemsForScreen()`** - Always filter items per screen in display controller

---

## 📚 Reference Files

- **Basic Implementation:** `src/compositions/cricket/performances/basic.tsx`
- **Top5 Variants:** `src/compositions/cricket/top5/` (all variants)
- **Top5 Layouts:** `src/compositions/cricket/top5/layout/`
- **Data Transformer:** `src/compositions/cricket/performances/utils/dataTransformer.ts`
- **Screen Calculator:** `src/compositions/cricket/performances/utils/screenCalculator.ts`

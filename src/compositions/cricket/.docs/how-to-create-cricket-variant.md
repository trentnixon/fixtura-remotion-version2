# How to Create a New Cricket Variant

This guide provides a **holistic overview** of creating a complete cricket variant. A cricket variant consists of implementing **all composition types** for a specific template variant (e.g., `Basic`, `Classic`, `Brickwork`, `YourNewVariant`).

**Last Updated:** 2026-02-08

---

## Table of Contents

1. [Overview](#overview)
2. [What is a Cricket Variant?](#what-is-a-cricket-variant)
3. [Required Compositions](#required-compositions)
4. [Prerequisites](#prerequisites)
5. [Step-by-Step Process](#step-by-step-process)
6. [Composition Implementation Order](#composition-implementation-order)
7. [Hooking Up to Templates](#hooking-up-to-templates)
8. [Hooking Up to Routing](#hooking-up-to-routing)
9. [Testing Your Variant](#testing-your-variant)
10. [Quick Reference](#quick-reference)

---

## Overview

### What This Guide Covers

This guide explains:

- **What compositions are required** for a complete cricket variant
- **How to implement each composition type** (with links to detailed guides)
- **How to hook compositions up to templates** and routing
- **The overall workflow** for creating a new variant

### What This Guide Does NOT Cover

This guide does NOT cover:

- **Detailed implementation steps** for individual compositions (see individual how-to guides)
- **Template variant creation** (see `src/templates/.docs/how-to.md`)
- **Base template infrastructure** (already exists)

---

## What is a Cricket Variant?

A **cricket variant** is a complete set of composition implementations for a specific template variant. It includes:

- **All 8 composition types** implemented for the variant
- **Consistent styling** across all compositions
- **Proper integration** with templates and routing

### Template Variant vs Cricket Variant

| Aspect       | Template Variant                         | Cricket Variant                                 |
| ------------ | ---------------------------------------- | ----------------------------------------------- |
| **What**     | Visual style/layout                      | Composition implementations                     |
| **Location** | `src/templates/variants/{variantName}/`  | `src/compositions/cricket/{compositionType}/`   |
| **Scope**    | Global (all sports)                      | Cricket-specific                                |
| **Example**  | `Basic`, `Classic`, `Brickwork`          | `basic`, `classic`, `brickwork` implementations |
| **Purpose**  | Defines theme, colors, fonts, animations | Implements data display logic                   |

**Relationship:**

- Template variants define **how things look** (colors, fonts, animations)
- Cricket variants implement **what data is shown** (ladder, results, top5, etc.)
- Together, they create a complete video output

---

## Required Compositions

A complete cricket variant requires implementing **all 8 composition types**:

### 1. Ladder (`CricketLadder`)

**Purpose:** Displays team standings/ladder table

**Location:** `src/compositions/cricket/ladder/`

**How-To Guide:** `src/compositions/cricket/ladder/.docs/how-to.md`

**Key Features:**

- Team rankings with points
- Screen pagination (configurable teams per screen)
- Table layout with headers
- Club-only variants

**Required Files:**

- `{variant}.tsx` - Variant entry point
- `controller/Display/display-{Variant}.tsx` - Display component
- `controller/TeamRows/row-{Variant}.tsx` - Team row component
- Export in `index.tsx`

---

### 2. Top 5 (`CricketTop5Batting`, `CricketTop5Bowling`)

**Purpose:** Displays ranked list of top 5 players (batters or bowlers)

**Location:** `src/compositions/cricket/top5/`

**How-To Guide:** `src/compositions/cricket/top5/.docs/how-to.md`

**Key Features:**

- Union type system (BatterData | BowlerData)
- Dynamic title generation
- Score display (batting: runs/balls, bowling: wickets/runs/overs)
- Dynamic row height calculation

**Required Files:**

- `{variant}.tsx` - Variant entry point
- `controller/PlayersDisplay/display-{Variant}.tsx` - Display component
- `controller/PlayerRow/row-{Variant}.tsx` - Player row component
- `layout/StandardPlayerRow.tsx` or variant-specific layout
- Export in `index.tsx`

**Note:** Handles both `CricketTop5Batting` and `CricketTop5Bowling` composition IDs

---

### 3. Results (`CricketResults`)

**Purpose:** Displays multiple match results (2 per screen)

**Location:** `src/compositions/cricket/results/`

**How-To Guide:** `src/compositions/cricket/results/.docs/how-to.md`

**Key Features:**

- Fixed 2 results per screen
- Complex nested match card structure
- Club-only variants
- Screen pagination

**Required Files:**

- `{variant}.tsx` - Variant entry point
- `controller/ResultsDisplay/display-{Variant}.tsx` - Display component
- `layout/MatchCard/card-{Variant}.tsx` - Match card component
- `layout/MatchCard/card-{Variant}-ClubOnly.tsx` - Club-only card (optional)
- Export in `index.tsx`

---

### 4. Result Single (`CricketResultSingle`)

**Purpose:** Displays single match result (one per screen, full height)

**Location:** `src/compositions/cricket/resultSingle/`

**How-To Guide:** `src/compositions/cricket/resultSingle/.docs/how-to.md`

**Key Features:**

- One match per screen (full height)
- Match-to-match transitions
- Fixed section heights
- Club-only variants with result statements

**Required Files:**

- `{variant}.tsx` - Variant entry point
- `controller/ResultSingleDisplay/display-{Variant}.tsx` - Display component
- `layout/MatchCard/card-{Variant}.tsx` - Match card component
- `layout/MatchCard/card-{Variant}-ClubOnly.tsx` - Club-only card (optional)
- `layout/Sections/ResultStatement/ResultStatement{Variant}.tsx` - Result statement (optional)
- Export in `index.tsx`

---

### 5. Upcoming (`CricketUpcoming`)

**Purpose:** Displays upcoming match fixtures

**Location:** `src/compositions/cricket/upcoming/`

**How-To Guide:** `src/compositions/cricket/upcoming/.docs/how-to.md`

**Key Features:**

- Configurable games per screen
- Screen pagination
- Multiple logo layout variations
- Metadata components (date, time, ground, grade)

**Required Files:**

- `{variant}.tsx` - Variant entry point
- `controller/GamesDisplay/FixtureDisplay{Variant}.tsx` - Display component
- `controller/GamesList/games-list-{Variant}.tsx` - Games list component
- `layout/Card/game-card-{Variant}.tsx` - Game card component
- Export in `index.tsx`

---

### 6. Team Roster (`CricketRoster`)

**Purpose:** Displays team roster (list of player names)

**Location:** `src/compositions/cricket/teamRoster/`

**How-To Guide:** `src/compositions/cricket/teamRoster/.docs/how-to.md`

**Key Features:**

- Player name list
- Team logos and names
- Match metadata
- Roster-to-roster transitions (Series component)
- Sponsor merging

**Required Files:**

- `{variant}.tsx` - Variant entry point
- `controller/Display/display-{Variant}.tsx` - Display component
- `layout/RosterPlayerList/playerList.tsx` - Player list component
- `layout/RosterHeader/` - Team header components
- `layout/Metadata/` - Metadata components
- Export in `index.tsx`

---

### 7. Performances (`CricketBattingPerformances`, `CricketBowlingPerformances`)

**Purpose:** Displays player performance statistics

**Location:** `src/compositions/cricket/performances/`

**How-To Guide:** `src/compositions/cricket/performances/.docs/how-to.md`

**Key Features:**

- Union type system (BattingPerformanceData | BowlingPerformanceData)
- Screen pagination
- Data transformation
- Club-only variants

**Required Files:**

- `{variant}.tsx` - Variant entry point
- `controller/PerformancesDisplay/display-{Variant}.tsx` - Display component
- `layout/StandardPerformanceRow.tsx` or variant-specific row
- Export in `index.tsx`

**Note:** Handles both `CricketBattingPerformances` and `CricketBowlingPerformances` composition IDs

---

### 8. Team of the Week (`CricketTeamOfTheWeek`)

**Purpose:** Displays selected team of the week players

**Location:** `src/compositions/cricket/TeamOfTheWeek/`

**How-To Guide:** `src/compositions/cricket/TeamOfTheWeek/.docs/how-to.md`

**Key Features:**

- 2-column grid layout
- Player categories (Batter, Bowler, All-Rounder, Twelfth Man)
- Position-based icons
- Category-specific stat display
- Club-only support (conditional logo display)

**Required Files:**

- `{variant}.tsx` - Variant entry point
- `controller/TeamOfTheWeekDisplay/display-{Variant}.tsx` - Display component
- `controller/PlayerRow/row-{Variant}.tsx` - Player row component
- Export in `index.tsx`

---

## Prerequisites

Before creating a new cricket variant, ensure you have:

1. ✅ **Template variant created** (if creating a new template variant)

   - See `src/templates/.docs/how-to.md` for creating template variants
   - Template variant must exist before implementing compositions
   - At minimum, use existing `Basic` variant

2. ✅ **Understanding of composition architecture**

   - Read individual how-to guides for each composition type
   - Understand data structures and component patterns
   - Know how screen pagination works (for applicable compositions)

3. ✅ **Access to test data**

   - Sample data for each composition type
   - Test data registered in test data system
   - Composition IDs match export names

4. ✅ **Understanding of routing system**
   - How compositions connect to templates
   - How composition IDs map to exports
   - How template IDs map to variants

---

## Step-by-Step Process

### Phase 1: Template Variant Setup (If Creating New Template)

**If creating a new template variant** (e.g., `YourNewVariant`):

1. **Create template variant** following `src/templates/.docs/how-to.md`

   - Create folder: `src/templates/variants/YourNewVariant/`
   - Create theme, animations, components
   - Register in template registry

2. **Verify template variant works**
   - Test with existing compositions
   - Verify theme and animations load correctly

**If using existing template variant** (e.g., `Basic`, `Classic`):

- Skip this phase, proceed to Phase 2

---

### Phase 2: Implement Compositions (One by One)

For each composition type, follow its individual how-to guide:

#### 2.1: Ladder Composition

**Guide:** `src/compositions/cricket/ladder/.docs/how-to.md`

**Steps:**

1. Create `ladder/{variant}.tsx`
2. Create `ladder/controller/Display/display-{Variant}.tsx`
3. Create `ladder/controller/TeamRows/row-{Variant}.tsx`
4. Export from `ladder/index.tsx`
5. Add to `cricket/index.tsx`

**Estimated Time:** 2-4 hours

---

#### 2.2: Top 5 Composition

**Guide:** `src/compositions/cricket/top5/.docs/how-to.md`

**Steps:**

1. Create `top5/{variant}.tsx`
2. Create `top5/controller/PlayersDisplay/display-{Variant}.tsx`
3. Create `top5/controller/PlayerRow/row-{Variant}.tsx`
4. Create or use layout component
5. Export from `top5/index.tsx`
6. Add to `cricket/index.tsx`

**Note:** Handles both batting and bowling composition IDs

**Estimated Time:** 2-3 hours

---

#### 2.3: Results Composition

**Guide:** `src/compositions/cricket/results/.docs/how-to.md`

**Steps:**

1. Create `results/{variant}.tsx`
2. Create `results/controller/ResultsDisplay/display-{Variant}.tsx`
3. Create `results/layout/MatchCard/card-{Variant}.tsx`
4. Create club-only card (optional): `card-{Variant}-ClubOnly.tsx`
5. Export from `results/index.tsx`
6. Add to `cricket/index.tsx`

**Estimated Time:** 3-5 hours (more complex structure)

---

#### 2.4: Result Single Composition

**Guide:** `src/compositions/cricket/resultSingle/.docs/how-to.md`

**Steps:**

1. Create `resultSingle/{variant}.tsx`
2. Create `resultSingle/controller/ResultSingleDisplay/display-{Variant}.tsx`
3. Create `resultSingle/layout/MatchCard/card-{Variant}.tsx`
4. Create club-only card (optional): `card-{Variant}-ClubOnly.tsx`
5. Create result statement component (optional): `ResultStatement{Variant}.tsx`
6. Export from `resultSingle/index.tsx`
7. Add to `cricket/index.tsx`

**Estimated Time:** 3-5 hours (includes club-only support)

---

#### 2.5: Upcoming Composition

**Guide:** `src/compositions/cricket/upcoming/.docs/how-to.md`

**Steps:**

1. Create `upcoming/{variant}.tsx`
2. Create `upcoming/controller/GamesDisplay/FixtureDisplay{Variant}.tsx`
3. Create `upcoming/controller/GamesList/games-list-{Variant}.tsx`
4. Create `upcoming/layout/Card/game-card-{Variant}.tsx`
5. Choose logo layout variation
6. Export from `upcoming/index.tsx`
7. Add to `cricket/index.tsx`

**Estimated Time:** 2-4 hours

---

#### 2.6: Team Roster Composition

**Guide:** `src/compositions/cricket/teamRoster/.docs/how-to.md`

**Steps:**

1. Create `teamRoster/{variant}.tsx`
2. Create `teamRoster/controller/Display/display-{Variant}.tsx`
3. Create `teamRoster/controller/GamesList/games-list-{Variant}.tsx` (if needed)
4. Use existing layout components (RosterPlayerList, RosterHeader, Metadata)
5. Export from `teamRoster/index.tsx`
6. Add to `cricket/index.tsx`

**Estimated Time:** 1-2 hours (simpler structure)

---

#### 2.7: Performances Composition

**Guide:** `src/compositions/cricket/performances/.docs/how-to.md`

**Steps:**

1. Create `performances/{variant}.tsx`
2. Create `performances/controller/PerformancesDisplay/display-{Variant}.tsx`
3. Create `performances/layout/StandardPerformanceRow.tsx` or variant-specific row
4. Export from `performances/index.tsx`
5. Add to `cricket/index.tsx`

**Note:** Handles both batting and bowling composition IDs

**Estimated Time:** 2-4 hours

---

#### 2.8: Team of the Week Composition

**Guide:** `src/compositions/cricket/TeamOfTheWeek/.docs/how-to.md`

**Steps:**

1. Create `TeamOfTheWeek/{variant}.tsx`
2. Create `TeamOfTheWeek/controller/TeamOfTheWeekDisplay/display-{Variant}.tsx`
3. Create `TeamOfTheWeek/controller/PlayerRow/row-{Variant}.tsx`
4. Use existing layout components or create variant-specific
5. Export from `TeamOfTheWeek/index.tsx`
6. Add to `cricket/index.tsx`

**Estimated Time:** 2-3 hours

---

### Phase 3: Integration and Testing

#### 3.1: Update Cricket Index

Ensure all compositions are exported in `src/compositions/cricket/index.tsx`:

```typescript
// Import your variant from each composition
import {
  {variant} as ladder{Variant},
  {variant} as top5{Variant},
  {variant} as results{Variant},
  {variant} as resultSingle{Variant},
  {variant} as upcoming{Variant},
  {variant} as roster{Variant},
  {variant} as performances{Variant},
  {variant} as teamOfTheWeek{Variant},
} from "./ladder";
// ... imports from other compositions

// Export in composition objects
export const CricketLadder = {
  // ... existing variants
  {variant}: ladder{Variant},
};

export const CricketTop5 = {
  // ... existing variants
  {variant}: top5{Variant},
};

// ... repeat for all compositions
```

#### 3.2: Verify Routing (Usually Already Configured)

**Check:** `src/core/utils/routing.tsx`

Composition IDs should already be registered:

```typescript
const SPORT_COMPOSITION_TYPES: SportCompositionTypes = {
  cricket: {
    CricketLadder: "CricketLadder",
    CricketTop5Batting: "CricketTop5",
    CricketTop5Bowling: "CricketTop5",
    CricketResults: "CricketResults",
    CricketResultSingle: "CricketResultSingle",
    CricketUpcoming: "CricketUpcoming",
    CricketRoster: "CricketRoster",
    CricketBattingPerformances: "CricketPerformances",
    CricketBowlingPerformances: "CricketPerformances",
    CricketTeamOfTheWeek: "CricketTeamOfTheWeek",
  },
};
```

**Note:** Usually no changes needed unless adding a new composition type

#### 3.3: Test Each Composition

Test each composition with your variant:

1. **Ladder**: Test with ladder data
2. **Top 5**: Test with batting and bowling data
3. **Results**: Test with match results data
4. **Result Single**: Test with single match data
5. **Upcoming**: Test with upcoming fixtures
6. **Roster**: Test with roster data
7. **Performances**: Test with batting and bowling performances
8. **Team of the Week**: Test with team of the week data

---

## Composition Implementation Order

### Recommended Order (Easy → Hard)

1. **Team Roster** (Simplest - just player names and logos)
2. **Top 5** (Straightforward - single column list)
3. **Team of the Week** (Similar to Top 5, but 2-column grid)
4. **Upcoming** (More complex - game cards with metadata)
5. **Ladder** (Table structure, screen pagination)
6. **Performances** (Union types, data transformation)
7. **Results** (Complex nested structure, club-only variants)
8. **Result Single** (Most complex - club-only, result statements, transitions)

### Alternative Order (By Dependency)

If some compositions share components:

1. **Results** → **Result Single** (share match card components)
2. **Top 5** → **Team of the Week** (share player row patterns)
3. **Ladder** → **Performances** (share table/row patterns)
4. **Upcoming** → **Roster** (share metadata components)

---

## Hooking Up to Templates

### How Templates and Compositions Connect

1. **Template Variant** (`src/templates/variants/{variantName}/`):

   - Defines theme, colors, fonts, animations
   - Provides base infrastructure

2. **Cricket Variant** (`src/compositions/cricket/{compositionType}/{variant}.tsx`):

   - Uses template variant's theme and animations
   - Implements composition-specific logic
   - Renders data using template's styling

3. **Routing System** (`src/core/utils/routing.tsx`):
   - Matches `templateId` + `compositionId` → finds correct component
   - Example: `Basic` + `CricketLadder` → `CricketLadder.basic`

### Template Variant Requirements

Your cricket variant implementations should:

1. **Use template theme**:

   ```typescript
   const { selectedPalette, layout } = useThemeContext();
   // Use selectedPalette for colors
   // Use layout for spacing, border radius, etc.
   ```

2. **Use template animations**:

   ```typescript
   const { animations } = useAnimationContext();
   // Use animations.container, animations.text, etc.
   ```

3. **Match template styling**:
   - Use same color variants (`onContainerCopy`, `onBackgroundMain`, etc.)
   - Use same component styles from theme
   - Follow template's design patterns

---

## Hooking Up to Routing

### Routing Flow

```
Request → routing.tsx → Sport Module → Composition Object → Variant Component
```

**Example Request:**

- `sport: "cricket"`
- `compositionId: "CricketLadder"`
- `templateId: "basic"`

**Routing Process:**

1. `routing.tsx` looks up `SPORT_COMPOSITION_TYPES.cricket.CricketLadder` → `"CricketLadder"`
2. Gets `CricketCompositions["CricketLadder"]` → `CricketLadder` object
3. Gets `CricketLadder["basic"]` → `ladderBasic` component
4. Renders component with template variant

### Export Name Requirements

**Critical:** Export names MUST match composition IDs exactly:

| Composition ID               | Export Name            | Location            |
| ---------------------------- | ---------------------- | ------------------- |
| `CricketLadder`              | `CricketLadder`        | `cricket/index.tsx` |
| `CricketTop5Batting`         | `CricketTop5`          | `cricket/index.tsx` |
| `CricketTop5Bowling`         | `CricketTop5`          | `cricket/index.tsx` |
| `CricketResults`             | `CricketResults`       | `cricket/index.tsx` |
| `CricketResultSingle`        | `CricketResultSingle`  | `cricket/index.tsx` |
| `CricketUpcoming`            | `CricketUpcoming`      | `cricket/index.tsx` |
| `CricketRoster`              | `CricketRoster`        | `cricket/index.tsx` |
| `CricketBattingPerformances` | `CricketPerformances`  | `cricket/index.tsx` |
| `CricketBowlingPerformances` | `CricketPerformances`  | `cricket/index.tsx` |
| `CricketTeamOfTheWeek`       | `CricketTeamOfTheWeek` | `cricket/index.tsx` |

### Variant Key Requirements

Variant keys in composition objects should match template variant IDs (lowercase):

- Template variant: `Basic` → Composition key: `basic`
- Template variant: `Classic` → Composition key: `classic`
- Template variant: `Brickwork` → Composition key: `brickwork`
- Template variant: `Sixers` → Composition key: `sixers`
- Template variant: `Thunder` → Composition key: `thunder`
- Template variant: `TwoColumnClassic` → Composition key: `twocolumnclassic`
- Template variant: `CNSW` → Composition key: `cnsw`
- Template variant: `CNSWPrivate` → Composition key: `cnswprivate`

---

## Testing Your Variant

### Test Checklist

For each composition type:

- [ ] **Data loads correctly** - No errors in console
- [ ] **Styling matches template** - Colors, fonts, spacing match template variant
- [ ] **Animations work** - Staggered animations, transitions work correctly
- [ ] **Screen pagination** - Works correctly (for applicable compositions)
- [ ] **Empty states** - NoData components render correctly
- [ ] **Sponsor footer** - Displays correctly (for applicable compositions)
- [ ] **Club-only variants** - Work correctly (for applicable compositions)
- [ ] **Responsive layout** - Elements fit correctly on screen
- [ ] **TypeScript** - No type errors
- [ ] **Console** - No runtime errors

### Test Data Requirements

Ensure test data exists for each composition:

- `CricketLadder.json` - Ladder data
- `CricketTop5Batting.json` - Batting top 5 data
- `CricketTop5Bowling.json` - Bowling top 5 data
- `CricketResults.json` - Match results data
- `CricketResultSingle.json` - Single match data
- `CricketUpcoming.json` - Upcoming fixtures data
- `CricketRoster.json` - Team roster data
- `CricketBattingPerformances.json` - Batting performances data
- `CricketBowlingPerformances.json` - Bowling performances data
- `CricketTeamOfTheWeek.json` - Team of the week data

---

## Quick Reference

### Composition How-To Guides

| Composition          | Guide Location                                           |
| -------------------- | -------------------------------------------------------- |
| **Ladder**           | `src/compositions/cricket/ladder/.docs/how-to.md`        |
| **Top 5**            | `src/compositions/cricket/top5/.docs/how-to.md`          |
| **Results**          | `src/compositions/cricket/results/.docs/how-to.md`       |
| **Result Single**    | `src/compositions/cricket/resultSingle/.docs/how-to.md`  |
| **Upcoming**         | `src/compositions/cricket/upcoming/.docs/how-to.md`      |
| **Team Roster**      | `src/compositions/cricket/teamRoster/.docs/how-to.md`    |
| **Performances**     | `src/compositions/cricket/performances/.docs/how-to.md`  |
| **Team of the Week** | `src/compositions/cricket/TeamOfTheWeek/.docs/how-to.md` |

### Template Variant Guide

| Guide                         | Location                        |
| ----------------------------- | ------------------------------- |
| **Template Variant Creation** | `src/templates/.docs/how-to.md` |

### Key Files to Update

1. **Composition Index Files** (`{compositionType}/index.tsx`):

   - Export your variant

2. **Cricket Index** (`src/compositions/cricket/index.tsx`):

   - Import your variant from each composition
   - Add to composition objects

3. **Routing** (`src/core/utils/routing.tsx`):
   - Usually no changes needed (composition IDs already registered)

### Composition Export Structure

```typescript
// cricket/index.tsx
export const CricketLadder = {
  basic: ladderBasic,
  classic: ladderClassic,
  brickwork: ladderBrickWork,
  {yourVariant}: ladder{YourVariant}, // Add your variant
  // ... other variants
};
```

### Variant Naming Convention

- **Template Variant**: PascalCase (e.g., `Basic`, `Classic`, `YourNewVariant`)
- **Cricket Variant Key**: lowercase (e.g., `basic`, `classic`, `yournewvariant`)
- **File Names**: lowercase (e.g., `basic.tsx`, `classic.tsx`, `yournewvariant.tsx`)

---

## Summary

Creating a complete cricket variant involves:

1. **Creating/using template variant** (if new template, create it first)
2. **Implementing all 8 composition types** (one by one, following individual guides)
3. **Exporting from composition indices** (each composition's `index.tsx`)
4. **Exporting from cricket index** (`cricket/index.tsx`)
5. **Testing each composition** (with appropriate test data)

### Estimated Total Time

- **Simple variant** (using existing patterns): 15-25 hours
- **Complex variant** (new patterns, club-only support): 30-50 hours
- **Per composition**: 1-5 hours (depending on complexity)

### Key Success Factors

1. **Follow existing patterns** - Use Basic/Classic variants as reference
2. **Consistent styling** - Match template variant's theme
3. **Proper exports** - Ensure all exports match composition IDs
4. **Test thoroughly** - Test each composition individually
5. **Use individual guides** - Refer to composition-specific how-to guides

---

**Next Steps:**

1. Choose a template variant (create new or use existing)
2. Start with simplest composition (Team Roster or Top 5)
3. Follow individual how-to guide for that composition
4. Test and verify
5. Move to next composition
6. Repeat until all 8 compositions are implemented

---

**Last Updated:** 2026-02-08

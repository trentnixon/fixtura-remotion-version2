# Mudgeeraba Cricket Composition Implementation Plan

This document outlines the plan to implement all 8 cricket composition types for the **Mudgeeraba** template variant.

**Template Variant:** `Mudgeeraba` (PascalCase)  
**Cricket Variant Key:** `mudgeeraba` (lowercase)  
**Status:** Planning Phase

**Last Updated:** 2026-02-08

---

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Implementation Order](#implementation-order)
4. [Composition Implementation Details](#composition-implementation-details)
5. [Integration Checklist](#integration-checklist)
6. [Testing Plan](#testing-plan)
7. [Progress Tracking](#progress-tracking)

---

## Overview

### Goal

Implement all 8 cricket composition types for the Mudgeeraba template variant:

1. ✅ **Ladder** (`CricketLadder`)
2. ✅ **Top 5** (`CricketTop5Batting`, `CricketTop5Bowling`)
3. ✅ **Results** (`CricketResults`)
4. ✅ **Result Single** (`CricketResultSingle`)
5. ✅ **Upcoming** (`CricketUpcoming`)
6. ✅ **Team Roster** (`CricketRoster`)
7. ✅ **Performances** (`CricketBattingPerformances`, `CricketBowlingPerformances`)
8. ✅ **Team of the Week** (`CricketTeamOfTheWeek`)

### Reference Guides

- **Main Guide:** `src/compositions/cricket/.docs/how-to-create-cricket-variant.md`
- **Individual Guides:**
  - Ladder: `src/compositions/cricket/ladder/.docs/how-to.md`
  - Top 5: `src/compositions/cricket/top5/.docs/how-to.md`
  - Results: `src/compositions/cricket/results/.docs/how-to.md`
  - Result Single: `src/compositions/cricket/resultSingle/.docs/how-to.md`
  - Upcoming: `src/compositions/cricket/upcoming/.docs/how-to.md`
  - Team Roster: `src/compositions/cricket/teamRoster/.docs/how-to.md`
  - Performances: `src/compositions/cricket/performances/.docs/how-to.md`
  - Team of the Week: `src/compositions/cricket/TeamOfTheWeek/.docs/how-to.md`

### Template Variant Status

✅ **Template Variant Created**
- Location: `src/templates/variants/mudgeeraba/`
- Theme: Configured with Rubik Dirt font
- Animations: Configured
- Components: Intro, Outro, Main, MainHeader, Background
- Registry: Registered in `src/templates/registry.tsx`

---

## Prerequisites

### ✅ Completed

- [x] Template variant created (`Mudgeeraba`)
- [x] Template variant registered in registry
- [x] Theme configured (Rubik Dirt font)
- [x] Animations configured
- [x] Base components created

### ⬜ Required Before Starting

- [ ] Review existing variant implementations (Basic, Classic) for patterns
- [ ] Understand composition architecture
- [ ] Access to test data for each composition type
- [ ] Familiarity with routing system

---

## Implementation Order

### Recommended Order (Easy → Hard)

Following the guide's recommended order for efficient implementation:

1. **Team Roster** (Simplest - ~1-2 hours)
   - Just player names and logos
   - Minimal complexity

2. **Top 5** (Straightforward - ~2-3 hours)
   - Single column list
   - Handles both batting and bowling

3. **Team of the Week** (Similar to Top 5 - ~2-3 hours)
   - 2-column grid layout
   - Similar patterns to Top 5

4. **Upcoming** (More complex - ~2-4 hours)
   - Game cards with metadata
   - Logo layout variations

5. **Ladder** (Table structure - ~2-4 hours)
   - Screen pagination
   - Table layout with headers

6. **Performances** (Union types - ~2-4 hours)
   - Data transformation
   - Handles both batting and bowling

7. **Results** (Complex nested structure - ~3-5 hours)
   - 2 results per screen
   - Club-only variants
   - Complex match card structure

8. **Result Single** (Most complex - ~3-5 hours)
   - Club-only support
   - Result statements
   - Match-to-match transitions

**Total Estimated Time:** 18-30 hours

---

## Composition Implementation Details

### 1. Team Roster (`CricketRoster`)

**Priority:** High (Start here - simplest)

**Files to Create:**
- `src/compositions/cricket/teamRoster/mudgeeraba.tsx`
- `src/compositions/cricket/teamRoster/controller/Display/display-Mudgeeraba.tsx`
- Use existing layout components:
  - `layout/RosterPlayerList/playerList.tsx`
  - `layout/RosterHeader/`
  - `layout/Metadata/`

**Key Features:**
- Player name list
- Team logos and names
- Match metadata
- Roster-to-roster transitions
- Sponsor merging

**Reference Implementation:**
- `src/compositions/cricket/teamRoster/basic.tsx`

**Estimated Time:** 1-2 hours

---

### 2. Top 5 (`CricketTop5Batting`, `CricketTop5Bowling`)

**Priority:** High

**Files to Create:**
- `src/compositions/cricket/top5/mudgeeraba.tsx`
- `src/compositions/cricket/top5/controller/PlayersDisplay/display-Mudgeeraba.tsx`
- `src/compositions/cricket/top5/controller/PlayerRow/row-Mudgeeraba.tsx`
- Use or create layout component

**Key Features:**
- Union type system (BatterData | BowlerData)
- Dynamic title generation
- Score display (batting: runs/balls, bowling: wickets/runs/overs)
- Dynamic row height calculation

**Reference Implementation:**
- `src/compositions/cricket/top5/basic.tsx`

**Note:** Handles both `CricketTop5Batting` and `CricketTop5Bowling` composition IDs

**Estimated Time:** 2-3 hours

---

### 3. Team of the Week (`CricketTeamOfTheWeek`)

**Priority:** Medium

**Files to Create:**
- `src/compositions/cricket/TeamOfTheWeek/mudgeeraba.tsx`
- `src/compositions/cricket/TeamOfTheWeek/controller/TeamOfTheWeekDisplay/display-Mudgeeraba.tsx`
- `src/compositions/cricket/TeamOfTheWeek/controller/PlayerRow/row-Mudgeeraba.tsx`

**Key Features:**
- 2-column grid layout
- Player categories (Batter, Bowler, All-Rounder, Twelfth Man)
- Position-based icons
- Category-specific stat display
- Club-only support

**Reference Implementation:**
- `src/compositions/cricket/TeamOfTheWeek/basic.tsx`

**Estimated Time:** 2-3 hours

---

### 4. Upcoming (`CricketUpcoming`)

**Priority:** Medium

**Files to Create:**
- `src/compositions/cricket/upcoming/mudgeeraba.tsx`
- `src/compositions/cricket/upcoming/controller/GamesDisplay/FixtureDisplayMudgeeraba.tsx`
- `src/compositions/cricket/upcoming/controller/GamesList/games-list-Mudgeeraba.tsx`
- `src/compositions/cricket/upcoming/layout/Card/game-card-Mudgeeraba.tsx`

**Key Features:**
- Configurable games per screen
- Screen pagination
- Multiple logo layout variations
- Metadata components (date, time, ground, grade)

**Reference Implementation:**
- `src/compositions/cricket/upcoming/basic.tsx`

**Estimated Time:** 2-4 hours

---

### 5. Ladder (`CricketLadder`)

**Priority:** Medium

**Files to Create:**
- `src/compositions/cricket/ladder/mudgeeraba.tsx`
- `src/compositions/cricket/ladder/controller/Display/display-Mudgeeraba.tsx`
- `src/compositions/cricket/ladder/controller/TeamRows/row-Mudgeeraba.tsx`

**Key Features:**
- Team rankings with points
- Screen pagination (configurable teams per screen)
- Table layout with headers
- Club-only variants

**Reference Implementation:**
- `src/compositions/cricket/ladder/basic.tsx`

**Estimated Time:** 2-4 hours

---

### 6. Performances (`CricketBattingPerformances`, `CricketBowlingPerformances`)

**Priority:** Medium

**Files to Create:**
- `src/compositions/cricket/performances/mudgeeraba.tsx`
- `src/compositions/cricket/performances/controller/PerformancesDisplay/display-Mudgeeraba.tsx`
- `src/compositions/cricket/performances/layout/StandardPerformanceRow.tsx` or variant-specific row

**Key Features:**
- Union type system (BattingPerformanceData | BowlingPerformanceData)
- Screen pagination
- Data transformation
- Club-only variants

**Reference Implementation:**
- `src/compositions/cricket/performances/basic.tsx`

**Note:** Handles both `CricketBattingPerformances` and `CricketBowlingPerformances` composition IDs

**Estimated Time:** 2-4 hours

---

### 7. Results (`CricketResults`)

**Priority:** Low (More complex)

**Files to Create:**
- `src/compositions/cricket/results/mudgeeraba.tsx`
- `src/compositions/cricket/results/controller/ResultsDisplay/display-Mudgeeraba.tsx`
- `src/compositions/cricket/results/layout/MatchCard/card-Mudgeeraba.tsx`
- `src/compositions/cricket/results/layout/MatchCard/card-Mudgeeraba-ClubOnly.tsx` (optional)

**Key Features:**
- Fixed 2 results per screen
- Complex nested match card structure
- Club-only variants
- Screen pagination

**Reference Implementation:**
- `src/compositions/cricket/results/basic.tsx`

**Estimated Time:** 3-5 hours

---

### 8. Result Single (`CricketResultSingle`)

**Priority:** Low (Most complex)

**Files to Create:**
- `src/compositions/cricket/resultSingle/mudgeeraba.tsx`
- `src/compositions/cricket/resultSingle/controller/ResultSingleDisplay/display-Mudgeeraba.tsx`
- `src/compositions/cricket/resultSingle/layout/MatchCard/card-Mudgeeraba.tsx`
- `src/compositions/cricket/resultSingle/layout/MatchCard/card-Mudgeeraba-ClubOnly.tsx` (optional)
- `src/compositions/cricket/resultSingle/layout/Sections/ResultStatement/ResultStatementMudgeeraba.tsx` (optional)

**Key Features:**
- One match per screen (full height)
- Match-to-match transitions
- Fixed section heights
- Club-only variants with result statements

**Reference Implementation:**
- `src/compositions/cricket/resultSingle/basic.tsx`

**Estimated Time:** 3-5 hours

---

## Integration Checklist

### For Each Composition

After implementing each composition, ensure:

- [ ] **File Created:** `{compositionType}/mudgeeraba.tsx`
- [ ] **Display Component Created:** `controller/Display/display-Mudgeeraba.tsx` (or appropriate path)
- [ ] **Row/Card Components Created:** As needed for composition type
- [ ] **Exported from Composition Index:** Added to `{compositionType}/index.tsx`
- [ ] **Exported from Cricket Index:** Added to `src/compositions/cricket/index.tsx`
- [ ] **Uses Template Theme:** `useThemeContext()` for colors and layout
- [ ] **Uses Template Animations:** `useAnimationContext()` for animations
- [ ] **Matches Template Styling:** Consistent with Mudgeeraba theme
- [ ] **TypeScript:** No type errors
- [ ] **Tested:** Works with test data

### Final Integration Steps

After all compositions are implemented:

- [ ] **All compositions exported** from `src/compositions/cricket/index.tsx`
- [ ] **Variant key matches:** `mudgeeraba` (lowercase) in all exports
- [ ] **Routing verified:** No changes needed (composition IDs already registered)
- [ ] **Template integration:** Compositions use Mudgeeraba theme correctly
- [ ] **Documentation updated:** This plan marked as complete

---

## Testing Plan

### Test Data Requirements

Ensure test data exists for each composition:

- [ ] `CricketLadder.json` - Ladder data
- [ ] `CricketTop5Batting.json` - Batting top 5 data
- [ ] `CricketTop5Bowling.json` - Bowling top 5 data
- [ ] `CricketResults.json` - Match results data
- [ ] `CricketResultSingle.json` - Single match data
- [ ] `CricketUpcoming.json` - Upcoming fixtures data
- [ ] `CricketRoster.json` - Team roster data
- [ ] `CricketBattingPerformances.json` - Batting performances data
- [ ] `CricketBowlingPerformances.json` - Bowling performances data
- [ ] `CricketTeamOfTheWeek.json` - Team of the week data

### Test Checklist Per Composition

For each composition, verify:

- [ ] **Data loads correctly** - No errors in console
- [ ] **Styling matches template** - Colors, fonts (Rubik Dirt), spacing match Mudgeeraba theme
- [ ] **Animations work** - Staggered animations, transitions work correctly
- [ ] **Screen pagination** - Works correctly (for applicable compositions)
- [ ] **Empty states** - NoData components render correctly
- [ ] **Sponsor footer** - Displays correctly (for applicable compositions)
- [ ] **Club-only variants** - Work correctly (for applicable compositions)
- [ ] **Responsive layout** - Elements fit correctly on screen
- [ ] **TypeScript** - No type errors
- [ ] **Console** - No runtime errors

---

## Progress Tracking

### Implementation Status

| Composition | Status | Files Created | Exported | Tested | Notes |
|-------------|--------|--------------|----------|--------|-------|
| **Team Roster** | ⬜ Not Started | - | - | - | Start here |
| **Top 5** | ⬜ Not Started | - | - | - | - |
| **Team of the Week** | ⬜ Not Started | - | - | - | - |
| **Upcoming** | ⬜ Not Started | - | - | - | - |
| **Ladder** | ⬜ Not Started | - | - | - | - |
| **Performances** | ⬜ Not Started | - | - | - | - |
| **Results** | ⬜ Not Started | - | - | - | - |
| **Result Single** | ⬜ Not Started | - | - | - | - |

**Legend:**
- ⬜ Not Started
- 🟡 In Progress
- ✅ Completed
- ❌ Blocked

### Export Status

| File | Status | Notes |
|------|--------|-------|
| `ladder/index.tsx` | ⬜ | Add `mudgeeraba` export |
| `top5/index.tsx` | ⬜ | Add `mudgeeraba` export |
| `results/index.tsx` | ⬜ | Add `mudgeeraba` export |
| `resultSingle/index.tsx` | ⬜ | Add `mudgeeraba` export |
| `upcoming/index.tsx` | ⬜ | Add `mudgeeraba` export |
| `teamRoster/index.tsx` | ⬜ | Add `mudgeeraba` export |
| `performances/index.tsx` | ⬜ | Add `mudgeeraba` export |
| `TeamOfTheWeek/index.tsx` | ⬜ | Add `mudgeeraba` export |
| `cricket/index.tsx` | ⬜ | Add all `mudgeeraba` exports |

---

## Key Implementation Notes

### Naming Conventions

- **Template Variant:** `Mudgeeraba` (PascalCase)
- **Cricket Variant Key:** `mudgeeraba` (lowercase)
- **File Names:** `mudgeeraba.tsx` (lowercase)
- **Component Names:** `Mudgeeraba` prefix (e.g., `MudgeerabaDisplay`, `MudgeerabaRow`)

### Template Integration

All compositions must:

1. **Use Mudgeeraba theme:**
   ```typescript
   const { selectedPalette, layout } = useThemeContext();
   // Use selectedPalette for colors
   // Use layout for spacing, border radius, etc.
   ```

2. **Use Mudgeeraba animations:**
   ```typescript
   const { animations } = useAnimationContext();
   // Use animations.container, animations.text, etc.
   ```

3. **Match Mudgeeraba styling:**
   - Use Rubik Dirt font (via theme)
   - Use same color variants (`onContainerCopy`, `onBackgroundMain`, etc.)
   - Use same component styles from theme
   - Follow Mudgeeraba's design patterns

### Export Structure

Each composition must export:

```typescript
// {compositionType}/mudgeeraba.tsx
export const mudgeeraba: React.FC = () => {
  return <CompositionWithTransitions />;
};

export default mudgeeraba;
```

Then in `{compositionType}/index.tsx`:

```typescript
import { mudgeeraba as {compositionType}Mudgeeraba } from "./mudgeeraba";

export const Cricket{CompositionType} = {
  // ... existing variants
  mudgeeraba: {compositionType}Mudgeeraba,
};
```

Finally in `src/compositions/cricket/index.tsx`:

```typescript
import {
  mudgeeraba as ladderMudgeeraba,
  mudgeeraba as top5Mudgeeraba,
  // ... etc
} from "./ladder"; // and other compositions

export const CricketLadder = {
  // ... existing variants
  mudgeeraba: ladderMudgeeraba,
};

export const CricketTop5 = {
  // ... existing variants
  mudgeeraba: top5Mudgeeraba,
};

// ... repeat for all compositions
```

---

## Next Steps

1. **Start with Team Roster** (simplest composition)
2. **Follow individual how-to guide** for each composition
3. **Reference Basic variant** implementations for patterns
4. **Test each composition** before moving to next
5. **Update this plan** as progress is made
6. **Complete all 8 compositions** before final integration testing

---

## Resources

### Reference Implementations

- **Basic Variant:** `src/compositions/cricket/{compositionType}/basic.tsx`
- **Classic Variant:** `src/compositions/cricket/{compositionType}/classic.tsx`

### Documentation

- **Main Guide:** `src/compositions/cricket/.docs/how-to-create-cricket-variant.md`
- **Template Guide:** `src/templates/.docs/how-to.md`
- **Individual Guides:** `src/compositions/cricket/{compositionType}/.docs/how-to.md`

---

**Last Updated:** 2026-02-08  
**Status:** Planning Complete - Ready for Implementation

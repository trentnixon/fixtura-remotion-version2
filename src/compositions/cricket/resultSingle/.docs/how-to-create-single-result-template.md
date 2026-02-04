# How-To Guide: Creating Single Result Templates for Association & Club Level Accounts

**Purpose:** This guide documents the complete process for creating single result templates that support both association-level (regular) and club-level (club-only) account types.

**Last Updated:** 2026-02-02
**Based On:** Classic Template Implementation
**Status:** ✅ Complete - Reflects actual Classic template implementation

---

## 📋 Overview

Single result templates display one match at a time with full height utilization. They support two modes:

- **Association Level:** Shows both teams' full statistics
- **Club Level:** Shows only the club team's performance (batting under club team, bowling under opposition)

This guide walks through creating a complete template implementation.

---

## 🎯 What We Built: Classic Template Example

### Files Created/Updated

1. **Club-Only Card Component:** `layout/MatchCard/card-sixers-ClubOnly.tsx`
2. **Display Controller:** `controller/ResultSingleDisplay/display-classic.tsx` (updated)
3. **Result Statement Component:** `layout/Sections/ResultStatement/ResultStatementClassic.tsx` (new)

### Key Features

- ✅ Conditional rendering based on `isAccountClub` flag
- ✅ Club team batting stats under club team
- ✅ Club team bowling stats under opposition team
- ✅ Result statement with matching stats styling
- ✅ Proper height and delay calculations
- ✅ Consistent with Classic template design

---

## 🏗️ Architecture Overview

### Component Hierarchy

```
Entry Point (classic.tsx)
  └─> Display Controller (display-classic.tsx)
      └─> Conditional Rendering
          ├─> Club-Only Card (card-sixers-ClubOnly.tsx) [if isAccountClub]
          └─> Regular Card (card-sixers.tsx) [if !isAccountClub]
```

### Key Concepts

1. **Display Controller** - Handles conditional rendering based on account type
2. **Card Components** - Layout components for match display
3. **Result Statement** - Displays match result summary (optional)
4. **Utilities** - Shared calculation functions

---

## 📝 Step-by-Step Implementation

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

## 🎨 Design Patterns

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

## 🔧 Utilities Reference

### Height Calculations

**File:** `layout/MatchCard/_utils/calculations.ts`

```typescript
export const calculateSectionHeights = (rowHeight: number) => {
  const teamsHeight = Math.floor(rowHeight * 0.4); // 40% for team scores
  const statsHeight = Math.floor(rowHeight * 0.5); // 50% for player stats
  const headerHeight = Math.floor(rowHeight * 0.1); // 10% for match info

  return { teamsHeight, statsHeight, headerHeight };
};
```

**Usage:**

```typescript
const rowHeight = heights.asset; // Full asset height for single results
const { teamsHeight, statsHeight, headerHeight } =
  calculateSectionHeights(rowHeight);
```

### Delay Calculations

```typescript
export const calculateDelays = (delay: number) => {
  const baseDelay = delay;
  const statsDelay = baseDelay + 4;
  const headerDelay = statsDelay + 5;

  return { baseDelay, statsDelay, headerDelay };
};
```

**Usage:**

```typescript
const baseDelay = 0; // Single results start at 0
const {
  baseDelay: calculatedBaseDelay,
  statsDelay,
  headerDelay,
} = calculateDelays(baseDelay);
```

### Club Team Extraction

```typescript
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

**Usage:**

```typescript
const clubTeamPlayers = getClubTeamPlayers(match);
if (!clubTeamPlayers) {
  return null; // No club team found
}
```

---

## 📊 Component Mapping

### Required Components

| Component                                  | Purpose              | Location                                        |
| ------------------------------------------ | -------------------- | ----------------------------------------------- |
| `SingleDataPointHeader`                    | Result/grade headers | `results/layout/Sections/MatchHeader/`          |
| `Horizontal_SingleTeam_LogoWithName_Score` | Team display         | `results/layout/Sections/TeamsSection/`         |
| `PlayerStatsSingleTeamOnly`                | Club team stats      | `results/layout/Sections/PlayerStats/`          |
| `MatchHeader`                              | Match info footer    | `resultSingle/layout/Sections/MatchHeader/`     |
| `ResultStatementClassic`                   | Result statement     | `resultSingle/layout/Sections/ResultStatement/` |

### Optional Components

- `ResultStatementShort` - For short result text
- `MatchStatus` - For abandoned matches
- Custom footer components (e.g., logo footer for Sixers)

---

## ✅ Implementation Checklist

### Phase 1: Club-Only Card Component

- [ ] Create `card-{TemplateName}-ClubOnly.tsx`
- [ ] Import required components
- [ ] Implement club team identification logic
- [ ] Add height and delay calculations
- [ ] Implement section layout (headers → result → teams → stats → footer)
- [ ] Handle first innings scores
- [ ] Add safety checks (null returns)
- [ ] Match styling with regular card

### Phase 2: Result Statement Component (If Needed)

- [ ] Create `ResultStatementClassic.tsx` (if template-specific styling needed)
- [ ] Use same background color as stats
- [ ] Use `onContainerCopy` variant for text
- [ ] Implement priority logic (resultSummary > resultShort)
- [ ] Export from index.tsx

### Phase 3: Display Controller

- [ ] Import `useVideoDataContext` hook
- [ ] Extract `isAccountClub` flag
- [ ] Import club-only card component
- [ ] Add conditional rendering logic
- [ ] Ensure sponsor footer remains unchanged

### Phase 4: Testing

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

## 🎯 Key Design Decisions

### 1. Stats Placement

**Decision:** Batting stats under club team, bowling stats under opposition

**Rationale:**

- Shows club team's batting performance with their team display
- Shows club team's bowling performance with opposition (contextual)
- Matches weekend results pattern

### 2. Result Statement Styling

**Decision:** Match stats background color and text color

**Rationale:**

- Creates visual consistency
- Integrates seamlessly with template design
- Uses `onContainerCopy` variant for proper contrast

### 3. Height Calculations

**Decision:** Use `heights.asset` (full available height)

**Rationale:**

- Single results have full asset height available
- More space allows for more players per stat (5 vs 3)
- Consistent with single result context

### 4. Delay Calculations

**Decision:** Start from `baseDelay = 0`

**Rationale:**

- Single results start fresh (no previous matches)
- Consistent delay pattern across sections
- Predictable animation timing

---

## 🔍 Common Patterns & Variations

### Pattern 1: Classic Template (What We Built)

- Uses `ResultStatementClassic` for result display
  - Three separate sections: Home Team | Result Word | Away Team
  - Column layout (vertical stacking)
  - Centered alignment with large text
  - No animation container (static display)
- Right-aligned headers (gradeName)
- Result statement placed first (before headers)
- Club batting → Opposition → Club bowling
- Uses `MatchHeader` component

### Pattern 2: Basic Template

- Uses `ResultStatementText` (centered, rotated)
- Uses `ScoreOverNameWithLogo` for teams
- Uses `Type_Round_Ground_stacked` header
- Different section ordering

### Pattern 3: CNSW Template

- Uses `TeamsSectionScoreOverTeamNameOnly`
- Uses `PlayerStatsClubOnlyCNSW` component
- Different styling approach

---

## 📝 Code Examples

### Complete Club-Only Card Example

See: `layout/MatchCard/card-sixers-ClubOnly.tsx` for full implementation

### Complete Display Controller Example

See: `controller/ResultSingleDisplay/display-classic.tsx` for full implementation

### Complete Result Statement Example

See: `layout/Sections/ResultStatement/ResultStatementClassic.tsx` for full implementation

---

## 🚨 Common Pitfalls & Solutions

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

## 🔗 Related Documentation

- **How-To Add Club-Only Support:** `.docs/how-to-add-club-only-support.md`
- **Extrapolation Plan:** `.docs/club-only-extrapolation-plan.md`
- **Implementation Checklist:** `.docs/club-only-implementation-checklist.md`
- **Review Summary:** `.docs/review-summary.md`

---

## 📚 Reference Files

### Classic Template Implementation

- **Card:** `layout/MatchCard/card-sixers-ClubOnly.tsx`
- **Display:** `controller/ResultSingleDisplay/display-classic.tsx`
- **Result Statement:** `layout/Sections/ResultStatement/ResultStatementClassic.tsx`

### Basic Template Implementation

- **Card:** `layout/MatchCard/card-Basic-ClubOnly.tsx`
- **Display:** `controller/ResultSingleDisplay/display.tsx`

### Utilities

- **Calculations:** `layout/MatchCard/_utils/calculations.ts`
- **Types:** `types.tsx`

---

## ✅ Success Criteria

A template is complete when:

1. ✅ Club-only card component exists and renders correctly
2. ✅ Display controller conditionally renders based on `isAccountClub`
3. ✅ Club team stats display correctly (batting under club, bowling under opposition)
4. ✅ Result statement displays with matching stats styling
5. ✅ Heights and delays calculate correctly
6. ✅ First innings scores display for Two Day+ matches
7. ✅ No TypeScript errors
8. ✅ No console errors
9. ✅ Matches visual design of regular card (adjusted for club-only focus)

---

## 🎓 Summary

Creating a single result template with club-only support involves:

1. **Creating a club-only card component** that shows only club team stats

   - Club team batting stats under club team
   - Club team bowling stats under opposition team
   - Proper club team identification and safety checks

2. **Creating/using a result statement component** with matching styling

   - Three separate sections: Home Team | Result Word | Away Team
   - Column layout (vertical stacking) using `flex-col`
   - No animation container (static display with simple `div`)
   - Large text sizes (`text-5xl` for teams, `text-4xl` for result word)
   - Centered alignment (can be customized to right-aligned if needed)

3. **Updating the display controller** to conditionally render based on account type

   - Uses `isAccountClub` flag from `useVideoDataContext`
   - Conditionally renders club-only or regular card
   - Sponsor footer remains unchanged

4. **Using shared utilities** for calculations

   - `calculateSectionHeights()` for height distribution (40% teams, 50% stats, 10% header)
   - `calculateDelays()` for animation timing (baseDelay=0, statsDelay=4, headerDelay=9)
   - `getClubTeamPlayers()` for club team extraction

5. **Following established patterns** for consistency
   - Result statement placed first (before headers)
   - Proper section ordering
   - Consistent styling and spacing

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

**Next Steps:**

- Review this guide
- Choose a template to implement
- Follow the checklist step-by-step
- Reference Classic template code as needed
- Test thoroughly before moving to next template

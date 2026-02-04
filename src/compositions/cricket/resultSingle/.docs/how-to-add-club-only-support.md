# How-To Guide: Adding Club-Only Support to ResultSingle Templates

**Purpose:** This guide documents the pattern used to add club-only support to the Basic template and how to apply it to other templates.

---

## 📋 Overview

Club-only support allows templates to display a focused view showing only the club team's performance when `isAccountClub` is true. This guide walks through the implementation pattern.

---

## ✅ What Was Done: Basic Template

### Step 1: Create Club-Only MatchCard Component

**File:** `layout/MatchCard/card-Basic-ClubOnly.tsx`

**Key Features:**

- Shows only club team's player statistics
- Uses `ScoreOverNameWithLogo` for team display (both teams shown, but stats filtered)
- Conditional rendering for `resultSummary` (priority) and `resultShort`
- Conditional `MatchStatus` (only when Abandoned)
- Uses `Type_Round_Ground_stacked` for match info footer
- Calculates heights from `heights.asset` (full available height)
- Uses `calculateSectionHeights` and `calculateDelays` utilities

**Component Structure:**

```typescript
const MatchCardClubOnlyBasic: React.FC<MatchCardProps> = ({ match }) => {
  const { selectedPalette, layout } = useThemeContext();
  const { heights } = layout;

  const rowHeight = heights.asset;
  const baseDelay = 0;

  // Calculate heights and delays
  const { teamsHeight, statsHeight, headerHeight } = calculateSectionHeights(rowHeight);
  const { baseDelay: calculatedBaseDelay, statsDelay, headerDelay } = calculateDelays(baseDelay);

  // Extract optional fields
  const { resultShort, resultSummary } = match;

  return (
    <div className="rounded-lg w-auto mx-8 overflow-hidden h-full flex flex-col justify-center">
      {/* ResultStatementText/ResultStatementShort (conditional) */}
      {/* ScoreOverNameWithLogo (teams) */}
      {/* MatchStatus (conditional - Abandoned only) */}
      {/* PlayerStatsClubOnlyBasic (club team stats) */}
      {/* Type_Round_Ground_stacked (match info) */}
    </div>
  );
};
```

**Section Order:**

1. ResultStatementText (if `resultSummary` exists)
2. ResultStatementShort (if `resultShort` exists and no `resultSummary`)
3. ScoreOverNameWithLogo (both teams)
4. MatchStatus (if `status === "Abandoned"`)
5. PlayerStatsClubOnlyBasic (club team only)
6. Type_Round_Ground_stacked (match info footer)

---

### Step 2: Update Display Controller

**File:** `controller/ResultSingleDisplay/display.tsx`

**Change:** Add conditional rendering based on `isAccountClub`

**Before:**

```typescript
const ResultSingleDisplay: React.FC<ResultSingleDisplayProps> = ({ match }) => {
  return (
    <div>
      <MatchCard match={match} />
      <SponsorFooter />
    </div>
  );
};
```

**After:**

```typescript
const ResultSingleDisplay: React.FC<ResultSingleDisplayProps> = ({ match }) => {
  const { isAccountClub } = useVideoDataContext();

  return (
    <div>
      {isAccountClub ? (
        <MatchCardClubOnlyBasic match={match} />
      ) : (
        <MatchCard match={match} />
      )}
      <SponsorFooter />
    </div>
  );
};
```

**Key Points:**

- Import `useVideoDataContext` hook
- Extract `isAccountClub` flag
- Conditionally render club-only or regular card
- Sponsor footer remains unchanged

---

### Step 3: Update Type Definitions

**File:** `types.tsx`

**Change:** Add optional fields for result statements

**Added:**

```typescript
export interface MatchResult {
  // ... existing fields
  resultShort?: string;
  resultSummary?: ResultSummary;
}
```

**Rationale:** These fields are used in club-only templates but may not always be present in match data.

---

## 🔄 Pattern Summary

The pattern consists of three main steps:

1. **Create Club-Only Card Component** (`card-{TemplateName}-ClubOnly.tsx`)

   - Replicate the regular card structure
   - Replace player stats with club-only version
   - Adjust section ordering if needed
   - Use appropriate header component

2. **Update Display Controller** (`display-{template}.tsx`)

   - Add `isAccountClub` check
   - Conditionally render club-only or regular card

3. **Ensure Type Safety** (`types.tsx`)
   - Add optional fields if needed
   - Ensure all props are properly typed

---

## 📊 Component Mapping

### Basic Template ✅

- **Regular Card:** `card.tsx`
- **Club-Only Card:** `card-Basic-ClubOnly.tsx` ✅
- **Display:** `display.tsx` ✅ (updated)
- **PlayerStats:** `PlayerStatsClubOnlyBasic` ✅

### Classic Template ⏳

- **Regular Card:** `card-sixers.tsx`
- **Club-Only Card:** `card-sixers-ClubOnly.tsx` ❌ (needs creation)
- **Display:** `display-classic.tsx` ❌ (needs update)
- **PlayerStats:** `PlayerStatsSingleTeamOnly` (can reuse)

### Classic Two Columns ⏳

- **Regular Card:** `card-classic-two-columns.tsx`
- **Club-Only Card:** `card-classic-two-columns-ClubOnly.tsx` ❌ (needs creation)
- **Display:** `display-classic-two-columns.tsx` ❌ (needs update)
- **PlayerStats:** `PlayerStatsSingleTeamOnly` (can reuse)
- **Reference:** `results/layout/MatchCard/card-classic-twocolumn-clubOnly.tsx` exists

### CNSW Template ⏳

- **Regular Card:** `card-cnsw.tsx`
- **Club-Only Card:** `card-cnsw-ClubOnly.tsx` ❌ (needs creation)
- **Display:** `display-cnsw.tsx` ❌ (needs update)
- **PlayerStats:** `PlayerStatsClubOnlyCNSW` ✅ (exists in results, needs replication)

### CNSW Private Template ⏳

- **Regular Card:** `card-cnsw-private.tsx`
- **Club-Only Card:** `card-cnsw-private-ClubOnly.tsx` ❌ (needs creation)
- **Display:** `display-cnsw-private.tsx` ❌ (needs update)
- **PlayerStats:** `PlayerStatsClubOnlyCNSW` ✅ (exists in results, needs replication)

### Sixers Template ⏳

- **Regular Card:** `card-sixers.tsx` (same as classic)
- **Club-Only Card:** `card-sixers-ClubOnly.tsx` ❌ (needs creation)
- **Display:** `display-sixers.tsx` ❌ (needs update)
- **PlayerStats:** `PlayerStatsSingleTeamOnly` (can reuse)

---

## 🎯 Implementation Checklist

For each template variant:

### Phase 1: Create Club-Only Card Component

- [ ] Create `card-{TemplateName}-ClubOnly.tsx`
- [ ] Import necessary sections/components
- [ ] Use `calculateSectionHeights` and `calculateDelays` utilities
- [ ] Implement conditional rendering for result statements
- [ ] Use club-only player stats component
- [ ] Match section ordering with regular card (or adjust as needed)
- [ ] Use appropriate header component

### Phase 2: Update Display Controller

- [ ] Import `useVideoDataContext` hook
- [ ] Extract `isAccountClub` flag
- [ ] Import club-only card component
- [ ] Add conditional rendering logic
- [ ] Ensure sponsor footer remains unchanged

### Phase 3: Verify Components Exist

- [ ] Check if club-only PlayerStats component exists
- [ ] Replicate from `results` layout if needed
- [ ] Verify all section components are available
- [ ] Check type definitions are complete

### Phase 4: Testing

- [ ] Test with `isAccountClub = true`
- [ ] Test with `isAccountClub = false`
- [ ] Verify club team stats display correctly
- [ ] Test conditional rendering (resultSummary, resultShort, MatchStatus)
- [ ] Verify heights and spacing
- [ ] Check animation delays

---

## 📝 Template-Specific Notes

### Classic / Sixers Template

- Uses `card-sixers.tsx` (same component)
- Can share the same club-only card
- Uses `PlayerStatsSingleTeamOnly` (already exists)
- Reference: Similar structure to regular card

### Classic Two Columns

- **Reference:** `results/layout/MatchCard/card-classic-twocolumn-clubOnly.tsx`
- Shows club team batting, then opposition team, then club team bowling
- Uses `getClubTeamPlayers` utility
- Different layout pattern (batting/bowling split)

### CNSW Template

- Uses `PlayerStatsClubOnlyCNSW` (needs replication from results)
- Uses `TeamsSectionScoreOverTeamNameOnly` (different from Basic)
- Uses `MatchHeader` (not stacked version)
- Reference: `results/layout/MatchCard/card-CNSW-clubOnly.tsx`

### CNSW Private Template

- Similar to CNSW but may have different styling
- Check if separate club-only component needed or can share with CNSW

---

## 🔍 Key Differences from Weekend Results

| Aspect               | Single Results                          | Weekend Results       |
| -------------------- | --------------------------------------- | --------------------- |
| **Height Source**    | `heights.asset` (calculated internally) | `rowHeight` prop      |
| **Delay Source**     | Calculated internally (`baseDelay = 0`) | `delay` prop          |
| **Max Players**      | Usually 5 (more space)                  | Usually 3             |
| **Header Component** | May use `Type_Round_Ground_stacked`     | Usually `MatchHeader` |
| **Section Order**    | May prioritize result statements        | Different ordering    |

**Note:** These differences are intentional - single results have more vertical space available.

---

## 🛠️ Utilities Available

### Height Calculations

```typescript
import { calculateSectionHeights } from "./_utils/calculations";

const { teamsHeight, statsHeight, headerHeight } =
  calculateSectionHeights(rowHeight);
// Returns: 40% teams, 50% stats, 10% header
```

### Delay Calculations

```typescript
import { calculateDelays } from "./_utils/calculations";

const { baseDelay, statsDelay, headerDelay } = calculateDelays(delay);
// Returns: baseDelay, statsDelay = baseDelay + 4, headerDelay = statsDelay + 5
```

### Club Team Extraction

```typescript
import { getClubTeamPlayers } from "./_utils/calculations";

const clubTeamPlayers = getClubTeamPlayers(match);
// Returns: { battingPerformances, bowlingPerformances } or null
```

---

## ✅ Success Criteria

A template has club-only support when:

1. ✅ Club-only card component exists
2. ✅ Display controller conditionally renders based on `isAccountClub`
3. ✅ Club team stats display correctly
4. ✅ All conditional rendering works (resultSummary, resultShort, MatchStatus)
5. ✅ Heights and delays calculate correctly
6. ✅ No TypeScript errors
7. ✅ Matches visual pattern of regular card (adjusted for club-only focus)

---

## 🔗 Related Files

- **Basic Implementation:** `layout/MatchCard/card-Basic-ClubOnly.tsx`
- **Display Controller:** `controller/ResultSingleDisplay/display.tsx`
- **Utilities:** `layout/MatchCard/_utils/calculations.ts`
- **Types:** `types.tsx`
- **Weekend Results Reference:** `../results/layout/MatchCard/card-*-clubOnly.tsx`

---

## 📚 Next Steps

1. Review this guide
2. Choose a template to implement next
3. Follow the checklist for that template
4. Reference weekend results club-only components as needed
5. Test thoroughly before moving to next template

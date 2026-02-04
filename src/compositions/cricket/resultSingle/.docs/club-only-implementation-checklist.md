# Club-Only Implementation Checklist

**Quick Reference:** Use this checklist when implementing club-only support for each template.

---

## 📋 Per-Template Checklist

### Phase 1: Preparation

- [ ] Review regular card component (`card-{template}.tsx`)
- [ ] Check if weekend results club-only exists (`results/layout/MatchCard/card-{template}-clubOnly.tsx`)
- [ ] Identify which PlayerStats component to use
- [ ] List all section components needed
- [ ] Check if any components need replication from results

### Phase 2: Create Club-Only Card Component

- [ ] Create `layout/MatchCard/card-{template}-ClubOnly.tsx`
- [ ] Import necessary sections/components
- [ ] Import utilities (`calculateSectionHeights`, `calculateDelays`, `getClubTeamPlayers`)
- [ ] Set up height calculations (`heights.asset`)
- [ ] Set up delay calculations (`baseDelay = 0`)
- [ ] Implement conditional rendering for `resultSummary` (if applicable)
- [ ] Implement conditional rendering for `resultShort` (if applicable)
- [ ] Implement conditional rendering for `MatchStatus` (Abandoned only)
- [ ] Use club-only PlayerStats component
- [ ] Use appropriate header component
- [ ] Match section ordering with regular card (or adjust as needed)
- [ ] Remove `AnimatedContainer` wrapper (use simple `div`)
- [ ] Add proper className and styling

### Phase 3: Update Display Controller

- [ ] Open `controller/ResultSingleDisplay/display-{template}.tsx`
- [ ] Import `useVideoDataContext` hook
- [ ] Extract `isAccountClub` flag
- [ ] Import club-only card component
- [ ] Add conditional rendering logic
- [ ] Ensure sponsor footer remains unchanged (if applicable)
- [ ] Ensure custom footer remains unchanged (e.g., Sixers logo)

### Phase 4: Component Replication (If Needed)

- [ ] Identify components that need replication
- [ ] Copy component file from results layout
- [ ] Update all import paths
- [ ] Update relative path depth (add `../` as needed)
- [ ] Verify all dependencies exist
- [ ] Update index.tsx exports
- [ ] Test component renders correctly

### Phase 5: Type Safety

- [ ] Verify `resultShort` and `resultSummary` are in `MatchResult` type ✅ (already done)
- [ ] Check all props are properly typed
- [ ] Ensure no TypeScript errors

### Phase 6: Testing

- [ ] Test with `isAccountClub = true` → shows club-only card
- [ ] Test with `isAccountClub = false` → shows regular card
- [ ] Verify club team stats display correctly
- [ ] Test `resultSummary` conditional rendering
- [ ] Test `resultShort` conditional rendering
- [ ] Test `MatchStatus` (Abandoned matches)
- [ ] Verify heights calculate correctly
- [ ] Verify animation delays work
- [ ] Check sponsor footer displays (if applicable)
- [ ] Check custom footer displays (if applicable)
- [ ] No console errors
- [ ] No console warnings

---

## 🔍 Quick Reference: Component Mapping

### Basic Template ✅

- **Card:** `card-Basic-ClubOnly.tsx` ✅
- **PlayerStats:** `PlayerStatsClubOnlyBasic` ✅
- **Teams:** `ScoreOverNameWithLogo` ✅
- **Header:** `Type_Round_Ground_stacked` ✅

### Classic Template

- **Card:** `card-sixers-ClubOnly.tsx` ❌
- **PlayerStats:** `PlayerStatsSingleTeamOnly` ✅ (exists)
- **Teams:** `Horizontal_SingleTeam_LogoWithName_Score` ✅ (exists)
- **Header:** `MatchHeader` ✅ (exists)

### Classic Two Columns

- **Card:** `card-classic-two-columns-ClubOnly.tsx` ❌
- **PlayerStats:** `PlayerStatsSingleTeamOnly` ✅ (exists)
- **Teams:** `Horizontal_SingleTeam_LogoWithName_Score` ✅ (exists)
- **Header:** `MatchHeader` ✅ (exists)
- **Pattern:** Club batting → Opposition → Club bowling

### CNSW Template

- **Card:** `card-cnsw-ClubOnly.tsx` ❌
- **PlayerStats:** `PlayerStatsClubOnlyCNSW` ❌ (needs replication)
- **Teams:** `TeamsSectionScoreOverTeamNameOnly` ❓ (check if exists)
- **Header:** `MatchHeader` ✅ (exists)

### CNSW Private Template

- **Card:** `card-cnsw-private-ClubOnly.tsx` ❌ (or reuse CNSW)
- **PlayerStats:** `PlayerStatsClubOnlyCNSW` ❌ (needs replication)
- **Teams:** `TeamsSectionScoreOverTeamNameOnly` ❓ (check if exists)
- **Header:** `MatchHeader` ✅ (exists)

### Sixers Template

- **Card:** `card-sixers-ClubOnly.tsx` ❌ (can reuse Classic)
- **PlayerStats:** `PlayerStatsSingleTeamOnly` ✅ (exists)
- **Teams:** `Horizontal_SingleTeam_LogoWithName_Score` ✅ (exists)
- **Header:** `MatchHeader` ✅ (exists)
- **Footer:** Custom logo (keep unchanged)

---

## 📝 Code Templates

### Club-Only Card Component Template

```typescript
import React from "react";
import { useThemeContext } from "../../../../../core/context/ThemeContext";
import { MatchCardProps } from "./_types/MatchCardProps";
import { calculateSectionHeights, calculateDelays } from "./_utils/calculations";
// Import sections/components as needed

const MatchCard{Template}ClubOnly: React.FC<MatchCardProps> = ({ match }) => {
  const { selectedPalette, layout } = useThemeContext();
  const { heights } = layout;

  // For single result, use full asset height available
  const rowHeight = heights.asset;
  const baseDelay = 0;

  // Calculate section heights
  const { teamsHeight, statsHeight, headerHeight } = calculateSectionHeights(rowHeight);

  // Calculate delays
  const { baseDelay: calculatedBaseDelay, statsDelay, headerDelay } = calculateDelays(baseDelay);

  // Extract optional fields
  const { resultShort, resultSummary } = match;

  return (
    <div className="rounded-lg w-auto mx-8 overflow-hidden h-full flex flex-col justify-center">
      {/* Add sections here */}
    </div>
  );
};

export default MatchCard{Template}ClubOnly;
```

### Display Controller Update Template

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
      <div
        className="w-full flex flex-col justify-center"
        style={{ height: `${availableHeight}px` }}
      >
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

export default {Template}SingleResult;
```

---

## ✅ Verification Steps

After completing each template:

1. **Visual Check**

   - [ ] Club-only card renders correctly
   - [ ] Regular card still works
   - [ ] Conditional switching works

2. **Functional Check**

   - [ ] Club team stats show correctly
   - [ ] Conditional rendering works
   - [ ] Heights and spacing look correct

3. **Code Quality**

   - [ ] No TypeScript errors
   - [ ] No console errors
   - [ ] No console warnings
   - [ ] Code follows existing patterns

4. **Documentation**
   - [ ] Update status in extrapolation plan
   - [ ] Note any deviations from pattern
   - [ ] Document any special considerations

---

## 🚨 Common Issues & Solutions

### Issue: Component not found

**Solution:** Check import paths, verify component exists in resultSingle layout

### Issue: Type errors

**Solution:** Ensure `resultShort` and `resultSummary` are optional in MatchResult type ✅

### Issue: Heights not calculating

**Solution:** Use `heights.asset` for single results (not `rowHeight` prop)

### Issue: Delays not working

**Solution:** Use `calculateDelays(0)` for single results (not delay prop)

### Issue: PlayerStats showing both teams

**Solution:** Use club-only PlayerStats component, not regular one

### Issue: Components from results not found

**Solution:** Replicate component to resultSingle layout, update import paths

---

## 📚 Reference Files

- **How-To Guide:** `.docs/how-to-add-club-only-support.md`
- **Extrapolation Plan:** `.docs/club-only-extrapolation-plan.md`
- **Basic Example:** `layout/MatchCard/card-Basic-ClubOnly.tsx`
- **Display Example:** `controller/ResultSingleDisplay/display.tsx`
- **Utilities:** `layout/MatchCard/_utils/calculations.ts`
- **Types:** `types.tsx`

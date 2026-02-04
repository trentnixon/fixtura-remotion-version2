# Club-Only Support Extrapolation Plan

**Date:** 2026-02-02
**Status:** Planning Phase
**Goal:** Add club-only support to all remaining ResultSingle templates

---

## 📊 Current Status

| Template                | Club-Only Card               | Display Updated  | Status      |
| ----------------------- | ---------------------------- | ---------------- | ----------- |
| **Basic**               | ✅ `card-Basic-ClubOnly.tsx` | ✅ `display.tsx` | ✅ Complete |
| **Classic**             | ❌ Missing                   | ❌ Not updated   | ⏳ Pending  |
| **Classic Two Columns** | ❌ Missing                   | ❌ Not updated   | ⏳ Pending  |
| **CNSW**                | ❌ Missing                   | ❌ Not updated   | ⏳ Pending  |
| **CNSW Private**        | ❌ Missing                   | ❌ Not updated   | ⏳ Pending  |
| **Sixers**              | ❌ Missing                   | ❌ Not updated   | ⏳ Pending  |

---

## 🎯 Implementation Order

### Priority 1: Classic Template (Same as Sixers)

**Reason:** Simplest - uses same card as Sixers, can share club-only component

### Priority 2: Classic Two Columns

**Reason:** Reference exists in weekend results, clear pattern to follow

### Priority 3: CNSW

**Reason:** Reference exists, but needs PlayerStats component replication

### Priority 4: CNSW Private

**Reason:** Similar to CNSW, may be able to share components

### Priority 5: Sixers

**Reason:** Uses same card as Classic, can share club-only component

---

## 📋 Detailed Implementation Plans

### 1. Classic Template

#### Files to Create/Update

**Create:** `layout/MatchCard/card-sixers-ClubOnly.tsx`

- **Reference:** `card-sixers.tsx` (regular card)
- **Pattern:** Similar to Basic but uses `card-sixers.tsx` structure
- **PlayerStats:** `PlayerStatsSingleTeamOnly` (already exists)

**Update:** `controller/ResultSingleDisplay/display-classic.tsx`

- Add `isAccountClub` conditional rendering
- Import `card-sixers-ClubOnly.tsx`

#### Implementation Steps

1. **Create Club-Only Card**

   ```typescript
   // File: layout/MatchCard/card-sixers-ClubOnly.tsx
   import { PlayerStatsSingleTeamOnly } from "../../../results/layout/Sections/PlayerStats/PlayerStats-SingleTeamOnly";
   import { Horizontal_SingleTeam_LogoWithName_Score } from "../../../results/layout/Sections/TeamsSection/Horizontal_SingleTeam_LogoWithName_Score";
   import { SingleDataPointHeader } from "../../../results/layout/Sections/MatchHeader/SingleDataPointHeader";
   import MatchHeader from "../Sections/MatchHeader/index";
   import { getClubTeamPlayers } from "./_utils/calculations";
   import {
     calculateSectionHeights,
     calculateDelays,
   } from "./_utils/calculations";

   // Structure similar to card-sixers.tsx but:
   // - Show only club team stats
   // - Use getClubTeamPlayers to filter
   // - Conditional resultSummary/resultShort
   ```

2. **Update Display**

   ```typescript
   // File: controller/ResultSingleDisplay/display-classic.tsx
   import { useVideoDataContext } from "../../../../../core/context/VideoDataContext";
   import SixersMatchCardClubOnly from "../../layout/MatchCard/card-sixers-ClubOnly";

   const { isAccountClub } = useVideoDataContext();

   {isAccountClub ? (
     <SixersMatchCardClubOnly match={match} />
   ) : (
     <SixersMatchCard match={match} />
   )}
   ```

**Estimated Effort:** Low (can reuse existing components)

---

### 2. Classic Two Columns Template

#### Files to Create/Update

**Create:** `layout/MatchCard/card-classic-two-columns-ClubOnly.tsx`

- **Reference:** `results/layout/MatchCard/card-classic-twocolumn-clubOnly.tsx`
- **Pattern:** Club team batting → Opposition team → Club team bowling
- **PlayerStats:** `PlayerStatsSingleTeamOnly` with `showBatting`/`showBowling` props

**Update:** `controller/ResultSingleDisplay/display-classic-two-columns.tsx`

- Add `isAccountClub` conditional rendering

#### Implementation Steps

1. **Create Club-Only Card**

   ```typescript
   // File: layout/MatchCard/card-classic-two-columns-ClubOnly.tsx
   // Reference: results/layout/MatchCard/card-classic-twocolumn-clubOnly.tsx

   // Key differences from regular card:
   // - Shows club team batting first
   // - Shows opposition team (scores only)
   // - Shows club team bowling last
   // - Uses getClubTeamPlayers utility
   // - Conditional resultShort display
   ```

2. **Update Display**

   ```typescript
   // File: controller/ResultSingleDisplay/display-classic-two-columns.tsx
   import ClassicTwoColumnsMatchCardClubOnly from "../../layout/MatchCard/card-classic-two-columns-ClubOnly";

   {isAccountClub ? (
     <ClassicTwoColumnsMatchCardClubOnly match={match} />
   ) : (
     <ClassicTwoColumnsMatchCard match={match} />
   )}
   ```

**Estimated Effort:** Medium (unique layout pattern)

---

### 3. CNSW Template

#### Files to Create/Update

**Create:** `layout/MatchCard/card-cnsw-ClubOnly.tsx`

- **Reference:** `results/layout/MatchCard/card-CNSW-clubOnly.tsx`
- **Pattern:** Teams → ResultStatementShort → Stats → Header
- **PlayerStats:** `PlayerStatsClubOnlyCNSW` (needs replication)

**Replicate:** `layout/Sections/PlayerStats/PlayerStats-clubOnly-CNSW.tsx`

- **Source:** `results/layout/Sections/PlayerStats/PlayerStats-clubOnly-CNSW.tsx`

**Update:** `controller/ResultSingleDisplay/display-cnsw.tsx`

- Add `isAccountClub` conditional rendering

#### Implementation Steps

1. **Replicate PlayerStats Component**

   ```typescript
   // File: layout/Sections/PlayerStats/PlayerStats-clubOnly-CNSW.tsx
   // Copy from: results/layout/Sections/PlayerStats/PlayerStats-clubOnly-CNSW.tsx
   // Update import paths to match resultSingle structure
   ```

2. **Update PlayerStats Index**

   ```typescript
   // File: layout/Sections/PlayerStats/index.tsx
   export { PlayerStatsClubOnlyCNSW } from "./PlayerStats-clubOnly-CNSW";
   ```

3. **Create Club-Only Card**

   ```typescript
   // File: layout/MatchCard/card-cnsw-ClubOnly.tsx
   // Reference: results/layout/MatchCard/card-CNSW-clubOnly.tsx

   // Key components:
   // - TeamsSectionScoreOverTeamNameOnly
   // - ResultStatementShort (conditional)
   // - PlayerStatsClubOnlyCNSW
   // - MatchHeader
   ```

4. **Update Display**

   ```typescript
   // File: controller/ResultSingleDisplay/display-cnsw.tsx
   import CNSWMatchCardClubOnly from "../../layout/MatchCard/card-cnsw-ClubOnly";

   {isAccountClub ? (
     <CNSWMatchCardClubOnly match={match} />
   ) : (
     <CNSWMatchCard match={match} />
   )}
   ```

**Estimated Effort:** Medium-High (needs component replication)

---

### 4. CNSW Private Template

#### Files to Create/Update

**Option A:** Share with CNSW

- Check if `card-cnsw-private.tsx` differs significantly from `card-cnsw.tsx`
- If similar, can reuse `card-cnsw-ClubOnly.tsx`

**Option B:** Create Separate Component

- **Create:** `layout/MatchCard/card-cnsw-private-ClubOnly.tsx`
- Follow same pattern as CNSW

**Update:** `controller/ResultSingleDisplay/display-cnsw-private.tsx`

- Add `isAccountClub` conditional rendering

#### Implementation Steps

1. **Compare Regular Cards**

   - Review `card-cnsw.tsx` vs `card-cnsw-private.tsx`
   - Determine if separate club-only component needed

2. **Create/Reuse Club-Only Card**

   - If different: Create `card-cnsw-private-ClubOnly.tsx`
   - If similar: Reuse `card-cnsw-ClubOnly.tsx`

3. **Update Display**

   ```typescript
   // File: controller/ResultSingleDisplay/display-cnsw-private.tsx
   import CNSWMatchCardPrivateClubOnly from "../../layout/MatchCard/card-cnsw-private-ClubOnly";
   // OR reuse:
   import CNSWMatchCardClubOnly from "../../layout/MatchCard/card-cnsw-ClubOnly";

   {isAccountClub ? (
     <CNSWMatchCardPrivateClubOnly match={match} />
   ) : (
     <CNSWMatchCardPrivate match={match} />
   )}
   ```

**Estimated Effort:** Low-Medium (depends on differences)

---

### 5. Sixers Template

#### Files to Create/Update

**Option:** Share with Classic

- Uses same `card-sixers.tsx` as Classic
- Can share `card-sixers-ClubOnly.tsx`

**Update:** `controller/ResultSingleDisplay/display-sixers.tsx`

- Add `isAccountClub` conditional rendering
- Note: Has custom footer (logo), keep that unchanged

#### Implementation Steps

1. **Reuse Classic Club-Only Card**

   - Import `card-sixers-ClubOnly.tsx` (created for Classic)
   - No need to create separate component

2. **Update Display**

   ```typescript
   // File: controller/ResultSingleDisplay/display-sixers.tsx
   import SixersMatchCardClubOnly from "../../layout/MatchCard/card-sixers-ClubOnly";

   {isAccountClub ? (
     <SixersMatchCardClubOnly match={match} />
   ) : (
     <SixersMatchCard match={match} />
   )}

   // Footer (logo) remains unchanged
   ```

**Estimated Effort:** Very Low (reuses Classic component)

---

## 📝 Component Replication Checklist

When replicating components from `results` to `resultSingle`:

- [ ] Copy component file
- [ ] Update all import paths
- [ ] Update relative paths (e.g., `../../../../` → `../../../../../`)
- [ ] Verify all dependencies exist in resultSingle
- [ ] Check if types need updating
- [ ] Update index.tsx exports
- [ ] Test component renders correctly

---

## 🔍 Key Components to Check/Replicate

### From Results Layout

1. **PlayerStatsClubOnlyCNSW**

   - Source: `results/layout/Sections/PlayerStats/PlayerStats-clubOnly-CNSW.tsx`
   - Destination: `resultSingle/layout/Sections/PlayerStats/PlayerStats-clubOnly-CNSW.tsx`
   - Status: ❌ Needs replication

2. **TeamsSectionScoreOverTeamNameOnly** (for CNSW)

   - Check if exists in resultSingle
   - If not, replicate from results

3. **Any other CNSW-specific components**
   - Review CNSW club-only card to identify dependencies

---

## ✅ Testing Checklist (Per Template)

After implementing each template:

- [ ] Component renders without errors
- [ ] `isAccountClub = true` shows club-only card
- [ ] `isAccountClub = false` shows regular card
- [ ] Club team stats display correctly
- [ ] Result statements render conditionally
- [ ] MatchStatus shows only when Abandoned
- [ ] Heights calculate correctly
- [ ] Animation delays work
- [ ] Sponsor footer displays (if applicable)
- [ ] No TypeScript errors
- [ ] No console warnings

---

## 📊 Estimated Timeline

| Template            | Effort      | Dependencies            | Estimated Time  |
| ------------------- | ----------- | ----------------------- | --------------- |
| Classic             | Low         | None                    | 30 min          |
| Classic Two Columns | Medium      | None                    | 1 hour          |
| CNSW                | Medium-High | PlayerStats replication | 1.5 hours       |
| CNSW Private        | Low-Medium  | Depends on CNSW         | 30 min - 1 hour |
| Sixers              | Very Low    | Reuses Classic          | 15 min          |

**Total Estimated Time:** 3.5 - 4.5 hours

---

## 🎯 Success Criteria

All templates have club-only support when:

1. ✅ Club-only card component exists for each template
2. ✅ Display controllers conditionally render based on `isAccountClub`
3. ✅ All components render without errors
4. ✅ Club team stats display correctly
5. ✅ Conditional rendering works (resultSummary, resultShort, MatchStatus)
6. ✅ Heights and delays calculate correctly
7. ✅ No TypeScript errors
8. ✅ All tests pass

---

## 🔗 Related Documentation

- **How-To Guide:** `.docs/how-to-add-club-only-support.md`
- **Basic Implementation:** `layout/MatchCard/card-Basic-ClubOnly.tsx`
- **Weekend Results Reference:** `../results/layout/MatchCard/card-*-clubOnly.tsx`
- **Utilities:** `layout/MatchCard/_utils/calculations.ts`

---

## 📚 Next Actions

1. ✅ Review this plan
2. ⏳ Start with Classic template (simplest)
3. ⏳ Move to Classic Two Columns
4. ⏳ Handle CNSW (including component replication)
5. ⏳ Complete CNSW Private
6. ⏳ Finish with Sixers (quick win)

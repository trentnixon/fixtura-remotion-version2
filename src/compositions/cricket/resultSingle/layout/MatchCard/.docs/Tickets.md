# Completed Tickets

- (none)

---

# Ticket – TKT-2026-001

---

ID: TKT-2026-001
Status: In Progress
Priority: Medium
Owner: Development Team
Created: 2026-01-30
Updated: 2026-01-30
Related: MatchCard Club-Only Alignment

---

## Overview

Update `MatchCardClubOnlyBasic` component in `resultSingle` layout to align with the updated `MatchCardBasicClubOnly` component from `results` layout. The weekend results version has received updates that need to be reflected in the single result version for consistency.

## What We Need to Do

Synchronize the single result club-only match card component with the weekend results club-only version, ensuring consistent component usage, conditional rendering logic, props structure, and styling patterns.

## Phases & Tasks

### Phase 0: Component Inventory & Verification ✅

#### Tasks

- [x] Verify `ScoreOverNameWithLogo` does NOT exist in `resultSingle/layout/Sections/TeamsSection/`
- [x] Verify `ResultStatementShort` does NOT exist in `resultSingle/layout/Sections/`
- [x] Verify `PlayerStatsClubOnlyBasic` does NOT exist in `resultSingle/layout/Sections/PlayerStats/`
- [x] Check existing `TeamsSection` type definitions and utilities
- [x] Check existing `PlayerStats` type definitions and utilities
- [x] Document what needs to be replicated vs what can be reused

#### Findings

**Components Missing (Need to Replicate):**

1. ✅ `ScoreOverNameWithLogo` - Does NOT exist (only `LogoWithScoreOverName` exists with different props)
2. ✅ `ResultStatementShort` - Does NOT exist (no ResultStatement folder exists)
3. ✅ `PlayerStatsClubOnlyBasic` - Does NOT exist (only generic `PlayerStats` exists)

**Components Existing (Can Reuse):**

- ✅ `MatchStatus` - Exists in `resultSingle/layout/Sections/MatchStatus/`
- ✅ `MatchHeader` - Exists in `resultSingle/layout/Sections/MatchHeader/`
- ✅ `LogoWithScoreOverName` - Exists but uses different props (`height` vs `outerContainer`)

**Types Missing (Need to Create/Update):**

1. ✅ `TeamsSectionProps` - Exists but missing `outerContainer` prop (currently has `height: number`)
2. ✅ `ResultStatementShortProps` - Does NOT exist (need to create)
3. ✅ `PlayerStatsClubOnlyProps` - Does NOT exist (need to create)

**Utilities Missing (Need to Create):**

1. ✅ `TeamsSection/_utils/helpers.ts` - Does NOT exist (helpers are inline in `LogoWithScoreOverName.tsx`)
   - Need to extract: `truncateText`, `normalizeScore`, `getFirstInningsDisplay`
2. ✅ `PlayerStats/_utils/helpers.ts` - Does NOT exist (`truncateText` is inline in `PlayerStats/index.tsx`)
3. ✅ `PlayerStats/_utils/visibility.ts` - Does NOT exist (need `computePartialTwoDayVisibility`)
4. ✅ `MatchCard/_utils/calculations.ts` - Does NOT exist (need `getClubTeamPlayers`, `calculateSectionHeights`, `calculateDelays`)

**What Can Be Reused:**

- ✅ `truncateText` helper logic exists inline in both `LogoWithScoreOverName` and `PlayerStats` (can extract)
- ✅ `normalizeScore` and `getFirstInningsDisplay` exist inline in `LogoWithScoreOverName` (can extract)
- ✅ Basic `PlayerStats` structure exists (can adapt for club-only variant)

### Phase 1: Replicate Missing Components in resultSingle ✅

#### Tasks

- [x] Create `ResultStatement` folder structure in `resultSingle/layout/Sections/`
- [x] Replicate `ResultStatementShort.tsx` component from results layout to resultSingle
- [x] Create `ResultStatement/_types/ResultStatementProps.ts` with `ResultStatementShortProps` interface
- [x] Create `ResultStatement/index.tsx` export file
- [x] Replicate `ScoreOverNameWithLogo.tsx` component in `resultSingle/layout/Sections/TeamsSection/`
- [x] Update `TeamsSection/_types/type.ts` or create `_types/TeamsSectionProps.ts` with `outerContainer` support
- [x] Replicate `TeamsSection/_utils/helpers.ts` with `truncateText`, `normalizeScore`, `getFirstInningsDisplay` utilities
- [x] Update `TeamsSection/index.tsx` to export `ScoreOverNameWithLogo`
- [x] Create `PlayerStats-clubOnly-Basic.tsx` component in `resultSingle/layout/Sections/PlayerStats/`
- [x] Create `PlayerStats/_types/PlayerStatsProps.ts` with `PlayerStatsClubOnlyProps` interface
- [x] Replicate `PlayerStats/_utils/visibility.ts` with `computePartialTwoDayVisibility` utility
- [x] Replicate `PlayerStats/_utils/helpers.ts` with `truncateText` helper (if not already exists)
- [x] Update `PlayerStats/index.tsx` to export `PlayerStatsClubOnlyBasic`
- [x] Create `MatchCard/_utils/calculations.ts` with `getClubTeamPlayers`, `calculateSectionHeights`, `calculateDelays` utilities

### Phase 2: Component Structure & Wrapper Updates ✅

#### Tasks

- [x] Remove `AnimatedContainer` wrapper (replace with simple `div` like weekend results version)
- [x] Remove `useAnimationContext` hook usage (not needed without AnimatedContainer wrapper)
- [x] Update container className to match weekend results: `"rounded-lg w-auto mx-8 overflow-hidden h-full"`
- [x] Remove debug text: `"CLUB ONLY TEMPLATE"`

### Phase 3: Section Order & Conditional Rendering ✅

#### Tasks

- [x] Reorder sections to match weekend results: Teams → MatchStatus/ResultStatementShort → Stats → Header
- [x] Update `MatchStatus` to conditional rendering: only show when `match.status === "Abandoned"`
- [x] Add conditional rendering for `ResultStatementShort`: show when `match.resultShort` exists
- [x] Ensure proper delay sequencing matches weekend results pattern

### Phase 4: Component Props & Configuration ✅

#### Tasks

- [x] Update `ScoreOverNameWithLogo` props to use `outerContainer` prop structure (with height)
- [x] Update `MatchStatus` props to use `outerContainer` prop structure (with background and height)
- [x] Update `ResultStatementShort` props to use `outerContainer` prop structure (with height)
- [x] Update `PlayerStatsClubOnlyBasic` props: change from `homeTeam/awayTeam` to `match` prop
- [x] Update `MatchHeader` props: add `backgroundColor="transparent"` and `CopyVariant="onContainerCopyNoBg"`
- [x] Add `useThemeContext` hook and extract `selectedPalette` for MatchStatus background

### Phase 5: Create MatchCard Utilities & Height/Delay Calculations ✅

#### Tasks

- [x] Create `MatchCard/_utils/` folder structure in resultSingle
- [x] Replicate `MatchCard/_utils/calculations.ts` with `getClubTeamPlayers` utility function
- [x] Create adapted `calculateSectionHeights` function for single result context (using same percentages: 40% teams, 50% stats, 10% header)
- [x] Create adapted `calculateDelays` function for single result context (same pattern: baseDelay, statsDelay = baseDelay + 4, headerDelay = statsDelay + 5)
- [x] Replace hardcoded heights with calculated values based on available height
- [x] Replace hardcoded delays with calculated delays using utility functions
- [x] Ensure height calculations account for single result having more available space (using `heights.asset` as rowHeight)

### Phase 6: Props Interface Updates ✅

#### Tasks

- [x] Review and update `MatchCardProps` interface if needed
- [x] Ensure props interface matches the expected structure from parent component
- [x] Verify props are compatible with `ResultSingleDisplay` component usage

#### Findings

- ✅ `MatchCardProps` interface is correct: `{ match: MatchResult }`
- ✅ Props interface matches parent component (`ResultSingleDisplay` passes only `match`)
- ✅ All MatchCard components in resultSingle use the same props interface consistently
- ✅ Component correctly uses props and gets height/delay from context internally (unlike results which receives them as props)
- ✅ No changes needed - interface is compatible and correctly structured for resultSingle context

### Phase 7: Testing & Validation

#### Tasks

- [ ] Verify component renders correctly with club-only data
- [ ] Test conditional rendering of MatchStatus (Abandoned matches)
- [ ] Test conditional rendering of ResultStatementShort (when resultShort exists)
- [ ] Verify all sections display with correct heights and spacing
- [ ] Confirm animation delays work correctly
- [ ] Validate component works with `isAccountClub` flag in parent display component

## Constraints, Risks, Assumptions

- **Constraints**:

  - Must maintain compatibility with `ResultSingleDisplay` component
  - Single result context has different height constraints than weekend results (full asset height available)
  - **Cannot import components from other asset types** - must replicate/duplicate components in resultSingle directory
  - Each asset type (results vs resultSingle) must be self-contained

- **Risks**:

  - Component replication may introduce drift between results and resultSingle versions over time
  - Height calculations may need different approach for single result vs weekend results
  - Potential breaking changes if props interfaces differ significantly
  - Need to ensure all dependencies (types, utilities) are also replicated

- **Assumptions**:
  - Components should be duplicated from results layout to resultSingle layout (not imported)
  - Single result version should follow same visual pattern but with more available space
  - Calculation utilities can be adapted or reused with appropriate modifications
  - All necessary types and utility functions must be replicated alongside components

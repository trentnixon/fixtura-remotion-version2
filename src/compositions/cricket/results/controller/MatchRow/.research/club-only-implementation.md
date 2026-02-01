# Club-Only Option Implementation Research

## Overview

This document explains how the "club-only" option was implemented in the results composition, specifically focusing on the `MatchRow` component adaptation. This pattern mirrors the implementation already present in the `resultSingle` composition.

---

## Why This Was Implemented

The club-only option allows the video generation system to focus on displaying statistics for the account's club team only, rather than showing both teams. This is useful when:

1. **Account-focused content**: The video is specifically for a club's account, and they want to highlight their team's performance
2. **Space optimization**: In constrained layouts (like results rows), showing only one team's stats provides more space per player
3. **User preference**: Some accounts prefer to see only their club's performance metrics

---

## How It Works

### 1. Context Flag: `isAccountClub`

The system uses a boolean flag `isAccountClub` from `VideoDataContext` to determine whether to show club-only content:

**Location**: `src/core/context/VideoDataContext.tsx`

```typescript
isAccountClub: !!data.videoMeta?.club?.IsAccountClub
```

This flag is set based on the video metadata, specifically checking if the club associated with the video is marked as the account club.

### 2. Conditional Rendering Pattern

The implementation follows a consistent pattern across both `resultSingle` and `results` compositions:

```typescript
const { isAccountClub } = useVideoDataContext();

return (
  <>
    {isAccountClub ? (
      <ClubOnlyComponent match={match} />
    ) : (
      <StandardComponent match={match} />
    )}
  </>
);
```

**Key Points**:
- The decision is made at the **controller/display level** (not deep in the component tree)
- Both component variants receive the same props structure
- The conditional logic is simple and explicit

---

## Components Required

### For Results Composition (`results/`)

#### 1. MatchRow Component (`row-Basic.tsx`)

**Location**: `src/compositions/cricket/results/controller/MatchRow/row-Basic.tsx`

**Changes**:
- Import both `MatchCardBasic` and `MatchCardBasicClubOnly`
- Use `isAccountClub` from `VideoDataContext` to conditionally render
- Pass the same props (`match`, `index`, `rowHeight`, `delay`) to both variants

**Pattern**:
```typescript
const { isAccountClub } = useVideoDataContext();

return (
  <AnimatedContainer>
    {isAccountClub ? (
      <MatchCardBasicClubOnly
        match={match}
        index={index}
        rowHeight={rowHeight}
        delay={delay}
      />
    ) : (
      <MatchCardBasic
        match={match}
        index={index}
        rowHeight={rowHeight}
        delay={delay}
      />
    )}
  </AnimatedContainer>
);
```

#### 2. MatchCard Component (`card-Basic-clubOnly.tsx`)

**Location**: `src/compositions/cricket/results/layout/MatchCard/card-Basic-clubOnly.tsx`

**Key Differences from Standard Card**:
- Uses `PlayerStatsClubOnlyBasic` instead of `PlayerStatsBasic`
- Same structure otherwise (MatchHeader, ScoreOverNameWithLogo, ResultStatementShort, etc.)
- Same height calculations and delay logic

#### 3. PlayerStats Component (`PlayerStats-clubOnly-Basic.tsx`)

**Location**: `src/compositions/cricket/results/layout/Sections/PlayerStats/PlayerStats-clubOnly-Basic.tsx`

**Key Logic**:
1. **Extract club team players**: Uses `getClubTeamPlayers(match)` utility
2. **Identify club team**: Determines which team (`homeTeam` or `awayTeam`) has `isClubTeam: true`
3. **Filter players**: Creates a new team object with only club team's batting and bowling performances
4. **Single team display**: Shows only the club team's stats (batting and bowling side-by-side)
5. **Visibility calculation**: Uses `computePartialTwoDayVisibility` with only club team's batting status

**Differences from Standard PlayerStats**:
- **Standard**: Shows both teams side-by-side (home | away) with border separator
- **Club-Only**: Shows only club team centered, with batting and bowling stats side-by-side
- **Layout**: Standard uses `flex-row` with border, Club-Only uses `flex-row` centered without border
- **Max players**: Club-only typically shows more players per stat (3 vs 2) since there's more space

---

## Utility Functions Required

### `getClubTeamPlayers(match: MatchResult)`

**Location**: `src/compositions/cricket/results/layout/MatchCard/_utils/calculations.ts`

**Purpose**: Extracts only the club team's player performances from a match

**Logic**:
1. Checks `match.homeTeam.isClubTeam` first
2. Falls back to `match.awayTeam.isClubTeam`
3. Returns `null` if no club team found
4. Returns object with `battingPerformances` and `bowlingPerformances` arrays

**Returns**:
```typescript
{
  battingPerformances: BattingPerformance[];
  bowlingPerformances: BowlingPerformance[];
} | null
```

**Usage in Club-Only Components**:
```typescript
const clubTeamPlayers = getClubTeamPlayers(match);
const clubTeam = match.homeTeam.isClubTeam
  ? match.homeTeam
  : match.awayTeam.isClubTeam
    ? match.awayTeam
    : null;

if (!clubTeamPlayers || !clubTeam) {
  return null; // Don't render if no club team found
}
```

---

## Data Structure Requirements

### Match Object Must Have:

1. **Team identification**:
   - `match.homeTeam.isClubTeam: boolean`
   - `match.awayTeam.isClubTeam: boolean`

2. **Player performances**:
   - `match.homeTeam.battingPerformances: BattingPerformance[]`
   - `match.homeTeam.bowlingPerformances: BowlingPerformance[]`
   - `match.awayTeam.battingPerformances: BattingPerformance[]`
   - `match.awayTeam.bowlingPerformances: BowlingPerformance[]`

### Video Metadata Must Have:

1. **Club information**:
   - `data.videoMeta.club.IsAccountClub: boolean`

---

## Comparison: resultSingle vs results

### Similarities

Both compositions follow the same pattern:

1. **Controller level conditional**: Both check `isAccountClub` at the display/controller component
2. **Separate card components**: Both have `card-Basic` and `card-Basic-ClubOnly` variants
3. **Separate player stats**: Both have `PlayerStats-Basic` and `PlayerStats-clubOnly-Basic` variants
4. **Same utility**: Both use `getClubTeamPlayers` from their respective `MatchCard/_utils/calculations.ts`

### Differences

| Aspect | resultSingle | results |
|--------|-------------|---------|
| **Card component location** | `resultSingle/layout/MatchCard/` | `results/layout/MatchCard/` |
| **Player stats location** | `resultSingle/layout/Sections/PlayerStats/` | `results/layout/Sections/PlayerStats/` |
| **Max players per stat** | 5 (more space available) | 3 (less space in rows) |
| **Layout differences** | Full asset height available | Constrained row height |
| **Result statement** | Uses `ResultStatementText` (full) | Uses `ResultStatementShort` |

---

## Implementation Checklist

When adding club-only support to a new row variant or composition:

### Required Files

- [ ] **MatchCard variant**: `card-[Variant]-clubOnly.tsx`
  - Copy from standard card
  - Replace `PlayerStats[Variant]` with `PlayerStats[Variant]ClubOnly`
  - Keep all other sections identical

- [ ] **PlayerStats variant**: `PlayerStats-[Variant]-clubOnly.tsx`
  - Copy from standard PlayerStats
  - Import `getClubTeamPlayers` utility
  - Filter to club team only
  - Adjust layout (centered, no border)
  - Use `computePartialTwoDayVisibility` with club team only

- [ ] **Utility function**: Ensure `getClubTeamPlayers` exists in `MatchCard/_utils/calculations.ts`
  - If not, copy from existing implementation

- [ ] **Controller update**: Update row/display component
  - Import both card variants
  - Add `isAccountClub` check from `VideoDataContext`
  - Conditionally render appropriate card

- [ ] **Template theme update**: Update template theme configuration
  - Ensure theme includes appropriate color palette for result styles
  - Verify `selectedPalette.container.backgroundTransparent.strong` is defined
  - Verify `selectedPalette.container.secondary` is defined (if using borders)
  - Check that theme supports club-only layout styling requirements

### Required Logic

- [ ] **Club team detection**: Check `isClubTeam` flag on teams
- [ ] **Player filtering**: Use `getClubTeamPlayers` to extract club team players
- [ ] **Null handling**: Return `null` if no club team found
- [ ] **Visibility calculation**: Adjust for single team context
- [ ] **Layout adjustment**: Center single team, remove team separator

---

## Key Design Decisions

### 1. Why Separate Components?

**Decision**: Create separate `-clubOnly` variants rather than conditional logic inside components.

**Rationale**:
- **Clarity**: Each component has a single, clear responsibility
- **Maintainability**: Changes to club-only logic don't affect standard components
- **Reusability**: Club-only components can be used independently
- **Type safety**: Props can be more specific to each variant

### 2. Why Controller-Level Conditional?

**Decision**: Check `isAccountClub` at the controller/display level, not deep in the tree.

**Rationale**:
- **Performance**: Avoids unnecessary rendering of unused components
- **Simplicity**: Single decision point, clear data flow
- **Consistency**: Matches pattern used in `resultSingle`

### 3. Why Utility Function?

**Decision**: Extract `getClubTeamPlayers` as a shared utility.

**Rationale**:
- **DRY**: Used in multiple places (PlayerStats components)
- **Testability**: Can be unit tested independently
- **Consistency**: Same logic across all club-only components

### 4. Why Null Return?

**Decision**: Return `null` if no club team found in match.

**Rationale**:
- **Defensive**: Handles edge cases gracefully
- **User experience**: Prevents broken UI if data is incomplete
- **Safety**: Avoids runtime errors from undefined team references

---

## Testing Considerations

When testing club-only implementations:

1. **Data scenarios**:
   - Match with club team as home team
   - Match with club team as away team
   - Match with no club team (should return null)
   - Match with both teams as club (edge case)

2. **Context scenarios**:
   - `isAccountClub: true` → should render club-only variant
   - `isAccountClub: false` → should render standard variant

3. **Visual verification**:
   - Club-only should show single team centered
   - Standard should show both teams side-by-side
   - Player counts should match expected (3 for results, 5 for resultSingle)

---

## Related Files Reference

### Results Composition
- Controller: `results/controller/MatchRow/row-Basic.tsx`
- Card: `results/layout/MatchCard/card-Basic-clubOnly.tsx`
- PlayerStats: `results/layout/Sections/PlayerStats/PlayerStats-clubOnly-Basic.tsx`
- Utils: `results/layout/MatchCard/_utils/calculations.ts`

### ResultSingle Composition (Reference)
- Controller: `resultSingle/controller/ResultSingleDisplay/display.tsx`
- Card: `resultSingle/layout/MatchCard/card-Basic-ClubOnly.tsx`
- PlayerStats: `resultSingle/layout/Sections/PlayerStats/PlayerStats-clubOnly-Basic.tsx`
- Utils: `resultSingle/layout/MatchCard/_utils/calculations.ts`

### Core Context
- `src/core/context/VideoDataContext.tsx` - Provides `isAccountClub` flag

### Template Themes
- `src/templates/variants/[variant]/theme.ts` - Theme configuration files
  - Must include color palette definitions for result styles
  - Required palette properties:
    - `container.backgroundTransparent.strong` - Background for stat sections
    - `container.secondary` - Secondary color (for borders if used)
    - `container.primary` - Primary color (for borders if used)

---

## Summary

The club-only option implementation follows a consistent, maintainable pattern:

1. **Context-driven**: Uses `isAccountClub` flag from `VideoDataContext`
2. **Component separation**: Separate variants for clarity and maintainability
3. **Utility-based**: Shared `getClubTeamPlayers` function for consistency
4. **Controller-level decision**: Conditional rendering at display/controller level
5. **Defensive coding**: Null handling for edge cases
6. **Theme configuration**: Template theme updates required for proper styling

This pattern ensures consistency across compositions while maintaining clear separation of concerns and easy maintainability.

### Important Note on Theme Updates

When implementing club-only support for a new template variant, **template theme updates are also required**. The theme configuration must include the necessary color palette properties for result styles, particularly:
- Background colors for stat sections
- Border colors (if borders are used)
- Text colors for player names and scores

Without proper theme configuration, the club-only components may not display correctly or may use fallback/default styling.

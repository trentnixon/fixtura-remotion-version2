# Cleanup Summary – `src/compositions/cricket/TeamOfTheWeek/controller/PlayerRow`

This document describes the refactoring changes made to extract shared types, components, and utilities from player row component files in the `src/compositions/cricket/TeamOfTheWeek/controller/PlayerRow` folder.

---

## 📁 Folder Structure Created

The following folders were created to support the modularization pattern:

- `_types/` - Contains TypeScript interface and type definitions
- `_utils/` - Contains utility functions, constants, and shared components
- `.docs/` - Contains this documentation file

**Note:** If `_types` or `_utils` folders don't exist in this directory, they should be created to maintain consistency with the modularization pattern.

---

## 🔄 Changes Made

### 1. Type Extraction

#### Created `_types/PlayerRowPropsWithDelay.ts`
- **Extracted from:** `row-CNSW.tsx`, `row-CNSW-private.tsx`
- **Content:** `PlayerRowPropsWithDelay` interface
- **Purpose:** Centralizes props type definition for player row variants that require an explicit `delay` prop (CNSW variants calculate delay externally)
- **Note:** Standard `PlayerRowProps` (without delay) remains in `../../types.ts` as it's used by most variants

#### Created `_types/StatDisplayProps.ts`
- **Content:** Type definitions for stat display component props
  - `BattingStatDisplayProps`
  - `BowlingStatDisplayProps`
  - `StatItemProps`
- **Purpose:** Centralizes prop type definitions for shared stat display components

### 2. Constants Extraction

#### Created `_utils/constants.ts`
- **Extracted constants:**
  - `DEFAULT_ICON_PACK = "icon1"` - Default icon pack configuration for player row variants
  - `STAT_DISPLAY_DELAY_OFFSET = 20` - Animation delay offset for stat displays
  - `BOWLING_STAT_DELAY_OFFSET = 30` - Animation delay offset for bowling stats (when shown with batting)
  - `STAT_SUFFIX_DELAY_OFFSET = 10` - Animation delay offset for stat suffix displays
  - `PLAYER_NAME_DELAY_OFFSET = 2` - Animation delay offset for player name displays

### 3. Utility Functions Extraction

#### Created `_utils/helpers.ts`
- **Extracted functions:**
  - `isAllRounderPosition(position)` - Checks if player position is an all-rounder position (topallrounder or bestoftherest)
  - `hasBothStats(player)` - Checks if player has both batting and bowling stats

### 4. Shared Components Extraction

#### Created `_utils/components.tsx`
- **Extracted components:**
  - `BattingStatDisplay` - Component to display formatted batting stats (runs with not-out indicator and balls faced)
  - `BowlingStatDisplay` - Component to display formatted bowling stats (wickets/runs and overs)
  - `StatItem` - Helper component for stat items (used for all-rounder score)
- **Purpose:** Centralizes stat display logic that was duplicated across multiple row variants
- **Note:** `row-SixersThunder.tsx` keeps its own `BattingStatDisplay` variant because it uses `TeamOfTheWeekStat` instead of `MetadataSmall` for batting stats

### 5. Component File Updates

#### Modified `row-Basic.tsx`
- **Removed:** Inline `BattingStatDisplay`, `BowlingStatDisplay`, and `StatItem` component definitions
- **Removed:** Hardcoded `ICON_PACK` constant and inline `isAllRounderPosition`/`hasBothStats` logic
- **Removed:** Hardcoded delay offsets (`delay + 20`, `delay + 30`, `delay + 2`)
- **Added:** Imports for shared components, constants, and helper functions
- **Updated:** All stat display calls to use shared components with constants for delay offsets

#### Modified `row-Classic.tsx`
- **Removed:** Inline `BattingStatDisplay`, `BowlingStatDisplay`, and `StatItem` component definitions
- **Removed:** Hardcoded `ICON_PACK` constant and inline `isAllRounderPosition`/`hasBothStats` logic
- **Removed:** Hardcoded delay offsets
- **Added:** Imports for shared components, constants, and helper functions
- **Updated:** All stat display calls to use shared components with constants for delay offsets

#### Modified `row-BrickWork.tsx`
- **Removed:** Inline `BattingStatDisplay`, `BowlingStatDisplay`, and `StatItem` component definitions
- **Removed:** Hardcoded `ICON_PACK` constant and inline `isAllRounderPosition`/`hasBothStats` logic
- **Removed:** Hardcoded delay offsets
- **Added:** Imports for shared components, constants, and helper functions
- **Updated:** All stat display calls to use shared components with constants for delay offsets

#### Modified `row-ClassicTwoColumn.tsx`
- **Removed:** Inline `BattingStatDisplay`, `BowlingStatDisplay`, and `StatItem` component definitions
- **Removed:** Hardcoded `ICON_PACK` constant and inline `isAllRounderPosition`/`hasBothStats` logic
- **Removed:** Hardcoded delay offsets
- **Added:** Imports for shared components, constants, and helper functions
- **Updated:** All stat display calls to use shared components with constants for delay offsets

#### Modified `row-SixersThunder.tsx`
- **Removed:** Inline `BowlingStatDisplay` component definition (kept `BattingStatDisplay` as variant)
- **Removed:** Hardcoded `ICON_PACK` constant and inline `isAllRounderPosition`/`hasBothStats` logic
- **Removed:** Hardcoded delay offsets
- **Added:** Imports for shared `BowlingStatDisplay`, constants, and helper functions
- **Updated:** Bowling stat display to use shared component; batting stat display uses local variant with constants
- **Note:** Kept local `BattingStatDisplay` because it uses `TeamOfTheWeekStat` instead of `MetadataSmall`

#### Modified `row-CNSW.tsx`
- **Removed:** Inline `PlayerRowProps` interface definition
- **Added:** Import of `PlayerRowPropsWithDelay` from `./_types/PlayerRowPropsWithDelay`
- **Updated:** Component to use `PlayerRowPropsWithDelay` type

#### Modified `row-CNSW-private.tsx`
- **Removed:** Inline `PlayerRowProps` interface definition
- **Removed:** Unused `TeamOfTheWeekPlayer` import
- **Added:** Import of `PlayerRowPropsWithDelay` from `./_types/PlayerRowPropsWithDelay`
- **Updated:** Component to use `PlayerRowPropsWithDelay` type

---

## ✅ Benefits

1. **Code Reusability:** Stat display components are now shared across multiple variants, reducing duplication
2. **Maintainability:** Changes to stat display logic only need to be made in one place
3. **Consistency:** Animation delay offsets are centralized, ensuring consistent timing across variants
4. **Type Safety:** Centralized type definitions improve type checking and IDE support
5. **Readability:** Component files are cleaner and focus on layout/styling rather than duplicated logic
6. **Testability:** Utility functions and components can be tested independently

---

## 📝 Notes

- The `row-SixersThunder.tsx` variant maintains its own `BattingStatDisplay` component because it uses `TeamOfTheWeekStat` instead of `MetadataSmall` for batting stats, which is a design choice specific to that variant
- Standard `PlayerRowProps` (without delay) remains in `../../types.ts` as it's used by most variants and is part of the broader TeamOfTheWeek types
- All imports were updated to use relative paths correctly
- No breaking changes were introduced - all functionality remains the same

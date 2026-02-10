# Cleanup Summary – `src/compositions/cricket/TeamOfTheWeek/controller/TeamOfTheWeekDisplay`

This document describes the refactoring changes made to extract shared types and utilities from display component files in the `src/compositions/cricket/TeamOfTheWeek/controller/TeamOfTheWeekDisplay` folder.

---

## 📁 Folder Structure Created

The following folders were created to support the modularization pattern:

- `_types/` - Contains TypeScript interface and type definitions
- `_utils/` - Contains utility functions and constants
- `.docs/` - Contains this documentation file

**Note:** If `_types` or `_utils` folders don't exist in this directory, they should be created to maintain consistency with the modularization pattern.

---

## 🔄 Changes Made

### 1. Type Extraction

#### Created `_types/TeamOfTheWeekDisplayProps.ts`
- **Extracted from:** All display component files (`display-*.tsx`)
- **Content:** `TeamOfTheWeekDisplayProps` interface
- **Purpose:** Centralizes props type definition for all TeamOfTheWeekDisplay components
- **Features:** Includes optional `title` prop for CNSW variants
- **Dependencies:** 
  - `TeamOfTheWeekPlayer` from `../../../types`
  - `Sponsor` from `../../../../../../core/types/data/sponsors`

### 2. Constants Extraction

#### Created `_utils/constants.ts`
- **Extracted constants:** Default row heights for each display variant
  - `DEFAULT_ROW_HEIGHT_BASIC = 110`
  - `DEFAULT_ROW_HEIGHT_CLASSIC = 110`
  - `DEFAULT_ROW_HEIGHT_BRICKWORK = 130`
  - `DEFAULT_ROW_HEIGHT_CLASSIC_TWO_COLUMN = 85`
  - `DEFAULT_ROW_HEIGHT_SIXERS_THUNDER = 80`
  - `DEFAULT_ROW_HEIGHT_CNSW = 70`
  - `DEFAULT_ROW_HEIGHT_CNSW_PRIVATE = 70`
- **Purpose:** Centralizes row height values that were hardcoded in each component file

### 3. Utility Functions Extraction

#### Created `_utils/calculations.ts`
- **Extracted function:**
  - `calculatePlayerDelay(index)` - Calculates animation delay for player rows based on index
- **Purpose:** Centralizes delay calculation logic used by CNSW variants
- **Dependencies:** `PLAYER_STAGGER_DELAY` from `../../../types`

### 4. Component File Updates

#### Modified `display-Basic.tsx`
- **Removed:** Inline `TeamOfTheWeekDisplayProps` interface definition
- **Removed:** Unused imports (`TeamOfTheWeekPlayer`, `Sponsor`)
- **Removed:** Hardcoded `rowHeight={110}`
- **Added:** Imports for `TeamOfTheWeekDisplayProps` and `DEFAULT_ROW_HEIGHT_BASIC`
- **Updated:** `rowHeight` prop to use `DEFAULT_ROW_HEIGHT_BASIC` constant

#### Modified `display-Classic.tsx`
- **Removed:** Inline `TeamOfTheWeekDisplayProps` interface definition
- **Removed:** Unused imports (`TeamOfTheWeekPlayer`, `Sponsor`)
- **Removed:** Hardcoded `rowHeight={110}`
- **Added:** Imports for `TeamOfTheWeekDisplayProps` and `DEFAULT_ROW_HEIGHT_CLASSIC`
- **Updated:** `rowHeight` prop to use `DEFAULT_ROW_HEIGHT_CLASSIC` constant

#### Modified `display-BrickWork.tsx`
- **Removed:** Inline `TeamOfTheWeekDisplayProps` interface definition
- **Removed:** Unused imports (`TeamOfTheWeekPlayer`, `Sponsor`)
- **Removed:** Hardcoded `rowHeight={130}`
- **Added:** Imports for `TeamOfTheWeekDisplayProps` and `DEFAULT_ROW_HEIGHT_BRICKWORK`
- **Updated:** `rowHeight` prop to use `DEFAULT_ROW_HEIGHT_BRICKWORK` constant

#### Modified `display-ClassicTwoColumn.tsx`
- **Removed:** Inline `TeamOfTheWeekDisplayProps` interface definition
- **Removed:** Unused imports (`TeamOfTheWeekPlayer`, `Sponsor`)
- **Removed:** Local `rowHeight` variable declaration (`const rowHeight = 85`)
- **Added:** Imports for `TeamOfTheWeekDisplayProps` and `DEFAULT_ROW_HEIGHT_CLASSIC_TWO_COLUMN`
- **Updated:** Simplified map function to use `DEFAULT_ROW_HEIGHT_CLASSIC_TWO_COLUMN` constant directly

#### Modified `display-SixersThunder.tsx`
- **Removed:** Inline `TeamOfTheWeekDisplayProps` interface definition
- **Removed:** Unused imports (`TeamOfTheWeekPlayer`, `Sponsor`)
- **Removed:** Hardcoded `rowHeight={80}`
- **Added:** Imports for `TeamOfTheWeekDisplayProps` and `DEFAULT_ROW_HEIGHT_SIXERS_THUNDER`
- **Updated:** `rowHeight` prop to use `DEFAULT_ROW_HEIGHT_SIXERS_THUNDER` constant

#### Modified `display-CNSW.tsx`
- **Removed:** Inline `TeamOfTheWeekDisplayProps` interface definition
- **Removed:** Unused imports (`TeamOfTheWeekPlayer`, `Sponsor`, `PLAYER_STAGGER_DELAY`)
- **Removed:** Hardcoded `rowHeight={70}` and `delay={index * PLAYER_STAGGER_DELAY}`
- **Added:** Imports for `TeamOfTheWeekDisplayProps`, `DEFAULT_ROW_HEIGHT_CNSW`, and `calculatePlayerDelay`
- **Updated:** `rowHeight` prop to use `DEFAULT_ROW_HEIGHT_CNSW` constant
- **Updated:** `delay` prop to use `calculatePlayerDelay(index)` function

#### Modified `display-CNSW-private.tsx`
- **Removed:** Inline `TeamOfTheWeekDisplayProps` interface definition
- **Removed:** Unused imports (`TeamOfTheWeekPlayer`, `Sponsor`, `PLAYER_STAGGER_DELAY`)
- **Removed:** Hardcoded `rowHeight={70}` and `delay={index * PLAYER_STAGGER_DELAY}`
- **Added:** Imports for `TeamOfTheWeekDisplayProps`, `DEFAULT_ROW_HEIGHT_CNSW_PRIVATE`, and `calculatePlayerDelay`
- **Updated:** `rowHeight` prop to use `DEFAULT_ROW_HEIGHT_CNSW_PRIVATE` constant
- **Updated:** `delay` prop to use `calculatePlayerDelay(index)` function

---

## ✅ Benefits

1. **Type Reusability:** Interface definition can now be imported and reused across multiple files
2. **Maintainability:** Row height values are centralized, making updates easier
3. **Consistency:** Delay calculations follow a consistent pattern with clear naming
4. **Readability:** Component files are cleaner and focus on layout logic rather than type definitions and hardcoded values
5. **Testability:** Utility functions can be tested independently
6. **Reduced Duplication:** Eliminated duplicate interface definitions across 7 files

---

## 📝 Notes

- The `title` prop in `TeamOfTheWeekDisplayProps` is optional and only used by CNSW variants (currently commented out in the code)
- All row height constants are exported individually to allow per-variant customization if needed
- The `calculatePlayerDelay` function encapsulates the delay calculation logic used by CNSW variants
- All imports were updated to use relative paths correctly
- No breaking changes were introduced - all functionality remains the same

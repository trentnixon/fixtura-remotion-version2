# Cleanup Summary – `src/compositions/cricket/top5/layout`

This document describes the refactoring changes made to extract shared types, utilities, and constants from PlayerRow layout component files.

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

#### Created `_types/PlayerRowLayoutProps.ts`
- **Extracted interfaces:**
  - `PlayerRowLayoutProps` - Base props interface for PlayerRow layout components
    - `player: PlayerData`
    - `index: number`
    - `rowHeight: number`
    - `delay: number`
  - `PlayerRowLayoutPropsWithRestrictions` - Extended props interface for components that require restrictions
    - Extends `PlayerRowLayoutProps`
    - Adds `restrictions: { nameLength: number; teamLength: number }`
- **Purpose:** Centralizes the props interfaces that were duplicated across all 6 component files
- **Dependencies:** `PlayerData` from `../../types`

### 2. Constants Extraction

#### Created `_utils/constants.ts`
- **Extracted constants:**
  - `DEFAULT_LOGO_SIZE = 24` - Default logo size for player rows
  - `SMALL_LOGO_SIZE = 20` - Small logo size for player rows (used in grid layouts)
  - `DEFAULT_NAME_LENGTH = 20` - Default maximum length for player name truncation
  - `DEFAULT_TEAM_LENGTH = 35` - Default maximum length for team name truncation
  - `PLAYER_NAME_DELAY_OFFSET = 2` - Animation delay offset for player name
  - `TEAM_NAME_DELAY_OFFSET = 4` - Animation delay offset for team name
  - `MAIN_SCORE_DELAY_OFFSET = 6` - Animation delay offset for main score value
  - `SCORE_SUFFIX_DELAY_OFFSET = 7` - Animation delay offset for score suffix
  - `LOGO_DELAY_OFFSET = 20` - Animation delay offset for logo
  - `STAT_DELAY_OFFSET = 20` - Animation delay offset for stat display
  - `STAT_SUFFIX_DELAY_OFFSET = 30` - Animation delay offset for stat suffix
- **Purpose:** Centralizes hardcoded values that were duplicated across component files

### 3. Utility Functions Extraction

#### Created `_utils/helpers.ts`
- **Extracted functions:**
  - `truncateText(text, maxLength)` - Truncates text to a maximum length, adding ellipsis if truncated
- **Purpose:** Centralizes text truncation logic that was duplicated across all component files

#### Created `_utils/scoreHelpers.ts`
- **Extracted functions:**
  - `getScoreValues(player)` - Gets the appropriate score display values based on player type (batter or bowler)
    - Returns `{ mainValue: string, suffix: string }`
    - Handles batter logic: runs with not-out indicator, balls faced
    - Handles bowler logic: wickets/runs, overs
- **Extracted types:**
  - `ScoreValues` - Interface for score display values
- **Purpose:** Centralizes score calculation logic that was duplicated across all component files
- **Dependencies:** 
  - `PlayerData`, `isBatter`, `isBowler` from `../../types`

### 4. Component File Updates

#### Modified `StandardPlayerRow.tsx`
- **Removed:** Inline `PlayerRowLayoutProps` interface definition
- **Removed:** Unused imports (`PlayerData`, `isBatter`, `isBowler`)
- **Removed:** Inline `truncateText` function
- **Removed:** Inline `getScoreValues` function
- **Removed:** Hardcoded logo size (`24`)
- **Removed:** Hardcoded animation delay offsets (`delay + 2`, `delay + 4`, `delay + 6`, `delay + 7`)
- **Added:** Import for `PlayerRowLayoutPropsWithRestrictions` from `./_types/PlayerRowLayoutProps`
- **Added:** Imports for `truncateText`, `getScoreValues`, and constants
- **Updated:** Component props type to use `PlayerRowLayoutPropsWithRestrictions`
- **Updated:** Logo size to use `DEFAULT_LOGO_SIZE`
- **Updated:** All animation delays to use constants
- **Updated:** Score calculation to use `getScoreValues(player)`

#### Modified `PlayerRowNameLogoWrapperValue.tsx`
- **Removed:** Inline `PlayerRowLayoutProps` interface definition
- **Removed:** Unused imports (`PlayerData`, `isBatter`, `isBowler`)
- **Removed:** Inline `truncateText` function
- **Removed:** Inline `getScoreValues` function
- **Removed:** Hardcoded logo size (`20`)
- **Removed:** Hardcoded animation delay offsets
- **Added:** Imports for shared types, utilities, and constants
- **Updated:** Component props type to use `PlayerRowLayoutPropsWithRestrictions`
- **Updated:** All calculations and delays to use shared utilities

#### Modified `PlayerRowNameClassicTwoColumn.tsx`
- **Removed:** Inline `PlayerRowLayoutProps` interface definition
- **Removed:** Unused imports (`PlayerData`, `isBatter`, `isBowler`)
- **Removed:** Inline `truncateText` function
- **Removed:** Inline `getScoreValues` function
- **Removed:** Hardcoded truncation lengths (`20`, `35`)
- **Removed:** Hardcoded logo size (`20`)
- **Removed:** Hardcoded animation delay offsets
- **Added:** Imports for shared types, utilities, and constants
- **Updated:** Component props type to use `PlayerRowLayoutProps`
- **Updated:** All calculations and delays to use shared utilities

#### Modified `PlayerRowNameCNSW.tsx`
- **Removed:** Inline `PlayerRowLayoutProps` interface definition
- **Removed:** Unused imports (`PlayerData`, `isBatter`, `isBowler`)
- **Removed:** Inline `truncateText` function
- **Removed:** Inline `getScoreValues` function
- **Removed:** Hardcoded truncation lengths (`20`, `35`)
- **Removed:** Hardcoded animation delay offsets
- **Added:** Imports for shared types, utilities, and constants
- **Updated:** Component props type to use `PlayerRowLayoutProps`
- **Updated:** All calculations and delays to use shared utilities

#### Modified `PlayerRowNameCNSW-private.tsx`
- **Removed:** Inline `PlayerRowLayoutProps` interface definition
- **Removed:** Unused imports (`PlayerData`, `isBatter`, `isBowler`)
- **Removed:** Inline `truncateText` function
- **Removed:** Inline `getScoreValues` function
- **Removed:** Hardcoded truncation lengths (`20`, `35`)
- **Removed:** Hardcoded animation delay offsets
- **Added:** Imports for shared types, utilities, and constants
- **Updated:** Component props type to use `PlayerRowLayoutProps`
- **Updated:** All calculations and delays to use shared utilities
- **Note:** Kept `console.log` statement as it appears to be intentional debugging code

#### Modified `PlayerRowNameSixersThunder.tsx`
- **Removed:** Inline `PlayerRowLayoutProps` interface definition
- **Removed:** Unused imports (`PlayerData`, `isBatter`, `isBowler`)
- **Removed:** Inline `truncateText` function
- **Removed:** Inline `getScoreValues` function
- **Removed:** Hardcoded truncation lengths (`20`, `35`)
- **Removed:** Hardcoded logo size (`20`)
- **Removed:** Hardcoded animation delay offsets
- **Added:** Imports for shared types, utilities, and constants
- **Updated:** Component props type to use `PlayerRowLayoutProps`
- **Updated:** All calculations and delays to use shared utilities

---

## ✅ Benefits

1. **Code Reusability:** Shared types, constants, and utility functions are now centralized and reusable
2. **Maintainability:** Changes to score calculation logic, truncation logic, or animation delays only need to be made in one place
3. **Consistency:** All variants use the same calculation logic and constants, ensuring consistent behavior
4. **Readability:** Component files are cleaner and focus on layout composition rather than calculations
5. **Testability:** Utility functions can be tested independently
6. **Reduced Duplication:** Eliminated duplicate interface definitions, calculation functions, and constants across 6 component files
7. **Type Safety:** Centralized type definitions ensure consistent prop structures across all variants
8. **Clear Intent:** Function names (`truncateText`, `getScoreValues`) and constant names make the logic explicit and easier to understand
9. **Flexibility:** Separate props type for components with restrictions (`PlayerRowLayoutPropsWithRestrictions`) provides better type safety

---

## 📝 Notes

- All component files maintain their original export structure and naming conventions
- The `PlayerRowLayoutProps` interface remains the same structure, just moved to a shared location
- The `truncateText` function maintains the same logic, just centralized
- The `getScoreValues` function maintains the same calculation logic, just centralized
- Components with restrictions (`StandardPlayerRow`, `PlayerRowNameLogoWrapperValue`) use `PlayerRowLayoutPropsWithRestrictions`
- Components without restrictions use the base `PlayerRowLayoutProps` interface
- All animation delay offsets are now constants, making timing adjustments easier
- Logo sizes are now constants, making size adjustments easier
- Truncation lengths are now constants, making length adjustments easier
- All imports were updated to use relative paths correctly
- No breaking changes were introduced - all functionality remains the same
- The `_types` folder follows the established pattern for type extraction
- The `_utils` folder follows the established pattern for utility extraction

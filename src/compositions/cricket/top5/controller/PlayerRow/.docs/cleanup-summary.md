# Cleanup Summary – `src/compositions/cricket/top5/controller/PlayerRow`

This document describes the refactoring changes made to extract shared types, utilities, and constants from PlayerRow component files.

---

## 📁 Folder Structure Created

The following folders were created to support the modularization pattern:

- `_types/` - Contains TypeScript interface and type definitions
- `_utils/` - Contains utility functions, constants, and helper functions
- `.docs/` - Contains this documentation file

**Note:** If `_types` or `_utils` folders don't exist in this directory, they should be created to maintain consistency with the modularization pattern.

---

## 🔄 Changes Made

### 1. Type Extraction

#### Created `_types/PlayerRowProps.ts`
- **Extracted interface:**
  - `PlayerRowProps` - Props interface for all PlayerRow components
    - `player: PlayerData`
    - `index: number`
    - `rowHeight: number`
- **Purpose:** Centralizes the props interface that was duplicated across all 6 component files
- **Dependencies:** `PlayerData` from `../../../types`

### 2. Constants Extraction

#### Created `_utils/constants.ts`
- **Extracted constants:**
  - `STAGGER_DELAY_MULTIPLIER = 5` - Multiplier for calculating animation delay based on index
  - `DEFAULT_MAIN_DURATION = 30` - Default duration in frames for main sequence if not specified
  - `EXIT_ANIMATION_OFFSET = 30` - Offset in frames before the end of the sequence for exit animation
  - `DEFAULT_NAME_LENGTH_RESTRICTION = 20` - Default maximum length for player names
  - `DEFAULT_TEAM_LENGTH_RESTRICTION = 35` - Default maximum length for team names
- **Purpose:** Centralizes hardcoded values that were duplicated across component files

### 3. Utility Functions Extraction

#### Created `_utils/calculations.ts`
- **Extracted functions:**
  - `calculatePlayerDelay(index)` - Calculates animation delay for player rows based on index (index * STAGGER_DELAY_MULTIPLIER)
  - `calculateExitFrame(timings)` - Calculates exit frame for container animations ((timings?.FPS_MAIN || DEFAULT_MAIN_DURATION) - EXIT_ANIMATION_OFFSET)
- **Purpose:** Centralizes calculation logic that was duplicated across all component files
- **Dependencies:** 
  - `Timings` from `../../../../../../core/types/data/common`
  - Constants from `./constants`

#### Created `_utils/helpers.ts`
- **Extracted functions:**
  - `getDefaultRestrictions()` - Returns default restrictions object with nameLength: 20 and teamLength: 35
- **Purpose:** Centralizes the restrictions object creation that was duplicated in Basic and BrickWork variants
- **Dependencies:** None

### 4. Component File Updates

#### Modified `row-Basic.tsx`
- **Removed:** Inline `PlayerRowProps` interface definition
- **Removed:** Unused `PlayerData` import
- **Removed:** Inline delay calculation (`index * 5`)
- **Removed:** Inline exit frame calculation (`(timings?.FPS_MAIN || 30) - 30`)
- **Removed:** Hardcoded restrictions object (`{ nameLength: 20, teamLength: 35 }`)
- **Added:** Import for `PlayerRowProps` from `./_types/PlayerRowProps`
- **Added:** Imports for `calculatePlayerDelay` and `calculateExitFrame` from `./_utils/calculations`
- **Added:** Import for `getDefaultRestrictions` from `./_utils/helpers`
- **Updated:** Delay calculation to use `calculatePlayerDelay(index)`
- **Updated:** Exit frame calculation to use `calculateExitFrame(timings)`
- **Updated:** Restrictions prop to use `getDefaultRestrictions()`

#### Modified `row-ClassicTwoCoulmn.tsx`
- **Removed:** Inline `PlayerRowProps` interface definition
- **Removed:** Unused `PlayerData` import
- **Removed:** Inline delay calculation (`index * 5`)
- **Removed:** Inline exit frame calculation (`(timings?.FPS_MAIN || 30) - 30`)
- **Removed:** Comment about stagger animation
- **Added:** Import for `PlayerRowProps` from `./_types/PlayerRowProps`
- **Added:** Imports for calculation functions
- **Updated:** All calculations to use shared utilities

#### Modified `row-CNSW.tsx`
- **Removed:** Inline `PlayerRowProps` interface definition
- **Removed:** Unused `PlayerData` import
- **Removed:** Inline delay calculation (`index * 5`)
- **Removed:** Inline exit frame calculation (`(timings?.FPS_MAIN || 30) - 30`)
- **Removed:** Comment about stagger animation
- **Added:** Import for `PlayerRowProps` from `./_types/PlayerRowProps`
- **Added:** Imports for calculation functions
- **Updated:** All calculations to use shared utilities

#### Modified `row-CNSW-private.tsx`
- **Removed:** Inline `PlayerRowProps` interface definition
- **Removed:** Unused `PlayerData` import
- **Removed:** Inline delay calculation (`index * 5`)
- **Removed:** Inline exit frame calculation (`(timings?.FPS_MAIN || 30) - 30`)
- **Removed:** Comment about stagger animation
- **Added:** Import for `PlayerRowProps` from `./_types/PlayerRowProps`
- **Added:** Imports for calculation functions
- **Updated:** All calculations to use shared utilities

#### Modified `row-BrickWork.tsx`
- **Removed:** Inline `PlayerRowProps` interface definition
- **Removed:** Unused `PlayerData` import
- **Removed:** Inline delay calculation (`index * 5`)
- **Removed:** Inline exit frame calculation (`(timings?.FPS_MAIN || 30) - 30`)
- **Removed:** Hardcoded restrictions object (`{ nameLength: 20, teamLength: 35 }`)
- **Removed:** Comment about stagger animation
- **Added:** Import for `PlayerRowProps` from `./_types/PlayerRowProps`
- **Added:** Imports for calculation functions and helpers
- **Updated:** All calculations to use shared utilities
- **Updated:** Restrictions prop to use `getDefaultRestrictions()`

#### Modified `row-SixersThunder.tsx`
- **Removed:** Inline `PlayerRowProps` interface definition
- **Removed:** Unused `PlayerData` import
- **Removed:** Inline delay calculation (`index * 5`)
- **Removed:** Inline exit frame calculation (`(timings?.FPS_MAIN || 30) - 30`)
- **Removed:** Comment about stagger animation
- **Added:** Import for `PlayerRowProps` from `./_types/PlayerRowProps`
- **Added:** Imports for calculation functions
- **Updated:** All calculations to use shared utilities

---

## ✅ Benefits

1. **Code Reusability:** Shared types, constants, and calculation logic are now centralized and reusable
2. **Maintainability:** Changes to delay calculations, exit frame logic, or restrictions only need to be made in one place
3. **Consistency:** All variants use the same calculation logic, ensuring consistent animation behavior
4. **Readability:** Component files are cleaner and focus on composition logic rather than calculations
5. **Testability:** Utility functions can be tested independently
6. **Reduced Duplication:** Eliminated duplicate interface definitions, calculations, and constants across 6 component files
7. **Type Safety:** Centralized type definitions ensure consistent prop structures across all variants
8. **Clear Intent:** Function names (`calculatePlayerDelay`, `calculateExitFrame`) make the logic explicit and easier to understand

---

## 📝 Notes

- All component files maintain their original export structure and naming conventions
- The `PlayerRowProps` interface remains the same structure, just moved to a shared location
- Delay calculation logic (`index * 5`) is now centralized but maintains the same behavior
- Exit frame calculation logic (`(timings?.FPS_MAIN || 30) - 30`) is now centralized but maintains the same behavior
- Restrictions object is now created via a helper function for consistency
- All imports were updated to use relative paths correctly
- No breaking changes were introduced - all functionality remains the same
- The `_types` folder follows the established pattern for type extraction
- The `_utils` folder follows the established pattern for utility extraction

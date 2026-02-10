# Cleanup Summary – `src/compositions/cricket/top5/controller/PlayersDisplay`

This document describes the refactoring changes made to extract shared types, utilities, and constants from PlayersDisplay component files.

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

#### Created `_types/PlayersDisplayProps.ts`
- **Extracted interface:**
  - `PlayersDisplayProps` - Props interface for PlayersDisplay components
    - `players: PlayerData[]`
    - `title?: string` - Optional title to display
    - `sponsors: Sponsor[]`
- **Purpose:** Centralizes the props interface that was duplicated across 6 component files
- **Dependencies:** 
  - `PlayerData` from `../../../types`
  - `Sponsor` from `../../../../../../core/types/data/sponsors`

#### Created `_types/PlayersDisplayPropsWithoutSponsors.ts`
- **Extracted interface:**
  - `PlayersDisplayPropsWithoutSponsors` - Props interface for PlayersDisplay components that don't use sponsors
    - `players: PlayerData[]`
    - `title?: string` - Optional title to display
- **Purpose:** Provides a type for variants that don't include sponsors (e.g., SixersThunder)
- **Dependencies:** `PlayerData` from `../../../types`

### 2. Constants Extraction

#### Created `_utils/constants.ts`
- **Extracted constants:**
  - `VERTICAL_GAP = 8` - Vertical gap between player rows in rem
  - `PADDING = 8` - Padding top and bottom in rem
  - `TITLE_HEIGHT = 48` - Height for the title if present in rem
  - `HEIGHT_DIVISOR = 1.3` - Height divisor for available height calculation
  - `DEFAULT_ROW_HEIGHT_CNSW = 110` - Default row height for CNSW variants
  - `DEFAULT_ROW_HEIGHT_CLASSIC_TWO_COLUMN = 140` - Default row height for ClassicTwoColumn variant
  - `DEFAULT_CONTAINER_ANIMATION_DELAY = 0` - Default animation delay for container animations
- **Purpose:** Centralizes hardcoded values that were duplicated across component files

### 3. Utility Functions Extraction

#### Created `_utils/calculations.ts`
- **Extracted functions:**
  - `calculateRowDimensions(totalHeight, playerCount)` - Calculates row dimensions based on total height and player count
    - Returns object containing `rowHeight`
    - Uses constants: `VERTICAL_GAP`, `PADDING`, `TITLE_HEIGHT`, `HEIGHT_DIVISOR`
- **Purpose:** Centralizes calculation logic that was duplicated across Basic, Classic, BrickWork, and SixersThunder variants
- **Dependencies:** Constants from `./constants`

### 4. Component File Updates

#### Modified `display-Basic.tsx`
- **Removed:** Inline `PlayersDisplayProps` interface definition
- **Removed:** Unused imports (`PlayerData`, `Sponsor`)
- **Removed:** Inline `calculateRowDimensions` function
- **Removed:** Hardcoded animation delay (`0`)
- **Added:** Import for `PlayersDisplayProps` from `./_types/PlayersDisplayProps`
- **Added:** Imports for `calculateRowDimensions` and `DEFAULT_CONTAINER_ANIMATION_DELAY`
- **Updated:** Animation delay to use `DEFAULT_CONTAINER_ANIMATION_DELAY`
- **Updated:** Row dimensions calculation to use shared `calculateRowDimensions` function

#### Modified `display-Classic.tsx`
- **Removed:** Inline `PlayersDisplayProps` interface definition
- **Removed:** Unused imports (`PlayerData`, `Sponsor`)
- **Removed:** Inline `calculateRowDimensions` function
- **Removed:** Hardcoded animation delay (`0`)
- **Added:** Imports for shared types and utilities
- **Updated:** All calculations and delays to use shared utilities

#### Modified `display-BrickWork.tsx`
- **Removed:** Inline `PlayersDisplayProps` interface definition
- **Removed:** Unused imports (`PlayerData`, `Sponsor`)
- **Removed:** Inline `calculateRowDimensions` function
- **Removed:** Hardcoded animation delay (`0`)
- **Added:** Imports for shared types and utilities
- **Updated:** All calculations and delays to use shared utilities

#### Modified `display-CNSW.tsx`
- **Removed:** Inline `PlayersDisplayProps` interface definition
- **Removed:** Unused imports (`PlayerData`, `Sponsor`)
- **Removed:** Commented-out `calculateRowDimensions` function
- **Removed:** Hardcoded animation delay (`0`)
- **Removed:** Hardcoded row height (`110`)
- **Added:** Imports for shared types and constants
- **Updated:** Animation delay to use `DEFAULT_CONTAINER_ANIMATION_DELAY`
- **Updated:** Row height to use `DEFAULT_ROW_HEIGHT_CNSW`

#### Modified `display-CNSW-private.tsx`
- **Removed:** Inline `PlayersDisplayProps` interface definition
- **Removed:** Unused imports (`PlayerData`, `Sponsor`)
- **Removed:** Commented-out `calculateRowDimensions` function
- **Removed:** Hardcoded animation delay (`0`)
- **Removed:** Hardcoded row height (`110`)
- **Added:** Imports for shared types and constants
- **Updated:** Animation delay to use `DEFAULT_CONTAINER_ANIMATION_DELAY`
- **Updated:** Row height to use `DEFAULT_ROW_HEIGHT_CNSW`

#### Modified `display-ClassicTwoColumn.tsx`
- **Removed:** Inline `PlayersDisplayProps` interface definition
- **Removed:** Unused imports (`PlayerData`, `Sponsor`)
- **Removed:** Hardcoded animation delay (`0`)
- **Removed:** Hardcoded row height (`140`)
- **Added:** Imports for shared types and constants
- **Updated:** Animation delay to use `DEFAULT_CONTAINER_ANIMATION_DELAY`
- **Updated:** Row height to use `DEFAULT_ROW_HEIGHT_CLASSIC_TWO_COLUMN`

#### Modified `display-SixersThunder.tsx`
- **Removed:** Inline `PlayersDisplayProps` interface definition (replaced with `PlayersDisplayPropsWithoutSponsors`)
- **Removed:** Unused `PlayerData` import
- **Removed:** Inline `calculateRowDimensions` function
- **Removed:** Hardcoded animation delay (`0`)
- **Added:** Import for `PlayersDisplayPropsWithoutSponsors` from `./_types/PlayersDisplayPropsWithoutSponsors`
- **Added:** Imports for `calculateRowDimensions` and `DEFAULT_CONTAINER_ANIMATION_DELAY`
- **Updated:** Component props type to use `PlayersDisplayPropsWithoutSponsors`
- **Updated:** Animation delay to use `DEFAULT_CONTAINER_ANIMATION_DELAY`
- **Updated:** Row dimensions calculation to use shared `calculateRowDimensions` function

---

## ✅ Benefits

1. **Code Reusability:** Shared types, constants, and calculation logic are now centralized and reusable
2. **Maintainability:** Changes to row dimension calculations, animation delays, or row heights only need to be made in one place
3. **Consistency:** All variants use the same calculation logic and constants, ensuring consistent behavior
4. **Readability:** Component files are cleaner and focus on composition logic rather than calculations
5. **Testability:** Utility functions can be tested independently
6. **Reduced Duplication:** Eliminated duplicate interface definitions, calculation functions, and constants across 7 component files
7. **Type Safety:** Centralized type definitions ensure consistent prop structures across all variants
8. **Clear Intent:** Function names (`calculateRowDimensions`) and constant names make the logic explicit and easier to understand
9. **Flexibility:** Separate props type for variants without sponsors (`PlayersDisplayPropsWithoutSponsors`) provides better type safety

---

## 📝 Notes

- All component files maintain their original export structure and naming conventions
- The `PlayersDisplayProps` interface remains the same structure, just moved to a shared location
- The `calculateRowDimensions` function maintains the same calculation logic, just centralized
- CNSW variants use fixed row heights (`DEFAULT_ROW_HEIGHT_CNSW`) instead of calculated heights
- ClassicTwoColumn variant uses a fixed row height (`DEFAULT_ROW_HEIGHT_CLASSIC_TWO_COLUMN`) instead of calculated height
- SixersThunder variant uses `PlayersDisplayPropsWithoutSponsors` since it doesn't include sponsors
- All imports were updated to use relative paths correctly
- No breaking changes were introduced - all functionality remains the same
- The `_types` folder follows the established pattern for type extraction
- The `_utils` folder follows the established pattern for utility extraction

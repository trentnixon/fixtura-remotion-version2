# Cleanup Summary – `src/compositions/cricket/teamRoster/layout/Metadata`

This document describes the refactoring changes made to extract shared types, utilities, and constants from metadata component files in the `src/compositions/cricket/teamRoster/layout/Metadata` folder.

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

#### Created `_types/TwoMetaValuesProps.ts`
- **Extracted from:** `TwoMetaValues.tsx`
- **Content:** `TwoMetaValuesProps` interface
- **Purpose:** Centralizes props type definition for TwoMetaValues components
- **Note:** Renamed from `RosterHeaderProps` to `TwoMetaValuesProps` for better clarity

#### Created `_types/VSProps.ts`
- **Extracted from:** `VS.tsx`
- **Content:** `VSProps` interface
- **Purpose:** Centralizes props type definition for VS component
- **Dependencies:** `ColorVariant` from `../../../../../../components/typography/AnimatedText`

### 2. Constants Extraction

#### Created `_utils/constants.ts`
- **Extracted constants:**
  - `DEFAULT_METADATA_VARIANT = "onContainerCopy"` - Default color variant for metadata components
  - `DEFAULT_METADATA_ANIMATION_DELAY = 0` - Default animation delay for metadata components
- **Purpose:** Centralizes default values that were hardcoded in component files

### 3. Utility Functions Extraction

#### Created `_utils/helpers.ts`
- **Extracted function:**
  - `getSubtleBackgroundColor(selectedPalette)` - Extracts subtle background color from theme palette
- **Purpose:** Centralizes background color extraction logic used by `TwoMetaValuesSubtleWrapper`

### 4. Component File Updates

#### Modified `TwoMetaValues.tsx`
- **Removed:** Inline `RosterHeaderProps` interface definition
- **Removed:** Hardcoded background color extraction logic
- **Removed:** Hardcoded animation delay values (`0`)
- **Removed:** Hardcoded default variant (`"onContainerCopy"`)
- **Removed:** Commented-out code
- **Added:** Imports for `TwoMetaValuesProps`, constants, and helper functions
- **Updated:** `TwoMetaValuesSubtleWrapper` to use:
  - `TwoMetaValuesProps` type
  - `getSubtleBackgroundColor()` helper
  - `DEFAULT_METADATA_ANIMATION_DELAY` constant
  - `DEFAULT_METADATA_VARIANT` constant
- **Updated:** `TwoMetaValuesNoWrapper` to use:
  - `TwoMetaValuesProps` type
  - `DEFAULT_METADATA_ANIMATION_DELAY` constant
- **Updated:** `TwoMetaValuesValues` internal component to use:
  - `TwoMetaValuesProps` type
  - `DEFAULT_METADATA_VARIANT` as default
  - `DEFAULT_METADATA_ANIMATION_DELAY` constant

#### Modified `VS.tsx`
- **Removed:** Inline props type definition
- **Removed:** Hardcoded default variant (`"onContainerCopy"`)
- **Removed:** Hardcoded animation delay (`0`)
- **Added:** Imports for `VSProps` (for reference, though not used directly due to inline type), constants
- **Updated:** Component to use:
  - `DEFAULT_METADATA_VARIANT` constant as default
  - `DEFAULT_METADATA_ANIMATION_DELAY` constant
- **Updated:** Props type to make `variant` optional (since it has a default)

---

## ✅ Benefits

1. **Type Reusability:** Interface definitions can now be imported and reused
2. **Maintainability:** Constants and helper functions are centralized, making updates easier
3. **Consistency:** All metadata components use the same default variant and animation delay
4. **Readability:** Component files are cleaner and focus on rendering logic rather than configuration
5. **Testability:** Utility functions can be tested independently
6. **Reduced Duplication:** Eliminated duplicate default values and extraction logic
7. **Better Naming:** Renamed `RosterHeaderProps` to `TwoMetaValuesProps` for clarity

---

## 📝 Notes

- The `VS` component keeps its props inline but uses shared constants for defaults
- The `TwoMetaValuesValues` internal component now uses shared types and constants
- All animation delays are now centralized, making it easier to adjust timing if needed
- The default variant is now a constant, ensuring consistency across all metadata components
- All imports were updated to use relative paths correctly
- No breaking changes were introduced - all functionality remains the same

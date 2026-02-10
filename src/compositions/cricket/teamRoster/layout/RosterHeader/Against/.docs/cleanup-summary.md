# Cleanup Summary – `src/compositions/cricket/teamRoster/layout/RosterHeader/Against`

This document describes the refactoring changes made to extract shared types, utilities, and constants from against team component files in the `src/compositions/cricket/teamRoster/layout/RosterHeader/Against` folder.

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

#### Created `_types/AccountTeamProps.ts`
- **Extracted from:** `LargeTeamHeader.tsx`
- **Content:** `AccountTeamProps` interface
- **Purpose:** Centralizes props type definition for account team header components
- **Note:** Used by `LargeTeamHeader` which displays the against team as the main team (inverse perspective from accountHolder folder)
- **Dependencies:** 
  - `RosterDataItem` from `../../../../types`
  - `ColorVariant` from `../../../../../../../components/typography/AnimatedText`

#### Created `_types/AgainstTeamProps.ts`
- **Extracted from:** `SmallOpponentCard.tsx`
- **Content:** `AgainstTeamProps` interface
- **Purpose:** Centralizes props type definition for against team (opponent) components
- **Note:** Used by `SmallOpponentCard` which displays the account holder team as the opponent (inverse perspective from accountHolder folder)
- **Dependencies:** Same as `AccountTeamProps`

### 2. Constants Extraction

#### Created `_utils/constants.ts`
- **Extracted constants:**
  - `DEFAULT_TEAM_HEADER_VARIANT = "onContainerCopy"` - Default color variant for team header components
  - `DEFAULT_LARGE_TEAM_LOGO_SIZE = "150"` - Default logo size for large team header
  - `DEFAULT_SMALL_OPPONENT_LOGO_SIZE = "80"` - Default logo size for small opponent card
  - `DEFAULT_TEAM_HEADER_ANIMATION_DELAY = 0` - Default animation delay for team header components
  - `MAX_TEAM_NAME_LENGTH = 50` - Maximum length for team name truncation
- **Purpose:** Centralizes default values and constants that were hardcoded in component files

### 3. Utility Functions Extraction

#### Created `_utils/helpers.ts`
- **Extracted functions:**
  - `parseLogoSize(logoSize)` - Parses logo size string to number
  - `getLogoSizeClass(logoSize)` - Generates Tailwind CSS class for logo size
  - `shouldApplyBackgroundColor(backgroundColor)` - Checks if backgroundColor should be applied
- **Purpose:** Centralizes logo size parsing and CSS class generation logic

### 4. Component File Updates

#### Modified `LargeTeamHeader.tsx`
- **Removed:** Inline `AccountTeamProps` interface definition
- **Removed:** Unused imports (`RosterDataItem`, `ColorVariant`)
- **Removed:** Hardcoded default values (`"onContainerCopy"`, `"150"`, `0`)
- **Removed:** Hardcoded team name truncation length (`50`)
- **Removed:** Inline logo size parsing and CSS class generation
- **Removed:** Inline background color check logic
- **Added:** Imports for `AccountTeamProps`, constants, and helper functions
- **Updated:** Default props to use constants:
  - `variant` uses `DEFAULT_TEAM_HEADER_VARIANT`
  - `logoSize` uses `DEFAULT_LARGE_TEAM_LOGO_SIZE`
- **Updated:** Logo size parsing to use `parseLogoSize()` helper
- **Updated:** Logo size CSS class to use `getLogoSizeClass()` helper
- **Updated:** Background color check to use `shouldApplyBackgroundColor()` helper
- **Updated:** Animation delay to use `DEFAULT_TEAM_HEADER_ANIMATION_DELAY` constant
- **Updated:** Team name truncation to use `MAX_TEAM_NAME_LENGTH` constant

#### Modified `SmallOpponentCard.tsx`
- **Removed:** Inline `AgainstTeamProps` interface definition
- **Removed:** Unused imports (`RosterDataItem`, `ColorVariant`)
- **Removed:** Hardcoded default values (`"onContainerCopy"`, `"80"`, `0`)
- **Removed:** Hardcoded team name truncation length (`50`)
- **Removed:** Inline logo size parsing and CSS class generation
- **Added:** Imports for `AgainstTeamProps`, constants, and helper functions
- **Updated:** Default props to use constants:
  - `variant` uses `DEFAULT_TEAM_HEADER_VARIANT`
  - `logoSize` uses `DEFAULT_SMALL_OPPONENT_LOGO_SIZE`
- **Updated:** Logo size parsing to use `parseLogoSize()` helper
- **Updated:** Logo size CSS class to use `getLogoSizeClass()` helper
- **Updated:** Animation delay to use `DEFAULT_TEAM_HEADER_ANIMATION_DELAY` constant
- **Updated:** Team name truncation to use `MAX_TEAM_NAME_LENGTH` constant

---

## ✅ Benefits

1. **Type Reusability:** Interface definitions can now be imported and reused
2. **Maintainability:** Constants and helper functions are centralized, making updates easier
3. **Consistency:** All team header components use the same default variant, animation delay, and truncation length
4. **Readability:** Component files are cleaner and focus on rendering logic rather than configuration
5. **Testability:** Utility functions can be tested independently
6. **Reduced Duplication:** Eliminated duplicate default values, parsing logic, and CSS class generation
7. **DRY Principle:** Logo size parsing and CSS class generation logic is now shared

---

## 📝 Notes

- The `LargeTeamHeader` component has an optional `backgroundColor` prop that `SmallOpponentCard` doesn't have, which is why they have separate prop interfaces
- This folder contains components with inverse perspective from the `accountHolder` folder:
  - `LargeTeamHeader` shows the **against team** as the main team (vs accountHolder's `LargeTeamHeader` showing account holder)
  - `SmallOpponentCard` shows the **account holder team** as the opponent (vs accountHolder's `SmallOpponentCard` showing against team)
- Logo size parsing is now centralized, making it easier to handle edge cases or add validation if needed
- The `getLogoSizeClass` helper generates Tailwind CSS classes dynamically, which is consistent with the original implementation
- All animation delays are now centralized, making it easier to adjust timing if needed
- Team name truncation length is now a constant, ensuring consistency across components
- All imports were updated to use relative paths correctly
- No breaking changes were introduced - all functionality remains the same

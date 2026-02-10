# Cleanup Summary – `src/compositions/cricket/utils/primitives`

This document describes the refactoring changes made to extract shared types, utilities, and constants from primitive component files.

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

#### Created `_types/AnimatedTextPrimitiveProps.ts`
- **Extracted interfaces:**
  - `AnimatedTextPrimitiveProps` - Base props interface for AnimatedText primitives with nullable animation
    - `value: string`
    - `animation: AnimationConfig | null`
    - `className?: string`
    - `variant?: string | ColorVariant`
  - `AnimatedTextPrimitivePropsRequiredAnimation` - Props interface for primitives with required animation
    - Same as base but `animation: AnimationConfig` (non-nullable)
  - `AnimatedTextPrimitivePropsWithLetterAnimation` - Props interface for primitives with letter animation
    - Extends `AnimatedTextPrimitivePropsRequiredAnimation`
    - Adds `letterAnimation?: "none" | "word" | "letter"`
  - `AnimatedTextPrimitivePropsWithDelay` - Props interface for primitives with delay and text alignment
    - `value: string`
    - `variant?: string`
    - `textAlign?: "left" | "right" | "center"`
    - `delay: number`
- **Purpose:** Centralizes prop interfaces that were duplicated across 20+ component files
- **Dependencies:** 
  - `AnimationConfig` from `../../../../../components/typography/config/animations`
  - `ColorVariant` from `../../../../../components/typography/AnimatedText`

#### Created `_types/TeamLogoProps.ts`
- **Extracted interfaces:**
  - `TeamLogo` - Team logo data structure
    - `url: string`
    - `width?: number`
    - `height?: number`
    - `id?: number`
  - `TeamLogoProps` - Props interface for TeamLogo component
    - `logo: TeamLogo | null`
    - `teamName: string`
    - `delay: number`
    - `size?: number`
    - `fit?: "contain" | "cover" | "fill" | "none" | "scale-down"`
    - `bgColor?: string`
- **Purpose:** Centralizes TeamLogo type definitions that were previously inline
- **Dependencies:** None

### 2. Constants Extraction

#### Created `_utils/constants.ts`
- **Extracted constants:**
  - `DEFAULT_VARIANT: ColorVariant = "onContainerCopy"` - Default color variant for primitive components
  - `DEFAULT_LETTER_ANIMATION = "none"` - Default letter animation mode
  - `DEFAULT_TEXT_ALIGN = "left"` - Default text alignment
  - `DEFAULT_TEAM_LOGO_SIZE = 20` - Default team logo size
  - `DEFAULT_TEAM_LOGO_FIT = "contain"` - Default team logo fit mode
- **Purpose:** Centralizes hardcoded default values that were duplicated across component files
- **Dependencies:** `ColorVariant` from `../../../../../components/typography/AnimatedText`

### 3. Utility Functions Extraction

#### Created `_utils/helpers.ts`
- **Extracted functions:**
  - `useFontFamily()` - Custom hook to get font family from theme context
    - Returns `fontClasses.copy?.family`
- **Purpose:** Centralizes font family extraction logic that was duplicated across all component files
- **Dependencies:** `useThemeContext` from `../../../../../core/context/ThemeContext`

### 4. Component File Updates

#### Modified `metadataSmall.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant (`"onContainerCopy"`)
- **Added:** Import for `AnimatedTextPrimitiveProps` from `./_types/AnimatedTextPrimitiveProps`
- **Added:** Imports for `DEFAULT_VARIANT` and `useFontFamily`
- **Updated:** Component props to use `AnimatedTextPrimitiveProps`
- **Updated:** Default variant to use `DEFAULT_VARIANT`
- **Updated:** Font family extraction to use `useFontFamily()`

#### Modified `metadataMedium.tsx`
- **Removed:** Inline props type definition
- **Removed:** Unused `AnimationMode` import
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant and letter animation
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsWithLetterAnimation`
- **Updated:** Defaults to use constants

#### Modified `metadataLarge.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitiveProps`
- **Updated:** Defaults to use constants

#### Modified `Top5PlayerName.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants

#### Modified `Top5PlayerTeam.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant and letter animation
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants

#### Modified `Top5PlayerScore.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants

#### Modified `Top5PlayerScoreSuffix.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants

#### Modified `TeamOfTheWeekPlayerName.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants

#### Modified `TeamOfTheWeekTeam.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant and letter animation
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants

#### Modified `TeamOfTheWeekStat.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant and letter animation
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants

#### Modified `TeamOfTheWeekType.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant and letter animation
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants

#### Modified `ResultPlayerName.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant and letter animation
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants

#### Modified `ResultPlayerScore.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant and letter animation
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants

#### Modified `ResultTeamName.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant and letter animation
- **Removed:** Changed `animation: AnimationConfig | undefined` to nullable (uses base props)
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitiveProps` (supports nullable animation)
- **Updated:** Defaults to use constants

#### Modified `ResultMetaData.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant and letter animation
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants

#### Modified `ResultFixtureResult.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant and letter animation
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants

#### Modified `ResultSyntax.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant
- **Removed:** Inconsistent type string (`{"ResultSyntax"}` → `"ResultSyntax"`)
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants

#### Modified `ResultScore.tsx`
- **Removed:** Inline props type definitions (for both `ResultScore` and `ResultScoreFirstInnings`)
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant and letter animation
- **Removed:** Inconsistent type strings (`{"ResultScoreYetToBat"}` → `"ResultScoreYetToBat"`, `{"ResultScore"}` → `"ResultScore"`)
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Both component props to use `AnimatedTextPrimitivePropsRequiredAnimation`
- **Updated:** Defaults to use constants
- **Note:** Kept conditional logic for "Yet to Bat" as it's component-specific behavior

#### Modified `RosterPlayerName.tsx`
- **Removed:** Inline props type definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant and letter animation
- **Removed:** Missing `animation` prop (component doesn't use animation)
- **Added:** Explicit interface definition (kept separate as it doesn't have animation prop)
- **Added:** Imports for constants and helpers
- **Updated:** Defaults to use constants

#### Modified `ladderTeamName.tsx`
- **Removed:** Inline `LadderTeamNameProps` interface definition
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant and text alignment
- **Removed:** Redundant `TextAlign` type definition (now in shared types)
- **Added:** Imports for shared types, constants, and helpers
- **Updated:** Component props to use `AnimatedTextPrimitivePropsWithDelay`
- **Updated:** Defaults to use constants

#### Modified `ladderTeamPoints.tsx`
- **Removed:** `useThemeContext()` hook call
- **Removed:** Hardcoded default variant
- **Removed:** Redundant `TextAlign` type definition
- **Added:** Imports for constants and helpers
- **Updated:** Default variant to use `DEFAULT_VARIANT`
- **Note:** Kept `TeamStatTextProps` interface as it has `value: string | number` which is unique

#### Modified `TeamLogo.tsx`
- **Removed:** Inline `TeamLogo` interface definition (moved to `_types/TeamLogoProps.ts`)
- **Removed:** Inline `TeamLogoProps` interface definition
- **Removed:** Hardcoded default size (`20`) and fit (`"contain"`)
- **Removed:** Redundant type casting (`logo as string`)
- **Added:** Imports for shared types and constants
- **Added:** Re-export of `TeamLogo` type for backward compatibility
- **Updated:** Component props to use `TeamLogoProps` from shared types
- **Updated:** Defaults to use constants

---

## ✅ Benefits

1. **Code Reusability:** Shared types, constants, and utility functions are now centralized and reusable
2. **Maintainability:** Changes to prop structures, default values, or font family extraction only need to be made in one place
3. **Consistency:** All variants use the same prop structures and defaults, ensuring consistent behavior
4. **Readability:** Component files are cleaner and focus on component-specific logic rather than boilerplate
5. **Testability:** Utility functions can be tested independently
6. **Reduced Duplication:** Eliminated duplicate prop definitions, default values, and font family extraction across 22 component files
7. **Type Safety:** Centralized type definitions ensure consistent prop structures across all variants
8. **Clear Intent:** Function names (`useFontFamily`) and constant names make the logic explicit and easier to understand
9. **Flexibility:** Different prop interfaces for different use cases (nullable animation, required animation, with delay, etc.)

---

## 📝 Notes

- All component files maintain their original export structure and naming conventions
- Components with nullable animation (`metadataSmall`, `metadataLarge`, `ResultTeamName`) use `AnimatedTextPrimitiveProps`
- Components with required animation use `AnimatedTextPrimitivePropsRequiredAnimation`
- Components with letter animation (`metadataMedium`) use `AnimatedTextPrimitivePropsWithLetterAnimation`
- Components with delay (`ladderTeamName`) use `AnimatedTextPrimitivePropsWithDelay`
- `RosterPlayerName` keeps its own interface as it doesn't have an animation prop
- `ladderTeamPoints` keeps its own interface as it accepts `string | number` for value
- `TeamLogo` types are now in shared types but re-exported for backward compatibility
- All default values are now constants, making them easier to adjust globally
- Font family extraction is now centralized via `useFontFamily()` hook
- All imports were updated to use relative paths correctly
- No breaking changes were introduced - all functionality remains the same
- The `_types` folder follows the established pattern for type extraction
- The `_utils` folder follows the established pattern for utility extraction
- Comment headers were updated to reflect actual component names (e.g., `// MetadataSmall.tsx` → `// Top5PlayerName.tsx`)

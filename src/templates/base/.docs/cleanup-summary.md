# Cleanup Summary – `src/templates/base`

This document describes the refactoring changes made to extract shared types and utilities from component files in the `src/templates/base` folder.

---

## 📁 Folder Structure Created

The following folders were created to support the modularization pattern:

- `_types/` - Contains TypeScript interface and type definitions
- `_utils/` - Contains utility functions, constants, and helper logic
- `.docs/` - Contains this documentation file

**Note:** If `_types` or `_utils` folders don't exist in this directory, they should be created to maintain consistency with the modularization pattern.

---

## 🔄 Changes Made

### 1. Type Extraction

#### Created `_types/BaseTemplateProps.ts`
- **Extracted from:** `index.tsx`
- **Content:** `BaseTemplateProps` interface
- **Purpose:** Centralizes props type definition for the `BaseTemplate` component
- **Dependencies:** 
  - `React` (for `React.FC`)
  - `FixturaDataset` from `../../../core/types/data`
  - `UIConfig` from `../../types/settingsConfig`
  - `AnimationConfig` from `../../types/AnimationConfig `

#### Created `_types/BaseTemplateLayoutProps.ts`
- **Extracted from:** `BaseTemplateLayout.tsx`
- **Content:** `BaseTemplateLayoutProps` interface
- **Purpose:** Centralizes props type definition for the `BaseTemplateLayout` component

### 2. Constants Extraction

#### Created `_utils/constants.ts`
- **Extracted constants:**
  - `CONTENT_Z_INDEX = 1000` - Z-index for the main content layer (above background and audio)
  - `DEFAULT_SEQUENCE_DURATION = 30` - Default duration in frames for timing sequences if not specified

### 3. Utility Functions Extraction

#### Created `_utils/calculations.ts`
- **Extracted functions:**
  - `calculateIntroDuration(timings)` - Calculates intro duration in frames (FPS_INTRO or default)
  - `calculateMainDuration(timings)` - Calculates main duration in frames (FPS_MAIN or default)
  - `calculateOutroDuration(timings, doesAccountHaveSponsors)` - Calculates outro duration in frames (FPS_OUTRO or default, or 30 if no sponsors)
- **Dependencies:** `Timings` type from `../../../core/types/data/common`

### 4. Component File Updates

#### Modified `index.tsx`
- **Removed:** Inline `BaseTemplateProps` interface definition
- **Removed:** Unused `FixturaDataset`, `UIConfig`, and `AnimationConfig` imports (now imported in the type file)
- **Added:** Import of `BaseTemplateProps` from `./_types/BaseTemplateProps`

#### Modified `BaseTemplateLayout.tsx`
- **Removed:** Inline `BaseTemplateLayoutProps` interface definition
- **Removed:** Hardcoded values:
  - `zIndex: 1000` → replaced with `CONTENT_Z_INDEX` constant
  - `timings.FPS_INTRO ?? 30` → replaced with `calculateIntroDuration(timings)`
  - `timings.FPS_MAIN ?? 30` → replaced with `calculateMainDuration(timings)`
  - `doesAccountHaveSponsors ? (timings.FPS_OUTRO ?? 30) : 30` → replaced with `calculateOutroDuration(timings, doesAccountHaveSponsors)`
- **Added:** Imports for:
  - `BaseTemplateLayoutProps` from `./_types/BaseTemplateLayoutProps`
  - `CONTENT_Z_INDEX` from `./_utils/constants`
  - `calculateIntroDuration`, `calculateMainDuration`, `calculateOutroDuration` from `./_utils/calculations`

---

## ✅ Benefits

1. **Type Reusability:** Interface definitions can now be imported and reused across multiple files
2. **Maintainability:** Constants and calculation logic are centralized, making updates easier
3. **Consistency:** Duration calculations follow a consistent pattern with clear naming
4. **Readability:** Component files are cleaner and focus on rendering logic rather than type definitions and calculations
5. **Testability:** Utility functions can be tested independently

---

## 📝 Notes

- The `theme.ts` file was not modified as it already follows a clean structure with exported theme configuration
- All imports were updated to use relative paths correctly
- No breaking changes were introduced - all functionality remains the same

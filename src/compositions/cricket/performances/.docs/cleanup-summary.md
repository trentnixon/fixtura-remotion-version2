# Cleanup Summary - Performances Root Folder

## Overview
This cleanup extracted shared calculation logic and utility functions from all entry point files (`basic.tsx`, `classic.tsx`, `brickWork.tsx`, `classicTwoColumn.tsx`, `cnsw.tsx`, `cnsw-private.tsx`, `sixersThunder.tsx`) into a centralized `_utils` folder.

## Changes Made

### Created Files

#### `_utils/calculations.ts`
Extracted the following shared utility functions:
- `getItemsPerScreen()` - Calculates items per screen from contentLayout configuration
- `calculateDisplayDurationPerScreen()` - Calculates display duration based on timings and metadata
- `hasValidPerformances()` - Validates performance data structure
- `calculateTotalScreens()` - Calculates total number of screens needed
- `mergeAssignSponsors()` - Merges and transforms assignSponsors from all performances

Also includes constants:
- `DEFAULT_ITEMS_PER_SCREEN` - Default value of 5
- `DEFAULT_DISPLAY_DURATION` - Default value of 300 frames

### Modified Files

All entry point files were updated to:
1. Import shared utilities from `./_utils/calculations`
2. Replace inline calculation logic with utility function calls
3. Remove duplicate code blocks (approximately 60+ lines per file)

**Files Updated:**
- `basic.tsx`
- `classic.tsx`
- `brickWork.tsx`
- `classicTwoColumn.tsx`
- `cnsw.tsx`
- `cnsw-private.tsx`
- `sixersThunder.tsx`

## Benefits

1. **Code Reusability**: Shared logic is now centralized and reusable
2. **Maintainability**: Changes to calculation logic only need to be made in one place
3. **Consistency**: All entry points use the same calculation logic, ensuring consistent behavior
4. **Reduced Duplication**: Eliminated ~420+ lines of duplicate code across 7 files
5. **Type Safety**: Utility functions are properly typed with TypeScript interfaces

## Folder Structure

```
performances/
├── _utils/
│   └── calculations.ts          # Shared calculation utilities
├── .docs/
│   └── cleanup-summary.md      # This file
├── basic.tsx                    # Updated to use shared utilities
├── classic.tsx                  # Updated to use shared utilities
├── brickWork.tsx                # Updated to use shared utilities
├── classicTwoColumn.tsx         # Updated to use shared utilities
├── cnsw.tsx                     # Updated to use shared utilities
├── cnsw-private.tsx              # Updated to use shared utilities
└── sixersThunder.tsx            # Updated to use shared utilities
```

## Notes

- The `_utils` folder should be created if it doesn't exist (already created during cleanup)
- All utility functions maintain the same behavior as the original inline code
- Debug logging and console warnings remain in the entry point files where context-specific
- The `mergeAssignSponsors` function handles the transformation from performance format to SponsorFooter expected format

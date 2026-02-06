# Cleanup Summary - Ladder Root Folder

## Overview
This cleanup extracted shared validation logic, data casting, and duration calculation functions from all entry point files into a centralized `_utils` folder.

## Changes Made

### Created Files

#### `_utils/helpers.ts`
Extracted the following shared utility functions:
- `hasValidLadderData()` - Validates ladder data structure
- `castToLadderDataArray()` - Casts composition data to LadderData array
- `calculateLadderDuration()` - Calculates duration in frames based on timings (FPS_LADDER or default 300)

Also includes constants:
- `DEFAULT_LADDER_DURATION` - Default value of 300 frames

### Modified Files

All entry point files were updated to:
1. Import shared utilities from `./_utils/helpers`
2. Replace inline validation logic with `hasValidLadderData()` function call
3. Replace inline casting with `castToLadderDataArray()` function call
4. Replace inline duration calculation with `calculateLadderDuration()` function call
5. Remove duplicate code blocks (approximately 10+ lines per file)

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
2. **Maintainability**: Changes to validation, casting, or duration logic only need to be made in one place
3. **Consistency**: All entry points use the same validation and calculation logic, ensuring consistent behavior
4. **Reduced Duplication**: Eliminated ~70+ lines of duplicate code across 7 files
5. **Type Safety**: Utility functions are properly typed with TypeScript interfaces
6. **Readability**: Code is more concise and easier to understand

## Folder Structure

```
ladder/
├── _utils/
│   └── helpers.ts                  # Shared helper utilities
├── .docs/
│   └── cleanup-summary.md         # This file
├── basic.tsx                       # Updated to use shared utilities
├── classic.tsx                     # Updated to use shared utilities
├── brickWork.tsx                   # Updated to use shared utilities
├── classicTwoColumn.tsx            # Updated to use shared utilities
├── cnsw.tsx                        # Updated to use shared utilities
├── cnsw-private.tsx                # Updated to use shared utilities
└── sixersThunder.tsx               # Updated to use shared utilities
```

## Notes

- The `_utils` folder should be created if it doesn't exist (already created during cleanup)
- All utility functions maintain the same behavior as the original inline code
- The `calculateLadderDuration` function uses `FPS_LADDER` from timings or falls back to 300 frames
- All entry point files follow the same pattern: validate data, cast to array, create sequences with calculated duration

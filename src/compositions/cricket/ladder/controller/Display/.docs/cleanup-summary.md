# Cleanup Summary - Display Folder

## Overview
This cleanup extracted shared TypeScript interfaces and utility functions from all display component files into centralized `_types` and `_utils` folders.

## Changes Made

### Created Files

#### `_types/LadderDisplayProps.ts`
Extracted the shared `LadderDisplayProps` interface that was duplicated across all 7 display component files:
```typescript
export interface LadderDisplayProps {
  ladder: LadderData;
}
```

#### `_utils/calculations.ts`
Extracted the shared `calculateRowDimensions` utility function that was duplicated across all 7 display component files:
- Calculates header height and row height based on total height and team count
- Uses constants: `headerHeight = 70`, `VERTICAL_GAP = 4`, `PADDING = 20`, `HEADER_MARGIN = 10`

### Modified Files

All display component files were updated to:
1. Import `LadderDisplayProps` from `./_types/LadderDisplayProps`
2. Import `calculateRowDimensions` from `./_utils/calculations`
3. Remove inline interface definitions
4. Remove inline utility function definitions

**Files Updated:**
- `display-Basic.tsx`
- `display-classic.tsx`
- `display-BrickWork.tsx`
- `display-classic-two-column.tsx`
- `display-cnsw.tsx`
- `display-cnsw-private.tsx`
- `display-Sixers-thunder.tsx`

## Benefits

1. **Code Reusability**: Shared types and utilities are now centralized
2. **Maintainability**: Changes to interfaces or calculations only need to be made in one place
3. **Consistency**: All display components use the same type definitions and calculation logic
4. **Reduced Duplication**: Eliminated ~20+ lines of duplicate code per file (approximately 140+ lines total)
5. **Type Safety**: Centralized type definitions ensure consistent prop interfaces across all components

## Folder Structure

```
Display/
├── _types/
│   └── LadderDisplayProps.ts      # Shared prop interface
├── _utils/
│   └── calculations.ts            # Shared calculation utilities
├── .docs/
│   └── cleanup-summary.md        # This file
├── display-Basic.tsx              # Updated to use shared types/utils
├── display-classic.tsx            # Updated to use shared types/utils
├── display-BrickWork.tsx          # Updated to use shared types/utils
├── display-classic-two-column.tsx # Updated to use shared types/utils
├── display-cnsw.tsx               # Updated to use shared types/utils
├── display-cnsw-private.tsx       # Updated to use shared types/utils
└── display-Sixers-thunder.tsx     # Updated to use shared types/utils
```

## Notes

- The `_types` and `_utils` folders should be created if they don't exist (already created during cleanup)
- All utility functions maintain the same behavior as the original inline code
- The `calculateRowDimensions` function handles the calculation of header and row heights based on available space and team count

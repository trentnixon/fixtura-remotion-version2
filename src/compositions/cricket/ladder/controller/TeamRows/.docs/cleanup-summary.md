# Cleanup Summary - TeamRows Folder

## Overview
This cleanup extracted shared TypeScript interfaces, utility functions, and components from all row component files into centralized `_types`, `_utils`, and component files.

## Changes Made

### Created Files

#### `_types/TeamRowProps.ts`
Extracted the shared `TeamRowProps` interface that was duplicated across all 5 row component files:
```typescript
export interface TeamRowProps {
  team: TeamData;
  index: number;
  totalTeams: number;
  isBiasTeam: boolean;
  LadderRowHeight: number;
  wrapperClass?: string;
}
```

#### `_utils/calculations.ts`
Extracted shared calculation functions:
- `calculateAnimationDelay()` - Calculates animation delay based on index and multiplier (default: 5)
- `calculateAnimationOutFrame()` - Calculates exit frame based on timings (FPS_LADDER - 20)
- `parseTeamPosition()` - Parses team position string to number

#### `_utils/components.tsx`
Extracted shared component:
- `OverflowHiddenWrapper` - Simple wrapper component for overflow hidden styling

### Modified Files

All row component files were updated to:
1. Import `TeamRowProps` from `./_types/TeamRowProps`
2. Import calculation functions from `./_utils/calculations`
3. Import `OverflowHiddenWrapper` from `./_utils/components` (where applicable)
4. Remove inline interface definitions
5. Remove inline calculation functions
6. Remove inline component definitions

**Files Updated:**
- `StandardRow.tsx` (contains both `StandardRow` and `StandardRowWrapped` exports)
- `row-Classic-two-column.tsx` (contains both `StandardRowClassicTwoColumn` and `StandardRowClassicTwoColumnWrapped` exports)
- `row-CNSW.tsx` (contains both `StandardRowCNSW` and `StandardRowCNSWWrapped` exports)
- `row-CNSW-private.tsx` (contains both `StandardRowCNSWPrivate` and `StandardRowCNSWPrivateWrapped` exports)
- `row-Sixers-thunder.tsx` (contains both `StandardRowSixers` and `StandardRowSixersThunderWrapped` exports)

## Benefits

1. **Code Reusability**: Shared types, utilities, and components are now centralized
2. **Maintainability**: Changes to interfaces, calculations, or components only need to be made in one place
3. **Consistency**: All row components use the same type definitions and calculation logic
4. **Reduced Duplication**: Eliminated ~15+ lines of duplicate code per file (approximately 75+ lines total across 5 files)
5. **Type Safety**: Centralized type definitions ensure consistent prop interfaces across all components
6. **Flexibility**: Animation delay multiplier is configurable (5 or 9) while maintaining shared logic

## Folder Structure

```
TeamRows/
├── _types/
│   └── TeamRowProps.ts          # Shared prop interface
├── _utils/
│   ├── calculations.ts          # Shared calculation utilities
│   └── components.tsx            # Shared React components
├── .docs/
│   └── cleanup-summary.md       # This file
├── StandardRow.tsx              # Updated to use shared types/utils
├── row-Classic-two-column.tsx  # Updated to use shared types/utils
├── row-CNSW.tsx                 # Updated to use shared types/utils
├── row-CNSW-private.tsx         # Updated to use shared types/utils
└── row-Sixers-thunder.tsx       # Updated to use shared types/utils
```

## Notes

- The `_types` and `_utils` folders should be created if they don't exist (already created during cleanup)
- All utility functions maintain the same behavior as the original inline code
- The `calculateAnimationDelay` function accepts a configurable multiplier parameter (default: 5) to support different animation timing needs
- The `OverflowHiddenWrapper` component is used in 4 out of 5 files (not used in `StandardRow.tsx`)
- Background color calculation logic remains inline as it varies significantly between components (hardcoded colors vs theme palette values)

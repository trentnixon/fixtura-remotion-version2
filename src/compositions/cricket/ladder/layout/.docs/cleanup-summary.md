# Cleanup Summary - Layout Folder

## Overview
This cleanup extracted the shared `BaseLayoutProps` interface from all layout component files into a centralized `_types` folder.

## Changes Made

### Created Files

#### `_types/BaseLayoutProps.ts`
Extracted the shared `BaseLayoutProps` interface that was duplicated across all 4 layout component files:
```typescript
export interface BaseLayoutProps {
  team: TeamData;
  delay: number;
  LadderRowHeight: number;
  place: number;
  bgColorClass?: string;
}
```

**Note:** The `bgColorClass` prop is optional since `TableCNSWRow-private.tsx` does not use it.

### Modified Files

All layout component files were updated to:
1. Import `BaseLayoutProps` from `./_types/BaseLayoutProps`
2. Remove inline interface definitions
3. Remove unused `TeamData` imports (where applicable)

**Files Updated:**
- `TableRowLayout.tsx` - Contains multiple layout variants (StandardLadderRow, ModernLadderRow, BalancedLadderRow, CardLadderRow, CenteredLogoLadderRow)
- `TableCNSWRow.tsx` - Contains CNSWLadderRow component
- `TableSixersRow.tsx` - Contains SixersLadderRow component
- `TableCNSWRow-private.tsx` - Contains CNSWLadderRowPrivate component

## Benefits

1. **Code Reusability**: Shared type definitions are now centralized
2. **Maintainability**: Changes to the base props interface only need to be made in one place
3. **Consistency**: All layout components use the same type definition
4. **Reduced Duplication**: Eliminated ~7 lines of duplicate code per file (approximately 28+ lines total)
5. **Type Safety**: Centralized type definitions ensure consistent prop interfaces across all components
6. **Flexibility**: Made `bgColorClass` optional to accommodate components that don't use it

## Folder Structure

```
layout/
├── _types/
│   └── BaseLayoutProps.ts       # Shared prop interface
├── .docs/
│   └── cleanup-summary.md       # This file
├── TableRowLayout.tsx           # Updated to use shared types
├── TableCNSWRow.tsx             # Updated to use shared types
├── TableSixersRow.tsx           # Updated to use shared types
└── TableCNSWRow-private.tsx     # Updated to use shared types
```

## Notes

- The `_types` folder should be created if it doesn't exist (already created during cleanup)
- The `bgColorClass` prop is optional in the shared interface to support components that don't use background colors
- All layout components maintain their unique styling and structure while sharing the same prop interface
- The `TableRowLayout.tsx` file exports multiple layout variants, all using the same `BaseLayoutProps` interface

# Cleanup Summary - TableHeader Folder

## Overview
This cleanup extracted the shared `TableHeaderProps` interface and calculation utility from all header component files into centralized `_types` and `_utils` folders.

## Changes Made

### Created Files

#### `_types/TableHeaderProps.ts`
Extracted the shared `TableHeaderProps` interface that was duplicated across all 5 header component files:
```typescript
export interface TableHeaderProps {
  title: string;
  headerHeight: number;
}
```

#### `_utils/calculations.ts`
Extracted the shared `calculateActualHeight` utility function used in CNSW header components:
- `calculateActualHeight()` - Calculates actual height with max constraint (default: 120px)

### Modified Files

All header component files were updated to:
1. Import `TableHeaderProps` from `./_types/TableHeaderProps`
2. Remove inline interface definitions
3. Import and use `calculateActualHeight` from `./_utils/calculations` (where applicable)

**Files Updated:**
- `header.tsx` - Contains `TableHeader` and `TableHeaderWrapped` components
- `headerSixers.tsx` - Contains `TableHeaderSixersThunder` component
- `headerCNSW.tsx` - Contains `TableHeaderCNSW` component (uses `calculateActualHeight`)
- `headerClassicTwoColumn.tsx` - Contains `TableHeaderClassicTwoColumn` component
- `headerCNSW-private.tsx` - Contains `TableHeaderCNSWPrivate` component (uses `calculateActualHeight`)

## Benefits

1. **Code Reusability**: Shared types and utilities are now centralized
2. **Maintainability**: Changes to interfaces or calculations only need to be made in one place
3. **Consistency**: All header components use the same type definitions
4. **Reduced Duplication**: Eliminated ~5 lines of duplicate code per file (approximately 25+ lines total)
5. **Type Safety**: Centralized type definitions ensure consistent prop interfaces across all components
6. **Utility Reuse**: The `calculateActualHeight` function is now available for reuse in other components

## Folder Structure

```
TableHeader/
├── _types/
│   └── TableHeaderProps.ts      # Shared prop interface
├── _utils/
│   └── calculations.ts          # Shared calculation utilities
├── .docs/
│   └── cleanup-summary.md       # This file
├── header.tsx                    # Updated to use shared types
├── headerSixers.tsx              # Updated to use shared types
├── headerCNSW.tsx                # Updated to use shared types/utils
├── headerClassicTwoColumn.tsx    # Updated to use shared types
└── headerCNSW-private.tsx        # Updated to use shared types/utils
```

## Notes

- The `_types` and `_utils` folders should be created if they don't exist (already created during cleanup)
- The `calculateActualHeight` function is used in CNSW header components to respect a maximum height constraint of 120px
- All header components maintain their unique styling and structure while sharing the same prop interface
- The `header.tsx` file exports two components (`TableHeader` and `TableHeaderWrapped`), both using the same `TableHeaderProps` interface

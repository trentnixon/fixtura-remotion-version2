# Cleanup Summary - PlayerRow

## Overview
Refactored all PerformanceRow component files by consolidating shared TypeScript interfaces and calculation utilities into `_types/PerformanceRowProps.ts` and `_utils/calculations.ts` (both `_types` and `_utils` folders are in the current PlayerRow directory - create them if they don't exist).

## Changes Made

### Types Extracted
- **`PerformanceRowProps`**: Interface containing `performance`, `index`, and `rowHeight` properties

### Utilities Extracted
- **`calculateAnimationDelay`**: Calculates animation delay based on index and multiplier (default multiplier: 5)
- **`calculateAnimationDelayModulo`**: Calculates animation delay with modulo pattern for CNSW variant (modulo 7, multiplier 2.5)
- **`calculateAnimationOutFrame`**: Calculates exit frame based on timings (FPS_PREFORMANCECARD or default 180, minus 30)

### Files Updated
All 7 row component files were updated to use shared types and utilities:
- `row-Basic.tsx` - Uses `calculateAnimationDelay(index, 5)`
- `row-BrickWork.tsx` - Uses `calculateAnimationDelay(index, 5)`
- `row-Classic.tsx` - Uses `calculateAnimationDelay(index, 5)`
- `row-ClassicTwoColumn.tsx` - Uses `calculateAnimationDelay(index, 5)`
- `row-CNSW.tsx` - Uses `calculateAnimationDelayModulo(index, 7, 2.5)`
- `row-CNSW-private.tsx` - Uses `calculateAnimationDelay(index, 2.5)`
- `row-SixersThunder.tsx` - Uses `calculateAnimationDelay(index, 5)`

### Removed Duplicate Code
- Removed inline `PerformanceRowProps` interface definitions from all component files
- Removed duplicate animation delay calculations
- Removed duplicate animation out frame calculations
- Removed unused `PerformanceData` imports (now imported via the types file)

## Structure
```
PlayerRow/
├── _types/
│   └── PerformanceRowProps.ts
├── _utils/
│   └── calculations.ts
├── .docs/
│   └── cleanup-summary.md
└── row-*.tsx (7 files)
```

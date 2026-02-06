# Cleanup Summary - PerformancesDisplay

## Overview
Refactored all PerformancesDisplay component files by consolidating shared TypeScript interfaces into `_types/PerformancesDisplayProps.ts` (both `_types` and `_utils` folders are in the current PerformancesDisplay directory - create them if they don't exist).

## Changes Made

### Types Extracted
- **`PerformancesDisplayProps`**: Base interface containing `performances`, `itemsPerScreen`, and `screenIndex` properties
- **`PerformancesDisplayWithSponsorsProps`**: Extended interface for ClassicTwoColumn variant that includes `assignSponsors` property

### Files Updated
All 7 display component files were updated to import from the shared types:
- `display-Basic.tsx`
- `display-BrickWork.tsx`
- `display-Classic.tsx`
- `display-ClassicTwoColumn.tsx` (uses `PerformancesDisplayWithSponsorsProps`)
- `display-CNSW.tsx`
- `display-CNSW-private.tsx`
- `display-SixersThunder.tsx`

### Removed Duplicate Code
- Removed inline `PerformancesDisplayProps` interface definitions from all component files
- Removed unused `PerformanceData` imports (now imported via the types file)

## Structure
```
PerformancesDisplay/
├── _types/
│   └── PerformancesDisplayProps.ts
├── .docs/
│   └── cleanup-summary.md
└── display-*.tsx (7 files)
```

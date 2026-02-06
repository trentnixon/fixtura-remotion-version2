# Cleanup Summary - Layout

## Overview
Refactored all StandardPerformanceRow component files by consolidating shared TypeScript interfaces and helper functions into `_types/PerformanceRowLayoutProps.ts` and `_utils/helpers.ts` (both `_types` and `_utils` folders are in the current layout directory - create them if they don't exist).

## Changes Made

### Types Extracted
- **`PerformanceRowLayoutProps`**: Base interface containing `performance`, `index`, `rowHeight`, and `delay` properties
- **`PerformanceRowLayoutPropsWithRestrictions`**: Extended interface for components that require `restrictions` prop (Basic and BrickWork variants)

### Utilities Extracted
- **`truncateText`**: Helper function to truncate text to a maximum length with ellipsis
- **`getScoreValues`**: Helper function to calculate score display values based on performance type (batting or bowling)

### Files Updated
All 7 layout component files were updated to use shared types and utilities:
- `StandardPerformanceRow.tsx` - Uses `PerformanceRowLayoutPropsWithRestrictions`
- `StandardPerformanceRowBrickWork.tsx` - Uses `PerformanceRowLayoutPropsWithRestrictions`
- `StandardPerformanceRowClassic.tsx` - Uses `PerformanceRowLayoutProps`
- `StandardPerformanceRowClassicTwoColumn.tsx` - Uses `PerformanceRowLayoutProps`
- `StandardPerformanceRowCNSW.tsx` - Uses `PerformanceRowLayoutProps`
- `StandardPerformanceRowCNSW-private.tsx` - Uses `PerformanceRowLayoutProps`
- `StandardPerformanceRowSixersThunder.tsx` - Uses `PerformanceRowLayoutProps`

### Removed Duplicate Code
- Removed inline `PerformanceRowLayoutProps` interface definitions from all component files
- Removed duplicate `truncateText` helper function implementations
- Removed duplicate `getScoreValues` function implementations
- Removed unused imports (`PerformanceData`, `isBattingPerformance`, `isBowlingPerformance`)

## Structure
```
layout/
├── _types/
│   └── PerformanceRowLayoutProps.ts
├── _utils/
│   └── helpers.ts
├── .docs/
│   └── cleanup-summary.md
└── StandardPerformanceRow*.tsx (7 files)
```

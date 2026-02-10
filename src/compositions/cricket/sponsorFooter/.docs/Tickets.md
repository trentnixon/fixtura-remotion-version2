# Tickets.md – Sponsor Footer

This file is used for **feature-level planning**. Each ticket has a unique ID, overview, goal, and phased checklist.

---

# Ticket – TKT-2025-001 ✅ COMPLETED

## Overview

Optimize sponsor image sizing to maximize display size while respecting container constraints and maintaining proper aspect ratios.

## Summary

**Problem Solved:** Sponsor images were forced into square containers, limiting their display size and distorting aspect ratios.

**Solution Implemented:**

- Removed square constraints from container styling
- Added dynamic width sizing with `calculateMaxWidth()` function using actual logo dimensions
- Uses natural aspect ratio from logo.width/logo.height when available
- Fallback to 3:1 ratio only when dimensions are missing
- Added `preserveRatio={true}` to maintain aspect ratios
- Improved container layout with `overflow-hidden` and `flex-shrink-0`
- Enhanced accessibility with proper alt text

**Impact:** Sponsor logos now maximize display size while maintaining proper aspect ratios, with no artificial constraints.

---

# Ticket – TKT-2025-002 ✅ COMPLETED

## Overview

Refactor SponsorFooter component to eliminate code duplication and improve maintainability.

## Summary

**Problem Solved:** Massive code duplication between main component and IncludePrimarySponsor, poor performance, and lack of proper organization.

**Solution Implemented:**

- Created `useSponsorValidation` hook to consolidate all validation logic
- Extracted `PrimarySponsor` component to separate file for better organization
- Added `React.memo` optimizations to prevent unnecessary re-renders
- Implemented `useMemo` for expensive sponsor list calculations
- Improved code organization with proper folder structure (`components/`, `hooks/`)
- Added configuration constants for maintainability
- Fixed React Hook order issues and TypeScript errors

**Impact:** Eliminated 50+ lines of duplicated code, improved performance, and created maintainable component architecture.

---

# Ticket – TKT-2025-005

## Overview

Implement sponsor deduplication and aggregation logic to prevent duplicate sponsors between primary and assigned sponsor lists.

## What We Need to Do

Create a centralized sponsor aggregation function that intelligently merges primary and assigned sponsors, removing duplicates and ensuring optimal display order.

## Phases & Tasks

### Phase 1: Analysis & Design

- [ ] Analyze current sponsor data structure and duplication patterns
- [ ] Design aggregation algorithm with priority rules
- [ ] Define deduplication criteria (by ID, name, or logo URL)
- [ ] Plan component interface changes

### Phase 2: Implementation

- [x] Create simple `getUniqueSponsors` utility function
- [x] Implement unified sponsor rendering approach
- [x] Remove complex aggregation logic
- [x] Simplify component structure
- [x] Remove separate PrimarySponsor component

### Phase 3: Testing & Validation

- [ ] Test with various sponsor configurations
- [ ] Validate deduplication accuracy
- [ ] Ensure animation timing remains consistent
- [ ] Test edge cases (empty lists, missing data)

## Notes

- Related to Roadmap item: _"Performance Optimizations (see TKT-2025-004)"_
- Consider impact on existing sponsor display logic
- May require updates to sponsor data types
- Priority: High - affects user experience and sponsor visibility

---

# Ticket – TKT-2025-004

## Overview

Implement performance optimizations for sponsor rendering and data handling.

## What We Need to Do

Optimize sponsor data processing, reduce re-renders, and implement efficient logo loading strategies.

## Phases & Tasks

### Phase 1: Data Optimization

- [ ] Memoize primary sponsor calculation
- [ ] Optimize sponsor list creation
- [ ] Add React.memo for sponsor components
- [ ] Implement efficient key generation

### Phase 2: Rendering Optimization

- [ ] Add lazy loading for sponsor logos
- [ ] Implement logo preloading strategy
- [ ] Add virtual scrolling for large sponsor lists
- [ ] Optimize animation performance

### Phase 3: Caching & Loading

- [ ] Implement sponsor logo caching
- [ ] Add logo loading error handling
- [ ] Create logo fallback system
- [ ] Add loading states and skeletons

## Notes

- Related to Roadmap item: _"Performance Optimizations (see TKT-2025-004)"_
- Consider impact on animation timing
- May require changes to AnimatedImage component

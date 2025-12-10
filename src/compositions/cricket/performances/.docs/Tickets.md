# 📁 Tickets.md – Performances Composition Planning

This file is used for **feature-level planning and tracking** for the Performances composition.
Each ticket must follow a consistent structure so it can be easily read by both humans and LLMs.

---

## Completed Tickets

- TKT-2025-001
- TKT-2025-002
- TKT-2025-003
- TKT-2025-004

---

## Active Tickets

---

### TKT-2025-005: Polish & Optimization

---

ID: TKT-2025-005
Status: Draft
Priority: Low
Owner: Development Team
Created: 2025-01-XX
Updated: 2025-01-XX
Related: Roadmap-Polish, Dependency-TKT-2025-003, Dependency-TKT-2025-004

---

#### Overview

Refine the Performances composition with optimizations, configuration options, and polish.

#### What We Need to Do

Enhance the composition with configurable options and performance improvements.

#### Phases & Tasks

### Phase 1: Configuration Options

#### Tasks

- [ ] Make items-per-screen configurable (currently hardcoded to 5)
- [ ] Add support for custom transition types per composition
- [ ] Add support for custom screen duration from metadata
- [ ] Create configuration utility functions

### Phase 2: Visual Enhancements

#### Tasks

- [ ] Add screen indicator (e.g., "Screen 1 of 3") if multiple screens
- [ ] Improve transition animations
- [ ] Add loading/transition states if needed
- [ ] Ensure smooth looping from last screen to first

### Phase 3: Performance Optimization

#### Tasks

- [ ] Optimize screen calculation logic
- [ ] Test with large datasets (20+ items)
- [ ] Optimize re-renders during transitions
- [ ] Add memoization where appropriate

### Phase 4: Documentation

#### Tasks

- [ ] Complete `performances.md` documentation file
- [ ] Add usage examples
- [ ] Document configuration options
- [ ] Update main cricket README if needed

#### Constraints, Risks, Assumptions

- Constraints: Must maintain backward compatibility
- Risks: Over-engineering configuration options
- Assumptions: Performance will be acceptable with current approach

---

## Summaries of Completed Tickets

### TKT-2025-001

Established the base architecture with independent type definitions based on JSON structure (not extending top5), utility functions for data transformation and screen calculation, and a fallback component for empty data states. All foundation components are ready to support multi-screen performance displays with transitions.

### TKT-2025-002

Implemented the complete Basic template with multi-screen transition support. Created entry point (`basic.tsx`) with pagination logic using `TransitionSeriesWrapper`, display controller matching top5 parent container structure, row components with static 140px height, and layout component (`StandardPerformanceRow`) with proper spacing and alignment. Integrated sponsor footer at global level with assignSponsors transformation. Fixed timing to use `FPS_PREFORMANCECARD`. Layout ensures items are tightly grouped and centered vertically when fewer than max items per screen.

### TKT-2025-003

Implemented all 6 template variants (brickWork, classic, classicTwoColumn, cnsw, cnsw-private, sixersThunder) for the Performances composition. Each variant includes complete entry point, display controller, row component, and layout component. All variants support multi-screen pagination with transitions, use static row heights (140px for most, 110px for CNSW variants), and maintain visual consistency with their corresponding top5 variants. Special features include: CNSW variants with index numbers and title display, classicTwoColumn with proper grid layout, and sixersThunder matching classic layout pattern. All variants are exported and integrated into the main cricket compositions system.

### TKT-2025-004

Successfully integrated the Performances composition into the main cricket compositions system. Updated routing to map `CricketBattingPerformances` and `CricketBowlingPerformances` to the new `CricketPerformances` composition. Added `FPS_PREFORMANCECARD` timing support to the Timings interface. All 7 template variants (basic, brickWork, classic, classicTwoColumn, cnsw, cnsw-private, sixersThunder) are exported and accessible through the composition system. Composition appears correctly in Remotion demo with proper transitions and pagination.

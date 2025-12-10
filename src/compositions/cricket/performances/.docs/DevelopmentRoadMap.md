# Development Roadmap – Performances Composition

This file tracks **progress, priorities, and recommendations** for the Performances composition feature. It should remain **clean and high-level**, while detailed planning lives in `Tickets.md`.

---

## ✅ Completed

- [x] Folder structure created
- [x] Documentation files initialized (readMe, RoadMap, Tickets)
- [x] **Setup Phase** – Base structure complete (TKT-2025-001)
  - [x] Created independent `types.ts` with performance-specific types based on JSON structure
  - [x] Created `utils/dataTransformer.ts` for data transformation and title generation
  - [x] Created `utils/screenCalculator.ts` for pagination logic (items per screen, screen count)
  - [x] Created `modules/NoPlayersData/` fallback component
- [x] **Basic Template Implementation** – Core functionality complete (TKT-2025-002)
  - [x] Created `basic.tsx` entry point with transition logic and pagination
  - [x] Created `controller/PerformancesDisplay/display-Basic.tsx` with parent container matching top5
  - [x] Created `controller/PlayerRow/row-Basic.tsx` for individual player rows
  - [x] Created `layout/StandardPerformanceRow.tsx` matching top5 layout structure
  - [x] Integrated `TransitionSeriesWrapper` for multi-screen transitions
  - [x] Configured static row height (140px) for basic template
  - [x] Fixed layout spacing and alignment (tighter gaps, centered vertically)
  - [x] Integrated sponsor footer at global level
- [x] **Template Variants Implementation** – All variants complete (TKT-2025-003)
  - [x] Implemented brickWork, classic, classicTwoColumn, cnsw, cnsw-private, sixersThunder variants
  - [x] All variants support multi-screen pagination with transitions
  - [x] All variants use static row heights and proper spacing/alignment
  - [x] All variants match their corresponding top5 visual layouts
  - [x] All variants exported and integrated into composition system
- [x] **System Integration** – Complete (TKT-2025-004)
  - [x] Updated routing to map `CricketBattingPerformances` and `CricketBowlingPerformances` to `CricketPerformances`
  - [x] Updated `src/compositions/cricket/index.tsx` to export `CricketPerformances`
  - [x] Added `FPS_PREFORMANCECARD` timing support to Timings interface
  - [x] Fixed assignSponsors transformation for sponsor footer
  - [x] All template variants tested and working

---

## ⏳ To Do (easy → hard)

1. ~~**Setup Phase** – Create base structure~~ ✅ Complete
2. ~~**Basic Template Implementation** – Core functionality~~ ✅ Complete
3. [x] **Template Variants** – Additional template support ✅ Complete

   - [x] Implement `brickWork.tsx` variant ✅ Complete
   - [x] Implement `classic.tsx` variant ✅ Complete
   - [x] Implement `classicTwoColumn.tsx` variant ✅ Complete
   - [x] Implement `cnsw.tsx` variant ✅ Complete
   - [x] Implement `cnsw-private.tsx` variant ✅ Complete
   - [x] Implement `sixersThunder.tsx` variant ✅ Complete
   - (see TKT-2025-003 for details)

4. [x] **Integration** – Hook into system ✅ Complete

   - [x] Update `src/compositions/cricket/index.tsx` to export Performances compositions
   - [x] Update routing to map `CricketBattingPerformances` and `CricketBowlingPerformances` to new composition
   - [x] Test with sample data files (all templates implemented)
   - [x] Export all template variants in index files
   - (see TKT-2025-004 for details)

5. [ ] **Polish & Optimization** – Refinement
   - [ ] Fine-tune transition timing and animations
   - [ ] Optimize screen calculation logic
   - [ ] Add configuration options (items per screen, transition types)
   - [ ] Performance testing with large datasets
   - (see TKT-2025-005 for details)

---

## 💡 Recommendations

- ✅ Items-per-screen is now configurable via `contentLayout.divideFixturesBy.CricketBattingPerformances` or `CricketBowlingPerformances` (defaults to 5)
- ✅ Layout structure matches top5 composition for consistency
- ✅ Transition patterns follow `upcoming` composition (always use transitions, even for single screen)
- ✅ All 7 template variants implemented and working (basic, brickWork, classic, classicTwoColumn, cnsw, cnsw-private, sixersThunder)
- ✅ Static row heights implemented per template variant (140px for most, 110px for CNSW variants)
- Consider adding visual indicators for multi-screen content (e.g., "1 of 3" indicators) in future polish phase
- Consider performance testing with large datasets (20+ items) in polish phase

---

### Example Usage

- Mark off items as they are completed.
- Reorder tasks so easier jobs always appear first.
- Update when scope changes or new requirements arise.
- Cross-reference each task with its ticket for detailed breakdowns and discussions.

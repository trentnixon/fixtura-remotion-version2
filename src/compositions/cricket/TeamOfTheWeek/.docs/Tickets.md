# Completed Tickets

- TKT-2025-001
- TKT-2025-002
- TKT-2025-003
- TKT-2025-004
- TKT-2025-005
- TKT-2025-007

---

# Active Tickets

---

---

---

---

---

## Ticket – TKT-2025-006

---

ID: TKT-2025-006
Status: Draft
Priority: Medium
Owner: Development Team
Created: 2025-12-17
Updated: 2025-12-17
Related: Roadmap-Item-6

---

### Overview

Create layout components for TeamOfTheWeek player cards with reusable sections for stats, metadata, and visuals.

### What We Need to Do

Build modular layout components that can be composed to create player cards, similar to the layout patterns in results and performances assets.

### Phases & Tasks

#### Phase 1: Create Layout Folder Structure

##### Tasks

- [ ] Create layout folder in TeamOfTheWeek
- [ ] Create PlayerCard subfolder
- [ ] Create Sections subfolder for stat blocks
- [ ] Add readMe.md files

#### Phase 2: Build PlayerCard Layout

##### Tasks

- [ ] Create PlayerCardLayout.tsx
- [ ] Design card structure (header, stats, footer)
- [ ] Accept children/slots for flexible composition
- [ ] Handle background styling and borders
- [ ] Make responsive to different templates

#### Phase 3: Build Section Components

##### Tasks

- [ ] Create PlayerName.tsx section
- [ ] Create CategoryBadge.tsx section
- [ ] Create BattingStats.tsx section
- [ ] Create BowlingStats.tsx section
- [ ] Create AllRounderStats.tsx section
- [ ] Create RankingIndicator.tsx section
- [ ] Create TeamLogo.tsx section

#### Phase 4: Create Utility Functions

##### Tasks

- [ ] Add formatting utilities (numbers, decimals, etc.)
- [ ] Add stat display helpers
- [ ] Add type guards for conditional rendering

### Constraints, Risks, Assumptions

- **Constraint**: Must remain flexible for different template styles
- **Assumption**: Layout patterns from other assets can be adapted

---

---

## Ticket – TKT-2025-008

---

ID: TKT-2025-008
Status: In Progress
Priority: Low
Owner: Development Team
Created: 2025-12-17
Updated: 2025-12-17
Related: Roadmap-Item-8

---

### Overview

Implement remaining template variants for TeamOfTheWeek (Classic, ClassicTwoColumn, CNSW, CNSW Private, Sixers/Thunder).

### What We Need to Do

Create all remaining template variants to provide full template coverage for the TeamOfTheWeek asset.

### Phases & Tasks

#### Phase 1: Classic Template ✅

##### Tasks

- [x] Create classic.tsx
- [x] Create display-Classic.tsx
- [x] Create row-Classic.tsx
- [x] Apply Classic styling patterns
- [x] Match Top5 Classic layout (12-column grid, Player Info → Logo → Stats)
- [x] Integrate TeamOfTheWeek typography components into Classic theme
- [x] Center all stats (single and dual for all-rounders)
- [x] Adjust padding and spacing to match design
- [x] Match Top5 Classic container structure and styling

#### Phase 2: ClassicTwoColumn Template ✅

##### Tasks

- [x] Create classicTwoColumn.tsx
- [x] Create display-ClassicTwoColumn.tsx
- [x] Create row-ClassicTwoColumn.tsx
- [x] Use 1-column layout (single column stack, not 2 columns)
- [x] Add TeamOfTheWeek typography styles to twoColumnClassic theme
- [x] Register ClassicTwoColumn template in index.tsx
- [x] Match Top5 ClassicTwoColumn layout (12-column grid: Player Info → Logo → Stats)

#### Phase 3: CNSW Template ✅

##### Tasks

- [x] Create cnsw.tsx
- [x] Create display-CNSW.tsx
- [x] Create row-CNSW.tsx
- [x] Apply CNSW branding and styling
- [x] Add TeamOfTheWeek typography styles to CNSW theme
- [x] Register CNSW template in index.tsx

#### Phase 4: CNSW Private Template ✅

##### Tasks

- [x] Create cnswPrivate.tsx
- [x] Create display-CNSW-private.tsx
- [x] Create row-CNSW-private.tsx
- [x] Apply private variant styling (uses same layout as CNSW public with different background colors and text variants)
- [x] Register CNSW-Private template in index.tsx

#### Phase 5: Sixers/Thunder Template ✅

##### Tasks

- [x] Create sixersThunder.tsx
- [x] Create display-SixersThunder.tsx
- [x] Create row-SixersThunder.tsx
- [x] Apply Sixers/Thunder branding (12-column grid: Player Info → Logo → Stats)
- [x] Add TeamOfTheWeek typography styles to Sixers theme
- [x] Add TeamOfTheWeek typography styles to Thunder theme
- [x] Register Sixers/Thunder template in index.tsx
- [x] Use 1-column layout for display (single column stack)
- [x] Replace Top5PlayerScore/Top5PlayerScoreSuffix with TeamOfTheWeekStat/MetadataSmall
- [x] Fix height constraints and logo sizing (w-20 h-20)
- [x] Adjust padding and spacing (p-0 pl-2, gap-0, leading-none)

### Constraints, Risks, Assumptions

- **Constraint**: Must maintain visual consistency with other templates in each variant family
- **Assumption**: Basic and BrickWork templates are completed and can serve as references

---

## Ticket – TKT-2025-009

---

ID: TKT-2025-009
Status: Cancelled
Priority: Medium
Owner: Development Team
Created: 2025-12-17
Updated: 2025-12-17
Related: Roadmap-Item-9

---

### Overview

~~Implement screen pagination logic for displaying multiple screens of TeamOfTheWeek players.~~

### Completion Summary

Pagination is not needed for TeamOfTheWeek. All 12 players are displayed on a single screen in a 2-column grid layout (6 players per column), similar to Top5 templates. The implementation uses a single-screen approach with `grid grid-cols-2` layout.

---

## Ticket – TKT-2025-010

---

ID: TKT-2025-010
Status: In Progress
Priority: Low
Owner: Development Team
Created: 2025-12-17
Updated: 2025-12-17
Related: Roadmap-Item-10

---

### Overview

Create a NoData module for handling empty TeamOfTheWeek data states.

### What We Need to Do

Build a NoData component that displays an appropriate message when no TeamOfTheWeek players are available.

### Phases & Tasks

#### Phase 1: Create NoData Module Structure

##### Tasks

- [ ] Create modules folder in TeamOfTheWeek if not exists
- [ ] Create NoData subfolder
- [ ] Create readMe.md

#### Phase 2: Build NoData Component

##### Tasks

- [ ] Create NoTeamOfTheWeekData.tsx
- [ ] Design empty state message and visuals
- [ ] Use consistent styling with other NoData modules
- [ ] Accept optional message prop for customization

#### Phase 3: Integrate into Templates

##### Tasks

- [x] Add conditional check in basic.tsx (placeholder exists)
- [ ] Add conditional check in classic.tsx
- [ ] Add conditional check in other template variants
- [ ] Test empty data scenarios

### Constraints, Risks, Assumptions

- **Constraint**: Must follow NoData component patterns from other assets
- **Assumption**: Empty state scenarios are rare but should be handled

---

# Summaries of Completed Tickets

### TKT-2025-001

TypeScript type definitions created in `types.ts` with comprehensive interfaces for TeamOfTheWeek data structure. Includes BattingStats, BowlingStats, AllRounderStats, CategoryDetail, Rankings, and union type TeamOfTheWeekPlayer with type guards. Animation constants and composition ID exported.

### TKT-2025-002

Test data `Cricket_TeamOfTheWeek.json` registered in `testData/index.ts` under `testDatasets` and `datasetsByCategory` with display name "Team of the Week". Data is now available for development and testing in Remotion Studio.

### TKT-2025-003

Basic template implementation completed. Created `basic.tsx` with data extraction from VideoDataContext, placeholder for empty data, and integration with `TeamOfTheWeekDisplayBasic` component. All 12 players display on single screen in 2-column grid layout.

### TKT-2025-004

Composition registered in system. Created `index.tsx` in TeamOfTheWeek folder exporting `basic`, `classic`, and `brickwork` variants. Added `CricketTeamOfTheWeek` export in `cricket/index.tsx` mapping all template variants. Registered `CricketTeamOfTheWeek` composition ID in `routing.tsx` for proper routing.

### TKT-2025-005

Controller components created. Built `display-Basic.tsx` with 2-column grid layout and `row-Basic.tsx` with player info, logo, and stats sections. Implemented conditional rendering for batting/bowling/all-rounder stats, position labels, and staggered animations. Integrated TeamOfTheWeek typography components and stat formatting (batting: `runs* (balls)`, bowling: `wickets/runs (overs)`).

### TKT-2025-007

BrickWork template implementation completed. Created `brickWork.tsx`, `display-BrickWork.tsx`, and `row-BrickWork.tsx` following Top5 BrickWork patterns. Added TeamOfTheWeek typography styles to brickwork theme. Implemented 12-column grid layout (Player Info → Logo → Stats) with border-bottom accent, matching BrickWork aesthetic. Container structure matches Top5 exactly (outer overflow-hidden div, AnimatedContainer with rounded-lg, inner grid with rounded-none). All stats centered, supporting both single and dual stat displays for all-rounders. Layout uses 2-column grid (6 players per column) with tightened text spacing and reduced padding. Logo sizing constrained to w-30 h-30 matching Top5 pattern.

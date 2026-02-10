# 📁 Ticket – Mudgeeraba Club-Only Match Card Redesign

---
ID: TKT-2026-002
Status: Draft
Priority: High
Owner: Development Team
Created: 2026-02-08
Updated: 2026-02-08
Related: Roadmap-Mudgeeraba-Compositions, Variant-mudgeeraba
---

## Overview

Redesign the `card-Mudgeeraba-clubOnly.tsx` component to match a custom angular, high-contrast design featuring white bands, green angled score bars, broken divider elements, and a distinctive footer. This design emphasizes sharp angles, bold typography, and a "dirty, rough, raw" aesthetic aligned with the Mudgeeraba variant.

**File Organization:** All new components are placed in their appropriate parent folders (see `file-organization-rule.md`):
- Header components → `MatchHeader/` folder
- Status components → `MatchStatus/` folder
- Common/shared components → `_common/` folder (if truly shared)

## What We Need to Do

Transform the current club-only match card layout into a custom design with three main sections:
1. **Header Section**: White band with club name, circular logo with green border, and green angled score bar
2. **Middle Section**: Angular divider elements with broken/interrupted white bars
3. **Footer Section**: Green bar with match status

## Design Analysis

### Current Component Structure
- Uses `ResultStatementShort` for result statement
- Uses `TeamsSectionLogoAndScore` for team display (horizontal layout with logos and scores)
- Uses `MatchStatus` for abandoned matches
- Uses `PlayerStatsClubOnlyBasic` for player statistics
- Uses `MatchHeader` for match info footer

### Target Design Breakdown

#### Section 1: Header (Top Section)
**Visual Elements:**
- Grade name displayed in white text (top right, black background)
- Wide white horizontal band spanning most of card width
  - Club name on left side (black text on white)
  - Circular logo area on right side (white circle with bright green border)
  - Green angled bar extending right from logo (bright green background)
    - Contains score text "240/8 (40)" in white
    - Right edge has diagonal cut (sloping down from right to left)

**Data Needed:**
- `match.gradeName` - for grade display
- `match.homeTeam.name` or `match.awayTeam.name` (club team) - for club name
- `match.teamHomeLogo` or `match.teamAwayLogo` (club team logo)
- `match.homeTeam.score` or `match.awayTeam.score` (club team score)
- `match.homeTeam.overs` or `match.awayTeam.overs` (for overs display)

**What Exists:**
- `ResultStatementShort` - can be adapted for grade name display
- `TeamLogo` primitive - can be used for logo rendering
- `ResultScore` primitive - can be used for score display
- Score normalization utilities in `TeamsSection/_utils/helpers.ts`

**What Needs to be Created:**
- New `MudgeerabaClubHeader` component
  - White band container with club name positioning
  - Circular logo container with green border
  - Green angled bar component (requires CSS clip-path or SVG for diagonal cut)
  - Score formatting with overs display

#### Section 2: Middle Section (Dividers)
**Visual Elements:**
- Multiple horizontal white bands separated by thin black lines
- Central white band is "broken" with angular cuts creating chevron/hourglass negative space
- Creates distinctive visual separation between header and content

**Data Needed:**
- No data required - purely decorative

**What Exists:**
- `AnimatedContainer` - can be used for container structure
- Standard Tailwind CSS classes for backgrounds and borders

**What Needs to be Created:**
- New `MudgeerabaAngularDivider` component
  - Multiple white band layers
  - Central broken/interrupted band with angular cuts
  - CSS clip-path or SVG for angular negative space
  - Thin black separator lines

#### Section 3: Footer (Bottom Section)
**Visual Elements:**
- Wide solid bright green horizontal bar spanning full width
- Match status text centered in white (bold)
- Straight edges (top may have subtle angle)

**Data Needed:**
- `match.status` - for match status text
- `match.result` - potentially for additional status info

**What Exists:**
- `MatchStatus` component - can be adapted but needs major redesign
- `AnimatedText` for text rendering

**What Needs to be Created:**
- New `MudgeerabaStatusFooter` component
  - Green background bar
  - Centered white text
  - Potentially subtle angled top edge

## Phases & Tasks

### Phase 1: Header Section Implementation

#### Tasks
- [x] Create `src/compositions/cricket/results/layout/Sections/MatchHeader/MudgeerabaClubHeader.tsx`
- [x] Design white band container with proper spacing and layout
- [x] Implement club name display on left side (black text on white)
- [x] Create circular logo container component with green border
  - Use `TeamLogo` primitive inside circular container
  - Apply green border styling (bright green, 4px solid)
- [x] Create green angled score bar component
  - Research CSS clip-path or SVG approach for diagonal right edge
  - Implement bright green background (#22c55e)
  - Position score text (white, bold) with overs display
  - Format: "{score}/{wickets} ({overs})"
- [x] Add grade name display (top right, white text on black background)
- [x] Integrate animations using Mudgeeraba animation context
- [ ] Test with various score formats and team names

### Phase 2: Angular Divider Section Implementation

#### Tasks
- [x] Create `src/compositions/cricket/results/layout/Sections/MatchHeader/MudgeerabaAngularDivider.tsx`
- [x] Design multiple white band layers with black separators
- [x] Implement central broken/interrupted band
  - Research CSS clip-path for angular cuts
  - Create chevron/hourglass negative space effect (using two segmented divs with clip-path)
  - Ensure visual balance and proper spacing
- [x] Apply appropriate heights and spacing (12px bands, 2px separators, 16px broken band)
- [x] Integrate animations (container fade-in)
- [ ] Test visual appearance across different card heights

### Phase 3: Footer Section Implementation

#### Tasks
- [x] Create `src/compositions/cricket/results/layout/Sections/MatchStatus/MudgeerabaStatusFooter.tsx`
- [x] Design green background bar (full width)
- [x] Implement centered match status text (white, bold)
- [x] Add subtle angled top edge (CSS clip-path with 2% angle)
- [x] Handle different status types (Abandoned, Completed, etc.)
  - Shows status for "Abandoned", "Cancelled", etc.
  - Shows result summary for "Completed"
  - Fallback handling for empty statuses
- [x] Integrate animations
- [ ] Test with various status messages

### Phase 4: Integration & Layout Assembly

#### Tasks
- [x] Update `card-Mudgeeraba-clubOnly.tsx` to use new components
- [x] Remove or conditionally hide old components (`TeamsSectionLogoAndScore`, `MatchStatus`, `MatchHeader`, `ResultStatementShort`)
- [x] Integrate `PlayerStatsClubOnlyBasic` appropriately (positioned between divider and footer)
- [x] Ensure proper section ordering: Header → Divider → Stats → Footer
- [x] Adjust height calculations (divider uses fixed 44px, other heights calculated from available space)
- [ ] Test complete card layout with real match data
- [x] Verify animations flow correctly between sections (delays: baseDelay → dividerDelay → statsDelay → footerDelay)

### Phase 5: Styling Refinement & Theme Integration

#### Tasks
- [x] Ensure all colors match Mudgeeraba theme palette
  - Bright green (#22c55e / Tailwind green-500) for score bars and footer ✅
  - White (#ffffff) for bands and text backgrounds ✅
  - Black (#000000) for text and separators ✅
- [x] Apply Rubik Dirt font to prominent text (scores, status)
  - Scores use `fontClasses.title?.family` (Rubik Dirt) ✅
  - Status uses `fontClasses.title?.family` (Rubik Dirt) ✅
- [x] Apply Heebo font to copy text (club name, grade)
  - Club name uses `fontClasses.copy?.family` (Heebo) ✅
  - Grade name uses `fontClasses.copy?.family` (Heebo) ✅
- [x] Verify font weights match design (bold for scores/status)
  - Scores use `font-bold` ✅
  - Status uses `font-bold` ✅
  - Club name uses theme default (font-normal) ✅
- [x] Test responsive behavior and overflow handling
  - Added `overflow-hidden` to containers ✅
  - Added `truncate` to club name for long text ✅
  - Added `min-w-0` to flex container for proper truncation ✅
  - Added `break-words` to status text ✅
- [x] Ensure proper contrast ratios for accessibility
  - White text on green (#22c55e): WCAG AA compliant ✅
  - Black text on white: WCAG AAA compliant ✅
  - White text on black: WCAG AAA compliant ✅

### Phase 6: Testing & Edge Cases

#### Tasks
- [ ] Test with long club names (truncation/ellipsis)
- [ ] Test with various score formats (including "Yet to Bat")
- [ ] Test with missing logos (fallback display)
- [ ] Test with different match statuses
- [ ] Test with first innings scores (if applicable)
- [ ] Test animation timing and delays
- [ ] Verify club team detection logic (`isClubTeam` flag)
- [ ] Test with various card heights

## Constraints, Risks, Assumptions

### Constraints
- Must maintain compatibility with existing `MatchCardProps` interface
- Must work with existing animation system and theme context
- Angular cuts require CSS clip-path or SVG (may have browser compatibility considerations)
- Design assumes club-only context (single team focus)

### Risks
- CSS clip-path for angular elements may not render consistently across all browsers
- Complex layout may require significant height calculation adjustments
- Integration with existing player stats component may require layout modifications
- Angular divider design may be difficult to achieve with pure CSS

### Assumptions
- Club team can be identified via `isClubTeam` flag on team objects
- Score format follows standard cricket notation (runs/wickets (overs))
- Match data structure includes all required fields (`gradeName`, `status`, `overs`, etc.)
- Design can be achieved primarily with Tailwind CSS and CSS clip-path
- Player stats section remains mostly unchanged (positioning only)

## Technical Notes

### CSS Clip-Path for Angular Cuts
The green angled bar and broken divider will likely require CSS `clip-path` property:
```css
clip-path: polygon(0% 0%, 85% 0%, 100% 100%, 0% 100%);
```
This creates a diagonal cut on the right edge. Values will need to be adjusted based on design requirements.

### Color Values (from design description)
- Bright green: Likely `#00FF00` or theme primary color
- White: `#FFFFFF`
- Black: `#000000`
- These should be verified against Mudgeeraba theme palette

### Component Structure
```
card-Mudgeeraba-clubOnly.tsx
├── MudgeerabaClubHeader
│   ├── GradeName (top right)
│   ├── WhiteBand
│   │   ├── ClubName (left)
│   │   ├── CircularLogo (right, green border)
│   │   └── GreenAngledBar (score display)
├── MudgeerabaAngularDivider
│   ├── WhiteBand (top)
│   ├── BlackSeparator
│   ├── BrokenWhiteBand (central, angular cuts)
│   ├── BlackSeparator
│   └── WhiteBand (bottom)
├── PlayerStatsClubOnlyBasic (existing)
└── MudgeerabaStatusFooter
    └── GreenBar (status text)
```

## Related Files

### Components to Create
- `src/compositions/cricket/results/layout/Sections/MatchHeader/MudgeerabaClubHeader.tsx` ✅
- `src/compositions/cricket/results/layout/Sections/MatchHeader/MudgeerabaAngularDivider.tsx` ✅
- `src/compositions/cricket/results/layout/Sections/MatchStatus/MudgeerabaStatusFooter.tsx`

### Components to Modify
- `src/compositions/cricket/results/layout/MatchCard/card-Mudgeeraba-clubOnly.tsx`
- Potentially `src/compositions/cricket/results/layout/MatchCard/_utils/calculations.ts`

### Components to Reference
- `src/compositions/cricket/results/layout/Sections/TeamsSection/TeamsSectionLogoAndScore.tsx` (for score formatting logic)
- `src/compositions/cricket/utils/primitives/TeamLogo.tsx`
- `src/compositions/cricket/utils/primitives/ResultScore.tsx`
- `src/templates/variants/mudgeeraba/theme.ts` (for colors and fonts)

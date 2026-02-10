# TeamOfTheWeek Template Implementation Plan

This document outlines the plan for implementing the TeamOfTheWeek composition across all template variants.

---

## 📋 Overview

The TeamOfTheWeek asset has been successfully implemented for the **basic** template. This document details what was completed and what needs to be done for each remaining template variant.

---

## ✅ Completed: Basic Template

### What Was Implemented

#### 1. **Core Components**
- ✅ **Types** (`types.ts`): Complete TypeScript interfaces for TeamOfTheWeek data structure
- ✅ **Display Component** (`controller/TeamOfTheWeekDisplay/display-Basic.tsx`): Main display component with 2-column grid layout
- ✅ **Player Row Component** (`controller/PlayerRow/row-Basic.tsx`): Single-row layout with logo, player info, and stats
- ✅ **Basic Template** (`basic.tsx`): Entry point for basic template variant
- ✅ **Index Export** (`index.tsx`): Template export structure

#### 2. **Typography Components**
- ✅ `TeamOfTheWeekPlayerName`: Player name display
- ✅ `TeamOfTheWeekTeam`: Team name display
- ✅ `TeamOfTheWeekType`: Position label (Top Scorer, Highest Strike Rate, etc.)
- ✅ `TeamOfTheWeekStat`: Stat values display

#### 3. **Theme Integration**
- ✅ Added to `src/templates/variants/basic/theme.ts`:
  - `TeamOfTheWeekPlayerName`: `text-xl font-normal tracking-wide leading-snug`
  - `TeamOfTheWeekTeam`: `text-xs font-normal tracking-wider leading-tight`
  - `TeamOfTheWeekType`: `text-xs font-bold uppercase tracking-wider leading-none`
  - `TeamOfTheWeekStat`: `text-3xl font-bold tracking-tight leading-tight`

- ✅ Added to `src/templates/types/TemplateThemeConfig.ts`:
  - Added all four TeamOfTheWeek typography types to `ThemeComponentStyles` interface

- ✅ Added to `src/components/typography/AnimatedText.tsx`:
  - Added all four types to `TypographyType` union

#### 4. **System Integration**
- ✅ Registered in `src/compositions/cricket/index.tsx` as `CricketTeamOfTheWeek`
- ✅ Registered in `src/core/utils/routing.tsx` for composition routing
- ✅ Test data registered in `testData/index.ts`

#### 5. **Layout Features**
- ✅ Single-row layout: `[Logo] [Type, Player, Team] [Stats]`
- ✅ Logo: Full height, fixed width (w-20), covers entire area
- ✅ Stats display:
  - Batting: `runs* (balls)` with balls in smaller font
  - Bowling: `wickets/runs (overs)` with overs in smaller font
  - Two rows for Top All-Rounder and 12th Man positions
- ✅ Position-based stat display:
  - Batting positions (Top Scorer, Highest Strike Rate) → batting stats
  - Bowling positions (Most Wickets, Best Economy) → bowling stats
  - Top All-Rounder & 12th Man → both stats (two rows)

---

## 🎯 Remaining Templates to Implement

### Template List
1. **classic** - Impact font for titles, Heebo for copy
2. **thunder** - Monument Extended for titles, Tungsten for copy
3. **brickwork** - Roboto-Medium throughout
4. **sixers** - Slightly Marker for titles, Resolve for copy
5. **twoColumnClassic** - Classic variant with two-column layout
6. **cnsw** - Custom NSW template
7. **cnsw-private** - Private variant of CNSW

---

## 📝 Implementation Checklist Per Template

For each template, the following steps must be completed:

### Phase 1: Theme Updates

#### Step 1.1: Add Typography Styles to Theme
**File:** `src/templates/variants/{template}/theme.ts`

Add the following to `componentStyles` object:

```typescript
TeamOfTheWeekPlayerName: {
  className: "text-xl font-normal tracking-wide leading-snug", // Adjust per template
},
TeamOfTheWeekTeam: {
  className: "text-xs font-normal tracking-wider leading-tight", // Adjust per template
},
TeamOfTheWeekType: {
  className: "text-xs font-bold uppercase tracking-wider leading-none", // Adjust per template
},
TeamOfTheWeekStat: {
  className: "text-3xl font-bold tracking-tight leading-tight", // Adjust per template
},
```

**Template-Specific Adjustments:**
- **classic**: Use Impact font family for titles, adjust tracking
- **thunder**: Use Monument Extended/Tungsten fonts, wider tracking
- **brickwork**: Use Roboto-Medium, adjust weights
- **sixers**: Use Slightly Marker/Resolve fonts, adjust sizing
- **twoColumnClassic**: Match classic but consider column constraints
- **cnsw**: Match existing CNSW typography patterns
- **cnsw-private**: Match cnsw styles

#### Step 1.2: Verify Type Definitions
**File:** `src/templates/types/TemplateThemeConfig.ts`

✅ Already completed - no changes needed (types are already in the interface)

#### Step 1.3: Verify AnimatedText Types
**File:** `src/components/typography/AnimatedText.tsx`

✅ Already completed - no changes needed (types are already in the union)

---

### Phase 2: Component Creation

#### Step 2.1: Create Template-Specific Display Component
**File:** `src/compositions/cricket/TeamOfTheWeek/controller/TeamOfTheWeekDisplay/display-{template}.tsx`

**Base Structure:**
- Copy from `display-Basic.tsx`
- Adjust styling to match template aesthetic
- Maintain same grid layout (2 columns, 6 players per column)
- Update background colors, spacing, padding per template

**Template-Specific Considerations:**
- **classic**: May need different background treatments
- **thunder**: Bold, high-contrast styling
- **brickwork**: Clean, structured layout
- **sixers**: Playful, bold styling
- **twoColumnClassic**: Ensure works with two-column header layout
- **cnsw**: Match CNSW design system
- **cnsw-private**: Match cnsw but with private branding

#### Step 2.2: Create Template-Specific Player Row Component
**File:** `src/compositions/cricket/TeamOfTheWeek/controller/PlayerRow/row-{template}.tsx`

**Base Structure:**
- Copy from `row-Basic.tsx`
- Maintain single-row layout: `[Logo] [Type, Player, Team] [Stats]`
- Adjust:
  - Background colors (match template palette)
  - Typography component usage (already uses global components)
  - Spacing and padding
  - Logo sizing if needed

**Template-Specific Considerations:**
- **classic**: Classic styling, may need different background treatments
- **thunder**: Bold, high-contrast colors
- **brickwork**: Structured, clean appearance
- **sixers**: Playful styling
- **twoColumnClassic**: Ensure alignment with two-column layout
- **cnsw**: Match CNSW design patterns
- **cnsw-private**: Match cnsw styling

#### Step 2.3: Create Template Entry Point
**File:** `src/compositions/cricket/TeamOfTheWeek/{template}.tsx`

**Structure:**
```typescript
import React from "react";
import { useVideoDataContext } from "../../../../core/context/VideoDataContext";
import { TeamOfTheWeekDisplay{Template} } from "./controller/TeamOfTheWeekDisplay/display-{template}";
import { SponsorFooter } from "../../../../components/footers/SponsorFooter";

const TeamOfTheWeek{Template}: React.FC = () => {
  const { videoData } = useVideoDataContext();
  const players = videoData?.data || [];

  return (
    <>
      <TeamOfTheWeekDisplay{Template} players={players} />
      <SponsorFooter />
    </>
  );
};

export default TeamOfTheWeek{Template};
```

---

### Phase 3: Integration

#### Step 3.1: Export from Index
**File:** `src/compositions/cricket/TeamOfTheWeek/index.tsx`

Add export:
```typescript
import {Template}TeamOfTheWeek from "./{template}";
export const {template} = {Template}TeamOfTheWeek;
```

#### Step 3.2: Register in Cricket Index
**File:** `src/compositions/cricket/index.tsx`

Update the `CricketTeamOfTheWeek` export:
```typescript
export const CricketTeamOfTheWeek = {
  basic: teamOfTheWeekBasic,
  {template}: teamOfTheWeek{Template}, // Replace placeholder
  // ... other templates
};
```

---

## 🎨 Template-Specific Styling Guidelines

### Classic Template
- **Fonts**: Impact (titles), Heebo (copy)
- **Style**: Clean, professional
- **Colors**: Standard palette
- **Tracking**: Normal to tight

### Thunder Template
- **Fonts**: Monument Extended (titles), Tungsten (copy)
- **Style**: Bold, high-contrast, dramatic
- **Colors**: High contrast
- **Tracking**: Wider tracking

### Brickwork Template
- **Fonts**: Roboto-Medium throughout
- **Style**: Structured, clean, organized
- **Colors**: Standard palette
- **Tracking**: Normal

### Sixers Template
- **Fonts**: Slightly Marker (titles), Resolve (copy)
- **Style**: Playful, bold, energetic
- **Colors**: Vibrant
- **Tracking**: Normal to wider

### Two Column Classic Template
- **Fonts**: Same as classic
- **Style**: Classic but adapted for two-column layout
- **Layout**: Ensure player rows work with two-column header
- **Considerations**: May need width adjustments

### CNSW Template
- **Fonts**: Match existing CNSW typography
- **Style**: Match CNSW design system
- **Colors**: CNSW palette
- **Layout**: Follow CNSW patterns

### CNSW Private Template
- **Fonts**: Same as CNSW
- **Style**: Same as CNSW with private branding
- **Colors**: CNSW palette
- **Layout**: Same as CNSW

---

## 📊 Implementation Priority

### High Priority (Most Used)
1. **classic** - Commonly used template
2. **thunder** - Popular template
3. **brickwork** - Frequently used

### Medium Priority
4. **sixers** - Used for specific clients
5. **twoColumnClassic** - Specialized layout

### Lower Priority (Specialized)
6. **cnsw** - Regional template
7. **cnsw-private** - Private variant

---

## 🔍 Testing Checklist Per Template

For each template implementation, verify:

- [ ] All 12 players display correctly
- [ ] 2-column grid layout works
- [ ] Logo displays correctly (full height, covers area)
- [ ] Player info (type, name, team) displays correctly
- [ ] Stats display correctly:
  - [ ] Batting stats: `runs* (balls)` with smaller balls
  - [ ] Bowling stats: `wickets/runs (overs)` with smaller overs
  - [ ] Top All-Rounder shows two rows
  - [ ] 12th Man shows two rows
- [ ] Position-based stat display works:
  - [ ] Batting positions show batting stats
  - [ ] Bowling positions show bowling stats
- [ ] Typography matches template style
- [ ] Colors match template palette
- [ ] Animations work correctly
- [ ] Sponsor footer displays
- [ ] Composition loads in Remotion Studio
- [ ] Test data renders correctly

---

## 📚 Reference Files

### Core Implementation Files (Basic Template)
- `src/compositions/cricket/TeamOfTheWeek/types.ts`
- `src/compositions/cricket/TeamOfTheWeek/basic.tsx`
- `src/compositions/cricket/TeamOfTheWeek/controller/TeamOfTheWeekDisplay/display-Basic.tsx`
- `src/compositions/cricket/TeamOfTheWeek/controller/PlayerRow/row-Basic.tsx`

### Typography Components (Shared)
- `src/compositions/cricket/utils/primitives/TeamOfTheWeekPlayerName.tsx`
- `src/compositions/cricket/utils/primitives/TeamOfTheWeekTeam.tsx`
- `src/compositions/cricket/utils/primitives/TeamOfTheWeekType.tsx`
- `src/compositions/cricket/utils/primitives/TeamOfTheWeekStat.tsx`

### Theme Files (Per Template)
- `src/templates/variants/{template}/theme.ts`

### Integration Files
- `src/compositions/cricket/TeamOfTheWeek/index.tsx`
- `src/compositions/cricket/index.tsx`
- `src/core/utils/routing.tsx`

---

## 🚀 Quick Start Guide

### For Each New Template:

1. **Copy Basic Template Files:**
   ```bash
   # Display component
   cp display-Basic.tsx display-{template}.tsx

   # Player row component
   cp row-Basic.tsx row-{template}.tsx

   # Entry point
   cp basic.tsx {template}.tsx
   ```

2. **Update Theme:**
   - Open `src/templates/variants/{template}/theme.ts`
   - Add TeamOfTheWeek typography styles
   - Adjust to match template aesthetic

3. **Update Components:**
   - Update imports in new component files
   - Adjust styling to match template
   - Update component names

4. **Register:**
   - Export from `index.tsx`
   - Register in `cricket/index.tsx`

5. **Test:**
   - Load in Remotion Studio
   - Verify all functionality
   - Check styling matches template

---

## 📝 Notes

- All templates use the same typography components (TeamOfTheWeekPlayerName, etc.)
- Only theme styling differs between templates
- Layout structure remains consistent (single-row with logo, info, stats)
- Stats display logic is shared across all templates
- Position-based stat display is consistent across templates

---

## ✅ Completion Status

- [x] Basic Template - **COMPLETE**
- [ ] Classic Template
- [ ] Thunder Template
- [ ] Brickwork Template
- [ ] Sixers Template
- [ ] Two Column Classic Template
- [ ] CNSW Template
- [ ] CNSW Private Template

---

**Last Updated:** 2025-01-XX
**Status:** Basic template complete, planning for remaining templates


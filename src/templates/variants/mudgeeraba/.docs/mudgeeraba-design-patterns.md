# Mudgeeraba Design Patterns & Implementation Guide

**Created:** 2026-02-10  
**Purpose:** Comprehensive guide to Mudgeeraba variant design patterns, component structure, and implementation principles established during player stats component development.

---

## 📋 Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Component Organization](#component-organization)
3. [Key Design Patterns](#key-design-patterns)
4. [Player Stats Component Implementation](#player-stats-component-implementation)
5. [Styling Guidelines](#styling-guidelines)
6. [File Organization Rules](#file-organization-rules)
7. [Theme Integration](#theme-integration)
8. [Best Practices](#best-practices)

---

## 🎨 Design Philosophy

The Mudgeeraba variant follows a **"dirty, rough, raw"** aesthetic characterized by:

- **Angular geometric shapes** using CSS `clip-path`
- **Bold, contrasting colors** (dark backgrounds with bright accents)
- **Asymmetric layouts** with mirrored elements
- **Minimal padding** with strategic spacing
- **Raw typography** using fonts like "Rubik Dirt" and "Heebo"

### Core Visual Principles

1. **Angular Elements**: Use `clip-path` to create trapezoidal and angled shapes
2. **Mirrored Design**: Left and right columns mirror each other's angles
3. **High Contrast**: Dark backgrounds (`selectedPalette.background.main`) with light content areas
4. **Strategic Padding**: Outer edges get more padding, inner edges get less
5. **Natural Heights**: Prefer natural content height over fixed heights where possible

---

## 📁 Component Organization

### File Structure Rule

**CRITICAL:** Do not create new root-level folders for variant components. Place them in existing parent folders:

```
src/compositions/cricket/results/layout/Sections/
├── MatchHeader/
│   ├── MudgeerabaSingleTeamHeader.tsx      ✅ Correct
│   └── MudgeerabaClubHeader.tsx            ✅ Correct
├── PlayerStats/
│   ├── PlayerStats-SingleTeamOnly-Mudgeeraba.tsx        ✅ Correct
│   └── PlayerStats-SingleTeamOnly-Mudgeeraba-clubOnly.tsx  ✅ Correct
└── MatchStatus/
    └── MudgeerabaStatusFooter.tsx          ✅ Correct
```

**If components are truly common across multiple sections**, create a `_common/` folder within the relevant parent directory.

### Naming Convention

- **Variant-specific components**: `{ComponentName}-Mudgeeraba.tsx` or `Mudgeeraba{ComponentName}.tsx`
- **Club-only variants**: `{ComponentName}-Mudgeeraba-clubOnly.tsx`
- **Association variants**: `{ComponentName}-Mudgeeraba.tsx` (default)

---

## 🔑 Key Design Patterns

### 1. Angled Edges with Clip-Path

**Pattern:** Use CSS `clip-path` to create trapezoidal shapes with angled edges.

**Left Column Pattern:**
```typescript
const CLIP_LEFT_COLUMN = "polygon(0% 0%, 100% 0%, 90% 100%, 0% 100%)";
// Straight left edge, angled right edge (bottom-right pointed)
```

**Right Column Pattern (Mirrored):**
```typescript
const CLIP_RIGHT_COLUMN = "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)";
// Angled left edge (top-left pointed), straight right edge
```

**Implementation:**
```tsx
<div
  style={{
    clipPath: isLeftColumn ? CLIP_LEFT_COLUMN : CLIP_RIGHT_COLUMN,
  }}
>
```

### 2. Mirrored Padding

**Pattern:** Outer edges get more padding, inner edges get less to create visual balance.

**Left Column:**
- `pl-4` or `pl-8` (more padding on left/outer edge)
- `pr-10` or `pr-2` (less padding on right/inner edge)

**Right Column (Mirrored):**
- `pl-12` or `pl-2` (less padding on left/inner edge)
- `pr-3` or `pr-8` (more padding on right/outer edge)

**Example:**
```tsx
className={`... ${isLeftColumn ? 'pl-4 pr-10' : 'pl-12 pr-3'}`}
```

### 3. Two-Column Layout

**Pattern:** Split content into two equal columns with minimal gap.

```tsx
<div className="flex w-full relative">
  {/* Left Column */}
  <div className="flex flex-col flex-1">
    {/* Content */}
  </div>
  
  {/* Right Column */}
  <div className="flex flex-col flex-1">
    {/* Content */}
  </div>
</div>
```

### 4. Natural Height with Gap Spacing

**Pattern:** Use Tailwind `gap-4` for vertical spacing instead of fixed heights.

```tsx
<div className="flex flex-col flex-1 gap-4">
  {/* Rows automatically spaced */}
</div>
```

### 5. Container Spacing

**Pattern:** Use `my-4` and `mx-4` on parent containers to push content away from adjacent elements.

```tsx
<AnimatedContainer
  className="w-full relative my-4 mx-4"
  // ...
>
```

---

## 📊 Player Stats Component Implementation

### Component Structure

```
PlayerStatsSingleTeamOnlyMudgeeraba
├── AnimatedContainer (parent wrapper)
│   └── flex container
│       ├── StatsColumn (batting - left)
│       │   └── PlayerStatRow × 2
│       └── StatsColumn (bowling - right)
│           └── PlayerStatRow × 2
```

### Key Implementation Details

#### 1. Player Stat Row

**Location:** `PlayerStats-SingleTeamOnly-Mudgeeraba.tsx`

**Features:**
- Angled edge based on column position
- Mirrored padding
- White background (`selectedPalette.container.backgroundTransparent.high`)
- Uses `truncatePlayerName()` for name formatting (not `truncateText()`)

**Code Pattern:**
```tsx
const PlayerStatRow: React.FC<{
  playerName: string;
  statValue: string;
  delay: number;
  index: number;
  isLeftColumn: boolean;
}> = ({ playerName, statValue, delay, index, isLeftColumn }) => {
  const { selectedPalette } = useThemeContext();
  const rowBg = selectedPalette.container.backgroundTransparent.high;

  return (
    <div
      className={`flex justify-between items-center py-2 relative overflow-hidden ${
        isLeftColumn ? "pl-4 pr-10" : "pl-12 pr-3"
      }`}
      style={{
        backgroundColor: rowBg,
        clipPath: isLeftColumn ? CLIP_LEFT_COLUMN : CLIP_RIGHT_COLUMN,
      }}
    >
      <ResultPlayerName
        value={truncatePlayerName(playerName, MAX_NAME_LENGTH)}
        variant="onContainerCopy"
      />
      <ResultPlayerScore value={statValue} variant="onContainerCopy" />
    </div>
  );
};
```

#### 2. Stats Column

**Features:**
- Displays exactly 2 players (pads with null if needed)
- Uses `gap-4` for vertical spacing
- Formats stats based on batting/bowling type

**Code Pattern:**
```tsx
const StatsColumn: React.FC<{
  players: PlayerStat[];
  isBatting: boolean;
  delay: number;
  isLeftColumn: boolean;
}> = ({ players, isBatting, delay, isLeftColumn }) => {
  const displayPlayers = [
    ...players.slice(0, 2),
    ...Array(Math.max(0, 2 - players.length)).fill(null)
  ].slice(0, 2);

  return (
    <div className="flex flex-col flex-1 gap-4">
      {displayPlayers[0] && (
        <PlayerStatRow
          playerName={displayPlayers[0].player}
          statValue={formatStat(displayPlayers[0])}
          delay={delay}
          index={0}
          isLeftColumn={isLeftColumn}
        />
      )}
      {displayPlayers[1] && (
        <PlayerStatRow
          playerName={displayPlayers[1].player}
          statValue={formatStat(displayPlayers[1])}
          delay={delay}
          index={1}
          isLeftColumn={isLeftColumn}
        />
      )}
    </div>
  );
};
```

#### 3. Stat Formatting

**Batting Stats:**
```typescript
function formatBattingStat(p: PlayerStat): string {
  return `${p.runs}${p.notOut ? "*" : ""} (${p.balls ?? 0})`;
}
```

**Bowling Stats:**
```typescript
function formatBowlingStat(p: PlayerStat): string {
  return `${p.wickets ?? 0}/${p.runs} (${p.overs ?? 0})`;
}
```

#### 4. Player Name Truncation

**CRITICAL:** Always use `truncatePlayerName()`, not `truncateText()`.

```typescript
import { truncatePlayerName } from "../../../../utils/utils-text";

// Correct
value={truncatePlayerName(playerName, MAX_NAME_LENGTH)}

// Wrong - don't use truncateText for player names
value={truncateText(playerName, MAX_NAME_LENGTH)}
```

**Why:** `truncatePlayerName()` formats names as "J. Smith" (first initial + last name), which is the Mudgeeraba style.

---

## 🎨 Styling Guidelines

### Color Usage

**Backgrounds:**
- **Main background:** `selectedPalette.background.main` (dark blue)
- **Content containers:** `selectedPalette.container.backgroundTransparent.high` (white/light)

**Text Colors:**
- **On containers:** `variant="onContainerCopy"` (black/dark)
- **On backgrounds:** `variant="onBackground"` (light)

**Primary Accent:**
- Use `colors.primary` from `useThemeContext()` for accent elements

### Spacing Scale

- **Gap between rows:** `gap-4` (16px)
- **Container margins:** `my-4 mx-4` (16px vertical, 16px horizontal)
- **Row padding:** `py-2` (8px vertical)
- **Column padding:** See [Mirrored Padding](#2-mirrored-padding) pattern

### Typography

- **Main font:** "Rubik Dirt" (via `fontClasses.title?.family`)
- **Copy font:** "Heebo" (via `fontClasses.copy?.family`)
- **Player names:** Use `ResultPlayerName` component with `truncatePlayerName()`
- **Scores:** Use `ResultPlayerScore` component

---

## 📂 File Organization Rules

### Rule: No New Root-Level Folders

**DO:**
```
Sections/MatchHeader/MudgeerabaSingleTeamHeader.tsx
Sections/PlayerStats/PlayerStats-SingleTeamOnly-Mudgeeraba.tsx
```

**DON'T:**
```
Mudgeeraba/MatchHeader.tsx
Mudgeeraba/PlayerStats.tsx
```

### Common Components

If components are shared across multiple sections, create a `_common/` folder:

```
Sections/_common/MudgeerabaAngularDivider.tsx
```

### Type Definitions

Keep types close to components:

```
Sections/MatchHeader/_types/MudgeerabaSingleTeamHeaderProps.ts
Sections/PlayerStats/_types/PlayerStatsProps.ts
```

### Helper Functions

Keep helpers in `_utils/` folders:

```
Sections/MatchHeader/_utils/mudgeeraba-helpers.ts
Sections/PlayerStats/_utils/helpers.ts
```

---

## 🎯 Theme Integration

### Accessing Theme Values

```tsx
const { 
  selectedPalette,  // Color palettes
  colors,           // Primary colors
  fontClasses       // Font families
} = useThemeContext();
```

### Common Theme Patterns

**Background Colors:**
```tsx
const backgroundColorMain = selectedPalette.background.main;
const backgroundColorContainer = selectedPalette.container.backgroundTransparent.high;
const primaryColor = colors.primary;
```

**Font Families:**
```tsx
style={{ fontFamily: fontClasses.title?.family }}  // Rubik Dirt
style={{ fontFamily: fontClasses.copy?.family }}   // Heebo
```

---

## ✅ Best Practices

### 1. Component Extraction

- Extract reusable sub-components (e.g., `PlayerStatRow`, `StatsColumn`)
- Keep components focused on a single responsibility
- Use TypeScript interfaces for props

### 2. Constants

- Define clip-path constants at the top of the file
- Use descriptive constant names (`CLIP_LEFT_COLUMN`, `CLIP_RIGHT_COLUMN`)
- Define magic numbers as constants (`MAX_NAME_LENGTH = 20`)

### 3. Animation Delays

- Use incremental delays for staggered animations
- Pattern: `delay + 10 + index * 5`
- Separate delays for different sections (e.g., `delay + 5` for second column)

### 4. Conditional Rendering

- Use `&&` for conditional rendering
- Handle null/empty states gracefully
- Pad arrays to ensure consistent layout

### 5. Type Safety

- Define TypeScript interfaces for all props
- Use proper types for player data
- Avoid `any` types

### 6. Code Organization

- Group related functions together
- Keep formatting functions separate from components
- Use descriptive function names (`formatBattingStat`, `formatBowlingStat`)

---

## 📝 Implementation Checklist

When creating a new Mudgeeraba component:

- [ ] Place component in correct parent folder (not new root folder)
- [ ] Use variant-specific naming (`Mudgeeraba{Name}` or `{Name}-Mudgeeraba`)
- [ ] Implement angled edges with `clip-path` if needed
- [ ] Apply mirrored padding pattern
- [ ] Use theme colors (`selectedPalette`, `colors.primary`)
- [ ] Use `truncatePlayerName()` for player names
- [ ] Add proper TypeScript types
- [ ] Use `gap-4` for vertical spacing
- [ ] Add `my-4 mx-4` to parent containers
- [ ] Test with both left and right column variants
- [ ] Verify animations and delays

---

## 🔗 Related Files

### Components Created Today

- `src/compositions/cricket/results/layout/Sections/PlayerStats/PlayerStats-SingleTeamOnly-Mudgeeraba.tsx`
- `src/compositions/cricket/results/layout/Sections/PlayerStats/PlayerStats-SingleTeamOnly-Mudgeeraba-clubOnly.tsx`
- `src/compositions/cricket/results/layout/MatchCard/card-Mudgeeraba.tsx`
- `src/compositions/cricket/results/layout/MatchCard/card-Mudgeeraba-clubOnly.tsx`

### Supporting Components

- `src/compositions/cricket/results/layout/Sections/MatchHeader/MudgeerabaSingleTeamHeader.tsx`
- `src/compositions/cricket/results/layout/Sections/MatchStatus/MudgeerabaStatusFooter.tsx`

### Utilities

- `src/compositions/cricket/results/layout/Sections/PlayerStats/_utils/helpers.ts` (contains `truncatePlayerName`)
- `src/compositions/cricket/results/layout/Sections/MatchHeader/_utils/mudgeeraba-helpers.ts`

---

## 📚 Additional Resources

- **Theme Configuration:** `src/templates/variants/mudgeeraba/theme.ts`
- **Animation Configuration:** `src/templates/variants/mudgeeraba/animations.ts`
- **File Organization Rule:** `src/compositions/cricket/results/layout/MatchCard/.docs/file-organization-rule.md`

---

**Last Updated:** 2026-02-10  
**Author:** Design System Documentation

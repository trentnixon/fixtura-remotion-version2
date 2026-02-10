# BrickWork Template Styling Review & Recommendations

**Date:** 2025-12-17
**Purpose:** Review Top5 BrickWork layout/design and provide recommendations for TeamOfTheWeek adaptation

---

## 📋 Top5 BrickWork Analysis

### Layout Structure

#### Display Component (`display-BrickWork.tsx`)

- **Layout:** Single column (`grid grid-cols-1`)
- **Container:** `mx-16 py-32` (64px horizontal margin, 128px vertical padding)
- **Gap:** `gap-2` (8px between rows)
- **Row Height:** Dynamically calculated based on player count

#### Player Row Component (`PlayerRowNameLogoWrapperValue.tsx`)

- **Grid:** 12-column grid (`grid grid-cols-12`)
- **Column Distribution:**
  - Player Info: `col-span-7` (left)
  - Logo: `col-span-2` (middle)
  - Stats: `col-span-3` (right)
- **Padding:** `p-2` (8px all around)
- **Border Radius:** `rounded-none` (no rounding)
- **Border:** `borderBottom: 2px solid ${primary}` (bottom accent line)

### Styling Details

#### Background Colors

```typescript
const isTopPlayer = index === 0;
const bgColor = isTopPlayer
  ? selectedPalette.container.backgroundTransparent.strong
  : selectedPalette.container.backgroundTransparent.medium;

const LogoBG = isTopPlayer
  ? selectedPalette.container.backgroundTransparent.strong
  : selectedPalette.container.backgroundTransparent.medium;

const contrastBG = selectedPalette.container.backgroundTransparent.strong;
```

**Pattern:**

- Main row: `strong` for top player, `medium` for others
- Logo section: `strong` (always)
- Stats section: Same as main row (`strong` for top, `medium` for others)

#### Logo Implementation

- **Component:** Uses `TeamLogo` primitive component (not `Img`)
- **Wrapper:** `w-30 h-30` (fixed size container)
- **Size prop:** `size={20}` passed to TeamLogo component
- **Background:** `contrastBG` (always `strong`)

#### Typography

- **Player Name:** `Top5PlayerName` - `text-4xl font-black tracking-wide leading-snug`
- **Team Name:** `Top5PlayerTeam` - `text-2xl font-normal tracking-wider leading-tight`
- **Stats:** `Top5PlayerScore` + `Top5PlayerScoreSuffix` - `text-6xl font-bold` + `text-2xl font-normal`

#### Animation Container

- **Wrapper:** `AnimatedContainer` with `rounded-lg` class
- **Inner div:** `rounded-none` (overrides wrapper rounding)
- **Purpose:** Animation wrapper has rounded corners, but inner content is square

---

## 🔍 Current TeamOfTheWeek BrickWork Implementation

### Differences from Top5

#### ✅ Intentional Differences (Correct)

1. **Layout:** 2-column grid (`grid-cols-2`) instead of single column

   - **Reason:** TeamOfTheWeek displays all 12 players on one screen
   - **Status:** ✅ Correct

2. **Position Label:** Additional `TeamOfTheWeekType` component above player name

   - **Reason:** TeamOfTheWeek has position categories (Top Scorer, Most Wickets, etc.)
   - **Status:** ✅ Correct

3. **Stats Complexity:** Supports dual stats for all-rounders
   - **Reason:** All-rounders need batting + bowling stats
   - **Status:** ✅ Correct

#### ⚠️ Potential Issues / Inconsistencies

1. **AnimatedContainer Wrapper**

   - **Top5:** Uses `rounded-lg` on AnimatedContainer
   - **TotW:** Uses `rounded-lg` on AnimatedContainer ✅
   - **Status:** ✅ Matches

2. **Inner Border Radius**

   - **Top5:** Explicitly `rounded-none` on inner div
   - **TotW:** Uses `layout.borderRadius.container` (which is `rounded-none`)
   - **Status:** ✅ Matches (but less explicit)

3. **Logo Implementation**

   - **Top5:** Uses `TeamLogo` component with `size={20}` prop
   - **TotW:** Uses `Img` directly with `w-full h-full`
   - **Issue:** Different approach - Top5 uses a primitive component
   - **Recommendation:** Consider using `TeamLogo` for consistency, OR keep `Img` if it works better for club logos

4. **Logo Container Sizing**

   - **Top5:** `w-30 h-30` wrapper with `size={20}` TeamLogo
   - **TotW:** `w-full h-full` wrapper with full-size `Img`
   - **Issue:** Top5 constrains logo size, TotW lets it fill
   - **Recommendation:** Test both approaches, but Top5's constrained size might prevent logo overflow

5. **Background Color Logic**

   - **Top5:** Logo section always uses `strong`, stats section matches main row
   - **TotW:** Logo section uses `strong`, stats section uses `logoBG` (which matches main row)
   - **Status:** ✅ Matches logic, but variable naming could be clearer

6. **Display Container Padding**
   - **Top5:** `mx-16 py-32` (64px/128px)
   - **TotW:** `mx-16 py-32` (64px/128px)
   - **Status:** ✅ Matches

---

## 💡 Recommendations

### High Priority

#### 1. Logo Component Consistency

**Current:** TeamOfTheWeek uses `Img` directly
**Recommendation:** Consider using `TeamLogo` primitive component for consistency with Top5

**Pros:**

- Consistent with Top5 pattern
- Built-in sizing and animation support
- Handles logo edge cases better

**Cons:**

- TeamOfTheWeek uses `club.logo` structure (might need adapter)
- `Img` gives more direct control

**Decision:** Test both approaches. If `Img` works well and provides better control, keep it. If logos are inconsistent, switch to `TeamLogo`.

#### 2. Logo Container Sizing

**Current:** `w-full h-full` allows logo to fill entire section
**Recommendation:** Consider constraining logo size like Top5 (`w-30 h-30` or similar)

**Reason:** Prevents oversized logos from breaking layout, especially with varying logo aspect ratios.

**Implementation:**

```tsx
// Option 1: Constrain like Top5
<div className="w-30 h-30 overflow-hidden">
  <Img src={...} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
</div>

// Option 2: Keep current (full size)
<div className="w-full h-full overflow-hidden">
  <Img src={...} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
</div>
```

### Medium Priority

#### 3. Explicit Border Radius

**Current:** Uses `layout.borderRadius.container`
**Recommendation:** Use explicit `rounded-none` for clarity

**Reason:** Makes it immediately clear that BrickWork uses no border radius, matching Top5 pattern.

**Change:**

```tsx
// From:
className={`grid grid-cols-12 p-2 items-center h-full overflow-hidden ${layout.borderRadius.container}`}

// To:
className="grid grid-cols-12 p-2 items-center h-full overflow-hidden rounded-none"
```

#### 4. Background Color Variable Naming

**Current:** `statsBG = logoBG`
**Recommendation:** Use more descriptive names or match Top5 pattern exactly

**Top5 Pattern:**

```typescript
const LogoBG = isTopPlayer ? strong : medium;
// Stats section uses LogoBG
```

**TotW Pattern:**

```typescript
const logoBG = isTopPlayer ? strong : medium;
const statsBG = logoBG; // Same value
```

**Recommendation:** Keep current pattern but add comment explaining the relationship.

### Low Priority

#### 5. Display Container Spacing

**Current:** `mx-16 py-32` matches Top5
**Recommendation:** Consider if 2-column layout needs different spacing

**Note:** Top5 uses single column, so wide margins work. TotW uses 2 columns, so might benefit from tighter margins (`mx-4` or `mx-8`) to give more space for content.

**Test:** Compare visual spacing with Top5 and adjust if needed.

#### 6. Row Height Calculation

**Current:** Fixed `rowHeight={110}`
**Top5:** Dynamically calculated based on player count

**Recommendation:** For 2-column layout with fixed 12 players, fixed height is fine. But if player count varies, consider dynamic calculation.

---

## ✅ What's Working Well

1. **Grid Layout:** 12-column grid structure matches Top5 perfectly
2. **Border Accent:** Border-bottom implementation matches Top5
3. **Column Distribution:** Player Info (7) → Logo (2) → Stats (3) matches Top5
4. **Typography Integration:** TeamOfTheWeek typography components properly integrated
5. **Animation Pattern:** Stagger delays and animation timing match Top5
6. **Background Colors:** Logic matches Top5 (strong for top, medium for others)

---

## 🎯 Action Items

### Immediate

- [x] Constrain logo size to `w-30 h-30` (matching Top5 pattern)
- [x] Use explicit `rounded-none` instead of `layout.borderRadius.container`
- [x] Improve background color variable naming and add comments
- [ ] Test logo sizing with various logo aspect ratios
- [ ] Compare visual spacing with Top5 in Remotion Studio

### Future Considerations

- [ ] Consider switching to `TeamLogo` component if logo issues arise
- [ ] Evaluate if display container margins need adjustment for 2-column layout
- [ ] Document why `Img` was chosen over `TeamLogo` (if keeping current approach)

---

## 📝 Summary

The TeamOfTheWeek BrickWork implementation is **largely consistent** with Top5 BrickWork patterns. The main differences are intentional (2-column layout, position labels, dual stats).

**Key Recommendations:**

1. Consider constraining logo size to prevent overflow
2. Use explicit `rounded-none` for clarity
3. Test logo rendering with various aspect ratios
4. Consider display container spacing for 2-column layout

The implementation follows the Top5 pattern well and maintains visual consistency while accommodating TeamOfTheWeek's unique requirements.

# TeamOfTheWeek - Quick Reference Card

**Fast lookup for common tasks and critical information**

---

## 🎯 Critical Information

| Property | Value |
|----------|-------|
| **Composition ID** | `CricketTeamOfTheWeek` |
| **Export Name** | `CricketTeamOfTheWeek` (must match!) |
| **Test Data Path** | `testData/samples/Cricket/Cricket_TeamOfTheWeek.json` |
| **Items Per Screen** | 2 (configurable) |
| **Total Players** | 10 |
| **Categories** | Batter, Bowler, All-Rounder, Twelfth Man |

---

## 📋 Implementation Checklist

### Phase 1: Foundation
- [ ] Create `types.ts` - Define TypeScript interfaces
- [ ] Register test data in `testData/index.ts`
- [ ] Verify test data in Studio

### Phase 2: Basic Template
- [ ] Create `basic.tsx` - Main template file
- [ ] Create `controller/TeamOfTheWeekDisplay/display-Basic.tsx`
- [ ] Create `controller/PlayerRow/row-Basic.tsx`
- [ ] Create `index.tsx` - Export template
- [ ] Register in `cricket/index.tsx`

### Phase 3: Test & Refine
- [ ] Test in Studio: `Basic-Solid-CricketTeamOfTheWeek`
- [ ] Verify all 10 players render
- [ ] Check screen transitions
- [ ] Validate animations

### Phase 4: Additional Variants
- [ ] BrickWork variant
- [ ] Classic variant
- [ ] ClassicTwoColumn variant
- [ ] CNSW variants
- [ ] Sixers/Thunder variant

### Phase 5: Polish
- [ ] Create NoData module
- [ ] Add utilities (if needed)
- [ ] Test all edge cases
- [ ] Update all documentation

---

## 🔧 Common Code Snippets

### Read Items Per Screen
```typescript
const itemsPerScreen =
  videoMeta.video.contentLayout.divideFixturesBy.CricketTeamOfTheWeek || 5;
```

### Calculate Total Screens
```typescript
const totalScreens = Math.ceil(players.length / itemsPerScreen);
```

### Get Items for Current Screen
```typescript
const displayedPlayers = getItemsForScreen(
  players,
  screenIndex,
  itemsPerScreen
);
```

### Staggered Animation Delay
```typescript
animationDelay={index * 5}  // 5 frames per item
```

---

## 📊 Data Structure Quick Ref

### Player Object Structure
```typescript
{
  rank: number;
  player: string;              // "name (c)" or "name (vc)"
  category: "Batter" | "Bowler" | "All-Rounder" | "Twelfth Man";
  categoryDetail: {
    type: string;
    position: string;          // topscorer, higheststrikerate, etc.
  };
  primaryTeam: string;
  club: {
    name: string;
    logo: { url, width, height };
  };

  // Optional - depends on category
  batting?: {
    runs, balls, fours, sixes, strikeRate, notOut, team
  };
  bowling?: {
    wickets, overs, maidens, runs, economy, team
  };
  allRounder?: {
    score, formula, battingContribution, bowlingContribution
  };
  rankings: {
    topRunScorer?, highestStrikeRate?, mostWickets?,
    bestEconomy?, topAllRounder?
  };
}
```

### Type Guards
```typescript
if (player.batting) { /* show batting stats */ }
if (player.bowling) { /* show bowling stats */ }
if (player.allRounder) { /* show combined stats */ }
```

---

## 🔗 File Locations

### This Asset
```
src/compositions/cricket/TeamOfTheWeek/
```

### Test Data
```
testData/samples/Cricket/Cricket_TeamOfTheWeek.json
testData/index.ts  (registration)
```

### Registration
```
src/compositions/cricket/index.tsx  (export CricketTeamOfTheWeek)
```

### Contexts (Import From)
```
src/core/context/ThemeContext.tsx
src/core/context/AnimationContext.tsx
src/core/context/FontContext.tsx
```

### Base Template
```
src/templates/base/BaseTemplateLayout.tsx
src/templates/base/components/intro/IntroScreen.tsx
src/templates/base/components/outro/OutroScreen.tsx
```

---

## ⚡ Quick Commands

### Start Development
```bash
npm run dev
```

### Find Your Composition
Look for: `Basic-Solid-CricketTeamOfTheWeek`

### Validate JSON
```bash
node -e "JSON.parse(require('fs').readFileSync('testData/samples/Cricket/Cricket_TeamOfTheWeek.json'))"
```

---

## 🚨 Common Issues & Fixes

### Composition Not Found
**Fix:** Check `compositionId` in JSON matches export name

### Wrong Screen Count
**Fix:** Verify `FPS_MAIN` calculation: `totalScreens × framesPerScreen`

### Data Not Displaying
**Fix:** Check type guards and optional chaining

### Animation Issues
**Fix:** Verify `animationDelay` calculation and Sequence timing

### Images Not Loading
**Fix:** Verify URLs are valid and accessible

---

## 📐 Standard Dimensions

| Element | Value |
|---------|-------|
| **Video Width** | 1080px |
| **Video Height** | 1350px |
| **FPS** | 30 |
| **Row Height** (Basic) | 115px |
| **Default Items/Screen** | 5 |

---

## 🎨 Template Variants Mapping

| Variant Name | Display File | Row File |
|--------------|--------------|----------|
| Basic | `display-Basic.tsx` | `row-Basic.tsx` |
| BrickWork | `display-BrickWork.tsx` | `row-BrickWork.tsx` |
| Classic | `display-Classic.tsx` | `row-Classic.tsx` |
| ClassicTwoColumn | `display-ClassicTwoColumn.tsx` | `row-ClassicTwoColumn.tsx` |
| CNSW | `display-CNSW.tsx` | `row-CNSW.tsx` |
| CNSW Private | `display-CNSW-private.tsx` | `row-CNSW-private.tsx` |
| Sixers/Thunder | `display-SixersThunder.tsx` | `row-SixersThunder.tsx` |

---

## 📚 Documentation Navigation

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **README.md** | Overview | Start here (humans) |
| **readMe.md** | Technical | Start here (AI) |
| **DevelopmentRoadMap.md** | Progress | Check status |
| **Tickets.md** | Tasks | Plan work |
| **ASSET_CREATION_GUIDE.md** | Tutorial | Learn process |
| **TEST_DATA_INTEGRATION_GUIDE.md** | Data setup | Understand JSON |
| **QUICK_REFERENCE.md** | Quick lookup | This file! |

---

## 🔍 Reference Assets

### Performances (Most Similar)
```
src/compositions/cricket/performances/
```
- Multi-stat display
- Batting/bowling data
- Screen pagination

### Results
```
src/compositions/cricket/results/
```
- Card-based layout
- Multi-screen handling

### Ladder
```
src/compositions/cricket/ladder/
```
- Tabular data
- Ranking displays

---

## 💡 Quick Tips

1. **Always use type guards** for conditional data (batting/bowling)
2. **Read itemsPerScreen** from `contentLayout.divideFixturesBy`
3. **Match compositionId** exactly (case-sensitive!)
4. **Stagger animations** using `index * delay`
5. **Test with edge cases** (0 items, 1 item, many items)
6. **Follow existing patterns** from performances asset
7. **Update docs** as you code
8. **Use optional chaining** for nullable fields

---

## 🎯 One-Command Test

After implementing, verify everything works:

```bash
npm run dev
# → Open Studio
# → Find "Basic-Solid-CricketTeamOfTheWeek"
# → Click and verify rendering
```

---

## 📞 Need More Info?

- **Full tutorial:** [ASSET_CREATION_GUIDE.md](./ASSET_CREATION_GUIDE.md)
- **Data structure:** [TEST_DATA_INTEGRATION_GUIDE.md](./TEST_DATA_INTEGRATION_GUIDE.md)
- **Current tasks:** [DevelopmentRoadMap.md](./DevelopmentRoadMap.md)
- **Detailed planning:** [Tickets.md](./Tickets.md)

---

**Pro Tip:** Bookmark this page for quick reference during development! 🚀


# Classic Template Styling Learnings - Top5 vs TeamOfTheWeek

## Research: Top5 Classic Player Row Styling

### Layout Structure

- **Grid System**: Uses 12-column grid (`grid grid-cols-12`)
- **Column Distribution**:
  - Name & Team: `col-span-7` (left side, flex column)
  - Logo: `col-span-2` (middle, centered)
  - Stat: `col-span-3` (right side, centered)

### Styling Details

#### Container

- **Padding**: `p-2` on main container
- **Border Radius**: Uses `layout.borderRadius.container` (from theme)
- **Height**: Dynamic via `rowHeight` prop
- **Background**: `selectedPalette.container.backgroundTransparent.strong`

#### Background Colors

1. **Main Row Background**: `selectedPalette.container.backgroundTransparent.strong`
2. **Logo Section**: `selectedPalette.container.backgroundTransparent.strong` (contrastBG)
3. **Stat Section**: `selectedPalette.container.primary` (LogoBG)

#### Typography Components Used

- `Top5PlayerName` - for player name
- `Top5PlayerTeam` - for team name
- `Top5PlayerScore` - for main stat value
- `Top5PlayerScoreSuffix` - for stat suffix (e.g., balls, overs)

#### Animation Delays

- Player Name: `delay + 2`
- Team Name: `delay + 4`
- Logo: `delay + 20`
- Stat: `delay + 20` (main), `delay + 30` (suffix)

#### Layout Structure (from code)

```tsx
<div className="grid grid-cols-12 p-2 items-center h-full overflow-hidden">
  {/* Name & Team - col-span-7 */}
  <div className="col-span-7 flex flex-col justify-center px-2 h-full">
    <Top5PlayerName />
    <Top5PlayerTeam />
  </div>

  {/* Logo - col-span-2 */}
  <div
    className="col-span-2 flex items-center justify-center h-full"
    style={{ background: contrastBG }}
  >
    <TeamLogo />
  </div>

  {/* Stat - col-span-3 */}
  <div
    className="col-span-3 flex items-center justify-center h-full"
    style={{ background: LogoBG }}
  >
    <Top5PlayerScore />
    <Top5PlayerScoreSuffix />
  </div>
</div>
```

---

## Adaptations for TeamOfTheWeek Classic

### Key Differences to Accommodate

1. **Position Label**: TeamOfTheWeek has a position/type label (e.g., "TOP SCORER") that Top5 doesn't have
2. **Logo Position**: TeamOfTheWeek currently has logo on left, but should match Top5 layout
3. **Stat Complexity**: TeamOfTheWeek can have:
   - Single stat (batting or bowling)
   - Two stats (batting + bowling for all-rounders)
4. **Stat Formatting**: Different format (batting: `runs* (balls)`, bowling: `wickets/runs (overs)`)

### Proposed Layout for TeamOfTheWeek Classic

#### Option 1: Match Top5 Exactly (Logo in Middle)

```
[Logo col-2] [Type/Name/Team col-7] [Stats col-3]
```

#### Option 2: Keep Logo on Left (More Space for Info)

```
[Logo col-2] [Type/Name/Team col-6] [Stats col-4]
```

#### Recommended: Option 1 (Match Top5)

- Maintains visual consistency with Top5
- Uses same column distribution
- Stats section can accommodate two rows for all-rounders

### Implementation Plan

1. **Change Grid Layout**: Use `grid grid-cols-12` instead of flex
2. **Column Distribution**:
   - Logo: `col-span-2` (left)
   - Info (Type/Name/Team): `col-span-7` (middle)
   - Stats: `col-span-3` (right)
3. **Background Colors**:
   - Main: `selectedPalette.container.backgroundTransparent.strong`
   - Logo section: `selectedPalette.container.backgroundTransparent.strong`
   - Stats section: `selectedPalette.container.primary`
4. **Padding**: Use `p-2` on main container
5. **Border Radius**: Use `layout.borderRadius.container`
6. **Stats Section**:
   - For single stats: center vertically
   - For all-rounders: stack two rows with gap
   - Use flex column when two stats exist

### Typography Adaptations

- Keep using `TeamOfTheWeekPlayerName`, `TeamOfTheWeekTeam`, `TeamOfTheWeekType`, `TeamOfTheWeekStat`
- These will use Classic theme styles (already defined in `classic/theme.ts`)

---

## Notes

- Top5 uses `PlayerRowNameSixersThunder` layout component
- Classic display uses `PlayerRowSixersThunder` wrapper
- Both use same styling approach with 12-column grid

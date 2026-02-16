# Skill: Cricket Compositions Feature

## Purpose

Guides working with `src/compositions/cricket` as a feature: understanding its composition types, variant system, export structure, routing integration, and how template variants connect to cricket composition implementations. Use when navigating the cricket feature, adding new variants across compositions, or understanding how compositions integrate with the broader Remotion video system.

## Applies To

- `src/compositions/cricket/` (root)
- Composition folders: `ladder`, `results`, `resultSingle`, `top5`, `upcoming`, `teamRoster`, `performances`, `TeamOfTheWeek`
- Shared: `sponsorFooter`, `utils/primitives`, `composition-types`
- Routing: `src/core/utils/routing.tsx`
- Templates: `src/templates/variants/`

## Inputs

- Understanding of Remotion compositions
- Access to `src/compositions/cricket/.docs/how-to-create-cricket-variant.md` for full-variant workflow
- Access to individual composition how-to guides in each `{composition}/.docs/how-to.md`
- Skills for specific compositions: `cricket-ladder-folder`, `cricket-results-folder`, etc.

## Process

### 1. Understand the Composition Types

| Composition | Export Name | Composition IDs (routing) | Purpose |
|-------------|-------------|---------------------------|---------|
| **Ladder** | `CricketLadder` | CricketLadder | Team standings table |
| **Top 5** | `CricketTop5` | CricketTop5Batting, CricketTop5Bowling | Ranked batters/bowlers |
| **Results** | `CricketResults` | CricketResults | Multi-match results (2 per screen) |
| **Result Single** | `CricketResultSingle` | CricketResultSingle | Single match detail |
| **Upcoming** | `CricketUpcoming` | CricketUpcoming | Upcoming fixtures |
| **Roster** | `CricketRoster` | CricketRoster | Team player lists |
| **Performances** | `CricketPerformances` | CricketBattingPerformances, CricketBowlingPerformances | Player performances |
| **Team of the Week** | `CricketTeamOfTheWeek` | CricketTeamOfTheWeek | Selected team of week |

### 2. Understand Cricket Variant vs Template Variant

| Aspect | Template Variant | Cricket Variant |
|--------|------------------|-----------------|
| **What** | Visual style (theme, colors, fonts, animations) | Composition implementation |
| **Location** | `src/templates/variants/{Name}/` | `src/compositions/cricket/{composition}/{variant}.tsx` |
| **Scope** | Global (all sports) | Cricket-specific |
| **Example** | Basic, Classic, Brickwork | basic, classic, brickwork implementations |

**Relationship:** Template defines *how* it looks; cricket composition implements *what* data is shown. Routing resolves `templateId` + `compositionId` → component.

### 3. Export Structure (cricket/index.tsx)

Each composition type exports an object mapping variant keys to components:

```typescript
export const CricketLadder = {
  basic: ladderBasic,
  classic: ladderClassic,
  brickwork: ladderBrickWork,
  sixers: ladderSixersThunder,
  thunder: ladderSixersThunder,  // alias
  twocolumnclassic: ladderClassicTwoColumn,
  cnsw: ladderCNSW,
  cnswprivate: ladderCNSWPrivate,
  mudgeeraba: ladderMudgeeraba,
};
```

**Variant keys** must match template variant IDs (lowercase). Some compositions have fewer variants (e.g. Roster uses `rosterBasic` for both basic and brickwork).

### 4. Routing Flow

1. Request: `sport`, `compositionId`, `templateId`
2. `routing.tsx` maps `compositionId` → export name (e.g. CricketTop5Batting → CricketTop5)
3. Gets `CricketCompositions["CricketTop5"]` → composition object
4. Gets `CricketTop5[templateId]` → component (e.g. `basic` → top5Basic)
5. Renders component with VideoDataContext

**Multi-ID mappings:** CricketTop5Batting and CricketTop5Bowling both use `CricketTop5`; CricketBattingPerformances and CricketBowlingPerformances both use `CricketPerformances`. Composition ID in video metadata determines batting vs bowling.

### 5. Shared Dependencies

- **SponsorFooter**: Used by ladder, results, resultSingle, top5, upcoming, performances, TeamOfTheWeek
- **utils/primitives**: TeamLogo, Top5PlayerName, MetadataSmall, etc. – shared across compositions
- **composition-types**: AssignSponsors, shared interfaces
- **Contexts**: VideoDataContext, ThemeContext, AnimationContext

### 6. Composition Implementation Order (Easy → Hard)

When creating a new cricket variant across all compositions:

1. **Team Roster** – Simplest (player names, logos)
2. **Top 5** – Single column, straightforward
3. **Team of the Week** – 2-column grid, similar to Top 5
4. **Upcoming** – Game cards, metadata
5. **Ladder** – Table, screen pagination
6. **Performances** – Union types, data transformation
7. **Results** – Nested structure, club-only
8. **Result Single** – Most complex, club-only, result statements

### 7. When Adding a New Cricket Variant

1. **Implement each composition** following its `.docs/how-to.md`
2. **Export** from each composition's `index.tsx`
3. **Add to cricket/index.tsx** in each composition object
4. **Verify** template variant exists (or create it first)
5. **Test** each composition with appropriate test data

### 8. Key Files

- **cricket/index.tsx**: Exports all composition objects
- **Routing**: `src/core/utils/routing.tsx` – SPORT_COMPOSITION_TYPES, SPORT_MODULES
- **Variant guide**: `src/compositions/cricket/.docs/how-to-create-cricket-variant.md`

## Output

- Correct understanding of cricket feature structure and composition types
- Ability to navigate to the right composition and follow its skill/guidance
- Understanding of how to add variants across the feature

## Rules

- Export names in cricket/index.tsx must match composition IDs used in routing (CricketLadder, CricketResults, etc.)
- Variant keys (basic, classic, etc.) must match template variant IDs
- Composition IDs in test data JSON must match routing keys
- Each composition has its own skill file for detailed implementation guidance

## References

- Feature variant guide: `src/compositions/cricket/.docs/how-to-create-cricket-variant.md`
- Roadmap: `src/compositions/cricket/.docs/DevelopmentRoadMap.md`
- Routing: `src/core/utils/routing.tsx`
- Composition skills: `.skills/architecture/cricket-{ladder|results|result-single|top5|upcoming|team-roster|team-of-the-week|performances}-folder.md`

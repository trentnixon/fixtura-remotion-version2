# Skill: Core Types Folder

## Purpose

Guides working with `src/core/types`: understanding its structure (data vs sport), how types flow from normalized inputs to compositions, and where to add or extend data schemas. Use when adding new sport types, extending shared data shapes, or debugging type-related composition mapping.

## Applies To

- `src/core/types/` (root)
- `data/`: shared data types (assets, common, match, performance, sponsors, team, userTheme, videoData, root)
- `sport/<sport>/`: sport-specific types (e.g. `sport/cricket/` with results, topBowlers)
- Consumers: VideoDataContext, composition mapping, dataset processing, templates

## Inputs

- Understanding of Fixtura data flow (normalized input → composition)
- Access to `composition-types` for AssignSponsors (match.ts only)
- Folder readMe docs: `types/.docs/readMe.md`, `data/.docs/readMe.md`, `sport/.docs/readMe.md`, `sport/cricket/.docs/readMe.md`

## Process

### 1. Understand the Folder Hierarchy

```
src/core/types/
├── data/                    # shared data types; exported via index.ts
│   ├── index.ts             # barrel: common, team, performance, sponsors, videoData, assets, root
│   ├── root.ts              # FixturaDataset<T>
│   ├── common.ts            # ImageLogo, Theme, TemplateVariation, ThemeData, Account, Timings, Render
│   ├── videoData.ts         # Video, VideoMetadata, VideoAppearance, etc.
│   ├── team.ts              # Team, HomeTeam, AwayTeam
│   ├── performance.ts       # BattingPerformance, BowlingPerformance
│   ├── sponsors.ts           # Sponsor, Logo, SponsorsData, Club
│   ├── assets.ts            # Asset
│   ├── userTheme.ts         # UserTheme
│   └── match.ts             # MatchData (imports composition-types; NOT re-exported)
└── sport/
    └── cricket/
        ├── results.ts       # CricketResultsData, CricketResult, CricketResultsDataset
        └── topBowlers.ts    # TopBowler, TopBowlersDataset
```

### 2. Understand the Base Schema

- **`FixturaDataset<T>`** in `data/root.ts` is the generic dataset shape:
  - `data: T[]`, `asset`, `render`, `account`, `timings`, `frames`, `videoMeta`, `errors`
- Sport-specific types extend FixturaDataset with a concrete `data` type (e.g. CricketResultsDataset)
- Shared types (ImageLogo, UserTheme, Video, Team, etc.) are reused across compositions

### 3. When Adding a New Sport Type

1. Create `sport/<sport>/` folder and `.docs/readMe.md`
2. Add type files (e.g. `results.ts`) extending FixturaDataset where appropriate
3. Import from `../../data/` (root, common, team, userTheme, videoData as needed)
4. Document main exports and dependencies in readMe
5. Update `types/.docs/readMe.md` Child Modules and sport parent readMe

### 4. When Adding or Extending Shared Data Types

1. Add or modify files in `data/` (common, videoData, team, etc.)
2. Add export to `data/index.ts` if the type should be part of the public barrel
3. **Exception**: `match.ts` imports `AssignSponsors` from composition-types; it is intentionally not in the barrel
4. Update `data/.docs/readMe.md` Files section with new exports

### 5. Key Type Flows

| Type Source | Consumed By |
|-------------|-------------|
| data/* | VideoDataContext, datasetProcessing, compositionMapping |
| sport/cricket/* | cricket compositions (results, top5, ladder, bowling) |
| FixturaDataset | All dataset consumers expecting normalized structure |

### 6. Rules for Cross-Dependencies

- **data** → compositions: only `match.ts` imports from `compositions/cricket/_types/composition-types` (AssignSponsors)
- **sport** → data: sport types import shared types from `../../data/`
- Avoid circular references: compositions should not import types from a composition-specific path into shared data unless necessary (match.ts is the exception)

## Output

- Correct understanding of where to add or extend type definitions
- Ability to add sport-specific types or shared data shapes
- Clear path from type definition to VideoDataContext and composition consumption

## Rules

- All shared data types live in `data/`; sport-specific types live in `sport/<sport>/`
- One subfolder per sport under `sport/`
- `FixturaDataset<T>` is the base schema for dataset-shaped types
- Only `match.ts` imports from composition-types; keep this isolated
- Barrel export in `data/index.ts` controls public API; do not export match unless composition-types dependency is acceptable at the barrel level

## References

- types root: `src/core/types/.docs/readMe.md`
- data: `src/core/types/data/.docs/readMe.md`
- sport: `src/core/types/sport/.docs/readMe.md`
- cricket: `src/core/types/sport/cricket/.docs/readMe.md`
- Core roadmap: `src/core/.docs/DevelopmentRoadMap.md`

# Folder Overview

Cricket-specific type definitions extending core data schemas. Used by cricket compositions and data processors.

## Files

- **`results.ts`**: CricketResultsData, CricketResult, CricketResultsDataset
  - Extends FixturaDataset; uses HomeTeam, AwayTeam, ImageLogo, UserTheme, Video
- **`topBowlers.ts`**: TopBowler, TopBowlersDataset
  - Extends FixturaDataset; uses ImageLogo

## Relations

- Parent folder: [../.docs/readMe.md](../.docs/readMe.md)
- Key dependencies: `../../data/` (root, common, team, userTheme, videoData)
- Consumed by: cricket results composition, cricket top5/bowling compositions, dataset processing

## Dependencies

- Internal: `../../data`
- External: TypeScript

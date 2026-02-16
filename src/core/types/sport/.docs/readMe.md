# Folder Overview

Sport-specific type definitions that extend core data schemas from `data/`. One subfolder per sport.

## Child Modules

- **`cricket/`**: CricketResultsData, CricketResult, CricketResultsDataset; TopBowler, TopBowlersDataset

## Relations

- Parent folder: [../.docs/readMe.md](../.docs/readMe.md)
- Key dependencies: `../data/` (FixturaDataset, ImageLogo, HomeTeam, AwayTeam, UserTheme, Video)
- Consumed by: cricket compositions, data mappers, dataset processing

## Dependencies

- Internal: `../data`
- External: TypeScript

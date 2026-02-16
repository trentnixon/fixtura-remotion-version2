# Folder Overview

Top 5 ranked batters or bowlers compositions across multiple variants. Supports dual composition IDs (CricketTop5Batting, CricketTop5Bowling) with data transformation and title generation per composition type.

## Skill

- `.skills/architecture/cricket-top5-folder.md` – Implementation guidance for this composition

## Files

- `index.tsx`: exports top 5 composition variants
- `basic.tsx`, `classic.tsx`, `brickWork.tsx`, `sixersThunder.tsx`, `classicTwoColumn.tsx`, `cnsw.tsx`, `cnsw-private.tsx`, `mudgeeraba.tsx`: variant entries
- `_types/types.ts`: PlayerData union, BatterData, BowlerData, type guards
- `utils/dataTransformer.ts`: transformPlayerData, getTitle
- `.docs/how-to.md`: step-by-step creation guide

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: templates variants, core contexts/utils, shared primitives
- Consumed by: cricket feature exports

## Dependencies

- Internal: `controller`, `layout`, `modules`, `_utils`
- External: React, Remotion

# Folder Overview

Upcoming fixtures compositions across multiple variants. Configurable games per screen, game card layout with logo variations, metadata components, and sponsor merging.

## Skill

- `.skills/architecture/cricket-upcoming-folder.md` – Implementation guidance for this composition

## Files

- `index.tsx`: exports upcoming composition variants
- `basic.tsx`, `classic.tsx`, `brickWork.tsx`, `sixersThunder.tsx`, `classicTwoColumn.tsx`, `cnsw.tsx`, `cnsw-private.tsx`, `mudgeeraba.tsx`: variant entries
- `_types/types.ts`: GameData, TeamLogo, animation constants
- `_utils/calculations.ts`: getGamesPerScreen, calculateTotalScreens
- `.docs/how-to.md`: step-by-step creation guide

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: templates variants, core contexts/utils, contentLayout.divideFixturesBy
- Consumed by: cricket feature exports

## Dependencies

- Internal: `controller`, `layout`
- External: React, Remotion

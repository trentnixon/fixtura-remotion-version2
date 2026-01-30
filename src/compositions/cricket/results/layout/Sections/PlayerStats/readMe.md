# Folder Overview

Player statistics components for results layouts. Displays batting and bowling performances for players, with support for two-team displays, single-team displays, and club-only filtering.

## Files

- `PlayerStats.tsx`: Base player stats component
- `PlayerStats-Basic.tsx`: Basic variant for player statistics
- `PlayerStats-BrickWork.tsx`: BrickWork style variant
- `PlayerStats-CNSW.tsx`: CNSW style variant
- `PlayerStats-CNSW-private.tsx`: CNSW private variant
- `PlayerStats-clubOnly-Basic.tsx`: Club-only variant showing only club team players
- `PlayerStats-SingleTeamOnly.tsx`: Single team only variant

## Child Modules

- `_types/`: Shared type definitions
  - `PlayerStatsProps.ts`: Consolidated props interfaces for all player stats variants (PlayerStatsProps, PlayerStatsClubOnlyProps, PlayerStatsSingleTeamProps, StatItemProps, StatSectionProps, TeamStatsProps, PlayerStat)
- `_utils/`: Shared utility functions
  - `helpers.ts`: Text truncation helpers
  - `visibility.ts`: Player visibility calculation logic for two-day matches and account club overlays

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses `_types/types` for Team and MatchResult, primitives, animation context, theme context
- Consumed by: MatchCard layouts

## Dependencies

- Internal: `_types/types`, `utils/primitives`, `core/context`, `components`
- External: React

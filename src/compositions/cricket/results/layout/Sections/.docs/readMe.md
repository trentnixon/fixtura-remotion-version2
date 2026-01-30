# Folder Overview

Sectional UI components for results: headers, status, player stats, teams, and result statements. Each section folder contains component variants and follows a consistent structure with `_types` and `_utils` folders for shared types and utilities.

## Child Modules

- `MatchHeader/`: Match header components with date, type, round, and ground information
- `MatchStatus/`: Match status display components
- `PlayerStats/`: Player statistics components (batting and bowling performances)
- `TeamsSection/`: Team score and logo display components
- `ResultStatement/`: Result statement text components

## Files

Each child module follows a consistent structure:

- Component files (`.tsx`)
- `_types/` folder: Shared type definitions
- `_utils/` folder: Shared utility functions and helpers
- `.docs/` folder: Documentation including cleanup summaries

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses primitives, animation context, theme context
- Consumed by: MatchCard and MatchRow layouts

## Dependencies

- Internal: `utils/primitives`, `core/context`, `core/utils`
- External: React

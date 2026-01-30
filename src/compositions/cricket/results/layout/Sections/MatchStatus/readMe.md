# Folder Overview

Match status components for results layouts. Displays match status information such as completion status and result text.

## Files

- `MatchStatus.tsx`: Match status display component showing status and result text

## Child Modules

- `_types/`: Shared type definitions
  - `MatchStatusProps.ts`: Props interface for MatchStatus component
- `_utils/`: Shared utility functions
  - `helpers.ts`: Text truncation helpers

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses primitives, animation context, theme context
- Consumed by: MatchCard and MatchRow layouts

## Dependencies

- Internal: `utils/primitives`, `core/context`, `components`
- External: React

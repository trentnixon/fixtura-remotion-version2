# Folder Overview

Match header components for results layouts. Displays match metadata including date, type, round, and ground information.

## Files

- `MatchHeader.tsx`: Standard match header with date, type, round, and ground
- `MatchHeaderBrickWork.tsx`: Brickwork variant – metadata with Climate Crisis font, no container background
- `SingleDataPointHeader.tsx`: Single data point header variant for grade display

## Child Modules

- `_types/`: Shared type definitions
  - `MatchHeaderProps.ts`: Props interface for MatchHeader component
  - `SingleDataPointHeaderProps.ts`: Props interface for SingleDataPointHeader component
- `_utils/`: Shared utility functions
  - `helpers.ts`: Text truncation and formatting helpers

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses primitives, animation context, theme context
- Consumed by: MatchCard and MatchRow layouts

## Dependencies

- Internal: `utils/primitives`, `core/context`, `components`
- External: React

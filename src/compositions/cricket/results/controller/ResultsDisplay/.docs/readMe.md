# Folder Overview

Display containers for match results per variant. Each variant component orchestrates the rendering of multiple match rows on a single screen, handling pagination and layout.

## Files

- `display-Basic.tsx`: Basic display variant
- `display-BrickWork.tsx`: Brickwork display variant
- `display-Classic.tsx`: Classic display variant
- `display-ClassicTwoColumn.tsx`: Classic two-column display variant
- `display-CNSW.tsx`: CNSW display variant
- `display-CNSW-private.tsx`: CNSW private display variant
- `display-Sixers-thunder.tsx`: Sixers thunder display variant

## Child Modules

- `_types/`: Shared type definitions
  - `ResultsDisplayProps.ts`: Props interface for all display components
- `_utils/`: Shared utility functions
  - `calculations.ts`: Results pagination, row height, and sponsor merging calculations

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses MatchRow components, layout sections, and `_types/types` for MatchResult
- Consumed by: results variant entry components (basic.tsx, classic.tsx, etc.)

## Dependencies

- Internal: `controller/MatchRow`, `layout/Sections`, `_types/types`, `core/context`
- External: React

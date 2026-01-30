# Folder Overview

Row renderers for match results across variants. Each variant component renders a single match result row with consistent props structure.

## Files

- `row-Basic.tsx`: Basic row variant
- `row-Brickwork.tsx`: Brickwork row variant
- `row-Classic-Twocolumn.tsx`: Classic two-column row variant
- `row-CNSW.tsx`: CNSW row variant
- `row-CNSW-private.tsx`: CNSW private row variant
- `row-Sixers-thunder.tsx`: Sixers thunder row variant

## Child Modules

- `_types/`: Shared type definitions
  - `MatchRowProps.ts`: Props interface for all row components
- `_utils/`: Shared utility functions
  - `calculations.ts`: Animation delay and frame calculations

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses layout sections, primitives, and `_types/types` for MatchResult
- Consumed by: ResultsDisplay components

## Dependencies

- Internal: `layout/Sections`, `_types/types`, `core/context`
- External: React

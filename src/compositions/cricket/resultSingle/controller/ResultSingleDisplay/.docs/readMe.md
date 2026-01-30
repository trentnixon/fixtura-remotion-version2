# Folder Overview

Display containers for single match result per variant. Each variant component renders a complete single match result display with full height utilization, handling club-only variants and sponsor footer integration.

## Files

- `display.tsx`: Basic display variant with club-only support
- `display-classic.tsx`: Classic display variant
- `display-classic-two-columns.tsx`: Classic two-column display variant
- `display-cnsw.tsx`: CNSW display variant
- `display-cnsw-private.tsx`: CNSW private display variant
- `display-sixers.tsx`: Sixers display variant with custom header

## Child Modules

- `_types/`: Shared type definitions
  - `ResultSingleDisplayProps.ts`: Props interface for all display components

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses MatchCard components, layout sections, and `types` for MatchResult
- Consumed by: resultSingle variant entry components

## Dependencies

- Internal: `layout/MatchCard`, `types`, `core/context`, `components`
- External: React

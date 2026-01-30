# Folder Overview

Match card layouts for results variants. Each card component renders a complete match result display with team scores, player statistics, and match information.

## Files

- `card-Basic.tsx`: Standard match card layout
- `card-Basic-clubOnly.tsx`: Club-only variant with simplified player stats
- `card-BrickWork.tsx`: BrickWork style variant
- `card-classic-twocolumn.tsx`: Classic two-column layout variant
- `card-CNSW.tsx`: CNSW style variant
- `card-CNSW-private.tsx`: CNSW private variant
- `card-Sixers-thunder.tsx`: Sixers Thunder style variant

## Child Modules

- `_types/MatchCardProps.ts`: Shared type definitions for match card components
- `_utils/calculations.ts`: Shared utility functions for height and delay calculations

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses sectional components and primitives
- Consumed by: results displays and variant entries

## Dependencies

- Internal: `layout/Sections`, `_types/types`, `core/context`, `components`
- External: React

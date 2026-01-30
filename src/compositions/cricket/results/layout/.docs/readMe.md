# Folder Overview

Layout components for results compositions. Provides card-based and row-based layout structures that compose sectional UI components into complete match result displays.

## Files

- `MatchRowLayout.tsx`: Standard row layout wrapper component for match results

## Child Modules

- [MatchCard/readMe.md](./MatchCard/readMe.md): Card layout components per variant - complete match result displays
- [Sections/readMe.md](./Sections/readMe.md): Sectional UI components - headers, status, teams, player stats, result statements

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses `_types/types` for domain types, primitives, animation and theme contexts
- Consumed by: controller components (MatchRow, ResultsDisplay) and results variant entries

## Dependencies

- Internal: `_types/types`, `utils/primitives`, `core/context`, `components`
- External: React

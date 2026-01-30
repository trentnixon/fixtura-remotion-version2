# Folder Overview

Controller components coordinating how match result rows and displays assemble per variant. Handles the orchestration layer between data and presentation, managing pagination, screen layout, and component composition.

## Files

- `MatchRow/`: Row renderers per variant - renders individual match result rows
- `ResultsDisplay/`: Display containers per variant - orchestrates multiple rows per screen

## Child Modules

- [MatchRow/readMe.md](./MatchRow/readMe.md): Row component variants with shared types and utilities
- [ResultsDisplay/readMe.md](./ResultsDisplay/readMe.md): Display component variants with shared types and utilities

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: composes layout sections, primitives, and `_types/types` for domain types
- Consumed by: results variant entry components (basic.tsx, classic.tsx, etc.)

## Dependencies

- Internal: `layout/Sections`, `layout/MatchCard`, `_types/types`, `core/context`
- External: React

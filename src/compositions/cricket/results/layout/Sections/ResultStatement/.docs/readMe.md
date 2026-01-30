# Folder Overview

Result statement components for results layouts. Displays match result text in short or detailed format.

## Files

- `ResultStatementShort.tsx`: Short result statement display component
- `ResultStatementText.tsx`: Detailed result statement text component built from result summary
- `index.tsx`: Export file for all ResultStatement variants

## Child Modules

- `_types/`: Shared type definitions
  - `ResultStatementProps.ts`: Props interfaces for ResultStatementShortProps and ResultStatementTextProps
- `_utils/`: Shared utility functions
  - `helpers.ts`: Result statement text building logic (`buildResultStatementText`)

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses `_types/types` for ResultSummary, primitives, animation context, theme context
- Consumed by: MatchCard layouts

## Dependencies

- Internal: `_types/types`, `utils/primitives`, `core/context`, `components`
- External: React

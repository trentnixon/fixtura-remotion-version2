# Folder Overview

Pure cricket fixture → view-model helpers shared by the design prototype (ES modules) and Remotion (TypeScript adapters).

## Files

- Canonical logic: `design/_shared/view-model/cricket/*.js`
- `index.ts`: Remotion import surface
- `venue.ts`, `rosterPlayerName.ts`, `rosterPlayerEntry.ts`, `rosterDensity.ts`, `totwPlayerColumns.ts`, `rosterLineup.ts`: design-backed rules and roster orchestration

## Child Modules

- None

## Relations

- Parent: design population (`design/_shared/populate/cricket/`) and layout call the `.js` modules directly
- Consumed by: `src/compositions/cricket/*` via `src/cricket/viewModel` only

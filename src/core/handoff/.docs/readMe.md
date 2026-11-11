# Folder Overview

Design ↔ Remotion handoff contract verification (registry routing, bind-map scalars, canvas `data-*` dataset).

## Files

- `runHandoffDesignVerification.ts`: walks `design/_shared/routes.json` and runs all handoff checks
- `runHandoffContractVerify.ts`: per-asset bind + canvas checks
- `handoffRoutingVerify.ts`, `compositionRouteToExportBlock.ts`: cricket index routing
- `bindMapContract.ts`, `canvasDatasetContract.ts`: HTML contracts

## Child Modules

- None

## Relations

- Parent: `src/core/`
- Consumed by: `npm run design:verify -- --handoff` (via Vitest `src/core/handoff`), design documentation

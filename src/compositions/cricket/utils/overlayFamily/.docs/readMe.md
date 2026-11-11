# Folder Overview

Shared 1080×1350 overlay canvas utilities for the Scoreline and Night Session Template families (class lookup, `data-*` dataset contract, container tokens, inner animation tiers).

## Files

- `componentClass.ts`: `csClass` theme lookup
- `canvasDataset.ts`: composition id → canvas attributes
- `containerTokens.ts`: mode surfaces and copy panels from `DesignPalette`
- `innerAnimationTier.ts`: staged row-inner delays
- `index.ts`: public export surface

## Child Modules

- None

## Relations

- Parent: [../.docs/readMe.md](../.docs/readMe.md) if present else `src/compositions/cricket/utils/`
- Consumed by: `scoreline/*` and `nightSession/*` variant adapters

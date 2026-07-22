# Completed Tickets Index

- TKT-2026-BW-001
- TKT-2026-BW-002
- TKT-2026-BW-003
- TKT-2026-BW-007
- TKT-2026-BW-006
- TKT-2026-BW-008
- TKT-2026-BW-009
- TKT-2026-BW-010
- TKT-2026-BW-011
- TKT-2026-BW-013

---

## TKT-2026-BW-001

---
ID: TKT-2026-BW-001
Status: Completed
Priority: High
Owner: Development Team
Created: 2026-07-22
Updated: 2026-07-22
Related: Monday-pulse-2797404916, Brickwork-01-masonry
---

## Overview

Introduce a masonry grid motif so Brickwork reads as interlocking row geometry without abandoning the 12-column system.

## What We Need to Do

Add reusable offset/width variants for selected rows; pilot on Top 5 and Performances; expose as Brickwork layout tokens/primitives.

## Completion Summary

Added `design/masonry.ts`, `MasonryRow.tsx`, and wired even/odd 16px horizontal insets on Top 5 and Performances row controllers. Inner 7/2/3 tracks preserved. Monday pulse 01 marked Done.

---

## TKT-2026-BW-002

---
ID: TKT-2026-BW-002
Status: Completed
Priority: High
Owner: Development Team
Created: 2026-07-22
Updated: 2026-07-22
Related: Monday-pulse-2797269746, Brickwork-02-grid-layer, TKT-2026-BW-001
---

## Overview

Add a subtle architectural grid layer behind content (5–12% opacity) as part of the Matchday Masonry structural layer.

## What We Need to Do

Create a reusable `BrickworkGridLayer` primitive and pilot it behind Top 5 + Performances content. Grid must read as construction scaffolding, not compete with data.

## Completion Summary

Piloted `GridLayer` on Top 5 + Performances; reverted after Studio review — grid behind row panels did not suit these compositions. Pulse 02 deferred/skipped for this placement.

---

## TKT-2026-BW-003

---
ID: TKT-2026-BW-003
Status: Completed
Priority: High
Owner: Development Team
Created: 2026-07-22
Updated: 2026-07-22
Related: Monday-pulse-2797324157, Brickwork-03-panel-depth, TKT-2026-BW-001
---

## Overview

Build three levels of panel depth via `BrickworkPanel` variants (base, raised, featured, recessed).

## What We Need to Do

Pilot panel depth on Top 5 + Performances row layouts using shared design primitives.

## Completion Summary

Piloted nested `BrickworkPanel` on Top 5 + Performances; reverted after Studio review — raised stat panels broke score visibility in the 12-col layout. Pulse 03 deferred/skipped for this row structure.

---

## TKT-2026-BW-007

---
ID: TKT-2026-BW-007
Status: Completed
Priority: High
Owner: Development Team
Created: 2026-07-22
Updated: 2026-07-22
Related: Monday-pulse-2797324202, Brickwork-07-colour-spine
---

## Overview

Add a persistent club-colour edge spine through intro, main content and outro.

## What We Need to Do

Create `ColourSpine` and mount via template overlay so club identity carries across the full template lifecycle.

## Completion Summary

Piloted left-edge `ColourSpine` via `BaseTemplate` overlayComponent; full revert after Studio review — spine treatment did not work for Brickwork. Pulse 07 deferred/skipped.

---

## TKT-2026-BW-006

---
ID: TKT-2026-BW-006
Status: Completed
Priority: High
Owner: Development Team
Created: 2026-07-22
Updated: 2026-07-22
Related: Monday-pulse-2797324161, Brickwork-06-colour-roles
---

## Overview

Formalise semantic roles for primary, secondary, neutral and status colours (60/30/10).

## What We Need to Do

Centralise Brickwork colour usage via `getBrickworkColourRoles()`; replace ad hoc palette picks and hardcoded ladder status classes.

## Completion Summary

Added `design/colours.ts` with named roles and status tokens. Wired Top 5, Performances and Ladder; no visible regression in Studio. Kept. Monday pulse 06 marked Done. Phase C (TOTW, Results, etc.) remains open.

---

## TKT-2026-BW-008

---
ID: TKT-2026-BW-008
Status: Completed
Priority: High
Owner: Development Team
Created: 2026-07-22
Updated: 2026-07-22
Related: Monday-pulse-08, Brickwork-08-logo-plates
---

## Overview

Standardise team crest presentation via a shared `LogoPlate` primitive with mode-driven fit and neutral padded wells.

## What We Need to Do

Pilot on Results + Upcoming; roll out to all Brickwork cricket asset types using `preserve` for official crests.

## Completion Summary

Added `logoPlateTokens.ts`, `LogoPlateView.tsx`, and wired `LogoPlate mode="preserve"` across Upcoming, Results, Result Single, Top 5, Performances, Ladder, Team Roster, and Team of the Week. Kept after Studio review.

---

## TKT-2026-BW-009

---
ID: TKT-2026-BW-009
Status: Completed
Priority: High
Owner: Development Team
Created: 2026-07-22
Updated: 2026-07-22
Related: Monday-pulse-2797404949, Brickwork-09-diagonal-energy
---

## Overview

Introduce restrained diagonal energy accents (8–12° token system) on selected accent blocks without reshaping core text containers.

## What We Need to Do

Add shared diagonal accent primitives; pilot on featured Top 5 + Performances rows; Studio keep/discard review.

## Completion Summary

Added `diagonalAccents.ts` and `DiagonalEnergyAccentView.tsx`; piloted trailing `diagonalBand` on featured row in Top 5 + Performances. Kept after Studio review.

---

## TKT-2026-BW-010

---
ID: TKT-2026-BW-010
Status: Completed
Priority: High
Owner: Development Team
Created: 2026-07-22
Updated: 2026-07-22
Related: Monday-pulse-2797269609, Brickwork-10-texture-vocabulary
---

## Overview

Give Brickwork tactile materiality through a controlled atmosphere-layer texture system.

## What We Need to Do

Prototype texture vocabulary and pilot on Top 5 + Performances; roll to full main frame on keep.

## Completion Summary

Added `textureVocabulary.ts`, `TextureOverlayView.tsx`, and `BrickworkAssetAtmosphere` on `brickworkMain` (header + asset + footer). Default `grain` @ 4%. Kept after Studio review.

---

## TKT-2026-BW-011

---
ID: TKT-2026-BW-011
Status: Completed
Priority: High
Owner: Development Team
Created: 2026-07-22
Updated: 2026-07-22
Related: Monday-pulse-2797324305, Brickwork-11-featured-row
---

## Overview

Make featured players/teams structurally distinct beyond stronger opacity alone.

## What We Need to Do

Shared featured-row tokens; pilot on Top 5 + Performances with height, primary stat block, and diagonal accent combo.

## Completion Summary

Added `featuredRow.ts` with height bonus and surface roles; piloted on Top 5 + Performances (taller row 1, primary stat column, existing pulse 09 band). Kept after Studio review.

---

## TKT-2026-BW-013

---
ID: TKT-2026-BW-013
Status: Completed
Priority: High
Owner: Development Team
Created: 2026-07-22
Updated: 2026-07-22
Related: Monday-pulse-2797323952, Brickwork-13-typography
---

## Overview

Clarify font roles and resolve Brickwork typography inconsistencies (display vs copy, header resolution, title fitting).

## What We Need to Do

Centralise typography tokens; Allerta for display scores/titles, Roboto for names/metadata; fix compositionName resolution; measured title fitting; remove stale Climate Crisis references.

## Completion Summary

Added `design/typography.ts` and `useBrickworkTypography`; updated `theme.ts` fontClasses and role-based componentStyles; wired intro/header fitting, Results scores, Top 5 + Performances row fonts; load Roboto weight files via `fonts.additional`. Kept after Studio review.

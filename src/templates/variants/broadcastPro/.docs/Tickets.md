# Completed Tickets Index

- TKT-2026-BP-015
- TKT-2026-BP-019
- TKT-2026-BP-020
- TKT-2026-BP-021

---

## TKT-2026-BP-015

---

ID: TKT-2026-BP-015
Status: Completed
Priority: High
Owner: Development Team
Created: 2026-07-25
Updated: 2026-07-25
Related: Monday-pulse-2803178022, BroadcastPro-15-indexed-roster

---

## Overview

Refine the Broadcast Pro team roster left-column player list into a reusable indexed roster sheet with padded lineup numbers, glass cells, and row-level accent hierarchy.

## What We Need to Do

Extract roster list into shared primitives; standardise index format (`01`, `02`, …), typography roles, dynamic sizing from player count, and accent treatment for row 1 vs remaining rows.

## Completion Summary

Added `BroadcastProRosterSheet` / `BroadcastProRosterSheetRow`, `roster-index.ts` helpers, `rosterIndex` score role, and `computeBroadcastProRosterPlayerListMetrics` tuning (64px index column, 8px gap to 15 players). Wired into `display-BroadcastPro.tsx`. Unit tests and visual regression passed for CricketRoster.

---

## TKT-2026-BP-019

---

ID: TKT-2026-BP-019
Status: Completed
Priority: High
Owner: Development Team
Created: 2026-09-22
Updated: 2026-09-22
Related: Roadmap-BroadcastPro, BroadcastPro-layout-legibility

---

## Overview

Make Broadcast Pro copy readable. The type system already exists (Teko display, Rajdhani body, fitted headlines, score roles). Header chrome and leftover class names are fighting it.

## What We Need to Do

Shrink the header so the asset stack has room, fix headline overflow, map leftover `font-black` / `text-sm` / `opacity-70` surfaces onto existing roles, and put every string on the correct mode token. Copy inside a container uses container mode. Copy outside a container uses non-container mode. Font colour is always dynamic.

## Completion Summary

Header is 200 / 1020 / 130 on the 1080×1350 canvas, header crest is 72px, title cap is 80px so the logo stays on-canvas, and secondary headlines wrap. Copy-variant resolution puts container copy on chips (including the grade chip) and non-container title/copy on the scene. Same layout and mode mapping landed on Broadcast Pro Rounded.

---

## TKT-2026-BP-020

---

ID: TKT-2026-BP-020
Status: Completed
Priority: High
Owner: Development Team
Created: 2026-09-22
Updated: 2026-09-22
Related: Roadmap-BroadcastPro, BroadcastPro-image-backgrounds

---

## Overview

Image backgrounds still fight the foreground. Motion is too strong, overlays are too weak or missing, and Broadcast Pro does not set its own defaults.

## What We Need to Do

Give Broadcast Pro mode-aware image scrims, cap motion so copy stays still, wire existing aspect-ratio helpers, and QA on real club photography.

## Completion Summary

`resolveBroadcastProImageDefaults` supplies vignette overlay at 0.5, mode-aware scrim colour, a 1.08 zoom cap, portrait/landscape pan, and a ban on motion plus overlay none. Dense tables drop pan. Broadcast Pro and Rounded Image backgrounds consult that resolver; Luminance mapping is untouched.

---

## TKT-2026-BP-021

---

ID: TKT-2026-BP-021
Status: Completed
Priority: Normal
Owner: Development Team
Created: 2026-09-22
Updated: 2026-09-22
Related: Roadmap-BroadcastPro, BroadcastPro-standards-fixtures

---

## Overview

Docs, design HTML, and Studio fixtures have drifted from the template that actually ships. Visual QA is still a one-off.

## What We Need to Do

Refresh local planning docs, add cricket regression fixtures for all eight compositions, recheck the sponsor/outro grid after the header shrinks, and keep Broadcast Pro Rounded in lockstep.

## Completion Summary

Local docs record pulses 16–17 as shipped, glass default as `lg`, and current work as 019/020/021. Studio play list lives in `studio-qa.md` (eight cricket assets, Solid/Image/Luminance, four modes). Rounded stays in lockstep except Image overlay policy, which imports Broadcast Pro by design. Studio visual play is still a human pass.

---

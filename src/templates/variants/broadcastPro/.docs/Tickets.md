# Completed Tickets Index

- TKT-2026-BP-015

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
Status: Draft
Priority: High
Owner: Development Team
Created: 2026-09-22
Updated: 2026-09-22
Related: Roadmap-BroadcastPro, BroadcastPro-layout-legibility

---

## Overview

Make Broadcast Pro copy readable. The type system already exists (Teko display, Rajdhani body, fitted headlines, score roles). Header chrome and leftover class names are fighting it.

## What We Need to Do

Shrink the header so the asset stack has room, fix headline overflow, map leftover `font-black` / `text-sm` / `opacity-70` surfaces onto existing roles, and audit glass copy for `textOnGlass`.

## Phases & Tasks

### Phase 1: Header chrome

#### Tasks

- [ ] Reduce `layout.heights.header` from 310px toward 180–220px in `theme/layout.ts`
- [ ] Increase `layout.heights.asset` so the 1080×1350 canvas still adds up (Scoreline uses 140 / 1088 / 112)
- [ ] Shrink the main-header circular crest below the current 104px in `BroadcastProMainHeader.tsx`
- [ ] Recheck fitted title caps in `theme/tokens.ts` (`mainHeaderMaxPx` 124, `minPx` 48, line-height 0.82) after the header shrinks

### Phase 2: Headline secondary

#### Tasks

- [ ] Remove `whitespace-nowrap` from `broadcastProHeadlineSecondary`
- [ ] Reduce or drop `tracking-[0.2em]` on the metadata chip
- [ ] Wrap or fitText long `videoTitle` / `titleSplit` lines in `BroadcastProHeadlineSecondary`
- [ ] Verify Result Single and Upcoming still hide the secondary line correctly

### Phase 3: Type roles

#### Tasks

- [ ] Replace `font-black` leftovers on `playerName`, `teamName`, and `Top5PlayerName` with named Teko/Rajdhani roles
- [ ] Raise Results meta above `text-sm tracking-widest` (`ResultMetaData`)
- [ ] Remove `opacity-70` from `ResultPlayerName` unless contrast still needs a mute, then use a named muted role
- [ ] Split `metadataSmall` / `metadataMedium` / `metadataLarge` so they are not all `text-2xl`

### Phase 4: Glass copy and dense layouts

#### Tasks

- [ ] Audit every glass string for `useBroadcastProTheme().text` (`textOnGlass`)
- [ ] Fix grade-chip copy (`onContainerCopyNoBg` resolving white)
- [ ] Leave glass opacity at `lg` unless the type pass still fails contrast
- [ ] Stress-test long club names, 12+ team ladders, 15-player rosters, and two-day innings scores

## Constraints, Risks, Assumptions

- Do not invent a second type system. Tune `theme/tokens.ts`, `theme/layout.ts`, `theme/componentStyles.shared.ts`, and `theme/composition/*.ts`.
- Stat matrix, markers, crest wells, matchups, and roster sheet are already shipped. Do not rebuild them.
- Land the same layout pass on `broadcastProRounded` unless a later task excludes it.

---

## TKT-2026-BP-020

---

ID: TKT-2026-BP-020
Status: Draft
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

## Phases & Tasks

### Phase 1: Overlay and scrim defaults

#### Tasks

- [ ] Stop treating `BroadcastProBackground` as a blank `SelectTemplateBackground` passthrough
- [ ] Add a mode-aware Image overlay default around 0.45–0.55 opacity
- [ ] Add a bottom-weighted or vignette scrim matching Luminance `ForegroundProtection`
- [ ] Block motion + overlay-none combinations for this template

### Phase 2: Motion caps

#### Tasks

- [ ] Cap zoom intensity at 1.08 (current default is 1.15)
- [ ] Slow Ken Burns so titles and tables do not swim
- [ ] Disable fast pan under dense tables (ladder, results list, roster)

### Phase 3: Aspect ratio and QA

#### Tasks

- [ ] Wire `getOptimizedEffectSettings` into the live Image path (portrait pans vertically, landscape pans horizontally)
- [ ] Play Solid, Image, and Luminance on Results, Ladder, and Top 5
- [ ] Include `public/luminance/plates/` and bright outdoor cricket stills in the visual pass

## Constraints, Risks, Assumptions

- Keep Solid and Luminance routes working. This ticket is Image plus copy contrast on top of it.
- Glass `lg` already helps panel copy. Hero titles, intro, and thin meta strips still sit on raw photography.
- Do not change Luminance mapping maths. Reuse its protection idea on Image only.

---

## TKT-2026-BP-021

---

ID: TKT-2026-BP-021
Status: Draft
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

## Phases & Tasks

### Phase 1: Docs

#### Tasks

- [ ] Mark Monday pulses 16 (stat matrix) and 17 (markers) as already in code
- [ ] Correct the glass default in the readMe (`lg` in `theme/tokens.ts`, not `md`)
- [ ] Point the local roadmap at TKT-2026-BP-019 / 020 / 021 only

### Phase 2: Fixtures

#### Tasks

- [ ] Add representative Studio setups for ladder, results, result single, upcoming, performances, top 5, team of the week, and team roster
- [ ] Cover Solid, Image, and Luminance for each composition
- [ ] Include abandoned, yet-to-bat, missing logos, long names, and short ladders
- [ ] Note that design HTML currently exists only for `design/variants/broadcast-pro/cricket/results.html`

### Phase 3: Parity and sponsor grid

#### Tasks

- [ ] Recheck intro/outro sponsor layout after the header height change (old pulse 18)
- [ ] Land the same behaviour on `broadcastProRounded`, or write an explicit exclusion
- [ ] Confirm a reviewer can play the fixtures without hunting one-off Studio state

## Constraints, Risks, Assumptions

- Planning lives in this `.docs/` folder. ClickUp is out of scope for this pass.
- Do not treat missing design HTML as a blocker for Remotion work. Add HTML only if a composition still needs a visual source of truth.
- Fixtures should use existing cricket samples under `testData/samples/Cricket/` where they already cover the case.

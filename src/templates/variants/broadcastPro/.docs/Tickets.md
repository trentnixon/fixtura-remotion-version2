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

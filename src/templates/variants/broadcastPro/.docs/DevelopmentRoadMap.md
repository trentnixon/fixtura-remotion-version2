# DevelopmentRoadMap — Broadcast Pro Template Upgrades

## Current Focus

- TKT-2026-BP-019: Layout and font legibility
- TKT-2026-BP-020: Image backgrounds, motion caps, copy contrast

## Completed

- TKT-2026-BP-015: Indexed roster sheet
- Monday pulse 16: Player-stat matrix (in code, no local ticket)
- Monday pulse 17: Marker / notch language (in code, no local ticket)

## To Do (easy → hard)

1. TKT-2026-BP-019: Layout and font legibility (P1)
2. TKT-2026-BP-020: Image backgrounds and copy contrast (P1)
3. TKT-2026-BP-021: Docs, regression fixtures, Rounded parity, sponsor grid (P2)

## Blocked / Waiting

- None

## Recommendations

- Do not rebuild glass, crest wells, matchups, ladder zones, markers, roster sheet, or the stat matrix. They are already shipped.
- Tune type in `theme/tokens.ts`, `theme/layout.ts`, `theme/componentStyles.shared.ts`, and `theme/composition/*.ts`.
- Keep `broadcastProRounded` in lockstep unless a ticket excludes it.
- Glass is already `lg` in tokens. Do not raise it until the type pass is done.

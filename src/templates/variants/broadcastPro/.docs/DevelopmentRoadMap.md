# DevelopmentRoadMap — Broadcast Pro Template Upgrades

## Current Focus

- Studio visual QA from `studio-qa.md` (Solid / Image / Luminance, four modes)

## Completed

- TKT-2026-BP-015: Indexed roster sheet
- TKT-2026-BP-019: Layout and font legibility
- TKT-2026-BP-020: Image backgrounds and copy contrast
- TKT-2026-BP-021: Docs, regression fixtures, Rounded parity
- Monday pulse 16: Player-stat matrix (in code, no local ticket)
- Monday pulse 17: Marker / notch language (in code, no local ticket)

## To Do (easy → hard)

1. Play Broadcast Pro and Rounded against `studio-qa.md` (P2)

## Blocked / Waiting

- None

## Recommendations

- Do not rebuild glass, crest wells, matchups, ladder zones, markers, roster sheet, or the stat matrix. They are already shipped.
- Tune type in `theme/tokens.ts`, `theme/layout.ts`, `theme/componentStyles.shared.ts`, and `theme/composition/*.ts`.
- Keep `broadcastProRounded` in lockstep unless a ticket excludes it.
- Glass is already `lg` in tokens. Do not raise it until the type pass is done.
- Font colour is always dynamic from `selectedPalette`. Copy inside a container uses container mode (`onContainerCopy` / `textOnGlass`). Copy outside a container uses non-container mode (`onBackground*` / `onContainerCopyNoBg` / `onContainerTitle`).

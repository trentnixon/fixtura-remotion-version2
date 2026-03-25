# State — 2026-03-25

## Current Focus

Broadcast Pro template: glass opacity presets (`sm` / `md` / `lg`) for upcoming fixture main content; theme resolution via `resolveBroadcastProTransparentLayers`.

## Next Actions

- [ ] Fix grade label copy color (onContainerCopyNoBg resolves white; may need palette or variant change)
- [ ] Execute utils reorganization (TKT-2025-009)
- [ ] Consolidate color utilities (TKT-2025-010, TKT-2025-011)
- [ ] Optional: preview upcoming Broadcast Pro with `sm` vs `md` vs `lg` on production gradients
- [ ] Optional: variant LLM briefs for performances (club/association) if needed

## Blockers / Risks

- None

## Completed (2026-03-25)

- Added `llm-brief-cricket-performances.md` for the performances composition.
- Broadcast Pro: `broadcastProGlassOpacity` presets + resolver; upcoming card consumes resolved layers; docs updated.

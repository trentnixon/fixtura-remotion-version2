# 02 — Parse/normalize seam for legacy Generated ingresses

**What to build:** Legacy Graphics, Pattern, and supported Noise payloads normalize into one internal Generated model for presets retained by the Phase 0 audit. Unknown values fail in Studio, development, and tests. Production unknown input emits a diagnostic and renders Solid. Known orphan and mismatch ingresses follow Phase 0 classifications as explicit compatibility paths.

**Blocked by:** 01 — Phase 0 visual audit (human catalogue decisions); luminance work closed or merged

**Status:** ready-for-agent

## Acceptance criteria

- [ ] Retained legacy ingresses parse into a discriminated internal Generated model without re-reading legacy shapes after parse
- [ ] Unknown `useBackground`, unknown Generated preset IDs, and invalid preset config fail in authoring/test paths with the offending value and location
- [ ] Production unknown path uses documented Solid fallback plus structured diagnostic; never selects an unrelated Generated preset
- [ ] Orphan and mismatch cases classified in Phase 0 remain explicit compatibility paths (no silent pre-audit aliasing)
- [ ] Tests cover normalize success for retained dual-ingress pairs and failure/fallback policy for unknown input

## Verification

```bash
npm test
```

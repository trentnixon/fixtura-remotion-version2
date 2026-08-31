# 12 — Verification (WP-7)

**What to build:** Automated verification suite for ingress round-trips, composition identity, adapter routing, and unsupported handling. Closes discovery verification checklist from `compatibility-plan.md`.

**Blocked by:** 08, 09

**Status:** ready-for-agent

**Related:** `implementation-handoff.md` WP-7; `compatibility-plan.md` verification checklist

## Acceptance criteria

- [ ] Ingress round-trip tests: sticky save preserves wire for alias pairs (Graphics/Noise, `noise.graphics`).
- [ ] Canonical egress tests: new selection writes expected `useBackground` + discriminator per preset.
- [ ] Composition ID unchanged on simulated no-change save (sticky ingress).
- [ ] Unsupported inputs never receive invented `presetId`; normalization classifies unknown discriminators as unsupported (not family default).
- [ ] Unsupported production path asserts Solid render + diagnostic emission (unit or integration level).
- [ ] Adapter spot-check: at least one test per renderer adapter family (`pattern-tiled`, `particle-field`, `grid-noise`, `particle-noise`, `svg-geometric`, `svg-spokes`).
- [ ] Contract publish test: 45 generated / 9 unsupported / 7 passthrough row counts in published artifact.
- [ ] All 26 inventory keys map to expected `presetId` via ingress.

## Verification commands

```bash
npm test
npm run verify:deploy
```

(Include contract build script from WP-2 in verify pipeline if appropriate.)

## References

- `.scratch/generated-backgrounds/compatibility-plan.md` — Verification checklist
- `.scratch/generated-backgrounds/implementation-handoff.md` — Phase 1 success criteria

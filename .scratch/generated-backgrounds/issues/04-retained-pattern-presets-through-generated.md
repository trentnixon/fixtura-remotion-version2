# 04 — Retained Pattern presets through Generated

**What to build:** Each Pattern type retained in Phase 0 renders through the Generated catalogue via the existing tiled-pattern adapter with approved parity. Pattern animation and scale/opacity/rotation remain compatibility data only — no new operator control contract. Compatibility baselines for non-`none` Pattern animation exist only if Phase 0 inventory found any.

**Blocked by:** 02 — Parse/normalize seam for legacy Generated ingresses

**Status:** ready-for-agent

## Acceptance criteria

- [ ] Stable visual kebab-case IDs minted only for Phase 0–kept Pattern types
- [ ] Each retained type renders through Generated to the existing Pattern adapter
- [ ] Same-environment parity vs Phase 0 stills passes, or redesign is recorded with engineering approval
- [ ] No new Fixtura operator control surface; existing Pattern fields stay compatibility inputs
- [ ] Non-`none` Pattern baselines handled only when Phase 0 inventory recorded samples (otherwise none)

## Verification

```bash
npm test
```

Plus fixture still comparison against Phase 0 baselines for retained Pattern presets.

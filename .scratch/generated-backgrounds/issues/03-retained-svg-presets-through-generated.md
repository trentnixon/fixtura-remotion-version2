# 03 — Retained SVG presets through Generated (Geometric field + Spokes)

**What to build:** Geometric field and Spokes resolve as Generated presets (including Graphics and Noise dual ingress), render through the existing full-frame SVG adapter, and meet approved same-environment parity or a recorded redesign against Phase 0 stills. Composition IDs keep the original wire `useBackground` segment.

**Blocked by:** 02 — Parse/normalize seam for legacy Generated ingresses

**Status:** ready-for-agent

## Acceptance criteria

- [ ] Stable visual kebab-case IDs minted only for Phase 0–approved Geometric field and Spokes survivors
- [ ] Graphics and Noise ingresses for each retained preset normalize to the same catalogue entry
- [ ] Output routes through the Generated module to the existing SVG adapter (no drawing rewrite)
- [ ] Same-environment parity vs Phase 0 stills passes, or redesign is recorded with engineering `redesign-approved`
- [ ] Legacy composition identity for Graphics/Noise wire values remains unchanged

## Verification

```bash
npm test
```

Plus fixture still comparison against Phase 0 baselines for the retained SVG presets.

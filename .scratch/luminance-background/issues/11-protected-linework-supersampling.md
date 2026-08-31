# 11 — Protected-linework supersampling + matte composite

**What to build:** Spatial AA for `protected-brand` via 2× internal working resolution, with independent downsample of brand luminance and black/white coverage mattes, then final-resolution protected composite.

**Blocked by:** 01 — Parse boundary and luminance map resolution (protected-brand cores + transitions)

**Status:** ready-for-agent

## Acceptance criteria

- [x] `protected-brand` defaults to `supersampleScale: 2`; `4` remains diagnostic-only; other presets default to `1`.
- [x] Explicit `supersampleScale` of `1 | 2 | 4` is parsed from luminance config.
- [x] Protected supersample path: preprocess → luminance + black/white mattes → independent area-average downsample → brand LUT at final size → composite mattes.
- [x] Do not RGB-composite protected black/white before downsampling (avoids colour fringe).
- [ ] Compare stills: Remotion F07 at 1×/2×/4× plus Node `F07-final-matte-2x.png` for fringe review.
- [x] Visual review prior iteration: 2× sufficient vs 4×; remaining issue was RGB fringe (addressed by mattes).
- [ ] Mask/overlay source assets remain out of scope unless mattes fail review.

## Verification commands

```bash
npm test
npm run luminance:supersample-compare
```

Expected: unit tests pass; stills under `out/luminance-supersample/` for visual comparison.

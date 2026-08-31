# 04 — Alternate render backends for spike

**What to build:** Remotion native effect and precomputed raster render backends implemented behind the same test-composition backend prop as the SVG path. Fixture F01 renders successfully on all three backends locally.

**Blocked by:** 02 — Global background routing and first render path

**Status:** ready-for-agent

## Acceptance criteria

- [ ] Test composition accepts a backend prop: `svg`, `remotion`, and `precompute` (or equivalent names documented in spike script).
- [ ] Remotion native effect backend implements the same pipeline semantics as SVG: neutralize → pre-map tone → three-channel LUT.
- [ ] Precomputed raster backend implements the same pipeline semantics for static output.
- [ ] F01 still renders successfully on each backend without error.
- [ ] Non-selected backends are selectable without modifying fixture props beyond the backend field.

## Verification commands

```bash
node scripts/luminance-render-fixtures.mjs --backend=svg --fixtures=F01
node scripts/luminance-render-fixtures.mjs --backend=remotion --fixtures=F01
node scripts/luminance-render-fixtures.mjs --backend=precompute --fixtures=F01
```

Expected: three F01 PNGs written (one per backend). If the render helper from ticket 03 is not yet available, use equivalent `remotion still` invocations with `--props` varying only the backend field.

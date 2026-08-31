# 01 — Parse boundary and luminance map resolution

**What to build:** External luminance configuration is validated at the input boundary and resolved into a three-channel lookup table. Theme presets, explicit stops (including uneven positions), and segment maps (including `protected-brand`) produce checkpoint-verifiable output. Missing-asset fallback policy is a pure, tested function callable without React or Remotion.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

## Acceptance criteria

- [ ] Invalid configs are rejected at parse time: bad colors, non-finite positions, positions outside `[0, 1]`, unsorted stops, duplicate positions, fewer than two stops, parallel-array shapes if encountered externally.
- [ ] Valid `kind: "theme"` configs resolve for presets `brand`, `brand-with-accent`, `tonal-brand`, and `protected-brand`.
- [ ] Valid `kind: "stops"` configs resolve with uneven stop positions sampled into per-channel LUT checkpoints (endpoints, stop indices, midpoints) — not assumed equal spacing.
- [ ] Valid `kind: "segments"` configs resolve solid and gradient segments into a 256-entry RGB LUT; invalid segments are rejected (outside `[0, 1]`, overlap, gaps, unordered, zero/negative width, not covering `[0, 1]`, invalid colors).
- [ ] `protected-brand` uses protected endpoint cores (default 2% black / 2% white), endpoint transition bands (default 6%), solid club bands, and a primary→secondary mid gradient; custom core / transition / brand-solid widths parse and resolve correctly.
- [ ] Protected-brand LUT checkpoints cover cores, black→primary and secondary→white transitions (no abrupt black→primary or secondary→white steps), solid brand bands, and mid interpolation.
- [ ] Pre-map contrast and brightness affect source tone before lookup; behavior is covered by checkpoint tests. Contrast is not applied after mapping.
- [ ] Problematic palette spread triggers tonal-brand fallback policy without post-map contrast hacks (`protected-brand` does not use tonal fallback).
- [ ] Missing-asset fallback policy returns a defined chain (never hero image, never stock URL).
- [ ] Compact checkpoint JSON fixtures cover at least two-stop linear, uneven four-stop, and reversed cases — not full 256×3 arrays.
- [ ] One integration test uses the real color system to verify theme preset wiring.

## Verification commands

```bash
npm test
```

Expected: all new luminance parse/map/fallback tests pass; no regressions in existing suite.

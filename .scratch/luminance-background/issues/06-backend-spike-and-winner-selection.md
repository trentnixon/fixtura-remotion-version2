# 06 — Backend spike and winner selection

**What to build:** Full F01–F09 matrix × three backends (27 local spike renders). Visual differences plus render duration and memory are recorded per backend. Winner is documented; non-winning backends are gated or removed from the production path.

**Blocked by:** 03 — Foreground protection and F01–F09 fixture registry; 04 — Alternate render backends for spike; 05 — Visual regression script

**Status:** ready-for-agent

## Acceptance criteria

- [ ] All 27 spike renders complete: F01–F09 × `{ svg, remotion, precompute }`.
- [ ] Spike report records per backend and per fixture: pixel diff summary (where comparable), render duration, and peak memory (or RSS at completion if peak unavailable).
- [ ] `.research/luminance-backend-spike.md` documents winner selection with visual and performance evidence.
- [ ] Production luminance background path uses the winning backend only; losing backends remain accessible only via spike/test tooling or are removed.
- [ ] No colored fringes on neutral master across the winning backend's F01–F09 output.

## Verification commands

```bash
node scripts/luminance-visual-regression.mjs --spike --backend=svg --fixtures=F01,F02,F03,F04,F05,F06,F07,F08,F09
node scripts/luminance-visual-regression.mjs --spike --backend=remotion --fixtures=F01,F02,F03,F04,F05,F06,F07,F08,F09
node scripts/luminance-visual-regression.mjs --spike --backend=precompute --fixtures=F01,F02,F03,F04,F05,F06,F07,F08,F09
```

Expected: 27 stills produced; spike report includes duration and memory columns; research doc committed with declared winner.

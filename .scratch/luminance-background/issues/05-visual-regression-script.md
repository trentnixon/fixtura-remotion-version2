# 05 — Visual regression script

**What to build:** A dedicated luminance visual-regression script with spike, regress, calibrate-same-env, calibrate-cross-env, and update-baselines modes. Pixel comparison and reporting live in one place (pixelmatch). Threshold calibration reuses this script — no duplicate compare logic elsewhere.

**Blocked by:** 02 — Global background routing and first render path

**Status:** ready-for-agent

## Acceptance criteria

- [ ] Script supports modes: `--spike`, `--regress` (default), `--calibrate-same-env`, `--calibrate-cross-env`, `--update-baselines`.
- [ ] Spike mode renders without requiring committed baselines and accepts a `--backend` argument.
- [ ] Compare/report functions are exported or shared so calibration modes invoke the same pixelmatch logic as regression.
- [ ] Regression mode compares rendered PNGs to committed baselines using `THRESHOLD_SAME_ENV` once calibrated (placeholder threshold acceptable until ticket 07).
- [ ] Script reports per-fixture diff ratio and optional diff PNG output on failure.
- [ ] `package.json` exposes an npm script entry for local invocation.

## Verification commands

```bash
node scripts/luminance-visual-regression.mjs --spike --backend=svg --fixtures=F01
node scripts/luminance-visual-regression.mjs --help
```

Expected: spike mode renders F01 and prints comparison summary (even if no baseline exists yet); help documents all modes.

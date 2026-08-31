# 07 — Baselines and dual-threshold calibration

**What to build:** F01–F09 baselines committed for the winning backend. `THRESHOLD_SAME_ENV` (tight, local regression) and `THRESHOLD_CROSS_ENV` (wider, local↔Lambda on F01, F06, F09) are calibrated via the visual-regression script. Results documented in research notes.

**Blocked by:** 06 — Backend spike and winner selection

**Status:** ready-for-agent

## Acceptance criteria

- [ ] Baseline PNGs committed for F01–F09 using the winning backend only.
- [ ] Total baseline size reviewed; Git LFS not introduced unless totals reach tens of MB.
- [ ] `--calibrate-same-env` run on F01–F09: 3× local renders per fixture; `THRESHOLD_SAME_ENV` set to max observed diff + margin.
- [ ] `--calibrate-cross-env` run on F01, F06, F09: 3× local + 5× Lambda renders; `THRESHOLD_CROSS_ENV` set to max local↔Lambda diff + margin.
- [ ] Local↔local re-render sanity check near zero on winning backend.
- [ ] Threshold constants stored in script config; `.research/luminance-threshold-calibration.md` records values and calibration runs.
- [ ] Full `--regress` pass green against committed baselines using `THRESHOLD_SAME_ENV`.

## Verification commands

```bash
node scripts/luminance-visual-regression.mjs --update-baselines --fixtures=F01,F02,F03,F04,F05,F06,F07,F08,F09
node scripts/luminance-visual-regression.mjs --calibrate-same-env --fixtures=F01,F02,F03,F04,F05,F06,F07,F08,F09
node scripts/luminance-visual-regression.mjs --calibrate-cross-env --fixtures=F01,F06,F09
node scripts/luminance-visual-regression.mjs --regress --fixtures=F01,F02,F03,F04,F05,F06,F07,F08,F09
```

Expected: baselines committed; calibration doc updated; regress exits 0 with locked thresholds.

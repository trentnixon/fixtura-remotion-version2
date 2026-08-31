# Luminance threshold calibration

Status: pending calibration run

## Thresholds

- `THRESHOLD_SAME_ENV` — default `0.01` via `scripts/luminance-visual-regression-config.mjs`
- `THRESHOLD_CROSS_ENV` — default `0.03` via `scripts/luminance-visual-regression-config.mjs`

## Procedure

1. Choose backend winner and commit baselines:
   - `node scripts/luminance-visual-regression.mjs --update-baselines --backend=<winner>`
2. Calibrate same-environment threshold:
   - `node scripts/luminance-visual-regression.mjs --calibrate-same-env --backend=<winner>`
   - Run 3 local re-renders per fixture and set `LUMINANCE_THRESHOLD_SAME_ENV` to max diff + margin.
3. Calibrate cross-environment threshold on F01, F06, F09:
   - `node scripts/luminance-visual-regression.mjs --calibrate-cross-env --backend=<winner>`
   - Run 3 local + 5 Lambda renders; set `LUMINANCE_THRESHOLD_CROSS_ENV` to max local↔Lambda diff + margin.

## Recorded values

TBD after calibration run.

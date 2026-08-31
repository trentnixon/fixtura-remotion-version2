# 08 — Asset ingest validation and dynamic canary CI

**What to build:** When luminance library assets change, CI runs ingest validation (channel neutrality, reject embedded profiles, histogram range) without modifying committed files. Each changed asset gets at least one render-success still. Fixed pixel checks on F01, F06, F09 canonical masters. Deploy verification HEAD-checks the stable verify canonical asset.

**Blocked by:** 05 — Visual regression script; 07 — Baselines and dual-threshold calibration

**Status:** ready-for-agent

## Acceptance criteria

- [ ] Asset validation script rejects files with embedded ICC/color profiles (does not rewrite committed assets).
- [ ] Asset validation script checks channel neutrality and minimum tonal histogram spread.
- [ ] CI job runs on path filter `public/luminance/**` changes (not pre-commit hooks).
- [ ] Dynamic canary: each changed asset (excluding stable verify asset unless it changed) renders ≥1 still with render-success only — no baseline required per library file.
- [ ] Fixed pixel regression on canonical masters: F01, F06, F09 using `THRESHOLD_SAME_ENV`.
- [ ] Deploy verification includes HEAD check for the stable verify canonical asset.
- [ ] `package.json` exposes npm script for local asset validation.

## Verification commands

```bash
node scripts/validate-luminance-assets.mjs public/luminance/
node scripts/luminance-visual-regression.mjs --regress --fixtures=F01,F06,F09
npm run deploy:verify
```

Expected: validation passes on committed canonical assets; F01/F06/F09 regress green; deploy verify reports verify asset reachable (when run against deployed site).

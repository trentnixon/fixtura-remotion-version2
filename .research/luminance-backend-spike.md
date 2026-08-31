# Luminance backend spike

Status: pending local spike run

## Candidates

- `svg` — inline SVG filter chain with luminance neutralization and per-channel LUT tables
- `remotion` — same filter chain applied through Remotion `<Img>` styling path
- `precompute` — same filter chain today; reserved for future raster bake path

## Procedure

1. Ensure fixture assets exist: `npm run luminance:generate-assets`
2. Render F01–F09 for each backend:
   - `node scripts/luminance-visual-regression.mjs --spike --backend=svg --fixtures=F01,F02,F03,F04,F05,F06,F07,F08,F09`
   - repeat for `remotion` and `precompute`
3. Record visual differences, render duration, and memory from script output.
4. Select production backend and gate/remove losers from the default luminance path.

## Winner

TBD after spike run.

# 03 — Foreground protection and F01–F09 fixture registry

**What to build:** Approved scrim/vignette presets sit between the mapped image and composition content (outside the luminance map). The complete F01–F09 fixture registry is implemented with prop presets for the test composition. All nine fixtures render successfully on the SVG backend, including missing-asset fallback (F09) and protection variants (F02, F06).

**Blocked by:** 02 — Global background routing and first render path

**Status:** ready-for-agent

## Acceptance criteria

- [ ] Foreground protection presets implemented (at minimum: none, bottom-weighted, center-vignette) using palette-derived neutrals.
- [ ] Layer order: mapped image → foreground protection → composition content (protection not inside the LUT path).
- [ ] Component test asserts explicit layer order or z-index values between protection and content layers.
- [ ] Complete fixture registry F01–F09 defined with prop presets:

| ID  | Map                          | Asset                       | Protection      |
| --- | ---------------------------- | --------------------------- | --------------- |
| F01 | theme / brand                | smooth-ramp                 | none            |
| F02 | theme / brand                | smooth-ramp                 | bottom-weighted |
| F03 | theme / brand-with-accent    | high-contrast               | none            |
| F04 | theme / tonal-brand fallback | problematic palette         | none            |
| F05 | stops / uneven (4-stop)      | smooth-ramp                 | none            |
| F06 | stops / uneven               | high-contrast               | center-vignette |
| F07 | theme / protected-brand      | test007 (lossless linework) | none            |
| F08 | theme / brand + reverse      | smooth-ramp                 | none            |
| F09 | missing asset key            | —                           | fallback        |

- [ ] Each F01–F09 preset renders a still successfully on the SVG backend.
- [ ] F09 demonstrates defined missing-asset fallback (not hero image, not stock URL).
- [ ] F02 and F06 visibly differ from their no-protection counterparts in still output.

## Verification commands

```bash
npm test
node scripts/luminance-render-fixtures.mjs --backend=svg --fixtures=F01,F02,F03,F04,F05,F06,F07,F08,F09
```

Expected: component/layer-order tests pass; all nine stills written under `out/luminance-smoke/`. If a dedicated fixture render helper does not exist yet, implement it in this ticket or invoke nine `remotion still` commands with the F01–F09 props files.

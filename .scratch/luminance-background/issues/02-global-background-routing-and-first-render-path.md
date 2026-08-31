# 02 — Global background routing and first render path

**What to build:** `useBackground: "Luminance"` routes through the central background selector to a new luminance background component on the base layout background layer. Template variation carries the luminance configuration contract. One render backend (SVG) loads a canonical grayscale master, neutralizes tone, applies the map, and renders fixture F01 via a parameterized test composition.

**Blocked by:** 01 — Parse boundary and luminance map resolution

**Status:** ready-for-agent

## Acceptance criteria

- [ ] `Luminance` is registered alongside existing global background options and selectable via `useBackground: "Luminance"`.
- [ ] Central background selector dispatches to the luminance background component without Image hero precedence or Image overlay behavior.
- [ ] Template variation schema includes a luminance configuration block consumed by the luminance background.
- [ ] Parameterized test composition exists and accepts props for fixture preset F01.
- [ ] SVG render backend: grayscale neutralization → pre-map tone controls → three-channel LUT → Remotion image render completes for F01.
- [ ] SVG filter IDs use sanitized per-instance unique identifiers.
- [ ] Still render for F01 completes without error.

## Verification commands

```bash
npm test
npm run lint
npx remotion still src/index.ts Luminance-Test out/luminance-smoke/F01.png --frame=0 --props=.scratch/luminance-background/fixtures/F01.json
```

Expected: unit tests pass; TypeScript clean; F01 still PNG written. Create the F01 props fixture as part of this ticket if it does not exist yet.

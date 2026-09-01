# Effects-solid upgrade guide — local first, then cloud

**Date:** 2026-08-31  
**Status:** Active — local verification in progress  
**Scope:** Roll out WebGL2 **effects-solid** Generated presets, starting with `light-leak`

**Related:**

- `.scratch/generated-backgrounds/remotion-prototype-promotion-plan.md`
- `.scratch/generated-backgrounds/remotion-options.md`
- `.scratch/generated-backgrounds/implementation-handoff.md`
- `src/components/backgrounds/variants/Generated/renderers/effects-solid/`

---

## What changed

The Generated catalogue gained a new renderer adapter: **`effects-solid`**.

| Preset (today) | Adapter         | Stack                                         | WebGL |
| -------------- | --------------- | --------------------------------------------- | ----- |
| `light-leak`   | `effects-solid` | `linearGradient` → `lightLeak()` → `vignette` | Yes   |

Existing **25** pattern / noise / particle presets are unchanged — they do **not** need WebGL render options.

**Wire (operator-facing):**

```json
{
  "useBackground": "Animated",
  "animation": { "type": "light-leak" }
}
```

Six internal light-leak variants are chosen deterministically from  
`compositionId|primary|secondary` — operators do not pick a variant.

Colours **must** come from `video.appearance.theme` → `ThemeProvider` →  
`selectedPalette.background.main` / `.accent`.

---

## Phase A — Local setup (do this first)

### A1. Install dependencies

```powershell
npm ci
```

Production dependencies (must be present for Lambda bundle):

- `@remotion/effects@4.0.499`
- `@remotion/light-leaks@4.0.499`

Both are in `dependencies` (not dev-only).

### A2. WebGL config (local)

`remotion.config.ts` sets:

```ts
Config.setChromiumOpenGlRenderer("angle");
```

This applies to **Studio** and **CLI render** in this repo.  
It does **not** apply to Lambda Node API calls (see Phase B).

### A3. Studio preview

```powershell
npm run dev
```

| Path                                                               | Purpose                                                 |
| ------------------------------------------------------------------ | ------------------------------------------------------- |
| `EffectsSolid-Test` → `EffectsSolid-Background-Test`               | Isolated background only — fast palette / variant check |
| `{Template}` → `Animated` → `light-leak` → `{Sport}` → `{Dataset}` | Full template integration (same wire as production)     |

CLI smoke uses composition id **`EffectsSolid-Background-Test`** for isolated  
WebGL proof (registered in both `DevelopmentRoot` and `ProductionRoot`).

Recommended first integration check:

`Mudgeeraba` → `Animated` → `light-leak` → `Cricket` → `Results`

Uses real club colours from `testData/samples/Cricket/Cricket_Results.json`.

### A4. Unit tests

```powershell
npm run test -- src/components/backgrounds/variants/Generated/renderers/effects-solid
```

Covers variant seed stability and catalogue / ingress wiring.

### A5. Render smoke (local WebGL proof)

```powershell
npm run render:effects-solid:smoke
```

Or a single fixture:

```powershell
node scripts/effects-solid-render-smoke.mjs --fixtures=light-leak-isolated
```

**Output:** `out/effects-solid-smoke/{fixture-id}/frame-*.png`

**Fixtures:**

| ID                                | Mode                    | What it proves                       |
| --------------------------------- | ----------------------- | ------------------------------------ |
| `light-leak-isolated`             | Isolated Basic template | WebGL stack + palette + variant hash |
| `light-leak-mudgeeraba-results`   | Integration             | Full Mudgeeraba + Cricket Results    |
| `light-leak-broadcastpro-results` | Integration             | BroadcastPro readability             |

Smoke script passes `--gl=angle` explicitly (belt-and-braces with config).

**Pass criteria:**

- PNGs exist and show gradient + leak (not flat fill / black)
- Same fixture re-run → identical pixels (deterministic variant)
- Changing `appearance.theme.primary/secondary` in props → colours change

Combined local gate:

```powershell
npm run clean:cache
npm run test:effects-solid
```

If webpack throws `WasmHash ... Cannot read properties of undefined`, run  
`npm run clean:cache` once and retry.

### A6. Manual checks before cloud

- [ ] Scrub timeline — leak animates over 12s loop
- [ ] Text / logos readable on Mudgeeraba and BroadcastPro
- [ ] Variant stable across re-render of same dataset
- [ ] Different `compositionId` or palette → different variant (visual variety)

---

## Phase B — Cloud rollout (after local gate passes)

### B1. Deploy Remotion site bundle

From `RemotionV2`:

```powershell
npm run deploy
```

This uploads the webpack bundle + public assets to:

`https://remotionlambda-69q0up4r9e.s3.ap-southeast-2.amazonaws.com/sites/fixtura-remotion-v2/`

Verify:

```powershell
npm run deploy:verify
```

**Lambda function redeploy** is only required when:

- Remotion / `@remotion/lambda` version changes, or
- Function memory / timeout / concurrency settings change

Adding `light-leak` code is a **site** update, not necessarily a function update.

### B2. Creators render caller — WebGL on Lambda

Lambda has no GPU. WebGL2 presets **must** use software WebGL:

| Environment        | `chromiumOptions.gl`                 |
| ------------------ | ------------------------------------ |
| Local CLI / Studio | `angle` (via config or `--gl=angle`) |
| Lambda / server    | **`swangle`**                        |

Example for `renderMediaOnLambda` (Fixtura Creators service — adjust to your API):

```ts
await renderMediaOnLambda({
  region: "ap-southeast-2",
  functionName: "<your-function>",
  serveUrl: "<fixtura-remotion-v2-site-url>",
  composition: "<templateId>-Animated-<compositionId>",
  inputProps: { data: payload },
  codec: "h264",
  chromiumOptions: {
    gl: "swangle",
  },
  // Consider raising timeout / memory for WebGL frames on first spike
});
```

**Important:** `remotion.config.ts` does **not** apply to Node render APIs.  
The caller must pass `chromiumOptions` (or equivalent CLI flag for local parity tests).

**Suggested routing rule in Creators:**

```
if animation.type is effects-solid preset (starts with light-leak, later halftone, etc.)
  → chromiumOptions.gl = "swangle"
else
  → default (omit or existing setting)
```

Maintain a shared list aligned with `rendererAdapterRegistry` in the catalogue.

### B3. Lambda smoke (cloud)

After deploy + caller update:

1. Render one short clip with `light-leak` on Cricket Results (Mudgeeraba).
2. Compare a still frame to local `out/effects-solid-smoke/` output (same props).
3. Confirm no black background / WebGL fallback errors in CloudWatch.
4. If OOM or timeout → increase Lambda memory (try 2048MB+) and timeout for spike.

### B4. CMS / operator visibility

`light-leak` is in the catalogue and contract but **`operatorVisibility` is still unresolved** (hidden from operator picker until spike passes).

After local + Lambda spikes:

1. Set `operatorVisibility.status` → `resolved-visible` in `catalogue.ts`
2. Run `npm run build:generated-backgrounds-contract`
3. Ingest updated `public/generated-backgrounds/cms-ingest.json` into CMS
4. Enable preset in operator UI

**Ingress id:** `ingress-animated-light-leak`

---

## Phase C — Future effects-solid presets

When promoting the next prototype families (see promotion plan Phase D):

| Planned preset       | WebGL                                           | Local test                  | Lambda    |
| -------------------- | ----------------------------------------------- | --------------------------- | --------- |
| `broadcast-halftone` | Yes                                             | Add fixture to smoke config | `swangle` |
| `topographic-flow`   | Yes                                             | Add fixture                 | `swangle` |
| `signal-grid`        | Yes                                             | Add fixture                 | `swangle` |
| `wave-field`         | Yes                                             | Add fixture                 | `swangle` |
| `neon-sweep`         | Yes                                             | Add fixture                 | `swangle` |
| `energy-burst`       | Yes (may need Remotion upgrade for `starburst`) | TBD                         | `swangle` |

**Does not use effects-solid / swangle:**

- Pattern, particle, noise, SVG spokes (existing 25)
- Lottie / Rive motion motifs (separate lane — Phase E)
- Html-in-canvas, WebGPU, Stadium 3D (experimental — Phase F)

For each new effects-solid preset:

1. Implement under `renderers/effects-solid/{preset}/`
2. Register in `catalogue.ts` + `AnimatedBackground.tsx`
3. Add smoke fixture to `scripts/effects-solid-smoke-config.mjs`
4. Extend Creators `swangle` preset list
5. Local gate → deploy → Lambda spike → CMS visibility

---

## Rollout checklist

### Local (Phase A)

- [ ] `npm ci`
- [ ] `npm run lint`
- [ ] `npm run test:effects-solid`
- [ ] Studio: `EffectsSolid-Test` + one template integration
- [ ] Document any readability issues on real templates

### Cloud (Phase B)

- [ ] `npm run deploy`
- [ ] Creators: `chromiumOptions.gl = "swangle"` for effects-solid presets
- [ ] Lambda render spike (short clip + still parity)
- [ ] CloudWatch clean (no WebGL errors)
- [ ] CMS contract rebuild + ingest
- [ ] Operator visibility enabled

---

## Troubleshooting

| Symptom                        | Likely cause                                | Fix                                                               |
| ------------------------------ | ------------------------------------------- | ----------------------------------------------------------------- |
| Black / empty background       | WebGL unavailable                           | Local: `--gl=angle`. Lambda: `swangle`                            |
| Flat gradient, no leak         | `@remotion/light-leaks` missing from bundle | Move to `dependencies`, redeploy site                             |
| Different variant every render | Seed inputs changing                        | Ensure stable `compositionId`, `theme.primary`, `theme.secondary` |
| Studio works, Lambda fails     | Config not applied on API                   | Pass `chromiumOptions` in Creators caller                         |
| OOM on Lambda                  | WebGL software renderer memory              | Increase Lambda memory; reduce concurrency during spike           |

---

## File reference

| File                                                                                                         | Role                                                    |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| `remotion.config.ts`                                                                                         | Local ANGLE default                                     |
| `src/components/backgrounds/variants/Generated/renderers/effects-solid/lightLeak/`                           | Production renderer                                     |
| `src/components/backgrounds/variants/Generated/renderers/effects-solid/test/EffectsSolidTestComposition.tsx` | Isolated Studio fixture                                 |
| `src/DevelopmentRoot.tsx`                                                                                    | Registers `EffectsSolid-Test` + Animated catalogue tree |
| `scripts/effects-solid-smoke-config.mjs`                                                                     | Smoke fixture definitions                               |
| `scripts/effects-solid-render-smoke.mjs`                                                                     | Local render smoke runner                               |
| `public/generated-backgrounds/cms-ingest.json`                                                               | CMS contract (regenerate after visibility change)       |

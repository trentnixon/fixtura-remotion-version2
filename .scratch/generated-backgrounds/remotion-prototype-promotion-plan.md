# Remotion prototype → Generated catalogue promotion plan

**Date:** 2026-08-31  
**Status:** Planned — not authorized for production catalogue changes  
**Scope:** Promote retained work from `.scratch/remotion-background-effects-prototype/` into the Generated catalogue model  
**Depends on:**

- `.scratch/remotion-background-effects-prototype/handoff.md`
- `.research/2026-08-30-remotion-background-options-and-integrations.md`
- `.scratch/generated-backgrounds/catalogue-contract.md`
- `.scratch/generated-backgrounds/remotion-options.md`
- `.scratch/generated-backgrounds/implementation-handoff.md`
- `CONTEXT.md` (Generated background wire vocabulary)

---

## Purpose

The background-effects prototype studio answered whether Remotion can produce
readable Fixtura broadcast backgrounds. Visual review is largely complete.

This document plans how retained prototype compositions become **Generated
catalogue presets** — including grouping, internal variants, operator UX, renderer
adapters, and promotion gates.

It does **not** authorize catalogue or production code changes by itself.

---

## Hard constraints (confirmed)

### Background colours MUST come from the data object

All promoted Generated presets **must** derive render colours from the active
video/club palette in the composition **data object** — not from template
defaults, hardcoded hex values, or isolated prototype fixtures.

**Production path today:**

1. Club colours arrive on the payload as `video.appearance.theme` (typically
   `primary` and `secondary` from the user's saved theme / club branding).
2. `ThemeProvider` reads `video.appearance.theme` and `video.templateVariation`
   from `VideoDataContext` and builds a `colorSystem` via `createColorSystem()`.
3. Renderers consume `selectedPalette` through `useThemeContext()` or
   `useStylesContext()` — e.g. `selectedPalette.background.main` and
   `selectedPalette.background.accent` for GridNoise-style two-colour fields.

See `src/core/context/ThemeContext.tsx` — user-derived colours **must** override
template `settings.colors`.

**Catalogue contract:** new presets declare `paletteBehavior` with
`mode: "active-palette"` and document which palette **roles** they consume.
Unresolved palette behaviour excludes a preset from the derived operator list
(`catalogue-contract.md`).

**Recommended two-colour roles for effects-solid presets** (align with inventory):

| Role                | Typical source                    | Use for                                    |
| ------------------- | --------------------------------- | ------------------------------------------ |
| `background.main`   | Derived from data theme primary   | Gradient start, vignette anchor, base fill |
| `background.accent` | Derived from data theme secondary | Gradient end, leak hue basis, glow accent  |

`lightLeak` `hueShift` must be computed from the resolved accent/main hex at
render time — not from a static prototype palette.

**Prototype exception (test-only):** compositions under
`.scratch/remotion-background-effects-prototype/` currently import
`baseTheme` from `src/templates/base/theme.ts` as an isolated fixture. That
pattern is **invalid for production**. Promotion work must replace every
`baseTheme.colors.*` usage with `selectedPalette` (or passed palette props from
the Generated adapter boundary).

**Verification:** promotion gate must include at least one real dataset render
(e.g. `testData/samples/Cricket/Cricket_Results.json`) and confirm colours
track `appearance.theme` when club primary/secondary change.

---

## What is done

### Prototype studio

- Location: `.scratch/remotion-background-effects-prototype/`
- Run: `npm run prototype:halftone` (Studio port `3012`)
- **33 retained compositions** after lane-by-lane review
- Dependencies in use: `@remotion/effects@4.0.499`, `@remotion/light-leaks@4.0.499`,
  `@remotion/three`, `@remotion/lottie`, `@remotion/rive`

### Animation option test queue

| Result                               | Lanes                                                                                                                            |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **Approved in studio**               | Light leak (×6), Rive tiled, Html-in-canvas (×4), WebGPU (×3), Stadium 3D, Motion motif (×2)                                     |
| **Retained, pending final sign-off** | Halftone wave, Topographic (×3), Signal grid (×2), Wave field (×3), Neon sweep (×2), Reactive path (×2), Energy burst (fallback) |
| **Rejected**                         | Light trail, paper club, brand geometry, pixel matrix, animated texture tile, plus trimmed variants within kept lanes            |

### Verification completed (local prototype only)

- TypeScript check passed
- Still and short H.264 renders at `1080×1350` with `--gl=angle` for many lanes
- Deterministic repeated frame-0 checks for several families

### Not done

- Lambda / server render spike
- Memory benchmarks
- Production catalogue entries or adapter wiring
- CMS ingest rows for new presets (except existing Phase 1 inventory work)

---

## Product model (confirmed)

### One operator product bucket

All new presets are **Generated backgrounds**:

```text
useBackground: "Animated"
animation.type: "<preset-id>"
```

Operators choose **preset names**, not renderer families (Graphics, Pattern,
Noise, WebGPU, etc.). See `CONTEXT.md`.

Generated Phase 1 consolidation (25 legacy presets) runs on a **separate
approved track**. New Remotion presets are **post–Phase 1** unless product
explicitly selects Option B or C in `remotion-options.md`.

### Operator browse groups (visual families)

Do not expose one flat list of 33 items. Group presets by **what they look
like**, not how they are built:

| Browse group            | Visual idea                              | Prototype source                                             |
| ----------------------- | ---------------------------------------- | ------------------------------------------------------------ |
| **Procedural fields**   | Palette-driven motion, no designer asset | Halftone, Topographic, Signal grid, Wave field, Energy burst |
| **Light & energy**      | Flares, beams, radial hype               | Neon sweep, Light leak, Energy burst                         |
| **Data / route motion** | Lines, marks, fixture-adjacent motion    | Reactive path                                                |
| **Motion assets**       | Designer Lottie / Rive loops             | Motion motif, Rive tiled                                     |
| **Broadcast graphics**  | DOM/SVG captured to canvas               | Html-in-canvas                                               |
| **3D / materials**      | Depth, pitch, shader looks               | Stadium field, WebGPU lab                                    |

CMS and Studio discovery should use these groups for navigation. Wire remains
`Animated` + preset id.

### Internal variants vs operator choice

Many prototype compositions are **variants of one visual family**. Operators
should not pick every variant unless product explicitly wants that.

| Pattern                        | Operator sees                       | Engineering holds                        |
| ------------------------------ | ----------------------------------- | ---------------------------------------- |
| **Single preset**              | One catalogue row                   | One default recipe                       |
| **Family + internal variants** | One catalogue row                   | Variant registry; selection policy below |
| **Explicit variants**          | Multiple rows (avoid unless needed) | Separate preset ids                      |

**Confirmed for light leak:** one operator preset, six internal variants, no
operator variant picker.

---

## Preset family map (prototype → catalogue)

Target shape: **~12–15 catalogue families** from 33 studio compositions.

| Proposed preset id   | Display name (draft)         | Internal variants                      | Adapter                                   | Promotion tier                       |
| -------------------- | ---------------------------- | -------------------------------------- | ----------------------------------------- | ------------------------------------ |
| `broadcast-halftone` | Broadcast Halftone           | 1 (wave)                               | `effects-solid`                           | Ready after spike                    |
| `topographic-flow`   | Topographic Flow             | 3 (baseline, fine, smooth)             | `effects-solid`                           | Pending final sign-off               |
| `signal-grid`        | Signal Grid                  | 2 (floor, inverted floor)              | `effects-solid`                           | Pending final sign-off               |
| `energy-burst`       | Energy Burst                 | 1 (rings+glow fallback)                | `effects-solid`                           | Partial — full stack needs upgrade   |
| `wave-field`         | Wave Field                   | 3 (baseline, wide rows, vertical)      | `effects-solid`                           | Pending final sign-off               |
| `neon-sweep`         | Neon Sweep                   | 2 (wide beams, heavy glow)             | `effects-solid`                           | Pending final sign-off               |
| `light-leak`         | Light Leak                   | 6 (see below)                          | `effects-solid` + `@remotion/light-leaks` | **First promotion candidate**        |
| `reactive-path`      | Reactive Path                | 2 (orbits, hits)                       | `shapes-paths`                            | Pending final sign-off + domain data |
| `motion-motif`       | Motion Motif                 | 2 (centred, tiled)                     | `motion-asset`                            | Blocked on asset ingest              |
| `rive-motif`         | Rive Motif                   | 1 (tiled field)                        | `motion-asset`                            | Blocked on asset ingest              |
| `html-in-canvas`     | HTML Canvas _(name TBD)_     | 4 (broadcast, orbit, scoreboard, neon) | `html-in-canvas` _(new)_                  | Experimental                         |
| `stadium-field`      | Stadium Field                | 1 (low sweep)                          | `three-scene`                             | Experimental                         |
| `webgpu-material`    | WebGPU Material _(name TBD)_ | 3 (metal, contour, sheen)              | `three-scene`                             | Experimental                         |

Variant selection policy per family is an open product decision (see below).
Light leak is decided: stable random among six.

---

## Light leak — production spec (approved direction)

### Operator experience

- **One** catalogue entry: `light-leak`
- **One** CMS picker row and preview
- **`operatorControls: []`** — preset only
- Operators do **not** choose warm / cool / dual / etc.

### Internal variant registry

Map from prototype compositions in `LightLeakPrototype.tsx`:

| Variant key     | Prototype composition            | Notes                             |
| --------------- | -------------------------------- | --------------------------------- |
| `warm-flare`    | `LightLeakWarmFlarePrototype`    | Diagonal gradient, secondary hue  |
| `cool-flare`    | `LightLeakCoolFlarePrototype`    | Diagonal gradient, primary hue    |
| `slow-breathe`  | `LightLeakSlowBreathePrototype`  | One swell per 12s loop            |
| `dual-flare`    | `LightLeakDualFlarePrototype`    | Warm + cool, half-cycle offset    |
| `vertical-wash` | `LightLeakVerticalWashPrototype` | Top-to-bottom wash                |
| `soft-bloom`    | `LightLeakSoftBloomPrototype`    | Horizontal wash, lighter vignette |

### Variant selection (deterministic)

Do **not** use per-frame `Math.random()`.

**Recommended:** stable hash at render time:

```text
variantIndex = hash(renderId | compositionId | clubId | datasetId) % 6
```

Same inputs → same variant on every re-render. Different videos/clubs → natural
variety without operator choice.

**Alternative:** assign once at CMS save into author-only payload field
(`animation.variant` or internal metadata). Operator still never sees it.

Optional later: **weighted** selection (e.g. favour `soft-bloom` and
`slow-breathe` if dual-flare fails readability on some templates).

### Renderer stack

```text
linearGradient (primary → secondary) → lightLeak() → vignette
```

- **Palette (required):** from data object via `useThemeContext().selectedPalette`
  — e.g. `background.main` + `background.accent` (not `baseTheme`, not author
  hex constants)
- `lightLeak`: `seed`, `hueShift` (from resolved palette hex), `progress` from
  variant config + frame loop
- WebGL2 — local and Lambda render spike required (`--gl=angle`, swangle path)

### Wire (egress)

Minimal operator-facing payload:

```json
{
  "useBackground": "Animated",
  "animation": {
    "type": "light-leak"
  }
}
```

No variant field required if using hash-based selection. Add hidden field only
if CMS-freeze pattern is chosen.

### Catalogue entry (draft metadata)

| Field                | Value                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| `id`                 | `light-leak`                                                                                      |
| `displayName`        | Light Leak                                                                                        |
| `rendererAdapter`    | `effects-solid`                                                                                   |
| `readabilityPolicy`  | vignette + safe region (from prototype)                                                           |
| `operatorVisibility` | resolved-visible _(after spike)_                                                                  |
| `operatorControls`   | `[]`                                                                                              |
| `paletteBehavior`    | `{ status: "resolved", mode: "active-palette", roles: ["background.main", "background.accent"] }` |
| `authorControls`     | Document six variant keys and hash policy — metadata only Phase 1                                 |

---

## Engineering adapters

New presets extend the catalogue; they do not replace Phase 1 adapters until
product approves retirement.

| Adapter          | Prototype families                                                             |
| ---------------- | ------------------------------------------------------------------------------ |
| `effects-solid`  | Halftone, Topographic, Signal grid, Wave field, Neon, Light leak, Energy burst |
| `shapes-paths`   | Reactive path                                                                  |
| `motion-asset`   | Motion motif, Rive motif                                                       |
| `three-scene`    | Stadium field, WebGPU material                                                 |
| `html-in-canvas` | Html-in-canvas family _(new adapter key — contract update required)_           |

One catalogue entry + one adapter route per preset family (`catalogue-contract.md`).

---

## Promotion gate (all new presets)

Before any preset becomes operator-selectable:

1. Confirm effect APIs exist at pinned Remotion version (or upgrade only when required).
2. Render still + short sequence locally at `1080×1350`.
3. Test WebGL path locally (`--gl=angle`).
4. Test Lambda / target server render path (swangle where applicable).
5. Compare deterministic frames on re-render.
6. Measure render time and memory.
7. Check foreground readability with representative template content (e.g. Cricket Results fixtures).
8. Confirm background colours track `video.appearance.theme` / `selectedPalette` — not hardcoded palette fixtures.
9. Add **one** catalogue entry + **one** adapter route.
10. Publish CMS ingest row derived from catalogue — not hand-edited lists.

---

## Planned work phases

### Phase A — Close prototype review

- [ ] Final keep/reject on lanes still marked pending (Topographic, Signal grid, Wave field, Neon, Reactive path, Energy burst, Halftone)
- [ ] Confirm variant selection policy for each family (random / default / explicit)
- [ ] Update `.scratch/remotion-background-effects-prototype/handoff.md` when complete

### Phase B — Preset family specification

- [ ] Freeze preset id list and internal variant tables (this document → approved)
- [ ] Draft readability policy per family
- [ ] Resolve naming for experimental families (html-in-canvas, webgpu-material)
- [ ] Decide CMS preview strategy (single still vs montage for random-variant families)

### Phase C — Light leak promotion (first candidate)

- [x] Extract variant registry from `LightLeakPrototype.tsx` into production renderer module
- [x] Wire palette from `useThemeContext().selectedPalette` — remove `baseTheme` dependency in production path
- [x] Implement deterministic variant resolver (hash or CMS-freeze)
- [x] Add `effects-solid` route for `light-leak` via `AnimatedBackground`
- [x] Add catalogue entry + ingress rows per contract
- [ ] Run full promotion gate for light leak
- [x] One CMS ingest row (via `build:generated-backgrounds-contract`)

### Phase D — Batch promote effects-solid families

Ordered by pipeline proof value (`remotion-options.md`):

1. `broadcast-halftone`
2. `topographic-flow`
3. `signal-grid`
4. `wave-field`
5. `neon-sweep`
6. `energy-burst` _(may block on Remotion upgrade for `starburst()` / full stack)_

Apply same internal-variant rules as light leak where product agrees.

### Phase E — Motion asset lane

- [ ] Asset ingest contract for Lottie / Rive
- [ ] Palette recolour path (`linearGradientTint`, `onLoad` for Rive)
- [ ] Promote `motion-motif` and `rive-motif`

### Phase F — Experimental lane

- [ ] Html-in-canvas: render parity, Chrome flag documentation, adapter contract
- [ ] WebGPU material lab: Lambda memory + determinism
- [ ] Stadium field 3D: cricket example → generalizable preset or sport-specific id

### Parallel track — Generated Phase 1 (existing programme)

WP-1–WP-8 under `.scratch/generated-backgrounds/issues/` — consolidate **25
inventory presets**. Does not block Phase A–B documentation; blocks operator
visibility of **new** presets until product chooses post–Phase 1 release scope.

---

## Open product decisions

| #   | Question                                                                  | Default engineering stance                        |
| --- | ------------------------------------------------------------------------- | ------------------------------------------------- |
| 1   | Post–Phase 1 scope: Option A, B, or C (`remotion-options.md`)?            | Option A unless product chooses B/C               |
| 2   | Which families use stable random vs fixed default variant?                | Light leak = stable random; others TBD in Phase A |
| 3   | Variant weights for random selection?                                     | Equal until readability testing says otherwise    |
| 4   | Light leak CMS preview: one still or variant montage?                     | Product / design                                  |
| 5   | Energy burst: ship fallback or wait for `starburst()` upgrade?            | Wait for upgrade if “full” identity is required   |
| 6   | Experimental presets: operator-visible ever, or author-only indefinitely? | Author-only until spike passes                    |

---

## Suggested ticket breakdown

| Ticket | Title                                          | Phase |
| ------ | ---------------------------------------------- | ----- |
| RPP-01 | Close pending prototype visual review          | A     |
| RPP-02 | Approve preset family map and variant policies | B     |
| RPP-03 | Light leak renderer + variant registry         | C     |
| RPP-04 | Light leak catalogue entry + ingress           | C     |
| RPP-05 | Light leak render spike (local + Lambda)       | C     |
| RPP-06 | Light leak CMS ingest row                      | C     |
| RPP-07 | `broadcast-halftone` promotion bundle          | D     |
| RPP-08 | Remaining effects-solid promotion batch        | D     |
| RPP-09 | Motion asset ingest + promotion                | E     |
| RPP-10 | Experimental adapter contracts + spikes        | F     |

Place execution tickets under `.scratch/generated-backgrounds/issues/` when work
is authorized.

---

## References

- Prototype handoff: `.scratch/remotion-background-effects-prototype/handoff.md`
- Research: `.research/2026-08-30-remotion-background-options-and-integrations.md`
- Shortlist: `.scratch/generated-backgrounds/remotion-options.md`
- Catalogue contract: `.scratch/generated-backgrounds/catalogue-contract.md`
- Phase 1 implementation: `.scratch/generated-backgrounds/implementation-handoff.md`
- Domain language: `CONTEXT.md`

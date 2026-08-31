# Generated background consolidation — implementation handoff

**Date:** 2026-08-28  
**Status:** Approved — implementation authorized  
**Approved:** 2026-08-28

**Phase:** WP-1 through WP-8 tracked as implementation tickets under `.scratch/generated-backgrounds/issues/`. WP-9 deferred.

---

## Goal

Present **one operator-facing Generated background option** that consolidates Graphics, Pattern, Particle, and Noise into a single catalogue, while:

- preserving legacy wire payloads and composition identity on no-change saves
- routing each preset through an independent renderer adapter
- deriving CMS discovery and ingress matching from one canonical source
- deferring `useBackground: "Generated"` as a production wire value (ADR 0002)

Generated is a **Studio/CMS grouping**, not a Phase 1 production wire value.

---

## Approved discovery package

| Document                      | Status              | Role                                               |
| ----------------------------- | ------------------- | -------------------------------------------------- |
| `handoff.md`                  | Authoritative brief | Scope and completion criteria                      |
| `decisions.md`                | Approved            | Product and engineering decisions                  |
| `current-preset-inventory.md` | Approved            | 26 ingress keys, runtime corrections RC-1–RC-6     |
| `catalogue-contract.md`       | Approved            | 25 visual presets, entry shape, discovery artifact |
| `compatibility-plan.md`       | Approved            | Ingress, sticky/canonical egress, invalid input    |
| `remotion-options.md`         | Approved            | Post–Phase 1 Remotion preset shortlist             |
| `effects-solid-upgrade-guide.md` | Active           | Local + cloud rollout for WebGL effects-solid presets |
| `discovery-surfaces.md`       | Approved            | CMS, production router, Studio, dev wiring         |

---

## Phase 1 scope

### In scope

- One in-repo Generated catalogue (25 visuals)
- Published `discovery-contract.json` + schema
- `matchLegacyIngress` — single canonical implementation
- Production router validation + catalogue adapters + Solid/diagnostic for unsupported
- CMS: `Background → Generated → Preset` (visibility per inventory)
- Sticky ingress / canonical egress / composition ID rules
- Studio dev tree: `{Template}/Generated/{presetId}/{Sport}/{Dataset}`
- Remove Graphics / Pattern / Particle from template registry variant list
- External doc updates (`.comms/TEMPLATES.md`, Guide cross-refs)

### Out of scope

- `useBackground: "Generated"` wire rollout
- New Remotion effect presets (`remotion-options.md` first wave)
- Visual audit, contact sheet, parity approval workflow
- Luminance consolidation
- Studio element catalogues (`addElementLibraryToStudio`, 4.0.518+)
- Studio schema / visual editing for catalogue `authorControls`
- Implementation tickets (until this handoff is approved)

---

## Current preset inventory (summary)

**26 legacy ingress keys** → **25 unique visuals**. Full detail: `current-preset-inventory.md`.

| Legacy family    | Count | Wire                                                    | Runtime entry        |
| ---------------- | ----: | ------------------------------------------------------- | -------------------- |
| Pattern          |     6 | `useBackground: "Pattern"` + `pattern.type`             | `PatternBackground`  |
| Particle         |     5 | `useBackground: "Particle"` + `particle.type`           | `ParticleBackground` |
| Noise / Graphics |    15 | `useBackground: "Noise"` or `"Graphics"` + `noise.type` | `NoiseBackground`    |

**Graphics** is not a separate preset list — legacy wire into the Noise pipeline switch.

**Inventory-only:** `noise.type: "graphics"` → displays as `balanced-noise` (RC-3: renders GridNoise default, not geometric SVG).

### Renderer adapters (Phase 1)

| Adapter          | Presets                                                                                                     | Count |
| ---------------- | ----------------------------------------------------------------------------------------------------------- | ----: |
| `pattern-tiled`  | dot-field, line-field, tile-grid, crosshatch-field, triangle-tile, chevron-field                            |     6 |
| `particle-field` | floating-dots, streak-lines, bubble-field, snow-field, confetti-field                                       |     5 |
| `grid-noise`     | balanced-noise, subtle-noise, grain-field, wave-noise, fog-field, tv-static, gradient-grid, pulsing-circles |     8 |
| `particle-noise` | floating-particles, dynamic-particles, triangle-swarm, digital-rain                                         |     4 |
| `svg-geometric`  | geometric-field                                                                                             |     1 |
| `svg-spokes`     | spokes-field                                                                                                |     1 |

### Runtime corrections (authoritative)

| #    | Fact                                                                  |
| ---- | --------------------------------------------------------------------- |
| RC-1 | Graphics and Noise share one switch; only `noise.type` selects preset |
| RC-2 | Missing `noise.type` → default GridNoise                              |
| RC-3 | `noise.type: "graphics"` → accidental GridNoise default               |
| RC-4 | Export map drift for `BackgroundComponents.Graphics`                  |
| RC-5 | `pattern.opacity` accepted, ignored at runtime                        |
| RC-6 | Sibling family blocks ignored when not active                         |

---

## Catalogue contract (summary)

Full shape: `catalogue-contract.md`. Contract version **`1.0.0`**.

| Artifact       | Path (proposed)                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| Discovery JSON | `public/generated-backgrounds/discovery-contract.json`                                                   |
| JSON schema    | `schemas/generated-backgrounds/discovery-contract.schema.json` (source-controlled; not under `.scratch`) |

Each `GeneratedCatalogueEntry` owns: stable visual `id`, display copy, `rendererAdapter`, `defaultConfiguration` (canonical egress), visibility/readability/palette states, `operatorControls`, `authorControls` (metadata only Phase 1), `legacyIngressIds`, discovery metadata.

**Operator list:** derived at publish — `resolved-visible` + resolved readability + resolved palette. No fixed operator count in discovery markdown until CMS visibility inventory completes.

**Known publish exclusion:** `grain-field` excluded from `operatorPresets` by unresolved palette (implementation defect on `noiseColor`).

---

## Legacy normalization (summary)

Full tables: `compatibility-plan.md`.

### Match model

```text
LegacyWirePayload (unknown)
  → matchLegacyIngress
  → generated | passthrough | unsupported
  → normalizeForDisplay (CMS — no re-parse)
  → render: adapter | passthrough renderer | Solid + diagnostic
```

| Outcome       | `presetId`                         | Phase 1 wire                    |
| ------------- | ---------------------------------- | ------------------------------- |
| `generated`   | Required                           | Sticky legacy on no-change save |
| `passthrough` | **Forbidden** (`presetId?: never`) | Unchanged                       |
| `unsupported` | **Forbidden**                      | Preserved until operator reset  |

### Ingress counts

| Set                      |                                                           Count |
| ------------------------ | --------------------------------------------------------------: |
| Generated ingress rows   |                                                              45 |
| Unsupported machine rows |                                                               9 |
| Passthrough rows         | 7 (Animated, Solid, Gradient, Image, Video, Texture, Luminance) |

### Sticky vs canonical

| Event                  | Wire behavior                                              |
| ---------------------- | ---------------------------------------------------------- |
| Read / display         | Map to `Generated → presetId`; wire untouched              |
| Save, preset unchanged | Sticky ingress — exact original wire                       |
| Save, preset changed   | Catalogue `defaultConfiguration` (canonical egress)        |
| Unsupported            | CMS reset UI; payload preserved; render Solid + diagnostic |

### Canonical egress (new selections)

| `presetId`                                            | Canonical egress                               |
| ----------------------------------------------------- | ---------------------------------------------- |
| Pattern family (6)                                    | `Pattern` + matching `pattern.type`            |
| Particle family (5)                                   | `Particle` + matching `particle.type`          |
| `balanced-noise` … `gradient-grid`, `pulsing-circles` | `Noise` + matching `noise.type`                |
| `floating-particles`                                  | `Graphics` + `noise.type: "floatingParticles"` |
| `geometric-field`, `spokes-field`                     | `Graphics` + matching `noise.type`             |
| `dynamic-particles`, `triangle-swarm`, `digital-rain` | `Noise` + matching `noise.type`                |

Dual Graphics/Noise ingress rows exist for every recognized `noise.type`. Sticky save never rewrites `Graphics` ↔ `Noise` on no-change save.

### Current vs Phase 1 render

Legacy production may silently fall back for malformed input. **Phase 1 target:** `unsupported` → **Solid + structured diagnostic** — not silent family-default rendering.

---

## Discovery surfaces (summary)

Full detail: `discovery-surfaces.md`.

| #     | Surface                     | Phase 1 change                                            |
| ----- | --------------------------- | --------------------------------------------------------- |
| 1     | Fixtura CMS                 | `Generated → Preset` from discovery contract              |
| 2     | Discovery artifact          | Build from in-repo catalogue                              |
| 3     | `SelectTemplateBackground`  | Add validation + adapters; legacy routing retained        |
| 4     | Template registry           | Remove Graphics / Pattern / Particle variants             |
| 5     | `DevelopmentRoot`           | `{Template}/Generated/{presetId}/{Sport}/{Dataset}`       |
| 6     | `processDatasetForTemplate` | Explicit `LegacyEgressPayload` — never `"Generated"` wire |
| 7     | Sample JSON                 | Preserved; optional catalogue fixtures                    |
| 8     | Renderer modules            | Adapter internals; not operator-facing                    |
| 9     | Type model                  | Internal `GeneratedSelection`; no Generated wire          |
| 10–11 | External docs               | Operator model vs integrator wire split                   |
| 12    | Catalogue module            | Canonical source + contract build                         |

### CMS ingress — one rule

| Path            | Integration                                                         |
| --------------- | ------------------------------------------------------------------- |
| **A (default)** | CMS consumes published `legacyIngress` in `discovery-contract.json` |
| **B**           | CMS imports package generated from the same catalogue build         |

No separately maintained CMS matcher.

### Studio passthrough browsing (clarification)

**CMS passthrough visibility** follows the product inventory — Phase 1 preserves each category’s current visibility; do not newly expose hidden categories (e.g. Animated).

**Studio passthrough dev folders** are governed by **developer needs**, not CMS visibility. Engineering may expose passthrough categories in Remotion Studio for QA and authoring even when CMS hides them from operators. Passthrough folders use explicit `LegacyEgressPayload` per category; folder names never become wire values.

### Dev composition ID

```text
{templateId}-generated-{presetId}-{datasetId}
```

Production composition ID formula unchanged: `${templateId}-${useBackground}-${compositionId}` with **legacy** `useBackground`.

---

## First implementation preset list

### Phase 1 — ship all 25 existing visuals

No inventory retirement in Phase 1 (OVR-09). Provisional overlap recommendations (OVR-01–10) in `decisions.md` await product review — they do not block catalogue build.

All 25 preset IDs in § inventory adapter table ship through legacy adapters. Operator visibility resolves after CMS inventory; `grain-field` remains excluded from derived operator list until palette resolves.

### Post–Phase 1 — Remotion shortlist (not Phase 1)

From `remotion-options.md`. Default engineering stance: **Option A** — defer all new presets until Phase 1 consolidation ships.

| Tier                                                  | Presets                                                                               |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **First wave** (after effects install + render spike) | `broadcast-halftone`, `topographic-flow`, `signal-grid`, `energy-burst`, `paper-club` |
| **Later prototype**                                   | `wave-field`, `brand-geometry-field`, `motion-motif`, `reactive-path-system`          |
| **Experimental**                                      | `stadium-field-3d`, `webgpu-material-lab`                                             |

**Effects on 4.0.499:** install `@remotion/effects@4.0.499`; no core upgrade required for most first-wave presets. Option B (`broadcast-halftone` only) viable on 4.0.499. Option C (full five) likely needs upgrade for `starburst()` (`energy-burst`).

---

## Unresolved product decisions

| #   | Question                                      | Discovery recommendation                        | Blocks Phase 1?    |
| --- | --------------------------------------------- | ----------------------------------------------- | ------------------ |
| 1   | Emit `useBackground: "Generated"` in Phase 1? | **No** — ADR 0002 deferred; legacy wire on save | No                 |
| 2   | Retire duplicate presets in Phase 1?          | **No** — ship all 25; OVR table for later       | No                 |
| 3   | Operator controls beyond preset?              | **Preset only** Phase 1                         | No                 |
| 4   | Animated → Generated later?                   | **Passthrough**; separate decision              | No                 |
| 5   | Which new Remotion presets first?             | **Defer** (Option A) until Phase 1 ships        | No                 |
| —   | CMS visibility inventory                      | Parallel product task                           | Operator list only |
| —   | OVR-01 `noise.graphics` intent                | Sticky GridNoise until product chooses rewire   | No                 |
| —   | CMS path A vs B                               | Engineering + CMS pick one integration          | Before CMS cutover |
| —   | Final operator display names                  | Product after visibility                        | Before CMS publish |

---

## Implementation tickets

| WP   | Ticket                                           | Depends on       |
| ---- | ------------------------------------------------ | ---------------- |
| WP-1 | `issues/06-catalogue-foundation.md`              | —                |
| WP-2 | `issues/07-ingress-matching-contract-publish.md` | WP-1             |
| WP-3 | `issues/08-production-render-boundary.md`        | WP-1, WP-2       |
| WP-4 | `issues/09-dev-studio-dataset-processing.md`     | WP-1             |
| WP-5 | `issues/10-cms-integration.md`                   | WP-2             |
| WP-6 | `issues/11-documentation-and-comms.md`           | WP-2             |
| WP-7 | `issues/12-verification.md`                      | WP-3, WP-4       |
| WP-8 | `issues/13-phase-1-release-readiness.md`         | WP-5, WP-6, WP-7 |
| WP-9 | _Deferred_ — post–Phase 1                        | WP-8             |

---

## Ordered work packages (reference)

### WP-1 — Catalogue foundation

- In-repo catalogue module (`GeneratedCatalogueEntry` × 25)
- Renderer adapter registry mapping `presetId` → existing render paths
- Unit tests against inventory keys and canonical egress

**Depends on:** nothing  
**Unlocks:** WP-2, WP-3, WP-4

### WP-2 — Ingress matching and contract publish

- `matchLegacyIngress(wire: unknown)` with discriminated result
- `normalizeForDisplay`, `applyCanonicalEgress`, sticky-save helpers
- `buildDiscoveryContract()` → JSON + schema
- Verify: 45 generated rows, 9 unsupported, 7 passthrough

**Depends on:** WP-1  
**Unlocks:** WP-3, WP-5

### WP-3 — Production render boundary

- `SelectTemplateBackground`: validate via `matchLegacyIngress` before render
- Route `generated` through catalogue adapters
- `unsupported` → Solid + structured diagnostic
- Preserve passthrough routing unchanged

**Depends on:** WP-1, WP-2  
**Unlocks:** WP-7

### WP-4 — Dev Studio and dataset processing

- `DevelopmentRoot`: catalogue-driven `{Template}/Generated/{presetId}/…`
- `CompositionEntry`: `{ presetId, legacyEgress }`; dev ID format
- `processDatasetForTemplate`: explicit `LegacyEgressPayload` parameter
- Optional passthrough dev folders per engineering need (not CMS-gated)
- Remove Graphics / Pattern / Particle from registry `Variants`

**Depends on:** WP-1  
**Unlocks:** WP-7

### WP-5 — CMS integration (external)

- Consume discovery contract (path A) or shared package (path B)
- Generated picker from `operatorPresets`
- Sticky ingress on save; canonical egress on preset change
- Unsupported UI preserving payload

**Depends on:** WP-2  
**Unlocks:** WP-8

### WP-6 — Documentation and comms

- Update `.comms/TEMPLATES.md`, Guide cross-refs
- Align `CONTEXT.md` if vocabulary drift
- Document CMS vs Studio visibility distinction

**Depends on:** WP-2 (contract shape stable)  
**Unlocks:** WP-8

### WP-7 — Verification

- Ingress round-trip tests (sticky, canonical, unsupported)
- Composition ID unchanged on no-change save
- Adapter parity spot-check per family
- No invented preset for malformed input

**Depends on:** WP-3, WP-4  
**Unlocks:** WP-8

### WP-8 — Phase 1 release readiness

- CMS visibility inventory incorporated into `operatorPresets`
- Published contract semver `1.0.0`
- Product sign-off on operator list

**Depends on:** WP-5, WP-6, WP-7

### WP-9 — Post–Phase 1 (deferred)

- `@remotion/effects@4.0.499` install + ANGLE/swangle render spike
- `effects-solid` adapter
- First-wave presets per product Option B/C
- Studio schema integration for `authorControls`
- Generated wire value rollout (ADR follow-on)

**Depends on:** WP-8 + product decision on open items

---

## Phase 1 success criteria

From `decisions.md`:

- [ ] CMS shows one Generated option from published contract
- [ ] Recognized legacy payloads round-trip without composition identity churn on no-change save
- [ ] Renderer adapters remain independent behind one catalogue
- [ ] All Graphics, Pattern, Particle, and Noise modes represented in catalogue
- [ ] Unsupported input renders Solid + diagnostic in production (no silent fallback)
- [ ] CMS and render path share one ingress source (no mirror matcher)
- [ ] Generated is not emitted as production wire

---

## Provisional overlap index (product review)

| ID        | Topic                            | Draft stance                                    |
| --------- | -------------------------------- | ----------------------------------------------- |
| OVR-01    | `noise.graphics`                 | Merge/alias to balanced-noise; sticky GridNoise |
| OVR-02–03 | Pattern/Particle name collisions | Keep distinct; rename labels                    |
| OVR-04–06 | Cross-family visual similarity   | Keep distinct                                   |
| OVR-07    | Dual Graphics/Noise ingress      | Sticky + canonical egress table                 |
| OVR-08    | `graphics` vs `geometric`        | Distinct after alias resolution                 |
| OVR-09    | Retirement                       | None without product evidence                   |
| OVR-10    | `pattern.opacity`                | Do not expose in operator UI                    |

---

## References

- ADR: `docs/adr/0002-generated-background-wire-deferred.md`
- Domain: `CONTEXT.md`
- Research: `.research/generated-backgrounds-discovery.md`
- Inventory: `current-preset-inventory.md`
- Contract: `catalogue-contract.md`
- Compatibility: `compatibility-plan.md`
- Surfaces: `discovery-surfaces.md`
- Remotion shortlist: `remotion-options.md`
- Prototype promotion plan: `remotion-prototype-promotion-plan.md`
- Decisions: `decisions.md`

# Generated compatibility plan

**Date:** 2026-08-28  
**Status:** Approved discovery baseline  
**Depends on:**

- `.scratch/generated-backgrounds/current-preset-inventory.md` (approved)
- `.scratch/generated-backgrounds/catalogue-contract.md` (approved)
- `.scratch/generated-backgrounds/decisions.md` (approved)

**Next:** Step 4 (discovery surfaces) and step 6 (implementation handoff)

## Purpose

Define how legacy Graphics, Pattern, Particle, and Noise payloads normalize into the Generated catalogue for **display**, how **saves** write wire payloads without breaking composition identity, and how **invalid** inputs behave across CMS, Studio, and production render.

Phase 1 does **not** require callers to migrate off legacy `useBackground` values. ADR 0002 defers `useBackground: "Generated"` as a wire value.

---

## Normalization model

Three layers:

| Layer                   | Responsibility                                                                        | Phase 1 wire                |
| ----------------------- | ------------------------------------------------------------------------------------- | --------------------------- |
| **Legacy ingress**      | Match stored `templateVariation` to a catalogue `presetId` or passthrough/unsupported | Unchanged on no-change save |
| **Generated selection** | CMS operator state: `Generated → presetId`                                            | Display only                |
| **Renderer adapter**    | Map normalized preset + sticky/canonical wire to existing renderers                   | Legacy family payloads      |

```text
Stored payload
  → match legacyIngress
  → presetId (or passthrough / unsupported)
  → CMS shows Generated → presetId
  → render path reads active useBackground + family config only (RC-6)
```

**Display normalization does not require wire normalization.** A `Noise` ingress may display as `Generated → geometric-field` while the payload continues to store `useBackground: "Noise"` until the operator changes the preset.

---

## Composition identity

Production composition IDs include `useBackground` (see `.comms/TEMPLATES.md` and Guide handoff).

| Event                               | Composition ID impact                                                                         |
| ----------------------------------- | --------------------------------------------------------------------------------------------- |
| Open existing payload in CMS (read) | **None** — display maps to Generated; wire untouched                                          |
| Save without preset change          | **None** — sticky ingress preserves `useBackground` and family config                         |
| Reselect same preset in picker      | **None** — preset ID unchanged; sticky ingress applies                                        |
| Operator selects different preset   | **May change** — canonical egress may use a different `useBackground` or family discriminator |
| CMS label changes to Generated      | **None** — Generated is not a wire value in Phase 1                                           |

**Rule:** Never rewrite `useBackground` or family discriminators on a no-change save. In particular, do not rewrite `Noise` → `Graphics` (or the reverse) when normalizing display for an alias pair.

---

## Sticky ingress and canonical egress

### Sticky ingress (existing payloads)

When a payload matches a `legacyIngress` row with `outcome: "generated"`:

1. **Read / display:** CMS sets internal state to `Generated → presetId`.
2. **Save (preset unchanged):** Write back the **original recognized ingress** exactly — same `useBackground`, same `pattern.type` / `particle.type` / `noise.type`, and coexisting sibling blocks if present.
3. **Save (preset changed):** Write the target catalogue entry's **`defaultConfiguration`** (canonical egress).

Sticky ingress applies to **all** recognized alias pairs, including:

- `Graphics` vs `Noise` for the same `noise.type`
- `noise.graphics` displaying as `balanced-noise` while storing `noise.type: "graphics"`

### Canonical egress (new selections)

When the operator picks a preset with no prior recognized ingress, or explicitly changes to a different `presetId`, CMS writes that entry's `defaultConfiguration` from `catalogue-contract.md`.

| `presetId`           | Canonical egress (`useBackground` + discriminator) |
| -------------------- | -------------------------------------------------- |
| `dot-field`          | `Pattern` + `pattern.type: "dots"`                 |
| `line-field`         | `Pattern` + `pattern.type: "lines"`                |
| `tile-grid`          | `Pattern` + `pattern.type: "grid"`                 |
| `crosshatch-field`   | `Pattern` + `pattern.type: "crosshatch"`           |
| `triangle-tile`      | `Pattern` + `pattern.type: "triangles"`            |
| `chevron-field`      | `Pattern` + `pattern.type: "chevron"`              |
| `floating-dots`      | `Particle` + `particle.type: "dots"`               |
| `streak-lines`       | `Particle` + `particle.type: "lines"`              |
| `bubble-field`       | `Particle` + `particle.type: "bubbles"`            |
| `snow-field`         | `Particle` + `particle.type: "snow"`               |
| `confetti-field`     | `Particle` + `particle.type: "confetti"`           |
| `balanced-noise`     | `Noise` + `noise.type: "default"`                  |
| `subtle-noise`       | `Noise` + `noise.type: "subtle"`                   |
| `grain-field`        | `Noise` + `noise.type: "grain"`                    |
| `wave-noise`         | `Noise` + `noise.type: "wave"`                     |
| `fog-field`          | `Noise` + `noise.type: "fog"`                      |
| `tv-static`          | `Noise` + `noise.type: "static"`                   |
| `floating-particles` | `Graphics` + `noise.type: "floatingParticles"`     |
| `dynamic-particles`  | `Noise` + `noise.type: "dynamicParticles"`         |
| `triangle-swarm`     | `Noise` + `noise.type: "triangleSwarm"`            |
| `pulsing-circles`    | `Noise` + `noise.type: "pulsingCircles"`           |
| `digital-rain`       | `Noise` + `noise.type: "digitalRain"`              |
| `gradient-grid`      | `Noise` + `noise.type: "gradientGrid"`             |
| `geometric-field`    | `Graphics` + `noise.type: "geometric"`             |
| `spokes-field`       | `Graphics` + `noise.type: "spokes"`                |

**Inventory-only ingress:** `noise.type: "graphics"` has no catalogue row. Ingress maps to `presetId: "balanced-noise"` for display. Sticky save preserves `noise.type: "graphics"` until the operator changes preset; a new selection of `balanced-noise` writes canonical `noise.type: "default"` (OVR-01).

Family config fields not listed in canonical egress keep catalogue defaults from `catalogue-contract.md` (e.g. `particle.particleCount: 300`). Sticky save preserves whatever values were already stored.

---

## Full legacy ingress table

**26 inventory ingress keys** represented across **45 generated ingress rows** (plus passthrough and unsupported). Every recognized Noise-variant type exists in **both** Graphics and Noise forms.

### Pattern (`useBackground: "Pattern"`)

Requires `templateVariation.pattern` object present.

| Ingress `id`                   | `pattern.type`                 | `presetId`         | Match rule                                                                                     |
| ------------------------------ | ------------------------------ | ------------------ | ---------------------------------------------------------------------------------------------- |
| `ingress-pattern-dots`         | `dots`                         | `dot-field`        | exact                                                                                          |
| `ingress-pattern-lines`        | `lines`                        | `line-field`       | exact                                                                                          |
| `ingress-pattern-grid`         | `grid`                         | `tile-grid`        | exact                                                                                          |
| `ingress-pattern-crosshatch`   | `crosshatch`                   | `crosshatch-field` | exact                                                                                          |
| `ingress-pattern-triangles`    | `triangles`                    | `triangle-tile`    | exact                                                                                          |
| `ingress-pattern-chevron`      | `chevron`                      | `chevron-field`    | exact                                                                                          |
| `ingress-pattern-missing-type` | omitted / `undefined` / `null` | `dot-field`        | `pattern` object present; discriminator absent — recognized implicit default (matches runtime) |

**Not generated:**

| Condition                              | `outcome`     | Notes                                                                    |
| -------------------------------------- | ------------- | ------------------------------------------------------------------------ |
| `Pattern` but no `pattern` object      | `unsupported` | missing family object                                                    |
| `pattern.type` nonempty unknown string | `unsupported` | runtime silently falls back to `dots`; normalization must not hide typos |

### Particle (`useBackground: "Particle"`)

Requires `templateVariation.particle` object present.

| Ingress `id`                    | `particle.type`                | `presetId`       | Match rule                                                                                      |
| ------------------------------- | ------------------------------ | ---------------- | ----------------------------------------------------------------------------------------------- |
| `ingress-particle-dots`         | `dots`                         | `floating-dots`  | exact                                                                                           |
| `ingress-particle-lines`        | `lines`                        | `streak-lines`   | exact                                                                                           |
| `ingress-particle-bubbles`      | `bubbles`                      | `bubble-field`   | exact                                                                                           |
| `ingress-particle-snow`         | `snow`                         | `snow-field`     | exact                                                                                           |
| `ingress-particle-confetti`     | `confetti`                     | `confetti-field` | exact                                                                                           |
| `ingress-particle-missing-type` | omitted / `undefined` / `null` | `floating-dots`  | `particle` object present; discriminator absent — recognized implicit default (matches runtime) |

**Not generated:**

| Condition                               | `outcome`     | Notes                                                                    |
| --------------------------------------- | ------------- | ------------------------------------------------------------------------ |
| `Particle` but no `particle` object     | `unsupported` | missing family object                                                    |
| `particle.type` nonempty unknown string | `unsupported` | runtime silently falls back to `dots`; normalization must not hide typos |

### Noise / Graphics (`useBackground: "Noise"` or `"Graphics"`)

Requires `templateVariation.noise` object present. Dual rows per recognized `noise.type`. Same `presetId` for both wires.

| Ingress `id`                                                             | Wire | `noise.type`                   | `presetId`           | Notes                                                                |
| ------------------------------------------------------------------------ | ---- | ------------------------------ | -------------------- | -------------------------------------------------------------------- |
| `ingress-graphics-default` / `ingress-noise-default`                     | both | `default`                      | `balanced-noise`     |                                                                      |
| `ingress-graphics-missing-type` / `ingress-noise-missing-type`           | both | omitted / `undefined` / `null` | `balanced-noise`     | `noise` object present; discriminator absent — RC-2 implicit default |
| `ingress-graphics-subtle` / `ingress-noise-subtle`                       | both | `subtle`                       | `subtle-noise`       |                                                                      |
| `ingress-graphics-grain` / `ingress-noise-grain`                         | both | `grain`                        | `grain-field`        |                                                                      |
| `ingress-graphics-wave` / `ingress-noise-wave`                           | both | `wave`                         | `wave-noise`         |                                                                      |
| `ingress-graphics-fog` / `ingress-noise-fog`                             | both | `fog`                          | `fog-field`          |                                                                      |
| `ingress-graphics-static` / `ingress-noise-static`                       | both | `static`                       | `tv-static`          |                                                                      |
| `ingress-graphics-floatingParticles` / `ingress-noise-floatingParticles` | both | `floatingParticles`            | `floating-particles` |                                                                      |
| `ingress-graphics-dynamicParticles` / `ingress-noise-dynamicParticles`   | both | `dynamicParticles`             | `dynamic-particles`  |                                                                      |
| `ingress-graphics-triangleSwarm` / `ingress-noise-triangleSwarm`         | both | `triangleSwarm`                | `triangle-swarm`     |                                                                      |
| `ingress-graphics-pulsingCircles` / `ingress-noise-pulsingCircles`       | both | `pulsingCircles`               | `pulsing-circles`    |                                                                      |
| `ingress-graphics-digitalRain` / `ingress-noise-digitalRain`             | both | `digitalRain`                  | `digital-rain`       |                                                                      |
| `ingress-graphics-gradientGrid` / `ingress-noise-gradientGrid`           | both | `gradientGrid`                 | `gradient-grid`      |                                                                      |
| `ingress-graphics-graphics` / `ingress-noise-graphics`                   | both | `graphics`                     | `balanced-noise`     | inventory-only; RC-3                                                 |
| `ingress-graphics-geometric` / `ingress-noise-geometric`                 | both | `geometric`                    | `geometric-field`    |                                                                      |
| `ingress-graphics-spokes` / `ingress-noise-spokes`                       | both | `spokes`                       | `spokes-field`       |                                                                      |

**Not generated** (see unsupported ingress table — four Graphics/Noise rows):

| Condition                                  | `outcome`     | Notes                                                                      |
| ------------------------------------------ | ------------- | -------------------------------------------------------------------------- |
| `Graphics` but no `noise` object           | `unsupported` | `ingress-unsupported-graphics-missing-noise`                               |
| `Noise` but no `noise` object              | `unsupported` | `ingress-unsupported-noise-missing-noise`                                  |
| `Graphics` + unknown nonempty `noise.type` | `unsupported` | `ingress-unsupported-graphics-unknown-noise-type`                          |
| `Noise` + unknown nonempty `noise.type`    | `unsupported` | legacy render may silently fall back; Phase 1 target is Solid + diagnostic |

**Row count (generated):**

| Component                                        |   Rows |
| ------------------------------------------------ | -----: |
| Pattern explicit types                           |      6 |
| Pattern missing-type fallback                    |      1 |
| Particle explicit types                          |      5 |
| Particle missing-type fallback                   |      1 |
| Noise / Graphics explicit types (15 × 2 wires)   |     30 |
| Noise / Graphics missing-type fallback (2 wires) |      2 |
| **Total generated ingress rows**                 | **45** |

Unknown-discriminator and missing-family rows are **`unsupported`** ingress entries (see below), not generated rows.

`noise.graphics` counts as one inventory key mapped to `balanced-noise`, not a separate visual.

---

## Passthrough categories

Do not normalize into Generated. Preserve existing CMS category and wire.

| Ingress `id`                    | `useBackground` | `outcome`   | Notes                       |
| ------------------------------- | --------------- | ----------- | --------------------------- |
| `ingress-passthrough-animated`  | `Animated`      | passthrough | Outside consolidation scope |
| `ingress-passthrough-solid`     | `Solid`         | passthrough | Essential backgrounds       |
| `ingress-passthrough-gradient`  | `Gradient`      | passthrough |                             |
| `ingress-passthrough-image`     | `Image`         | passthrough |                             |
| `ingress-passthrough-video`     | `Video`         | passthrough |                             |
| `ingress-passthrough-texture`   | `Texture`       | passthrough |                             |
| `ingress-passthrough-luminance` | `Luminance`     | passthrough | Separate feature            |

Animated remains runtime-supported. Consolidation does not fold it into Generated in Phase 1.

---

## Unsupported ingress rows

`outcome: "unsupported"`. No `presetId`. CMS shows reset/unsupported state; payload preserved.

**Nine machine rows** — one `useBackground` per row (matches contract `LegacyIngressMatch` shape).

| Ingress `id`                                      | `useBackground` | Match condition                               | Notes                             |
| ------------------------------------------------- | --------------- | --------------------------------------------- | --------------------------------- |
| `ingress-unsupported-pattern-missing-family`      | `Pattern`       | `pattern` absent                              | missing family object             |
| `ingress-unsupported-pattern-unknown-type`        | `Pattern`       | `pattern.type` nonempty and not in inventory  | legacy render may still fall back |
| `ingress-unsupported-particle-missing-family`     | `Particle`      | `particle` absent                             | missing family object             |
| `ingress-unsupported-particle-unknown-type`       | `Particle`      | `particle.type` nonempty and not in inventory | legacy render may still fall back |
| `ingress-unsupported-graphics-missing-noise`      | `Graphics`      | `noise` absent                                | missing family object             |
| `ingress-unsupported-noise-missing-noise`         | `Noise`         | `noise` absent                                | missing family object             |
| `ingress-unsupported-graphics-unknown-noise-type` | `Graphics`      | `noise.type` nonempty and not in inventory    | legacy render may still fall back |
| `ingress-unsupported-noise-unknown-noise-type`    | `Noise`         | `noise.type` nonempty and not in inventory    | legacy render may still fall back |
| `ingress-unsupported-unknown-wire`                | —               | unrecognized `useBackground`                  | e.g. `Layered`                    |

---

## Sibling config blocks (RC-6)

Samples often store `noise`, `pattern`, and `particle` objects together while only one `useBackground` is active.

| Concern               | Rule                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Render**            | Only the family matching `useBackground` is read                                                                       |
| **Normalize (read)**  | Match on `useBackground` + active family discriminator only; ignore siblings                                           |
| **Save (sticky)**     | Preserve entire `templateVariation` object including sibling blocks                                                    |
| **Save (new preset)** | Write canonical egress for selected family; **do not delete** sibling blocks unless product explicitly chooses cleanup |

---

## Accepted-but-ignored fields

Preserve on sticky save. Do not use for normalization or operator controls in Phase 1.

| Field                                                       | Inventory ref | Render effect                   |
| ----------------------------------------------------------- | ------------- | ------------------------------- |
| `pattern.opacity`                                           | RC-5          | Ignored — wrapper uses `0.2`    |
| `particle.animation`                                        | inventory     | Passed but no renderer reads it |
| `particle.particleSize`, `particleColor`, `backgroundColor` | inventory     | Not read from templateVariation |
| Sibling family blocks                                       | RC-6          | Ignored when not active         |

Canonical egress for new selections should **omit** ignored fields rather than invent values.

---

## Invalid and unknown inputs

### Classification

| Class                              | Example                                  | Ingress `outcome`                                       |
| ---------------------------------- | ---------------------------------------- | ------------------------------------------------------- |
| **Recognized generated**           | `Pattern` + `pattern: {}` (type omitted) | `generated` → family default preset                     |
| **Recognized generated**           | `Pattern` + `pattern.type: "grid"`       | `generated`                                             |
| **Recognized passthrough**         | `useBackground: "Animated"`              | `passthrough`                                           |
| **Missing family object**          | `Pattern` with no `pattern` object       | `unsupported`                                           |
| **Unknown nonempty discriminator** | `pattern.type: "dotz"`                   | `unsupported` — even though runtime may fall back       |
| **Unknown wire**                   | `useBackground: "Layered"`               | `unsupported`                                           |
| **Invented preset**                | —                                        | **Never** — do not coerce to a default Generated preset |

### Surface behavior

| Surface                                | Recognized generated        | Passthrough          | Unsupported / malformed                                                               |
| -------------------------------------- | --------------------------- | -------------------- | ------------------------------------------------------------------------------------- |
| **CMS**                                | Show `Generated → presetId` | Show native category | Unsupported/reset UI; **preserve original payload** until operator picks valid preset |
| **Studio / development**               | Render via adapter          | Existing renderer    | **Descriptive error** (fail loud)                                                     |
| **Production render (Phase 1 target)** | Render via adapter          | Existing renderer    | **Solid** + **structured diagnostic**                                                 |

**Current vs Phase 1:** Legacy production may silently fall back today (unknown discriminators hitting family defaults, missing wire falling through to Solid). Phase 1 implementation must **replace** that behavior for inputs classified `unsupported`: production renders **Solid** and emits a structured diagnostic. It must not silently render a different Generated preset or a family-default look for unsupported input.

Production must not silently render a different Generated preset for malformed input.

### Discriminator matching rules

| Situation                             | Normalization (Phase 1)             | Production render today                  | Production render (Phase 1 target) |
| ------------------------------------- | ----------------------------------- | ---------------------------------------- | ---------------------------------- |
| Family object present, `type` omitted | `generated` → family default preset | Runtime implicit default                 | Render via adapter                 |
| Family object missing                 | `unsupported`                       | May fall through (e.g. Solid)            | **Solid** + diagnostic             |
| Nonempty unknown `type` string        | `unsupported`                       | May silently fall back to family default | **Solid** + diagnostic             |

**Render vs normalize:** CMS and `matchLegacyIngress` use the normalization column so misspelled modes surface as unsupported rather than displaying a false preset. Phase 1 render path must align with the target column for `unsupported`, not perpetuate silent family-default fallbacks.

---

## Graphics / Noise sticky matrix

For every `noise.type` in the ingress table, these pairs are **distinct recognized ingresses** with the same `presetId`:

```text
{ useBackground: "Graphics", noise: { type: T } }
{ useBackground: "Noise",    noise: { type: T } }
```

| Scenario                      | Display                       | Save (no preset change)               | Save (preset change)                                         |
| ----------------------------- | ----------------------------- | ------------------------------------- | ------------------------------------------------------------ |
| Open `Noise` + `geometric`    | `Generated → geometric-field` | Sticky: keep `Noise`                  | Canonical: `Graphics` + `geometric`                          |
| Open `Graphics` + `geometric` | `Generated → geometric-field` | Sticky: keep `Graphics`               | Canonical: `Graphics` + `geometric`                          |
| Open `Noise` + `graphics`     | `Generated → balanced-noise`  | Sticky: keep `noise.type: "graphics"` | Canonical: `Noise` + `default` if selecting `balanced-noise` |

Switching between `geometric-field` and `balanced-noise` is a preset change and may change composition ID.

---

## `noise.graphics` compatibility (OVR-01)

| Stage                               | Behavior                                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Inventory**                       | INV-NOI-graphics — listed mode, accidental runtime alias of default GridNoise                          |
| **Ingress**                         | `graphics` → `presetId: "balanced-noise"` (both wires)                                                 |
| **Display**                         | `Generated → balanced-noise`                                                                           |
| **Sticky save**                     | Preserve `noise.type: "graphics"` and original `useBackground`                                         |
| **New selection of balanced-noise** | Write canonical `Noise` + `noise.type: "default"`                                                      |
| **Future rewire**                   | If selector gains a `graphics` case, assign new visual preset ID and update ingress — product decision |

---

## Future `useBackground: "Generated"` wire value

Deferred per ADR 0002. When rolled out (separate versioned project):

| Concern         | Requirement                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| Composition IDs | Migration plan for caches and stored IDs                                     |
| Payload shape   | Likely `useBackground: "Generated"` + `generated: { presetId, … }` — TBD     |
| Ingress         | New rows mapping legacy wires → same `presetId`; sticky period for dual-read |
| CMS             | May simplify egress; not Phase 1                                             |
| Contract semver | **Major** bump                                                               |

Phase 1 implementation must not emit `useBackground: "Generated"`.

---

## Implementation seams (documentation only)

Future code should centralize validation at one boundary.

```ts
/** Untrusted wire payload from CMS, API, or stored JSON. Not the internal TemplateVariation type. */
type LegacyWirePayload = unknown;

type LegacyIngressMatchResult =
  | { outcome: "generated"; presetId: string; ingressId: string }
  | { outcome: "passthrough"; ingressId: string; presetId?: never }
  | {
      outcome: "unsupported";
      ingressId: string;
      reason: string;
      presetId?: never;
    };

/**
 * Single parse/match pass. Validates external wire shape, then matches legacyIngress.
 * Returns a discriminated result — invalid combinations are unrepresentable.
 */
function matchLegacyIngress(wire: LegacyWirePayload): LegacyIngressMatchResult;

/** Consumes match result only — does not re-parse payload. */
function normalizeForDisplay(
  match: LegacyIngressMatchResult,
):
  | { category: "generated"; presetId: string }
  | { category: "passthrough" }
  | { category: "unsupported"; reason: string };

function applyCanonicalEgress(presetId: string): LegacyEgressPayload;

function preserveStickyIngress(
  original: LegacyWirePayload,
  nextPresetId: string,
): LegacyWirePayload;
```

`SelectTemplateBackground` remains the render boundary until adapters are introduced behind the catalogue. Internal render code may use validated `TemplateVariation` **after** a recognized `generated` or `passthrough` match; it must not bypass `matchLegacyIngress` for external ingress.

---

## Verification checklist (discovery)

- [ ] Every inventory key (26) maps to exactly one `presetId` via ingress (`graphics` → `balanced-noise`).
- [ ] Every catalogue visual (25) has canonical egress defined.
- [ ] Dual Graphics/Noise rows exist for all 15 recognized `noise.type` values.
- [ ] **45** generated ingress rows (41 explicit + 4 missing-type fallbacks).
- [ ] **9** unsupported ingress rows (one `useBackground` per row).
- [ ] Animated and essential backgrounds passthrough without Generated normalization.
- [ ] No-change save preserves composition identity for alias pairs.
- [ ] Malformed input never invents a Generated preset.
- [ ] Unknown discriminators do not map to default presets in normalization.
- [ ] Phase 1 production replaces silent unsupported fallbacks with Solid + diagnostic.

## References

- Inventory: `.scratch/generated-backgrounds/current-preset-inventory.md`
- Contract: `.scratch/generated-backgrounds/catalogue-contract.md`
- Decisions: `.scratch/generated-backgrounds/decisions.md`
- ADR: `docs/adr/0002-generated-background-wire-deferred.md`

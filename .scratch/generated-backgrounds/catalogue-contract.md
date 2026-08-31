# Generated catalogue contract

**Date:** 2026-08-28  
**Status:** Approved discovery baseline  
**Depends on:** `.scratch/generated-backgrounds/current-preset-inventory.md` (approved), `.scratch/generated-backgrounds/decisions.md` (approved)  
**Next:** Step 4 (discovery surfaces) and step 6 (implementation handoff)

## Purpose

One catalogue entry shape owns every Generated preset. The in-repo catalogue is canonical. This repository publishes a **versioned JSON discovery contract** for the Fixtura CMS. CMS consumes the artifact; it does not maintain a parallel preset list.

Adding a preset requires **one catalogue entry** plus renderer adapter wiring. Selector lists, registry variants, and CMS options derive from the catalogue — not the reverse.

## Contract version

| Field                              | Value                                                                                                                                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `contractVersion`                  | `1.0.0`                                                                                                                                                                                                                        |
| Semver rule                        | **Major** — breaking preset ID removal, ingress shape change, or operator-list filter change. **Minor** — new preset, new optional field, new ingress alias. **Patch** — display copy, discovery metadata, documentation-only. |
| Published artifact path (proposed) | `public/generated-backgrounds/discovery-contract.json` (generated at build; not hand-edited)                                                                                                                                   |
| Schema path (proposed)             | `schemas/generated-backgrounds/discovery-contract.schema.json` (source-controlled; implementation ticket WP-2)                                                                                                                 |

CMS must read `contractVersion` and reject or warn on unsupported major versions.

---

## Catalogue entry shape

Every preset is one `GeneratedCatalogueEntry`.

```ts
type GeneratedCatalogueEntry = {
  /** Stable visual ID. Unique across all renderer adapters. */
  id: string;

  /** Operator-facing label in CMS. */
  displayName: string;

  description: string;

  /** Links back to inventory row, e.g. INV-PAT-dots */
  inventoryKey: string;

  /** Renderer adapter key — implementation seam, not operator-facing. */
  rendererAdapter: RendererAdapterKey;

  /** Default configuration written on new selection (canonical egress). */
  defaultConfiguration: LegacyEgressPayload;

  /** CMS operator visibility — independent of readability/palette resolution. */
  operatorVisibility: OperatorVisibilityState;

  readabilityPolicy: ReadabilityPolicyState;

  paletteBehavior: PaletteBehaviorState;

  /** Controls exposed in CMS (background operator). Phase 1: empty or preset-only. */
  operatorControls: OperatorControl[];

  /** Controls exposed in Remotion Studio / author tooling. */
  authorControls: AuthorControl[];

  /** Non-selectable ingress rows pointing at this preset. See legacyIngress artifact section. */
  legacyIngressIds: string[];

  discovery: DiscoveryMetadata;
};
```

### Renderer adapter keys

Adapters map one catalogue entry to one existing renderer path. Implementations stay separate.

| `rendererAdapter` | Engine                                     | Inventory families         |
| ----------------- | ------------------------------------------ | -------------------------- |
| `pattern-tiled`   | `Patterns/index.tsx` + variant component   | Pattern (6)                |
| `particle-field`  | `Particles/index.tsx` + variant renderer   | Particle (5)               |
| `grid-noise`      | `GridNoise` via Noise variant wrapper      | Noise GridNoise family     |
| `particle-noise`  | `ParticleNoise` via Noise variant wrapper  | Noise ParticleNoise family |
| `svg-geometric`   | `GeometricGraphics` → `GraphicsBackground` | `geometric-field`          |
| `svg-spokes`      | `SpokesGraphics` + SVG spokes              | `spokes-field`             |

### Readability and palette states

```ts
type OperatorVisibilityState =
  | { status: "resolved-visible" }
  | { status: "resolved-hidden"; reason: string }
  | { status: "unresolved"; note: string };

type ReadabilityPolicyState =
  | {
      status: "resolved";
      policy:
        | "none"
        | "scrim"
        | "vignette"
        | "safe-region"
        | "contrast-limit"
        | "density-limit";
    }
  | { status: "unresolved"; note: string };

type PaletteBehaviorState =
  | { status: "resolved"; mode: "active-palette"; roles?: string[] }
  | { status: "resolved"; mode: "fixed"; note: string }
  | {
      status: "resolved";
      mode: "mixed";
      parts: Array<{
        aspect: string;
        mode: "active-palette" | "fixed";
        roles?: string[];
        note?: string;
      }>;
    }
  | { status: "unresolved"; note: string };
```

**Operator list rule:** `operatorPresets` includes a preset only when **all** of the following hold:

1. `operatorVisibility.status === "resolved-visible"`
2. `readabilityPolicy.status === "resolved"`
3. `paletteBehavior.status === "resolved"`

CMS visibility for the Generated category itself remains **unconfirmed** (see `decisions.md` parallel task). Until the CMS inventory completes, catalogue entries should use `operatorVisibility: { status: "unresolved", note: "CMS visibility inventory pending" }` rather than asserting `resolved-visible`.

Do **not** publish a fixed `operatorPresets` count or ordered list in discovery docs until CMS visibility is confirmed. The artifact derives `operatorPresets` at publish time from the rules above.

### Legacy egress payload

Canonical shape CMS writes when the operator **newly selects** a preset (sticky ingress on unchanged saves is handled in `compatibility-plan.md`).

```ts
type LegacyEgressPayload =
  | {
      useBackground: "Pattern";
      pattern: PatternWireConfig;
    }
  | {
      useBackground: "Particle";
      particle: ParticleWireConfig;
    }
  | {
      useBackground: "Noise" | "Graphics";
      noise: { type: NoiseVariant };
    };
```

`PatternWireConfig`, `ParticleWireConfig`, and `NoiseVariant` match live `videoData.ts` discriminators. Fields **accepted but ignored** at runtime (see inventory) must not appear in `operatorControls` until a runtime fix ships.

### Operator controls (Phase 1)

```ts
type OperatorControl = {
  key: string;
  label: string;
  type: "preset"; // Phase 1: only preset selection is universal
};
```

**Phase 1 expectation:** every entry has `operatorControls: []`. Preset selection is implicit in the CMS picker. Do not expose `pattern.opacity`, `particle.animation`, or other accepted-but-ignored fields (OVR-10).

### Author controls

Author controls describe Studio-editable parameters. They may map to renderer props not currently wired from `templateVariation`.

```ts
type AuthorControl = {
  key: string;
  label: string;
  type: "number" | "enum" | "boolean" | "color";
  enumValues?: string[];
  source: "templateVariation" | "renderer-default" | "palette-injected";
  affectsRendering: boolean;
};
```

When `affectsRendering: false`, the control is documented for authors but marked as a compatibility hazard.

### Discovery metadata

```ts
type DiscoveryMetadata = {
  motionClass: "static" | "ambient" | "energetic" | "intro-sequence";
  tags: string[];
  relatedPresetIds?: string[];
  preview?: {
    still?: string;
    loop?: string;
  };
};
```

Preview assets are optional in Phase 1 discovery. Paths are catalogue metadata only — no visual audit in this phase.

---

## Published discovery artifact

CMS consumes a single JSON document:

```json
{
  "contractVersion": "1.0.0",
  "generatedAt": "ISO-8601",
  "catalogue": {
    "presets": ["…GeneratedCatalogueEntry[]"]
  },
  "operatorPresets": ["preset-id"],
  "legacyIngress": ["…LegacyIngressRow[]"]
}
```

| Section             | Selectable in CMS   | Purpose                                                                            |
| ------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| `catalogue.presets` | No (full catalogue) | Canonical definitions                                                              |
| `operatorPresets`   | Yes (ordered IDs)   | Derived at publish time from visibility + resolved policy rules; not hand-authored |
| `legacyIngress`     | No                  | Normalize existing payloads on read; never shown as choices                        |

### Legacy ingress row

```ts
type LegacyIngressMatch = {
  useBackground: string;
  pattern?: { type?: string };
  particle?: { type?: string };
  noise?: { type?: string };
};

type LegacyIngressRow =
  | {
      id: string;
      match: LegacyIngressMatch;
      outcome: "generated";
      presetId: string;
      note?: string;
    }
  | {
      id: string;
      match: LegacyIngressMatch;
      outcome: "passthrough" | "unsupported";
      presetId?: never;
      note?: string;
    };
```

| `outcome`     | CMS behavior                                                        |
| ------------- | ------------------------------------------------------------------- |
| `generated`   | Normalize display to `Generated → presetId`; sticky ingress on save |
| `passthrough` | Do not map into Generated; keep existing category (e.g. Animated)   |
| `unsupported` | Show reset/unsupported state; preserve payload                      |

**Graphics / Noise dual ingress:** the runtime accepts both `useBackground: "Graphics"` and `"Noise"` for every Noise-variant ingress. Each recognized `noise.type` that maps to a Generated preset therefore has **two** ingress rows with the same `presetId`. Generate both rows unless product explicitly retires one wire value. Sample-frequency evidence must not reduce the supported ingress set.

**Animated:** ingress rows use `outcome: "passthrough"` until a later consolidation decision.

---

## Preset catalogue (25 unique visuals)

The approved inventory contains **26** legacy ingress keys (including `noise.graphics`). The catalogue contains **25 unique visual presets**. Inventory-only ingress keys map to an existing visual `presetId` rather than receiving their own catalogue row.

Visual preset IDs are unique and renderer-neutral. `inventoryKey` links to the approved inventory.

**CMS visibility column:** `unresolved (CMS pending)` unless otherwise noted. Final `resolved-visible` / `resolved-hidden` assignments wait on the CMS visibility inventory.

### Pattern family — adapter `pattern-tiled`

| `id`               | `displayName` | `inventoryKey`     | Canonical egress                         | `operatorVisibility`     |
| ------------------ | ------------- | ------------------ | ---------------------------------------- | ------------------------ |
| `dot-field`        | Dot field     | INV-PAT-dots       | `Pattern` + `pattern.type: "dots"`       | unresolved (CMS pending) |
| `line-field`       | Line field    | INV-PAT-lines      | `Pattern` + `pattern.type: "lines"`      | unresolved (CMS pending) |
| `tile-grid`        | Tile grid     | INV-PAT-grid       | `Pattern` + `pattern.type: "grid"`       | unresolved (CMS pending) |
| `crosshatch-field` | Crosshatch    | INV-PAT-crosshatch | `Pattern` + `pattern.type: "crosshatch"` | unresolved (CMS pending) |
| `triangle-tile`    | Triangle tile | INV-PAT-triangles  | `Pattern` + `pattern.type: "triangles"`  | unresolved (CMS pending) |
| `chevron-field`    | Chevron       | INV-PAT-chevron    | `Pattern` + `pattern.type: "chevron"`    | unresolved (CMS pending) |

**Shared defaults:** `pattern.scale: 1`, `pattern.rotation: 0`, `pattern.animation` omitted (renderer default).  
**Readability:** `{ status: "resolved", policy: "none" }`  
**Palette:** `{ status: "resolved", mode: "active-palette", roles: ["background.contrast", "background.gradient.primary"] }`  
**Author controls (affect rendering):** `pattern.type`, `pattern.scale`, `pattern.rotation`, `pattern.animation`, `pattern.animationDuration`, `pattern.animationSpeed`  
**Author controls (accepted, ignored):** `pattern.opacity` — `affectsRendering: false` (RC-5)

### Particle family — adapter `particle-field`

| `id`             | `displayName` | `inventoryKey`   | Canonical egress                         | `operatorVisibility`     |
| ---------------- | ------------- | ---------------- | ---------------------------------------- | ------------------------ |
| `floating-dots`  | Floating dots | INV-PAR-dots     | `Particle` + `particle.type: "dots"`     | unresolved (CMS pending) |
| `streak-lines`   | Streak lines  | INV-PAR-lines    | `Particle` + `particle.type: "lines"`    | unresolved (CMS pending) |
| `bubble-field`   | Bubbles       | INV-PAR-bubbles  | `Particle` + `particle.type: "bubbles"`  | unresolved (CMS pending) |
| `snow-field`     | Snow          | INV-PAR-snow     | `Particle` + `particle.type: "snow"`     | unresolved (CMS pending) |
| `confetti-field` | Confetti      | INV-PAR-confetti | `Particle` + `particle.type: "confetti"` | unresolved (CMS pending) |

**Shared defaults:** `particle.particleCount: 300`, `particle.speed: 1`, `particle.direction: "random"`.  
**Readability:** resolved `none` for all.  
**Palette:**

| `id`                                              | `paletteBehavior`                                                                                       |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `floating-dots`, `bubble-field`, `confetti-field` | resolved `active-palette` — `background.contrast` + `primaryRadial`                                     |
| `streak-lines`                                    | resolved `active-palette` — background `primaryRadial`; strokes use `text.onContainer.light`            |
| `snow-field`                                      | resolved `mixed` — background: `active-palette` (`primaryRadial`); particles: `fixed` white in renderer |

**Author controls (affect rendering):** `particle.type`, `particle.particleCount`, `particle.speed`, `particle.direction`  
**Author controls (accepted, ignored):** `particle.animation` — `affectsRendering: false`

### Noise family — adapters `grid-noise`, `particle-noise`, `svg-geometric`, `svg-spokes`

Canonical egress for **new** selections uses the `useBackground` column below. Sticky ingress for recognized aliases is defined in `compatibility-plan.md`.

| `id`                 | `displayName`      | `inventoryKey`            | Adapter        | Canonical egress                               | `operatorVisibility`     |
| -------------------- | ------------------ | ------------------------- | -------------- | ---------------------------------------------- | ------------------------ |
| `balanced-noise`     | Balanced noise     | INV-NOI-default           | grid-noise     | `Noise` + `noise.type: "default"`              | unresolved (CMS pending) |
| `subtle-noise`       | Subtle noise       | INV-NOI-subtle            | grid-noise     | `Noise` + `noise.type: "subtle"`               | unresolved (CMS pending) |
| `grain-field`        | Film grain         | INV-NOI-grain             | grid-noise     | `Noise` + `noise.type: "grain"`                | unresolved (CMS pending) |
| `wave-noise`         | Wave noise         | INV-NOI-wave              | grid-noise     | `Noise` + `noise.type: "wave"`                 | unresolved (CMS pending) |
| `fog-field`          | Fog                | INV-NOI-fog               | grid-noise     | `Noise` + `noise.type: "fog"`                  | unresolved (CMS pending) |
| `tv-static`          | TV static          | INV-NOI-static            | grid-noise     | `Noise` + `noise.type: "static"`               | unresolved (CMS pending) |
| `floating-particles` | Floating particles | INV-NOI-floatingParticles | particle-noise | `Graphics` + `noise.type: "floatingParticles"` | unresolved (CMS pending) |
| `dynamic-particles`  | Dynamic particles  | INV-NOI-dynamicParticles  | particle-noise | `Noise` + `noise.type: "dynamicParticles"`     | unresolved (CMS pending) |
| `triangle-swarm`     | Triangle swarm     | INV-NOI-triangleSwarm     | particle-noise | `Noise` + `noise.type: "triangleSwarm"`        | unresolved (CMS pending) |
| `pulsing-circles`    | Pulsing circles    | INV-NOI-pulsingCircles    | grid-noise     | `Noise` + `noise.type: "pulsingCircles"`       | unresolved (CMS pending) |
| `digital-rain`       | Digital rain       | INV-NOI-digitalRain       | particle-noise | `Noise` + `noise.type: "digitalRain"`          | unresolved (CMS pending) |
| `gradient-grid`      | Gradient grid      | INV-NOI-gradientGrid      | grid-noise     | `Noise` + `noise.type: "gradientGrid"`         | unresolved (CMS pending) |
| `geometric-field`    | Geometric field    | INV-NOI-geometric         | svg-geometric  | `Graphics` + `noise.type: "geometric"`         | unresolved (CMS pending) |
| `spokes-field`       | Radial spokes      | INV-NOI-spokes            | svg-spokes     | `Graphics` + `noise.type: "spokes"`            | unresolved (CMS pending) |

**`grain-field` exclusion:** `paletteBehavior: { status: "unresolved", note: "Invalid noiseColor implementation defect" }`. Excluded from `operatorPresets` by the operator-list filter (unresolved palette). `operatorVisibility` remains `unresolved (CMS pending)` like other entries until CMS visibility is confirmed.

**Inventory-only ingress — `noise.graphics` (INV-NOI-graphics):** not a distinct visual preset. At runtime (RC-3) it renders identically to `balanced-noise`. Until OVR-01 is resolved, legacy ingress rows for `noise.type: "graphics"` map to `presetId: "balanced-noise"`. No catalogue row. If product later rewires the selector, assign the resulting visual preset then.

**Noise readability:** resolved `none` for all catalogue entries.

**Noise palette (resolved entries):**

| Group                     | `paletteBehavior`                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------- |
| GridNoise excluding grain | `active-palette` — `background.main`, `background.accent`                           |
| ParticleNoise family      | `active-palette` — `container.gradientPrimaryToSecondaryVertical`, `container.main` |
| `gradient-grid`           | `active-palette` — accent/main                                                      |
| `geometric-field`         | `active-palette` — background + container roles                                     |
| `spokes-field`            | `active-palette` — palette gradient + `templateVariation.gradient`                  |

**Noise author controls:** `noise.type` only from wire (`affectsRendering: true`). Renderer-tuned props (grid size, speeds, etc.) are `renderer-default` / `palette-injected` with `affectsRendering` set per inventory.

**Missing `noise.type` ingress:** maps to `balanced-noise` (RC-2).

---

## Operator preset list (derived)

`operatorPresets` is **not** authored as a fixed list during discovery. The publish step derives it from catalogue entries that satisfy the operator list rule above.

At contract `1.0.0` discovery stage:

- **No preset** should be published as `resolved-visible` until the CMS visibility inventory completes.
- **`grain-field`** is excluded from `operatorPresets` by unresolved palette behavior (not by visibility state).
- **`noise.graphics`** has no catalogue row; ingress maps to `balanced-noise`.

A definitive count and ordered operator list belong in the published JSON artifact **after** CMS visibility confirmation, not in discovery markdown.

---

## Legacy ingress index (contract `1.0.0`)

Illustrative rows; full table lives in `compatibility-plan.md`.

| `id`                         | `match`                                      | `outcome`   | `presetId`           |
| ---------------------------- | -------------------------------------------- | ----------- | -------------------- |
| `ingress-graphics-geometric` | `Graphics` + `noise.type: geometric`         | generated   | `geometric-field`    |
| `ingress-noise-geometric`    | `Noise` + `noise.type: geometric`            | generated   | `geometric-field`    |
| `ingress-graphics-spokes`    | `Graphics` + `noise.type: spokes`            | generated   | `spokes-field`       |
| `ingress-noise-spokes`       | `Noise` + `noise.type: spokes`               | generated   | `spokes-field`       |
| `ingress-graphics-floating`  | `Graphics` + `noise.type: floatingParticles` | generated   | `floating-particles` |
| `ingress-noise-floating`     | `Noise` + `noise.type: floatingParticles`    | generated   | `floating-particles` |
| `ingress-graphics-graphics`  | `Graphics` + `noise.type: graphics`          | generated   | `balanced-noise`     |
| `ingress-noise-graphics`     | `Noise` + `noise.type: graphics`             | generated   | `balanced-noise`     |
| `ingress-noise-grain`        | `Noise` + `noise.type: grain`                | generated   | `grain-field`        |
| `ingress-graphics-grain`     | `Graphics` + `noise.type: grain`             | generated   | `grain-field`        |
| `ingress-pattern-dots`       | `Pattern` + `pattern.type: dots`             | generated   | `dot-field`          |
| `ingress-particle-dots`      | `Particle` + `particle.type: dots`           | generated   | `floating-dots`      |
| `ingress-animated`           | `useBackground: Animated`                    | passthrough | —                    |
| `ingress-unknown-wire`       | unrecognized `useBackground`                 | unsupported | —                    |

Every inventory `noise.type`, `pattern.type`, and `particle.type` receives `generated` ingress rows. Every Noise-variant ingress includes **both** Graphics and Noise rows with the same `presetId`. `noise.graphics` maps to `balanced-noise`, not a separate visual.

---

## Adding a preset (checklist)

1. Add one row to the in-repo catalogue source (future: TypeScript module).
2. Assign a unique visual `id` and `inventoryKey`.
3. Declare `rendererAdapter`, `defaultConfiguration`, readability, and palette state.
4. Set `operatorVisibility`, readability, and palette state. Do not mark `resolved-visible` until CMS visibility is confirmed.
5. Append `legacyIngress` rows (including dual Graphics/Noise rows when applicable).
6. Regenerate `discovery-contract.json`; bump `contractVersion` per semver rule.
7. Do **not** edit `templateRegistry` variants, CMS lists, or selector switches separately.

---

## Open items for compatibility plan (step 3)

Moved to `.scratch/generated-backgrounds/compatibility-plan.md` (complete).

## References

- Inventory: `.scratch/generated-backgrounds/current-preset-inventory.md`
- Decisions: `.scratch/generated-backgrounds/decisions.md`
- ADR: `docs/adr/0002-generated-background-wire-deferred.md`
- Domain: `CONTEXT.md` — Generated background, legacy wire value, readability policy

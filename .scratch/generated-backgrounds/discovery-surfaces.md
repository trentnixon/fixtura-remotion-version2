# Generated discovery surfaces and controls

**Date:** 2026-08-28  
**Status:** Approved discovery baseline  
**Depends on:**

- `.scratch/generated-backgrounds/handoff.md`
- `.scratch/generated-backgrounds/decisions.md` (approved)
- `.scratch/generated-backgrounds/current-preset-inventory.md` (approved)
- `.scratch/generated-backgrounds/catalogue-contract.md` (approved)
- `.scratch/generated-backgrounds/compatibility-plan.md` (approved)
- `.scratch/generated-backgrounds/remotion-options.md` (approved)

**Next:** `implementation-handoff.md` (complete)

## Purpose

Name every surface that today exposes Graphics, Pattern, Particle, or Noise — or derives options from them — and specify how each surface presents **Background → Generated → Preset** after consolidation.

Separate **background-operator** controls (CMS) from **preset-author** controls (Remotion Studio / engineering). Phase 1 operator UI is **preset selection only** unless product adds a cross-preset control with consistent meaning.

---

## Control model

| Audience                | Surface                                             | Phase 1 controls                                         | Source after consolidation                                                         |
| ----------------------- | --------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Background operator** | Fixtura CMS                                         | Preset picker only                                       | `discovery-contract.json` → `operatorPresets` + full catalogue for labels/metadata |
| **Background operator** | —                                                   | No family picker (Graphics / Pattern / Particle / Noise) | Removed from CMS category list                                                     |
| **Preset author**       | Remotion Studio, dev compositions, renderer modules | Engineering-only renderer props (code changes)           | Catalogue `authorControls` documents intent; **not** Studio-editable in Phase 1    |
| **Preset author**       | —                                                   | Not exposed in CMS                                       | `operatorControls: []` on every Phase 1 entry                                      |

**Fields accepted but ignored at runtime** (`pattern.opacity`, `particle.animation`, etc.) are documented in catalogue `authorControls` with `affectsRendering: false` where applicable — never in operator UI (OVR-10).

**Passthrough backgrounds** (Solid, Gradient, Image, Video, Texture, Luminance, Animated): wire routing and `matchLegacyIngress` **passthrough** outcomes are confirmed. **CMS visibility for each category is not confirmed** (parallel inventory in `decisions.md`).

Phase 1 must **preserve each passthrough category’s current CMS visibility** once the inventory confirms it. Do **not** newly expose Animated or any other category that is hidden or absent today. Passthrough categories are not Generated presets regardless of visibility.

---

## Surface inventory

| #   | Surface                                      | Role                         | In-scope today                                | Consolidation target                                                                                              |
| --- | -------------------------------------------- | ---------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1   | Fixtura CMS / product UI                     | Background operator          | **Unconfirmed** — not in this repo            | `Generated → Preset` from published contract                                                                      |
| 2   | Published discovery artifact                 | CMS contract                 | Not yet built                                 | `public/generated-backgrounds/discovery-contract.json` (proposed)                                                 |
| 3   | `SelectTemplateBackground`                   | Production render router     | Graphics, Noise, Pattern, Particle            | Legacy wire routing retained; **adds** ingress validation, catalogue adapters, Solid + diagnostic for unsupported |
| 4   | `src/templates/registry.tsx`                 | Dev template variant list    | Graphics, Particle, Pattern (not Noise)       | Remove Graphics / Pattern / Particle; passthrough variants remain **only where dev browse needs them**            |
| 5   | `DevelopmentRoot` + `CompositionEntry`       | Remotion Studio folder tree  | `{Template}/{Variant}/…` — variant → wire     | `{Template}/Generated/{presetId}/{Sport}/{Dataset}` — folder label is not wire                                    |
| 6   | `processDatasetForTemplate`                  | Dev dataset → wire injection | Sets `useBackground: variant`                 | Accepts explicit `LegacyEgressPayload` or background selection — **never** a `"Generated"` wire string            |
| 7   | `testData/samples/**`                        | Wire-contract evidence       | Mixed legacy blocks                           | Preserved; add Generated catalogue fixtures as needed                                                             |
| 8   | `BackgroundComponents` export map            | Dev / legacy imports         | Graphics, Noise.\*, Pattern, Particle         | Phase 1: keep for adapter internals; not an operator discovery surface                                            |
| 9   | `config/types.ts`                            | Type-model documentation     | Lowercase families + drift                    | Align docs; wire types unchanged Phase 1                                                                          |
| 10  | `.comms/TEMPLATES.md`                        | External integrator docs     | Lists Graphics, Particle, Pattern             | Document Generated operator model; legacy wire table unchanged Phase 1                                            |
| 11  | `.comms/Guide to Remotion Set up handoff.md` | External payload reference   | Full Graphics/Noise/Pattern/Particle sections | Cross-reference compatibility plan + discovery contract                                                           |
| 12  | In-repo catalogue module (proposed)          | Canonical preset source      | Per-family config files                       | Single catalogue exports entries + builds discovery JSON                                                          |

---

## 1. Fixtura CMS (operator)

**Today (unconfirmed):** Product may expose Graphics, Pattern, Particle, and Noise as sibling background categories. CMS visibility inventory is a parallel product task (`decisions.md`).

**After consolidation (operator model — CMS visibility per category still subject to inventory):**

```text
Background
├── Passthrough categories (visibility = current CMS state once confirmed)
│   e.g. Solid, Gradient, Image, Video, Texture, Luminance, Animated
└── Generated
    └── Preset  ← operatorPresets[] from discovery contract
```

Do not treat the passthrough list as a fixed Phase 1 CMS menu. Only **Generated** is new operator structure; passthrough categories neither gain nor lose visibility without product confirmation.

| Behavior               | Rule                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| Read existing payload  | `matchLegacyIngress(wire)` → display `Generated → presetId` or passthrough / unsupported   |
| Save, no preset change | Sticky ingress — preserve original wire (`compatibility-plan.md`)                          |
| Save, new preset       | Write catalogue `defaultConfiguration` (canonical legacy egress)                           |
| Unsupported input      | Show reset/unsupported UI; **preserve original payload** until operator picks valid preset |
| Operator controls      | Preset selection only Phase 1                                                              |

CMS does **not** maintain a parallel preset list. It consumes `contractVersion`, `catalogue.presets`, `operatorPresets`, and `legacyIngress`.

---

## 2. Published discovery artifact

**Proposed path:** `public/generated-backgrounds/discovery-contract.json`  
**Built from:** in-repo catalogue module at build/publish time (`catalogue-contract.md`).

| Section             | Operator-visible | Purpose                                                               |
| ------------------- | ---------------- | --------------------------------------------------------------------- |
| `catalogue.presets` | No               | Full definitions, author metadata, ingress IDs                        |
| `operatorPresets`   | Yes (ordered)    | Derived: `resolved-visible` + resolved readability + resolved palette |
| `legacyIngress`     | No               | Normalize stored payloads on read                                     |

Until CMS visibility inventory completes, entries may remain `operatorVisibility: unresolved` — artifact must not hand-author a fixed operator count.

---

## 3. Production render — `SelectTemplateBackground`

**Path:** `src/components/backgrounds/index.tsx`

Phase 1 **preserves production wire values** (ADR 0002). The router is **not** unchanged — it gains a validated boundary aligned with `compatibility-plan.md`.

| Layer                            | Phase 1 behavior                                                                                                              |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Ingress validation**           | Stored `templateVariation` passes through `matchLegacyIngress(wire)` before render                                            |
| **Legacy wire routing**          | Recognized passthrough and generated ingresses continue to use existing family switches and legacy `useBackground` values     |
| **Catalogue adapters**           | Recognized **generated** presets route through catalogue → renderer adapter (same visual outcome as today’s family renderers) |
| **Unsupported**                  | **Solid** + structured diagnostic — replaces silent family-default fallbacks                                                  |
| **`useBackground: "Generated"`** | Not a production wire value in Phase 1                                                                                        |

```text
templateVariation (legacy wire)
  → matchLegacyIngress
  → generated | passthrough | unsupported
  → adapter or existing renderer (generated/passthrough)
  → Solid + diagnostic (unsupported)
```

Generated normalization remains **display- and CMS-state** only on the wire until a versioned Generated wire rollout.

---

## 4. Template registry (passthrough dev variants)

**Path:** `src/templates/registry.tsx`

**Today:** Shared `Variants` array advertises `Graphics`, `Particle`, `Pattern` (plus Solid, Image, …). **Noise is omitted** despite full runtime support — documented drift (inventory discovery surfaces).

**Proposed Phase 1:**

- **Remove** `Graphics`, `Pattern`, `Particle` from `Variants` — consolidated under Studio **Generated** browse (§5), not a registry wire value.
- **Retain** passthrough entries (Solid, Image, Gradient, Video, Texture, Luminance, …) only for dev compositions that still browse by passthrough category. Each passes an explicit `LegacyEgressPayload` into `processDatasetForTemplate` — not a folder name inferred as wire.

**Noise note:** Registry never listed Noise as a variant. Generated dev browse covers all catalogue presets including former Noise/Graphics ingresses via preset ID folders.

---

## 5. Remotion Studio — `DevelopmentRoot`

**Path:** `src/DevelopmentRoot.tsx` → `CompositionEntry`

**Today:** Folder tree `{Template}/{Variant}/{Sport}/{Dataset}` where `variant` becomes `useBackground` via `processDatasetForTemplate`.

**Target folder structure (concrete):**

```text
{Template}
└── Generated
    └── {presetId}
        └── {Sport}
            └── {Dataset}
```

| Rule                | Detail                                                                                                                                                    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Preset rows**     | `DevelopmentRoot` iterates catalogue preset IDs (from in-repo catalogue or published contract) — not registry variant names                               |
| **Wire injection**  | `CompositionEntry` receives `{ presetId, legacyEgress: LegacyEgressPayload }` — canonical egress from catalogue entry                                     |
| **Folder label**    | `"Generated"` and `{presetId}` are **Studio navigation labels only**. Neither becomes `useBackground` or production wire                                  |
| **Passthrough dev** | Optional parallel tree `{Template}/{PassthroughCategory}/…` using explicit `LegacyEgressPayload` per folder — visibility follows same CMS inventory rules |

Studio element catalogues (`addElementLibraryToStudio`, Remotion 4.0.518+) are **explicitly out of scope** for Phase 1 (`handoff.md`, `remotion-options.md`).

### Dev composition ID format

Remotion Studio composition `id` (distinct from production `metadata.compositionId`):

```text
{templateId}-generated-{presetId}-{datasetId}
```

Example: `Basic-generated-dot-field-cricket-roster-001`

| Field        | Source                     |
| ------------ | -------------------------- |
| `templateId` | Template registry key      |
| `presetId`   | Catalogue stable visual ID |
| `datasetId`  | Test dataset key           |

`appearance.type` in dev datasets should record `{ presetId }` or a dev-only `{ backgroundKind: "generated", presetId }` — **not** the string `"Generated"` as wire. Production composition ID formula (`${templateId}-${useBackground}-${compositionId}`) is unchanged and continues to use **legacy** `useBackground` from stored payloads.

---

## 6. Dev wire injection — `processDatasetForTemplate`

**Path:** `src/core/utils/datasetProcessing.ts`

**Today:**

```ts
templateVariation: {
  ...existingTemplateVariation,
  useBackground: variant,
},
```

**Required Phase 1 signature (conceptual):**

```ts
processDatasetForTemplate(
  dataset: FixturaDataset,
  templateId: string,
  sportName: string,
  background: LegacyEgressPayload, // explicit — never the string "Generated"
): FixturaDataset;
```

| Caller                       | `background` argument                                                       |
| ---------------------------- | --------------------------------------------------------------------------- |
| Generated `CompositionEntry` | Catalogue `defaultConfiguration` / canonical legacy egress for `{presetId}` |
| Passthrough dev folder       | Explicit passthrough payload, e.g. `{ useBackground: "Solid" }`             |
| Legacy tests                 | Unchanged stored payload from sample JSON                                   |

The function merges `background` into `templateVariation` and sets `appearance.type` from dev metadata (preset ID or passthrough label) — **not** from a Studio folder name. Remove the pattern where registry `variant` blindly overwrites `useBackground`.

---

## 7. Sample JSON and fixtures

**Path:** `testData/samples/**`

**Role:** Wire-contract evidence for ingress matching and dev renders.

| Action                          | Phase 1                                                          |
| ------------------------------- | ---------------------------------------------------------------- |
| Keep existing samples           | Yes — compatibility proofs                                       |
| Add catalogue-driven fixtures   | Optional — one file per preset or matrix for normalization tests |
| Change production sample shapes | No — sticky ingress depends on stable stored payloads            |

Samples may continue to carry sibling `noise` / `pattern` / `particle` blocks (RC-6). Renderer reads active family only.

---

## 8. Renderer modules and export map

**Paths:**

- `src/components/backgrounds/variants/Patterns/**`
- `src/components/backgrounds/variants/Particles/**`
- `src/components/backgrounds/variants/NoiseBackground/**`
- `BackgroundComponents` in `index.tsx`

**Role:** Preset **implementation** surface — detail behind renderer adapters.

| Concern                    | Phase 1                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| Operator discovery         | None — catalogue hides adapter keys                                                       |
| Engineering APIs           | Per-renderer props, palette injection, animation toggles — changed in code only           |
| Catalogue `authorControls` | **Metadata** documenting intended author parameters — not wired to Studio                 |
| Config duplication         | Family `config.ts` files become adapter inputs; catalogue is canonical for IDs and egress |

Do not expose raw renderer variant enums (e.g. `NOISE_VARIANTS`) to CMS.

### Studio authoring follow-up (post–Phase 1)

Making catalogue `authorControls` editable in Remotion Studio requires a **separate** integration — e.g. Remotion schemas, visual editing, or effect parameter schemas (`remotion-interactivity` / `@remotion/zod-types`). That work is **not** in Phase 1 scope. Phase 1 authors continue to change renderer behavior through code and engineering props.

---

## 9. Type model — `config/types.ts`

**Today:** Lowercase `BackgroundType` includes `graphics`, `pattern`, `particle`, `noise` as separate entries. Live wire uses PascalCase `useBackground` strings in `videoData.ts`. Known drift (inventory type-model section).

**Phase 1:**

| Item                             | Action                                                          |
| -------------------------------- | --------------------------------------------------------------- |
| `useBackground: "Generated"`     | Not added to production wire (ADR 0002)                         |
| CMS / display types              | Internal `GeneratedSelection { presetId }` for normalized state |
| Legacy family types              | Retained for egress payloads and adapters                       |
| Cleanup of unused Graphics props | Documentation / comment alignment — not blocking consolidation  |

---

## 10. External documentation

| Document                                     | Update                                                                                                                                                      |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.comms/TEMPLATES.md`                        | Replace “Background options available now” sibling list with Generated + passthrough; link discovery contract; keep legacy wire reference table for Phase 1 |
| `.comms/Guide to Remotion Set up handoff.md` | §10.6–10.8: note Generated operator model; preserve payload field reference for integrators                                                                 |
| `CONTEXT.md` / ADR 0002                      | Already record deferred Generated wire                                                                                                                      |

External docs describe **what integrators send** (legacy wire Phase 1) separately from **what operators see** (Generated).

---

## 11. Proposed in-repo catalogue module

**Proposed path:** `src/components/backgrounds/variants/Generated/catalogue/` (or equivalent — implementation ticket)

| Export                     | Consumers                                                             |
| -------------------------- | --------------------------------------------------------------------- |
| `generatedCatalogue`       | Renderer adapter registry, tests, `DevelopmentRoot` preset list       |
| `buildDiscoveryContract()` | Build script → `public/generated-backgrounds/discovery-contract.json` |
| `matchLegacyIngress`       | **Single canonical implementation** in this repo                      |

### CMS ingress matching — one rule, no mirror

CMS must not maintain a separately authored matcher. Choose **one** integration path:

| Path                                | Rule                                                                                                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A — Contract consumer (default)** | CMS matches stored payloads using the published `legacyIngress` rows in `discovery-contract.json` only                                                        |
| **B — Shared package**              | CMS imports a package **generated from the same catalogue build** that emits `discovery-contract.json` — same rows, same semver, no hand-maintained duplicate |

Paths A and B share one source of truth. A CMS-side reimplementation of matching logic that can drift from the repo is **not allowed**.

---

## Phase 1 control summary by preset family

| Legacy family         | Operator control (CMS) | Author surface (Phase 1)                                                                                                               |
| --------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Pattern (6)           | Preset only            | Engineering renderer props; catalogue `authorControls` documents `scale`, `rotation`, `animation`, … — not `opacity` until runtime fix |
| Particle (5)          | Preset only            | Engineering props; catalogue documents `particleCount`, `speed`, `direction` — not `animation` / size / colour until wired             |
| Noise / Graphics (15) | Preset only            | GridNoise / ParticleNoise / SVG module props; palette injected at runtime                                                              |
| All Generated         | Preset picker          | Catalogue metadata only; Studio schema integration deferred                                                                            |

No cross-preset operator slider in Phase 1 (handoff open decision #3 default: preset-only).

---

## Surfaces explicitly unchanged Phase 1

| Surface                                               | Reason                                                                  |
| ----------------------------------------------------- | ----------------------------------------------------------------------- |
| Production wire shape                                 | ADR 0002 — legacy values preserved on save                              |
| Legacy `useBackground` strings for recognized ingress | Sticky ingress + canonical egress rules                                 |
| Passthrough CMS visibility                            | Preserved per category once inventory confirms — no new exposure        |
| Luminance, Texture product grouping                   | Separate from Generated                                                 |
| Production composition ID formula                     | Still includes legacy `useBackground`; sticky ingress on no-change save |

---

## Implementation dependencies (ordered)

1. In-repo catalogue module + `buildDiscoveryContract()` → published JSON
2. `matchLegacyIngress` in repo; production router validation + catalogue adapters in `SelectTemplateBackground`
3. CMS integration — contract consumer (path A) or shared generated package (path B); **no mirror matcher**
4. `DevelopmentRoot`: `{Template}/Generated/{presetId}/{Sport}/{Dataset}` from catalogue
5. `processDatasetForTemplate`: explicit `LegacyEgressPayload` parameter; remove variant → wire coupling
6. Registry: remove Graphics / Pattern / Particle variant entries
7. External doc updates
8. Studio schema / visual authoring for `authorControls` — **follow-up**, not Phase 1

---

## Open items

| Item                                                           | Owner                                         |
| -------------------------------------------------------------- | --------------------------------------------- |
| CMS visibility inventory — which modes are selectable today    | Product / CMS (`decisions.md`)                |
| Final operator preset list (`operatorPresets` count and order) | Product after visibility + palette resolution |
| CMS ingress path A (JSON consumer) vs path B (shared package)  | Engineering + CMS — must pick one             |
| Animated → Generated contribution                              | Product — handoff open decision #4            |
| Studio schema integration for catalogue `authorControls`       | Engineering — post–Phase 1 follow-up          |

---

## References

- Inventory discovery surfaces: `.scratch/generated-backgrounds/current-preset-inventory.md`
- Catalogue contract: `.scratch/generated-backgrounds/catalogue-contract.md`
- Compatibility: `.scratch/generated-backgrounds/compatibility-plan.md`
- Registry: `src/templates/registry.tsx`
- Render router: `src/components/backgrounds/index.tsx`
- Dev processing: `src/core/utils/datasetProcessing.ts`

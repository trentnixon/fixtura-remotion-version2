# Generated backgrounds catalogue

**Status:** ready-for-agent  
**Date:** 2026-08-27  
**Seams (confirmed):** parse/normalize (primary); catalogue resolve (secondary); thin renderer adapters; Phase 0 human approval record

## Problem Statement

Background operators cannot choose a computer-generated look by what it looks like. They must navigate overlapping implementation categories — Graphics, Pattern, Noise, Particle, Animated — that disagree across the selector, registry, and configuration shapes. The same visual idea can live in more than one place. Invalid or mismatched payloads silently become an unrelated background. There is no single catalogue that owns names, previews, palette behaviour, readability policy, motion class, or render expectations.

## Solution

Introduce **Generated backgrounds** as the product category and internal catalogue. Background operators and preset authors choose named visual presets. Compatibility adapters keep legacy wire values (Graphics, Pattern, and supported Noise) on the wire so composition IDs and callers stay stable. A Phase 0 visual audit records keep / merge / replace / retire decisions before Phase 1 mints stable IDs and routes Graphics and Pattern through one Generated module. Particle and Animated stay outside Generated until a later audit. Luminance, Image, Video, Texture, Solid, and Gradient remain separate background options.

## User Stories

1. As a background operator, I want one Generated backgrounds group, so that I do not have to learn renderer names to pick a look.
2. As a background operator, I want presets named by visual result (for example Geometric field or Dots), so that the catalogue matches what I see in the preview.
3. As a background operator, I want a preview still or short loop per preset, so that I can compare looks before selecting one.
4. As a background operator, I want a one-sentence description per preset, so that I understand the treatment without opening advanced settings.
5. As a background operator, I want palette compatibility information on each preset, so that I know how club colours will drive the look.
6. As a background operator, I want a motion intensity classification, so that I can avoid overly energetic backgrounds when the asset needs calm.
7. As a background operator, I want a readability policy on each preset, so that foreground text, logos, and cards stay legible.
8. As a background operator, I want only restrained controls when any are exposed, so that I am not asked for shader or SVG parameters.
9. As a background operator, I want existing Graphics and Pattern selections to keep working, so that live club videos do not change without an intentional redesign.
10. As a background operator, I want composition identity for legacy payloads to stay stable, so that caches and callers do not break during the catalogue migration.
11. As a background operator, I want mismatched or unknown backgrounds not to silently become a different named look, so that mistakes are visible or fall back safely.
12. As a preset author, I want a single catalogue entry to declare a preset’s metadata, so that I do not edit several registries and switches to add a look.
13. As a preset author, I want stable visual IDs that never include renderer or library tokens, so that renaming an implementation does not rename the product identity.
14. As a preset author, I want closed configuration schemas per preset, so that contradictory optional bags cannot reach a renderer.
15. As a preset author, I want Studio access to renderer detail and advanced controls, so that I can art-direct without exposing those knobs to operators.
16. As a preset author, I want legacy Graphics and Pattern Studio paths preserved in Phase 1, so that development composition IDs stay identical.
17. As a preset author, I want a non-ID-bearing Generated Studio group when nesting does not change composition IDs, so that Studio browsing matches the product category.
18. As a preset author, I want optional non-production Generated preview compositions, so that I can review catalogue looks without replacing compatibility compositions.
19. As a preset author, I want Geometric field to be one preset whether it entered through Graphics or Noise, so that dual ingress does not duplicate the catalogue.
20. As a product designer, I want a Phase 0 contact sheet with a shared foreground fixture, so that keep / merge / replace / retire decisions compare equal conditions.
21. As a product designer, I want orphan `graphics` and Graphics-plus-unrelated-noise rows on that sheet, so that current buggy behaviour is classified instead of hidden.
22. As a product designer, I want Pattern rows rendered with animation none on the comparable sheet, so that type decisions are not confounded by motion.
23. As a product designer, I want separate compatibility baselines for Pattern samples that already use non-none animation, so that live motion configs are not lost.
24. As a product designer, I want merge to name a survivor (or a new art-directed preset), so that the catalogue does not keep duplicate looks.
25. As a product designer, I want replace to mean new art for the same operator slot, so that redesigns stay continuous when meaning is unchanged.
26. As an engineer, I want Phase 0 evidence under a scratch phase-0 directory, so that audit baselines are not production public assets.
27. As an engineer, I want an approval record with product and engineering sign-off, so that parity and redesign decisions are auditable.
28. As an engineer, I want dual-ingress pairs to record whether outputs match, so that adapters can normalize with evidence.
29. As an engineer, I want a Noise documentation inventory without adding Noise to the registry, so that Noise stays supported but undiscovered through Phase 1.
30. As an engineer, I want parse/normalize as a pure boundary, so that legacy payloads become one internal Generated model without React.
31. As an engineer, I want unknown values to fail in Studio, development, and tests, so that authors see the offending field immediately.
32. As an engineer, I want production Lambda to emit a diagnostic and render Solid for unknown values, so that live renders do not invent an unrelated Generated preset.
33. As an engineer, I want known orphan and mismatch ingresses treated as explicit compatibility cases until Phase 2, so that Phase 0 baselines remain honest.
34. As an engineer, I want the catalogue to be the only discovery source for Generated presets, so that registry and selector lists cannot drift.
35. As an engineer, I want existing Pattern and Graphics drawing code reused as adapters first, so that consolidation does not force a rewrite.
36. As an engineer, I want Phase 1 to add no new operator control contract, so that CMS work stays a later promotion of selected fields.
37. As an engineer, I want seed omitted until a preset needs deterministic variation, so that unused knobs do not enter the model.
38. As an engineer, I want Particle to remain a discovered sibling through Phase 1, so that scope stays Graphics and Pattern only.
39. As an engineer, I want Animated to remain runtime-supported and undiscovered through Phase 1, so that it is audited in Phase 2 rather than half-migrated.
40. As an engineer, I want Phase 1 implementation gated on luminance close and Phase 0 decisions, so that shared selector and type edits do not collide.
41. As an engineer, I want readability policy as the Generated term, so that it is not confused with Luminance foreground protection.
42. As a preset author, I want each active preset to declare palette role mappings, so that renderers do not invent colour policy.
43. As a preset author, I want deterministic frame output for fixed input, seed (when present), dimensions, Remotion version, and environment, so that stills and tests are stable.
44. As an engineer, I want local and Lambda checks for active Phase 1 presets, so that supported renderers stay acceptably close.
45. As a background operator, I want Luminance and media backgrounds to stay outside Generated, so that those workflows are not folded into this catalogue.
46. As a product designer, I want unresolved audit rows to block stable IDs and Phase 1 issues for that preset, so that unfinished decisions cannot ship as catalogue truth.
47. As an engineer, I want Studio element-library APIs out of scope through Phase 2, so that this programme does not depend on a Remotion upgrade.
48. As a future integrator, I want catalogue metadata shaped for later CMS consumption, so that Fixtura can present Generated without inventing a second source of truth.
49. As a preset author, I want later effect-based presets (for example Broadcast Halftone) to enter only after visual and render gates, so that experimental GPU looks do not skip evidence.
50. As an engineer, I want one issue per deliverable after the audit, so that Phase 1 work stays claimable and verifiable.

## Implementation Decisions

- Product category is Generated backgrounds; Graphics, Pattern, and Noise are legacy wire values until a versioned rollout introduces `useBackground: "Generated"` (ADR 0002).
- Roles: background operator (restrained product surface) and preset author (Studio / advanced surface). Avoid “user” when one of these roles is meant.
- Module seam: one Generated backgrounds module owns catalogue, parse/normalize, legacy adapters, preset lookup, palette-role resolution, defaults/fallback policy, renderer selection, capability metadata, and preview fixture metadata.
- Primary runtime seam: parse external template variation into one internal Generated model; after parse, internal code does not re-read legacy shapes.
- Secondary seam: catalogue resolve maps the internal preset to one renderer adapter.
- First adapters: tiled-pattern (existing Pattern) and full-frame SVG (existing Geometric / Spokes Graphics). Do not rewrite drawing code in Phase 1.
- One preset may have multiple legacy ingresses; composition IDs retain the original wire `useBackground` segment.
- Phase 0 matrix and approval process are mandatory before minting stable IDs; Phase 0 uses working names only.
- Phase 1 stable IDs: lowercase kebab-case visual meaning only; no `gen-` prefix; no renderer or library tokens.
- Registry retains Graphics and Pattern paths in Phase 1. Conditional requirement: nest them under a non-ID-bearing Generated Studio folder only if composition IDs stay identical; otherwise record the blocker and proceed without nesting.
- Noise: accept existing payloads; do not add registry folder or new operator-facing copy through Phase 1; inventory mentions in Phase 0.
- Particle remains discovered sibling; Animated remains runtime-supported and undiscovered through Phase 1.
- Phase 1 adds no new operator control contract; existing Pattern fields remain compatibility inputs. Promoting fields to operator controls is Phase 1.1 or CMS rollout.
- Omit seed from Phase 1 retained Graphics/Pattern model until a preset needs it.
- Readability policy is the Generated catalogue field; Foreground protection remains Luminance-specific.
- Unknown input: reject in Studio, development, and tests with offending value and location; in production Lambda emit structured diagnostic and render Solid; never select an unrelated Generated preset.
- Known orphan (`noise.type: "graphics"` → current GridNoise fallback) and mismatch (Graphics + unrelated noise types) ingresses are explicit compatibility cases until Phase 2 decides otherwise; do not alias before Phase 0 capture.
- Merge default: one survivor; other ingresses alias via adapters; approval names merge target. New art-directed identity only when product requests `new preset: …`.
- Replace: same operator slot, new art; engineering `redesign-approved` signs before/after. Keep stable ID when purpose and meaning stay continuous; otherwise mint a new ID.
- Pattern animation: Phase 0 comparable sheet uses `none`; Phase 1 treats animation as a restrained control conceptually, without exposing a new operator CMS contract in Phase 1.
- Discovery consumers for Phase 1: DevelopmentRoot / Studio composition tree, template-registry metadata, production background selector. CMS is later; metadata should remain consumable.
- Phase 0 artifacts live under the feature’s phase-0 scratch directory (approval record, noise inventory, fixtures, stills, contact sheet). No audit baselines committed as production public assets.
- Phase 1 implementation waits until luminance work is closed or merged and Phase 0 has resolved decisions needed for ID minting.
- Studio element catalogues and Remotion upgrade adoption are out of scope through Phase 2.
- Render-time and memory limits per render class remain unspecified until Phase 1 (DOM/SVG) evidence and Phase 3 (GPU effects).

### Conceptual internal model (decision shape)

```text
Generated background
  preset: stable catalogue identifier   // Phase 1+; Phase 0 uses working names only
  controls: closed values for that preset
  motion: optional restrained intensity override
  // seed: omit until a preset requires it
```

Parsed internal model must be a discriminated union. Each renderer receives only configuration it supports.

## Testing Decisions

- Prefer testing external behaviour at the parse/normalize seam and catalogue resolve seam, not renderer internals or file layout.
- Good tests assert: valid legacy ingresses normalize to the expected internal preset; unknown values fail in authoring paths; production unknown path yields the documented Solid fallback policy; catalogue metadata completeness; exhaustive matches when adding presets; dual-ingress pairs resolve to the same preset.
- Do not assert byte-identical pixels across Chromium/GPU environments; Phase 0 is human contact-sheet classification; Phase 1 adds formal same-environment thresholds for retained presets; Lambda comparison intensifies when GPU-backed effects enter.
- Phase 0 human seam: every matrix row still + contact sheet + approval-record fields + outputsMatch for dual ingress + orphan/mismatch classification + noise inventory; no production behaviour change.
- Prior art: Luminance parse-boundary tests and fixture/contact-sheet workflow for visual evidence; reuse ideas, keep separate Generated Phase 0 scripts and assets.
- Adapter-level drawing tests are not required for Phase 1 consolidation when parity is established via approved stills through the Generated entry.
- Discovery drift tests: Generated discovery metadata derives from the catalogue; adding a preset should not require editing duplicate hard-coded lists.

## Out of Scope

- Merging Image, Video, Texture, or Luminance into Generated
- Rewriting Pattern or Graphics drawing implementations in Phase 1
- Removing legacy Graphics or Pattern payload support
- Renaming existing production composition IDs for legacy wire values
- Absorbing Noise-only, Particle, or Animated presets before their audits (Phase 2+)
- Adding `useBackground: "Generated"` on the wire in Phase 1
- New Fixtura operator control / CMS contract in Phase 1
- Seed parsing for retained Graphics/Pattern presets in Phase 1
- ThreeWebGPUCanvas or HTML-in-canvas as production dependencies
- Studio element-library / Motion Design System browser integration through Phase 2
- Calibrated cross-environment thresholds in Phase 0
- Committing Phase 0 audit baselines under production public asset trees
- Promising byte-identical images across different Chromium or GPU environments
- Phase 1 implementation work before luminance close and Phase 0 catalogue decisions

## Further Notes

### Confirmed seams

1. **Parse / normalize (primary)** — legacy wire + nested config → internal Generated model.
2. **Catalogue resolve (secondary)** — preset → metadata → renderer adapter.
3. **Thin adapters** — existing Pattern and Graphics renderers behind the catalogue.
4. **Phase 0 approval record** — human evidence gate; not a runtime API.

### Delivery order

- **Phase 0 (authorized now):** visual audit — see `.scratch/generated-backgrounds/issues/01-phase-0-visual-audit.md`
- **Phase 1:** catalogue seam + adapters after luminance close and Phase 0 decisions
- **Phase 2:** Noise / Particle / Animated audit into Generated or retire
- **Phase 3:** first-party effects presets after Remotion upgrade review and render gates
- **Phase 4:** specialist renderers only when a named preset needs them

### Domain and decisions

- Glossary: `CONTEXT.md` (Generated background, legacy wire value, background operator, preset author, readability policy; Foreground protection remains Luminance-only)
- ADR: `docs/adr/0002-generated-background-wire-deferred.md`
- Research: `.research/generated-backgrounds-discovery.md`

### Phase 0 matrix (summary)

Comparable rows: Graphics/Noise × geometric, spokes, orphan `graphics`; Graphics + floatingParticles mismatch; six Pattern types with animation none; shared text/logo/card fixture. Capture current behaviour including GridNoise fallbacks.

### Issue tracker

Implementation issues: one file per deliverable under `.scratch/generated-backgrounds/issues/`. Do not open Phase 1 implementation issues until Phase 0 resolves the needed catalogue decisions and luminance is closed or merged.

# Generated background consolidation decisions

**Status:** Approved discovery baseline

**Date:** 2026-08-28

These decisions guide discovery. Product and engineering approve the full discovery package before implementation tickets or production code.

## Product and CMS

- CMS presents `Background → Animated → Preset`.
- Graphics, Pattern, Particle, and Noise stop appearing as sibling operator categories after consolidation.
- Animated is the single production background wire for generated motion presets.
- CMS normalizes recognized legacy payloads to a Generated preset for display.
- A recognized legacy ingress remains sticky while the normalized preset ID stays unchanged. Reselecting the same preset does not change the wire payload.
- A new preset selection uses the catalogue entry's canonical legacy egress.
- The operator sees one row per preset. Legacy ingress is internal compatibility state.
- Phase 1 exposes preset selection plus only controls with the same meaning across every preset that uses them. Preset-only is the expected first release.
- Phase 1 consolidates existing presets. New Remotion effects remain a follow-on shortlist.

## Wire and composition identity

- New DATA uses `useBackground: "Animated"` with a concrete catalogue preset in `animation.type`.
- Graphics, Pattern, Particle, and Noise remain read-only compatibility inputs for older stored payloads.
- A no-change save preserves the existing recognized ingress and composition identity.
- Changing the normalized preset ID may select a different canonical legacy egress and therefore a different composition identity.
- `useBackground: "Generated"` remains invalid; the production discriminator is `Animated`.

## Catalogue and CMS contract

- The Remotion catalogue is canonical.
- This repository publishes a versioned JSON discovery contract and schema for CMS.
- The operator list contains only entries with `operatorVisible: true`, resolved readability policy, and resolved palette behavior.
- The artifact includes a non-selectable legacy-ingress map with `generated`, `passthrough`, and `unsupported` outcomes.
- All supported Graphics, Pattern, Particle, and Noise modes are evaluated as concrete Animated catalogue presets.
- Preset IDs are unique, visual, and renderer-neutral. Use descriptive names such as `dot-field`, `floating-dots`, `grain-field`, and `digital-rain`.
- Each catalogue entry declares a canonical legacy egress. Recognized existing aliases remain sticky on unchanged saves.
- Each entry records readability policy and palette behavior as either resolved or unresolved with a note.
- Engineering may resolve `none` or an existing treatment when code proves the result. Product decides new visual treatments.

## Invalid input

- Studio and development report a descriptive error.
- Production renders Solid and emits a structured diagnostic.
- CMS shows an unsupported or reset state and preserves the original payload until the operator chooses a valid preset.
- The system does not invent a Generated preset for malformed input.

## Discovery

- Start with `current-preset-inventory.md`.
- Give every Graphics, Pattern, Particle, and Noise preset one inventory entry.
- Record identity, ingress, renderer, controls, discovery locations, readability, palette behavior, and known routing behavior.
- Flag overlaps as duplicate, alias, name collision, related, or distinct.
- Put factual relationships in the inventory. Put provisional merge, rename, keep-distinct, and retirement recommendations in this file.
- Retirement recommendations require evidence and remain product decisions.
- Do not create implementation tickets until the user approves the full discovery package.
- Use code inventory and targeted technical prototypes. A visual audit and parity approval workflow are outside this task.

## Phase 1 success

Phase 1 succeeds when CMS shows one Animated option from the published contract, new DATA uses `animation.type`, existing recognized legacy payloads remain readable, and renderer adapters remain independent behind one catalogue. Graphics, Pattern, Particle, and Noise are all included as concrete animation presets.

## Provisional overlap recommendations (inventory)

**Date:** 2026-08-28  
**Source:** `.scratch/generated-backgrounds/current-preset-inventory.md`  
**Status:** Provisional — product decides removal, renaming, and operator visibility

| ID     | Preset(s)                                                              | Draft recommendation                                                                                            | Confidence                                                    | Compatibility effect                                                                                                           | Unresolved product question                                                  |
| ------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| OVR-01 | `noise.graphics`                                                       | **Merge via alias** to `noise.default` _or_ **rewire** selector case to `GeometricGraphics`                     | High on current GridNoise behavior; medium on original intent | Sticky Graphics/Noise + `graphics` ingress must preserve current GridNoise look on no-change save until product chooses rewire | Was `graphics` ever meant to render geometric SVG rather than default noise? |
| OVR-02 | Pattern `dots` / Particle `dots`                                       | **Keep distinct**; **rename** operator labels (e.g. dot field vs floating dots)                                 | High                                                          | Separate canonical legacy egress families (`Pattern` vs `Particle`)                                                            | Final CMS display names and preview art                                      |
| OVR-03 | Pattern `lines` / Particle `lines`                                     | **Keep distinct**; **rename** operator labels                                                                   | High                                                          | Separate egress families                                                                                                       | Final display names                                                          |
| OVR-04 | Noise `floatingParticles` / `dynamicParticles` vs Particle family      | **Keep distinct**                                                                                               | High                                                          | Noise vs Particle egress; ParticleNoise palette differs from `Particles/*`                                                     | Whether all modes remain `operatorVisible`                                   |
| OVR-05 | Pattern `triangles` vs `triangleSwarm`                                 | **Keep distinct**                                                                                               | High                                                          | —                                                                                                                              | —                                                                            |
| OVR-06 | Pattern `grid` vs `gradientGrid`                                       | **Keep distinct**                                                                                               | High                                                          | —                                                                                                                              | —                                                                            |
| OVR-07 | Graphics / Noise dual ingress (`geometric`, `spokes`, all Noise modes) | **Keep sticky dual ingress**; define **canonical legacy egress per preset** for new selections only             | High on sticky rule                                           | Composition ID unchanged on no-change save                                                                                     | Canonical egress table per preset (Graphics vs Noise for each mode)          |
| OVR-08 | `noise.geometric` vs `noise.graphics`                                  | **Treat as distinct** after fixing or aliasing `graphics`                                                       | High once RC-3 resolved                                       | `graphics` sticky ingress must not silently become geometric                                                                   | Whether to retire `graphics` type from operator contract                     |
| OVR-09 | Retire any Noise / Pattern / Particle mode                             | **No retirement** without stronger product evidence                                                             | —                                                             | —                                                                                                                              | Full operator-visible set after CMS inventory                                |
| OVR-10 | `pattern.opacity` (accepted, ignored)                                  | **Do not expose** in operator UI until runtime reads it; document as accepted-but-ignored in compatibility plan | High                                                          | Payloads may carry opacity without visual effect                                                                               | Fix runtime vs drop field from contract                                      |

## Parallel tasks

| Task                     | Owner              | Notes                                                                                                                                                                                                                                   |
| ------------------------ | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CMS visibility inventory | Product / CMS team | Confirm whether Graphics, Pattern, Particle, and Noise appear as sibling categories today and which modes are selectable. Do not infer from wire docs or registry. Phase 1 must not newly advertise or hide categories until confirmed. |

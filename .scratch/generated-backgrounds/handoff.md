# Generated background consolidation handoff

**Current phase:** Discovery and design only. Production implementation is not authorized yet.

**Authoritative outcome:** Fixtura presents one Generated background option containing Graphics, Pattern, Particle, and Noise presets.

## What this task changes

The current background categories describe implementation techniques. A background operator should choose a visual preset, not choose whether the preset was built with SVG, a tiled pattern, or particles.

Generated becomes both:

- the single operator-facing option for computer-generated backgrounds
- the internal catalogue that resolves a named preset to its renderer

Graphics, Pattern, Particle, and Noise stop being separate operator-facing categories. They remain legacy wire values during the compatibility period.

## What consolidation means

Consolidate the catalogue, selection flow, and discovery metadata. Keep renderer implementations separate behind catalogue adapters.

A Generated preset may use:

- the existing Graphics or full-frame SVG renderer
- the existing tiled Pattern renderer
- the existing Particle renderer
- a Remotion effect on a solid canvas
- a specialist renderer such as Lottie, Rive, or ThreeCanvas when the preset needs it

The catalogue hides the renderer choice from the background operator. A preset author may still work with renderer-specific controls in Remotion Studio.

## Operator experience

The intended selection flow is:

```text
Background
└── Generated
    └── Preset
        ├── Geometric
        ├── Spokes
        ├── Dots
        ├── Grid
        ├── Floating particles
        ├── Grain
        ├── Fog
        ├── Digital rain
        └── other named presets
```

The first consolidation release must account for every currently supported Graphics, Pattern, Particle, and Noise preset. Each preset either enters the Generated operator catalogue or receives a provisional merge, rename, or retirement recommendation for product review. Do not defer Particle or treat Noise as an appendix.

Keep the first operator control set small. Preset selection is required. Add another control only when it has a clear and consistent meaning across the presets that expose it.

## Compatibility contract

Existing payloads must continue to render through compatibility adapters:

```text
Graphics payload ─┐
Pattern payload ──┼─> normalize legacy input ─> Generated preset ─> renderer adapter
Particle payload ─┤
Noise payload ────┘
```

Preserve legacy composition IDs, caches, callers, and stored payloads during consolidation. The operator experience can become Generated before the external wire value changes.

Treat `useBackground: "Generated"` as a separate versioned rollout decision. ADR 0002 records why the first consolidation phase keeps legacy wire values.

## Discovery work

Complete these steps in order.

### 1. Map the current preset families

Inspect Graphics, Pattern, Particle, and Noise in the selector, type model, registry, sample payloads, and renderer configuration.

For every preset, record:

- current family and name
- accepted wire payloads
- renderer and configuration source
- default values and available controls
- discovery locations
- fallback, alias, or routing behavior

Completion criterion: every currently supported Graphics, Pattern, Particle, and Noise preset has one inventory entry, and every entry links to its code source.

### 2. Define the Generated catalogue contract

Propose one catalogue entry shape that owns:

- stable visual preset ID
- display name and description
- renderer adapter key
- default configuration
- palette behavior
- readability policy
- author controls
- operator controls
- legacy ingress mappings
- discovery metadata

Keep IDs visual and renderer-neutral. `geometric-field`, `dots`, and `floating-particles` are suitable shapes. Renderer names such as `svg-` and `pattern-` do not belong in preset IDs.

Completion criterion: adding a preset requires one catalogue entry, without editing duplicate selector or discovery lists.

### 3. Define normalization and migration

Specify how each legacy Graphics, Pattern, Particle, and Noise payload becomes an internal Generated preset selection.

Define the behavior for:

- known legacy inputs
- invalid or unknown inputs
- Studio and development errors
- production fallback and diagnostics
- composition ID preservation
- a future versioned Generated wire value

Completion criterion: every inventory entry has a deterministic normalization result, and the plan does not require existing callers to migrate in the first release.

### 4. Define discovery and controls

Identify every operator and author surface that currently exposes Graphics, Pattern, Particle, or Noise. Propose how each surface presents the single Generated option.

Separate background-operator controls from preset-author controls. Do not copy every renderer property into the operator UI.

Completion criterion: the proposal names each affected surface and shows where its options come from after consolidation.

### 5. Shortlist new Remotion presets

Use `.research/generated-backgrounds-discovery.md` for the existing Remotion findings. Recheck official documentation only when a claim affects a design decision or may have changed.

Group candidates as:

- suitable for the first implementation
- suitable for a later prototype
- experimental
- rejected for this catalogue

Prefer stable effects on a solid canvas for new 2D presets. Use custom effects or specialist renderers only when the visual requires them.

Completion criterion: each recommended preset has a visual purpose, likely renderer, expected controls, and reason for inclusion.

### 6. Produce the implementation handoff

Write a decision-ready summary containing:

- the current preset inventory
- the catalogue contract
- the legacy normalization table
- affected discovery surfaces
- the first implementation preset list
- unresolved product decisions
- implementation tickets ordered by dependency

Do not write production code until the user approves that summary.

## Required deliverables

Store discovery results beside this handoff:

```text
.scratch/generated-backgrounds/
  handoff.md
  current-preset-inventory.md
  catalogue-contract.md
  compatibility-plan.md
  remotion-options.md
  discovery-surfaces.md
  implementation-handoff.md
  decisions.md
```

Create implementation tickets only after the user approves these documents.

**Status (2026-08-28):** Discovery approved. Implementation tickets **06–13** (WP-1–WP-8) created under `issues/`. See `implementation-handoff.md`.

## Guardrails

- Keep Graphics, Pattern, Particle, and Noise in the first consolidation scope.
- Build one operator option and one catalogue, not one universal renderer.
- Use code inventory and targeted technical prototypes as evidence.
- A visual audit, contact sheet, parity pack, and preset approval workflow are outside this task.
- Preserve legacy payload behavior during the first consolidation release.
- Keep unrelated Luminance work outside this catalogue task.
- Treat Studio element libraries as a possible future browser, not a dependency for consolidation.

## Open decisions

Discovery must give the user enough evidence to decide:

1. Whether new authoring emits `useBackground: "Generated"` immediately or continues to emit legacy values during the first release.
2. Whether every existing preset ships in the first catalogue or obvious functional duplicates are retired.
3. Which controls, beyond preset selection, belong in the first operator UI.
4. Whether Animated remains separate or contributes selected presets to Generated later.
5. Which new Remotion presets belong in the first implementation.

## Done condition

Discovery is complete when the user can approve one implementation plan that:

- presents one Generated option
- includes Graphics, Pattern, Particle, and Noise
- preserves existing payloads and composition identities
- routes presets through independent renderer adapters
- derives selection and discovery from one catalogue
- names the first set of new Remotion presets

The next agent must stop for approval at that point. Implementation begins only after the user accepts the plan.

## References

- Domain language: `CONTEXT.md`
- Deferred Generated wire value: `docs/adr/0002-generated-background-wire-deferred.md`
- Remotion discovery: `.research/generated-backgrounds-discovery.md`

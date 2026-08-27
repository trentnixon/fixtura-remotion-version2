# 01 — Phase 0 visual audit (Graphics and Pattern baselines)

**What to build:** A production-preserving visual audit of current Graphics and Pattern behaviour. Render a fixed contact-sheet matrix with one locked shared foreground fixture, prepare the approval pack with evidence and engineering measurements, inventory Noise mentions and Pattern non-`none` animation samples, then hand off for human product and engineering approvals. Development-only harness and audit tooling are permitted. Production routing and behaviour must not change. No stable catalogue IDs.

**Blocked by:** None — can start immediately. Phase 1 implementation waits on luminance closing and on this audit resolving catalogue decisions.

**Status:** ready-for-human

## Workflow

Use only repository triage statuses: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. Do not invent `completed`.

```text
ready-for-agent
  -> agent generates the audit pack
  -> ready-for-human
  -> product and engineering complete approvals
  -> check human acceptance criteria and append a closing comment under ## Comments
```

**Status** stays `ready-for-human` after the agent handoff. Phase 0 finish is recorded by checked human acceptance criteria plus a closing comment (for example “Phase 0 audit pack approved; catalogue decisions recorded”). Do not change **Status** to a non-canonical value.

The agent must not sign product approval. After the audit pack is complete, set **Status** to `ready-for-human` and leave every product decision as `unresolved` (unless a human already filled it). The agent fills engineering measurements (`differingPixels`, derived `outputsMatch`, still paths) and leaves engineering approval fields blank or `unresolved` for the human engineer.

## Scope

In scope:

- Phase 0 evidence under `.scratch/generated-backgrounds/phase-0/`
- Locked shared fixture at `phase-0/fixtures/shared.json`
- Comparable stills for the agreed matrix
- Contact sheet
- `approval-record.md` prepared with evidence paths and measurements
- `noise-inventory.md`
- `pattern-animation-inventory.md` (Pattern `animation` values across samples; may conclude “none found”)
- Optional development-only harness registered for Remotion still capture (DevelopmentRoot and ProductionRoot, because CLI stills use ProductionRoot when `NODE_ENV=production`). Does not change `SelectTemplateBackground` routing.
- Audit verification script/command that checks matrix completeness, files, record fields, and dual-ingress pixel comparisons

Out of scope:

- Production selector, types, or registry changes
- Stable catalogue ID minting
- Phase 1 catalogue module
- Noise-only variants (grain, digital rain, and similar)
- Particle or Animated consolidation
- Calibrated cross-environment visual thresholds
- Committing audit baselines under `public/`
- Agent-signed product decisions

## Directory layout

```text
.scratch/generated-backgrounds/phase-0/
  approval-record.md
  noise-inventory.md
  pattern-animation-inventory.md
  fixtures/
    shared.json
  stills/
  contact-sheet/
```

If Remotion requires a temporary asset under `public/` to render, copy final evidence back into this directory. Do not commit audit baselines as production public assets.

## Fixture matrix (comparable rows)

Every row must use the locked values in `fixtures/shared.json`. Capture current behaviour — including GridNoise fallbacks and mismatched payloads. Do not repair before capture.

| rowId | Working name | Wire ingress |
| --- | --- | --- |
| G-geo | Geometric field | `useBackground: "Graphics"`, `noise.type: "geometric"` |
| N-geo | Geometric field | `useBackground: "Noise"`, `noise.type: "geometric"` |
| G-spk | Spokes | `useBackground: "Graphics"`, `noise.type: "spokes"` |
| N-spk | Spokes | `useBackground: "Noise"`, `noise.type: "spokes"` |
| G-gfx | Orphan graphics | `useBackground: "Graphics"`, `noise.type: "graphics"` |
| N-gfx | Orphan graphics | `useBackground: "Noise"`, `noise.type: "graphics"` |
| G-mismatch | Graphics mismatch | `useBackground: "Graphics"`, `noise.type: "floatingParticles"` (as in Cricket_Roster sample) |
| P-dots | Dots | `useBackground: "Pattern"`, `pattern.type: "dots"`, `animation: "none"` |
| P-lines | Lines | Pattern `lines`, `animation: "none"` |
| P-grid | Grid | Pattern `grid`, `animation: "none"` |
| P-crosshatch | Crosshatch | Pattern `crosshatch`, `animation: "none"` |
| P-triangles | Triangles | Pattern `triangles`, `animation: "none"` |
| P-chevron | Chevron | Pattern `chevron`, `animation: "none"` |

Thirteen comparable rows. Dual-ingress pairs for `outputsMatch`: `(G-geo, N-geo)`, `(G-spk, N-spk)`, `(G-gfx, N-gfx)`.

## Shared foreground fixture

Lock the comparable fixture in:

```text
.scratch/generated-backgrounds/phase-0/fixtures/shared.json
```

`shared.json` must record exact values for:

- composition dimensions (width, height)
- frame number
- palette identity / palette values used for the render
- foreground text content
- logo asset path and placement
- card content and placement
- any other asset paths required to reproduce the still

Every comparable row — including orphan and mismatch rows — must load this fixture. “Same fixture” is not satisfied by prose alone; the JSON is the source of truth.

If registered TSX is required, use the smallest harness in a background test directory, register only through DevelopmentRoot, and keep audit props and outputs under `phase-0/`.

## `outputsMatch` definition

For each dual-ingress pair, compare decoded pixels from stills produced in the **same render run**.

- Always record `differingPixels` as an integer, including `0`.
- Derive `outputsMatch`: `yes` exactly when `differingPixels: 0`; otherwise `no`.
- No calibrated threshold. Any non-zero count is a non-match.

Store `differingPixels`, derived `outputsMatch`, and paths to the two stills on both rows of the pair (or once on the pair block) in `approval-record.md`.

## Approval record

Authoritative file: `phase-0/approval-record.md`.

Each entry must include:

- `rowId`, temporary working name, wire-ingress payload reference, still paths
- Product decision: `keep | merge | replace | retire | unresolved`
- Product approver, role, date, notes; `merge target` when decision is `merge`
- Engineering result: `parity | redesign-approved | blocked | unresolved`
- Engineering approver, role, date, notes
- For dual-ingress pairs: `differingPixels` (always, including `0`) and derived `outputsMatch`
- Orphan/mismatch classification where applicable: `bug | alias-candidate | retire-candidate | preserve-as-is | unresolved`

Agent handoff defaults:

- Product decision: `unresolved` (agent does not approve)
- Product approver / date: empty
- Engineering measurements (`differingPixels`, derived `outputsMatch`, still paths): filled by agent
- Engineering approval fields: left for human (`unresolved` / empty approver until signed)

If one person fills both human roles, record two approval entries.

Parked rows after human review:

- Product may remain `unresolved` only with a named reason and next decision owner. Product has no `blocked` value.
- Engineering may use `blocked` only with a named reason and next decision owner.

Unresolved product decisions (and engineering `blocked` / `unresolved` where applicable) prevent stable IDs and Phase 1 implementation issues for that preset.

### Merge and replace rules (for product notes)

- Default `merge`: one survivor preset; other ingresses stay as compatibility aliases; name the survivor in `merge target`.
- `merge` to a new art-directed identity: write `new preset: <working name>` (stable ID minted later in Phase 1).
- `replace`: same operator slot, new art; eng uses `redesign-approved` for before/after. Prefer keeping the future stable ID when purpose and meaning stay continuous.

## Noise inventory

Write `phase-0/noise-inventory.md` listing current in-repo docs, exports, and discovery surfaces that mention Noise. Do not add a Noise registry folder or new operator-facing Noise copy. Runtime continues to accept existing Noise payloads.

## Pattern animation inventory

Write `phase-0/pattern-animation-inventory.md`.

- Search sample payloads and fixtures for `templateVariation.pattern.animation` (or equivalent Pattern config).
- List every distinct non-`none` Pattern animation value found, with file references.
- Do not treat Particle `animation` values (for example `"scale"`) as Pattern samples.
- If the inventory finds no Pattern non-`none` animations, record **`none found`** explicitly.
- Only if non-`none` Pattern samples exist, capture those as separate compatibility baselines (not on the comparable sheet).

## Acceptance criteria

### Agent pack (`ready-for-agent` → `ready-for-human`)

- [x] `fixtures/shared.json` exists and locks dimensions, frame, palette, text, logo, card, and asset paths
- [x] Every matrix row has a still under `phase-0/stills/` rendered with that fixture
- [x] Contact sheet includes every comparable row under `phase-0/contact-sheet/`
- [x] `approval-record.md` has a row for every matrix entry with evidence paths and required structural fields
- [x] Product decisions are `unresolved` (unless a human already filled them); agent has not signed product approval
- [x] Every dual-ingress pair has `differingPixels` (including `0`) and derived `outputsMatch` (`yes` iff `differingPixels: 0`)
- [x] Every orphan and mismatch row has a classification field present (`unresolved` allowed at handoff)
- [x] `pattern-animation-inventory.md` exists and either lists Pattern non-`none` samples or states `none found`
- [x] Compatibility baselines exist only when that inventory found Pattern non-`none` samples
- [x] `noise-inventory.md` lists current Noise documentation and exports
- [x] Audit verification command passes
- [x] No production routing or behaviour changed (development-only harness allowed)
- [x] No stable catalogue IDs minted
- [x] Status set to `ready-for-human`

### Human completion (while Status remains `ready-for-human`)

- [ ] Every row has product decision and product approver / role / date (or parked product `unresolved` with reason and owner)
- [ ] Every row has engineering result and engineering approver / role / date (or parked engineering `blocked` / `unresolved` with reason and owner)
- [ ] Prefer `keep | merge | replace | retire` for retained candidates before drafting Phase 1 issues
- [ ] Closing comment appended under `## Comments` stating Phase 0 human approvals are finished
- [ ] Status remains a canonical triage value (`ready-for-human`); do not set `completed`

## Verification commands

Do not use `git status` as proof of audit completeness.

Provide and run an audit verification command (script under the feature scratch or `scripts/`) that fails unless all of the following hold:

1. `fixtures/shared.json` exists and contains the locked fields listed above
2. Exactly the 13 matrix `rowId`s have still files under `stills/`
3. Contact sheet artifact(s) reference all 13 rows
4. `approval-record.md` contains every `rowId` and the required structural fields (still paths; product decision field; engineering measurement fields; orphan/mismatch classification fields where applicable)
5. Dual-ingress pairs each have `differingPixels` (always present, including `0`) and `outputsMatch` equal to `yes` exactly when `differingPixels` is `0`
6. Recomputed pixel diffs for the three pairs match the recorded `differingPixels` values (same still files)
7. `noise-inventory.md` and `pattern-animation-inventory.md` exist; the latter contains either listed samples or the exact phrase `none found`

Example entry point (name may match the implementation):

```bash
node scripts/verify-generated-backgrounds-phase-0.mjs
```

Expected: exit code 0 when the audit pack is complete; non-zero with a clear missing-field or mismatch message otherwise.

Optional production-safety check (not a substitute for the audit verifier): confirm the agent did not change production background routing. Prefer a focused diff of the selector/registry against the branch base, not a dirty-worktree `git status` dump.

## Completion criterion

Phase 0 is complete when both agent-pack and human-completion acceptance criteria are true. Prefer product decisions of `keep`, `merge`, `replace`, or `retire` for every retained candidate before drafting Phase 1 issues. Do not open Phase 1 implementation issues until luminance work is closed or merged and this audit has resolved the catalogue decisions needed for ID minting.

## References

- Spec: `.scratch/generated-backgrounds/spec.md`
- ADR: `docs/adr/0002-generated-background-wire-deferred.md`
- Glossary: `CONTEXT.md` (Generated background, legacy wire value, roles, readability policy)

## Comments

### 2026-08-27 — Agent audit pack handoff

Audit pack generated. Commands:

- `npm run generated:phase0:render`
- `npm run generated:phase0:verify` → PASS

Dual-ingress measurements (same render run): all three pairs `differingPixels: 0` / `outputsMatch: yes`. Pattern animation inventory: `none found`. Product decisions left `unresolved` for human approval. Status → `ready-for-human`.

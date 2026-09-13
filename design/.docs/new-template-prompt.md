# LLM prompt — start a new Fixtura design template

Point Codex (or any design LLM) at this file, then attach or reference the docs listed below.

Before styling a new template, read [Tailwind and CSS for Fixtura templates](../design-Reference-docs/tailwind-css-remotion.md) for style ownership, runtime colors, scoped CSS, and Remotion handoff constraints.

---

## Phase 0 — Load the agreed design brief

Read the template brief supplied by the user or the interview's build prompt at `design/briefs/{slug}/design-brief.md` before producing prototype visuals.

- If no brief is supplied, look for the named template under `design/briefs/`. Ask which brief to use if the selection is ambiguous.
- If the brief is missing or still draft, follow [the design interview](./design-interview-prompt.md). Resume known answers and resolve only the open decisions. Do not start prototype work until the brief is agreed.
- Read its fixed requirements, creative direction, open exploration, and reference interpretations. Inspect available reference images. Flag essential unavailable references before dependent work.
- Reuse the identity, first asset, audience, and font decisions. Check naming against existing routes and fonts. Ask only about unresolved conflicts; do not repeat the creative interview.
- Anatomy and fixtures own content. The brief owns creative intent. Flag a conflict before dependent work instead of silently changing either source.
- The first asset comes from the brief. Results is the default only when the brief delegates that choice. For other assets, use the matching anatomy and fixture and adapt Phase 3's Results-specific instructions.

An agreed brief is input to design work, not approval of unseen visuals. Record deliberate direction changes in the brief; ordinary layout adjustments do not require another interview.

---

## Phase 1 — Read before designing

Read in this order (paths from repository root):

| Order | File                                                                                        | Why                                                                                            |
| ----- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1     | `design/.docs/design-system-brief.md`                                                       | Product purpose, constraints, principles                                                       |
| 2     | `design/guide/index.html`                                                                   | In-site guide (open in browser after `npm run design`)                                         |
| 3     | `design/.docs/fonts.md`                                                                     | How fonts work in prototypes vs Remotion                                                       |
| 4     | `design/.docs/results-layout-reference.md`                                                  | **Structural baseline** for Results match modules (content/layout rules; not styling)          |
| 5     | `src/compositions/cricket/.docs/component-anatomy/results-component-anatomy.md`             | Full component anatomy (or matching file for chosen asset)                                     |
| 6     | `testData/samples/Cricket/Cricket_Results.json`                                             | Real field shapes, score strings, result statements, performances                              |
| 7     | `design/variants/broadcast-pro/cricket/results.html`                                        | Golden reference for **design-site shell**, canvas, hydration wiring (not match-module layout) |
| 8     | `design/_shared/hydration/broadcast-pro/cricket/results.bind.json`                          | Example bind-map pattern — extend for new variants                                             |
| 9     | `design/.docs/reference-library.md`                                                         | **Pass 2 only** — hub for craft references (skip until hydration verified)                     |
| 10    | `design/design-Reference-docs/Google Fonts for Professional Graphic Design.md`              | **Pass 2 only** — font selection by role + LLM protocol (use with `fonts.json`)                |
| 11    | `design/design-Reference-docs/CSS Professional Design Techniques-2.md`                      | **Pass 2 only** — tokens, depth, shadows, surfaces on overlays                                 |
| 12    | `design/design-Reference-docs/SVG Pattern and Texture Systems for Professional Graphics.md` | **Pass 2 only** — structural motifs and fine grain; overlays only                              |
| 13    | `design/design-Reference-docs/tailwind-css-remotion.md`                                     | **Pass 2 + Phase 4** — where styles belong; literal Tailwind; design site vs Remotion styling  |

Optional: `src/compositions/cricket/.docs/stitch-briefs/` for asset-family prompts (one family at a time).

**Before styling:** map every anatomy block to a fixture field. Organisation colours come from the fixture / `videoMeta` — do not invent a master palette. **Do not read rows 9–13 until pass 1 hydrates correctly.**

---

## Phase 2 — Repo setup (first delivery — mandatory)

**Save directly into the design site on first visual delivery.** We iterate in place; v0 does not live in `.scratch/` or standalone paths.

**Never** save template prototypes under `.scratch/`, repo root, or ad-hoc URLs. The only valid location is `design/variants/{slug}/…` with a matching `routes.json` entry so the template appears in the sidebar.

For a new cricket family, follow the factory setup in [getting-started.md](./getting-started.md#new-template-factory). Read [naming-contract.md](./naming-contract.md) for the ten asset slugs, fixture mappings, CSS layers, and bootstrap profiles. Use the agreed label, slug, and registry ID from the brief. If the scaffold command is unavailable in this checkout, report that prerequisite instead of inventing a command or silently copying a legacy page.

Scaffold the family once, then focus visual work on the brief's selected asset. Existing variants must be resumed in place rather than re-scaffolded. Keep the brief outside the variant directory.

The scaffold owns registration, initial bindings, and neutral asset styles. Preserve its generic bootstrap when designing new assets. Broadcast Pro and Scoreline are legacy references, not the setup source for a new family. Verify wiring with the documented design verifier after changes.

### Not a website — one video/poster frame

You are designing **one 1080 × 1350 social/video frame**, not a web page or design review site.

**Inside `.design-social-canvas`** — only content that would appear in the exported Remotion graphic (titles, scores, rows, sponsor strip, logos).

**Do not add** (common LLM mistakes):

- Captions or footers **outside** the canvas (“Concept 01”, “1080 × 1350”, “Flat neutral preview only”, fixture IDs, colour provenance essays)
- Preview toggles or links (“Preview without sponsors”, “Preview without logos”, “Long-name test”, “Original fixture”)
- Review notes, `<article>` wrappers, or explanatory copy below the frame
- Scrollable pages, multi-section landing layouts, or app/dashboard chrome

The design site provides dev chrome (sidebar, tabs, handoff line) — **do not duplicate or extend that with your own web UI.** A sponsor strip **inside** the canvas is part of the graphic, not “website footer” chrome.

### Preview locally

From repo root: `npm run design` →  
`http://localhost:3456/design/variants/{slug}/cricket/{asset}.html`

---

## Phase 3 — Main design prompt (copy from here)

Use the block below as build instructions once Phase 0 is complete. The agreed template brief supplies creative direction; this block does not replace it.

---

```markdown
Create a new template design for Fixtura’s automated sports graphics.

Read the agreed design brief: {DESIGN_BRIEF_PATH}. Follow its fixed requirements and reference interpretations. Use judgment within its creative direction and delegated exploration.

## Context

Fixtura generates weekly club-branded cricket media from structured competition data for Australian grassroots sport. You are designing **overlay UI only** (titles, typography, layout, scores, metadata, sponsor strip) on a fixed frame. **Do not design backgrounds** — no stadium photos, gradients, or full-bleed imagery; a neutral placeholder behind overlays is acceptable for preview only.

Read first:

- `design/.docs/design-system-brief.md`
- Component anatomy for the starting asset type (see Phase 1 table in `design/.docs/new-template-prompt.md`)

## This session

**Template:** {TEMPLATE_LABEL} (slug: `{TEMPLATE_SLUG}`)

**Start with one asset:** {ASSET_LABEL} (`{ASSET_SLUG}`) — establish the design direction. We will expand to the wider asset family later.

**Mode:** {club | association}

**Fonts:** {FONT_HEADING} (display/scores) + {FONT_BODY} (metadata/body)

**Reference reading order:** {preserve from reference or anatomy — do not copy styling unless instructed}

## Pass 1 — Cricket information design (do this first)

Follow **`design/.docs/results-layout-reference.md`** for Results match-module structure. Layout is **not a web table**.

**Reading order per match:** team comparison (horizontal, equal weight) → outcome → batting panel + bowling panel → format/round + venue at bottom.

- **Hydrate** from `Cricket_Results.json` via bind map — verify in browser before calling pass 1 done.
- **Team comparison:** opposing teams with full score strings (`7/146`), large logos, names beneath each logo/score group. **Do not assume left = club** — use `isClubTeam` / data; preserve source ordering.
- **Outcome:** shared statement after comparison; must not balloon when performances are absent.
- **Performances:** two panels labelled **Batting** and **Bowling** (data roles, not left/right team columns). Up to three entries each; names left, figures right; preserve `25* (17)`, `2/8 (2.3)` notation. Club mode filters entries, not team balance.
- **Context:** format/round bottom-left, venue bottom-right — below performances, not a top metadata strip.
- **Repeat:** both matches use the same internal anatomy; separate with space, not heavy cards or dominant index badges.
- **Heading:** concise “Results” — no redundant subtitles or match numbers unless data requires.
- **Colours:** org primary/secondary from fixture only — styling comes in pass 2.
- **Sponsor:** believable strip placeholder — reference doc does not define sponsor sizing.

## Pass 2 — Visual identity (after pass 1 works)

Before styling, read (Pass 2 craft references):

- `design/.docs/reference-library.md` — hub and scope guardrails
- `design/design-Reference-docs/Google Fonts for Professional Graphic Design.md` — if choosing or changing fonts
- `design/design-Reference-docs/CSS Professional Design Techniques-2.md` — tokens, depth, restraint on overlay surfaces
- `design/design-Reference-docs/SVG Pattern and Texture Systems for Professional Graphics.md` — structural motifs only; no full-bleed backgrounds
- `design/design-Reference-docs/tailwind-css-remotion.md` — plan theme vs CSS vs runtime hooks; use complete literal classes (no dynamic Tailwind assembly)

Respect `design/.docs/design-system-brief.md` scope: overlays inside `.design-social-canvas` only. Variant-specific motif rules (e.g. Scoreline) override generic texture advice.

- **1080 × 1350** portrait canvas (72 px safe margin).
- Professional grassroots sports-media feel — broadcast energy × SaaS restraint.
- Distinctive identity through typography and restrained graphic devices (not backgrounds).
- Org **two colours** + black/white/neutrals — every accent maps to a palette role.
- **No player photography.** Reusable when names, scores, colours and logos change.

## Explore

Propose a **fresh visual direction** only after pass 1 hydrates correctly. Preserve **information architecture and reading order** from the anatomy doc — do not clone Broadcast Pro styling or collapse matches into spreadsheet rows.

Deliver **one registered overlay** — not an app UI, device mockup, dashboard, or website with review chrome.

## Output

1. **Visual** — registered HTML at `design/variants/{slug}/cricket/{asset}.html` plus Phase 2 files (`routes.json`, bind map, fonts if new). Must appear in the design-site sidebar when `npm run design` is running.
2. **Hydration check** — confirm in chat which anatomy blocks map to which fixture fields; note any data inconsistencies found.
3. **Brief rationale** — 3–6 sentences in chat (not rendered on the page).
4. **Extension note** — how this direction could extend to other Fixtura asset types (bullet list in chat).
5. **Stress cases** — describe in chat: long team names, missing logo, absent performances, absent sponsor (do not build preview-toggle UI).

Iterate on the same registered file as feedback arrives. Remotion theme/registry handoff is a separate later pass.
```

Replace `{PLACEholders}` from the agreed brief, including `{DESIGN_BRIEF_PATH}`. Resolve only missing implementation details.

---

## Phase 4 — Remotion handoff (separate session)

After overlay direction is stable in the design site:

1. Read **`design/.docs/remotion-handoff.md`** (full runbook) and guide **Handoff to Remotion** (`design/guide/`).
2. Read **`design/design-Reference-docs/theme-modes.md`** — `light` / `lightAlt` / `dark` / `darkAlt`, transparency tokens, copy vs title contrast; variant exceptions (Scoreline, CNSW Private).
3. Re-read **`design/design-Reference-docs/tailwind-css-remotion.md`** — theme roles vs scoped CSS vs hooks; Tailwind v4 in Remotion; verify Studio + package CSS entry points.
4. Add or update row in `design/.docs/asset-index.md`.
5. Implement: registry variant → composition displays → theme surfaces (`theme/mode.ts`) → fonts → Studio verify across all modes.
6. Replace `TBD` theme paths in `routes.json` and `asset-index.md` when files exist.

Do not register a Remotion template variant until overlay prototypes are approved in the design site.

---

## Quick copy — start or resume discovery

Copy the starter from [the design interview](./design-interview-prompt.md#copy-and-paste-to-start). No paths or placeholders need filling in.

## Quick copy — build from the agreed brief

After the interview, use its generated build prompt, which includes the exact saved brief path. To continue in the same conversation:

```text
Build from the agreed Fixtura design brief we just completed. Follow design/.docs/new-template-prompt.md. Read the saved brief and its references first. Reuse settled answers and use its selected first asset. If the brief cannot be identified, ask which one to use. Verify fixture hydration before visual styling. Keep Remotion implementation separate.
```

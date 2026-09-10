# LLM prompt — start a new Fixtura design template

Point Codex (or any design LLM) at this file, then attach or reference the docs listed below.

Before styling a new template, read [Tailwind and CSS for Fixtura templates](../design-Reference-docs/tailwind-css-remotion.md) for style ownership, runtime colors, scoped CSS, and Remotion handoff constraints.

---

## Phase 0 — Ask the human first (do not design until answered)

Ask these questions in one message. Wait for answers before producing visuals or HTML.

### Template identity

1. **Template name (human):** What should we call this template? (e.g. “Stadium Signal”, “North Shore Classic”)
2. **URL slug:** Confirm kebab-case slug for paths (e.g. `stadium-signal` → `design/variants/stadium-signal/…`)
3. **Registry ID (Remotion):** Confirm PascalCase ID for later handoff (e.g. `StadiumSignal`) — can be provisional until Remotion variant exists
4. **Relationship:** New family from scratch, or fork/evolution of an existing variant (e.g. Broadcast Pro)?

### First asset

5. **Starting asset type:** Default is **Weekend Results** (`results`). Confirm or pick another:
   - `results` · `result-single` · `upcoming` · `ladder` · `top5` · `performances` · `team-roster` · `team-of-the-week`
6. **Sport:** Default `cricket`. Confirm.
7. **Reference:** Any existing prototype or competitor reference to **preserve reading order** but not copy styling? (path or link)

### Typography (pass 2 — optional on first pass)

8. **Font pairing:** Defer unless the human cares now. Scoreline pass 1: Barlow Condensed (display) + Source Sans 3 (body). Other variants: see `design/_shared/fonts.json`. Custom fonts only after cricket layout hydrates correctly.
9. **Character:** Skip on pass 1, or one line only if the human wants direction early.

### Mode & data

10. **Club vs association:** Is the first concept **club**-biased or **association**-balanced home/away?
11. **Sponsor on first pass:** Show sponsor strip placeholder, or design sponsor-absent collapse only?
12. **Fixture:** Use repo test data (`testData/samples/Cricket/Cricket_Results.json` for weekend results) or fictional sample clearly labelled?

### Scope check (confirm human agrees)

13. **Overlays only:** You will design titles, type, rows, scores, metadata, sponsor strip — **no backgrounds** (no photos, gradients, Generated/Luminance). Neutral placeholder backdrop OK for contrast only. Agreed?
14. **No player photography.** Agreed?
15. **One polished concept** first; wider asset family later. Agreed?

If any answer is missing, state your recommended default and ask once more. Do not proceed on silent assumptions for Q1–Q4 and Q13–Q15.

---

## Phase 1 — Read before designing

Read in this order (paths from repository root):

| Order | File | Why |
| --- | --- | --- |
| 1 | `design/.docs/design-system-brief.md` | Product purpose, constraints, principles |
| 2 | `design/guide/index.html` | In-site guide (open in browser after `npm run design`) |
| 3 | `design/.docs/fonts.md` | How fonts work in prototypes vs Remotion |
| 4 | `design/.docs/results-layout-reference.md` | **Structural baseline** for Results match modules (content/layout rules; not styling) |
| 5 | `src/compositions/cricket/.docs/component-anatomy/results-component-anatomy.md` | Full component anatomy (or matching file for chosen asset) |
| 6 | `testData/samples/Cricket/Cricket_Results.json` | Real field shapes, score strings, result statements, performances |
| 7 | `design/variants/broadcast-pro/cricket/results.html` | Golden reference for **design-site shell**, canvas, hydration wiring (not match-module layout) |
| 8 | `design/_shared/hydration/broadcast-pro/cricket/results.bind.json` | Example bind-map pattern — extend for new variants |
| 9 | `design/.docs/reference-library.md` | **Pass 2 only** — hub for craft references (skip until hydration verified) |
| 10 | `design/design-Reference-docs/Google Fonts for Professional Graphic Design.md` | **Pass 2 only** — font selection by role + LLM protocol (use with `fonts.json`) |
| 11 | `design/design-Reference-docs/CSS Professional Design Techniques-2.md` | **Pass 2 only** — tokens, depth, shadows, surfaces on overlays |
| 12 | `design/design-Reference-docs/SVG Pattern and Texture Systems for Professional Graphics.md` | **Pass 2 only** — structural motifs and fine grain; overlays only |
| 13 | `design/design-Reference-docs/tailwind-css-remotion.md` | **Pass 2 + Phase 4** — where styles belong; literal Tailwind; design site vs Remotion styling |

Optional: `src/compositions/cricket/.docs/stitch-briefs/` for asset-family prompts (one family at a time).

**Before styling:** map every anatomy block to a fixture field. Organisation colours come from the fixture / `videoMeta` — do not invent a master palette. **Do not read rows 9–13 until pass 1 hydrates correctly.**

---

## Phase 2 — Repo setup (first delivery — mandatory)

**Save directly into the design site on first visual delivery.** We iterate in place; v0 does not live in `.scratch/` or standalone paths.

**Never** save template prototypes under `.scratch/`, repo root, or ad-hoc URLs. The only valid location is `design/variants/{slug}/…` with a matching `routes.json` entry so the template appears in the sidebar.

Copy the page structure from `design/variants/broadcast-pro/cricket/results.html` (design-site shell + scaled canvas + hydration scripts). Register the variant before calling the first pass done.

### Naming conventions

| Layer | Convention | Example |
| --- | --- | --- |
| Folder slug | kebab-case | `stadium-signal` |
| Display label | Human readable | Stadium Signal |
| Remotion registry ID | PascalCase | `StadiumSignal` |
| Sport segment | lowercase | `cricket` |
| Asset file | kebab-case + `.html` | `results.html` |
| Tailwind font key | kebab-case | `font-outfit` |
| Font catalog key | kebab-case | `"outfit"` in `fonts.json` |

### Files to create or update

```text
design/
├── _shared/
│   ├── fonts.json              ← add families + variantFonts.{slug}
│   ├── routes.json             ← add variants.{slug}.sports.cricket.assets.{asset}
│   └── hydration/{slug}/cricket/{asset}.bind.json
├── variants/{slug}/cricket/
│   └── {asset}.html            ← overlay prototype (1080×1350)
└── .docs/asset-index.md        ← handoff row
```

### Fixture map (cricket)

| Asset slug | Test fixture |
| --- | --- |
| `results` | `testData/samples/Cricket/Cricket_Results.json` |
| `result-single` | `testData/samples/Cricket/Cricket_WeekendResultsSingle.json` |
| `upcoming` | `testData/samples/Cricket/Cricket_upcoming.json` |
| `ladder` | `testData/samples/Cricket/Cricket_Ladder.json` |
| `top5` | `testData/samples/Cricket/Cricket_Top5Batters.json` |
| `performances` | `testData/samples/Cricket/Cricket_BattingPerformances.json` |
| `team-roster` | `testData/samples/Cricket/Cricket_Roster.json` |
| `team-of-the-week` | `testData/samples/Cricket/Cricket_TeamOfTheWeek.json` |

### HTML page requirements

- Handoff comment block at top (variant, sport, asset, registry ID, Remotion paths — TBD until variant exists)
- Design-site shell: topbar, sidebar nav, asset tabs, `design-canvas-wrap` → `design-social-canvas` (see Broadcast Pro reference)
- Load fonts via `applyVariantFonts("{slug}")` from `design/_shared/fonts.js`
- Use `data-hydrate="…"` attributes + bind map for key fields
- Wire `renderVariantNav`, `renderTabBar`, `hydratePage` with correct `context`
- **Placeholder background only** inside the canvas — flat neutral; not a designed background
- HTML comments naming anatomy blocks inside the canvas (Metadata Strip, Score Block, etc.)

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

Use the block below as the creative brief once Phase 0 is complete.

---

```markdown
Create a new template design for Fixtura’s automated sports graphics.

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

Replace `{PLACEholders}` with answers from Phase 0.

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

## Quick copy — minimal Codex opener

```text
Read design/.docs/new-template-prompt.md, design/.docs/design-system-brief.md, and design/.docs/results-layout-reference.md.
Run Phase 0: ask me all pre-flight questions before designing.
Then execute Phase 3 for a new template starting with Weekend Results (results).

Pass 1 first: follow design/.docs/results-layout-reference.md — horizontal team comparison, full scores, outcome, batting/bowling panels, context at bottom. Hydrate Cricket_Results.json. Do not copy reference background. Org colours from fixture only.

Save into design/variants/{slug}/cricket/results.html and register routes.json + bind map on first delivery — never .scratch/.
One 1080×1350 video/poster frame inside .design-social-canvas — not a website. No review footers or preview toggles.
Overlays only — no backgrounds. Visual styling comes after pass 1 hydrates correctly.

Pass 2 craft refs (after pass 1 hydrates): design/.docs/reference-library.md and design/design-Reference-docs/ — Google Fonts, CSS Techniques, SVG/Pattern/Texture, tailwind-css-remotion. Overlays only; no backgrounds.
```

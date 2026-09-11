# Fixtura Assets — design system brief (condensed)

Source briefing for design prototypes and design LLMs. Hard constraints marked **must** are non-negotiable.

Full operating brief archived from product; this file keeps what applies to the `design/` prototype site.

## Role

Design **reusable overlay systems**, not one-off posters. Templates must work when club colours, names, counts, sponsors and match states change. Optimise for messy grassroots data, not perfect mockups.

## Product purpose

Fixtura turns structured competition data (fixtures, results, ladders, performances) into weekly **club-branded media** for Australian grassroots sport. Cricket is primary; principles extend to other sports later.

**Promise:** consistent, credible, sponsor-ready content without volunteers hand-building graphics each week.

**Feeling:** _“Our club looks as professional as the work people put into it.”_

## Scope of this site (`design/`)

| Design here                                                                       | Not here                                                             |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Titles, typography, overlays, cards, rows, scores, metadata, sponsor strip layout | Backgrounds (photo, gradient, Generated, Luminance, texture, motion) |
| Foreground structure and hierarchy                                                | Player photography or cut-outs                                       |
| Placeholder backdrop for contrast only                                            | Dashboard / app UI chrome                                            |
| Registered pages under `design/variants/`                                         | Draft HTML in `.scratch/` or ad-hoc paths                            |

Backgrounds are configured in Remotion: `src/components/backgrounds/`.

## Not a website — one frame

Each asset is **one 1080 × 1350 video/social poster frame**, not a web page. Graphic content lives inside `.design-social-canvas` only.

**Do not add** outside the canvas: review footers, “Concept 01” labels, fixture-ID captions, preview toggles (“Preview without sponsors”), or explanatory copy. Design rationale belongs in chat, not on the page. The design-site sidebar/tabs are dev chrome; sponsor strip **inside** the canvas is part of the graphic.

**First delivery** must register the template: `design/variants/{slug}/…`, `routes.json`, bind map. Iterate on that file — do not park prototypes in `.scratch/`.

## Hard constraints

- **Canvas:** 1080 × 1350 px portrait (4:5). **Must** be a single finished graphic, not an app screen.
- **Safe margin:** 72 px minimum; critical content within ~88 px of edges; avoid bottom 64 px for platform crop.
- **Grid:** 12 columns, 72 px margin, 24 px gutter, 8 px base unit (8, 16, 24, 32, 40, 48, 64, 80, 96).
- **Mobile-first:** Primary fact readable at feed size without zoom.
- **Data accuracy:** Never invent, alter or omit competition data for composition.
- **Colours:** Organisation **primary + secondary** only, plus black, white and controlled neutrals. No arbitrary decorative colours.
- **No player photos.**
- **Automatable:** Every element maps to a component, field or conditional rule.
- **Club identity first;** Fixtura attribution subordinate when present.

## Design thesis

**Sports broadcast energy × SaaS restraint** — match-day authority, not esports spectacle or generic Canva templates.

Energy from: scale contrast, score-first hierarchy, numerals, rhythm, compact labels, broadcast status devices, subtle sport texture.

Avoid: fake stadium lights, flames/glow, AI athletes, esports styling, decoration that beats names/scores.

## Core principles

1. **Understand in 3 seconds** — asset type, organisation, primary sporting fact.
2. **Score and outcome before ornament.**
3. **One dominant story** per asset (e.g. “Weekend Results” even with many rows).
4. **Structure reusable; styling adapts** to org colours and logos.
5. **Family consistency** across asset types.
6. **Calm confidence** — assured, not shouting.

## Vertical zones (guidance)

| Zone                  | Share         | Content                           |
| --------------------- | ------------- | --------------------------------- |
| Identity / context    | top 14–18%    | Org logo, asset title, round/date |
| Primary content       | middle 62–70% | Matches, ladder, roster, etc.     |
| Sponsor / attribution | bottom 12–16% | Sponsor strip, Fixtura mark       |

## Typography

**Platform default pairing:** Outfit (display/scores/headings) + Heebo (metadata/body).

**Scoreline pairing:** Barlow Condensed (display/scores/headings) + Source Sans 3 (metadata/body).

**Variant fonts** (e.g. Broadcast Pro): see `design/_shared/fonts.json` — may differ from platform default.

| Role                      | Weights                      | Notes                  |
| ------------------------- | ---------------------------- | ---------------------- |
| Scores / hero numerals    | 800–900                      | Largest element        |
| Titles, team/player names | 700                          |                        |
| Labels, metadata          | 600 / uppercase short labels |                        |
| Supporting copy           | 400–500                      | Min **20 px** rendered |

Long names: second line → reduce size → official short name if supplied → truncate last (never truncate scores or result statements).

## Colour

Inputs: org primary, org secondary, logos.

Assign roles: dominant field, accent, content surface, primary/secondary text. Target WCAG AA where practical. If palette clashes, use black/white structure — do not invent a third accent.

Status: communicate with **wording and weight first**, not red/amber/green alone.

## Design order — data before decoration

**Pass 1 (mandatory before styling):** cricket information design — correct fields, hydration, match modules, missing-data behaviour.

**Pass 2:** visual identity — typography, colour roles, graphic devices.

**Authoritative sources (in order):**

1. Component anatomy for the asset (`src/compositions/cricket/.docs/component-anatomy/`)
2. Fixture JSON + bind map (`testData/samples/…`, `design/_shared/hydration/…`)
3. Organisation colours from the fixture / `videoMeta` — **not** an invented Fixtura master palette
4. This brief for constraints — not pixel-perfect style prescription on pass 1

**Pass 2 craft references** (after pass 1 hydrates):

- [reference-library.md](./reference-library.md) — hub and scope guardrails
- [Google Fonts for Professional Graphic Design](../design-Reference-docs/Google%20Fonts%20for%20Professional%20Graphic%20Design.md)
- [CSS Professional Design Techniques](../design-Reference-docs/CSS%20Professional%20Design%20Techniques-2.md)
- [SVG Pattern and Texture Systems](../design-Reference-docs/SVG%20Pattern%20and%20Texture%20Systems%20for%20Professional%20Graphics.md)

Apply only inside overlay surfaces. Do not design Remotion backgrounds. Variant-specific motif rules (e.g. [scoreline-crease-motif-grammar.md](./scoreline-crease-motif-grammar.md)) override generic texture advice.

**Remotion handoff (Phase 4):** [remotion-handoff.md](./remotion-handoff.md), [Theme modes and contrast](../design-Reference-docs/theme-modes.md), and [Tailwind and CSS for Fixtura templates](../design-Reference-docs/tailwind-css-remotion.md) — styling ownership, literal classes, Studio vs package CSS entry points.

**Pass 2 styling plan:** read [tailwind-css-remotion.md](../design-Reference-docs/tailwind-css-remotion.md) before Pass 2 so design choices map cleanly to theme/CSS/hooks at handoff.

Do not prescribe fonts, spacing tokens or decorative colour systems until pass 1 reads correctly with real hydrated data.

## Cricket-first layout (not a web table)

The layout must be **designed around cricket information**, not a compact web table with large isolated numbers.

**Structural baseline for Results:** [results-layout-reference.md](./results-layout-reference.md) — extract match-module rules from the reference image; do not copy its background or styling. Develop visual identity **around** that anatomy.

**Hierarchy unit:** each match is a **complete repeated composition** — horizontal team comparison (full scores + logos), outcome, batting/bowling panels, then context — not a heading competing with oversized bare numerals.

| Priority                | Failure mode                                                                       | Required behaviour                                                                                                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Complete scores**     | Runs alone (`215`, `255`) with wickets/all-out dropped                             | Render the **full supplied score string** exactly. Show **overs** when supplied. Never strip wickets or innings context from formatted scores.                                                                                    |
| **Outcome consistency** | Scores and result statement contradict (e.g. 215 vs 255 but “won by 5 wickets”)    | Hydrate from fixture JSON via bind map. Map `result` / `resultStatement` fields correctly. If data looks inconsistent, **flag in chat** — do not silently “fix” or invent margins.                                                |
| **Readable metadata**   | Truncated top strips, tiny labels, duplicated venue text                           | Put **format/round** and **venue** at the **bottom** of each match module (quiet context layer). Do not squeeze metadata into a competing top strip.                                                                              |
| **Equal match modules** | First match compact; second match with huge outcome block when performances absent | Define **intentional missing-performance layout**. Absent optional sections must **not** inflate other bands. Match modules keep **equal visual weight** (anatomy: min 2 matches).                                                |
| **Team identification** | Tiny crests, team names subordinate to decorative heading                          | Logos large enough to recognise. Team name and score belong in one **team band** — identity and score visually connected.                                                                                                         |
| **Meaningful labels**   | “CLUB XI” repeated; prominent “01” / “02” index boxes                              | Use grade/team context from data. Match index is **secondary** unless brief requires it — do not give index badges dominant colour blocks.                                                                                        |
| **Performances**        | One compressed “club performances” footer; columns mistaken for left/right teams   | Two panels: **Batting** and **Bowling** (data roles, not team sides). Up to three entries each; names left, figures right. Notation intact (`25* (17)`, `2/8 (2.3)`). Club mode filters **entries**, not team comparison balance. |
| **Colour logic**        | Random accent colours (blue index boxes, pink rows) unrelated to org palette       | Every accent must map to **org primary/secondary** roles from the fixture. Black/white/neutrals for structure only.                                                                                                               |
| **Sponsor strip**       | “SPONSOR PLACEMENT” wireframe annotations                                          | Placeholder is OK — but **scale and position** must look like a believable sponsor strip in the finished graphic, not dev copy.                                                                                                   |

**Avoid:** HTML `<table>` layouts that treat matches as spreadsheet rows. Use **match modules** per component anatomy.

## Cricket data (must)

- Preserve names, scores, wickets, overs, innings, result wording exactly as supplied.
- Keep not-out indicators (`*`) when supplied.
- Distinguish final, live, scheduled, postponed, abandoned, draw, tie, bye.
- Do not infer winners, recalculate margins, or reformat scores unless data supplies them.
- One consistent notation standard per template family.
- **Hydrate before judging:** open the prototype with `npm run design` and confirm bind map populates all anatomy blocks.

## Asset types (cricket)

| Asset type                     | Primary story              |
| ------------------------------ | -------------------------- |
| Weekend Results                | Scan of completed matches  |
| Single Game Result             | One match, score-first     |
| Upcoming Fixtures              | Who, when, where           |
| Ladder                         | Standings table            |
| Top 5 Batting / Bowling        | Ranked players + metric    |
| Batting / Bowling Performances | Notable individual figures |
| Team of the Week               | Selected players           |
| Team Roster                    | Squad for upcoming match   |

Map to prototype routes in `design/_shared/routes.json` and anatomy in `src/compositions/cricket/.docs/component-anatomy/`.

## Density modes

Each family should support **feature** (one item), **standard** (typical week), **dense** (max count). Tighten spacing and drop optional metadata before going below minimum type sizes.

## Sponsor strip

Plan a stable footer zone. Works with zero, one or many sponsors. Never overlaps scores or club marks. Absent sponsor = collapse cleanly, no empty ad slot.

## Voice in graphics

Prefer: _Weekend Results_, _Upcoming Fixtures_, _Round 5_, _Final_, _Match abandoned_.

Avoid: hype (_EPIC SHOWDOWN_), exclamation spam, trash talk, unverified superlatives.

## Priority order (when choices conflict)

1. Truth of sporting data
2. Clarity of primary story
3. Organisation identity
4. Mobile legibility
5. Systematic automation
6. Sponsor value
7. Visual energy / decoration

## Prototype workflow

1. Restate asset type, audience, primary fact, density, club vs association mode.
2. Define **reading order** before styling.
3. Map required / optional / conditional fields (use `testData` fixtures).
4. Pick composition archetype (list, hero comparison, table, roster, etc.).
5. Apply grid, type roles, colour roles, components — **overlays only**.
6. Stress-test: long names, dense data, missing logo, no sponsor, hard palette.
7. Hand off to Remotion via `asset-index.md` and theme/display components.

## What prototypes must not become

Generic template pack, one-off art posters, dashboard screenshots, **websites with review chrome**, photo-dependent layouts, Fixtura-branded ads disguised as club content, or designs that only work with short perfect data.

## Default first asset

New template families start with **Weekend Results** (`results`) unless the human chooses otherwise.

## Review (quick)

Before approval, check in this order:

1. **Cricket information** — full scores, correct result hydration, readable metadata, consistent match modules, intentional missing-data behaviour
2. **3-second comprehension** — asset type, org, primary sporting fact
3. **Data authority** — no invented or altered fields
4. **Mobile legibility** — team + score + outcome readable at feed size
5. **Club ownership** — org palette applied, logos recognisable
6. **Automation readiness** — every element maps to a field or conditional rule
7. **Sponsor integrity** — believable strip or clean collapse
8. **Restraint** — decoration does not beat names/scores

# Weekend Results — structural layout reference

Content and layout baseline for **Results** (`results`) prototypes. Extract **structure and information rules** from this reference — do **not** copy its background, photography, gradients or styling.

**Reference image:** [../.research/results-layout-reference.jpg](../.research/results-layout-reference.jpg)

**Canonical anatomy:** `src/compositions/cricket/.docs/component-anatomy/results-component-anatomy.md` — this doc narrows the Results match module for pass 1.

---

## Core idea

Each match is a **complete, repeated composition**: two teams, full scores, an outcome, player performances, then match context. Matches repeat the same internal structure; separation is mainly **vertical space**, not heavy cards, shadows or oversized status bands.

Develop **visual styling around this anatomy**. New templates may look different; the information layers must survive.

---

## Asset-level reading order

1. **Results** heading — concise (e.g. “Results”). No repeated category labels, match numbers or organisation subtitles unless data requires them.
2. **First match** — opposing team identities and complete scores (horizontal comparison).
3. **Match outcome** — shared statement spanning both teams.
4. **Batting and bowling** performance lists (two panels).
5. **Round/format and venue** — supporting context below performances.
6. **Second match** — repeat the same structure.

---

## Match module anatomy (top → bottom)

```text
Match Module
├── Team comparison row          (horizontal; equal visual weight both sides)
│   ├── Home: logo + full score + team name beneath group
│   └── Away: logo + full score + team name beneath group
├── Result statement             (spans match; after comparison)
├── Performance area
│   ├── Batting panel            (label: Batting — NOT “left team stats”)
│   └── Bowling panel            (label: Bowling — NOT “right team stats”)
└── Match context row            (format/round bottom-left; venue bottom-right)
```

### Team comparison

| Rule                  | Detail                                                                                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Horizontal opposition | Two teams sit opposite each other with **comparable visual weight**.                                                                                                                |
| Full scores           | Render complete supplied strings: `7/146`, `2/89`, `10/88` — never runs alone or invented notation.                                                                                 |
| Logos                 | Large enough to identify; consistent bounding areas; preserved proportions.                                                                                                         |
| Names under groups    | Team name sits **directly beneath** its logo/score group. Viewer must never guess which score belongs to whom.                                                                      |
| Club side             | **Do not assume left = club.** Identify club via `isClubTeam` / data. Featured club may appear left or right per match. Preserve source home/away ordering until defined otherwise. |

**Club-biased ≠ visually unbalanced teams.** Both sides get equal treatment in the score comparison. Club focus applies to **which performances are shown** (club mode), not shrinking the opposing team.

### Result statement

- Treat as a **shared match outcome**, positioned immediately after the team comparison.
- Must not consume disproportionate space when performances are absent elsewhere in the module.

### Performance panels

| Rule            | Detail                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| Two panels      | Separate **batting** and **bowling** sections — not one compressed “club performances” footer.                    |
| Data roles      | Columns are **batting vs bowling**, not left-team vs right-team statistics. Label panels if layout could mislead. |
| Baseline count  | Up to **three batting** and **three bowling** entries when data supplies them (per anatomy / mode rules).         |
| Column scan     | Names align **left**; figures align **right** — stable vertical columns.                                          |
| Notation intact | Preserve supplied strings: `25* (17)`, `2/8 (2.3)`, wickets/runs/overs — do not reformat.                         |
| Club mode       | When club-biased, filter **entries** by `isClubTeam` / mode matrix — do not collapse layout to one column.        |

### Match context (metadata)

- **Bottom of the match module**, below performances — not a competing top strip.
- **Bottom-left:** format and round (e.g. `T20 - Round 1`).
- **Bottom-right:** venue.
- Quietest layer; must not be clipped or duplicated (e.g. venue twice).

---

## What this reference does **not** define

- Backgrounds or overlay-on-photo treatment (still **overlays only** in `design/`).
- Sponsor strip sizing or missing-sponsor collapse (see design-system brief).
- Missing-performance or missing-logo behaviour (define explicitly; do not inflate outcome band).
- Layouts with **more than two** matches on one frame (density modes — tighten spacing; same internal anatomy).

---

## Pass 1 checklist

- [ ] Two matches, same internal structure and hierarchy
- [ ] Horizontal team comparison with full score strings + recognisable logos
- [ ] Outcome after comparison; performances after outcome; context last
- [ ] Batting and bowling panels labelled by role
- [ ] Performance notation preserved
- [ ] Hydrated from `Cricket_Results.json` via bind map
- [ ] Styling is secondary — structure reads correctly first

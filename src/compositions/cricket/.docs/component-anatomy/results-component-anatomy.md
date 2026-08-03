# Weekend Results — Component Anatomy

Design-first building-block reference for the **Cricket Results** composition. Describes abstract components required to construct a Results asset — not a specific template or Remotion implementation.

**Primary audience:** Stitch (component family + states).  
**Secondary audience:** Remotion implementation.

**Stitch brief:** `../stitch-briefs/results-stitch-component-brief.md` (use this to brief Stitch — not this file directly)  
**Related:** Asset communication goals live in `../../results/.docs/llm-brief/`. Shared terminology in `component-anatomy-overview.md`.

---

## Asset summary

| Attribute | Value |
| --------- | ----- |
| **Composition type** | Weekend Results (multi-match results) |
| **Artboard** | 1080 × 1350 portrait (proportional guide) |
| **Match modules per frame** | Minimum **2**; stacked vertically with equal visual weight |
| **Modes** | Association (both teams' stats) and Club (club stats only) — see [Mode matrix](#mode-matrix) |
| **Sample payload** | `testData/samples/Cricket/Cricket_Results.json` |

**Goal (design):** Match outcome and scores read first; player contributions second; fixture context quietest unless brief prioritises it.

---

## Component tree

```text
Full Asset Frame
├── Asset Header
├── Results Content Area
│   └── Match Module[]                    (min 2, equal weight, small vertical gap)
│       ├── Match Metadata
│       ├── Team and Score Area
│       │   ├── Team Identity             (home)
│       │   ├── Score Display             (home)
│       │   ├── Versus / Divider          (optional — often omitted for Results)
│       │   ├── Team Identity             (away)
│       │   └── Score Display             (away)
│       ├── Result Statement
│       ├── Match Status                  (optional)
│       └── Performance Summary
│           ├── Team Group Label          (optional — when both teams' stats shown)
│           ├── Batting Leader Row[]
│           └── Bowling Leader Row[]
└── Asset Footer
    ├── Organisation Identity
    └── Sponsor Identity
```

**Stitch deliverable:** Design each named component and its states — not a fully composed multi-match frame. Remotion assembles modules, calculates heights, and applies mode rules.

---

## Mode matrix

One anatomy; visibility changes by account mode.

| Component | Association mode | Club mode |
| --------- | ---------------- | --------- |
| **Asset Header** | Show | Show |
| **Match Metadata** | Show | Show |
| **Team and Score Area** | Both teams; **equal visual weight** | Both teams visible; **club team may be emphasised** (weight, scale, or order — subtle) |
| **Versus / Divider** | Optional; **often omitted** for Results | Same |
| **Result Statement** | Show | Show |
| **Match Status** | Show when `status` is meaningful and distinct from result | Same |
| **Performance Summary — batting** | **Both** `homeTeam` and `awayTeam` | **Club team only** (`isClubTeam: true`) |
| **Performance Summary — bowling** | **Both** teams | **Club team only** |
| **Team Group Label** | Recommended when showing both teams' stats | Optional; single team may not need label |
| **Asset Footer** | Show | Show |

**Club team detection:** Use `isClubTeam` on `homeTeam` / `awayTeam`. If neither is club, fall back to association behaviour or hide stats per brief.

---

## Data dictionary

Design-facing field names. Maps to production `MatchResult` payloads.

### Match-level fields

| Field | Required | Typical use | Hidden |
| ----- | -------- | ----------- | ------ |
| `date` | Yes | Match Metadata | |
| `type` | Yes | Match Metadata (e.g. T20, One Day) | |
| `round` | Yes | Match Metadata | |
| `ground` | Yes | Match Metadata | |
| `gradeName` | Yes | Match Metadata or Asset Header context | |
| `gender` | Optional | Match Metadata | |
| `ageGroup` | Optional | Match Metadata | |
| `status` | Optional | Match Status (e.g. Final, Abandoned) | |
| `result` | Yes | Result Statement (long form) | |
| `resultShort` | Yes | Result Statement (headline when tight) | |
| `resultSummary` | Optional | Result Statement construction (`winner`, `resultWord`, team names) | |
| `homeTeam` | Yes | Team and Score Area, Performance Summary | |
| `awayTeam` | Yes | Team and Score Area, Performance Summary | |
| `teamHomeLogo` | Optional | Alternate home crest source | |
| `teamAwayLogo` | Optional | Alternate away crest source | |
| `assignSponsors` | Optional | Asset Footer | |
| `prompt` | Optional | Copy tone only | Usually hidden |
| `gameID` | Optional | Automation | Hidden |

### Team fields (`homeTeam` / `awayTeam`)

| Field | Required | Typical use |
| ----- | -------- | ----------- |
| `name` | Yes | Team Identity |
| `score` | Yes | Score Display |
| `overs` | Optional | Score Display (secondary line) |
| `logo` | Optional | Team Identity (nullable — design placeholder state) |
| `isHome` | Yes | Layout order (home vs away position) |
| `isClubTeam` | Yes | Club mode — which team's stats to show |
| `battingPerformances` | Optional | Batting Leader Row[] |
| `bowlingPerformances` | Optional | Bowling Leader Row[] |
| `homeScoresFirstInnings` | Optional | Multi-innings hint (home) |
| `awayScoresFirstInnings` | Optional | Multi-innings hint (away) |

### Batting Leader Row fields

| Field | Required | Display |
| ----- | -------- | ------- |
| `player` | Yes | Player name label |
| `runs` | Yes | Stat cell |
| `balls` | Yes | Stat cell |
| `SR` | Yes | Stat cell (strike rate) |
| `fours` | Optional | Stat cell |
| `sixes` | Optional | Stat cell |
| `notOut` | Optional | Indicator (e.g. asterisk or badge) |
| `team` | Optional | Automation / grouping |

### Bowling Leader Row fields

| Field | Required | Display |
| ----- | -------- | ------- |
| `player` | Yes | Player name label |
| `overs` | Yes | Stat cell |
| `wickets` | Yes | Stat cell |
| `runs` | Optional | Stat cell (runs conceded) |
| `economy` | Optional | Stat cell |
| `maidens` | Optional | Stat cell |
| `team` | Optional | Automation / grouping |

### Sponsor fields (`assignSponsors`)

| Group | Use |
| ----- | --- |
| `competition[]` | Competition sponsor lockups in footer |
| `grade[]` | Grade sponsor lockups |
| `team[]` | Team sponsor lockups (home/away names + logos) |

---

## Component entries

### Asset Header

**Layer:** Full Asset Frame — top

**Purpose:** Identifies the producing organisation or competition at the top of the exported frame.

**Parent:** Full Asset Frame  
**Children:** Organisation mark, primary title line, optional secondary context line

**Required data:**

- Organisation name (from club / account context)
- Organisation logo URL (may be null)

**Optional data:**

- Competition or grade name as secondary line
- Composed title derived from metadata

**Repeating:** No — one per frame

**Layout responsibility:**

- Full-width horizontal band at top of frame
- Fixed proportional height (~20–25% of frame); Remotion resolves exact pixels

**Content hierarchy:**

1. Organisation mark (when present)
2. Primary title (largest type in header)
3. Secondary line (quietest)

**States and edge cases:**

- Missing organisation logo → placeholder mark or text-only header
- Long organisation name → wrap or truncate with ellipsis
- Composition may suppress secondary line for certain asset types (automation rule)

**Design flexibility:**

- Mark shape (circle, square well, etc.) is style-dependent
- Title typography and lockup arrangement are style-dependent

**Automation constraints:**

- Secondary line visibility may be suppressed per composition ID
- Header height comes from theme layout tokens

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Results Content Area

**Layer:** Composition Content Area

**Purpose:** Container for all match modules in the Results asset.

**Parent:** Full Asset Frame (between Asset Header and Asset Footer)  
**Children:** Match Module[] (minimum 2)

**Required data:**

- Array of match records (one per Match Module)

**Repeating:** Yes — minimum **2** match modules per frame

**Layout responsibility:**

- Occupies space between header and footer (~60–70% of frame)
- Distributes height **equally** across match modules where possible
- Consistent **small vertical gap** between modules
- Safe-area inset from frame edges

**Content hierarchy:**

- Match modules are peers — no module should dominate unless data density forces it

**States and edge cases:**

- Exactly 2 modules — default design target
- More than 2 — Remotion may paginate or reduce density; design **compact module** state
- Unequal data density (one match has many stat rows) — engineering balances row truncation

**Design flexibility:**

- Module container shape (card, band, glass panel) is style-dependent
- Gap and padding are style-dependent

**Automation constraints:**

- Module height is calculated, not fixed by design
- Stitch should provide a **module wireframe** with placeholder slots, not a final 2-match composition

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Match Module

**Layer:** Composition Content Area — repeating unit

**Purpose:** Contains all visual information for a single completed (or status-known) fixture.

**Parent:** Results Content Area  
**Children:** Match Metadata, Team and Score Area, Result Statement, Match Status (optional), Performance Summary

**Required data:**

- One `MatchResult` record

**Repeating:** Yes — part of Match Module[] (min 2 per frame)

**Layout responsibility:**

- Full width of content area
- Internal vertical stack: metadata → team/score → result → status → stats
- Band order may flex per style, but **team/score and result must remain visually connected**

**Content hierarchy:**

1. Team and Score Area + Result Statement (outcome)
2. Performance Summary (contributions)
3. Match Metadata (context)
4. Match Status (when shown — supporting)

**States and edge cases:**

- No batting or bowling rows → Performance Summary collapses or shows empty state
- Very long team names → truncate within Team Identity
- Abandoned / no result → Result Statement and Match Status carry meaning

**Design flexibility:**

- Internal band proportions (~40% team, ~50% stats, ~10% meta) are guides, not rules
- Bands may merge (e.g. metadata into header of module) per style

**Automation constraints:**

- Module must remain legible when height is halved (2-up layout)
- Do not design assuming a single match fills the frame

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Match Metadata

**Layer:** Match Module

**Purpose:** Quiet fixture context — when, where, which grade, match type.

**Parent:** Match Module  
**Children:** Metadata chips or compact text lines (date, round, ground, type, grade, gender, age group)

**Required data:**

- `date`
- `round`
- `ground`
- `gradeName`
- `type`

**Optional data:**

- `gender`
- `ageGroup`

**Repeating:** No — one per match module

**Layout responsibility:**

- Full-width horizontal region within module
- Single line preferred; two lines maximum
- Must not compete with scores or result for attention

**Content hierarchy:**

- Grade and round typically loudest within metadata
- Ground and date quieter
- Gender / age group quietest

**States and edge cases:**

- Long ground name → truncate
- Missing optional fields → omit chip gracefully
- T20 vs multi-day — `type` should remain readable

**Design flexibility:**

- Chip vs plain text vs divider-separated list is style-dependent

**Automation constraints:**

- Field selection may vary by template density
- Not the same as Asset Header — never duplicate org identity here

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Team and Score Area

**Layer:** Match Module

**Purpose:** Spatial grouping for both teams' identity and innings totals.

**Parent:** Match Module  
**Children:** Team Identity (×2), Score Display (×2), Versus / Divider (optional)

**Required data:**

- `homeTeam` and `awayTeam` name, score, logo, overs

**Repeating:** No — one per match module

**Layout responsibility:**

- Full-width horizontal band
- **Mirror** home and away with balanced visual weight (club mode may subtly emphasise club side)
- Scores are the **largest numerals** in this band

**Content hierarchy:**

1. Score Display (both sides)
2. Team Identity (names + crests)
3. Overs label (secondary to score)
4. Versus / Divider (if present — lowest)

**States and edge cases:**

- Missing logo on one or both sides → placeholder crest
- Score without overs → omit overs line
- Declared / D/L / custom score strings → Score Display must accommodate non-numeric formats
- Very long team names → truncate; scores must remain visible

**Design flexibility:**

- Horizontal vs stacked team layout is style-dependent
- Crest position (left of name, above name, etc.) is style-dependent

**Automation constraints:**

- Home/away order determined by `isHome` and layout rules
- Club emphasis must not break result legibility for the opponent

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Team Identity

**Layer:** Match Module — Team and Score Area

**Purpose:** Identifies one team via crest and name.

**Parent:** Team and Score Area  
**Children:** Team crest (primitive), Team name label (primitive)

**Required data:**

- `name`
- `logo` (nullable)

**Optional data:**

- `isClubTeam` (may inform subtle emphasis in club mode)

**Repeating:** Yes — two per match module (home and away)

**Layout responsibility:**

- Crest and name form a single identifiable unit
- Crest contained in consistent frame (well)
- Name must remain readable at module scale

**States and edge cases:**

- **Missing logo** — placeholder crest (monogram or neutral circle) — **required design state**
- Long name — truncate with ellipsis or two-line wrap
- Club emphasis — slightly stronger weight or scale; opponent remains fully readable

**Design flexibility:**

- Crest well shape and size are style-dependent
- Name typography is style-dependent

**Automation constraints:**

- Logo source may fall back to alternate team logo fields
- Do not use colour alone to identify club team

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Score Display

**Layer:** Match Module — Team and Score Area

**Purpose:** Shows one team's innings total and optional overs context.

**Parent:** Team and Score Area  
**Children:** Score numeral (primitive), Overs label (primitive, optional)

**Required data:**

- `score`

**Optional data:**

- `overs`
- `homeScoresFirstInnings` / `awayScoresFirstInnings` (multi-innings hint)

**Repeating:** Yes — two per match module

**Layout responsibility:**

- Score numeral is **dominant** in the team band
- Overs sit secondary (smaller, below or beside score)
- Tabular alignment when both sides shown

**Content hierarchy:**

1. Score numeral
2. Overs label
3. Innings hint (if shown)

**States and edge cases:**

- Empty or unusual score strings (e.g. "1/10", "8 pts")
- No overs → collapse overs line
- Winning side — communicated via Result Statement and hierarchy, not colour alone

**Design flexibility:**

- Score typography (display face, size) is style-dependent

**Automation constraints:**

- Score strings are pre-formatted from data — design for variable length

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Versus / Divider

**Layer:** Match Module — Team and Score Area

**Purpose:** Optional visual separator between home and away in the team band.

**Parent:** Team and Score Area  
**Children:** Divider glyph or rule (e.g. "VS", "v", vertical rule)

**Required data:** None

**Optional data:** None

**Repeating:** No

**Layout responsibility:**

- Centred or between team blocks
- Must not compete with score numerals

**States and edge cases:**

- **Often omitted for Results** — stacked or side-by-side teams without a VS divider is valid
- When present, must work with unequal name lengths

**Design flexibility:**

- Glyph, rule, or empty space is style-dependent
- May be unused in approved Results style

**Automation constraints:**

- Results layouts frequently omit this component; design as optional

**Approved style mapping:** *(Stadium Signal — TBD — note if omitted)*

---

### Result Statement

**Layer:** Match Module

**Purpose:** Communicates the final outcome of the match in one immediately readable sentence.

**Parent:** Match Module  
**Children:** Result line (primitive)

**Required data:**

- Winning team or outcome concept (from `result`, `resultShort`, or `resultSummary`)

**Optional data:**

- `result` (long form)
- `resultShort` (headline)
- `resultSummary.winner`, `resultSummary.resultWord`

**Examples:**

- Northern Lions won by 30 runs
- Southside Saints won by 6 wickets
- Match drawn
- No result
- Match abandoned

**Repeating:** No — one per match module

**Layout responsibility:**

- Full-width horizontal region
- Visually **connected** to the team band (proximity, shared container, or accent rule)
- Supports **one or two lines** of text

**Content hierarchy:**

- Result Statement reads **immediately after** scores
- Louder than Match Metadata; comparable to or slightly below score numerals per style

**States and edge cases:**

- Long team name in result text
- Tie, draw, abandoned, no result — distinct copy, not just "won by"
- `resultShort` used when `result` is too long for module height

**Design flexibility:**

- Background band, accent bar, or plain text is style-dependent

**Automation constraints:**

- Text source priority: `resultShort` when tight, else `result`, else built from `resultSummary`
- Must not rely on colour alone to identify winner

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Match Status

**Layer:** Match Module

**Purpose:** Shows match state when distinct from the result sentence (e.g. in-progress label, official status).

**Parent:** Match Module  
**Children:** Status label (primitive)

**Required data:** None — component is optional

**Optional data:**

- `status` (e.g. Final, Abandoned, In Progress, No Result)

**Repeating:** No

**Layout responsibility:**

- Compact — single line or chip
- Quieter than Result Statement
- May sit adjacent to Result Statement or below Match Metadata

**States and edge cases:**

- Redundant with Result Statement (e.g. status "Final" + completed result) — may be hidden by automation
- Status is primary for abandoned / no result / in progress when result line is incomplete

**Design flexibility:**

- Chip vs text vs icon is style-dependent

**Automation constraints:**

- Hidden when `status` adds no information beyond Result Statement

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Performance Summary

**Layer:** Match Module

**Purpose:** Summarises top player batting and bowling contributions for the match.

**Parent:** Match Module  
**Children:** Team Group Label (optional), Batting Leader Row[], Bowling Leader Row[]

**Required data:** None — may be empty if no performances

**Optional data:**

- `battingPerformances` and `bowlingPerformances` per team (mode-dependent)

**Repeating:** No — one region per match module; rows repeat inside

**Layout responsibility:**

- Full-width region below result
- Batting and bowling may be **side-by-side columns** or **stacked blocks** — style choice
- In association mode, **both teams** must be distinguishable
- In club mode, **single team** lists only

**Content hierarchy:**

1. Batting leaders (typically first)
2. Bowling leaders
3. Team Group Label (when needed for scan clarity)

**States and edge cases:**

- Zero rows → collapse region or minimal empty state
- Many rows → Remotion truncates; design **compact row** state
- Association: home and away stats both present
- Club: only `isClubTeam` team's arrays shown

**Design flexibility:**

- Column layout, table vs card rows is style-dependent
- Number of visible rows is automation — design 3–5 row default + compact

**Automation constraints:**

- Row count not fixed
- Opponent performances hidden in club mode but opponent remains in Team and Score Area

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Team Group Label

**Layer:** Match Module — Performance Summary

**Purpose:** Labels which team's performances follow (when multiple teams' stats appear in one module).

**Parent:** Performance Summary  
**Children:** Section label (primitive) — team name or "Batting" / "Bowling" + team

**Required data:**

- Team `name`

**Optional data:** None

**Repeating:** Yes — up to two per stats block in association mode (home / away)

**Layout responsibility:**

- Sits above or beside its row group
- Quieter than player names; louder than Match Metadata

**States and edge cases:**

- Club mode — often unnecessary (single team implied)
- Long team name — truncate

**Design flexibility:**

- Text-only vs chip vs accent bar is style-dependent

**Automation constraints:**

- Omitted when only one team's stats are visible

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Batting Leader Row

**Layer:** Match Module — Performance Summary

**Purpose:** One player's batting contribution in compact tabular form.

**Parent:** Performance Summary  
**Children:** Player name label, stat cells (runs, balls, SR; optional fours, sixes, not-out indicator)

**Required data:**

- `player`, `runs`, `balls`, `SR`

**Optional data:**

- `fours`, `sixes`, `notOut`

**Repeating:** Yes — 0 to N rows per team

**Layout responsibility:**

- Single horizontal row; columns align across rows
- Player name left; numerals tabular right
- Consistent row height for stacking

**Content hierarchy:**

1. Player name
2. Runs
3. Balls, SR (secondary)
4. Not-out indicator (tertiary)

**States and edge cases:**

- `notOut: true` — asterisk, dagger, or badge
- Missing optional columns — collapse column
- Long player name — truncate

**Design flexibility:**

- Column set (minimal vs full) is style-dependent
- Row background / divider is style-dependent

**Automation constraints:**

- Maximum visible rows set by engineering based on module height

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Bowling Leader Row

**Layer:** Match Module — Performance Summary

**Purpose:** One player's bowling contribution in compact tabular form.

**Parent:** Performance Summary  
**Children:** Player name label, stat cells (overs, wickets; optional runs, economy, maidens)

**Required data:**

- `player`, `overs`, `wickets`

**Optional data:**

- `runs`, `economy`, `maidens`

**Repeating:** Yes — 0 to N rows per team

**Layout responsibility:**

- Same row discipline as Batting Leader Row
- Columns align with batting table where shared layout

**Content hierarchy:**

1. Player name
2. Wickets
3. Overs
4. Economy (secondary)

**States and edge cases:**

- Fractional overs (e.g. 3.2) — must fit stat cell
- Long player name — truncate

**Design flexibility:**

- Column set is style-dependent

**Automation constraints:**

- Maximum visible rows set by engineering

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Asset Footer

**Layer:** Full Asset Frame — bottom

**Purpose:** Organisation identity and sponsor lockups at the bottom of the exported frame.

**Parent:** Full Asset Frame  
**Children:** Organisation Identity, Sponsor Identity

**Required data:** None — footer may be minimal

**Optional data:**

- `assignSponsors` (competition, grade, team groups)
- Organisation mark (may repeat from header)

**Repeating:** No — one per frame

**Layout responsibility:**

- Full-width horizontal strip (~8–12% of frame height)
- Sponsors quieter than match content
- Safe-area inset

**Content hierarchy:**

1. Sponsor lockups (when present)
2. Organisation mark (when repeated in footer)

**States and edge cases:**

- No sponsors → organisation-only or collapsed footer
- Many sponsors → grid or scroll; design 2–4 lockup default + compact

**Design flexibility:**

- Layout grid and logo sizes are style-dependent

**Automation constraints:**

- Footer height from theme layout tokens
- Sponsor set varies per account

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Organisation Identity

**Layer:** Asset Footer (also appears in Asset Header)

**Purpose:** Reinforces the producing organisation via mark and/or name.

**Parent:** Asset Header or Asset Footer  
**Children:** Organisation mark (primitive), optional name label

**Required data:**

- Organisation name

**Optional data:**

- Organisation logo URL

**Repeating:** May appear in header and footer

**Layout responsibility:**

- Compact; must not dominate footer

**States and edge cases:**

- Missing logo — text-only

**Approved style mapping:** *(Stadium Signal — TBD)*

---

### Sponsor Identity

**Layer:** Asset Footer

**Purpose:** Displays one sponsor's logo (and optionally name) in the footer strip.

**Parent:** Asset Footer  
**Children:** Sponsor lockup (primitive)

**Required data:**

- Sponsor logo URL or name (from `assignSponsors`)

**Optional data:**

- Sponsor name when logo missing

**Repeating:** Yes — 0 to N lockups

**Layout responsibility:**

- Equal visual weight among sponsors in grid
- Smaller than team crests in match content

**States and edge cases:**

- Missing logo — name fallback or skip
- Single vs many sponsors

**Approved style mapping:** *(Stadium Signal — TBD)*

---

## Edge case catalogue (cross-component)

| Scenario | Affected components | Design response |
| -------- | ------------------- | --------------- |
| Both logos missing | Team Identity | Placeholder both sides |
| One team no stats | Performance Summary | Collapse that team's block; association mode may show empty label |
| Club mode, no `isClubTeam` | Performance Summary | Fall back to association or hide stats |
| Abandoned match | Result Statement, Match Status | Status may carry primary message |
| Draw / tie | Result Statement | Distinct copy; no implied winner |
| 8+ batting rows | Batting Leader Row | Compact row; engineering truncates |
| Two matches, unequal density | Match Module | Equal module height; internal truncation |
| Long result + long names | Result Statement, Team Identity | Two-line result; truncated names |

---

## Layout responsibilities (summary)

| Region | Approx. weight (guide) | Owner |
| ------ | ---------------------- | ----- |
| Asset Header | ~20–25% frame | Template shell |
| Results Content Area | ~60–70% frame | Composition |
| — per Match Module | Equal split of content area | Remotion |
| — Team and Score Area | ~35–45% of module | Design + Remotion |
| — Performance Summary | ~45–55% of module | Design + Remotion |
| — Match Metadata | ~5–10% of module | Design |
| Asset Footer | ~8–12% frame | Template shell |

Percentages are **guides for Stitch context wireframes**, not fixed implementation values.

---

## Approved style mapping (Stadium Signal)

Fill as components are approved in Stadium Signal.

| Abstract component | Stadium Signal treatment | Status |
| ------------------ | ------------------------ | ------ |
| Asset Header | | TBD |
| Match Module container | | TBD |
| Match Metadata | | TBD |
| Team Identity | | TBD |
| Score Display | | TBD |
| Versus / Divider | | TBD (note if omitted) |
| Result Statement | | TBD |
| Match Status | | TBD |
| Performance Summary | | TBD |
| Team Group Label | | TBD |
| Batting Leader Row | | TBD |
| Bowling Leader Row | | TBD |
| Asset Footer | | TBD |
| Organisation Identity | | TBD |
| Sponsor Identity | | TBD |

---

## Implementation note

Current Remotion section implementations (reference only — not system definition):

- `src/compositions/cricket/results/layout/Sections/MatchHeader/` → Match Metadata
- `src/compositions/cricket/results/layout/Sections/TeamsSection/` → Team and Score Area
- `src/compositions/cricket/results/layout/Sections/ResultStatement/` → Result Statement
- `src/compositions/cricket/results/layout/Sections/MatchStatus/` → Match Status
- `src/compositions/cricket/results/layout/Sections/PlayerStats/` → Performance Summary

Template headers and footers live under `src/templates/variants/` and map to Asset Header and Asset Footer.

When anatomy and code diverge, anatomy wins for new design work.

---

## Related documents

| Document | Path |
| -------- | ---- |
| Overview | `component-anatomy-overview.md` |
| Stitch brief | `../stitch-briefs/results-stitch-component-brief.md` |
| Results design brief (index) | `../../results/.docs/llm-brief/llm-brief-cricket-results.md` |
| Association brief | `../../results/.docs/llm-brief/llm-brief-cricket-results-association.md` |
| Club brief | `../../results/.docs/llm-brief/llm-brief-cricket-results-club.md` |
| Results how-to | `../../results/.docs/how-to.md` |

---

**Last updated:** 2026-08-02

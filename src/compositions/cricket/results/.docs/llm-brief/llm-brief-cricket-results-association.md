# Cricket Results — association (static one page)

**Audience** — Association / neutral match graphics: show **both teams** with **full player contribution** for **each side**. For a design LLM: **one portrait scorecard mock** (regions + content slots). No motion or build detail.

**Goal** — Clear **match outcome** at a glance; **symmetric** treatment of home and away in the team band; **batting and bowling for both teams** in the stats zone. Brand-neutral unless brief says otherwise.

**Artboard** — e.g. **1080×1350** portrait as proportion guide; other portrait sizes OK.

**Page** — **Minimum two fixtures (match results) per screen**—stacked vertically, **similar height**, **small gap** between them. Optional **footer strip** for league / competition / grade / sponsor marks.

**Panel layout (all optional)** — Suggested vertical split: **~40%** home/away names, scores, overs, logos (**equal visual weight**); **~50%** **both teams’** batting/bowling (e.g. two blocks, tabs, or columns—design choice); **~10%** meta. **Order and % are flexible**—reorder, merge, or drop bands.

**Stack (illustration only)** — Often: teams → result/status → **dual-team stats** → meta. Not required.

**Design guidance**

- **Hierarchy** — **Winner / result** and **scores** first; **both sides’** player stats second; **meta** quietest unless the brief prioritises fixture context.
- **Team band** — **Mirror** home and away (logo, name, score, overs); **scores** largest type in that band; balanced VS.
- **Stats zone** — Must accommodate **performances for home and away** (`battingPerformances` / `bowlingPerformances` on **each** of `homeTeam` and `awayTeam`). Label or group by team so scans are unambiguous.
- **Logos** — Contain in a consistent frame; don’t let marks outrank numerals.
- **Result / status** — Dedicated line for long or unusual `result` / `status`; `resultShort` as headline when tight.
- **Rhythm** — Artboard margins, panel padding, **small gap** between stacked match panels.
- **Sponsors** — Quieter than match content; simple grid for lockups.
- **Safe area** — Inset critical content from edges.

**Data you can show**

- Match: `date`, `type`, `round`, `ground`, `gender`, `ageGroup`, `gradeName`, `status`, `result`, `resultShort`, `resultSummary`, `prompt` (tone only, usually not on canvas), `gameID` (usually hidden).
- **Both** `homeTeam` and `awayTeam`: `name`, `score`, `overs`, `logo`, `isHome`; optional innings hints.
- **Per team** — full `battingPerformances` and `bowlingPerformances` (all fields as in shared types).
- `assignSponsors`: team / grade / competition → footer, corners, or marks.

**Sample payload** — `testData/samples/Cricket/Cricket_Results.json`

**Structure hint** — `Page → ≥2 match panels → (optional sponsor band)`; stats area must reflect **two teams’** contributions.

# Cricket Results — club (static one page)

**Audience** — Club-branded graphics: **club team’s player stats only**; opponent appears for **context** (name, score, overs, logo) but **not** as a second full stats block. For a design LLM: **one portrait scorecard mock** (regions + content slots). No motion or build detail.

**Goal** — Celebrate **club performances** while keeping the **match result** and **opponent** readable in the team band. Brand-neutral unless brief says otherwise.

**Artboard** — e.g. **1080×1350** portrait as proportion guide; other portrait sizes OK.

**Page** — **Minimum two fixtures (match results) per screen**—stacked vertically, **similar height**, **small gap** between them. Optional **footer strip** for league / competition / grade / sponsor marks.

**Panel layout (all optional)** — Suggested vertical split: **~40%** **both** team names, scores, overs, logos (club side may get **slightly stronger** emphasis—optional); **~50%** **club-only** batting/bowling lists or tables; **~10%** meta. **Order and % are flexible**.

**Stack (illustration only)** — Often: teams (both sides) → result/status → **club stats** → meta. Not required.

**Which team is “club”** — Use `isClubTeam` on `homeTeam` / `awayTeam`: the club’s `battingPerformances` and `bowlingPerformances` populate the stats zone; the other side’s performance arrays are **not** shown as primary content (opponent still appears in the score band).

**Design guidance**

- **Hierarchy** — **Club player stats** are the **hero** of the lower band; **scores and result** still read clearly; **opponent** readable but **supporting** in the team row.
- **Team band** — Keep **both** names and scores visible (integrity of the result); optional subtle emphasis on club (weight, order, or scale—within reason).
- **Stats zone** — **Single-team** tables/lists; column layout as in association brief (player | runs | balls | SR, etc.). No obligation to mirror opponent stats.
- **Logos** — Contain both marks; club logo may be slightly larger only if hierarchy stays clear.
- **Result / status** — Same as association: clear line for long or unusual outcomes; `resultShort` as headline when tight.
- **Rhythm** — Margins, panel padding, gap between stacked panels; **safe area** inset.

**Data you can show**

- Match-level fields same as association brief (`date`, `type`, `round`, `ground`, `gender`, `ageGroup`, `gradeName`, `status`, `result`, `resultShort`, `resultSummary`, `prompt`, `gameID`).
- **Team band** — **Both** `homeTeam` and `awayTeam`: `name`, `score`, `overs`, `logo`, `isHome`, `isClubTeam`; optional innings hints.
- **Stats zone** — `battingPerformances` and `bowlingPerformances` from the team where **`isClubTeam` is true** (if neither is club, treat as association-style or hide stats—brief-dependent).
- `assignSponsors` — same usage as association brief.

**Sample payload** — `testData/samples/Cricket/Cricket_Results.json`

**Structure hint** — `Page → ≥2 match panels → (optional sponsor band)`; each panel: **dual team band** + **single-team stats** (club).

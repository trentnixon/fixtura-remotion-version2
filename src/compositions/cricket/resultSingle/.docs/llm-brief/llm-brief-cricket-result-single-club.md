# Cricket Result Single — club (static one page)

**Audience** — Club-branded: **one match** on screen; **club player stats only**; opponent visible for **score and identity**, not as a second full stats block. For a design LLM: **one portrait scorecard mock** (regions + content slots). No motion or build detail.

**Goal** — **Club performances** are the hero; **match result** and **opponent** stay clear in the team band. Brand-neutral unless brief says otherwise.

**Artboard** — e.g. **1080×1350** portrait; other portrait sizes OK.

**Page** — **Exactly one fixture** per screen. Optional **footer strip** for sponsors / league marks.

**Vertical flow (illustration only, all optional)** — Often: optional **headline** from `resultSummary` or `resultShort` (when present) → **both teams** in the score row → **club-only** batting/bowling → **fixture meta** (type, round, ground, etc.). **Flexible** order and proportions.

**Which team is “club”** — `isClubTeam` on `homeTeam` / `awayTeam` identifies the club; **stats zone** uses that side’s `battingPerformances` / `bowlingPerformances` only. Opponent remains in the **team/score** band.

**Design guidance**

- **Hierarchy** — **Club stats** dominate the lower area; **scores / result** still immediate; opponent **supporting** in the team row. Optional subtle emphasis on the club logo or name—without breaking balance of the result.
- **Team band** — **Both** names, scores, overs, logos visible so the **result is legitimate** and readable.
- **Stats zone** — **Single-team** lists or tables; same column ideas as association (player, runs, balls, SR, etc.).
- **Headline copy** — When `resultSummary` or `resultShort` exists, it can sit **above** the team band as a short **narrative or headline**—optional, brief-dependent.
- **Rhythm** — Margins, padding, **safe area** inset.

**Data you can show**

- Match-level: same field set as association brief, including optional `resultShort` and `resultSummary`.
- **Team band** — **Both** teams: `name`, `score`, `overs`, `logo`, `isHome`, `isClubTeam`; optional innings hints.
- **Stats zone** — Performances from the team with **`isClubTeam: true`** (if unclear, fall back to brief / association-style).
- `assignSponsors` — same as association brief.

**Sample payload** — `testData/samples/Cricket/Cricket_WeekendResultsSingle.json`

**Structure hint** — `Page → one match card → (optional sponsor band)`; **dual team band** + **single-team stats** (club).

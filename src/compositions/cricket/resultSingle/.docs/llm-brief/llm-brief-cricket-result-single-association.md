# Cricket Result Single — association (static one page)

**Audience** — Association / neutral: **one match** fills the frame; **both teams** with **full batting and bowling** visible. For a design LLM: **one portrait scorecard mock** (regions + content slots). No motion or build detail.

**Goal** — **Outcome and scores** read immediately; **player contributions for both sides** are the main depth—this layout usually gives the **stats zone more room** than a multi-fixture screen. Brand-neutral unless brief says otherwise.

**Artboard** — e.g. **1080×1350** portrait as proportion guide; other portrait sizes OK.

**Page** — **Exactly one fixture** per screen. Optional **footer strip** for league / competition / grade / sponsor marks.

**Vertical flow (illustration only, all optional)** — Common top-to-bottom rhythm: **result / status band** → **home vs away** (names, scores, overs, logos, balanced) → **large dual-team stats** (batting/bowling for **both** teams—split, stacked, or column layout) → **fixture meta** (type, round, ground; add date, grade, gender, age if needed). **Reorder, merge, or change proportions** freely.

**Design guidance**

- **Hierarchy** — **Scores and result** first; **both teams’ stats** as the **hero** block; meta and sponsors quieter.
- **Team band** — **Mirror** home and away; **scores** strongest type; contained logos.
- **Stats zone** — Show **homeTeam** and **awayTeam** `battingPerformances` / `bowlingPerformances`; **label by team** so it scans clearly. Room for **more rows** than a compact multi-match card—still allow truncate / top performers if the brief asks.
- **Result / status** — Clear treatment for long `result` or unusual `status`; optional `resultShort` or structured `resultSummary` as a **headline** when present.
- **Rhythm** — Generous margins; **safe area** inset from edges.

**Data you can show**

- Match: `date`, `type`, `round`, `ground`, `gender`, `ageGroup`, `gradeName`, `status`, `result`, optional `resultShort`, optional `resultSummary` (`homeTeam`, `awayTeam`, `winner`, `resultWord`), `prompt` (tone only, usually not on canvas), `gameID` (usually hidden).
- **Both** `homeTeam` / `awayTeam`: `name`, `score`, `overs`, `logo`, `isHome`; optional innings hints; **full** `battingPerformances` and `bowlingPerformances`.
- `assignSponsors`: team / grade / competition names + logos.

**Sample payload** — `testData/samples/Cricket/Cricket_WeekendResultsSingle.json`

**Structure hint** — `Page → one match card → (optional sponsor band)`; stats must reflect **two teams**.

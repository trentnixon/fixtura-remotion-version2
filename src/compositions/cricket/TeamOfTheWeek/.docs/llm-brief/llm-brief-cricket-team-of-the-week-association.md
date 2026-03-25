# Cricket Team of the Week — association / competition (static)

**Audience** — Competition-wide or multi-club **Team of the Week**: each row is one **honoured player** from a potentially **different club**. For a design LLM: **one static portrait page** of **player cards or rows**. No motion or build detail.

**Goal** — Scan picks quickly: **who**, **why** (role / achievement), **stats**, and **which club** they represent. Brand-neutral unless brief says otherwise.

**Artboard** — e.g. **1080×1350** portrait; other sizes OK.

**Layout (all optional)** — Often **2-column grid** or **single column** of **equal-weight rows**; optional **page title** (“Team of the Week”, round, grade). Optional **footer** for league / sponsor marks. **Row count** is whatever the dataset supplies for that static (design for **~5–12** rows as a stress test).

**Per-row content (typical)** — **Role / achievement** (icon or label tied to `categoryDetail.position`—e.g. top run-scorer, strike rate, wickets, economy, all-rounder, best of the rest) → **stat line(s)** (batting and/or bowling per category) → **player name** → **`primaryTeam` and/or `club.name`** → **`club.logo`** as a **distinct club mark** (players may come from different clubs).

**Design guidance**

- **Hierarchy** — **Player name** and **headline stat** strongest; **club identity** clearly visible (logo + team name) so mixed-club lists make sense.
- **Position / story** — Use `category` + `categoryDetail` to label the row (Batter / Bowler / All-Rounder / Twelfth Man + achievement type)—**consistent iconography or tags** across rows.
- **Stats** — Batting: runs, balls, SR, fours, sixes, not out. Bowling: wickets, overs, economy, maidens, runs conceded. All-rounder: may need **batting + bowling + combined** readout. **Twelfth Man** may be sparse—show what exists.
- **Rankings** — Optional small secondary line from `rankings` (e.g. league position for runs or SR)—quiet typography.
- **Prompt** — `prompt` per player is **long narrative** for tone/copy ideas; usually **not** fully printed on the card.
- **Rhythm** — Repeatable row pattern; **safe area** inset; first row may be **featured** (larger) if the brief asks.

**Data fields (checklist)**

- `player`, `rank`, `category`, `categoryDetail` (`type`, `position`), `primaryTeam`, `club` (`name`, `logo`), `rankings`, `prompt`
- `batting` / `bowling` / `allRounder` as applicable per `category`

**Sample payload** — `testData/samples/Cricket/Cricket_TeamOfTheWeek.json`

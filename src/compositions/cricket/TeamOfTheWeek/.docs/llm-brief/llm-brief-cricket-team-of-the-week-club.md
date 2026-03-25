# Cricket Team of the Week — club account (static)

**Audience** — **Single club / account** Team of the Week: every pick is **your organisation**; grades or sides may differ (`primaryTeam`, `club.name`). For a design LLM: **one static portrait page** of player rows. No motion or build detail.

**Goal** — Celebrate **club players** and **stats**; **avoid visual noise** from repeating the **same club logo** on every row. Brand-neutral unless brief says otherwise.

**Team composition (this asset)** — The side is **12 selections** in total: **batters**, **bowlers**, **exactly two all-rounders**, and **one twelfth man**. The remaining **nine** spots are **batters and bowlers** only (how many of each follows the dataset or product brief). Design the static for **twelve rows** (or twelve cards) and distinguish **category** (`Batter` / `Bowler` / `All-Rounder` / `Twelfth Man`) visually.

**Artboard** — e.g. **1080×1350** portrait; other sizes OK.

**Layout (all optional)** — Same grid/list ideas as the association brief; optional **one** club or league **wordmark / logo** at **page or section** level instead of **per-row** club tiles. Optional **footer** for sponsors.

**Per-row content (typical)** — **Role / achievement** (icon or label from `categoryDetail`) → **stats** → **player name** → optional **`primaryTeam`** as a **subtitle** when grades/squads differ (shorter or quieter than name). **Omit or minimise** a **trailing club logo** that duplicates the page brand.

**Design guidance**

- **Hierarchy** — **Player + stats + role** first; **grade/side** (`primaryTeam`) as secondary when it adds context.
- **Shared brand** — **One** strong club treatment (header, watermark, or thin strip); rows stay **content-first**.
- **Position / stats / rankings** — Same principles as the association brief (`llm-brief-cricket-team-of-the-week-association.md`). **`prompt`** is long copy for tone—usually **not** fully on canvas.
- **All-rounders** — **Two** rows need **batting + bowling** (and any combined all-rounder readout) without crowding **single-stat** rows.
- **12th man** — **One** row; may be lighter stats—still aligned with the same row pattern.

**Data fields** — Same checklist as association brief; interpret `club` as **one brand** for the page, `primaryTeam` for **line-up / grade** when useful.

**Sample payload** — `testData/samples/Cricket/Cricket_TeamOfTheWeek.json`

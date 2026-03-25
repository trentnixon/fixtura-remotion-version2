# Cricket Top 5 — static design brief (general)

**Audience** — Design LLM or designer producing **one portrait static** for a **ranked list** of top performers (**batting** or **bowling** leaderboard). No motion or implementation detail.

**Goal** — **Order and identity** are obvious: **who**, **which team** (`playedFor`), and the **headline number** (runs or bowling figures). **#1** can read as the **featured** row if the brief allows. Brand-neutral unless art direction says otherwise.

**Artboard** — e.g. **1080×1350** portrait; other sizes OK.

**Content model** — Data is an array of players; **length is usually five** but may vary—design should tolerate **N rows**. Each item is either **`batting`** or **`bowling`** (`type`); the whole list is normally **one kind** per graphic (top batters *or* top bowlers).

**Typical row (all optional layout)** — **`teamLogo`** (club mark, varying aspect ratio) → **`name`** → **`playedFor`** (team / grade side name) → **score block**:
- **Batting** — main **runs** (asterisk or similar if **`notOut`**), suffix **balls** (e.g. in parentheses); **`SR`** (strike rate) available for an extra figure or subline.
- **Bowling** — main **`wickets` / `runs`** conceded, suffix **`overs`** (e.g. in parentheses).

**Design guidance**

- **Hierarchy** — **Rank 1** row may use **stronger** background or scale; **score numerals** compete with **player name**—pick one as hero per brief.
- **Alignment** — Repeatable **row rhythm** (logo column + text + stats); **tabular** feel helps scan.
- **Logos** — Contain in a **fixed frame**; preserve aspect ratio.
- **`prompt`** — Long narrative for **tone / social copy**; usually **not** fully on the graphic.
- **`assignSponsors`** — Team / grade / competition names and logos → **footer or margins**; subordinate to the table.
- **Safe area** — Inset from edges.

**Data fields (checklist)**

- Always: `name`, `playedFor`, `teamLogo` (url, dimensions), `assignSponsors`, `prompt`
- Batting: `type: "batting"`, `runs`, `balls`, `SR`, `notOut`
- Bowling: `type: "bowling"`, `wickets`, `overs`, `runs` (conceded)

**Sample payloads** — `testData/samples/Cricket/Cricket_Top5Batters.json`, `testData/samples/Cricket/Cricket_Top5Bowlers.json`

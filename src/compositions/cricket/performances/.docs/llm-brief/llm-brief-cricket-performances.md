# Cricket Performances — static design brief (general)

**Audience** — Design LLM or designer producing **one portrait static** for a **list of standout match performances** (**batting** or **bowling**). Typically a **round / weekend / period** snapshot, not necessarily labeled “Top N”. No motion or implementation detail.

**Goal** — **Identity and numbers** read instantly: **who**, **which side** (`playedFor`), and the **headline stat line** (runs with balls/SR for batting; wickets / runs conceded / overs for bowling). Order is usually **sorted by performance** (e.g. runs or wickets); **first row** may read as the **lead** performance if the brief allows. Brand-neutral unless art direction says otherwise.

**Artboard** — e.g. **1080×1350** portrait; other sizes OK.

**Content model** — Data is an array of performances; **length varies** (often **five per “page”** in video, but lists can be longer—design should tolerate **N rows** or a **truncated teaser**). Each item is either **`batting`** or **`bowling`**; a given graphic is normally **one discipline** (batting **or** bowling).

**Typical row (all optional layout)** — **`teamLogo`** (club mark, varying aspect ratio) → **`name`** → **`playedFor`** (team / grade side name) → **score block**:

- **Batting** — main **runs** (asterisk or similar if **`notOut`**), suffix **balls** (e.g. in parentheses); **`SR`** (strike rate) for an extra figure or subline.
- **Bowling** — main **`wickets` / `runs`** conceded, suffix **`overs`** (e.g. in parentheses; may include decimals like `0.2`).

**Design guidance**

- **Hierarchy** — **First row** may use **stronger** background or scale (lead performance); **score numerals** vs **player name**—pick one as hero per brief.
- **Alignment** — Repeatable **row rhythm** (logo column + text + stats); **tabular** feel helps scan.
- **Logos** — Contain in a **fixed frame**; preserve aspect ratio.
- **`prompt`** — Long narrative for **tone / social copy**; usually **not** fully on the graphic.
- **`assignSponsors`** — Team / grade / competition names (and logos where used) → **footer or margins**; subordinate to the table.
- **Safe area** — Inset from edges.
- **Multi-page context** — If the dataset is large, static may represent **one screen** of a longer list; optional **“+ more”** or page indicator only if the brief asks.

**Data fields (checklist)**

- Always: `name`, `playedFor`, `teamLogo` (url, dimensions), `assignSponsors`, `prompt`
- Batting: `type: "batting"` (often inferred from composition in production), `runs`, `balls`, `SR`, `notOut`
- Bowling: `type: "bowling"` (often inferred from composition in production), `wickets`, `overs`, `runs` (conceded)

**Sample payloads** — `testData/samples/Cricket/Cricket_BattingPerformances.json`, `testData/samples/Cricket/Cricket_BowlingPerformances.json`

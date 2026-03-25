# Cricket Upcoming fixtures — static design brief (general)

**Audience** — Design LLM or designer producing **one portrait static** for **upcoming match cards** (who plays whom, when, where, grade). No motion or implementation detail.

**Goal** — Each fixture reads as a **small poster**: **two teams** (names + marks), **VS**, **venue**, **date & time**, and **grade / competition context**. Scan multiple fixtures quickly if the brief shows more than one card on the page.

**Artboard** — e.g. **1080×1350** portrait; other sizes OK.

**Scope per static** — Typically **one “screen” of content**: **one or more stacked game cards** (often **two** in product defaults—design so **2–3** cards still breathe). Long lists may split across **multiple statics** in production—that is a **content** choice, not something this brief must solve.

**Typical game card (all optional)** — **Grade / context band** (from **`gradeName`**) → **home team name** → **row**: **home logo** | **centre meta** (**VS**, **`ground`**, **`date`**, **`time`**) | **away logo** → **away team name**. **Mirror** home and away for balance. **`type`**, **`round`**, **`gender`**, **`ageGroup`** can sit in the top band, footer, or a slim meta strip—flexible.

**Design guidance**

- **Hierarchy** — **Team names** and **logos** first; **date/time** and **ground** clear; **grade** framing the card without overpowering the match-up.
- **Logos** — **`teamHomeLogo` / `teamAwayLogo` may be null**—provide a **placeholder mark** or **monogram** treatment in the brief.
- **VS column** — Keep **narrow** and **legible**; avoid crowding **long ground** strings (truncate or two-line rules).
- **`prompt`** — Narrative for **caption copy**; usually **not** full bleed on the card.
- **Sponsors** — **`assignSponsors`** (team / grade / competition) → optional **footer strip** or **edge lockups** when several fixtures share a page.
- **Safe area** — Inset from edges.

**Data fields (checklist)**

- `teamHome`, `teamAway`, `teamHomeLogo`, `teamAwayLogo` (nullable)
- `date`, `time`, `ground`, `gradeName`, `type`, `round` (nullable), `gender`, `ageGroup`, `gameID` (often hidden), `assignSponsors`, `prompt`

**Sample payload** — `testData/samples/Cricket/Cricket_upcoming.json`

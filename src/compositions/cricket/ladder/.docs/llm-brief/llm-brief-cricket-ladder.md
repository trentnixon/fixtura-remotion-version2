# Cricket Ladder — static design brief (general)

**Audience** — Design LLM or designer producing **one portrait static** for a **competition ladder / standings table** (one grade). No motion or implementation detail.

**Goal** — **Order** and **points** are obvious: each row is a **team** with **logo + name** and **columns of stats**, capped by a **grade title**. Optional **highlight** for a **focus team** (`bias` matches `teamName` on one row). Brand-neutral unless the brief says otherwise.

**Artboard** — e.g. **1080×1350** portrait; other sizes OK.

**Scope** — One **`LadderData`** record = **one table** (`gradeName` + `League` rows). If the dataset has **several grades**, treat each as a **separate static** or separate page. Row count = **`League.length`** (often **~8–16**—design for **dense** typography).

**Typical layout (all optional)** — **Header row**: **`gradeName`** over the **team** block (~70% width in product layouts) + **stat column labels**. **Body**: repeating rows — **rank** (`position`) + **`clubLogo` / `playHQLogo` / `teamLogo`** (prefer first available) + **`teamName`** + numeric columns.

**Stat columns (data available)** — `P` (played), `W`, `L`, `BYE`, `N/R`, `TIE`, `PTS`, `Q` (quotient). A minimal product layout may show only **P, W, L, BYE, PTS**; a full static can expose **N/R**, **TIE**, and **Q** if space allows. Use **short headers** (e.g. **B** for byes) and **tabular alignment**.

**Design guidance**

- **Hierarchy** — **`PTS`** and **rank** read strongly; **team name** clear; **quotient** and **N/R** can be **smaller** or **tertiary**.
- **Logos** — **`clubLogo` / `teamLogo` / `playHQLogo` may be null**—placeholder circle or monogram.
- **Bias row** — When `teamName === bias`, treat as **featured** (bar, tint, or icon)—optional and subtle enough that **1st / last** ladder story still reads if you use position styling.
- **Top / bottom** — Some templates **emphasise rank 1** and **last place**; use **semantic colour** only if the brief allows.
- **Ladder `prompt`** — Narrative for **grade / competition** context; **per-team `prompt`** may be **string or structured** in payloads—use for **copy**, not necessarily on the table.
- **`assignSponsors`** — Footer or edge **sponsor strip**.
- **Safe area** — Inset from edges.

**`LadderData` checklist**

- Table: `ID`, `gradeName`, `League` (array of `TeamData`), `bias`, `prompt`, `assignSponsors`
- Per team: `position`, `teamName`, `clubLogo`, `teamLogo`, `playHQLogo`, `P`, `W`, `L`, `BYE`, `N/R`, `TIE`, `PTS`, `Q`, `prompt`

**Sample payload** — `testData/samples/Cricket/Cricket_Ladder.json`

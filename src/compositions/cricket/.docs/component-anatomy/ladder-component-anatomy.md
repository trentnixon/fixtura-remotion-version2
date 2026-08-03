# Competition Ladder — Component Anatomy

Design-first building blocks for the **Cricket Ladder** composition. Shared frame components (Asset Header, Asset Footer) are defined in `component-anatomy-overview.md`.

**Stitch brief:** `../stitch-briefs/ladder-stitch-component-brief.md`  
**Design brief:** `../../ladder/.docs/llm-brief/llm-brief-cricket-ladder.md`  
**Sample payload:** `testData/samples/Cricket/Cricket_Ladder.json`

---

## Asset summary

| Attribute | Value |
| --------- | ----- |
| **Artboard** | 1080 × 1350 portrait |
| **Content unit** | One `LadderData` = one grade table per frame (or paginated) |
| **Row count** | `League.length` — typically **8–16**; design for dense typography |
| **Modes** | Single mode; optional **bias highlight** for focus team |

**Goal:** Order and points are obvious; rank and PTS read strongest.

---

## Component tree

```text
Full Asset Frame
├── Asset Header                          (shared — see overview)
├── Ladder Content Area
│   └── Ladder Table
│       ├── Ladder Metadata
│       ├── Column Header
│       └── Ladder Row[]
│           ├── Rank
│           ├── Team Identity
│           │   ├── Team crest (primitive)
│           │   └── Team name (primitive)
│           └── Stat Cells[]
│               └── Stat cell (primitive) × N columns
│       └── Highlight State               (applied to one row when bias matches)
└── Asset Footer                          (shared — see overview)
```

---

## Data dictionary

### Ladder table (`LadderData`)

| Field | Required | Use |
| ----- | -------- | --- |
| `gradeName` | Yes | Ladder Metadata |
| `League` | Yes | Ladder Row[] |
| `bias` | Yes | Highlight State — matches `teamName` on one row |
| `assignSponsors` | Optional | Asset Footer |
| `prompt` | Optional | Copy tone — usually hidden |
| `ID` | Optional | Automation — hidden |

### Ladder Row (`TeamData`)

| Field | Required | Column |
| ----- | -------- | ------ |
| `position` | Yes | Rank |
| `teamName` | Yes | Team name |
| `clubLogo` / `teamLogo` / `playHQLogo` | Optional | Team crest (first available) |
| `P` | Yes | Played |
| `W` | Yes | Won |
| `L` | Yes | Lost |
| `BYE` | Yes | Byes |
| `PTS` | Yes | Points |
| `N/R` | Optional | No result |
| `TIE` | Optional | Tie |
| `Q` | Optional | Quotient |
| `prompt` | Optional | Hidden |

**Minimal column set:** P, W, L, BYE, PTS. Full set may add N/R, TIE, Q.

---

## Component entries

### Ladder Content Area

**Purpose:** Container for one standings table.

**Repeating:** One table per frame (multiple grades may paginate).

**Layout:** Full width between header and footer; table fills available height.

**Automation:** Row height calculated from team count.

---

### Ladder Metadata

**Purpose:** Identifies the grade or competition context for this table.

**Required data:** `gradeName`

**Layout:** Full-width band above Column Header; single or two lines.

**Hierarchy:** Loudest text in the table chrome (below Asset Header).

---

### Column Header

**Purpose:** Labels stat columns for tabular alignment.

**Required data:** Column labels (P, W, L, BYE, PTS at minimum).

**Layout:** Horizontal row aligned with Ladder Row stat cells; team name block ~70% width in typical layouts.

**States:** Abbreviated headers (e.g. **B** for byes) when space is tight.

---

### Ladder Row

**Purpose:** One team's standing — rank, identity, and stats.

**Parent:** Ladder Table  
**Children:** Rank, Team Identity, Stat Cells[]

**Repeating:** Yes — `League.length` rows; equal row height.

**Layout:** Full-width horizontal row; tabular alignment across rows.

**Edge cases:** Missing logo; long team name; rank 1 and last place may receive semantic emphasis (not colour-only).

---

### Rank

**Purpose:** Position in the ladder.

**Primitive:** Rank index

**Required data:** `position`

**Hierarchy:** Strong — especially rank 1.

---

### Team Identity (ladder)

**Purpose:** Crest + name for one team in a row.

**Primitives:** Team crest, Team name

**Required data:** `teamName`; logo (nullable — prefer clubLogo → teamLogo → playHQLogo)

---

### Stat Cells

**Purpose:** Numeric standings columns for one row.

**Primitive:** Stat cell (one per column)

**Required data:** Per visible column set (P, W, L, BYE, PTS minimum)

**Hierarchy:** **PTS** strongest among stat cells.

---

### Highlight State

**Purpose:** Visual treatment when `teamName === bias` (focus / club team).

**Not a separate component** — a **state applied to one Ladder Row**.

**Design:** Subtle bar, tint, or edge accent; must not break rank 1 / last-place readability.

---

## Edge case catalogue

| Scenario | Response |
| -------- | -------- |
| All logos null | Placeholder crest every row |
| 16+ teams | Compact row state; engineering reduces density |
| Bias team is rank 1 | Highlight + top-rank styling must coexist |
| Quotient only in full layout | Q column tertiary or hidden in minimal layout |

---

## Approved style mapping (Stadium Signal)

| Component | Status |
| --------- | ------ |
| Ladder Metadata | TBD |
| Column Header | TBD |
| Ladder Row | TBD |
| Rank | TBD |
| Team Identity | TBD |
| Stat Cells | TBD |
| Highlight State | TBD |

---

## Implementation note

Reference only: `src/compositions/cricket/ladder/modules/TableHeader/`, `controller/TeamRows/`, `layout/TableRowLayout.tsx`.

---

**Last updated:** 2026-08-02

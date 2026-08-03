# Top Performers (Top 5) — Component Anatomy

Design-first building blocks for **Cricket Top 5 Batting** and **Cricket Top 5 Bowling** compositions. Shared frame components are in `component-anatomy-overview.md`.

**Stitch brief:** `../stitch-briefs/top-performers-stitch-component-brief.md`  
**Design brief:** `../../top5/.docs/llm-brief/llm-brief-cricket-top5.md`  
**Sample payloads:** `testData/samples/Cricket/Cricket_Top5Batters.json`, `Cricket_Top5Bowlers.json`

---

## Asset summary

| Attribute | Value |
| --------- | ----- |
| **Artboard** | 1080 × 1350 portrait |
| **List length** | Usually **5**; tolerate **N rows** |
| **Discipline** | One list per graphic — **batting** or **bowling** (not mixed) |
| **Modes** | Single mode |

**Goal:** Order and identity obvious — who, which team, headline number. Rank 1 may be featured.

---

## Component tree

```text
Full Asset Frame
├── Asset Header                          (shared)
├── Top Performers Content Area
│   └── Leaderboard
│       ├── Category Header
│       └── Ranked Player Row[]
│           ├── Rank
│           ├── Player Identity
│           │   ├── Team crest (primitive)
│           │   └── Player name (primitive)
│           ├── Team Context
│           │   └── Team name (primitive) — playedFor
│           └── Primary Performance Stat
│               ├── Batting stat block     (runs, balls, SR, notOut)
│               └── OR Bowling stat block  (wickets, runs conceded, overs)
└── Asset Footer                          (shared)
```

---

## Data dictionary

### Per player (`PlayerData`)

| Field | Required | Use |
| ----- | -------- | --- |
| `name` | Yes | Player name |
| `playedFor` | Yes | Team Context |
| `teamLogo` | Yes | Team crest |
| `type` | Yes | `"batting"` or `"bowling"` |
| `assignSponsors` | Optional | Asset Footer |
| `prompt` | Optional | Hidden |

**Batting (`type: "batting"`):** `runs`, `balls`, `SR`, `notOut`

**Bowling (`type: "bowling"`):** `wickets`, `overs`, `runs` (conceded)

---

## Component entries

### Category Header

**Purpose:** Titles the leaderboard (e.g. Top Run Scorers, Top Wicket Takers).

**Required data:** Derived from composition type or metadata — not always in payload.

**Layout:** Full-width band above rows.

---

### Ranked Player Row

**Purpose:** One ranked performer.

**Children:** Rank, Player Identity, Team Context, Primary Performance Stat

**Repeating:** Yes — typically 5; variable N.

**Layout:** Horizontal row — logo column + text + stat block; tabular rhythm.

**Edge cases:** Rank 1 featured state; missing logo; long name; `notOut` indicator for batting.

---

### Rank

**Primitive:** Rank index  
**Required data:** Implicit from array order (rank 1 = index 0)

---

### Player Identity

**Primitives:** Team crest, Player name  
**Required data:** `name`, `teamLogo`

---

### Team Context

**Primitive:** Team name  
**Required data:** `playedFor`  
**Hierarchy:** Quieter than player name and primary stat.

---

### Primary Performance Stat

**Purpose:** Headline numbers for the discipline.

**Batting:** Main **runs**; balls in parentheses; optional **SR** subline; **notOut** indicator.

**Bowling:** Main **wickets / runs** conceded; **overs** suffix.

**Primitives:** Stat cell group

---

## Edge case catalogue

| Scenario | Response |
| -------- | -------- |
| Fewer than 5 players | Empty slots or collapsed list |
| `notOut: true` | Asterisk, badge, or suffix on runs |
| Decimal overs (bowling) | Stat cell fits fractional overs |
| Mixed types in data | Design batting OR bowling — not both in one asset |

---

## Approved style mapping (Stadium Signal)

| Component | Status |
| --------- | ------ |
| Category Header | TBD |
| Ranked Player Row | TBD |
| Rank | TBD |
| Player Identity | TBD |
| Team Context | TBD |
| Primary Performance Stat | TBD |

---

## Implementation note

Reference only: `src/compositions/cricket/top5/controller/PlayersDisplay/`, `controller/PlayerRow/`.

---

**Last updated:** 2026-08-02

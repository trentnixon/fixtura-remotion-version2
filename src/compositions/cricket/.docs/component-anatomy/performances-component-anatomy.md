# Performances — Component Anatomy

Design-first building blocks for **Cricket Batting Performances** and **Cricket Bowling Performances** compositions. Structurally similar to Top Performers but optimised for **variable-length performance lists** (round / weekend snapshots).

Shared frame components: `component-anatomy-overview.md`.

**Stitch brief:** `../stitch-briefs/performances-stitch-component-brief.md`  
**Design brief:** `../../performances/.docs/llm-brief/llm-brief-cricket-performances.md`  
**Sample payloads:** `testData/samples/Cricket/Cricket_BattingPerformances.json`, `Cricket_BowlingPerformances.json`

---

## Asset summary

| Attribute | Value |
| --------- | ----- |
| **Artboard** | 1080 × 1350 portrait |
| **List length** | **Variable N** — often 5 per screen in video; may paginate |
| **Discipline** | Batting **or** bowling per graphic |
| **Modes** | Single mode |

**Goal:** Identity and numbers read instantly; first row may read as lead performance.

---

## Component tree

```text
Full Asset Frame
├── Asset Header                          (shared)
├── Performances Content Area
│   └── Performance List
│       ├── Period Header                 (round / weekend context — optional)
│       └── Performance Row[]
│           ├── Rank / Lead indicator     (optional — position in list)
│           ├── Player Identity
│           │   ├── Team crest (primitive)
│           │   └── Player name (primitive)
│           ├── Team Context
│           │   └── Team name (primitive) — playedFor
│           └── Performance Stat Block
│               ├── Batting figures
│               └── OR Bowling figures
└── Asset Footer                          (shared)
```

---

## Data dictionary

Same field model as Top Performers (`PerformanceData`):

| Field | Batting | Bowling |
| ----- | ------- | ------- |
| `name` | Yes | Yes |
| `playedFor` | Yes | Yes |
| `teamLogo` | Yes | Yes |
| `type` | `"batting"` | `"bowling"` |
| `runs` | Yes (scored) | Yes (conceded) |
| `balls` | Yes | — |
| `SR` | Yes | — |
| `notOut` | Yes | — |
| `wickets` | — | Yes |
| `overs` | — | Yes |

Also: `assignSponsors`, `prompt` (hidden).

---

## Differences from Top Performers

| Aspect | Top Performers | Performances |
| ------ | -------------- | ------------ |
| **Naming** | "Top 5" — rank explicit | Sorted list — lead row, not always labelled "Top 5" |
| **Row count** | Usually exactly 5 | Variable; may represent one page of longer list |
| **Header** | Category Header (leaderboard title) | Period Header (round/weekend — optional) |
| **Featured row** | Rank 1 | First row (lead performance) |

Row component structure is **the same** — reuse Stadium Signal row treatment from Top Performers where possible.

---

## Component entries

### Period Header

**Purpose:** Frames the time window (round, weekend, grade) when shown.

**Optional data:** From metadata or `assignSponsors.grade` / `competition`.

**Layout:** Quiet band above Performance Row[].

---

### Performance Row

**Purpose:** One standout performance in the list.

**Same structure as Ranked Player Row** in `top-performers-component-anatomy.md`.

**Repeating:** Yes — 0 to N.

**Edge cases:** Lead row emphasis; truncation when N exceeds frame height; multi-page indicator optional (engineering).

---

## Edge case catalogue

| Scenario | Response |
| -------- | -------- |
| Empty list | Empty state or collapse content area |
| 10+ performances | Compact row; pagination |
| Same player twice | Rare — treat as separate rows |

---

## Approved style mapping (Stadium Signal)

Extend Top Performers row styles. Document deltas only:

| Component | Status |
| --------- | ------ |
| Period Header | TBD |
| Performance Row | Extend from Top Performers |
| Lead row state | TBD |

---

## Implementation note

Reference only: `src/compositions/cricket/performances/controller/PerformancesDisplay/`.

---

**Last updated:** 2026-08-02

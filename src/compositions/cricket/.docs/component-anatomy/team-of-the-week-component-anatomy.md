# Team of the Week — Component Anatomy

Design-first building blocks for the **Cricket Team of the Week** composition. Shared frame components: `component-anatomy-overview.md`.

**Stitch brief:** `../stitch-briefs/team-of-the-week-stitch-component-brief.md`  
**Design brief:** `../../TeamOfTheWeek/.docs/llm-brief/llm-brief-cricket-team-of-the-week.md`  
**Sample payload:** `testData/samples/Cricket/Cricket_TeamOfTheWeek.json`

---

## Asset summary

| Attribute | Value |
| --------- | ----- |
| **Artboard** | 1080 × 1350 portrait |
| **Row count** | Variable — design for **5–12** rows |
| **Modes** | Association (mixed clubs) and Club (single org) |

**Goal:** Scan picks quickly — who, why (role/achievement), stats, which club.

---

## Component tree

```text
Full Asset Frame
├── Asset Header                          (shared)
├── Team of the Week Content Area
│   └── Selection List
│       ├── Page Title                    (optional — "Team of the Week")
│       └── Selection Row[]
│           ├── Role / Achievement Label
│           ├── Player Identity
│           │   └── Player name (primitive)
│           ├── Club Identity
│           │   ├── Organisation mark (primitive) — club.logo
│           │   └── Team name (primitive) — primaryTeam / club.name
│           ├── Stat Block
│           │   ├── Batting stats (category-dependent)
│           │   ├── Bowling stats (category-dependent)
│           │   ├── All-rounder combined readout
│           │   └── Fielding stats (wicket-keeper)
│           └── Ranking Annotation        (optional — quiet secondary)
└── Asset Footer                          (shared)
```

---

## Mode matrix

| Component | Association | Club |
| --------- | ----------- | ---- |
| **Club Identity** | **Required** on every row — mixed clubs | De-emphasise repeated club logo; shared brand implied |
| **Role / Achievement Label** | Show | Show |
| **Stat Block** | Per `category` | Same |
| **Page Title** | Optional | Optional |

---

## Data dictionary

### Per player (`TeamOfTheWeekPlayer`)

| Field | Required | Use |
| ----- | -------- | --- |
| `player` | Yes | Player name (may include (c)/(vc)) |
| `rank` | Yes | Optional display in row |
| `category` | Yes | Batter, Bowler, All-Rounder, Twelfth Man, Wicket-Keeper |
| `categoryDetail` | Yes | Role / Achievement Label (`type`, `position`) |
| `primaryTeam` | Yes | Team name |
| `club` | Yes | Club Identity (`name`, `logo`) |
| `rankings` | Optional | Ranking Annotation |
| `prompt` | Optional | Hidden |
| `batting` | Category-dependent | Stat Block |
| `bowling` | Category-dependent | Stat Block |
| `allRounder` | All-Rounder only | Combined readout |
| `fielding` | Wicket-Keeper only | Catches, stumpings |

---

## Component entries

### Selection Row

**Purpose:** One honoured player pick.

**Repeating:** Yes — variable N; equal-weight rows or 2-column grid.

**Hierarchy:** Player name + headline stat strongest; club identity clear in association mode.

---

### Role / Achievement Label

**Purpose:** Why this player was selected (`category` + `categoryDetail.position`).

**Examples:** Top run-scorer, highest strike rate, most wickets, best economy, all-rounder, twelfth man, wicket-keeper.

**Layout:** Icon, chip, or text tag — consistent across rows.

---

### Club Identity

**Primitives:** Organisation mark, Team name  
**Association mode:** Distinct club mark per row — players may be from different clubs.  
**Club mode:** Avoid repeating same logo on every row.

---

### Stat Block

**Purpose:** Category-appropriate figures.

| Category | Typical fields |
| -------- | -------------- |
| Batter | runs, balls, SR, fours, sixes, notOut |
| Bowler | wickets, overs, economy, maidens, runs conceded |
| All-Rounder | batting + bowling + combined score |
| Twelfth Man | sparse — show what exists |
| Wicket-Keeper | catches, stumpings |

---

### Ranking Annotation

**Purpose:** Quiet secondary line from `rankings` (e.g. league rank for runs).

**Optional** — omit when crowded.

---

## Edge case catalogue

| Scenario | Response |
| -------- | -------- |
| Twelfth Man sparse stats | Minimal stat line |
| All-rounder dual stats | Batting + bowling + combined without clutter |
| 12 rows | Compact row; grid layout |
| Captain suffix in `player` | Preserve (c) / (vc) in Player name |

---

## Approved style mapping (Stadium Signal)

| Component | Status |
| --------- | ------ |
| Page Title | TBD |
| Selection Row | TBD |
| Role / Achievement Label | TBD |
| Club Identity | TBD |
| Stat Block | TBD |

---

## Implementation note

Reference only: `src/compositions/cricket/TeamOfTheWeek/controller/PlayerRow/`, `controller/TeamOfTheWeekDisplay/`.

---

**Last updated:** 2026-08-02

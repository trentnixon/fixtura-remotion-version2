# Team Roster — Component Anatomy

Design-first building blocks for the **Cricket Team Roster** composition. Shared frame components: `component-anatomy-overview.md`.

**Stitch brief:** `../stitch-briefs/team-roster-stitch-component-brief.md`  
**Design brief:** `../../teamRoster/.docs/llm-brief/llm-brief-cricket-team-roster.md`  
**Sample payload:** `testData/samples/Cricket/Cricket_Roster.json`

---

## Asset summary

| Attribute | Value |
| --------- | ----- |
| **Artboard** | 1080 × 1350 portrait |
| **Content unit** | **One match / one roster** per frame |
| **Modes** | Association (balanced) and Club (club lineup hero) |

**Goal:** Named lineup for the rostered side with fixture context; opponent visible for match integrity.

---

## Component tree

```text
Full Asset Frame
├── Asset Header                          (shared)
├── Roster Content Area
│   └── Roster Module
│       ├── Fixture Metadata Strip
│       ├── Matchup Band
│       │   ├── Home Team Block
│       │   │   ├── Team crest (primitive)
│       │   └── Team name (primitive)
│       │   ├── Versus label (primitive)  (optional)
│       │   └── Away Team Block
│       │       ├── Team crest (primitive)
│       │       └── Team name (primitive)
│       ├── Roster Header                 (squad title / account team)
│       └── Player Name Row[]
│           └── Player name (primitive)
└── Asset Footer                          (shared)
```

---

## Mode matrix

| Component | Association | Club |
| --------- | ----------- | ---- |
| **Matchup Band** | Balanced home vs away | Club side emphasised; opponent supporting |
| **Roster Header** | Names rostered side neutrally | Club / account team as hero label |
| **Player Name Row[]** | Lineup for account side | Same — club squad is focus |
| **Fixture Metadata Strip** | Show | Show |

**Roster source:** `teamRoster` — array of player name strings for the **account** side. Both team names and logos appear in Matchup Band.

---

## Data dictionary

### Per roster record (`RosterDataItem`)

| Field | Required | Use |
| ----- | -------- | --- |
| `teamHome` | Yes | Matchup Band |
| `teamAway` | Yes | Matchup Band |
| `teamHomeLogo` | Optional | Home crest (URL string in payload) |
| `teamAwayLogo` | Optional | Away crest |
| `teamRoster` | Yes | Player Name Row[] |
| `isHomeTeam` | Yes | Which side is account team |
| `date` | Yes | Fixture Metadata Strip |
| `ground` | Yes | Fixture Metadata Strip |
| `round` | Yes | Fixture Metadata Strip |
| `gradeName` | Yes | Fixture Metadata Strip |
| `type` | Yes | Fixture Metadata Strip |
| `gender` | Yes | Fixture Metadata Strip |
| `ageGroup` | Yes | Fixture Metadata Strip |
| `gameId` | Optional | Hidden |

---

## Component entries

### Roster Module

**Purpose:** One fixture with named squad list.

**Repeating:** No — one per frame.

---

### Fixture Metadata Strip

**Primitive:** Metadata strip  
**Required data:** `date`, `ground`, `round`, `gradeName`, `type`

---

### Matchup Band

**Purpose:** Both teams for match context.

**Primitives:** Team crest, Team name, Versus label (optional)

**Club mode:** Subtle emphasis on account team (`isHomeTeam` determines which block).

---

### Roster Header

**Purpose:** Labels the player list (e.g. "Squad", team name, "Line-up").

**Required data:** Derived from account team name in `teamHome` / `teamAway`.

---

### Player Name Row

**Primitive:** Player name  
**Required data:** One string from `teamRoster[]`

**Repeating:** Yes — variable count (11–15+ typical).

**Layout:** Vertical list; equal row rhythm; compact state for long squads.

---

## Edge case catalogue

| Scenario | Response |
| -------- | -------- |
| Long player names | Truncate or wrap |
| 20+ players | Compact rows; scroll/paginate (engineering) |
| Missing opponent logo | Placeholder in Matchup Band |

---

## Approved style mapping (Stadium Signal)

| Component | Status |
| --------- | ------ |
| Fixture Metadata Strip | TBD |
| Matchup Band | TBD |
| Roster Header | TBD |
| Player Name Row | TBD |

---

## Implementation note

Reference only: `src/compositions/cricket/teamRoster/layout/RosterHeader/`, `layout/RosterPlayerList/`.

---

**Last updated:** 2026-08-02

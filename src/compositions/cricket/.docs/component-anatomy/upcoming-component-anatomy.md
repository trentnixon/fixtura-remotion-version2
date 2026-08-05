# Upcoming Fixtures — Component Anatomy

Design-first building blocks for the **Cricket Upcoming** composition. Shared frame components: `component-anatomy-overview.md`.

**Stitch brief:** `../stitch-briefs/upcoming-stitch-component-brief.md`  
**Design brief:** `../../upcoming/.docs/llm-brief/llm-brief-cricket-upcoming.md`  
**Sample payload:** `testData/samples/Cricket/Cricket_upcoming.json`

---

## Asset summary

| Attribute         | Value                                            |
| ----------------- | ------------------------------------------------ |
| **Artboard**      | 1080 × 1350 portrait                             |
| **Fixture cards** | Typically **2–3** per frame; equal visual weight |
| **Modes**         | Single mode                                      |

**Goal:** Each fixture reads as a small poster — who plays whom, when, where, grade context.

---

## Component tree

```text
Full Asset Frame
├── Asset Header                          (shared)
├── Upcoming Content Area
│   └── Fixture Card[]
│       ├── Fixture Metadata Strip
│       │   └── Metadata strip (primitive) — grade, type, round
│       ├── Home Team Block
│       │   ├── Team crest (primitive)
│       │   └── Team name (primitive)
│       ├── Fixture Centre
│       │   ├── Versus label (primitive)
│       │   ├── Metadata strip — date, time, ground
│       │   └── Optional type / round chips
│       ├── Away Team Block
│       │   ├── Team crest (primitive)
│       │   └── Team name (primitive)
│       └── Card Container                  (groups the above)
└── Asset Footer                          (shared)
```

---

## Data dictionary

### Per fixture (`GameData`)

| Field            | Required | Use                    |
| ---------------- | -------- | ---------------------- |
| `teamHome`       | Yes      | Home Team Block        |
| `teamAway`       | Yes      | Away Team Block        |
| `teamHomeLogo`   | Optional | Home crest             |
| `teamAwayLogo`   | Optional | Away crest             |
| `date`           | Yes      | Fixture Centre         |
| `time`           | Yes      | Fixture Centre         |
| `ground`         | Yes      | Fixture Centre         |
| `gradeName`      | Yes      | Fixture Metadata Strip |
| `type`           | Yes      | Metadata strip         |
| `round`          | Optional | Metadata strip         |
| `gender`         | Optional | Metadata strip         |
| `ageGroup`       | Optional | Metadata strip         |
| `assignSponsors` | Optional | Asset Footer           |
| `prompt`         | Optional | Hidden                 |
| `gameID`         | Optional | Hidden                 |

---

## Component entries

### Fixture Card

**Purpose:** One upcoming match as a self-contained poster module.

**Repeating:** Yes — 2–3 typical; equal height and gap.

**Layout:** Vertical or horizontal team layout; **mirrored** home and away; VS in centre column.

**Hierarchy:** Team names and crests first; date/time and ground clear; grade framing without overpowering match-up.

---

### Fixture Metadata Strip

**Primitive:** Metadata strip  
**Purpose:** Grade and competition context for the card.

**Required data:** `gradeName`; optional `type`, `round`, `gender`, `ageGroup`

---

### Home / Away Team Block

**Primitives:** Team crest, Team name  
**Required data:** Team name; logo (nullable)

**Layout:** Balanced with opposite side.

---

### Fixture Centre

**Purpose:** VS divider and when/where meta between teams.

**Primitives:** Versus label, Metadata strip

**Required data:** `date`, `time`, `ground`

**Edge cases:** Long ground string — truncate or two lines; narrow VS column.

---

## Edge case catalogue

| Scenario        | Response                                   |
| --------------- | ------------------------------------------ |
| Both logos null | Placeholder both sides                     |
| Null `round`    | Omit round chip                            |
| 4+ fixtures     | Engineering paginates; design compact card |

---

## Approved style mapping (Stadium Signal)

| Component              | Status |
| ---------------------- | ------ |
| Fixture Card           | TBD    |
| Fixture Metadata Strip | TBD    |
| Home / Away Team Block | TBD    |
| Fixture Centre         | TBD    |
| Versus label           | TBD    |

---

## Implementation note

Reference only: `src/compositions/cricket/upcoming/layout/Card/`, `controller/GamesDisplay/`.

---

**Last updated:** 2026-08-02

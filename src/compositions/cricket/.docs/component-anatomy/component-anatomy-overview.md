# Component Anatomy — Overview

Design-first reference for the building blocks that make up Fixtura cricket assets. Primary audience: **Stitch** (component design). Secondary audience: **implementation** (Remotion assembly).

This document defines **shared layers**, **shared primitives**, and **how anatomy documents relate to Stitch briefs**. It does not define visual style (see approved style documents) or Remotion implementation (see how-to guides and architecture skills).

---

## Document stack

```text
Asset purpose           →  llm-brief/              (what the graphic must communicate)
Component anatomy       →  component-anatomy/      (what building blocks exist)
Stitch component brief  →  stitch-briefs/          (one focused brief per asset family)
Visual style            →  style documents       (how blocks look — e.g. Stadium Signal)
Remotion implementation →  how-to, skills, code   (how blocks are built and assembled)
```

**Workflow**

1. Read **llm-brief** for asset communication goals.
2. Read **component anatomy** for the abstract component tree and data.
3. Brief **Stitch** using **one** `stitch-briefs/*-stitch-component-brief.md` at a time.
4. Apply **Stadium Signal** (or approved style) to each component family.
5. **Remotion** assembles, sizes, truncates, and automates.

**Key rule:** Extend documentation across all assets, but **brief Stitch on one asset family at a time**. Do not combine ladder rows, result cards, and performer rows in a single Stitch prompt — components will blend into a confused design system.

**Results establishes the Stadium Signal foundation.** Later asset briefs extend the same visual language; they do not redefine shared primitives.

---

## Folder structure

```text
src/compositions/cricket/.docs/
├── component-anatomy/
│   ├── component-anatomy-overview.md      ← shared layers and primitives (this file)
│   ├── results-component-anatomy.md
│   ├── ladder-component-anatomy.md
│   ├── top-performers-component-anatomy.md
│   ├── performances-component-anatomy.md
│   ├── upcoming-component-anatomy.md
│   ├── team-roster-component-anatomy.md
│   ├── team-of-the-week-component-anatomy.md
│   └── result-single-component-anatomy.md
└── stitch-briefs/
    ├── results-stitch-component-brief.md
    ├── ladder-stitch-component-brief.md
    ├── top-performers-stitch-component-brief.md
    ├── performances-stitch-component-brief.md
    ├── upcoming-stitch-component-brief.md
    ├── team-roster-stitch-component-brief.md
    ├── team-of-the-week-stitch-component-brief.md
    └── result-single-stitch-component-brief.md
```

### Recommended order

| Priority | Anatomy | Stitch brief | Notes |
| -------- | ------- | ------------ | ----- |
| 1 | Results | `results-stitch-component-brief.md` | Stadium Signal foundation |
| 2 | Ladder | `ladder-stitch-component-brief.md` | |
| 3 | Top Performers (Top 5) | `top-performers-stitch-component-brief.md` | |
| 4 | Upcoming Fixtures | `upcoming-stitch-component-brief.md` | |
| 5 | Performances | `performances-stitch-component-brief.md` | |
| 6 | Team Roster | `team-roster-stitch-component-brief.md` | |
| 7 | Team of the Week | `team-of-the-week-stitch-component-brief.md` | |
| 8 | Single Result | `result-single-stitch-component-brief.md` | |

---

## Asset definition

An **asset** is the complete exported graphic frame (e.g. **1080 × 1350** portrait).

```text
Full Asset Frame
├── Asset Header              (organisation / competition identity)
├── Composition Content Area  (sport-specific content — unique per anatomy file)
└── Asset Footer              (organisation identity + sponsor identity)
```

### Layer responsibilities

| Layer | Purpose | Defined in |
| ----- | ------- | ---------- |
| **Asset Header** | Organisation or competition identity at frame top | This overview (shared) |
| **Composition Content Area** | Sport-specific modules unique to each asset type | Per-composition anatomy file |
| **Asset Footer** | Organisation mark and sponsor lockups | This overview (shared) |

### Terminology (disambiguation)

| Term | Meaning | Not to be confused with |
| ---- | ------- | ------------------------- |
| **Asset Header** | Org logo, competition title at frame top | Ladder Metadata, Match Metadata, Category Header |
| **Composition Content Area** | Region between header and footer | A single repeating module |
| **Metadata Strip** | Compact fixture or grade context inside content | Asset Header |

---

## Shared frame components

These appear across **all** cricket assets. Defined once here; **not** redefined in per-asset anatomy files except where composition-specific behaviour applies.

### Asset Header

**Purpose:** Identifies the producing organisation or competition at the top of the frame.

**Children:** Organisation Identity, primary title line, optional secondary context line.

**Required data:** Organisation name; organisation logo (nullable).

**States:** Missing logo; long organisation name; suppressed secondary line (automation).

### Asset Footer

**Purpose:** Organisation identity and sponsor lockups at the bottom of the frame.

**Children:** Organisation Identity (optional repeat), Sponsor Identity (0–N).

**Required data:** None — may be minimal.

**Optional data:** `assignSponsors` (competition, grade, team groups).

### Organisation Identity

**Purpose:** Club or association mark and/or name in header or footer.

**Primitives used:** Organisation mark (shared primitive).

### Sponsor Identity

**Purpose:** One sponsor logo (and optionally name) in the footer strip.

**Primitives used:** Sponsor lockup (shared primitive).

---

## Shared visual primitives

Style documents map tokens to these primitives. Per-asset anatomy files **reference** primitives by name; they do not redefine them.

| Primitive | Purpose | Typical data |
| --------- | ------- | ------------ |
| **Organisation mark** | Club or association logo in header/footer | Logo URL (nullable) |
| **Team crest** | Team identity in rows, bands, cards | Logo URL (nullable) |
| **Team name** | Readable team name label | Team name string |
| **Score numeral** | Primary innings or points total | Score string |
| **Overs label** | Overs bowled / faced context | Overs string (nullable) |
| **Player name** | Player identity in rows and stat blocks | Player name string |
| **Stat cell** | Single numeric or short text stat | Runs, wickets, SR, P, W, PTS, etc. |
| **Rank index** | Position in ordered list | Rank number or string |
| **Metadata strip** | Compact horizontal context (date, round, ground, grade) | Metadata fields |
| **Sponsor lockup** | Sponsor logo in footer or edge | Logo URL + name |
| **Result line** | Match outcome sentence | `result`, `resultShort` |
| **Status label** | Match state when distinct from result | `status` |
| **Placeholder crest** | Fallback when logo is missing | Monogram or neutral shape |
| **Versus label** | Fixture divider (VS, v) | None — glyph only |
| **Section label** | Quiet label for grouped region | Grade, category, team name |

Primitives are **styled once** in Stadium Signal. Each asset Stitch brief applies those styles to composition-specific components.

---

## Per-asset anatomy scope

Each `*-component-anatomy.md` file defines **only** what is unique inside the Composition Content Area:

| Asset | Unique composition tree (summary) |
| ----- | --------------------------------- |
| **Results** | Match Module[] with team/score, result, performance summary |
| **Ladder** | Ladder Metadata, Column Header, Ladder Row[], Highlight State |
| **Top Performers** | Category Header, Ranked Player Row[] |
| **Performances** | Period Header, Performance Row[] (variable N) |
| **Upcoming** | Fixture Card[] with VS centre meta |
| **Team Roster** | Fixture Context, Lineup List, opponent context |
| **Team of the Week** | Selection Row[] with role, stats, club identity |
| **Result Single** | One expanded Match Module (same parts as Results, single fixture) |

---

## Sizing philosophy

Anatomy documents describe **proportional responsibility**, not pixel values.

| Region | Typical proportion (guide only) |
| ------ | ------------------------------- |
| Asset Header | ~20–25% of frame height |
| Composition Content Area | ~60–70% of frame height |
| Asset Footer | ~8–12% of frame height |

**Remotion** calculates final dimensions from theme tokens, item count, and content length. Designers specify hierarchy and minimum readable size; engineering handles fit and truncation.

---

## Composition modes

Some assets support **visibility modes** (e.g. association vs club) in a single anatomy file via a **mode matrix**. Modes are not separate anatomy or Stitch files.

---

## Component entry format

Each component in a composition anatomy file uses:

- Name, Layer, Purpose, Parent, Children
- Required / optional data
- Repeating behaviour
- Layout responsibility, content hierarchy
- States and edge cases, design flexibility, automation constraints
- Approved style mapping (Stadium Signal — fill when approved)

Animation, export wiring, and React file names are **out of scope**.

---

## Global automation constraints

| Constraint | Design implication |
| ---------- | ------------------ |
| **Nullable logos** | Always design a **missing crest** state |
| **Variable row counts** | Design default + compact; not fixed grids |
| **Long names** | Truncation or wrap |
| **Mode switching** | Club mode may hide opponent stats but keep opponent visible in team band |
| **Winner / rank** | Do not rely on colour alone |

---

## Stitch briefing rule

When briefing Stitch:

1. Open **one** `stitch-briefs/*-stitch-component-brief.md` only.
2. Read the matching `*-component-anatomy.md` and this overview for shared primitives.
3. **Do not** design a complete assembled multi-module frame unless the brief explicitly asks for a **wireframe with placeholder slots**.
4. **Do** design each component and required edge-case states on separate artboards.
5. **Extend** Stadium Signal from Results — do not invent a parallel visual language per asset.

---

## Implementation note

Remotion code is **structural reference only**. When anatomy and code diverge, anatomy wins for new design work.

---

## Related documents

| Document | Path |
| -------- | ---- |
| Cricket compositions agent brief | `src/compositions/cricket/.llm/agent.md` |
| Stitch briefs (per asset) | `../stitch-briefs/` |
| Per-asset anatomy | `component-anatomy/*-component-anatomy.md` |
| Per-asset design briefs | `src/compositions/cricket/*/.docs/llm-brief/` |

---

**Last updated:** 2026-08-02

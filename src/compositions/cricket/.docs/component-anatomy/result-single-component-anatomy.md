# Single Result — Component Anatomy

Design-first building blocks for the **Cricket Result Single** composition. One match fills the frame with **expanded** room for stats compared to multi-match Results.

Shared frame components and most match-module parts align with `results-component-anatomy.md`. This document defines **only deltas**.

**Stitch brief:** `../stitch-briefs/result-single-stitch-component-brief.md`  
**Design brief:** `../../resultSingle/.docs/llm-brief/llm-brief-cricket-result-single.md`  
**Sample payload:** `testData/samples/Cricket/Cricket_WeekendResultsSingle.json`

---

## Asset summary

| Attribute         | Value                                                      |
| ----------------- | ---------------------------------------------------------- |
| **Artboard**      | 1080 × 1350 portrait                                       |
| **Match modules** | **Exactly 1** per frame                                    |
| **Modes**         | Association (both teams' stats) and Club (club stats only) |

**Goal:** Outcome and scores immediately; **both teams' player contributions** as the hero depth block.

---

## Component tree

```text
Full Asset Frame
├── Asset Header                          (shared)
├── Result Single Content Area
│   └── Match Module                      (single — expanded)
│       ├── Result Statement                (often higher in stack)
│       ├── Match Status                    (optional)
│       ├── Team and Score Area
│       │   ├── Team Identity × 2
│       │   ├── Score Display × 2
│       │   └── Versus / Divider            (optional)
│       ├── Performance Summary           (hero — more rows than multi-match)
│       │   ├── Team Group Label
│       │   ├── Batting Leader Row[]
│       │   └── Bowling Leader Row[]
│       └── Match Metadata
└── Asset Footer                          (shared)
```

---

## Mode matrix

Same rules as **Results** — see `results-component-anatomy.md` mode matrix.

| Delta                   | Single Result                                   |
| ----------------------- | ----------------------------------------------- |
| **Match Module count**  | 1 — uses full content area height               |
| **Performance Summary** | Hero block — more visible rows; less truncation |
| **Vertical order**      | Result / status may sit **above** team band     |
| **Match Metadata**      | Often quieter / lower in stack                  |

---

## Shared components

These components are **identical** to Results anatomy — refer to `results-component-anatomy.md` for full entries:

- Match Metadata
- Team and Score Area / Team Identity / Score Display
- Versus / Divider
- Result Statement
- Match Status
- Performance Summary / Team Group Label / Batting Leader Row / Bowling Leader Row

**Data dictionary:** Same as `MatchResult` in `results-component-anatomy.md`.

---

## Single-result deltas

### Expanded Match Module

**Purpose:** One fixture consuming the full Composition Content Area.

**Layout responsibility:**

- Performance Summary receives **~50–60%** of module height (guide)
- Team and Score Area **~25–35%**
- Result Statement + Match Metadata **~10–15%**

**Automation:** More stat rows visible than compact multi-match Results card.

---

### Hero Performance Summary

**Purpose:** Dual-team stats as the primary depth block.

**Design:** Room for **more Batting/Bowling Leader Rows** before truncation; optional wider columns (fours, sixes, economy).

**Association:** Both teams' batting and bowling with clear Team Group Labels.

**Club:** Club team stats only; opponent in Team and Score Area only.

---

## Edge case catalogue

Inherits Results edge cases. Additional:

| Scenario                  | Response                                      |
| ------------------------- | --------------------------------------------- |
| Very large stat lists     | Still may truncate — design compact row early |
| Single module full height | Do not design as half-height card             |

---

## Approved style mapping (Stadium Signal)

Extend Results components. Document deltas:

| Component                | Status |
| ------------------------ | ------ |
| Expanded Match Module    | TBD    |
| Hero Performance Summary | TBD    |

---

## Implementation note

Reference only: `src/compositions/cricket/resultSingle/layout/MatchCard/`, `controller/ResultSingleDisplay/`.

Reuse Results section components where possible.

---

**Last updated:** 2026-08-02

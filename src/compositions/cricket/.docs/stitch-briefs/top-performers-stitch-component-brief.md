# Stitch Brief — Top Performers (Top 5) Components

**Asset family:** Cricket Top 5 Batting / Cricket Top 5 Bowling  
**Priority:** 3 — extend Stadium Signal from Results  
**Do not combine** with Ladder, Results, or Performances in the same session.

---

## Read first

| Document | Path |
| -------- | ---- |
| Shared primitives | `../component-anatomy/component-anatomy-overview.md` |
| Component anatomy | `../component-anatomy/top-performers-component-anatomy.md` |
| Design brief | `../../top5/.docs/llm-brief/llm-brief-cricket-top5.md` |
| Sample data | `Cricket_Top5Batters.json`, `Cricket_Top5Bowlers.json` |

---

## Your task

Design **Top 5 leaderboard row components** for batting **and** bowling disciplines.

---

## Do NOT deliver

- Full Top 5 assembled graphic with real players
- Ladder table or Results match card
- Mixed batting+bowling on one artboard

---

## DO deliver

### Shared

- [ ] Category Header (+ batting title, + bowling title variants)
- [ ] Ranked Player Row — default
- [ ] Ranked Player Row — **rank 1 featured** state
- [ ] Ranked Player Row — compact (if needed)
- [ ] Player Identity (+ missing logo)
- [ ] Team Context (`playedFor`)

### Batting discipline

- [ ] Primary Performance Stat — batting (runs hero, balls suffix, SR subline, **notOut** indicator)

### Bowling discipline

- [ ] Primary Performance Stat — bowling (wickets/runs hero, overs suffix, decimal overs)

### Wireframe

- [ ] Leaderboard shell — header + 3 placeholder rows

---

## Hierarchy

Pick one hero per brief: **player name** OR **score numerals** — document choice.

Rank 1 row may use stronger surface treatment.

---

## Visual language

Reuse crest well and stat numeral treatments from Results where applicable. Row rhythm should differ from Ladder (player-centric, not team standings).

---

**Last updated:** 2026-08-02

# Stitch Brief — Team of the Week Components

**Asset family:** Cricket Team of the Week  
**Priority:** 7 — extend Stadium Signal  
**Do not combine** with Top Performers or Results in the same session.

---

## Read first

| Document          | Path                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------- |
| Shared primitives | `../component-anatomy/component-anatomy-overview.md`                                    |
| Component anatomy | `../component-anatomy/team-of-the-week-component-anatomy.md`                            |
| Design brief      | `../../TeamOfTheWeek/.docs/llm-brief/llm-brief-cricket-team-of-the-week.md`             |
| Association mode  | `../../TeamOfTheWeek/.docs/llm-brief/llm-brief-cricket-team-of-the-week-association.md` |
| Club mode         | `../../TeamOfTheWeek/.docs/llm-brief/llm-brief-cricket-team-of-the-week-club.md`        |
| Sample data       | `testData/samples/Cricket/Cricket_TeamOfTheWeek.json`                                   |

---

## Your task

Design **selection row components** — honoured players with role, stats, and club identity.

---

## Do NOT deliver

- Full 11-pick grid with real players
- Generic Top 5 row (different data model — category/achievement labels required)

---

## DO deliver

- [ ] Page Title (optional)
- [ ] Role / Achievement Label — examples: top run-scorer, most wickets, all-rounder, wicket-keeper, twelfth man
- [ ] Selection Row — default (association: club mark visible)
- [ ] Selection Row — **club mode** (de-emphasised repeated club logo)
- [ ] Club Identity block
- [ ] Stat Block — batter
- [ ] Stat Block — bowler
- [ ] Stat Block — all-rounder (batting + bowling + combined)
- [ ] Stat Block — wicket-keeper (fielding)
- [ ] Stat Block — twelfth man (sparse)
- [ ] Ranking Annotation (quiet secondary)
- [ ] Compact Selection Row (10+ picks)
- [ ] Grid or list **wireframe** — 4 placeholder rows

---

## Mode

Association: every row needs distinct **club mark**.  
Club: shared brand — avoid same logo on every row.

---

## Visual language

Reuse Player name, Stat cell, Organisation mark from prior passes. Role/Achievement Label is **new** — design consistent iconography or chip system across categories.

---

**Last updated:** 2026-08-02

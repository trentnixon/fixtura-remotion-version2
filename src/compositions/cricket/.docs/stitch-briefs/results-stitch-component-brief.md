# Stitch Brief — Weekend Results Components

**Asset family:** Cricket Results (multi-match weekend results)  
**Priority:** 1 — establishes Stadium Signal foundation for all cricket assets  
**Do not combine** with other asset families in the same Stitch session.

---

## Read first

| Document | Path |
| -------- | ---- |
| Shared primitives and frame | `../component-anatomy/component-anatomy-overview.md` |
| Full component anatomy | `../component-anatomy/results-component-anatomy.md` |
| Asset communication goals | `../../results/.docs/llm-brief/llm-brief-cricket-results-association.md` |
| Club mode differences | `../../results/.docs/llm-brief/llm-brief-cricket-results-club.md` |
| Sample data | `testData/samples/Cricket/Cricket_Results.json` |

---

## Your task

Design the **Results component family** for Stadium Signal. You are **not** designing a finished multi-match graphic.

**Stitch designs:** named components + required states + spatial relationships between parts.  
**Remotion owns:** stacking two match modules, equal heights, truncation, pagination.

---

## Do NOT deliver

- A complete assembled 1080×1350 graphic with real fixture data
- Ladder rows, Top 5 rows, upcoming cards, or any non-Results components
- Animation or motion specs
- Pixel-perfect multi-match layout solving

---

## DO deliver

One artboard per component (or tight logical group) at 1080×1350 **proportional context**:

### Shared frame (if not already approved from a prior pass)

- [ ] Asset Header (+ missing logo, long org name)
- [ ] Asset Footer (+ 0 sponsors, 2–4 sponsors)
- [ ] Organisation Identity
- [ ] Sponsor Identity

### Results-specific

- [ ] Match Metadata
- [ ] Team Identity (+ missing crest, long name, club emphasis state)
- [ ] Score Display (+ no overs, unusual score string)
- [ ] Versus / Divider — **optional**; note if omitted for Results
- [ ] Result Statement (+ tie, draw, abandoned, no result, long margin)
- [ ] Match Status (+ redundant Final hidden note)
- [ ] Batting Leader Row (+ notOut, compact)
- [ ] Bowling Leader Row (+ fractional overs, compact)
- [ ] Team Group Label
- [ ] Performance Summary — layout shell (batting/bowling grouping)
- [ ] Match Module **wireframe** — labelled placeholder slots only, not real data

---

## Mode

Design **association mode** first (both teams' stats). Annotate **club mode** differences on relevant artboards:

- Performance Summary: club team only
- Team Identity: subtle club emphasis in team band

See mode matrix in `results-component-anatomy.md`.

---

## Visual language

- This is the **foundation** pass — define Stadium Signal tokens for Results components
- Later assets (Ladder, Top Performers, etc.) **extend** this language — do not fork a new system
- Reuse shared primitives from the overview (Team crest, Score numeral, Stat cell, Metadata strip, etc.)

---

## Hierarchy reminder

1. Scores + Result Statement  
2. Performance Summary  
3. Match Metadata  
4. Sponsors (quietest)

---

## Checklist before handoff

- [ ] Every component has a default state
- [ ] Nullable logos have placeholder crest state
- [ ] Winner not communicated by colour alone
- [ ] Result Statement supports 1–2 lines
- [ ] No VS divider unless deliberately included in Results style

---

**Last updated:** 2026-08-02

# Cricket Team Roster — club account (static)

**Audience** — Club-branded **match-day squad** graphics: the **account club’s lineup** is the star; the **opponent** is **context** (still named and logo’d, but visually secondary). For a design LLM: **one portrait static**. No motion or build detail.

**Goal** — **Players first**—easy to scan the **named squad**—while the **fixture** and **opponent** remain honest and readable. Brand-neutral unless the brief says otherwise.

**Artboard** — e.g. **1080×1350** portrait; other sizes OK.

**Data reality** — Same as the association brief: **`teamRoster`** lists **only the account side’s** players; **`teamHome` / `teamAway`** and **`isHomeTeam`** determine labels and logos. **No opponent player list** in the data.

**Layout (all optional)** — Favour **width and prominence** for the **name list**; place **account team** logo/name **near the list** or as a **strong header**; **VS + opponent** **smaller** or in a **compact strip** (still legible). **Date, ground, grade, round** as supporting meta. **Flexible** stacking.

**Design guidance**

- **Hierarchy** — **Player names** largest or densest readable block; **account** club mark strong; **opponent** clearly present but **lighter** (scale, opacity, or position).
- **VS** — Keep the **match-up** obvious without **equal weight** to the association layout.
- **Names** — Same handling as association brief for length, caps, captain/VC markers.
- **Sponsors** — Optional; quieter than squad.
- **Safe area** — Inset from edges.

**Data fields** — Same checklist as `llm-brief-cricket-team-roster-association.md`.

**Sample payload** — `testData/samples/Cricket/Cricket_Roster.json`

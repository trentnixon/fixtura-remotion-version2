# Cricket Team Roster — LLM design briefs (index)

Two static one-page briefs for design LLMs (no motion or implementation):

- **Association / neutral** — file `llm-brief-cricket-team-roster-association.md` — **Balanced** home vs away presentation; fixture context and **named lineup** for the rostered side.
- **Club account** — file `llm-brief-cricket-team-roster-club.md` — **Club / account team** and **player list** lead; opponent **supporting**.

Shared: portrait artboard (e.g. 1080×1350), **one match (one roster record) per static** is typical; payload has **one** `teamRoster` (player names) for the **account** side, plus **both** team names and logos. Sample: `testData/samples/Cricket/Cricket_Roster.json`.

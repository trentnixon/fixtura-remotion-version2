# Sponsors payload v2 — Remotion adoption

Status: ready-for-agent

Related: `.comms/handoff/remotion-handoff-sponsors-payload-v2.md`

---

## Problem Statement

Scheduler now ships a v2 sponsors contract on composition JSON (account `primary` / `general` / `sponsorNum`, per-row `primaryForScreen` and entity `assignSponsors`). Remotion still reads the legacy shape (`sponsors.default` keyed maps, account primary merged into footers, fat sponsor DTOs) and does not implement dual placement or the outro sequence product wants. Local sample assets are still legacy, so Studio and renders do not match production.

## Solution

Hard-cut Remotion to the v2 contract only (no legacy fallback). Update types, shared footer selection, shared outros, intros, and local fixtures so:

- Content screens show up to five logos: entities selected first, then fill from `primaryForScreen`, painted primaries-then-entities.
- Results and Upcoming collect entity sponsors from every row on the screen; other compositions use that item’s entity only.
- The shared outro lists all account primaries then all generals, chunked by six, gated/timed via `sponsorNum` / `includeSponsors`.
- Intros show account primaries only (up to four).

## User Stories

1. As a composition consumer, I want Remotion to read only the v2 sponsor fields, so that renders match what Scheduler sends.
2. As a composition consumer, I want legacy `default` / fat DTO fields ignored and removed from types, so that we never accidentally depend on dead fields.
3. As a Club account viewer, I want entity logos to come from `assignSponsors.team`, so that team sponsors appear on the right screens.
4. As an Association account viewer, I want entity logos to come from `assignSponsors.grade`, so that grade sponsors appear on the right screens.
5. As a viewer of a single content row, I want `primaryForScreen` used for account primaries, so that Scheduler’s entity-wins dedupe is respected.
6. As a viewer of a Results screen with multiple matches, I want entity sponsors collected from all rows on that screen, so that every matched grade/team sponsor can appear.
7. As a viewer of an Upcoming screen with multiple fixtures, I want the same multi-row entity collection as Results, so that behaviour is consistent across fixture-style assets.
8. As a viewer of Ladder / Performances / Top5 / similar, I want that item’s entity only (not multi-row union), so that collection rules match the composition shape.
9. As a viewer, I want the footer capped at five logos, so that layout stays readable.
10. As a viewer, I want entity logos to claim footer slots before primaries, so that assigned sponsors are not crowded out by account primaries.
11. As a viewer, when entities alone exceed five, I want only entities (capped at five) and no primaries, so that assigned sponsors win.
12. As a viewer, when entities leave spare slots, I want those filled from the first row’s `primaryForScreen`, so that remaining slots stay stable and predictable.
13. As a viewer, I want logos painted left-to-right as primaries then entities, so that the account strip reads as stable and the assigned logos read as screen-specific.
14. As a viewer, when there is no entity match, I still want primaries shown, so that empty assign arrays are not treated as an error.
15. As a product owner, I want Remotion to assume Creator already removed duplicate sponsor ids, so that Remotion does not invent a second dedupe policy.
16. As a viewer of any asset’s outro, I want to see all account primaries then all generals in one sequence, so that both buckets are thanked in order.
17. As a viewer of the outro, I want logos grouped into pages of six, so that timing and layout stay familiar.
18. As a pipeline owner, I want outro presence and duration driven by `sponsorNum` / `includeSponsors`, so that Scheduler remains the timing source of truth (with permission to revisit later if wrong).
19. As a viewer of an intro, I want up to four account primary logos and no general/entity logos, so that the open is primary-branded only.
20. As a template maintainer, I want one shared footer selection policy reused across variants, so that Classic / CNSW / BroadcastPro / etc. do not diverge.
21. As a template maintainer, I want all shared outro variants updated together, so that every template’s end card uses v2.
22. As a developer in Studio, I want local cricket (and other) sample JSON updated to v2, so that previews are not stuck on legacy sponsors.
23. As a type consumer, I want `AssignSponsors.team` / `grade` / `competition` typed as sponsor DTOs, so that we stop modelling team as home/away logo objects.
24. As a type consumer, I want the slim sponsor DTO (`id`, `name`, `logo.id`, `logo.url`) as the guaranteed shape, so that optional CMS-era fields are not required.
25. As a Layout/outro gate, I want “has sponsors” derived from v2 presence (`sponsorNum` / `includeSponsors` / non-empty primary|general), not from truthy legacy `default` objects, so that empty arrays do not falsely enable outros.
26. As an implementer, I want multi-row merge helpers that overwrite entire assign buckets replaced by explicit collect/select helpers, so that later rows cannot silently wipe earlier entity arrays.
27. As a future agent, I want this behaviour encoded in a ready-for-agent spec, so that implementation can proceed without re-grilling.

## Implementation Decisions

### Contract cutover

- Hard-cut to Scheduler sponsors payload v2 only. No adapter reading legacy `sponsors.default` keyed maps.
- Local `testData` sample assets must be updated in the same effort so Studio/CI exercise v2.
- Guaranteed sponsor DTO:

```ts
{
  id: number;
  name: string;
  logo: {
    id: number;
    url: string;
  }
}
```

- Account sponsors shape:

```ts
{
  primary: Sponsor[];
  general: Sponsor[];
  sponsorNum: number; // primary.length + general.length upstream
}
```

- Per content row: `primaryForScreen: Sponsor[]` and `assignSponsors: { competition; grade; team }` as sponsor arrays.
- Prefer existing `video.metadata.includeSponsors` where the dataset already exposes it; also honour account `sponsorNum` for gating/timing alignment with the handoff. Revisit outro frame math later if production timings disagree.

### Domain terms (use consistently)

- **Primary** — account-level primaries; on content screens via `primaryForScreen`.
- **General** — account-level outro/group sequence (replaces legacy **default**).
- **Entity** — row-scoped sponsors from `assignSponsors.grade` (Association) or `.team` (Club).
- **Dual placement** — primaries and entity in one footer with separate roles; not a naive merge of all buckets into one unordered list.

### Footer selection (shared policy)

Single selection algorithm (ideal pure module seam — see Testing Decisions):

1. Collect entity sponsors:
   - Results + Upcoming: from every row currently on the screen (`grade` and `team` arrays as provided).
   - Other compositions (Ladder, Performances, Top5, Team of the Week, etc.): from that item’s `assignSponsors` only.
2. Assume upstream uniqueness; Remotion still enforces a hard max of **5** logos.
3. **Build slots:** entities claim slots first (cap 5). Remaining slots filled from the **first row’s** `primaryForScreen` (or the single item’s `primaryForScreen`). If entities alone are ≥ 5, drop all primaries.
4. If entities exceed 5, keep the first 5 in collection/row order; no primaries.
5. **Paint order:** primaries left, entities right (selection priority ≠ paint order).
6. Empty entity → show primaries only.

### Outro (shared across all assets)

- Build one list: `[...primary, ...general]`.
- Chunk into pages of 6 (existing grid pattern).
- Deduping is Creator/Scheduler’s responsibility.
- Gate/duration via `includeSponsors` / `sponsorNum` as available on the asset.

### Intro

- Show account `sponsors.primary` only, up to 4 logos (not general, not entity).

### Modules / surfaces to change

- Core sponsor types and any duplicate sponsor type aliases used by compositions/templates.
- Layout/outro gating that currently treats `sponsors.default` as presence.
- Shared sponsor footer used by cricket compositions (and callers that pass merged assign sponsors).
- Results and Upcoming display controllers: replace shallow `mergeAssignSponsors` with multi-row entity collection + first-row `primaryForScreen` feeding the shared selector.
- Other composition footers: pass single-item entity + `primaryForScreen` into the same selector.
- All template outro variants currently reading `sponsors.default`.
- Intro components that only show `primary[0]` — expand to up to four primaries.
- Helpers such as `hasSponsors` / extract-sponsor utilities still referencing `default`.
- Sample JSON under `testData` still shipping `default` maps without `general` / `primaryForScreen` / `sponsorNum`.

### Explicit non-goals inside implementation

- Do not re-implement Creator entity-wins dedupe beyond consuming `primaryForScreen`.
- Do not merge primary + general + entity into one footer list without the selection rules above.
- Do not require `competition` to be populated (reserved; usually empty).

## Testing Decisions

### Proposed seam (confirm before / during implement)

Prefer **one** pure selection/sequence module as the highest seam:

- Input: primary candidates (`primaryForScreen` or account primary), entity candidates (already collected), max slots (5), and for outro: account primary + general.
- Output: ordered sponsor lists for footer paint and for outro chunking.

UI components (SponsorFooter, outro grids, intros) should only render what that module returns. Avoid asserting on React markup or Remotion frames for the core rules.

**Please confirm this seam:** one pure sponsors selection/sequence helper (footer + outro builders), with displays/outros as thin consumers — not per-template duplicated logic and not snapshot tests of every variant.

### What good tests look like here

- Test external behaviour of the pure module only: given sponsor arrays, assert the ordered result (cap, entity-first selection, paint order, outro concatenation, chunk boundaries if chunking lives in the same module).
- Do not test private merge helpers’ implementation details once replaced.
- Fixtures: small inline sponsor DTO arrays; optionally one v2 sample asset smoke for “fields exist,” not full visual regression.

### Modules under test

- The new selection/sequence module (primary).
- Optionally: thin adapter that collects entities from Results/Upcoming rows (if kept separate from selection).

### Prior art

- No existing unit test suite for sponsors was found in-repo. If a runner is not already wired, either add the minimal harness the repo standardises on, or ship the pure module with deterministic manual Studio checklist cases documented in the implementation ticket. Prefer automated tests on the pure seam if a runner can be introduced cheaply; do not block the cutover solely on harness work.

### Manual verification checklist

- Results / Upcoming multi-row screen: entities from all rows, max 5, primaries then entities visually.
- Single-row Ladder/Performances/Top5: item entity + primaryForScreen, same cap/order.
- Empty entity: primaries only.
- Entities ≥ 5: entities only.
- Outro: primary then general, pages of 6; gated when `includeSponsors` / `sponsorNum` say so.
- Intro: up to 4 primaries.
- Updated sample JSON loads in Studio without reading `default`.

## Out of Scope

- Changing CMS or Scheduler allocation rules (already live for cricket paths).
- Redesigning footer/outro visual chrome beyond logo set and order (sizes, animations, grid chrome stay unless broken by count).
- Recomputing production outro durations beyond honouring existing `sponsorNum` / `includeSponsors` / `FPS_OUTRO` (explicit revisit later if wrong).
- Full visual redesign of intros beyond showing up to four primaries.
- Guaranteeing AFL/Netball production payloads are v2 beyond updating local samples and shared readers (Scheduler coverage called out per sport separately).
- Writing `CONTEXT.md` / ADRs unless requested in a follow-up.
- Legacy dual-read compatibility shims.

## Further Notes

- Locked product decisions from grilling (2026-08-21): hard-cut v2; outro primary→general chunk 6; footer max 5 entities-first selection with primaries-then-entities paint; Results/Upcoming multi-row entity collection; first-row `primaryForScreen` for fill; intro up to 4 primaries; Creator owns dedupe; `sponsorNum` timing accepted with later revisit.
- Handoff reference: `.comms/handoff/remotion-handoff-sponsors-payload-v2.md`.
- Assumption: when entities exceed five, Remotion keeps the first five in collection/row order.

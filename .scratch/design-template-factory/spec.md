# Design template factory (cricket)

Status: completed

---

## Problem Statement

Fixtura’s **design prototype** site supports iterating overlay layouts before Remotion work, but starting a **new template** (Registry ID) across **all cricket asset types** is slow and error-prone. There is no neutral, anatomy-authoritative starter set; registration, bindings, fixtures, and CSS must be wired by hand. Existing variants (Scoreline, Broadcast Pro) use legacy bootstrap and naming patterns that should not be forced onto new work.

Designers and implementers need to **name a template once**, **scaffold ten independently previewable cricket assets**, open any asset with **populated anatomy** from real fixtures, and **style one asset without accidentally changing others**. Exploration should not require Remotion files to exist. Verification should catch registration and wiring mistakes early. Handoff to Remotion remains a **separate, deliberate reconciliation** step—not continuous CSS sync with the design site.

## Solution

Introduce a **design template factory** for cricket:

1. **Design starters** under a dedicated templates tree (not in the sidebar manifest): ten assets derived from **component anatomy** and **fixtures**, reusing proven **population mechanics** from Scoreline where they match anatomy—not Scoreline visuals.
2. A **scaffold command** that takes human label, variant slug, and Registry ID; creates all ten registered prototype pages, hydration bind maps, copied neutral CSS, font registration (platform default pairing), and planned Remotion handoff paths—**never overwriting** an existing variant.
3. A **generic bootstrap** that runs scalar hydration, declared **population modules**, org palette variables, and fonts; **fails closed** on hydration errors while keeping navigation usable.
4. **Shared population modules** per cricket asset (and shared where batting/bowling split applies) that fill repeated DOM from fixture data via the page canvas root.
5. A **naming contract** linking variant slug, Registry ID, asset slug, composition target, and theme target (explicit theme filenames; runtime routing uses lowercased Registry ID).
6. **`design:verify`** with optional `--handoff`, plus variant/asset filters: explore mode validates prototype wiring; handoff mode additionally requires Remotion targets and routing to exist.
7. **Grandfather** Scoreline and Broadcast Pro; extend the existing handoff runbook with **ready for handoff** vs **handoff complete** milestones.

## User Stories

1. As a designer, I want to scaffold a new template with only a name, URL slug, and Registry ID, so that I can start exploring without manual file copying.
2. As a designer, I want all ten cricket asset tabs to exist immediately after scaffold, so that I can work on any asset type in any order.
3. As a designer, I want each asset to open at a direct URL with real fixture data, so that I do not depend on another asset being implemented first.
4. As a designer, I want populated anatomy on first open (not empty placeholders), so that I can judge layout density immediately.
5. As a designer, I want asset-specific CSS to affect only that asset’s page, so that ladder experiments do not change Results.
6. As a designer, I want template-wide CSS to apply deliberate family-wide decisions only, so that shared tokens are explicit.
7. As a designer, I want dev shell chrome to stay generic, so that I do not confuse sidebar styling with exportable graphics.
8. As a designer, I want hydration failures to show a clear error naming the asset and failed binding or fixture, so that I do not approve a partially fake layout.
9. As a designer, I want navigation and asset tabs to remain usable when one page fails hydration, so that I can switch to another asset to continue work.
10. As a designer, I want org primary and secondary colours from the fixture applied to the canvas, so that club branding is visible during exploration.
11. As a designer, I want default Outfit and Heebo fonts registered automatically for new templates, so that typography works without an upfront font decision.
12. As a developer, I want design starters to live outside registered variants, so that the sidebar lists only real template designs.
13. As a developer, I want starters to be validated independently of routes, so that the golden copy source stays trustworthy.
14. As a developer, I want anatomy docs and fixtures to be the authority for starter content, so that prototypes match composition information design.
15. As a developer, I want to reuse Scoreline bind paths and population logic where anatomy-aligned, so that I do not re-prove data mapping.
16. As a developer, I want scaffold to copy starter CSS into per-variant files, so that later starter changes do not mutate existing designs.
17. As a developer, I want scaffold to reject destination conflicts before writing, so that existing variants cannot be destroyed accidentally.
18. As a developer, I want planned Remotion theme paths recorded before theme files exist, so that handoff targets are documented during exploration.
19. As a developer, I want explore-phase verify to skip Remotion file existence, so that design-only work is not blocked.
20. As a developer, I want handoff-phase verify to require theme files, registry entries, and composition routing keys, so that implementation gaps are caught before claiming done.
21. As a developer, I want verify to support filtering by variant and asset, so that one asset can complete handoff independently.
22. As a developer, I want verify to enforce routes, HTML, bind maps, fixtures, and asset index correspondence, so that manifest drift is impossible to merge silently.
23. As a developer, I want verify to detect duplicate keys in bind JSON, so that silent JSON overwrite cannot hide mistakes.
24. As a developer, I want required scalar bindings to fail verify when missing, so that critical anatomy fields are enforced.
25. As a developer, I want optional anatomy to collapse without requiring bindings to absent data, so that sparse fixtures remain valid.
26. As a developer, I want population modules declared explicitly in the manifest, so that verify knows which shared script to expect.
27. As a developer, I want population overrides to be explicit only, so that accidental files do not change runtime behaviour.
28. As a developer, I want population modules to receive canvas root and fixture, so that they do not depend on whole-document side effects.
29. As a developer, I want orphan prototype pages under variants to fail verify, so that unregistered HTML cannot linger.
30. As a developer, I want underscore-prefixed folders inside variants to be treated like any other path (no silent exemption), so that registration rules stay strict.
31. As a product owner, I want Broadcast Pro to remain a single-page reference until an additive expand command exists, so that legacy reference behaviour is preserved.
32. As a product owner, I want Scoreline and Broadcast Pro unchanged by the factory, so that in-flight work is not destabilized.
33. As a implementer, I want a naming contract documenting slug vs Registry ID vs routing key, so that handoff agents do not conflate URL slug with Remotion routing.
34. As a implementer, I want batting and bowling performances as separate prototype pages and fixtures sharing one composition and theme target, so that independent editing matches Top 5 batting/bowling pattern.
35. As a implementer, I want theme filenames preserved explicitly (not derived mechanically from asset slugs), so that exceptions like resultSingle and teamOfTheWeek stay correct.
36. As a implementer, I want variant folder names derived by lowercasing the first character of Registry ID with optional override, so that planned paths match Remotion folder conventions.
37. As a designer, I want long-name, missing-logo, absent-sponsor, and sparse/dense cases exercisable before handoff, so that designs survive real club data.
38. As a implementer, I want handoff documentation to distinguish ready for handoff from handoff complete, so that milestones are not conflated.
39. As a implementer, I want handoff to require reconciliation notes and Studio comparison evidence, so that CSS copy alone is not treated as parity.
40. As a developer, I want glossary terms for design starter, population module, and explore vs handoff verify, so that agents use consistent vocabulary with CONTEXT.md.
41. As a developer, I want an ADR stating design-site CSS is authoritative during exploration and Remotion updates happen at handoff with reconciliation, so that future contributors do not enforce continuous dual-tree sync during experiments.

## Implementation Decisions

### Scope and grandfathering

- **In scope:** New cricket template scaffolding, design starters library, generic bootstrap, shared population modules, naming contract documentation, explore/handoff verify, glossary/ADR updates, handoff runbook milestone extension, README/getting-started shortcuts.
- **Grandfather:** Existing Scoreline and Broadcast Pro variants keep current bootstrap, CSS filenames, and page scripts; verify applies **compatibility rules** for legacy bootstrap rather than forcing generic init.
- **Broadcast Pro:** Document incomplete asset coverage in the asset index; do not auto-expand via scaffold overwrite.

### Canonical cricket assets (ten)

Register exactly: results; result-single; upcoming; ladder; top5-batting; top5-bowling; performances-batting; performances-bowling; team-roster; team-of-the-week. Tab labels include **Batting Performances** and **Bowling Performances** for the performances pair.

### Design starters authority

- Starters live outside registered variants; they do **not** appear in sidebar manifest.
- Content and reading order come from **component anatomy** and **fixtures**; starters do not supersede those sources.
- Mechanics (bind paths, population algorithms) may be extracted from Scoreline after stripping styling and layout assumptions.

### Scaffold command contract

- **Inputs:** label (required), variant slug (required), Registry ID (required); sport defaults to cricket (reject others clearly); optional variant folder override when default mapping is wrong.
- **Default variant folder mapping:** lowercase first character of Registry ID; store resolved mapping; reject conflicting overrides before write.
- **Outputs:** All ten assets registered together; HTML, binds, hydration paths, asset index rows, font catalog entry for variant (Outfit + Heebo).
- **CSS:** Copy neutral starter styles into non-empty per-variant shared and per-asset stylesheets; scope template-wide rules to variant canvas root; scope asset rules to that asset.
- **Safety:** Abort if variant slug or routes entry already exists; no partial writes after conflict detected.

### Bootstrap pipeline (new variants)

- Single shared initializer invoked from each page with context (variant slug, sport slug, asset slug).
- Order: scalar hydration first; on failure stop data-dependent steps and surface error; run declared population module when hydration succeeds; apply palette CSS variables to page canvas; apply variant fonts.
- Navigation chrome initializes regardless of hydration success.

### Population modules

- Shared modules under a cricket namespace; one module per asset or parameterized pair where batting/bowling share logic.
- Manifest declares module identity; optional override field is explicit only.
- Modules create or fill repeated nodes from fixture; they do not apply template styling or cross-asset layout.

### Bind maps

- Distinguish **required** scalar bindings from **optional** fields; optional absence must not throw during hydration or verify.
- Explore verify resolves required bindings against fixture and checks selectors exist in static HTML for scalars only.
- Repeated content is not proven by static selector checks; population module presence is verified separately.

### Manifest extensions

- Per variant: resolved Remotion variant folder, Registry ID, label.
- Per asset: label, fixture path, planned composition target, planned theme file path (explicit filename), declared population module reference.
- Legacy variants may declare legacy bootstrap profile for verify compatibility.

### CSS authority (exploration vs handoff)

- During exploration, editors change only design-site variant stylesheets (shared + per asset) plus starters when maintaining the library—not Remotion variant styles.
- Handoff copies or reimplements into Remotion with **reconciliation notes** and Studio comparison; not assumed parity from file copy.

### Verification command

- Single entry point with `--handoff` flag and optional variant/asset filters.
- **Explore:** manifest validation; bijection among routes, HTML, binds, asset index, fixtures; starter library validation (ten assets); orphan variant HTML detection; duplicate JSON key detection; required bind resolution; declared population module files exist; generic wiring rules for new scaffolds; planned path shape checks; exclusions: browser automation, CSS byte parity, Remotion file existence.
- **Handoff:** explore checks plus Remotion theme file existence, registry presence, composition routing key implementation for lowercased Registry ID.

### Documentation

- Naming contract operational doc (not CONTEXT.md tables).
- CONTEXT.md glossary updates: design prototype (explore + optional sign-off), design starter, variant slug, Registry ID, asset slug, population module, design handoff, explore/handoff verify.
- ADR for CSS authority and reconciliation at handoff.
- Extend existing Remotion handoff runbook with two milestones; do not add a competing checklist document.
- README mention: purpose, launch command, link to getting-started.

### Registry ID routing

- Runtime template routing uses **lowercased Registry ID**, never URL variant slug (critical for multi-word registry IDs).

## Testing Decisions

### What makes a good test here

- Test **observable contracts**: manifest validation, bind resolution against fixtures, verify exit codes and error messages, scaffold refusal on conflicts, required vs optional bind behaviour.
- Avoid asserting internal file layout beyond what verify exposes; prefer running the same validation functions the CLI uses.

### Primary seam (proposed)

- **One integration seam:** the **design verify command** (explore and handoff modes), implemented as a Node script that imports shared validation modules also exercised by unit tests.
- **Unit seam:** extend existing vitest coverage on manifest validation and hydrate-core (required/optional bind semantics, duplicate JSON parsing helper) — same modules the verify command calls, not duplicate logic.

Prior art: existing vitest tests on routes manifest and broadcast-pro results bind hydration against Cricket Results fixture.

**Confirm with maintainer:** primary acceptance testing is verify CLI + vitest on shared validators (not browser/e2e for v1).

### Modules tested

- Manifest validator and asset entry resolver.
- Bind map application and optional/required policy.
- Verify orchestrator (explore vs handoff rule sets).
- Scaffold dry-run or conflict detection (where feasible without writing files).
- Starter library validator (ten assets, binds, fixtures).

### Not tested in v1 factory work

- Visual pixel parity design vs Remotion.
- Playwright hydration in browser (optional later).
- Automatic verify on every git commit.

## Out of Scope

- Migrating Scoreline or Broadcast Pro to generic bootstrap or new CSS naming.
- `design:expand-variant` additive backfill (Broadcast Pro nine assets) — future command.
- Declarative repeat engine in hydrate-core.
- Stress fixture library and revision approval records.
- Asset lifecycle badges in UI (prototype / approved / parity-checked).
- Continuous synchronization of design-site CSS with Remotion during exploration.
- Remotion implementation of newly scaffolded templates (handoff is separate work).
- Non-cricket sports in scaffold (reject until explicitly designed).
- Commit hooks running verify automatically.

## Further Notes

- **Shared understanding** from design review sessions (scores ~80/100 on prior setup; factory addresses exploration velocity, not approval infrastructure).
- **Performances gap:** Scoreline registry currently lacks performances-batting/bowling pages; factory adds them for new templates; grandfather Scoreline unchanged until optional future expand/align.
- **Extract-scoreline-css script** is a migration utility, not ongoing sync; factory docs must not present it as maintenance sync.
- **Phase ordering suggestion:** naming contract + glossary/ADR → starters + population + generic init → scaffold → verify → docs/README/handoff runbook extension.
- **Issue tracker:** Implementation can be split into numbered issues under this feature directory after spec approval.

## Comments

<!-- Append conversation / agent notes below -->

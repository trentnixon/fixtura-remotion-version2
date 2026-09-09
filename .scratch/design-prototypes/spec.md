# Design prototype site

Status: ready-for-agent

---

## Problem Statement

Fixtura approves video layouts inside Remotion, which couples visual design to React composition code, runtime theme injection, frame-based animation, and data edge cases. Designers and implementers lack a dedicated place to prototype static 1080×1350 layouts, browse them by template and sport, hydrate realistic copy from shared fixtures, and hand off approved designs to Remotion without guessing which composition or theme keys to touch.

Existing stitch HTML lives inside template source trees, uses CDN Tailwind configs that can drift from the Remotion preset, and has no shared navigation, guide, or manifest linking prototypes to test fixtures and Remotion routes.

## Solution

Add a **dev-only design prototype site** at the repository root (outside application source) that:

1. Lands on a **guide** explaining the design system, frame contract, and how to add routes.
2. Organizes prototypes as **template → sport → asset type**, with asset tabs driven by a central manifest (only built assets appear).
3. **Hydrates key fields** from the same JSON fixtures Remotion Studio uses, without building a mini renderer.
4. Documents handoff from each prototype to the matching Remotion composition and template theme surface.
5. Migrates the Broadcast Pro Results reference from the legacy per-template stitch folder into the new site as the v1 golden asset.

The site is served from the repository root so fixtures remain fetchable without duplication or symlinks.

## User Stories

1. As a designer, I want a guide-first landing page, so that I know how to use the design system before viewing demos.
2. As a designer, I want static HTML prototypes at the exported frame size (1080×1350), so that I can approve layout density without opening Remotion Studio.
3. As a designer, I want a side navigation of templates that have prototypes, so that I am not distracted by empty template links.
4. As a designer, I want sport in the URL path, so that cricket and future sports stay separated clearly.
5. As a designer, I want asset-type tabs for the current template and sport, so that I can switch between Results, Ladder, and other families without losing context.
6. As a designer, I want tabs to appear only for assets that exist, so that the UI reflects what is actually built.
7. As a designer, I want realistic team names and scores from shared fixtures, so that prototypes feel like production content without manual copy-paste.
8. As a designer, I want CDN web fonts in prototypes for speed, so that I can iterate quickly before verifying in Remotion.
9. As a developer, I want one manifest listing variants, sports, assets, fixture paths, registry IDs, and Remotion handoff targets, so that navigation and hydration stay in sync.
10. As a developer, I want separate hydration bind maps per asset, so that HTML markup stays clean and JSON field mapping is centralized.
11. As a developer, I want a shared hydration loader, so that each asset page follows the same fetch-and-fill pattern.
12. As a developer, I want a shared tab bar driven by the manifest, so that adding an asset updates navigation in one place.
13. As a developer, I want handoff documented in both an asset index and HTML header comments, so that humans and agents know where to implement approved designs.
14. As a developer, I want the guide to link to component anatomy and stitch briefs without duplicating them, so that structural specs stay authoritative in one place.
15. As a developer, I want the guide to link to variant theme documentation, so that class-to-theme-key mapping remains discoverable after handoff.
16. As a developer, I want an npm script that serves the repository root on a fixed port, so that fixture fetch paths work predictably in local development.
17. As a developer, I want design prototypes excluded from the published npm package, so that consumers receive implementation artifacts only.
18. As a developer, I want legacy stitch HTML removed from template source after migration, so that there is a single source of truth for static references.
19. As an agent, I want a one-line handoff prompt format documented in the guide, so that "move this to a template" sessions start with unambiguous targets.
20. As a template author, I want the golden Results prototype under Broadcast Pro cricket, so that future assets can copy its structure and conventions.
21. As a maintainer, I want glossary terms for design prototype, asset type, and Fixtura template added when the site is scaffolded, so that domain language matches the rest of the repository.
22. As a designer, I want shared shell styling (side nav, canvas viewport), so that all prototypes feel like one design lab rather than isolated HTML files.
23. As a developer, I want kebab-case URL slugs and human-readable nav labels, so that URLs stay stable and readable in the UI.
24. As a developer, I want explicit mapping from design slug to template registry ID, so that handoff names align with Remotion template selection.
25. As a designer, I want HTML comments naming anatomy blocks (metadata strip, matchup band, etc.), so that structure maps cleanly to component anatomy documents.
26. As a developer, I want plain static HTML per asset (not a SPA), so that files remain easy to edit, diff, and open directly.
27. As a maintainer, I want folder-level documentation describing conventions, so that new contributors know where to add variants and assets.
28. As a developer, I want hydration limited to key display fields, so that v1 avoids truncation, fitting, and list-pagination logic.
29. As a designer, I want the guide to explain the header / content / footer frame zones, so that prototypes match exported asset anatomy.
30. As a developer, I want Broadcast Pro variant readMe references updated to point at the design site, so that documentation does not reference removed stitch paths.

## Implementation Decisions

### Domain terms (use consistently)

- **Design prototype** — static 1080×1350 HTML under the design site used to approve layout before Remotion implementation. _Avoid:_ stitch folder (as a path name).
- **Asset type** — a composition family within a sport (Results, Ladder, Top 5, etc.); appears as a tab in the design site. _Avoid:_ using "asset" alone when meaning the full exported frame.
- **Template** (Fixtura) — a visual style package registered in the template registry (e.g. Broadcast Pro). _Avoid:_ conflating with a single Remotion Composition or arbitrary `.tsx` file.

Add these three terms to the root domain glossary in the same change set that scaffolds the site.

### Site placement and packaging

- Root-level design site directory, sibling to shared fixtures and application source — not inside published package file lists.
- Dev-only; never included in npm package exports or `files` arrays.
- Remove legacy per-template stitch HTML from Broadcast Pro template source after migrating the Results reference.

### Information architecture

- Landing redirects or links to the guide (guide-first).
- Route shape: variant slug → sport → asset HTML page (multi-page, not SPA).
- URL slugs: kebab-case. Nav labels: human readable. Registry IDs: PascalCase in manifest.
- Side nav lists only variants present in the manifest.
- Asset tabs render only for assets that exist for the current variant and sport (manifest-driven, not filesystem scan).

### Central manifest

Single JSON manifest is the source of truth for:

- Which variants, sports, and assets exist
- Display labels
- Template registry ID per variant
- Relative fixture path per asset (from repo root)
- Remotion handoff targets (composition area and theme surface)

Tab bar and hydration loader both read this manifest. Do not duplicate fixture paths in bind maps.

### Shared client modules

- **Shell styles** — layout for side nav, header chrome, and scaled canvas viewport.
- **Frame styles** — 1080×1350 social canvas container.
- **Tab bar script** — reads manifest; highlights current asset; links sibling asset pages.
- **Hydration loader** — fetches manifest entry, loads fixture JSON, applies asset-specific bind map.
- **Bind maps** — per variant / sport / asset; map CSS selectors to JSON paths only.

### Golden asset (v1)

- Migrate Broadcast Pro **Results** stitch HTML into the new location as the sole demo asset.
- Rename logically (index-style results page becomes `results` asset slug).
- Add handoff header comment on the HTML file.
- Other stitch assets (ladder, upcoming, roster, etc.) are deferred — manifest and tabs must not imply they exist until added.

### Guide content

In-site guide covers:

- Frame contract (1080×1350; asset header, composition content area, asset footer)
- Tailwind utility vocabulary aligned with the Remotion tailwind preset (Teko, Rajdhani, shared utilities)
- Checklist for adding a variant, sport, or asset
- How manifest, hydration, and handoff work
- Handoff one-liner template for agent sessions
- Font note: CDN in design site; verify visual parity in Remotion Studio before sign-off

Guide links out (does not duplicate):

- Cricket component anatomy documents
- Stitch component briefs
- Broadcast Pro variant theme readMe (class and theme key mapping)

### Handoff artifacts

When an asset is approved for Remotion implementation:

1. HTML header comment with variant, sport, asset, registry ID, composition target, theme target, fixture path.
2. Row in human-readable asset index under design documentation.

No ADR for v1; conventions live in design folder readMe and guide.

### Dev server

- npm script runs static file server from **repository root** (not from inside the design folder alone).
- Fixed port (3456) documented in guide.
- Enables absolute fetch to shared fixture paths without symlinks or proxy configuration.
- Plain `serve` for v1; no Vite unless shared module complexity grows later.

### Tailwind in design vs Remotion

- Design pages use CDN Tailwind for fast iteration in v1.
- Remotion continues using the package tailwind preset and theme `componentStyles` as implementation source of truth after handoff.
- Optional follow-up: extend package CSS source scanning to design HTML — out of v1 scope.

### Typography and fonts

- CDN Google Fonts (Teko, Rajdhani) in design prototypes for v1.
- Guide documents that Remotion loads local font files from public assets.

### routes.json shape (decision-rich excerpt from grilling)

```json
{
  "variants": {
    "broadcast-pro": {
      "label": "Broadcast Pro",
      "registryId": "BroadcastPro",
      "sports": {
        "cricket": {
          "assets": {
            "results": {
              "label": "Results",
              "fixture": "testData/samples/Cricket/Cricket_Results.json",
              "remotion": {
                "composition": "cricket/results",
                "theme": "broadcastPro theme composition results surface"
              }
            }
          }
        }
      }
    }
  }
}
```

Remotion and theme targets in the manifest use stable logical references; implementers resolve to concrete modules at handoff time.

## Testing Decisions

### What makes a good test

Test **observable behavior at integration seams**, not HTML markup details or CSS class strings. Prefer one high seam over many low ones.

### Primary testing seam (proposed)

**Manifest + hydration loader** at the boundary between static pages and shared fixtures:

- Given a valid manifest entry for Broadcast Pro cricket Results, the hydration loader fetches the declared fixture and populates all bind-map selectors with non-empty string values from expected JSON paths.
- Given a missing or malformed manifest entry, the loader fails gracefully (console error or visible placeholder — no silent empty page).

This is the **highest useful seam**: if manifest parsing and hydration work for the golden asset, navigation wiring and the static shell are validated manually once; individual HTML files do not need automated tests.

Confirm this seam matches expectations before implementation. Lower seams (per-page DOM assertions, visual pixel diff of HTML) are explicitly deferred.

### Secondary seam (optional, same PR if cheap)

- JSON schema or structural validation test for the manifest (required keys, no orphan assets without HTML).
- Prior art: Vitest unit tests elsewhere in the repository for pure functions without Remotion.

### Manual acceptance (required for v1)

- Run design dev script; open guide landing.
- Navigate to Broadcast Pro → cricket → Results.
- Confirm tab bar shows only Results.
- Confirm hydrated fields (club, teams, scores, metadata) match fixture content.
- Confirm handoff comment and asset index row are present and accurate.
- Confirm legacy stitch folder is removed and variant readMe points to design site.

### Out of test scope for v1

- Visual pixel parity between CDN Tailwind design page and Remotion render.
- Browser automation across full nav tree.
- Every future asset type and variant.

## Out of Scope

- Migrating all seven legacy Broadcast Pro stitch assets (only Results in v1).
- Other template variants beyond Broadcast Pro cricket Results.
- AFL, Netball, or other sports until explicitly added to manifest.
- Full JSON-driven rendering (all list rows, pagination, truncation, fitted headlines).
- Frame-based animation specification or AnimatedContainer behavior in design site.
- Runtime theme color injection from user appearance settings.
- Publishing design site in npm package.
- ADR for design-outside-src (conventions in folder docs suffice for v1).
- Vite dev server, HMR, or bundler pipeline.
- Duplicating component anatomy or stitch brief content into the guide.
- Greyed "planned" tabs for assets not yet built (tabs appear only when asset exists).
- Automated visual regression of HTML prototypes.

## Further Notes

- Decisions locked through design-site grilling sessions (2026-09-09): guide-first, manifest-driven tabs, level-B hydration, move-not-copy from legacy stitch, dev-only packaging, plain root serve.
- Workflow stack (unchanged): llm-brief → component anatomy → design prototype → variant theme → Remotion composition.
- Results establishes visual language for Broadcast Pro; later asset types extend it per existing stitch brief discipline (one asset family at a time).
- After v1 ships, incremental work adds assets by: HTML page + bind map + manifest entry + asset index row — no structural rework expected.
- Glossary updates (design prototype, asset type, template) should land in the same implementation PR as the scaffolded site.

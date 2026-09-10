# Folder Overview

Dev-only static design prototype site for 1080×1350 layout approval before Remotion implementation. Scope: overlay UI and titles only — not backgrounds (those are handled in Remotion background system). Not published in the npm package.

## Files

- `index.html`: redirects to guide
- `guide/index.html`: design system instructions and outbound doc links
- `_shared/routes.json`: manifest for variants, sports, assets, fixtures, handoff targets
- `_shared/lib/`: testable manifest and hydration utilities
- `_shared/hydration/`: per-asset DOM bind maps
- `_shared/shell.css`, `frame.css`, `nav.js`, `tab-bar.js`, `hydrate.js`: shared chrome
- `variants/{variant}/{sport}/{asset}.html`: design prototype pages

## Child Modules

- [getting-started.md](./getting-started.md): how to start the dev server and open prototypes
- [design-system-brief.md](./design-system-brief.md): product purpose, constraints, principles (condensed)
- [results-layout-reference.md](./results-layout-reference.md): Results match-module structural baseline (pass 1)
- [new-template-prompt.md](./new-template-prompt.md): LLM prompt to start a new template (grill + setup + creative brief)
- [reference-library.md](./reference-library.md): Pass 2 craft library hub (CSS, fonts, SVG/motifs)
- [remotion-handoff.md](./remotion-handoff.md): design prototype → Remotion implementation runbook
- [fonts.md](./fonts.md): font catalog, roles, adding fonts, Remotion handoff
- [Tailwind and CSS for Fixtura templates](../design-Reference-docs/tailwind-css-remotion.md): read before styling new designs or translating them into Remotion
- `design-Reference-docs/`: Pass 2 + handoff references (Google Fonts, CSS techniques, SVG/patterns/textures, theme modes, Tailwind/CSS/Remotion)
- `variants/broadcast-pro/cricket/results.html`: golden reference (v1)

## Relations

- Parent: repository root
- Fixtures: `testData/samples/`
- Handoff targets: `src/compositions/cricket/`, `src/templates/variants/`
- Anatomy: `src/compositions/cricket/.docs/component-anatomy/`

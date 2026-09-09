# Folder Overview

Dev-only static design prototype site for 1080×1350 layout approval before Remotion implementation. Not published in the npm package.

## Files

- `index.html`: redirects to guide
- `guide/index.html`: design system instructions and outbound doc links
- `_shared/routes.json`: manifest for variants, sports, assets, fixtures, handoff targets
- `_shared/lib/`: testable manifest and hydration utilities
- `_shared/hydration/`: per-asset DOM bind maps
- `_shared/shell.css`, `frame.css`, `nav.js`, `tab-bar.js`, `hydrate.js`: shared chrome
- `variants/{variant}/{sport}/{asset}.html`: design prototype pages

## Child Modules

- `variants/broadcast-pro/cricket/results.html`: golden reference (v1)

## Relations

- Parent: repository root
- Fixtures: `testData/samples/`
- Handoff targets: `src/compositions/cricket/`, `src/templates/variants/`
- Anatomy: `src/compositions/cricket/.docs/component-anatomy/`

## Dev server

Run `npm run design` from repository root. Open `http://localhost:3456/design/`.

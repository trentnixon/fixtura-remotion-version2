# Folder Overview

Dev-only static design prototype site for 1080×1350 layout approval before Remotion implementation. Scope: overlay UI and titles only — not backgrounds (those are handled in Remotion background system). Not published in the npm package.

## Files

- `briefs/{slug}/design-brief.md`: draft or agreed creative brief, with reference images in `references/`
- `index.html`: redirects to guide
- `guide/index.html`: design system instructions and outbound doc links
- `_shared/routes.json`: manifest for variants, sports, assets, fixtures, handoff targets
- `_shared/lib/`: testable manifest and hydration utilities
- `_shared/hydration/`: per-asset DOM bind maps
- `_shared/shell.css`, `frame.css`, `nav.js`, `tab-bar.js`, `hydrate.js`: shared chrome
- `variants/{variant}/{sport}/{asset}.html`: design prototype pages

## Child Modules

- [getting-started.md](./getting-started.md): how to start the dev server and open prototypes
- [naming-contract.md](./naming-contract.md): factory naming (slug, Registry ID, ten cricket assets)
- [design-system-brief.md](./design-system-brief.md): product purpose, constraints, principles (condensed)
- [results-layout-reference.md](./results-layout-reference.md): Results match-module structural baseline (pass 1)
- [design-interview-prompt.md](./design-interview-prompt.md): copy-and-paste interview to define or resume a template brief
- [design-brief-template.md](./design-brief-template.md): structure for answers, reference interpretations, and agreed direction
- [new-template-prompt.md](./new-template-prompt.md): build from an agreed brief, then hand off to Remotion
- [reference-library.md](./reference-library.md): Pass 2 craft library hub (CSS, fonts, SVG/motifs)
- [remotion-handoff.md](./remotion-handoff.md): design prototype → Remotion implementation runbook
- [fonts.md](./fonts.md): font catalog, roles, adding fonts, Remotion handoff
- [Tailwind and CSS for Fixtura templates](../design-Reference-docs/tailwind-css-remotion.md): read before styling new designs or translating them into Remotion
- `design-Reference-docs/`: Pass 2 + handoff references (Google Fonts, CSS techniques, SVG/patterns/textures, theme modes, Tailwind/CSS/Remotion)
- `variants/broadcast-pro/cricket/results.html`: golden reference (v1)

## Relations

The interview's Markdown instructions are the content source for `interview/index.html`.
After editing them, run `node scripts/render-design-interview.mjs`.
Check for drift with `node scripts/render-design-interview.mjs --check`.

The renderer supports headings through level three, paragraphs, single-line lists,
unaligned pipe tables, fenced code with an optional language, inline code, bold,
and relative, root, fragment, or HTTP(S) links. It rejects unsupported syntax with
a line number, including nested or continued lists, raw HTML, images, emphasis,
and table alignment markers. Renderer tests live in
`design/_shared/lib/interview-markdown.test.ts`.

- Parent: repository root
- Fixtures: `testData/samples/`
- Handoff targets: `src/compositions/cricket/`, `src/templates/variants/`
- Anatomy: `src/compositions/cricket/.docs/component-anatomy/`

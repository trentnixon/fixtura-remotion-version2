# Design prototype → Remotion handoff

Move **approved overlay layouts** from the design site into the Remotion template and composition system. This is a **manual reimplementation** — there is no HTML-to-React converter.

Full runbook for Phase 4 in [new-template-prompt.md](./new-template-prompt.md). Golden example: **Broadcast Pro Results** (`design/variants/broadcast-pro/cricket/results.html` → `src/templates/variants/broadcastPro/`).

---

## When to start

Hand off only when the design prototype is approved:

1. **Pass 1** — hydrates correctly from fixture JSON (bind map verified with `npm run design`)
2. **Pass 2** — visual identity stable (typography, org colours from fixture, motifs)
3. **Stress cases** — long names, missing crest, absent performances, absent sponsor

**Overlays only.** Do not implement backgrounds, placeholder imagery, or design-site dev chrome (sidebar, tabs, handoff footer).

---

## What you are translating

| Design site (static HTML) | Remotion (React) |
| --- | --- |
| `.design-social-canvas` markup | Composition **display** components |
| Tailwind / CSS in HTML | Template **theme** `componentStyles` + variant **components** |
| `data-hydrate` + bind map | Video data context + composition utils |
| CDN fonts (`fonts.json`) | Local fonts — see [fonts.md](./fonts.md) |
| Flat neutral canvas backdrop | Remotion **background system** (unchanged) |

---

## Step 0 — Read handoff targets

Each prototype declares its targets:

- **HTML header comment** at top of the asset page
- **Live footer** on the page (`data-design-handoff`, filled from manifest)
- **`design/_shared/routes.json`** — `registryId`, `remotion.composition`, `remotion.theme`
- **`design/.docs/asset-index.md`** — human-readable index

Replace `TBD` theme paths when the Remotion theme file exists.

---

## Step 1 — Create the template variant shell

Under `src/templates/variants/{variant}/` (follow Broadcast Pro structure):

```text
src/templates/variants/{variant}/
├── index.tsx              # BaseTemplate + theme + intro/outro/background/main
├── theme/
│   ├── index.ts
│   ├── tokens.ts
│   ├── layout.ts, mode.ts
│   ├── componentStyles.shared.ts
│   └── composition/
│       ├── index.ts
│       └── {asset}.ts     # Per-asset theme surface
├── components/
└── animations.ts
```

Register in **`src/templates/registry.tsx`**:

- Registry key = PascalCase ID (e.g. `Scoreline`, `BroadcastPro`)
- Must match `registryId` in `routes.json` and `videoMeta.video.appearance.template` in production data

Reference: `src/templates/variants/broadcastPro/.docs/readMe.md`

---

## Step 2 — Implement composition displays (per asset)

For each approved asset, add display code under the composition folder named in the handoff comment.

Example — Results (`src/compositions/cricket/results/`):

| Role | Broadcast Pro file |
| --- | --- |
| Composition entry | `broadcastPro.tsx` |
| Display orchestrator | `controller/ResultsDisplay/display-BroadcastPro.tsx` |
| Row / card layout | `controller/MatchRow/row-BroadcastPro.tsx`, `layout/MatchCard/card-BroadcastPro.tsx` |
| Export key | `index.tsx` exports `broadcastpro` |

Wire into **`src/compositions/cricket/index.tsx`** — add a lowercase routing key to each relevant `Cricket*` map:

```tsx
export const CricketResults = {
  // …existing…
  scoreline: resultsScoreline,
};
```

Runtime routing (`src/core/utils/routing.tsx`):

- `appearance.template` → lowercased (e.g. `BroadcastPro` → `broadcastpro`)
- `metadata.compositionId` → composition type (e.g. `CricketResults`)
- Missing implementation → placeholder with reason `Missing TemplateComponent`

Repeat for every asset family the variant supports.

---

## Step 3 — Map design HTML to theme keys

1. Identify visual roles in approved HTML (headline, scores, team bands, result bar, performances, sponsor strip).
2. Add **`componentStyles`** in `theme/composition/{asset}.ts` and shared tokens in `tokens.ts`.
3. Build variant **components** that consume theme hooks — avoid hardcoded Tailwind from the HTML prototype.

Variant-specific motif rules (e.g. [scoreline-crease-motif-grammar.md](./scoreline-crease-motif-grammar.md)) override generic craft references.

### Tailwind, CSS, and styling

Read **[tailwind-css-remotion.md](../design-Reference-docs/tailwind-css-remotion.md)** — re-read if already used during Pass 2.

| Styling need | Preferred location |
| --- | --- |
| Layout (flex, grid, gap) | Complete literal Tailwind class strings |
| Reusable roles | `theme/componentStyles.shared.ts` |
| Asset-specific roles | `theme/composition/{asset}.ts` |
| Fonts, sizing tokens | `theme/tokens.ts`, `theme/layout.ts` |
| Club/mode/calculated values | React `style` or scoped CSS variables from hooks |
| Motifs, pseudo-elements, layered shadows | Variant CSS scoped to canvas root (e.g. `.scoreline-canvas`) |
| Motion | Frame-derived React styles — not CSS transitions or timers |

**Design site ≠ Remotion.** CDN Tailwind on HTML prototypes does not transfer automatically. Remotion uses Tailwind v4 via `src/index.css`; custom variant CSS must be imported in **both** Studio (`src/index.css`) and package (`src/package/styles.css`) when distributed. Use complete class strings — never `bg-${color}` or dynamic assembly. Tailwind `dark:` is **not** wired to Fixtura theme modes — use [theme-modes.md](../design-Reference-docs/theme-modes.md).

Before calling styling complete: compare rendered frame to prototype; inspect computed fonts/colours; confirm utilities exist in generated CSS; scrub entrance/settled/exit frames if animated.

### Theme modes and contrast

Read **[theme-modes.md](../design-Reference-docs/theme-modes.md)** before finalising `theme/mode.ts` and any glass or panel surfaces.

- `templateVariation.mode` selects `light`, `lightAlt`, `dark`, or `darkAlt` (default `light`).
- Mode supplies **container and text** colours via `selectedPalette`; **club colours** still drive brand backgrounds and accents.
- Standard templates: `Alt` flips **title** colour only — containers and in-container copy stay the same.
- Shared transparency tokens (`subtle` → `strong`) control how much background shows through panels.
- Copy contrast: `text.onContainer.copy` / `safeCopy` are checked against `container.background`; titles and `copyNoBg` depend on the backdrop behind them.
- **Scoreline** and **CNSW Private** have documented exceptions — do not assume Broadcast Pro mode behaviour.

When verifying in Studio, test **all four modes** (and pale/dark/saturated org primaries) — not only the neutral placeholder used in the design site.

---

## Step 4 — Fonts

Follow [fonts.md](./fonts.md):

1. `public/fonts/{FontName}/`
2. `src/core/utils/fonts/fontLoader.ts` → `fontPathMap`
3. `src/package/tailwind-preset.cjs`
4. `src/templates/variants/{Variant}/theme/tokens.ts`
5. Verify in **Remotion Studio**

---

## Step 5 — Update manifest and index

When theme files exist, replace `TBD`:

- **`design/_shared/routes.json`** — `remotion.theme` path
- **`design/.docs/asset-index.md`** — Theme surface column
- **HTML header comment** — theme line if still TBD

---

## Step 6 — Verify in Remotion Studio

1. Same fixture JSON as the design prototype (`testData/samples/…`)
2. `appearance.template` = registry ID (e.g. `"Scoreline"`)
3. `metadata.compositionId` = correct composition (e.g. `CricketResults`)
4. Compare at **1080×1350** — not browser zoom on the design preview alone
5. Test all four **theme modes** (`light`, `lightAlt`, `dark`, `darkAlt`) — see [theme-modes.md](../design-Reference-docs/theme-modes.md)
6. Stress fixtures and export checks (Scoreline: [scoreline-export-checklist.md](./scoreline-export-checklist.md))

---

## Recommended order (new variant)

1. **Results** — establishes variant language
2. **Result single**
3. **Upcoming**, **Ladder**, **Top 5**, **Performances**, **Roster**, **Team of the Week**

Do not ship to production until **Results** is approved end-to-end in Studio.

---

## Agent one-liner

Copy into an implement session:

```text
Implement Remotion handoff for design/variants/{slug}/cricket/{asset}.html
→ Registry: {RegistryId} (routing key: {slug})
→ Composition: src/compositions/cricket/{composition}/
→ Theme: src/templates/variants/{VariantFolder}/theme/composition/{asset}.ts
→ Fixture: {fixture path from routes.json}
Overlays only — match approved design HTML in main content; no backgrounds or design-site chrome.
Follow src/templates/variants/broadcastPro/ structure. Update routes.json + asset-index.md when theme path is known.
Read design/.docs/remotion-handoff.md for full steps.
```

**Example — Scoreline Results:**

```text
Implement Remotion handoff for design/variants/scoreline/cricket/results.html
→ Registry: Scoreline (routing key: scoreline)
→ Composition: src/compositions/cricket/results/
→ Theme: src/templates/variants/scoreline/theme/composition/results.ts
→ Fixture: testData/samples/Cricket/Cricket_Results.json
Overlays only. Follow scoreline-crease-motif-grammar.md. Update routes.json + asset-index.md.
Read design/.docs/remotion-handoff.md.
```

---

## Definition of done

| Check | Done when |
| --- | --- |
| Template shell | Registry entry exists; intro/main/outro render |
| Composition routing | Lowercase key in each `Cricket*` map in `cricket/index.tsx` |
| Visual parity | Studio render matches approved prototype for same fixture |
| Manifest | `routes.json` + `asset-index.md` have real theme paths |
| Fonts | Local fonts load in render pipeline |
| Backgrounds | Still from Remotion background config — not design placeholder |

---

## Related docs

- [asset-index.md](./asset-index.md) — prototype → Remotion mapping
- [theme-modes.md](../design-Reference-docs/theme-modes.md) — mode palette, transparency, contrast rules
- [tailwind-css-remotion.md](../design-Reference-docs/tailwind-css-remotion.md) — Tailwind, scoped CSS, theme roles, two styling environments
- [fonts.md](./fonts.md) — font handoff
- [new-template-prompt.md](./new-template-prompt.md) — Phase 4 pointer
- `src/templates/variants/broadcastPro/.docs/readMe.md` — theme/component mapping exemplar
- `src/compositions/cricket/.docs/stitch-briefs/` — legacy component-family briefs (optional)

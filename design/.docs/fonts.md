# Fonts in design prototypes

## How fonts are used

Each template picks two typography roles:

| Role                  | Typical use               | Broadcast Pro              | Scoreline                           |
| --------------------- | ------------------------- | -------------------------- | ----------------------------------- |
| **Heading / display** | Titles, scores, hero type | Teko (`font-teko`)         | Barlow Condensed (`--font-display`) |
| **Body / labels**     | Metadata, names, chips    | Rajdhani (`font-rajdhani`) | Source Sans 3 (`--font-body`)       |

In HTML prototypes, apply roles with Tailwind classes (Broadcast Pro) or CSS variables (Scoreline):

```html
<h1 class="font-teko text-7xl">Results</h1>
<p class="font-rajdhani text-xl">Weekend Results</p>
```

The catalog lives in `design/_shared/fonts.json`. Pages load fonts via `applyVariantFonts()` from `design/_shared/fonts.js` (Google CDN in design; local files in Remotion).

**Deep selection guide (Pass 2):** [Google Fonts for Professional Graphic Design](../design-Reference-docs/Google%20Fonts%20for%20Professional%20Graphic%20Design.md) — role-based pairing, LLM font-selection protocol, and content stress tests. See also [reference-library.md](./reference-library.md).

## Add a font to the design site

1. **Register the family** in `design/_shared/fonts.json` under `families`:

```json
"my-font": {
  "label": "My Font",
  "family": "My Font",
  "tailwindClass": "font-my-font",
  "tailwindKey": "my-font",
  "googleFontsHref": "https://fonts.googleapis.com/css2?family=My+Font:wght@400;700&display=swap",
  "roles": ["display"]
}
```

2. **Assign it to a variant** in `variantFonts`:

```json
"my-variant": {
  "heading": "my-font",
  "body": "rajdhani"
}
```

3. **Use in HTML** — call `applyVariantFonts("my-variant")` before Tailwind config, then use `font-my-font` in markup (see `results.html`).

4. **Reload the page** — no server restart needed.

## Handoff to Remotion (when the font is approved)

Design CDN fonts are for speed only. Before shipping video output:

1. Download font files → `public/fonts/{FontName}/`
2. Register in `src/core/utils/fonts/fontLoader.ts` → `fontPathMap`
3. Add Tailwind utility → `src/package/tailwind-preset.cjs` → `fontFamily`
4. Set theme tokens → `src/templates/variants/{Variant}/theme/tokens.ts` → `fonts` + `fontClasses`

Family strings must match `fontPathMap` keys (e.g. `"Teko"`, `"Rajdhani"`, `"Barlow Condensed"`, `"Source Sans 3"`).

5. Verify in **Remotion Studio** — design CDN and local render can differ slightly.

## Files

| File                                 | Purpose                                        |
| ------------------------------------ | ---------------------------------------------- |
| `design/_shared/fonts.json`          | Design-site font catalog + variant assignments |
| `design/_shared/fonts.js`            | Load CDN links + Tailwind `fontFamily` extend  |
| `public/fonts/`                      | Local font files for Remotion render           |
| `src/core/utils/fonts/fontLoader.ts` | Remotion font loading                          |
| `src/package/tailwind-preset.cjs`    | Shared Tailwind font utilities                 |

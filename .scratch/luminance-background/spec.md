# Luminance background — global background option

Status: ready-for-agent

---

## Problem Statement

Fixtura templates need brand-colored backgrounds driven by art-directed grayscale masters (tonal maps, textures, vignettes) rather than full-color hero photos. The existing Image background is built for hero-image precedence, motion effects, and legacy overlay behavior — a poor fit for recoloring neutral assets. There is no first-class way to map source tone through club palette colors while keeping foreground content readable across light and dark regions of the same master.

## Solution

Add **Luminance** as a new global background option alongside Image, Texture, and Gradient. A grayscale asset supplies source tone; a **luminance map** (theme preset or explicit stops) recolors it; **foreground protection** (approved scrim/vignette presets) sits outside the map. Parsing and map resolution happen at a strict input boundary; rendering goes through a dedicated path that does not inherit Image hero precedence or overlay semantics.

Integration path:

```text
useBackground: "Luminance"
        ↓
SelectTemplateBackground
        ↓
LuminanceBackground
        ↓
BaseTemplateLayout background layer
```

All templates that use the central background selector inherit the option automatically. Luminance is not owned by any single template.

## User Stories

1. As a template author, I want a `Luminance` background type, so that I can use grayscale masters as brand backgrounds without misusing Image.
2. As a template author, I want to select a grayscale asset by key or URL, so that production art can be loaded from the static library.
3. As a template author, I want theme-derived map presets (`brand`, `brand-with-accent`, `tonal-brand`), so that club colors come from the active validated palette without hand-picking hexes.
4. As a template author, I want explicit color stops with positions, so that uneven ramps are preserved accurately.
5. As a template author, I want pre-map contrast and brightness controls, so that I can shift which part of the ramp each source tone reaches without altering brand endpoint colors.
6. As a template author, I want foreground protection presets separate from the map, so that text remains readable when the master has both light and dark regions.
7. As a template author, I want a defined missing-asset fallback, so that broken keys never fall through to hero images or stock URLs.
8. As a viewer, I want backgrounds recolored from club palette semantics, so that videos match the account’s active palette selection.
9. As a pipeline operator, I want external JSON validated at parse time, so that invalid stops and colors never reach React render.
10. As a pipeline operator, I want grayscale assets rejected if they carry embedded color profiles, so that committed library files stay neutral.
11. As a pipeline operator, I want changed luminance assets validated in CI, so that bypassing local hooks does not ship bad masters.
12. As a developer, I want a pure map resolver testable without Remotion, so that LUT logic regressions are caught on every PR.
13. As a developer, I want a parameterized test composition, so that visual fixtures do not clutter the composition registry.
14. As a developer, I want three render backends spiked before choosing one, so that SVG vs Remotion effect vs precompute is an evidence-based decision.
15. As a developer, I want visual regression with perceptual diff, so that wrong ramps and colored fringes are caught before release.
16. As a developer, I want separate same-environment and cross-environment thresholds, so that a wide Lambda tolerance does not hide local regressions.
17. As a developer, I want one generic layout integration render, so that background stacking is verified without template-specific baselines.
18. As a deploy operator, I want a representative luminance asset verified on the deployed site, so that upload plumbing failures are caught post-deploy.
19. As an art director, I want problematic club palettes to fall back to an approved tonal preset, so that exact club colors remain available but unusable pairs are not silently fixed post-map.
20. As a developer, I want compact LUT checkpoint tests, so that PR diffs stay readable without full 256×3 dumps.
21. As a developer, I want new library assets render-tested on change without requiring a baseline per file, so that the asset library can grow without unbounded baseline storage.
22. As a developer, I want fixed canary fixtures (F01, F06, F09) on canonical masters, so that map, scrim, and fallback regressions are always guarded.
23. As a viewer, I want frame-stable output for fixed inputs on a given renderer, so that rerenders are predictable even if not byte-identical across GPUs.
24. As a developer, I want SVG filter IDs unique per instance, so that multiple previews do not collide.
25. As a template maintainer, I want Luminance wired through the existing background selector, so that any template using `SelectTemplateBackground` can opt in via `useBackground`.
26. As a developer, I want palette animation deferred, so that v1 scope stays shippable.
27. As a developer, I want Image motion effects out of scope for Luminance v1, so that static positioning is the baseline.
28. As a developer, I want luminance-neutralization before LUT lookup, so that JPEG compression and profile drift do not produce colored fringes.
29. As a developer, I want contrast and brightness applied before mapping, so that post-map adjustments do not shift supplied brand colors.
30. As a maintainer, I want domain terms documented in CONTEXT.md, so that agents and humans share vocabulary for luminance map and foreground protection.

## Implementation Decisions

### Domain terms (use consistently)

- **Luminance background** — background variant that recolors a grayscale master via a luminance map.
- **Luminance map** — tone-to-RGB lookup derived from theme preset or explicit stops (not a CSS gradient string).
- **Map config** — validated configuration after parse (not raw template JSON).
- **Source tone** — grayscale value after neutralization and pre-map contrast/brightness.
- **Foreground protection** — scrim/vignette layer separate from the map.
- **Render backend** — SVG filter, Remotion native effect, or precomputed raster (spike only until winner chosen).

_Avoid using **overlay** for foreground protection — Image background owns overlay semantics._

### Background type and routing

- Add `Luminance` to the background registry and central background selector (same level as Image, Texture, Gradient).
- Extend template variation schema with a `luminance` configuration block.
- Do **not** inherit Image hero-image precedence, legacy overlay behavior, or Image motion effect suite.

### Map configuration shape

```ts
type LuminanceStop = {
  position: number;
  color: string;
};

type LuminanceMapConfig =
  | {
      kind: "theme";
      preset: "brand" | "brand-with-accent" | "tonal-brand";
      reverse?: boolean;
    }
  | {
      kind: "stops";
      stops: readonly [LuminanceStop, LuminanceStop, ...LuminanceStop[]];
      reverse?: boolean;
    };
```

- No parallel `palette` + `positions` arrays.
- Validate colors, finite positions in `[0, 1]`, ordering, no duplicates, minimum two stops at parse boundary.
- `reverse` semantics must be documented once and tested.

### Palette source

- Theme presets resolve from **selected palette** semantic colors, not raw appearance theme primary/secondary.
- When club pair fails perceptual lightness spread checks, use approved **tonal-brand** preset — do not silently fix with post-map contrast.

### Render pipeline (conceptual)

```text
ThemeProvider
  → LuminanceBackground (asset, preset resolution, fallback/readability policy)
  → resolveLuminanceMap() (validate stops, shape tone, generate LUT)
  → LuminanceMappedImage (Remotion Img + filter or effect)
  → ForegroundProtection (optional scrim/vignette, outside LUT)
```

### Luminance map resolution

- Neutralize to luminance before lookup (e.g. color matrix), even when assets are nominally grayscale.
- Apply contrast and brightness to **source tone before** LUT lookup.
- Sample uneven stops into per-channel lookup tables (256 entries × R/G/B).
- Opacity and deliberate scrim stay outside the color map.

### Foreground protection

- Closed preset set (e.g. none, bottom-weighted, center-vignette, uniform) using palette-derived neutrals.
- Not wired through Image overlay renderer or duotone semantics.
- Sits between mapped image and composition content.

### Missing-asset fallback

- Explicit policy function — never hero image, never stock URL default.

### Asset library

- Masters under static luminance library path; load via static file resolution and Remotion Img.
- **Reject embedded ICC/color profiles at CI validation** — do not strip or rewrite committed files in the validation job.
- Validate channel neutrality and tonal histogram on ingest.
- Dedicated `_verify` canonical asset for deploy HEAD checks.

### Render backend selection (before baselines)

1. Implement three candidate backends behind a backend prop.
2. Run **full F01–F09 × all three backends** once locally (27 spike renders) using the visual regression script in spike mode.
3. Record visual differences plus render duration and memory per backend.
4. Document winner in `.research/luminance-backend-spike.md`.
5. Gate or remove losing backends; then commit baselines and calibrate thresholds.

### Fixture registry (F01–F09)

| ID  | Map                          | Asset                       | Protection      |
| --- | ---------------------------- | --------------------------- | --------------- |
| F01 | theme / brand                | smooth-ramp                 | none            |
| F02 | theme / brand                | smooth-ramp                 | bottom-weighted |
| F03 | theme / brand-with-accent    | high-contrast               | none            |
| F04 | theme / tonal-brand fallback | problematic palette props   | none            |
| F05 | stops / uneven (4-stop)      | smooth-ramp                 | none            |
| F06 | stops / uneven               | high-contrast               | center-vignette |
| F07 | theme / protected-brand      | test007 (lossless linework) | none            |
| F08 | theme / brand + reverse      | smooth-ramp                 | none            |
| F09 | missing asset key            | —                           | fallback        |

### SVG / determinism

- Sanitize `React.useId()` for SVG filter IDs.
- Frame-stable for fixed inputs on a given renderer; do not promise byte-identical PNGs across Chromium/GPU variants.

## Testing Decisions

### What makes a good test

- Test **external behavior**: parsed config acceptance/rejection, map output at checkpoint indices, fallback policy, render success, pixel diff against baselines where defined.
- Do **not** require a committed pixel baseline for every library asset.

### Seams

1. **Parse + map resolver** — highest unit-test seam; no React/Remotion.
2. **`Luminance-Test` composition + luminance visual-regression script** — visual seam; calibration uses the same compare/report code.
3. **Generic layout integration** — one render through central selector and base layout; visual stacking verification (background behind content, protection between map and content). Component test for explicit layer order or z-index if needed.

### Dual thresholds

| Constant              | Use                                       | Calibration                                  |
| --------------------- | ----------------------------------------- | -------------------------------------------- |
| `THRESHOLD_SAME_ENV`  | F01–F09 isolated regression               | 3× local vs baseline; max + margin           |
| `THRESHOLD_CROSS_ENV` | Pre-release Lambda canary (F01, F06, F09) | 3× local + 5× Lambda; max cross-env + margin |

Comparator: **pixelmatch**. Build visual-regression script **before** threshold calibration.

### Dynamic asset canary (path-filtered CI)

- Each changed asset: render-success only (no baseline per library file).
- Fixed pixel checks on F01, F06, F09 canonical masters.
- Ingest: channel neutrality, reject embedded profiles, histogram range.

### Prior art

- Vitest pure function tests elsewhere in repo.
- Existing BroadcastPro visual-regression script pattern for Remotion still rendering (reference only — not Luminance integration scope).
- `verify-deploy.mjs` for deployed asset HEAD checks.

## Out of Scope

- BroadcastPro or any template-specific integration, baselines, or cricket dataset matrices.
- Per-template visual tests.
- Palette animation over time.
- Image-style motion effects on luminance masters.
- Byte-identical PNGs across Chromium/GPU variants.
- Full 256×3 LUT arrays in tests.
- Pixel baseline for every asset in the growing library.
- Git LFS unless baseline totals reach tens of MB.
- Modifying committed assets during CI validation.
- Merging Luminance with Image duotone overlay semantics.
- Automated text-region contrast metrics for v1.

## Further Notes

- Locked from architecture and testing grilling (2026-08-25).
- Scope correction (2026-08-25): Luminance is global; BroadcastPro references removed from integration scope.
- Research outputs: `.research/luminance-backend-spike.md`, `.research/luminance-threshold-calibration.md`.
- Tickets: `.scratch/luminance-background/issues/01` through `10`.

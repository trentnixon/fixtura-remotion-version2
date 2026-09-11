# SVG, Pattern and Texture Systems for Professional Graphics

_A practical and LLM-operational guide to designing, generating, theming and rendering scalable visual assets for data-driven sports templates_

SVGs, patterns and textures give a graphic its visual atmosphere and recurring motifs. They can create direction, scale, depth, technical character and brand recognition without adding more content. Used carelessly, they introduce noise, generic sports clichés, rendering problems and competition with the information.

This guide serves two audiences:

- Designers and developers creating themeable assets for interfaces, still graphics and Remotion video.
- Language models selecting or generating SVGs, patterns and textures for Fixtura templates.

The same standard applies to both: every visual asset must have a defined role, belong to the template's visual grammar and survive dynamic colours, real data and final export.

> **Core principle.** Classify the asset's job before choosing its medium or appearance. An atmospheric texture must not be used to solve a structural layout problem.

---

## What these assets should achieve

| Goal         | Asset response                                            |
| ------------ | --------------------------------------------------------- |
| Structure    | Define zones, direction, boundaries and relationships     |
| Identity     | Repeat a controlled motif across related templates        |
| Atmosphere   | Add depth and material character without becoming content |
| Focus        | Lead attention toward a score, crest, title or result     |
| Themeability | Adapt predictably to organisation colours                 |
| Scalability  | Remain sharp and proportionate across output sizes        |
| Reliability  | Render consistently in browser, still and video pipelines |
| Restraint    | Support hierarchy rather than competing with it           |

Professional visual systems do not add texture everywhere. They decide where the surface should be quiet, where movement should be implied and which repeated device makes the system recognisable.

## Classify the asset before designing it

Every asset should be assigned one primary role.

### Structural assets

Structural assets organise the composition. They create panels, bands, rails, boundaries, frames or directional divisions.

**Examples:**

- Angled team-colour panels.
- A band separating match identity from performances.
- A clipped sponsor zone.
- A short rule that anchors a result label.
- A frame connecting the crest and score.

Structural assets may carry moderate or high contrast because they affect reading order.

### Semantic assets

Semantic assets communicate meaning rather than atmosphere.

**Examples:**

- Win, loss, draw or abandoned markers.
- Progress arcs.
- Ranking arrows.
- Sport-specific field or court indicators.
- A verified organisation or competition icon.

Semantic assets must remain legible, accessible where interactive and independent from colour alone.

### Atmospheric assets

Atmospheric assets add material, scale or mood without carrying essential information.

**Examples:**

- Fine grain.
- A quiet technical grid.
- Low-alpha slashes.
- Large cropped contour lines.
- A tonal halftone field.

Atmospheric assets should normally be the first layer removed when a graphic becomes too busy.

### Transitional assets

Transitional assets soften or connect layers.

**Examples:**

- Gradient fades.
- Feathered image edges.
- Light sweeps.
- Colour interpolation bands.
- Soft masks between a photograph and a solid panel.

Their purpose is to manage a transition, not become a focal effect.

### Masking assets

Masking assets control what is revealed or protected.

**Examples:**

- Crest silhouettes.
- Image windows.
- Luminance maps.
- Protected black and white linework.
- A faded texture boundary.

Masks require careful testing because they operate on visibility rather than simply adding colour.

> **Classification rule.** If an asset appears to perform several primary roles, split it into layers. Each layer should remain independently controllable.

## Choose the right medium

SVG, CSS and raster imagery overlap, but they have different strengths.

| Need                             | Preferred medium                            | Why                                              |
| -------------------------------- | ------------------------------------------- | ------------------------------------------------ |
| Simple panel, band or gradient   | CSS                                         | Responsive and directly connected to layout      |
| Reusable geometric motif         | SVG or CSS                                  | Sharp, themeable and scalable                    |
| Complex custom silhouette        | SVG                                         | Precise paths and reusable masks                 |
| Fine organic grain               | Raster or compact SVG filter                | More natural than hundreds of DOM nodes          |
| Repeating dots, lines or grids   | SVG pattern or CSS gradient                 | Small definition with scalable repetition        |
| Data-driven diagram or indicator | Inline SVG                                  | Geometry can be controlled from React props      |
| Detailed illustration            | SVG when genuinely vector; otherwise raster | Choose according to source character             |
| Photographic texture             | Raster                                      | SVG adds no advantage to continuous-tone imagery |
| Luminance recolour master        | Raster or carefully constructed SVG         | Depends on required tonal complexity             |
| Animated path or line            | Inline SVG                                  | Direct access to path and stroke properties      |

### Prefer CSS when the asset belongs to layout

Use CSS when the shape is fundamentally the background, border or silhouette of an element and must respond directly to content dimensions.

```css
.result-panel {
  --cut: 42px;
  background: linear-gradient(108deg, var(--team-dark), var(--team));
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--cut)) 100%, 0 100%);
}
```

### Prefer inline SVG when the asset needs internal control

Use inline SVG when individual paths, stops, symbols, masks or animation properties must respond to data or theme tokens.

```tsx
<svg viewBox="0 0 1200 300" aria-hidden="true">
  <path d="M0 0H1200L1120 300H0Z" fill="var(--team-surface)" />
  <path d="M930 0L850 300" stroke="var(--accent-visible)" strokeWidth="8" />
</svg>
```

### Prefer external SVG when the asset is stable

External files work well for approved icons, masks and illustrations that do not require their internal paths to inherit page-level CSS variables.

Use an external SVG as an image when the entire file can be treated as one asset. Inline it when individual parts must change colour, opacity or motion.

### Prefer raster texture when variation is continuous

Organic paper, photographic grain and complex noise are often more efficient as small raster tiles than as thousands of vector shapes.

Use high-quality source assets, controlled opacity and a repeat scale appropriate to the final output. Do not upscale a tiny visible texture until its tile becomes obvious.

## SVG foundations

### The `viewBox` is the internal coordinate system

The `viewBox` defines the coordinate space that SVG content is mapped from. It allows geometry to scale without rewriting path coordinates.

```svg
<svg
  viewBox="0 0 1200 300"
  width="100%"
  height="100%"
  preserveAspectRatio="xMidYMid meet"
>
  <rect width="1200" height="300" fill="#0c1444" />
</svg>
```

Choose a coordinate system that makes the geometry understandable. A `1200 × 300` viewBox is easier to reason about for a wide banner than an arbitrary exported artboard with decimal coordinates.

> **Watch for:** A missing or inappropriate `viewBox` makes reuse and responsive scaling unpredictable.

### Control aspect-ratio behaviour explicitly

`preserveAspectRatio` controls how the viewBox is fitted into its viewport.

| Behaviour        | Typical use                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `xMidYMid meet`  | Show the entire asset without cropping                           |
| `xMidYMid slice` | Fill the region and allow cropping                               |
| `none`           | Stretch geometry to fill; use only when distortion is acceptable |
| `xMinYMid meet`  | Anchor a complete asset to the left                              |

Do not use `none` for crests, logos, circles or familiar symbols. Stretching is acceptable only for intentionally elastic backgrounds whose geometry has been designed for it.

### Use semantic groups

Group elements by role rather than by accidental export order.

```svg
<svg viewBox="0 0 1080 1350">
  <g id="atmosphere">...</g>
  <g id="structure">...</g>
  <g id="semantic-marks">...</g>
  <g id="protected-linework">...</g>
</svg>
```

This makes theme changes, animation and debugging safer. In React components, prefer stable classes or descriptive data attributes over styling paths by their position in the DOM.

### Keep reusable definitions in `defs`

Gradients, patterns, masks, clip paths, symbols and filters belong in `<defs>`.

```svg
<defs>
  <linearGradient id="panel-light" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="var(--surface-strong)" />
    <stop offset="1" stop-color="var(--surface-soft)" />
  </linearGradient>
</defs>
```

Use unique IDs when several SVG components can appear on the same page. Duplicate IDs can cause one component to reference another component's gradient, mask or clip path.

```tsx
import { useId } from 'react';

const gradientId = useId().replaceAll(':', '');

<linearGradient id={gradientId}>...</linearGradient>
<path fill={`url(#${gradientId})`} d={pathData} />
```

### Use simple shapes before complex paths

Prefer `<rect>`, `<circle>`, `<line>`, `<polygon>` and `<polyline>` when they describe the asset accurately. They are easier to inspect and modify than opaque path data.

Use `<path>` for curves, irregular silhouettes and compound geometry—not merely because an export tool converted every shape into a path.

### Control stroke scaling

When a rule must keep a consistent apparent thickness while the SVG scales, use `vector-effect="non-scaling-stroke"` where appropriate.

```svg
<path
  d="M0 120H900"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  vector-effect="non-scaling-stroke"
/>
```

For fixed-canvas Remotion graphics, proportional stroke scaling may be more desirable. Choose based on the asset's role rather than applying non-scaling strokes everywhere.

## Themeable SVG construction

### Use semantic colour tokens

Do not hard-code arbitrary brand colours across individual paths. Bind paths to semantic roles.

```css
.graphic-theme {
  --svg-surface-strong: var(--surface-strong);
  --svg-surface-soft: var(--surface-soft);
  --svg-accent: var(--accent-visible);
  --svg-line: var(--on-surface);
  --svg-atmosphere: rgb(255 255 255 / 8%);
}
```

```svg
<path class="surface" fill="var(--svg-surface-strong)" d="..." />
<path class="accent" fill="var(--svg-accent)" d="..." />
<path class="line" stroke="var(--svg-line)" d="..." />
```

Semantic tokens allow the application to normalise pale, dark or low-contrast organisation colours before the SVG uses them.

### Use `currentColor` for single-colour assets

`currentColor` is ideal for icons, line motifs and silhouettes that should inherit one surrounding colour.

```tsx
<svg viewBox="0 0 24 24" className="result-icon" aria-hidden="true">
  <path d="..." fill="currentColor" />
</svg>
```

```css
.result-icon {
  color: var(--accent-visible);
}
```

### Separate colour control from opacity control

Keep theme selection and visual strength independently adjustable.

```svg
<g fill="var(--svg-accent)" opacity="var(--motif-opacity, .08)">
  ...
</g>
```

This allows the same motif to become quieter without creating a different blended colour token.

### Do not recolour official identity assets indiscriminately

Organisation crests, sponsor logos and competition marks may have protected colour and clear-space requirements. Treat them as identity assets, not generic decorative SVGs.

Only recolour when the source rules or approved asset variant permit it. Use supplied monochrome versions rather than applying filters to create an unofficial one.

## Reusable SVG systems

### Symbols and instances

`<symbol>` and `<use>` can reduce repeated markup for approved icons or motifs.

```svg
<svg viewBox="0 0 600 200">
  <defs>
    <symbol id="forward-mark" viewBox="0 0 40 100">
      <path d="M30 0H40L10 100H0Z" fill="currentColor" />
    </symbol>
  </defs>

  <use href="#forward-mark" x="20" y="20" width="40" height="100" />
  <use href="#forward-mark" x="80" y="20" width="40" height="100" />
</svg>
```

Use stable local references. External `<use>` references add loading and cross-origin risks that are unnecessary for generated assets.

### Pattern definitions

Patterns define a tile that SVG repeats across a region.

```svg
<defs>
  <pattern
    id="forward-slashes"
    width="48"
    height="48"
    patternUnits="userSpaceOnUse"
    patternTransform="skewX(-10)"
  >
    <line
      x1="12" y1="0" x2="12" y2="48"
      stroke="var(--svg-line)"
      stroke-width="2"
      opacity=".1"
    />
  </pattern>
</defs>

<rect width="100%" height="100%" fill="url(#forward-slashes)" />
```

`patternUnits="userSpaceOnUse"` makes the tile size correspond to the SVG coordinate system. `objectBoundingBox` can be useful for proportional patterns, but it is often harder to reason about in a fixed production canvas.

### Clip paths

A clip path creates a binary visible boundary. Pixels are either inside or outside the clipped region, with antialiasing at the edge.

```svg
<defs>
  <clipPath id="angled-window">
    <polygon points="0,0 900,0 820,300 0,300" />
  </clipPath>
</defs>

<image href="/team-photo.jpg" clip-path="url(#angled-window)" />
```

Use clipping for hard silhouettes and masks for gradual transparency.

### Masks

A mask controls opacity and can create soft fades, cut-outs and tonal reveals.

```svg
<defs>
  <linearGradient id="fade" x1="0" x2="1">
    <stop offset="0" stop-color="white" />
    <stop offset=".72" stop-color="white" />
    <stop offset="1" stop-color="black" />
  </linearGradient>
  <mask id="fade-mask" style="mask-type:luminance">
    <rect width="100%" height="100%" fill="url(#fade)" />
  </mask>
</defs>

<image href="/team-photo.jpg" mask="url(#fade-mask)" />
```

State whether the mask uses alpha or luminance behaviour and test it in the production renderer. Do not assume that black, white and transparent values behave identically across every embedding route without an explicit mask definition.

### Gradients

SVG gradients are useful when their stops, positions or transforms must be controlled as part of the asset.

```svg
<linearGradient id="team-sweep" x1="0" y1="0" x2="1" y2="0">
  <stop offset="0" stop-color="var(--surface-strong)" />
  <stop offset=".58" stop-color="var(--surface-strong)" />
  <stop offset="1" stop-color="var(--surface-soft)" />
</linearGradient>
```

Use uneven stops to create a deliberate quiet zone and transition zone. Equal spacing everywhere often looks procedural rather than composed.

### Filters

SVG filters can produce blur, colour operations, grain and compositing effects. They are powerful but can be expensive and inconsistent at extreme bounds.

```svg
<filter id="soft-grain" x="-10%" y="-10%" width="120%" height="120%">
  <feTurbulence
    type="fractalNoise"
    baseFrequency=".8"
    numOctaves="2"
    seed="11"
    result="noise"
  />
  <feColorMatrix
    in="noise"
    type="matrix"
    values="1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 .08 0"
  />
</filter>
```

> **Watch for:** Filter regions that are too small clip blur and shadows. Regions that are unnecessarily large increase render cost.

For frequently repeated or animated textures, compare a pre-rendered tile with the live filter. The visually simpler implementation is often more reliable.

## Texture as a controlled system

Texture should be described through parameters, not only through style names.

### Texture parameters

| Parameter | Question                                                  |
| --------- | --------------------------------------------------------- |
| Motif     | What repeated or organic form is visible?                 |
| Scale     | How large is the motif relative to the canvas?            |
| Density   | How much of the surface is occupied?                      |
| Direction | Does it follow the composition's geometry?                |
| Contrast  | How far is it from the surrounding surface?               |
| Opacity   | How strongly is the layer applied?                        |
| Rhythm    | Is spacing regular, staggered or intentionally irregular? |
| Repeat    | Does the texture tile, crop or exist as one field?        |
| Phase     | Where does the repeat begin relative to the content?      |
| Blend     | How does it interact with the surface below?              |
| Fade      | Where does it enter or disappear?                         |
| Motion    | Is it static, drifting, revealing or reacting to data?    |

“Add a subtle sports texture” is not an adequate specification. A useful instruction is:

```text
Add a low-density field of parallel forward slashes at 10 degrees,
using 2 px rules on a 48 px repeat, 7% white opacity, fading out
behind the score and remaining static during the result reveal.
```

### Grain and noise

Fine grain can reduce mathematical perfection and visible gradient banding. It should be barely perceptible at delivery size.

Use a stable seed for deterministic rendering. Random grain that changes every frame creates compression noise and visual flicker.

### Lines and directional slashes

Lines create movement and connect strongly to a geometric identity. They should inherit the same angle system as the structural panels.

Do not use approximately related directions such as a `10deg` panel, `12deg` stripe and unrelated diagonal gradient. Share a defined geometry token or derived coordinate system.

### Grids and technical marks

Grids, ticks, coordinates and registration marks can suggest data and organisation. Use them selectively and at low contrast.

They should not resemble a real chart, table boundary or interactive control unless they actually communicate that structure.

### Dots and halftones

Dot fields can create tonal transitions and print-inspired energy. Control dot size and spacing at the final output resolution to avoid moiré.

A halftone that looks smooth in a large preview may form distracting interference patterns after social-platform resizing.

### Contours and arcs

Large contours, arcs and cropped rings can create scale while remaining quieter than a detailed pattern. Use a small number of strong curves rather than filling every empty area.

### Image-derived textures

Photography, grass, fabric, concrete and paper carry strong associations. Use them only when those associations support the concept.

Avoid applying a literal sports surface merely because the template represents that sport. A cricket graphic does not automatically need grass, leather seams or stadium lights.

## Build a recognisable motif grammar

Identity comes from repeating a small collection of compatible moves.

### Fixtura motif families

A controlled system might include:

- Forward cuts aligned to one shared angle.
- Short interrupted rules rather than complete borders.
- Large organisation-colour surfaces.
- Oversized cropped numerals or letters.
- Low-density technical index marks.
- One quiet directional texture.
- Crests or scores deliberately breaking selected boundaries.
- Protected black or white linework in luminance masters.

Not every template should use every motif. Related templates should draw from the same vocabulary with different emphasis.

### Give each motif consistent meaning

| Motif             | Consistent role                                   |
| ----------------- | ------------------------------------------------- |
| Forward slash     | Direction and progression                         |
| Short bright rule | Category, result or focal anchor                  |
| Cropped ring      | Scale, focus or competition context               |
| Technical tick    | Data structure or positional rhythm               |
| Grain             | Material integration and gradient support         |
| Crest overlap     | Team identity crossing into the information layer |

Avoid using the same motif as a semantic indicator in one template and meaningless decoration in another.

### Establish a texture budget

A composition should usually contain:

- One primary structural motif.
- No more than one dominant atmospheric texture.
- Optional fine grain for integration.
- Quiet or empty zones around essential information.

Strong grain, dense lines, halftones, glow and image texture on the same surface will normally produce an amateur result.

## Fixtura grayscale luminance masters

A Fixtura grayscale master is not finished monochrome artwork. It is a luminance map that will be dynamically recoloured using organisation colours while preserving intentional black and white detail.

### Conceptual colour mapping

```text
dark grayscale
      ↓
theme primary

middle grayscale
      ↓
primary → secondary interpolation

light grayscale
      ↓
theme secondary
```

Intentional black and white graphic elements are treated separately as protected linework so that they remain present after the surrounding grayscale artwork is recoloured.

### Standard luminance bands

| Master luminance | Rendered role                      |
| ---------------- | ---------------------------------- |
| 0–2%             | Protected black core               |
| 2–8%             | Black transition band              |
| 8–15%            | Primary colour region              |
| 15–85%           | Primary-to-secondary interpolation |
| 85–92%           | Secondary colour region            |
| 92–98%           | White transition band              |
| 98–100%          | Protected white core               |

These ranges create stable black and white cores with transition bands that reduce harsh antialiasing or halo artefacts at their edges.

### Design implications

- Use true or near-true black only for linework intended to remain black.
- Use true or near-true white only for linework intended to remain white.
- Keep ordinary dark artwork outside the protected-black threshold.
- Keep ordinary light artwork outside the protected-white threshold.
- Use middle luminance deliberately to control where primary and secondary colours blend.
- Inspect edge pixels after resizing because antialiasing creates new intermediate luminance values.

### Protected linework

Protected black and white should normally be used for:

- Fine rules.
- Technical markings.
- Small high-contrast details.
- Intentional highlights and shadows.
- Graphic accents that must survive any organisation palette.

Do not protect large areas by default. Large pure-black or pure-white regions can overpower pale or dark organisation themes.

### Transition bands

A transition band blends between a protected core and the themed artwork around it. Without this band, antialiased pixels may be incorrectly recoloured, producing bright or dark outlines.

The transition should be visually smooth at final size. It does not need to appear wide in the source master.

### Supersampling

Render complex luminance masters above delivery resolution, then downsample once. Supersampling can improve:

- Diagonal edges.
- Thin protected linework.
- Mask transitions.
- Curves and fine geometric detail.

It does not fix poorly chosen thresholds or inconsistent geometry. Test both 2× and 4× only when the quality difference justifies the cost.

### Validate the recolour result, not only the master

A convincing grayscale image can produce weak themed output. Test:

- Very dark primary and secondary colours.
- Very pale colours.
- Highly saturated combinations.
- Primary and secondary colours with similar luminance.
- Near-complementary colours.
- Output with and without protected linework.
- Final image or video compression.

## Luminance-master generation rules

When generating a new master from a reference image:

- Use the reference for composition, visual language, geometry, rhythm and balance.
- Do not simply desaturate or trace the reference.
- Rebuild the concept as an original grayscale interpretation.
- Use tonal regions intentionally for later colour interpolation.
- Reserve protected thresholds for intentional linework.
- Keep all repeated geometry internally consistent.
- Avoid soft photographic lighting when the intended output requires clear colour zones.
- Preserve quiet regions for template content.

### LLM prompt for a grayscale master

```text
Create a high-quality grayscale background master for Fixtura using the
provided reference image as a guide to composition, visual language,
geometry, layering, rhythm, balance, texture and movement.

Do not copy or simply desaturate the reference. Create an original
interpretation suitable for dynamic recolouring.

Treat grayscale luminance as a theme map:
- 0–2%: protected black core;
- 2–8%: black transition;
- 8–15%: primary colour region;
- 15–85%: primary-to-secondary interpolation;
- 85–92%: secondary colour region;
- 92–98%: white transition;
- 98–100%: protected white core.

Use pure black and pure white only for intentional protected linework.
Keep ordinary tonal artwork outside those protected cores. Use clean
transition bands around protected edges and consistent directional
geometry throughout the composition.

Leave controlled quiet areas for scores, team names, metadata and sponsor
content. The output is a luminance master, not finished coloured artwork.
```

## LLM asset-selection protocol

An LLM should follow this process whenever it selects or generates an SVG, pattern or texture.

### Step 1: Read the template brief

Extract explicit constraints:

```json
{
  "templateType": "results",
  "format": "portrait-social",
  "canvas": { "width": 1080, "height": 1350 },
  "contentDensity": "high",
  "focalZones": ["score", "team-identity"],
  "quietZones": ["match-meta", "sponsor"],
  "visualCharacter": ["authoritative", "energetic", "technical"],
  "geometry": {
    "direction": "forward-right",
    "angleDegrees": 10,
    "cutSizes": [12, 24, 42]
  },
  "themeMode": "dynamic-organisation-colours",
  "renderTarget": "remotion",
  "motionAllowed": true,
  "approvedAssetLibrary": "manifest-reference"
}
```

If a constraint is missing, state the assumption. Do not invent brand rules, approved logos, theme behaviour or asset availability.

### Step 2: Classify the asset role

Choose one primary role:

- Structural.
- Semantic.
- Atmospheric.
- Transitional.
- Masking.

State the role before describing the asset's appearance.

### Step 3: Choose the medium

Select CSS, inline SVG, external SVG or raster texture according to the required control, scalability, complexity and rendering behaviour.

The LLM must explain why the chosen medium is more suitable than the nearest alternative.

### Step 4: Connect it to the motif grammar

Specify:

- Which existing motif it uses.
- How its geometry relates to structural angles.
- Whether it repeats or appears once.
- Which layer it occupies.
- Which content zones it must avoid.

A new motif should be proposed only when existing motifs cannot express the concept.

### Step 5: Define measurable parameters

The recommendation must provide values or bounded ranges for:

- Scale.
- Density.
- Angle or direction.
- Stroke or dot size.
- Opacity.
- Colour role.
- Repeat dimensions.
- Blend mode if any.
- Fade region.
- Motion behaviour.

Avoid vague instructions such as “make it subtle” without defining how subtle is achieved.

### Step 6: Evaluate production risks

Check:

- Theme contrast.
- Pattern seams.
- Moiré and video flicker.
- Filter and mask support.
- Path or DOM complexity.
- Duplicate SVG IDs.
- External asset loading.
- Unsafe SVG content.
- Final compression.
- Accessibility if semantic or interactive.

### Step 7: Return a structured recommendation

```json
{
  "assetType": "inline-svg-pattern",
  "primaryRole": "atmospheric",
  "motif": "parallel-forward-slashes",
  "purpose": "reinforce directional energy behind the result surface",
  "mediumReason": "SVG pattern provides a scalable repeat and direct theme control",
  "geometryRelationship": "parallel-to-primary-panel-cut",
  "placement": {
    "layer": "atmosphere",
    "regions": ["upper-right", "outer-edge"],
    "avoid": ["score", "team-name", "sponsor"]
  },
  "parameters": {
    "angleDegrees": 10,
    "tileWidth": 48,
    "tileHeight": 48,
    "strokeWidth": 2,
    "opacity": 0.08,
    "colourRole": "on-surface",
    "repeat": true,
    "blendMode": "normal",
    "motion": "none"
  },
  "themeBehaviour": "semantic-token",
  "protectedLinework": false,
  "renderRisks": ["moire-at-small-output", "excess-contrast-on-pale-themes"],
  "requiredTests": [
    "light-theme",
    "dark-theme",
    "similar-luminance-theme",
    "1080x1350-export",
    "video-compression"
  ],
  "confidence": "high"
}
```

## LLM generation rules

An LLM generating or recommending assets must:

- Classify the asset role before selecting a medium.
- Use the existing motif grammar unless a new motif is justified.
- Reuse shared angle, spacing, colour and opacity tokens.
- Keep structural and atmospheric layers independently controllable.
- Provide measurable texture parameters.
- Preserve quiet zones around essential content.
- Use only verified identity assets.
- Produce valid, minimal SVG markup when SVG is selected.
- Generate unique IDs for reusable definitions.
- Avoid external dependencies unless explicitly allowed.
- State assumptions, risks and required tests.
- Treat Remotion output as deterministic frame-based media.

An LLM must not:

- Add generic stadium lights, speed lines, grass or grunge merely because the subject is sport.
- Use texture to conceal unresolved layout or hierarchy.
- Introduce multiple unrelated angles.
- Trace or copy a supplied reference when asked for an original interpretation.
- Place high-contrast texture directly behind scores or small metadata.
- Recolour official crests or sponsor logos without permission.
- Generate unnecessary path complexity.
- Use untrusted external URLs, scripts or event handlers in SVG.
- Depend on wall-clock randomness or animation during deterministic rendering.
- Claim cross-browser support without testing the production renderer.

## Prompt template for an LLM

```text
Act as a senior visual-systems designer working on a data-driven Fixtura
sports template.

Select or generate an SVG, pattern or texture using the supplied template
brief, CSS geometry system, approved asset manifest and theme rules.

Analyse the request in this order:
1. Classify the asset as structural, semantic, atmospheric, transitional
   or masking.
2. Identify the exact visual or information problem it must solve.
3. Choose CSS, inline SVG, external SVG or raster texture.
4. Connect the asset to the existing motif and geometry grammar.
5. Define scale, density, direction, colour role, opacity, repetition,
   placement, fade and motion.
6. Protect quiet zones around essential content.
7. Evaluate theme, renderer, performance, security and compression risks.

Do not introduce generic sports decoration. Do not create a new motif when
an approved motif can perform the role. Do not use an atmospheric texture
to solve a structural layout problem.

Return:
- primary asset role;
- selected medium and reason;
- motif and geometry relationship;
- exact measurable parameters;
- theme and recolour behaviour;
- placement and protected content zones;
- implementation outline or valid minimal SVG;
- rendering and security risks;
- required visual tests;
- confidence level.

For a grayscale Fixtura luminance master, apply the documented protected
black, transition, theme interpolation, white transition and protected
white bands exactly.
```

## SVG generation and security

SVG is an XML-based document format and can contain more than static geometry. Treat imported or generated SVG markup as code-capable content.

### Disallow unsafe features by default

For template assets, reject or remove:

- `<script>`.
- Inline event handlers such as `onclick` or `onload`.
- `<foreignObject>` unless a reviewed use case explicitly requires it.
- Remote image, font, stylesheet or `<use>` references.
- JavaScript URLs.
- Unreviewed animation elements.
- Metadata that contains unnecessary private information.

Sanitise untrusted SVG before injecting it into application markup. Do not rely on an LLM prompt alone as a security boundary.

### Keep markup minimal and inspectable

- Remove editor metadata and unused definitions.
- Round excessive coordinate precision when it does not affect the result.
- Preserve the `viewBox`.
- Avoid flattening every reusable shape into a unique path.
- Use descriptive IDs and classes.
- Keep filters bounded.
- Validate XML and referenced IDs.

Optimisation must not change appearance, remove required accessibility information or alter protected linework thresholds.

## React and Remotion implementation

### Use React attribute names

Inline SVG in JSX uses React property naming for attributes such as `className`, `strokeWidth`, `stopColor`, `clipPath` and `fillRule`.

```tsx
export const ForwardRule = ({ colour }: { colour: string }) => (
  <svg viewBox="0 0 240 80" aria-hidden="true">
    <path d="M190 0H210L170 80H150Z" fill={colour} opacity={0.9} />
  </svg>
);
```

### Drive motion from the frame

For Remotion, derive animation from `useCurrentFrame()` and composition timing so the same frame always produces the same visual state.

```tsx
const frame = useCurrentFrame();
const progress = interpolate(frame, [0, 18], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

<path
  d={pathData}
  pathLength={1}
  strokeDasharray={1}
  strokeDashoffset={1 - progress}
/>;
```

Avoid relying on CSS wall-clock animation, SMIL timing or unseeded randomness for exported video.

### Use stable randomness

When generating procedural dots, grain or fragments, use a deterministic seed based on stable input. Do not call `Math.random()` during render.

The same organisation, template and frame should reproduce the same geometry unless deliberate variation is part of the design contract.

### Avoid invisible oversized work

SVG filters, masks and off-canvas geometry can cause large intermediate render surfaces. Keep bounds close to the visible result and inspect performance at the target supersampling factor.

### Rasterise only when it improves reliability

Pre-render a complex static SVG or procedural texture when:

- It is repeated many times.
- It contains expensive filters.
- It never changes by theme or data.
- Rasterisation removes a known renderer inconsistency.

Keep the vector source as the editable master and record the raster output dimensions.

## Accessibility

Decorative SVGs should not create noise for assistive technology.

```tsx
<svg aria-hidden="true" focusable="false" viewBox="0 0 100 100">
  ...
</svg>
```

Meaningful SVGs should receive an accessible name through surrounding text, `aria-label`, or `<title>` and `<desc>` where appropriate.

Do not encode a result state through colour or an unlabeled icon alone. The visible text should carry the essential meaning.

## Asset manifest

Maintain a reviewed manifest for reusable Fixtura assets.

```json
{
  "id": "fx-pattern-forward-slashes-v1",
  "name": "Forward Slashes",
  "medium": "inline-svg-pattern",
  "primaryRole": "atmospheric",
  "motifFamily": "forward-geometry",
  "viewBox": "0 0 48 48",
  "themeInputs": ["on-surface"],
  "defaultOpacity": 0.08,
  "geometry": {
    "angleDegrees": 10,
    "strokeWidth": 2,
    "tileSize": [48, 48]
  },
  "supportsMotion": false,
  "protectedLinework": false,
  "approvedUses": ["results", "fixtures", "ladders"],
  "discouragedUses": ["sponsor-zone", "dense-metadata"],
  "testedOutputs": ["1080x1350", "1080x1080", "1920x1080-video"],
  "version": 1
}
```

The manifest gives an LLM verified options and constraints. Do not make the model infer technical properties from an asset preview.

## Production test matrix

Every reusable asset should be checked against representative extremes.

| Dimension   | Test cases                                                  |
| ----------- | ----------------------------------------------------------- |
| Theme       | Dark, pale, saturated, muted and similar-luminance colours  |
| Canvas      | Portrait, square, landscape and smallest supported output   |
| Content     | Empty, typical, long and maximum-density states             |
| Scale       | Native, 2× supersampling and final downsample               |
| Motion      | First frame, peak movement, settled frame and loop boundary |
| Compression | Final still format and target video codec/bitrate           |
| Renderer    | Production Chromium and interactive preview                 |
| Identity    | Pale, dark, wide and unusually detailed crests or logos     |

### Inspect for these failures

- One-pixel seams between neighbouring shapes.
- Clipped filter shadows or blur.
- Moiré and flicker.
- Visible tile boundaries.
- Pattern phase changing unexpectedly between sizes.
- Duplicate definition IDs.
- Texture competing with text.
- Protected linework halos.
- Theme colours collapsing into one tonal field.
- Fallback or missing external assets.
- Motion that changes between identical renders.

## Common causes of an amateur result

- Adding texture before layout and hierarchy are resolved.
- Using several unrelated motifs in one composition.
- Making every empty area visually active.
- Applying a literal sport texture without a conceptual reason.
- Using strong grain, glow, halftone and line patterns together.
- Mixing approximately similar angles instead of sharing geometry.
- Placing high-frequency detail behind small text.
- Recolouring official identity assets as decoration.
- Allowing a repeating tile edge to become visible.
- Treating pure black and white casually in a luminance master.
- Using unstable randomness in video.
- Shipping editor-generated SVG markup without sanitisation or cleanup.
- Using filters whose bounds or cost have not been tested.
- Judging only the source SVG or grayscale master rather than final output.

## Quality checklist

| Check       | Question                                                                         |
| ----------- | -------------------------------------------------------------------------------- |
| Role        | Is the asset clearly structural, semantic, atmospheric, transitional or masking? |
| Purpose     | What specific design or information problem does it solve?                       |
| Medium      | Is CSS, SVG or raster the simplest reliable choice?                              |
| Grammar     | Does it reuse the approved motif and geometry system?                            |
| Hierarchy   | Does it remain subordinate to the content it supports?                           |
| Parameters  | Are scale, density, direction, opacity and repetition defined?                   |
| Theme       | Has it been tested with extreme organisation colours?                            |
| Identity    | Are logos and crests used in approved forms?                                     |
| Safety      | Is SVG content local, minimal and sanitised?                                     |
| Determinism | Does the same frame and input reproduce the same result?                         |
| Performance | Are paths, filters, masks and render bounds controlled?                          |
| Output      | Has it been inspected at final size and compression?                             |
| Luminance   | Are protected cores and transition bands behaving correctly?                     |

## A practical order of operations

1. Resolve layout, hierarchy and content zones.
2. Identify the exact role the asset must perform.
3. Choose CSS, inline SVG, external SVG or raster.
4. Reuse an existing motif before inventing a new one.
5. Bind geometry and colours to shared semantic tokens.
6. Define measurable texture or asset parameters.
7. Protect content and sponsor quiet zones.
8. Build the simplest inspectable implementation.
9. Validate SVG safety, IDs, bounds and external references.
10. Test theme extremes and difficult data.
11. Render at production size, supersampling and compression.
12. Remove or reduce the asset if it does not materially improve structure, identity, focus or atmosphere.

> **Final rule.** The best pattern or texture does not announce itself as an effect. It makes the composition feel intentional, gives related templates a shared visual memory and remains dependable under every colour, data and rendering condition.

## Official references

- [W3C SVG 2 specification](https://www.w3.org/TR/SVG2/)
- [W3C CSS Masking Module](https://www.w3.org/TR/css-masking-1/)
- [W3C Filter Effects Module](https://www.w3.org/TR/filter-effects-1/)
- [Remotion: Animating properties](https://www.remotion.dev/docs/animating-properties)
- Companion guide: `CSS Professional Design Techniques.md`
- Companion guide: `Google Fonts for Professional Graphic Design.md`

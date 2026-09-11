# CSS Professional Design Techniques

_A practical field guide to depth, transparency, gradients, shapes, texture, typography, motion, compositing and recognisable visual systems_

Professional CSS design is less about finding one impressive effect and more about controlling hierarchy, contrast, depth, rhythm and restraint. This guide explains the techniques that create those qualities, with reusable CSS patterns for interfaces, campaign graphics and data-driven sports overlays.

| Design goal | CSS tools                                                       |
| ----------- | --------------------------------------------------------------- |
| Depth       | Alpha layers, backdrop blur, shadows, highlights, isolation     |
| Energy      | Angles, clipping, transforms, directional gradients, motion     |
| Focus       | Vignettes, masks, contrast scrims, typography hierarchy         |
| Identity    | Design tokens, motif grammar, geometry, type treatment, texture |
| Polish      | Optical borders, layered shadows, responsive detail, restraint  |

> **Core principle.** Use CSS effects to reinforce information and brand structure. If an effect does not improve hierarchy, legibility, identity or motion, remove it.

---

## How to build polished CSS

Start with a visual system, then layer effects deliberately. The same techniques look professional when their values are related and amateur when every element invents its own treatment.

### Design tokens with custom properties

Store colour, alpha, radius, shadow, spacing and timing decisions as named variables. Tokens make a design coherent and allow one component to adapt to different clubs or organisations.

**Best for:** Themeable products, templates, reusable overlays and dark or light modes.

```css
:root {
  --primary: #0c1444;
  --secondary: #f20100;
  --surface: #11182f;
  --text: #ffffff;
  --radius-sm: 8px;
  --radius-lg: 22px;
  --shadow-elevated: 0 18px 50px rgb(0 0 0 / 32%);
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);

  /* Shared geometry */
  --fx-slant: 10deg;
  --fx-slant-reverse: -10deg;
  --fx-cut-sm: 12px;
  --fx-cut-md: 24px;
  --fx-cut-lg: 42px;
  --fx-rule: 3px;
}
.team-panel {
  background: color-mix(in srgb, var(--primary) 88%, black);
  color: var(--text);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-elevated);
}
```

> **Watch for:** Too many tokens create indirection. Tokenise repeated design decisions, not every isolated number.

### Layer before decorating

A reliable visual stack is background, atmosphere, structural surfaces, content and finishing details. Give each layer a job and keep content above decorative elements with a predictable stacking context.

**Best for:** Complex cards, lower thirds, score graphics and hero sections.

```css
.graphic {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}
.graphic::before {
  /* atmosphere */
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
}
.graphic::after {
  /* texture or highlight */
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}
```

> **Watch for:** Unplanned z-index values. Create local stacking contexts with isolation instead of escalating to z-index 9999.

## Transparency and glass

### Alpha colour instead of element opacity

Use alpha channels in the background colour when the surface should be translucent but its text and children must remain fully opaque.

**Best for:** Overlays, labels, captions and readable surfaces over imagery.

```css
.overlay {
  background: rgb(12 20 68 / 82%);
  color: rgb(255 255 255 / 96%);
}
/* Avoid when children must stay opaque */
.wrong {
  opacity: 0.82;
}
```

> **Watch for:** opacity affects the entire rendered subtree, including text, icons and borders.

### Glassmorphism

Glass combines a translucent surface, backdrop blur, subtle saturation, an optical border and a grounded shadow. The blurred content behind the panel is what creates the material effect.

**Best for:** Premium UI panels, floating controls and restrained broadcast overlays.

```css
.glass-panel {
  background: linear-gradient(
    145deg,
    rgb(255 255 255 / 18%),
    rgb(255 255 255 / 8%)
  );
  backdrop-filter: blur(16px) saturate(145%);
  -webkit-backdrop-filter: blur(16px) saturate(145%);
  border: 1px solid rgb(255 255 255 / 22%);
  box-shadow:
    0 18px 45px rgb(0 0 0 / 28%),
    inset 0 1px 0 rgb(255 255 255 / 18%);
}
```

> **Watch for:** Glass needs visual content behind it. Maintain a solid-colour fallback and test text contrast on the brightest possible background.

### Tinted translucent surfaces

Instead of neutral white glass, tint the transparent layer toward the brand colour. This keeps the surface connected to the identity without becoming a flat block.

**Best for:** Club-colour panels, data chips and grouped metadata.

```css
.tinted-surface {
  background: rgb(12 20 68 / 72%); /* fallback */
  background: color-mix(in srgb, var(--team-color) 72%, transparent);
  border: 1px solid color-mix(in srgb, var(--team-color) 60%, white);
  backdrop-filter: blur(10px);
}
```

> **Watch for:** color-mix support should be considered for older embedded browsers. Supply a normal background declaration first as fallback.

## Gradients and controlled transitions

### Linear gradients

Linear gradients create direction, separation and perceived light. Multiple colour stops give better control than a simple two-colour blend.

**Best for:** Hero backgrounds, team panels, ribbons, lighting sweeps and subtle surface variation.

```css
.directional-panel {
  background: linear-gradient(
    118deg,
    color-mix(in srgb, var(--primary) 92%, black) 0%,
    var(--primary) 52%,
    color-mix(in srgb, var(--primary) 70%, white) 100%
  );
}
```

> **Watch for:** Equal spacing between every stop often looks synthetic. Position stops to create a deliberate bright zone and a deliberate quiet zone.

### Gradients to transparency

Fade a colour to transparent to soften the edge of an overlay without fading the element's content. Use the same RGB colour on both ends where older interpolation behaviour matters.

**Best for:** Video scrims, title fades, lower thirds, edge protection and image-to-background transitions.

```css
.caption-scrim {
  background: linear-gradient(
    to top,
    rgb(0 0 0 / 86%) 0%,
    rgb(0 0 0 / 55%) 42%,
    rgb(0 0 0 / 0%) 100%
  );
}
```

> **Watch for:** A fade that ends too early leaves text sitting directly on unpredictable imagery.

### Radial light fields

Radial gradients imitate pools of light and naturally guide attention toward a crest, score or CTA.

**Best for:** Spotlighting key content and breaking up large flat backgrounds.

```css
.spotlight {
  background: radial-gradient(
      circle at 78% 22%,
      rgb(255 255 255 / 24%),
      transparent 32%
    ),
    radial-gradient(circle at 18% 82%, rgb(242 1 0 / 22%), transparent 38%),
    #0c1444;
}
```

> **Watch for:** Large bright radial fields can wash out text. Place them away from dense information or add a local scrim.

### Mesh gradients

Layer several radial gradients over a base colour to make a soft, modern colour field. Keep each gradient restrained so the result reads as atmosphere rather than blobs.

**Best for:** Campaign backgrounds, loading states, presentation cards and premium empty states.

```css
.mesh {
  background-color: #0d1226;
  background-image: radial-gradient(
      at 10% 15%,
      rgb(55 120 255 / 35%) 0,
      transparent 48%
    ),
    radial-gradient(at 88% 20%, rgb(242 1 0 / 24%) 0, transparent 42%),
    radial-gradient(at 70% 92%, rgb(130 80 255 / 20%) 0, transparent 46%);
}
```

> **Watch for:** Highly saturated mesh backgrounds compete with data and typography. Reduce saturation or opacity behind content.

### Conic gradients

Conic gradients rotate colour stops around a centre. They are useful for rings, angled illumination and colour sweeps.

**Best for:** Progress rings, radial indicators, animated borders and spotlight effects.

```css
.progress-ring {
  --progress: 72%;
  background: conic-gradient(
    var(--secondary) 0 var(--progress),
    rgb(255 255 255 / 12%) var(--progress) 100%
  );
  border-radius: 50%;
}
```

> **Watch for:** A conic gradient is a fill, not a semantic progress indicator. Preserve accessible text and ARIA values.

### Hard-stop gradients

Place two stops at the same position to create crisp bands, diagonal cuts and stripes without extra elements.

**Best for:** Sports graphics, stat bars, branded stripes and geometric backgrounds.

```css
.brand-bands {
  background: linear-gradient(
    112deg,
    var(--primary) 0 58%,
    var(--secondary) 58% 66%,
    #111827 66% 100%
  );
}
```

> **Watch for:** Hard stops can show antialiasing seams at some scales. Slightly overlap stops or test at the final output resolution.

## Shapes and geometry

### Clip paths

clip-path changes the visible silhouette without changing document flow. Polygon points are ideal for angled panels, tabs, arrows and cut corners.

**Best for:** Dynamic lower thirds, team blocks, badges and directional compositions.

```css
.angled-banner {
  --cut: var(--fx-cut-lg, 42px);
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--cut)) 100%, 0 100%);
}
.cut-corner {
  clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%);
}
```

> **Watch for:** Clipping can cut shadows and focus outlines. Put the shadow on a wrapper and keep interactive focus visible.

When a shadow should follow the clipped silhouette, place `filter: drop-shadow()` on an unclipped wrapper. A regular `box-shadow` follows the element's rectangular box and may also be clipped.

```css
.angled-banner-shell {
  filter: drop-shadow(0 14px 28px rgb(0 0 0 / 28%));
}
.angled-banner {
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--fx-cut-lg)) 100%, 0 100%);
}
```

### Gradient masks

Masks control an element's alpha independently from its colour. A black-to-transparent mask can fade an image, texture, pattern or entire group cleanly.

**Best for:** Faded imagery, disappearing patterns, feathered edges and soft reveals.

```css
.fade-right {
  -webkit-mask-image: linear-gradient(to right, #000 0 72%, transparent 100%);
  mask-image: linear-gradient(to right, #000 0 72%, transparent 100%);
}
```

> **Watch for:** Masking hides the entire element, including its children. Use a pseudo-element when only the decoration should fade.

### Image and SVG masks

An image or SVG can become a reusable alpha stencil, allowing any colour, gradient or image to fill a custom shape.

**Best for:** Crest silhouettes, texture cut-outs, icon systems and branded motifs.

```css
.crest-silhouette {
  background: linear-gradient(145deg, white, rgb(255 255 255 / 35%));
  -webkit-mask: url("/crest-mask.svg") center / contain no-repeat;
  mask: url("/crest-mask.svg") center / contain no-repeat;
}
```

> **Watch for:** External masks can fail because of cross-origin rules. Host them with the application or inline the SVG.

### Composite masks and cut-out frames

Multiple mask layers can be combined to create hollow frames, notches and borders that follow non-rectangular geometry.

**Best for:** Branded frames, cut-out panels and animated edge treatments.

```css
.cutout-frame::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 2px;
  background: linear-gradient(120deg, white, var(--secondary));
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

> **Watch for:** Composite-mask syntax and behaviour have varied between engines. Validate in the production renderer and retain a normal border fallback.

### Pseudo-elements as design layers

::before and ::after add highlights, edge accents, textures and geometry without cluttering semantic markup.

**Best for:** Reusable component polish and decorative layers that should never affect layout.

```css
.score-card {
  position: relative;
  overflow: hidden;
}
.score-card::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 6px;
  background: var(--secondary);
}
.score-card::after {
  content: "";
  position: absolute;
  width: 180px;
  aspect-ratio: 1;
  right: -70px;
  top: -90px;
  border: 1px solid rgb(255 255 255 / 16%);
  border-radius: 50%;
}
```

> **Watch for:** Decorative pseudo-elements should use pointer-events: none when they overlap controls.

### CSS shapes with borders

Zero-sized elements with asymmetric borders can form triangles and pointers. They remain useful for small speech bubbles and compact indicators.

**Best for:** Tooltips, pointers and tiny geometric accents.

```css
.tooltip::after {
  content: "";
  position: absolute;
  left: 24px;
  bottom: -8px;
  border: 8px solid transparent;
  border-top-color: #111827;
  border-bottom: 0;
}
```

> **Watch for:** For larger or more complex geometry, clip-path or SVG is easier to control.

## Borders, shadows and depth

### Optical borders

A one-pixel border with low alpha defines a surface without creating a heavy box. On dark surfaces, a light inner highlight often looks more natural than an opaque grey border.

**Best for:** Cards, glass panels, chips and dark-mode containers.

```css
.surface {
  border: 1px solid rgb(255 255 255 / 12%);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 8%);
}
```

> **Watch for:** A border must remain visible across all themed colours. Test very light and very dark club palettes.

### Layered shadows

Combine a broad ambient shadow with a tighter contact shadow. This looks more physical than one dense black blur.

**Best for:** Floating cards, modals, overlay stacks and prominent score panels.

```css
.elevated {
  box-shadow:
    0 2px 4px rgb(0 0 0 / 18%),
    0 12px 28px rgb(0 0 0 / 24%),
    0 30px 70px rgb(0 0 0 / 18%);
}
```

> **Watch for:** Large blurred shadows are expensive when many elements animate. Animate transform and opacity, not box-shadow.

### Inset highlights and bevels

Inset shadows can describe a material edge, pressed state or restrained bevel without adding extra markup.

**Best for:** Buttons, stat pills, dark panels and metallic or broadcast-inspired surfaces.

```css
.bevelled {
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 18%),
    inset 0 -1px 0 rgb(0 0 0 / 28%),
    0 10px 24px rgb(0 0 0 / 24%);
}
```

> **Watch for:** Strong bevels quickly look dated. Keep the highlight narrow and the alpha low.

### Gradient borders

Use layered backgrounds or a masked pseudo-element to create a border whose colour changes along its edge.

**Best for:** Premium cards, selected states and controlled brand accents.

```css
.gradient-border {
  border: 1px solid transparent;
  background:
    linear-gradient(#111827, #111827) padding-box,
    linear-gradient(120deg, rgb(255 255 255 / 45%), var(--secondary)) border-box;
  border-radius: 18px;
}
```

> **Watch for:** Keep the inner background explicit. Otherwise the border gradient fills the entire element.

## Texture, patterns and atmosphere

### Repeating gradients

Repeating gradients generate stripes, grids and scan lines without image assets.

**Best for:** Subtle sports texture, technical backgrounds, chart grids and placeholder patterns.

```css
.fine-stripes {
  background-image: repeating-linear-gradient(
    115deg,
    rgb(255 255 255 / 0%) 0 14px,
    rgb(255 255 255 / 5%) 14px 15px
  );
}
```

> **Watch for:** High-contrast repetition causes moire in video and resized images. Use low alpha and test at delivery size.

### CSS grid patterns

Two perpendicular gradients create a scalable technical grid. Mask the pattern so it appears only where it supports the composition.

**Best for:** Data products, analysis graphics and background structure.

```css
.data-grid {
  background-image: linear-gradient(rgb(255 255 255 / 6%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 6%) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: radial-gradient(circle at 70% 40%, #000, transparent 72%);
}
```

> **Watch for:** The grid should remain atmospheric. It should not compete with real table or chart lines.

### Noise and grain

Fine grain breaks up mathematically perfect gradients and helps digital layers feel tactile. Use a tiny SVG noise texture or generated data URI on a pseudo-element.

**Best for:** Large colour fields, cinematic overlays and reducing visible gradient banding.

```css
.textured::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("/textures/fine-noise.svg");
  opacity: 0.055;
  mix-blend-mode: soft-light;
  pointer-events: none;
}
```

> **Watch for:** Noise should be barely visible. Strong noise harms compression, readability and export quality.

### Vignettes

A vignette darkens or colours the perimeter while preserving a focal area. It can protect typography and keep the viewer's eye inside the frame.

**Best for:** Full-frame sports graphics, hero imagery and video compositions.

```css
.vignette::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 42%,
    rgb(0 0 0 / 22%) 72%,
    rgb(0 0 0 / 58%) 100%
  );
  pointer-events: none;
}
```

> **Watch for:** Avoid crushing edge detail or creating a visibly circular dark patch.

## Blend modes, filters and image treatment

### Mix blend modes

mix-blend-mode composites an element with everything behind it. screen removes dark areas, multiply removes light areas and overlay increases contrast.

**Best for:** Light leaks, texture integration, sponsor treatments and controlled experimental typography.

```css
.light-leak {
  mix-blend-mode: screen;
}
.ink-texture {
  mix-blend-mode: multiply;
}
.contrast-texture {
  mix-blend-mode: overlay;
}
.blend-group {
  isolation: isolate;
}
```

> **Watch for:** Blend results depend on the background. Wrap the composition in an isolated stacking context and test every theme.

### Background blend modes

background-blend-mode combines multiple backgrounds inside one element and is more contained than mix-blend-mode.

**Best for:** Tinting textures or photography within a self-contained surface.

```css
.branded-photo {
  background-image: linear-gradient(rgb(12 20 68 / 78%), rgb(12 20 68 / 78%)),
    url("/team-photo.jpg");
  background-size: cover;
  background-position: center;
  background-blend-mode: multiply;
}
```

> **Watch for:** The source image's tonal range changes the result. A contrast scrim may still be required behind text.

### Filters

filter can adjust brightness, contrast, saturation, blur and hue at render time. Multiple filter functions run in sequence.

**Best for:** Normalising supplied images, dimming backgrounds and creating hover or state changes.

```css
.background-photo {
  filter: saturate(0.72) contrast(1.08) brightness(0.68);
}
.disabled-logo {
  filter: grayscale(1) opacity(0.55);
}
```

> **Watch for:** Filters affect the whole rendered element. Apply them to an image layer, not a container holding text.

### Duotone image treatment

A grayscale image can be recoloured by combining blend modes, gradients or layered pseudo-elements. This creates consistency across mixed source photography.

**Best for:** Team photography, historical imagery and branded campaign panels.

```css
.duotone {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: var(--primary);
}
.duotone::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -2;
  background: url("/photo.jpg") center / cover;
  filter: grayscale(1) contrast(1.08);
}
.duotone::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  mix-blend-mode: color;
}
```

> **Watch for:** Faces and skin tones can become unnatural. Reserve strong duotone for deliberately graphic treatments.

### Controlled image crops

Treat focal position as data. A fixed `center` crop can remove faces, balls, crests or other important content when supplied imagery varies.

```css
.feature-image {
  --focus-x: 50%;
  --focus-y: 38%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: var(--focus-x) var(--focus-y);
}
```

> **Watch for:** Provide a safe default and validate extreme portrait, landscape and low-resolution source images.

## Typography as a graphic system

### Responsive type with clamp

clamp sets a minimum, fluid preferred size and maximum. It keeps display type proportional across viewports or render sizes.

**Best for:** Headlines, scores and responsive template systems.

```css
.score {
  font-size: clamp(3rem, 11vw, 9rem);
  line-height: 0.82;
  letter-spacing: -0.045em;
  font-variant-numeric: tabular-nums;
}
```

> **Watch for:** Viewport units inside embedded components may respond to the page rather than the component. Container units can be safer.

### Text shadows and separation

A small dark shadow can separate white text from changing imagery. Use multiple subtle layers for glow effects rather than one opaque blur.

**Best for:** Broadcast text, captions and type placed over photography.

```css
.image-title {
  color: white;
  text-shadow:
    0 1px 2px rgb(0 0 0 / 72%),
    0 6px 20px rgb(0 0 0 / 34%);
}
```

> **Watch for:** Shadow cannot rescue fundamentally poor contrast. Add a scrim or solid text surface first.

### Gradient text

Clip a background gradient to glyphs, then make the text fill transparent. It works best on large display type with a meaningful light direction.

**Best for:** Hero titles, metallic accents and short campaign statements.

```css
.gradient-text {
  color: #fff; /* fallback */
  background: linear-gradient(110deg, #fff 10%, #9fb8ff 46%, #fff 78%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

> **Watch for:** Avoid on long body copy and confirm the fallback remains readable.

### Stroke and outlined type

Text stroke can create display outlines or add separation when supported. A solid fallback colour remains important.

**Best for:** Large numerals, watermarks and short decorative labels.

```css
.outlined-number {
  color: transparent;
  -webkit-text-stroke: 2px rgb(255 255 255 / 42%);
  paint-order: stroke fill;
}
```

> **Watch for:** Thin strokes disappear at small sizes. Never use outlined type for essential small text.

### Oversized and cropped typography

Large numerals or short words can act as structural shapes behind the primary content. Cropping them against an edge creates scale without adding another decorative motif.

```css
.score-watermark {
  position: absolute;
  inset: auto -0.08em -0.22em auto;
  font:
    800 clamp(10rem, 30cqw, 24rem) / 0.72 "Barlow Condensed",
    "Arial Narrow",
    sans-serif;
  letter-spacing: -0.06em;
  color: rgb(255 255 255 / 6%);
  pointer-events: none;
  user-select: none;
}
```

> **Watch for:** Watermark type should support the composition without becoming a second score. Keep its contrast low and its crop deliberate.

### Typographic hierarchy through contrast

Professional type systems change several variables together: size, weight, width, case, tracking and opacity. Scores can dominate while team names anchor identity and metadata recedes.

**Best for:** Results graphics, dashboards, cards and dense information displays.

```css
.score {
  font:
    800 7rem/0.8 "Barlow Condensed",
    "Arial Narrow",
    sans-serif;
}
.team {
  font:
    700 2rem/0.95 "Barlow Condensed",
    "Arial Narrow",
    sans-serif;
  text-transform: uppercase;
}
.meta {
  font:
    600 0.78rem/1.2 "Aptos",
    system-ui,
    sans-serif;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(255 255 255 / 68%);
}
```

> **Watch for:** Do not rely on colour alone to communicate rank. Size and spacing should make the hierarchy obvious in grayscale.

## Layout, rhythm and responsive composition

### Grid for deliberate alignment

CSS Grid makes relationships explicit. Named areas help keep crests, identities and scores locked into a consistent system.

**Best for:** Match rows, dashboards, leaderboards and template-driven graphics.

```css
.match {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) auto;
  grid-template-areas:
    "crest team score"
    "crest meta score";
  gap: 4px 18px;
  align-items: center;
}
```

> **Watch for:** Avoid letting long names push scores out of alignment. Use minmax(0, 1fr), wrapping or controlled truncation.

### Subgrid for repeated alignment

When supported, `subgrid` lets repeated children inherit the parent track system. This keeps team names, scores and metadata aligned across multiple match rows without duplicating column measurements.

```css
.results {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) minmax(5ch, auto);
}
.match {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / -1;
}
```

> **Watch for:** Use a conventional Grid fallback if the target export engine does not support subgrid.

### Intrinsic sizing

min(), max(), clamp(), minmax(), fit-content and aspect-ratio let components respond to available space without brittle breakpoint ladders.

**Best for:** Reusable cards and graphics rendered at several aspect ratios.

```css
.panel {
  width: min(92vw, 860px);
  padding: clamp(18px, 3vw, 42px);
  border-radius: clamp(12px, 1.6vw, 24px);
}
.crest {
  width: clamp(54px, 8cqw, 110px);
  aspect-ratio: 1;
}
```

> **Watch for:** Container query units require a query container. Define container-type on the appropriate parent.

### Container queries

Container queries let a component adapt to its own allocated width rather than the entire viewport.

**Best for:** Cards reused in sidebars, grids, full-screen scenes and responsive Remotion compositions.

```css
.match-shell {
  container-type: inline-size;
}
@container (width < 560px) {
  .match {
    grid-template-columns: 52px 1fr;
  }
  .score {
    grid-column: 1 / -1;
    justify-self: end;
  }
  .secondary-meta {
    display: none;
  }
}
```

> **Watch for:** Responsive removal should target optional detail, never essential scores, team identity or outcome.

### Negative space as a design tool

CSS gap, padding and max-width create grouping more reliably than borders around everything. Tight spacing signals a relationship; generous spacing signals a new group.

**Best for:** Any information-heavy interface or overlay.

```css
.results-list {
  display: grid;
  gap: 28px;
}
.match-main {
  display: grid;
  gap: 8px;
}
.match-meta {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid rgb(255 255 255 / 12%);
}
```

> **Watch for:** Uniform spacing everywhere removes hierarchy. Use a small, intentional spacing scale.

## Building a recognisable design language

Technical polish and visual identity are different goals. A graphic can use excellent gradients, shadows and typography yet still feel generic. Identity emerges when a small set of decisions is repeated consistently across many compositions.

> **Identity principle.** Repeat a controlled visual grammar with enough variation to fit the content. Do not invent a new aesthetic for every template.

### Define a motif grammar

A motif grammar specifies which visual moves belong to the system, what each one communicates and how often it may appear. The grammar should be small enough that another designer or developer can apply it without guessing.

| System       | Decision to define                                                      |
| ------------ | ----------------------------------------------------------------------- |
| Geometry     | Dominant angle, secondary cut and permitted corner treatments           |
| Direction    | The direction that represents forward movement or progression           |
| Surfaces     | Whether identity is carried by large colour fields, cards or open space |
| Typography   | Display family, numerical treatment, case and width contrast            |
| Dividers     | Rules, bands, gaps, interruptions or complete borders                   |
| Depth        | Mostly flat layers, restrained elevation or strongly separated planes   |
| Texture      | One recurring pattern, grain or technical marking system                |
| Interruption | Which elements may overlap, crop or break a boundary                    |
| Motion       | Shared entry direction, easing and reveal order                         |

For a Fixtura-style sports system, a suitable grammar might use substantial organisation-colour surfaces, condensed display typography, one forward angle, short interrupted rules, oversized scores and restrained technical markings. The system gains character through repetition, not through a large number of unrelated effects.

### Give every motif a job

A recurring device is stronger when its purpose remains consistent.

- A forward cut can signal direction or progression.
- A short bright rule can mark a result, category or transition.
- An oversized cropped numeral can create scale and identify the score layer.
- A quiet grid can suggest structure, data or competition organisation.
- An overlapping crest can connect identity to a team-colour surface.

Avoid using the same motif decoratively in one template and semantically in another. Inconsistent meaning weakens the system.

### Create a geometry system

Angles look related only when they are derived from shared rules. A collection of approximately similar polygons and gradient directions will feel accidental, especially when panels sit next to one another.

```css
:root {
  --fx-slant: 10deg;
  --fx-slant-reverse: -10deg;
  --fx-cut-sm: 12px;
  --fx-cut-md: 24px;
  --fx-cut-lg: 42px;
  --fx-rule: 3px;
}

.fx-cut-forward {
  --cut: var(--fx-cut-md);
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--cut)) 100%, 0 100%);
}

.fx-slash {
  width: var(--fx-rule);
  transform: skewX(var(--fx-slant-reverse));
  transform-origin: center;
}
```

Use explicit system rules alongside the tokens:

- All forward cuts descend in the same direction.
- Adjacent surfaces use the same cut measurement or a deliberate multiple of it.
- Rules, light sweeps and cropped image edges run parallel to structural cuts.
- Reverse angles are reserved for opposition, collision or a change in direction.
- Text, numbers and crests remain optically level unless distortion is the concept.
- A new angle must solve a structural problem rather than merely add energy.

Pixel-based cuts produce different apparent angles when component heights change. If exact parallel geometry is essential across variable-height elements, calculate the cut from a shared angle and measured height in JavaScript, or constrain those elements to a shared height. CSS trigonometric functions can also derive the offset where the target render engine supports them.

### Choose what may break the grid

Intentional overlap creates identity when it is selective. Allow one class of important element—such as crests, scores or result markers—to cross a panel edge while ordinary metadata remains aligned inside the grid.

```css
.team-lockup {
  position: relative;
  padding-inline-start: 76px;
}
.team-lockup__crest {
  position: absolute;
  inset-inline-start: -18px;
  top: 50%;
  width: 82px;
  aspect-ratio: 1;
  transform: translateY(-50%);
  z-index: 2;
}
```

> **Watch for:** When every element overlaps, none of the overlaps feels intentional. Boundary-breaking should be reserved for identity or primary information.

### Build contrast architecture

Contrast should be budgeted across the composition rather than maximised on every surface. A useful sports-results hierarchy is:

1. Score, result or outcome: highest contrast.
2. Team identity and crest: strong contrast.
3. Leading performance: medium-high contrast.
4. Supporting performances: medium contrast.
5. Match metadata: reduced contrast.
6. Decorative texture: barely perceptible.
7. Sponsor zone: clearly separated but quieter than the result.

This hierarchy should remain apparent in grayscale. Colour can reinforce it, but size, position, weight and spacing must establish it first.

```css
.result-score {
  color: rgb(255 255 255 / 100%);
}
.team-name {
  color: rgb(255 255 255 / 92%);
}
.performance {
  color: rgb(255 255 255 / 78%);
}
.match-meta {
  color: rgb(255 255 255 / 58%);
}
.atmosphere {
  opacity: 0.08;
}
```

Treat these values as relationships, not universal constants. Very light team colours may require dark text and a reversed contrast scale.

### Normalise unpredictable theme colours

User-supplied club and organisation colours can be pale, dark, highly saturated or nearly identical. Raw brand colours are inputs, not automatically production-ready surface colours.

Derive semantic tokens such as:

```css
.graphic {
  --surface-strong: var(--derived-surface-strong);
  --surface-soft: var(--derived-surface-soft);
  --on-surface: var(--derived-on-surface);
  --on-surface-muted: var(--derived-on-surface-muted);
  --accent-visible: var(--derived-accent-visible);
}
```

The derivation layer should:

- Select dark or light foreground text from measured contrast.
- Darken very pale colours before using them as large surfaces.
- Restrain highly saturated colours behind dense information.
- Separate primary and secondary colours when their luminance is too similar.
- Provide a neutral fallback when supplied colours cannot create adequate hierarchy.
- Preserve the organisation's recognisable hue while changing its production role.

CSS `color-mix()` is useful after these roles are known, but CSS alone should not be expected to guarantee contrast for arbitrary inputs. For a data-driven renderer, calculate accessible semantic colours in the application and expose them as custom properties.

## Data-resilient graphic composition

Generated graphics must look intentional across incomplete, uneven and unusually long data. Design states before adding decorative effects.

### Define the content contract

For every component, identify:

- Required fields that always reserve space.
- Optional fields that collapse completely when absent.
- Repeatable fields with an explicit maximum.
- Text that may wrap and text that must remain on one line.
- Fallbacks for missing crests, photos or sponsor assets.
- Exceptional states such as draws, forfeits, abandoned matches and multiple innings.

> **Resilience principle.** Missing content should collapse intentionally; it must not leave a hole that resembles a rendering failure.

### Model explicit layout states

Do not rely on one flexible layout to accidentally handle every case. Use state attributes or classes so exceptional content has deliberate rules.

```css
.performances:empty {
  display: none;
}

.match[data-performance-count="1"] .performances {
  grid-template-columns: 1fr;
}

.match[data-performance-count="2"] .performances {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.match[data-has-crest="false"] .team-lockup {
  padding-inline-start: 0;
}

.match[data-result="abandoned"] .result-score {
  font-size: clamp(2rem, 6cqw, 4.5rem);
}
```

Useful test cases include:

| Content variable | Cases to test                                                   |
| ---------------- | --------------------------------------------------------------- |
| Performances     | None, one, typical count and maximum count                      |
| Team names       | Short, long, shared prefix and unexpected casing                |
| Scores           | Single digit, large totals, decimals, innings and text outcomes |
| Match state      | Win, loss, draw, tie, forfeit, abandoned and no result          |
| Identity assets  | Valid crest, missing crest, pale crest and unusually wide crest |
| Sponsor          | Absent, one logo, multiple logos, dark logo and white logo      |
| Match count      | One item, typical list and maximum supported list               |

### Preserve alignment when data differs

Unequal content should not cause the primary reading line to wander. Lock crests, team names and scores to a shared grid, then allow metadata to wrap beneath them.

```css
.match {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr) minmax(5ch, auto);
  grid-template-areas:
    "crest identity score"
    "crest details  score";
  align-items: center;
}
.match__identity {
  grid-area: identity;
  min-width: 0;
}
.match__score {
  grid-area: score;
  justify-self: end;
}
.match__details {
  grid-area: details;
  min-width: 0;
}
```

If optional performance content disappears, close the gap or let the remaining team surface reclaim the space. Do not leave an empty cell simply to preserve symmetry.

### Control text failure modes

Use wrapping, clamping and size variants deliberately. Truncation is suitable for secondary metadata but risky for team identity or match outcomes.

```css
.team-name {
  min-width: 0;
  overflow-wrap: anywhere;
  text-wrap: balance;
}
.secondary-meta {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

When a render has a fixed canvas, test content by character shape as well as character count. Wide uppercase names often fail sooner than longer narrow names.

## Transforms, perspective and motion

### Transforms for directional energy

Translate, rotate, skew and scale can make a composition feel dynamic without changing layout. Apply transforms to decorative wrappers so text stays undistorted.

**Best for:** Sports panels, ribbons, image crops and animated entrances.

```css
.slash {
  transform: skewX(var(--fx-slant-reverse, -10deg));
}
.slash > * {
  transform: skewX(var(--fx-slant, 10deg)); /* restore content */
}
```

> **Watch for:** Skewed text and logos often look accidental. Counter-transform important content or use clip-path for the shell.

### Perspective and 3D layers

perspective and rotate transforms introduce spatial depth. Small angles feel premium; extreme angles reduce legibility.

**Best for:** Hero mockups, stacked cards and controlled feature reveals.

```css
.scene {
  perspective: 1000px;
}
.feature-card {
  transform: rotateY(-7deg) rotateX(2deg);
  transform-origin: center;
  box-shadow: 28px 32px 70px rgb(0 0 0 / 28%);
}
```

> **Watch for:** 3D transforms can create new stacking contexts and rasterisation. Inspect type sharpness at final scale.

### Motion with transform and opacity

The safest polished animations move and fade elements with restrained easing. Stagger related items to reveal hierarchy.

**Best for:** UI transitions, score reveals, lower-thirds and list entrances.

```css
.reveal {
  animation: enter 520ms var(--ease-out) both;
}
@keyframes enter {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .reveal {
    animation: none;
  }
}
```

> **Watch for:** Animating layout properties, filters or large shadows can stutter. Also avoid motion that delays access to essential information.

### Shimmer and moving light

Animate the background position of a narrow gradient to suggest a moving highlight. Keep it occasional and subtle.

**Best for:** Loading placeholders, selected states and short hero accents.

```css
.shimmer {
  background: linear-gradient(
    105deg,
    transparent 38%,
    rgb(255 255 255 / 22%) 50%,
    transparent 62%
  );
  background-size: 220% 100%;
  animation: shimmer 2.4s ease-in-out infinite;
}
@keyframes shimmer {
  to {
    background-position: -220% 0;
  }
}
```

> **Watch for:** Continuous shimmer attracts attention. Do not run it beside live data or important motion.

### Animate custom properties deliberately

`@property` allows supported browsers to interpolate a typed custom property instead of treating it as an untyped string. This is useful for controlled progress, wipes and light positions.

```css
@property --reveal {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}
.score-wipe {
  --reveal: 0%;
  clip-path: inset(0 calc(100% - var(--reveal)) 0 0);
  animation: score-wipe 520ms var(--ease-out) forwards;
}
@keyframes score-wipe {
  to {
    --reveal: 100%;
  }
}
```

> **Watch for:** Confirm support in the target render engine and supply a readable final state when animation is unavailable.

## Professional composition recipes

These recipes combine a small number of techniques into coherent visual treatments. Adjust the colour tokens and proportions, but preserve the purpose of each layer.

### Readable lower third over video

- Use a horizontal gradient from 88% brand colour to transparent.
- Add a subtle backdrop blur only beneath the text zone.
- Use one hard accent edge to anchor the composition.
- Keep essential text inside the high-opacity portion of the fade.

```css
.lower-third {
  position: relative;
  isolation: isolate;
  width: min(760px, 78vw);
  padding: 22px 72px 22px 28px;
  color: white;
}
.lower-third::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    90deg,
    rgb(12 20 68 / 94%) 0 56%,
    rgb(12 20 68 / 68%) 74%,
    rgb(12 20 68 / 0%) 100%
  );
  backdrop-filter: blur(7px);
  -webkit-mask-image: linear-gradient(90deg, #000 0 74%, transparent 100%);
  mask-image: linear-gradient(90deg, #000 0 74%, transparent 100%);
}
.lower-third::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 7px;
  background: var(--secondary);
}
```

### Premium dark stat card

- Start with a near-black brand-tinted surface.
- Add one radial highlight behind the key metric.
- Use a low-alpha border, inner highlight and layered shadow.
- Let typography create most of the hierarchy.

```css
.stat-card {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: radial-gradient(
      circle at 78% 20%,
      rgb(255 255 255 / 14%),
      transparent 32%
    ),
    color-mix(in srgb, var(--primary) 64%, #070a12);
  border: 1px solid rgb(255 255 255 / 12%);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 8%),
    0 20px 55px rgb(0 0 0 / 34%);
}
```

### Angled sports result panel

- Lock crest, identity and score together using Grid.
- Clip the outer shell, not the text.
- Echo one angle across bands, rules and decorative shapes.
- Allow performance metadata to collapse without breaking alignment.

```css
.result {
  --cut: var(--fx-cut-lg, 42px);
  display: grid;
  grid-template-columns: 82px minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px;
  padding: 20px 44px 20px 24px;
  color: white;
  background: linear-gradient(
    108deg,
    var(--team-color-dark),
    var(--team-color)
  );
  clip-path: polygon(0 0, 100% 0, calc(100% - var(--cut)) 100%, 0 100%);
}
```

### Image card with guaranteed legibility

- Treat the image and scrim as separate layers.
- Darken from the text edge toward the focal image.
- Add a slight overall vignette to contain the composition.
- Keep text contrast valid even for the brightest source image.

```css
.image-card {
  position: relative;
  overflow: hidden;
  color: white;
  background: url("/photo.jpg") center / cover;
}
.image-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgb(0 0 0 / 82%), rgb(0 0 0 / 15%) 72%),
    radial-gradient(ellipse at center, transparent 48%, rgb(0 0 0 / 38%));
}
.image-card__content {
  position: relative;
  z-index: 1;
}
```

## Production rendering and export reliability

A composition that looks correct in an interactive browser is not automatically safe for automated still or video output. Treat the renderer, canvas size, compression and playback format as part of the design system.

### Design for the target renderer

Record the exact browser or rendering engine used in production and validate advanced CSS there. Pay particular attention to:

- `backdrop-filter` and prefixed mask properties.
- `color-mix()`, container units and CSS trigonometric functions.
- `mask-composite` and complex multi-layer masks.
- Blend-mode ordering and isolated stacking contexts.
- One-pixel seams along clipped or transformed edges.
- Type rasterisation inside 3D transforms.

Feature queries can provide safe fallbacks where the production environment may vary.

```css
.glass-panel {
  background: rgb(12 20 68 / 94%);
}
@supports (backdrop-filter: blur(1px)) {
  .glass-panel {
    background: rgb(12 20 68 / 72%);
    backdrop-filter: blur(16px) saturate(145%);
  }
}
```

### Wait for assets before capture

Fonts, crests, sponsor logos and background images must be fully loaded before a frame is captured. A fallback font can change line breaks, numerical width and the position of every downstream element.

For browser-based renderers, wait for `document.fonts.ready` and confirm required image elements have completed. Use local or reliably cached assets for deterministic production renders.

### Test the actual output, not only the preview

Review representative frames at their final:

- Pixel dimensions and aspect ratio.
- Device scale or supersampling factor.
- Image format and compression level.
- Video codec, bitrate and frame rate.
- Social-platform crop and safe area.

Subtle grids, grain, one-pixel rules and low-alpha gradients can change significantly after resizing or compression. A texture that looks refined at 2× preview scale may flicker or disappear in the delivered asset.

### Control gradient banding and edge seams

Large, slow gradients are prone to visible banding. Fine low-opacity noise can break up the bands, but too much noise increases file size and video compression artefacts.

Hard gradient stops, clipped edges and adjacent transformed layers can expose hairline seams. Where necessary:

- Overlap neighbouring colour stops by a fraction of a percent.
- Extend adjacent layers by one or two output pixels.
- Render above delivery resolution and downsample once.
- Inspect frames with both pale and dark theme colours.

### Budget expensive effects

Blur, filters, masks, blend modes and large shadows increase rendering cost, especially when repeated or animated. Apply them to the smallest practical layer and avoid animating them frame by frame.

Prefer:

- Transform and opacity animation.
- Static precomposed texture where variation is not required.
- One atmospheric layer over many individually filtered children.
- A shadow on a group rather than repeated shadows on every row.

### Use deterministic motion

For generated video, motion should derive from the frame or timeline rather than wall-clock CSS animation where precise repeatability matters. The same input and frame number should always produce the same visual state.

Reduced-motion support remains important for interactive previews, while exported media should use an explicit motion configuration chosen by the template.

## Restraint and quality control

### Quality checklist

| Check                | Question                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| Hierarchy            | Can the viewer identify the primary information in under one second?                                          |
| Contrast             | Does essential text remain readable on the brightest and darkest possible content?                            |
| Consistency          | Do angles, radii, shadows, spacing and opacity come from a small shared system?                               |
| Theme range          | Has the component been tested with pale, dark, saturated and low-contrast organisation colours?               |
| Identity             | Does the graphic reuse the system's geometry, type, surface and motif rules?                                  |
| Data resilience      | Have empty, long, missing and maximum-content states been tested?                                             |
| Responsive behaviour | Does optional detail collapse before core identity, scores or actions are compromised?                        |
| Motion               | Does animation explain entry, change or hierarchy—and respect reduced-motion preferences?                     |
| Performance          | Are large blur, filter, mask and shadow effects limited on animated or repeated elements?                     |
| Output               | Has the design been checked in the production renderer at the actual export size, compression and frame rate? |

### Common causes of an amateur result

- Using strong blur, glow, gradient, texture and shadow on the same element.
- Giving every panel equal contrast, so nothing has priority.
- Mixing unrelated angles, border radii and shadow styles in one composition.
- Using transparency without accounting for the content behind it.
- Distorting text or logos to make a geometric shell feel dynamic.
- Using approximately similar angles instead of a shared geometry system.
- Adding decoration before the layout and type hierarchy are resolved.
- Leaving empty layout regions when optional data is absent.
- Passing raw organisation colours directly into surfaces without contrast normalisation.
- Treating all responsive sizes as scaled copies instead of reprioritising content.

### A practical order of operations

1. Define the information hierarchy and reading order.
2. Establish grid, spacing and typography without effects.
3. Assign colour roles and create design tokens.
4. Define the motif grammar and shared geometry.
5. Model missing, long and maximum-content states.
6. Add one structural motif such as an angle, band or cut corner.
7. Add depth with restrained alpha, borders and shadows.
8. Add atmosphere with one gradient, texture or light field.
9. Test theme extremes, real content, responsiveness and final output.

> **Final rule.** The most professional CSS treatment is usually the one whose effects feel inevitable: every layer supports the brand, information or motion, and none asks to be admired on its own.

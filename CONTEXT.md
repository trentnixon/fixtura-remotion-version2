# Remotion video compositions

Domain language for Fixtura Remotion video assets and sponsor presentation.

## Language

**Sponsor footer**:
The sponsor logo strip shown during the main asset sequence of a composition.
_Avoid_: Outro, sponsor bar (unless referring to layout chrome only)

**Sponsor outro**:
The separate end-of-video sponsor sequence after the main asset. Not the footer.
_Avoid_: Footer, closing credits

**Main duration (`FPS_MAIN`)**:
The allocated length in frames of the main asset sequence for the current composition. The sponsor footer’s clock runs on this sequence.
_Avoid_: Total video length (that includes intro/outro), per-screen card duration

**Footer exit frame**:
The local main-sequence frame where the sponsor footer’s exit animation starts. Defined as `FPS_MAIN - 15`.
_Avoid_: Hardcoded absolute frame (e.g. 300), outro page exit frame

**Fixture boundary**:
The visible grouping that makes one match and all of its information read as a single unit, distinct from adjacent matches.
_Avoid_: Fixture divider, when referring to the complete grouping rather than one separating rule

**Fixture density tier**:
The featured, standard, or compact presentation selected from the number of fixtures visible on one screen.
_Avoid_: Scaling every fixture layout uniformly to fit

**Generated background**:
A palette-aware background chosen from a named catalogue and produced by a preset renderer, such as an effect, SVG scene, tiled pattern, particle field, or reusable motion asset. It is the product category for background operators and preset authors wherever an in-repo interface can present it without changing composition IDs.
_Avoid_: Graphics background, Pattern background, Noise, Particle, or another renderer name used as the product category

**Legacy wire value**:
An external `useBackground` string such as Graphics, Pattern, or Noise that production payloads and composition IDs still use while the internal catalogue is Generated.
_Avoid_: Treating Graphics, Pattern, or Noise as the product category name

**Background operator**:
The club or admin who selects a background through Fixtura. Sees names, previews, and restrained controls.
_Avoid_: User (when this role is intended), preset author

**Preset author**:
The designer or developer who creates and reviews presets in Remotion Studio. May see renderer details and advanced controls.
_Avoid_: User (when this role is intended), background operator

**Readability policy**:
The Generated-catalogue field that states how foreground content stays readable for a preset (scrim, vignette, safe region, contrast limit, density limit, or none).
_Avoid_: Foreground protection (that term is Luminance-specific)

**Luminance background**:
A global background option that recolors a grayscale master through a luminance map derived from the active palette, explicit stops, or solid/gradient segments.
_Avoid_: Image background, duotone overlay, template-specific background

**Luminance map**:
The tone-to-RGB lookup applied after source-tone neutralization and pre-map contrast/brightness controls.
_Avoid_: CSS gradient string, overlay, filter preset (without naming the map)

**Protected endpoint cores**:
Narrow pure-black and pure-white luminance ranges (default 2%) that keep intentional linework exact under the `protected-brand` map.
_Avoid_: Overlay, mask layer, hard 5% protected bands

**Endpoint transition bands**:
Anti-alias safety zones (default 6%) that interpolate between each protected core and the adjacent brand solid, so edge pixels do not jump straight into club colours.
_Avoid_: Overlay, hard protected endpoint bands

**Luminance supersampling**:
Internal higher-resolution processing (default 2× for `protected-brand`; 4× diagnostic only) that downsamples luminance and protected coverage mattes independently, then composites black/white at final resolution.
_Avoid_: CSS browser scaling as the quality path, JPEG masters for protected linework, RGB-composite-then-downsample for protected edges

**Protected coverage mattes**:
Alpha buffers for black and white linework coverage under `protected-brand`, downsampled separately from brand luminance so edge fringes are coverage blends rather than RGB averages of club colours.
_Avoid_: Overlay mask assets (unless mattes fail), baked black/white RGB in the pre-downsample composite

**Brand-mapped tonal range**:
The recolourable mid region under `protected-brand`: solid primary, primary→secondary gradient, and solid secondary.
_Avoid_: Treating the full master as a hard black/white protect

**Foreground protection**:
An optional scrim or vignette layer rendered between the mapped luminance image and composition content.
_Avoid_: Overlay (Image background terminology), duotone

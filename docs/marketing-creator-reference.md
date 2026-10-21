# Club graphics reference for the marketing app

This document describes the Fixtura club graphics that the marketing Remotion app presents. It gives the marketing app visual and structural context for showing existing club assets in demos, product explanations, and promotional videos.

Source repository: `Fixtura/Creators/RemotionV2`. Checked on 12 October 2026 at revision `e0b23e6`. Visual descriptions below include direct inspection of three bundled Luminance plates. Those plates are background masters, not finished club graphics.

## What the club assets look like

Club graphics are portrait sports graphics rendered at **1080×1350, 30 fps**. Their identity comes from the club logo, club colours, a selected template, and a selected background. The foreground carries structured sports information such as fixtures, results, ladders, team lists, and player performances.

A template controls the arrangement, typography, containers, and animation style. A background supplies the full-frame visual treatment behind that information. Changing the background does not mean changing the template.

There are 13 registered templates: Basic, Brickwork, Classic, CNSW, CNSWPrivate, Sixers, Thunder, TwoColumnClassic, Mudgeeraba, BroadcastPro, BroadcastProRounded, Scoreline, and NightSession. Their type varies substantially. Basic uses Heebo, Classic uses Impact with Heebo copy, BroadcastPro uses Teko with Rajdhani, Scoreline uses Geist, and NightSession uses Teko with Source Sans 3. Customer skins such as Sixers and Thunder carry their own typography.

The four saved club colour fields are `primary`, `secondary`, `dark`, and `white`. The renderer resolves these into a broader palette for backgrounds, containers, text, accents, and gradients. Finished graphics therefore contain more colour roles than the four input fields.

## The sections a viewer sees

| Section       | Visible purpose                                                                                                                                                                           | Timing and behaviour                                                                                            |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Intro         | Establishes the club and the subject of the graphic. Basic has a centred stack of club logo, title, and club name, with primary sponsor content. Other templates supply their own intro.  | Dataset `FPS_INTRO`, in frames. Text and logos animate within the section.                                      |
| Main          | Presents the sports information through the template's layout and the selected sport composition. Header, content containers, typography, and sponsor footer belong to this presentation. | Dataset `FPS_MAIN`, in frames. Content can have its own internal sequences.                                     |
| Sponsor outro | Gives sponsors a separate end card after the sports content.                                                                                                                              | Six logos per page. Each page lasts 90 frames, or three seconds. Omitted when sponsorship is disabled or empty. |

The top-level section joins are hard cuts through Remotion `Series`. Animation within a section can still include entrances, exits, fades, or other transitions. Background and audio sit outside the section series.

The sponsor footer is distinct from the sponsor outro. The footer appears during the main section and starts its 15-frame exit at `FPS_MAIN - 15`. The outro is a separate sequence. An outro page has 15 frames in, 60 frames held, and 15 frames out. Logos enter two frames apart, and local frame 30 is the designated settled screenshot frame.

Total duration is intro frames plus main frames plus sponsor page frames. For example, seven outro sponsors require two pages and add six seconds. Intro and main durations come from the individual dataset.

## How the creator builds a graphic

The production input is a `FixturaDataset`. It contains club identity and sponsorship, video metadata, appearance, template variation, timings, and sports data.

The production root resolves the chosen template and composition duration. The template passes its theme, animation settings, intro, main layout, background, and outro components into `BaseTemplate`. Shared contexts supply video data, resolved theme, layout, and animation configuration. `BaseTemplateLayout` then sequences the sections and mounts background and audio.

The main content is routed by composition and sport. The template supplies the visual style around that content. This is why the same asset type can have several different looks, and why one template can show several asset types.

The useful relationship for marketing is:

**Club identity + sports data + template + background = finished club graphic.**

## Background families

Every registered template lists Solid, Image, Gradient, Video, Texture, and Luminance as background variants. The renderer also has a Generated catalogue covering effects, patterns, particles, noise, and other motion treatments. Legacy payload names remain relevant to those routes. Catalogue presence alone does not establish what the member-facing CMS currently exposes.

| Family    | What supplies the visual                                                                    |
| --------- | ------------------------------------------------------------------------------------------- |
| Solid     | A flat palette colour.                                                                      |
| Gradient  | A colour gradient.                                                                          |
| Image     | An image with the image renderer's presentation controls.                                   |
| Video     | Video footage, with optional separate intro footage.                                        |
| Texture   | An image surface with a solid or gradient colour overlay.                                   |
| Luminance | A grayscale master whose brightness values are mapped into palette colours.                 |
| Generated | A named preset produced by a renderer, such as a motion effect, pattern, or particle field. |

## Texture backgrounds

Texture retains the source image and adds colour over it. Its appearance depends on both the original material and the overlay. This suits grain, rough surfaces, repeating patterns, and other images that give a graphic visible surface detail.

The renderer has two visible layers: the texture image as a CSS background, then a colour overlay. An invisible Remotion `Img` preloads the source so rendering waits for it.

Sources can come from a URL, a supplied source, or a named file under `public/textures`. Account template variation can override the image, position, repetition, size, and scale.

| Control                | Visible effect                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| Position               | Moves the source relative to the frame. Default is centre.                                                 |
| Repeat                 | Tiles the image by default. The special `cover` value fills the frame without repeating.                   |
| Size or scale          | Changes how large the source detail appears. Numeric scale is interpreted as a percentage.                 |
| Overlay colour         | Tints the texture. Default comes from `selectedPalette.background.main`.                                   |
| Overlay opacity        | Changes overlay strength. Default is `0.35`.                                                               |
| Blend mode             | Changes how overlay and image combine. Default is `multiply`.                                              |
| Gradient configuration | Replaces the solid overlay with a linear, radial, or conic gradient using palette main and accent colours. |

The checked-in texture folder contains `fine-noise.svg`, a 256×256 tile generated with SVG fractal noise. The renderer also accepts external images, so this bundled file is not a complete account texture catalogue.

Texture has no frame-driven movement in this component. Its visual detail can feel energetic, but the renderer itself presents a static image and overlay.

## Luminance backgrounds

Luminance uses a grayscale image as a reusable design master. Dark, midtone, and light pixels become different colours from the club palette. The image determines where the shapes and surface detail appear. The colour map determines how those shapes look for a particular club.

This differs from a transparent tint over an image. Luminance assigns output colour according to source brightness. The same brushwork, halftone, or geometric master can therefore produce recognisably related backgrounds in different club palettes.

### The visual library

The bundled production plate list has 14 images. The names cover brushwork, halftone, geometry, grunge, and speed treatments:

| Group               | Bundled plates                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| Brush and paint     | `brush-halftone-corners`, `brush-slash-halftone`, `brush-sweep-gray`, `diagonal-paint-strokes` |
| Dots and mesh       | `dark-circle-mesh`, `diagonal-halftone`, `geometric-halftone`, `halftone-fade`                 |
| Grunge and panels   | `fingerprint-grunge`, `grunge-diagonal-panels`                                                 |
| Direction and light | `jagged-radial-burst`, `light-motion-streaks`, `light-well-geometry`, `radial-speed-lines`     |

Three inspected examples show the range:

- `brush-halftone-corners.png` has diagonal brush streaks and halftone dots concentrated around opposing corners, with a relatively open centre.
- `light-well-geometry.png` has a broad bright central area framed by dark angular panels, scratches, and diagonal lines.
- `fingerprint-grunge.png` has large curved fingerprint ridges, scuffed surface detail, and a light-to-dark diagonal distribution.

These descriptions refer to grayscale masters. Their final colours depend on the selected map and palette. The renderer also accepts account-assigned CDN masters.

### Colour mapping

| Theme preset        | Behaviour                                                                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `brand`             | Maps dark through primary to accent, with primary at brightness position `0.65`.                                                          |
| `brand-with-accent` | Uses the same colour roles, with primary at `0.55`, changing the distribution across the source tones.                                    |
| `tonal-brand`       | Maps dark through primary to light. Also supplies the tonal fallback when the regular palette roles have too little lightness separation. |
| `protected-brand`   | Keeps pure black and white endpoint regions, solid primary and secondary bands, and controlled transitions between them.                  |

Mappings can also use custom colour stops or explicit solid and gradient brightness segments. The regular theme and stop mappings support reversal. The default map is `brand`.

Brightness and contrast adjust the grayscale input before mapping. This changes which source pixels fall into each colour region. Opacity, image fit, and image position control presentation. The default image fit is `cover`, position is centre, and opacity is 1.

### Readability and rendering

Luminance offers an optional dark overlay called foreground protection. `bottom-weighted` darkens the lower area, `center-vignette` darkens the edges around a clearer centre, and `uniform` darkens the whole frame. The default is `none`. This overlay helps separate foreground text from a detailed plate.

Production defaults to the SVG mapping backend and a 256-entry colour lookup table. The `protected-brand` preset defaults to processing at twice the output resolution before reducing to the final frame, to smooth spatial edges. These are internal rendering choices, not separate visual styles.

The component itself has no frame-driven animation. Names such as speed lines or motion streaks describe the artwork. They do not mean that the Luminance plate moves.

If the configured source cannot be resolved, the component uses its fallback background rather than the mapped image. That configuration fallback does not establish recovery from every remote image download failure.

## How this informs marketing scenes

The product story is that club data becomes a finished graphic with the club's identity, a template's layout, and a chosen visual background. A background comparison communicates that story best when the foreground and club identity stay consistent across the samples.

The existing club output is 4:5. When it appears inside a square or story marketing composition, fitting the full graphic preserves its logo, header, content, and sponsor areas. Cropping changes what viewers see of the product.

Texture examples demonstrate material detail plus a colour overlay. Luminance examples demonstrate reusable artwork recoloured for different clubs. Finished creator renders remain the strongest visual reference for typography, density, entrances, and the complete sponsor presentation.

## Source locations

- Frame and production resolution: `src/ProductionRoot.tsx` and `src/core/preview/getProductionCompositionFromData.ts`.
- Section assembly: `src/templates/base/BaseTemplateLayout.tsx` and `src/templates/base/_utils/calculations.ts`.
- Template options: `src/templates/registry.tsx` and each template's theme files.
- Basic section example: `src/templates/variants/basic/components/BasicIntro.tsx` and `BasicMain.tsx`.
- Sponsor timing: `src/core/utils/sponsors/outroSponsors.ts` and `docs/adr/0001-sponsor-footer-exit-timing.md`.
- Background routing: `src/components/backgrounds/index.tsx`.
- Texture implementation: `src/components/backgrounds/variants/Textures/TextureBackground.tsx`.
- Luminance implementation: `src/components/backgrounds/variants/Luminance/`, particularly `LuminanceBackground.tsx`, `types.ts`, `resolveThemePresetStops.ts`, and `ForegroundProtection.tsx`.
- Bundled imagery: `public/textures/` and `public/luminance/plates/`.
- Generated naming and payload history: `docs/adr/0002-generated-background-wire-deferred.md`.

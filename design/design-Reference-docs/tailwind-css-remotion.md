# Tailwind and CSS for Fixtura templates

Read this before styling a new `design/` template and again when translating it into Remotion. Use it alongside the [design brief](../.docs/design-system-brief.md). This guide describes the current styling setup and gives authoring rules for designs that can become reusable video templates.

Fixtura uses Tailwind utilities, React inline styles, and scoped CSS together. Reusable visual choices belong in the template theme. Runtime colors and dimensions come from theme hooks and data. Detailed overlay styling can live in a variant stylesheet.

## Choose where each style belongs

| Styling need                                                | Preferred location                                        | Existing example                              |
| ----------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------- |
| Flex/grid structure, alignment, wrapping                    | Complete Tailwind class strings                           | `flex`, `min-w-0`, `grid-cols-3`              |
| Reusable text or panel role                                 | Theme `componentStyles.shared.ts`                         | Shared score typography or sponsor strip      |
| An asset's specific visual role                             | Theme `composition/{asset}.ts`                            | Results team row, score badge, metadata strip |
| Font roles and template tuning values                       | Theme `tokens.ts`                                         | Display family, crest sizing, glass settings  |
| Main/header/footer dimensions                               | Theme `layout.ts`, consumed through layout helpers        | Available composition height                  |
| Club colors, mode colors, calculated sizes                  | React `style` or scoped CSS variables populated by a hook | `selectedPalette`, `useScorelineCanvasStyle`  |
| Pseudo-elements, layered shadows, motifs, complex selectors | Variant CSS scoped to its canvas                          | `.scoreline-canvas .team-mark`                |
| Animated opacity or position                                | Frame-derived React styles                                | Remotion `interpolate` or `spring`            |

Broadcast Pro demonstrates theme-driven utility classes in [its Results styles](../../src/templates/variants/broadcastPro/theme/composition/results.ts). Scoreline also uses [scoped CSS](../../src/templates/variants/scoreline/styles/scoreline-results.css) and [runtime CSS variables](../../src/compositions/cricket/utils/scoreline/scorelineCanvasStyle.ts). Both approaches exist here. Choose by the styling need and keep repeated decisions in one place.

## Understand the two styling environments

The design site serves static HTML. Broadcast Pro loads Tailwind through a browser CDN and declares page configuration. Scoreline uses custom CSS and variables. Those page scripts and styles are not automatically transferred to Remotion.

Remotion uses Tailwind v4 through `enableTailwind` in [remotion.config.ts](../../remotion.config.ts). [src/index.ts](../../src/index.ts) imports [src/index.css](../../src/index.css), which imports Tailwind and currently imports Scoreline's two variant stylesheets.

The package has a separate entry, [src/package/styles.css](../../src/package/styles.css), compiled by `build:package:css` into the exported `styles.css`. At the time of writing, it does not import the Scoreline stylesheets present in the Studio entry. When adding CSS for a packaged template, verify that both required entry points include it. Source scanning generates utilities; it does not copy custom CSS rules.

The repository also has [tailwind.config.ts](../../tailwind.config.ts) and a [shared preset](../../src/package/tailwind-preset.cjs) defining font utilities and `text-lift`. Neither CSS entry currently declares `@config`. Tailwind v4 requires explicit loading of legacy JavaScript configuration, so a preset declaration alone is not proof that its utility reaches a render. Check the compiled CSS and computed style before relying on custom utilities. See [Tailwind's configuration directive](https://tailwindcss.com/docs/functions-and-directives#config).

## Write styles that survive the handoff

Use complete, literal Tailwind classes. For conditional layouts, select between complete strings such as `gap-2` and `gap-4`. For an arbitrary runtime value, use inline styles or a CSS variable. Tailwind cannot discover a class assembled as `bg-${color}` or `text-[${size}px]`. See [Tailwind source detection](https://tailwindcss.com/docs/detecting-classes-in-source-files).

For example, inside a component that has read `selectedPalette` from `useThemeContext`, a solid panel can combine static geometry with runtime colors:

```tsx
<div
  className="flex min-w-0 items-center gap-4 px-6 py-4"
  style={{
    backgroundColor: selectedPalette.container.background,
    color: selectedPalette.text.onContainer.copy,
  }}
>
  {children}
</div>
```

For a repeated panel, move the class string into a named theme role and consume that role in the component. The theme assembles base styles, shared variant styles, and asset styles. Inspect the component consuming a role before adding a key; unused theme keys have no visual effect.

Assign each property a clear owner. Keep fixed layout in classes and calculated values in `style`. Resolve conflicting declarations at their source instead of accumulating `!important`. Scope new selectors to a variant root so one template's `h1`, `img`, or panel rules cannot restyle another template. Keep design-site shell selectors outside production CSS.

## Preserve colors, type, and layout

Use organization colors from the fixture in prototypes and from theme context in Remotion. Map each fill and text color to a semantic role. Follow [theme modes and contrast](./theme-modes.md) for mode containers, transparent panels, and title versus copy colors. Fixtura's four modes are selected through theme data; Tailwind `dark:` is not wired to that selection. Apply alpha to a panel's fill when its text must remain opaque.

Use the [font workflow](../.docs/fonts.md) for font registration and local render assets. A `font-*` class selects a family; it does not load a font file. Verify the actual family and weight after loading, because a fallback font changes line breaks and score widths.

Design the graphic at 1080 × 1350 inside `.design-social-canvas`. In Remotion, respect the template's allocated composition height and sponsor footer. Base density changes on data count and available space, rather than browser viewport breakpoints. Define how long names wrap and how missing sections collapse. Preserve complete supplied scores and result wording.

Keep CSS decoration attached to overlay components. Full-frame backgrounds belong to the Remotion background system. Translate approved HTML manually into theme and display components using the [handoff guide](../.docs/remotion-handoff.md).

## Keep motion tied to frames

Use the current Remotion frame to calculate animated values. CSS transitions, time-based keyframes, and browser timers are unsuitable for video timing because frames can render independently. Put animation transforms on a wrapper when the inner graphic already has a static transform. See [Remotion animation guidance](https://www.remotion.dev/docs/animating-properties).

## Completion checks

Before calling a design ready for handoff:

- Hydrate the registered prototype with real fixture data and verify long names, maximum density, missing optional content, and sponsor states.
- Identify where each reusable style will live in the theme, CSS, or runtime hook. Record new font and asset dependencies.
- Check all four modes and pale, dark, and saturated club palettes. A neutral prototype backdrop is only one contrast case.

Before calling the Remotion styling complete:

- Compare a rendered frame with the approved prototype using the same fixture and dimensions.
- Inspect computed fonts, colors, sizes, wrapping, and clipping. Confirm new utilities exist in the generated CSS.
- Verify the intended CSS entry points, including the package entry when the template is distributed.
- Scrub and render representative entrance, settled, and exit frames when motion is present. Report any visual mismatch still unresolved.

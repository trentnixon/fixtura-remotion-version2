# Theme modes and contrast

`templateVariation.mode` selects `light`, `lightAlt`, `dark`, or `darkAlt` from the active template. An omitted mode defaults to `light`. The mode supplies container and text colors to `selectedPalette`; club colors still supply the brand backgrounds, accents, and gradients.

Most templates, including Basic and Broadcast Pro, use this setup:

| Mode       | Container    | Alternate container  | Title / copy without a background | Copy inside a container |
| ---------- | ------------ | -------------------- | --------------------------------- | ----------------------- |
| `light`    | White `#fff` | Light gray `#f0f0f0` | Black                             | Black                   |
| `lightAlt` | White `#fff` | Light gray `#f0f0f0` | White                             | Black                   |
| `dark`     | Black `#000` | Dark gray `#1a1a1a`  | White                             | White                   |
| `darkAlt`  | Black `#000` | Dark gray `#1a1a1a`  | Black                             | White                   |

In this standard setup, `Alt` flips the title color while keeping the container and its copy unchanged. This allows white headings over a dark backdrop alongside light cards, or black headings over a light backdrop alongside dark cards. `container.backgroundAlt` is a second container shade available in every mode; it is separate from the `Alt` mode suffix.

Transparency changes how much of the background shows through a container. The shared palette generates `container.backgroundTransparent` from the mode's base container color:

| Token    | Opacity | Background showing through |
| -------- | ------- | -------------------------- |
| `subtle` | 30%     | 70%                        |
| `low`    | 40%     | 60%                        |
| `medium` | 55%     | 45%                        |
| `high`   | 70%     | 30%                        |
| `strong` | 85%     | 15%                        |

Higher values mean a more opaque container. These tokens replace the single 50% transparent color declared in the template's mode definition. They affect the fill only, so text can remain fully opaque. Broadcast Pro also has separate glass opacity presets and per-layer overrides.

Copy contrast is handled separately from titles:

- `text.onContainer.copy` and `safeCopy` are checked against `container.background`. The shared generator keeps the preferred color when its contrast ratio reaches 4.5:1, or 7:1 with `highContrast`. Otherwise, it picks whichever of black or white has better contrast.
- `text.onContainer.title` and `copyNoBg` preserve the mode's title color. Their readability depends on the backdrop where they are placed.
- Shared `muted` copy uses 70% opacity, which can reduce its visible contrast. Accent colors also need care when used as text.
- Broadcast Pro's glass helper blends the panel over the supplied base color before resolving text colors, including titles. It does not inspect the actual image or video behind the panel.

These checks do not guarantee contrast over every transparent or moving background. The visible result depends on the backdrop and the tokens each component uses.

Scoreline currently has an exception. Its `light` and `lightAlt` base containers are transparent, and its dark base is near-black `#080b0d`. Its match-context strip chooses a light panel with dark copy for `light` and `darkAlt`, and a dark panel with light copy for `lightAlt` and `dark`, then resolves copy against the blended panel color.

The [CNSW Private theme](../../src/templates/variants/cnsw-private/theme.ts) also differs. Its navy and blue-tinted modes adjust title shades and alternate containers with `Alt`, without reversing title lightness.

Source references: [mode selection](../../src/core/context/ThemeContext.tsx), [standard modes](../../src/templates/variants/broadcastPro/theme/mode.ts), [palette generation](../../src/core/utils/colorSystem/config/standardPaletteStructure.ts), [glass contrast](../../src/compositions/cricket/utils/broadcastPro/themeColors.ts), and [Scoreline panels](../../src/compositions/cricket/utils/scoreline/resolveScorelineOverlayTokens.ts).

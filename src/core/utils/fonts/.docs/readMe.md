# Folder Overview

Font loading and configuration utilities for Remotion videos. Loads fonts from local static files in `public/fonts/`. All fonts (including Google Fonts) are downloaded and stored locally—not loaded via `@remotion/google-fonts`.

## Skill

- `.skills/architecture/fonts-folder.md` – Implementation guidance for this folder

## Files

- **`fontLoader.ts`**: main font loading
  - `FontConfig`: { family, url, weight?, style? }
  - `fontPathMap`: maps font names to paths (e.g. "Heebo": "fonts/Heebo/static/Heebo-Regular.ttf")
  - `createFontConfig(fontName, weight?, style?)`: returns FontConfig or null; normalizes names via fontNameVariants; skips system fonts
  - `loadFontFile(fontConfig)`, `loadFontByName(fontName, weight?, style?)`: load via `@remotion/fonts`
  - `loadFontsFromTheme(theme)`: loads theme.fonts.title.family, theme.fonts.copy.family, legacy fontConfig/defaultCopyFontFamily/headingFontFamily/subheadingFontFamily; uses delayRender/continueRender
  - `getAllFontNames()`: keys of fontPathMap
  - Internal: systemFonts, fontNameVariants (case normalization)
- **`index.ts`**: font categories (reference)
  - `fonts`: display (Tungsten, Druk, Monument Extended, Unbounded, Anton, Bebas Neue, Rubik Dirt, Climate Crisis), text (Heebo, Roboto, Roboto Condensed, Inter, Open Sans, Lato), specialty (Score Board, JetBrains Mono, Caveat)
  - Export: default fonts object

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `@remotion/fonts`, `remotion` (staticFile, delayRender, continueRender), `TemplateThemeConfig` from templates
- Consumed by: FontContext (loadFontsFromTheme, loadFontByName, createFontConfig)

## Dependencies

- Internal: `templates/types/TemplateThemeConfig`
- External: @remotion/fonts, Remotion

## Adding Fonts

1. Download font (e.g. from fonts.google.com); extract to `public/fonts/{FontName}/`
2. Add to `fontPathMap` in fontLoader.ts: `"Font Name": "fonts/FontName/file.ttf"`
3. Add weight variants if needed: `"Font Name-Bold": "fonts/FontName/file-bold.ttf"`
4. Add to `fontNameVariants` for case normalization: `"font name": "Font Name"`
5. Optionally add to `index.ts` categories (display, text, specialty)

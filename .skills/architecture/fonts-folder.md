# Skill: Fonts Folder

## Purpose

Guides working with `src/core/utils/fonts`: understanding font loading from local static files, fontPathMap, theme-based loading, and how to add new fonts. Use when navigating, extending, or debugging font loading for Remotion compositions.

## Applies To

- `src/core/utils/fonts/` (root)
- `fontLoader.ts`: loading and configuration
- `index.ts`: font categories (display, text, specialty)
- Consumers: FontContext (loadFontsFromTheme, loadFontByName, getAllFontNames)
- Storage: `public/fonts/` for all font files

## Inputs

- Font files (.ttf, .otf, etc.) in `public/fonts/{FontName}/`
- Theme with `fonts.title.family`, `fonts.copy.family`, or legacy fontConfig/headingFontFamily/defaultCopyFontFamily
- TemplateThemeConfig shape for loadFontsFromTheme

## Process

### 1. Understand the Folder Hierarchy

```
src/core/utils/fonts/
├── fontLoader.ts    # fontPathMap, createFontConfig, loadFontByName, loadFontsFromTheme
└── index.ts         # fonts object (display, text, specialty categories)
```

### 2. Font Loading Flow

1. **FontContext** mounts → calls `loadFontsFromTheme(createdTheme)` with delayRender
2. **loadFontsFromTheme** extracts font names from theme.fonts.title.family, theme.fonts.copy.family, and legacy props
3. For each font: `loadFontByName(fontName)` → `createFontConfig` → `loadFontFile` → `loadFont` from @remotion/fonts
4. **continueRender** when done so Remotion can render

### 3. When Adding a New Font

1. **Download** the font; extract to `public/fonts/{FontName}/`
2. **Add to fontPathMap** in fontLoader.ts: `"Font Name": "fonts/FontName/file.ttf"`
3. **Weight variants** (optional): `"Font Name-Bold": "fonts/FontName/file-bold.ttf"`
4. **fontNameVariants** (optional): for case normalization, e.g. `"font name": "Font Name"`
5. **index.ts** (optional): add to displayFonts, textFonts, or specialtyFonts

### 4. Key Exports

- `createFontConfig(fontName, weight?, style?)`: FontConfig or null; skips system fonts; normalizes via fontNameVariants
- `loadFontFile(fontConfig)`, `loadFontByName(fontName, weight?, style?)`
- `loadFontsFromTheme(theme)`: loads theme fonts; uses delayRender/continueRender
- `getAllFontNames()`: all keys from fontPathMap
- `fontPathMap`: exported for debugging/reference

### 5. System Fonts

Arial, Helvetica, Times New Roman, Verdana, etc. are in `systemFonts`; they are skipped (no loading). Font stacks with commas are also treated as system fonts.

### 6. Font Categories (index.ts)

- **display**: Tungsten, Druk, Monument Extended, Unbounded, Anton, Bebas Neue, Rubik Dirt, Climate Crisis
- **text**: Heebo, Roboto, Roboto Condensed, Inter, Open Sans, Lato
- **specialty**: Score Board, JetBrains Mono, Caveat

### 7. Theme Font Sources

loadFontsFromTheme reads:
- `theme.fonts.title.family`, `theme.fonts.copy.family`
- Legacy: `theme.fontConfig`, `theme.defaultCopyFontFamily`, `theme.headingFontFamily`, `theme.subheadingFontFamily`

## Output

- Correct understanding of font loading and where to add fonts
- Ability to add new fonts to fontPathMap and fontNameVariants
- Clear flow from theme → FontContext → loadFontsFromTheme → loadFontByName

## Rules

- All fonts must be stored locally in `public/fonts/`; no @remotion/google-fonts
- Paths in fontPathMap are relative to public (e.g. "fonts/Heebo/static/Heebo-Regular.ttf")
- Use staticFile() to resolve paths for loadFont
- Font names must match fontPathMap keys exactly (or via fontNameVariants)

## References

- fonts folder: `src/core/utils/fonts/.docs/readMe.md`
- FontContext: `src/core/context/FontContext.tsx`
- TemplateThemeConfig: `src/templates/types/TemplateThemeConfig`

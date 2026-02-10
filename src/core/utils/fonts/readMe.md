# Folder Overview

Font loading and configuration utilities for Remotion videos. Handles loading fonts from static files stored locally in `public/fonts/` directory.

**Note:** All fonts (including Google Fonts like Heebo, Roboto) are downloaded and stored locally. They are NOT loaded via `@remotion/google-fonts` package.

## Files

- `fontLoader.ts`: Main font loading utility - handles loading fonts from static files via `staticFile()`, font path mapping, and theme-based font loading
- `index.ts`: Font category definitions (display, text, specialty fonts) - reference guide for available fonts

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses `@remotion/fonts` for font loading; uses `TemplateThemeConfig` from templates
- Consumed by: `FontContext` loads fonts using these utilities

## Dependencies

- Internal: `../../../templates/types/TemplateThemeConfig`
- External: `@remotion/fonts`, Remotion (`staticFile`, `delayRender`, `continueRender`)

## Adding Fonts

### Adding a New Font (Including Google Fonts)

**All fonts must be downloaded and stored locally**, following the same pattern as Heebo and Roboto:

1. **Download the font**:
   - For Google Fonts: Go to [fonts.google.com](https://fonts.google.com), search for the font, click "Download family"
   - Extract the font files (.ttf, .otf, etc.)

2. **Add font files to `public/fonts/` directory**:
   - Create folder: `public/fonts/{FontName}/`
   - Place font files in that folder
   - Example: `public/fonts/RubikDirt/RubikDirt-Regular.ttf`

3. **Add entry to `fontPathMap` in `fontLoader.ts`**:
   ```typescript
   "Font Name": "fonts/FontName/font-file.ttf"
   ```

4. **Add weight variants if needed**:
   ```typescript
   "Font Name-Bold": "fonts/FontName/font-bold.ttf"
   "Font Name-Light": "fonts/FontName/font-light.ttf"
   ```

5. **Add to font name variants** (for case normalization):
   ```typescript
   "font name": "Font Name",
   "FONT NAME": "Font Name",
   ```

6. **Add to font categories in `index.ts`** (optional):
   ```typescript
   displayFonts: { fontName: "Font Name" }
   ```

**Example:** See how `Heebo` and `Roboto` are implemented - they're Google Fonts that were downloaded and stored locally.

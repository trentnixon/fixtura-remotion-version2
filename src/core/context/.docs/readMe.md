# Folder Overview

React contexts that provide global data and configuration for templates and compositions: theme, layout, animation, video data, fonts, and styles. Providers are mounted at app roots; consumed by templates and components.

## Skill

- `.skills/architecture/core-context-folder.md` – Provider hierarchy, data flow, and when to add/modify contexts

## Files

- **`GlobalContext.tsx`**: app-wide `settings` and `data`; entry point for video render config; used by ThemeContext, VideoDataContext, FontContext
- **`VideoDataContext.tsx`**: normalized `FixturaDataset`, `Video`, `Club`, `SponsorsData`, `VideoMetadata`, `VideoMedia`, `VideoAppearance`, `VideoContentLayout`, `VideoTemplateVariation`; consumes `data` from GlobalContext
- **`ThemeContext.tsx`**: resolved theme (colors, palettes, typography, layout, sports); uses createColorSystem; consumes GlobalContext settings and VideoDataContext video
- **`StyleContext.tsx`**: legacy-compatible `theme`, `fontConfig`, `fontSizing`, `getActivePalette`, `selectedPalette`; wraps ThemeContext for backward compatibility
- **`FontContext.tsx`**: `fontsLoaded`, `loadFont`, `availableFonts`; uses fontLoader; consumes VideoDataContext, StyleContext, ThemeContext
- **`LayoutContext.tsx`**: `doesAccountHaveSponsors`; consumes VideoDataContext sponsors
- **`AnimationContext.tsx`**: `animations` object for timing/easing; passed as prop to AnimationProvider
- **`types/ThemeContextTypes.ts`**: ThemeContextProps, ThemeFonts, ThemeTypography, ThemeLayout, ThemeSports, FontClass, ThemeFont, ColorPalette, ThemePalettes, ThemeColors, etc.

## Child Modules

- **`types/`**: ThemeContextTypes (ThemeContext props and related interfaces)

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: `../types/data`, `../utils/colorSystem`, `../utils/designPalettes`, `../utils/fonts`, `../../templates/types/TemplateThemeConfig`
- Consumed by: templates, compositions, components; providers mounted in DevelopmentRoot, ProductionRoot

## Dependencies

- Internal: `types`, `../types`, `../utils`
- External: React, Remotion (delayRender, continueRender in FontContext)

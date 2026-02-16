# Skill: Core Context Folder

## Purpose

Guides working with `src/core/context`: understanding the provider hierarchy, data flow between contexts, and where to add or modify providers. Use when adding a new context, debugging provider order, or wiring theme/video data into templates and compositions.

## Applies To

- `src/core/context/` (root)
- `GlobalContext`, `VideoDataContext`, `ThemeContext`, `StyleContext`, `FontContext`, `LayoutContext`, `AnimationContext`
- `types/ThemeContextTypes.ts`
- Consumers: templates (BaseTemplate), compositions, components

## Inputs

- Understanding of React Context and provider nesting
- Access to `../types/data` for VideoDataContext types
- Access to `../utils/colorSystem`, `../utils/designPalettes`, `../utils/fonts`
- Folder readMe: `context/.docs/readMe.md`

## Process

### 1. Understand the Provider Hierarchy

Providers are mounted in `src/templates/base/index.tsx` (BaseTemplate). Order is critical—children depend on parents:

```
GlobalProvider (settings, data)
  └── VideoDataProvider (derives from data)
        └── ThemeProvider (uses settings + VideoDataContext)
              └── StyleProvider (wraps ThemeContext; legacy)
                    └── FontProvider (uses VideoDataContext, StyleContext, ThemeContext)
                          └── LayoutProvider (uses VideoDataContext)
                                └── AnimationProvider (animations prop)
```

### 2. Understand Context Dependencies

| Context | Depends On | Provides |
|---------|------------|----------|
| GlobalContext | — | settings, data |
| VideoDataContext | GlobalContext | data, video, club, metadata, media, appearance, contentLayout, templateVariation, sponsors |
| ThemeContext | GlobalContext, VideoDataContext | colors, colorSystem, palettes, typography, layout, fonts, getActivePalette |
| StyleContext | ThemeContext | theme, fontConfig, fontSizing, getActivePalette, selectedPalette (legacy shape) |
| FontContext | VideoDataContext, StyleContext, ThemeContext | fontsLoaded, loadFont, availableFonts |
| LayoutContext | VideoDataContext | doesAccountHaveSponsors |
| AnimationContext | — | animations (prop-in) |

### 3. Key Data Flows

- **Theme resolution**: `video.appearance.theme` + `settings.colors` → `createColorSystem(primary, secondary, useMode)` → ThemeContext
- **Video data**: `data.videoMeta?.video` from GlobalContext → VideoDataContext
- **Font loading**: FontContext uses `loadFontsFromTheme`, `loadFontByName` from utils/fonts; waits for ThemeContext + StyleContext

### 4. When Adding a New Context

1. Create `MyContext.tsx` with `createContext`, `MyProvider`, `useMyContext`
2. Determine which existing contexts it needs; nest it after those in BaseTemplate
3. Add to `templates/base/index.tsx` in the correct nesting order
4. Update `context/.docs/readMe.md` Files and Dependencies
5. If it adds theme-related types, extend `types/ThemeContextTypes.ts` or create a new types file

### 5. When Modifying ThemeContext or StyleContext

- **ThemeContext**: Primary source of truth for colors, palettes, typography. Uses `createColorSystem` from colorSystem; types in `types/ThemeContextTypes.ts`
- **StyleContext**: Backward-compatibility layer. Wraps ThemeContext; do not add new logic here—prefer ThemeContext. Migrate consumers to ThemeContext over time.

### 6. When Adding Animation Data

- AnimationContext receives `animations` as a prop from the template/variant
- Ensure the composition passes the correct animations object into BaseTemplate (or equivalent)

## Output

- Correct understanding of provider order and dependencies
- Ability to add or modify contexts without breaking the chain
- Clear path from GlobalContext data to ThemeContext/VideoDataContext consumers

## Rules

- Provider order must respect dependency graph: GlobalContext → VideoDataContext → ThemeContext → StyleContext → FontProvider → LayoutProvider → AnimationProvider
- Do not add circular context dependencies
- StyleContext is legacy; prefer ThemeContext for new consumers
- ThemeContext uses `TemplateThemeConfig` mode from templates for light/dark
- All context hooks throw if used outside their provider

## References

- context: `src/core/context/.docs/readMe.md`
- BaseTemplate (provider mounting): `src/templates/base/index.tsx`
- Core roadmap: `src/core/.docs/DevelopmentRoadMap.md`
- colorSystem: `src/core/utils/colorSystem`

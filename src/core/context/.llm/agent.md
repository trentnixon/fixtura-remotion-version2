# Agent Brief — Core Context

## What This Feature Does

React contexts that provide global data and configuration for templates and compositions: theme, layout, animation, video data, fonts, and styles. Providers are mounted in `templates/base/index.tsx` with hierarchy: GlobalProvider → VideoDataProvider → ThemeProvider → StyleProvider → FontProvider → LayoutProvider → AnimationProvider. ThemeContext uses createColorSystem; FontContext uses loadFontsFromTheme; StyleContext wraps ThemeContext for legacy compatibility. Consumed by templates, compositions, and components.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/core/context` — understanding provider hierarchy, data flow, when to add/modify contexts, ThemeContextProps vs TemplateThemeConfig, StyleContext legacy wrapper, and dependencies (colorSystem, fonts, designPalettes).
- **Expected dev level**: Mid engineer familiar with React context, TypeScript, Remotion. Awareness of templates/base provider setup, FixturaDataset/Video data shape, and how compositions consume theme/video/font data.

## Source of Truth

1. Roadmap → `src/core/.docs/DevelopmentRoadMap.md` (document context shapes, provider usage)
2. Docs → `src/core/context/.docs/readMe.md`, `types/.docs/readMe.md`
3. Skills → `/.skills/architecture/core-context-folder.md`
4. Code reality → GlobalContext, VideoDataContext, ThemeContext, StyleContext, FontContext, LayoutContext, AnimationContext; types/ThemeContextTypes
5. Tickets → context may be referenced in component or core tickets

## Collaboration Phases

1. **Discovery** — Read docs and skill; understand provider hierarchy, data flow, context shapes.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks; context values propagate correctly to compositions.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| Context root | `src/core/context/.docs/readMe.md` |
| Types | `src/core/context/types/.docs/readMe.md` |
| Core roadmap | `src/core/.docs/DevelopmentRoadMap.md` |
| Provider hierarchy (templates/base) | `src/templates/base/index.tsx` |
| colorSystem (ThemeContext dependency) | `src/core/utils/colorSystem/` |
| fonts (FontContext dependency) | `src/core/utils/fonts/` |

## Roadmap

- **Path**: `src/core/.docs/DevelopmentRoadMap.md`
- **How to use**: To do: document context value shapes and provider usage with examples. Contexts are established; focus on documentation and consolidation.

## Tickets

- **Location**: Component or core-level tickets may reference contexts
- **Convention**: TKT-YYYY-NNN
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/core-context-folder.md` — Provider hierarchy, data flow, when to add/modify contexts

Related (dependencies and consumers):

- **colorSystem** — ThemeContext uses createColorSystem
- **fonts** — FontContext uses loadFontsFromTheme, loadFontByName
- **designPalettes** — DesignPalette type; getActivePalette, selectedPalette
- **templates/base** — Provider mount point
- **VideoDataContext** — FixturaDataset, Video, Club, SponsorsData from ../types/data

## Module Map

| Module | Responsibility | Entry Points |
|--------|----------------|---------------|
| `GlobalContext.tsx` | settings, data; entry point for render config | `GlobalContext.tsx` |
| `VideoDataContext.tsx` | data, video, club, metadata, media, appearance, contentLayout, templateVariation, sponsors, isAccountClub | `VideoDataContext.tsx` |
| `ThemeContext.tsx` | resolved theme (fonts, colors, layout, typography, getActivePalette, selectedPalette); uses createColorSystem | `ThemeContext.tsx` |
| `StyleContext.tsx` | legacy-compat theme, fontConfig, fontSizing, getActivePalette, selectedPalette; wraps ThemeContext | `StyleContext.tsx` |
| `FontContext.tsx` | fontsLoaded, loadFont, availableFonts; uses fontLoader | `FontContext.tsx` |
| `LayoutContext.tsx` | doesAccountHaveSponsors; consumes VideoDataContext sponsors | `LayoutContext.tsx` |
| `AnimationContext.tsx` | animations object (timing/easing); passed as prop to AnimationProvider | `AnimationContext.tsx` |
| `types/ThemeContextTypes.ts` | ThemeContextProps, ThemeFonts, ThemeTypography, ThemeLayout, ThemeSports, ThemeColors, etc. | `types/ThemeContextTypes.ts` |

### Provider Hierarchy (templates/base/index.tsx)

```
GlobalProvider (settings, data)
  → VideoDataProvider
    → ThemeProvider
      → StyleProvider
        → FontProvider
          → LayoutProvider
            → AnimationProvider (animations prop)
```

## Implementation Guidelines

- **Provider order**: Do not reorder providers; dependencies flow downward (e.g. ThemeProvider needs VideoDataContext).
- **ThemeContext**: Merges settings (GlobalContext) with video.appearance.theme (VideoDataContext); createColorSystem(primary, secondary, useMode); getActivePalette selects palette by templateVariation.palette.
- **StyleContext**: Backward-compat wrapper; use ThemeContext for new code; StyleContext for legacy useStylesContext consumers.
- **FontContext**: Uses createdTheme from ThemeContext; loadFontsFromTheme; delayRender/continueRender.
- **Data shapes**: VideoDataContext uses ../types/data (FixturaDataset, Video, Club, etc.); ThemeContext uses types/ThemeContextTypes.
- **Code quality**: Small providers; useMemo for expensive theme computation; guard context hooks with error on null.
- **Scope**: Limit edits to the task; context changes affect many consumers.
- **Documentation**: All markdown in `.docs/`; keep readMe current when structure changes.
- **Security**: Never store secrets; avoid leaking sensitive data.

## Verification Checklist

- [ ] Provider hierarchy unchanged or documented; no circular dependencies
- [ ] ThemeContext getActivePalette, selectedPalette work per templateVariation
- [ ] FontContext loads theme fonts before render (delayRender/continueRender)
- [ ] No regressions in compositions or components using useThemeContext, useVideoDataContext, useStylesContext, useFontContext, useLayoutContext, useAnimationContext
- [ ] readMe updated if context shapes or provider order change

## Memory Logging (optional)

Update `/.memory/*` when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- Skill `core-context-folder.md` may or may not exist; if missing, rely on readMe.
- Provider mount point: `src/templates/base/index.tsx` (DevelopmentRoot/ProductionRoot may wrap or use base).
- Doc paths use readMe.md per repo convention.

# Agent Brief — Fonts

## What This Feature Does

Font loading and registration utilities for Remotion videos. Loads fonts from local static files in `public/fonts/` — all fonts (including Google Fonts) are downloaded and stored locally; does not use `@remotion/google-fonts`. Provides `loadFontByName`, `loadFontsFromTheme`, `createFontConfig`, and `getAllFontNames`. FontContext uses these to load theme fonts (title, copy, fontConfig, headingFontFamily, etc.) before rendering via delayRender/continueRender. Uses `@remotion/fonts` for actual loading.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/core/utils/fonts` — understanding fontPathMap, createFontConfig, loadFontByName, loadFontsFromTheme, adding new fonts, system font handling, and fontNameVariants (case normalization).
- **Expected dev level**: Mid engineer familiar with TypeScript and Remotion (delayRender, continueRender, staticFile). Awareness of FontContext, TemplateThemeConfig (fonts, fontConfig, fontClasses), and Remotion font loading requirements.

## Source of Truth

1. Roadmap → `src/core/utils/.docs/DevelopmentRoadMap.md` (fonts not explicitly listed; generic utils roadmap)
2. Docs → `src/core/utils/fonts/.docs/readMe.md`
3. Skills → `/.skills/architecture/fonts-folder.md`, `/.skills/architecture/core-utils-folder.md`
4. Code reality → `fontLoader.ts`, `index.ts`
5. Tickets → `src/core/utils/.docs/Tickets.md`

## Collaboration Phases

1. **Discovery** — Read docs and skills; understand fontPathMap, load flow, theme integration.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks; fonts load in Remotion compositions; no regressions in FontContext.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| Fonts root | `src/core/utils/fonts/.docs/readMe.md` |
| Parent roadmap | `src/core/utils/.docs/DevelopmentRoadMap.md` |
| Parent tickets | `src/core/utils/.docs/Tickets.md` |
| FontContext (consumer) | `src/core/context/FontContext.tsx` |
| TemplateThemeConfig (theme shape) | `src/templates/types/TemplateThemeConfig.ts` |

## Roadmap

- **Path**: `src/core/utils/.docs/DevelopmentRoadMap.md`
- **How to use**: Fonts are not explicitly tracked in roadmap; changes here are localized. Adding fonts follows readMe "Adding Fonts" steps.

## Tickets

- **Location**: `src/core/utils/.docs/Tickets.md`
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks.
- **Relevant**: None specific to fonts; generic utils tickets may apply.
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/fonts-folder.md` — Implementation guidance for this folder
- `/.skills/architecture/core-utils-folder.md` — When to use fonts vs other utils

Related (consumers and dependencies):

- **FontContext** — loadFontsFromTheme, loadFontByName; uses createdTheme (ThemeContext)
- **TemplateThemeConfig** — fonts.title.family, fonts.copy.family, fontConfig, defaultCopyFontFamily, headingFontFamily, subheadingFontFamily, fontClasses
- **templates** — theme definitions reference font family names

## Module Map

| Module | Responsibility | Entry Points |
|--------|----------------|---------------|
| `fontLoader.ts` | FontConfig, fontPathMap, createFontConfig, loadFontFile, loadFontByName, loadFontsFromTheme, getAllFontNames; systemFonts, fontNameVariants | `fontLoader.ts` |
| `index.ts` | fonts object (display, text, specialty categories); reference for available fonts | `index.ts` |

## Implementation Guidelines

- **Local fonts only**: Store all fonts in `public/fonts/`; no `@remotion/google-fonts` or remote URLs.
- **Adding a font**: 1) Download and extract to `public/fonts/{FontName}/`; 2) Add to fontPathMap; 3) Add weight variants if needed (e.g. "FontName-Bold"); 4) Add to fontNameVariants for case normalization.
- **System fonts**: Skip loading for Arial, Helvetica, etc.; font stacks with commas treated as system fonts.
- **Theme contract**: loadFontsFromTheme reads theme.fonts.title.family, theme.fonts.copy.family, theme.fontConfig, theme.defaultCopyFontFamily, theme.headingFontFamily, theme.subheadingFontFamily, theme.fontClasses.
- **Remotion integration**: Use delayRender before loading, continueRender after; loadFont wraps @remotion/fonts loadFont.
- **Code quality**: Small functions, clear names; handle missing fonts gracefully (fallback to system fonts).
- **Scope**: Limit edits to the task; font additions are additive.
- **Documentation**: All markdown in `.docs/`; keep readMe current when structure or font list changes.
- **Security**: Never store secrets; font paths are relative to public.

## Verification Checklist

- [ ] New font added per readMe steps; fontPathMap and fontNameVariants updated
- [ ] loadFontsFromTheme loads theme fonts correctly; FontContext continues render
- [ ] No regressions in compositions or templates that use theme fonts
- [ ] System fonts skipped; no attempt to load Arial, Helvetica, etc.
- [ ] readMe updated if adding fonts or changing API

## Memory Logging (optional)

Update `/.memory/*` when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- Fonts has no dedicated DevelopmentRoadMap; uses parent utils roadmap.
- Skill `fonts-folder.md` may or may not exist; if missing, rely on readMe.
- FontContext uses createdTheme from ThemeContext; font loading happens on mount.
- Doc paths use readMe.md per repo convention.

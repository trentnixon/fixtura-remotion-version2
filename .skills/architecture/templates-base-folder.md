# Skill: Templates Base Folder

## Purpose

Guides working with `src/templates/base`: the foundational layout, context providers, shared components, theme contract, and extension points that all template variants extend. Use when navigating, modifying, or debugging base template infrastructure.

## Applies To

- `src/templates/base/` (root)
- `index.tsx`: BaseTemplate with context provider stack
- `BaseTemplateLayout.tsx`: intro/main/outro sequencing and component slots
- `theme.ts`: base theme tokens and defaults
- `components/`: BaseAudioTrack, BaseBackground
- `layouts/`: reserved for layout presets
- `_types/`: BaseTemplateProps, BaseTemplateLayoutProps
- `_utils/`: constants (z-index), calculations (durations)

## Inputs

- Understanding of Remotion compositions and React context
- Types from `src/templates/types/` (TemplateThemeConfig, AnimationConfig, UIConfig, AssetConfig)
- Folder readMe: `base/.docs/readMe.md`
- Parent skill: `templates-folder-structure.md`

## Process

### 1. Understand the Provider Stack

BaseTemplate wraps all variants with this provider order (inner to outer):

```
GlobalProvider → VideoDataProvider → ThemeProvider → StyleProvider → FontProvider → LayoutProvider → AnimationProvider
```

Variants do not create providers; they receive context from this stack via hooks (`useVideoDataContext`, `useThemeContext`, `useAnimationContext`, etc.).

### 2. Understand BaseTemplateProps

Variants pass these props to BaseTemplate:

| Prop | Purpose |
|------|---------|
| `data` | FixturaDataset |
| `settings` | UIConfig (from theme or separate) |
| `introComponent` | FC for intro sequence |
| `outroComponent` | FC with `{ doesAccountHaveSponsors }` |
| `backgroundComponent` | FC (default: BaseBackground; variants typically use SelectTemplateBackground) |
| `customAudioComponent` | FC (default: BaseAudioTrack) |
| `mainComponentLayout` | FC for main content (typically RouteToComposition or variant Main) |
| `animations` | AnimationConfig from variant's animations.ts |

### 3. Understand BaseTemplateLayout Sequencing

BaseTemplateLayout uses Remotion `Series` with three sequences:

1. **Intro**: `calculateIntroDuration(timings)` — renders `introComponent`
2. **Main**: `calculateMainDuration(timings)` — renders `mainComponentLayout` (contains RouteToComposition or variant Main)
3. **Outro**: `calculateOutroDuration(timings, doesAccountHaveSponsors)` — renders `outroComponent`

Durations come from `data.timings` (FPS_INTRO, FPS_MAIN, FPS_OUTRO) or `_utils/constants` defaults.

### 4. Theme Extension

Variants import `baseTheme` from `base/theme.ts` and merge overrides. Base defines:
- Fonts, componentStyles (Tailwind), layout (heights, spacing, padding)
- Color modes (light, dark, lightAlt, darkAlt)

Do not modify base theme for variant-specific overrides; variants provide their own `theme.ts`.

### 5. When Modifying Base

1. **New context provider**: Add to index.tsx stack; ensure order matches dependencies
2. **New slot/prop**: Extend BaseTemplateProps and BaseTemplateLayoutProps; thread through BaseTemplateLayout
3. **Duration logic**: Adjust `_utils/calculations.ts` or constants
4. **Shared component**: Add to `components/` and document in readMe

### 6. Child Modules

- **components/**: BaseAudioTrack, BaseBackground — see components/.docs/readMe.md
- **layouts/**: Reserved — see layouts/.docs/readMe.md
- **_types/**: Props interfaces — see _types/.docs/readMe.md
- **_utils/**: constants, calculations — see _utils/.docs/readMe.md

## Output

- Correct understanding of base layout, provider hierarchy, and extension points
- Ability to add or modify base infrastructure without breaking variants

## Rules

- Base provides; variants consume. Variants do not duplicate provider logic
- Keep BaseTemplate and BaseTemplateLayout generic; variant-specific logic stays in variants
- All durations flow from `data.timings` or defaults; avoid hardcoded frame counts in base

## References

- README: `src/templates/base/.docs/readMe.md`
- Parent skill: `templates-folder-structure.md`
- Types: `src/templates/types/`
- Core context: `core-context-folder.md`

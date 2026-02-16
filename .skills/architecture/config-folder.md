# Skill: Config Folder

## Purpose

Guides working with `src/config`: application-level configuration for shared constants, layout defaults, routing mappings, and cross-cutting config consumed by compositions, templates, and core utilities. Use when adding shared config that does not belong in templates/types, core/utils, or video data.

## Applies To

- `src/config/` (root)
- Intended for: shared constants, layout defaults, routing mappings, timings
- Consumers: routing, compositions (contentLayout defaults, divideFixturesBy fallbacks, timings), templates

## Inputs

- Folder readMe: `config/.docs/readMe.md`
- Understanding of where config currently lives: templates/types, core/utils/routing, video data

## Process

### 1. Current State

- **Placeholder**: Folder exists with readMe; no config modules yet ("To be populated")
- Config is currently distributed:
  - **templates/types**: TemplateThemeConfig, AnimationConfig, settingsConfig, AssetConfig
  - **core/utils/routing**: SPORT_COMPOSITION_TYPES, compositionMapping, sport modules
  - **video data** (VideoDataContext): contentLayout, divideFixturesBy — from `video.contentLayout`

### 2. What Belongs in src/config vs Elsewhere

| Belongs in src/config | Belongs elsewhere |
|----------------------|-------------------|
| Shared constants used by multiple compositions | templates/types (theme, animation, asset config) |
| Layout defaults (e.g. fallback items-per-screen) | video data (contentLayout from API) |
| Routing defaults or overrides | core/utils/routing |
| Cross-cutting timings (e.g. global duration presets) | Per-composition or template variant |
| Composition-agnostic defaults | Composition-specific config in composition folder |

### 3. When Adding Config Modules

1. Create module in `src/config/` (e.g. `layoutDefaults.ts`, `routingDefaults.ts`)
2. Export constants or factory functions
3. Consume from compositions, templates, or core/utils as needed
4. Update config readMe (Files section)
5. Prefer config here when multiple consumers need the same defaults

### 4. Relationship to contentLayout / divideFixturesBy

- **contentLayout**, **divideFixturesBy**: come from `video.contentLayout` (VideoDataContext)
- src/config can provide **fallbacks** when video data omits values (e.g. default games-per-screen)
- Compositions read from VideoDataContext; config defaults can be used when `contentLayout.divideFixturesBy.[AssetName]` is missing

### 5. Relationship to Routing

- **core/utils/routing**: SPORT_COMPOSITION_TYPES, compositionMapping, RouteToComposition
- src/config could hold routing **defaults** or overrides if routing config is externalized
- Currently routing is self-contained in core/utils/routing.tsx

## Output

- Correct understanding of where to put shared config
- Ability to add config modules when cross-cutting defaults are needed

## Rules

- config is leaf; no internal dependencies on other src folders
- Do not duplicate config that belongs in templates/types or video data
- Use for application-level, composition-agnostic shared values

## References

- config: `src/config/.docs/readMe.md`
- templates/types: `src/templates/types/` (TemplateThemeConfig, AnimationConfig, settingsConfig)
- routing: `src/core/utils/routing.tsx`
- video data: `src/core/types/data/videoData.ts` (contentLayout, divideFixturesBy)

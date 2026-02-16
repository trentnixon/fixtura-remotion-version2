# Architecture Skills Index

Quick lookup for all skills in `.skills/architecture/`. Use when navigating, extending, or debugging the Remotion codebase.

---

## Core

| Skill | Applies To | Use When |
|-------|------------|----------|
| [core-folder-structure.md](core-folder-structure.md) | `src/core/` | Directory layout, context/utils/types flow |
| [core-utils-folder.md](core-utils-folder.md) | `src/core/utils` | Routing, compositionMapping, datasetProcessing |
| [core-components-folder.md](core-components-folder.md) | `src/core/components` | Dev-only components, CompositionEntry |
| [core-hooks-folder.md](core-hooks-folder.md) | `src/core/hooks` | Shared hooks placeholder |
| [config-folder.md](config-folder.md) | `src/config` | Shared constants, layout defaults, routing fallbacks |
| [color-system-folder.md](color-system-folder.md) | `src/core/utils/colorSystem` | Palettes, gradients, shadows, color logic |
| [core-context-folder.md](core-context-folder.md) | `src/core/context` | Provider hierarchy, ThemeContext, VideoDataContext |
| [core-types-folder.md](core-types-folder.md) | `src/core/types` | Data schemas, sport types, FixturaDataset |
| [create-theme-utils-folder.md](create-theme-utils-folder.md) | `src/core/utils/createThemeUtils` | Theme creation, createThemeColorUtils |
| [design-palettes-folder.md](design-palettes-folder.md) | `src/core/utils/designPalettes` | Palette assembly, token inputs |
| [fonts-folder.md](fonts-folder.md) | `src/core/utils/fonts` | Font loading, fontPathMap, theme-based fonts |

---

## Components

| Skill | Applies To | Use When |
|-------|------------|----------|
| [components-folder-structure.md](components-folder-structure.md) | `src/components/` | Directory layout, ThemeContext/VideoDataContext, composition flow |
| [components-animations-folder.md](components-animations-folder.md) | `src/components/animations` | getAnimationConfig, generic presets vs domain-specific |
| [components-backgrounds-folder.md](components-backgrounds-folder.md) | `src/components/backgrounds` | SelectTemplateBackground, variants, overlays |
| [components-containers-folder.md](components-containers-folder.md) | `src/components/containers` | AnimatedContainer, modules vs raw |
| [components-easing-folder.md](components-easing-folder.md) | `src/components/easing` | getImageEasingFunction, shared easing types |
| [components-images-folder.md](components-images-folder.md) | `src/components/images` | AnimatedImage, useDualImageAnimation |
| [components-layout-folder.md](components-layout-folder.md) | `src/components/layout` | OneColumn, header, titleScreen, RouteToComposition |
| [components-transitions-folder.md](components-transitions-folder.md) | `src/components/transitions` | TransitionWrapper, @remotion/transitions |
| [components-typography-folder.md](components-typography-folder.md) | `src/components/typography` | AnimatedText, variants, letter/word splitting |
| [components-ui-folder.md](components-ui-folder.md) | `src/components/ui` | Future UI primitives (placeholder) |

---

## Cricket Compositions

| Skill | Applies To | Use When |
|-------|------------|----------|
| [cricket-compositions-feature.md](cricket-compositions-feature.md) | `src/compositions/cricket` | Feature overview, variant system, routing |
| [cricket-ladder-folder.md](cricket-ladder-folder.md) | `src/compositions/cricket/ladder` | Ladder variants, controller/layout |
| [cricket-performances-folder.md](cricket-performances-folder.md) | `src/compositions/cricket/performances` | Batting/bowling compositions |
| [cricket-result-single-folder.md](cricket-result-single-folder.md) | `src/compositions/cricket/resultSingle` | Single-match display |
| [cricket-results-folder.md](cricket-results-folder.md) | `src/compositions/cricket/results` | Multi-match results |
| [cricket-team-roster-folder.md](cricket-team-roster-folder.md) | `src/compositions/cricket/teamRoster` | Roster transitions, perspectives |
| [cricket-team-of-the-week-folder.md](cricket-team-of-the-week-folder.md) | `src/compositions/cricket/TeamOfTheWeek` | Grid layout, player categories |
| [cricket-top5-folder.md](cricket-top5-folder.md) | `src/compositions/cricket/top5` | Batting/bowling top 5 |
| [cricket-upcoming-folder.md](cricket-upcoming-folder.md) | `src/compositions/cricket/upcoming` | Upcoming games, pagination |

---

## Templates

| Skill | Applies To | Use When |
|-------|------------|----------|
| [templates-folder-structure.md](templates-folder-structure.md) | `src/templates` | Variant hierarchy, base layout, conventions |
| [templates-base-folder.md](templates-base-folder.md) | `src/templates/base` | Provider stack, BaseTemplateLayout, extension points |

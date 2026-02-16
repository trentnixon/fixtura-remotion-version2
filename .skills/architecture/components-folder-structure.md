# Skill: Components Folder Structure

## Purpose

Guides working with `src/components`: understanding the directory layout, ThemeContext/VideoDataContext integration, cross-cutting concerns (theme, data, animation), and how parts compose. Use when navigating, extending, or debugging component logic in Remotion compositions.

## Applies To

- `src/components/` (root)
- Child modules: animations, backgrounds, containers, easing, images, layout, transitions, typography, ui
- Consumers: templates, compositions, core/utils/routing

## Inputs

- Understanding of Remotion frame-based rendering and composition model
- Access to ThemeContext (palette, typography, layout) and VideoDataContext (template variation, video data)
- Folder readMe: `components/.docs/readMe.md`, `components/.docs/DirectoryMap.md`
- Child skill references: see References section

## Process

### 1. Understand the Folder Hierarchy

```
src/components/
├── animations/     # Generic animation configs (getAnimationConfig); lightweight
├── backgrounds/    # BackgroundComponents, SelectTemplateBackground
├── containers/     # AnimatedContainer; animations, styles, modules, examples
├── easing/         # Shared easing types, getImageEasingFunction
├── images/         # AnimatedImage; config/animations
├── layout/         # screen, main/header, titleScreen, sponsors
├── transitions/    # TransitionWrapper, TransitionSeriesWrapper (@remotion/transitions)
├── typography/     # AnimatedText; config (animations, styles, variants)
└── ui/             # Placeholder for future UI primitives
```

### 2. Understand Cross-Cutting Concerns

| Concern | Source | Used By |
|---------|--------|---------|
| Theme | ThemeContext (palette, typography, layout) | backgrounds, containers, typography, layout, ui |
| Data | VideoDataContext (templateVariation, video data) | All components that need variation or media |
| Animation | useCurrentFrame, interpolate, spring; easing from easing/ | images, containers, typography, transitions |

### 3. How Parts Compose

- **Layout** composes AnimatedContainer, AnimatedText, AnimatedImage, and backgrounds
- **Transitions** wrap sequences for between-scene motion
- **SelectTemplateBackground** chooses the appropriate background from template variation
- **easing/** provides shared `getImageEasingFunction` used by images, containers, typography

### 4. When Adding a New Component

1. Determine the correct folder (or create a new one if warranted)
2. Ensure ThemeContext/VideoDataContext access where needed
3. Prefer AnimatedContainer/AnimatedText for animation; use easing from `easing/` for custom curves
4. Add barrel export (`index.ts`) when adding a new module
5. Update the folder readMe and DirectoryMap

### 5. When Choosing Animation Systems

| Need | Use |
|------|-----|
| Simple initial/final presets | `animations/` (getAnimationConfig) |
| Frame-accurate container animation | `containers/animations/` |
| Image entry/exit | `images/config/`, `images/config/animations/` |
| Typography animation | `typography/config/animations/` |
| Between-scene transitions | `transitions/` |

### 6. Key Dependencies

- Internal: `core/context`, `core/utils`
- External: React, Remotion, @remotion/transitions

## Output

- Correct understanding of folder layout and composition flow
- Ability to add or modify components in the right place
- Clear path from ThemeContext/VideoDataContext to template consumption

## Rules

- Components are theme-aware via ThemeContext; data-driven via VideoDataContext
- All animation is frame-driven using interpolate, spring, and easing mapping
- Prefer shared easing from `easing/` over ad hoc curves
- UI primitives (ui/) should stay stateless; theme-aware via ThemeContext

## References

- Components root: `src/components/.docs/readMe.md`
- Directory map: `src/components/.docs/DirectoryMap.md`
- Child skills (all in `.skills/architecture/`):
  - `components-animations-folder.md`
  - `components-backgrounds-folder.md`
  - `components-containers-folder.md`
  - `components-easing-folder.md`
  - `components-images-folder.md`
  - `components-layout-folder.md`
  - `components-transitions-folder.md`
  - `components-typography-folder.md`
  - `components-ui-folder.md`
- Core roadmap: `src/core/.docs/DevelopmentRoadMap.md`

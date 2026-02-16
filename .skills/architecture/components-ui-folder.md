# Skill: Components UI Folder

## Purpose

Guides working with `src/components/ui`: placeholder for shared UI primitives (atoms/molecules). Currently empty; defines guidelines for when and how to add future components like buttons, badges, loaders, utility wrappers.

## Applies To

- `src/components/ui/` (root)
- Future: buttons, badges, loaders, utility wrappers
- Consumers: templates, compositions (when implemented)

## Inputs

- Understanding of component composition and ThemeContext
- Folder readMe: `ui/.docs/readMe.md`
- No existing source files

## Process

### 1. Current State

- Empty folder; no components defined
- Reserved for future UI atoms/molecules

### 2. Guidelines for Adding Components

- **Stateless**: Keep UI primitives stateless; avoid local animation state
- **Theme-aware**: Use ThemeContext for palette, typography, layout
- **Animation**: Prefer AnimatedContainer/AnimatedText from parent components for animation; UI primitives focus on structure and styling
- **Barrel exports**: Provide `index.ts` barrel exports when adding components

### 3. What Belongs Here vs Elsewhere

| Belongs in ui/ | Belongs elsewhere |
|----------------|-------------------|
| Buttons, badges, loaders | Layout (screen, header, sponsors) |
| Utility wrappers (non-animated) | AnimatedContainer, AnimatedText |
| Theme-aware atoms | Backgrounds, images, typography |

### 4. When Adding the First Component

1. Create component file
2. Add index.ts barrel export
3. Update ui/.docs/readMe.md (Files, Relations)
4. Ensure ThemeContext access where needed

## Output

- Clear guidelines for future UI primitive additions
- Correct placement of components (ui vs layout/containers)

## Rules

- Not tied to Remotion per-frame animation
- Theme-aware via ThemeContext
- Provide index.ts when adding components

## References

- ui: `src/components/ui/.docs/readMe.md`
- Parent: `components-folder-structure.md`
- For animation: use AnimatedContainer, AnimatedText from containers, typography

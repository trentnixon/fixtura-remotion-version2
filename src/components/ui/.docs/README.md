# Folder Overview

Placeholder for shared UI primitives (atoms/molecules): buttons, badges, loaders, utility wrappers. Not tied to Remotion per-frame animation. No components currently defined.

## Skill

- `.skills/architecture/components-ui-folder.md` – Guidelines for future UI primitives; stateless, theme-aware

## Files

None.

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: none
- Consumed by: intended for templates, compositions when implemented

## Dependencies

- Internal: none
- External: none

## Guidelines

- Keep UI primitives stateless; theme-aware via ThemeContext
- Prefer AnimatedContainer/AnimatedText for animation
- Provide index.ts barrel exports when adding components

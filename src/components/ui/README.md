## UI (Placeholder)

This folder is reserved for shared UI primitives (atoms/molecules) such as buttons, badges, loaders, and utility wrappers that are not tied to Remotion’s per-frame animation logic.

### Guidelines

- Keep UI primitives stateless where possible and theme-aware via `ThemeContext`
- Prefer composition via `AnimatedContainer`/`AnimatedText` if animation is required
- Provide `index.ts` barrel exports for ergonomic importing

No components are currently defined.

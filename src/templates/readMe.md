# Folder Overview

Templates define composable video composition blueprints. Variants extend a base layout and theme to produce different branded looks while sharing a common contract for assets, settings, and animations.

## Files

- `registry.tsx`: registers available templates/variants for use by compositions
- `HowToCreateANewVariation.md`: step-by-step guide for creating a new variant

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: uses `src/components` for primitives; integrates with `src/core` types and utils
- Consumed by: compositions under `src/compositions/*` select variants via `registry`

## Dependencies

- Internal: `base`, `types`, `variants`
- External: Remotion, React, TailwindCSS (styles), project-specific utilities

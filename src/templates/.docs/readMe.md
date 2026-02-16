# Folder Overview

Templates define composable video composition blueprints. Variants extend a base layout and theme to produce different branded looks while sharing a common contract for assets, settings, and animations.

## Skill

- `.skills/architecture/templates-folder-structure.md` – Implementation guidance for templates and variants
- `.skills/architecture/templates-base-folder.md` – BaseTemplate, provider stack, extension points
- `.skills/workflows/create-template-variant.md` – Step-by-step workflow for creating new variants

## Files

- `registry.tsx`: registers available templates/variants for use by compositions
- `.docs/HowToCreateANewVariation.md`: step-by-step guide for creating a new variant
- `.docs/how-to.md`: detailed how-to for variant creation, theming, and integration

## Child Modules

- **`base/`**: [base/.docs/readMe.md](../base/.docs/readMe.md) — foundational layout, shared components, theme contract
- **`types/`**: [types/.docs/readMe.md](../types/.docs/readMe.md) — TemplateThemeConfig, settingsConfig, AssetConfig, AnimationConfig
- **`variants/`**: [variants/.docs/readMe.md](../variants/.docs/readMe.md) — concrete template implementations (basic, classic, brickwork, etc.)

## Relations

- Parent folder: [../../README.md](../../README.md) (project root)
- Key dependencies: uses `src/components` for primitives; integrates with `src/core` types and utils
- Consumed by: compositions under `src/compositions/*` select variants via `registry`

## Dependencies

- Internal: `base`, `types`, `variants`
- External: Remotion, React, TailwindCSS (styles), project-specific utilities

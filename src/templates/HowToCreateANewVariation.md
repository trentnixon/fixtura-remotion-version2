# How to Create a New Template Variation

This guide explains to an LLM how to scaffold a new template variant under `src/templates/variants`. Follow these steps and conventions to ensure consistency across variants.

## Prerequisites

- Understand the base building blocks in `src/templates/base`
- Review the typing contracts in `src/templates/types`
- Know how the `registry.tsx` exposes variants to compositions

## Required Files and Structure

Create a new subfolder under `src/templates/variants/<variantName>/` with the following files:

- `index.tsx`: Exports the variant as a composition factory using base layout and components
- `theme.ts`: Variant theme overrides (colors, spacing, typography tokens)
- `animations.ts`: Variant-specific animation presets and timings
- `components/`: Contains all UI blocks used by this variant
  - Background component
  - Intro component
  - Main content component(s)
  - Header component(s)
  - Outro component

Example:

```
src/templates/variants/<variantName>/
  animations.ts
  components/
    <VariantName>Background.tsx
    <VariantName>Intro.tsx
    <VariantName>Main.tsx
    <VariantName>MainHeader.tsx
    <VariantName>Outro.tsx
  index.tsx
  theme.ts
```

## Configuration Contracts (Types to Use)

- Use `src/templates/types/TemplateThemeConfig.ts` to shape your theme object.
- Use `src/templates/types/settingsConfig.ts` if your variant supports runtime settings.
- Use `src/templates/types/AssetConfig.ts` if your variant requires external assets.
- Use `src/templates/types/AnimationConfig .ts` for structured animation presets.

## Implementation Steps

1. Duplicate a similar existing variant as a starting point (e.g., `basic` or `classic`).
2. Update filenames and component names to use your `<VariantName>` prefix consistently.
3. Compose your components inside `index.tsx` using `BaseTemplateLayout` from `../base/BaseTemplateLayout`.
4. Provide a `theme.ts` that merges or overrides base tokens as needed.
5. Define motion in `animations.ts` and wire those into your components.
6. Ensure all components accept the expected props (assets, settings, theme, timings) consistent with base/types contracts.
7. Register the new variant in `src/templates/registry.tsx` so compositions can select it.

## Information Required from the Caller

When an LLM creates a new variant, request the following inputs:

- Variant name (PascalCase): `<VariantName>`
- Visual style direction: colors, typography cues, density
- Required assets: logos, backgrounds, images, audio
- Runtime settings: toggles, speeds, content options
- Animation style: entrance/exit, easing, durations
- Composition targets: which compositions will consume this variant

## Registration

After creating the folder and files, add the variant to `src/templates/registry.tsx`:

- Import the new `index.tsx` exported factory
- Export it in the registry list/map used by compositions

## Testing Checklist

- Can import and render the variant via `registry`
- All components render with provided theme and settings
- No missing asset references
- Timings, durations, and easings feel consistent
- Final render completes without runtime errors

## Documentation

- Add `readMe.md` to the new variant folder and its `components/` subfolder (follow project readMe template)
- Update any relevant `DevelopmentRoadMap.md` items if expanding the feature

## Tips

- Keep names consistent: files, components, and exports use `<VariantName>` prefix
- Start simple: reuse base components before creating new ones
- Prefer configuration in `theme.ts` and `animations.ts` over hardcoded values

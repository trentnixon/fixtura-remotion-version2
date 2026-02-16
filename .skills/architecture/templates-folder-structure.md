# Skill: Templates Folder and Subfolders

## Purpose

Guides working with `src/templates` and its subfolders: understanding the hierarchy, variant conventions, base layout extension, and documentation rules. Use when navigating, modifying, or creating template variants in the Remotion video composition system.

## Applies To

- `src/templates/` (root)
- `src/templates/base/` – foundational layout and shared components
- `src/templates/types/` – typing contracts for themes, settings, assets, animations
- `src/templates/variants/` – concrete template implementations (basic, brickwork, classic, etc.)

## Inputs

- Understanding of Remotion compositions and React
- Access to `src/templates/.docs/` for HowToCreateANewVariation and DevelopmentRoadMap

## Process

### 1. Understand the Folder Hierarchy

```
src/templates/
├── registry.tsx           # Central registry; compositions select variants here
├── base/                  # Shared layout, theme contract, base components
│   ├── BaseTemplateLayout.tsx
│   ├── theme.ts
│   ├── components/
│   ├── _types/
│   └── _utils/
├── types/                 # Config contracts (theme, settings, assets, animations)
└── variants/              # One subfolder per variant
    └── <variantName>/
        ├── index.tsx
        ├── theme.ts
        ├── animations.ts
        └── components/
```

### 2. When Creating a New Variant

1. Duplicate a similar variant (e.g. `basic`, `brickwork`) as a starting point.
2. Rename files and components with `<VariantName>` prefix (PascalCase for components, camelCase for filenames).
3. Provide `index.tsx` that composes `BaseTemplateLayout` from `../base`.
4. Provide `theme.ts` merging/overriding base tokens.
5. Provide `animations.ts` for variant-specific presets.
6. Ensure `components/` contains: Background, Intro, Main, MainHeader, Outro.
7. Register in `src/templates/registry.tsx` (import + add to `templateRegistry`).
8. Add `readMe.md` under `.docs/` for the variant folder and its `components/` subfolder.

### 3. When Navigating or Modifying

- Variants extend base and import types from `../types` (or `../../types` from variant root).
- Components receive props per base/types contracts: assets, settings, theme, timings.
- All markdown planning files live in `.docs/` (no stray markdown outside `.docs/`).

### 4. Documentation Rules (readMe.md)

Each folder must have a corresponding `readMe.md` in `.docs/` with:

- **Folder Overview**: responsibility of the folder
- **Files**: what each file does
- **Child Modules**: links to child readMes (if any)
- **Relations**: parent, dependencies, consumed by
- **Dependencies**: internal and external

Constraints: no narrative, no implementation detail, no opinions. LLM-first.

## Output

- Correct understanding of where to add or change code
- New variants that follow the structure and are registered
- Updated readMe files when structure changes

## Rules

- Variant components use `<VariantName>` prefix consistently (e.g. `BrickworkIntro`, `brickworkIntro.tsx`).
- Use `src/templates/types/TemplateThemeConfig.ts`, `settingsConfig.ts`, `AssetConfig.ts`, `AnimationConfig.ts` for config shapes.
- Prefer configuration in `theme.ts` and `animations.ts` over hardcoded values.
- Keep `readMe.md` concise: roles, relations, dependencies only.

## References

- README: `src/templates/.docs/readMe.md`
- Roadmap: `src/templates/.docs/DevelopmentRoadMap.md`
- How-to: `src/templates/.docs/HowToCreateANewVariation.md`
- Base: `src/templates/base/.docs/readMe.md`
- Variants: `src/templates/variants/.docs/readMe.md`

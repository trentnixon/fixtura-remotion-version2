# Skill: Create Template Variant

## Purpose

Step-by-step workflow for creating a new template variant that extends the base template. Use when adding a new visual style/layout (e.g., Basic, Classic, Brickwork) to the Remotion video composition system.

## Applies To

- New template variants in `src/templates/variants/{VariantName}/`
- Compositions that consume templates
- Registry, routes, and display components

## Inputs

- Variant name in PascalCase (e.g., `YourVariant`)
- Understanding of BaseTemplate and existing variants (see `basic/`, `classic/`)
- Types from `src/templates/types/` (TemplateThemeConfig, AnimationConfig)
- Skill: `templates-folder-structure.md`, `templates-base-folder.md`
- How-to (detailed): `src/templates/.docs/how-to.md`

## Process

### Phase 1: Create Variant Structure

1. Create folder `src/templates/variants/YourVariant/` with:
   - `index.tsx` — composes BaseTemplate, passes intro/outro/main/background/animations
   - `theme.ts` — extends `baseTheme`, overrides fonts, componentStyles, layout, color modes
   - `animations.ts` — AnimationConfig with image, text, container, transition presets
   - `.docs/readMe.md` — folder contract per repo rules

2. Create `components/` with:
   - `YourVariantIntro.tsx`, `YourVariantOutro.tsx`, `YourVariantMain.tsx`, `YourVariantMainHeader.tsx`, `YourVariantBackground.tsx`
   - `.docs/readMe.md` for components folder

3. Background component: Use `SelectTemplateBackground()` (wrapper only). Do not implement custom background unless required.

4. Component naming: All components must use variant prefix (`YourVariantIntro`, not `Intro`).

### Phase 2: Register Variant

5. Add to `src/templates/registry.tsx`:
   - Import variant component
   - Add entry: `YourVariant: { component: YourVariant, variants: Variants }`
   - Registry key = PascalCase variant ID

### Phase 3: Hook Up Compositions

6. For each composition type (e.g., CricketLadder, CricketTop5):
   - Create `src/compositions/{sport}/{compositionType}/yourVariant.tsx` — composition implementation with transitions
   - Create `src/compositions/{sport}/{compositionType}/controller/Display/display-YourVariant.tsx` — display component that renders the data layout

7. Export from composition index:
   - Add to `{compositionType}/index.tsx`: `yourvariant: ladderYourVariant` (lowercase key)
   - Add to sport `index.tsx`: include in composition map

### Phase 4: Documentation and Testing

8. Add `.docs/readMe.md` for variant root and `components/.docs/`. Update `templates/.docs/readMe.md` Child Modules if adding a notable variant.

9. Test in Remotion Studio:
   - Run `npm run dev`
   - Verify variant appears: Variant → Background Variant → Sport → Dataset
   - Test all composition types and background variants
   - Verify `useVideoDataContext`, `useThemeContext`, `useAnimationContext` work

## Output

- New variant folder with index, theme, animations, components
- Variant registered in registry
- Composition implementations and display components for each composition type
- Variant selectable in Remotion Studio

## Rules

- Variant ID: PascalCase in registry; lowercase in composition maps
- Background: `SelectTemplateBackground()` for 99% of variants
- Theme: extend `baseTheme`, override only what differs
- All documentation in `.docs/`; no stray markdown

## References

- README: `src/templates/.docs/readMe.md`
- How-to: `src/templates/.docs/how-to.md`
- Example (minimal): `src/templates/variants/basic/`
- Example (classic): `src/templates/variants/classic/`
- Architecture: `templates-folder-structure.md`, `templates-base-folder.md`
- Backgrounds: `components-backgrounds-folder.md`

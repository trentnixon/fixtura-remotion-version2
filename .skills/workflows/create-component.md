# Skill: Create Component (Compositions & Shared UI)

## Purpose

Mandatory patterns for new composition display code and shared UI under `src/components` or `src/compositions`: **template variant theme** drives copy and container sizing, and **light/dark (and alt modes)** drive container surfaces and text tokens. Use when adding or refactoring screens, layout rows, glass panels, or typography in a template-backed video.

## Applies To

- Composition `layout/*`, `controller/Display/*`, and primitives under `src/compositions/**`
- Shared building blocks under `src/components/**` that read ThemeContext
- Any template-specific styling that must stay consistent per variant (Brickwork, Broadcast Pro, etc.)

## Inputs

- `useThemeContext()` — `componentStyles`, `layout`, `fonts`, `fontClasses`, `selectedPalette`, `mode` keys as provided by ThemeProvider
- `useVideoDataContext()` — `templateVariation.mode` (light / lightAlt / dark / darkAlt) feeds palette selection
- Active variant theme: `src/templates/variants/{Variant}/theme/` (or `theme.ts` where still a single file)
- Skills: `components-folder-structure.md`, `components-typography-folder.md`, `components-layout-folder.md`, `design-palettes-folder.md`, `core-context-folder.md`

## Rules (non-negotiable)

### 1. Variant theme for copy and container sizing

- **Copy classes**: Prefer keys on **`ThemeContext.componentStyles`** (e.g. `componentStyles.yourKey.className`) sourced from the **active template variant’s theme**, not ad hoc Tailwind `text-*` in composition files. If a new text role is needed, **add a `componentStyles` key** in that variant’s theme (e.g. `variants/broadcastPro/theme/composition/…` or shared theme file) and consume it from the display component.
- **Layout sizing**: Use **`layout.heights`**, **`layout.padding`**, **`layout.spacing`**, **`layout.borderRadius`** from ThemeContext for asset/header/footer and structural spacing—not one-off pixel constants—unless the design doc specifies a metric that is then **centralized in theme** (e.g. roster list dynamic px from theme-driven `broadcastProRosterListSizing`).
- **Fonts**: Respect **`fonts`** / **`fontClasses`** from the variant theme; do not pick arbitrary families for composition copy that contradict the variant.

### 2. Light and dark mode on containers and copy

- **Mode → palette**: `templateVariation.mode` selects the palette path; **`selectedPalette`** exposes **container** and **text** tokens for the active mode (light, lightAlt, dark, darkAlt).
- **Container surfaces**: Use palette/container tokens (**`selectedPalette.container`**, background helpers, glass alpha from variant config such as `broadcastProGlassOpacity` / transparent layers)—avoid hardcoding semantic surface colors (`#fff` / `#000`) for production UI unless they are derived from the same mode contract encoded in theme.
- **Copy on panels / glass / “on container”**: Use typography **`variant`** values that map to **`palette.text.onContainer.*`** (e.g. `onContainerTitle`, `onContainerCopy`, `onContainerMuted`, `onContainerAccent`, `onContainerSecondary`) via **`getVariantStyles(variant, selectedPalette)`** and/or primitives that already take those variants.
- **Copy on full-bleed background**: Use **`onBackground*`** variants when text sits directly on the scene background, not on a glass card.
- **Verify**: Exercise **light and dark** (and **alt** modes if your composition differentiates them) in Remotion so contrast and tokens stay correct.

### 3. Checklist before merge

- [ ] No stray semantic colors for titles/body/muted/accent—**palette + variant** only.
- [ ] New text/layout tokens live in the **variant theme** `componentStyles` (or related theme module), not only inline in one file.
- [ ] Structural dimensions align with **`layout`** / theme unless explicitly documented as dynamic metrics from theme.
- [ ] Light + dark (and alts if applicable) checked for readability.

## Process (short)

1. Identify the template variant (from routing / registry) and open its **theme** definition.
2. Add or reuse **`componentStyles`** keys for every distinct text role or layout shell class string.
3. In the component, read **`useThemeContext()`**; apply **`componentStyles`**, **`layout`**, **`selectedPalette`**; wire **`AnimatedText`** / primitives with **`onContainer*`** or **`onBackground*`** variants as appropriate.
4. Confirm **`templateVariation.mode`** behavior by switching modes in the preview.

## Output

- Components that respect variant theming and mode-correct surfaces and copy.
- One place (variant theme) to tune typography and spacing per template.

## References

- Workflow: `create-template-variant.md` (new variant packages)
- Theme types: `src/templates/types/TemplateThemeConfig.ts`
- Typography variants: `src/components/typography/config/variants.ts` (`getVariantStyles`)
- Broadcast Pro theme layout: `src/templates/variants/broadcastPro/.docs/readMe.md` (Theme folder layout)

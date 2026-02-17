# Agent Brief — Components Typography

## What This Feature Does

Animated, theme-aware typography primitives. AnimatedText supports type-based styles (title, subtitle, bodyText, score, teamName, etc.), color variants (onBackgroundMain, gradient, onContainer, etc.), entry/exit animations, and letter/word splitting. Uses ThemeContext (componentStyles, typography scales), FontContext (font loading), and shared easing from `../easing`. Consumed by cricket compositions (ladder, results, resultSingle, teamRoster, upcoming), templates (variants), and layout components.

## LLM Role and Developer Level

- **Purpose**: Assist within `src/components/typography` — understanding AnimatedText props (type, variant, contrastSafe, animation, exitAnimation, letterAnimation), style resolution flow (getTypographyStyles, getVariantStyles, applyContrastSafety), when to add new types/variants/animations, and integration with config/animations (fade, scale, slide, spring, special).
- **Expected dev level**: Mid engineer familiar with React, TypeScript, Remotion (useCurrentFrame, interpolate, spring). Awareness of ThemeContext.componentStyles, FontContext, typography scales, and easing descriptors consumed from `../easing`.

## Source of Truth

1. Roadmap → `src/components/typography/.docs/DevelopmentRoadMap.md`
2. Docs → `src/components/typography/.docs/readMe.md`, `config/.docs/README.md`, `config/animations/.docs/README.md`
3. Skills → `/.skills/architecture/components-typography-folder.md`
4. Code reality → `AnimatedText.tsx`, `config/` (animations, styles, variants), `types.ts`
5. Tickets → execution only; component-level tickets in `src/components/.docs/Tickets.md`

## Collaboration Phases

1. **Discovery** — Read docs and skill; understand AnimatedText, style resolution, variants, animations, letter/word splitting.
2. **Plan** — Approach, file list, risks, assumptions.
3. **Implement** — Code changes.
4. **Verify** — Manual checks; typography renders correctly in compositions and templates.
5. **Log** — Update `/.memory/*` only when the user uses `LOG:`.

**Rule**: No code changes until the user explicitly confirms the current phase (default: Discovery).

## Where the Docs Are

| Context | Path |
|---------|------|
| Typography root | `src/components/typography/.docs/readMe.md` |
| Roadmap | `src/components/typography/.docs/DevelopmentRoadMap.md` |
| Config | `src/components/typography/config/.docs/README.md` |
| Config animations | `src/components/typography/config/animations/.docs/README.md` |
| Utils | `src/components/typography/utils/.docs/README.md` |
| Parent roadmap | `src/components/.docs/DevelopmentRoadMap.md` |
| Component tickets | `src/components/.docs/Tickets.md` |

## Roadmap

- **Path**: `src/components/typography/.docs/DevelopmentRoadMap.md`
- **How to use**: Tracks completed work (AnimatedText, theme integration, letter/word animation, color variants, spring support). To Do: performance optimizations, new animation types, advanced features, accessibility, testing, developer experience. Use for prioritization; execution details in Tickets.

## Tickets

- **Location**: `src/components/.docs/Tickets.md` (components-wide; typography mentioned where relevant)
- **Convention**: TKT-YYYY-NNN with metadata block, phases, tasks. Completed work summarized and archived to `Completed.md`.
- **Role**: Execution planning only; decisions come from docs and skill.

## Required Skills

- `/.skills/architecture/components-typography-folder.md` — AnimatedText; config (animations, styles, variants); letter/word splitting; when to add types or variants
- `/.skills/architecture/components-folder-structure.md` — parent structure, ThemeContext/VideoDataContext integration

Related (for consumers and shared dependencies):

- `/.skills/architecture/components-easing-folder.md` — typography consumes easing for animations
- `/.skills/architecture/components-animations-folder.md` — generic presets; typography has domain-specific config/animations
- `/.skills/architecture/components-images-folder.md` — shared easing; different domain (images vs text)

## Module Map

| Module | Responsibility | Entry Points |
|--------|----------------|---------------|
| `AnimatedText.tsx` | Main component; props: type, variant, contrastSafe, animation, exitAnimation, exitFrame, letterAnimation | `AnimatedText.tsx` |
| `types.ts` | TypographyType, ColorVariant, AnimationMode, AnimationConfig | `types.ts` |
| `index.tsx` | Barrel export (AnimatedText) | `index.tsx` |
| `config/` | animations.ts (normalizeAnimation, useAnimation), styles.ts (getTypographyStyles), variants.ts (getVariantStyles, applyContrastSafety) | `config/animations.ts`, `config/styles.ts`, `config/variants.ts` |
| `config/animations/` | fade, scale, slide, spring, special; types, useAnimation, springConfigs | `config/animations/useAnimation.ts`, `config/animations/*.ts` |
| `utils/` | Placeholder for typography utilities | `utils/` |

## Implementation Guidelines

- **Styles from ThemeContext**: Use componentStyles and typography scales; do not hardcode.
- **Variants from palette**: getVariantStyles; applyContrastSafety when contrastSafe prop set.
- **Shared easing**: Use `../easing`; do not duplicate easing logic.
- **Letter/word splitting**: Implement in config/animations; tuned for AnimatedText per-letter/per-word progress.
- **New types**: Add to TypographyType union in types.ts; ensure ThemeContext mapping; update getTypographyStyles if needed.
- **New variants**: Add in config/variants.ts; implement getVariantStyles; optional applyContrastSafety.
- **New animations**: Add in config/animations/; wire into useAnimation; ensure support for per-letter/per-word if needed.
- **Code quality**: Small functions, clear names; guard early; validate boundaries.
- **Scope**: Limit edits to the task; no broad refactors without approval.
- **Documentation**: All markdown in `.docs/`; keep readMe current when structure changes.
- **Security**: Never store secrets; avoid leaking sensitive data.

## Verification Checklist

- [ ] New type/variant/animation added per skill; ThemeContext or config updated
- [ ] AnimatedText used correctly (type, variant, animation props)
- [ ] Shared easing from `../easing`; no local easing duplication
- [ ] Letter/word splitting works for new animations where applicable
- [ ] No regressions in consuming compositions (ladder, results, teamRoster, resultSingle) or templates
- [ ] readMe updated if structure or exports change

## Memory Logging (optional)

Update `/.memory/*` only when the user explicitly triggers `LOG:`.

## Assumptions / Missing Docs

- Typography has dedicated DevelopmentRoadMap at `typography/.docs/DevelopmentRoadMap.md`.
- Skill `components-typography-folder.md` exists and is authoritative for typography behavior.
- Consumers: cricket compositions (ladder, results, resultSingle, teamRoster, upcoming), templates (Brickwork, Mudgeeraba, Classic), layout. Tickets at `src/components/.docs/Tickets.md`.

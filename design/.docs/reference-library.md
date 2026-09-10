# Design reference library (Pass 2)

Read **after pass 1 hydration** is verified in the browser. Scope: overlays inside `.design-social-canvas` only — not Remotion backgrounds.

| Doc | When to read | Do not use for |
| --- | --- | --- |
| [Google Fonts for Professional Graphic Design](../design-Reference-docs/Google%20Fonts%20for%20Professional%20Graphic%20Design.md) | Choosing or changing font pairing; includes LLM font-selection protocol | Ignoring `design/_shared/fonts.json` manifest |
| [CSS Professional Design Techniques](../design-Reference-docs/CSS%20Professional%20Design%20Techniques-2.md) | Tokens, depth, panels, shadows, polish on overlay surfaces | Full-bleed backgrounds or decorative FX that beats data |
| [SVG Pattern and Texture Systems](../design-Reference-docs/SVG%20Pattern%20and%20Texture%20Systems%20for%20Professional%20Graphics.md) | Structural motifs, rails, dividers, fine grain on surfaces | Player photos, stadium FX, full-bleed atmosphere |
| [Tailwind and CSS for Fixtura templates](../design-Reference-docs/tailwind-css-remotion.md) | **Pass 2 + handoff** — where each style belongs; literal classes; design CDN vs Remotion Tailwind v4 | Dynamic Tailwind class assembly; assuming design-page CSS copies to Remotion |

## Fixtura constraints (override generic advice)

- **Overlays only** — no photos, gradients, Generated/Luminance, or full-bleed imagery as designed backgrounds.
- **Org colours from fixture** — tokens derive from data, not invented palettes.
- **Atmospheric texture** — restrained; on structural surfaces only; remove first if the graphic gets busy.
- **Variant motif rules** override generic texture advice when present (e.g. [scoreline-crease-motif-grammar.md](./scoreline-crease-motif-grammar.md) for Scoreline).

## Remotion handoff references

Read during **Phase 4** (Remotion implementation), not while iterating HTML in the design site.

| Doc | When to read | Do not use for |
| --- | --- | --- |
| [Theme modes and contrast](../design-Reference-docs/theme-modes.md) | Wiring `theme/mode.ts`, glass panels, copy/title contrast across `light` / `lightAlt` / `dark` / `darkAlt` | Assuming design-site placeholder backdrop = production background |
| [Tailwind and CSS for Fixtura templates](../design-Reference-docs/tailwind-css-remotion.md) | Re-read at handoff — theme vs scoped CSS vs runtime hooks; Studio + package CSS entry points | Copying design-site CDN Tailwind config into Remotion unchanged |
| [remotion-handoff.md](./remotion-handoff.md) | Full prototype → Remotion runbook | Design-site pass 1 layout |

## Linked from

- [new-template-prompt.md](./new-template-prompt.md) — Phase 1, Phase 3 Pass 2, Phase 4
- [design-system-brief.md](./design-system-brief.md) — Pass 2 authoritative sources
- [remotion-handoff.md](./remotion-handoff.md) — handoff steps
- [guide/index.html](../guide/index.html) — Visual craft library and Handoff to Remotion sections

# Scoreline — Crease motif grammar

Codified visual system for the **Scoreline** variant (The Crease System). Shared polish lives in `design/_shared/scoreline-polish.css`; theme derivation in `scoreline-theme.js`.

## Identity principle

Repeat a small grammar across assets. Do not invent a new aesthetic per template.

## Motif decisions

| System | Crease rule |
|--------|-------------|
| **Geometry** | Flat panels only — no clip-path, skew, or angled shells |
| **Direction** | `118deg` gradient angle on team bands; mirrored (+180deg) on away-side band |
| **Surfaces** | Large org-colour team fields; ink result bar; muted context band; quiet sponsor strip |
| **Typography** | Barlow Condensed (display/scores) + Source Sans 3 (metadata/body); tabular lining numerals on scores and figures |
| **Dividers** | **Crease rail** between matches — semantic transition device (not decorative rules elsewhere) |
| **Depth** | Restrained elevation: inset highlights, contact shadow on result bar and logo wells only |
| **Texture** | Single fine grain (`design/_shared/textures/fine-noise.svg`) on structural surfaces only — see `textures/manifest.json` |
| **Interruption** | Logo wells sit above band surface (`z-index`) — padding stays uniform on all band edges |
| **Motion** | Remotion layer — static prototypes do not animate |

## Motif jobs (consistent meaning)

| Device | Job |
|--------|-----|
| Crease rail | Match-to-match transition |
| Team colour band | Team identity + score anchor |
| Result statement bar | Outcome anchor (story line) |
| Performance crease underline | Category label (Batting / Bowling) |
| Context band | Round, format, venue (recycled metadata) |
| Logo well | Crest containment — optical border + contact shadow |
| Score watermark | Optional scale layer on **single-match hero** assets only — not multi-match lists |

## Contrast architecture (7 levels)

1. Score / result — highest (`--contrast-score`)
2. Team name — strong (`--contrast-team`)
3. Leading performance row — medium-high (`--contrast-performance-lead`)
4. Supporting performance rows — medium (`--contrast-performance-support`)
5. Match metadata — reduced (`--contrast-meta`)
6. Decorative atmosphere — barely perceptible (spotlight radial on club band)
7. Sponsor zone — separated, quietest (`--contrast-sponsor`)

Hierarchy must hold in grayscale; colour reinforces only.

## Colour roles

Raw org primary/secondary from fixture are **inputs**. `applyScorelineTheme()` derives:

- `--surface-strong-primary` / `--surface-strong-secondary` — production surfaces
- `--on-surface` — foreground on team bands (light or dark, from luminance)
- `--accent-on-light-primary` / `--accent-on-light-secondary` — performance figures on paper

## Asset-specific opt-in

| Feature | Results (multi-match) | Result single (hero) |
|---------|----------------------|----------------------|
| Score watermark | Off | `data-score-watermark="enabled"` |
| Uniform band padding | `--team-band-pad` (14px all sides) | Same |
| Shared polish CSS | Required | Required |

## Shared implementation

| Layer | File |
|-------|------|
| Crease + grain CSS | `design/_shared/scoreline-polish.css` |
| Grain tile | `design/_shared/textures/fine-noise.svg` |
| Asset manifest | `design/_shared/textures/manifest.json` |

**Grain surfaces (all assets):** header shell, team bands, result bar, featured #1 row, sponsor strip, roster context band.

**Crease surfaces (all assets):** header shell, footer, row/match separators. Sizing tokens: default, emphasis (match/leader/ladder/totw), compact (roster).

## References

- Design constraints: [design-system-brief.md](./design-system-brief.md)
- Export QA: [scoreline-export-checklist.md](./scoreline-export-checklist.md)
- CSS techniques: [../design-Reference-docs/CSS Professional Design Techniques-2.md](../design-Reference-docs/CSS%20Professional%20Design%20Techniques-2.md)
- Texture guide: [../design-Reference-docs/SVG Pattern and Texture Systems for Professional Graphics.md](../design-Reference-docs/SVG%20Pattern%20and%20Texture%20Systems%20for%20Professional%20Graphics.md)

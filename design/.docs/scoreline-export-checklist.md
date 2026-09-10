# Scoreline export checklist

Use before rolling polish to Remotion renders or publishing template changes.

Motif grammar: [scoreline-crease-motif-grammar.md](./scoreline-crease-motif-grammar.md)

## Render setup

- [ ] Confirm production Chromium version supports `color-mix()` (or fallbacks in `scoreline-polish.css` apply)
- [ ] Wait for `document.fonts.ready` before frame capture
- [ ] Wait for club and team crest images to load or fail (`watchScorelineCrests` in design prototypes)

## Output dimensions

- [ ] Preview at **1080 × 1350** (not scaled browser zoom only)
- [ ] Check feed thumbnail legibility (~400px wide)
- [ ] Verify bottom **64px** safe zone for platform crop

## Theme extremes

Test fixtures with:

- [ ] Pale primary (yellow/cream club colour)
- [ ] Dark primary (navy/black)
- [ ] Highly saturated primary
- [ ] Primary and secondary with similar luminance

## Content states (Results)

- [ ] Two matches with full performances
- [ ] Match with **no** performances (`data-performance-count="0"`)
- [ ] Match with **one** panel only (`data-performance-count="1"`)
- [ ] Missing team crest (`data-has-crest="false"`)
- [ ] Long result text (`data-length="long"`)
- [ ] Long team names (uppercase, wide characters)
- [ ] Sponsor strip present and absent

## Visual compression

After export to target format (JPEG/MP4):

- [ ] Soft gradients (team bands, result bar, sponsor strip) — no visible banding
- [ ] Inset highlights still visible on muted bands and sponsor strip
- [ ] One-pixel well borders not lost to compression
- [ ] No moiré on fine patterns (single grain tile — `design/_shared/textures/fine-noise.svg`)
- [ ] Grain consistent on header, team bands, result bar, featured row, sponsor strip, roster context

## Hierarchy (grayscale check)

- [ ] Scores read first
- [ ] Result statement second
- [ ] Team identity third
- [ ] Leading performance row stands above rows 2–3
- [ ] Metadata and sponsor zone recede

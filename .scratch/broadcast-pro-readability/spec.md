# Broadcast Pro readability

Status: ready-for-agent

Related: TKT-2026-BP-019, TKT-2026-BP-020, TKT-2026-BP-021; `.scratch/broadcastpro-fixture-boundaries/spec.md`

---

## Problem Statement

Broadcast Pro already has a full cricket kit (glass, crest wells, matchups, ladder zones, markers, indexed roster sheet, player-stat matrix, verdicts, fitted Teko headlines). On air, copy is still hard to read. The header spends too much of the 1080×1350 canvas. Secondary headlines clip. Leftover type roles do not match Teko/Rajdhani. Some strings sit on the wrong mode token, so a grade chip can go white in `lightAlt`. Image backgrounds add motion and little overlay, so titles and tables swim on club photography.

## Solution

Keep the shipped primitives. Tune the template so copy is readable on Solid, Image, and Luminance backgrounds, in all four modes.

1. Shrink header chrome and restore type hierarchy so the asset area can carry the match.
2. Put every string on a dynamic mode colour: container mode inside a container, non-container mode on the scene background.
3. Give Broadcast Pro Image overlay defaults and motion caps so photography does not fight the overlay.
4. Add Studio fixtures and keep Broadcast Pro Rounded in lockstep.

## User Stories

1. As a club viewer, I want the main header to use less vertical space, so that the asset type (Results, Ladder, and the rest) has room to read.
2. As a club viewer, I want the circular org crest in the header smaller than the current oversized badge, so that the title is the hero, not the logo well.
3. As a club viewer, I want header, asset, and sponsor footer heights to still fill 1080×1350, so that no band is clipped or letterboxed.
4. As a club viewer, I want the fitted asset title to stay large after the header shrinks, so that Teko display type does not collapse to the floor size on ordinary titles.
5. As a club viewer, I want a long video title or title split on the metadata chip to wrap or fit, so that the secondary line is not clipped by nowrap and wide tracking.
6. As a club viewer of Result Single, I want the header secondary line still hidden, so that the composition does not grow a redundant chip.
7. As a club viewer of Upcoming, I want the header secondary line still hidden, so that fixture cards stay the source of match context.
8. As a club viewer, I want player names, team names, and Top 5 names to use the same Teko/Rajdhani roles as the rest of the template, so that leftover black-weight styles do not look like a different product.
9. As a club viewer of Results, I want metadata on the fixture strip to be large enough to read at a glance, so that grade, round, and ground are not thin tracked captions.
10. As a club viewer of Results, I want player names in the stat row to stay readable, so that a mute is a named muted role rather than a blanket 70% fade.
11. As a template maintainer, I want metadata small, medium, and large to be three sizes, so that hierarchy is real.
12. As a club viewer, I want copy inside a card, chip, row, score badge, or glass panel to use container mode colours, so that in-container copy stays with the container in every mode.
13. As a club viewer, I want titles on the scene background (intro title, main header title) to use non-container mode colours, so that Alt modes can flip those titles against the backdrop.
14. As a club viewer, I want the metadata chip to stay on container mode even though it sits in the header, so that the chip is treated as a container, not as background type.
15. As a club viewer of Ladder, I want the grade chip to use container copy, so that `lightAlt` does not paint white type on a light chip.
16. As a club viewer of glass panels, I want type recomposited against the glass stack, so that contrast is measured on the visible panel, not on a solid mode container that is not what I see.
17. As a club viewer in `light`, I want black in-container copy on white/light glass, so that the default mode reads as a light board.
18. As a club viewer in `lightAlt`, I want in-container copy still dark on the container, and outside-container titles white on the backdrop, so that Alt only flips titles that sit on the scene.
19. As a club viewer in `dark`, I want white in-container copy on dark glass, so that the dark board stays consistent.
20. As a club viewer in `darkAlt`, I want in-container copy still light on the container, and outside-container titles dark on the backdrop, so that Alt does not invert card copy.
21. As a template maintainer, I want every type colour to come from the selected palette, so that hex and Tailwind colour utilities never lock a mode.
22. As a club viewer of a 12+ team ladder, I want rank, name, and points still readable, so that dense tables survive the header shrink.
23. As a club viewer of a 15-player roster, I want padded indices and names still fitted to the list, so that the indexed roster sheet keeps working at the new asset height.
24. As a club viewer of a two-day result, I want innings sub-lines and match totals still distinct, so that structured scores do not collide.
25. As a club viewer of a long club name, I want the name to wrap or fit inside its slot, so that opposition lockups do not overflow the fixture boundary.
26. As a background operator using an Image background, I want a mode-aware overlay by default, so that photography does not print through titles and tables.
27. As a background operator, I want that overlay in the 0.45–0.55 range unless I choose stronger, so that the photo still reads as a photo.
28. As a background operator, I want a bottom-weighted or vignette overlay option in the same family as Luminance foreground protection, so that Image and Luminance feel like one product.
29. As a background operator, I want motion never paired with overlay none on this template, so that Ken Burns cannot run on a naked still.
30. As a club viewer, I want zoom on Image backgrounds capped near 1.08, so that tables do not swim.
31. As a club viewer, I want Ken Burns slow on this template, so that display type stays planted.
32. As a club viewer of Ladder, Results list, and Roster, I want fast pan disabled under those dense tables, so that columns do not drift.
33. As a background operator with a portrait still, I want pan to run vertically, so that cover does not crop faces into a horizontal drift.
34. As a background operator with a landscape still, I want pan to run horizontally, so that the extra width is what moves.
35. As a club viewer on Solid, I want the same type and mode rules as Image, so that Solid is not a special case for copy.
36. As a club viewer on Luminance, I want luminance mapping left alone, so that this work does not reopen the luminance map or protected endpoint cores.
37. As a club viewer on Luminance, I want outside-container titles still on non-container mode, so that foreground protection and mode tokens stay separate jobs.
38. As a preset author in Studio, I want Solid, Image, and Luminance setups for Results, Ladder, and Top 5, so that I can judge overlay vs glass without hunting state.
39. As a preset author, I want those setups to include plates and bright outdoor cricket stills, so that contrast is judged on real club photography, not a grey placeholder.
40. As a club viewer of Upcoming, I want each fixture to keep one outer fixture boundary, so that readability work does not undo the fixture-boundary spec.
41. As a club viewer of Results, I want the same fixture grouping after type and overlay changes, so that a match still reads as one unit.
42. As a sponsor-footer viewer, I want the footer still exiting at main duration minus 15 frames after the header shrinks, so that the footer clock is unchanged.
43. As a club viewer of the intro, I want primary sponsor logos still optically balanced after header and overlay changes, so that the open is not cramped or washed out.
44. As a club viewer of the sponsor outro, I want the grid still readable after overlay defaults change, so that end cards do not fight the new Image scrim.
45. As a template maintainer, I want Broadcast Pro Rounded to receive the same layout, mode, and Image defaults, so that the twin does not drift.
46. As a template maintainer, I want an explicit exclusion if Rounded must differ, so that silence is not treated as parity.
47. As a template maintainer, I want glass, crest wells, matchups, ladder zones, markers, the indexed roster sheet, and the player-stat matrix left as the shipped systems, so that this pass is a tune, not a rebuild.
48. As a template maintainer, I want local planning docs to describe `lg` glass and the 019/020/021 work, so that stale pulse 16–18 items are not treated as open builds.
49. As a preset author, I want Studio fixtures for all eight cricket asset types (ladder, results, result single, upcoming, performances, top 5, team of the week, team roster), so that review is not a one-off.
50. As a preset author, I want abandoned, yet-to-bat, missing logos, long names, and short ladders in those fixtures, so that edge cases are in the kit.
51. As a future agent, I want this behaviour in a ready-for-agent spec, so that implementation can proceed without re-deriving the checklist.

## Implementation Decisions

### Scope

- Registry IDs in play: BroadcastPro and BroadcastProRounded.
- Asset types in play: Ladder, Results, Result Single, Upcoming, Performances, Top 5, Team of the Week, Team Roster.
- This is a tune of the existing template. New primitive families are out.

### Layout

- Header height moves from the current 310px toward 180–220px. Asset height grows so header + asset + sponsor footer still equal 1350.
- The header circular org crest shrinks. It stays a circular org badge, not a crest well.
- Headline fit caps are rechecked after the header change. The existing fitted Teko path stays. The secondary line may wrap or fit. Nowrap and 0.2em tracking on the chip go.
- Result Single and Upcoming keep the secondary line hidden.

### Type roles

- Named Teko/Rajdhani roles replace leftover black-weight classes on player name, team name, and Top 5 name.
- Results metadata is raised out of small, widely tracked caption size.
- A mute on result player names is a named muted container role, not a raw opacity.
- Metadata small/medium/large become three sizes.

### Mode copy

- Font colour is always dynamic from the selected palette.
- Copy inside a container uses container mode (`onContainerCopy`). Glass uses the Broadcast Pro glass text helper (recomposite against the panel).
- Copy outside a container uses non-container mode (`onBackground*`, `onContainerCopyNoBg`, or `onContainerTitle`). Those follow title / copy-without-background and flip in Alt.
- The metadata chip and the grade chip are containers.
- Intro title and main header title sit on the scene background.
- Alt flips outside-container titles only. In-container copy stays with the container (`text.copy` is the same for `light` and `lightAlt`, and the same for `dark` and `darkAlt`).
- Glass opacity stays at `lg` unless the type pass still fails contrast. Opacity is not the first lever.

### Image backgrounds

- Broadcast Pro no longer treats Image as an unconfigured passthrough.
- Image overlay (existing Image terminology) supplies the template default. Do not name this Luminance foreground protection. The look may follow those presets (uniform, bottom-weighted, vignette) as overlay styles.
- Default overlay opacity sits around 0.45–0.55 and is mode-aware (dark scrim on light modes, light scrim on dark modes, or equivalent palette-driven overlay colour).
- Motion plus overlay none is invalid for this template.
- Zoom intensity is capped at 1.08. Ken Burns is slow. Fast pan is off under dense tables (Ladder, Results list, Roster).
- Portrait stills pan vertically. Landscape stills pan horizontally. The existing aspect-ratio helper is wired into the live Image path.
- Solid and Luminance routes keep working. Luminance map, protected endpoint cores, endpoint transition bands, and supersampling are untouched.
- Overlay changes the backdrop. It does not replace mode tokens.

### Fixture boundaries

- Upcoming and Results still follow the fixture-boundary spec: one outer frame per match, flush internal seams, density tiers, gutter between fixtures.
- A fixture-region scrim from that spec can sit on top of the template-level Image overlay. They are complementary, not alternatives.

### Parity, sponsors, docs

- Broadcast Pro Rounded gets the same behaviour unless a ticket writes an exclusion.
- Sponsor footer exit stays `FPS_MAIN - 15` (ADR 0001).
- Intro uses account primaries. Sponsor outro stays a separate sequence from the sponsor footer.
- Local planning records pulses 16 (player-stat matrix) and 17 (markers) as already in code. Current work is 019/020/021 only.
- ClickUp is out of this pass.

## Testing Decisions

A good test asserts external behaviour: given a mode and a surface, the colour family is container or non-container; given Image input, overlay and motion caps are applied; given layout tokens, zone heights still fill 1350. Tests do not snapshot Tailwind class strings as the source of truth.

### Seams (two)

1. **Theme contract.** Layout heights, headline sizing, type roles, and mode copy variants as resolved for Broadcast Pro. Highest existing points: the assembled template theme, the glass text helper (container copy recomposited on glass), and the header secondary-line helper. Assert:
   - header + asset + footer = 1350 after the shrink
   - secondary line is allowed to wrap or fit
   - grade chip / in-container copy uses container copy, not copy-without-background
   - intro and main header titles use non-container title / copy-without-background
   - `lightAlt` / `darkAlt` flip outside-container titles only
2. **Image overlay defaults resolver.** One pure function (new, or an extension of the Image config adapter) that Broadcast Pro consults before render. Inputs: mode, Image variation, optional still ratio. Outputs: overlay style, overlay opacity, effect type, zoom/pan caps, and a rejection of motion + overlay none. Assert portrait vs landscape pan direction and the 1.08 zoom cap.

Studio visual pass is acceptance, not a third code seam. Play Solid, Image, and Luminance on Results, Ladder, and Top 5, plus `light` / `lightAlt` / `dark` / `darkAlt` on Results, Ladder, and intro.

### Prior art

- Header secondary-line unit tests
- Broadcast Pro crest, ladder typography, ladder zone, and stat-matrix resolvers
- Luminance foreground protection presets (visual analogue only; Image tests the overlay resolver)
- Palette `onContainer.copy` vs `copyNoBg` / `title` generation

## Out of Scope

- Rebuilding glass, crest wells, matchups, ladder zones, markers, the indexed roster sheet, or the player-stat matrix
- Changing Luminance map maths, protected endpoint cores, or supersampling
- Generated backgrounds and readability policy on the Generated catalogue
- Scoreline, or any template other than Broadcast Pro and Broadcast Pro Rounded
- Copying design-prototype CSS as the implementation path
- Adding a full design-prototype set for every asset type (Results HTML already exists; more HTML only if an asset type still needs a visual source of truth)
- ClickUp updates
- Scheduler or DATA contract changes

## Further Notes

- Glass default in tokens is already `lg`. Docs that still say `md` are stale.
- The known grade-chip miss is `onContainerCopyNoBg` on a container. That token is title / copy-without-background and can resolve white in `lightAlt`.
- Test cricket samples already live under the cricket samples kit. Prefer those for long names, results, and batting performances.
- Implementation order: theme contract (layout, type, mode) first, Image overlay defaults second, fixtures and Rounded parity third.

## Comments

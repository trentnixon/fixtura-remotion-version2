# Night Session design brief

Status: agreed
Updated: 2026-09-13

## Identity and purpose

- Human label: Night Session
- Variant slug: `night-session`
- Registry ID: `NightSession`. Runtime key: `nightsession`.
- Relationship: new family. No matching brief or route found during the interview.
- Sport and first asset: cricket Weekend Results, `results`. Select the current fixture through the build workflow.
- Audience and emphasis: cricket clubs and their followers. Club identity takes priority.
- Publishing context: Instagram and Facebook, 1080 x 1350 portrait posts.
- Primary communication goal: make several match results readable on a phone without a compressed spreadsheet appearance.

## Project constraints

Follow [the design system brief](../../.docs/design-system-brief.md). Anatomy and fixtures own content. This brief owns template-specific creative intent.

The canvas remains 1080 x 1350. Preserve supplied sporting data and team ordering. Use fixture-supplied organisation colours and no player photography. Backgrounds remain independently configurable in Remotion.

Follow Fixtura's existing header, Weekend Results content regions, footer, and responsive density rules exactly. The reference cannot change their structural arrangement. Verify populated anatomy before styling through [the build workflow](../../.docs/new-template-prompt.md). Flag conflicts before dependent work.

## Agreed direction

The user agreed to this direction on 2026-09-13, including the delegated visual exploration.

Night Session brings the character of a premium televised cricket competition to club results: dark, disciplined, bold, and slightly industrial. Condensed typography, restrained club colour, quiet rules, and angular overlay details establish the identity. Full scores and team names remain the strongest elements within each match.

### Fixed requirements

- Preserve Fixtura's existing header, content, and footer arrangement. Typography changes emphasis within that structure.
- Keep the organisation mark in its established header position and team crests in their existing match positions.
- Use the existing sponsor footer, placement behaviour, and unused-region collapse rules.
- Keep Batting and Bowling performances in their existing content regions. Do not introduce a new page structure.
- Follow existing responsive density rules. Match modules carry equal visual weight. Busy weeks tighten spacing and typography within safe limits.
- Missing performances collapse cleanly without enlarging the result statement or leaving awkward empty space.
- The page title is prominent but more space-efficient than the reference's LADDER heading.
- Intended reading hierarchy: Weekend Results title, grade or competition name, team names and full scores, result statement, player performances, then match metadata. Achieve this through emphasis within existing anatomy, without moving fields against its rules.
- Near-black and charcoal dominate overlay surfaces. The fixture primary colour is the main accent. Secondary colour appears sparingly for contrast, hierarchy, or small geometric details. Essential text is white or soft white.
- Overlays carry the identity independently of the background. Controlled opacity, dark surfaces, and contrast protection preserve readability across supplied backgrounds.
- Angular details stay restrained on overlay edges, section transitions, and occasional cropped perimeter details. They must not reduce usable content space.
- The reference guides visual style only. Do not copy its ladder arrangement or competition-specific geometry.

### Creative direction

- Premium broadcast character with generous breathing room wherever the existing density rules allow it.
- Explore Teko for titles and scores, with Heebo for team names and supporting text.
- Narrow uppercase display lettering, a compact accent label where existing header fields allow it, and quieter supporting text.
- Thin, low-contrast rules and dark repeated surfaces provide rhythm without strong grids around every field.
- Compact, recognisable team crests act as sharp identity markers.
- Sponsor and organisation marks feel integrated into the composition. Avoid adding separate white boxes as decoration, while preserving existing placement and logo requirements.
- Uneven angular fragments and short parallel lines may form an original template signature within overlay surfaces.

### Open exploration

- The designer may refine the font pairing if it better captures the condensed broadcast aesthetic and remains readable on a phone.
- Delegated visual exploration: font selection, type scale, weight, spacing, surface opacity, rule treatments, and original angular geometry. This freedom applies only to visual treatment. Preserve the established template architecture, layout, and data behaviour.
- Motion is not specified. This brief concerns static overlays. No animation implementation is authorised by the interview.

## Family consistency and asset exceptions

- Shared direction: dark broadcast surfaces, restrained fixture colour, condensed display type, quiet rules, and angular accents. Each later asset retains its own Fixtura anatomy.
- Asset-specific exceptions: none requested. Weekend Results receives the first design attention.
- Sparse and dense content: follow existing Fixtura density rules. Do not inflate result statements when content is absent.
- Missing logos: follow existing Fixtura handling. No custom replacement treatment has been requested.
- Missing performances and sponsors: use existing content regions and collapse behaviour.
- Avoid: newspaper or editorial styling, soft or playful graphics, excessive decoration, generic SaaS cards, large gradients, glowing esports effects, intrusive textures, equal emphasis on every team colour, and dense grids.

## Reference interpretations

### R1: Dark cricket ladder broadcast graphic

- Source: user attachment, `C:/Users/User/Downloads/780486678_18451185289191214_1100970763571129136_n.jpg`.
- Saved file: [Dark cricket ladder reference](references/dark-cricket-ladder-reference.jpg).
- Availability: inspected in the conversation and saved as an unchanged copy. Original preserved.
- User likes: near-black field, one bright accent, oversized condensed uppercase heading, small coloured label, central composition, negative space, thin rules, repeated dark rows, compact crests, bright ranking numbers, cropped geometry, uneven angular shapes, short parallel lines, and integrated sponsor marks.
- Avoid or exclude: literal ladder structure, reference branding and exact geometry, fixed yellow palette, background texture, photography, social repost caption, and pink sticker below the graphic.
- Composition interpretation: retain the rhythm of repeated dark surfaces within existing match modules. Keep the title smaller than the reference to leave room for full result content.
- Typography interpretation: narrow uppercase display character with a more readable supporting face. Teko and Heebo are the agreed initial exploration, not an identification of the screenshot's fonts.
- Spacing interpretation: preserve breathing room within existing density rules. Do not reproduce the reference's large unused title and perimeter areas at the expense of matches.
- Colour interpretation: translate yellow emphasis to fixture primary colour. Use secondary colour sparingly. Dark contrast protection belongs to overlays, independent of Remotion backgrounds.
- Motif interpretation: create original cropped angles and short parallel lines on overlay edges. Do not trace the branded shapes.
- Ranking interpretation: transfer visual energy through emphasis within existing match content. Do not introduce the reference's ranking numbers, badges, ladder structure, or composition.
- Applies to: family visual language, first applied to Weekend Results. No reference-driven structural exceptions.
- Direction strength: structural preservation and colour roles are fixed. Thin rules, condensed character, integrated marks, and restrained geometry are preferred. Exact motifs and font refinement remain exploratory.
- Interpretation confirmed: yes, on 2026-09-13. Translate the visual language without copying the reference composition or introducing ranking numbers or badges.

## Answers and design implications

| Topic              | User answer                                                             | Design implication                                             | Agreement |
| ------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------- | --------- |
| Audience           | Cricket clubs posting Weekend Results to Instagram and Facebook         | Phone-readable match modules on the 1080 x 1350 canvas         | Confirmed |
| Character          | Premium televised cricket, dark, disciplined, bold, slightly industrial | Restrained broadcast styling owned by the club                 | Confirmed |
| Identity           | Night Session, night-session, NightSession                              | New template identity, no registration during interview        | Confirmed |
| Hierarchy          | Title as entry point, names and full scores lead each match             | Compact title and strong match emphasis within current anatomy | Confirmed |
| Structure          | Existing header, content, footer, and density rules exactly             | Reference changes styling only                                 | Confirmed |
| Typography         | Start with Teko and Heebo, permit refinement                            | Explore condensed display and readable support after hydration | Confirmed |
| Colour             | Dark surfaces, primary accent, sparse secondary, soft white text        | Fixture-driven colour roles with overlay contrast protection   | Confirmed |
| Geometry           | Restrained signature without consuming content space                    | Original edge and transition details                           | Confirmed |
| Performances       | Existing regions, clean missing-data collapse                           | No new page structure or enlarged result statement             | Confirmed |
| Marks and sponsors | Existing positions and sponsor behaviour                                | Style marks in place and retain current collapse rules         | Confirmed |
| Background         | Independently configurable in Remotion                                  | Identity and readability reside in overlays                    | Confirmed |

## Open decisions and next round

None. Visual exploration is delegated above. No essential references are missing.

## Agreement and changes

- Agreement: 2026-09-13. User confirmed the final direction and delegated visual exploration, explicitly excluding architectural changes.
- 2026-09-13: user clarified that existing Fixtura structures and density rules are fixed. This supersedes any earlier suggestion that separate performance panels, header placement, or sponsor treatment could introduce a new arrangement.
- 2026-09-13: final clarification restricts design freedom to visual treatment, requires independent overlay identity and reliable contrast across backgrounds, and excludes reference ranking numbers, badges, ladder structure, and composition.
- Agreement permits this brief to drive a later build. It does not approve unseen visuals or start implementation.

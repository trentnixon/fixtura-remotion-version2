# BroadcastPro fixture boundaries

## Goal

Keep BroadcastPro's glass style while making each match read as one fixture.

## Requirements

- Group each fixture inside one square outer frame with a 2px corner radius.
- Join the metadata strip and the matchup body with a flush seam.
- Use one 4px accent rail across the full fixture height.
- Use one outer border and quiet internal seams.
- Separate fixtures with a 28px to 32px gutter and no floating divider.
- Align Upcoming fixtures as `crest | home | VS | away | crest`.
- Use featured, standard, and compact density tiers for one, two, and three fixtures.
- Animate each fixture as one object.
- Let team names use two lines before truncation.
- Keep crest wells at fixed sizes within each density tier.
- Reuse the fixture frame for Results.
- Structure each result as metadata, two team rows, optional player statistics, and a result statement.
- Emphasise the winning score without reducing the losing team's readability.
- Add a restrained scrim beneath the fixture region for image backgrounds.

## Acceptance checks

- Render the Solid and Image variants of `CricketUpcoming` and `CricketResults`.
- Confirm that each fixture has one continuous outer boundary.
- Confirm that internal sections touch and adjacent fixtures do not.
- Confirm that one, two, and three Upcoming fixtures select the intended density tier.
- Run `npm run typecheck` if present. Otherwise, run `npm run lint`.
- Run the focused BroadcastPro tests and the full test suite.

# Broadcast Pro Studio QA

Play these cricket samples in Remotion Studio under Broadcast Pro and Broadcast Pro Rounded. Header is 200px, asset 1020px, footer 130px.

## Datasets

| Asset type       | Dataset id                   |
| ---------------- | ---------------------------- |
| Ladder           | `CricketLadder`              |
| Results          | `CricketResults`             |
| Result Single    | `CricketResultSingle`        |
| Upcoming         | `CricketUpcoming`            |
| Performances     | `CricketBattingPerformances` |
| Top 5            | `CricketTop5Batting`         |
| Team of the Week | `CricketTeamOfTheWeek`       |
| Team roster      | `CricketRoster`              |

Edge content already in those samples: long names, weekend results, batting performances. Look for abandoned / yet-to-bat / missing logos on Results and Result Single.

Design HTML currently exists only for `design/variants/broadcast-pro/cricket/results.html`. Do not treat missing HTML as a Studio blocker.

## Backgrounds

For Results, Ladder, and Top 5, play:

- Solid
- Image (club still or a plate under `public/luminance/plates/`)
- Luminance

Image uses Broadcast Pro overlay defaults (vignette, ~0.5 opacity, zoom capped at 1.08). Luminance mapping is unchanged.

Sponsor footer still exits at `FPS_MAIN - 15`. Recheck intro/outro sponsor grids after the 200px header shrink.

## Modes

On Results, Ladder, and intro, play `light`, `lightAlt`, `dark`, and `darkAlt`.

- Copy inside glass/chips stays with the container.
- Intro and main header titles sit on the scene and flip in Alt.
- Grade chip is a container. It must not go white in `lightAlt`.

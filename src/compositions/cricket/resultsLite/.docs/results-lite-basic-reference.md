# Results Lite — Basic layout reference

Guide for adding other template variants of `CricketResultsLite`. Basic is the prototype. The asset id stays `CricketResultsLite`. The on-screen and studio title is **Results**.

## What it is

A minimal cricket results asset. Each fixture shows:

- grade (above the cells)
- both logos
- both team names
- both game scores

It does not show date, ground, time, round, or player scores. An abandoned match appends `Abandoned` on the grade line so the row does not read as yet to bat.

It uses the same match payload as full Results (`MatchResult` / `CricketResult`). It is a separate composition, not a flag on `CricketResults`.

## Where the code lives

```
src/compositions/cricket/resultsLite/
  basic.tsx                         # pagination + transitions
  index.tsx                         # template export map (basic only)
  controller/display-Basic.tsx      # row list, centering, outer padding
  layout/LiteMatchCard.tsx          # grade + two columns
```

Registration:

- `src/compositions/cricket/index.tsx` — `CricketResultsLite = { basic }`
- `src/core/utils/routing.tsx` — `CricketResultsLite: "CricketResultsLite"`
- `src/core/utils/compositionMapping.ts` — same id pair
- `testData/index.ts` — dataset id `CricketResultsLite`, display name `Results`
- `testData/samples/Cricket/Cricket_ResultsLite.json` — copy of the results sample with `compositionId: "CricketResultsLite"` and title `Results`

Studio path: Basic template, dataset Results. Other templates have no key yet, so they hit the missing-template placeholder.

## Basic layout

The content wrapper (`display-Basic.tsx`) is the asset-height column. It is `justify-center`, `px-8` (32px left and right, same inset as full Results `mx-8` on each match card), and `gap-[30px]` between fixtures. Rows are only as tall as their content. Four fixtures per screen (`RESULTS_LITE_PER_SCREEN`).

Each fixture (`LiteMatchCard.tsx`):

1. Grade, left aligned, above the cells. Variant `onContainerTitle`. `gap-2` (8px) between the grade and the cells.
2. Two equal columns.
   - Left column: `pr-2` only (8px on the inner edge). No left padding.
   - Right column: `pl-2` only (8px on the inner edge) and `border-l border-gray-700` (1px). No right padding.
   - The 8px sits outside the fill, beside the divider. The outer edges of the filled cells line up with the grade.
3. Each column’s fill is its own cell: `backgroundTransparent.strong`, `p-3` (12px on every side), `overflow-hidden`.

Inside a cell, two rows:

- Top: logo and score, `gap-4` (16px). Left is logo then score. Right is `flex-row-reverse`: score then logo.
- Bottom: team name, full column width, not truncated, uppercased. Left aligned on the left column, right aligned on the right.

## Mode and color

Modes come from the template, not from this asset: `video.templateVariation.mode` is `light`, `lightAlt`, `dark`, or `darkAlt` (default `light`). `ThemeContext` builds `selectedPalette` from that mode. Full Results player blocks use the same tokens.

| Piece            | Token                                                    | What it does                                                                                                                                             |
| ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cell fill        | `selectedPalette.container.backgroundTransparent.strong` | Mode container background at strong alpha. Light and light alt share a light container. Dark and dark alt share a dark container.                        |
| Names and scores | `onContainerCopy`                                        | Mode copy color, contrast-checked against the container.                                                                                                 |
| Grade            | `onContainerTitle`                                       | Same token as the Basic header title. Alt modes invert this color. It is not contrast-checked against the cell, because the grade sits outside the cell. |

Do not paint both columns with one shared background and a hairline. The division is two filled cells plus the 8px inner gap and the 1px border.

## Logos

88×88 square (`LOGO_SIZE`). `TeamLogo` with `fit="cover"`, and `imgStyle` forcing width, height, max size, `objectFit: "cover"`, and `aspectRatio: "1 / 1"`. The square wrapper is `overflow-hidden`. Landscape and portrait marks crop to the square. The cell’s `overflow-hidden` keeps the entrance animation inside the cell.

## Scores

Theme `ResultScore` is `text-7xl`. Results Lite passes `currentScoreClassName="!text-6xl"` on `TeamScoreStack` so only the current score drops one step. First-innings scores keep the theme size.

## Data and the export map

`basic.tsx` reuses full Results helpers: `hasValidResults`, `castToMatchResults`, `calculateTotalScreens`, `calculateDisplayDurationPerScreen`. Empty data uses the shared `NoResultsData` placeholder. The footer uses `buildResultsFooterSponsors` for the fixtures on screen.

`index.tsx` exports one key:

```ts
export { BasicResultsLite as basic };
```

`cricket/index.tsx` maps that key:

```ts
export const CricketResultsLite = {
  basic: resultsLiteBasic,
};
```

Routing lowercases the template id and looks up that key. A new template is a new key on this object. Until the key exists, that template shows the placeholder.

To add a template:

1. Add `src/compositions/cricket/resultsLite/<template>.tsx` and a display/card pair. Keep the content contract: grade, logos, names, scores. Drop date, ground, time, and player lines.
2. Export it from `resultsLite/index.tsx`.
3. Add the key on `CricketResultsLite` in `src/compositions/cricket/index.tsx`. The key must match the lowercased template id (`classic`, `broadcastpro`, `nightsession`, and so on).
4. Restyle the card for that template. Keep the mode tokens (`backgroundTransparent.strong`, `onContainerCopy`, `onContainerTitle`) unless that template already resolves container color a different way.
5. Point a sample at `compositionId: "CricketResultsLite"` with `appearance.template` set to the new template. The studio list name stays `Results`.

## Decisions, in the order they settled

1. New composition, Basic only, same results payload. Name `CricketResultsLite`. Display title later set to `Results`.
2. Grade sits above the cells, left aligned. It is not inside the fill.
3. Each side is its own filled cell, copied from the full Results player columns, not one shared faint bar with a line through it.
4. Divider: 1px left border on the right column. 8px padding only on the inner edges (`pr-2` / `pl-2`). No padding on the outer edges, so the cells line up with the grade.
5. Cell padding is 12px (`p-3`) on every side.
6. Column structure: top row logo and score, bottom row the full name. Right column mirrors the top row.
7. Logo–score gap is 16px (`gap-4`). Names are not truncated.
8. Score is one step smaller than the theme (`!text-6xl`).
9. Logos are an 88px cover square.
10. Cells use `overflow-hidden` so the logo entrance stays inside.
11. Rows are content height. Vertical gap is the class `gap-[30px]`. The stack is `justify-center` in the asset-height area.
12. The 32px side inset lives once, on the content wrapper (`px-8`), matching full Results’ `mx-8` on each card. It is not also on each row.
13. Inside the cell, copy uses `onContainerCopy`. The grade uses `onContainerTitle`, same as the Basic title.

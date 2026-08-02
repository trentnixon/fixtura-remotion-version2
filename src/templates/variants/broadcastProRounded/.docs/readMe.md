# Folder Overview

Broadcast Pro Rounded variant: fully independent fork of Broadcast Pro with **`rounded-2xl`** panel corners and **`gap-1`** stack spacing between sibling rows/cards/panels. Same Teko/Rajdhani typography and glass design system as Broadcast Pro.

**Independence:** This variant does not import from `broadcastPro` or `templates/types/broadcast-pro/`. All primitives live under `variants/broadcastProRounded/`, `types/broadcast-pro-rounded/`, and `compositions/cricket/utils/broadcastProRounded/`.

**Visual deltas vs Broadcast Pro:**

- `theme/layout.ts`: `borderRadius.container = rounded-2xl`, `borderRadius.image = rounded-2xl`, `spacing.stack = gap-1`
- Crest wells, intro/outro/header logos, and sponsor images use `borderRadius.image`
- Stack gaps on results, upcoming fixture lists, ladder rows
- Internal stat grids and card padding unchanged

## Files

- `index.tsx`: entry point exporting the BroadcastProRounded variant composition
- `theme/`: see [Theme folder layout](#theme-folder-layout) below
- `animations.ts`: animation presets used by Broadcast Pro components
- `components/`: all Broadcast Pro variant building blocks

## Theme folder layout

The Broadcast Pro theme is split by responsibility. The **public export** is `broadcastProRoundedTheme` from **`theme/index.ts`**. **`index.tsx`** imports it via **`import { broadcastProRoundedTheme } from "./theme"`** (the `theme/` directory; there is no `theme.ts` file at the variant root—avoids a name clash where `./theme` would resolve to a file instead of the folder).

| File / folder                     | Responsibility                                                                                                                                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `theme/index.ts`                  | Assembles `baseTheme` + tokens + layout + mode + merged `componentStyles`; **`satisfies TemplateThemeConfig`**.                                                                                                          |
| `theme/tokens.ts`                 | `fonts`, `fontClasses`, `broadcastProRoundedGlassOpacity`, **`broadcastProRoundedHeadlineSizing`**, **`broadcastProRoundedScoreSizing`**, **`broadcastProRoundedRosterListSizing`**.                                     |
| `theme/componentStyles.shared.ts` | Cross-cutting `componentStyles` keys: titles, body, player/team/label, `metadata*`.                                                                                                                                      |
| `theme/composition/`              | One file per **cricket composition** surface: `ladder.ts`, `upcoming.ts`, `top5.ts`, `teamOfTheWeek.ts`, `results.ts`, `roster.ts`. Merged in `composition/index.ts` as `broadcastProRoundedCompositionComponentStyles`. |
| `theme/layout.ts`                 | `layout` (heights, spacing, padding, border radius).                                                                                                                                                                     |
| `theme/mode.ts`                   | `mode` (light / lightAlt / dark / darkAlt palettes).                                                                                                                                                                     |

**Editing guidance:** tune glass and roster list math in **`tokens.ts`**; tune shared typography in **`componentStyles.shared.ts`**; tune a single composition’s Tailwind classes in the matching file under **`theme/composition/`**.

**Types:** partials use `satisfies Pick<ThemeComponentStyles, …>` where useful; full shape is checked on the assembled `broadcastProRoundedTheme`.

## Main header (BroadcastProRoundedMainHeader)

- Layout: centered vertical stack (logo → fitted Teko title → Rajdhani metadata chip), `layout.heights.header` **310px**; logo badge always shown (image when `club.logo.url` exists).
- Title uses **`BroadcastProRoundedHeadlineTitle`** with `useFittedFontSize` (cap **`broadcastProRoundedHeadlineSizing.mainHeaderMaxPx`**, default 124px).
- Secondary line text: `metadata.videoTitle` if non-empty; else `metadata.titleSplit` joined with `·`; else `club.name` (via **`getBroadcastProRoundedHeaderSecondaryLine`**).

## Headline lockups

Hero lockup primitives live in **`components/headline/`**:

| Component                                   | Role                                                                   |
| ------------------------------------------- | ---------------------------------------------------------------------- |
| **`BroadcastProRoundedHeadlineTitle`**      | Fitted Teko primary asset title                                        |
| **`BroadcastProRoundedHeadlineSecondary`**  | Rajdhani secondary line (metadata chip on main header; plain on intro) |
| **`BroadcastProRoundedHeroHeadlineLockup`** | Composed logo + title + secondary (optional bundle)                    |

**Tiers:**

- **Hero main** — `BroadcastProRoundedMainHeader`: fitted title + metadata chip secondary
- **Hero intro** — `BroadcastProRoundedIntro`: fitted title + **club.name only** (no videoTitle/titleSplit)
- **Section** — `broadcastProRoundedHeadlineSection` key (TotW role headers, etc.)

Sizing tokens: **`broadcastProRoundedHeadlineSizing`** in `theme/tokens.ts`. Theme classes: **`broadcastProRoundedHeadlineHero`**, **`broadcastProRoundedHeadlineSecondary`**, **`broadcastProRoundedHeadlineSection`** in `componentStyles.shared.ts`.

Utility **`text-lift`** (subtle text shadow for player names) is defined in the Tailwind preset.

## Score typography

Structured Teko numeral roles live in **`componentStyles.shared.ts`** (`broadcastProRoundedScore*`) and are aliased from composition theme files (e.g. `ResultScore` → `broadcastProRoundedScoreMatchTotal`).

| Role key                                                                      | Use                                                          |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **`broadcastProRoundedScoreMatchTotal`**                                      | Team innings score (`8/284`, `171`)                          |
| **`broadcastProRoundedScoreMatchInnings`**                                    | Two-day first innings sub-line                               |
| **`broadcastProRoundedScorePlayerPrimary`** / **`Suffix`**                    | Player stat figures (`33*`, `(14)`)                          |
| **`broadcastProRoundedScoreTableRank`** / **`TableStat`** / **`TablePoints`** | Ladder numerals                                              |
| **`broadcastProRoundedScoreFeatured`** / **`Grid`**                           | Top 5 / Performances stats (stitch: `text-7xl` / `text-4xl`) |
| **`broadcastProRoundedScoreCompact`**                                         | TotW card stats                                              |
| **`broadcastProRoundedScoreDivider`**                                         | VS / matchup divider                                         |

**Primitives** in **`components/score/`**:

- **`BroadcastProRoundedScoreText`** — theme role → `AnimatedText` (ladder, Top5 stats, VS)
- **`BroadcastProRoundedStructuredScore`** — parses match totals + player figures via **`parseCricketScore.ts`**

Compact ladder/upcoming sizing: **`broadcastProRoundedScoreSizing.compact`** in `theme/tokens.ts`.

## Result verdict

Narrative “who won and how” bands (separate from Teko score numerals). Stitch has no verdict reference — this is a BroadcastProRounded extension using **`glass.strong`** + **8px primary accent** (same decisive tier as score badges).

| Tier          | Surface                                   | Layout                                       |
| ------------- | ----------------------------------------- | -------------------------------------------- |
| **hero**      | Result Single (`statementPosition="top"`) | Teko winner (accent) + Rajdhani context line |
| **compact**   | Results list (bottom band)                | Single Rajdhani italic line (`resultShort`)  |
| **abandoned** | Both when `status === "Abandoned"`        | Status label + optional fixture result       |

**Data resolution:** **`buildBroadcastProRoundedVerdictModel.ts`** — prefers `resultSummary` for hero; compact line from `resultShort`; abandoned from status/result.

**Theme keys** in **`componentStyles.shared.ts`**: `broadcastProRoundedVerdictBand*`, `broadcastProRoundedVerdictWinner`, `broadcastProRoundedVerdictContext`, `broadcastProRoundedVerdictLine`, `broadcastProRoundedVerdictStatus`, `broadcastProRoundedVerdictFixtureResult`.

**Primitives** in **`components/verdict/`**: **`BroadcastProRoundedResultVerdict`** (main entry), hero lockup, compact line, abandoned tier.

## Team accent allocation

Per-team accent on **score-badge left border** and **bowling stat highlights** (not team names or batting figures). Verdict bands always use club **`colors.primary`** — outcome is narrative, not duplicated on team rows.

**Resolver:** **`resolveBroadcastProRoundedTeamAccentColors.ts`** in `src/compositions/cricket/utils/broadcastProRounded/results/`.

| Priority         | When                                                          | Primary accent | Secondary accent |
| ---------------- | ------------------------------------------------------------- | -------------- | ---------------- |
| **Club bias**    | `isAccountClub` + exactly one `isClubTeam`                    | Club side      | Opponent         |
| **Outcome bias** | `resultSummary.winner` present (association / no single club) | Winner         | Loser            |
| **Positional**   | Abandoned, in-progress, or no winner                          | Home           | Away             |

Stitch default (team 1 / team 2) maps to the positional fallback. Ladder uses the same “biased team gets accent edge” idea via **`isBiasTeam`** on [`TableBroadcastProRoundedRow`](../../../../compositions/cricket/ladder/layout/TableBroadcastProRoundedRow.tsx).

## Crest wells

Logo wells isolate unpredictable crest artwork inside **square containers** on rectangular sporting surfaces. Stitch baseline: **`w-12 h-12`**, `bg-white/20`, **`object-contain`** crest centred in the well ([`stitch/index.html`](../stitch/index.html)).

**Exception:** the circular org badge in [`BroadcastProRoundedMainHeader`](../components/BroadcastProRoundedMainHeader.tsx) is intentional — not part of the crest-well system.

**Primitive:** [`BroadcastProRoundedCrestWell`](../components/crest/BroadcastProRoundedCrestWell.tsx) — single entry for team/club crest mounts. Uses **`glass.logoWell`** + **`cellBlur`** (see glass hierarchy, ticket 07). Analogue: Brickwork [`LogoPlate`](../../brickwork/design/LogoPlateView.tsx) (mode-driven fit/padding).

**Sizing:** **`resolveBroadcastProRoundedCrestWellSize.ts`** in `src/compositions/cricket/utils/broadcastProRounded/crest/` — tier tokens in **`broadcastProRoundedCrestSizing`** (`theme/tokens.ts`). Default **85%** content inset (Results/stitch); grid/featured use **100%** with flex-centred padding.

| Tier           | Default / rule                                              | Surfaces                                   |
| -------------- | ----------------------------------------------------------- | ------------------------------------------ |
| **compact**    | 48px                                                        | Results team row, TotW card, TotW 12th man |
| **row**        | Adaptive `clamp` (min 24–36 by height)                      | Ladder                                     |
| **fixture**    | `clamp(48, containerHeight - 32, max(72, floor(h * 0.42)))` | Upcoming                                   |
| **grid**       | 80px (sm: 96px)                                             | Top 5 grid, Performances grid              |
| **featured**   | 176px                                                       | Top 5 #1 featured card                     |
| **rosterHome** | 128px                                                       | Roster home team card                      |
| **rosterAway** | 96px                                                        | Roster away team card                      |

**Theme keys** in **`componentStyles.shared.ts`**: `broadcastProRoundedCrestWellCompact`, `broadcastProRoundedCrestWellRow`, `broadcastProRoundedCrestWellFixture`, `broadcastProRoundedCrestWellGrid`, `broadcastProRoundedCrestWellFeatured`, `broadcastProRoundedCrestWellRosterHome`, `broadcastProRoundedCrestWellRosterAway`. Composition logo-well keys alias these tiers (Results, TotW, player ranking, roster).

## Matchup axis

Home-vs-away opposition layout — how two team sides are arranged relative to a central axis. Crest wells (ticket 12) handle **per-side** logo geometry; this system handles **side ordering, divider, and container layout**.

**Primitive:** [`BroadcastProRoundedMatchup`](../components/matchup/BroadcastProRoundedMatchup.tsx) — tier-driven entry with sub-primitives [`BroadcastProRoundedMatchupSide`](../components/matchup/BroadcastProRoundedMatchupSide.tsx) and [`BroadcastProRoundedMatchupDivider`](../components/matchup/BroadcastProRoundedMatchupDivider.tsx).

| Tier        | Layout                                           | Divider                                                     | Surfaces               |
| ----------- | ------------------------------------------------ | ----------------------------------------------------------- | ---------------------- |
| **fixture** | Horizontal opposed (mirrored crest + name slots) | **VS** (`matchDivider` → `broadcastProRoundedScoreDivider`) | Upcoming               |
| **result**  | Vertical stack                                   | **none** (stitch-correct — no VS on results)                | Results, Result Single |
| **roster**  | Vertical sidebar cards                           | **VERSUS** (muted italic, not primary VS)                   | Roster                 |

**Stitch alignment:** Upcoming central **`VS`** ([`stitch/upcoming.html`](../stitch/upcoming.html)); Results stacked rows without divider ([`stitch/index.html`](../stitch/index.html)); Roster **`VERSUS`** above opponent crest ([`stitch/teamRoster.html`](../stitch/teamRoster.html)).

**Types:** **`matchup.ts`** in `src/templates/types/broadcast-pro-rounded/` — `BROADCAST_PRO_MATCHUP_TIER_DIVIDER`, `BROADCAST_PRO_MATCHUP_TIER_LAYOUT_KEY`.

**Theme keys:** `broadcastProRoundedMatchupFixture`, `broadcastProRoundedMatchupResultStack`, `broadcastProRoundedMatchupRosterSidebar`, `broadcastProRoundedMatchupSideFixtureHome/Away`, `broadcastProRoundedMatchupRoleLabel`, `broadcastProRoundedMatchupDividerVs`, `broadcastProRoundedMatchupDividerVersus`. Composition aliases: `upcomingVs`, `upcomingTeamName`, `broadcastProRoundedResultsMatchBlock`, `broadcastProRoundedRosterVersus`.

## Ladder zones

Rank-based **finals qualification** and index-based **tail de-emphasis** on the BroadcastProRounded ladder. Separate from score table roles (09) and glass dataCell tiers (07).

**Resolver:** **`resolveBroadcastProRoundedLadderZone.ts`** in `src/compositions/cricket/utils/broadcastProRounded/ladder/` — tier tokens in **`broadcastProRoundedLadderZoneSizing`** (`theme/tokens.ts`, default finals count **4**).

| Zone           | Rule (defaults)                            | Row treatment                           |
| -------------- | ------------------------------------------ | --------------------------------------- |
| **leader**     | `position === 1`                           | Primary rank border; Pts accent variant |
| **finals**     | `position <= min(finalsCount, totalTeams)` | Full opacity                            |
| **mid**        | Between finals and tail                    | Full opacity                            |
| **lower**      | `index === totalTeams - 2` (≥3 teams)      | Opacity **0.8**                         |
| **relegation** | `index === totalTeams - 1` (≥2 teams)      | Opacity **0.6**                         |

**Bias accent (11):** `isBiasTeam` adds primary rank border when not leader — applied at row level alongside zone resolver.

**Zone divider notch (17):** `BroadcastProRoundedZoneDividerNotch` after the last finals-qualified row when `totalTeams > finalsCount`.

## Graphic notch and marker language

Reusable accent geometry for hierarchy and zone boundaries — separate from glass tiers (07) and ladder zone opacity (14).

**Primitives:** [`BroadcastProRoundedEdgeMarker`](../components/marker/BroadcastProRoundedEdgeMarker.tsx), [`BroadcastProRoundedVerticalStripMarker`](../components/marker/BroadcastProRoundedVerticalStripMarker.tsx), [`BroadcastProRoundedMarkerChip`](../components/marker/BroadcastProRoundedMarkerChip.tsx), [`BroadcastProRoundedZoneDividerNotch`](../components/marker/BroadcastProRoundedZoneDividerNotch.tsx).

| Kind               | Tier / variant                 | Surfaces                                         |
| ------------------ | ------------------------------ | ------------------------------------------------ |
| **Edge marker**    | `standard` (8px) primary/muted | Ladder rank, verdict, score badge, TotW 12th man |
| **Edge marker**    | `compact` (4px) primary        | Upcoming fixture header, results meta strip      |
| **Vertical strip** | primary gradient               | Roster list edge                                 |
| **Zone notch**     | finals cutoff                  | Ladder between finals and mid tiers              |

**Types:** **`marker-notch.ts`** — edge tiers, variants, `resolveBroadcastProRoundedEdgeMarkerStyle`, qualification copy.

**Resolver:** **`shouldShowBroadcastProRoundedLadderZoneDivider`** in `src/compositions/cricket/utils/broadcastProRounded/marker/`.

**Theme keys:** `broadcastProRoundedMarker*` in `theme/composition/marker.ts`.

## Indexed roster sheet

Match-day **numbered player list** (left column) — separate from matchup sidebar (13) and roster list sizing tokens.

**Primitive:** [`BroadcastProRoundedRosterSheet`](../components/roster/BroadcastProRoundedRosterSheet.tsx) + [`BroadcastProRoundedRosterSheetRow`](../components/roster/BroadcastProRoundedRosterSheetRow.tsx).

| Concern          | Implementation                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Index format** | Padded lineup order `01`, `02`, … via **`formatBroadcastProRoundedRosterIndex`**                                                      |
| **Index accent** | Row 1 (`index === 0`) → `onContainerAccent`; others → `onContainerMuted`                                                              |
| **Typography**   | **`rosterIndex`** score role → `broadcastProRoundedScoreRosterIndex`; size from **`broadcastProRoundedRosterListSizing`** row metrics |
| **Layout**       | Glass index cell + name cell; primary **accent strip** on list edge                                                                   |

**Types:** **`roster-index.ts`** in `src/templates/types/broadcast-pro-rounded/` — **`resolveBroadcastProRoundedRosterIndex`**, **`formatBroadcastProRoundedRosterIndex`**.

**Metrics:** **`computeBroadcastProRoundedRosterPlayerListMetrics`** — row height, gap, font px from player count + available height.

## Player-stat matrix

Unified player performance figures across Top 5, Performances, Results, and Team of the Week.

**Primitives:** [`BroadcastProRoundedStatMatrixTriple`](../components/stat/BroadcastProRoundedStatMatrixTriple.tsx), [`BroadcastProRoundedStatMatrixCompact`](../components/stat/BroadcastProRoundedStatMatrixCompact.tsx), [`BroadcastProRoundedStatMatrixResultGrid`](../components/stat/BroadcastProRoundedStatMatrixResultGrid.tsx).

| Tier                   | Layout                                | Surfaces               |
| ---------------------- | ------------------------------------- | ---------------------- |
| **featuredTriple**     | 3-col label/value + dividers          | Top 5 #1               |
| **gridTriple**         | 3-col compact row                     | Top 5 #2–5             |
| **performancesTriple** | 3-col grid + top border; col 1 accent | Performances           |
| **compact**            | Primary + suffix inline               | TotW cards             |
| **resultRow**          | Name + structured stat in glass cell  | Results, Result Single |

**Types:** **`stat-matrix.ts`** in `src/templates/types/broadcast-pro-rounded/` — tiers, cell model, score-role + highlight resolvers.

**Builders:** **`buildBroadcastProRoundedTop5StatMatrixCells`**, **`buildBroadcastProRoundedPerformanceStatMatrixCells`**, **`formatBroadcastProRoundedCompactBattingStat`** / **`formatBroadcastProRoundedCompactBowlingStat`** in `src/compositions/cricket/utils/broadcastProRounded/stat/`.

**Theme keys:** `broadcastProRoundedStatMatrix*` in `theme/composition/statMatrix.ts` (aliases player-ranking + results stat surfaces).

## Child Modules

- **`components/`**: [components/.docs/readMe.md](./components/.docs/readMe.md)

## Relations

- Parent folder: [../../.docs/readMe.md](../../.docs/readMe.md)
- Key dependencies: composes from `../../base`; uses `../../types` for config
- Consumed by: `../../registry.tsx`

## Mode: `text.copy` vs `text.title` (light / dark / alts)

- `theme.mode.*.text.copy` drives **`onContainerCopy`** in the color system (`palette.text.onContainer.copy`). **`text.title`** drives **`onContainerTitle`** and flips in alt modes (`lightAlt` / `darkAlt`).
- **`text.copy` is the same for `light` and `lightAlt`, and the same for `dark` and `darkAlt`.** Alt modes only change **`text.title`** unless product adds separate alt copy tokens in `theme/mode.ts`.

### Glass-surface copy (required pattern)

Text on glass panels must use **`useBroadcastProRoundedTheme().text`** (`textOnGlass`) via inline `style.color`, not `onContainerCopy` / `onContainerTitle` variants alone. Variants resolve contrast against solid `container.background`; `text` recomposites the glass panel over the mode surface.

**Phase 1 aligned:** CricketTeamOfTheWeek cards (player name, team, stats), CricketRoster player list + meta rows. **Reference:** Performances / Top 5 (`useBroadcastProRoundedPlayerRankingTheme`), roster meta in `display-BroadcastProRounded.tsx`.

**Full Broadcast Pro coverage (glass surfaces):** Results / Result Single (meta strip, team rows, score badges, stat cells, verdict bands), Upcoming fixture cards (header, matchup, ground strip), Ladder (grade chip, row cells), Roster matchup team titles + lineup indices, main-header secondary chip (`BroadcastProRoundedHeadlineSecondary` `mainHeader` variant).

## Glass opacity: `broadcastProRoundedGlassOpacity` (sm / md / lg)

- Set **`broadcastProRoundedGlassOpacity: 'sm' | 'md' | 'lg'`** on **`theme/tokens.ts`**. **`md`** is the template default (stronger main row + header than stitch **`sm`** for copy contrast). **`lg`** is the strongest preset.
- Alphas are defined in **`BROADCAST_PRO_TRANSPARENT_BY_PRESET`** in [TemplateThemeConfig.ts](../../types/TemplateThemeConfig.ts). Resolution: **`resolveBroadcastProRoundedTransparentLayers`**.

## `broadcastProRoundedTransparentLayers` (optional override)

- If set, **fully replaces** the preset. Same shape as preset entries: **`glass`**, **`logoWell`**, **`fixtureHeader`** (alpha-only over mode surface). **`DEFAULT_BROADCAST_PRO_TRANSPARENT_LAYERS`** equals the **`sm`** preset.

## Glass surface roles (unified hierarchy)

BroadcastProRounded compositions resolve glass via **`resolveBroadcastProRoundedGlass`** / **`useBroadcastProRoundedTheme`** in `src/compositions/cricket/utils/broadcastProRounded/glass.ts`. Alpas are applied on **`mode.container.background`** (`#fff` / `#000`).

| Role               | Use                                                                                |
| ------------------ | ---------------------------------------------------------------------------------- |
| **panel**          | Primary card/row glass (Results, Top 5, Performances, Upcoming body, roster cells) |
| **headerGradient** | Fixture metadata strip (Upcoming header, Results meta strip)                       |
| **logoWell**       | Crest isolation wells                                                              |
| **strong**         | Decisive values (score badges, verdict bands)                                      |
| **muted**          | Supporting surfaces (non-featured rank badges, 12th-man band, placeholders)        |
| **dataCell**       | Dense tabular standard cells (ladder rank, team, P/W/L)                            |
| **dataCellStrong** | Dense tabular emphasis (ladder points)                                             |

**Rules:**

- Do **not** use `selectedPalette.container.backgroundTransparent` for BroadcastProRounded glass surfaces.
- Do **not** hardcode Tailwind glass classes (`bg-white/10`, etc.) — use **`BroadcastProRoundedGlassPanel`**, **`BroadcastProRoundedMetadataChip`**, or resolved `glass.*` tokens.
- **`broadcastProRoundedGlassOpacity`** (`sm` / `md` / `lg`) scales all tiers; default is **`md`** in `theme/tokens.ts`.

## Dependencies

- Internal: `components`
- External: Remotion, React

import type { ComponentStyle } from "../global/component-style";

/**
 * Broadcast Pro–specific `componentStyles` keys (optional on the merged theme).
 * Pair with {@link GlobalThemeComponentStyles} for full `ThemeComponentStyles`.
 */
export interface BroadcastProThemeComponentStyles {
  /** Hero primary title shell (Teko fitted display). */
  broadcastProHeadlineHero?: ComponentStyle;
  /** Hero secondary metadata line (Rajdhani). */
  broadcastProHeadlineSecondary?: ComponentStyle;
  /** In-content section titles (TotW role headers, etc.). */
  broadcastProHeadlineSection?: ComponentStyle;
  /** Match innings total (Teko, e.g. 8/284). */
  broadcastProScoreMatchTotal?: ComponentStyle;
  /** Two-day first innings sub-score. */
  broadcastProScoreMatchInnings?: ComponentStyle;
  /** Yet to Bat placeholder. */
  broadcastProScoreMatchYetToBat?: ComponentStyle;
  /** Player stat primary figure (runs, wickets/runs). */
  broadcastProScorePlayerPrimary?: ComponentStyle;
  /** Player stat parenthetical suffix ((balls), (overs)). */
  broadcastProScorePlayerSuffix?: ComponentStyle;
  /** Ladder rank numeral. */
  broadcastProScoreTableRank?: ComponentStyle;
  /** Ladder P/W/L table stat. */
  broadcastProScoreTableStat?: ComponentStyle;
  /** Ladder points column. */
  broadcastProScoreTablePoints?: ComponentStyle;
  /** Top5 featured hero stat. */
  broadcastProScoreFeatured?: ComponentStyle;
  /** Top5 / Performances grid stat. */
  broadcastProScoreGrid?: ComponentStyle;
  /** TotW compact card stat. */
  broadcastProScoreCompact?: ComponentStyle;
  /** VS / matchup divider. */
  broadcastProScoreDivider?: ComponentStyle;
  /** Roster lineup index numerals (font size from row metrics). */
  broadcastProScoreRosterIndex?: ComponentStyle;
  /** Result verdict hero band container. */
  broadcastProVerdictBandHero?: ComponentStyle;
  /** Result verdict compact band container. */
  broadcastProVerdictBandCompact?: ComponentStyle;
  /** Abandoned fixture verdict band container. */
  broadcastProVerdictBandAbandoned?: ComponentStyle;
  /** Hero verdict winner line (Teko). */
  broadcastProVerdictWinner?: ComponentStyle;
  /** Hero verdict margin/context line (Rajdhani). */
  broadcastProVerdictContext?: ComponentStyle;
  /** Compact single-line verdict (Rajdhani). */
  broadcastProVerdictLine?: ComponentStyle;
  /** Abandoned status label. */
  broadcastProVerdictStatus?: ComponentStyle;
  /** Abandoned fixture result line. */
  broadcastProVerdictFixtureResult?: ComponentStyle;
  /** Compact crest well (48px, results / TotW). */
  broadcastProCrestWellCompact?: ComponentStyle;
  /** Ladder row crest well (adaptive size inline). */
  broadcastProCrestWellRow?: ComponentStyle;
  /** Upcoming fixture crest well (adaptive size inline). */
  broadcastProCrestWellFixture?: ComponentStyle;
  /** Top 5 / Performances grid crest well. */
  broadcastProCrestWellGrid?: ComponentStyle;
  /** Top 5 featured #1 crest well. */
  broadcastProCrestWellFeatured?: ComponentStyle;
  /** Roster home team crest well. */
  broadcastProCrestWellRosterHome?: ComponentStyle;
  /** Roster away team crest well. */
  broadcastProCrestWellRosterAway?: ComponentStyle;
  /** Horizontal opposed matchup axis (Upcoming). */
  broadcastProMatchupFixture?: ComponentStyle;
  /** Vertical stack matchup shell (Results). */
  broadcastProMatchupResultStack?: ComponentStyle;
  /** Sidebar matchup column (Roster team cards). */
  broadcastProMatchupRosterSidebar?: ComponentStyle;
  /** Fixture matchup home side slot. */
  broadcastProMatchupSideFixtureHome?: ComponentStyle;
  /** Fixture matchup away side slot. */
  broadcastProMatchupSideFixtureAway?: ComponentStyle;
  /** Home / Away role label on fixture cards. */
  broadcastProMatchupRoleLabel?: ComponentStyle;
  /** Centre divider slot (VS). */
  broadcastProMatchupDividerSlot?: ComponentStyle;
  /** VS divider typography (alias of score divider). */
  broadcastProMatchupDividerVs?: ComponentStyle;
  /** VERSUS divider typography (Roster). */
  broadcastProMatchupDividerVersus?: ComponentStyle;
  /** Fixture team name on glass panel. */
  broadcastProMatchupFixtureTeamName?: ComponentStyle;
  /** Ladder rank cell — leader accent border (colour inline). */
  broadcastProLadderZoneRankLeader?: ComponentStyle;
  /** Ladder rank cell — default border. */
  broadcastProLadderZoneRankDefault?: ComponentStyle;
  /** Upcoming fixtures: date/time/ground strip (optional). */
  upcomingFixtureHeader?: ComponentStyle;
  /** Upcoming: team name on glass panel (optional). */
  upcomingTeamName?: ComponentStyle;
  /** Upcoming: VS label (optional). */
  upcomingVs?: ComponentStyle;
  /** Team roster: root wrapper (margin + flex shell). */
  broadcastProRosterRoot?: ComponentStyle;
  /** Roster: numbered index cell (Teko; font-size may be set inline for row scaling). */
  broadcastProRosterPlayerNumber?: ComponentStyle;
  /** Roster: main grid (12-col + gap). */
  broadcastProRosterGrid?: ComponentStyle;
  /** Roster: left column (line-up list). */
  broadcastProRosterLineupColumn?: ComponentStyle;
  /** Roster: right column (teams + meta). */
  broadcastProRosterSidebar?: ComponentStyle;
  /** Roster: height shell (padding + gap under animated container). */
  broadcastProRosterContentShell?: ComponentStyle;
  /** Roster: AnimatedContainer outer (before `layout.borderRadius.container`). */
  broadcastProRosterAnimatedContainer?: ComponentStyle;
  /** Roster: scrollable player list column. */
  broadcastProRosterPlayerList?: ComponentStyle;
  /** Roster: one player row. */
  broadcastProRosterRow?: ComponentStyle;
  /** Roster: player name glass cell. */
  broadcastProRosterNameCell?: ComponentStyle;
  /** Roster: LOCATION / GRADE / DATE stack. */
  broadcastProRosterMetaStack?: ComponentStyle;
  /** Roster: home / account team glass card. */
  broadcastProRosterTeamCardHome?: ComponentStyle;
  /** Roster: away / opponent team glass card. */
  broadcastProRosterTeamCardAway?: ComponentStyle;
  /** Roster: team logo well (home). */
  broadcastProRosterTeamLogoWellHome?: ComponentStyle;
  /** Roster: team logo well (away). */
  broadcastProRosterTeamLogoWellAway?: ComponentStyle;
  /** Roster: home team name (LadderTeamName className). */
  broadcastProRosterTeamTitleHome?: ComponentStyle;
  /** Roster: away team name (smaller). */
  broadcastProRosterTeamTitleAway?: ComponentStyle;
  /** Roster: HOME TEAM / AWAY TEAM label under account team. */
  broadcastProRosterTeamLabelHome?: ComponentStyle;
  /** Roster: opponent role label (smaller). */
  broadcastProRosterTeamLabelAway?: ComponentStyle;
  /** Roster: “VERSUS” line. */
  broadcastProRosterVersus?: ComponentStyle;
  /** Roster: meta row container. */
  broadcastProRosterMetaRow?: ComponentStyle;
  broadcastProRosterMetaLabel?: ComponentStyle;
  broadcastProRosterMetaValue?: ComponentStyle;
  /** Roster: vertical accent strip beside the player list. */
  broadcastProRosterAccentStrip?: ComponentStyle;
  /** Team of the Week: root scroll shell inside asset height. */
  broadcastProTeamOfTheWeekRoot?: ComponentStyle;
  /** Team of the Week: outer AnimatedContainer. */
  broadcastProTeamOfTheWeekAnimatedContainer?: ComponentStyle;
  /** Team of the Week: one role section block. */
  broadcastProTeamOfTheWeekSection?: ComponentStyle;
  /** Team of the Week: section header row (icon area + title + rule). */
  broadcastProTeamOfTheWeekSectionHeader?: ComponentStyle;
  /** Team of the Week: section title (Teko). */
  broadcastProTeamOfTheWeekSectionTitle?: ComponentStyle;
  /** Team of the Week: section divider line. */
  broadcastProTeamOfTheWeekSectionRule?: ComponentStyle;
  /** Team of the Week: raised suffix on compact stat figures e.g. `(37)`. */
  broadcastProTeamOfTheWeekStatSuffix?: ComponentStyle;
  /** Team of the Week: unified player card grid. */
  broadcastProTeamOfTheWeekGrid?: ComponentStyle;
  /** Team of the Week: batters card grid. */
  broadcastProTeamOfTheWeekGridBatters?: ComponentStyle;
  /** Team of the Week: all-rounders card grid. */
  broadcastProTeamOfTheWeekGridAllRounders?: ComponentStyle;
  /** Team of the Week: bowlers card grid. */
  broadcastProTeamOfTheWeekGridBowlers?: ComponentStyle;
  /** Team of the Week: glass player card shell. */
  broadcastProTeamOfTheWeekCard?: ComponentStyle;
  /** Team of the Week: card inner column layout. */
  broadcastProTeamOfTheWeekCardBody?: ComponentStyle;
  /** Team of the Week: upper stack (stat, club, logo). */
  broadcastProTeamOfTheWeekCardUpper?: ComponentStyle;
  /** Team of the Week: bottom two-column name row. */
  broadcastProTeamOfTheWeekCardNameRow?: ComponentStyle;
  /** Team of the Week: single name cell in bottom row. */
  broadcastProTeamOfTheWeekCardNameCell?: ComponentStyle;
  /** Team of the Week: left copy column (stats, name, club). */
  broadcastProTeamOfTheWeekCardCopy?: ComponentStyle;
  /** Team of the Week: right logo column. */
  broadcastProTeamOfTheWeekCardLogoCol?: ComponentStyle;
  /** Team of the Week: logo well inside card. */
  broadcastProTeamOfTheWeekCardLogoWell?: ComponentStyle;
  /** Team of the Week: compact stat row on card. */
  broadcastProTeamOfTheWeekCardStats?: ComponentStyle;
  /** Team of the Week: divider under copy column. */
  broadcastProTeamOfTheWeekCardDivider?: ComponentStyle;
  /** Team of the Week: 12th man full-width band. */
  broadcastProTeamOfTheWeekTwelfthBand?: ComponentStyle;
  /** Team of the Week: 12th man role label. */
  broadcastProTeamOfTheWeekTwelfthLabel?: ComponentStyle;
  /** Team of the Week: 12th man player name. */
  broadcastProTeamOfTheWeekTwelfthName?: ComponentStyle;
  /** Team of the Week: 12th man team name. */
  broadcastProTeamOfTheWeekTwelfthTeam?: ComponentStyle;
  /** Team of the Week: 12th man stand-by subtitle. */
  broadcastProTeamOfTheWeekTwelfthRole?: ComponentStyle;
  /** Results: grade/round + ground meta strip. */
  broadcastProResultsMetaStrip?: ComponentStyle;
  /** Results: team row glass panel. */
  broadcastProResultsTeamRow?: ComponentStyle;
  /** Results: team logo well. */
  broadcastProResultsTeamLogoWell?: ComponentStyle;
  /** Results: team name on row. */
  broadcastProResultsTeamName?: ComponentStyle;
  /** Results: score badge container. */
  broadcastProResultsScoreBadge?: ComponentStyle;
  /** Results: 3-column player stats grid. */
  broadcastProResultsPlayerStatsGrid?: ComponentStyle;
  /** Results: single player stat glass cell. */
  broadcastProResultsPlayerStatCell?: ComponentStyle;
  /** Results: player name in stat cell. */
  broadcastProResultsPlayerStatName?: ComponentStyle;
  /** Results: stat value in stat cell. */
  broadcastProResultsPlayerStatValue?: ComponentStyle;
  /** Results: outer match block stack (gap-[3px]). */
  broadcastProResultsMatchBlock?: ComponentStyle;
  /** Results: matchup vertical stack (alias of match block). */
  broadcastProResultsMatchupStack?: ComponentStyle;
  /** Results: status / abandoned band. */
  broadcastProResultsStatusBand?: ComponentStyle;
  /** Results: resultShort statement band. */
  broadcastProResultsStatementBand?: ComponentStyle;
  /** Top 5 / Performances: outer AnimatedContainer shell. */
  broadcastProPlayerRankingAnimatedContainer?: ComponentStyle;
  /** Top 5 / Performances: scrollable asset-height shell. */
  broadcastProPlayerRankingScrollShell?: ComponentStyle;
  /** Top 5: featured + grid vertical stack. */
  broadcastProPlayerRankingContentStack?: ComponentStyle;
  /** Top 5: #2–#5 grid. */
  broadcastProPlayerRankingGridTop5?: ComponentStyle;
  /** Performances: 2-up grid. */
  broadcastProPlayerRankingGridPerformances?: ComponentStyle;
  /** Top 5: #1 featured card shell. */
  broadcastProPlayerRankingFeaturedInner?: ComponentStyle;
  /** Top 5: #1 featured card body row. */
  broadcastProPlayerRankingFeaturedBody?: ComponentStyle;
  /** Top 5 / Performances: grid card shell. */
  broadcastProPlayerRankingGridCard?: ComponentStyle;
  /** Top 5: #1 rank badge (top-left). */
  broadcastProPlayerRankingRankBadgeFeaturedLeft?: ComponentStyle;
  /** Top 5: grid rank badge (top-left). */
  broadcastProPlayerRankingRankBadgeGridLeft?: ComponentStyle;
  /** Performances: grid rank badge (top-right). */
  broadcastProPlayerRankingRankBadgeGridRight?: ComponentStyle;
  /** Top 5: #1 logo well. */
  broadcastProPlayerRankingLogoWellFeatured?: ComponentStyle;
  /** Top 5 / Performances: grid logo well. */
  broadcastProPlayerRankingLogoWellGrid?: ComponentStyle;
  /** Top 5: #1 player name. */
  broadcastProPlayerRankingNameFeatured?: ComponentStyle;
  /** Top 5: grid player name. */
  broadcastProPlayerRankingNameGridTop5?: ComponentStyle;
  /** Performances: grid player name. */
  broadcastProPlayerRankingNameGridPerformances?: ComponentStyle;
  /** Top 5: #1 team label. */
  broadcastProPlayerRankingTeamFeatured?: ComponentStyle;
  /** Top 5: grid team label. */
  broadcastProPlayerRankingTeamGridTop5?: ComponentStyle;
  /** Performances: grid team label. */
  broadcastProPlayerRankingTeamGridPerformances?: ComponentStyle;
  /** Top 5 / Performances: stat micro-label. */
  broadcastProPlayerRankingStatLabel?: ComponentStyle;
  /** Top 5: #1 stat value. */
  broadcastProPlayerRankingStatValueFeatured?: ComponentStyle;
  /** Top 5 / Performances: grid stat value. */
  broadcastProPlayerRankingStatValueGrid?: ComponentStyle;
  /** Top 5: #1 triple-stats row. */
  broadcastProPlayerRankingTripleStatsFeatured?: ComponentStyle;
  /** Top 5: grid triple-stats row. */
  broadcastProPlayerRankingTripleStatsGridTop5?: ComponentStyle;
  /** Performances: grid triple-stats row. */
  broadcastProPlayerRankingTripleStatsPerformances?: ComponentStyle;
  /** Top 5: #1 stat column divider. */
  broadcastProPlayerRankingStatDividerFeatured?: ComponentStyle;
  /** Top 5: grid stat column divider. */
  broadcastProPlayerRankingStatDividerGridTop5?: ComponentStyle;
  /** Performances: grid stat column divider. */
  broadcastProPlayerRankingStatDividerPerformances?: ComponentStyle;
  /** Stat matrix: Rajdhani micro-label (Top 5 / Performances). */
  broadcastProStatMatrixLabel?: ComponentStyle;
  /** Stat matrix: featured triple row (#1 Top 5). */
  broadcastProStatMatrixTripleFeatured?: ComponentStyle;
  /** Stat matrix: grid triple row (Top 5 #2–5). */
  broadcastProStatMatrixTripleGrid?: ComponentStyle;
  /** Stat matrix: performances triple row. */
  broadcastProStatMatrixTriplePerformances?: ComponentStyle;
  /** Stat matrix: featured column divider. */
  broadcastProStatMatrixDividerFeatured?: ComponentStyle;
  /** Stat matrix: grid column divider. */
  broadcastProStatMatrixDividerGrid?: ComponentStyle;
  /** Stat matrix: performances column divider. */
  broadcastProStatMatrixDividerPerformances?: ComponentStyle;
  /** Stat matrix: results player stat grid. */
  broadcastProStatMatrixResultGrid?: ComponentStyle;
  /** Stat matrix: results player stat cell. */
  broadcastProStatMatrixResultCell?: ComponentStyle;
  /** Stat matrix: results player name. */
  broadcastProStatMatrixResultName?: ComponentStyle;
  /** Stat matrix: results player stat value. */
  broadcastProStatMatrixResultValue?: ComponentStyle;
  /** Marker: qualification / callout chip (Teko). */
  broadcastProMarkerChipQualification?: ComponentStyle;
  /** Marker: rank badge chip surface. */
  broadcastProMarkerChipRank?: ComponentStyle;
  /** Marker: ladder finals zone divider notch row. */
  broadcastProMarkerZoneNotchFinals?: ComponentStyle;
  /** Marker: ladder qualification footer band. */
  broadcastProMarkerQualificationFooter?: ComponentStyle;
}

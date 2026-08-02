import type { ComponentStyle } from "../global/component-style";

/**
 * Broadcast Pro–specific `componentStyles` keys (optional on the merged theme).
 * Pair with {@link GlobalThemeComponentStyles} for full `ThemeComponentStyles`.
 */
export interface BroadcastProRoundedThemeComponentStyles {
  /** Hero primary title shell (Teko fitted display). */
  broadcastProRoundedHeadlineHero?: ComponentStyle;
  /** Hero secondary metadata line (Rajdhani). */
  broadcastProRoundedHeadlineSecondary?: ComponentStyle;
  /** In-content section titles (TotW role headers, etc.). */
  broadcastProRoundedHeadlineSection?: ComponentStyle;
  /** Match innings total (Teko, e.g. 8/284). */
  broadcastProRoundedScoreMatchTotal?: ComponentStyle;
  /** Two-day first innings sub-score. */
  broadcastProRoundedScoreMatchInnings?: ComponentStyle;
  /** Yet to Bat placeholder. */
  broadcastProRoundedScoreMatchYetToBat?: ComponentStyle;
  /** Player stat primary figure (runs, wickets/runs). */
  broadcastProRoundedScorePlayerPrimary?: ComponentStyle;
  /** Player stat parenthetical suffix ((balls), (overs)). */
  broadcastProRoundedScorePlayerSuffix?: ComponentStyle;
  /** Ladder rank numeral. */
  broadcastProRoundedScoreTableRank?: ComponentStyle;
  /** Ladder P/W/L table stat. */
  broadcastProRoundedScoreTableStat?: ComponentStyle;
  /** Ladder points column. */
  broadcastProRoundedScoreTablePoints?: ComponentStyle;
  /** Top5 featured hero stat. */
  broadcastProRoundedScoreFeatured?: ComponentStyle;
  /** Top5 / Performances grid stat. */
  broadcastProRoundedScoreGrid?: ComponentStyle;
  /** Performances grid stat (larger than Top 5 grid). */
  broadcastProRoundedScorePerformances?: ComponentStyle;
  /** TotW compact card stat. */
  broadcastProRoundedScoreCompact?: ComponentStyle;
  /** VS / matchup divider. */
  broadcastProRoundedScoreDivider?: ComponentStyle;
  /** Roster lineup index numerals (font size from row metrics). */
  broadcastProRoundedScoreRosterIndex?: ComponentStyle;
  /** Result verdict hero band container. */
  broadcastProRoundedVerdictBandHero?: ComponentStyle;
  /** Result verdict compact band container. */
  broadcastProRoundedVerdictBandCompact?: ComponentStyle;
  /** Abandoned fixture verdict band container. */
  broadcastProRoundedVerdictBandAbandoned?: ComponentStyle;
  /** Hero verdict winner line (Teko). */
  broadcastProRoundedVerdictWinner?: ComponentStyle;
  /** Hero verdict margin/context line (Rajdhani). */
  broadcastProRoundedVerdictContext?: ComponentStyle;
  /** Compact single-line verdict (Rajdhani). */
  broadcastProRoundedVerdictLine?: ComponentStyle;
  /** Abandoned status label. */
  broadcastProRoundedVerdictStatus?: ComponentStyle;
  /** Abandoned fixture result line. */
  broadcastProRoundedVerdictFixtureResult?: ComponentStyle;
  /** Compact crest well (48px, results / TotW). */
  broadcastProRoundedCrestWellCompact?: ComponentStyle;
  /** Ladder row crest well (adaptive size inline). */
  broadcastProRoundedCrestWellRow?: ComponentStyle;
  /** Upcoming fixture crest well (adaptive size inline). */
  broadcastProRoundedCrestWellFixture?: ComponentStyle;
  /** Top 5 / Performances grid crest well. */
  broadcastProRoundedCrestWellGrid?: ComponentStyle;
  /** Top 5 featured #1 crest well. */
  broadcastProRoundedCrestWellFeatured?: ComponentStyle;
  /** Roster home team crest well. */
  broadcastProRoundedCrestWellRosterHome?: ComponentStyle;
  /** Roster away team crest well. */
  broadcastProRoundedCrestWellRosterAway?: ComponentStyle;
  /** Horizontal opposed matchup axis (Upcoming). */
  broadcastProRoundedMatchupFixture?: ComponentStyle;
  /** Vertical stack matchup shell (Results). */
  broadcastProRoundedMatchupResultStack?: ComponentStyle;
  /** Sidebar matchup column (Roster team cards). */
  broadcastProRoundedMatchupRosterSidebar?: ComponentStyle;
  /** Fixture matchup home side slot. */
  broadcastProRoundedMatchupSideFixtureHome?: ComponentStyle;
  /** Fixture matchup away side slot. */
  broadcastProRoundedMatchupSideFixtureAway?: ComponentStyle;
  /** Home / Away role label on fixture cards. */
  broadcastProRoundedMatchupRoleLabel?: ComponentStyle;
  /** Centre divider slot (VS). */
  broadcastProRoundedMatchupDividerSlot?: ComponentStyle;
  /** VS divider typography (alias of score divider). */
  broadcastProRoundedMatchupDividerVs?: ComponentStyle;
  /** VERSUS divider typography (Roster). */
  broadcastProRoundedMatchupDividerVersus?: ComponentStyle;
  /** Fixture team name on glass panel. */
  broadcastProRoundedMatchupFixtureTeamName?: ComponentStyle;
  /** Ladder rank cell — leader accent border (colour inline). */
  broadcastProRoundedLadderZoneRankLeader?: ComponentStyle;
  /** Ladder rank cell — default border. */
  broadcastProRoundedLadderZoneRankDefault?: ComponentStyle;
  /** Upcoming fixtures: date/time/ground strip (optional). */
  upcomingFixtureHeader?: ComponentStyle;
  /** Upcoming: team name on glass panel (optional). */
  upcomingTeamName?: ComponentStyle;
  /** Upcoming: VS label (optional). */
  upcomingVs?: ComponentStyle;
  /** Team roster: root wrapper (margin + flex shell). */
  broadcastProRoundedRosterRoot?: ComponentStyle;
  /** Roster: numbered index cell (Teko; font-size may be set inline for row scaling). */
  broadcastProRoundedRosterPlayerNumber?: ComponentStyle;
  /** Roster: main grid (12-col + gap). */
  broadcastProRoundedRosterGrid?: ComponentStyle;
  /** Roster: left column (line-up list). */
  broadcastProRoundedRosterLineupColumn?: ComponentStyle;
  /** Roster: right column (teams + meta). */
  broadcastProRoundedRosterSidebar?: ComponentStyle;
  /** Roster: height shell (padding + gap under animated container). */
  broadcastProRoundedRosterContentShell?: ComponentStyle;
  /** Roster: AnimatedContainer outer (before `layout.borderRadius.container`). */
  broadcastProRoundedRosterAnimatedContainer?: ComponentStyle;
  /** Roster: scrollable player list column. */
  broadcastProRoundedRosterPlayerList?: ComponentStyle;
  /** Roster: one player row. */
  broadcastProRoundedRosterRow?: ComponentStyle;
  /** Roster: player name glass cell. */
  broadcastProRoundedRosterNameCell?: ComponentStyle;
  /** Roster: LOCATION / GRADE / DATE stack. */
  broadcastProRoundedRosterMetaStack?: ComponentStyle;
  /** Roster: home / account team glass card. */
  broadcastProRoundedRosterTeamCardHome?: ComponentStyle;
  /** Roster: away / opponent team glass card. */
  broadcastProRoundedRosterTeamCardAway?: ComponentStyle;
  /** Roster: team logo well (home). */
  broadcastProRoundedRosterTeamLogoWellHome?: ComponentStyle;
  /** Roster: team logo well (away). */
  broadcastProRoundedRosterTeamLogoWellAway?: ComponentStyle;
  /** Roster: home team name (LadderTeamName className). */
  broadcastProRoundedRosterTeamTitleHome?: ComponentStyle;
  /** Roster: away team name (smaller). */
  broadcastProRoundedRosterTeamTitleAway?: ComponentStyle;
  /** Roster: HOME TEAM / AWAY TEAM label under account team. */
  broadcastProRoundedRosterTeamLabelHome?: ComponentStyle;
  /** Roster: opponent role label (smaller). */
  broadcastProRoundedRosterTeamLabelAway?: ComponentStyle;
  /** Roster: “VERSUS” line. */
  broadcastProRoundedRosterVersus?: ComponentStyle;
  /** Roster: meta row container. */
  broadcastProRoundedRosterMetaRow?: ComponentStyle;
  broadcastProRoundedRosterMetaLabel?: ComponentStyle;
  broadcastProRoundedRosterMetaValue?: ComponentStyle;
  /** Roster: vertical accent strip beside the player list. */
  broadcastProRoundedRosterAccentStrip?: ComponentStyle;
  /** Team of the Week: root scroll shell inside asset height. */
  broadcastProRoundedTeamOfTheWeekRoot?: ComponentStyle;
  /** Team of the Week: outer AnimatedContainer. */
  broadcastProRoundedTeamOfTheWeekAnimatedContainer?: ComponentStyle;
  /** Team of the Week: one role section block. */
  broadcastProRoundedTeamOfTheWeekSection?: ComponentStyle;
  /** Team of the Week: section header row (icon area + title + rule). */
  broadcastProRoundedTeamOfTheWeekSectionHeader?: ComponentStyle;
  /** Team of the Week: section title (Teko). */
  broadcastProRoundedTeamOfTheWeekSectionTitle?: ComponentStyle;
  /** Team of the Week: section divider line. */
  broadcastProRoundedTeamOfTheWeekSectionRule?: ComponentStyle;
  /** Team of the Week: raised suffix on compact stat figures e.g. `(37)`. */
  broadcastProRoundedTeamOfTheWeekStatSuffix?: ComponentStyle;
  /** Team of the Week: unified player card grid. */
  broadcastProRoundedTeamOfTheWeekGrid?: ComponentStyle;
  /** Team of the Week: batters card grid. */
  broadcastProRoundedTeamOfTheWeekGridBatters?: ComponentStyle;
  /** Team of the Week: all-rounders card grid. */
  broadcastProRoundedTeamOfTheWeekGridAllRounders?: ComponentStyle;
  /** Team of the Week: bowlers card grid. */
  broadcastProRoundedTeamOfTheWeekGridBowlers?: ComponentStyle;
  /** Team of the Week: glass player card shell. */
  broadcastProRoundedTeamOfTheWeekCard?: ComponentStyle;
  /** Team of the Week: card inner column layout. */
  broadcastProRoundedTeamOfTheWeekCardBody?: ComponentStyle;
  /** Team of the Week: upper stack (stat, club, logo). */
  broadcastProRoundedTeamOfTheWeekCardUpper?: ComponentStyle;
  /** Team of the Week: bottom two-column name row. */
  broadcastProRoundedTeamOfTheWeekCardNameRow?: ComponentStyle;
  /** Team of the Week: single name cell in bottom row. */
  broadcastProRoundedTeamOfTheWeekCardNameCell?: ComponentStyle;
  /** Team of the Week: left copy column (stats, name, club). */
  broadcastProRoundedTeamOfTheWeekCardCopy?: ComponentStyle;
  /** Team of the Week: right logo column. */
  broadcastProRoundedTeamOfTheWeekCardLogoCol?: ComponentStyle;
  /** Team of the Week: logo well inside card. */
  broadcastProRoundedTeamOfTheWeekCardLogoWell?: ComponentStyle;
  /** Team of the Week: compact stat row on card. */
  broadcastProRoundedTeamOfTheWeekCardStats?: ComponentStyle;
  /** Team of the Week: divider under copy column. */
  broadcastProRoundedTeamOfTheWeekCardDivider?: ComponentStyle;
  /** Team of the Week: 12th man full-width band. */
  broadcastProRoundedTeamOfTheWeekTwelfthBand?: ComponentStyle;
  /** Team of the Week: 12th man role label. */
  broadcastProRoundedTeamOfTheWeekTwelfthLabel?: ComponentStyle;
  /** Team of the Week: 12th man player name. */
  broadcastProRoundedTeamOfTheWeekTwelfthName?: ComponentStyle;
  /** Team of the Week: 12th man team name. */
  broadcastProRoundedTeamOfTheWeekTwelfthTeam?: ComponentStyle;
  /** Team of the Week: 12th man stand-by subtitle. */
  broadcastProRoundedTeamOfTheWeekTwelfthRole?: ComponentStyle;
  /** Results: grade/round + ground meta strip. */
  broadcastProRoundedResultsMetaStrip?: ComponentStyle;
  /** Results: team row glass panel. */
  broadcastProRoundedResultsTeamRow?: ComponentStyle;
  /** Results: team logo well. */
  broadcastProRoundedResultsTeamLogoWell?: ComponentStyle;
  /** Results: team name on row. */
  broadcastProRoundedResultsTeamName?: ComponentStyle;
  /** Results: score badge container. */
  broadcastProRoundedResultsScoreBadge?: ComponentStyle;
  /** Results: 3-column player stats grid. */
  broadcastProRoundedResultsPlayerStatsGrid?: ComponentStyle;
  /** Results: single player stat glass cell. */
  broadcastProRoundedResultsPlayerStatCell?: ComponentStyle;
  /** Results: player name in stat cell. */
  broadcastProRoundedResultsPlayerStatName?: ComponentStyle;
  /** Results: stat value in stat cell. */
  broadcastProRoundedResultsPlayerStatValue?: ComponentStyle;
  /** Results: outer match block stack (gap-[3px]). */
  broadcastProRoundedResultsMatchBlock?: ComponentStyle;
  /** Results: matchup vertical stack (alias of match block). */
  broadcastProRoundedResultsMatchupStack?: ComponentStyle;
  /** Results: status / abandoned band. */
  broadcastProRoundedResultsStatusBand?: ComponentStyle;
  /** Results: resultShort statement band. */
  broadcastProRoundedResultsStatementBand?: ComponentStyle;
  /** Top 5 / Performances: outer AnimatedContainer shell. */
  broadcastProRoundedPlayerRankingAnimatedContainer?: ComponentStyle;
  /** Top 5 / Performances: scrollable asset-height shell. */
  broadcastProRoundedPlayerRankingScrollShell?: ComponentStyle;
  /** Top 5: featured + grid vertical stack. */
  broadcastProRoundedPlayerRankingContentStack?: ComponentStyle;
  /** Top 5: #2–#5 grid. */
  broadcastProRoundedPlayerRankingGridTop5?: ComponentStyle;
  /** Performances: 2-up grid. */
  broadcastProRoundedPlayerRankingGridPerformances?: ComponentStyle;
  /** Top 5: #1 featured card shell. */
  broadcastProRoundedPlayerRankingFeaturedInner?: ComponentStyle;
  /** Top 5: #1 featured card body row. */
  broadcastProRoundedPlayerRankingFeaturedBody?: ComponentStyle;
  /** Top 5 / Performances: grid card shell. */
  broadcastProRoundedPlayerRankingGridCard?: ComponentStyle;
  /** Top 5: #1 rank badge (top-left). */
  broadcastProRoundedPlayerRankingRankBadgeFeaturedLeft?: ComponentStyle;
  /** Top 5: grid rank badge (top-left). */
  broadcastProRoundedPlayerRankingRankBadgeGridLeft?: ComponentStyle;
  /** Performances: grid rank badge (top-right). */
  broadcastProRoundedPlayerRankingRankBadgeGridRight?: ComponentStyle;
  /** Top 5: #1 logo well. */
  broadcastProRoundedPlayerRankingLogoWellFeatured?: ComponentStyle;
  /** Top 5 / Performances: grid logo well. */
  broadcastProRoundedPlayerRankingLogoWellGrid?: ComponentStyle;
  /** Top 5: #1 player name. */
  broadcastProRoundedPlayerRankingNameFeatured?: ComponentStyle;
  /** Top 5: grid player name. */
  broadcastProRoundedPlayerRankingNameGridTop5?: ComponentStyle;
  /** Performances: grid player name. */
  broadcastProRoundedPlayerRankingNameGridPerformances?: ComponentStyle;
  /** Top 5: #1 team label. */
  broadcastProRoundedPlayerRankingTeamFeatured?: ComponentStyle;
  /** Top 5: grid team label. */
  broadcastProRoundedPlayerRankingTeamGridTop5?: ComponentStyle;
  /** Performances: grid team label. */
  broadcastProRoundedPlayerRankingTeamGridPerformances?: ComponentStyle;
  /** Top 5 / Performances: stat micro-label. */
  broadcastProRoundedPlayerRankingStatLabel?: ComponentStyle;
  broadcastProRoundedPlayerRankingStatLabelPerformances?: ComponentStyle;
  /** Top 5: #1 stat value. */
  broadcastProRoundedPlayerRankingStatValueFeatured?: ComponentStyle;
  /** Top 5 / Performances: grid stat value. */
  broadcastProRoundedPlayerRankingStatValueGrid?: ComponentStyle;
  /** Top 5: #1 triple-stats row. */
  broadcastProRoundedPlayerRankingTripleStatsFeatured?: ComponentStyle;
  /** Top 5: grid triple-stats row. */
  broadcastProRoundedPlayerRankingTripleStatsGridTop5?: ComponentStyle;
  /** Performances: grid triple-stats row. */
  broadcastProRoundedPlayerRankingTripleStatsPerformances?: ComponentStyle;
  /** Top 5: #1 stat column divider. */
  broadcastProRoundedPlayerRankingStatDividerFeatured?: ComponentStyle;
  /** Top 5: grid stat column divider. */
  broadcastProRoundedPlayerRankingStatDividerGridTop5?: ComponentStyle;
  /** Performances: grid stat column divider. */
  broadcastProRoundedPlayerRankingStatDividerPerformances?: ComponentStyle;
  /** Stat matrix: Rajdhani micro-label (Top 5 / Performances). */
  broadcastProRoundedStatMatrixLabel?: ComponentStyle;
  broadcastProRoundedStatMatrixLabelPerformances?: ComponentStyle;
  /** Stat matrix: featured triple row (#1 Top 5). */
  broadcastProRoundedStatMatrixTripleFeatured?: ComponentStyle;
  /** Stat matrix: grid triple row (Top 5 #2–5). */
  broadcastProRoundedStatMatrixTripleGrid?: ComponentStyle;
  /** Stat matrix: performances triple row. */
  broadcastProRoundedStatMatrixTriplePerformances?: ComponentStyle;
  /** Stat matrix: featured column divider. */
  broadcastProRoundedStatMatrixDividerFeatured?: ComponentStyle;
  /** Stat matrix: grid column divider. */
  broadcastProRoundedStatMatrixDividerGrid?: ComponentStyle;
  /** Stat matrix: performances column divider. */
  broadcastProRoundedStatMatrixDividerPerformances?: ComponentStyle;
  /** Stat matrix: results player stat grid. */
  broadcastProRoundedStatMatrixResultGrid?: ComponentStyle;
  /** Stat matrix: results player stat cell. */
  broadcastProRoundedStatMatrixResultCell?: ComponentStyle;
  /** Stat matrix: results player name. */
  broadcastProRoundedStatMatrixResultName?: ComponentStyle;
  /** Stat matrix: results player stat value. */
  broadcastProRoundedStatMatrixResultValue?: ComponentStyle;
  /** Marker: qualification / callout chip (Teko). */
  broadcastProRoundedMarkerChipQualification?: ComponentStyle;
  /** Marker: rank badge chip surface. */
  broadcastProRoundedMarkerChipRank?: ComponentStyle;
  /** Marker: ladder finals zone divider notch row. */
  broadcastProRoundedMarkerZoneNotchFinals?: ComponentStyle;
  /** Marker: ladder qualification footer band. */
  broadcastProRoundedMarkerQualificationFooter?: ComponentStyle;
}

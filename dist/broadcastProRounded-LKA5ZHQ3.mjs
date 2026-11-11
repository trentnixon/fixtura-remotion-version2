import { OneColumn } from "./chunk-IJBICBEW.mjs";
import { VerticalStackTitleLogoName } from "./chunk-42Q3FJK7.mjs";
import {
  AnimatedImage,
  AnimatedText,
  BaseTemplate,
  BroadcastProRoundedMetadataChip,
  DEFAULT_BROADCAST_PRO_CREST_SIZING2 as DEFAULT_BROADCAST_PRO_CREST_SIZING,
  DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING2 as DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING,
  DEFAULT_BROADCAST_PRO_ROSTER_LIST_SIZING2 as DEFAULT_BROADCAST_PRO_ROSTER_LIST_SIZING,
  DEFAULT_BROADCAST_PRO_SCORE_SIZING2 as DEFAULT_BROADCAST_PRO_SCORE_SIZING,
  ImageBackground,
  IntroPrimarySponsors,
  SelectTemplateBackground,
  TransitionSeriesWrapper,
  VerticalHeaderLogoTitle,
  VerticalHeaderLogoTitleName,
  baseTheme,
  calculateMainHeaderExitFrame,
  getTitleScreenContentWidth,
  resolveBroadcastProImageDefaults,
  resolveBroadcastProRoundedCopyVariant,
  useAnimationContext,
  useBroadcastProRoundedTheme,
  useFittedFontSize,
  useThemeContext,
  useVideoDataContext,
} from "./chunk-YUUFNNHG.mjs";
import {
  OUTRO_PAGE_DURATION_FRAMES,
  OUTRO_PAGE_LOGO_EXIT_FRAME,
  OUTRO_PAGE_LOGO_STAGGER_FRAMES,
  OUTRO_SPONSOR_PAGE_SIZE,
  buildOutroSponsorSequence,
  chunkSponsors,
  resolveBackgroundIngress,
} from "./chunk-S5B7PBPK.mjs";

// src/templates/variants/broadcastProRounded/theme/componentStyles.shared.ts
var broadcastProRoundedScoreMatchTotal = {
  className: "font-teko text-5xl font-normal tracking-tight leading-none",
};
var broadcastProRoundedScoreMatchInnings = {
  className:
    "font-teko text-xl font-normal tracking-tight leading-none opacity-80",
};
var broadcastProRoundedScoreMatchYetToBat = {
  className: "font-teko text-2xl font-normal tracking-wider leading-none py-2",
};
var broadcastProRoundedScorePlayerPrimary = {
  className: "font-teko text-base font-bold tracking-tight leading-tight",
};
var broadcastProRoundedScorePlayerSuffix = {
  className:
    "font-teko text-sm font-normal tracking-tight leading-tight opacity-70",
};
var broadcastProRoundedScoreTableRank = {
  className:
    "font-rajdhani text-5xl font-normal tracking-tight leading-none uppercase",
};
var broadcastProRoundedScoreTableStat = {
  className: "font-rajdhani text-4xl font-normal tracking-tight leading-none",
};
var broadcastProRoundedScoreTablePoints = {
  className:
    "font-rajdhani text-5xl font-bold tracking-tight leading-none text-center",
};
var broadcastProRoundedScoreFeatured = {
  className: "font-teko text-7xl font-semibold tracking-tight leading-none",
};
var broadcastProRoundedScoreGrid = {
  className: "font-teko text-4xl font-semibold tracking-tight leading-none",
};
var broadcastProRoundedScorePerformances = {
  className: "font-teko text-6xl font-semibold tracking-tight leading-none",
};
var broadcastProRoundedScoreCompact = {
  className: "font-teko text-xl font-semibold tracking-tight leading-none",
};
var broadcastProRoundedScoreDivider = {
  className:
    "font-teko text-4xl font-bold italic uppercase tracking-tight leading-none",
};
var broadcastProRoundedScoreRosterIndex = {
  className:
    "font-teko font-normal uppercase leading-none tabular-nums tracking-tight",
};
var broadcastProRoundedVerdictBandHero = {
  className: "flex flex-col items-center justify-center gap-2 px-8 py-3",
};
var broadcastProRoundedVerdictBandCompact = {
  className: "flex items-center justify-center px-6 py-3",
};
var broadcastProRoundedVerdictBandAbandoned = {
  className: "flex flex-col items-center justify-center gap-1 px-6 py-3",
};
var broadcastProRoundedVerdictWinner = {
  className:
    "font-teko text-5xl font-normal uppercase tracking-tight leading-none text-center",
};
var broadcastProRoundedVerdictContext = {
  className:
    "font-rajdhani text-xl font-semibold uppercase tracking-[0.2em] leading-snug text-center",
};
var broadcastProRoundedVerdictLine = {
  className:
    "font-rajdhani text-2xl font-semibold italic tracking-wider leading-snug text-center",
};
var broadcastProRoundedVerdictStatus = {
  className:
    "font-rajdhani text-sm font-bold uppercase tracking-widest leading-snug",
};
var broadcastProRoundedVerdictFixtureResult = {
  className:
    "font-rajdhani text-3xl font-normal italic text-center tracking-wider leading-snug",
};
var broadcastProRoundedCrestWellCompact = {
  className:
    "flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl",
};
var broadcastProRoundedCrestWellRow = {
  className:
    "flex flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl",
};
var broadcastProRoundedCrestWellFixture = {
  className:
    "flex flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl",
};
var broadcastProRoundedCrestWellGrid = {
  className:
    "flex shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-inner",
};
var broadcastProRoundedCrestWellFeatured = {
  className:
    "flex shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-inner",
};
var broadcastProRoundedCrestWellRosterHome = {
  className:
    "mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl",
};
var broadcastProRoundedCrestWellRosterAway = {
  className:
    "mb-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl",
};
var broadcastProRoundedMatchupFixture = {
  className:
    "flex w-full min-w-0 flex-shrink-0 items-start justify-between gap-3 md:gap-4",
};
var broadcastProRoundedMatchupResultStack = {
  className: "flex w-full flex-col gap-2",
};
var broadcastProRoundedMatchupRosterSidebar = {
  className: "flex shrink-0 flex-col gap-4",
};
var broadcastProRoundedMatchupSideFixtureHome = {
  className: "flex min-w-0 flex-1 items-center gap-4",
};
var broadcastProRoundedMatchupSideFixtureAway = {
  className: "flex min-w-0 flex-1 items-center justify-end gap-4 text-right",
};
var broadcastProRoundedMatchupRoleLabel = {
  className:
    "font-rajdhani text-sm font-bold uppercase tracking-widest opacity-80",
};
var broadcastProRoundedMatchupDividerSlot = {
  className:
    "flex flex-shrink-0 self-center items-center justify-center px-2 md:px-3",
};
var broadcastProRoundedMatchupDividerVersus = {
  className: "font-teko mb-1.5 text-2xl italic sm:text-3xl",
};
var broadcastProRoundedMatchupFixtureTeamName = {
  className: "font-rajdhani font-normal uppercase leading-none tracking-wide",
};
var broadcastProRoundedLadderZoneRankLeader = {
  className: "flex w-20 flex-shrink-0 items-center justify-center",
};
var broadcastProRoundedLadderZoneRankDefault = {
  className: "flex w-20 flex-shrink-0 items-center justify-center",
};
var broadcastProRoundedComponentStylesShared = {
  title: {
    className:
      "font-teko font-normal uppercase tracking-tight leading-none text-center m-0 px-4",
  },
  titleSmall: {
    className:
      "font-teko text-6xl font-normal tracking-tight leading-none text-center m-0 px-4",
  },
  subtitle: {
    className:
      "font-rajdhani text-6xl font-semibold uppercase tracking-normal leading-none text-center m-0 px-4",
  },
  broadcastProRoundedHeadlineHero: {
    className:
      "font-teko font-normal uppercase tracking-tight drop-shadow-2xl text-center m-0 w-full max-w-full",
  },
  broadcastProRoundedHeadlineSecondary: {
    className:
      "font-rajdhani uppercase tracking-wide font-semibold leading-snug",
  },
  broadcastProRoundedHeadlineSection: {
    className:
      "font-teko text-2xl font-normal uppercase tracking-widest leading-none",
  },
  bodyText: {
    className: "text-xl font-normal tracking-normal leading-relaxed",
  },
  playerName: {
    className:
      "font-teko text-3xl font-normal uppercase tracking-tight leading-tight",
  },
  /** Legacy global key — aliases match total for backward compatibility. */
  score: broadcastProRoundedScoreMatchTotal,
  broadcastProRoundedScoreMatchTotal,
  broadcastProRoundedScoreMatchInnings,
  broadcastProRoundedScoreMatchYetToBat,
  broadcastProRoundedScorePlayerPrimary,
  broadcastProRoundedScorePlayerSuffix,
  broadcastProRoundedScoreTableRank,
  broadcastProRoundedScoreTableStat,
  broadcastProRoundedScoreTablePoints,
  broadcastProRoundedScoreFeatured,
  broadcastProRoundedScoreGrid,
  broadcastProRoundedScorePerformances,
  broadcastProRoundedScoreCompact,
  broadcastProRoundedScoreDivider,
  broadcastProRoundedScoreRosterIndex,
  broadcastProRoundedVerdictBandHero,
  broadcastProRoundedVerdictBandCompact,
  broadcastProRoundedVerdictBandAbandoned,
  broadcastProRoundedVerdictWinner,
  broadcastProRoundedVerdictContext,
  broadcastProRoundedVerdictLine,
  broadcastProRoundedVerdictStatus,
  broadcastProRoundedVerdictFixtureResult,
  broadcastProRoundedCrestWellCompact,
  broadcastProRoundedCrestWellRow,
  broadcastProRoundedCrestWellFixture,
  broadcastProRoundedCrestWellGrid,
  broadcastProRoundedCrestWellFeatured,
  broadcastProRoundedCrestWellRosterHome,
  broadcastProRoundedCrestWellRosterAway,
  broadcastProRoundedMatchupFixture,
  broadcastProRoundedMatchupResultStack,
  broadcastProRoundedMatchupRosterSidebar,
  broadcastProRoundedMatchupSideFixtureHome,
  broadcastProRoundedMatchupSideFixtureAway,
  broadcastProRoundedMatchupRoleLabel,
  broadcastProRoundedMatchupDividerSlot,
  broadcastProRoundedMatchupDividerVs: broadcastProRoundedScoreDivider,
  broadcastProRoundedMatchupDividerVersus,
  broadcastProRoundedMatchupFixtureTeamName,
  broadcastProRoundedLadderZoneRankLeader,
  broadcastProRoundedLadderZoneRankDefault,
  teamName: {
    className:
      "font-teko text-4xl font-normal uppercase tracking-wide leading-none",
  },
  label: {
    className: "text-lg font-medium tracking-normal leading-snug",
  },
  metadataSmall: {
    className: "text-lg font-normal tracking-wider leading-snug",
  },
  metadataMedium: {
    className: "text-2xl font-semibold tracking-wider leading-snug",
  },
  metadataLarge: {
    className: "text-3xl font-semibold tracking-wide leading-snug",
  },
};

// src/templates/variants/broadcastProRounded/theme/composition/ladder.ts
var broadcastProRoundedCompositionComponentStylesLadder = {
  ladderGradeLabel: {
    className: "text-2xl font-bold uppercase tracking-wide leading-snug",
  },
  ladderTeamName: {
    className:
      "font-rajdhani text-4xl font-bold uppercase tracking-wide leading-none",
  },
  ladderTeamPoints:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedScoreTablePoints,
  broadcastProRoundedLadderZoneRankLeader:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedLadderZoneRankLeader,
  broadcastProRoundedLadderZoneRankDefault:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedLadderZoneRankDefault,
};

// src/templates/variants/broadcastProRounded/theme/composition/results.ts
var broadcastProRoundedCompositionComponentStylesResults = {
  ResultScore:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedScoreMatchTotal,
  ResultScoreFirstInnings:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedScoreMatchInnings,
  ResultScoreYetToBat:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedScoreMatchYetToBat,
  ResultTeamName: {
    className:
      "font-rajdhani text-4xl font-bold uppercase tracking-wide leading-none",
  },
  ResultPlayerName: {
    className: "font-rajdhani text-2xl font-bold leading-tight",
  },
  ResultPlayerScore: {
    className: "font-teko text-4xl font-normal tracking-tight leading-tight",
  },
  ResultSyntax: {
    className: "text-2xl font-semibold tracking-wider leading-snug py-4 ml-4",
  },
  ResultFixtureResult:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedVerdictFixtureResult,
  ResultMetaData: {
    className:
      "font-rajdhani text-lg font-normal uppercase tracking-wider leading-snug",
  },
  ResultStatementShort:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedVerdictLine,
  ResultStatementText: {
    className: "text-2xl font-semibold tracking-wider leading-snug",
  },
  ResultVS:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedScoreDivider,
  broadcastProRoundedResultsMetaStrip: {
    className:
      "flex w-full flex-shrink-0 items-center justify-between px-4 py-1.5",
  },
  broadcastProRoundedResultsTeamRow: {
    className: "relative flex w-full items-center overflow-hidden",
  },
  broadcastProRoundedResultsTeamLogoWell:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedCrestWellGrid,
  broadcastProRoundedResultsTeamName: {
    className: "min-w-0 !leading-[0.95]",
  },
  broadcastProRoundedResultsScoreBadge: {
    className: "flex flex-shrink-0 flex-col items-end px-4 py-1.5",
  },
  broadcastProRoundedResultsPlayerStatsGrid: {
    className: "grid grid-cols-3 gap-2",
  },
  broadcastProRoundedResultsPlayerStatCell: {
    className: "flex items-center justify-between px-3 py-2",
  },
  broadcastProRoundedResultsPlayerStatName: {
    className: "min-w-0 truncate",
  },
  broadcastProRoundedResultsPlayerStatValue: {
    className: "flex-shrink-0",
  },
  broadcastProRoundedResultsMatchBlock:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedMatchupResultStack,
  broadcastProRoundedResultsMatchupStack:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedMatchupResultStack,
  broadcastProRoundedResultsStatusBand:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedVerdictBandAbandoned,
  broadcastProRoundedResultsStatementBand:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedVerdictBandCompact,
};

// src/templates/variants/broadcastProRounded/theme/composition/roster.ts
var broadcastProRoundedCompositionComponentStylesRoster = {
  RosterPlayerName: {
    /** `block` + relaxed leading: Teko caps need room inside fixed row cells. */
    className:
      "font-teko block min-w-0 whitespace-nowrap font-normal uppercase leading-tight tracking-wide",
  },
  broadcastProRoundedRosterRoot: {
    className: "flex h-full min-h-0 w-full flex-col p-0 pt-6",
  },
  broadcastProRoundedRosterPlayerNumber: {
    className:
      "flex min-h-0 min-w-0 flex-shrink-0 items-stretch justify-center self-stretch p-0",
  },
  broadcastProRoundedRosterGrid: {
    className: "grid min-h-0 flex-1 grid-cols-12 gap-6 overflow-hidden",
  },
  broadcastProRoundedRosterLineupColumn: {
    className:
      "col-span-12 flex min-h-0 flex-col overflow-hidden lg:col-span-7",
  },
  broadcastProRoundedRosterSidebar: {
    className:
      "col-span-12 flex min-h-0 flex-col gap-3 overflow-hidden lg:col-span-5",
  },
  broadcastProRoundedRosterContentShell: {
    className: "flex min-h-0 flex-col gap-4 px-2",
  },
  broadcastProRoundedRosterAnimatedContainer: {
    className: "mx-6 flex flex-1 flex-col overflow-hidden",
  },
  broadcastProRoundedRosterPlayerList: {
    className:
      "flex min-h-0 min-w-0 flex-1 flex-col justify-start overflow-hidden pr-1",
  },
  broadcastProRoundedRosterRow: {
    className: "flex min-h-0 min-w-0 shrink-0 grow-0 items-stretch gap-2",
  },
  broadcastProRoundedRosterNameCell: {
    className:
      "flex h-full min-h-0 min-w-0 flex-1 items-stretch justify-start self-stretch",
  },
  broadcastProRoundedRosterMetaStack: {
    className: "flex min-h-0 flex-1 flex-col gap-2",
  },
  broadcastProRoundedRosterTeamCardHome: {
    className: "flex flex-shrink-0 flex-col items-center p-3 text-center",
  },
  broadcastProRoundedRosterTeamCardAway: {
    className: "flex flex-col items-center p-3 text-center",
  },
  broadcastProRoundedRosterTeamLogoWellHome: {
    className: "mb-2 flex h-16 w-16 items-center justify-center",
  },
  broadcastProRoundedRosterTeamLogoWellAway: {
    className: "mb-2 flex h-14 w-14 items-center justify-center",
  },
  broadcastProRoundedCrestWellRosterHome: {
    className: "mb-2 flex h-16 w-16 items-center justify-center",
  },
  broadcastProRoundedCrestWellRosterAway: {
    className: "mb-2 flex h-14 w-14 items-center justify-center",
  },
  broadcastProRoundedRosterTeamTitleHome: {
    className:
      "font-teko line-clamp-2 w-full text-4xl uppercase leading-tight sm:text-5xl",
  },
  broadcastProRoundedRosterTeamTitleAway: {
    className:
      "font-teko line-clamp-2 w-full text-3xl uppercase leading-tight sm:text-4xl",
  },
  broadcastProRoundedRosterTeamLabelHome: {
    className:
      "font-rajdhani mt-1 text-sm font-normal uppercase tracking-widest",
  },
  broadcastProRoundedRosterTeamLabelAway: {
    className:
      "font-rajdhani mt-0.5 text-xs font-normal uppercase tracking-widest",
  },
  broadcastProRoundedRosterVersus: {
    className: "font-teko mb-1 text-2xl italic leading-none",
  },
  broadcastProRoundedMatchupDividerVersus: {
    className: "font-teko mb-1 text-2xl italic leading-none",
  },
  broadcastProRoundedMatchupRosterSidebar: {
    className: "flex flex-col gap-3",
  },
  broadcastProRoundedRosterMetaRow: {
    className: "p-3",
  },
  broadcastProRoundedRosterMetaLabel: {
    className:
      "font-rajdhani block text-xs font-normal uppercase tracking-widest",
  },
  broadcastProRoundedRosterMetaValue: {
    className:
      "font-teko line-clamp-2 text-2xl uppercase leading-tight sm:text-[28px]",
  },
  broadcastProRoundedRosterAccentStrip: {
    className: "w-1.5 shrink-0 self-stretch rounded-sm",
  },
};

// src/templates/variants/broadcastProRounded/theme/composition/teamOfTheWeek.ts
var broadcastProRoundedCompositionComponentStylesTeamOfTheWeek = {
  TeamOfTheWeekPlayerName: {
    className:
      "text-left text-3xl font-bold uppercase tracking-tight leading-none sm:text-4xl",
  },
  TeamOfTheWeekTeam: {
    className:
      "line-clamp-2 text-left text-lg font-bold uppercase tracking-wider leading-tight opacity-90 sm:text-xl",
  },
  TeamOfTheWeekType: {
    className: "text-sm font-bold uppercase tracking-wider leading-none",
  },
  TeamOfTheWeekStat: {
    className:
      "font-teko whitespace-nowrap text-left text-5xl font-semibold tracking-tight leading-none sm:text-6xl",
  },
  broadcastProRoundedTeamOfTheWeekStatSuffix: {
    className:
      "relative -top-1.5 inline font-teko text-3xl font-normal tracking-tight leading-none opacity-80 sm:-top-2 sm:text-4xl",
  },
  broadcastProRoundedTeamOfTheWeekRoot: {
    className:
      "flex min-h-0 flex-1 flex-col justify-center gap-2 overflow-hidden px-8 py-2 md:px-10",
  },
  broadcastProRoundedTeamOfTheWeekAnimatedContainer: {
    className:
      "flex min-h-0 flex-1 flex-col justify-center overflow-hidden rounded-2xl",
  },
  broadcastProRoundedTeamOfTheWeekSection: {
    className: "flex flex-shrink-0 flex-col gap-2",
  },
  broadcastProRoundedTeamOfTheWeekSectionHeader: {
    className: "flex items-center gap-3",
  },
  broadcastProRoundedTeamOfTheWeekSectionTitle: {
    className:
      "font-teko text-3xl font-normal uppercase tracking-tight leading-none",
  },
  broadcastProRoundedTeamOfTheWeekSectionRule: {
    className: "h-px flex-1 opacity-20",
  },
  broadcastProRoundedTeamOfTheWeekGrid: {
    className: "grid grid-cols-2 gap-2",
  },
  broadcastProRoundedTeamOfTheWeekGridBatters: {
    className: "grid grid-cols-2 gap-2",
  },
  broadcastProRoundedTeamOfTheWeekGridAllRounders: {
    className: "grid grid-cols-2 gap-2",
  },
  broadcastProRoundedTeamOfTheWeekGridBowlers: {
    className: "grid grid-cols-2 gap-2",
  },
  broadcastProRoundedTeamOfTheWeekCard: {
    className: "relative flex h-full flex-col overflow-hidden rounded-2xl",
  },
  broadcastProRoundedTeamOfTheWeekCardBody: {
    className: "flex min-h-0 flex-1 flex-col justify-center gap-2",
  },
  broadcastProRoundedTeamOfTheWeekCardUpper: {
    className: "flex min-w-0 flex-1 flex-col",
  },
  broadcastProRoundedTeamOfTheWeekCardCopy: {
    className: "flex min-w-0 flex-1 flex-col items-start gap-1 text-left",
  },
  broadcastProRoundedTeamOfTheWeekCardLogoCol: {
    className: "hidden",
  },
  broadcastProRoundedTeamOfTheWeekCardLogoWell: {
    className: "flex h-full w-full items-center justify-center",
  },
  broadcastProRoundedTeamOfTheWeekCardStats: {
    className:
      "flex min-h-[1.5rem] min-w-0 flex-1 items-center justify-start whitespace-nowrap",
  },
  broadcastProRoundedTeamOfTheWeekCardDivider: {
    className: "h-px w-full opacity-30",
  },
  broadcastProRoundedTeamOfTheWeekCardNameRow: {
    className: "w-full",
  },
  broadcastProRoundedTeamOfTheWeekCardNameCell: {
    className: "w-full text-left uppercase leading-none",
  },
  broadcastProRoundedTeamOfTheWeekTwelfthBand: {
    className:
      "relative mt-auto flex items-center justify-between overflow-hidden rounded-2xl px-6 py-3",
  },
  broadcastProRoundedTeamOfTheWeekTwelfthLabel: {
    className:
      "font-teko text-lg uppercase tracking-widest leading-none opacity-40",
  },
  broadcastProRoundedTeamOfTheWeekTwelfthName: {
    className: "font-teko text-3xl font-bold uppercase leading-tight",
  },
  broadcastProRoundedTeamOfTheWeekTwelfthTeam: {
    className: "text-xs font-bold uppercase tracking-widest opacity-40",
  },
  broadcastProRoundedTeamOfTheWeekTwelfthRole: {
    className: "mt-1 text-xs uppercase tracking-tighter opacity-20",
  },
};

// src/templates/variants/broadcastProRounded/theme/composition/playerRanking.ts
var broadcastProRoundedPlayerRankingStatScoreFeatured = {
  className: "font-teko text-9xl font-semibold tracking-tight leading-none",
};
var broadcastProRoundedPlayerRankingStatScoreGrid = {
  className: "font-teko text-6xl font-semibold tracking-tight leading-none",
};
var broadcastProRoundedCompositionComponentStylesPlayerRanking = {
  broadcastProRoundedPlayerRankingAnimatedContainer: {
    className:
      "mx-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl md:mx-6",
  },
  broadcastProRoundedPlayerRankingScrollShell: {
    className: "flex min-h-0 flex-1 flex-col overflow-hidden py-0",
  },
  broadcastProRoundedPlayerRankingContentStack: {
    className: "flex w-full flex-col justify-start gap-2",
  },
  broadcastProRoundedPlayerRankingGridTop5: {
    className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
  },
  broadcastProRoundedPlayerRankingGridPerformances: {
    className: "grid w-full grid-cols-2 content-start gap-2",
  },
  broadcastProRoundedPlayerRankingFeaturedInner: {
    className: "relative flex flex-col overflow-hidden",
  },
  broadcastProRoundedPlayerRankingFeaturedBody: {
    className:
      "relative flex min-h-[200px] items-stretch overflow-hidden pt-10",
  },
  broadcastProRoundedPlayerRankingGridCard: {
    className:
      "relative flex shrink-0 items-stretch gap-3 overflow-hidden p-3 pt-8 sm:gap-4 sm:p-4 sm:pt-9",
  },
  broadcastProRoundedPlayerRankingRankBadgeFeaturedLeft: {
    className:
      "absolute left-0 top-0 px-3 py-1 font-rajdhani text-2xl font-bold italic leading-none",
  },
  broadcastProRoundedPlayerRankingRankBadgeGridLeft: {
    className:
      "absolute left-0 top-0 px-3 py-1 font-rajdhani text-2xl font-bold italic leading-none",
  },
  broadcastProRoundedPlayerRankingRankBadgeGridRight: {
    className:
      "absolute right-0 top-0 px-3 py-1 font-rajdhani text-lg font-bold italic tracking-wide leading-none",
  },
  broadcastProRoundedPlayerRankingLogoWellFeatured:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedCrestWellFeatured,
  broadcastProRoundedPlayerRankingLogoWellGrid:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedCrestWellGrid,
  broadcastProRoundedPlayerRankingNameFeatured: {
    className:
      "font-rajdhani text-lift text-5xl font-semibold uppercase leading-none tracking-normal md:text-6xl",
  },
  broadcastProRoundedPlayerRankingNameGridTop5: {
    className:
      "font-rajdhani text-lift truncate text-xl font-medium uppercase leading-snug sm:text-2xl",
  },
  broadcastProRoundedPlayerRankingNameGridPerformances: {
    className:
      "text-lift line-clamp-2 text-[28px] font-semibold uppercase leading-none sm:text-[32px]",
  },
  broadcastProRoundedPlayerRankingTeamFeatured: {
    className:
      "font-rajdhani mt-1 text-2xl font-semibold uppercase tracking-[0.2em]",
  },
  broadcastProRoundedPlayerRankingTeamGridTop5: {
    className:
      "font-rajdhani mt-0.5 text-sm font-bold uppercase leading-tight tracking-[0.15em]",
  },
  broadcastProRoundedPlayerRankingTeamGridPerformances: {
    className:
      "font-rajdhani mb-2 mt-1 text-sm font-bold uppercase tracking-[0.2em]",
  },
  broadcastProRoundedPlayerRankingStatLabel: {
    className:
      "font-rajdhani mb-0.5 text-base font-bold uppercase tracking-widest",
  },
  broadcastProRoundedPlayerRankingStatLabelPerformances: {
    className:
      "font-rajdhani mb-0.5 text-xl font-bold uppercase tracking-widest",
  },
  broadcastProRoundedPlayerRankingStatValueFeatured:
    broadcastProRoundedPlayerRankingStatScoreFeatured,
  broadcastProRoundedPlayerRankingStatValueGrid:
    broadcastProRoundedPlayerRankingStatScoreGrid,
  broadcastProRoundedScoreFeatured:
    broadcastProRoundedPlayerRankingStatScoreFeatured,
  broadcastProRoundedScoreGrid: broadcastProRoundedPlayerRankingStatScoreGrid,
  broadcastProRoundedPlayerRankingTripleStatsFeatured: {
    className: "mt-4 grid w-full grid-cols-3",
  },
  broadcastProRoundedPlayerRankingTripleStatsGridTop5: {
    className: "mt-1.5 grid w-full grid-cols-3",
  },
  broadcastProRoundedPlayerRankingTripleStatsPerformances: {
    className: "mt-1.5 grid w-full grid-cols-3 border-t pt-2",
  },
  broadcastProRoundedPlayerRankingStatDividerFeatured: {
    className: "w-full min-w-0 border-l pl-3 sm:pl-4",
  },
  broadcastProRoundedPlayerRankingStatDividerGridTop5: {
    className: "w-full min-w-0 border-l pl-2 sm:pl-3",
  },
  broadcastProRoundedPlayerRankingStatDividerPerformances: {
    className: "w-full min-w-0 border-l pl-2 sm:pl-3",
  },
};

// src/templates/variants/broadcastProRounded/theme/composition/top5.ts
var broadcastProRoundedCompositionComponentStylesTop5 = {
  ...broadcastProRoundedCompositionComponentStylesPlayerRanking,
  Top5PlayerName: {
    className:
      "font-teko text-5xl font-normal uppercase tracking-tight leading-none",
  },
  Top5PlayerTeam: {
    className: "text-2xl font-semibold opacity-80 tracking-wider leading-tight",
  },
  Top5PlayerScore:
    broadcastProRoundedCompositionComponentStylesPlayerRanking.broadcastProRoundedScoreFeatured,
  Top5PlayerScoreSuffix:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedScorePlayerSuffix,
};

// src/templates/variants/broadcastProRounded/theme/composition/performances.ts
var broadcastProRoundedCompositionComponentStylesPerformances = {
  ...broadcastProRoundedCompositionComponentStylesPlayerRanking,
};

// src/templates/variants/broadcastProRounded/theme/composition/upcoming.ts
var broadcastProRoundedCompositionComponentStylesUpcoming = {
  upcomingFixtureHeader: {
    className:
      "font-rajdhani text-2xl font-bold uppercase tracking-wider leading-tight",
  },
  upcomingTeamName: {
    className:
      "font-rajdhani font-bold uppercase !leading-[0.92] tracking-wide",
  },
  upcomingVs:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedMatchupDividerVs,
};

// src/templates/variants/broadcastProRounded/theme/composition/statMatrix.ts
var ranking = broadcastProRoundedCompositionComponentStylesPlayerRanking;
var results = broadcastProRoundedCompositionComponentStylesResults;
var broadcastProRoundedCompositionComponentStylesStatMatrix = {
  broadcastProRoundedStatMatrixLabel:
    ranking.broadcastProRoundedPlayerRankingStatLabel,
  broadcastProRoundedStatMatrixLabelPerformances:
    ranking.broadcastProRoundedPlayerRankingStatLabelPerformances,
  broadcastProRoundedStatMatrixTripleFeatured:
    ranking.broadcastProRoundedPlayerRankingTripleStatsFeatured,
  broadcastProRoundedStatMatrixTripleGrid:
    ranking.broadcastProRoundedPlayerRankingTripleStatsGridTop5,
  broadcastProRoundedStatMatrixTriplePerformances:
    ranking.broadcastProRoundedPlayerRankingTripleStatsPerformances,
  broadcastProRoundedStatMatrixDividerFeatured:
    ranking.broadcastProRoundedPlayerRankingStatDividerFeatured,
  broadcastProRoundedStatMatrixDividerGrid:
    ranking.broadcastProRoundedPlayerRankingStatDividerGridTop5,
  broadcastProRoundedStatMatrixDividerPerformances:
    ranking.broadcastProRoundedPlayerRankingStatDividerPerformances,
  broadcastProRoundedStatMatrixResultGrid:
    results.broadcastProRoundedResultsPlayerStatsGrid,
  broadcastProRoundedStatMatrixResultCell:
    results.broadcastProRoundedResultsPlayerStatCell,
  broadcastProRoundedStatMatrixResultName:
    results.broadcastProRoundedResultsPlayerStatName,
  broadcastProRoundedStatMatrixResultValue:
    results.broadcastProRoundedResultsPlayerStatValue,
};

// src/templates/variants/broadcastProRounded/theme/composition/marker.ts
var broadcastProRoundedCompositionComponentStylesMarker = {
  broadcastProRoundedMarkerChipQualification: {
    className:
      "inline-flex shrink-0 items-center px-4 py-1 text-3xl font-normal uppercase tracking-widest leading-none",
  },
  broadcastProRoundedMarkerChipRank: {
    className:
      "inline-flex shrink-0 items-center px-3 py-1 text-2xl font-bold italic uppercase leading-none",
  },
  broadcastProRoundedMarkerZoneNotchFinals: {
    className: "flex w-full shrink-0 items-center py-1",
  },
  broadcastProRoundedMarkerQualificationFooter: {
    className: "flex shrink-0 justify-end border-t border-white/10 pt-4",
  },
};

// src/templates/variants/broadcastProRounded/theme/composition/index.ts
var broadcastProRoundedCompositionComponentStyles = {
  ...broadcastProRoundedCompositionComponentStylesLadder,
  ...broadcastProRoundedCompositionComponentStylesUpcoming,
  ...broadcastProRoundedCompositionComponentStylesTop5,
  ...broadcastProRoundedCompositionComponentStylesPerformances,
  ...broadcastProRoundedCompositionComponentStylesTeamOfTheWeek,
  ...broadcastProRoundedCompositionComponentStylesResults,
  ...broadcastProRoundedCompositionComponentStylesRoster,
  ...broadcastProRoundedCompositionComponentStylesStatMatrix,
  ...broadcastProRoundedCompositionComponentStylesMarker,
};

// src/templates/variants/broadcastProRounded/theme/layout.ts
var broadcastProRoundedLayout = {
  heights: {
    asset: 1020,
    header: 200,
    footer: 130,
  },
  spacing: {
    section: "space-y-8",
    item: "space-y-4",
    stack: "gap-1",
  },
  padding: {
    container: "p-8",
    section: "py-6",
    item: "py-2",
  },
  borderRadius: {
    container: "rounded-2xl",
    image: "rounded-2xl",
  },
};

// src/templates/variants/broadcastProRounded/theme/mode.ts
var broadcastProRoundedMode = {
  light: {
    container: {
      background: "#fff",
      backgroundAlt: "#f0f0f0",
      backgroundTransparent: "rgba(255, 255, 255, 0.5)",
    },
    text: {
      title: "#000",
      copy: "#000",
    },
  },
  lightAlt: {
    container: {
      background: "#fff",
      backgroundAlt: "#f0f0f0",
      backgroundTransparent: "rgba(255, 255, 255, 0.5)",
    },
    text: {
      title: "#fff",
      copy: "#000",
    },
  },
  dark: {
    container: {
      background: "#000",
      backgroundAlt: "#1a1a1a",
      backgroundTransparent: "rgba(0, 0, 0, 0.5)",
    },
    text: {
      title: "#fff",
      copy: "#fff",
    },
  },
  darkAlt: {
    container: {
      background: "#000",
      backgroundAlt: "#1a1a1a",
      backgroundTransparent: "rgba(0, 0, 0, 0.5)",
    },
    text: {
      title: "#000",
      copy: "#fff",
    },
  },
};

// src/templates/types/broadcast-pro-rounded/headline-lockup.ts
var DEFAULT_BROADCAST_PRO_HEADLINE_SIZING = {
  mainHeaderMaxPx: 80,
  introMaxPx: 140,
  minPx: 44,
  lineHeight: 0.82,
  letterSpacing: "-0.025em",
  fontWeight: 400,
  secondaryWraps: true,
  headerOrgCrestPx: 72,
};

// src/templates/variants/broadcastProRounded/theme/tokens.ts
var broadcastProRoundedTokens = {
  broadcastProRoundedGlassOpacity: "lg",
  broadcastProRoundedHeadlineSizing: {
    ...DEFAULT_BROADCAST_PRO_HEADLINE_SIZING,
  },
  broadcastProRoundedScoreSizing: {
    ...DEFAULT_BROADCAST_PRO_SCORE_SIZING,
  },
  broadcastProRoundedCrestSizing: {
    ...DEFAULT_BROADCAST_PRO_CREST_SIZING,
    rosterHomePx: 64,
    rosterAwayPx: 56,
  },
  broadcastProRoundedLadderZoneSizing: {
    ...DEFAULT_BROADCAST_PRO_LADDER_ZONE_SIZING,
  },
  broadcastProRoundedRosterListSizing: {
    ...DEFAULT_BROADCAST_PRO_ROSTER_LIST_SIZING,
    /** Home team card lives in sidebar (13); list uses full column height. */
    leftColumnHeaderReservePx: 0,
    /** Larger index + name type on glass rows (still capped by row height + player count). */
    minNameFontPx: 15,
    maxNameFontPx: 48,
    minNumberFontPx: 14,
    maxNumberFontPx: 44,
    nameRowHeightMultiplier: 0.52,
    numberRowHeightMultiplier: 0.48,
    nameFontBonusPx: 2,
    listChromeReservePx: 24,
  },
  fonts: {
    title: {
      family: "Teko",
    },
    subtitle: {
      family: "Rajdhani",
    },
    copy: {
      family: "Rajdhani",
    },
  },
  /**
   * Aligns with stitch HTML (`teamRoster.html`): Teko for display/titles; Rajdhani for body/labels.
   * Family strings must match `fontPathMap` / `loadFontsFromTheme` (see `src/core/utils/fonts/fontLoader.ts`).
   */
  fontClasses: {
    heading: { family: "Teko" },
    subheading: { family: "Rajdhani" },
    body: { family: "Rajdhani" },
  },
};

// src/templates/variants/broadcastProRounded/theme/index.ts
var broadcastProRoundedTheme = {
  ...baseTheme,
  ...broadcastProRoundedTokens,
  layout: broadcastProRoundedLayout,
  mode: broadcastProRoundedMode,
  componentStyles: {
    ...broadcastProRoundedComponentStylesShared,
    ...broadcastProRoundedCompositionComponentStyles,
  },
};

// src/templates/variants/broadcastProRounded/components/headline/getBroadcastProRoundedHeaderSecondaryLine.ts
var BROADCAST_PRO_ROUNDED_HEADER_WITHOUT_SECONDARY = /* @__PURE__ */ new Set([
  "CricketResultSingle",
  "CricketResults",
  "CricketUpcoming",
  "CricketLadder",
  "CricketTop5Batting",
  "CricketTop5Bowling",
  "CricketBattingPerformances",
  "CricketBowlingPerformances",
  "CricketTeamOfTheWeek",
]);
var shouldHideBroadcastProRoundedHeaderSecondary = (compositionId) =>
  BROADCAST_PRO_ROUNDED_HEADER_WITHOUT_SECONDARY.has(compositionId);
var getBroadcastProRoundedHeaderSecondaryLine = (metadata, clubName) => {
  var _a, _b, _c;
  const videoTitle =
    (_a = metadata.videoTitle) == null
      ? void 0
      : _a
          .replace(/\bCricketRoster\b/gi, "")
          .replace(/\s+/g, " ")
          .trim();
  if (videoTitle) return videoTitle;
  const parts =
    (_c = (_b = metadata.titleSplit) == null ? void 0 : _b.filter(Boolean)) !=
    null
      ? _c
      : [];
  if (parts.length > 0) return parts.join(" \xB7 ");
  return clubName;
};

// src/templates/variants/broadcastProRounded/components/headline/useBroadcastProRoundedHeadlineFit.ts
import { useMemo } from "react";
import { useVideoConfig } from "remotion";
var MAIN_HEADER_TITLE_PADDING_PX = 32;
var useBroadcastProRoundedHeadlineFit = (text, variant) => {
  var _a, _b, _c, _d;
  const { width } = useVideoConfig();
  const { fontClasses, fonts, broadcastProRoundedHeadlineSizing } =
    useThemeContext();
  const sizing =
    broadcastProRoundedHeadlineSizing != null
      ? broadcastProRoundedHeadlineSizing
      : DEFAULT_BROADCAST_PRO_HEADLINE_SIZING;
  const fontFamily =
    (_d =
      (_c =
        (_a = fontClasses == null ? void 0 : fontClasses.heading) == null
          ? void 0
          : _a.family) != null
        ? _c
        : (_b = fonts == null ? void 0 : fonts.title) == null
          ? void 0
          : _b.family) != null
      ? _d
      : "Teko";
  const maxFontSize =
    variant === "intro" ? sizing.introMaxPx : sizing.mainHeaderMaxPx;
  const withinWidth = useMemo(() => {
    const base = getTitleScreenContentWidth(
      width,
      MAIN_HEADER_TITLE_PADDING_PX,
    );
    return variant === "mainHeader" ? Math.floor(base * 0.95) : base;
  }, [width, variant]);
  return useFittedFontSize({
    text,
    fontFamily,
    fontWeight: sizing.fontWeight,
    textTransform: "uppercase",
    letterSpacing: sizing.letterSpacing,
    maxFontSize,
    minFontSize: sizing.minPx,
    withinWidth,
    horizontalPadding: MAIN_HEADER_TITLE_PADDING_PX,
  });
};

// src/templates/variants/broadcastProRounded/components/headline/BroadcastProRoundedHeadlineTitle.tsx
import { jsx } from "react/jsx-runtime";
var BroadcastProRoundedHeadlineTitle = ({
  text,
  variant,
  letterAnimation = variant === "intro" ? "word" : "none",
  animation,
  exitAnimation,
  exitFrame,
  fontFamily: fontFamilyOverride,
}) => {
  var _a, _b, _c, _d, _e, _f;
  const {
    componentStyles,
    fontClasses,
    fonts,
    broadcastProRoundedHeadlineSizing,
  } = useThemeContext();
  const sizing =
    broadcastProRoundedHeadlineSizing != null
      ? broadcastProRoundedHeadlineSizing
      : DEFAULT_BROADCAST_PRO_HEADLINE_SIZING;
  const fittedSize = useBroadcastProRoundedHeadlineFit(text, variant);
  const fontFamily =
    (_d =
      (_c =
        fontFamilyOverride != null
          ? fontFamilyOverride
          : (_a = fontClasses == null ? void 0 : fontClasses.heading) == null
            ? void 0
            : _a.family) != null
        ? _c
        : (_b = fonts == null ? void 0 : fonts.title) == null
          ? void 0
          : _b.family) != null
      ? _d
      : "Teko";
  const heroClass =
    (_f =
      (_e = componentStyles.broadcastProRoundedHeadlineHero) == null
        ? void 0
        : _e.className) != null
      ? _f
      : "font-teko font-normal uppercase tracking-tight drop-shadow-2xl text-center m-0 w-full max-w-full";
  const maxFontSize =
    variant === "intro" ? sizing.introMaxPx : sizing.mainHeaderMaxPx;
  const fontSize = fittedSize != null ? fittedSize : maxFontSize;
  return /* @__PURE__ */ jsx(AnimatedText, {
    textAlign: "center",
    type: "title",
    variant: resolveBroadcastProRoundedCopyVariant({
      surface: "background",
      role: "title",
    }),
    letterAnimation,
    animation,
    exitAnimation,
    exitFrame,
    fontFamily,
    className: heroClass,
    style: {
      fontFamily: `${fontFamily}, sans-serif`,
      fontWeight: sizing.fontWeight,
      fontSize,
      lineHeight: sizing.lineHeight,
    },
    children: text,
  });
};

// src/templates/variants/broadcastProRounded/components/headline/BroadcastProRoundedHeadlineSecondary.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var BroadcastProRoundedHeadlineSecondary = ({
  text,
  variant,
  animation,
  exitAnimation,
  exitFrame,
  fontFamily: fontFamilyOverride,
}) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const {
    componentStyles,
    fontClasses,
    fonts,
    broadcastProRoundedHeadlineSizing,
  } = useThemeContext();
  const { text: textOnGlass } = useBroadcastProRoundedTheme();
  const wraps =
    (_a =
      broadcastProRoundedHeadlineSizing == null
        ? void 0
        : broadcastProRoundedHeadlineSizing.secondaryWraps) != null
      ? _a
      : DEFAULT_BROADCAST_PRO_HEADLINE_SIZING.secondaryWraps;
  const stayOnOneLine = variant === "mainHeader" || !wraps;
  const secondaryClass = `${(_c = (_b = componentStyles.broadcastProRoundedHeadlineSecondary) == null ? void 0 : _b.className) != null ? _c : "font-rajdhani uppercase tracking-wide font-semibold leading-snug"} ${stayOnOneLine ? "whitespace-nowrap" : "whitespace-normal"}`;
  const subtitleFontFamily =
    (_i =
      (_h =
        (_f =
          fontFamilyOverride != null
            ? fontFamilyOverride
            : (_d = fontClasses == null ? void 0 : fontClasses.subheading) ==
                null
              ? void 0
              : _d.family) != null
          ? _f
          : (_e = fonts == null ? void 0 : fonts.subtitle) == null
            ? void 0
            : _e.family) != null
        ? _h
        : (_g = fonts == null ? void 0 : fonts.copy) == null
          ? void 0
          : _g.family) != null
      ? _i
      : "Rajdhani";
  const textNode =
    variant === "intro"
      ? /* @__PURE__ */ jsx2(AnimatedText, {
          textAlign: "center",
          type: "subtitle",
          variant: resolveBroadcastProRoundedCopyVariant({
            surface: "background",
            role: "title",
          }),
          letterAnimation: "word",
          animation,
          exitAnimation,
          exitFrame,
          fontFamily: subtitleFontFamily,
          className: secondaryClass,
          style: {
            fontFamily: `${subtitleFontFamily}, sans-serif`,
            fontWeight: 600,
          },
          children: text,
        })
      : /* @__PURE__ */ jsx2(AnimatedText, {
          textAlign: "center",
          fontFamily: subtitleFontFamily,
          type: "metadataMedium",
          variant: resolveBroadcastProRoundedCopyVariant({
            surface: "container",
            role: "copy",
          }),
          letterAnimation: "none",
          animation,
          exitAnimation,
          exitFrame,
          className: secondaryClass,
          style: {
            fontFamily: `${subtitleFontFamily}, sans-serif`,
            fontWeight: 600,
            color: textOnGlass.copy,
          },
          children: text,
        });
  if (variant === "mainHeader") {
    return /* @__PURE__ */ jsx2("div", {
      className: "mt-2 flex w-full justify-center",
      children: /* @__PURE__ */ jsx2(BroadcastProRoundedMetadataChip, {
        className: "px-5 py-1",
        children: textNode,
      }),
    });
  }
  return /* @__PURE__ */ jsx2("div", {
    className: stayOnOneLine ? "overflow-hidden" : "w-full",
    children: textNode,
  });
};

// src/templates/variants/broadcastProRounded/components/BroadcastProRoundedIntro.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var BroadcastProRoundedIntro = () => {
  var _a, _b, _c, _d;
  const { club, metadata } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.intro;
  const LogoAnimations = animations.image.intro.logo;
  const { fontClasses, layout } = useThemeContext();
  const imageRadius =
    (_a = layout.borderRadius.image) != null
      ? _a
      : layout.borderRadius.container;
  return /* @__PURE__ */ jsx3(VerticalStackTitleLogoName, {
    alignment: "center",
    Logo: /* @__PURE__ */ jsx3("div", {
      className: `flex h-full w-full max-h-[500px] max-w-[500px] items-center justify-center overflow-hidden py-8 ${imageRadius}`,
      children: /* @__PURE__ */ jsx3(AnimatedImage, {
        src: ((_b = club.logo) == null ? void 0 : _b.url) || "",
        alt: club.name,
        width: "auto",
        height: "auto",
        fit: "contain",
        className: imageRadius,
        animation: LogoAnimations.introIn,
        exitAnimation: LogoAnimations.introOut,
        exitFrame: LogoAnimations.introExitFrame,
      }),
    }),
    Title: /* @__PURE__ */ jsx3(BroadcastProRoundedHeadlineTitle, {
      text: metadata.title,
      variant: "intro",
      letterAnimation: "word",
      animation: TextAnimations.mainTitle,
      exitAnimation: TextAnimations.introOut,
      exitFrame: TextAnimations.introExitFrame,
      fontFamily: (_c = fontClasses.heading) == null ? void 0 : _c.family,
    }),
    Name: /* @__PURE__ */ jsx3(BroadcastProRoundedHeadlineSecondary, {
      text: club.name,
      variant: "intro",
      animation: TextAnimations.clubName,
      exitAnimation: TextAnimations.introOut,
      exitFrame: TextAnimations.introExitFrame,
      fontFamily: (_d = fontClasses.subheading) == null ? void 0 : _d.family,
    }),
    PrimarySponsor: /* @__PURE__ */ jsx3(IntroPrimarySponsors, {
      introIn: LogoAnimations.introIn,
      introOut: LogoAnimations.introOut,
      introExitFrame: LogoAnimations.introExitFrame,
    }),
  });
};

// src/templates/variants/broadcastProRounded/components/BroadcastProRoundedOutro.tsx
import { AbsoluteFill } from "remotion";
import { jsx as jsx4 } from "react/jsx-runtime";
var GRID_SETTINGS = {
  columns: 2,
  rows: 3,
  gap: "0.25rem",
  containerMaxWidth: 1600,
  containerMaxHeight: 900,
  cellMaxSize: 600,
  cellPadding: 16,
  cellAspectRatio: "1 / 1",
  chunkSize: OUTRO_SPONSOR_PAGE_SIZE,
  sequenceDurationInFrames: OUTRO_PAGE_DURATION_FRAMES,
  logoExitFrame: OUTRO_PAGE_LOGO_EXIT_FRAME,
  logoDelayIncrement: OUTRO_PAGE_LOGO_STAGGER_FRAMES,
};
var SponsorGrid = ({ sponsors, LogoAnimations, imageRadius }) =>
  /* @__PURE__ */ jsx4("div", {
    className: "grid justify-center items-center w-full h-full",
    style: {
      gridTemplateColumns: `repeat(${GRID_SETTINGS.columns}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${GRID_SETTINGS.rows}, minmax(0, 1fr))`,
      gap: GRID_SETTINGS.gap,
      maxWidth: GRID_SETTINGS.containerMaxWidth,
      maxHeight: GRID_SETTINGS.containerMaxHeight,
      gridAutoRows: "1fr",
    },
    children: sponsors
      .filter((sponsor) => sponsor.logo && sponsor.logo.url)
      .map((sponsor, idx) => {
        var _a;
        return /* @__PURE__ */ jsx4(
          "div",
          {
            className: `flex h-full w-full items-center justify-center overflow-hidden ${imageRadius}`,
            style: {
              aspectRatio: GRID_SETTINGS.cellAspectRatio,
              maxWidth: GRID_SETTINGS.cellMaxSize,
              maxHeight: GRID_SETTINGS.cellMaxSize,
              padding: GRID_SETTINGS.cellPadding,
            },
            children: /* @__PURE__ */ jsx4(AnimatedImage, {
              src: sponsor.logo.url,
              alt: sponsor.name || "",
              width: "100%",
              height: "100%",
              fit: "contain",
              className: imageRadius,
              animation: LogoAnimations.introIn,
              exitAnimation:
                (_a = LogoAnimations.exitAnimation) != null
                  ? _a
                  : LogoAnimations.introOut,
              animationDelay: idx * GRID_SETTINGS.logoDelayIncrement,
              exitFrame: GRID_SETTINGS.logoExitFrame,
            }),
          },
          `${sponsor.id}_${idx}`,
        );
      }),
  });
var BroadcastProRoundedOutro = ({ doesAccountHaveSponsors }) => {
  var _a, _b, _c;
  const { sponsors } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const { layout } = useThemeContext();
  const LogoAnimations = animations.image.sponsor.logo;
  const imageRadius =
    (_a = layout.borderRadius.image) != null
      ? _a
      : layout.borderRadius.container;
  if (!doesAccountHaveSponsors) {
    return null;
  }
  const sponsorsArray = buildOutroSponsorSequence({
    primary:
      (_b = sponsors == null ? void 0 : sponsors.primary) != null ? _b : [],
    general:
      (_c = sponsors == null ? void 0 : sponsors.general) != null ? _c : [],
  });
  const groups = chunkSponsors(sponsorsArray, GRID_SETTINGS.chunkSize);
  const sequences = groups.map((group) => ({
    content: /* @__PURE__ */ jsx4(AbsoluteFill, {
      className: "flex flex-col justify-center items-center",
      children: /* @__PURE__ */ jsx4(SponsorGrid, {
        sponsors: group,
        LogoAnimations,
        imageRadius,
      }),
    }),
    durationInFrames: GRID_SETTINGS.sequenceDurationInFrames,
  }));
  return /* @__PURE__ */ jsx4(TransitionSeriesWrapper, {
    sequences,
    transitionType: "none",
    timing: { type: "linear", durationInFrames: 1 },
  });
};

// src/templates/variants/broadcastProRounded/components/BroadcastProRoundedBackground.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var isBroadcastProMode = (value) =>
  value === "light" ||
  value === "lightAlt" ||
  value === "dark" ||
  value === "darkAlt";
var BroadcastProRoundedBackground = () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const { video, metadata } = useVideoDataContext();
  const { route } = resolveBackgroundIngress(
    (_a = video.templateVariation) != null ? _a : {},
  );
  if (route.kind === "image") {
    const mode = isBroadcastProMode(
      (_b = video.templateVariation) == null ? void 0 : _b.mode,
    )
      ? video.templateVariation.mode
      : "light";
    const image = (_c = video.templateVariation) == null ? void 0 : _c.image;
    const hero = (_d = video.media) == null ? void 0 : _d.heroImage;
    const stillRatio =
      (hero == null ? void 0 : hero.width) && hero.height
        ? hero.width / hero.height
        : (image == null ? void 0 : image.width) && image.height
          ? image.width / image.height
          : void 0;
    return /* @__PURE__ */ jsx5(ImageBackground, {
      templateDefaults: resolveBroadcastProImageDefaults({
        mode,
        image: image
          ? {
              effectType: (_e = image.type) != null ? _e : void 0,
              overlayStyle: (_f = image.overlayStyle) != null ? _f : void 0,
              overlayOpacity: (_g = image.overlayOpacity) != null ? _g : void 0,
              width: (_h = image.width) != null ? _h : void 0,
              height: (_i = image.height) != null ? _i : void 0,
              ratio:
                image.ratio === "landscape" ||
                image.ratio === "portrait" ||
                image.ratio === "square"
                  ? image.ratio
                  : void 0,
            }
          : void 0,
        stillRatio,
        compositionId: metadata.compositionId,
      }),
    });
  }
  return /* @__PURE__ */ jsx5(SelectTemplateBackground, {});
};

// src/templates/variants/broadcastProRounded/components/BroadcastProRoundedMainHeader.tsx
import { jsx as jsx6 } from "react/jsx-runtime";
var BroadcastProRoundedMainHeader = () => {
  var _a, _b;
  const { layout, broadcastProRoundedHeadlineSizing } = useThemeContext();
  const { heights } = layout;
  const imageRadius =
    (_a = layout.borderRadius.image) != null
      ? _a
      : layout.borderRadius.container;
  const { club, metadata, data } = useVideoDataContext();
  const { animations } = useAnimationContext();
  const TextAnimations = animations.text.main;
  const LogoAnimations = animations.image.main.title.logo;
  const { timings } = data;
  const exitFrame = calculateMainHeaderExitFrame(timings);
  const crestPx =
    (_b =
      broadcastProRoundedHeadlineSizing == null
        ? void 0
        : broadcastProRoundedHeadlineSizing.headerOrgCrestPx) != null
      ? _b
      : DEFAULT_BROADCAST_PRO_HEADLINE_SIZING.headerOrgCrestPx;
  const hideSecondaryLine = shouldHideBroadcastProRoundedHeaderSecondary(
    metadata.compositionId,
  );
  const secondaryLine = hideSecondaryLine
    ? ""
    : getBroadcastProRoundedHeaderSecondaryLine(metadata, club.name);
  const OrgLogo = () => {
    var _a2;
    return /* @__PURE__ */ jsx6("div", {
      className: `mx-auto mb-2 shrink-0 overflow-hidden bg-white p-2 shadow-xl ${imageRadius}`,
      style: { width: crestPx, height: crestPx },
      children: /* @__PURE__ */ jsx6("div", {
        className: `flex h-full w-full min-h-0 min-w-0 items-center justify-center overflow-hidden ${imageRadius}`,
        children: ((_a2 = club.logo) == null ? void 0 : _a2.url)
          ? /* @__PURE__ */ jsx6(AnimatedImage, {
              src: club.logo.url,
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              fit: "contain",
              className: `max-h-full max-w-full object-contain ${imageRadius}`,
              animation: LogoAnimations.introIn,
              exitAnimation: LogoAnimations.introOut,
              exitFrame,
            })
          : null,
      }),
    });
  };
  const titleBlock = /* @__PURE__ */ jsx6(BroadcastProRoundedHeadlineTitle, {
    text: metadata.title,
    variant: "mainHeader",
    letterAnimation: "none",
    animation: TextAnimations.title,
    exitAnimation: TextAnimations.copyOut,
    exitFrame,
  });
  const headerProps = {
    height: heights.header,
    alignment: "center",
    Logo: /* @__PURE__ */ jsx6(OrgLogo, {}),
    Title: titleBlock,
  };
  if (hideSecondaryLine) {
    return /* @__PURE__ */ jsx6(VerticalHeaderLogoTitle, {
      ...headerProps,
      Name: null,
    });
  }
  return /* @__PURE__ */ jsx6(VerticalHeaderLogoTitleName, {
    ...headerProps,
    Name: /* @__PURE__ */ jsx6(BroadcastProRoundedHeadlineSecondary, {
      text: secondaryLine,
      variant: "mainHeader",
      animation: TextAnimations.title,
      exitAnimation: TextAnimations.copyOut,
      exitFrame,
    }),
  });
};

// src/templates/variants/broadcastProRounded/components/BroadcastProRoundedMain.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
var BroadcastProRoundedMain = () => {
  return /* @__PURE__ */ jsx7(OneColumn, {
    Header: BroadcastProRoundedMainHeader,
  });
};

// src/templates/variants/broadcastProRounded/animations.ts
var broadcastGlassAnimations = {
  image: {
    intro: {
      logo: {
        introIn: {
          type: "slideInBottom",
          duration: 18,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
          custom: { distance: 56 },
        },
        introOut: {
          type: "fadeOut",
          duration: 14,
          easing: { type: "out", base: "ease" },
        },
        introExitFrame: 60,
      },
    },
    main: {
      title: {
        logo: {
          introIn: {
            type: "slideInLeft",
            duration: 20,
            delay: 0,
            easing: { type: "inOut", base: "ease" },
            custom: { distance: 64 },
          },
          introOut: {
            type: "fadeOut",
            duration: 14,
            easing: { type: "out", base: "ease" },
          },
        },
      },
      item: {
        logo: {
          itemIn: {
            type: "fadeIn",
            duration: 16,
            delay: 0,
            easing: { type: "inOut", base: "ease" },
          },
          itemOut: {
            type: "fadeOut",
            duration: 12,
            easing: { type: "out", base: "ease" },
          },
        },
      },
    },
    sponsor: {
      logo: {
        introIn: {
          type: "fadeIn",
          duration: 14,
          delay: 0,
          easing: { type: "inOut", base: "ease" },
        },
        introOut: {
          type: "fadeOut",
          duration: 10,
          easing: { type: "out", base: "ease" },
        },
      },
    },
  },
  text: {
    intro: {
      mainTitle: {
        type: "fadeInUp",
        duration: 20,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 28 },
      },
      clubName: {
        type: "fadeInUp",
        duration: 20,
        easing: { type: "inOut", base: "ease" },
        delay: 6,
        custom: { distance: 28 },
      },
      introOut: {
        type: "fadeOut",
        duration: 14,
        easing: { type: "out", base: "ease" },
      },
      introExitFrame: 60,
    },
    main: {
      title: {
        type: "fadeInDown",
        duration: 20,
        easing: { type: "inOut", base: "ease" },
        delay: 0,
        custom: { distance: 28 },
      },
      copyIn: {
        type: "fadeInUp",
        duration: 18,
        easing: { type: "inOut", base: "ease" },
        delay: 4,
        custom: { distance: 16 },
      },
      copyOut: {
        type: "fadeOut",
        duration: 14,
        easing: { type: "out", base: "ease" },
        delay: 0,
      },
    },
    outro: {
      copyIn: {
        type: "fadeInUp",
        duration: 20,
        easing: { type: "inOut", base: "ease" },
        delay: 6,
        custom: { distance: 20 },
      },
      copyOut: {
        type: "fadeOut",
        duration: 14,
        easing: { type: "out", base: "ease" },
        delay: 0,
      },
    },
  },
  container: {
    main: {
      parent: {
        containerIn: {
          type: "none",
        },
        containerOut: {
          type: "none",
        },
      },
      // Match rows / list items: soft rise + mild scale (no hard pop).
      itemContainer: {
        containerIn: {
          type: "scaleIn",
          easing: { type: "out", base: "ease" },
          duration: 20,
          custom: {
            startScale: 0.96,
          },
        },
        containerOut: {
          type: "fadeOut",
          easing: { type: "out", base: "ease" },
          duration: 14,
        },
      },
      itemContainerOuter: {
        containerIn: {
          type: "fadeIn",
          easing: { type: "inOut", base: "ease" },
          duration: 22,
        },
        containerOut: {
          type: "fadeOut",
          easing: { type: "out", base: "ease" },
          duration: 16,
        },
      },
      itemContainerInner: {
        containerIn: {
          type: "fadeIn",
          easing: { type: "inOut", base: "ease" },
          duration: 18,
        },
        containerOut: {
          type: "fadeOut",
          easing: { type: "out", base: "ease" },
          duration: 14,
        },
      },
      itemContainerSecondary: {
        containerIn: {
          type: "fadeIn",
          easing: { type: "inOut", base: "ease" },
          duration: 18,
        },
        containerOut: {
          type: "fadeOut",
          easing: { type: "out", base: "ease" },
          duration: 14,
        },
      },
    },
  },
  transition: {
    Main: {
      type: "fade",
      direction: "from-right",
      durationInFrames: 15,
    },
  },
};
var templateAnimations = broadcastGlassAnimations;

// src/templates/variants/broadcastProRounded/index.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
var BroadcastProRounded = ({ data }) => {
  return /* @__PURE__ */ jsx8(BaseTemplate, {
    data,
    settings: broadcastProRoundedTheme,
    introComponent: BroadcastProRoundedIntro,
    outroComponent: BroadcastProRoundedOutro,
    backgroundComponent: BroadcastProRoundedBackground,
    mainComponentLayout: BroadcastProRoundedMain,
    animations: templateAnimations,
  });
};
export { BroadcastProRounded };
//# sourceMappingURL=broadcastProRounded-LKA5ZHQ3.mjs.map

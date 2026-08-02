import type { ThemeComponentStyles } from "../../../types/TemplateThemeConfig";

const broadcastProRoundedScoreMatchTotal = {
  className: "font-teko text-5xl font-normal tracking-tight leading-none",
};

const broadcastProRoundedScoreMatchInnings = {
  className:
    "font-teko text-xl font-normal tracking-tight leading-none opacity-80",
};

const broadcastProRoundedScoreMatchYetToBat = {
  className: "font-teko text-2xl font-normal tracking-wider leading-none py-2",
};

const broadcastProRoundedScorePlayerPrimary = {
  className: "font-teko text-base font-bold tracking-tight leading-tight",
};

const broadcastProRoundedScorePlayerSuffix = {
  className:
    "font-teko text-sm font-normal tracking-tight leading-tight opacity-70",
};

const broadcastProRoundedScoreTableRank = {
  className:
    "font-teko text-5xl font-normal tracking-tight leading-none uppercase",
};

const broadcastProRoundedScoreTableStat = {
  className: "font-teko text-4xl font-normal tracking-tight leading-none",
};

const broadcastProRoundedScoreTablePoints = {
  className:
    "font-teko text-5xl font-bold tracking-tight leading-none text-center",
};

const broadcastProRoundedScoreFeatured = {
  className: "font-teko text-7xl font-semibold tracking-tight leading-none",
};

const broadcastProRoundedScoreGrid = {
  className: "font-teko text-4xl font-semibold tracking-tight leading-none",
};

const broadcastProRoundedScorePerformances = {
  className: "font-teko text-6xl font-semibold tracking-tight leading-none",
};

const broadcastProRoundedScoreCompact = {
  className: "font-teko text-xl font-semibold tracking-tight leading-none",
};

const broadcastProRoundedScoreDivider = {
  className:
    "font-teko text-4xl font-bold italic uppercase tracking-tight leading-none",
};

const broadcastProRoundedScoreRosterIndex = {
  className:
    "font-teko font-normal uppercase leading-none tabular-nums tracking-tight",
};

const broadcastProRoundedVerdictBandHero = {
  className: "flex flex-col items-center justify-center gap-1 px-8 py-4",
};

const broadcastProRoundedVerdictBandCompact = {
  className: "flex items-center justify-center px-6 py-3",
};

const broadcastProRoundedVerdictBandAbandoned = {
  className: "flex flex-col items-center justify-center gap-1 px-6 py-3",
};

const broadcastProRoundedVerdictWinner = {
  className:
    "font-teko text-5xl font-normal uppercase tracking-tight leading-none text-center",
};

const broadcastProRoundedVerdictContext = {
  className:
    "font-rajdhani text-xl font-semibold uppercase tracking-[0.2em] leading-snug text-center",
};

const broadcastProRoundedVerdictLine = {
  className:
    "font-rajdhani text-2xl font-semibold italic tracking-wider leading-snug text-center",
};

const broadcastProRoundedVerdictStatus = {
  className:
    "font-rajdhani text-sm font-bold uppercase tracking-widest leading-snug",
};

const broadcastProRoundedVerdictFixtureResult = {
  className:
    "font-rajdhani text-3xl font-normal italic text-center tracking-wider leading-snug",
};

const broadcastProRoundedCrestWellCompact = {
  className:
    "flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl",
};

const broadcastProRoundedCrestWellRow = {
  className:
    "flex flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl",
};

const broadcastProRoundedCrestWellFixture = {
  className:
    "flex flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl",
};

const broadcastProRoundedCrestWellGrid = {
  className:
    "flex h-20 w-20 shrink-0 items-center justify-center self-center overflow-hidden rounded-2xl shadow-inner sm:h-24 sm:w-24",
};

const broadcastProRoundedCrestWellFeatured = {
  className:
    "flex h-44 w-44 shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-inner",
};

const broadcastProRoundedCrestWellRosterHome = {
  className:
    "mb-4 flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl",
};

const broadcastProRoundedCrestWellRosterAway = {
  className:
    "mb-3 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl",
};

const broadcastProRoundedMatchupFixture = {
  className:
    "flex w-full min-w-0 flex-shrink-0 items-center justify-between gap-8 md:gap-10",
};

const broadcastProRoundedMatchupResultStack = {
  className: "flex w-full flex-col gap-1",
};

const broadcastProRoundedMatchupRosterSidebar = {
  className: "flex shrink-0 flex-col gap-4",
};

const broadcastProRoundedMatchupSideFixtureHome = {
  className: "flex min-w-0 flex-1 items-center gap-8",
};

const broadcastProRoundedMatchupSideFixtureAway = {
  className: "flex min-w-0 flex-1 items-center justify-end gap-8 text-right",
};

const broadcastProRoundedMatchupRoleLabel = {
  className: "text-sm font-bold uppercase tracking-widest opacity-80",
};

const broadcastProRoundedMatchupDividerSlot = {
  className: "flex flex-shrink-0 items-center justify-center px-8 md:px-10",
};

const broadcastProRoundedMatchupDividerVersus = {
  className: "font-teko mb-1.5 text-2xl italic sm:text-3xl",
};

const broadcastProRoundedMatchupFixtureTeamName = {
  className: "font-normal uppercase leading-none tracking-wide",
};

const broadcastProRoundedLadderZoneRankLeader = {
  className: "flex w-20 flex-shrink-0 items-center justify-center",
};

const broadcastProRoundedLadderZoneRankDefault = {
  className: "flex w-20 flex-shrink-0 items-center justify-center",
};

/**
 * Cross-cutting typography and metadata classes (not tied to a single cricket composition).
 */
export const broadcastProRoundedComponentStylesShared = {
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
      "font-rajdhani uppercase tracking-[0.2em] font-semibold whitespace-nowrap",
  },

  broadcastProRoundedHeadlineSection: {
    className:
      "font-teko text-2xl font-normal uppercase tracking-widest leading-none",
  },

  bodyText: {
    className: "text-xl font-normal tracking-normal leading-relaxed",
  },

  playerName: {
    className: "text-3xl font-black tracking-tight leading-tight",
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
    className: "text-4xl font-black tracking-tight leading-tight",
  },

  label: {
    className: "text-lg font-medium tracking-normal leading-snug",
  },

  metadataSmall: {
    className: "text-2xl font-normal  tracking-wider leading-snug",
  },
  metadataMedium: {
    className: "text-2xl font-semibold  tracking-wider leading-snug",
  },
  metadataLarge: {
    className: "text-2xl font-semibold  tracking-widest leading-snug",
  },
} satisfies Pick<
  ThemeComponentStyles,
  | "title"
  | "titleSmall"
  | "subtitle"
  | "broadcastProRoundedHeadlineHero"
  | "broadcastProRoundedHeadlineSecondary"
  | "broadcastProRoundedHeadlineSection"
  | "bodyText"
  | "playerName"
  | "score"
  | "broadcastProRoundedScoreMatchTotal"
  | "broadcastProRoundedScoreMatchInnings"
  | "broadcastProRoundedScoreMatchYetToBat"
  | "broadcastProRoundedScorePlayerPrimary"
  | "broadcastProRoundedScorePlayerSuffix"
  | "broadcastProRoundedScoreTableRank"
  | "broadcastProRoundedScoreTableStat"
  | "broadcastProRoundedScoreTablePoints"
  | "broadcastProRoundedScoreFeatured"
  | "broadcastProRoundedScoreGrid"
  | "broadcastProRoundedScorePerformances"
  | "broadcastProRoundedScoreCompact"
  | "broadcastProRoundedScoreDivider"
  | "broadcastProRoundedScoreRosterIndex"
  | "broadcastProRoundedVerdictBandHero"
  | "broadcastProRoundedVerdictBandCompact"
  | "broadcastProRoundedVerdictBandAbandoned"
  | "broadcastProRoundedVerdictWinner"
  | "broadcastProRoundedVerdictContext"
  | "broadcastProRoundedVerdictLine"
  | "broadcastProRoundedVerdictStatus"
  | "broadcastProRoundedVerdictFixtureResult"
  | "broadcastProRoundedCrestWellCompact"
  | "broadcastProRoundedCrestWellRow"
  | "broadcastProRoundedCrestWellFixture"
  | "broadcastProRoundedCrestWellGrid"
  | "broadcastProRoundedCrestWellFeatured"
  | "broadcastProRoundedCrestWellRosterHome"
  | "broadcastProRoundedCrestWellRosterAway"
  | "broadcastProRoundedMatchupFixture"
  | "broadcastProRoundedMatchupResultStack"
  | "broadcastProRoundedMatchupRosterSidebar"
  | "broadcastProRoundedMatchupSideFixtureHome"
  | "broadcastProRoundedMatchupSideFixtureAway"
  | "broadcastProRoundedMatchupRoleLabel"
  | "broadcastProRoundedMatchupDividerSlot"
  | "broadcastProRoundedMatchupDividerVs"
  | "broadcastProRoundedMatchupDividerVersus"
  | "broadcastProRoundedMatchupFixtureTeamName"
  | "broadcastProRoundedLadderZoneRankLeader"
  | "broadcastProRoundedLadderZoneRankDefault"
  | "teamName"
  | "label"
  | "metadataSmall"
  | "metadataMedium"
  | "metadataLarge"
>;

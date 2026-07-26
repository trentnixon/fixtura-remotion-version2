import type { ThemeComponentStyles } from "../../../types/TemplateThemeConfig";

const broadcastProScoreMatchTotal = {
  className: "font-teko text-5xl font-normal tracking-tight leading-none",
};

const broadcastProScoreMatchInnings = {
  className: "font-teko text-xl font-normal tracking-tight leading-none opacity-80",
};

const broadcastProScoreMatchYetToBat = {
  className: "font-teko text-2xl font-normal tracking-wider leading-none py-2",
};

const broadcastProScorePlayerPrimary = {
  className: "font-teko text-base font-bold tracking-tight leading-tight",
};

const broadcastProScorePlayerSuffix = {
  className: "font-teko text-sm font-normal tracking-tight leading-tight opacity-70",
};

const broadcastProScoreTableRank = {
  className: "font-teko text-5xl font-normal tracking-tight leading-none uppercase",
};

const broadcastProScoreTableStat = {
  className: "font-teko text-4xl font-normal tracking-tight leading-none",
};

const broadcastProScoreTablePoints = {
  className: "font-teko text-5xl font-bold tracking-tight leading-none text-center",
};

const broadcastProScoreFeatured = {
  className: "font-teko text-7xl font-semibold tracking-tight leading-none",
};

const broadcastProScoreGrid = {
  className: "font-teko text-4xl font-semibold tracking-tight leading-none",
};

const broadcastProScoreCompact = {
  className: "font-teko text-xl font-semibold tracking-tight leading-none",
};

const broadcastProScoreDivider = {
  className: "font-teko text-4xl font-bold italic uppercase tracking-tight leading-none",
};

const broadcastProScoreRosterIndex = {
  className:
    "font-teko font-normal uppercase leading-none tabular-nums tracking-tight",
};

const broadcastProVerdictBandHero = {
  className: "flex flex-col items-center justify-center gap-1 px-8 py-4",
};

const broadcastProVerdictBandCompact = {
  className: "flex items-center justify-center px-6 py-3",
};

const broadcastProVerdictBandAbandoned = {
  className: "flex flex-col items-center justify-center gap-1 px-6 py-3",
};

const broadcastProVerdictWinner = {
  className:
    "font-teko text-5xl font-normal uppercase tracking-tight leading-none text-center",
};

const broadcastProVerdictContext = {
  className:
    "font-rajdhani text-xl font-semibold uppercase tracking-[0.2em] leading-snug text-center",
};

const broadcastProVerdictLine = {
  className:
    "font-rajdhani text-2xl font-semibold italic tracking-wider leading-snug text-center",
};

const broadcastProVerdictStatus = {
  className:
    "font-rajdhani text-sm font-bold uppercase tracking-widest leading-snug",
};

const broadcastProVerdictFixtureResult = {
  className:
    "font-rajdhani text-3xl font-normal italic text-center tracking-wider leading-snug",
};

const broadcastProCrestWellCompact = {
  className:
    "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm",
};

const broadcastProCrestWellRow = {
  className: "flex flex-shrink-0 items-center justify-center",
};

const broadcastProCrestWellFixture = {
  className: "flex flex-shrink-0 items-center justify-center rounded-sm",
};

const broadcastProCrestWellGrid = {
  className:
    "flex h-20 w-20 shrink-0 items-center justify-center self-center shadow-inner sm:h-24 sm:w-24",
};

const broadcastProCrestWellFeatured = {
  className: "flex h-44 w-44 shrink-0 items-center justify-center shadow-inner",
};

const broadcastProCrestWellRosterHome = {
  className: "mb-4 flex h-32 w-32 items-center justify-center",
};

const broadcastProCrestWellRosterAway = {
  className: "mb-3 flex h-24 w-24 items-center justify-center",
};

const broadcastProMatchupFixture = {
  className:
    "flex w-full min-w-0 flex-shrink-0 items-center justify-between gap-8 md:gap-10",
};

const broadcastProMatchupResultStack = {
  className: "flex w-full flex-col gap-[3px]",
};

const broadcastProMatchupRosterSidebar = {
  className: "flex flex-col gap-4",
};

const broadcastProMatchupSideFixtureHome = {
  className: "flex min-w-0 flex-1 items-center gap-8",
};

const broadcastProMatchupSideFixtureAway = {
  className:
    "flex min-w-0 flex-1 items-center justify-end gap-8 text-right",
};

const broadcastProMatchupRoleLabel = {
  className: "text-sm font-bold uppercase tracking-widest opacity-80",
};

const broadcastProMatchupDividerSlot = {
  className: "flex flex-shrink-0 items-center justify-center px-8 md:px-10",
};

const broadcastProMatchupDividerVersus = {
  className: "font-teko mb-1.5 text-2xl italic sm:text-3xl",
};

const broadcastProMatchupFixtureTeamName = {
  className: "font-normal uppercase leading-none tracking-wide",
};

const broadcastProLadderZoneRankLeader = {
  className: "flex w-20 flex-shrink-0 items-center justify-center",
};

const broadcastProLadderZoneRankDefault = {
  className: "flex w-20 flex-shrink-0 items-center justify-center",
};

/**
 * Cross-cutting typography and metadata classes (not tied to a single cricket composition).
 */
export const broadcastProComponentStylesShared = {
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

  broadcastProHeadlineHero: {
    className:
      "font-teko font-normal uppercase tracking-tight drop-shadow-2xl text-center m-0 w-full max-w-full",
  },

  broadcastProHeadlineSecondary: {
    className:
      "font-rajdhani uppercase tracking-[0.2em] font-semibold whitespace-nowrap",
  },

  broadcastProHeadlineSection: {
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
  score: broadcastProScoreMatchTotal,

  broadcastProScoreMatchTotal,
  broadcastProScoreMatchInnings,
  broadcastProScoreMatchYetToBat,
  broadcastProScorePlayerPrimary,
  broadcastProScorePlayerSuffix,
  broadcastProScoreTableRank,
  broadcastProScoreTableStat,
  broadcastProScoreTablePoints,
  broadcastProScoreFeatured,
  broadcastProScoreGrid,
  broadcastProScoreCompact,
  broadcastProScoreDivider,
  broadcastProScoreRosterIndex,

  broadcastProVerdictBandHero,
  broadcastProVerdictBandCompact,
  broadcastProVerdictBandAbandoned,
  broadcastProVerdictWinner,
  broadcastProVerdictContext,
  broadcastProVerdictLine,
  broadcastProVerdictStatus,
  broadcastProVerdictFixtureResult,

  broadcastProCrestWellCompact,
  broadcastProCrestWellRow,
  broadcastProCrestWellFixture,
  broadcastProCrestWellGrid,
  broadcastProCrestWellFeatured,
  broadcastProCrestWellRosterHome,
  broadcastProCrestWellRosterAway,

  broadcastProMatchupFixture,
  broadcastProMatchupResultStack,
  broadcastProMatchupRosterSidebar,
  broadcastProMatchupSideFixtureHome,
  broadcastProMatchupSideFixtureAway,
  broadcastProMatchupRoleLabel,
  broadcastProMatchupDividerSlot,
  broadcastProMatchupDividerVs: broadcastProScoreDivider,
  broadcastProMatchupDividerVersus,
  broadcastProMatchupFixtureTeamName,

  broadcastProLadderZoneRankLeader,
  broadcastProLadderZoneRankDefault,

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
  | "broadcastProHeadlineHero"
  | "broadcastProHeadlineSecondary"
  | "broadcastProHeadlineSection"
  | "bodyText"
  | "playerName"
  | "score"
  | "broadcastProScoreMatchTotal"
  | "broadcastProScoreMatchInnings"
  | "broadcastProScoreMatchYetToBat"
  | "broadcastProScorePlayerPrimary"
  | "broadcastProScorePlayerSuffix"
  | "broadcastProScoreTableRank"
  | "broadcastProScoreTableStat"
  | "broadcastProScoreTablePoints"
  | "broadcastProScoreFeatured"
  | "broadcastProScoreGrid"
  | "broadcastProScoreCompact"
  | "broadcastProScoreDivider"
  | "broadcastProScoreRosterIndex"
  | "broadcastProVerdictBandHero"
  | "broadcastProVerdictBandCompact"
  | "broadcastProVerdictBandAbandoned"
  | "broadcastProVerdictWinner"
  | "broadcastProVerdictContext"
  | "broadcastProVerdictLine"
  | "broadcastProVerdictStatus"
  | "broadcastProVerdictFixtureResult"
  | "broadcastProCrestWellCompact"
  | "broadcastProCrestWellRow"
  | "broadcastProCrestWellFixture"
  | "broadcastProCrestWellGrid"
  | "broadcastProCrestWellFeatured"
  | "broadcastProCrestWellRosterHome"
  | "broadcastProCrestWellRosterAway"
  | "broadcastProMatchupFixture"
  | "broadcastProMatchupResultStack"
  | "broadcastProMatchupRosterSidebar"
  | "broadcastProMatchupSideFixtureHome"
  | "broadcastProMatchupSideFixtureAway"
  | "broadcastProMatchupRoleLabel"
  | "broadcastProMatchupDividerSlot"
  | "broadcastProMatchupDividerVs"
  | "broadcastProMatchupDividerVersus"
  | "broadcastProMatchupFixtureTeamName"
  | "broadcastProLadderZoneRankLeader"
  | "broadcastProLadderZoneRankDefault"
  | "teamName"
  | "label"
  | "metadataSmall"
  | "metadataMedium"
  | "metadataLarge"
>;

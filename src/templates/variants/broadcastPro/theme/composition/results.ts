import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProComponentStylesShared } from "../componentStyles.shared";

export const broadcastProCompositionComponentStylesResults = {
  ResultScore: broadcastProComponentStylesShared.broadcastProScoreMatchTotal,
  ResultScoreFirstInnings:
    broadcastProComponentStylesShared.broadcastProScoreMatchInnings,
  ResultScoreYetToBat:
    broadcastProComponentStylesShared.broadcastProScoreMatchYetToBat,
  ResultTeamName: {
    className: "text-4xl font-normal uppercase tracking-wide leading-none",
  },
  ResultPlayerName: {
    className: "text-lg font-semibold leading-tight opacity-70",
  },
  ResultPlayerScore: {
    className: "font-teko text-xl font-bold tracking-tight leading-tight",
  },
  ResultSyntax: {
    className: "text-2xl font-semibold tracking-wider leading-snug py-4 ml-4",
  },
  ResultFixtureResult:
    broadcastProComponentStylesShared.broadcastProVerdictFixtureResult,
  ResultMetaData: {
    className: "text-sm font-bold uppercase tracking-widest leading-snug",
  },
  ResultStatementShort:
    broadcastProComponentStylesShared.broadcastProVerdictLine,
  ResultStatementText: {
    className: "text-2xl font-semibold tracking-wider leading-snug",
  },
  ResultVS: broadcastProComponentStylesShared.broadcastProScoreDivider,
  broadcastProResultsMetaStrip: {
    className:
      "flex w-full flex-shrink-0 items-center justify-between px-4 py-1.5",
  },
  broadcastProResultsTeamRow: {
    className: "flex w-full items-center justify-between gap-3 p-3",
  },
  broadcastProResultsTeamLogoWell:
    broadcastProComponentStylesShared.broadcastProCrestWellCompact,
  broadcastProResultsTeamName: {
    className: "min-w-0 truncate",
  },
  broadcastProResultsScoreBadge: {
    className: "flex flex-shrink-0 flex-col items-end px-4 py-1.5",
  },
  broadcastProResultsPlayerStatsGrid: {
    className: "grid grid-cols-3 gap-[2px]",
  },
  broadcastProResultsPlayerStatCell: {
    className: "flex items-center justify-between px-3 py-2",
  },
  broadcastProResultsPlayerStatName: {
    className: "min-w-0 truncate",
  },
  broadcastProResultsPlayerStatValue: {
    className: "flex-shrink-0",
  },
  broadcastProResultsMatchBlock:
    broadcastProComponentStylesShared.broadcastProMatchupResultStack,
  broadcastProResultsMatchupStack:
    broadcastProComponentStylesShared.broadcastProMatchupResultStack,
  broadcastProResultsStatusBand:
    broadcastProComponentStylesShared.broadcastProVerdictBandAbandoned,
  broadcastProResultsStatementBand:
    broadcastProComponentStylesShared.broadcastProVerdictBandCompact,
} satisfies Pick<
  ThemeComponentStyles,
  | "ResultScore"
  | "ResultScoreFirstInnings"
  | "ResultScoreYetToBat"
  | "ResultTeamName"
  | "ResultPlayerName"
  | "ResultPlayerScore"
  | "ResultSyntax"
  | "ResultFixtureResult"
  | "ResultMetaData"
  | "ResultStatementShort"
  | "ResultStatementText"
  | "ResultVS"
  | "broadcastProResultsMetaStrip"
  | "broadcastProResultsTeamRow"
  | "broadcastProResultsTeamLogoWell"
  | "broadcastProResultsTeamName"
  | "broadcastProResultsScoreBadge"
  | "broadcastProResultsPlayerStatsGrid"
  | "broadcastProResultsPlayerStatCell"
  | "broadcastProResultsPlayerStatName"
  | "broadcastProResultsPlayerStatValue"
  | "broadcastProResultsMatchBlock"
  | "broadcastProResultsMatchupStack"
  | "broadcastProResultsStatusBand"
  | "broadcastProResultsStatementBand"
>;

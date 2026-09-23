import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";
import { broadcastProRoundedComponentStylesShared } from "../componentStyles.shared";

export const broadcastProRoundedCompositionComponentStylesResults = {
  ResultScore:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedScoreMatchTotal,
  ResultScoreFirstInnings:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedScoreMatchInnings,
  ResultScoreYetToBat:
    broadcastProRoundedComponentStylesShared.broadcastProRoundedScoreMatchYetToBat,
  ResultTeamName: {
    className:
      "font-rajdhani text-4xl font-normal uppercase tracking-wide leading-none",
  },
  ResultPlayerName: {
    className: "font-rajdhani text-2xl font-normal leading-tight",
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
  | "broadcastProRoundedResultsMetaStrip"
  | "broadcastProRoundedResultsTeamRow"
  | "broadcastProRoundedResultsTeamLogoWell"
  | "broadcastProRoundedResultsTeamName"
  | "broadcastProRoundedResultsScoreBadge"
  | "broadcastProRoundedResultsPlayerStatsGrid"
  | "broadcastProRoundedResultsPlayerStatCell"
  | "broadcastProRoundedResultsPlayerStatName"
  | "broadcastProRoundedResultsPlayerStatValue"
  | "broadcastProRoundedResultsMatchBlock"
  | "broadcastProRoundedResultsMatchupStack"
  | "broadcastProRoundedResultsStatusBand"
  | "broadcastProRoundedResultsStatementBand"
>;

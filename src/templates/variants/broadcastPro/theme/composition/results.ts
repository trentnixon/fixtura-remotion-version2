import type { ThemeComponentStyles } from "../../../../types/TemplateThemeConfig";

export const broadcastProCompositionComponentStylesResults = {
  ResultScore: {
    className: "text-7xl font-bold  tracking-normal leading-tight ",
  },
  ResultScoreFirstInnings: {
    className: "text-3xl font-bold  tracking-normal leading-tight ",
  },
  ResultScoreYetToBat: {
    className: "text-3xl font-bold  tracking-wider py-6",
  },
  ResultTeamName: {
    className: "text-2xl font-semibold  tracking-wider leading-snug",
  },
  ResultPlayerName: {
    className: "text-2xl font-semibold  tracking-wider leading-snug",
  },
  ResultPlayerScore: {
    className: "text-2xl font-semibold  tracking-wider leading-snug",
  },
  ResultSyntax: {
    className: "text-2xl font-semibold  tracking-wider leading-snug py-4 ml-4",
  },
  ResultFixtureResult: {
    className:
      "text-4xl font-normal text-center  tracking-wider leading-snug italic",
  },
  ResultMetaData: {
    className: "text-xl font-semibold  tracking-wider leading-snug",
  },
  ResultStatementShort: {
    className: "text-3xl font-semibold  tracking-wider leading-snug py-2 px-16",
  },
  ResultStatementText: {
    className: "text-3xl font-semibold  tracking-wider leading-snug ",
  },
  ResultVS: {
    className: "text-2xl font-semibold  tracking-wider leading-snug",
  },
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
>;

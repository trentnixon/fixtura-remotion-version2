import type { ComponentStyle } from "./component-style";

/**
 * Component style keys shared across templates (not template-variant–specific).
 * Template packs (e.g. Broadcast Pro) extend via intersection — see `ThemeComponentStyles`.
 */
export interface GlobalThemeComponentStyles {
  title: ComponentStyle;
  titleSmall: ComponentStyle;
  subtitle: ComponentStyle;
  compositionName?: ComponentStyle;
  /** Smaller variant for composition name (e.g. in headers) */
  compositionNameSmall?: ComponentStyle;
  bodyText: ComponentStyle;
  playerName: ComponentStyle;
  score: ComponentStyle;
  teamName: ComponentStyle;
  label: ComponentStyle;
  ladderGradeLabel: ComponentStyle;
  ladderTeamName: ComponentStyle;
  ladderTeamPoints: ComponentStyle;
  Top5PlayerName: ComponentStyle;
  Top5PlayerTeam: ComponentStyle;
  Top5PlayerScore: ComponentStyle;
  Top5PlayerScoreSuffix: ComponentStyle;
  TeamOfTheWeekPlayerName: ComponentStyle;
  TeamOfTheWeekTeam: ComponentStyle;
  TeamOfTheWeekType: ComponentStyle;
  TeamOfTheWeekStat: ComponentStyle;
  ResultScore: ComponentStyle;
  ResultScoreFirstInnings: ComponentStyle;
  ResultVS: ComponentStyle;
  ResultScoreYetToBat: ComponentStyle;
  ResultTeamName: ComponentStyle;
  ResultPlayerName: ComponentStyle;
  ResultPlayerScore: ComponentStyle;
  ResultSyntax: ComponentStyle;
  ResultFixtureResult: ComponentStyle;
  ResultMetaData: ComponentStyle;
  ResultStatementShort: ComponentStyle;
  ResultStatementText: ComponentStyle;
  RosterPlayerName: ComponentStyle;
  metadataSmall: ComponentStyle;
  metadataMedium: ComponentStyle;
  metadataLarge: ComponentStyle;
}

import type {
  ResultSummary,
  Team,
  TeamLogo,
} from "../../../results/_types/types";

export interface BroadcastProResultStatItem {
  playerName: string;
  statValue: string;
  /** When true, stat value uses semantic accent colour (e.g. bowling figures). */
  highlight?: boolean;
}

/** Minimal match shape shared by Results list and Result Single BroadcastPro cards. */
export interface BroadcastProResultMatchData {
  type: string;
  round: string;
  gradeName: string;
  ground: string;
  status: string;
  result: string;
  resultShort?: string;
  resultSummary?: ResultSummary;
  homeTeam: Team;
  awayTeam: Team;
  teamHomeLogo: TeamLogo;
  teamAwayLogo: TeamLogo;
}

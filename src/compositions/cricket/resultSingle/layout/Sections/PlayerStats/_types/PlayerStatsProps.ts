import {
  Team,
  MatchResult,
  BattingPerformance,
  BowlingPerformance,
} from "../../../../types";

// Common player stat type used across components
export type PlayerStat = {
  player: string;
  runs: number;
  balls?: number;
  notOut?: boolean;
  wickets?: number;
  overs?: number;
};

// Props for standard player stats components (two teams)
export interface PlayerStatsProps {
  homeTeam: Team;
  awayTeam: Team;
  height: number;
  delay: number;
  maxPlayersPerStat?: number;
  matchType?: string;
  matchStatus?: string;
}

// Props for club-only player stats component
export interface PlayerStatsClubOnlyProps {
  match: MatchResult;
  height: number;
  delay: number;
  maxPlayersPerStat?: number;
  matchType?: string;
  matchStatus?: string;
}

// Props for single team player stats component
export interface PlayerStatsSingleTeamProps {
  Team: Team;
  height: number;
  delay: number;
  maxPlayersPerStat?: number;
}

// Props for stat item component
export interface StatItemProps {
  playerName: string;
  statValue: string;
  delay: number;
  index: number;
  textColor?: string;
  backgroundColor?: string;
  outerContainer?: object;
  innerContainer?: object;
}

// Props for stat section component
// Note: players can be PlayerStat[], BattingPerformance[], or BowlingPerformance[]
// All three types have compatible properties (player, runs, etc.)
export interface StatSectionProps {
  players: PlayerStat[] | BattingPerformance[] | BowlingPerformance[];
  isBatting: boolean;
  delay: number;
  backgroundColor?: string;
  textColor?: string;
  outerContainer?: object;
  innerContainer?: object;
}

// Props for team stats component
export interface TeamStatsProps {
  team: Team;
  delay: number;
  maxPlayersPerStat: number;
  className?: string;
  showBatting?: boolean;
  showBowling?: boolean;
}

import { AssignSponsors } from "../composition-types";

// Types for cricket match results
export interface TeamLogo {
  url: string;
  width: number;
  height: number;
}

export interface BattingPerformance {
  SR: number;
  runs: number;
  team: string;
  balls: number;
  fours: number;
  sixes: number;
  notOut: boolean;
  player: string;
}

export interface BowlingPerformance {
  runs: number;
  team: string;
  overs: number;
  player: string;
  economy: string;
  maidens: number;
  wickets: number;
}

export interface Team {
  logo: TeamLogo;
  name: string;
  overs: string | null;
  score: string;
  isHome: boolean;
  isClubTeam: boolean;
  battingPerformances: BattingPerformance[];
  bowlingPerformances: BowlingPerformance[];
  homeScoresFirstInnings?: string | null;
  awayScoresFirstInnings?: string | null;
}

export interface MatchResult {
  date: string;
  type: string;
  round: string;
  gameID: string;
  gender: string;
  ground: string;
  prompt: string;
  result: string;
  status: string;
  ageGroup: string;
  awayTeam: Team;
  homeTeam: Team;
  gradeName: string;
  teamAwayLogo: TeamLogo;
  teamHomeLogo: TeamLogo;
  assignSponsors: AssignSponsors;
}

// Constants for animation timing and other configuration
export const RESULT_HEADER_ANIMATION_DURATION = 45; // 1.5 seconds for header animation
export const RESULT_STAGGER_DELAY = 15; // 0.5 seconds stagger between items
export const RESULT_ANIMATION_DURATION = 30; // 1 second for animation

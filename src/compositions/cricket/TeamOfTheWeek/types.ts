// Types for Team of the Week data structure

// Team logo information
export interface TeamLogo {
  url: string;
  width: number;
  height: number;
}

// Club information
export interface Club {
  name: string;
  logo: TeamLogo;
}

// Category detail information
export interface CategoryDetail {
  type: "Batter" | "Bowler" | "All-Rounder" | "Twelfth Man";
  position:
    | "topscorer"
    | "higheststrikerate"
    | "mostwickets"
    | "besteconomy"
    | "topallrounder"
    | "bestoftherest";
}

// Batting statistics
export interface BattingStats {
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  notOut: boolean;
  team: string;
}

// Bowling statistics
export interface BowlingStats {
  wickets: number;
  overs: number;
  maidens: number;
  runs: number; // Runs conceded
  economy: number;
  team: string;
}

// All-rounder statistics
export interface AllRounderStats {
  score: number;
  formula: string; // e.g., "runs × wickets"
  battingContribution: number;
  bowlingContribution: number;
}

// Rankings information
export interface Rankings {
  topRunScorer?: number;
  highestStrikeRate?: number;
  mostWickets?: number;
  bestEconomy?: number;
  topAllRounder?: number;
}

// Base player data common to all categories
export interface BaseTeamOfTheWeekPlayer {
  category: "Batter" | "Bowler" | "All-Rounder" | "Twelfth Man";
  categoryDetail: CategoryDetail;
  rank: number;
  player: string; // May include (c) or (vc) suffixes
  primaryTeam: string;
  club: Club;
  rankings: Rankings;
}

// Batter player (has batting stats only)
export interface BatterPlayer extends BaseTeamOfTheWeekPlayer {
  category: "Batter";
  batting: BattingStats;
  bowling?: never;
  allRounder?: never;
}

// Bowler player (has bowling stats only, may have batting)
export interface BowlerPlayer extends BaseTeamOfTheWeekPlayer {
  category: "Bowler";
  batting?: BattingStats;
  bowling: BowlingStats;
  allRounder?: never;
}

// All-Rounder player (has both batting and bowling, plus combined stats)
export interface AllRounderPlayer extends BaseTeamOfTheWeekPlayer {
  category: "All-Rounder";
  batting: BattingStats;
  bowling: BowlingStats;
  allRounder: AllRounderStats;
}

// Twelfth Man player (can have batting and/or bowling)
export interface TwelfthManPlayer extends BaseTeamOfTheWeekPlayer {
  category: "Twelfth Man";
  batting?: BattingStats;
  bowling?: BowlingStats;
  allRounder?: AllRounderStats;
}

// Union type for any Team of the Week player
export type TeamOfTheWeekPlayer =
  | BatterPlayer
  | BowlerPlayer
  | AllRounderPlayer
  | TwelfthManPlayer;

// Type guards for distinguishing player categories
export const isBatterPlayer = (
  player: TeamOfTheWeekPlayer,
): player is BatterPlayer => {
  return player.category === "Batter";
};

export const isBowlerPlayer = (
  player: TeamOfTheWeekPlayer,
): player is BowlerPlayer => {
  return player.category === "Bowler";
};

export const isAllRounderPlayer = (
  player: TeamOfTheWeekPlayer,
): player is AllRounderPlayer => {
  return player.category === "All-Rounder";
};

export const isTwelfthManPlayer = (
  player: TeamOfTheWeekPlayer,
): player is TwelfthManPlayer => {
  return player.category === "Twelfth Man";
};

// Helper function to check if player has batting stats
export const hasBattingStats = (
  player: TeamOfTheWeekPlayer,
): player is BatterPlayer | AllRounderPlayer | TwelfthManPlayer => {
  return "batting" in player && player.batting !== undefined;
};

// Helper function to check if player has bowling stats
export const hasBowlingStats = (
  player: TeamOfTheWeekPlayer,
): player is BowlerPlayer | AllRounderPlayer | TwelfthManPlayer => {
  return "bowling" in player && player.bowling !== undefined;
};

// Helper function to check if player has all-rounder stats
export const hasAllRounderStats = (
  player: TeamOfTheWeekPlayer,
): player is AllRounderPlayer | TwelfthManPlayer => {
  return "allRounder" in player && player.allRounder !== undefined;
};

// Animation constants
export const HEADER_ANIMATION_DURATION = 45; // 1.5 seconds at 30fps
export const PLAYER_STAGGER_DELAY = 5; // Stagger between player entries
export const PLAYER_ANIMATION_DURATION = 30; // 1 second for player animation

// Composition identifier
export const TEAM_OF_THE_WEEK_COMPOSITION_ID = "CricketTeamOfTheWeek";

// Screen configuration types
export interface ScreenConfig {
  itemsPerScreen: number; // Default: 5, or from contentLayout
  screenIndex: number; // Current screen index (0-based)
  totalScreens: number; // Total number of screens needed
}

// Screen calculation result
export interface ScreenCalculationResult {
  totalScreens: number;
  itemsPerScreen: number;
  getItemsForScreen: (screenIndex: number) => TeamOfTheWeekPlayer[];
}

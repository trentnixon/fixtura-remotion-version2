import { AssignSponsors } from "../composition-types";

// Types for top 5 players data structure
export interface TeamLogo {
  url: string;
  width: number;
  height: number;
}

export interface Team {
  name: string;
}

export interface Grade {
  id: number;
  name: string;
}

export interface Competition {
  id: number;
  name: string;
}

// Base player data that's common to both types
export interface BasePlayerData {
  name: string;
  teamLogo: TeamLogo;
  playedFor: string;
  assignSponsors: AssignSponsors;
  prompt: string;
}

// Batting specific player data
export interface BatterData extends BasePlayerData {
  type: "batting";
  runs: number;
  balls: number;
  SR: number;
  notOut: boolean;
}

// Bowling specific player data
export interface BowlerData extends BasePlayerData {
  type: "bowling";
  wickets: number;
  overs: string;
  runs: number;
}

// Union type to represent either a batter or bowler
export type PlayerData = BatterData | BowlerData;

// Helper function to determine if player is a batter
export const isBatter = (player: PlayerData): player is BatterData => {
  return player.type === "batting";
};

// Helper function to determine if player is a bowler
export const isBowler = (player: PlayerData): player is BowlerData => {
  return player.type === "bowling";
};

// Animation constants
export const HEADER_ANIMATION_DURATION = 45; // 1.5 seconds for header animation
export const PLAYER_STAGGER_DELAY = 15; // 0.5 seconds stagger between players
export const PLAYER_ANIMATION_DURATION = 30; // 1 second for player animation

// Composition types
export const TOP5_COMPOSITIONS = {
  BATTING: "CricketTop5Batting",
  BOWLING: "CricketTop5Bowling",
  BATTING_PERFORMANCES: "CricketBattingPerformances",
  BOWLING_PERFORMANCES: "CricketBowlingPerformances",
} as const;

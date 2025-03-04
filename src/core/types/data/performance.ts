// types/data/performance.ts

// Batting performance type
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

// Bowling performance type
export interface BowlingPerformance {
  runs: number;
  team: string;
  overs: number;
  player: string;
  economy: string;
  maidens: number;
  wickets: number;
}

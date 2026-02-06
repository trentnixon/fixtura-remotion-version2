// Types for cricket performances data structure
// Independent from top5 to allow for future changes

// Team logo information
export interface TeamLogo {
  url: string;
  width: number;
  height: number;
}

// Grade information
export interface Grade {
  id: number;
  name: string;
}

// Competition information
export interface Competition {
  id: number;
  name: string;
}

// Assign sponsors structure (matches JSON format)
export interface AssignSponsors {
  Team: {
    name: string;
  };
  grade: Grade;
  competition: Competition;
}

// Base performance data that's common to both batting and bowling
export interface BasePerformanceData {
  name: string;
  teamLogo: TeamLogo;
  playedFor: string;
  assignSponsors: AssignSponsors;
  prompt: string;
}

// Batting specific performance data
export interface BattingPerformanceData extends BasePerformanceData {
  type: "batting";
  runs: number;
  balls: number;
  SR: number; // Strike rate
  notOut: boolean;
}

// Bowling specific performance data
export interface BowlingPerformanceData extends BasePerformanceData {
  type: "bowling";
  wickets: number;
  overs: string; // e.g., "3.5", "5", "9"
  runs: number; // Runs conceded
}

// Union type to represent either a batting or bowling performance
export type PerformanceData = BattingPerformanceData | BowlingPerformanceData;

// Helper function to determine if performance is batting
export const isBattingPerformance = (
  performance: PerformanceData,
): performance is BattingPerformanceData => {
  return performance.type === "batting";
};

// Helper function to determine if performance is bowling
export const isBowlingPerformance = (
  performance: PerformanceData,
): performance is BowlingPerformanceData => {
  return performance.type === "bowling";
};

// Animation constants
export const HEADER_ANIMATION_DURATION = 45; // 1.5 seconds for header animation
export const PERFORMANCE_STAGGER_DELAY = 15; // 0.5 seconds stagger between performances
export const PERFORMANCE_ANIMATION_DURATION = 30; // 1 second for performance animation

// Composition types
export const PERFORMANCES_COMPOSITIONS = {
  BATTING: "CricketBattingPerformances",
  BOWLING: "CricketBowlingPerformances",
} as const;

// Screen configuration types
export interface ScreenConfig {
  itemsPerScreen: number; // Default: 5
  screenIndex: number; // Current screen index (0-based)
  totalScreens: number; // Total number of screens needed
}

// Transition configuration types
export type TransitionType =
  | "slide"
  | "fade"
  | "wipe"
  | "clockWipe"
  | "flip"
  | "none";

export type TransitionDirection =
  | "from-right"
  | "from-left"
  | "from-top"
  | "from-bottom";

export interface TransitionConfig {
  type: TransitionType;
  direction: TransitionDirection;
  durationInFrames: number;
}

// Screen calculation result
export interface ScreenCalculationResult {
  totalScreens: number;
  itemsPerScreen: number;
  getItemsForScreen: (screenIndex: number) => PerformanceData[];
}

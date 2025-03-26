// Types for ladder data structure
export interface TeamLogo {
  url: string;
  width: number;
  height: number;
}

export interface TeamData {
  position: string;
  teamName: string;
  teamLogo: TeamLogo | null;
  P: string; // Played
  W: string; // Won
  L: string; // Lost
  BYE: string; // Byes
  "N/R": string; // No Result
  TIE: string; // Tie
  PTS: string; // Points
  Q: string; // Quotient
}

export interface LadderData {
  ID: number;
  name: string;
  League: TeamData[];
  bias: string;
  prompt: string;
}

// Animation constants
export const HEADER_ANIMATION_DURATION = 45; // 1.5 seconds for header animation
export const TABLE_ANIMATION_DURATION = 90; // 3 seconds for table rows animation

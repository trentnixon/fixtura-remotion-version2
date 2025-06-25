// types/data/team.ts

import { ImageLogo } from "./common";
import { BattingPerformance, BowlingPerformance } from "./performance";

// Base Team type
export interface Team {
  logo: ImageLogo;
  name: string;
  overs: string | null;
  score: string;
  isHome: boolean;
  isClubTeam: boolean;
  battingPerformances?: BattingPerformance[];
  bowlingPerformances?: BowlingPerformance[];
}

// Home team extends Team with additional property
export interface HomeTeam extends Team {
  homeScoresFirstInnings: string;
}

// Away team extends Team with additional property
export interface AwayTeam extends Team {
  awayScoresFirstInnings: string | null;
}

// Teams structure for assign sponsors
export interface TeamsAssignSponsors {
  away: {
    name: string;
  };
  home: {
    name: string;
  };
}

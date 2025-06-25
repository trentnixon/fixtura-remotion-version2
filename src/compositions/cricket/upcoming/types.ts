import { AssignSponsors } from "../composition-types";

// Types for upcoming games data structure
export interface TeamLogo {
  url: string;
  width: number;
  height: number;
}

export interface Sponsor {
  teamAway: string;
  teamHome: string;
}

export interface Grade {
  id: number;
  name: string;
}

export interface Competition {
  id: number | null;
  name: string | null;
}

export interface GameData {
  date: string;
  time: string;
  type: string;
  round: string | null;
  gameID: string;
  gender: string;
  ground: string;
  prompt: string;
  ageGroup: string;
  teamAway: string;
  teamHome: string;
  gradeName: string;
  teamAwayLogo: TeamLogo | null;
  teamHomeLogo: TeamLogo | null;
  assignSponsors: AssignSponsors;
}

// Animation constants
export const HEADER_ANIMATION_DURATION = 45; // 1.5 seconds for header animation
export const CARD_STAGGER_DELAY = 15; // 0.5 seconds stagger between cards
export const CARD_ANIMATION_DURATION = 30; // 1 second for card animation

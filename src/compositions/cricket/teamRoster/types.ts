export interface Sponsor {
  id: number;
  isPrimary: boolean;
  isActive: boolean;
  isArticle: boolean;
  isVideo: boolean;
  url: string;
  tagline: string;
  description: string | null;
  name: string;
  logo: { id: number; url: string; width?: number; height?: number };
}

export interface RosterDataItem {
  date: string;
  type: string;
  round: string;
  gameId: string;
  gender: string;
  ground: string;
  ageGroup: string;
  sponsors: Sponsor[]; // Note: This seems specific to the fixture in the data array, not the main club sponsors
  teamAway: string;
  teamHome: string;
  gradeName: string;
  isHomeTeam: boolean;
  teamRoster: string[]; // Array of player names
  teamAwayLogo: string;
  teamHomeLogo: string;
}

// If the entire data structure from the context is needed, define it too
// For now, focusing on the item within the 'data' array
